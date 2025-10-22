import { getOpenAI } from './openai';

export interface LeadPrediction {
  conversionProbability: number; // 0-100
  revenuePotential: number; // estimated revenue
  timeToConvert: number; // days
  riskFactors: string[];
  opportunities: string[];
  recommendedActions: string[];
  confidence: number; // 0-100
}

export interface CampaignPrediction {
  expectedLeads: number;
  expectedConversions: number;
  expectedRevenue: number;
  optimalBudget: number;
  recommendedOptimizations: string[];
  riskFactors: string[];
  confidence: number;
}

export interface PerformanceForecast {
  period: '7d' | '30d' | '90d';
  predictedLeads: number;
  predictedConversions: number;
  predictedRevenue: number;
  confidence: number;
  trends: {
    leadGrowth: number; // percentage
    conversionImprovement: number; // percentage
    revenueGrowth: number; // percentage
  };
}

export interface LeadData {
  id: string;
  name: string;
  industry: string;
  source: string;
  qualityScore: number;
  status: string;
  createdAt: string;
  lastContactAt?: string;
  contactCount: number;
  leadData?: any;
  city?: string;
  state?: string;
}

export interface HistoricalData {
  leads: LeadData[];
  conversions: number;
  revenue: number;
  timeRange: string;
}

export class PredictiveAnalytics {
  private industryBenchmarks: Record<string, any> = {
    real_estate: {
      avgConversionRate: 12,
      avgRevenuePerLead: 50000,
      avgTimeToConvert: 45,
      seasonalFactors: { 'Q1': 1.2, 'Q2': 1.0, 'Q3': 0.8, 'Q4': 1.1 },
    },
    healthcare: {
      avgConversionRate: 8,
      avgRevenuePerLead: 75000,
      avgTimeToConvert: 60,
      seasonalFactors: { 'Q1': 1.1, 'Q2': 1.0, 'Q3': 0.9, 'Q4': 1.0 },
    },
    education: {
      avgConversionRate: 15,
      avgRevenuePerLead: 30000,
      avgTimeToConvert: 30,
      seasonalFactors: { 'Q1': 1.3, 'Q2': 0.7, 'Q3': 0.5, 'Q4': 1.2 },
    },
    finance: {
      avgConversionRate: 6,
      avgRevenuePerLead: 100000,
      avgTimeToConvert: 90,
      seasonalFactors: { 'Q1': 1.1, 'Q2': 1.0, 'Q3': 0.9, 'Q4': 1.1 },
    },
    automotive: {
      avgConversionRate: 10,
      avgRevenuePerLead: 40000,
      avgTimeToConvert: 35,
      seasonalFactors: { 'Q1': 1.0, 'Q2': 1.2, 'Q3': 1.1, 'Q4': 0.8 },
    },
    retail: {
      avgConversionRate: 18,
      avgRevenuePerLead: 25000,
      avgTimeToConvert: 20,
      seasonalFactors: { 'Q1': 0.8, 'Q2': 1.0, 'Q3': 1.1, 'Q4': 1.4 },
    },
  };

  async predictLeadConversion(lead: LeadData, historicalData: HistoricalData): Promise<LeadPrediction> {
    try {
      const industryBenchmark = this.industryBenchmarks[lead.industry] || this.industryBenchmarks.real_estate;
      
      // Calculate base probability from quality score
      let baseProbability = lead.qualityScore;
      
      // Adjust for source
      const sourceMultiplier = this.getSourceMultiplier(lead.source);
      baseProbability *= sourceMultiplier;
      
      // Adjust for engagement
      const engagementMultiplier = this.getEngagementMultiplier(lead.contactCount, lead.lastContactAt);
      baseProbability *= engagementMultiplier;
      
      // Adjust for industry performance
      const industryMultiplier = industryBenchmark.avgConversionRate / 10; // normalize to 0-1
      baseProbability *= industryMultiplier;
      
      // Calculate revenue potential
      const revenuePotential = industryBenchmark.avgRevenuePerLead * (baseProbability / 100);
      
      // Calculate time to convert
      const timeToConvert = industryBenchmark.avgTimeToConvert * (100 / baseProbability);
      
      // Generate AI insights
      const aiInsights = await this.generateAIInsights(lead, historicalData, baseProbability);
      
      return {
        conversionProbability: Math.min(Math.round(baseProbability), 100),
        revenuePotential: Math.round(revenuePotential),
        timeToConvert: Math.round(timeToConvert),
        riskFactors: aiInsights.riskFactors,
        opportunities: aiInsights.opportunities,
        recommendedActions: aiInsights.recommendedActions,
        confidence: this.calculateConfidence(lead, historicalData),
      };
    } catch (error) {
      console.error('Lead prediction error:', error);
      return this.getFallbackPrediction(lead);
    }
  }

