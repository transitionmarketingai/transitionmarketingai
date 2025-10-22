import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch lead statistics for dashboard
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get lead statistics
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('status, quality_score')
      .eq('customer_id', customer.id);

    if (leadsError) {
      console.error('Fetch leads stats error:', leadsError);
      return NextResponse.json(
        { error: 'Failed to fetch lead statistics' },
        { status: 500 }
      );
    }

    // Calculate statistics
    const stats = {
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      meeting_scheduled: leads.filter(l => l.status === 'meeting_scheduled').length,
      won: leads.filter(l => l.status === 'won').length,
      lost: leads.filter(l => l.status === 'lost').length,
      total: leads.length,
      avgQualityScore: leads.length > 0 ? 
        Math.round(leads.reduce((sum, lead) => sum + (lead.quality_score || 0), 0) / leads.length) : 0,
    };

    return NextResponse.json({
      stats,
    });

  } catch (error: any) {
    console.error('Dashboard analytics error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}