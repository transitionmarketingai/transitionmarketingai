import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * AI Deal Scoring API
 * Scores deals and predicts close probability
 * Requires admin authentication OR can be called automatically
 */
export async function POST(request: NextRequest) {
  try {
    // Check for admin authentication OR cron secret
    const cronSecret = request.headers.get('authorization')?.replace('Bearer ', '');
    const expectedCronSecret = process.env.CRON_SECRET;
    const isCronCall = expectedCronSecret && cronSecret === expectedCronSecret;
    
    // If not a cron call, require admin authentication
    if (!isCronCall) {
      const authError = requireAdmin(request);
      if (authError) {
        return authError;
      }
    }

    const body = await request.json();
    const { deal, engagementHistory } = body;

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

    // Build prompt for deal scoring
    const prompt = `Analyze this sales deal and provide a close probability score (0-100) and recommended next action.

Deal Information:
- Client: ${deal.client || 'Unknown'}
- Stage: ${deal.stage || 'Unknown'}
- Value: ₹${deal.value || 0}
- Owner: ${deal.owner || 'Unassigned'}
- Industry: ${deal.industry || 'Unknown'}
- Days in Pipeline: ${deal.daysInPipeline || 0}
- Last Activity: ${deal.lastActivity || 'Unknown'}

Engagement History:
${engagementHistory ? JSON.stringify(engagementHistory, null, 2) : 'No engagement history available'}

Your response must be JSON with this format:
{
  "probability": number (0-100),
  "nextAction": "Specific actionable recommendation",
  "reasoning": "Brief explanation of the score"
}

Consider:
- Stage progression
- Time in pipeline
- Engagement level
- Deal value
- Industry trends
- Similar historical deals`;

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
            content: 'You are a sales analytics expert. Provide accurate deal probability scores and actionable recommendations in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 300,
        response_format: { type: 'json_object' },
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('[AI Deal Score] OpenAI API error:', errorData);
      return NextResponse.json(
        createErrorResponse('Failed to score deal'),
        { status: 500 }
      );
    }

    const aiData = await openaiResponse.json();
    let scoreResult;
    
    try {
      scoreResult = JSON.parse(aiData.choices?.[0]?.message?.content || '{}');
    } catch (parseError) {
      scoreResult = {
        probability: 50,
        nextAction: 'Follow up with client',
        reasoning: 'Unable to parse AI response',
      };
    }

    return NextResponse.json(
      createSuccessResponse({
        probability: scoreResult.probability || 50,
        nextAction: scoreResult.nextAction || 'Follow up with client',
        reasoning: scoreResult.reasoning || '',
      })
    );
  } catch (error: any) {
    console.error('[AI Deal Score] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


