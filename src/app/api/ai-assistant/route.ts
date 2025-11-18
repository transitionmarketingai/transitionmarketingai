import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * AI Assistant API
 * Provides AI-powered summaries, replies, and analysis
 * Requires admin authentication OR cron secret (for internal service calls)
 */
// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 20;

function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetAt) {
    // Reset or create new record
    rateLimitMap.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Check for admin authentication OR cron secret (for internal service calls)
    const cronSecret = request.headers.get('authorization')?.replace('Bearer ', '');
    const expectedCronSecret = process.env.CRON_SECRET;
    const isCronCall = expectedCronSecret && cronSecret === expectedCronSecret;
    
    // If not a cron call, require admin authentication
    if (!isCronCall) {
      const authError = requireAdmin(request);
      if (authError) {
        return authError;
      }

      // Rate limiting for admin users (skip for cron calls)
      const clientIp = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown';
      const rateLimit = checkRateLimit(clientIp);
      
      if (!rateLimit.allowed) {
        return NextResponse.json(
          createErrorResponse(`Rate limit exceeded. Please try again after ${rateLimit.retryAfter} seconds.`),
          { 
            status: 429,
            headers: {
              'Retry-After': rateLimit.retryAfter?.toString() || '60',
            },
          }
        );
      }
    }

    const body = await request.json();
    const { type, content } = body;

    if (!type || !content) {
      return NextResponse.json(
        createErrorResponse('Type and content are required'),
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

    // Build prompt based on type
    let prompt = '';
    let eventLabel = '';

    switch (type) {
      case 'ticket-summary':
        prompt = `Summarize this support ticket thread into 3-4 bullet points and list next action items. Be concise and actionable:\n\n${content}`;
        eventLabel = 'ticket_summary';
        break;

      case 'ticket-reply':
        prompt = `Write a short, polite, professional reply to this client support message. Keep it friendly but concise (2-3 sentences max):\n\n${content}`;
        eventLabel = 'ticket_reply';
        break;

      case 'lead-analysis':
        prompt = `Analyze this lead information and provide:
1. Intent level (High/Medium/Low) with reasoning
2. Estimated budget range (if mentioned)
3. Recommended next step (e.g., "Book strategy call", "Send case study", "Follow up in 1 week")
4. Lead confidence score (0-100) based on available information

Lead information:\n${content}`;
        eventLabel = 'lead_analysis';
        break;

      case 'daily-digest':
        prompt = `Analyze this daily operations data and provide:
1. Top 3 key insights
2. 2 recommended improvement actions
3. Any urgent items that need attention

Data:\n${content}`;
        eventLabel = 'daily_digest';
        break;

      case 'task-suggestion':
        prompt = `Based on this task description, suggest the best next action step. Be specific and actionable:\n\n${content}`;
        eventLabel = 'task_suggestion';
        break;

      default:
        return NextResponse.json(
          createErrorResponse('Invalid type. Must be: ticket-summary, ticket-reply, lead-analysis, daily-digest, or task-suggestion'),
          { status: 400 }
        );
    }

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
            content: 'You are a helpful assistant for Transition Marketing AI, an AI-powered lead generation company. Provide concise, actionable insights.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('[AI Assistant] OpenAI API error:', errorData);
      return NextResponse.json(
        createErrorResponse('Failed to get AI response'),
        { status: 500 }
      );
    }

    const aiData = await openaiResponse.json();
    const result = aiData.choices?.[0]?.message?.content || 'No response generated.';

    // Log to Airtable (optional)
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const aiLogsTableName = process.env.AIRTABLE_AI_LOGS_TABLE_NAME || 'AI_Logs';

    if (airtableApiKey && airtableBaseId) {
      try {
        await fetch(
          `https://api.airtable.com/v0/${airtableBaseId}/${aiLogsTableName}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${airtableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              records: [
                {
                  fields: {
                    Type: type,
                    Prompt: prompt.substring(0, 1000), // Truncate if too long
                    Response: result.substring(0, 1000),
                    Created: new Date().toISOString(),
                  },
                },
              ],
            }),
          }
        );
      } catch (logError) {
        console.error('[AI Assistant] Error logging to Airtable:', logError);
        // Continue even if logging fails
      }
    }

    // Fire analytics event
    trackEvent(`ai_${eventLabel}_generated`, {
      event_category: 'ai',
      event_label: eventLabel,
      type,
    });

    return NextResponse.json(
      createSuccessResponse({
        result,
        type,
      })
    );
  } catch (error: any) {
    console.error('[AI Assistant] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}



