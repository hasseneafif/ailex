import { verifyJWT } from '@/lib/server/auth';
import { rateLimitByIP } from '@/lib/server/rate-limit';
import { streamChatCompletion } from '@/lib/server/ai-service';

const CHAT_SYSTEM_PROMPT = process.env.CHAT_SYSTEM_PROMPT?.replace(/\\n/g, '\n') ?? '';

export async function POST(request: Request) {
  const authError = verifyJWT(request);
  if (authError) return authError;

  const limited = rateLimitByIP(request);
  if (limited) return limited;

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { message, history } = body;

  if (!message || typeof message !== 'string') {
    return new Response(JSON.stringify({ error: 'Message is required and must be a string' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (message.length > 1000) {
    return new Response(JSON.stringify({ error: 'Message too long. Maximum 1000 characters allowed.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const safeHistory: { role: 'user' | 'assistant'; content: string }[] = Array.isArray(history)
    ? history.filter(
        (m): m is { role: 'user' | 'assistant'; content: string } =>
          (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
      )
    : [];

  const generator = streamChatCompletion(message, CHAT_SYSTEM_PROMPT, safeHistory);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of generator) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        console.error('Stream error:', err);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'Stream error' })}\n\n`)
        );
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
