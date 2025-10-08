import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Helper to get Razorpay instance (lazy initialization)
function getRazorpay() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured');
  }
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, teamId } = body;

    const planAmounts: Record<string, number> = {
      starter: 4999,
      growth: 12999,
      enterprise: 24999,
    };

    const amount = planAmounts[planId] || 4999;

    // Create Razorpay order
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${teamId}_${Date.now()}`,
      notes: {
        teamId: teamId,
        planId: planId,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
