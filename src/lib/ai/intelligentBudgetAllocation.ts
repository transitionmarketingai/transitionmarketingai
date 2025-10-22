import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CampaignPerformance {
  campaignId: string;
  platform: 'facebook' | 'google' | 'linkedin' | 'ai_scraping';
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  revenue: number;
  costPerLead: number;
  conversionRate: number;
  roi: number;
  period: string;
}

export interface BudgetAllocation {
  totalBudget: number;
  allocations: {
    platform: string;
    budget: number;
    percentage: number;
    reasoning: string;
    expectedLeads: number;
    expectedRevenue: number;
    confidence: number;
  }[];
  expectedTotalLeads: number;
  expectedTotalRevenue: number;
  expectedROI: number;
  riskFactors: string[];
  recommendations: string[];
}

export interface OptimizationRecommendation {
  type: 'increase' | 'decrease' | 'pause' | 'test';
  platform: string;
  currentBudget: number;
  recommendedBudget: number;
  reasoning: string;
  expectedImpact: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

export interface MarketIntelligence {
  industryTrends: string[];
  competitorActivity: string[];
  seasonalFactors: string[];
  marketOpportunities: string[];
  riskFactors: string[];
  recommendations: string[];
}

export class IntelligentBudgetAllocation {
  private platformBenchmarks: Record<string, any> = {
    facebook: {
      avgCostPerLead: 150,
      avgConversionRate: 8,
      avgROI: 300,
      seasonalMultiplier: { 'Q1': 1.1, 'Q2': 1.0, 'Q3': 0.9, 'Q4': 1.2 },
      bestIndustries: ['real_estate', 'retail', 'automotive'],
    },
    google: {
      avgCostPerLead: 200,
      avgConversionRate: 12,
      avgROI: 400,
      seasonalMultiplier: { 'Q1': 1.0, 'Q2': 1.1, 'Q3': 1.0, 'Q4': 1.1 },
      bestIndustries: ['healthcare', 'finance', 'education'],
    },
    linkedin: {
      avgCostPerLead: 300,
      avgConversionRate: 6,
      avgROI: 250,
      seasonalMultiplier: { 'Q1': 1.2, 'Q2': 1.0, 'Q3': 0.8, 'Q4': 1.0 },
      bestIndustries: ['finance', 'healthcare', 'education'],
    },
    ai_scraping: {
      avgCostPerLead: 50,
      avgConversionRate: 15,
      avgROI: 500,
      seasonalMultiplier: { 'Q1': 1.0, 'Q2': 1.0, 'Q3': 1.0, 'Q4': 1.0 },
      bestIndustries: ['real_estate', 'retail', 'automotive'],
    },
  };

  async optimizeBudgetAllocation(
    currentPerformance: CampaignPerformance[],
    totalBudget: number,
    industry: string,
    goals: { leads?: number; revenue?: number; roi?: number }
  ): Promise<BudgetAllocation> {
    try {
      const prompt = `
Optimize budget allocation for ${industry} industry with ₹${totalBudget} total budget.

Current Performance:
${currentPerformance.map(cp => `
Platform: ${cp.platform}
Budget: ₹${cp.budget}
Spent: ₹${cp.spent}
Leads: ${cp.leads}
Conversions: ${cp.conversions}
Revenue: ₹${cp.revenue}
Cost Per Lead: ₹${cp.costPerLead}
Conversion Rate: ${cp.conversionRate}%
ROI: ${cp.roi}%
`).join('\n')}

Goals:
- Leads: ${goals.leads || 'Maximize'}
- Revenue: ₹${goals.revenue || 'Maximize'}
- ROI: ${goals.roi || 'Maximize'}%

Platform Benchmarks:
- Facebook: ₹150 CPL, 8% conversion, 300% ROI
- Google: ₹200 CPL, 12% conversion, 400% ROI
- LinkedIn: ₹300 CPL, 6% conversion, 250% ROI
- AI Scraping: ₹50 CPL, 15% conversion, 500% ROI

Provide optimal budget allocation with reasoning.

Format as JSON:
{
  "allocations": [
    {
      "platform": "facebook",
      "budget": 50000,
      "percentage": 40,
      "reasoning": "explanation",
      "expectedLeads": 333,
      "expectedRevenue": 200000,
      "confidence": 85
    }
  ],
  "expectedTotalLeads": 1000,
  "expectedTotalRevenue": 500000,
  "expectedROI": 400,
  "riskFactors": ["risk1", "risk2"],
  "recommendations": ["rec1", "rec2"]
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const allocation = JSON.parse(content);
        return {
          totalBudget,
          allocations: allocation.allocations,
          expectedTotalLeads: allocation.expectedTotalLeads,
          expectedTotalRevenue: allocation.expectedTotalRevenue,
          expectedROI: allocation.expectedROI,
          riskFactors: allocation.riskFactors,
          recommendations: allocation.recommendations,
        };
      }
    } catch (error) {
      console.error('Budget optimization error:', error);
    }

    // Fallback allocation
    return this.getFallbackAllocation(totalBudget, industry, currentPerformance);
  }

  async generateOptimizationRecommendations(
    performance: CampaignPerformance[],
    industry: string
  ): Promise<OptimizationRecommendation[]> {
    try {
      const prompt = `
Analyze these campaign performances and provide optimization recommendations:

Performance Data:
${performance.map(p => `
Platform: ${p.platform}
Budget: ₹${p.budget}
Spent: ₹${p.spent}
Leads: ${p.leads}
Cost Per Lead: ₹${p.costPerLead}
Conversion Rate: ${p.conversionRate}%
ROI: ${p.roi}%
`).join('\n')}

Industry: ${industry}

Provide specific recommendations for each platform.

Format as JSON array:
[
  {
    "type": "increase",
    "platform": "facebook",
    "currentBudget": 30000,
    "recommendedBudget": 50000,
    "reasoning": "explanation",
    "expectedImpact": "impact description",
    "confidence": 85,
    "priority": "high"
  }
]
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 800,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Optimization recommendations error:', error);
    }

    // Fallback recommendations
    return this.getFallbackRecommendations(performance);
  }

