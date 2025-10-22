import { getOpenAI } from './openai';

export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-100
  emotions: {
    interest: number;
    urgency: number;
    skepticism: number;
    enthusiasm: number;
    frustration: number;
  };
  intent: 'buying' | 'browsing' | 'objection' | 'information' | 'comparison';
  keywords: string[];
  recommendations: string[];
  nextAction: string;
}

export interface EngagementPattern {
  responseTime: number; // average hours
  responseLength: number; // average characters
  questionCount: number;
  engagementLevel: 'high' | 'medium' | 'low';
  preferredChannel: 'email' | 'whatsapp' | 'phone';
  bestTimeToContact: string;
  communicationStyle: 'formal' | 'casual' | 'technical' | 'friendly';
}

export interface LeadBehaviorAnalysis {
  leadId: string;
  totalInteractions: number;
  sentimentTrend: SentimentAnalysis[];
  engagementPattern: EngagementPattern;
  buyingSignals: string[];
  riskSignals: string[];
  optimalApproach: string;
  lastUpdated: string;
}

export class SentimentAnalyzer {
  private industryContexts: Record<string, any> = {
    real_estate: {
      buyingSignals: ['budget', 'timeline', 'location', 'property type', 'investment', 'purchase'],
      riskSignals: ['price', 'expensive', 'not interested', 'not ready', 'just looking'],
      positiveKeywords: ['interested', 'perfect', 'exactly what', 'love', 'ideal', 'great'],
      negativeKeywords: ['expensive', 'not suitable', 'not interested', 'too far', 'small'],
    },
    healthcare: {
      buyingSignals: ['patient', 'treatment', 'solution', 'improve', 'efficiency', 'cost'],
      riskSignals: ['expensive', 'not needed', 'satisfied', 'no budget', 'later'],
      positiveKeywords: ['helpful', 'effective', 'improve', 'solution', 'benefit'],
      negativeKeywords: ['expensive', 'unnecessary', 'complex', 'difficult', 'not working'],
    },
    education: {
      buyingSignals: ['students', 'learning', 'improve', 'results', 'enrollment', 'success'],
      riskSignals: ['expensive', 'not needed', 'satisfied', 'no budget', 'later'],
      positiveKeywords: ['excellent', 'helpful', 'improve', 'effective', 'benefit'],
      negativeKeywords: ['expensive', 'unnecessary', 'complex', 'difficult', 'not working'],
    },
    finance: {
      buyingSignals: ['investment', 'returns', 'portfolio', 'growth', 'security', 'profit'],
      riskSignals: ['risky', 'not interested', 'satisfied', 'no money', 'later'],
      positiveKeywords: ['profitable', 'secure', 'growth', 'returns', 'benefit'],
      negativeKeywords: ['risky', 'expensive', 'complex', 'difficult', 'not working'],
    },
    automotive: {
      buyingSignals: ['vehicle', 'car', 'purchase', 'buy', 'deal', 'price', 'model'],
      riskSignals: ['expensive', 'not interested', 'satisfied', 'no budget', 'later'],
      positiveKeywords: ['perfect', 'ideal', 'exactly', 'love', 'great', 'excellent'],
      negativeKeywords: ['expensive', 'not suitable', 'not interested', 'too much'],
    },
    retail: {
      buyingSignals: ['customers', 'sales', 'increase', 'growth', 'revenue', 'profit'],
      riskSignals: ['expensive', 'not needed', 'satisfied', 'no budget', 'later'],
      positiveKeywords: ['effective', 'helpful', 'increase', 'growth', 'benefit'],
      negativeKeywords: ['expensive', 'unnecessary', 'complex', 'difficult', 'not working'],
    },
  };

