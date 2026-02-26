import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyJWT(request: Request): NextResponse | null {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided.' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Malformed token.' }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.SECRET!);
    return null;
  } catch {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 403 });
  }
}

export function generateToken(): string {
  return jwt.sign({ app: 'analyze' }, process.env.SECRET!, { expiresIn: '1h' });
}
