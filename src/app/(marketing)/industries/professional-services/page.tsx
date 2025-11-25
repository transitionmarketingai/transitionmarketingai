'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase,
  CheckCircle,
  ArrowRight,
  Shield,
  BarChart3,
  Phone,
  Users,
  Target,
  ArrowRightCircle,
  Building2,
  TrendingUp,
  DollarSign,
  Star
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import IndustryFunnel from '@/components/public/IndustryFunnel';
import IndustryBenefits from '@/components/public/IndustryBenefits';
import HowWeVerify from '@/components/public/HowWeVerify';
import IndustryProof from '@/components/public/IndustryProof';
import IndustryPricing from '@/components/public/IndustryPricing';
import FinalCTA from '@/components/public/FinalCTA';

export default function ProfessionalServicesPage() {
  return (
    <div className="min-h-screen bg-white">
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
              <Briefcase className="h-10 w-10 text-[#233DFF]" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1F2B] mb-6 leading-[1.1] tracking-tight">
              Verified B2B Service Inquiries from Real Decision-Makers.
            </h1>
            
            <p className="text-xl md:text-2xl text-[#1A1F2B] opacity-90 mb-10 leading-relaxed">
              We filter out interns, researchers, and tyre-kickers so you spend time with people who can actually move a deal forward.
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
      <IndustryFunnel industryName="B2B Services" />

      {/* SECTION 2.5 — How Our Verified Inquiry Funnel Works */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-[#F7F8FA]">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              How Our B2B Funnel Works
            </h2>
          </div>

          {/* 5-Step Vertical Layout */}
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                step: 1,
                title: 'ICP-Based Targeting',
                description: 'We target industries, roles, and company sizes that match your ideal client profile.',
              },
              {
                step: 2,
                title: 'Discovery Form',
                description: 'Leads share their company name, role, service need, and timeline.',
              },
              {
                step: 3,
                title: 'AI Account Fit Scoring',
                description: 'Our AI scores the inquiry based on role seniority, company size, and urgency.',
              },
              {
                step: 4,
                title: 'Human Qualification',
                description: 'Our team verifies contact details and checks if they're open to a discovery/demo call.',
              },
              {
                step: 5,
                title: 'Qualified Inquiry Handover',
                description: 'You get verified B2B enquiries ready for your sales calendar — not a scraped list.',
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
      <IndustryBenefits industryName="B2B Services" />

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
              Every inquiry includes verified details specific to B2B services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Benefits List */}
            <div className="space-y-6">
              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Decision-makers only</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Only inquiries from verified decision-makers with authority to buy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Verified company size</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Company size and employee count confirmed during verification</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Verified requirement scope</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Specific service need and project scope confirmed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Demo-ready inquiries</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Businesses ready for demos, proposals, or consultations</p>
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
                    <Briefcase className="h-12 w-12 text-[#233DFF]" />
                  </div>
                  <p className="text-[#1A1F2B] opacity-70 font-medium">Illustration Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — How We Verify */}
      <HowWeVerify industryName="B2B Services" />

      {/* SECTION 5 — Proof & Case Studies */}
      <IndustryProof industryName="B2B Services" />

      {/* SECTION 6 — Proof & Mini Case Studies (Existing) */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.15em] text-[#1A1F2B] opacity-60 font-medium mb-4">
              RESULTS
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              B2B Services Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                metric: "45 demo call inquiries",
                description: "decision-makers verified",
                customer: "Amit Patel, Pune",
                icon: Briefcase,
              },
              {
                metric: "Decision-makers verified",
                description: "all inquiries from authorized buyers",
                customer: "B2B Service Provider",
                icon: Users,
              },
              {
                metric: "90% verification rate",
                description: "all inquiries verified",
                customer: "Professional Services",
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
        industryName="B2B Services" 
        typicalRange="₹35,000–₹50,000"
        costPerInquiry="₹1,500–₹3,000"
      />

      {/* SECTION 7 — Final CTA */}
      <FinalCTA 
        headline="Ready for Verified, Qualified, Real Inquiries?"
        subtext="Let's see how many verified enquiries we can generate for your B2B service in the next 30 days."
        buttonText="Book My Free Strategy Call"
        secondaryLink="#ai-verification-engine"
        secondaryLinkText="See Verification Steps →"
      />
    </div>
  );
}
