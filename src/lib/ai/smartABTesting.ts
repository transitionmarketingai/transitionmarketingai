import { getOpenAI } from './openai';

export interface ABTestVariant {
  id: string;
  name: string;
  subject?: string;
  message: string;
  channel: 'email' | 'whatsapp' | 'sms';
  personalizationLevel: 'low' | 'medium' | 'high';
  tone: 'professional' | 'casual' | 'urgent' | 'friendly';
  ctaType: 'direct' | 'soft' | 'question' | 'value';
}

export interface ABTestResult {
  variantId: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  converted: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  conversionRate: number;
  confidence: number;
}

export interface ABTest {
  id: string;
  name: string;
  leadId?: string;
  campaignId?: string;
  industry: string;
  variants: ABTestVariant[];
  status: 'draft' | 'running' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  results: ABTestResult[];
  winner?: string;
  insights: string[];
  recommendations: string[];
  createdAt: string;
}

export interface MessageOptimization {
  originalMessage: string;
  optimizedVariants: ABTestVariant[];
  optimizationReason: string;
  expectedImprovement: number; // percentage
  confidence: number;
}

export class SmartABTesting {
  private industryTemplates: Record<string, any> = {
    real_estate: {
      painPoints: ['finding the right property', 'market timing', 'investment returns'],
      valueProps: ['expert market analysis', 'exclusive listings', 'investment guidance'],
      urgency: ['limited time offers', 'market opportunities', 'seasonal trends'],
      tones: ['professional', 'urgent', 'friendly'],
    },
    healthcare: {
      painPoints: ['patient care', 'operational efficiency', 'compliance'],
      valueProps: ['patient solutions', 'efficiency tools', 'compliance support'],
      urgency: ['regulatory deadlines', 'patient outcomes', 'cost savings'],
      tones: ['professional', 'caring', 'urgent'],
    },
    education: {
      painPoints: ['student outcomes', 'enrollment', 'operational costs'],
      valueProps: ['learning solutions', 'enrollment tools', 'cost optimization'],
      urgency: ['academic deadlines', 'student success', 'budget cycles'],
      tones: ['professional', 'encouraging', 'urgent'],
    },
    finance: {
      painPoints: ['customer acquisition', 'risk management', 'compliance'],
      valueProps: ['customer solutions', 'risk tools', 'compliance support'],
      urgency: ['regulatory deadlines', 'market opportunities', 'quarterly goals'],
      tones: ['professional', 'confident', 'urgent'],
    },
    automotive: {
      painPoints: ['customer service', 'inventory management', 'sales efficiency'],
      valueProps: ['customer solutions', 'inventory tools', 'sales support'],
      urgency: ['seasonal sales', 'inventory turnover', 'customer satisfaction'],
      tones: ['professional', 'enthusiastic', 'urgent'],
    },
    retail: {
      painPoints: ['customer acquisition', 'inventory management', 'sales growth'],
      valueProps: ['customer solutions', 'inventory tools', 'growth strategies'],
      urgency: ['seasonal trends', 'inventory turnover', 'sales targets'],
      tones: ['professional', 'exciting', 'urgent'],
    },
  };

  async generateABTestVariants(
    originalMessage: string,
    industry: string,
    leadContext?: any
  ): Promise<ABTestVariant[]> {
    try {
      const industryTemplate = this.industryTemplates[industry] || this.industryTemplates.real_estate;
      
      const prompt = `
Create 4 A/B test variants for this message in the ${industry} industry:

Original Message: "${originalMessage}"

Industry Context:
- Pain Points: ${industryTemplate.painPoints.join(', ')}
- Value Props: ${industryTemplate.valueProps.join(', ')}
- Urgency: ${industryTemplate.urgency.join(', ')}
- Tones: ${industryTemplate.tones.join(', ')}

Lead Context: ${leadContext ? JSON.stringify(leadContext) : 'Generic'}

Create 4 variants with different approaches:
1. Professional tone with direct CTA
2. Casual tone with soft CTA
3. Urgent tone with value focus
4. Friendly tone with question CTA

Each variant should:
- Maintain the core message
- Use different personalization levels
- Have different tones
- Include different CTAs
- Be optimized for the industry

Format as JSON array:
[
  {
    "name": "Professional Direct",
    "message": "message content",
    "channel": "email",
    "personalizationLevel": "high",
    "tone": "professional",
    "ctaType": "direct"
  }
]
`;

      const openaiClient = getOpenAI();
      if (!openaiClient) {
        console.warn('OpenAI API key not available, using fallback');
        return this.generateFallbackVariants(originalMessage, industry);
      }

      const response = await openaiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 1500,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const variants = JSON.parse(content);
        return variants.map((variant: any, index: number) => ({
          id: `variant_${Date.now()}_${index}`,
          name: variant.name,
          subject: variant.subject,
          message: variant.message,
          channel: variant.channel,
          personalizationLevel: variant.personalizationLevel,
          tone: variant.tone,
          ctaType: variant.ctaType,
        }));
      }
    } catch (error) {
      console.error('AB test variant generation error:', error);
    }

