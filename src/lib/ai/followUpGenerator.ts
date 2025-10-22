import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface FollowUpSequence {
  id: string;
  name: string;
  industry: string;
  channels: ('email' | 'whatsapp' | 'sms')[];
  steps: FollowUpStep[];
  totalDuration: number; // in days
}

export interface FollowUpStep {
  stepNumber: number;
  dayDelay: number; // days after previous step
  channel: 'email' | 'whatsapp' | 'sms';
  subject?: string; // for email
  message: string;
  aiGenerated: boolean;
  personalizationPoints: string[];
}

export interface SequenceContext {
  industry: string;
  leadName: string;
  companyName?: string;
  leadRole?: string;
  leadSource: string;
  businessName: string;
  businessIndustry: string;
  leadData?: any;
}

export class AIFollowUpGenerator {
  private industryTemplates: Record<string, any> = {
    real_estate: {
      painPoints: ['finding quality properties', 'market timing', 'investment returns'],
      valueProps: ['expert market analysis', 'exclusive property access', 'investment guidance'],
      urgency: ['limited time offers', 'market opportunities', 'seasonal trends'],
    },
    healthcare: {
      painPoints: ['patient acquisition', 'operational efficiency', 'compliance'],
      valueProps: ['patient management solutions', 'efficiency tools', 'compliance support'],
      urgency: ['regulatory deadlines', 'patient care improvements', 'cost savings'],
    },
    education: {
      painPoints: ['student enrollment', 'learning outcomes', 'operational costs'],
      valueProps: ['enrollment solutions', 'learning platforms', 'cost optimization'],
      urgency: ['academic year deadlines', 'student success metrics', 'budget cycles'],
    },
    finance: {
      painPoints: ['customer acquisition', 'risk management', 'compliance'],
      valueProps: ['customer solutions', 'risk tools', 'compliance support'],
      urgency: ['regulatory deadlines', 'market opportunities', 'quarterly goals'],
    },
    automotive: {
      painPoints: ['customer service', 'inventory management', 'sales efficiency'],
      valueProps: ['customer solutions', 'inventory tools', 'sales support'],
      urgency: ['seasonal sales', 'inventory turnover', 'customer satisfaction'],
    },
    retail: {
      painPoints: ['customer acquisition', 'inventory management', 'sales growth'],
      valueProps: ['customer solutions', 'inventory tools', 'growth strategies'],
      urgency: ['seasonal trends', 'inventory turnover', 'sales targets'],
    },
  };

