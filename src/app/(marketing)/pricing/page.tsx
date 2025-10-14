'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  X,
  ArrowRight,
  HelpCircle,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: { monthly: 7999, annual: 79990 },
      leads: 20,
      overagePrice: 500,
      description: 'Perfect for individual agents and freelancers',
      features: [
        { text: '20 qualified leads per month', included: true },
        { text: 'Facebook + Google Ads', included: true },
        { text: 'WhatsApp + Email messaging', included: true },
        { text: 'Basic analytics dashboard', included: true },
        { text: 'Email support', included: true },
        { text: 'Extra leads at ₹500 each', included: true },
        { text: 'Dedicated account manager', included: false },
        { text: 'API access', included: false },
        { text: 'White-label option', included: false }
      ]
    },
    {
      id: 'growth',
      name: 'Growth',
      price: { monthly: 14999, annual: 149990 },
      leads: 50,
      overagePrice: 400,
      popular: true,
      description: 'Best for growing teams and small agencies',
      features: [
        { text: '50 qualified leads per month', included: true },
        { text: 'Facebook + Google + LinkedIn Ads', included: true },
        { text: 'Full messaging suite (WhatsApp, Email, SMS)', included: true },
        { text: 'Advanced analytics + reports', included: true },
        { text: 'Phone + WhatsApp support', included: true },
        { text: 'Extra leads at ₹400 each', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'CRM integrations (HubSpot, Salesforce)', included: true },
        { text: 'API access', included: false },
        { text: 'White-label option', included: false }
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: { monthly: 29999, annual: 299990 },
      leads: 120,
      overagePrice: 350,
      description: 'For established businesses and large teams',
      features: [
        { text: '120 qualified leads per month', included: true },
        { text: 'All ad platforms + priority placement', included: true },
        { text: 'Unlimited messaging channels', included: true },
        { text: 'Premium analytics + custom reports', included: true },
        { text: '24/7 priority support', included: true },
        { text: 'Extra leads at ₹350 each', included: true },
        { text: 'Dedicated success manager', included: true },
        { text: 'CRM integrations + automation', included: true },
        { text: 'Full API access', included: true },
        { text: 'White-label option', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
                LeadGen Pro
              </div>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4">Transparent Pricing</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Honest Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No hidden fees. No surprises. Pay only for results.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <Badge className="ml-2 bg-green-500">Save 17%</Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 -mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative ${
                  plan.popular 
                    ? 'border-2 border-blue-500 shadow-2xl scale-105 z-10' 
                    : 'border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pt-8 pb-6">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ₹{billingCycle === 'monthly' ? plan.price.monthly.toLocaleString('en-IN') : (plan.price.annual / 12).toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>

                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ₹{((plan.price.monthly * 12) - plan.price.annual).toLocaleString('en-IN')}/year
                    </p>
                  )}

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg py-4 px-4 mt-4">
                    <p className="text-sm text-gray-600">Up to</p>
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {plan.leads} Leads
                    </p>
                    <p className="text-xs text-gray-500 mt-1">per month</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link href="/onboarding">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                    <p className="text-gray-600">
                      Custom solutions for large organizations, franchises, and agencies. 
                      Unlimited leads, dedicated team, and custom integrations.
                    </p>
                  </div>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does the free trial work?',
                a: '7 days completely free. No credit card required. You\'ll receive 5-10 sample leads to test the quality. If you\'re satisfied, add payment details to continue. Cancel anytime with one click.'
              },
              {
                q: 'What if I don\'t get enough leads?',
                a: 'We guarantee minimum 60% of your quota (e.g., 30 of 50 leads). If we deliver less, you get prorated billing or credits for next month. Your success is our success.'
              },
              {
                q: 'What if the lead quality is poor?',
                a: 'Report any poor-quality lead within 7 days and get instant credit. We stand behind every lead. Typical dispute rate is <5% because our AI pre-qualifies everything.'
              },
              {
                q: 'Do I need my own Facebook or Google ad account?',
                a: 'No! We run all campaigns in OUR ad accounts. You don\'t need any technical knowledge or ad account setup. We handle everything.'
              },
              {
                q: 'How quickly will I get leads?',
                a: 'First leads typically arrive within 24-48 hours of signup. Our team sets up your campaigns the same day you join. Most customers get 1-2 leads per day.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes! Cancel with one click from your dashboard. No long-term contracts. No cancellation fees. We only succeed if you succeed.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept UPI, Credit/Debit Cards, Net Banking, and all major digital wallets through Razorpay. 100% secure payments with bank-level encryption.'
              },
              {
                q: 'Do you work with businesses outside India?',
                a: 'Currently we focus exclusively on the Indian market for optimal performance and lower costs. International expansion planned for 2026.'
              }
            ].map((faq, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Starter</th>
                  <th className="text-center py-4 px-4 bg-blue-50">Growth ⭐</th>
                  <th className="text-center py-4 px-4">Professional</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Monthly Leads', starter: '20', growth: '50', professional: '120' },
                  { feature: 'Quality Score', starter: '70+', growth: '75+', professional: '80+' },
                  { feature: 'Facebook Ads', starter: '✓', growth: '✓', professional: '✓' },
                  { feature: 'Google Ads', starter: '✓', growth: '✓', professional: '✓' },
                  { feature: 'LinkedIn Ads', starter: '—', growth: '✓', professional: '✓' },
                  { feature: 'WhatsApp Messaging', starter: '✓', growth: '✓', professional: '✓' },
                  { feature: 'Email Integration', starter: 'Basic', growth: 'Advanced', professional: 'Premium' },
                  { feature: 'SMS Messaging', starter: '—', growth: '✓', professional: '✓' },
                  { feature: 'Team Members', starter: '1', growth: '3', professional: '10' },
                  { feature: 'Support Level', starter: 'Email', growth: 'Phone + WhatsApp', professional: '24/7 Priority' },
                  { feature: 'Account Manager', starter: '—', growth: '✓', professional: 'Dedicated' },
                  { feature: 'API Access', starter: '—', growth: '—', professional: '✓' },
                  { feature: 'White-Label', starter: '—', growth: '—', professional: '✓' }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">{row.starter}</td>
                    <td className="py-4 px-4 text-center bg-blue-50 font-medium">{row.growth}</td>
                    <td className="py-4 px-4 text-center">{row.professional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fast Setup</h3>
                <p className="text-sm text-gray-600">
                  Start receiving leads within 24 hours. No technical knowledge required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-sm text-gray-600">
                  7-day money-back on any invalid lead. We verify every contact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">ROI Focused</h3>
                <p className="text-sm text-gray-600">
                  Average customers close 10-15% of leads. 3-5x return on investment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Start Your 7-Day Free Trial
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            No credit card required. Cancel anytime. Get started in 5 minutes.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-12" asChild>
            <Link href="/onboarding">
              Start Free Trial Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
            <span>✓ No setup fees</span>
            <span>✓ No contracts</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>
    </div>
  );
}


