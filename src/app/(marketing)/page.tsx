'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search,
  Send,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Users,
  Mail,
  Facebook,
  Chrome,
  IndianRupee,
  TrendingUp,
  Bot,
  Sparkles,
  RefreshCw,
  Clock,
  Shield,
  Phone,
  LayoutDashboard,
  MapPin,
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
              <Link href="#features" className="text-gray-700 hover:text-gray-900 font-medium">Features</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</Link>
              <Link href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</Link>
              <Link href="#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button variant="ghost" className="text-sm text-slate-600" asChild>
                <Link href="/admin/login">Admin</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/consultation">Request Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean Minimal Design */}
      <section className="relative pt-16 md:pt-20 pb-16 md:pb-24 px-4 bg-slate-50">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
                <Bot className="h-4 w-4 mr-2" />
                AI-Powered Multi-Channel Lead Generation
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Get Verified Leads
                <br />
                <span className="text-blue-600">
                  Delivered to Your Dashboard
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
                We find and verify leads for your business. Every lead includes active phone numbers, valid emails, and complete contact information—delivered instantly to your dashboard when someone shows interest.
              </p>

              {/* Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10 max-w-2xl">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">90%+ Verified Contacts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">ICP-Aligned Matching</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">Quality Assurance</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">Instant Delivery</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4" asChild>
                  <Link href="/consultation">
                    Request Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>100% Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Custom Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>No Commitment</span>
                </div>
              </div>
            </div>

            {/* Right Column - Simplified Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Dashboard</h3>
                      <p className="text-xs text-slate-500">Live</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Active
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-600 mb-1">Verified</p>
                    <p className="text-2xl font-bold text-slate-900">94%</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-600 mb-1">Quality</p>
                    <p className="text-2xl font-bold text-slate-900">87%</p>
                  </div>
                </div>

                {/* Recent Leads */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-900 mb-3">Recent Leads</h4>
                  {[
                    { name: "Rajesh Mehta", company: "Mumbai Realty", verified: true },
                    { name: "Priya Sharma", company: "Tech Solutions", verified: true },
                    { name: "Anita Desai", company: "MediCare Plus", verified: true }
                  ].map((lead, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-slate-900">{lead.name}</p>
                          {lead.verified && <CheckCircle className="h-3 w-3 text-blue-600" />}
                        </div>
                        <p className="text-xs text-slate-500">{lead.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Sources - Simple Icons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Where We Find Your Leads
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We use multiple channels to find and verify leads for your business
            </p>
          </div>

          {/* Platform Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
            {[
              { name: 'Google Maps', icon: MapPin, color: 'bg-emerald-100', iconColor: 'text-emerald-600' },
              { name: 'LinkedIn', icon: Users, color: 'bg-blue-100', iconColor: 'text-blue-600' },
              { name: 'Facebook', icon: Facebook, color: 'bg-indigo-100', iconColor: 'text-indigo-600' },
              { name: 'Google Ads', icon: Chrome, color: 'bg-amber-100', iconColor: 'text-amber-600' },
              { name: 'Directories', icon: TrendingUp, color: 'bg-purple-100', iconColor: 'text-purple-600' },
            ].map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className={`w-14 h-14 rounded-lg ${platform.color} flex items-center justify-center mb-3`}>
                    <Icon className={`h-7 w-7 ${platform.iconColor}`} />
                  </div>
                  <p className="text-sm font-medium text-slate-900 text-center">{platform.name}</p>
                </div>
              );
            })}
          </div>

          {/* Learn More Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/how-it-works#sources">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How We Find & Verify - Matching Style */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Find & Verify Leads
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Simple 3-step process to get you quality leads
            </p>
          </div>

          {/* 3-Step Grid - Matching "Where We Find" Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { number: 1, title: 'Find', description: 'AI searches multiple platforms for prospects matching your criteria', bgColor: 'bg-emerald-100', numberColor: 'bg-emerald-600' },
              { number: 2, title: 'Verify', description: 'Test phone numbers, validate emails, check business details', bgColor: 'bg-blue-100', numberColor: 'bg-blue-600' },
              { number: 3, title: 'Deliver', description: 'Verified leads delivered instantly to your dashboard—no waiting', bgColor: 'bg-indigo-100', numberColor: 'bg-indigo-600' },
            ].map((step) => (
              <div key={step.number} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                <div className={`w-14 h-14 rounded-lg ${step.bgColor} flex items-center justify-center mb-3`}>
                  <div className={`w-10 h-10 rounded-lg ${step.numberColor} text-white flex items-center justify-center text-xl font-bold`}>
                    {step.number}
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-900 text-center mb-2">{step.title}</p>
                <p className="text-xs text-slate-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Learn More Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/how-it-works">
                See Detailed Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Features - Simple Infographic */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Dashboard Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your leads in one place
            </p>
          </div>

          {/* Feature Icons Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: 'Verified Leads', icon: CheckCircle, color: 'bg-emerald-100', iconColor: 'text-emerald-600' },
              { name: 'Lead Quality', icon: Target, color: 'bg-blue-100', iconColor: 'text-blue-600' },
              { name: 'Source Tracking', icon: Search, color: 'bg-indigo-100', iconColor: 'text-indigo-600' },
              { name: 'Contact Details', icon: Users, color: 'bg-purple-100', iconColor: 'text-purple-600' },
              { name: 'Dashboard Access', icon: LayoutDashboard, color: 'bg-amber-100', iconColor: 'text-amber-600' },
              { name: 'Instant Delivery', icon: Send, color: 'bg-cyan-100', iconColor: 'text-cyan-600' },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                    <Icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <p className="text-sm font-medium text-slate-900">{feature.name}</p>
                </div>
              );
            })}
          </div>

          {/* Learn More Button */}
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/how-it-works#sources">
                View All Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We deliver verified leads with complete transparency—not just lists.
            </p>
          </div>

          {/* Infographic: Why Choose Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Verified Contacts</h3>
              <p className="text-sm text-slate-600">Active phones & valid emails</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">ICP Matching</h3>
              <p className="text-sm text-slate-600">Leads that fit your needs</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Full Transparency</h3>
              <p className="text-sm text-slate-600">See source & quality scores</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Instant Delivery</h3>
              <p className="text-sm text-slate-600">First leads in 7 days</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-blue-600 rounded-xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-2">90%+</div>
                <p className="font-medium opacity-90">Verified Contact Rate</p>
                <p className="text-sm opacity-75 mt-1">Active phones & valid emails</p>
              </div>
              <div className="text-center md:text-left border-l border-blue-400 pl-8">
                <div className="text-4xl font-bold mb-2">85%+</div>
                <p className="font-medium opacity-90">Quality Score</p>
                <p className="text-sm opacity-75 mt-1">ICP-matched prospects</p>
              </div>
              <div className="text-center md:text-left border-l border-blue-400 pl-8">
                <div className="text-4xl font-bold mb-2">7 Days</div>
                <p className="font-medium opacity-90">First Leads</p>
                <p className="text-sm opacity-75 mt-1">Delivered to dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Quality Standards Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Our Quality Standards
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What Makes Our Leads
              <br />
              <span className="text-blue-600">Sales-Ready</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We apply rigorous quality checks before any lead reaches your dashboard. Here's exactly what you can expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-green-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-xl">Phone Verification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Number format validation (10-digit mobile, STD codes verified)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Active status check using industry APIs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Manual spot-calling (3-5 random checks per batch)</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 mt-4">
                    <p className="text-sm font-semibold text-green-900">Standard: 90%+ active numbers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-xl">Email Verification</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Format validation (proper email structure)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Domain existence & mailbox verification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Deliverability testing (can it accept mail?)</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 mt-4">
                    <p className="text-sm font-semibold text-green-900">Standard: 95%+ valid emails</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-xl">ICP Matching</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Industry alignment (matches your target sector)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Geographic targeting (location matches criteria)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Business size/type matching (B2B, B2C, SMB, Enterprise)</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 mt-4">
                    <p className="text-sm font-semibold text-blue-900">Quality Score: 0-100 (80%+ average)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-xl">Data Completeness</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Name, company, phone, email (all present)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Business address & location details</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Lead source & quality score included</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 mt-4">
                    <p className="text-sm font-semibold text-purple-900">Complete contact profile provided</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing - Custom Model */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Custom Pricing for Your Business
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every business is different. We create a custom plan based on your budget, needs, and goals—not fixed packages.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {/* Step 1 */}
            <Card className="border border-slate-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle className="text-xl">Free Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Discuss your business needs, budget, and goals in a 30-minute strategy call
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border border-slate-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <CardTitle className="text-xl">Custom Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We'll present 2-3 pricing options tailored to your budget and lead volume needs
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border border-slate-200 text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <CardTitle className="text-xl">Start Getting Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Once approved, verified leads start delivering instantly—get notified immediately when someone shows interest
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Ranges (Reference Only) */}
          <div className="bg-slate-50 rounded-lg p-8 max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Typical Investment Ranges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">₹10K-25K</div>
                <p className="text-sm text-slate-600">Per Month</p>
                <p className="text-xs text-slate-500 mt-2">For small teams testing lead generation</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">₹25K-50K</div>
                <p className="text-sm text-slate-600">Per Month</p>
                <p className="text-xs text-slate-500 mt-2">For growing businesses scaling up</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">₹50K+</div>
                <p className="text-sm text-slate-600">Per Month</p>
                <p className="text-xs text-slate-500 mt-2">For established teams needing volume</p>
              </div>
            </div>
            <p className="text-xs text-center text-slate-500 mt-6">
              *Exact pricing depends on lead volume, quality requirements, industry, and geographic targeting. Discussed during consultation.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Why Custom Pricing Works Better
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Budget-Fit Plans</p>
                  <p className="text-sm text-slate-600">Pay what you're comfortable with, not fixed tiers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Only Verified Leads</p>
                  <p className="text-sm text-slate-600">Every lead is verified before delivery—no quality complaints</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Custom Lead Mix</p>
                  <p className="text-sm text-slate-600">Balance of ads (high intent) + scraping (cost-effective)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Flexible Scaling</p>
                  <p className="text-sm text-slate-600">Start small, scale up based on results</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/consultation">Get Your Custom Pricing</Link>
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              Free 30-minute consultation • No obligation • Custom proposal within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Lead Sales Ready - Matching Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Lead Sales Ready
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every lead is verified and quality-checked before delivery
            </p>
          </div>

          {/* Quality Steps Grid - Matching Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { number: 1, title: 'Phone Verified', description: 'Test every number to ensure it\'s active', bgColor: 'bg-emerald-100', numberColor: 'bg-emerald-600' },
              { number: 2, title: 'Email Validated', description: 'Verify domain exists and email format', bgColor: 'bg-blue-100', numberColor: 'bg-blue-600' },
              { number: 3, title: 'ICP Matched', description: 'Match leads to your ideal customer profile', bgColor: 'bg-indigo-100', numberColor: 'bg-indigo-600' },
            ].map((step) => (
              <div key={step.number} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                <div className={`w-14 h-14 rounded-lg ${step.bgColor} flex items-center justify-center mb-3`}>
                  <div className={`w-10 h-10 rounded-lg ${step.numberColor} text-white flex items-center justify-center text-xl font-bold`}>
                    {step.number}
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-900 text-center mb-2">{step.title}</p>
                <p className="text-xs text-slate-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Learn More Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/how-it-works#verification">
                Learn More About Verification
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Collapsible */}
      <section id="faq" className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              FAQ
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How do you generate leads?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We use advanced AI-powered scraping and targeting across multiple platforms including Google, Facebook, LinkedIn, and industry-specific directories. Our AI analyzes millions of data points to identify prospects that match your ideal customer profile. Every lead is then manually verified by our team before delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Are the leads verified and exclusive to me?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <strong className="text-slate-900">Yes, absolutely!</strong> Every lead comes with verified phone number and email address. We test contact information before delivery. While leads discovered through public channels (like Google Maps) may be contacted by others, our AI-targeted leads from paid campaigns and LinkedIn are often exclusive. You can also opt for exclusive lead packages.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What happens during the free consultation?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We'll discuss your business, target audience, current lead generation challenges, and goals. Then we'll create a custom plan with recommended budget, expected lead volume, cost per lead, and timelines. There's no obligation—think of it as a free strategy session for your business.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How much does it cost?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We offer custom pricing based on your budget and needs—no fixed packages. During your free consultation, we'll discuss your budget, lead volume requirements, and quality needs. We'll then present 2-3 custom options tailored to you. Typical investments range from ₹10,000-₹50,000+ per month depending on lead volume, industry, geographic targeting, and quality requirements. Every lead is verified before delivery—only confirmed, verified leads make it to your dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                How long before I see results?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                You'll receive your first batch of verified leads within <strong className="text-slate-900">7 business days</strong> of signing up. Most clients start seeing qualified conversations within the first week and closed deals within 2-4 weeks, depending on their sales cycle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                What industries do you work with?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We specialize in <strong className="text-slate-900">Real Estate, Healthcare, B2B Services, Manufacturing, E-commerce, Education, and Financial Services</strong>. Our AI models are trained on India-specific data for each industry. If your industry isn't listed, book a consultation—we can create custom targeting for almost any B2B or high-ticket B2C business.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Can I cancel anytime?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <strong className="text-slate-900">Yes!</strong> All our plans are month-to-month with no long-term contracts. You can cancel anytime with 7 days' notice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg border border-slate-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-slate-900">
                Do you provide outreach services too?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes! While our base service delivers leads to your dashboard, we also offer add-on outreach services including email campaigns, WhatsApp messaging, LinkedIn outreach, and even appointment setting. Discuss your needs during the free consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Request a free consultation to see how we can help your business grow
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6" asChild>
            <Link href="/consultation">
              Request Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto py-16 px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Logo size="md" className="text-white mb-6" />
              <p className="text-slate-400 mb-6 leading-relaxed">
                India's most advanced AI-powered lead generation platform. 
                <strong className="text-white"> Stop chasing leads, let AI bring them to you.</strong>
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

            {/* Product Links */}
            <div>
                <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="#features" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-it-works" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      How It Works
                    </Link>
                  </li>
                </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
              <ul className="space-y-4">
                <li>
                    <Link href="/about" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Blog
                    </Link>
                  </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Terms of Service
                  </Link>
                </li>
                <li className="text-gray-400 flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  support@transitionmarketingai.com
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="border-t border-slate-700 pt-12 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">Trusted by Businesses Across India</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-sm font-medium text-slate-300">🏢 Real Estate</span>
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-sm font-medium text-slate-300">🏥 Healthcare</span>
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-sm font-medium text-slate-300">💼 Consulting</span>
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-sm font-medium text-slate-300">🏭 Manufacturing</span>
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-sm font-medium text-slate-300">🛍️ E-commerce</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-400">
                © 2025 Transition Marketing AI. All rights reserved. 
                <span className="text-white font-medium"> Made with ❤️ in India</span>
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
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