  async predictCampaignPerformance(
    campaignData: any, 
    historicalData: HistoricalData
  ): Promise<CampaignPrediction> {
    try {
      const industryBenchmark = this.industryBenchmarks[campaignData.industry] || this.industryBenchmarks.real_estate;
      
      // Calculate expected leads based on budget and industry
      const expectedLeads = Math.round(campaignData.budget / industryBenchmark.avgRevenuePerLead * 0.1);
      
      // Calculate expected conversions
      const expectedConversions = Math.round(expectedLeads * (industryBenchmark.avgConversionRate / 100));
      
      // Calculate expected revenue
      const expectedRevenue = expectedConversions * industryBenchmark.avgRevenuePerLead;
      
      // Calculate optimal budget
      const optimalBudget = Math.round(expectedRevenue * 0.3); // 30% of revenue as budget
      
      // Generate AI recommendations
      const aiRecommendations = await this.generateCampaignInsights(campaignData, historicalData);
      
      return {
        expectedLeads,
        expectedConversions,
        expectedRevenue: Math.round(expectedRevenue),
        optimalBudget,
        recommendedOptimizations: aiRecommendations.optimizations,
        riskFactors: aiRecommendations.riskFactors,
        confidence: this.calculateCampaignConfidence(campaignData, historicalData),
      };
    } catch (error) {
      console.error('Campaign prediction error:', error);
      return this.getFallbackCampaignPrediction(campaignData);
    }
  }

  async forecastPerformance(
    historicalData: HistoricalData, 
    period: '7d' | '30d' | '90d'
  ): Promise<PerformanceForecast> {
    try {
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      
      // Calculate trends from historical data
      const trends = this.calculateTrends(historicalData);
      
      // Project future performance
      const predictedLeads = Math.round(historicalData.leads.length * (days / 30) * trends.leadGrowth);
      const predictedConversions = Math.round(predictedLeads * (historicalData.conversions / historicalData.leads.length));
      const predictedRevenue = Math.round(predictedConversions * (historicalData.revenue / historicalData.conversions));
      
      return {
        period,
        predictedLeads,
        predictedConversions,
        predictedRevenue,
        confidence: this.calculateForecastConfidence(historicalData),
        trends: {
          leadGrowth: trends.leadGrowth,
          conversionImprovement: trends.conversionImprovement,
          revenueGrowth: trends.revenueGrowth,
        },
      };
    } catch (error) {
      console.error('Performance forecast error:', error);
      return this.getFallbackForecast(period);
    }
  }

  private getSourceMultiplier(source: string): number {
    const multipliers: Record<string, number> = {
      'facebook_lead_ads': 1.2,
      'google_lead_forms': 1.1,
      'ai_outbound': 0.9,
      'manual_entry': 0.8,
      'referral': 1.3,
      'website_form': 1.0,
    };
    return multipliers[source] || 1.0;
  }

