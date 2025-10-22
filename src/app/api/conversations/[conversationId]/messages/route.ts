import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch messages for a conversation
export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
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

    // Verify conversation belongs to customer
    const { data: conversation } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', params.conversationId)
      .eq('customer_id', customer.id)
      .single();

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Fetch messages
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', params.conversationId)
      .order('sent_at', { ascending: true });

    if (error) {
      console.error('Fetch messages error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      );
    }

    // Mark messages as read
    await supabase
      .from('messages')
      .update({ status: 'read', read_at: new Date().toISOString() })
      .eq('conversation_id', params.conversationId)
      .eq('sender', 'lead')
      .eq('status', 'delivered');

    // Reset unread count
    await supabase
      .from('conversations')
      .update({ unread_count: 0 })
      .eq('id', params.conversationId);

    return NextResponse.json({
      messages: messages || [],
      total: messages?.length || 0,
    });

  } catch (error: any) {
    console.error('Messages API error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Send message in conversation
export async function POST(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const body = await request.json();
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

    if (!body.message_text) {
      return NextResponse.json(
        { error: 'message_text is required' },
        { status: 400 }
      );
    }

    // Get conversation with lead
    const { data: conversation } = await supabase
      .from('conversations')
      .select('*, leads(*)')
      .eq('id', params.conversationId)
      .eq('customer_id', customer.id)
      .single();

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Create message
    const { data: message, error: createError } = await supabase
      .from('messages')
      .insert({
        conversation_id: params.conversationId,
        lead_id: conversation.lead_id,
        customer_id: customer.id,
        sender: 'customer',
        message_text: body.message_text,
        channel: conversation.channel,
        status: 'sent',
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('Send message error:', createError);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Update conversation
    await supabase
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        last_message_preview: body.message_text,
      })
      .eq('id', params.conversationId);

    // Update lead contact history
    await supabase
      .from('leads')
      .update({
        last_contact_at: new Date().toISOString(),
        contact_count: supabase.rpc('increment', { row_id: conversation.lead_id }),
      })
      .eq('id', conversation.lead_id);

    // TODO: Send actual message via WhatsApp/Email if channel is not platform_chat
    // This will be implemented in Phase 5 (Bulk Outreach)

    return NextResponse.json({
      success: true,
      message,
    });

  } catch (error: any) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

