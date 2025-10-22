import OpenAI from 'openai';

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
}

export interface LeadScoringResult {
  quality_score: number; // 0-100
  intent: 'hot' | 'warm' | 'cold';
  reasoning: string;
  insights: string[];
  recommendations: string[];
}

export async function scoreLead(
  leadData: any,
  industry: string
): Promise<LeadScoringResult> {
  try {
    const prompt = buildScoringPrompt(leadData, industry);

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert lead qualification analyst for the ${industry} industry in India. 
Your job is to analyze incoming leads and score them based on quality, intent, and likelihood to convert.
You must respond ONLY with valid JSON, no markdown or explanatory text.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const result = JSON.parse(response);

    return {
      quality_score: result.quality_score,
      intent: result.intent,
      reasoning: result.reasoning,
      insights: result.insights || [],
      recommendations: result.recommendations || [],
    };

  } catch (error: any) {
    console.error('AI scoring error:', error);
    
    // Fallback to basic scoring
    return {
      quality_score: calculateBasicScore(leadData),
      intent: 'warm',
      reasoning: 'Basic scoring used (AI unavailable)',
      insights: [],
      recommendations: ['Contact within 24 hours', 'Verify contact details'],
    };
  }
}

function buildScoringPrompt(leadData: any, industry: string): string {
  return `Analyze this ${industry} lead and provide a quality score (0-100) and intent level (hot/warm/cold).

Lead Information:
${JSON.stringify(leadData, null, 2)}

Scoring Criteria:
1. Completeness (40%): How complete is the lead data?
2. Intent Signals (30%): Budget mentioned? Timeline specified? Specific requirements?
3. Contact Quality (20%): Valid email? Phone number provided? Professional details?
4. Industry Fit (10%): Does the inquiry match ${industry} needs?

Respond ONLY with this JSON structure (no markdown, no explanation):
{
  "quality_score": <number 0-100>,
  "intent": "<hot|warm|cold>",
  "reasoning": "<brief explanation>",
  "insights": ["<insight 1>", "<insight 2>"],
  "recommendations": ["<action 1>", "<action 2>"]
}`;
}

function calculateBasicScore(leadData: any): number {
  let score = 50; // Base score

  // Check for required fields
  if (leadData.name || leadData.full_name) score += 10;
  if (leadData.phone || leadData.phone_number) score += 15;
  if (leadData.email) score += 15;

  // Check for quality signals
  if (leadData.budget || leadData.budget_range) score += 10;
  if (leadData.timeline || leadData.when_to_buy) score += 10;
  if (leadData.location || leadData.city) score += 5;

  // Check for detailed responses (longer text = more engaged)
  const textFields = Object.values(leadData).filter(v => 
    typeof v === 'string' && v.length > 50
  );
  score += Math.min(textFields.length * 5, 15);

  return Math.min(Math.max(score, 0), 100);
}

// Function to score lead and update database
export async function scoreAndUpdateLead(leadId: string, leadData: any, industry: string, supabase: any) {
  try {
    const scoringResult = await scoreLead(leadData, industry);

    // Update lead in database
    await supabase
      .from('leads')
      .update({
        quality_score: scoringResult.quality_score,
        intent: scoringResult.intent,
        ai_analysis: {
          reasoning: scoringResult.reasoning,
          insights: scoringResult.insights,
          recommendations: scoringResult.recommendations,
          scored_at: new Date().toISOString(),
        },
      })
      .eq('id', leadId);

    return scoringResult;

  } catch (error) {
    console.error('Score and update lead error:', error);
    return null;
  }
}


