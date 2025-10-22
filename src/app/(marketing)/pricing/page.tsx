'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 999 : 9990,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      savings: billingCycle === 'annual' ? '₹2,000' : null,
      description: 'AI finds prospects & writes emails automatically',
      features: [
        { name: '500 AI-found prospects/month', included: true },
        { name: '1,000 AI-written emails/month', included: true },
        { name: 'AI lead scoring & qualification', included: true },
        { name: 'AI follow-up automation (3 per lead)', included: true },
        { name: 'Email & WhatsApp outreach', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'AI conversation suggestions', included: false },
        { name: 'Priority support', included: false },
        { name: 'AI ad campaigns', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Growth',
      price: billingCycle === 'monthly' ? 2999 : 29990,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      savings: billingCycle === 'annual' ? '₹6,000' : null,
      description: 'Full AI automation—prospecting, outreach & meetings',
      features: [
        { name: '2,000 AI-found prospects/month', included: true },
        { name: '5,000 AI-written emails/month', included: true },
        { name: 'AI WhatsApp outreach (2,000/month)', included: true },
        { name: 'AI conversation assistant', included: true },
        { name: 'AI meeting scheduler', included: true },
        { name: 'AI follow-up automation (unlimited)', included: true },
        { name: 'Advanced analytics with AI insights', included: true },
        { name: 'Priority support', included: true },
        { name: 'AI ad campaigns (premium add-on)', included: false },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? 4999 : 49990,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      savings: billingCycle === 'annual' ? '₹10,000' : null,
      description: 'Your complete AI marketing team—unlimited everything',
      features: [
        { name: 'Unlimited AI prospecting', included: true },
        { name: 'Unlimited AI emails & WhatsApp', included: true },
        { name: 'AI content creator (10 posts/month)', included: true },
        { name: 'AI sales assistant (auto-qualifies)', included: true },
        { name: 'AI ad campaign generator', included: true },
        { name: 'Dedicated AI training (learns your style)', included: true },
        { name: 'API access & webhooks', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'White-label option', included: true },
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Transition Marketing AI
          </Link>
          <div className="flex gap-4">
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button className="bg-blue-600 hover:bg-blue-700">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Your AI Marketing Team, Priced Like Software
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get AI-powered prospecting, email writing, and lead management—all automated. Start with 50 free AI-found prospects in 24 hours.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? 'border-2 border-blue-600 shadow-xl scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-sm text-gray-600 min-h-12">{plan.description}</p>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <p className="text-sm text-green-600 mt-1">Save {plan.savings}/year</p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Link href="/onboarding">
                  <Button
                    className={`w-full mb-6 ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <div className="space-y-3 text-left">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Trial Info */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">14-Day Free Trial Includes:</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="font-semibold mb-2">✨ Full Platform Access</div>
              <p className="text-sm text-gray-600">
                Try all Growth plan features for 14 days, no credit card required
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">🔍 AI Lead Search</div>
              <p className="text-sm text-gray-600">
                Generate up to 100 contacts using our AI-powered scraping
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">📧 Outreach Tools</div>
              <p className="text-sm text-gray-600">
                Send 500 emails and 500 WhatsApp messages to test outreach
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto text-left">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <div className="font-semibold mb-2">Do I need to pay for ads separately?</div>
              <p className="text-gray-600">
                Yes. You pay us only for the platform subscription. Ad spend on Facebook, Instagram, or Google goes directly to those platforms using your own ad accounts.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">Can I upgrade or downgrade anytime?</div>
              <p className="text-gray-600">
                Absolutely! You can change your plan at any time. Upgrades take effect immediately, downgrades at the end of your billing cycle.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">What happens after my free trial?</div>
              <p className="text-gray-600">
                Your trial lasts 14 days with full Growth plan access. After that, you can choose a paid plan to continue, or your account will be limited to view-only mode.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-2">Is my ad account data safe?</div>
              <p className="text-gray-600">
                Yes. We use OAuth for secure, read-only access to your ad accounts. We never store your passwords and you can revoke access anytime.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Start Free Trial →
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-16 py-8 text-center text-gray-600">
        <p>© 2024 Transition Marketing AI. All rights reserved.</p>
      </div>
    </div>
  );
}
