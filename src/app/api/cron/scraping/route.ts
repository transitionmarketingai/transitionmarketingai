import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// GET - Cron job to run scheduled scraping campaigns
// Will be called by Vercel Cron or external scheduler
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (security)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Find campaigns that need to run
    const now = new Date();
    const { data: campaigns } = await supabase
      .from('scraping_campaigns')
      .select('*')
      .eq('status', 'active')
      .lte('next_run_at', now.toISOString());

    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json({
        message: 'No campaigns to run',
        executed: 0,
      });
    }

    console.log(`Found ${campaigns.length} scraping campaigns to execute`);

    const results = [];

    // Execute each campaign
    for (const campaign of campaigns) {
      try {
        // Call execute endpoint
        const executeResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/scraping/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId: campaign.id }),
        });

        const result = await executeResponse.json();
        results.push({
          campaign_id: campaign.id,
          campaign_name: campaign.name,
          success: result.success,
          contacts_saved: result.contacts_saved,
        });

        console.log(`Campaign ${campaign.name}: ${result.contacts_saved} contacts added`);

      } catch (error: any) {
        console.error(`Campaign ${campaign.id} failed:`, error);
        results.push({
          campaign_id: campaign.id,
          success: false,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      executed: campaigns.length,
      results,
    });

  } catch (error: any) {
    console.error('Cron scraping error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

