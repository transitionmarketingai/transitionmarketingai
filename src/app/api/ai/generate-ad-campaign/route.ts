import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface CampaignRequest {
  platform: 'facebook' | 'instagram' | 'google';
  goal: 'leads' | 'awareness' | 'sales' | 'traffic';
  businessName: string;
  industry: string;
  targetAudience: string;
  budget: number;
  keyMessage?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CampaignRequest = await request.json();
    
    const { platform, goal, businessName, industry, targetAudience, budget, keyMessage } = body;

    // Validate required fields
    if (!platform || !goal || !businessName || !industry || !targetAudience || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the prompt for OpenAI
    const prompt = `You are an expert digital marketing copywriter specializing in ${platform} advertising.

Create 3 high-converting ad campaign variations for:
- Business: ${businessName}
- Industry: ${industry}
- Platform: ${platform.charAt(0).toUpperCase() + platform.slice(1)}
- Goal: ${goal}
- Target Audience: ${targetAudience}
- Monthly Budget: ₹${budget.toLocaleString()}
${keyMessage ? `- Key Message: ${keyMessage}` : ''}

For each variation, provide:
1. Headline (max 40 characters, attention-grabbing, use emojis strategically)
2. Description (max 125 characters for ${platform}, compelling and benefit-focused)
3. Call-to-Action button text (max 20 characters, action-oriented)
4. Why this approach works (brief explanation)
5. Estimated reach (realistic range based on budget and platform)
6. Performance score (0-100 based on best practices)

Make each variation DIFFERENT in approach:
- Variation 1: Emotional appeal
- Variation 2: Social proof/trust
- Variation 3: Urgency/scarcity

Format as JSON array with this structure:
[
  {
    "headline": "string",
    "description": "string",
    "cta": "string",
    "reasoning": "string",
    "estimatedReach": "15,000 - 25,000",
    "score": 92
  }
]

Focus on the Indian market. Use culturally relevant language and insights.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert digital marketing strategist with deep knowledge of Facebook, Instagram, and Google Ads, specializing in the Indian market. You create high-converting ad campaigns optimized for local audiences.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse the AI response
    let campaigns;
    try {
      // Extract JSON from the response (in case AI adds extra text)
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        campaigns = JSON.parse(jsonMatch[0]);
      } else {
        campaigns = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      // Fallback: return simulated data
      campaigns = generateFallbackCampaigns(body);
    }

    // Add additional metadata
    const enrichedCampaigns = campaigns.map((campaign: any, index: number) => ({
      ...campaign,
      id: `ai-${Date.now()}-${index}`,
      platform,
      goal,
      targetAudience,
      estimatedCost: `₹${Math.round(budget * 0.75).toLocaleString()} - ₹${budget.toLocaleString()}`,
      createdAt: new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      campaigns: enrichedCampaigns,
      metadata: {
        platform,
        goal,
        businessName,
        industry,
        generatedAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('AI Ad Generation Error:', error);
    
    // Return fallback campaigns in case of error
    const body: CampaignRequest = await request.json();
    const fallbackCampaigns = generateFallbackCampaigns(body);
    
    return NextResponse.json({
      success: true,
      campaigns: fallbackCampaigns,
      metadata: {
        platform: body.platform,
        goal: body.goal,
        businessName: body.businessName,
        industry: body.industry,
        generatedAt: new Date().toISOString(),
        note: 'Generated using fallback templates'
      }
    });
  }
}

function generateFallbackCampaigns(request: CampaignRequest) {
  const { platform, goal, businessName, industry, targetAudience, budget, keyMessage } = request;
  
  const campaigns = [
    {
      id: `fb-${Date.now()}-1`,
      headline: `${industry === 'Real Estate' ? '🏠 Dream Home Awaits!' : '🚀 Transform Your Business Today!'}`,
      description: `Discover premium ${industry.toLowerCase()} solutions tailored for you. ${keyMessage || 'Limited time offer - act now!'}`.substring(0, 125),
      cta: goal === 'leads' ? 'Get Started Free' : 'Learn More',
      reasoning: 'Emotional appeal with clear value proposition and urgency',
      targetAudience,
      estimatedReach: '15,000 - 25,000',
      estimatedCost: `₹${Math.round(budget * 0.8).toLocaleString()} - ₹${budget.toLocaleString()}`,
      score: 92,
      platform,
      goal,
      createdAt: new Date().toISOString(),
    },
    {
      id: `fb-${Date.now()}-2`,
      headline: `${industry === 'Real Estate' ? '✨ Your Perfect Property is Here' : '💡 Innovation Starts Here'}`,
      description: `Join thousands who chose ${businessName}. ${keyMessage || 'Expert guidance, proven results.'}`.substring(0, 125),
      cta: goal === 'leads' ? 'Book Free Consultation' : 'Discover Now',
      reasoning: 'Social proof and trust-building approach',
      targetAudience,
      estimatedReach: '18,000 - 28,000',
      estimatedCost: `₹${Math.round(budget * 0.75).toLocaleString()} - ₹${budget.toLocaleString()}`,
      score: 88,
      platform,
      goal,
      createdAt: new Date().toISOString(),
    },
    {
      id: `fb-${Date.now()}-3`,
      headline: `${industry === 'Real Estate' ? '🔑 Unlock Premium Living' : '⚡ Fast-Track Your Success'}`,
      description: `Exclusive ${industry.toLowerCase()} opportunities. ${keyMessage || 'Don\'t miss out - limited availability!'}`.substring(0, 125),
      cta: goal === 'leads' ? 'Claim Your Spot' : 'Explore Options',
      reasoning: 'Urgency and exclusivity to drive immediate action',
      targetAudience,
      estimatedReach: '12,000 - 22,000',
      estimatedCost: `₹${Math.round(budget * 0.85).toLocaleString()} - ₹${budget.toLocaleString()}`,
      score: 85,
      platform,
      goal,
      createdAt: new Date().toISOString(),
    },
  ];

  return campaigns;
}

