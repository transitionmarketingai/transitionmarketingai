'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home,
  CheckCircle,
  ArrowRight,
  MapPin,
  IndianRupee,
  Clock,
  BarChart3,
  Phone,
  Shield,
  Target,
  ArrowRightCircle,
  Zap,
  Star,
  MessageCircle,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import IndustryFunnel from '@/components/public/IndustryFunnel';
import IndustryBenefits from '@/components/public/IndustryBenefits';
import HowWeVerify from '@/components/public/HowWeVerify';
import IndustryProof from '@/components/public/IndustryProof';
import IndustryPricing from '@/components/public/IndustryPricing';
import FinalCTA from '@/components/public/FinalCTA';

export default function RealEstateIndustryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-[#E4E7EC] z-50">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
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

      {/* SECTION 1 — Industry Hero */}
      <section className="pt-[120px] pb-[100px] md:pb-[120px] px-4 md:px-8 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#F7F8FA] flex items-center justify-center mx-auto mb-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
              <Home className="h-10 w-10 text-[#233DFF]" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1F2B] mb-6 leading-[1.1] tracking-tight">
              Verified Property Buyer Inquiries — Not Just Portal Leads.
            </h1>
            
            <p className="text-xl md:text-2xl text-[#1A1F2B] opacity-90 mb-10 leading-relaxed">
              We attract buyers and investors who share their budget, location, and timeline — then we verify them before you ever pick up the phone.
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
      <IndustryFunnel 
        industryName="Real Estate"
        step1Title="AI Targeting for Property Buyers"
        step1Bullets={[
          "Keyword intent + demographic filters + buyer behaviour signals."
        ]}
        step2VerificationSteps={[
          { num: 1, text: "We validate requirement (1BHK/2BHK/3BHK), budget range, city/area preference, and buying timeline." }
        ]}
        step3Title="Verified Buyer Delivered"
        step3Bullets={[
          "You receive inquiries with verified phone, email, and budget confirmation."
        ]}
      />

      {/* SECTION 2.5 — How Our Verified Inquiry Funnel Works */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-[#F7F8FA]">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              How Our Real Estate Funnel Works
            </h2>
          </div>

          {/* 5-Step Vertical Layout */}
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                step: 1,
                title: 'High-Intent Property Campaigns',
                description: 'We run targeted ads for your locations and ticket sizes (Mumbai, Thane, Navi Mumbai, Dubai, etc.) on Google and Meta.',
              },
              {
                step: 2,
                title: 'Buyer & Investor Funnel',
                description: 'Interested people land on a focused page where they share property type, budget range, preferred locations, and buying timeline.',
              },
              {
                step: 3,
                title: 'AI Intent Scoring (0–100)',
                description: 'Our AI model scores each inquiry based on budget fit, location match, and urgency so we know who is serious.',
              },
              {
                step: 4,
                title: 'Human Verification Call',
                description: 'Our team verifies contact details and confirms interest in a quick call before the inquiry is delivered to you.',
              },
              {
                step: 5,
                title: 'Delivered to WhatsApp + Dashboard',
                description: 'You receive only verified property inquiries with full context, not raw portal leads.',
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

          {/* What counts as a good inquiry */}
          <div className="max-w-3xl mx-auto mt-20">
            <div className="bg-white p-8 rounded-[16px] border border-[#E4E7EC] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
              <h3 className="font-bold text-xl text-[#1A1F2B] mb-3">What counts as a good inquiry for real estate?</h3>
              <p className="text-[#1A1F2B] opacity-80 leading-relaxed text-lg">
                Someone who has a realistic budget, clear location preference, and an active buying timeline — and whose details we've already verified. That's what we deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — What You Receive */}
      <IndustryBenefits industryName="Real Estate" />

      {/* SECTION 4 — What You Receive (Existing) */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.15em] text-[#1A1F2B] opacity-60 font-medium mb-4">
              WHAT YOU RECEIVE
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              What You Receive
            </h2>
            <p className="text-lg text-[#1A1F2B] opacity-70 max-w-2xl mx-auto">
              Every inquiry includes verified details specific to real estate
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Benefits List */}
            <div className="space-y-6">
              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <IndianRupee className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Verified budgets (30L–3Cr)</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Every buyer's budget is confirmed during verification call</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <Home className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Verified property type</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">1BHK/2BHK/3BHK/Investment - matched to your listings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Real timeline (0–90 days)</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Know if they're buying now, in 3 months, or just exploring</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">City-specific buyers</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Hyper-local targeting ensures all inquiries are from your service areas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Illustration Placeholder */}
            <div className="relative">
              <div className="bg-[#F7F8FA] rounded-[18px] border border-[#E4E7EC] p-12 min-h-[400px] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-white mx-auto flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                    <Home className="h-12 w-12 text-[#233DFF]" />
                  </div>
                  <p className="text-[#1A1F2B] opacity-70 font-medium">Illustration Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — How We Verify */}
      <HowWeVerify industryName="Real Estate" />

      {/* SECTION 5 — Proof & Case Studies */}
      <IndustryProof 
        industryName="Real Estate"
        proofCards={[
          {
            metric: "60+ verified buyer inquiries → 3 confirmed bookings in 30 days",
            description: "Real buyers with verified budgets and timelines",
            client: "Real Estate Developer, Mumbai",
            icon: TrendingUp,
          }
        ]}
      />

      {/* SECTION 6 — Proof & Mini Case Studies (Existing) */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.15em] text-[#1A1F2B] opacity-60 font-medium mb-4">
              RESULTS
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              Real Estate Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                metric: "60+ qualified inquiries",
                description: "in 30 days",
                customer: "Rajesh Kumar, Mumbai",
                icon: Home,
              },
              {
                metric: "3 confirmed bookings",
                description: "within first month",
                customer: "Mumbai-based developer",
                icon: Star,
              },
              {
                metric: "90% verification rate",
                description: "all inquiries verified",
                customer: "Real Estate Agency",
                icon: CheckCircle,
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
                  <CardHeader className="p-8">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#1A1F2B] mb-2">{item.metric}</CardTitle>
                    <p className="text-[#1A1F2B] opacity-70 text-sm mb-3">{item.description}</p>
                    <p className="text-sm text-[#1A1F2B] opacity-60 font-medium">{item.customer}</p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Investment Range */}
      <IndustryPricing 
        industryName="Real Estate" 
        typicalRange="₹35,000–₹50,000"
        costPerInquiry="₹700–₹1,100"
        costPerInquirySubtext="Cost per verified property inquiry: ₹700–₹1,100"
      />

      {/* SECTION 7 — Final CTA */}
      <FinalCTA 
        headline="Ready for Verified, Qualified, Real Inquiries?"
        subtext="See how many verified property inquiries we can realistically deliver in the next 30 days."
        buttonText="Book My Free Strategy Call"
        secondaryLink="#ai-verification-engine"
        secondaryLinkText="See Verification Steps →"
      />
    </div>
  );
}
