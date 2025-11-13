/**
 * Admin Authentication Utilities
 * 
 * Centralized admin authentication helpers for protecting admin routes
 * and API endpoints.
 */

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse } from './apiHelpers';

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = 'authenticated'; // Simple flag value

/**
 * Check if admin is authenticated (for Server Components/Pages)
 * Uses cookies() from next/headers
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE);
    return session?.value === SESSION_VALUE;
  } catch (error) {
    console.error('[Admin Auth] Error checking authentication:', error);
    return false;
  }
}

/**
 * Check if admin request is authenticated (for API routes)
 * Parses cookies from request headers
 */
export function isAdminRequestAuthenticated(request: NextRequest): boolean {
  try {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE);
    return session?.value === SESSION_VALUE;
  } catch (error) {
    console.error('[Admin Auth] Error checking request authentication:', error);
    return false;
  }
}

/**
 * Set admin session cookie
 * Used after successful login
 */
export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Clear admin session cookie
 * Used for logout
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

/**
 * Require admin authentication for API routes
 * Returns error response if not authenticated
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json(
      createErrorResponse('Unauthorized'),
      { status: 401 }
    );
  }
  return null;
}

/**
 * Require admin authentication for pages
 * Throws redirect if not authenticated
 */
export async function requireAdminPage(): Promise<void> {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    const { redirect } = await import('next/navigation');
    redirect('/admin/login');
  }
}

