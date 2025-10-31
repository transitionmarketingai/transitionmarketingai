import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch all leads for admin (unverified leads for verification)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

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

    // Check if user is admin (you may need to adjust this based on your admin check)
    // For now, we'll assume any authenticated user can access this

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';

    // Build query - get leads that need verification
    let query = supabase
      .from('leads')
      .select(`
        id,
        name,
        email,
        phone,
        company,
        source,
        verification_status,
        phone_verified,
        email_verified,
        business_verified,
        verified_at,
        verification_notes,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('verification_status', status);
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error('Fetch leads error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      leads: leads || [],
      total: leads?.length || 0,
    });
  } catch (error: any) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

