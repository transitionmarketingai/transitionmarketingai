import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing inquiry ID' },
        { status: 400 }
      );
    }

    // 1) Load inquiry from Supabase
    const { data: inquiry, error } = await supabase
      .from('verified_inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // 2) Build a concise prompt with key fields
    const prompt = `
You are an assistant that scores how likely a lead is to be high-intent and genuinely interested in buying.

Lead data:
- Name: ${inquiry.name || 'N/A'}
- Industry: ${inquiry.industry || 'N/A'}
- Requirement: ${inquiry.requirement || 'N/A'}
- Budget: ${inquiry.budget || 'N/A'}
- Timeline: ${inquiry.timeline || 'N/A'}
- Source: ${inquiry.source || 'N/A'}

Return a JSON object with:
- "score": integer from 0 to 100 (higher means stronger intent)
- "reason": a one-sentence explanation.

Respond with ONLY valid JSON. No extra text.
`;

    // 3) Call OpenAI
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a precise scoring assistant.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      }),
    });

    const openaiJson = await openaiRes.json();

    const raw = openaiJson.choices?.[0]?.message?.content || '{}';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = { score: 50, reason: 'Fallback score due to parse error.' };
    }

    const score = typeof parsed.score === 'number' ? parsed.score : 50;
    const reason = parsed.reason || 'No reason provided.';

    // Save AI result to Supabase
    await supabase
      .from('verified_inquiries')
      .update({
        ai_score: score,
        ai_reason: reason,
        ai_scored_at: new Date().toISOString(),
      })
      .eq('id', inquiry.id);

    return NextResponse.json({
      success: true,
      score,
      reason,
    });
  } catch (err) {
    console.error('AI score error:', err);
    return NextResponse.json(
      { success: false, error: 'AI scoring failed' },
      { status: 500 }
    );
  }
}

