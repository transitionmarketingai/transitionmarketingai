'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Target, Zap, Shield } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Transition Marketing AI</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're dedicated to helping Indian businesses grow by delivering verified, high-quality leads through AI-powered multi-channel lead generation.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                To democratize access to high-quality B2B leads for businesses in India. We believe every business, regardless of size, should have access to verified leads that help them grow sustainably.
              </p>
            </CardContent>
          </Card>

          {/* What We Do */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">AI-Powered Lead Discovery</h3>
                    <p className="text-slate-600 text-sm">We use advanced AI to find and identify potential customers across multiple platforms and channels.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Lead Verification</h3>
                    <p className="text-slate-600 text-sm">Every lead is verified for phone numbers, email addresses, and business information before delivery.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Multi-Channel Generation</h3>
                    <p className="text-slate-600 text-sm">We combine paid ads, AI scraping, and manual research to find leads wherever they exist.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Custom Plans</h3>
                    <p className="text-slate-600 text-sm">Every client gets a custom plan tailored to their budget, industry, and lead volume needs.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Approach */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Approach</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                We're not just another lead generation tool. We're a service that works with you to understand your business needs and deliver leads that actually convert.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Free Consultation First</h3>
                    <p className="text-slate-600 text-sm">We start with a no-obligation consultation to understand your business, target audience, and budget.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Custom Plan Creation</h3>
                    <p className="text-slate-600 text-sm">Based on your consultation, we create a custom plan with pricing that fits your budget and lead volume needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Verified Lead Delivery</h3>
                    <p className="text-slate-600 text-sm">Leads are verified and delivered instantly to your dashboard when someone shows interest or we find qualified prospects.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Ongoing Support</h3>
                    <p className="text-slate-600 text-sm">We're here to help you succeed. Our team provides ongoing support to ensure you get the most out of your leads.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">🇮🇳 India-Focused</h3>
                  <p className="text-slate-600 text-sm">We understand the Indian market, business practices, and local compliance requirements.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">✅ Verified Leads Only</h3>
                  <p className="text-slate-600 text-sm">Every lead is verified before delivery - no fake numbers or invalid emails.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">💰 Transparent Pricing</h3>
                  <p className="text-slate-600 text-sm">Custom pricing based on your budget - no hidden fees or surprise charges.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">⚡ Instant Delivery</h3>
                  <p className="text-slate-600 text-sm">Get leads as they come in - no waiting until end of week for batch delivery.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-6 text-lg">
                Book a free consultation and let's discuss how we can help grow your business.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/consultation">Request Free Consultation</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

