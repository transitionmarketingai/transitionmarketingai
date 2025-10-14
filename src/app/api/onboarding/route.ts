import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer record
    const { data: customer, error: customerFetchError } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (customerFetchError || !customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Update customer with onboarding data
    const { error: updateError } = await supabase
      .from('customers')
      .update({
        service_areas: body.service_cities || [],
        lead_preferences: {
          propertyTypes: body.property_types || [],
          budgetRange: body.budget_range || {},
          preferredTimeline: body.timeline_preferences || [],
          targetGender: body.target_gender || 'all',
          targetAgeRange: body.target_age_range || {},
          targetIncome: body.target_income_level || {},
        },
        average_deal_value: body.average_deal_value || null,
        onboarding_completed: true,
        onboarding_step: 6,
        updated_at: new Date().toISOString(),
      })
      .eq('id', customer.id);

    if (updateError) {
      console.error('Update customer error:', updateError);
      return NextResponse.json(
        { error: 'Failed to save onboarding data' },
        { status: 500 }
      );
    }

    // If they selected a paid plan, we'll need payment
    const selectedPlanId = body.selected_plan || 'starter';
    
    // Get the selected plan
    const { data: selectedPlan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('plan_id', selectedPlanId)
      .single();

    // Check if customer already has an active subscription (from trial)
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('customer_id', customer.id)
      .eq('status', 'trialing')
      .single();

    if (selectedPlan && !existingSubscription) {
      // Create subscription (trial for now, payment in Phase 4)
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 14);

      await supabase.from('subscriptions').insert({
        customer_id: customer.id,
        plan_id: selectedPlan.id,
        status: 'trialing',
        is_trial: true,
        trial_start: new Date().toISOString(),
        trial_end: trialEnd.toISOString(),
        current_period_start: new Date().toISOString(),
        current_period_end: trialEnd.toISOString(),
        leads_quota: selectedPlan.leads_quota,
        leads_delivered_this_period: 0,
      });

      // Update customer's current plan
      await supabase
        .from('customers')
        .update({ current_plan_id: selectedPlan.id })
        .eq('id', customer.id);
    }

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: customer.id,
      type: 'system',
      title: 'Onboarding Complete!',
      message: `Your account is set up! We're creating your first campaign and will start delivering leads within 24-48 hours.`,
      priority: 'high',
      action_url: '/dashboard',
      action_label: 'View Dashboard',
    });

    // Log the onboarding completion
    await supabase.from('audit_logs').insert({
      customer_id: customer.id,
      user_email: user.email,
      action: 'completed',
      resource_type: 'onboarding',
      resource_id: customer.id,
      metadata: {
        selectedPlan: selectedPlanId,
        serviceCities: body.service_cities,
        industry: customer.industry,
      },
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully!',
      customer_id: customer.id,
      payment_required: false, // Will be true in Phase 4 for paid plans
    });

  } catch (error: any) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
