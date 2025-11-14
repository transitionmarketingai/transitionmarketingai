import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Admin Login API
 * Simple password-based authentication
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        createErrorResponse('Password is required'),
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS;

    if (!adminPassword) {
      console.error('[Admin Login] ADMIN_PASSWORD not configured');
      return NextResponse.json(
        createErrorResponse('Admin authentication not configured'),
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        createErrorResponse('Invalid password'),
        { status: 401 }
      );
    }

    // Fire analytics event
    trackEvent('admin_login', {
      event_category: 'admin',
      event_label: 'admin_login_success',
    });

    // Set session cookie
    const response = NextResponse.json(
      createSuccessResponse({ message: 'Login successful' })
    );

    // Set httpOnly cookie for server-side auth checks
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('[Admin Login] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}