  async analyzeSentiment(
    message: string, 
    leadId: string, 
    industry: string,
    previousMessages?: string[]
  ): Promise<SentimentAnalysis> {
    try {
      const industryContext = this.industryContexts[industry] || this.industryContexts.real_estate;
      
      const prompt = `
Analyze the sentiment and intent of this message from a lead in the ${industry} industry:

Message: "${message}"

Industry Context:
- Buying Signals: ${industryContext.buyingSignals.join(', ')}
- Risk Signals: ${industryContext.riskSignals.join(', ')}
- Positive Keywords: ${industryContext.positiveKeywords.join(', ')}
- Negative Keywords: ${industryContext.negativeKeywords.join(', ')}

Previous Context: ${previousMessages ? previousMessages.slice(-3).join(' | ') : 'None'}

Provide analysis in JSON format:
{
  "sentiment": "positive|negative|neutral",
  "confidence": 0-100,
  "emotions": {
    "interest": 0-100,
    "urgency": 0-100,
    "skepticism": 0-100,
    "enthusiasm": 0-100,
    "frustration": 0-100
  },
  "intent": "buying|browsing|objection|information|comparison",
  "keywords": ["keyword1", "keyword2"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "nextAction": "specific action to take"
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const analysis = JSON.parse(content);
        return {
          sentiment: analysis.sentiment,
          confidence: analysis.confidence,
          emotions: analysis.emotions,
          intent: analysis.intent,
          keywords: analysis.keywords,
          recommendations: analysis.recommendations,
          nextAction: analysis.nextAction,
        };
      }
    } catch (error) {
      console.error('Sentiment analysis error:', error);
    }

    // Fallback analysis
    return this.getFallbackSentiment(message, industry);
  }

  async analyzeEngagementPattern(
    leadId: string, 
    messages: any[], 
    industry: string
  ): Promise<EngagementPattern> {
    try {
      // Calculate response time patterns
      const responseTimes = this.calculateResponseTimes(messages);
      const avgResponseTime = responseTimes.length > 0 ? 
        responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length : 24;

      // Calculate response length patterns
      const responseLengths = messages
        .filter(m => m.sender === 'lead')
        .map(m => m.message_text.length);
      const avgResponseLength = responseLengths.length > 0 ?
        responseLengths.reduce((sum, len) => sum + len, 0) / responseLengths.length : 50;

      // Count questions
      const questionCount = messages
        .filter(m => m.sender === 'lead')
        .reduce((count, m) => count + (m.message_text.match(/\?/g) || []).length, 0);

      // Determine engagement level
      const engagementLevel = this.determineEngagementLevel(
        avgResponseTime, 
        avgResponseLength, 
        questionCount,
        messages.length
      );

      // Determine preferred channel
      const preferredChannel = this.determinePreferredChannel(messages);

      // Determine communication style
      const communicationStyle = this.determineCommunicationStyle(messages);

      // Determine best time to contact
      const bestTimeToContact = this.determineBestContactTime(messages);

      return {
        responseTime: avgResponseTime,
        responseLength: avgResponseLength,
        questionCount,
        engagementLevel,
        preferredChannel,
        bestTimeToContact,
        communicationStyle,
      };
    } catch (error) {
      console.error('Engagement pattern analysis error:', error);
      return this.getFallbackEngagementPattern();
    }
  }

  async generateBehaviorAnalysis(
    leadId: string, 
    industry: string, 
    allMessages: any[]
  ): Promise<LeadBehaviorAnalysis> {
    try {
      // Analyze recent messages for sentiment trends
      const recentMessages = allMessages.slice(-10);
      const sentimentTrend: SentimentAnalysis[] = [];

      for (const message of recentMessages.filter(m => m.sender === 'lead')) {
        const sentiment = await this.analyzeSentiment(
          message.message_text, 
          leadId, 
          industry,
          recentMessages.slice(0, recentMessages.indexOf(message)).map(m => m.message_text)
        );
        sentimentTrend.push(sentiment);
      }

      // Analyze engagement pattern
      const engagementPattern = await this.analyzeEngagementPattern(leadId, allMessages, industry);

      // Extract buying and risk signals
      const buyingSignals = this.extractBuyingSignals(allMessages, industry);
      const riskSignals = this.extractRiskSignals(allMessages, industry);

      // Generate optimal approach
      const optimalApproach = await this.generateOptimalApproach(
        sentimentTrend, 
        engagementPattern, 
        industry
      );

      return {
        leadId,
        totalInteractions: allMessages.length,
        sentimentTrend,
        engagementPattern,
        buyingSignals,
        riskSignals,
        optimalApproach,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Behavior analysis error:', error);
      return this.getFallbackBehaviorAnalysis(leadId);
    }
  }

  private calculateResponseTimes(messages: any[]): number[] {
    const responseTimes: number[] = [];
    
    for (let i = 1; i < messages.length; i++) {
      const current = messages[i];
      const previous = messages[i - 1];
      
      if (current.sender === 'lead' && previous.sender === 'customer') {
        const timeDiff = new Date(current.sent_at).getTime() - new Date(previous.sent_at).getTime();
        const hours = timeDiff / (1000 * 60 * 60);
        responseTimes.push(hours);
      }
    }
    
    return responseTimes;
  }

  private determineEngagementLevel(
    avgResponseTime: number, 
    avgResponseLength: number, 
    questionCount: number,
    totalMessages: number
  ): 'high' | 'medium' | 'low' {
    let score = 0;
    
    // Response time score (faster = higher engagement)
    if (avgResponseTime < 2) score += 3;
    else if (avgResponseTime < 8) score += 2;
    else if (avgResponseTime < 24) score += 1;
    
    // Response length score (longer = higher engagement)
    if (avgResponseLength > 100) score += 2;
    else if (avgResponseLength > 50) score += 1;
    
    // Question count score
    if (questionCount > 5) score += 2;
    else if (questionCount > 2) score += 1;
    
    // Total messages score
    if (totalMessages > 10) score += 2;
    else if (totalMessages > 5) score += 1;
    
    if (score >= 6) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  }

  private determinePreferredChannel(messages: any[]): 'email' | 'whatsapp' | 'phone' {
    const channelCounts = messages.reduce((acc: any, msg) => {
      acc[msg.channel] = (acc[msg.channel] || 0) + 1;
      return acc;
    }, {});

    if (channelCounts.whatsapp > channelCounts.email) return 'whatsapp';
    if (channelCounts.email > channelCounts.whatsapp) return 'email';
    return 'phone';
  }

  private determineCommunicationStyle(messages: any[]): 'formal' | 'casual' | 'technical' | 'friendly' {
    const leadMessages = messages.filter(m => m.sender === 'lead');
    const allText = leadMessages.map(m => m.message_text).join(' ').toLowerCase();
    
    // Technical indicators
    if (allText.includes('technical') || allText.includes('specification') || allText.includes('details')) {
      return 'technical';
    }
    
    // Formal indicators
    if (allText.includes('sir') || allText.includes('madam') || allText.includes('regards')) {
      return 'formal';
    }
    
    // Casual indicators
    if (allText.includes('hey') || allText.includes('cool') || allText.includes('awesome')) {
      return 'casual';
    }
    
    return 'friendly';
  }

  private determineBestContactTime(messages: any[]): string {
    const leadMessages = messages.filter(m => m.sender === 'lead');
    const hours = leadMessages.map(m => new Date(m.sent_at).getHours());
    
    if (hours.length === 0) return '10:00 AM';
    
    // Find most common hour
    const hourCounts = hours.reduce((acc: any, hour) => {
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
    
    const mostCommonHour = Object.keys(hourCounts).reduce((a, b) => 
      hourCounts[a] > hourCounts[b] ? a : b
    );
    
    return `${mostCommonHour}:00`;
  }

  private extractBuyingSignals(messages: any[], industry: string): string[] {
    const industryContext = this.industryContexts[industry] || this.industryContexts.real_estate;
    const allText = messages.map(m => m.message_text).join(' ').toLowerCase();
    
    return industryContext.buyingSignals.filter(signal => 
      allText.includes(signal.toLowerCase())
    );
  }

  private extractRiskSignals(messages: any[], industry: string): string[] {
    const industryContext = this.industryContexts[industry] || this.industryContexts.real_estate;
    const allText = messages.map(m => m.message_text).join(' ').toLowerCase();
    
    return industryContext.riskSignals.filter(signal => 
      allText.includes(signal.toLowerCase())
    );
  }

  private async generateOptimalApproach(
    sentimentTrend: SentimentAnalysis[], 
    engagementPattern: EngagementPattern,
    industry: string
  ): Promise<string> {
    try {
      const prompt = `
Based on this lead's behavior analysis, suggest the optimal approach:

Sentiment Trend: ${sentimentTrend.map(s => s.sentiment).join(', ')}
Engagement Level: ${engagementPattern.engagementLevel}
Preferred Channel: ${engagementPattern.preferredChannel}
Communication Style: ${engagementPattern.communicationStyle}
Best Contact Time: ${engagementPattern.bestTimeToContact}
Industry: ${industry}

Provide a specific, actionable approach recommendation:
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 200,
      });

