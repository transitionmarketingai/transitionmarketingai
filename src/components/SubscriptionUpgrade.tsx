'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  features: string[];
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price_monthly: 999,
    price_annual: 9990,
    features: [
      '1 ad account connection',
      '500 AI searches/month',
      '1,000 emails/month',
      '500 WhatsApp/month',
      'Basic support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price_monthly: 2999,
    price_annual: 29990,
    recommended: true,
    features: [
      '3 ad account connections',
      '2,000 AI searches/month',
      '5,000 emails/month',
      '2,000 WhatsApp/month',
      'Priority support',
      'Campaign templates',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price_monthly: 4999,
    price_annual: 49990,
    features: [
      'Unlimited ad accounts',
      'Unlimited AI searches',
      'Unlimited emails & WhatsApp',
      'Dedicated support',
      'API access',
      'Custom integrations',
    ],
  },
];

export default function SubscriptionUpgrade() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    setLoading(planId);
    toast.loading('Processing payment...');

    try {
      // Create subscription
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: planId,
          billing_cycle: billingCycle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription');
      }

      // Initialize Razorpay
      const options = {
        key: data.razorpay_key,
        subscription_id: data.subscription_id,
        name: data.name,
        description: data.description,
        handler: function (response: any) {
          toast.dismiss();
          toast.success('Payment successful! Activating your subscription...');
          // Verify payment on backend
          fetch('/api/subscriptions/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }).then(() => {
            window.location.href = '/dashboard?upgraded=true';
          });
        },
        modal: {
          ondismiss: function () {
            toast.dismiss();
            setLoading(null);
          },
        },
        theme: {
          color: '#2563EB',
        },
      };

      // @ts-ignore
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
      toast.dismiss();
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to process payment');
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            billingCycle === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('annual')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            billingCycle === 'annual'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Annual
          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
            Save 17%
          </span>
        </button>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.recommended
                ? 'border-2 border-blue-600 shadow-lg'
                : 'border border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">Most Popular</Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    ₹{billingCycle === 'monthly' ? plan.price_monthly.toLocaleString() : plan.price_annual.toLocaleString()}
                  </span>
                  <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 mt-1">
                    Save ₹{(plan.price_monthly * 12 - plan.price_annual).toLocaleString()}/year
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <Button
                className={`w-full mb-4 ${
                  plan.recommended
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-800 hover:bg-gray-900'
                }`}
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading !== null}
              >
                {loading === plan.id ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade to {plan.name}
                  </>
                )}
              </Button>

              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

