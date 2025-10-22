import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CompetitorAnalysis {
  competitorName: string;
  industry: string;
  strengths: string[];
  weaknesses: string[];
  strategies: string[];
  marketPosition: 'leader' | 'challenger' | 'follower' | 'niche';
  threatLevel: 'high' | 'medium' | 'low';
  opportunities: string[];
  recommendations: string[];
}

export interface MarketInsights {
  industryTrends: {
    trend: string;
    impact: 'positive' | 'negative' | 'neutral';
    timeframe: 'short' | 'medium' | 'long';
    confidence: number;
  }[];
  competitorActivity: {
    competitor: string;
    activity: string;
    impact: 'high' | 'medium' | 'low';
    timeframe: string;
  }[];
  marketOpportunities: {
    opportunity: string;
    potential: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    timeframe: 'short' | 'medium' | 'long';
  }[];
  threats: {
    threat: string;
    severity: 'high' | 'medium' | 'low';
    probability: 'high' | 'medium' | 'low';
    timeframe: 'short' | 'medium' | 'long';
  }[];
}

export interface CompetitiveIntelligence {
  marketInsights: MarketInsights;
  competitorAnalyses: CompetitorAnalysis[];
  strategicRecommendations: {
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    expectedImpact: 'high' | 'medium' | 'low';
    timeframe: 'short' | 'medium' | 'long';
  }[];
  marketPositioning: {
    currentPosition: string;
    targetPosition: string;
    gapAnalysis: string[];
    actionPlan: string[];
  };
}

export class CompetitorIntelligence {
  private industryCompetitors: Record<string, string[]> = {
    real_estate: [
      '99acres', 'Magicbricks', 'Housing.com', 'PropTiger', 'Square Yards',
      'NoBroker', 'CommonFloor', 'Makaan.com', 'IndiaProperty.com'
    ],
    healthcare: [
      'Practo', '1mg', 'Netmeds', 'Apollo', 'Fortis', 'Manipal',
      'MedPlus', 'PharmEasy', 'Tata 1mg', 'Cure.fit'
    ],
    education: [
      'Byju\'s', 'Unacademy', 'Vedantu', 'Toppr', 'Extramarks',
      'Aakash', 'Allen', 'Resonance', 'FIITJEE', 'Career Point'
    ],
    finance: [
      'Paytm', 'PhonePe', 'Google Pay', 'Razorpay', 'PayU',
      'Instamojo', 'Cashfree', 'BillDesk', 'CCAvenue', 'Paytm Money'
    ],
    automotive: [
      'CarDekho', 'CarWale', 'Autocar India', 'Overdrive',
      'CarTrade', 'Droom', 'Spinny', 'Cars24', 'Mahindra First Choice'
    ],
    retail: [
      'Flipkart', 'Amazon', 'Myntra', 'Nykaa', 'BigBasket',
      'Grofers', 'Reliance Digital', 'Croma', 'Vijay Sales'
    ],
  };

