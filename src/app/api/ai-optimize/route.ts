import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * AI Ad Optimization API
 * Analyzes ad performance and generates optimization recommendations
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
    const { performanceData } = body;

    if (!performanceData) {
      return NextResponse.json(
        createErrorResponse('Performance data is required'),
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

    // Build optimization prompt
    const prompt = `You are an ad campaign optimization expert for Transition Marketing AI. Analyze this ad performance data and provide optimization recommendations.

Your response must be structured JSON with the following format:
{
  "campaignsToScale": [
    {
      "campaignName": "string",
      "platform": "Google|Meta",
      "currentCPL": number,
      "currentCTR": number,
      "recommendedBudgetIncrease": number,
      "reason": "string"
    }
  ],
  "campaignsToPause": [
    {
      "campaignName": "string",
      "platform": "Google|Meta",
      "currentCPL": number,
      "currentCTR": number,
      "reason": "string"
    }
  ],
  "budgetRedistribution": {
    "totalBudget": number,
    "allocations": [
      {
        "campaignName": "string",
        "platform": "Google|Meta",
        "currentBudget": number,
        "recommendedBudget": number,
        "percentageChange": number
      }
    ]
  },
  "targetingRecommendations": [
    {
      "campaignName": "string",
      "recommendation": "string",
      "expectedImpact": "string"
    }
  ],
  "creativeRecommendations": [
    {
      "campaignName": "string",
      "recommendation": "string",
      "reason": "string"
    }
  ]
}

Performance Data:
${JSON.stringify(performanceData, null, 2)}

Focus on:
- CPL (Cost Per Lead) optimization
- CTR (Click-Through Rate) improvement
- Conversion rate maximization
- Budget efficiency
- ROI improvement

Provide specific, actionable recommendations.`;

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
            content: 'You are an expert ad campaign optimizer. Provide data-driven optimization recommendations in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('[AI Optimize] OpenAI API error:', errorData);
      return NextResponse.json(
        createErrorResponse('Failed to get AI optimization'),
        { status: 500 }
      );
    }

    const aiData = await openaiResponse.json();
    let optimizationResult;
    
    try {
      optimizationResult = JSON.parse(aiData.choices?.[0]?.message?.content || '{}');
    } catch (parseError) {
      const rawContent = aiData.choices?.[0]?.message?.content || 'No response generated.';
      optimizationResult = {
        campaignsToScale: [],
        campaignsToPause: [],
        budgetRedistribution: { totalBudget: 0, allocations: [] },
        targetingRecommendations: [],
        creativeRecommendations: [],
        rawResponse: rawContent,
      };
    }

    // Fire analytics event
    trackEvent('ai_recommendations_generated', {
      event_category: 'ads',
      event_label: 'ai_optimization',
      campaigns_to_scale: optimizationResult.campaignsToScale?.length || 0,
      campaigns_to_pause: optimizationResult.campaignsToPause?.length || 0,
    });

    return NextResponse.json(
      createSuccessResponse({
        recommendations: optimizationResult,
        generatedAt: new Date().toISOString(),
      })
    );
  } catch (error: any) {
    console.error('[AI Optimize] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


