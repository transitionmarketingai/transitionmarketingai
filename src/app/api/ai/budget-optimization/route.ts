import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { intelligentBudgetAllocation } from '@/lib/ai/intelligentBudgetAllocation';

// POST - Optimize budget allocation
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
    if (!body.totalBudget || !body.goals) {
      return NextResponse.json(
        { error: 'Total budget and goals are required' },
        { status: 400 }
      );
    }

    // Get current campaign performance
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('customer_id', customer.id)
      .gte('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()); // Last 90 days

    if (campaignsError) {
      console.error('Fetch campaigns error:', campaignsError);
      return NextResponse.json(
        { error: 'Failed to fetch campaign data' },
        { status: 500 }
      );
    }

    // Convert campaigns to performance format
    const currentPerformance = campaigns?.map(campaign => ({
      campaignId: campaign.id,
      platform: campaign.platform,
      budget: campaign.budget || 0,
      spent: campaign.spent || 0,
      leads: campaign.leads_generated || 0,
      conversions: campaign.conversions || 0,
      revenue: campaign.revenue || 0,
      costPerLead: campaign.leads_generated > 0 ? (campaign.spent || 0) / campaign.leads_generated : 0,
      conversionRate: campaign.leads_generated > 0 ? ((campaign.conversions || 0) / campaign.leads_generated) * 100 : 0,
      roi: campaign.spent > 0 ? ((campaign.revenue || 0) / campaign.spent) * 100 : 0,
      period: '90d',
    })) || [];

    // Optimize budget allocation
    const budgetAllocation = await intelligentBudgetAllocation.optimizeBudgetAllocation(
      currentPerformance,
      body.totalBudget,
      customer.industry,
      body.goals
    );

    // Generate optimization recommendations
    const recommendations = await intelligentBudgetAllocation.generateOptimizationRecommendations(
      currentPerformance,
      customer.industry
    );

    // Generate market intelligence
    const marketIntelligence = await intelligentBudgetAllocation.analyzeMarketIntelligence(
      customer.industry,
      currentPerformance
    );

    return NextResponse.json({
      success: true,
      budgetAllocation,
      recommendations,
      marketIntelligence,
    });

  } catch (error: any) {
    console.error('Budget optimization error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get campaign performance predictions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const platform = searchParams.get('platform');
    const budget = searchParams.get('budget');
    const industry = searchParams.get('industry');
    
    if (!platform || !budget || !industry) {
      return NextResponse.json(
        { error: 'Platform, budget, and industry are required' },
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

    // Get historical performance for the platform
    const { data: historicalCampaigns } = await supabase
      .from('campaigns')
      .select('*')
      .eq('customer_id', customer.id)
      .eq('platform', platform)
      .gte('created_at', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()); // Last 180 days

    const historicalPerformance = historicalCampaigns?.map(campaign => ({
      campaignId: campaign.id,
      platform: campaign.platform,
      budget: campaign.budget || 0,
      spent: campaign.spent || 0,
      leads: campaign.leads_generated || 0,
      conversions: campaign.conversions || 0,
      revenue: campaign.revenue || 0,
      costPerLead: campaign.leads_generated > 0 ? (campaign.spent || 0) / campaign.leads_generated : 0,
      conversionRate: campaign.leads_generated > 0 ? ((campaign.conversions || 0) / campaign.leads_generated) * 100 : 0,
      roi: campaign.spent > 0 ? ((campaign.revenue || 0) / campaign.spent) * 100 : 0,
      period: '180d',
    })) || [];

    // Predict campaign performance
    const prediction = await intelligentBudgetAllocation.predictCampaignPerformance(
      platform,
      parseInt(budget),
      industry,
      historicalPerformance
    );

    return NextResponse.json({
      success: true,
      prediction,
      historicalPerformance,
    });

  } catch (error: any) {
    console.error('Campaign prediction error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
