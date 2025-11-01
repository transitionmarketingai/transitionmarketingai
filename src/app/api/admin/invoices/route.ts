import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET - Get all invoices for admin
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user (admin)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const clientId = searchParams.get('client_id');

    // Build query
    let query = supabase
      .from('invoices')
      .select(`
        *,
        clients (
          id,
          company_name,
          email,
          contact_person
        )
      `)
      .order('created_at', { ascending: false });

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (clientId) {
      query = query.eq('client_id', clientId);
    }

    const { data: invoices, error } = await query;

    if (error) {
      console.error('Fetch invoices error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch invoices' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invoices: invoices || [],
      total: invoices?.length || 0,
    });

  } catch (error: any) {
    console.error('Invoices API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
