'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchPaymentDetails();
    }
  }, [orderId]);

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`/api/payment/order/${orderId}`);
      const data = await response.json();
      
      if (response.ok && data.order) {
        setPaymentData(data);
      } else {
        setError(data.error || 'Invalid payment link');
      }
    } catch (err) {
      setError('Failed to load payment details');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!paymentData || !window.Razorpay) {
      setError('Payment gateway not ready. Please refresh the page.');
      return;
    }

    setProcessing(true);
    setError(null);

    const options = {
      key: paymentData.key,
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: 'Transition Marketing AI',
      description: paymentData.description || 'Lead Generation Service',
      order_id: paymentData.order_id,
      handler: async function (response: any) {
        // Verify payment on server
        try {
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            // Payment successful - redirect to success page
            window.location.href = `/payment/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`;
          } else {
            setError('Payment verification failed. Please contact support.');
            setProcessing(false);
          }
        } catch (err) {
          setError('Failed to verify payment. Please contact support.');
          setProcessing(false);
        }
      },
      prefill: {
        email: paymentData.customer_email || '',
        contact: paymentData.customer_phone || '',
      },
      theme: {
        color: '#2563eb',
      },
      modal: {
        ondismiss: function() {
          setProcessing(false);
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', function (response: any) {
      setError('Payment failed: ' + (response.error.description || 'Unknown error'));
      setProcessing(false);
    });

    razorpay.open();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error && !paymentData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Link Invalid</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const amountInRupees = (paymentData?.amount || 0) / 100;

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setLoading(false)}
      />
      
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Logo />
          </div>
        </nav>

        {/* Payment Form */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
          <Card className="max-w-md w-full">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  Complete Payment
                </h1>
                <p className="text-slate-600">
                  Secure payment via Razorpay
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Amount</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{amountInRupees.toLocaleString('en-IN')}
                  </span>
                </div>
                {paymentData?.description && (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      {paymentData.description}
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={processing || !window.Razorpay}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay ₹{amountInRupees.toLocaleString('en-IN')}</>
                )}
              </Button>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500 mb-2">
                  Payment Methods: UPI, Credit/Debit Cards, Net Banking
                </p>
                <p className="text-xs text-slate-400">
                  Secured by Razorpay • Your payment information is encrypted
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <Link
                  href="/"
                  className="text-sm text-blue-600 hover:text-blue-700 text-center block"
                >
                  ← Return to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

