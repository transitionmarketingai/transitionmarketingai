import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Home, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function RealEstateIndustryPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" href="/" />
            <Link href="/onboarding">
              <Button className="bg-blue-600 hover:bg-blue-700">Start Free Onboarding</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Verified Property Buyer Inquiries — Not Random Clicks.
            </h1>
          </div>

          <Card className="border-2 border-slate-200 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <X className="h-6 w-6 text-red-600" />
                The Problem
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>Real estate agents waste hours on cold calls that go nowhere. Fake numbers, wrong contacts, and tire-kickers who aren't serious buyers drain your time and energy.</p>
                <p>Traditional lead generation gives you lists of phone numbers, but no way to know if those people actually want to buy property right now.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                How We Solve It
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>We run AI-powered ads on Google, Facebook, and property portals. When someone clicks your ad showing real interest in buying property, our team calls them to verify their intent, budget, and timeline.</p>
                <p>Only genuine buyers with verified phone numbers and confirmed interest get delivered to your WhatsApp and dashboard. Every inquiry is real, verified, and ready for you to close.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Typical Cost</h2>
              <p className="text-3xl font-bold text-blue-600 mb-2">₹700–₹1,100 per verified inquiry</p>
              <p className="text-slate-600">Typical range: ₹35,000–₹50,000 (includes ad spend). Exact quote after onboarding.</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
              <Link href="/onboarding">
                Start Free Onboarding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

