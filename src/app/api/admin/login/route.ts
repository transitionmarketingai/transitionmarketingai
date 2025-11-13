import { NextRequest, NextResponse } from 'next/server';
import { setAdminSession } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        createErrorResponse('Password is required'),
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('[Admin Login] ADMIN_PASSWORD not configured');
      return NextResponse.json(
        createErrorResponse('Admin password not configured'),
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      console.warn('[Admin Login] Invalid password attempt');
      return NextResponse.json(
        createErrorResponse('Invalid password'),
        { status: 401 }
      );
    }

    // Set admin session cookie
    await setAdminSession();

    console.log('[Admin Login] Successful admin login');

    return NextResponse.json(createSuccessResponse());
  } catch (error: any) {
    console.error('[Admin Login] Error:', error);
    return NextResponse.json(
      createErrorResponse('An error occurred'),
      { status: 500 }
    );
  }
}