  async generateSequence(context: SequenceContext): Promise<FollowUpSequence> {
    try {
      const industryTemplate = this.industryTemplates[context.industry] || this.industryTemplates.real_estate;
      
      const prompt = `
Generate a personalized follow-up sequence for a lead in the ${context.industry} industry.

Lead Context:
- Name: ${context.leadName}
- Company: ${context.companyName || 'Unknown'}
- Role: ${context.leadRole || 'Unknown'}
- Source: ${context.leadSource}
- Business: ${context.businessName} (${context.businessIndustry})

Industry Pain Points: ${industryTemplate.painPoints.join(', ')}
Industry Value Props: ${industryTemplate.valueProps.join(', ')}
Industry Urgency: ${industryTemplate.urgency.join(', ')}

Create a 5-step follow-up sequence with:
1. Welcome email (Day 0)
2. Value proposition email (Day 3)
3. Case study email (Day 7)
4. WhatsApp message (Day 14)
5. Final offer email (Day 21)

Each step should:
- Be personalized to their industry and role
- Include specific pain points and solutions
- Have appropriate tone and urgency
- Include clear call-to-action

Format as JSON:
{
  "name": "sequence name",
  "steps": [
    {
      "stepNumber": 1,
      "dayDelay": 0,
      "channel": "email",
      "subject": "email subject",
      "message": "message content",
      "personalizationPoints": ["point1", "point2"]
    }
  ]
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        
        return {
          id: `seq_${Date.now()}`,
          name: parsed.name || `${context.industry} Follow-up Sequence`,
          industry: context.industry,
          channels: ['email', 'whatsapp'],
          steps: parsed.steps.map((step: any, index: number) => ({
            ...step,
            aiGenerated: true,
            stepNumber: index + 1,
          })),
          totalDuration: 21,
        };
      }
    } catch (error) {
      console.error('AI sequence generation error:', error);
    }

    // Fallback sequence
    return this.generateFallbackSequence(context);
  }

  private generateFallbackSequence(context: SequenceContext): FollowUpSequence {
    const industryTemplate = this.industryTemplates[context.industry] || this.industryTemplates.real_estate;
    
    return {
      id: `seq_${Date.now()}`,
      name: `${context.industry} Follow-up Sequence`,
      industry: context.industry,
      channels: ['email', 'whatsapp'],
      steps: [
        {
          stepNumber: 1,
          dayDelay: 0,
          channel: 'email',
          subject: `Welcome ${context.leadName} - Let's discuss your ${context.industry} needs`,
          message: `Hi ${context.leadName},

Thank you for your interest in our ${context.industry} solutions. I noticed you're from ${context.companyName || 'your company'} and wanted to reach out personally.

I specialize in helping ${context.industry} businesses like yours with ${industryTemplate.painPoints[0]} and ${industryTemplate.painPoints[1]}.

Would you be open to a brief 15-minute call this week to discuss how we can help?

Best regards,
${context.businessName}`,
          aiGenerated: false,
          personalizationPoints: ['name', 'company', 'industry'],
        },
        {
          stepNumber: 2,
          dayDelay: 3,
          channel: 'email',
          subject: `Quick question about ${context.industry} challenges`,
          message: `Hi ${context.leadName},

I hope you're doing well. I wanted to follow up on my previous email about ${industryTemplate.valueProps[0]}.

Many ${context.industry} businesses we work with face challenges with ${industryTemplate.painPoints[0]}. Our solution has helped companies like yours achieve ${industryTemplate.valueProps[1]}.

Would you be interested in seeing a quick demo of how this works?

Best,
${context.businessName}`,
          aiGenerated: false,
          personalizationPoints: ['name', 'industry', 'pain points'],
        },
        {
          stepNumber: 3,
          dayDelay: 7,
          channel: 'email',
          subject: `Case Study: How we helped a ${context.industry} company`,
          message: `Hi ${context.leadName},

I wanted to share a quick case study that might be relevant to your situation.

We recently helped a ${context.industry} company similar to ${context.companyName || 'yours'} achieve:
- 40% improvement in ${industryTemplate.valueProps[0]}
- 25% reduction in ${industryTemplate.painPoints[0]}
- ROI of 300% within 6 months

Would you like to see how we can apply similar strategies to your business?

Best regards,
${context.businessName}`,
          aiGenerated: false,
          personalizationPoints: ['name', 'company', 'industry'],
        },
        {
          stepNumber: 4,
          dayDelay: 14,
          channel: 'whatsapp',
          message: `Hi ${context.leadName}! 👋 

I hope you're doing well. I wanted to reach out via WhatsApp to see if you had a chance to review my previous emails about ${industryTemplate.valueProps[0]}.

I know you're busy, but I believe our solution could really help ${context.companyName || 'your company'} with ${industryTemplate.painPoints[0]}.

Would you be open to a quick 10-minute call this week?

Best,
${context.businessName}`,
          aiGenerated: false,
          personalizationPoints: ['name', 'company', 'pain points'],
        },
        {
          stepNumber: 5,
          dayDelay: 21,
          channel: 'email',
          subject: `Final offer - ${industryTemplate.urgency[0]} for ${context.industry}`,
          message: `Hi ${context.leadName},

This is my final follow-up regarding our ${context.industry} solutions.

I understand you might be busy, but I wanted to offer you a special opportunity:
- Free consultation worth ₹5,000
- Custom strategy for your ${context.industry} business
- No obligation, just valuable insights

This offer expires at the end of this week due to ${industryTemplate.urgency[0]}.

If you're interested, simply reply with "YES" and I'll schedule a call.

If not, I'll respect your decision and won't follow up again.

Best regards,
${context.businessName}`,
          aiGenerated: false,
          personalizationPoints: ['name', 'industry', 'urgency'],
        },
      ],
      totalDuration: 21,
    };
  }

  async personalizeMessage(
    template: string, 
    context: SequenceContext, 
    personalizationPoints: string[]
  ): Promise<string> {
    try {
      const prompt = `
Personalize this message template for a lead:

Template: ${template}

Lead Context:
- Name: ${context.leadName}
- Company: ${context.companyName || 'Unknown'}
- Role: ${context.leadRole || 'Unknown'}
- Industry: ${context.industry}
- Source: ${context.leadSource}

Personalization Points to Include: ${personalizationPoints.join(', ')}

Make the message feel personal and relevant to their specific situation while maintaining professionalism.

Return only the personalized message:
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || template;
    } catch (error) {
      console.error('Message personalization error:', error);
      return template;
    }
  }

  async generateOptimalTiming(
    leadData: any, 
    industry: string, 
    channel: 'email' | 'whatsapp' | 'sms'
  ): Promise<{ bestDay: string; bestTime: string; reasoning: string }> {
    try {
      const prompt = `
Based on this lead data, suggest the optimal timing for ${channel} outreach:

Lead Data: ${JSON.stringify(leadData)}
Industry: ${industry}
Channel: ${channel}

Consider:
- Industry-specific patterns
- Channel-specific best practices
- Lead engagement history
- Geographic location (India)

Provide optimal day of week and time, with reasoning.

Format as JSON:
{
  "bestDay": "Monday",
  "bestTime": "10:00 AM",
  "reasoning": "explanation"
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 200,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Timing optimization error:', error);
    }

    // Fallback timing
    return {
      bestDay: 'Tuesday',
      bestTime: '10:00 AM',
      reasoning: 'Tuesday mornings typically have higher engagement rates for business outreach',
    };
  }
}

export const aiFollowUpGenerator = new AIFollowUpGenerator();
