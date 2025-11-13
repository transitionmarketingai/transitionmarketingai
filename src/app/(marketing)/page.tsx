'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

export default function LandingPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [showValidationError, setShowValidationError] = useState<boolean>(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918888888888';
  const whatsappMessage = encodeURIComponent('Hi, I\'m interested in your lead generation service. Can you tell me more?');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleShowSolution = () => {
    if (!selectedIndustry) {
      setShowValidationError(true);
      return;
    }
    setShowValidationError(false);
    const encodedIndustry = encodeURIComponent(selectedIndustry);
    const urlWithIndustry = `${calendlyUrl}?industry=${encodedIndustry}`;
    window.open(urlWithIndustry, '_blank', 'noopener,noreferrer');
  };

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
              <Link href="/insights" className="text-gray-700 hover:text-gray-900 font-medium">Insights</Link>
              <Link href="#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 leading-tight">
              Get Real Inquiries Every Week — Powered by AI + Paid Ads.
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed font-medium">
              We build AI-driven marketing systems that deliver verified inquiries straight to your WhatsApp & dashboard.
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
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Supporting Bullets */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>AI-powered paid ad campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Real inquiries from live campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Delivered to Dashboard & WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Guaranteed 5 real inquiries from live ad campaigns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Selection Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Select Your Industry
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Get a custom AI marketing solution designed for your business
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Select 
              value={selectedIndustry} 
              onValueChange={(value) => {
                setSelectedIndustry(value);
                setShowValidationError(false);
              }}
            >
              <SelectTrigger className="w-full h-14 text-lg">
                <SelectValue placeholder="Choose your industry..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional-services">Professional Services</SelectItem>
                <SelectItem value="healthcare-wellness">Healthcare & Wellness</SelectItem>
                <SelectItem value="real-estate-builders">Real Estate & Builders</SelectItem>
                <SelectItem value="dealerships-service-centers">Dealerships & Service Centers</SelectItem>
                <SelectItem value="retail-local-businesses">Retail & Local Businesses</SelectItem>
                <SelectItem value="startups-saas">Startups & SaaS</SelectItem>
                <SelectItem value="education-training">Education & Training Providers</SelectItem>
                <SelectItem value="home-renovation">Home & Renovation Services</SelectItem>
                <SelectItem value="event-media-hospitality">Event, Media & Hospitality</SelectItem>
                <SelectItem value="travel-tour">Travel & Tour Services</SelectItem>
                <SelectItem value="finance-insurance">Finance & Insurance Services</SelectItem>
                <SelectItem value="freelancers-creators">Freelancers & Creators</SelectItem>
                <SelectItem value="logistics-b2b">Logistics & B2B Service Providers</SelectItem>
              </SelectContent>
            </Select>
            
            {showValidationError && (
              <p className="text-red-600 text-sm mt-2 text-center">
                Please select your industry to see a custom solution.
              </p>
            )}
            
            <Button 
              size="lg" 
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
              onClick={handleShowSolution}
            >
              Show My AI Solution
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Marketing Report Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Free AI Marketing Report
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            After your consultation, we'll send a free personalized report outlining your lead potential, ad strategy, and estimated cost per inquiry.
          </p>
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
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              Get your custom AI marketing report • No commitment
            </p>
          </div>
        </div>
      </section>

      {/* Where We Find Your Leads */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Where We Find Your Leads
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
              We search across Google Maps, LinkedIn, Facebook, Google Ads, and top business directories to find your ideal prospects – then verify every contact before it reaches you.
            </p>
            <p className="text-lg text-slate-700 font-semibold">
              You get the benefit of a full-time research team without hiring one.
            </p>
          </div>
        </div>
      </section>

      {/* How Our System Works */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How Our System Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple 3-step process to get you real inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: 1,
                title: "Choose your industry",
                description: "Select your industry and tell us about your business goals and target customers.",
                icon: Target,
                color: "bg-blue-600"
              },
              {
                step: 2,
                title: "AI builds & runs paid campaigns",
                description: "Our AI system creates and manages paid ad campaigns across Google, Facebook, and LinkedIn to find your ideal customers.",
                icon: Zap,
                color: "bg-green-600"
              },
              {
                step: 3,
                title: "You receive verified inquiries",
                description: "Real inquiries from live campaigns are delivered to your dashboard and WhatsApp every week.",
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
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard-preview" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                See Your Leads in Real Time
              </h2>
              <p className="text-xl text-slate-600 mb-8">
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
                  <span className="text-slate-700 text-lg">Export to CSV or sync with your CRM</span>
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
                />
              </div>
            </div>
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

      {/* Pricing Section - Campaign Management Tiers */}
      <section id="pricing" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Campaign Management Plans
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Basic Plan */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl">Basic</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-slate-900">₹10,000</div>
                  <div className="text-sm text-slate-600">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Ad setup & management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">AI tracking dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">WhatsApp automation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Weekly inquiry delivery</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3">
                  Ideal for local services, solo professionals, clinics, and consultants.
                </p>
              </CardContent>
            </Card>

            {/* Professional Plan - Most Popular */}
            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Professional</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-slate-900">₹25,000</div>
                  <div className="text-sm text-slate-600">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Advanced ad setup & optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">AI tracking dashboard + analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">WhatsApp automation + CRM integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Priority support & strategy calls</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3">
                  For businesses ready to scale with a steady flow of weekly inquiries.
                </p>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-slate-900">₹50,000</div>
                  <div className="text-sm text-slate-600">per month</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Multi-channel campaign management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Custom AI dashboard & reporting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Custom automation & integrations</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3">
                  For teams that need high-volume, consistent inquiry flow every month.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Guarantee Section */}
          <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Guarantee</h3>
            <p className="text-lg font-semibold text-slate-900 mb-4">
              Guaranteed 5 Real Inquiries from Live Ad Campaigns.
            </p>
            <p className="text-slate-700 mb-4">
              We build real marketing systems that deliver actual inquiries from active paid campaigns, not just data lists.
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

          {/* All Plans Include */}
          <p className="text-center text-slate-700 mt-8 font-medium">
            All plans include: Ad setup + AI tracking dashboard + WhatsApp automation + Weekly inquiry delivery.
          </p>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Book a 15-Minute Strategy Call
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We'll audit your current system and design a campaign plan.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 md:p-8">
            <CalendlyEmbed className="rounded-lg" height={700} />
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
                How are leads generated?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We use a combination of AI-powered tools and human researchers to search across multiple channels including Google Maps, LinkedIn, Facebook, Google Ads, and top business directories. Our AI identifies prospects that match your ideal customer profile, then our team verifies every contact before delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Are the leads exclusive to me?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <strong className="text-slate-900">Yes.</strong> We don't resell leads. Once delivered to you, those leads are yours. While some leads may come from public sources (like Google Maps) where others could theoretically find them, our AI-targeted leads from paid campaigns and LinkedIn are typically exclusive to you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What does "verified" mean?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Every lead we deliver includes verified phone numbers and email addresses. We test phone numbers to confirm they're active and reachable, and verify email addresses are valid and deliverable. We also verify business details like company name, location, and industry match your criteria.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                When will I see my first inquiries?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                After we set up your AI-driven paid ad campaigns, you'll start receiving real inquiries within <strong className="text-slate-900">7-14 days</strong>. Inquiries are delivered to your dashboard and WhatsApp every week from live, active campaigns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Is there a contract or lock-in?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <strong className="text-slate-900">No.</strong> There are no long-term contracts. You can cancel anytime. Book a free consultation to get your custom AI marketing report, and if you're happy with the plan, we'll set up your campaigns.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg border-2 border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What happens if you don't deliver inquiries?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We guarantee <strong className="text-slate-900">5 real inquiries from live ad campaigns</strong>. If we don't deliver real inquiries from active paid campaigns, you can cancel immediately with no questions asked. We take the risk, you get the results.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Get Real Inquiries Every Week?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book a free consultation and get your custom AI marketing report.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-6 font-semibold" asChild>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Custom AI marketing report</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>No commitment</span>
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












