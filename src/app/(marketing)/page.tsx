'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MessageCircle,
  CheckCircle,
  ArrowRight,
  X,
  Target,
  BarChart3,
  Users,
  Mail,
  Phone,
  Clock,
  Shield,
  TrendingUp,
  IndianRupee,
  Zap,
  Calendar,
  FileText,
  Building2,
  GraduationCap,
  Stethoscope,
  Home,
  Car,
  ShoppingBag,
  Rocket,
  Wrench,
  Briefcase,
  Plane,
  CreditCard,
  Palette,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { getABTestVariant, trackOnboardingSubmit, trackCalendlyBooking, trackWhatsAppClick, getUTMParams } from '@/lib/tracking';
import { StructuredDataFAQ } from '@/components/analytics/StructuredDataFAQ';
import { StructuredDataOrganization } from '@/components/analytics/StructuredDataOrganization';
import { CookieConsent } from '@/components/CookieConsent';
import VerificationEngine from '@/components/public/VerificationEngine';
import FinalCTA from '@/components/public/FinalCTA';

export default function LandingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918888888888';
  const whatsappMessage = encodeURIComponent('Hi, I\'m interested in your verified inquiry service. Can you tell me more?');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // A/B Test: Hero Headline (client-side only)
  const [heroVariant, setHeroVariant] = useState<'A' | 'B'>('A');
  
  const heroHeadlines = {
    A: "Stop Buying Leads. Get Verified Inquiries Ready to Talk.",
    B: "Stop Buying Leads. Get Verified Inquiries Ready to Talk.",
  };

  // Track UTM params and set A/B test variant on page load
  useEffect(() => {
    const utmParams = getUTMParams();
    if (Object.keys(utmParams).length > 0) {
      // UTM params are automatically stored in localStorage by getUTMParams
      console.log('UTM params captured:', utmParams);
    }

    // Set A/B test variant (consistent per user)
    const variant = getABTestVariant('hero_headline', ['A', 'B']) as 'A' | 'B';
    setHeroVariant(variant);

    // Track which variant is shown
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'ab_test_view',
        test_name: 'hero_headline',
        variant: variant,
      });
    }
  }, []);

  // Track WhatsApp clicks
  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
  };

  // Track Calendly bookings
  const handleCalendlyClick = () => {
    trackCalendlyBooking();
  };

  // Quiz form removed - now redirects to /onboarding

  // Scroll animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* WhatsApp Floating Button - Sticky for Mobile */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group md:bottom-6 md:right-6"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className="hidden sm:inline-block text-sm font-medium group-hover:max-w-xs transition-all">
          Chat on WhatsApp
        </span>
      </a>

      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200/80 z-50 shadow-sm sticky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <Logo size="md" href="/" className="hover:opacity-90 transition-opacity" />
              <Badge variant="outline" className="hidden sm:inline-flex border-blue-200 text-blue-700 bg-blue-50/80 font-medium px-2.5 py-1 text-xs">
                🇮🇳 India
              </Badge>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link 
                href="#ai-verification-engine" 
                className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors relative group"
              >
                Verification Engine
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="#pilot-offer" 
                className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors relative group"
              >
                Pricing & Guarantee
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="#results" 
                className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors relative group"
              >
                Case Studies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="/insights" 
                className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors relative group"
              >
                Insights
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="#faq" 
                className="text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors relative group"
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            </div>

            {/* CTA Section */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="hidden md:inline-flex border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm" 
                asChild
              >
                <Link href="/login">Client Login</Link>
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 shadow-md hover:shadow-lg transition-all" 
                asChild
              >
                <Link href="/book">Book My Free Strategy Call</Link>
              </Button>
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium, Minimal */}
      <section className="relative pt-[120px] md:pt-[160px] pb-[120px] md:pb-[160px] px-4 md:px-8 bg-white overflow-hidden">
        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Headline + Subtext + Badges + CTA */}
            <div className="space-y-8">
              {/* Main Headline - A/B Test */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1F2B] leading-[1.1] tracking-tight">
                {heroHeadlines[heroVariant as 'A' | 'B']}
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-[#1A1F2B] opacity-90 leading-[1.5] font-medium">
                We combine AI scoring + human verification to send you only real people who want what you sell — no cold lists, no recycled data, no time-wasters.
              </p>

              {/* Micro Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC] px-4 py-1.5 font-medium" aria-label="Data Verified">
                  Every inquiry checked by humans before delivery ✓
                </Badge>
                <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC] px-4 py-1.5 font-medium" aria-label="AI Intent Scoring">
                  AI Intent Scoring ✓
                </Badge>
                <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC] px-4 py-1.5 font-medium" aria-label="Human Confirmation">
                  Human Confirmation ✓
                </Badge>
                <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC] px-4 py-1.5 font-medium" aria-label="Exclusive Delivery">
                  We don't resell the same leads to multiple clients ✓
                </Badge>
              </div>

              {/* CTA Button - Unified */}
              <div className="flex flex-col gap-5">
                <Button size="lg" className="bg-[#233DFF] hover:bg-[#1E35E6] text-white text-[17px] font-medium px-12 py-6 rounded-[16px] shadow-[0_6px_20px_rgba(35,61,255,0.15)] hover:shadow-[0_8px_24px_rgba(35,61,255,0.2)] hover:scale-[1.015] transition-all w-fit" asChild>
                  <Link href="/book">
                    Book My Free Strategy Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC] px-4 py-1.5 text-sm font-medium w-fit">
                  Only 10 launch slots per month
                </Badge>
              </div>
            </div>

            {/* Right: Placeholder for AI Verification Engine Visual */}
            <div className="relative">
              <div className="bg-[#F7F8FA] rounded-[18px] border border-[#E4E7EC] p-12 min-h-[500px] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-white mx-auto flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                    <Shield className="h-12 w-12 text-[#233DFF]" />
                  </div>
                  <p className="text-[#1A1F2B] opacity-70 font-medium">AI Verification Engine™ Visual</p>
                  <p className="text-sm text-[#1A1F2B] opacity-50">Placeholder for future visual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip - Slim */}
      <section className="py-8 px-4 md:px-8 bg-[#F7F8FA] border-y border-[#E4E7EC]">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center">
            <p className="text-base md:text-lg text-[#1A1F2B] opacity-90 font-medium">
              10,000+ verified inquiries delivered • 90% verification accuracy • Trusted by businesses across India
            </p>
          </div>
        </div>
      </section>

      {/* Differentiation Block - Agency vs Us */}
      <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-white reveal-on-scroll">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
              COMPARISON
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
              Not Just Raw Data — Real Verified Inquiries Waiting to Happen
            </h2>
            <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl mx-auto leading-[1.5]">
              See the difference between traditional agencies and our verified inquiry system
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-[1200px] mx-auto">
            {/* Left Column - Traditional Agencies */}
            <Card className="border border-[#E4E7EC] bg-[#F7F8FA] rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out">
              <CardHeader className="p-8 lg:p-10 pb-6">
                <CardTitle className="text-2xl font-bold text-[#1A1F2B]">
                  Traditional Agencies
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 lg:p-10 pt-0">
                <ul className="space-y-4">
                  {[
                    'No cold data or purchased lists',
                    'No shared or recycled leads',
                    'No bulk Excel sheets for you to chase',
                    'No fake numbers or duplicates',
                    'No accountability or guarantees',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-[#1A1F2B] opacity-40 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-[#1A1F2B] opacity-90 leading-[1.5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Right Column - Transition Marketing AI */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out">
              <CardHeader className="p-8 lg:p-10 pb-6">
                <CardTitle className="text-2xl font-bold text-[#1A1F2B]">
                  Transition Marketing AI
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 lg:p-10 pt-0">
                <ul className="space-y-4">
                  {[
                    'Real-time, verified inquiries from people who actually filled a form or ad',
                    'Each inquiry checked by our team before it reaches you',
                    'Full proof of source: campaign, ad, and landing page',
                    'Each inquiry is delivered to only one business - always exclusive, never shared',
                    'If we don\'t hit your minimum verified inquiries, we continue at our cost until we do',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <CheckCircle className="h-5 w-5 text-[#233DFF] flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-[#1A1F2B] opacity-90 leading-[1.5]">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Selector - Grid */}
      <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-[#F7F8FA] reveal-on-scroll">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
              INDUSTRIES
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl mx-auto leading-[1.5]">
              See how our AI-powered ads + verification work for your industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {[
              {
                name: 'Real Estate',
                label: 'Verified Property Buyer Inquiries',
                slug: 'real-estate-builders',
                icon: Home,
              },
              {
                name: 'Healthcare',
                label: 'Verified Patient Inquiries',
                slug: 'healthcare-wellness',
                icon: Stethoscope,
              },
              {
                name: 'Education',
                label: 'Verified Student/Parent Inquiries',
                slug: 'education-training',
                icon: GraduationCap,
              },
              {
                name: 'B2B Services',
                label: 'Verified Decision-Maker Inquiries',
                slug: 'professional-services',
                icon: Briefcase,
              },
              {
                name: 'Startups & SaaS',
                label: 'Verified Demo/Trial Requests',
                slug: 'startups-saas',
                icon: Rocket,
              },
            ].map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <Link key={idx} href={`/industries/${industry.slug}`}>
                  <Card className="border border-[#E4E7EC] hover:border-[#233DFF] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(35,61,255,0.12)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out cursor-pointer h-full">
                    <CardContent className="p-8 lg:p-10 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#F5F6FA] flex items-center justify-center mx-auto mb-5">
                        <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                      </div>
                      <h3 className="font-bold text-lg text-[#1A1F2B] mb-2">{industry.name}</h3>
                      <p className="text-sm text-[#1A1F2B] opacity-70 mb-2 leading-[1.5]">{industry.label}</p>
                      <p className="text-sm text-[#1A1F2B] opacity-60 leading-[1.5]">Explore Industry →</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Flagship Offer (Verified Inquiry Launch Program) */}
      <section id="pilot-offer" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Verified Inquiry Launch Program
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get 30–50 verified inquiries in 30 days — or we work for free until we do.
            </p>
          </div>

          <Card className="bg-white text-slate-900 border-2 border-blue-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  'AI-optimized Google, Facebook & LinkedIn campaigns',
                  'Industry-specific targeting & creatives',
                  'AI + human verification (phone + email)',
                  'Instant delivery to WhatsApp + dashboard',
                  'Weekly optimization and reporting',
                  'No lock-in, no contract',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <p className="text-lg font-semibold text-slate-900">
                  One all-inclusive launch fee (includes ad spend). Exact investment shared during your free strategy session.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Funnel Overview - 3-Step Flow */}
      <section id="how-it-works" className="py-[110px] md:py-[140px] px-4 md:px-8 bg-[#F7F8FA] reveal-on-scroll">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.15em] text-[#1A1F2B] opacity-60 font-medium mb-4">
              PROCESS
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              How We Deliver Verified Inquiries
            </h2>
            <p className="text-lg text-[#1A1F2B] opacity-70 max-w-2xl mx-auto">
              A simple 3-step process that delivers verified inquiries with proof to your dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Book Your Strategy Session",
                description: "Tell us about your business and goals in 30 seconds.",
                icon: Calendar,
              },
              {
                step: 2,
                title: "We Build & Run Your Funnel",
                description: "AI-optimized ads + industry funnel + verification engine.",
                icon: Zap,
              },
              {
                step: 3,
                title: "You Receive Verified Inquiries",
                description: "Delivered with proof and verification timestamp.",
                icon: CheckCircle,
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
                  <CardHeader className="p-8 pb-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[#1A1F2B] text-xl font-bold">
                        {item.step}
                      </div>
                      <Icon className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#1A1F2B] leading-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-[#1A1F2B] opacity-70 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Verification Engine™ - Premium Component */}
      <div id="ai-verification-engine" className="reveal-on-scroll">
        <VerificationEngine variant="homepage" />
      </div>


      {/* Investment Range - Clean Card Style */}
      <section className="py-[110px] md:py-[140px] px-4 md:px-8 bg-[#F7F8FA] reveal-on-scroll">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.15em] text-[#1A1F2B] opacity-60 font-medium mb-4">
              INVESTMENT
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              Typical Investment Range (includes ad spend)
            </h2>
            <p className="text-lg text-[#1A1F2B] opacity-70 max-w-2xl mx-auto">
              Exact quote is shared during your free strategy session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Real Estate Example */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-5 w-5 text-[#233DFF]" strokeWidth={1.5} />
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">Real Estate</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B]">Real Estate</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Typical Range:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹35,000–₹50,000</p>
                    <p className="text-xs text-[#1A1F2B] opacity-50 mt-1">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Cost per verified inquiry:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹700–₹1,100</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare Example */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Stethoscope className="h-5 w-5 text-[#233DFF]" strokeWidth={1.5} />
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">Healthcare</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B]">Healthcare</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Typical Range:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹35,000–₹50,000</p>
                    <p className="text-xs text-[#1A1F2B] opacity-50 mt-1">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Cost per verified inquiry:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹450–₹700</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education Example */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-5 w-5 text-[#233DFF]" strokeWidth={1.5} />
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">Education</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B]">Education</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Typical Range:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹35,000–₹50,000</p>
                    <p className="text-xs text-[#1A1F2B] opacity-50 mt-1">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Cost per verified inquiry:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹350–₹600</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B2B Example */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-5 w-5 text-[#233DFF]" strokeWidth={1.5} />
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">B2B</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B]">B2B Services</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Typical Range:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹35,000–₹50,000</p>
                    <p className="text-xs text-[#1A1F2B] opacity-50 mt-1">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#1A1F2B] opacity-70 mb-2">Cost per verified inquiry:</p>
                    <p className="text-xl font-bold text-[#1A1F2B]">₹1,500–₹3,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Performance-Backed Guarantee */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50 reveal-on-scroll">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block relative group mb-4">
              <div className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold cursor-help">
                Performance-Backed ✓ We work free until you hit your goal
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-4 bg-slate-900 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                We continue running your campaign at our cost until we deliver your minimum inquiries. No excuses, no extra fees.
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="w-3 h-3 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Performance-Backed Guarantee
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              If we don't deliver your minimum verified inquiries, we continue running your campaigns at our cost until we do. No excuses, no extra fees.
            </p>
          </div>

          <Card className="border-2 border-green-300 bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  'No excuses',
                  'No algorithm blame',
                  'No extra fees',
                  'You only pay for performance',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <p className="font-semibold text-slate-900">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 px-4 bg-slate-50 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-6">Trusted By</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder logos - replace with actual client logos */}
              <div className="h-12 w-32 bg-slate-300 rounded flex items-center justify-center text-slate-500 text-xs font-semibold">
                Client Logo
              </div>
              <div className="h-12 w-32 bg-slate-300 rounded flex items-center justify-center text-slate-500 text-xs font-semibold">
                Client Logo
              </div>
              <div className="h-12 w-32 bg-slate-300 rounded flex items-center justify-center text-slate-500 text-xs font-semibold">
                Client Logo
              </div>
              <div className="h-12 w-32 bg-slate-300 rounded flex items-center justify-center text-slate-500 text-xs font-semibold">
                Client Logo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid - 4-Card Layout */}
      <section id="results" className="py-[110px] md:py-[140px] px-4 md:px-8 bg-white reveal-on-scroll">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.15em] text-[#1A1F2B] opacity-60 font-medium mb-4">
              RESULTS
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1]">
              What Our Clients Said After 30 Days
            </h2>
            <p className="text-lg text-[#1A1F2B] opacity-70 max-w-2xl mx-auto">
              Every inquiry we send you is verified, tracked, and timestamped for proof.
            </p>
            <p className="text-sm text-[#1A1F2B] opacity-60 max-w-2xl mx-auto mt-4 italic">
              Every inquiry is verified through AI intent analysis, identity validation, and human confirmation where applicable. Verification improves accuracy but cannot guarantee the final decision or action of the individual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real Estate */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-[#F7F8FA] rounded-full flex items-center justify-center">
                    <Home className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                  </div>
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">Real Estate</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B] mb-3">60+ verified property inquiries → 3 confirmed bookings</CardTitle>
                <p className="text-sm text-[#1A1F2B] opacity-80 font-medium mb-2">Rajesh Kumar, Mumbai</p>
                <p className="text-xs text-[#1A1F2B] opacity-60 italic leading-relaxed">"Every inquiry was verified before I called them. No time wasted."</p>
              </CardHeader>
            </Card>

            {/* Healthcare */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-[#F7F8FA] rounded-full flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                  </div>
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">Healthcare</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B] mb-3">72 verified patient inquiries → 15 registrations</CardTitle>
                <p className="text-sm text-[#1A1F2B] opacity-80 font-medium mb-2">Dr. Priya Sharma, Bangalore</p>
                <p className="text-xs text-[#1A1F2B] opacity-60 italic leading-relaxed">"Real patients, not just phone numbers. Quality over quantity."</p>
              </CardHeader>
            </Card>

            {/* B2B SaaS */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-[#F7F8FA] rounded-full flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                  </div>
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">B2B SaaS</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B] mb-3">45 demo-ready inquiries → decision-makers only</CardTitle>
                <p className="text-sm text-[#1A1F2B] opacity-80 font-medium mb-2">Amit Patel, Pune</p>
                <p className="text-xs text-[#1A1F2B] opacity-60 italic leading-relaxed">"Decision-makers who actually booked demos. Worth every rupee."</p>
              </CardHeader>
            </Card>

            {/* Education */}
            <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-[1.015] transition-all">
              <CardHeader className="p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-[#F7F8FA] rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-[#233DFF]" strokeWidth={1.5} />
                  </div>
                  <Badge className="bg-[#F7F8FA] text-[#1A1F2B] border border-[#E4E7EC]">Education</Badge>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A1F2B] mb-3">120 verified student inquiries → ready to enroll</CardTitle>
                <p className="text-sm text-[#1A1F2B] opacity-80 font-medium mb-2">Meera Singh, Delhi</p>
                <p className="text-xs text-[#1A1F2B] opacity-60 italic leading-relaxed">"Parents ready to enroll. No more chasing unverified inquiries that don't convert."</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA - Premium Centered */}
      <FinalCTA 
        headline="Ready for Verified, Qualified, Real Inquiries?"
        subtext="Book your free strategy session and see how many verified inquiries we can deliver for your business."
        buttonText="Book My Free Strategy Call"
      />

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How are inquiries generated?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We run AI-optimized campaigns across Google, Meta, and LinkedIn based on your industry. Our system identifies real user intent, validates identity, and confirms the requirement before delivering the inquiry to you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Are the inquiries exclusive to me?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes. Every inquiry we deliver is exclusive to your business. We never recycle data, never share inquiries across clients, and never deliver cold lists.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What is a verified inquiry?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                A verified inquiry is someone who has shown real interest through an ad, passed AI intent scoring, passed identity validation, and confirmed their requirement during a short human verification call.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How soon will I see results?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Most businesses start receiving verified inquiries within 5–7 days of campaign launch. This depends on your industry, location, and targeting depth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What happens if you don't deliver the promised inquiries?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Our performance guarantee covers you. If we don't meet your minimum verified inquiry target, we keep running the campaigns at our cost until we do. No excuses and no extra fees.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Do you charge separately for ads?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                No. Your investment includes ad spend, funnel setup, verification, and delivery. This makes our pricing transparent and predictable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How do I receive the verified inquiries?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                All verified inquiries are delivered instantly to your WhatsApp and appear inside your AI dashboard with tags, source proof, and verification timestamp.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What industries do you support?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We support Real Estate, Healthcare, Education, B2B Services, Startups & SaaS. Each industry gets its own funnel and verification criteria.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Do you use cold calling or purchased data?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                No. We never use cold data, purchased lists, or scraping. Every inquiry begins with a real ad click from a real person.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How is this different from a marketing agency?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Agencies give you raw ad inquiries. We deliver verified, ready-to-convert inquiries using AI intent scoring, identity validation, and human confirmation — backed by a performance guarantee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Can I track everything?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes. Your dashboard shows all inquiries, verification status, timestamps, tags, and source. You always know where each inquiry came from.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How does the strategy session work?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                In 15–20 minutes, we understand your goals, timeline, and industry. Then we show you how many verified inquiries you can realistically expect and share your custom quote.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <Logo size="md" theme="dark" className="mb-6" />
              <p className="text-slate-400 mb-6 leading-relaxed">
                India's most advanced AI-powered verification system for real, qualified inquiries.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#ai-verification-engine" className="text-slate-400 hover:text-white transition-colors">
                    Verification Engine
                  </Link>
                </li>
                <li>
                  <Link href="#pilot-offer" className="text-slate-400 hover:text-white transition-colors">
                    Pricing & Guarantee
                  </Link>
                </li>
                <li>
                  <Link href="#results" className="text-slate-400 hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="text-slate-400 hover:text-white transition-colors">
                    Insights
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col gap-6">
              <div className="bg-slate-800 rounded-lg p-6 max-w-2xl mx-auto text-center">
                <p className="text-slate-300 italic mb-2">
                  "I built Transition Marketing AI so businesses can finally trust their inquiries. Every inquiry you receive has passed AI intent scoring, identity validation, and human confirmation."
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  — Abhishek John, Founder
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-400">
                  © 2025 Transition Marketing AI. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
