import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch scraping campaigns
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

    const { data: campaigns, error } = await supabase
      .from('scraping_campaigns')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch scraping campaigns error:', error);
      return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
    }

    return NextResponse.json({
      campaigns: campaigns || [],
      total: campaigns?.length || 0,
    });

  } catch (error: any) {
    console.error('Scraping campaigns API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create scraping campaign
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

    // Calculate next run time
    const nextRun = new Date();
    if (body.frequency === 'daily') {
      nextRun.setDate(nextRun.getDate() + 1);
    } else if (body.frequency === 'weekly') {
      nextRun.setDate(nextRun.getDate() + 7);
    }

    const { data: campaign, error: createError } = await supabase
      .from('scraping_campaigns')
      .insert({
        customer_id: customer.id,
        name: body.name,
        status: 'active',
        search_criteria: body.search_criteria || {},
        scraping_sources: body.scraping_sources || ['google_maps'],
        frequency: body.frequency || 'daily',
        schedule_time: body.schedule_time || '09:00:00',
        max_contacts_per_run: body.max_contacts_per_run || 100,
        quality_threshold: body.quality_threshold || 60,
        next_run_at: nextRun.toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('Create scraping campaign error:', createError);
      return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      campaign,
    });

  } catch (error: any) {
    console.error('Create scraping campaign error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

