import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch ad campaigns
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
    const platform = searchParams.get('platform'); // 'meta' or 'google'
    const status = searchParams.get('status');

    let query = supabase
      .from('ad_campaigns')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false });

    if (platform) {
      query = query.eq('platform', platform);
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: campaigns, error } = await query;

    if (error) {
      console.error('Fetch ad campaigns error:', error);
      return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
    }

    // Get statistics
    const stats = {
      total: campaigns?.length || 0,
      active: campaigns?.filter(c => c.status === 'active').length || 0,
      paused: campaigns?.filter(c => c.status === 'paused').length || 0,
      total_spent: campaigns?.reduce((sum, c) => sum + (c.spent_amount || 0), 0) || 0,
      total_leads: campaigns?.reduce((sum, c) => sum + (c.leads_generated || 0), 0) || 0,
    };

    return NextResponse.json({
      campaigns: campaigns || [],
      statistics: stats,
    });

  } catch (error: any) {
    console.error('Ad campaigns API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create new ad campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    // Validate
    if (!body.name || !body.platform || !body.budget_amount) {
      return NextResponse.json(
        { error: 'name, platform, and budget_amount are required' },
        { status: 400 }
      );
    }

    // Create campaign
    const { data: campaign, error: createError } = await supabase
      .from('ad_campaigns')
      .insert({
        customer_id: customer.id,
        platform: body.platform,
        campaign_type: 'lead_generation',
        name: body.name,
        status: 'draft',
        budget_type: body.budget_type || 'daily',
        budget_amount: body.budget_amount,
        targeting: body.targeting || {},
        ad_creative: body.ad_creative || {},
        lead_form: body.lead_form || {},
      })
      .select()
      .single();

    if (createError) {
      console.error('Create ad campaign error:', createError);
      return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
    }

    // TODO: Create actual campaign in Meta/Google Ads
    // This will be done when campaign is activated

    return NextResponse.json({
      success: true,
      campaign,
    });

  } catch (error: any) {
    console.error('Create ad campaign error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