  private industryTrends: Record<string, any> = {
    real_estate: {
      trends: [
        'PropTech adoption accelerating',
        'Virtual property tours becoming standard',
        'AI-powered property matching',
        'Sustainable building focus',
        'Co-living spaces growing'
      ],
      opportunities: [
        'AI-powered lead qualification',
        'Virtual reality property tours',
        'Blockchain property transactions',
        'Smart home integration',
        'Rental management automation'
      ],
      threats: [
        'Regulatory changes',
        'Economic slowdown',
        'Competition from international players',
        'Technology disruption',
        'Changing consumer preferences'
      ]
    },
    healthcare: {
      trends: [
        'Telemedicine adoption',
        'AI diagnostics',
        'Preventive care focus',
        'Digital health records',
        'Personalized medicine'
      ],
      opportunities: [
        'AI-powered patient matching',
        'Telemedicine platforms',
        'Health data analytics',
        'Preventive care programs',
        'Digital therapeutics'
      ],
      threats: [
        'Regulatory compliance',
        'Data privacy concerns',
        'Competition from tech giants',
        'Insurance coverage changes',
        'Medical device regulations'
      ]
    },
    education: {
      trends: [
        'Online learning acceleration',
        'AI tutoring',
        'Microlearning',
        'Gamification',
        'Personalized learning paths'
      ],
      opportunities: [
        'AI-powered content creation',
        'Virtual classrooms',
        'Adaptive learning platforms',
        'Skill-based certifications',
        'Corporate training solutions'
      ],
      threats: [
        'Regulatory changes',
        'Competition from international platforms',
        'Technology infrastructure requirements',
        'Student engagement challenges',
        'Quality assurance concerns'
      ]
    },
    finance: {
      trends: [
        'Digital payments growth',
        'Fintech innovation',
        'Open banking',
        'Cryptocurrency adoption',
        'AI-powered fraud detection'
      ],
      opportunities: [
        'Payment gateway solutions',
        'Digital lending platforms',
        'Investment advisory AI',
        'Blockchain applications',
        'Financial inclusion solutions'
      ],
      threats: [
        'Regulatory compliance',
        'Cybersecurity risks',
        'Competition from banks',
        'Technology infrastructure',
        'Consumer trust issues'
      ]
    },
    automotive: {
      trends: [
        'Electric vehicle adoption',
        'Autonomous driving',
        'Connected cars',
        'Shared mobility',
        'Subscription models'
      ],
      opportunities: [
        'EV charging infrastructure',
        'Autonomous vehicle services',
        'Connected car platforms',
        'Mobility-as-a-Service',
        'Vehicle data monetization'
      ],
      threats: [
        'Technology disruption',
        'Regulatory changes',
        'Competition from tech companies',
        'Infrastructure requirements',
        'Consumer adoption challenges'
      ]
    },
    retail: {
      trends: [
        'E-commerce growth',
        'Omnichannel retail',
        'AI-powered recommendations',
        'Social commerce',
        'Sustainable retail'
      ],
      opportunities: [
        'AI-powered inventory management',
        'Social commerce platforms',
        'Personalized shopping experiences',
        'Supply chain optimization',
        'Sustainable packaging solutions'
      ],
      threats: [
        'Competition from global players',
        'Supply chain disruptions',
        'Technology infrastructure costs',
        'Consumer behavior changes',
        'Regulatory compliance'
      ]
    }
  };

