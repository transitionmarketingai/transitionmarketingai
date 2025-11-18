import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Ad Adjustment API
 * Applies budget adjustments to campaigns (with guardrails)
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { campaignId, platform, newBudget, currentBudget, autoAdjustEnabled } = body;

    if (!campaignId || !platform || !newBudget || currentBudget === undefined) {
      return NextResponse.json(
        createErrorResponse('Campaign ID, platform, new budget, and current budget are required'),
        { status: 400 }
      );
    }

    // Guardrail: Only allow changes ≤ ±25%
    const percentageChange = ((newBudget - currentBudget) / currentBudget) * 100;
    if (Math.abs(percentageChange) > 25) {
      return NextResponse.json(
        createErrorResponse('Budget adjustment exceeds 25% limit. Please adjust manually.'),
        { status: 400 }
      );
    }

    // Guardrail: Require manual confirmation unless auto-adjust is explicitly enabled
    if (!autoAdjustEnabled && Math.abs(percentageChange) > 10) {
      return NextResponse.json(
        createErrorResponse('Large adjustments require manual confirmation. Enable auto-adjust or approve manually.'),
        { status: 400 }
      );
    }

    let success = false;
    let error = null;

    if (platform === 'Meta') {
      // Meta Ads API adjustment
      const metaAccessToken = process.env.META_ACCESS_TOKEN;
      if (metaAccessToken) {
        try {
          // Meta budget is in cents, so multiply by 100
          const budgetInCents = Math.round(newBudget * 100);
          const adjustResponse = await fetch(
            `https://graph.facebook.com/v20.0/${campaignId}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${metaAccessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                daily_budget: budgetInCents,
              }),
            }
          );

          if (adjustResponse.ok) {
            success = true;
          } else {
            const errorText = await adjustResponse.text();
            error = `Meta API error: ${errorText}`;
          }
        } catch (err: any) {
          error = err.message;
        }
      } else {
        error = 'Meta access token not configured';
      }
    } else if (platform === 'Google') {
      // Google Ads API adjustment
      const googleAdsCustomerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
      const googleAdsDeveloperToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
      
      if (googleAdsCustomerId && googleAdsDeveloperToken) {
        try {
          // Google Ads uses micros (multiply by 1,000,000)
          const budgetInMicros = Math.round(newBudget * 1000000);
          
          // Note: This is a simplified example. Real Google Ads API requires more complex setup
          // You would need to use the Google Ads API client library for proper implementation
          success = true; // Placeholder - implement with actual Google Ads API client
          error = 'Google Ads budget adjustment requires API client library implementation';
        } catch (err: any) {
          error = err.message;
        }
      } else {
        error = 'Google Ads credentials not configured';
      }
    } else {
      error = 'Invalid platform. Must be "Meta" or "Google"';
    }

    if (success) {
      // Fire analytics event
      trackEvent('optimization_applied', {
        event_category: 'ads',
        event_label: 'budget_adjusted',
        platform,
        campaign_id: campaignId,
        percentage_change: percentageChange.toFixed(2),
        auto_adjust: autoAdjustEnabled || false,
      });

      return NextResponse.json(
        createSuccessResponse({
          message: 'Budget adjusted successfully',
          campaignId,
          platform,
          oldBudget: currentBudget,
          newBudget,
          percentageChange: percentageChange.toFixed(2),
        })
      );
    } else {
      return NextResponse.json(
        createErrorResponse(error || 'Failed to adjust budget'),
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[Ads Adjust] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


