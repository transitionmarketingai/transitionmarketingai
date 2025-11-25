'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Shield,
  BarChart3,
  Phone,
  Users,
  Target,
  ArrowRightCircle,
  Calendar,
  MapPin,
  BookOpen,
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

export default function EducationIndustryPage() {
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
              <GraduationCap className="h-10 w-10 text-[#233DFF]" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1F2B] mb-6 leading-[1.1] tracking-tight">
              Verified Student Enquiries That Are Ready to Enrol.
            </h1>
            
            <p className="text-xl md:text-2xl text-[#1A1F2B] opacity-90 mb-10 leading-relaxed">
              We filter out casual info-seekers so you focus on parents and students who are serious about admissions.
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
      <IndustryFunnel industryName="Education" />

      {/* SECTION 2.5 — How Our Verified Inquiry Funnel Works */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-[#F7F8FA]">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              How Our Education Funnel Works
            </h2>
          </div>

          {/* 5-Step Vertical Layout */}
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                step: 1,
                title: 'Parents & Students Targeting',
                description: 'We run campaigns targeting parents or students based on age, location, and course interest.',
              },
              {
                step: 2,
                title: 'Course & Grade Funnel',
                description: 'The form asks for course/program, class or grade, preferred timings, and budget range.',
              },
              {
                step: 3,
                title: 'AI Enrolment Readiness Score',
                description: 'Our AI model scores how likely they are to enrol this term based on their responses.',
              },
              {
                step: 4,
                title: 'Human Verification Call',
                description: "Our team verifies basic details and confirms they're open to a call with your counsellor.",
              },
              {
                step: 5,
                title: 'Verified Enquiries to Your Team',
                description: "You receive verified student enquiries with all important details — they're expecting your call.",
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

          {/* Extra line */}
          <div className="max-w-3xl mx-auto mt-20">
            <div className="bg-white p-6 rounded-[16px] border border-[#E4E7EC] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
              <p className="text-[#1A1F2B] opacity-80 leading-relaxed text-lg">
                Your counsellors speak to fewer, warmer enquiries instead of chasing long lists of cold leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — What You Receive */}
      <IndustryBenefits industryName="Education" />

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
              Every inquiry includes verified details specific to education
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
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Parent/student verified</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Both parent and student interest confirmed during verification call</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Confirmed grade, board, location</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Specific educational requirements verified before delivery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Timeline for admission (Immediate / Next Term)</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Enrollment urgency confirmed</p>
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
                    <GraduationCap className="h-12 w-12 text-[#233DFF]" />
                  </div>
                  <p className="text-[#1A1F2B] opacity-70 font-medium">Illustration Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — How We Verify */}
      <HowWeVerify industryName="Education" />

      {/* SECTION 5 — Proof & Case Studies */}
      <IndustryProof industryName="Education" />

      {/* SECTION 6 — Proof & Mini Case Studies (Existing) */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.15em] text-[#1A1F2B] opacity-60 font-medium mb-4">
              RESULTS
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              Education Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                metric: "120 student inquiries",
                description: "in one month",
                customer: "Meera Singh, Delhi",
                icon: GraduationCap,
              },
              {
                metric: "Parents ready to enroll",
                description: "verified inquiries",
                customer: "Education Institution",
                icon: Users,
              },
              {
                metric: "90% verification rate",
                description: "all inquiries verified",
                customer: "Training Center",
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
        industryName="Education" 
        typicalRange="₹35,000–₹50,000"
        costPerInquiry="₹350–₹600"
      />

      {/* SECTION 7 — Final CTA */}
      <FinalCTA 
        headline="Ready for Verified, Qualified, Real Inquiries?"
        subtext="Find out how many verified student enquiries we can help you generate in your city."
        buttonText="Book My Free Strategy Call"
        secondaryLink="#ai-verification-engine"
        secondaryLinkText="See Verification Steps →"
      />
    </div>
  );
}