  async analyzeCompetitor(
    competitorName: string,
    industry: string,
    yourPosition?: any
  ): Promise<CompetitorAnalysis> {
    try {
      const prompt = `
Analyze this competitor in the ${industry} industry:

Competitor: ${competitorName}
Industry: ${industry}

Your Position: ${yourPosition ? JSON.stringify(yourPosition) : 'Not provided'}

Provide comprehensive analysis including:
1. Strengths and weaknesses
2. Key strategies
3. Market position (leader/challenger/follower/niche)
4. Threat level assessment
5. Opportunities for your business
6. Strategic recommendations

Format as JSON:
{
  "competitorName": "${competitorName}",
  "industry": "${industry}",
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "strategies": ["strategy1", "strategy2"],
  "marketPosition": "leader|challenger|follower|niche",
  "threatLevel": "high|medium|low",
  "opportunities": ["opp1", "opp2"],
  "recommendations": ["rec1", "rec2"]
}
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
      console.error('Competitor analysis error:', error);
    }

    // Fallback analysis
    return this.getFallbackCompetitorAnalysis(competitorName, industry);
  }

  async generateMarketInsights(
    industry: string,
    timeHorizon: 'short' | 'medium' | 'long' = 'medium'
  ): Promise<MarketInsights> {
    try {
      const industryData = this.industryTrends[industry] || this.industryTrends.real_estate;
      const competitors = this.industryCompetitors[industry] || [];

      const prompt = `
Generate market insights for ${industry} industry:

Time Horizon: ${timeHorizon}
Industry Trends: ${industryData.trends.join(', ')}
Key Competitors: ${competitors.join(', ')}
Opportunities: ${industryData.opportunities.join(', ')}
Threats: ${industryData.threats.join(', ')}

Provide insights in JSON format:
{
  "industryTrends": [
    {
      "trend": "trend description",
      "impact": "positive|negative|neutral",
      "timeframe": "short|medium|long",
      "confidence": 85
    }
  ],
  "competitorActivity": [
    {
      "competitor": "competitor name",
      "activity": "activity description",
      "impact": "high|medium|low",
      "timeframe": "Q1 2024"
    }
  ],
  "marketOpportunities": [
    {
      "opportunity": "opportunity description",
      "potential": "high|medium|low",
      "effort": "high|medium|low",
      "timeframe": "short|medium|long"
    }
  ],
  "threats": [
    {
      "threat": "threat description",
      "severity": "high|medium|low",
      "probability": "high|medium|low",
      "timeframe": "short|medium|long"
    }
  ]
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1200,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Market insights generation error:', error);
    }

    // Fallback insights
    return this.getFallbackMarketInsights(industry);
  }

  async generateCompetitiveIntelligence(
    industry: string,
    yourBusinessData?: any
  ): Promise<CompetitiveIntelligence> {
    try {
      const competitors = this.industryCompetitors[industry] || [];
      const marketInsights = await this.generateMarketInsights(industry);
      
      // Analyze top 3 competitors
      const competitorAnalyses = await Promise.all(
        competitors.slice(0, 3).map(competitor => 
          this.analyzeCompetitor(competitor, industry, yourBusinessData)
        )
      );

      // Generate strategic recommendations
      const strategicRecommendations = await this.generateStrategicRecommendations(
        industry,
        competitorAnalyses,
        yourBusinessData
      );

      // Generate market positioning
      const marketPositioning = await this.generateMarketPositioning(
        industry,
        competitorAnalyses,
        yourBusinessData
      );

      return {
        marketInsights,
        competitorAnalyses,
        strategicRecommendations,
        marketPositioning,
      };
    } catch (error) {
      console.error('Competitive intelligence generation error:', error);
      return this.getFallbackCompetitiveIntelligence(industry);
    }
  }

  async generateStrategicRecommendations(
    industry: string,
    competitorAnalyses: CompetitorAnalysis[],
    yourBusinessData?: any
  ): Promise<{
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    expectedImpact: 'high' | 'medium' | 'low';
    timeframe: 'short' | 'medium' | 'long';
  }[]> {
    try {
      const prompt = `
Generate strategic recommendations based on competitor analysis:

Industry: ${industry}
Competitor Analyses: ${JSON.stringify(competitorAnalyses)}
Your Business: ${yourBusinessData ? JSON.stringify(yourBusinessData) : 'Not provided'}

Provide 5-7 strategic recommendations with priorities and effort levels.

Format as JSON array:
[
  {
    "recommendation": "recommendation description",
    "priority": "high|medium|low",
    "effort": "high|medium|low",
    "expectedImpact": "high|medium|low",
    "timeframe": "short|medium|long"
  }
]
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 800,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Strategic recommendations error:', error);
    }

    // Fallback recommendations
    return this.getFallbackStrategicRecommendations(industry);
  }

  async generateMarketPositioning(
    industry: string,
    competitorAnalyses: CompetitorAnalysis[],
    yourBusinessData?: any
  ): Promise<{
    currentPosition: string;
    targetPosition: string;
    gapAnalysis: string[];
    actionPlan: string[];
  }> {
    try {
      const prompt = `
Generate market positioning strategy:

Industry: ${industry}
Competitor Analyses: ${JSON.stringify(competitorAnalyses)}
Your Business: ${yourBusinessData ? JSON.stringify(yourBusinessData) : 'Not provided'}

Provide market positioning analysis and action plan.

Format as JSON:
{
  "currentPosition": "current market position description",
  "targetPosition": "target market position description",
  "gapAnalysis": ["gap1", "gap2", "gap3"],
  "actionPlan": ["action1", "action2", "action3"]
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 600,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Market positioning error:', error);
    }

    // Fallback positioning
    return this.getFallbackMarketPositioning(industry);
  }

  private getFallbackCompetitorAnalysis(competitorName: string, industry: string): CompetitorAnalysis {
    return {
      competitorName,
      industry,
      strengths: [
        'Established market presence',
        'Strong brand recognition',
        'Large customer base'
      ],
      weaknesses: [
        'Limited innovation',
        'High operational costs',
        'Slow adaptation to change'
      ],
      strategies: [
        'Market expansion',
        'Customer retention focus',
        'Cost optimization'
      ],
      marketPosition: 'challenger',
      threatLevel: 'medium',
      opportunities: [
        'Focus on innovation',
        'Improve customer experience',
        'Leverage technology'
      ],
      recommendations: [
        'Differentiate through superior service',
        'Invest in technology',
        'Focus on customer satisfaction'
      ],
    };
  }

  private getFallbackMarketInsights(industry: string): MarketInsights {
    const industryData = this.industryTrends[industry] || this.industryTrends.real_estate;
    
    return {
      industryTrends: industryData.trends.map(trend => ({
        trend,
        impact: 'positive' as const,
        timeframe: 'medium' as const,
        confidence: 70,
      })),
      competitorActivity: [
        {
          competitor: 'Major Competitor',
          activity: 'Increased marketing spend',
          impact: 'medium' as const,
          timeframe: 'Q1 2024',
        }
      ],
      marketOpportunities: industryData.opportunities.map(opportunity => ({
        opportunity,
        potential: 'high' as const,
        effort: 'medium' as const,
        timeframe: 'medium' as const,
      })),
      threats: industryData.threats.map(threat => ({
        threat,
        severity: 'medium' as const,
        probability: 'medium' as const,
        timeframe: 'long' as const,
      })),
    };
  }

  private getFallbackStrategicRecommendations(industry: string): {
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    expectedImpact: 'high' | 'medium' | 'low';
    timeframe: 'short' | 'medium' | 'long';
  }[] {
    return [
      {
        recommendation: 'Focus on customer experience differentiation',
        priority: 'high',
        effort: 'medium',
        expectedImpact: 'high',
        timeframe: 'medium',
      },
      {
        recommendation: 'Invest in technology and automation',
        priority: 'high',
        effort: 'high',
        expectedImpact: 'high',
        timeframe: 'long',
      },
      {
        recommendation: 'Expand market reach through digital channels',
        priority: 'medium',
        effort: 'medium',
        expectedImpact: 'medium',
        timeframe: 'short',
      },
      {
        recommendation: 'Build strategic partnerships',
        priority: 'medium',
        effort: 'medium',
        expectedImpact: 'medium',
        timeframe: 'medium',
      },
      {
        recommendation: 'Optimize operational efficiency',
        priority: 'low',
        effort: 'low',
        expectedImpact: 'medium',
        timeframe: 'short',
      },
    ];
  }

  private getFallbackMarketPositioning(industry: string): {
    currentPosition: string;
    targetPosition: string;
    gapAnalysis: string[];
    actionPlan: string[];
  } {
    return {
      currentPosition: 'Emerging player in the market',
      targetPosition: 'Leading innovative solution provider',
      gapAnalysis: [
        'Brand recognition needs improvement',
        'Market share is below target',
        'Technology adoption could be faster'
      ],
      actionPlan: [
        'Invest in brand building and marketing',
        'Focus on product innovation',
        'Expand market reach',
        'Build strategic partnerships'
      ],
    };
  }

  private getFallbackCompetitiveIntelligence(industry: string): CompetitiveIntelligence {
    return {
      marketInsights: this.getFallbackMarketInsights(industry),
      competitorAnalyses: [
        this.getFallbackCompetitorAnalysis('Major Competitor 1', industry),
        this.getFallbackCompetitorAnalysis('Major Competitor 2', industry),
      ],
      strategicRecommendations: this.getFallbackStrategicRecommendations(industry),
      marketPositioning: this.getFallbackMarketPositioning(industry),
    };
  }
}

export const competitorIntelligence = new CompetitorIntelligence();
