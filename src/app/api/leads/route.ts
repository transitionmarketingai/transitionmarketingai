import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch all leads for authenticated customer
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

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('leads')
      .select('*')
      .eq('customer_id', customer.id)
      .order('received_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error('Fetch leads error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Get total count
    const { count } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', customer.id);

    return NextResponse.json({
      leads,
      total: count || 0,
      limit,
      offset,
    });

  } catch (error: any) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new lead manually
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
      .select('id, industry')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.name || !body.phone || !body.email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required' },
        { status: 400 }
      );
    }

    // Create lead
    const { data: newLead, error: createError } = await supabase
      .from('leads')
      .insert({
        customer_id: customer.id,
        name: body.name,
        phone: body.phone,
        email: body.email,
        lead_data: {
          property: body.property || '',
          budget: body.budget || '',
          location: body.location || '',
          timeline: body.timeline || '',
        },
        quality_score: body.quality_score || 75,
        status: 'new',
        source: 'manual_entry',
        intent: 'warm',
        city: body.city || '',
        state: body.state || '',
      })
      .select()
      .single();

    if (createError) {
      console.error('Create lead error:', createError);
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: customer.id,
      type: 'new_lead',
      title: 'New Lead Added',
      message: `${body.name} has been added to your leads`,
      lead_id: newLead.id,
      priority: 'normal',
    });

    return NextResponse.json({
      success: true,
      lead: newLead,
    });

  } catch (error: any) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


