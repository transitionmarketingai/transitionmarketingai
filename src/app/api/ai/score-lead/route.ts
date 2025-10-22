import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { aiLeadScorer } from '@/lib/ai/leadScorer';

// POST - Score a lead using AI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('id, industry')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', body.leadId)
      .eq('customer_id', customer.id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Prepare scoring criteria
    const scoringCriteria = {
      industry: customer.industry,
      companySize: lead.lead_data?.companySize,
      jobTitle: lead.lead_data?.jobTitle,
      location: lead.city,
      budget: lead.lead_data?.budget,
      timeline: lead.lead_data?.timeline,
      source: lead.source,
      engagementLevel: lead.contact_count > 0 ? 'medium' : 'low',
    };

    // Score the lead
    const score = await aiLeadScorer.scoreLead(scoringCriteria);

    // Update lead with AI score
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        quality_score: score.overallScore,
        intent: score.intent,
        ai_analysis: {
          breakdown: score.breakdown,
          reasoning: score.reasoning,
          recommendations: score.recommendations,
          scored_at: new Date().toISOString(),
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', lead.id);

    if (updateError) {
      console.error('Update lead score error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update lead score' },
        { status: 500 }
      );
    }

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: customer.id,
      type: 'system',
      title: 'Lead Scored by AI',
      message: `${lead.name} scored ${score.overallScore}/100 (${score.intent} intent)`,
      lead_id: lead.id,
      priority: 'normal',
    });

    return NextResponse.json({
      success: true,
      score,
      lead: {
        ...lead,
        quality_score: score.overallScore,
        intent: score.intent,
        ai_analysis: score,
      },
    });

  } catch (error: any) {
    console.error('AI lead scoring error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get AI scoring insights for a lead
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const leadId = searchParams.get('leadId');
    
    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get lead with AI analysis
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .eq('customer_id', customer.id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead,
      aiAnalysis: lead.ai_analysis || null,
    });

  } catch (error: any) {
    console.error('Get AI analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