      return response.choices[0]?.message?.content || 'Follow up with personalized value proposition';
    } catch (error) {
      console.error('Optimal approach generation error:', error);
      return 'Follow up with personalized value proposition';
    }
  }

  private getFallbackSentiment(message: string, industry: string): SentimentAnalysis {
    const text = message.toLowerCase();
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    let confidence = 50;
    
    if (text.includes('interested') || text.includes('yes') || text.includes('perfect')) {
      sentiment = 'positive';
      confidence = 70;
    } else if (text.includes('not interested') || text.includes('no') || text.includes('expensive')) {
      sentiment = 'negative';
      confidence = 70;
    }

    return {
      sentiment,
      confidence,
      emotions: {
        interest: 50,
        urgency: 30,
        skepticism: 20,
        enthusiasm: 40,
        frustration: 10,
      },
      intent: 'information',
      keywords: [],
      recommendations: ['Follow up with more information'],
      nextAction: 'Send additional details',
    };
  }

  private getFallbackEngagementPattern(): EngagementPattern {
    return {
      responseTime: 24,
      responseLength: 50,
      questionCount: 1,
      engagementLevel: 'medium',
      preferredChannel: 'email',
      bestTimeToContact: '10:00 AM',
      communicationStyle: 'friendly',
    };
  }

  private getFallbackBehaviorAnalysis(leadId: string): LeadBehaviorAnalysis {
    return {
      leadId,
      totalInteractions: 0,
      sentimentTrend: [],
      engagementPattern: this.getFallbackEngagementPattern(),
      buyingSignals: [],
      riskSignals: [],
      optimalApproach: 'Follow up with personalized value proposition',
      lastUpdated: new Date().toISOString(),
    };
  }
}

export const sentimentAnalyzer = new SentimentAnalyzer();