  async analyzeMarketIntelligence(
    industry: string,
    currentPerformance: CampaignPerformance[]
  ): Promise<MarketIntelligence> {
    try {
      const prompt = `
Analyze market intelligence for ${industry} industry lead generation:

Current Performance:
${currentPerformance.map(p => `
Platform: ${p.platform}
Cost Per Lead: ₹${p.costPerLead}
Conversion Rate: ${p.conversionRate}%
ROI: ${p.roi}%
`).join('\n')}

Provide market insights including:
1. Industry trends affecting lead generation
2. Competitor activity patterns
3. Seasonal factors
4. Market opportunities
5. Risk factors
6. Strategic recommendations

Format as JSON:
{
  "industryTrends": ["trend1", "trend2"],
  "competitorActivity": ["activity1", "activity2"],
  "seasonalFactors": ["factor1", "factor2"],
  "marketOpportunities": ["opp1", "opp2"],
  "riskFactors": ["risk1", "risk2"],
  "recommendations": ["rec1", "rec2"]
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 800,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Market intelligence analysis error:', error);
    }

    // Fallback market intelligence
    return this.getFallbackMarketIntelligence(industry);
  }

  async predictCampaignPerformance(
    platform: string,
    budget: number,
    industry: string,
    historicalData?: CampaignPerformance[]
  ): Promise<{
    expectedLeads: number;
    expectedConversions: number;
    expectedRevenue: number;
    expectedROI: number;
    confidence: number;
  }> {
    try {
      const benchmark = this.platformBenchmarks[platform];
      if (!benchmark) {
        throw new Error(`Unknown platform: ${platform}`);
      }

      // Calculate seasonal adjustment
      const currentQuarter = this.getCurrentQuarter();
      const seasonalMultiplier = benchmark.seasonalMultiplier[currentQuarter] || 1.0;

      // Calculate industry adjustment
      const industryMultiplier = benchmark.bestIndustries.includes(industry) ? 1.2 : 0.8;

      // Base calculations
      const expectedLeads = Math.round((budget / benchmark.avgCostPerLead) * seasonalMultiplier * industryMultiplier);
      const expectedConversions = Math.round(expectedLeads * (benchmark.avgConversionRate / 100));
      const expectedRevenue = expectedConversions * (benchmark.avgROI / 100) * benchmark.avgCostPerLead;
      const expectedROI = benchmark.avgROI * seasonalMultiplier * industryMultiplier;

      // Adjust based on historical data if available
      let confidence = 70;
      if (historicalData && historicalData.length > 0) {
        const historicalPlatform = historicalData.find(h => h.platform === platform);
        if (historicalPlatform) {
          // Adjust based on historical performance
          const historicalROI = historicalPlatform.roi;
          const roiAdjustment = historicalROI / benchmark.avgROI;
          
          if (roiAdjustment > 0.8 && roiAdjustment < 1.2) {
            confidence = 85; // Good historical performance
          } else if (roiAdjustment < 0.8) {
            confidence = 50; // Poor historical performance
          }
        }
      }

      return {
        expectedLeads,
        expectedConversions,
        expectedRevenue: Math.round(expectedRevenue),
        expectedROI: Math.round(expectedROI),
        confidence,
      };
    } catch (error) {
      console.error('Campaign performance prediction error:', error);
      return this.getFallbackPrediction(platform, budget);
    }
  }

  private getCurrentQuarter(): string {
    const month = new Date().getMonth() + 1;
    if (month <= 3) return 'Q1';
    if (month <= 6) return 'Q2';
    if (month <= 9) return 'Q3';
    return 'Q4';
  }

  private getFallbackAllocation(
    totalBudget: number, 
    industry: string, 
    currentPerformance: CampaignPerformance[]
  ): BudgetAllocation {
    const allocations = [
      {
        platform: 'facebook',
        budget: Math.round(totalBudget * 0.4),
        percentage: 40,
        reasoning: 'Facebook shows good performance for most industries',
        expectedLeads: Math.round(totalBudget * 0.4 / 150),
        expectedRevenue: Math.round(totalBudget * 0.4 * 3),
        confidence: 70,
      },
      {
        platform: 'google',
        budget: Math.round(totalBudget * 0.3),
        percentage: 30,
        reasoning: 'Google provides high-intent leads',
        expectedLeads: Math.round(totalBudget * 0.3 / 200),
        expectedRevenue: Math.round(totalBudget * 0.3 * 4),
        confidence: 75,
      },
      {
        platform: 'ai_scraping',
        budget: Math.round(totalBudget * 0.2),
        percentage: 20,
        reasoning: 'AI scraping provides cost-effective leads',
        expectedLeads: Math.round(totalBudget * 0.2 / 50),
        expectedRevenue: Math.round(totalBudget * 0.2 * 5),
        confidence: 80,
      },
      {
        platform: 'linkedin',
        budget: Math.round(totalBudget * 0.1),
        percentage: 10,
        reasoning: 'LinkedIn for B2B targeting',
        expectedLeads: Math.round(totalBudget * 0.1 / 300),
        expectedRevenue: Math.round(totalBudget * 0.1 * 2.5),
        confidence: 65,
      },
    ];

    const expectedTotalLeads = allocations.reduce((sum, a) => sum + a.expectedLeads, 0);
    const expectedTotalRevenue = allocations.reduce((sum, a) => sum + a.expectedRevenue, 0);
    const expectedROI = (expectedTotalRevenue / totalBudget) * 100;

    return {
      totalBudget,
      allocations,
      expectedTotalLeads,
      expectedTotalRevenue,
      expectedROI: Math.round(expectedROI),
      riskFactors: [
        'Market competition may increase costs',
        'Seasonal factors could affect performance',
        'Platform algorithm changes may impact reach'
      ],
      recommendations: [
        'Monitor performance weekly and adjust budgets',
        'Test new ad creatives regularly',
        'Focus on high-performing platforms'
      ],
    };
  }

  private getFallbackRecommendations(performance: CampaignPerformance[]): OptimizationRecommendation[] {
    return performance.map(p => {
      let type: 'increase' | 'decrease' | 'pause' | 'test' = 'test';
      let recommendedBudget = p.budget;
      let priority: 'high' | 'medium' | 'low' = 'medium';

      if (p.roi > 300) {
        type = 'increase';
        recommendedBudget = Math.round(p.budget * 1.5);
        priority = 'high';
      } else if (p.roi < 100) {
        type = 'decrease';
        recommendedBudget = Math.round(p.budget * 0.5);
        priority = 'high';
      }

      return {
        type,
        platform: p.platform,
        currentBudget: p.budget,
        recommendedBudget,
        reasoning: `ROI of ${p.roi}% suggests ${type} budget`,
        expectedImpact: `${type} budget by ${Math.abs(recommendedBudget - p.budget)}`,
        confidence: 70,
        priority,
      };
    });
  }

  private getFallbackMarketIntelligence(industry: string): MarketIntelligence {
    return {
      industryTrends: [
        `${industry} industry showing steady growth`,
        'Digital transformation accelerating',
        'Customer expectations increasing'
      ],
      competitorActivity: [
        'Competitors increasing ad spend',
        'New platforms emerging',
        'Price competition intensifying'
      ],
      seasonalFactors: [
        'Q4 typically strongest quarter',
        'Summer months show lower engagement',
        'Holiday periods affect response rates'
      ],
      marketOpportunities: [
        'Untapped market segments',
        'New platform opportunities',
        'Emerging technology adoption'
      ],
      riskFactors: [
        'Economic uncertainty',
        'Platform policy changes',
        'Increased competition'
      ],
      recommendations: [
        'Diversify across multiple platforms',
        'Focus on quality over quantity',
        'Invest in customer retention'
      ],
    };
  }

  private getFallbackPrediction(platform: string, budget: number): {
    expectedLeads: number;
    expectedConversions: number;
    expectedRevenue: number;
    expectedROI: number;
    confidence: number;
  } {
    const benchmark = this.platformBenchmarks[platform] || this.platformBenchmarks.facebook;
    
    return {
      expectedLeads: Math.round(budget / benchmark.avgCostPerLead),
      expectedConversions: Math.round((budget / benchmark.avgCostPerLead) * (benchmark.avgConversionRate / 100)),
      expectedRevenue: Math.round((budget / benchmark.avgCostPerLead) * (benchmark.avgConversionRate / 100) * (benchmark.avgROI / 100) * benchmark.avgCostPerLead),
      expectedROI: benchmark.avgROI,
      confidence: 50,
    };
  }
}

export const intelligentBudgetAllocation = new IntelligentBudgetAllocation();
