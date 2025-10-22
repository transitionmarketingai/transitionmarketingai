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

    // Get user's target criteria from onboarding
    const { data: customer } = await supabase
      .from('customers')
      .select('*, onboarding_data')
      .eq('user_id', user.id)
      .single();

    if (!customer?.onboarding_data) {
      return NextResponse.json({ error: 'Onboarding not completed' }, { status: 400 });
    }

    const criteria = customer.onboarding_data;

    // TODO: In production, use Apify to scrape Google Maps, LinkedIn, etc.
    // For now, using mock data with AI scoring
    
    const mockProspects = [
      {
        name: 'Rajesh Kumar',
        company: 'Tech Solutions Pvt Ltd',
        industry: criteria.targetIndustry || 'Software',
        location: criteria.targetLocation || 'Mumbai',
        email: 'rajesh@techsolutions.in',
        phone: '+91 98765 43210',
        website: 'https://techsolutions.in',
        employees: '50-100',
        linkedin: 'https://linkedin.com/company/techsolutions',
      },
      // Add more mock prospects...
    ];

    // AI Scoring using GPT-4
    const openai = getOpenAIClient();
    const prospects = [];
    for (const prospect of mockProspects.slice(0, 10)) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an AI lead qualification expert. Score prospects from 0-100 based on how well they match the ideal customer profile.
              
Consider:
- Industry match
- Location match
- Company size
- Business signals (website quality, LinkedIn presence)
- Likelihood to be interested in: "${criteria.whatYouSell}"

Return JSON: { "score": 0-100, "intent": "hot"|"warm"|"cold", "reasoning": "brief explanation" }`,
            },
            {
              role: 'user',
              content: `Score this prospect:
Name: ${prospect.name}
Company: ${prospect.company}
Industry: ${prospect.industry}
Location: ${prospect.location}
Employees: ${prospect.employees}

Ideal customer: ${criteria.targetIndustry} in ${criteria.targetLocation}
We sell: ${criteria.whatYouSell}`,
            },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        });

        const aiScore = JSON.parse(completion.choices[0].message.content || '{}');

        if (aiScore.score >= 70) {
          prospects.push({
            ...prospect,
            score: aiScore.score,
            intent: aiScore.intent,
            ai_reasoning: aiScore.reasoning,
            customer_id: customer.id,
            found_at: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('AI scoring error:', error);
        // Fallback to default score
        prospects.push({
          ...prospect,
          score: 75,
          intent: 'warm',
          ai_reasoning: 'Moderate match to criteria',
          customer_id: customer.id,
          found_at: new Date().toISOString(),
        });
      }
    }

    // Save to database
    const { data: savedProspects, error: dbError } = await supabase
      .from('ai_prospects')
      .insert(prospects)
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save prospects' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: prospects.length,
      prospects: savedProspects,
    });
  } catch (error) {
    console.error('Prospect discovery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET - Fetch discovered prospects
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const { data: prospects } = await supabase
      .from('ai_prospects')
      .select('*')
      .eq('customer_id', customer.id)
      .order('found_at', { ascending: false });

    return NextResponse.json({
      prospects: prospects || [],
      total: prospects?.length || 0,
    });
  } catch (error) {
    console.error('Fetch prospects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

