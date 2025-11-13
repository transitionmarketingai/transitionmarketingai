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
    logSubmissionAttempt(req, 'onboarding');

    const body = await req.json();

    // Validate required fields
    const validation = validateRequiredFields(body, [
      'name',
      'industry',
      'city',
      'avgCustomerValue',
      'currentInquiries',
      'desiredInquiries',
      'budgetRange',
      'hasSalesTeam',
      'score',
    ]);

    if (!validation.isValid) {
      return NextResponse.json(
        createErrorResponse(`Missing required fields: ${validation.missingFields.join(', ')}`),
        { status: 400 }
      );
    }

    const {
      industry,
      city,
      avgCustomerValue,
      currentInquiries,
      desiredInquiries,
      budgetRange,
      hasSalesTeam,
      name,
      email,
      phone,
      score,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    } = body;

    const supabase = getSupabaseServerClient();

    // Store in Supabase (UTM params stored in raw_answers JSONB)
    const { data, error } = await supabase
      .from('onboarding_submissions')
      .insert({
        industry,
        city,
        avg_customer_value: avgCustomerValue,
        current_inquiries: currentInquiries,
        desired_inquiries: desiredInquiries,
        budget_range: budgetRange,
        has_sales_team: hasSalesTeam === 'yes' ? 'yes' : 'no',
        name,
        email: email || null,
        phone: phone || null,
        score,
        raw_answers: body, // Store entire payload including UTM params
      })
      .select()
      .single();

    // Send to webhook (Airtable/Google Sheets) if configured
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'onboarding_submit',
            data: {
              name,
              email,
              phone,
              industry,
              city,
              score,
              utm_source,
              utm_medium,
              utm_campaign,
              utm_term,
              utm_content,
              timestamp: new Date().toISOString(),
            },
          }),
        });
      } catch (webhookError) {
        // Don't fail the request if webhook fails
        console.error('[Onboarding Submit] Webhook error:', webhookError);
      }
    }

    if (handleSupabaseError(error, 'Creating onboarding submission')) {
      return NextResponse.json(
        createErrorResponse('Failed to save onboarding submission'),
        { status: 500 }
      );
    }

    return NextResponse.json(createSuccessResponse({ score, id: data?.id }));
  } catch (error: any) {
    console.error('[Onboarding Submit] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}

