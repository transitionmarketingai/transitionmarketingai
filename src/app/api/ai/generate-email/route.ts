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

    const { prospect_id } = await request.json();

    if (!prospect_id) {
      return NextResponse.json({ error: 'Prospect ID required' }, { status: 400 });
    }

    // Get prospect details
    const { data: prospect } = await supabase
      .from('ai_prospects')
      .select('*, customers(onboarding_data)')
      .eq('id', prospect_id)
      .single();

    if (!prospect) {
      return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });
    }

    const userBusiness = prospect.customers?.onboarding_data;

    if (!userBusiness) {
      return NextResponse.json({ error: 'Business info not found' }, { status: 400 });
    }

    // Generate personalized email using GPT-4
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert B2B cold email writer. Write highly personalized, conversational cold emails that get responses.

Rules:
- Keep it under 100 words
- Personalize using prospect's company name and industry
- Focus on their pain points, not your features
- Use conversational, friendly tone (not salesy)
- Include one clear CTA (schedule a call)
- Subject line should be intriguing but not clickbait

Return JSON: { "subject": "...", "body": "..." }`,
        },
        {
          role: 'user',
          content: `Write a cold email to:

Prospect: ${prospect.name}
Company: ${prospect.company}
Industry: ${prospect.industry}
Location: ${prospect.location}

About:
Sender business: ${userBusiness.businessName}
Sender industry: ${userBusiness.industry}
What they sell: ${userBusiness.whatYouSell}
Target customer pain point: ${userBusiness.painPoint || 'generating consistent leads'}

Make it highly personalized and natural. Reference their specific industry or location if relevant.`,
        },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const emailData = JSON.parse(completion.choices[0].message.content || '{}');

    // Save generated email
    const { data: savedEmail, error: emailError } = await supabase
      .from('ai_generated_emails')
      .insert({
        prospect_id,
        customer_id: prospect.customer_id,
        subject: emailData.subject,
        body: emailData.body,
        generated_at: new Date().toISOString(),
        status: 'pending_approval',
      })
      .select()
      .single();

    if (emailError) {
      console.error('Save email error:', emailError);
      return NextResponse.json({ error: 'Failed to save email' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      email: savedEmail,
    });
  } catch (error) {
    console.error('Email generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

