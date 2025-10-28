'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  return (
    <div className="min-h-screen bg-white">
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
                We find and verify leads for your business. Every lead includes active phone numbers, valid emails, and complete contact information—delivered weekly to your dashboard.
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
                  <span className="text-sm md:text-base font-medium">Weekly Delivery</span>
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
              { name: 'Google Maps', icon: MapPin },
              { name: 'LinkedIn', icon: Users },
              { name: 'Facebook', icon: Facebook },
              { name: 'Google Ads', icon: Chrome },
              { name: 'Directories', icon: TrendingUp },
            ].map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 text-center">{platform.name}</p>
                </div>
              );
            })}
          </div>

          {/* Learn More Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="#how-it-works">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How We Find & Verify - Simple Infographic */}
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

          {/* 3-Step Infographic */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">1</div>
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Find</h3>
                <p className="text-sm text-slate-600">AI searches multiple platforms for prospects matching your criteria</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">2</div>
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Verify</h3>
                <p className="text-sm text-slate-600">Test phone numbers, validate emails, check business details</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">3</div>
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Deliver</h3>
                <p className="text-sm text-slate-600">Quality-checked leads delivered weekly to your dashboard</p>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="text-center mt-10">
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
              { name: 'Verified Leads', icon: CheckCircle },
              { name: 'Lead Quality', icon: Target },
              { name: 'Source Tracking', icon: Search },
              { name: 'Contact Details', icon: Users },
              { name: 'Dashboard Access', icon: LayoutDashboard },
              { name: 'Weekly Delivery', icon: Send },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-900">{feature.name}</p>
                </div>
              );
            })}
          </div>

          {/* Learn More Button */}
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
              <Link href="/how-it-works">
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
              <h3 className="font-bold text-slate-900 mb-2">Weekly Delivery</h3>
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

      {/* Clean Pricing */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <IndianRupee className="h-4 w-4 mr-2" />
              Flexible Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Custom Pricing Tailored
              <br />
              <span className="text-slate-600">
                to Your Business Needs
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Every business is unique. We create a custom lead generation plan based on your industry, target audience, and budget. Get an exact quote during your free consultation.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Custom Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Flexible Terms</span>
              </div>
            </div>
          </div>

          {/* Estimated Pricing Ranges */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-slate-50 rounded-2xl p-10 border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Estimated Investment Ranges</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-lg border border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Small Business</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-1">₹15K-25K</p>
                  <p className="text-sm text-slate-600">~20-40 leads/month</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg border-2 border-blue-600">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Growing Business</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-1">₹30K-50K</p>
                  <p className="text-sm text-slate-600">~50-100 leads/month</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg border border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Enterprise</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-1">₹60K-1L+</p>
                  <p className="text-sm text-slate-600">~150-300+ leads/month</p>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600 mt-6">
                <strong className="text-slate-900">Note:</strong> Pricing varies based on industry, geographic targeting, lead quality requirements, and volume. We'll provide an exact quote during your free consultation.
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">What's Included in Every Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-900">Verified leads</span>
                  <span className="text-xs text-slate-500 block">Phone + email verified (90%+ active)</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-900">AI-powered multi-channel generation</span>
                  <span className="text-xs text-slate-500 block">Google Maps, LinkedIn, Facebook, industry directories</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-900">Dashboard access</span>
                  <span className="text-xs text-slate-500 block">View all leads, track delivery, monitor quality</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-900">Weekly delivery</span>
                  <span className="text-xs text-slate-500 block">Consistent lead flow throughout the month</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-900">Quality guarantee</span>
                  <span className="text-xs text-slate-500 block">Refund if we don't meet agreed lead volume</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-900">No long-term contracts</span>
                  <span className="text-xs text-slate-500 block">Cancel anytime with 7 days notice</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-6" asChild>
              <Link href="/consultation">
                Get Your Custom Quote - Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-slate-500 mt-4">No obligation • 15-minute call • Exact pricing based on your needs</p>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-16">
            <div className="bg-blue-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Not Sure Which Plan is Right?</h3>
              <p className="text-blue-100 mb-6">Book a free consultation and we'll recommend the perfect plan for your business needs and budget.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4" asChild>
                  <Link href="/consultation">
                    Request Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section - Infographic Style */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              Quality First
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How We Ensure Quality
            </h2>
          </div>

          {/* Infographic: Verification Process */}
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">1</div>
                <h3 className="font-bold text-slate-900 mb-2">Phone Verification</h3>
                <p className="text-sm text-slate-600">Test every number to ensure it's active</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">2</div>
                <h3 className="font-bold text-slate-900 mb-2">Email Validation</h3>
                <p className="text-sm text-slate-600">Verify domain exists and email format</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">3</div>
                <h3 className="font-bold text-slate-900 mb-2">Business Matching</h3>
                <p className="text-sm text-slate-600">Match leads to your ideal customer profile</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <MessageCircle className="h-4 w-4 mr-2" />
              Frequently Asked Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about our lead generation service
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  How do you generate leads?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We use advanced AI-powered scraping and targeting across multiple platforms including Google, Facebook, LinkedIn, and industry-specific directories. Our AI analyzes millions of data points to identify prospects that match your ideal customer profile. Every lead is then manually verified by our team before delivery.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 2 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Are the leads verified and exclusive to me?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Yes, absolutely!</strong> Every lead comes with verified phone number and email address. We test contact information before delivery. While leads discovered through public channels (like Google Maps) may be contacted by others, our AI-targeted leads from paid campaigns and LinkedIn are often exclusive. You can also opt for exclusive lead packages.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 3 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  What happens during the free consultation?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We'll discuss your business, target audience, current lead generation challenges, and goals. Then we'll create a custom plan with recommended budget, expected lead volume, cost per lead, and timelines. There's no obligation—think of it as a free strategy session for your business.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 4 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  How much does it cost?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Pricing is custom-tailored to your business needs. Most clients invest <strong className="text-slate-900">₹15,000-₹50,000 per month</strong> for 20-100 verified leads. Enterprise solutions start at ₹60,000/month for 150+ leads. The exact cost depends on your industry, target audience, geographic focus, lead volume, and quality requirements. We provide a detailed quote during your free consultation based on your specific needs.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 5 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  How long before I see results?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  You'll receive your first batch of verified leads within <strong className="text-slate-900">7 business days</strong> of signing up. Most clients start seeing qualified conversations within the first week and closed deals within 2-4 weeks, depending on their sales cycle.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 6 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  What industries do you work with?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We specialize in <strong className="text-slate-900">Real Estate, Healthcare, B2B Services, Manufacturing, E-commerce, Education, and Financial Services</strong>. Our AI models are trained on India-specific data for each industry. If your industry isn't listed, book a consultation—we can create custom targeting for almost any B2B or high-ticket B2C business.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 7 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Can I cancel anytime?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Yes!</strong> All our plans are month-to-month with no long-term contracts. You can cancel anytime with 7 days' notice.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 8 */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Do you provide outreach services too?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes! While our base service delivers leads to your dashboard, we also offer add-on outreach services including email campaigns, WhatsApp messaging, LinkedIn outreach, and even appointment setting. Discuss your needs during the free consultation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA at bottom of FAQ */}
          <div className="mt-16 text-center">
            <div className="bg-slate-50 rounded-2xl p-10 border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-slate-600 text-lg mb-6">
                Our team is here to help. Book a free consultation or email us at <a href="mailto:support@transitionmarketingai.com" className="text-blue-600 hover:text-blue-700 font-medium">support@transitionmarketingai.com</a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/consultation">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get More Qualified Leads?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Book a free consultation and discover how AI can transform your lead generation. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6" asChild>
              <Link href="/consultation">
                Request Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
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


