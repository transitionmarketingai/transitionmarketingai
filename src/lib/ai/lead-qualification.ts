import OpenAI from 'openai';

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
}

interface LeadQualificationInput {
  name?: string;
  email?: string;
  phone?: string;
  form_responses?: Record<string, any>;
  industry: string;
  target_audience?: {
    description?: string;
    age_range?: { min?: number; max?: number };
    income_level?: string;
  };
}

interface LeadQualificationResult {
  quality_score: number; // 0-100
  qualification_status: 'hot' | 'warm' | 'qualified' | 'cold' | 'unqualified';
  qualification_reason: string;
  ai_summary: string;
  buying_intent: 'high' | 'medium' | 'low';
  key_signals: string[];
  red_flags: string[];
  recommended_action: string;
}

export async function qualifyLeadWithAI(
  input: LeadQualificationInput
): Promise<LeadQualificationResult> {
  try {
    const prompt = buildQualificationPrompt(input);

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert lead qualification AI for ${input.industry} businesses in India. 
Your job is to analyze lead data and determine if they are a high-quality prospect worth pursuing.

Scoring Criteria:
- Contact Information Quality (0-20 points)
- Budget/Financial Capacity (0-25 points)
- Timeline/Urgency (0-20 points)
- Need/Pain Point (0-20 points)
- Decision-Making Authority (0-15 points)

Quality Levels:
- 80-100: HOT (immediate opportunity, high intent)
- 60-79: WARM (qualified, good potential)
- 40-59: QUALIFIED (meets basics, needs nurturing)
- 20-39: COLD (low intent, long-term prospect)
- 0-19: UNQUALIFIED (not a fit)

Provide detailed analysis in JSON format.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3, // Lower temperature for consistent scoring
      max_tokens: 1000
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // Validate and normalize the result
    return {
      quality_score: Math.min(100, Math.max(0, result.quality_score || 50)),
      qualification_status: determineStatus(result.quality_score || 50),
      qualification_reason: result.qualification_reason || 'Lead analyzed by AI',
      ai_summary: result.ai_summary || 'Lead information captured',
      buying_intent: result.buying_intent || 'medium',
      key_signals: result.key_signals || [],
      red_flags: result.red_flags || [],
      recommended_action: result.recommended_action || 'Contact lead within 24 hours'
    };

  } catch (error) {
    console.error('AI qualification error:', error);
    
    // Fallback to rule-based qualification if AI fails
    return fallbackQualification(input);
  }
}

function buildQualificationPrompt(input: LeadQualificationInput): string {
  return `Analyze this lead and provide qualification score and details:

LEAD INFORMATION:
Name: ${input.name || 'Not provided'}
Email: ${input.email || 'Not provided'}
Phone: ${input.phone || 'Not provided'}

INDUSTRY: ${input.industry}

TARGET AUDIENCE:
${input.target_audience?.description || 'General audience'}
${input.target_audience?.income_level ? `Income Level: ${input.target_audience.income_level}` : ''}

FORM RESPONSES:
${JSON.stringify(input.form_responses, null, 2)}

ANALYZE:
1. Contact information quality (phone/email valid?)
2. Budget/financial capacity signals
3. Timeline/urgency indicators
4. Pain points and needs
5. Decision-making signals
6. Red flags or concerns

Provide response in this JSON format:
{
  "quality_score": <0-100>,
  "qualification_reason": "<why this score, 1-2 sentences>",
  "ai_summary": "<brief summary of the lead, 2-3 sentences>",
  "buying_intent": "<high|medium|low>",
  "key_signals": ["<positive signal 1>", "<positive signal 2>"],
  "red_flags": ["<concern 1>", "<concern 2>"],
  "recommended_action": "<what to do next>"
}`;
}

function determineStatus(score: number): 'hot' | 'warm' | 'qualified' | 'cold' | 'unqualified' {
  if (score >= 80) return 'hot';
  if (score >= 60) return 'warm';
  if (score >= 40) return 'qualified';
  if (score >= 20) return 'cold';
  return 'unqualified';
}

// Fallback rule-based qualification if AI fails
function fallbackQualification(input: LeadQualificationInput): LeadQualificationResult {
  let score = 0;
  const signals: string[] = [];
  const redFlags: string[] = [];

  // Contact information quality (0-20 points)
  if (input.email && input.email.includes('@') && !input.email.includes('test')) {
    score += 10;
    signals.push('Valid email provided');
  }
  if (input.phone && input.phone.match(/^[6-9]\d{9}$/)) {
    score += 10;
    signals.push('Valid Indian mobile number');
  }

  // Form response quality (0-30 points)
  if (input.form_responses) {
    const responses = Object.keys(input.form_responses).length;
    score += Math.min(30, responses * 5);
    
    if (responses >= 4) {
      signals.push('Detailed information provided');
    }

    // Industry-specific signals
    if (input.industry === 'real_estate') {
      if (input.form_responses.budget || input.form_responses.budget_range) {
        score += 15;
        signals.push('Budget information provided');
      }
      if (input.form_responses.timeline) {
        const timeline = input.form_responses.timeline?.toLowerCase() || '';
        if (timeline.includes('immediate') || timeline.includes('3 months')) {
          score += 15;
          signals.push('Urgent timeline indicated');
        }
      }
    }

    if (input.industry === 'insurance') {
      if (input.form_responses.coverage || input.form_responses.coverage_amount) {
        score += 15;
        signals.push('Coverage requirements specified');
      }
    }
  }

  // Basic validation
  if (!input.name || input.name.length < 3) {
    redFlags.push('Name might be invalid');
  }
  if (!input.phone && !input.email) {
    redFlags.push('No contact method provided');
    score -= 20;
  }

  const finalScore = Math.min(100, Math.max(0, score));

  return {
    quality_score: finalScore,
    qualification_status: determineStatus(finalScore),
    qualification_reason: `Lead scored ${finalScore}/100 based on contact information and form responses`,
    ai_summary: `${input.name || 'Lead'} from ${input.industry} inquiry. Contact via ${input.phone || input.email || 'form'}.`,
    buying_intent: finalScore >= 60 ? 'high' : finalScore >= 40 ? 'medium' : 'low',
    key_signals: signals,
    red_flags: redFlags,
    recommended_action: finalScore >= 60 
      ? 'Contact immediately - high priority' 
      : 'Contact within 24-48 hours'
  };
}

// Helper function for batch qualification
export async function qualifyLeadsBatch(
  leads: LeadQualificationInput[]
): Promise<LeadQualificationResult[]> {
  const results = await Promise.allSettled(
    leads.map(lead => qualifyLeadWithAI(lead))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      console.error(`Failed to qualify lead ${index}:`, result.reason);
      return fallbackQualification(leads[index]);
    }
  });
}

// Helper to recalculate score based on engagement
export function adjustScoreBasedOnEngagement(
  originalScore: number,
  engagementData: {
    responded?: boolean;
    responseTime?: number; // hours
    messagesExchanged?: number;
    appointmentBooked?: boolean;
  }
): number {
  let adjustedScore = originalScore;

  if (engagementData.responded) {
    adjustedScore += 10;
  }

  if (engagementData.responseTime && engagementData.responseTime < 1) {
    adjustedScore += 5; // Quick response
  }

  if (engagementData.messagesExchanged && engagementData.messagesExchanged > 3) {
    adjustedScore += 10; // Active engagement
  }

  if (engagementData.appointmentBooked) {
    adjustedScore += 15; // Very strong signal
  }

  return Math.min(100, adjustedScore);
}


