import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Sign in with email and password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 401 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      );
    }

    // Get customer profile
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('*, subscriptions(*,subscription_plans(*))')
      .eq('user_id', authData.user.id)
      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        { error: 'Customer profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: authData.user,
      customer,
      session: authData.session,
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


