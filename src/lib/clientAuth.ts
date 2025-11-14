import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createErrorResponse } from './apiHelpers';

export interface ClientTokenPayload {
  id: string;
  email: string;
  clientRecordId: string;
}

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production';

/**
 * Generate JWT token for client
 */
export function generateClientToken(payload: ClientTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

/**
 * Verify client JWT token
 */
export function verifyClientToken(token: string): ClientTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as ClientTokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Get client token from request (cookie or header)
 */
export function getClientToken(request: NextRequest): string | null {
  // Try cookie first
  const cookieToken = request.cookies.get('client_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // Try Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

/**
 * Require client authentication for API routes
 */
export function requireClientAuth(request: NextRequest): NextResponse | null {
  const token = getClientToken(request);

  if (!token) {
    return NextResponse.json(
      createErrorResponse('Authentication required'),
      { status: 401 }
    );
  }

  const payload = verifyClientToken(token);

  if (!payload) {
    return NextResponse.json(
      createErrorResponse('Invalid or expired token'),
      { status: 401 }
    );
  }

  // Attach client info to request headers for downstream use
  request.headers.set('x-client-id', payload.id);
  request.headers.set('x-client-email', payload.email);
  request.headers.set('x-client-record-id', payload.clientRecordId);

  return null; // Auth successful
}

/**
 * Set client session cookie
 */
export function setClientSession(response: NextResponse, token: string): void {
  response.cookies.set('client_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

/**
 * Clear client session cookie
 */
export function clearClientSession(response: NextResponse): void {
  response.cookies.delete('client_token');
}

