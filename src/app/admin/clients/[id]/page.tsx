import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { handleSupabaseError } from '@/lib/apiHelpers';
import { requireAdminPage } from '@/lib/adminAuth';
import { notFound } from 'next/navigation';
import ClientDetailPage from '@/components/admin/ClientDetailPage';

export default async function ClientDetail({ params }: { params: { id: string } }) {
  // Require admin authentication
  await requireAdminPage();

  const supabase = getSupabaseServerClient();

  // Fetch submission
  const { data: submission, error: submissionError } = await supabase
    .from('onboarding_submissions')
    .select('*')
    .eq('id', params.id)
    .single();

  if (handleSupabaseError(submissionError, 'Fetching onboarding submission for client detail')) {
    notFound();
  }

  if (!submission) {
    notFound();
  }

  // Fetch or create call record
  let { data: callRecord, error: callRecordError } = await supabase
    .from('client_onboarding_calls')
    .select('*')
    .eq('submission_id', params.id)
    .single();

  // If no call record exists, create one
  if (!callRecord) {
    // It's okay if the query returned no results (PGRST116)
    if (callRecordError && callRecordError.code !== 'PGRST116') {
      handleSupabaseError(callRecordError, 'Fetching client onboarding call');
    }

    const { data: newCallRecord, error: createError } = await supabase
      .from('client_onboarding_calls')
      .insert({
        submission_id: params.id,
        avg_customer_value: submission.avg_customer_value ? parseFloat(submission.avg_customer_value) : undefined,
        has_sales_team: submission.has_sales_team === 'yes',
      })
      .select()
      .single();

    if (handleSupabaseError(createError, 'Creating client onboarding call record')) {
      // Log error but continue - we'll show the page without a call record
      console.warn('[Client Detail] Failed to create call record, but continuing');
    } else {
      callRecord = newCallRecord;
    }
  }

  return <ClientDetailPage submission={submission} callRecord={callRecord || null} />;
}
