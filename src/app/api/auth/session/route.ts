import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 200 }
      );
    }

    // Get customer profile
    const { data: customer } = await supabase
      .from('customers')
      .select(`
        *,
        subscriptions!inner(
          *,
          subscription_plans(*)
        )
      `)
      .eq('user_id', session.user.id)
      .eq('subscriptions.status', 'active')
      .single();

    return NextResponse.json({
      authenticated: true,
      user: session.user,
      customer,
      session,
    });

  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
  }
}


