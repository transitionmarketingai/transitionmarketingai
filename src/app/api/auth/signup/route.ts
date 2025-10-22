import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, businessName, contactPerson, phone, industry } = body;

    // Validate required fields
    if (!email || !password || !businessName || !contactPerson || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_name: businessName,
          contact_person: contactPerson,
        },
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create customer record
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert({
        user_id: authData.user.id,
        business_name: businessName,
        contact_person: contactPerson,
        email,
        phone,
        industry: industry || 'real_estate',
        subscription_status: 'trial',
        onboarding_completed: false,
        onboarding_step: 0,
      })
      .select()
      .single();

    if (customerError) {
      console.error('Customer creation error:', customerError);
      // User was created but customer record failed - should cleanup
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: 'Failed to create customer profile' },
        { status: 500 }
      );
    }

    // Get starter plan
    const { data: starterPlan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('plan_id', 'starter')
      .single();

    if (starterPlan) {
      // Create trial subscription (14 days)
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 14);

      await supabase.from('subscriptions').insert({
        customer_id: customer.id,
        plan_id: starterPlan.id,
        status: 'trialing',
        is_trial: true,
        trial_start: new Date().toISOString(),
        trial_end: trialEnd.toISOString(),
        current_period_start: new Date().toISOString(),
        current_period_end: trialEnd.toISOString(),
        leads_quota: starterPlan.leads_quota,
        leads_delivered_this_period: 0,
      });
    }

    // Create welcome notification
    await supabase.from('notifications').insert({
      customer_id: customer.id,
      type: 'system',
      title: 'Welcome to Transition Marketing AI!',
      message: 'Your 14-day free trial has started. We\'re setting up your first campaign!',
      priority: 'high',
    });

    return NextResponse.json({
      success: true,
      user: authData.user,
      customer,
      message: 'Account created successfully! Check your email to verify.',
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


