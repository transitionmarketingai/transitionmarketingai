import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// AI Service for lead analysis and message generation
class AIService {
  private openaiApiKey: string;
  private anthropicApiKey: string;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY || '';
  }

  // Generate personalized message for lead
  async generatePersonalizedMessage(lead: any, template: string, industry: string): Promise<string> {
    try {
      const prompt = `
You are an AI assistant specialized in generating personalized business outreach messages for Indian companies.

Lead Information:
- Name: ${lead.firstName} ${lead.lastName}
- Company: ${lead.company}
- Industry: ${lead.industry}
- Location: ${lead.location}
- Job Title: ${lead.jobTitle}
- Company Size: ${lead.companySize}

Template: ${template}
Industry Focus: ${industry}

Generate a personalized, professional message that:
1. References their specific company and role
2. Shows understanding of their industry
3. Uses Indian business terminology and cultural context
4. Is concise but compelling (2-3 paragraphs max)
5. Includes a clear call-to-action
6. Maintains professional tone

Make it sound natural and avoid generic phrases. Focus on value proposition relevant to Indian businesses.
`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert Indian business development specialist with deep knowledge of Indian markets, business culture, and communication styles.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();

    } catch (error) {
      console.error('AI message generation error:', error);
      // Fallback to template-based personalization
      return this.fallbackPersonalization(lead, template);
    }
  }

  // Fallback personalization when AI is not available
  private fallbackPersonalization(lead: any, template: string): string {
    return template
      .replace(/\{firstName\}/g, lead.firstName || '')
      .replace(/\{lastName\}/g, lead.lastName || '')
      .replace(/\{company\}/g, lead.company || '')
      .replace(/\{industry\}/g, lead.industry || '')
      .replace(/\{location\}/g, lead.location || '')
      .replace(/\{jobTitle\}/g, lead.jobTitle || '')
      .replace(/\{website\}/g, lead.website || '');
  }

  // AI-powered lead scoring
  async scoreLead(lead: any): Promise<number> {
    try {
      const prompt = `
Analyze this Indian business lead and provide a score from 0-100 based on:

Lead Information:
- Name: ${lead.firstName} ${lead.lastName}
- Company: ${lead.company}
- Industry: ${lead.industry}
- Location: ${lead.location}
- Job Title: ${lead.jobTitle}
- Company Size: ${lead.companySize}
- Website: ${lead.website}

Scoring Criteria (weighted):
1. Job Title Authority (30%): Decision-making power
2. Company Size & Growth (25%): Business potential
3. Industry Relevance (20%): Market opportunity
4. Location Advantage (15%): Geographic benefits
5. Contact Quality (10%): Data completeness

Consider Indian business context:
- Decision-making hierarchy
- Regional business patterns
- Industry growth trends
- Company maturity levels

Provide only a number between 0-100 as the score.
`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert lead scoring specialist for Indian businesses. Analyze leads and provide accurate scores.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 10,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const scoreText = data.choices[0].message.content.trim();
      const score = parseInt(scoreText.match(/\d+/)?.[0] || '50');
      
      return Math.max(0, Math.min(100, score));

    } catch (error) {
      console.error('AI lead scoring error:', error);
      // Fallback to rule-based scoring
      return this.fallbackScoring(lead);
    }
  }

  // Fallback scoring when AI is not available
  private fallbackScoring(lead: any): number {
    let score = 50; // Base score

    // Job title scoring
    const title = lead.jobTitle?.toLowerCase() || '';
    if (title.includes('ceo') || title.includes('founder') || title.includes('director')) {
      score += 30;
    } else if (title.includes('manager') || title.includes('head')) {
      score += 20;
    } else if (title.includes('senior') || title.includes('lead')) {
      score += 15;
    }

    // Company size scoring
    const size = lead.companySize?.toLowerCase() || '';
    if (size.includes('large') || size.includes('1000+')) {
      score += 20;
    } else if (size.includes('medium') || size.includes('200-1000')) {
      score += 15;
    } else if (size.includes('small') || size.includes('50-200')) {
      score += 10;
    }

    // Industry scoring (Indian market focus)
    const industry = lead.industry?.toLowerCase() || '';
    if (industry.includes('technology') || industry.includes('fintech') || industry.includes('saas')) {
      score += 15;
    } else if (industry.includes('manufacturing') || industry.includes('healthcare')) {
      score += 10;
    }

    // Location scoring (Indian cities)
    const location = lead.location?.toLowerCase() || '';
    if (location.includes('mumbai') || location.includes('bangalore') || location.includes('delhi')) {
      score += 10;
    } else if (location.includes('chennai') || location.includes('hyderabad') || location.includes('pune')) {
      score += 8;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Generate campaign insights
  async generateCampaignInsights(campaignId: string): Promise<any> {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: {
          leads: true,
          messages: true
        }
      });

      if (!campaign) {
        throw new Error('Campaign not found');
      }

      const prompt = `
Analyze this Indian lead generation campaign and provide insights:

Campaign: ${campaign.name}
Industry: ${campaign.industry}
Target Locations: ${campaign.locations.join(', ')}
Company Sizes: ${campaign.companySizes.join(', ')}
Total Leads: ${campaign.totalLeadsFound}
Leads Processed: ${campaign.leadsProcessed}
Conversion Rate: ${campaign.conversionRate}%

Lead Distribution:
- By Location: ${this.getLocationDistribution(campaign.leads)}
- By Company Size: ${this.getSizeDistribution(campaign.leads)}
- By Industry: ${this.getIndustryDistribution(campaign.leads)}

Message Performance:
- Total Sent: ${campaign.messages.length}
- Open Rate: ${this.calculateOpenRate(campaign.messages)}
- Response Rate: ${this.calculateResponseRate(campaign.messages)}

Provide actionable insights for Indian market optimization:
1. Performance analysis
2. Optimization recommendations
3. Target audience refinements
4. Message improvement suggestions
5. Next steps for scaling
`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert Indian marketing analyst specializing in lead generation campaigns and business growth optimization.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.5,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        insights: data.choices[0].message.content.trim(),
        generatedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('AI campaign insights error:', error);
      return {
        insights: 'AI insights temporarily unavailable. Please try again later.',
        generatedAt: new Date().toISOString()
      };
    }
  }

  private getLocationDistribution(leads: any[]): string {
    const distribution = leads.reduce((acc, lead) => {
      acc[lead.location] = (acc[lead.location] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(distribution).map(([loc, count]) => `${loc}: ${count}`).join(', ');
  }

  private getSizeDistribution(leads: any[]): string {
    const distribution = leads.reduce((acc, lead) => {
      acc[lead.companySize] = (acc[lead.companySize] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(distribution).map(([size, count]) => `${size}: ${count}`).join(', ');
  }

  private getIndustryDistribution(leads: any[]): string {
    const distribution = leads.reduce((acc, lead) => {
      acc[lead.industry] = (acc[lead.industry] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(distribution).map(([industry, count]) => `${industry}: ${count}`).join(', ');
  }

  private calculateOpenRate(messages: any[]): string {
    const opened = messages.filter(m => m.openedAt).length;
    return `${((opened / messages.length) * 100).toFixed(1)}%`;
  }

  private calculateResponseRate(messages: any[]): string {
    const replied = messages.filter(m => m.repliedAt).length;
    return `${((replied / messages.length) * 100).toFixed(1)}%`;
  }
}

const aiService = new AIService();

// Generate personalized message
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { leadId, template, industry } = await request.json();

    if (!leadId || !template) {
      return NextResponse.json(
        { error: 'Lead ID and template are required' },
        { status: 400 }
      );
    }

    // Get lead details
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if lead belongs to user
    if (lead.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Generate personalized message
    const personalizedMessage = await aiService.generatePersonalizedMessage(lead, template, industry);

    return NextResponse.json({
      success: true,
      personalizedMessage: personalizedMessage,
      lead: {
        name: `${lead.firstName} ${lead.lastName}`,
        company: lead.company,
        industry: lead.industry,
        location: lead.location
      }
    });

  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Score lead with AI
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Get lead details
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if lead belongs to user
    if (lead.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Score lead with AI
    const aiScore = await aiService.scoreLead(lead);

    // Update lead score
    await prisma.lead.update({
      where: { id: leadId },
      data: { score: aiScore }
    });

    return NextResponse.json({
      success: true,
      score: aiScore,
      lead: {
        name: `${lead.firstName} ${lead.lastName}`,
        company: lead.company,
        previousScore: lead.score,
        newScore: aiScore
      }
    });

  } catch (error) {
    console.error('AI scoring error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get campaign insights
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    // Get campaign insights
    const insights = await aiService.generateCampaignInsights(campaignId);

    return NextResponse.json({
      success: true,
      insights: insights
    });

  } catch (error) {
    console.error('AI insights error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
