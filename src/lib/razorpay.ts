import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET 
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

export default razorpay;

// Plan configurations for Indian market
export const PLANS = {
  starter: {
    name: 'Starter',
    price: 4999, // ₹4,999
    currency: 'INR',
    description: 'Perfect for small businesses',
    features: [
      '200 verified leads/month',
      '4 SEO blogs/month',
      '8 social posts/month',
      'Email & WhatsApp outreach',
      'Basic analytics dashboard',
      'Email support'
    ]
  },
  growth: {
    name: 'Growth',
    price: 12999, // ₹12,999
    currency: 'INR',
    description: 'Most popular for growing businesses',
    features: [
      '500 verified leads/month',
      '8 SEO blogs/month',
      '20 social posts/month',
      'Multi-channel outreach (Email, WhatsApp, LinkedIn)',
      'AI-personalised messages',
      'Advanced analytics & reporting',
      'Priority support'
    ]
  },
  pro: {
    name: 'Pro',
    price: 24999, // ₹24,999
    currency: 'INR',
    description: 'For serious growth and scale',
    features: [
      '1,000+ verified leads/month',
      '12+ SEO blogs/month',
      '30 social posts/month',
      'All channels + AI voice agent',
      'CRM integration & custom dashboards',
      'Dedicated success manager',
      '24/7 priority support'
    ]
  }
};

// Create Razorpay order
export async function createRazorpayOrder(planId: string, userId: string) {
  if (!razorpay) {
    throw new Error('Razorpay not configured');
  }

  const plan = PLANS[planId as keyof typeof PLANS];
  if (!plan) {
    throw new Error('Invalid plan');
  }

  const options = {
    amount: plan.price * 100, // Razorpay expects amount in paise
    currency: plan.currency,
    receipt: `order_${userId}_${Date.now()}`,
    notes: {
      plan: planId,
      userId: userId,
      description: plan.description
    }
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create payment order');
  }
}

// Verify Razorpay payment
export async function verifyRazorpayPayment(paymentId: string, orderId: string, signature: string) {
  if (!razorpay) {
    throw new Error('Razorpay not configured');
  }

  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (expectedSignature === signature) {
    return true;
  } else {
    throw new Error('Invalid payment signature');
  }
}

// Get payment details
export async function getPaymentDetails(paymentId: string) {
  if (!razorpay) {
    throw new Error('Razorpay not configured');
  }

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw new Error('Failed to fetch payment details');
  }
}