    // Fallback variants
    return this.generateFallbackVariants(originalMessage, industry);
  }

  async optimizeMessage(
    originalMessage: string,
    industry: string,
    performanceData?: any
  ): Promise<MessageOptimization> {
    try {
      const industryTemplate = this.industryTemplates[industry] || this.industryTemplates.real_estate;
      
      const prompt = `
Optimize this message for better performance in the ${industry} industry:

Original Message: "${originalMessage}"

Industry Context:
- Pain Points: ${industryTemplate.painPoints.join(', ')}
- Value Props: ${industryTemplate.valueProps.join(', ')}
- Urgency: ${industryTemplate.urgency.join(', ')}

Performance Data: ${performanceData ? JSON.stringify(performanceData) : 'None'}

Provide:
1. 3 optimized variants with different approaches
2. Explanation of optimization strategy
3. Expected improvement percentage
4. Confidence level

Format as JSON:
{
  "optimizedVariants": [
    {
      "name": "Optimized Variant 1",
      "message": "optimized message",
      "channel": "email",
      "personalizationLevel": "high",
      "tone": "professional",
      "ctaType": "direct"
    }
  ],
  "optimizationReason": "explanation",
  "expectedImprovement": 25,
  "confidence": 85
}
`;

      const openaiClient = getOpenAI();
      if (!openaiClient) {
        console.warn('OpenAI API key not available, using fallback optimization');
        return this.getFallbackOptimization(originalMessage, industry);
      }

      const response = await openaiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const optimization = JSON.parse(content);
        return {
          originalMessage,
          optimizedVariants: optimization.optimizedVariants.map((variant: any, index: number) => ({
            id: `opt_${Date.now()}_${index}`,
            name: variant.name,
            subject: variant.subject,
            message: variant.message,
            channel: variant.channel,
            personalizationLevel: variant.personalizationLevel,
            tone: variant.tone,
            ctaType: variant.ctaType,
          })),
          optimizationReason: optimization.optimizationReason,
          expectedImprovement: optimization.expectedImprovement,
          confidence: optimization.confidence,
        };
      }
    } catch (error) {
      console.error('Message optimization error:', error);
    }

    // Fallback optimization
    return this.getFallbackOptimization(originalMessage, industry);
  }

  async analyzeABTestResults(test: ABTest): Promise<{
    winner: string;
    insights: string[];
    recommendations: string[];
    confidence: number;
  }> {
    try {
      const prompt = `
Analyze these A/B test results and provide insights:

Test: ${test.name}
Industry: ${test.industry}
Variants: ${test.variants.length}

Results:
${test.results.map(result => {
  const variant = test.variants.find(v => v.id === result.variantId);
  return `
Variant: ${variant?.name}
Sent: ${result.sent}
Open Rate: ${result.openRate}%
Click Rate: ${result.clickRate}%
Reply Rate: ${result.replyRate}%
Conversion Rate: ${result.conversionRate}%
`;
}).join('\n')}

Provide:
1. Winner variant (highest conversion rate)
2. Key insights about what worked
3. Recommendations for future tests
4. Confidence level in the results

Format as JSON:
{
  "winner": "variant_id",
  "insights": ["insight1", "insight2", "insight3"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "confidence": 85
}
`;

      const openaiClient = getOpenAI();
      if (!openaiClient) {
        console.warn('OpenAI API key not available, using fallback analysis');
        // Fallback analysis
        const bestResult = test.results.reduce((best, current) => 
          current.conversionRate > best.conversionRate ? current : best
        );

        return {
          winner: bestResult.variantId,
          insights: [
            `Variant ${bestResult.variantId} performed best with ${bestResult.conversionRate}% conversion rate`,
            'Professional tone showed higher engagement',
            'Direct CTAs generated more responses'
          ],
          recommendations: [
            'Use the winning variant for future campaigns',
            'Test different subject lines',
            'Experiment with send times'
          ],
          confidence: 70,
        };
      }

      const response = await openaiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 600,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('AB test analysis error:', error);
    }

    // Fallback analysis
    const bestResult = test.results.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    );

    return {
      winner: bestResult.variantId,
      insights: [
        `Variant ${bestResult.variantId} performed best with ${bestResult.conversionRate}% conversion rate`,
        'Professional tone showed higher engagement',
        'Direct CTAs generated more responses'
      ],
      recommendations: [
        'Use the winning variant for future campaigns',
        'Test different subject lines',
        'Experiment with send times'
      ],
      confidence: 70,
    };
  }

  async generatePersonalizedVariants(
    baseMessage: string,
    leadData: any,
    industry: string
  ): Promise<ABTestVariant[]> {
    try {
      const prompt = `
Create personalized A/B test variants for this lead:

Base Message: "${baseMessage}"
Lead Data: ${JSON.stringify(leadData)}
Industry: ${industry}

Create 3 variants with different personalization levels:
1. High personalization (name, company, specific details)
2. Medium personalization (industry, role)
3. Low personalization (generic but relevant)

Each should maintain the core message but personalize differently.

Format as JSON array:
[
  {
    "name": "High Personalization",
    "message": "personalized message",
    "personalizationLevel": "high",
    "tone": "professional",
    "ctaType": "direct"
  }
]
`;

      const openaiClient = getOpenAI();
      if (!openaiClient) {
        console.warn('OpenAI API key not available, using fallback personalized variants');
        return this.generateFallbackPersonalizedVariants(baseMessage, leadData);
      }

      const response = await openaiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const variants = JSON.parse(content);
        return variants.map((variant: any, index: number) => ({
          id: `personalized_${Date.now()}_${index}`,
          name: variant.name,
          subject: variant.subject,
          message: variant.message,
          channel: 'email',
          personalizationLevel: variant.personalizationLevel,
          tone: variant.tone,
          ctaType: variant.ctaType,
        }));
      }
    } catch (error) {
      console.error('Personalized variant generation error:', error);
    }

    // Fallback personalized variants
    return this.generateFallbackPersonalizedVariants(baseMessage, leadData);
  }

  private generateFallbackVariants(originalMessage: string, industry: string): ABTestVariant[] {
    return [
      {
        id: `fallback_${Date.now()}_1`,
        name: 'Professional Direct',
        message: originalMessage,
        channel: 'email',
        personalizationLevel: 'high',
        tone: 'professional',
        ctaType: 'direct',
      },
      {
        id: `fallback_${Date.now()}_2`,
        name: 'Casual Soft',
        message: originalMessage.replace(/\./g, '!'),
        channel: 'email',
        personalizationLevel: 'medium',
        tone: 'casual',
        ctaType: 'soft',
      },
      {
        id: `fallback_${Date.now()}_3`,
        name: 'Urgent Value',
        message: `URGENT: ${originalMessage}`,
        channel: 'email',
        personalizationLevel: 'low',
        tone: 'urgent',
        ctaType: 'value',
      },
      {
        id: `fallback_${Date.now()}_4`,
        name: 'Friendly Question',
        message: `${originalMessage} What do you think?`,
        channel: 'email',
        personalizationLevel: 'medium',
        tone: 'friendly',
        ctaType: 'question',
      },
    ];
  }

  private generateFallbackPersonalizedVariants(baseMessage: string, leadData: any): ABTestVariant[] {
    const name = leadData.name || 'there';
    const company = leadData.company || 'your company';

    return [
      {
        id: `personalized_${Date.now()}_1`,
        name: 'High Personalization',
        message: `Hi ${name}, I noticed you're from ${company}. ${baseMessage}`,
        channel: 'email',
        personalizationLevel: 'high',
        tone: 'professional',
        ctaType: 'direct',
      },
      {
        id: `personalized_${Date.now()}_2`,
        name: 'Medium Personalization',
        message: `Hi ${name}, ${baseMessage}`,
        channel: 'email',
        personalizationLevel: 'medium',
        tone: 'professional',
        ctaType: 'soft',
      },
      {
        id: `personalized_${Date.now()}_3`,
        name: 'Low Personalization',
        message: baseMessage,
        channel: 'email',
        personalizationLevel: 'low',
        tone: 'professional',
        ctaType: 'direct',
      },
    ];
  }

  private getFallbackOptimization(originalMessage: string, industry: string): MessageOptimization {
    return {
      originalMessage,
      optimizedVariants: this.generateFallbackVariants(originalMessage, industry),
      optimizationReason: 'Optimized for better engagement and conversion',
      expectedImprovement: 20,
      confidence: 60,
    };
  }
}

export const smartABTesting = new SmartABTesting();
