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

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid form data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const file = formData.get('pdf') as File | null;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No PDF file uploaded.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (file.type !== 'application/pdf') {
    return new Response(JSON.stringify({ error: 'The uploaded file must be a PDF.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let pdfData: { text: string; numpages: number };
  try {
    const pdfParse = (await import('pdf-parse')).default;
    pdfData = await pdfParse(buffer);
  } catch (pdfError) {
    console.error('Error parsing PDF:', pdfError);
    return new Response(JSON.stringify({ error: 'Unable to read the PDF. Please make sure it is valid.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!pdfData.text || pdfData.text.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'No textual content found in the PDF.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const textContent = fixSpaces(pdfData.text.trim());
  const chunks = chunkText(textContent, 3000);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));

      const seenKeys = new Set<string>();

      try {
        for (let i = 0; i < chunks.length; i++) {
          send({ type: 'progress', current: i + 1, total: chunks.length });

          try {
            const chunkPrefix = chunks.length > 1 ? `[Part ${i + 1}/${chunks.length}] ` : '';
            const parsed = (await callPdfAnalysis(chunkPrefix + chunks[i], PDF_SYSTEM_PROMPT)) as {
              issues?: unknown[];
            };

            if (parsed.issues && Array.isArray(parsed.issues)) {
              // Deduplicate against already-sent issues
              const newIssues = parsed.issues.filter((issue) => {
                const key = `${(issue as { issue: string }).issue}|${(issue as { law_reference: string }).law_reference}`;
                if (seenKeys.has(key)) return false;
                seenKeys.add(key);
                return true;
              });

              if (newIssues.length > 0) {
                send({ type: 'issues', issues: newIssues });
              }
            }
          } catch (chunkError) {
            console.error(`Error analyzing chunk ${i + 1}:`, chunkError);
          }
        }

        send({
          type: 'complete',
          metadata: {
            totalPages: pdfData.numpages,
            textLength: textContent.length,
            chunksAnalyzed: chunks.length,
          },
        });
      } catch (err) {
        console.error('PDF stream error:', err);
        send({ type: 'error', message: 'Analysis failed. Please try again.' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
