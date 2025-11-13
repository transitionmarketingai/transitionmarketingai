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

export default function LandingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918888888888';
  const whatsappMessage = encodeURIComponent('Hi, I\'m interested in your lead generation service. Can you tell me more?');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // A/B Test: Hero Headline (client-side only)
  const [heroVariant, setHeroVariant] = useState<'A' | 'B'>('A');
  
  const heroHeadlines = {
    A: "Get Verified, Warm Inquiries — Not Cold Leads.",
    B: "Stop Wasting Time on Cold Leads. Get Real Verified Inquiries.",
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

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate estimated investment based on quiz answers
    const baseInvestment = 30000;
    const industryMultiplier: Record<string, number> = {
      'real-estate': 1.5,
      'healthcare': 1.2,
      'education': 1.0,
      'b2b': 1.8,
      'startups': 1.3,
      'other': 1.0,
    };
    const multiplier = industryMultiplier[quizData.industry] || 1.0;
    const estimatedInvestment = Math.round(baseInvestment * multiplier);
    setShowQuizResult(true);
  };

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

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <Badge variant="outline" className="border-blue-600 text-blue-700 bg-blue-50">
                🇮🇳 India
              </Badge>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</Link>
              <Link href="#pilot-offer" className="text-gray-700 hover:text-gray-900 font-medium">Pilot Offer</Link>
              <Link href="#results" className="text-gray-700 hover:text-gray-900 font-medium">Results</Link>
              <Link href="/insights" className="text-gray-700 hover:text-gray-900 font-medium">Insights</Link>
              <Link href="#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/onboarding">See If You Qualify</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified Trust-Focused */}
      <section className="relative pt-24 md:pt-32 pb-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline - A/B Test */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              {heroHeadlines[heroVariant as 'A' | 'B']}
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed font-medium">
              We use AI + human verification to send you only genuine people who want what you sell.
            </p>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-6 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">10,000+ leads delivered</span>
              <span>•</span>
              <span className="font-semibold text-slate-900">90% verified</span>
              <span>•</span>
              <span className="font-semibold text-slate-900">Trusted across India</span>
            </div>

            {/* Micro Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              <Badge className="bg-green-100 text-green-800 border-green-300 px-4 py-1.5" aria-label="Data Verified">
                Data Verified ✓
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300 px-4 py-1.5" aria-label="Ad Spend Included">
                Ad Spend Included ✓
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-300 px-4 py-1.5" aria-label="Exclusive Inquiries">
                Exclusive Inquiries ✓
              </Badge>
            </div>

            {/* CTA Buttons - Primary: Quiz, Secondary: Consultation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
                <Link href="/onboarding">
                  See If You Qualify (Takes 30 Seconds)
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" onClick={handleCalendlyClick}>
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 px-4 bg-white reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Not Just Leads — Real Conversations Waiting to Happen
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
            {/* Left Column - What We Don't Do */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-red-900">
                  <X className="h-6 w-6 text-red-600" />
                  What We Don't Do:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'No cold data or purchased lists',
                    'No recycled contacts',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Right Column - What We Do */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-green-900">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  What We Deliver:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Real-time verified inquiries',
                    'Exclusive to your business',
                    'Delivered with source proof',
                    'Backed by performance guarantee',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
              <Link href="/onboarding">
                See If You Qualify
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-4 bg-slate-50 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how our AI-powered ads + verification work for your industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                name: 'Real Estate',
                slug: 'real-estate-builders',
                icon: Home,
                color: 'bg-blue-100 border-blue-300 text-blue-700'
              },
              {
                name: 'Healthcare',
                slug: 'healthcare-wellness',
                icon: Stethoscope,
                color: 'bg-green-100 border-green-300 text-green-700'
              },
              {
                name: 'Education',
                slug: 'education-training',
                icon: GraduationCap,
                color: 'bg-purple-100 border-purple-300 text-purple-700'
              },
              {
                name: 'B2B Services',
                slug: 'professional-services',
                icon: Briefcase,
                color: 'bg-amber-100 border-amber-300 text-amber-700'
              },
              {
                name: 'Startups',
                slug: 'startups-saas',
                icon: Rocket,
                color: 'bg-pink-100 border-pink-300 text-pink-700'
              },
            ].map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <Link key={idx} href={`/industries/${industry.slug}`}>
                  <Card className={`border-2 ${industry.color} hover:shadow-xl transition-all cursor-pointer h-full`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Icon className="h-8 w-8 text-slate-700" />
                      </div>
                      <h3 className="font-bold text-lg">{industry.name}</h3>
                      <p className="text-sm mt-2 text-slate-600">Learn more →</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Flagship Offer (30-Day Pilot) */}
      <section id="pilot-offer" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Transition Marketing AI Pilot (30 Days)
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get 30–50 qualified inquiries in 30 days — or we work for free until we do.
            </p>
          </div>

          <Card className="bg-white text-slate-900 border-2 border-blue-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  'AI-optimized Google, Facebook & LinkedIn campaigns',
                  'Industry-specific targeting & creatives',
                  'Lead verification (phone + email)',
                  'WhatsApp delivery + AI dashboard',
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
                  One all-inclusive pilot fee (includes ad spend). Exact investment shown after onboarding quiz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works (3-Step) */}
      <section id="how-it-works" className="py-20 px-4 bg-white reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How We Deliver Verified Inquiries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                step: 1,
                title: "Complete the onboarding quiz",
                description: "Tell us about your business.",
                icon: FileText,
                color: "bg-blue-600"
              },
              {
                step: 2,
                title: "We build & launch AI-optimized ad campaigns",
                description: "Google, Meta, LinkedIn.",
                icon: Zap,
                color: "bg-green-600"
              },
              {
                step: 3,
                title: "You receive verified inquiries",
                description: "On WhatsApp + dashboard every week.",
                icon: CheckCircle,
                color: "bg-purple-600"
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {item.step}
                      </div>
                      <Icon className={`h-8 w-8 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-slate-900">
              Guaranteed minimum 30–50 inquiries in 30 days.
            </p>
          </div>
        </div>
      </section>

      {/* Verification Process (NEW SECTION) */}
      <section className="py-20 px-4 bg-slate-50 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How We Verify Every Inquiry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1️⃣",
                title: "Ad Intent",
                description: "Every lead starts with real ad clicks from your target audience.",
                icon: Target,
                color: "bg-blue-100 border-blue-300"
              },
              {
                step: "2️⃣",
                title: "Human Verification",
                description: "Our team confirms every phone & email manually.",
                icon: Users,
                color: "bg-green-100 border-green-300"
              },
              {
                step: "3️⃣",
                title: "Quality Check",
                description: "Duplicates, spam, or fake data are instantly removed.",
                icon: Shield,
                color: "bg-purple-100 border-purple-300"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className={`border-2 ${item.color} shadow-lg`}>
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{item.step}</div>
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Icon className="h-8 w-8 text-slate-700" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-center">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed text-center">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 bg-slate-50 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                See Your Leads in Real Time
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Track every inquiry in one place with our AI dashboard.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">Live inquiry tracking from all campaigns</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">Lead details: name, contact, source & intent</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">Status tags: New, In Progress, Closed</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">WhatsApp integration for instant follow-up</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Dashboard image */}
            <div className="relative">
              <div className="bg-slate-50 rounded-xl p-4 shadow-2xl border border-slate-200">
                <img 
                  src="/images/dashboard-preview.png" 
                  alt="Transition Marketing AI lead dashboard preview"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Results & Investment */}
      <section className="py-20 px-4 bg-white reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Typical Results & Investment Range
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Your exact investment depends on your onboarding details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Real Estate Example */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-700">Real Estate</Badge>
                </div>
                <CardTitle className="text-lg">Real Estate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Typical Range:</p>
                    <p className="text-lg font-semibold text-slate-900">₹35,000–₹50,000</p>
                    <p className="text-xs text-slate-500">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per verified inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹700–₹1,100</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare Example */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                  <Badge className="bg-green-100 text-green-700">Healthcare</Badge>
                </div>
                <CardTitle className="text-lg">Healthcare</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Typical Range:</p>
                    <p className="text-lg font-semibold text-slate-900">₹35,000–₹50,000</p>
                    <p className="text-xs text-slate-500">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per verified inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹450–₹700</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education Example */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-700">Education</Badge>
                </div>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Typical Range:</p>
                    <p className="text-lg font-semibold text-slate-900">₹35,000–₹50,000</p>
                    <p className="text-xs text-slate-500">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per verified inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹350–₹600</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B2B Example */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                  <Badge className="bg-amber-100 text-amber-700">B2B</Badge>
                </div>
                <CardTitle className="text-lg">B2B Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Typical Range:</p>
                    <p className="text-lg font-semibold text-slate-900">₹35,000–₹50,000</p>
                    <p className="text-xs text-slate-500">(includes ad spend)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per verified inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹1,500–₹3,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-slate-600">
              Exact plan and quote are shared after your onboarding quiz.
            </p>
          </div>
        </div>
      </section>

      {/* Performance-Backed Guarantee */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50 reveal-on-scroll">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Performance-Backed Guarantee
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Performance-Backed Guarantee
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              If we don't deliver the minimum verified inquiries, we continue running your campaign at our cost until we do.
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

      {/* Results & Testimonials Section */}
      <section id="results" className="py-20 px-4 bg-white reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Real Results for Real Businesses
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every inquiry we send you is verified, tracked, and timestamped for proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real Estate */}
            <Card className="border-2 border-slate-200 shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    R
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Real Estate</Badge>
                </div>
                <CardTitle className="text-xl">60+ qualified inquiries in 30 days</CardTitle>
                <p className="text-sm text-slate-600 mt-2 font-semibold">Rajesh Kumar, Mumbai</p>
                <p className="text-xs text-slate-500 mt-1 italic">"Every inquiry was verified before I called them. No time wasted."</p>
              </CardHeader>
            </Card>

            {/* Healthcare */}
            <Card className="border-2 border-slate-200 shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    H
                  </div>
                  <Badge className="bg-green-100 text-green-700">Healthcare</Badge>
                </div>
                <CardTitle className="text-xl">72 patient inquiries generated</CardTitle>
                <p className="text-sm text-slate-600 mt-2 font-semibold">Dr. Priya Sharma, Bangalore</p>
                <p className="text-xs text-slate-500 mt-1 italic">"Real patients, not just phone numbers. Quality over quantity."</p>
              </CardHeader>
            </Card>

            {/* B2B SaaS */}
            <Card className="border-2 border-slate-200 shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    B
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">B2B SaaS</Badge>
                </div>
                <CardTitle className="text-xl">45 demo call inquiries</CardTitle>
                <p className="text-sm text-slate-600 mt-2 font-semibold">Amit Patel, Pune</p>
                <p className="text-xs text-slate-500 mt-1 italic">"Decision-makers who actually booked demos. Worth every rupee."</p>
              </CardHeader>
            </Card>

            {/* Education */}
            <Card className="border-2 border-slate-200 shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    E
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">Education</Badge>
                </div>
                <CardTitle className="text-xl">120 student inquiries in one month</CardTitle>
                <p className="text-sm text-slate-600 mt-2 font-semibold">Meera Singh, Delhi</p>
                <p className="text-xs text-slate-500 mt-1 italic">"Parents ready to enroll. No more chasing leads that don't convert."</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Onboarding Quiz Section */}
      <section id="onboarding-quiz" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30 reveal-on-scroll">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              See If You Qualify (Takes 30 Seconds)
            </h2>
          </div>

          <Card className="border-2 border-slate-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-slate-700 mb-6">
                Answer 8 simple questions about your business to see if you qualify for our 30-day pilot program.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
                <Link href="/onboarding">
                  Start Quiz Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Old quiz form removed - now redirects to /onboarding */}
          {false && (
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry" className="text-base font-semibold mb-2 block">
                      Select your industry
                    </Label>
                    <select
                      id="industry"
                      value={quizData.industry}
                      onChange={(e) => setQuizData({ ...quizData, industry: e.target.value })}
                      className="w-full h-12 text-base px-4 py-2 rounded-md border-2 border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select an industry</option>
                      <option value="real-estate">Real Estate & Builders</option>
                      <option value="healthcare">Healthcare & Wellness</option>
                      <option value="education">Education & Training</option>
                      <option value="b2b">B2B Services</option>
                      <option value="startups">Startups & SaaS</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="city" className="text-base font-semibold mb-2 block">
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={quizData.city}
                      onChange={(e) => setQuizData({ ...quizData, city: e.target.value })}
                      placeholder="Enter your city"
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  {/* Average Customer Value */}
                  <div>
                    <Label htmlFor="avgCustomerValue" className="text-base font-semibold mb-2 block">
                      Average customer value
                    </Label>
                    <select
                      id="avgCustomerValue"
                      value={quizData.avgCustomerValue}
                      onChange={(e) => setQuizData({ ...quizData, avgCustomerValue: e.target.value })}
                      className="w-full h-12 text-base px-4 py-2 rounded-md border-2 border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="under-10k">Under ₹10,000</option>
                      <option value="10k-50k">₹10,000 - ₹50,000</option>
                      <option value="50k-1l">₹50,000 - ₹1 Lakh</option>
                      <option value="1l-5l">₹1 Lakh - ₹5 Lakhs</option>
                      <option value="over-5l">Over ₹5 Lakhs</option>
                    </select>
                  </div>

                  {/* Current Monthly Inquiries */}
                  <div>
                    <Label htmlFor="currentInquiries" className="text-base font-semibold mb-2 block">
                      Current monthly inquiries
                    </Label>
                    <select
                      id="currentInquiries"
                      value={quizData.currentInquiries}
                      onChange={(e) => setQuizData({ ...quizData, currentInquiries: e.target.value })}
                      className="w-full h-12 text-base px-4 py-2 rounded-md border-2 border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="0-5">0-5 inquiries</option>
                      <option value="5-15">5-15 inquiries</option>
                      <option value="15-30">15-30 inquiries</option>
                      <option value="30-50">30-50 inquiries</option>
                      <option value="50+">50+ inquiries</option>
                    </select>
                  </div>

                  {/* Desired Monthly Inquiries */}
                  <div>
                    <Label htmlFor="desiredInquiries" className="text-base font-semibold mb-2 block">
                      Desired monthly inquiries
                    </Label>
                    <select
                      id="desiredInquiries"
                      value={quizData.desiredInquiries}
                      onChange={(e) => setQuizData({ ...quizData, desiredInquiries: e.target.value })}
                      className="w-full h-12 text-base px-4 py-2 rounded-md border-2 border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="30-50">30-50 inquiries</option>
                      <option value="50-100">50-100 inquiries</option>
                      <option value="100-200">100-200 inquiries</option>
                      <option value="200+">200+ inquiries</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <Label htmlFor="budgetRange" className="text-base font-semibold mb-2 block">
                      Your comfort budget range
                    </Label>
                    <select
                      id="budgetRange"
                      value={quizData.budgetRange}
                      onChange={(e) => setQuizData({ ...quizData, budgetRange: e.target.value })}
                      className="w-full h-12 text-base px-4 py-2 rounded-md border-2 border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="under-25k">Under ₹25,000</option>
                      <option value="25k-40k">₹25,000 - ₹40,000</option>
                      <option value="40k-60k">₹40,000 - ₹60,000</option>
                      <option value="60k-100k">₹60,000 - ₹1 Lakh</option>
                      <option value="over-100k">Over ₹1 Lakh</option>
                    </select>
                  </div>

                  {/* Sales Team */}
                  <div>
                    <Label htmlFor="hasSalesTeam" className="text-base font-semibold mb-2 block">
                      Do you have a sales team?
                    </Label>
                    <select
                      id="hasSalesTeam"
                      value={quizData.hasSalesTeam}
                      onChange={(e) => setQuizData({ ...quizData, hasSalesTeam: e.target.value })}
                      className="w-full h-12 text-base px-4 py-2 rounded-md border-2 border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">
                    See My Investment Estimate
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Get Verified, Warm Inquiries?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            See if you qualify for our 30-day pilot. Takes 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-6 font-semibold" asChild>
              <Link href="/onboarding">
                See If You Qualify (Takes 30 Seconds)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-10 py-6 font-semibold" asChild>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <StructuredDataFAQ
          faqs={[
            {
              question: 'How are inquiries generated?',
              answer: 'Through paid campaigns on Google, Meta, and LinkedIn targeted by intent. Our AI optimizes ad targeting and creatives to reach people actively searching for your services, then we verify every inquiry manually before delivery.',
            },
            {
              question: 'Are inquiries exclusive to me?',
              answer: 'Yes. Each inquiry is unique to your campaign and not resold. All inquiries come from your dedicated ad campaigns, and once delivered, they\'re exclusively yours.',
            },
            {
              question: 'What is a verified inquiry?',
              answer: 'We confirm every lead manually by phone/email before delivering. A verified inquiry means: active phone number (tested), valid email address, confirmed intent from ad engagement, and genuine interest in your service.',
            },
            {
              question: 'How soon will I see results?',
              answer: 'First verified inquiries usually appear within 5–7 days after campaign launch. After setup (48 hours), inquiries are delivered to your dashboard and WhatsApp every week from live, active campaigns.',
            },
            {
              question: 'What happens if you don\'t deliver?',
              answer: 'We continue working at our cost until your minimum inquiries are reached. No excuses, no algorithm blame, no extra fees. You only pay for performance.',
            },
          ]}
        />
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
                Through paid campaigns on Google, Meta, and LinkedIn targeted by intent. Our AI optimizes ad targeting and creatives to reach people actively searching for your services, then we verify every inquiry manually before delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Are inquiries exclusive to me?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes. Each inquiry is unique to your campaign and not resold. All inquiries come from your dedicated ad campaigns, and once delivered, they're exclusively yours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What is a verified inquiry?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We confirm every lead manually by phone/email before delivering. A verified inquiry means: active phone number (tested), valid email address, confirmed intent from ad engagement, and genuine interest in your service.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How soon will I see results?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                First verified inquiries usually appear within 5–7 days after campaign launch. After setup (48 hours), inquiries are delivered to your dashboard and WhatsApp every week from live, active campaigns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What happens if you don't deliver?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We continue working at our cost until your minimum inquiries are reached. No excuses, no algorithm blame, no extra fees. You only pay for performance.
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
              <Logo size="md" className="text-white mb-6" />
              <p className="text-slate-400 mb-6 leading-relaxed">
                India's most advanced AI-powered lead generation platform.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#pilot-offer" className="text-slate-400 hover:text-white transition-colors">
                    Pilot Offer
                  </Link>
                </li>
                <li>
                  <Link href="#results" className="text-slate-400 hover:text-white transition-colors">
                    Results
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-400">
                © 2025 Transition Marketing AI. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
