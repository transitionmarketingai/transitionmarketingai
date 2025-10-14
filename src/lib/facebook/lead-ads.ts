/**
 * Facebook Lead Ads API Helper
 * Handles campaign creation, lead retrieval, and webhook management
 */

const FB_API_VERSION = 'v18.0';
const FB_GRAPH_API = `https://graph.facebook.com/${FB_API_VERSION}`;

interface FacebookCampaignParams {
  customer_id: string;
  campaign_name: string;
  targeting: {
    locations: string[]; // City names or location IDs
    age_min?: number;
    age_max?: number;
    genders?: number[]; // 1 = male, 2 = female
    interests?: string[];
    behaviors?: string[];
  };
  budget: {
    daily: number; // in paise
    currency: string;
  };
  creative: {
    headline: string;
    description: string;
    image_url?: string;
    video_url?: string;
    cta_text: string;
  };
  lead_form: {
    questions: Array<{
      type: 'text' | 'email' | 'phone' | 'select';
      label: string;
      required: boolean;
      options?: string[];
    }>;
    privacy_policy_url: string;
  };
}

/**
 * Create Facebook Lead Ad Campaign
 * Note: For MVP, you'll create campaigns manually in Facebook Ads Manager
 * This is for future automation
 */
export async function createFacebookLeadCampaign(params: FacebookCampaignParams) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const adAccountId = process.env.FACEBOOK_AD_ACCOUNT_ID;

  try {
    // Step 1: Create Campaign
    const campaignResponse = await fetch(
      `${FB_GRAPH_API}/act_${adAccountId}/campaigns`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: params.campaign_name,
          objective: 'LEAD_GENERATION',
          status: 'PAUSED', // Start paused, activate after review
          special_ad_categories: [],
          access_token: accessToken,
        }),
      }
    );

    const campaign = await campaignResponse.json();

    if (!campaign.id) {
      throw new Error('Failed to create campaign: ' + JSON.stringify(campaign));
    }

    // Step 2: Create Ad Set (Targeting + Budget)
    const adSetResponse = await fetch(
      `${FB_GRAPH_API}/act_${adAccountId}/adsets`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${params.campaign_name}_AdSet`,
          campaign_id: campaign.id,
          daily_budget: params.budget.daily,
          billing_event: 'IMPRESSIONS',
          optimization_goal: 'LEAD_GENERATION',
          bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
          targeting: {
            geo_locations: {
              cities: params.targeting.locations.map(city => ({
                key: getCityKey(city),
                name: city,
                country: 'IN'
              }))
            },
            age_min: params.targeting.age_min || 18,
            age_max: params.targeting.age_max || 65,
            genders: params.targeting.genders || [0], // 0 = all
            flexible_spec: params.targeting.interests ? [
              {
                interests: params.targeting.interests.map(interest => ({
                  id: interest,
                  name: interest
                }))
              }
            ] : undefined,
          },
          status: 'PAUSED',
          access_token: accessToken,
        }),
      }
    );

    const adSet = await adSetResponse.json();

    if (!adSet.id) {
      throw new Error('Failed to create ad set: ' + JSON.stringify(adSet));
    }

    // Step 3: Create Lead Form
    const formResponse = await fetch(
      `${FB_GRAPH_API}/${process.env.FACEBOOK_PAGE_ID}/leadgen_forms`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${params.campaign_name}_Form`,
          follow_up_action_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you`,
          privacy_policy_url: params.lead_form.privacy_policy_url,
          questions: [
            { type: 'FULL_NAME' },
            { type: 'EMAIL' },
            { type: 'PHONE' },
            ...params.lead_form.questions.map(q => ({
              key: q.label.toLowerCase().replace(/\s+/g, '_'),
              label: q.label,
              type: q.type.toUpperCase(),
              options: q.options
            }))
          ],
          access_token: accessToken,
        }),
      }
    );

    const form = await formResponse.json();

    if (!form.id) {
      throw new Error('Failed to create lead form: ' + JSON.stringify(form));
    }

    // Step 4: Create Ad Creative
    // Note: Image/video must be uploaded first to get hash
    
    // Step 5: Create Ad
    // Links the creative to the ad set

    return {
      success: true,
      campaign_id: campaign.id,
      adset_id: adSet.id,
      form_id: form.id,
      message: 'Campaign created successfully. Activate in Facebook Ads Manager to start running.'
    };

  } catch (error: any) {
    console.error('Facebook campaign creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Fetch lead data from Facebook
 */
export async function fetchFacebookLeadData(leadgenId: string) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `${FB_GRAPH_API}/${leadgenId}?access_token=${accessToken}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching Facebook lead:', error);
    return null;
  }
}

