import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sentimentAnalyzer } from '@/lib/ai/sentimentAnalyzer';

// POST - Analyze sentiment of lead messages
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
    if (!body.leadId || !body.message) {
      return NextResponse.json(
        { error: 'Lead ID and message are required' },
        { status: 400 }
      );
    }

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', body.leadId)
      .eq('customer_id', customer.id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Get previous messages for context
    const { data: messages } = await supabase
      .from('messages')
      .select('message_text, sender, sent_at')
      .eq('lead_id', body.leadId)
      .order('sent_at', { ascending: true })
      .limit(10);

    // Analyze sentiment
    const sentiment = await sentimentAnalyzer.analyzeSentiment(
      body.message,
      body.leadId,
      customer.industry,
      messages?.map(m => m.message_text) || []
    );

    // Save sentiment analysis to database
    const { error: saveError } = await supabase
      .from('messages')
      .insert({
        lead_id: body.leadId,
        customer_id: customer.id,
        conversation_id: body.conversationId || null,
        message_text: body.message,
        sender: 'lead',
        channel: 'platform',
        status: 'sent',
        delivery_status: {
          sentiment: sentiment.sentiment,
          confidence: sentiment.confidence,
          emotions: sentiment.emotions,
          intent: sentiment.intent,
          keywords: sentiment.keywords,
          recommendations: sentiment.recommendations,
          nextAction: sentiment.nextAction,
        },
        sent_at: new Date().toISOString(),
      });

    if (saveError) {
      console.error('Save message error:', saveError);
      return NextResponse.json(
        { error: 'Failed to save message analysis' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sentiment,
    });

  } catch (error: any) {
    console.error('Sentiment analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get behavior analysis for a lead
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const leadId = searchParams.get('leadId');
    
    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

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

    // Get all messages for the lead
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('lead_id', leadId)
      .eq('customer_id', customer.id)
      .order('sent_at', { ascending: true });

    if (messagesError) {
      console.error('Fetch messages error:', messagesError);
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      );
    }

    // Generate behavior analysis
    const behaviorAnalysis = await sentimentAnalyzer.generateBehaviorAnalysis(
      leadId,
      customer.industry,
      messages || []
    );

    return NextResponse.json({
      success: true,
      behaviorAnalysis,
    });

  } catch (error: any) {
    console.error('Behavior analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
