import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

interface CreateSubscriptionData {
  clientName: string;
  email: string;
  planAmount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  planId?: string;
  clientRecordId?: string;
  notes?: Record<string, string>;
}

/**
 * Create Razorpay subscription
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body: CreateSubscriptionData = await request.json();
    const { clientName, email, planAmount, period, planId, clientRecordId, notes } = body;

    // Validate required fields
    if (!clientName || !email || !planAmount || !period) {
      return NextResponse.json(
        createErrorResponse('Missing required fields: clientName, email, planAmount, period'),
        { status: 400 }
      );
    }

    // Check Razorpay configuration
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        createErrorResponse('Razorpay not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'),
        { status: 500 }
      );
    }

    // Import Razorpay dynamically
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    // Calculate total count based on period
    let totalCount = 1;
    if (period === 'monthly') {
      totalCount = 12; // 12 months
    } else if (period === 'quarterly') {
      totalCount = 4; // 4 quarters
    } else if (period === 'yearly') {
      totalCount = 1; // 1 year
    }

    // Create subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId || undefined, // If planId provided, use it; otherwise Razorpay will create plan
      customer_notify: 1,
      total_count: totalCount,
      notes: {
        clientName,
        email,
        clientRecordId: clientRecordId || '',
        ...notes,
      },
    });

    // Fire analytics event
    trackEvent('subscription_created', {
      event_category: 'billing',
      event_label: 'razorpay_subscription_created',
      client_name: clientName,
      plan_amount: planAmount,
      period,
    });

    return NextResponse.json(
      createSuccessResponse({
        subscription,
        message: 'Subscription created successfully',
      })
    );
  } catch (error: any) {
    console.error('[Razorpay] Error creating subscription:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Failed to create subscription'),
      { status: 500 }
    );
  }
}

