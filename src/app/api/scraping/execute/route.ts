import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { runScrapingCampaign, saveScrapedContacts } from '@/lib/scraping/scraper';

// POST - Execute scraping campaign (called by cron job or manual trigger)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId } = body;

    if (!campaignId) {
      return NextResponse.json({ error: 'campaignId is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Get campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('scraping_campaigns')
      .select('*, customers(*)')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status !== 'active') {
      return NextResponse.json({ error: 'Campaign is not active' }, { status: 400 });
    }

    console.log(`Executing scraping campaign: ${campaign.name}`);

    // Run scraping
    const scrapedContacts = await runScrapingCampaign(
      campaign.id,
      campaign.search_criteria,
      campaign.scraping_sources,
      campaign.max_contacts_per_run,
      campaign.customers.industry
    );

    console.log(`Scraped ${scrapedContacts.length} contacts`);

    // Save to database
    const savedContacts = await saveScrapedContacts(
      supabase,
      campaign.customer_id,
      campaign.id,
      scrapedContacts,
      campaign.quality_threshold
    );

    console.log(`Saved ${savedContacts.length} contacts (above quality threshold)`);

    // Calculate next run time
    const nextRun = new Date();
    if (campaign.frequency === 'daily') {
      nextRun.setDate(nextRun.getDate() + 1);
      nextRun.setHours(parseInt(campaign.schedule_time.split(':')[0]), 0, 0, 0);
    } else if (campaign.frequency === 'weekly') {
      nextRun.setDate(nextRun.getDate() + 7);
      nextRun.setHours(parseInt(campaign.schedule_time.split(':')[0]), 0, 0, 0);
    }

    // Update campaign
    await supabase
      .from('scraping_campaigns')
      .update({
        contacts_generated: campaign.contacts_generated + savedContacts.length,
        total_contacts: campaign.total_contacts + scrapedContacts.length,
        last_run_at: new Date().toISOString(),
        last_run_status: 'success',
        last_run_contacts_found: savedContacts.length,
        next_run_at: campaign.frequency === 'once' ? null : nextRun.toISOString(),
        status: campaign.frequency === 'once' ? 'completed' : 'active',
      })
      .eq('id', campaign.id);

    // Create notification
    if (savedContacts.length > 0) {
      await supabase.from('notifications').insert({
        customer_id: campaign.customer_id,
        type: 'system',
        title: 'New Contacts Added',
        message: `${savedContacts.length} new contacts were added from AI scraping campaign "${campaign.name}"`,
        priority: 'normal',
        action_url: '/dashboard/contacts',
        action_label: 'View Contacts',
      });
    }

    return NextResponse.json({
      success: true,
      campaign_id: campaign.id,
      contacts_scraped: scrapedContacts.length,
      contacts_saved: savedContacts.length,
      next_run_at: campaign.frequency === 'once' ? null : nextRun.toISOString(),
    });

  } catch (error: any) {
    console.error('Execute scraping error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

