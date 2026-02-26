import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/server/auth';
import { rateLimitByIP } from '@/lib/server/rate-limit';
import { callChatCompletion } from '@/lib/server/ai-service';

const CHAT_SYSTEM_PROMPT = process.env.CHAT_SYSTEM_PROMPT?.replace(/\\n/g, '\n') ?? '';

export async function POST(request: Request) {
  const authError = verifyJWT(request);
  if (authError) return authError;

  const limited = rateLimitByIP(request);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Maximum 1000 characters allowed.' },
        { status: 400 }
      );
    }

    const parsedResponse = (await callChatCompletion(message, CHAT_SYSTEM_PROMPT)) as {
      answer?: string;
      risks?: unknown[];
    };

    if (!parsedResponse.answer) {
      throw new Error('Invalid response structure: missing answer field');
    }

    if (!Array.isArray(parsedResponse.risks)) {
      parsedResponse.risks = [];
    }

    return NextResponse.json(parsedResponse);
  } catch (error: unknown) {
    console.error('Chat error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to process your message. Please try again.',
        details: process.env.NODE_ENV === 'development' ? msg : undefined,
      },
      { status: 500 }
    );
  }
}
