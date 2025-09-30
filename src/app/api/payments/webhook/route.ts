import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    
    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity);
        break;
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity);
        break;
      case 'order.paid':
        await handleOrderPaid(event.payload.order.entity);
        break;
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error processing Razorpay webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    // Update subscription status
    await prisma.subscription.updateMany({
      where: { razorpayPaymentId: payment.id },
      data: {
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    });
    
    console.log(`Payment captured: ${payment.id}`);
  } catch (error) {
    console.error('Error handling payment captured:', error);
  }
}

async function handlePaymentFailed(payment: any) {
  try {
    // Update subscription status
    await prisma.subscription.updateMany({
      where: { razorpayPaymentId: payment.id },
      data: { status: 'failed' }
    });
    
    console.log(`Payment failed: ${payment.id}`);
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

async function handleOrderPaid(order: any) {
  try {
    // Update subscription status
    await prisma.subscription.updateMany({
      where: { razorpayOrderId: order.id },
      data: {
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    });
    
    console.log(`Order paid: ${order.id}`);
  } catch (error) {
    console.error('Error handling order paid:', error);
  }
}