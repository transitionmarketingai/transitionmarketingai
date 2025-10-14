import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch verified leads (segregated by source)
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

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
    const source = searchParams.get('source'); // 'outreach_response', 'meta_ads', 'google_ads', 'all'
    const status = searchParams.get('status');
    const intent = searchParams.get('intent');
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

    // Filter by source
    if (source && source !== 'all') {
      query = query.eq('source', source);
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (intent && intent !== 'all') {
      query = query.eq('intent', intent);
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

    // Get statistics by source
    const { data: allLeads } = await supabase
      .from('leads')
      .select('source, status, intent')
      .eq('customer_id', customer.id);

    const statistics = {
      total: allLeads?.length || 0,
      by_source: {
        outreach: allLeads?.filter(l => l.source === 'outreach_response').length || 0,
        meta_ads: allLeads?.filter(l => l.source === 'meta_ads').length || 0,
        google_ads: allLeads?.filter(l => l.source === 'google_ads').length || 0,
      },
      by_status: {
        new: allLeads?.filter(l => l.status === 'new').length || 0,
        contacted: allLeads?.filter(l => l.status === 'contacted').length || 0,
        qualified: allLeads?.filter(l => l.status === 'qualified').length || 0,
        won: allLeads?.filter(l => l.status === 'won').length || 0,
      },
      by_intent: {
        hot: allLeads?.filter(l => l.intent === 'hot').length || 0,
        warm: allLeads?.filter(l => l.intent === 'warm').length || 0,
        cold: allLeads?.filter(l => l.intent === 'cold').length || 0,
      },
    };

    return NextResponse.json({
      leads,
      total: leads?.length || 0,
      limit,
      offset,
      statistics,
    });

  } catch (error: any) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Manually create lead (rare, mostly auto-created)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

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

    // Validate
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Check duplicates
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('customer_id', customer.id)
      .or(`phone.eq.${body.phone}${body.email ? `,email.eq.${body.email}` : ''}`)
      .single();

    if (existingLead) {
      return NextResponse.json(
        { error: 'Lead with this phone/email already exists' },
        { status: 409 }
      );
    }

    // Create lead
    const { data: newLead, error: createError } = await supabase
      .from('leads')
      .insert({
        customer_id: customer.id,
        name: body.name,
        email: body.email || null,
        phone: body.phone,
        source: 'manual_entry',
        lead_data: body.lead_data || {},
        quality_score: body.quality_score || 70,
        intent: body.intent || 'warm',
        status: 'new',
        city: body.city || null,
        state: body.state || null,
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

    // Create conversation automatically
    await supabase.from('conversations').insert({
      lead_id: newLead.id,
      customer_id: customer.id,
      channel: 'platform_chat',
      status: 'open',
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

