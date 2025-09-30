import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { verifyRazorpayPayment, getPaymentDetails } from '@/lib/razorpay';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { paymentId, orderId, signature, planId } = await request.json();
    
    if (!paymentId || !orderId || !signature || !planId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify payment signature
    const isValid = await verifyRazorpayPayment(paymentId, orderId, signature);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Get payment details
    const payment = await getPaymentDetails(paymentId);
    
    if (payment.status !== 'captured') {
      return NextResponse.json({ error: 'Payment not captured' }, { status: 400 });
    }

    // Update user subscription in database
    const userId = (session.user as any).id;
    
    await prisma.subscription.upsert({
      where: { id: `sub_${userId}` },
      update: {
        plan: planId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        price: 0, // Will be updated based on plan
        currency: 'INR',
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId
      },
      create: {
        id: `sub_${userId}`,
        userId,
        plan: planId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        price: 0, // Will be updated based on plan
        currency: 'INR',
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subscription activated',
      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status
      }
    });
    
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
