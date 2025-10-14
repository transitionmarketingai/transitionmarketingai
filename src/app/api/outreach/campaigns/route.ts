import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch outreach campaigns
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

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'whatsapp' or 'email'
    const status = searchParams.get('status');

    let query = supabase
      .from('outreach_campaigns')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: campaigns, error } = await query;

    if (error) {
      console.error('Fetch campaigns error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch campaigns' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      campaigns: campaigns || [],
      total: campaigns?.length || 0,
    });

  } catch (error: any) {
    console.error('Outreach campaigns API error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new outreach campaign
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
    if (!body.name || !body.type || !body.message_template) {
      return NextResponse.json(
        { error: 'Name, type, and message_template are required' },
        { status: 400 }
      );
    }

    // Get target contacts based on filters or specific IDs
    let targetContacts: any[] = [];
    
    if (body.target_type === 'filter' && body.target_filters) {
      // Build query based on filters
      let contactQuery = supabase
        .from('contacts')
        .select('id')
        .eq('customer_id', customer.id)
        .eq('converted_to_lead', false); // Only contacts not yet converted

      const filters = body.target_filters;
      
      if (filters.min_quality_score) {
        contactQuery = contactQuery.gte('quality_score', filters.min_quality_score);
      }
      
      if (filters.outreach_status) {
        contactQuery = contactQuery.eq('outreach_status', filters.outreach_status);
      }
      
      if (filters.city) {
        contactQuery = contactQuery.eq('city', filters.city);
      }

      const { data: contacts } = await contactQuery;
      targetContacts = contacts || [];
    } else if (body.target_type === 'selected' && body.target_contact_ids) {
      targetContacts = body.target_contact_ids.map((id: string) => ({ id }));
    } else if (body.target_type === 'all') {
      const { data: contacts } = await supabase
        .from('contacts')
        .select('id')
        .eq('customer_id', customer.id)
        .eq('converted_to_lead', false);
      targetContacts = contacts || [];
    }

    // Create campaign
    const { data: campaign, error: createError } = await supabase
      .from('outreach_campaigns')
      .insert({
        customer_id: customer.id,
        name: body.name,
        type: body.type,
        status: body.schedule_type === 'immediate' ? 'running' : 'scheduled',
        target_type: body.target_type || 'all',
        target_filters: body.target_filters || {},
        target_contact_ids: targetContacts.map(c => c.id),
        message_template: body.message_template,
        subject: body.subject || null,
        variables: body.variables || {},
        schedule_type: body.schedule_type || 'immediate',
        schedule_date: body.schedule_date || null,
        daily_limit: body.daily_limit || 100,
        total_limit: body.total_limit || null,
        total_recipients: targetContacts.length,
        auto_convert_responders: body.auto_convert_responders !== false,
        launched_at: body.schedule_type === 'immediate' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (createError) {
      console.error('Create campaign error:', createError);
      return NextResponse.json(
        { error: 'Failed to create campaign' },
        { status: 500 }
      );
    }

    // If immediate, create outreach messages
    if (body.schedule_type === 'immediate') {
      // TODO: This will be handled by a background job/queue
      // For now, just create the campaign and messages will be sent by worker
    }

    return NextResponse.json({
      success: true,
      campaign,
      target_count: targetContacts.length,
    });

  } catch (error: any) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

