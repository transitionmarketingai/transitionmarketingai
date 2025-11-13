import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSession, requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

export async function POST(req: NextRequest) {
  try {
    // Require admin authentication to logout (prevents CSRF)
    const authError = requireAdmin(req);
    if (authError) {
      return authError;
    }

    await clearAdminSession();

    console.log('[Admin Logout] Admin logged out');

    return NextResponse.json(createSuccessResponse());
  } catch (error: any) {
    console.error('[Admin Logout] Error:', error);
    return NextResponse.json(
      createErrorResponse('An error occurred'),
      { status: 500 }
    );
  }
}

