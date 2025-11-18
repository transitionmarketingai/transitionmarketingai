import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * AI Follow-Up Generator
 * Generates AI-powered follow-up messages for deals
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { deal, context } = body;

    if (!deal) {
      return NextResponse.json(
        createErrorResponse('Deal information is required'),
        { status: 400 }
      );
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    const aiModel = process.env.AI_ASSISTANT_MODEL || 'gpt-4o-mini';

    if (!openaiApiKey) {
      return NextResponse.json(
        createErrorResponse('OpenAI API key not configured'),
        { status: 500 }
      );
    }

    // Build prompt for follow-up message
    const prompt = `Write a short, persuasive follow-up message for a client about this deal.

Deal Information:
- Client: ${deal.client || 'Client'}
- Stage: ${deal.stage || 'Unknown'}
- Value: ₹${deal.value || 0}
- Next Action: ${deal.nextAction || 'Follow up'}
- Context: ${context || 'Standard follow-up'}

Requirements:
- Tone: confident, concise, friendly
- Length: 2-3 sentences
- Include a call-to-action to schedule a final call or meeting
- Be professional but warm
- Reference the value proposition if relevant

Write the message:`;

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiModel,
        messages: [
          {
            role: 'system',
            content: 'You are a sales communication expert for Transition Marketing AI. Write persuasive, professional follow-up messages.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 200,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('[AI Follow-Up] OpenAI API error:', errorData);
      return NextResponse.json(
        createErrorResponse('Failed to generate follow-up message'),
        { status: 500 }
      );
    }

    const aiData = await openaiResponse.json();
    const message = aiData.choices?.[0]?.message?.content || 'No message generated.';

    // Fire analytics event
    trackEvent('ai_followup_generated', {
      event_category: 'sales',
      event_label: 'ai_followup',
      deal_id: deal.dealId || deal.id,
      stage: deal.stage,
    });

    return NextResponse.json(
      createSuccessResponse({
        message,
        generatedAt: new Date().toISOString(),
      })
    );
  } catch (error: any) {
    console.error('[AI Follow-Up] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


