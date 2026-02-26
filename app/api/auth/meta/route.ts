import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/server/auth';
import { rateLimitByIP } from '@/lib/server/rate-limit';

export async function GET(request: Request) {
  const limited = rateLimitByIP(request);
  if (limited) return limited;

  const token = generateToken();
  return NextResponse.json({ token });
}
