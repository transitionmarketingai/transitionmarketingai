import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { competitorIntelligence } from '@/lib/ai/competitorIntelligence';

// POST - Generate competitive intelligence
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

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
      .select('id, industry, business_name')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.industry) {
      return NextResponse.json(
        { error: 'Industry is required' },
        { status: 400 }
      );
    }

    // Get customer's business data for analysis
    const { data: campaigns } = await supabase
      .from('campaigns')
      .select('*')
      .eq('customer_id', customer.id)
      .limit(10);

    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .eq('customer_id', customer.id)
      .limit(100);

    const yourBusinessData = {
      businessName: customer.business_name,
      industry: customer.industry,
      campaigns: campaigns?.length || 0,
      leads: leads?.length || 0,
      avgLeadValue: leads?.length > 0 ? 
        leads.reduce((sum, lead) => sum + (lead.lead_data?.budget || 0), 0) / leads.length : 0,
    };

    // Generate competitive intelligence
    const competitiveIntelligence = await competitorIntelligence.generateCompetitiveIntelligence(
      body.industry,
      yourBusinessData
    );

    // Save intelligence report to database
    const { data: intelligenceReport, error: saveError } = await supabase
      .from('intelligence_reports')
      .insert({
        customer_id: customer.id,
        industry: body.industry,
        report_type: 'competitive_intelligence',
        data: competitiveIntelligence,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) {
      console.error('Save intelligence report error:', saveError);
      // Don't fail the request if save fails
    }

    return NextResponse.json({
      success: true,
      competitiveIntelligence,
      reportId: intelligenceReport?.id,
    });

  } catch (error: any) {
    console.error('Competitive intelligence error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get market insights
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const industry = searchParams.get('industry');
    const timeHorizon = searchParams.get('timeHorizon') as 'short' | 'medium' | 'long' || 'medium';
    
    if (!industry) {
      return NextResponse.json(
        { error: 'Industry is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

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

    // Generate market insights
    const marketInsights = await competitorIntelligence.generateMarketInsights(
      industry,
      timeHorizon
    );

    return NextResponse.json({
      success: true,
      marketInsights,
    });

  } catch (error: any) {
    console.error('Market insights error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Analyze specific competitor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

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
    if (!body.competitorName || !body.industry) {
      return NextResponse.json(
        { error: 'Competitor name and industry are required' },
        { status: 400 }
      );
    }

    // Get customer's business data for comparison
    const { data: campaigns } = await supabase
      .from('campaigns')
      .select('*')
      .eq('customer_id', customer.id)
      .limit(10);

    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .eq('customer_id', customer.id)
      .limit(100);

    const yourPosition = {
      campaigns: campaigns?.length || 0,
      leads: leads?.length || 0,
      avgLeadValue: leads?.length > 0 ? 
        leads.reduce((sum, lead) => sum + (lead.lead_data?.budget || 0), 0) / leads.length : 0,
    };

    // Analyze competitor
    const competitorAnalysis = await competitorIntelligence.analyzeCompetitor(
      body.competitorName,
      body.industry,
      yourPosition
    );

    return NextResponse.json({
      success: true,
      competitorAnalysis,
    });

  } catch (error: any) {
    console.error('Competitor analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
