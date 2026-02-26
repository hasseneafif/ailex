import { NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

const LIMIT = 20;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export function rateLimitByIP(request: Request): NextResponse | null {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const now = Date.now();

  const record = ipRequestMap.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return null;
  }

  if (record.count >= LIMIT) {
    return NextResponse.json(
      {
        error: 'Daily message limit reached. Try again tomorrow.',
        retryAfter: new Date(record.resetTime).toISOString(),
      },
      { status: 429 }
    );
  }

  record.count++;
  return null;
}