/**
 * Subscribe to Page webhooks for leadgen
 */
export async function subscribeToPageWebhooks(pageId: string, callbackUrl: string) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `${FB_GRAPH_API}/${pageId}/subscribed_apps`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscribed_fields: ['leadgen'],
          access_token: accessToken,
        }),
      }
    );

    const data = await response.json();
    return {
      success: data.success === true,
      data
    };

  } catch (error: any) {
    console.error('Error subscribing to webhooks:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get campaign performance from Facebook
 */
export async function getFacebookCampaignStats(campaignId: string) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `${FB_GRAPH_API}/${campaignId}/insights?fields=impressions,clicks,actions,spend&access_token=${accessToken}`,
      { method: 'GET' }
    );

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const insights = data.data[0];
      return {
        success: true,
        stats: {
          impressions: parseInt(insights.impressions) || 0,
          clicks: parseInt(insights.clicks) || 0,
          leads: insights.actions?.find((a: any) => a.action_type === 'lead')?.value || 0,
          spend: parseFloat(insights.spend) * 100 || 0, // Convert to paise
        }
      };
    }

    return { success: false, error: 'No insights data' };

  } catch (error: any) {
    console.error('Error fetching campaign stats:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Pause a campaign
 */
export async function pauseFacebookCampaign(campaignId: string) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `${FB_GRAPH_API}/${campaignId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'PAUSED',
          access_token: accessToken,
        }),
      }
    );

    const data = await response.json();
    return {
      success: data.success === true,
      data
    };

  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Resume a campaign
 */
export async function resumeFacebookCampaign(campaignId: string) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `${FB_GRAPH_API}/${campaignId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'ACTIVE',
          access_token: accessToken,
        }),
      }
    );

    const data = await response.json();
    return {
      success: data.success === true,
      data
    };

  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Helper: Get Facebook city key for targeting
 */
function getCityKey(cityName: string): string {
  // Mapping of Indian cities to Facebook location IDs
  const cityMap: Record<string, string> = {
    'Mumbai': '1035289',
    'Delhi': '1035312',
    'Bangalore': '1035289',
    'Hyderabad': '1035291',
    'Chennai': '1035292',
    'Kolkata': '1035293',
    'Pune': '1035294',
    'Ahmedabad': '1035295',
    // Add more cities as needed
  };

  return cityMap[cityName] || cityName;
}

/**
 * Helper: Generate AI ad copy
 */
export async function generateAdCopy(customerData: {
  industry: string;
  service_description: string;
  target_audience: any;
}): Promise<{ headline: string; description: string; cta: string }> {
  // This would call OpenAI to generate compelling ad copy
  // For now, return templates
  
  const templates: Record<string, any> = {
    real_estate: {
      headline: 'Find Your Dream Home Today',
      description: 'Connect with expert real estate consultants. Get personalized property recommendations.',
      cta: 'Get Quote'
    },
    insurance: {
      headline: 'Protect Your Family\'s Future',
      description: 'Get the best insurance plans. Compare quotes from top providers.',
      cta: 'Get Quote'
    },
    education: {
      headline: 'Achieve Your Career Goals',
      description: 'Expert coaching and guidance. Limited seats available.',
      cta: 'Enroll Now'
    },
    // Add more industries
  };

  return templates[customerData.industry] || {
    headline: 'Get Started Today',
    description: customerData.service_description.substring(0, 100),
    cta: 'Learn More'
  };
}


