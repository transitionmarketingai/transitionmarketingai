import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Ad Sync API
 * Fetches performance metrics from Google Ads and Meta Ads
 * Requires admin authentication OR cron secret
 */
export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication OR cron secret
    const cronSecret = request.headers.get('authorization')?.replace('Bearer ', '');
    const expectedCronSecret = process.env.CRON_SECRET;
    const isCronCall = expectedCronSecret && cronSecret === expectedCronSecret;
    
    // If not a cron call, require admin authentication
    if (!isCronCall) {
      const authError = requireAdmin(request);
      if (authError) {
        return authError;
      }
    }

    const results: any = {
      google: null,
      meta: null,
      syncedAt: new Date().toISOString(),
    };

    // Google Ads API
    const googleAdsCustomerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
    const googleAdsDeveloperToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
    const googleAdsRefreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
    const googleAdsClientId = process.env.GOOGLE_ADS_CLIENT_ID;
    const googleAdsClientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;

    if (googleAdsCustomerId && googleAdsDeveloperToken && googleAdsRefreshToken) {
      try {
        // First, get access token using refresh token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: googleAdsClientId || '',
            client_secret: googleAdsClientSecret || '',
            refresh_token: googleAdsRefreshToken,
            grant_type: 'refresh_token',
          }),
        });

        let accessToken = '';
        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json();
          accessToken = tokenData.access_token;
        }

        if (accessToken) {
          // Fetch campaign performance data
          const gAdsResponse = await fetch(
            `https://googleads.googleapis.com/v14/customers/${googleAdsCustomerId}/googleAds:searchStream`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'developer-token': googleAdsDeveloperToken,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: `
                  SELECT 
                    campaign.name,
                    campaign.id,
                    metrics.cost_micros,
                    metrics.clicks,
                    metrics.conversions,
                    metrics.ctr,
                    metrics.impressions,
                    segments.date
                  FROM campaign
                  WHERE segments.date DURING LAST_7_DAYS
                  ORDER BY metrics.cost_micros DESC
                `,
              }),
            }
          );

          if (gAdsResponse.ok) {
            const gAdsData = await gAdsResponse.json();
            results.google = {
              campaigns: gAdsData.results || [],
              totalCampaigns: gAdsData.results?.length || 0,
            };
          } else {
            console.error('[Ads Sync] Google Ads API error:', await gAdsResponse.text());
          }
        }
      } catch (error) {
        console.error('[Ads Sync] Google Ads error:', error);
      }
    }

    // Meta Ads API
    const metaAccessToken = process.env.META_ACCESS_TOKEN;
    const metaAdAccountId = process.env.META_AD_ACCOUNT_ID;

    if (metaAccessToken && metaAdAccountId) {
      try {
        const metaResponse = await fetch(
          `https://graph.facebook.com/v20.0/act_${metaAdAccountId}/insights?fields=campaign_name,campaign_id,spend,clicks,actions,cpc,ctr,impressions,date_start,date_stop&date_preset=last_7d&access_token=${metaAccessToken}`,
          {
            method: 'GET',
          }
        );

        if (metaResponse.ok) {
          const metaData = await metaResponse.json();
          results.meta = {
            campaigns: metaData.data || [],
            totalCampaigns: metaData.data?.length || 0,
          };
        } else {
          console.error('[Ads Sync] Meta Ads API error:', await metaResponse.text());
        }
      } catch (error) {
        console.error('[Ads Sync] Meta Ads error:', error);
      }
    }

    // Store synced data in Airtable (optional)
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const adPerformanceTableName = process.env.AIRTABLE_AD_PERFORMANCE_TABLE_NAME || 'AdPerformance';

    if (airtableApiKey && airtableBaseId && (results.google || results.meta)) {
      try {
        await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${adPerformanceTableName}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  Platform: results.google ? 'Google' : 'Meta',
                  'Synced At': results.syncedAt,
                  'Campaign Count': results.google?.totalCampaigns || results.meta?.totalCampaigns || 0,
                  'Data': JSON.stringify(results),
                },
              },
            ],
          }),
        });
      } catch (logError) {
        console.error('[Ads Sync] Airtable logging error:', logError);
      }
    }

    // Fire analytics event
    trackEvent('ad_sync_completed', {
      event_category: 'ads',
      event_label: 'ad_sync',
      google_campaigns: results.google?.totalCampaigns || 0,
      meta_campaigns: results.meta?.totalCampaigns || 0,
    });

    return NextResponse.json(createSuccessResponse(results));
  } catch (error: any) {
    console.error('[Ads Sync] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


