import { NextRequest, NextResponse } from 'next/server';
import { clearClientSession } from '@/lib/clientAuth';
import { createSuccessResponse } from '@/lib/apiHelpers';

/**
 * Client Logout API
 */
export async function POST(request: NextRequest) {
  const response = NextResponse.json(createSuccessResponse({ message: 'Logged out successfully' }));
  clearClientSession(response);
  return response;
}