  private getEngagementMultiplier(contactCount: number, lastContactAt?: string): number {
    let multiplier = 1.0;
    
    // More contacts = higher engagement
    if (contactCount > 5) multiplier *= 1.2;
    else if (contactCount > 2) multiplier *= 1.1;
    else if (contactCount === 0) multiplier *= 0.8;
    
    // Recent contact = higher engagement
    if (lastContactAt) {
      const daysSinceContact = (Date.now() - new Date(lastContactAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceContact < 7) multiplier *= 1.1;
      else if (daysSinceContact > 30) multiplier *= 0.9;
    }
    
    return multiplier;
  }

  private calculateTrends(historicalData: HistoricalData): any {
    // Simple trend calculation - in production, use more sophisticated algorithms
    const leadCount = historicalData.leads.length;
    const conversionRate = historicalData.conversions / leadCount;
    const revenuePerConversion = historicalData.revenue / historicalData.conversions;
    
    return {
      leadGrowth: 1.05, // 5% growth assumption
      conversionImprovement: 1.02, // 2% improvement assumption
      revenueGrowth: 1.03, // 3% growth assumption
    };
  }

  private calculateConfidence(lead: LeadData, historicalData: HistoricalData): number {
    let confidence = 50; // base confidence
    
    // More data = higher confidence
    if (historicalData.leads.length > 100) confidence += 20;
    else if (historicalData.leads.length > 50) confidence += 10;
    
    // Complete lead data = higher confidence
    if (lead.leadData && Object.keys(lead.leadData).length > 3) confidence += 15;
    
    // Recent data = higher confidence
    const daysSinceLastLead = (Date.now() - new Date(historicalData.leads[0]?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastLead < 30) confidence += 15;
    
    return Math.min(confidence, 95);
  }

  private calculateCampaignConfidence(campaignData: any, historicalData: HistoricalData): number {
    let confidence = 60; // base confidence for campaigns
    
    // Industry match = higher confidence
    if (historicalData.leads.some(lead => lead.industry === campaignData.industry)) confidence += 20;
    
    // Budget range = higher confidence
    if (campaignData.budget > 10000 && campaignData.budget < 100000) confidence += 15;
    
    return Math.min(confidence, 90);
  }

  private calculateForecastConfidence(historicalData: HistoricalData): number {
    let confidence = 40; // base confidence for forecasts
    
    // More historical data = higher confidence
    if (historicalData.leads.length > 200) confidence += 30;
    else if (historicalData.leads.length > 100) confidence += 20;
    else if (historicalData.leads.length > 50) confidence += 10;
    
    // Consistent performance = higher confidence
    const conversionRate = historicalData.conversions / historicalData.leads.length;
    if (conversionRate > 0.05 && conversionRate < 0.25) confidence += 20; // reasonable range
    
    return Math.min(confidence, 85);
  }

  private async generateAIInsights(
    lead: LeadData, 
    historicalData: HistoricalData, 
    probability: number
  ): Promise<{ riskFactors: string[]; opportunities: string[]; recommendedActions: string[] }> {
    try {
      const prompt = `
Analyze this lead and provide insights:

Lead: ${lead.name} (${lead.industry})
Source: ${lead.source}
Quality Score: ${lead.qualityScore}
Status: ${lead.status}
Contact Count: ${lead.contactCount}

Historical Performance:
- Total Leads: ${historicalData.leads.length}
- Conversions: ${historicalData.conversions}
- Conversion Rate: ${(historicalData.conversions / historicalData.leads.length * 100).toFixed(1)}%

Predicted Conversion Probability: ${probability.toFixed(1)}%

Provide:
1. 3 risk factors that could prevent conversion
2. 3 opportunities to improve conversion
3. 3 specific recommended actions

Format as JSON:
{
  "riskFactors": ["risk1", "risk2", "risk3"],
  "opportunities": ["opp1", "opp2", "opp3"],
  "recommendedActions": ["action1", "action2", "action3"]
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 400,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('AI insights generation error:', error);
    }

    // Fallback insights
    return {
      riskFactors: [
        'Limited engagement history',
        'Unclear budget or timeline',
        'Competing priorities'
      ],
      opportunities: [
        'Personalized outreach based on industry',
        'Value demonstration through case studies',
        'Multiple touchpoint strategy'
      ],
      recommendedActions: [
        'Follow up within 24 hours',
        'Provide industry-specific value proposition',
        'Schedule discovery call'
      ],
    };
  }

  private async generateCampaignInsights(
    campaignData: any, 
    historicalData: HistoricalData
  ): Promise<{ optimizations: string[]; riskFactors: string[] }> {
    try {
      const prompt = `
Analyze this campaign and provide optimization recommendations:

Campaign: ${campaignData.name}
Industry: ${campaignData.industry}
Budget: ₹${campaignData.budget}
Platform: ${campaignData.platform}

Historical Performance:
- Total Leads: ${historicalData.leads.length}
- Conversions: ${historicalData.conversions}
- Revenue: ₹${historicalData.revenue}

Provide:
1. 3 optimization recommendations
2. 3 risk factors to watch

Format as JSON:
{
  "optimizations": ["opt1", "opt2", "opt3"],
  "riskFactors": ["risk1", "risk2", "risk3"]
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
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Campaign insights generation error:', error);
    }

    // Fallback insights
    return {
      optimizations: [
        'A/B test ad creatives for better engagement',
        'Optimize targeting based on high-converting segments',
        'Implement retargeting for website visitors'
      ],
      riskFactors: [
        'Budget allocation may be too low for meaningful results',
        'Competition in target market',
        'Seasonal factors affecting performance'
      ],
    };
  }

  private getFallbackPrediction(lead: LeadData): LeadPrediction {
    return {
      conversionProbability: lead.qualityScore,
      revenuePotential: 50000,
      timeToConvert: 45,
      riskFactors: ['Limited data available'],
      opportunities: ['Personalized outreach'],
      recommendedActions: ['Follow up promptly'],
      confidence: 30,
    };
  }

  private getFallbackCampaignPrediction(campaignData: any): CampaignPrediction {
    return {
      expectedLeads: 50,
      expectedConversions: 5,
      expectedRevenue: 250000,
      optimalBudget: 75000,
      recommendedOptimizations: ['Monitor performance closely'],
      riskFactors: ['Limited historical data'],
      confidence: 40,
    };
  }

  private getFallbackForecast(period: '7d' | '30d' | '90d'): PerformanceForecast {
    const multiplier = period === '7d' ? 0.25 : period === '30d' ? 1 : 3;
    
    return {
      period,
      predictedLeads: Math.round(50 * multiplier),
      predictedConversions: Math.round(5 * multiplier),
      predictedRevenue: Math.round(250000 * multiplier),
      confidence: 30,
      trends: {
        leadGrowth: 1.0,
        conversionImprovement: 1.0,
        revenueGrowth: 1.0,
      },
    };
  }
}

export const predictiveAnalytics = new PredictiveAnalytics();
