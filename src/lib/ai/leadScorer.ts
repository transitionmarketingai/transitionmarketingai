import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface LeadScoringCriteria {
  industry: string;
  companySize?: string;
  jobTitle?: string;
  location?: string;
  budget?: string;
  timeline?: string;
  source: string;
  engagementLevel?: string;
}

export interface LeadScore {
  overallScore: number; // 0-100
  breakdown: {
    industryMatch: number;
    companySize: number;
    jobTitle: number;
    location: number;
    budget: number;
    timeline: number;
    source: number;
    engagement: number;
  };
  reasoning: string;
  recommendations: string[];
  intent: 'hot' | 'warm' | 'cold';
}

export class AILeadScorer {
  private industryWeights: Record<string, Record<string, number>> = {
    real_estate: {
      industryMatch: 30,
      companySize: 15,
      jobTitle: 20,
      location: 15,
      budget: 15,
      timeline: 5,
      source: 10,
      engagement: 10,
    },
    healthcare: {
      industryMatch: 25,
      companySize: 20,
      jobTitle: 25,
      location: 10,
      budget: 10,
      timeline: 5,
      source: 10,
      engagement: 15,
    },
    education: {
      industryMatch: 20,
      companySize: 25,
      jobTitle: 20,
      location: 15,
      budget: 10,
      timeline: 5,
      source: 10,
      engagement: 15,
    },
    finance: {
      industryMatch: 30,
      companySize: 20,
      jobTitle: 25,
      location: 10,
      budget: 10,
      timeline: 5,
      source: 10,
      engagement: 10,
    },
    automotive: {
      industryMatch: 25,
      companySize: 20,
      jobTitle: 20,
      location: 15,
      budget: 10,
      timeline: 5,
      source: 10,
      engagement: 15,
    },
    retail: {
      industryMatch: 20,
      companySize: 25,
      jobTitle: 15,
      location: 20,
      budget: 10,
      timeline: 5,
      source: 10,
      engagement: 15,
    },
  };

  async scoreLead(criteria: LeadScoringCriteria): Promise<LeadScore> {
    try {
      const weights = this.industryWeights[criteria.industry] || this.industryWeights.real_estate;
      
      // Calculate individual scores
      const breakdown = {
        industryMatch: this.scoreIndustryMatch(criteria.industry),
        companySize: this.scoreCompanySize(criteria.companySize),
        jobTitle: this.scoreJobTitle(criteria.jobTitle),
        location: this.scoreLocation(criteria.location),
        budget: this.scoreBudget(criteria.budget),
        timeline: this.scoreTimeline(criteria.timeline),
        source: this.scoreSource(criteria.source),
        engagement: this.scoreEngagement(criteria.engagementLevel),
      };

      // Calculate weighted overall score
      const overallScore = Math.round(
        (breakdown.industryMatch * weights.industryMatch +
         breakdown.companySize * weights.companySize +
         breakdown.jobTitle * weights.jobTitle +
         breakdown.location * weights.location +
         breakdown.budget * weights.budget +
         breakdown.timeline * weights.timeline +
         breakdown.source * weights.source +
         breakdown.engagement * weights.engagement) / 100
      );

      // Generate AI reasoning and recommendations
      const aiAnalysis = await this.generateAIAnalysis(criteria, breakdown, overallScore);

      // Determine intent
      const intent = this.determineIntent(overallScore, breakdown);

      return {
        overallScore,
        breakdown,
        reasoning: aiAnalysis.reasoning,
        recommendations: aiAnalysis.recommendations,
        intent,
      };
    } catch (error) {
      console.error('Lead scoring error:', error);
      // Return fallback score
      return {
        overallScore: 50,
        breakdown: {
          industryMatch: 50,
          companySize: 50,
          jobTitle: 50,
          location: 50,
          budget: 50,
          timeline: 50,
          source: 50,
          engagement: 50,
        },
        reasoning: 'Unable to analyze lead at this time',
        recommendations: ['Follow up manually to assess lead quality'],
        intent: 'warm',
      };
    }
  }

  private scoreIndustryMatch(industry: string): number {
    // All leads are already industry-matched since they're filtered by customer industry
    return 100;
  }

  private scoreCompanySize(companySize?: string): number {
    if (!companySize) return 50;
    
    const sizeScores: Record<string, number> = {
      'startup': 60,
      'small': 70,
      'medium': 85,
      'large': 95,
      'enterprise': 100,
    };
    
    return sizeScores[companySize.toLowerCase()] || 50;
  }

