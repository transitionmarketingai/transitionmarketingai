import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch dashboard analytics
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30'; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // 1. Contacts statistics
    const { data: contactsData } = await supabase
      .from('contacts')
      .select('*')
      .eq('customer_id', customer.id)
      .gte('created_at', startDate.toISOString());

    const contactsStats = {
      total: contactsData?.length || 0,
      pending: contactsData?.filter(c => c.outreach_status === 'pending').length || 0,
      sent: contactsData?.filter(c => c.outreach_status === 'sent').length || 0,
      responded: contactsData?.filter(c => c.outreach_status === 'responded').length || 0,
      converted: contactsData?.filter(c => c.converted_to_lead).length || 0,
      avg_quality_score: Math.round(
        contactsData?.reduce((sum, c) => sum + (c.quality_score || 0), 0) / (contactsData?.length || 1)
      ),
    };

    // 2. Leads statistics
    const { data: leadsData } = await supabase
      .from('leads')
      .select('*')
      .eq('customer_id', customer.id)
      .gte('received_at', startDate.toISOString());

    const leadsStats = {
      total: leadsData?.length || 0,
      by_source: {
        outreach: leadsData?.filter(l => l.source === 'outreach_response').length || 0,
        meta_ads: leadsData?.filter(l => l.source === 'meta_ads').length || 0,
        google_ads: leadsData?.filter(l => l.source === 'google_ads').length || 0,
      },
      by_status: {
        new: leadsData?.filter(l => l.status === 'new').length || 0,
        contacted: leadsData?.filter(l => l.status === 'contacted').length || 0,
        qualified: leadsData?.filter(l => l.status === 'qualified').length || 0,
        won: leadsData?.filter(l => l.status === 'won').length || 0,
      },
      by_intent: {
        hot: leadsData?.filter(l => l.intent === 'hot').length || 0,
        warm: leadsData?.filter(l => l.intent === 'warm').length || 0,
        cold: leadsData?.filter(l => l.intent === 'cold').length || 0,
      },
      avg_quality_score: Math.round(
        leadsData?.reduce((sum, l) => sum + (l.quality_score || 0), 0) / (leadsData?.length || 1)
      ),
    };

    // 3. Campaign performance
    const { data: adCampaigns } = await supabase
      .from('ad_campaigns')
      .select('*')
      .eq('customer_id', customer.id);

    const campaignStats = {
      total_campaigns: adCampaigns?.length || 0,
      active_campaigns: adCampaigns?.filter(c => c.status === 'active').length || 0,
      total_spent: adCampaigns?.reduce((sum, c) => sum + (c.spent_amount || 0), 0) || 0,
      total_impressions: adCampaigns?.reduce((sum, c) => sum + (c.impressions || 0), 0) || 0,
      total_clicks: adCampaigns?.reduce((sum, c) => sum + (c.clicks || 0), 0) || 0,
      leads_from_ads: adCampaigns?.reduce((sum, c) => sum + (c.leads_generated || 0), 0) || 0,
      avg_cpl: Math.round(
        adCampaigns?.reduce((sum, c) => sum + (c.cost_per_lead || 0), 0) / (adCampaigns?.length || 1)
      ),
    };

    // 4. Outreach performance
    const { data: outreachCampaigns } = await supabase
      .from('outreach_campaigns')
      .select('*')
      .eq('customer_id', customer.id);

    const outreachStats = {
      total_campaigns: outreachCampaigns?.length || 0,
      total_sent: outreachCampaigns?.reduce((sum, c) => sum + (c.sent_count || 0), 0) || 0,
      total_responses: outreachCampaigns?.reduce((sum, c) => sum + (c.response_count || 0), 0) || 0,
      response_rate: outreachCampaigns?.length 
        ? Math.round((outreachCampaigns.reduce((sum, c) => sum + (c.response_count || 0), 0) / 
            outreachCampaigns.reduce((sum, c) => sum + (c.sent_count || 1), 0)) * 100)
        : 0,
      conversions: outreachCampaigns?.reduce((sum, c) => sum + (c.conversion_count || 0), 0) || 0,
    };

    // 5. Trend data (last 30 days)
    const trendData = await generateTrendData(customer.id, supabase);

    return NextResponse.json({
      contacts: contactsStats,
      leads: leadsStats,
      campaigns: campaignStats,
      outreach: outreachStats,
      trends: trendData,
      period_days: parseInt(period),
    });

  } catch (error: any) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Generate trend data for charts
async function generateTrendData(customerId: string, supabase: any) {
  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    // Contacts added
    const { count: contactsCount } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', customerId)
      .gte('created_at', date.toISOString())
      .lt('created_at', nextDate.toISOString());

    // Leads received
    const { count: leadsCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', customerId)
      .gte('received_at', date.toISOString())
      .lt('received_at', nextDate.toISOString());

    last30Days.push({
      date: date.toISOString().split('T')[0],
      contacts: contactsCount || 0,
      leads: leadsCount || 0,
    });
  }

  return last30Days;
}

