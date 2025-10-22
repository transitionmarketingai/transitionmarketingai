import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { predictiveAnalytics } from '@/lib/ai/predictiveAnalytics';

// POST - Get predictive analytics for leads
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
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get historical data
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .limit(1000);

    if (leadsError) {
      console.error('Fetch leads error:', leadsError);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Calculate conversions and revenue
    const conversions = leads.filter(lead => lead.status === 'won').length;
    const revenue = conversions * 50000; // Assume average revenue per conversion

    const historicalData = {
      leads: leads.map(lead => ({
        id: lead.id,
        name: lead.name,
        industry: lead.lead_data?.industry || 'unknown',
        source: lead.source,
        qualityScore: lead.quality_score || 50,
        status: lead.status,
        createdAt: lead.created_at,
        lastContactAt: lead.last_contact_at,
        contactCount: lead.contact_count || 0,
        leadData: lead.lead_data,
        city: lead.city,
        state: lead.state,
      })),
      conversions,
      revenue,
      timeRange: '90d',
    };

    // Get predictions for specific lead if provided
    if (body.leadId) {
      const lead = leads.find(l => l.id === body.leadId);
      if (lead) {
        const leadData = {
          id: lead.id,
          name: lead.name,
          industry: lead.lead_data?.industry || 'unknown',
          source: lead.source,
          qualityScore: lead.quality_score || 50,
          status: lead.status,
          createdAt: lead.created_at,
          lastContactAt: lead.last_contact_at,
          contactCount: lead.contact_count || 0,
          leadData: lead.lead_data,
          city: lead.city,
          state: lead.state,
        };

        const prediction = await predictiveAnalytics.predictLeadConversion(leadData, historicalData);

        return NextResponse.json({
          success: true,
          prediction,
          lead: leadData,
        });
      }
    }

    // Get campaign prediction if provided
    if (body.campaignData) {
      const campaignPrediction = await predictiveAnalytics.predictCampaignPerformance(
        body.campaignData,
        historicalData
      );

      return NextResponse.json({
        success: true,
        campaignPrediction,
      });
    }

    // Get performance forecast
    const forecast = await predictiveAnalytics.forecastPerformance(historicalData, body.period || '30d');

    return NextResponse.json({
      success: true,
      forecast,
      historicalData: {
        totalLeads: leads.length,
        conversions,
        conversionRate: leads.length > 0 ? (conversions / leads.length * 100).toFixed(1) : 0,
        revenue,
        avgRevenuePerLead: leads.length > 0 ? Math.round(revenue / leads.length) : 0,
      },
    });

  } catch (error: any) {
    console.error('Predictive analytics error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get analytics dashboard data
export async function GET(request: NextRequest) {
  try {
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

    // Get leads from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentLeads, error: recentLeadsError } = await supabase
      .from('leads')
      .select('*')
      .eq('customer_id', customer.id)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (recentLeadsError) {
      console.error('Fetch recent leads error:', recentLeadsError);
      return NextResponse.json(
        { error: 'Failed to fetch recent leads' },
        { status: 500 }
      );
    }

    // Calculate metrics
    const totalLeads = recentLeads.length;
    const conversions = recentLeads.filter(lead => lead.status === 'won').length;
    const conversionRate = totalLeads > 0 ? (conversions / totalLeads * 100) : 0;
    const avgQualityScore = totalLeads > 0 ? 
      recentLeads.reduce((sum, lead) => sum + (lead.quality_score || 50), 0) / totalLeads : 0;

    // Get source breakdown
    const sourceBreakdown = recentLeads.reduce((acc: any, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {});

    // Get status breakdown
    const statusBreakdown = recentLeads.reduce((acc: any, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    // Get intent breakdown
    const intentBreakdown = recentLeads.reduce((acc: any, lead) => {
      const intent = lead.intent || 'warm';
      acc[intent] = (acc[intent] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      analytics: {
        totalLeads,
        conversions,
        conversionRate: Math.round(conversionRate * 10) / 10,
        avgQualityScore: Math.round(avgQualityScore * 10) / 10,
        sourceBreakdown,
        statusBreakdown,
        intentBreakdown,
        period: '30d',
      },
    });

  } catch (error: any) {
    console.error('Analytics dashboard error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
