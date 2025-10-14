import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch all conversations for customer
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
    const status = searchParams.get('status');

    let query = supabase
      .from('conversations')
      .select(`
        *,
        leads (
          id,
          name,
          phone,
          email,
          source,
          quality_score,
          intent,
          status
        )
      `)
      .eq('customer_id', customer.id)
      .order('last_message_at', { ascending: false, nullsFirst: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: conversations, error } = await query;

    if (error) {
      console.error('Fetch conversations error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch conversations' },
        { status: 500 }
      );
    }

    // Get unread count
    const unreadCount = conversations?.filter(c => c.unread_count > 0).length || 0;

    return NextResponse.json({
      conversations: conversations || [],
      total: conversations?.length || 0,
      unread_count: unreadCount,
    });

  } catch (error: any) {
    console.error('Conversations API error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new conversation (usually auto-created with lead)
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

    if (!body.lead_id) {
      return NextResponse.json(
        { error: 'lead_id is required' },
        { status: 400 }
      );
    }

    // Check if conversation already exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('lead_id', body.lead_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Conversation already exists for this lead' },
        { status: 409 }
      );
    }

    // Create conversation
    const { data: conversation, error: createError } = await supabase
      .from('conversations')
      .insert({
        lead_id: body.lead_id,
        customer_id: customer.id,
        channel: body.channel || 'platform_chat',
        status: 'open',
      })
      .select()
      .single();

    if (createError) {
      console.error('Create conversation error:', createError);
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      conversation,
    });

  } catch (error: any) {
    console.error('Create conversation error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

