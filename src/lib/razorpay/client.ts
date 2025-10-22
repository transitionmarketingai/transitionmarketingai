import Razorpay from 'razorpay';
import crypto from 'crypto';

// Function to get Razorpay instance
function getRazorpayInstance() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

/**
 * Create a Razorpay order for one-time payment
 */
export async function createRazorpayOrder(params: {
  amount: number; // in paise
  currency?: string;
  receipt: string;
  notes?: Record<string, any>;
}) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const order = await razorpayInstance.orders.create({
      amount: params.amount,
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes || {},
    });

    return {
      success: true,
      order
    };
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create a Razorpay subscription
 */
export async function createRazorpaySubscription(params: {
  planId: string;
  customerId: string;
  totalCount?: number;
  quantity?: number;
  startAt?: number;
  notes?: Record<string, any>;
  addons?: Array<{ item: { name: string; amount: number; currency: string } }>;
}) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const subscription = await razorpayInstance.subscriptions.create({
      plan_id: params.planId,
      customer_id: params.customerId,
      total_count: params.totalCount,
      quantity: params.quantity || 1,
      start_at: params.startAt,
      notes: params.notes || {},
      addons: params.addons,
      customer_notify: 1, // Send email/SMS to customer
    });

    return {
      success: true,
      subscription
    };
  } catch (error: any) {
    console.error('Razorpay subscription creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create or fetch Razorpay customer
 */
export async function createRazorpayCustomer(params: {
  name: string;
  email: string;
  contact: string;
  notes?: Record<string, any>;
}) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const customer = await razorpayInstance.customers.create({
      name: params.name,
      email: params.email,
      contact: params.contact,
      notes: params.notes || {},
    });

    return {
      success: true,
      customer
    };
  } catch (error: any) {
    console.error('Razorpay customer creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Verify Razorpay payment signature
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${params.orderId}|${params.paymentId}`)
      .digest('hex');

    return generatedSignature === params.signature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Verify Razorpay subscription signature
 */
export function verifySubscriptionSignature(params: {
  subscriptionId: string;
  paymentId: string;
  signature: string;
}): boolean {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${params.subscriptionId}|${params.paymentId}`)
      .digest('hex');

    return generatedSignature === params.signature;
  } catch (error) {
    console.error('Subscription signature verification error:', error);
    return false;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  webhookBody: string,
  webhookSignature: string
): boolean {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(webhookBody)
      .digest('hex');

    return generatedSignature === webhookSignature;
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

/**
 * Fetch payment details
 */
export async function fetchPaymentDetails(paymentId: string) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const payment = await razorpayInstance.payments.fetch(paymentId);
    return {
      success: true,
      payment
    };
  } catch (error: any) {
    console.error('Error fetching payment:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Refund a payment
 */
export async function createRefund(params: {
  paymentId: string;
  amount?: number; // in paise, full refund if not specified
  notes?: Record<string, any>;
}) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const refund = await razorpayInstance.payments.refund(params.paymentId, {
      amount: params.amount,
      notes: params.notes || {},
    });

    return {
      success: true,
      refund
    };
  } catch (error: any) {
    console.error('Refund creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  cancelAtCycleEnd: boolean = false
) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const subscription = await razorpayInstance.subscriptions.cancel(
      subscriptionId,
      cancelAtCycleEnd
    );

    return {
      success: true,
      subscription
    };
  } catch (error: any) {
    console.error('Subscription cancellation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Pause a subscription
 */
export async function pauseSubscription(subscriptionId: string) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const subscription = await razorpayInstance.subscriptions.pause(subscriptionId);

    return {
      success: true,
      subscription
    };
  } catch (error: any) {
    console.error('Subscription pause error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Resume a subscription
 */
export async function resumeSubscription(subscriptionId: string) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const subscription = await razorpayInstance.subscriptions.resume(subscriptionId);

    return {
      success: true,
      subscription
    };
  } catch (error: any) {
    console.error('Subscription resume error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create invoice for overage or one-time charges
 */
export async function createInvoice(params: {
  customerId: string;
  amount: number; // in paise
  currency?: string;
  description: string;
  dueBy?: number; // timestamp
  lineItems: Array<{
    name: string;
    amount: number;
    currency?: string;
    quantity?: number;
  }>;
}) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const invoice = await razorpayInstance.invoices.create({
      customer_id: params.customerId,
      amount: params.amount,
      currency: params.currency || 'INR',
      description: params.description,
      due_by: params.dueBy,
      line_items: params.lineItems,
      type: 'invoice',
    });

    return {
      success: true,
      invoice
    };
  } catch (error: any) {
    console.error('Invoice creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Issue invoice (send to customer)
 */
export async function issueInvoice(invoiceId: string) {
  try {
    const razorpayInstance = getRazorpayInstance();
    const invoice = await razorpayInstance.invoices.issue(invoiceId);

    return {
      success: true,
      invoice
    };
  } catch (error: any) {
    console.error('Invoice issue error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Helper to convert rupees to paise
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Helper to convert paise to rupees
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}


