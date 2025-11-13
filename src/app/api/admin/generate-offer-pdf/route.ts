import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAdmin } from '@/lib/adminAuth';
import { generatePilotOfferPDF } from '@/lib/pilot-offer/pdf-generator';
import {
  handleSupabaseError,
  createErrorResponse,
  logAdminEvent,
} from '@/lib/apiHelpers';

export async function GET(req: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(req);
    if (authError) {
      return authError;
    }

    // Get submissionId from query
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        createErrorResponse('Missing submissionId parameter'),
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    // Fetch submission
    const { data: submission, error: submissionError } = await supabase
      .from('onboarding_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (handleSupabaseError(submissionError, 'Fetching onboarding submission')) {
      return NextResponse.json(
        createErrorResponse('Submission not found'),
        { status: 404 }
      );
    }

    if (!submission) {
      return NextResponse.json(
        createErrorResponse('Submission not found'),
        { status: 404 }
      );
    }

    // Fetch call record
    const { data: callRecord, error: callRecordError } = await supabase
      .from('client_onboarding_calls')
      .select('*')
      .eq('submission_id', submissionId)
      .single();

    if (handleSupabaseError(callRecordError, 'Fetching client onboarding call')) {
      return NextResponse.json(
        createErrorResponse('Call record not found. Please complete the call checklist first.'),
        { status: 400 }
      );
    }

    if (!callRecord) {
      return NextResponse.json(
        createErrorResponse('Call record not found. Please complete the call checklist first.'),
        { status: 400 }
      );
    }

    // Validate required fields
    if (!callRecord.recommended_pilot_investment_min || !callRecord.recommended_pilot_investment_max) {
      return NextResponse.json(
        createErrorResponse('Missing pilot investment or target inquiries. Please fill the call checklist first.'),
        { status: 400 }
      );
    }

    if (!callRecord.target_inquiries_min || !callRecord.target_inquiries_max) {
      return NextResponse.json(
        createErrorResponse('Missing pilot investment or target inquiries. Please fill the call checklist first.'),
        { status: 400 }
      );
    }

    // Generate PDF
    const pdfBuffer = await generatePilotOfferPDF({
      submission: {
        name: submission.name,
        email: submission.email || '',
        phone: submission.phone || '',
        industry: submission.industry || '',
        city: submission.city || '',
      },
      callRecord: {
        business_name: callRecord.business_name,
        business_description: callRecord.business_description,
        ideal_customer: callRecord.ideal_customer,
        avg_customer_value: callRecord.avg_customer_value,
        current_leads_per_month: callRecord.current_leads_per_month,
        capacity_per_month: callRecord.capacity_per_month,
        target_inquiries_min: callRecord.target_inquiries_min,
        target_inquiries_max: callRecord.target_inquiries_max,
        recommended_pilot_investment_min: callRecord.recommended_pilot_investment_min,
        recommended_pilot_investment_max: callRecord.recommended_pilot_investment_max,
        fit_level: callRecord.fit_level,
        notes_for_campaign_strategy: callRecord.notes_for_campaign_strategy,
      },
    });

    logAdminEvent('Generated offer PDF', { submissionId });

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="transition-pilot-${submissionId}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error('[Generate Offer PDF] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to generate PDF'),
      { status: 500 }
    );
  }
}

