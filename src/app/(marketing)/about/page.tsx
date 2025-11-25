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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Built to Solve the Biggest Problem in Lead Generation: Trust.</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Most businesses in India waste money on raw leads — fake numbers, cold lists, and unverified forms. We built Transition Marketing AI to change this completely. Our system delivers only verified, ready-to-convert inquiries that come from real people with genuine intent.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission Is Simple: Deliver Real Growth, Not Raw Data.</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                We help Indian businesses stop wasting money on cold leads. Instead of sending unverified form fills, we deliver real inquiries that are verified at every stage — AI scoring, identity validation, and manual confirmation. This reduces time wasted, increases conversions, and creates predictable revenue.
              </p>
            </CardContent>
          </Card>

          {/* The Problem with Traditional Lead Generation */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">The Industry Is Broken — And Businesses Deserve Better.</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Raw leads with no verification</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Fake numbers and invalid emails</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Duplicates and recycled lists</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">No accountability for results</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">High ad spend with low conversions</p>
                </div>
              </div>
              <p className="text-slate-700 font-semibold text-lg">
                We built a system that fixes all of this permanently.
              </p>
            </CardContent>
          </Card>

          {/* The Transition Marketing AI Approach */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">A Verified Inquiry System — Powered by AI + Human Intelligence.</h2>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                Our Verification Engine™ combines AI intent signals, identity validation, and human confirmation to ensure that every inquiry you receive is genuine. Only real people with real interest reach your business.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 font-semibold">AI Intent Scoring</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 font-semibold">AI Identity Validation</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 font-semibold">Human Confirmation Call</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 font-semibold">Verified Delivery (WhatsApp + Dashboard)</p>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Why Businesses Trust Us */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">A System Built for Reliability, Consistency, and Transparency.</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Exclusive inquiries — delivered to only one business</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Verification timestamp + proof</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Industry-specific funnels</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Real-time tracking</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">Performance-backed guarantee</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Impact */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">10,000+ Verified Inquiries Delivered Across India.</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                From real estate to healthcare to B2B services, we have helped businesses get predictable, verified demand — not cold leads.
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Stop Chasing Unverified Inquiries and Start Closing Real Conversations?</h2>
              <p className="text-blue-100 mb-6 text-lg">
                Book your free strategy session and see how many verified inquiries we can deliver for your business.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/book">Book My Free Strategy Call</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

