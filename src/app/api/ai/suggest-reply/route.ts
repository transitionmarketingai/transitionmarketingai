import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { conversation_id, latest_message } = await request.json();

    if (!conversation_id || !latest_message) {
      return NextResponse.json({ error: 'Conversation ID and message required' }, { status: 400 });
    }

    // Get conversation history
    const { data: conversation } = await supabase
      .from('conversations')
      .select('*, messages(*), leads(*), customers(onboarding_data)')
      .eq('id', conversation_id)
      .single();

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const userBusiness = conversation.customers?.onboarding_data;
    const messages = conversation.messages || [];

    // Analyze sentiment and intent
    const openai = getOpenAIClient();
    const analysisCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Analyze this message from a prospect and return JSON:
{
  "sentiment": "positive"|"neutral"|"negative",
  "intent": "ready_to_buy"|"interested"|"just_looking"|"not_interested",
  "buying_signals": ["list", "of", "signals"],
  "objections": ["list", "of", "concerns"],
  "next_action": "schedule_meeting"|"send_pricing"|"send_case_study"|"follow_up_later"|"close_conversation"
}`,
        },
        {
          role: 'user',
          content: `Analyze: "${latest_message}"`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(analysisCompletion.choices[0].message.content || '{}');

    // Generate reply suggestions
    const replyCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a sales assistant helping to reply to prospect messages. 
Generate 3 different reply options:
1. Short & Direct (1-2 sentences)
2. Detailed & Helpful (3-4 sentences)
3. Question-based (ask clarifying question)

We sell: "${userBusiness?.whatYouSell || 'our product'}"
Prospect asked: "${latest_message}"

Return JSON: { "short": "...", "detailed": "...", "question": "..." }`,
        },
        {
          role: 'user',
          content: `Based on their message and ${analysis.intent} intent, suggest 3 replies.`,
        },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const suggestions = JSON.parse(replyCompletion.choices[0].message.content || '{}');

    return NextResponse.json({
      analysis: {
        sentiment: analysis.sentiment || 'neutral',
        intent: analysis.intent || 'interested',
        buying_signals: analysis.buying_signals || [],
        objections: analysis.objections || [],
        next_action: analysis.next_action || 'follow_up_later',
      },
      suggestions: [
        { type: 'short', text: suggestions.short || '' },
        { type: 'detailed', text: suggestions.detailed || '' },
        { type: 'question', text: suggestions.question || '' },
      ],
    });
  } catch (error) {
    console.error('AI reply suggestion error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

