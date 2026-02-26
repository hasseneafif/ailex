import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/server/auth';
import { rateLimitByIP } from '@/lib/server/rate-limit';
import { callPdfAnalysis } from '@/lib/server/ai-service';

export const runtime = 'nodejs';

const PDF_SYSTEM_PROMPT = process.env.PDF_SYSTEM_PROMPT?.replace(/\\n/g, '\n') ?? '';

function chunkText(text: string, maxChunkSize = 3000): string[] {
  const chunks: string[] = [];
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  let currentChunk = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (currentChunk.length + trimmed.length + 1 > maxChunkSize) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = trimmed;
      } else {
        chunks.push(trimmed.substring(0, maxChunkSize));
        currentChunk = trimmed.substring(maxChunkSize);
      }
    } else {
      currentChunk += (currentChunk.length > 0 ? '. ' : '') + trimmed;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

function fixSpaces(text: string): string {
  return text
    .replace(/([a-zà-ÿ])([A-ZÀ-Ÿ])/g, '$1 $2')
    .replace(/([»'])([A-Za-z0-9])/g, '$1 $2')
    .replace(/\s+/g, ' ');
}

export async function POST(request: Request) {
  const authError = verifyJWT(request);
  if (authError) return authError;

  const limited = rateLimitByIP(request);
  if (limited) return limited;

  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No PDF file uploaded.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'The uploaded file must be a PDF.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let pdfData: { text: string; numpages: number };
    try {
      const pdfParse = (await import('pdf-parse')).default;
      pdfData = await pdfParse(buffer);
    } catch (pdfError) {
      console.error('Error parsing PDF:', pdfError);
      return NextResponse.json(
        { error: 'Unable to read the PDF. Please make sure it is valid.' },
        { status: 400 }
      );
    }

    if (!pdfData.text || pdfData.text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No textual content found in the PDF.' },
        { status: 400 }
      );
    }

    const textContent = fixSpaces(pdfData.text.trim());
    const chunks = chunkText(textContent, 3000);
    const allIssues: unknown[] = [];

    for (let i = 0; i < chunks.length; i++) {
      try {
        const chunkPrefix = chunks.length > 1 ? `[Part ${i + 1}/${chunks.length}] ` : '';
        const parsedResponse = (await callPdfAnalysis(chunkPrefix + chunks[i], PDF_SYSTEM_PROMPT)) as {
          issues?: unknown[];
        };

        if (parsedResponse.issues && Array.isArray(parsedResponse.issues)) {
          allIssues.push(...parsedResponse.issues);
        }
      } catch (chunkError) {
        console.error(`Error analyzing chunk ${i + 1}:`, chunkError);
      }
    }

    const uniqueIssues = allIssues.filter((issue, index, self) =>
      index ===
      self.findIndex(
        (i) =>
          (i as { issue: string; law_reference: string }).issue ===
            (issue as { issue: string; law_reference: string }).issue &&
          (i as { issue: string; law_reference: string }).law_reference ===
            (issue as { issue: string; law_reference: string }).law_reference
      )
    );

    return NextResponse.json({
      issues: uniqueIssues,
      metadata: {
        totalPages: pdfData.numpages,
        textLength: textContent.length,
        chunksAnalyzed: chunks.length,
      },
    });
  } catch (error: unknown) {
    console.error('PDF analysis error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Unable to analyze the PDF. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? msg : undefined,
      },
      { status: 500 }
    );
  }
}
