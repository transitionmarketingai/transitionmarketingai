'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function LandingPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918888888888';
  const whatsappMessage = encodeURIComponent('Hi, I\'m interested in your lead generation service. Can you tell me more?');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
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
              <Link href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</Link>
              <Link href="#results" className="text-gray-700 hover:text-gray-900 font-medium">Results</Link>
              <Link href="#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/consultation">Request Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Hormozi Style: Direct Problem Statement */}
      <section className="relative pt-24 md:pt-32 pb-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
              <X className="h-4 w-4 mr-2" />
              The Problem Most Businesses Face
            </div>
            
            {/* Main Headline - Hormozi Style: Direct, Problem-Focused */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Stop Wasting Money on
              <br />
              <span className="text-red-600">Ads That Don't Convert</span>
            </h1>
            
            {/* Subheadline - Value Proposition */}
            <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed font-medium">
              Get <span className="text-blue-600 font-bold">50+ verified, qualified leads</span> delivered to your inbox every month.
              <br />
              <span className="text-lg text-slate-600">No setup. No guesswork. Just results.</span>
            </p>

            {/* Social Proof Numbers - Hormozi Style */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-slate-900">10,000+</span>
                <span className="text-slate-600">Leads Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-slate-900">89%</span>
                <span className="text-slate-600">Quality Score</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-slate-900">50+</span>
                <span className="text-slate-600">Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-slate-900">7 Days</span>
                <span className="text-slate-600">First Delivery</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 text-base font-semibold" asChild>
                <Link href="/consultation">
                  Get Your Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-300 text-lg px-10 py-6" asChild>
                <Link href="#how-it-works">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>100% Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Free 30-Min Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>No Commitment Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section - Hormozi Style */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The Lead Generation Problem
              <br />
              <span className="text-slate-600">Most Businesses Face</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Problems */}
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-8 flex items-center gap-2">
                <X className="h-6 w-6" />
                What You're Doing Now (That's Not Working)
              </h3>
              <div className="space-y-6">
                {[
                  {
                    problem: "Wasting ₹50,000+/month on ads",
                    detail: "That bring 5-10 unqualified leads with no ROI"
                  },
                  {
                    problem: "Spending 20+ hours/week cold calling",
                    detail: "People who don't want your service"
                  },
                  {
                    problem: "Hiring expensive sales teams",
                    detail: "Costing ₹3-5 lakhs/month with no results"
                  },
                  {
                    problem: "Buying lead lists with outdated contacts",
                    detail: "That never respond or answer calls"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900 mb-1">{item.problem}</p>
                      <p className="text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Solutions */}
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-8 flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                What We Do Instead (That Actually Works)
              </h3>
              <div className="space-y-6">
                {[
                  {
                    solution: "Find, verify, and deliver 50+ qualified leads",
                    detail: "Every month, matched to your ideal customer profile"
                  },
                  {
                    solution: "Every lead includes active phone & valid email",
                    detail: "Tested and verified before delivery"
                  },
                  {
                    solution: "Pay only for leads that match your criteria",
                    detail: "Or we replace them FREE - no questions asked"
                  },
                  {
                    solution: "First leads delivered in 7 days",
                    detail: "Then monthly deliveries based on your plan"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900 mb-1">{item.solution}</p>
                      <p className="text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA in Middle */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
              <Link href="/consultation">
                Get Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              No obligation • Free strategy session • Custom plan in 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Simple 3-Step Process */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple 3-step process to get you quality leads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: 1,
                title: "Free 30-Min Consultation",
                description: "We understand your business, target customers, and goals. No sales pitch—just a genuine conversation.",
                icon: MessageCircle,
                color: "bg-blue-600"
              },
              {
                step: 2,
                title: "We Handle Everything",
                description: "AI finds prospects across multiple platforms. Our team verifies every contact (phone, email, business details).",
                icon: Target,
                color: "bg-green-600"
              },
              {
                step: 3,
                title: "Leads Delivered to Your Dashboard",
                description: "First batch within 7 days. Monthly deliveries based on your plan. Track everything in your personal dashboard.",
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
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-10 py-6" asChild>
              <Link href="/consultation">
                Start Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industry-Specific Results - Hormozi Style */}
      <section id="results" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Real Results for Real Businesses
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Here's exactly what our clients get
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Real Estate */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  Real Estate Developers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Challenge:</p>
                    <p className="font-semibold text-slate-900">Finding serious property buyers in Mumbai/Pune/Bangalore</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-green-900 mb-2">Results:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-green-600">50+</p>
                        <p className="text-xs text-slate-600">Leads/Month</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">12%</p>
                        <p className="text-xs text-slate-600">Conversion</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Example Lead:</p>
                    <p className="text-sm text-slate-700">Priya Sharma, Mumbai</p>
                    <p className="text-xs text-slate-600">₹80L-₹1.2Cr budget • High intent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  Healthcare Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Challenge:</p>
                    <p className="font-semibold text-slate-900">Attracting patients for specialized treatments</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-green-900 mb-2">Results:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-green-600">75+</p>
                        <p className="text-xs text-slate-600">Leads/Month</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">25%</p>
                        <p className="text-xs text-slate-600">Conversion</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Example Lead:</p>
                    <p className="text-sm text-slate-700">Rajesh Kumar, Bangalore</p>
                    <p className="text-xs text-slate-600">Orthopedic consultation • Urgent need</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B2B Services */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  B2B Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Challenge:</p>
                    <p className="font-semibold text-slate-900">Finding decision-makers in target companies</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-green-900 mb-2">Results:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-green-600">40+</p>
                        <p className="text-xs text-slate-600">Leads/Month</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">15%</p>
                        <p className="text-xs text-slate-600">Conversion</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Example Lead:</p>
                    <p className="text-sm text-slate-700">Amit Patel (CTO), TechCorp Solutions</p>
                    <p className="text-xs text-slate-600">Cloud migration services • High intent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* E-commerce */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-amber-600" />
                  </div>
                  E-commerce Brands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Challenge:</p>
                    <p className="font-semibold text-slate-900">Finding bulk buyers and distributors</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-green-900 mb-2">Results:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-green-600">60+</p>
                        <p className="text-xs text-slate-600">Leads/Month</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">10%</p>
                        <p className="text-xs text-slate-600">Conversion</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Example Lead:</p>
                    <p className="text-sm text-slate-700">Suresh Enterprises</p>
                    <p className="text-xs text-slate-600">Electronics wholesale • Verified business</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section - Hormozi Style: Value-Focused */}
      <section id="pricing" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Pay only for verified leads that match your criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Starter Plan */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-slate-900">₹10,000</div>
                  <div className="text-sm text-slate-600">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">25 verified leads/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">₹400 per lead</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Industry-specific targeting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Personal dashboard</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/consultation">Get Started</Link>
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3">
                  Perfect for small businesses testing lead generation
                </p>
              </CardContent>
            </Card>

            {/* Growth Plan - Most Popular */}
            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Growth</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-slate-900">₹25,000</div>
                  <div className="text-sm text-slate-600">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">50 verified leads/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">₹500 per lead</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Monthly strategy calls</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/consultation">Get Started</Link>
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3">
                  Perfect for growing businesses scaling up
                </p>
              </CardContent>
            </Card>

            {/* Scale Plan */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl">Scale</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-slate-900">₹50,000</div>
                  <div className="text-sm text-slate-600">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">150 verified leads/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">₹333 per lead (best value)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Custom lead mix</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/consultation">Get Started</Link>
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3">
                  Perfect for established teams needing volume
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Money-Back Guarantee - Hormozi Style Risk Reversal */}
          <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">100% Money-Back Guarantee</h3>
            <p className="text-slate-700 mb-4">
              If you're not satisfied with lead quality in your first month, we'll:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-slate-900">Replace all bad leads</p>
                <p className="text-xs text-slate-600">For FREE</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-slate-900">Refund 100%</p>
                <p className="text-xs text-slate-600">Of your money</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-slate-900">No questions asked</p>
                <p className="text-xs text-slate-600">Simple process</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-900 mt-6">
              We take the risk. You get the results.
            </p>
          </div>
        </div>
      </section>

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
                How do you generate leads?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We use advanced AI-powered scraping and targeting across multiple platforms including Google Maps, LinkedIn, Facebook, Google Ads, and industry-specific directories. Our AI analyzes millions of data points to identify prospects that match your ideal customer profile. Every lead is then manually verified by our team before delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Are the leads verified and exclusive to me?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <strong className="text-slate-900">Yes, absolutely!</strong> Every lead comes with verified phone number and email address. We test contact information before delivery. While leads discovered through public channels (like Google Maps) may be contacted by others, our AI-targeted leads from paid campaigns and LinkedIn are often exclusive. You can also opt for exclusive lead packages.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What happens during the free consultation?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We'll discuss your business, target audience, current lead generation challenges, and goals. Then we'll create a custom plan with recommended budget, expected lead volume, cost per lead, and timelines. There's no obligation—think of it as a free strategy session for your business.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How much does it cost?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We offer transparent pricing starting at ₹10,000/month for 25 leads. Our Growth plan (₹25,000/month) delivers 50 leads, and our Scale plan (₹50,000/month) delivers 150 leads. All plans include verified leads, industry-specific targeting, and personal dashboard access. Custom plans available for higher volumes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How long before I see results?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                You'll receive your first batch of verified leads within <strong className="text-slate-900">7 business days</strong> of signing up. Most clients start seeing qualified conversations within the first week and closed deals within 2-4 weeks, depending on their sales cycle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What if I'm not satisfied?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We offer a <strong className="text-slate-900">100% money-back guarantee</strong>. If you're not satisfied with lead quality in your first month, we'll replace all bad leads for FREE or refund 100% of your money—no questions asked. We take the risk, you get the results.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section - Hormozi Style */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Stop Wasting Money on Ads?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get your free 30-minute consultation and discover how we can get you 50+ verified leads every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-6 font-semibold" asChild>
              <Link href="/consultation">
                Get Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free strategy session</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Custom plan in 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <Logo size="md" className="text-white mb-6" />
              <p className="text-slate-400 mb-6 leading-relaxed">
                India's most advanced AI-powered lead generation platform.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Made in India</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
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
                  <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#results" className="text-slate-400 hover:text-white transition-colors">
                    Results
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
                <li className="text-slate-400 flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  support@transitionmarketingai.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-400">
                © 2025 Transition Marketing AI. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

