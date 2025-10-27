import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check admin auth
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { consultation_id, onboarding_data } = body;

    if (!onboarding_data) {
      return NextResponse.json({ error: 'Missing onboarding data' }, { status: 400 });
    }

    // 1. Create Client Record
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert({
        business_name: onboarding_data.business_name,
        contact_person: onboarding_data.contact_person,
        email: onboarding_data.email,
        phone: onboarding_data.phone,
        industry: onboarding_data.industry,
        location: onboarding_data.location,
        status: 'pending', // Will be active once they pay
        notes: JSON.stringify({
          alternate_phone: onboarding_data.alternate_phone,
          website: onboarding_data.website,
          business_type: onboarding_data.business_type,
          company_size: onboarding_data.company_size,
          consultation_notes: onboarding_data.consultation_notes,
          buying_timeline: onboarding_data.buying_timeline,
          decision_maker: onboarding_data.decision_maker,
          objections: onboarding_data.objections,
          next_steps: onboarding_data.next_steps,
        }),
      })
      .select()
      .single();

    if (clientError) {
      console.error('Client creation error:', clientError);
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }

    // 2. Create Custom Plan
    const planName = `${onboarding_data.business_name} - Custom ${onboarding_data.contract_duration} Plan`;
    
    const { data: plan, error: planError } = await supabase
      .from('custom_plans')
      .insert({
        client_id: client.id,
        plan_name: planName,
        monthly_cost: parseFloat(onboarding_data.proposed_monthly_budget) || 0,
        leads_quota: parseInt(onboarding_data.proposed_leads_quota) || 0,
        services: {
          ai_scraping: onboarding_data.preferred_lead_sources.includes('AI Scraping'),
          facebook_ads: onboarding_data.preferred_lead_sources.includes('Facebook Ads'),
          google_ads: onboarding_data.preferred_lead_sources.includes('Google Ads'),
          linkedin_outreach: onboarding_data.preferred_lead_sources.includes('LinkedIn'),
          outreach_service: onboarding_data.need_outreach_service,
          appointment_setting: onboarding_data.need_appointment_setting,
          crm_integration: onboarding_data.need_crm_integration,
        },
        custom_services: {
          reporting_frequency: onboarding_data.reporting_frequency,
          contact_methods: onboarding_data.contact_method_preferences,
          additional_requirements: onboarding_data.additional_requirements,
        },
        terms: `Contract Duration: ${onboarding_data.contract_duration}
Payment Terms: ${onboarding_data.payment_terms}
Lead Volume: ${onboarding_data.proposed_leads_quota} leads/month
Cost Per Lead: ₹${onboarding_data.proposed_cost_per_lead}

Target Audience: ${onboarding_data.target_audience}
Geographic Target: ${onboarding_data.geographic_target}
Lead Quality Expectations: ${onboarding_data.lead_quality_expectations}

Additional Services:
${onboarding_data.need_outreach_service ? '✓ Outreach Service' : ''}
${onboarding_data.need_appointment_setting ? '✓ Appointment Setting' : ''}
${onboarding_data.need_crm_integration ? '✓ CRM Integration' : ''}`,
        status: 'draft', // Will be active once client accepts and pays
      })
      .select()
      .single();

    if (planError) {
      console.error('Plan creation error:', planError);
      // Don't fail the whole operation, plan can be created manually
    }

    // 3. Store Full Onboarding Data
    const { error: dataError } = await supabase
      .from('client_onboarding_data')
      .insert({
        client_id: client.id,
        consultation_id,
        onboarding_data: onboarding_data,
        completed_by: user.id,
        completed_at: new Date().toISOString(),
      });

    if (dataError) {
      console.error('Onboarding data storage error:', dataError);
      // Non-critical, continue
    }

    // 4. Update Consultation Status
    if (consultation_id) {
      await supabase
        .from('consultations')
        .update({
          status: 'converted',
          converted_to_client_id: client.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', consultation_id);
    }

    // 5. Create Initial Activity Log
    await supabase
      .from('client_activity')
      .insert({
        client_id: client.id,
        activity_type: 'client_created',
        description: `Client onboarded from consultation. Plan: ${planName}`,
        performed_by: user.id,
      });

    return NextResponse.json({
      message: 'Client onboarded successfully',
      client_id: client.id,
      plan_id: plan?.id,
    });

  } catch (error) {
    console.error('Error in POST /api/admin/onboarding:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

