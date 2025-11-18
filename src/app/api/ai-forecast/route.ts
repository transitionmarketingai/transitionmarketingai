import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * AI Forecast API
 * Generates AI-powered forecasts for leads, revenue, and churn
 * Requires admin authentication OR cron secret
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
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        createErrorResponse('Data is required'),
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

    // Build comprehensive prompt for forecasting
    const prompt = `You are Transition Marketing AI's business analyst. Analyze the past 6-12 months of data and provide predictions for the next 3 months.

Your response must be structured JSON with the following format:
{
  "forecast": {
    "nextMonth": {
      "leads": number,
      "conversionRate": number,
      "mrr": number,
      "churnRate": number
    },
    "next3Months": {
      "leads": [number, number, number],
      "revenue": [number, number, number],
      "conversionRates": [number, number, number]
    },
    "growthRate": number,
    "churnProbability": {
      "byIndustry": {
        "Real Estate": number,
        "Insurance": number,
        "Education": number,
        "Healthcare": number
      }
    }
  },
  "insights": [
    "First key insight about trends",
    "Second insight about opportunities",
    "Third insight about risks"
  ],
  "recommendations": [
    {
      "action": "Specific actionable recommendation",
      "impact": "Expected impact description",
      "priority": "High|Medium|Low"
    }
  ],
  "adBudgetAdjustment": {
    "percentage": number,
    "reason": "Why this adjustment is recommended"
  }
}

Historical Data:
${JSON.stringify(data, null, 2)}

Provide realistic, data-driven forecasts. Consider seasonality, trends, and growth patterns.`;

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
            content: 'You are a business analyst for Transition Marketing AI, an AI-powered lead generation company. Provide accurate, data-driven forecasts in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('[AI Forecast] OpenAI API error:', errorData);
      return NextResponse.json(
        createErrorResponse('Failed to get AI forecast'),
        { status: 500 }
      );
    }

    const aiData = await openaiResponse.json();
    let forecastResult;
    
    try {
      forecastResult = JSON.parse(aiData.choices?.[0]?.message?.content || '{}');
    } catch (parseError) {
      // Fallback if JSON parsing fails
      const rawContent = aiData.choices?.[0]?.message?.content || 'No response generated.';
      forecastResult = {
        forecast: {
          nextMonth: {
            leads: 0,
            conversionRate: 0,
            mrr: 0,
            churnRate: 0,
          },
        },
        insights: ['Unable to parse AI response'],
        recommendations: [],
        rawResponse: rawContent,
      };
    }

    // Fire analytics event
    trackEvent('forecast_generated_ai', {
      event_category: 'forecast',
      event_label: 'ai_forecast_generated',
      is_cron_call: isCronCall,
    });

    return NextResponse.json(
      createSuccessResponse({
        forecast: forecastResult,
        generatedAt: new Date().toISOString(),
      })
    );
  } catch (error: any) {
    console.error('[AI Forecast] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


