import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAdminPage } from '@/lib/adminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { handleSupabaseError } from '@/lib/apiHelpers';

export default async function AdminPage() {
  // Require admin authentication
  await requireAdminPage();

  // Fetch submissions
  const supabase = getSupabaseServerClient();
  const { data: submissions, error } = await supabase
    .from('onboarding_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (handleSupabaseError(error, 'Fetching onboarding submissions for admin dashboard')) {
    // Log error but continue with empty array
  }

  return <AdminDashboard initialSubmissions={submissions || []} />;
}
