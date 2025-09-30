'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface RazorpayButtonProps {
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayButton({ 
  planId, 
  planName, 
  amount, 
  currency, 
  onSuccess, 
  onError 
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handlePayment = async () => {
    if (!session) {
      onError?.('Please sign in to continue');
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const { order } = await orderResponse.json();

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Transition Marketing AI',
          description: `${planName} Plan`,
          order_id: order.id,
          handler: async function (response: any) {
            try {
              // Verify payment
              const verifyResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  planId,
                }),
              });

              if (verifyResponse.ok) {
                onSuccess?.();
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              onError?.('Payment verification failed');
            }
          },
          prefill: {
            name: session.user?.name || '',
            email: session.user?.email || '',
          },
          theme: {
            color: '#2563eb',
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error('Payment error:', error);
      onError?.('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full inline-block text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
    </button>
  );
}
