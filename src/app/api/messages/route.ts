import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch messages for a lead
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json(
        { error: 'leadId is required' },
        { status: 400 }
      );
    }

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

    // Fetch messages
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('lead_id', leadId)
      .eq('customer_id', customer.id)
      .order('sent_at', { ascending: true });

    if (error) {
      console.error('Fetch messages error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages });

  } catch (error: any) {
    console.error('Messages API error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Send message to lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, message, channel } = body;

    if (!leadId || !message) {
      return NextResponse.json(
        { error: 'leadId and message are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

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

    // Verify lead belongs to customer
    const { data: lead } = await supabase
      .from('leads')
      .select('id')
      .eq('id', leadId)
      .eq('customer_id', customer.id)
      .single();

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found or access denied' },
        { status: 404 }
      );
    }

    // Create message
    const { data: newMessage, error } = await supabase
      .from('messages')
      .insert({
        lead_id: leadId,
        customer_id: customer.id,
        message_text: message,
        sender: 'customer',
        channel: channel || 'platform',
        status: 'sent',
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Send message error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Update lead's last contact time
    await supabase
      .from('leads')
      .update({
        last_contact_at: new Date().toISOString(),
        contact_count: supabase.rpc('increment', { row_id: leadId }),
        status: 'contacted', // Auto-update status
      })
      .eq('id', leadId);

    return NextResponse.json({
      success: true,
      message: newMessage,
    });

  } catch (error: any) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


