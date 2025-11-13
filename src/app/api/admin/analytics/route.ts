/**
 * Admin Analytics API
 * 
 * Provides funnel and analytics metrics for the admin dashboard.
 * Requires admin authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAdmin } from '@/lib/adminAuth';
import {
  handleSupabaseError,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/apiHelpers';

interface StatusBreakdown {
  status: string;
  count: number;
}

interface CallOutcomeBreakdown {
  call_outcome: string;
  count: number;
}

interface AnalyticsMetrics {
  submissions: {
    total: number;
    qualified: number;
    medium: number;
    low: number;
    byStatus: StatusBreakdown[];
    last7days: number;
  };
  calls: {
    total: number;
    byOutcome: CallOutcomeBreakdown[];
  };
}

export async function GET(req: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(req);
    if (authError) {
      return authError;
    }

    const supabase = getSupabaseServerClient();

    // A. Overall counts from onboarding_submissions
    const { count: totalSubmissions, error: totalError } = await supabase
      .from('onboarding_submissions')
      .select('*', { count: 'exact', head: true });

    if (handleSupabaseError(totalError, 'Counting total submissions')) {
      throw new Error('Failed to count submissions');
    }

    const { count: qualifiedSubmissions, error: qualifiedError } = await supabase
      .from('onboarding_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('score', 70);

    if (handleSupabaseError(qualifiedError, 'Counting qualified submissions')) {
      throw new Error('Failed to count qualified submissions');
    }

    const { count: mediumSubmissions, error: mediumError } = await supabase
      .from('onboarding_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('score', 40)
      .lt('score', 70);

    if (handleSupabaseError(mediumError, 'Counting medium submissions')) {
      throw new Error('Failed to count medium submissions');
    }

    const { count: lowSubmissions, error: lowError } = await supabase
      .from('onboarding_submissions')
      .select('*', { count: 'exact', head: true })
      .lt('score', 40);

    if (handleSupabaseError(lowError, 'Counting low submissions')) {
      throw new Error('Failed to count low submissions');
    }

    // B. Status breakdown
    const { data: statusData, error: statusError } = await supabase
      .from('onboarding_submissions')
      .select('status');

    if (handleSupabaseError(statusError, 'Fetching status breakdown')) {
      throw new Error('Failed to fetch status breakdown');
    }

    // Group by status
    const statusCounts: Record<string, number> = {};
    statusData?.forEach((sub) => {
      const status = sub.status || 'new';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const byStatus: StatusBreakdown[] = [
      { status: 'new', count: statusCounts['new'] || 0 },
      { status: 'in_progress', count: statusCounts['in_progress'] || 0 },
      { status: 'completed', count: statusCounts['completed'] || 0 },
      { status: 'follow_up', count: statusCounts['follow_up'] || 0 },
      { status: 'not_fit', count: statusCounts['not_fit'] || 0 },
    ];

    // D. Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    const { count: last7Days, error: last7DaysError } = await supabase
      .from('onboarding_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgoISO);

    if (handleSupabaseError(last7DaysError, 'Counting last 7 days submissions')) {
      throw new Error('Failed to count recent submissions');
    }

    // C. Call outcomes
    const { count: totalCalls, error: callsTotalError } = await supabase
      .from('client_onboarding_calls')
      .select('*', { count: 'exact', head: true });

    if (handleSupabaseError(callsTotalError, 'Counting total calls')) {
      throw new Error('Failed to count calls');
    }

    const { data: callOutcomeData, error: callOutcomeError } = await supabase
      .from('client_onboarding_calls')
      .select('call_outcome');

    if (handleSupabaseError(callOutcomeError, 'Fetching call outcomes')) {
      throw new Error('Failed to fetch call outcomes');
    }

    // Group by call_outcome
    const outcomeCounts: Record<string, number> = {};
    callOutcomeData?.forEach((call) => {
      if (call.call_outcome) {
        outcomeCounts[call.call_outcome] = (outcomeCounts[call.call_outcome] || 0) + 1;
      }
    });

    const byOutcome: CallOutcomeBreakdown[] = [
      { call_outcome: 'Pilot Sold', count: outcomeCounts['Pilot Sold'] || 0 },
      { call_outcome: 'Good Fit – Follow-up', count: outcomeCounts['Good Fit – Follow-up'] || 0 },
      { call_outcome: 'Not Ready – Nurture', count: outcomeCounts['Not Ready – Nurture'] || 0 },
      { call_outcome: 'Not a Fit', count: outcomeCounts['Not a Fit'] || 0 },
    ];

    const metrics: AnalyticsMetrics = {
      submissions: {
        total: totalSubmissions || 0,
        qualified: qualifiedSubmissions || 0,
        medium: mediumSubmissions || 0,
        low: lowSubmissions || 0,
        byStatus,
        last7days: last7Days || 0,
      },
      calls: {
        total: totalCalls || 0,
        byOutcome,
      },
    };

    return NextResponse.json(createSuccessResponse({ metrics }));
  } catch (error: any) {
    console.error('[Admin Analytics] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to load analytics'),
      { status: 500 }
    );
  }
}