  private scoreJobTitle(jobTitle?: string): number {
    if (!jobTitle) return 50;
    
    const title = jobTitle.toLowerCase();
    
    // Decision makers
    if (title.includes('ceo') || title.includes('founder') || title.includes('owner')) return 100;
    if (title.includes('director') || title.includes('vp') || title.includes('head')) return 90;
    if (title.includes('manager') || title.includes('lead')) return 80;
    
    // Influencers
    if (title.includes('senior') || title.includes('principal')) return 75;
    if (title.includes('specialist') || title.includes('analyst')) return 60;
    
    // Others
    return 40;
  }

  private scoreLocation(location?: string): number {
    if (!location) return 50;
    
    // Tier 1 cities (higher scores)
    const tier1Cities = ['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune', 'kolkata'];
    const tier2Cities = ['ahmedabad', 'jaipur', 'surat', 'lucknow', 'kanpur', 'nagpur', 'indore'];
    
    const city = location.toLowerCase();
    
    if (tier1Cities.some(tier1 => city.includes(tier1))) return 90;
    if (tier2Cities.some(tier2 => city.includes(tier2))) return 75;
    
    return 60; // Other cities
  }

  private scoreBudget(budget?: string): number {
    if (!budget) return 50;
    
    const budgetStr = budget.toLowerCase();
    
    if (budgetStr.includes('crore') || budgetStr.includes('cr')) return 100;
    if (budgetStr.includes('lakh') || budgetStr.includes('lac')) return 80;
    if (budgetStr.includes('thousand') || budgetStr.includes('k')) return 60;
    
    return 50;
  }

  private scoreTimeline(timeline?: string): number {
    if (!timeline) return 50;
    
    const timelineStr = timeline.toLowerCase();
    
    if (timelineStr.includes('immediate') || timelineStr.includes('urgent')) return 100;
    if (timelineStr.includes('month') || timelineStr.includes('soon')) return 80;
    if (timelineStr.includes('quarter') || timelineStr.includes('3 month')) return 60;
    if (timelineStr.includes('year') || timelineStr.includes('long term')) return 40;
    
    return 50;
  }

  private scoreSource(source: string): number {
    const sourceScores: Record<string, number> = {
      'facebook_lead_ads': 95,
      'google_lead_forms': 90,
      'ai_outbound': 75,
      'manual_entry': 60,
      'referral': 85,
      'website_form': 80,
    };
    
    return sourceScores[source] || 50;
  }

  private scoreEngagement(engagementLevel?: string): number {
    if (!engagementLevel) return 50;
    
    const engagementScores: Record<string, number> = {
      'high': 100,
      'medium': 70,
      'low': 40,
      'none': 20,
    };
    
    return engagementScores[engagementLevel.toLowerCase()] || 50;
  }

  private determineIntent(overallScore: number, breakdown: any): 'hot' | 'warm' | 'cold' {
    if (overallScore >= 80) return 'hot';
    if (overallScore >= 60) return 'warm';
    return 'cold';
  }

  private async generateAIAnalysis(
    criteria: LeadScoringCriteria, 
    breakdown: any, 
    overallScore: number
  ): Promise<{ reasoning: string; recommendations: string[] }> {
    try {
      const prompt = `
Analyze this lead and provide insights:

Lead Details:
- Industry: ${criteria.industry}
- Company Size: ${criteria.companySize || 'Unknown'}
- Job Title: ${criteria.jobTitle || 'Unknown'}
- Location: ${criteria.location || 'Unknown'}
- Budget: ${criteria.budget || 'Unknown'}
- Timeline: ${criteria.timeline || 'Unknown'}
- Source: ${criteria.source}
- Engagement: ${criteria.engagementLevel || 'Unknown'}

Score Breakdown:
- Industry Match: ${breakdown.industryMatch}/100
- Company Size: ${breakdown.companySize}/100
- Job Title: ${breakdown.jobTitle}/100
- Location: ${breakdown.location}/100
- Budget: ${breakdown.budget}/100
- Timeline: ${breakdown.timeline}/100
- Source: ${breakdown.source}/100
- Engagement: ${breakdown.engagement}/100

Overall Score: ${overallScore}/100

Provide:
1. Brief reasoning for the score (2-3 sentences)
2. 3 specific recommendations for approaching this lead

Format as JSON:
{
  "reasoning": "reasoning text",
  "recommendations": ["rec1", "rec2", "rec3"]
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        return {
          reasoning: parsed.reasoning || 'Lead shows potential based on available information',
          recommendations: parsed.recommendations || [
            'Follow up within 24 hours',
            'Personalize outreach based on their industry',
            'Offer relevant case studies'
          ],
        };
      }
    } catch (error) {
      console.error('AI analysis error:', error);
    }

    // Fallback analysis
    return {
      reasoning: `Lead scored ${overallScore}/100 based on ${criteria.industry} industry criteria`,
      recommendations: [
        'Follow up within 24-48 hours',
        'Personalize message based on their role and company',
        'Offer industry-specific value proposition'
      ],
    };
  }
}

export const aiLeadScorer = new AILeadScorer();
