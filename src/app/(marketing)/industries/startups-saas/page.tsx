'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket,
  CheckCircle,
  ArrowRight,
  Shield,
  BarChart3,
  Phone,
  Users,
  Target,
  ArrowRightCircle,
  Zap,
  TrendingUp,
  Monitor
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import IndustryFunnel from '@/components/public/IndustryFunnel';
import IndustryBenefits from '@/components/public/IndustryBenefits';
import HowWeVerify from '@/components/public/HowWeVerify';
import IndustryProof from '@/components/public/IndustryProof';
import IndustryPricing from '@/components/public/IndustryPricing';
import FinalCTA from '@/components/public/FinalCTA';

export default function StartupsSaaSPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Button className="bg-[#233DFF] hover:bg-[#1E35E6] text-white" asChild>
              <Link href="/book">Book My Free Strategy Call</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-pink-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200">
              <Rocket className="h-3 w-3 mr-1" />
              For SaaS & Startups
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Product Demo Requests from Real Decision-Makers.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
              We fill your demo calendar with qualified prospects, not just trial signups that never show up.
            </p>

            <Button size="lg" className="bg-[#233DFF] hover:bg-[#1E35E6] text-white text-[17px] font-medium px-12 py-6 rounded-[16px] shadow-[0_6px_20px_rgba(35,61,255,0.15)] hover:shadow-[0_8px_24px_rgba(35,61,255,0.2)] hover:scale-[1.015] transition-all" asChild>
              <Link href="/book">
                Book My Free Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Industry Funnel Diagram */}
      <IndustryFunnel industryName="SaaS" />

      {/* SECTION 2.5 — How Our Verified Inquiry Funnel Works */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-[#F7F8FA]">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              How Our SaaS Funnel Works
            </h2>
          </div>

          {/* 5-Step Vertical Layout */}
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                step: 1,
                title: 'ICP Traffic to a Focused Demo Page',
                description: 'We send ideal prospects to a single, clear demo/consultation page.',
              },
              {
                step: 2,
                title: 'Qualifying Questions',
                description: "We capture company name, team size, current tool stack, and problem they're trying to solve.",
              },
              {
                step: 3,
                title: 'AI Fit & Intent Score',
                description: 'Our AI model scores the account based on fit and urgency.',
              },
              {
                step: 4,
                title: 'Human Confirmation',
                description: "Our team verifies the contact and confirms they're ready for a product conversation.",
              },
              {
                step: 5,
                title: 'Verified Demo Requests',
                description: 'You receive verified demo requests that your sales team can directly book or follow up on.',
              },
            ].map((item) => (
              <Card key={item.step} className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0 text-xl font-bold text-[#1A1F2B]">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-[#1A1F2B] mb-2">{item.title}</h3>
                      <p className="text-[#1A1F2B] opacity-70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3 — What You Receive */}
      <IndustryBenefits industryName="SaaS" />

      {/* SECTION 4 — What You Get - SaaS Specific */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What You Receive
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every inquiry includes verified details specific to SaaS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Verified ICP match",
                description: "Inquiries match your ideal customer profile - company size, industry, role",
                icon: Target,
                color: "bg-blue-100 text-blue-700"
              },
              {
                title: "Use Case + problem confirmation",
                description: "Specific use case and problem statement verified during call",
                icon: Monitor,
                color: "bg-green-100 text-green-700"
              },
              {
                title: "Demo-ready with timeline",
                description: "Decision-makers ready for demos with confirmed evaluation timeline",
                icon: Calendar,
                color: "bg-purple-100 text-purple-700"
              },
              {
                title: "Budget & authority verified",
                description: "Budget availability and decision-making authority confirmed",
                icon: TrendingUp,
                color: "bg-amber-100 text-amber-700"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="border-2 border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — How We Verify */}
      <HowWeVerify industryName="SaaS" />

      {/* SECTION 5 — Proof & Case Studies */}
      <IndustryProof industryName="SaaS" />

      {/* SECTION 6 — Investment Range */}
      <IndustryPricing 
        industryName="SaaS" 
        typicalRange="₹35,000–₹50,000"
        costPerInquiry="₹1,200–₹2,500"
      />

      {/* SECTION 7 — Final CTA */}
      <FinalCTA 
        headline="Ready for Verified, Qualified, Real Inquiries?"
        subtext="See how a verified demo request funnel would look for your SaaS."
        buttonText="Book My Free Strategy Call"
        secondaryLink="#ai-verification-engine"
        secondaryLinkText="See Verification Steps →"
      />
    </div>
  );
}
