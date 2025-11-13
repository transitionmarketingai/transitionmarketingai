import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import {
  handleSupabaseError,
  createSuccessResponse,
  createErrorResponse,
  validateRequiredFields,
} from '@/lib/apiHelpers';

/**
 * Log submission attempt for rate limiting monitoring
 */
function logSubmissionAttempt(req: NextRequest, type: 'onboarding' | 'waitlist') {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  console.log(`[${type.toUpperCase()} Submit] IP: ${ip}, User-Agent: ${userAgent.substring(0, 50)}`);
  // TODO: Implement rate limiting (e.g., max 10 submissions per IP per minute)
}

export async function POST(req: NextRequest) {
  try {
    // Log submission attempt for monitoring
    logSubmissionAttempt(req, 'waitlist');

    const body = await req.json();

    // Validate required fields - name is required, email or phone should be present
    if (!body.name) {
      return NextResponse.json(
        createErrorResponse('Missing required fields: name'),
        { status: 400 }
      );
    }

    if (!body.email && !body.phone) {
      return NextResponse.json(
        createErrorResponse('Either email or phone is required'),
        { status: 400 }
      );
    }

    const { name, email, phone, source_submission_id } = body;

    const supabase = getSupabaseServerClient();

    // Store in Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        name,
        email: email || null,
        phone: phone || null,
        source_submission_id: source_submission_id || null,
      })
      .select()
      .single();

    if (handleSupabaseError(error, 'Creating waitlist entry')) {
      return NextResponse.json(
        createErrorResponse('Failed to save waitlist entry'),
        { status: 500 }
      );
    }

    return NextResponse.json(createSuccessResponse({ id: data?.id }));
  } catch (error: any) {
    console.error('[Waitlist Submit] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}

