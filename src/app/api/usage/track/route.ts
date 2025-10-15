import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Track usage for AI searches, emails, WhatsApp
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, count = 1 } = await request.json();

    if (!type || !['ai_search', 'email_sent', 'whatsapp_sent'].includes(type)) {
      return NextResponse.json({ error: 'Invalid usage type' }, { status: 400 });
    }

    // Get current month usage
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: existing } = await supabase
      .from('usage_tracking')
      .select('*')
      .eq('customer_id', user.id)
      .eq('month', startOfMonth.toISOString().slice(0, 7)) // YYYY-MM format
      .single();

    if (existing) {
      // Update existing record
      const updatedCounts = {
        ai_searches: type === 'ai_search' ? existing.ai_searches + count : existing.ai_searches,
        emails_sent: type === 'email_sent' ? existing.emails_sent + count : existing.emails_sent,
        whatsapp_sent: type === 'whatsapp_sent' ? existing.whatsapp_sent + count : existing.whatsapp_sent,
      };

      const { error } = await supabase
        .from('usage_tracking')
        .update(updatedCounts)
        .eq('id', existing.id);

      if (error) {
        console.error('Update usage error:', error);
        return NextResponse.json({ error: 'Failed to update usage' }, { status: 500 });
      }

      return NextResponse.json({ success: true, usage: updatedCounts });
    } else {
      // Create new record
      const newRecord = {
        customer_id: user.id,
        month: startOfMonth.toISOString().slice(0, 7),
        ai_searches: type === 'ai_search' ? count : 0,
        emails_sent: type === 'email_sent' ? count : 0,
        whatsapp_sent: type === 'whatsapp_sent' ? count : 0,
      };

      const { error } = await supabase
        .from('usage_tracking')
        .insert(newRecord);

      if (error) {
        console.error('Insert usage error:', error);
        return NextResponse.json({ error: 'Failed to track usage' }, { status: 500 });
      }

      return NextResponse.json({ success: true, usage: newRecord });
    }
  } catch (error) {
    console.error('Usage tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET - Get current month usage
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(*)')
      .eq('customer_id', user.id)
      .eq('status', 'active')
      .single();

    // Get current month usage
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: usage } = await supabase
      .from('usage_tracking')
      .select('*')
      .eq('customer_id', user.id)
      .eq('month', startOfMonth.toISOString().slice(0, 7))
      .single();

    // Default limits (Free Trial = Growth plan limits)
    const limits = {
      ai_searches: subscription?.subscription_plans?.ai_search_limit || 100, // Trial default
      emails_sent: subscription?.subscription_plans?.email_limit || 500,
      whatsapp_sent: subscription?.subscription_plans?.whatsapp_limit || 500,
    };

    const current = {
      ai_searches: usage?.ai_searches || 0,
      emails_sent: usage?.emails_sent || 0,
      whatsapp_sent: usage?.whatsapp_sent || 0,
    };

    return NextResponse.json({
      plan: subscription?.subscription_plans?.name || 'Free Trial',
      limits,
      current,
      remaining: {
        ai_searches: Math.max(0, limits.ai_searches - current.ai_searches),
        emails_sent: Math.max(0, limits.emails_sent - current.emails_sent),
        whatsapp_sent: Math.max(0, limits.whatsapp_sent - current.whatsapp_sent),
      },
    });
  } catch (error) {
    console.error('Get usage error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

