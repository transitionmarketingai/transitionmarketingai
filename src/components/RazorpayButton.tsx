'use client';

import React, { useState } from 'react';
import { teamService } from '@/lib/teamService';

interface RazorpayButtonProps {
  teamId: string;
  planId: 'starter' | 'growth' | 'pro';
  planPrice: number;
  planName: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function RazorpayButton({ 
  teamId, 
  planId, 
  planPrice, 
  planName, 
  className = '',
  onSuccess,
  onError 
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Create payment order
      const orderData = await teamService.createPaymentOrder(teamId, planId);
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Transition Marketing AI",
        description: `${planName} Plan Subscription`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            console.log('Payment response:', response);
            
            // Verify payment on server (you'll need to create an API route for this)
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                teamId: teamId,
                planId: planId
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            console.log('Payment successful:', response);
            onSuccess?.();
          } catch (error) {
            console.error('Payment verification error:', error);
            onError?.(error as Error);
          }
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
            setLoading(false);
          }
        },
        theme: {
          color: '#3B82F6'
        },
        notes: {
          teamId: teamId,
          plan: planName
        }
      };

      // Load Razorpay script dynamically if not already loaded
      if (typeof window !== 'undefined' && !(window as any).Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const razorpay = (window as any).Razorpay;
          const paymentObject = new razorpay(options);
          paymentObject.open();
        };
        document.head.appendChild(script);
      } else {
        const razorpay = (window as any).Razorpay;
        const paymentObject = new razorpay(options);
        paymentObject.open();
      }
      
    } catch (error) {
      console.error('Error processing payment:', error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`${
        loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
      } text-white px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm lg:text-base w-full lg:w-auto ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        <span className="block lg:inline">
          ₹{planPrice.toLocaleString()}/month{' '}
          <span className="block lg:inline mt-1 lg:mt-0">Subscribe</span>
        </span>
      )}
    </button>
  );
}