import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAdmin } from '@/lib/adminAuth';
import {
  handleSupabaseError,
  createSuccessResponse,
  createErrorResponse,
  logAdminEvent,
} from '@/lib/apiHelpers';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require admin authentication
    const authError = requireAdmin(req);
    if (authError) {
      return authError;
    }

    const body = await req.json();
    const { callRecord, status } = body;

    const supabase = getSupabaseServerClient();

    // Upsert call record
    const { data: existingRecord, error: existingError } = await supabase
      .from('client_onboarding_calls')
      .select('id')
      .eq('submission_id', params.id)
      .single();

    // It's okay if no record exists yet (we'll insert)
    if (existingError && existingError.code !== 'PGRST116') {
      handleSupabaseError(existingError, 'Checking existing call record');
    }

    const callRecordData = {
      ...callRecord,
      submission_id: params.id,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (existingRecord) {
      // Update existing record
      const { data, error } = await supabase
        .from('client_onboarding_calls')
        .update(callRecordData)
        .eq('id', existingRecord.id)
        .select()
        .single();
      result = { data, error };
      
      if (handleSupabaseError(error, 'Updating client onboarding call')) {
        return NextResponse.json(
          createErrorResponse('Failed to update call record'),
          { status: 500 }
        );
      }
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('client_onboarding_calls')
        .insert(callRecordData)
        .select()
        .single();
      result = { data, error };
      
      if (handleSupabaseError(error, 'Creating client onboarding call')) {
        return NextResponse.json(
          createErrorResponse('Failed to create call record'),
          { status: 500 }
        );
      }
    }

    // Update submission status if provided
    if (status) {
      const { error: statusError } = await supabase
        .from('onboarding_submissions')
        .update({ status })
        .eq('id', params.id);

      if (handleSupabaseError(statusError, 'Updating onboarding submission status')) {
        // Log but don't fail - the call record was saved successfully
        console.warn('[Client Update] Failed to update submission status, but call record was saved');
      }
    }

    logAdminEvent('Updated client call record', { submissionId: params.id, status });

    return NextResponse.json(createSuccessResponse(result.data));
  } catch (error: any) {
    console.error('[Client Update] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'An error occurred'),
      { status: 500 }
    );
  }
}
