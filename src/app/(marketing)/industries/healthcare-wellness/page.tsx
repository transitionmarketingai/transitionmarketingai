'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope,
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
  Clock,
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

export default function HealthcareIndustryPage() {
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
              <Stethoscope className="h-10 w-10 text-[#233DFF]" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1F2B] mb-6 leading-[1.1] tracking-tight">
              Verified Patient Inquiries for Clinics, Hospitals & Wellness Brands.
            </h1>
            
            <p className="text-xl md:text-2xl text-[#1A1F2B] opacity-90 mb-10 leading-relaxed">
              Instead of random phone numbers from lead vendors, you get patients who have shared their problem and are ready to talk to your front desk.
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
        industryName="Healthcare"
        step1Title="AI Targeting for Healthcare"
        step1Bullets={[
          "Condition-specific keywords + location targeting + audience match."
        ]}
        step2VerificationSteps={[
          { num: 1, text: "We verify patient requirement, symptoms, budget (if applicable), and timeline for consultation." }
        ]}
        step3Title="Verified Patient Delivered"
        step3Bullets={[
          "Appointment-ready inquiries delivered instantly."
        ]}
      />

      {/* SECTION 2.5 — How Our Verified Inquiry Funnel Works */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-[#F7F8FA]">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              How Our Healthcare Funnel Works
            </h2>
          </div>

          {/* 5-Step Vertical Layout */}
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                step: 1,
                title: 'City + Specialty Targeting',
                description: 'We run campaigns specific to your city and specialties (dental, skin, ortho, physiotherapy, etc.).',
              },
              {
                step: 2,
                title: 'Patient Intake Form',
                description: 'Patients answer a few simple questions about symptoms, service type, and urgency.',
              },
              {
                step: 3,
                title: 'AI Priority Scoring',
                description: 'Our AI flags high-urgency and high-value cases so your staff knows who to call first.',
              },
              {
                step: 4,
                title: 'Human Verification',
                description: "Our team verifies phone numbers and checks if they're genuinely looking to book an appointment.",
              },
              {
                step: 5,
                title: 'Verified Patient Inquiries to You',
                description: 'You receive verified inquiries with context, not just a phone number.',
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

          {/* Disclaimer */}
          <div className="max-w-3xl mx-auto mt-20">
            <div className="bg-blue-50 p-6 rounded-[16px] border border-blue-200">
              <p className="text-[#1A1F2B] opacity-80 leading-relaxed text-sm italic">
                We never give medical advice or promises — we simply help qualified patients find the right provider and verify their interest before you speak to them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — What You Receive */}
      <IndustryBenefits 
        industryName="Healthcare"
        benefits={[
          {
            title: "Verified patient requirement",
            description: "Treatment need, symptoms, and condition confirmed during verification call.",
            icon: Stethoscope,
          },
          {
            title: "Verified location",
            description: "Only inquiries from patients in your service area or willing to travel.",
            icon: MapPin,
          },
          {
            title: "Verified consultation timeline",
            description: "Urgency and preferred appointment timing confirmed.",
            icon: Clock,
          },
          {
            title: "No invalid or fake numbers",
            description: "Every phone number and email validated before delivery.",
            icon: Shield,
          },
          {
            title: "Delivered with verification proof",
            description: "Each inquiry includes verification timestamp and confirmation details.",
            icon: CheckCircle,
          }
        ]}
      />

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
              Every inquiry includes verified details specific to healthcare
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
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Verified patient intent</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Every inquiry is confirmed to have genuine interest in your services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Confirmed treatment requirement</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Specific treatment or consultation need verified during call</p>
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
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Area + availability check</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Location verified and availability confirmed for appointments</p>
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
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">Appointment-ready inquiries</h3>
                      <p className="text-[#1A1F2B] opacity-70 text-sm">Patients ready to book consultations, not just browsing</p>
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
                    <Stethoscope className="h-12 w-12 text-[#233DFF]" />
                  </div>
                  <p className="text-[#1A1F2B] opacity-70 font-medium">Illustration Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — How We Verify */}
      <HowWeVerify industryName="Healthcare" />

      {/* SECTION 5 — Proof & Case Studies */}
      <IndustryProof 
        industryName="Healthcare"
        proofCards={[
          {
            metric: "72 verified patient inquiries → 15 new registrations in 30 days",
            description: "Real patients with verified requirements and timelines",
            client: "Healthcare Clinic, Bangalore",
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
              Healthcare Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                metric: "72 patient inquiries",
                description: "in 30 days",
                customer: "Dr. Priya Sharma, Bangalore",
                icon: Stethoscope,
              },
              {
                metric: "15 new registrations",
                description: "from verified inquiries",
                customer: "Healthcare Clinic",
                icon: Users,
              },
              {
                metric: "90% verification rate",
                description: "all inquiries verified",
                customer: "Wellness Center",
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
        industryName="Healthcare" 
        typicalRange="₹35,000–₹50,000"
        costPerInquiry="₹450–₹700"
        costPerInquirySubtext="Cost per verified patient inquiry: ₹450–₹700"
      />

      {/* SECTION 7 — Final CTA */}
      <FinalCTA 
        headline="Ready for Verified, Qualified, Real Inquiries?"
        subtext="See how many new patient inquiries we can target for your specialty in the next 30 days."
        buttonText="Book My Free Strategy Call"
        secondaryLink="#ai-verification-engine"
        secondaryLinkText="See Verification Steps →"
      />
    </div>
  );
}
