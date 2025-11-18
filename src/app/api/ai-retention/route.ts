import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * AI Retention Analysis API
 * Analyzes client portfolio for churn risk and upsell potential
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
    const { clientData } = body;

    if (!clientData || !Array.isArray(clientData)) {
      return NextResponse.json(
        createErrorResponse('Client data array is required'),
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

    // Build prompt for retention analysis
    const prompt = `Analyze this client portfolio and for each client, provide churn risk, upsell potential, and recommendations.

Your response must be structured JSON with this format:
{
  "clients": [
    {
      "clientId": "string",
      "clientName": "string",
      "churnRisk": "High|Medium|Low",
      "upsellPotential": "High|Medium|Low",
      "lifetimeValueTrend": "↑|↓|→",
      "recommendedAction": "One-line action recommendation",
      "reasoning": "Brief explanation"
    }
  ],
  "portfolioSummary": {
    "totalClients": number,
    "atRiskCount": number,
    "upsellOpportunities": number,
    "avgLTV": number,
    "churnRiskDistribution": {
      "High": number,
      "Medium": number,
      "Low": number
    }
  },
  "recommendations": [
    {
      "priority": "High|Medium|Low",
      "action": "Specific recommendation",
      "expectedImpact": "Expected outcome"
    }
  ]
}

Client Data:
${JSON.stringify(clientData, null, 2)}

Consider:
- Payment history (success/fail patterns)
- Support ticket frequency
- Engagement level (leads delivered)
- Time since last activity
- Renewal date proximity
- Industry trends
- MRR stability`;

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
            content: 'You are a customer success and retention expert. Provide accurate churn risk assessments and upsell recommendations in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('[AI Retention] OpenAI API error:', errorData);
      return NextResponse.json(
        createErrorResponse('Failed to analyze retention'),
        { status: 500 }
      );
    }

    const aiData = await openaiResponse.json();
    let analysisResult;
    
    try {
      analysisResult = JSON.parse(aiData.choices?.[0]?.message?.content || '{}');
    } catch (parseError) {
      analysisResult = {
        clients: [],
        portfolioSummary: {
          totalClients: 0,
          atRiskCount: 0,
          upsellOpportunities: 0,
          avgLTV: 0,
          churnRiskDistribution: { High: 0, Medium: 0, Low: 0 },
        },
        recommendations: [],
      };
    }

    // Fire analytics event
    trackEvent('retention_analysis_run', {
      event_category: 'retention',
      event_label: 'ai_retention_analysis',
      total_clients: analysisResult.portfolioSummary?.totalClients || 0,
      at_risk: analysisResult.portfolioSummary?.atRiskCount || 0,
    });

    return NextResponse.json(
      createSuccessResponse({
        analysis: analysisResult,
        generatedAt: new Date().toISOString(),
      })
    );
  } catch (error: any) {
    console.error('[AI Retention] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


