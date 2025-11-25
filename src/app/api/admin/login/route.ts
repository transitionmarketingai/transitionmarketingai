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
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        createErrorResponse('Email and password are required'),
        { status: 400 }
      );
    }

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'info@transitionmarketingai.com';
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS;

    if (!adminPassword) {
      console.error('[Admin Login] ADMIN_PASSWORD not configured');
      return NextResponse.json(
        createErrorResponse('Admin authentication not configured'),
        { status: 500 }
      );
    }

    // Normalize email for comparison (case-insensitive)
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedAdminEmail = adminEmail.toLowerCase().trim();

    // Check email and password
    if (normalizedEmail !== normalizedAdminEmail || password !== adminPassword) {
      return NextResponse.json(
        createErrorResponse('Invalid email or password'),
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
