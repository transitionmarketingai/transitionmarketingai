import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// GET - Cron job to run scheduled outreach campaigns
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Find campaigns that should run now
    const now = new Date();
    const { data: campaigns } = await supabase
      .from('outreach_campaigns')
      .select('*')
      .in('status', ['scheduled', 'running'])
      .lte('schedule_date', now.toISOString());

    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json({
        message: 'No outreach campaigns to run',
        executed: 0,
      });
    }

    console.log(`Found ${campaigns.length} outreach campaigns to execute`);

    const results = [];

    // Execute each campaign
    for (const campaign of campaigns) {
      try {
        // Call execute endpoint
        const executeResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/outreach/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId: campaign.id }),
        });

        const result = await executeResponse.json();
        results.push({
          campaign_id: campaign.id,
          campaign_name: campaign.name,
          success: result.success,
          sent: result.sent,
        });

        console.log(`Outreach campaign ${campaign.name}: ${result.sent} messages sent`);

        // Update campaign status
        await supabase
          .from('outreach_campaigns')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', campaign.id);

      } catch (error: any) {
        console.error(`Outreach campaign ${campaign.id} failed:`, error);
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
    console.error('Cron outreach error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

