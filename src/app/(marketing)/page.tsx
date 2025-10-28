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
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import IndustryExamples from '@/components/IndustryExamples';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <Badge variant="outline" className="border-green-600 text-green-700 bg-green-50">
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
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/consultation">Request Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean Minimal Design */}
      <section className="relative pt-20 pb-24 px-4 bg-slate-50">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
                <Bot className="h-4 w-4 mr-2" />
                AI-Powered Multi-Channel Lead Generation
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Stop Wasting Time on
                <br />
                <span className="text-blue-600">
                  Unqualified Leads
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
                Get <strong className="text-slate-900">verified, sales-ready leads</strong> delivered directly to your dashboard. Every lead is manually verified with active phone numbers and valid email addresses—so you can focus on closing deals, not chasing dead ends.
              </p>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">90%+ Verified Contacts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Industry-Specific Matching</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Money-Back Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">First Leads in 7 Days</span>
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
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-slate-300 hover:bg-slate-50 text-slate-700" asChild>
                  <Link href="/login?demo=true">
                    <Zap className="mr-2 h-5 w-5" />
                    Watch Demo
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

            {/* Right Column - Clean Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-8 border border-slate-200">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">AI Dashboard</h3>
                      <p className="text-sm text-slate-500">Live Lead Generation</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    Live
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-slate-700">Verified Rate</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">94%</p>
                    <p className="text-sm text-slate-500">Active contacts</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">Quality Score</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">87%</p>
                    <p className="text-sm text-slate-500">Average match</p>
                  </div>
                </div>

                {/* Recent Leads */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 text-sm">Verified Leads</h4>
                  {[
                    { name: "Rajesh Mehta", company: "Mumbai Realty", source: "Google Maps", score: 92, status: "Verified" },
                    { name: "Priya Sharma", company: "Tech Solutions", source: "LinkedIn", score: 88, status: "Verified" },
                    { name: "Anita Desai", company: "MediCare Plus", source: "Facebook Ads", score: 95, status: "Verified" }
                  ].map((lead, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-green-200">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.company} • {lead.source}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 px-2 py-0.5">{lead.score}%</Badge>
                        <div className="w-2 h-2 rounded-full bg-green-500" title="Verified"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Lead Generation Problem Most Businesses Face
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sound familiar? You're not alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Problems */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">❌ Traditional Problems</h3>
              <div className="flex items-start gap-4 p-6 bg-red-50 rounded-lg border border-red-200">
                <div className="text-red-600 text-2xl font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Wasting Money on Ads</h4>
                  <p className="text-slate-600 text-sm">Spending ₹50,000/month on Google/Meta ads but getting unqualified leads who never convert.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-red-50 rounded-lg border border-red-200">
                <div className="text-red-600 text-2xl font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Hours on Cold Calling</h4>
                  <p className="text-slate-600 text-sm">Your team spends hours calling people who aren't interested, aren't the decision-maker, or have wrong numbers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-red-50 rounded-lg border border-red-200">
                <div className="text-red-600 text-2xl font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Buying Low-Quality Lead Lists</h4>
                  <p className="text-slate-600 text-sm">Purchased databases with outdated contacts, fake emails, and people who never opted in.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-red-50 rounded-lg border border-red-200">
                <div className="text-red-600 text-2xl font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Expensive Sales Teams with No ROI</h4>
                  <p className="text-slate-600 text-sm">Hiring 5-10 people at ₹30,000/month each, but they're struggling to find quality prospects.</p>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">✅ Our Solution</h3>
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 text-2xl font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Verified, Qualified Leads Only</h4>
                  <p className="text-slate-600 text-sm">Every lead is verified by AI and human QA. Phone tested, email validated, intent confirmed. Bad lead? We replace it FREE.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 text-2xl font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">AI Finds Them 24/7</h4>
                  <p className="text-slate-600 text-sm">Our AI scrapes Google Maps, LinkedIn, directories, and social media to find people actively searching for your services RIGHT NOW.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 text-2xl font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Industry-Specific Targeting</h4>
                  <p className="text-slate-600 text-sm">Tailored strategies for Real Estate, Healthcare, B2B Services, E-commerce. We understand your market.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-600 text-2xl font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Pay Only for Results</h4>
                  <p className="text-slate-600 text-sm">No setup fees. No long contracts. Pay per lead delivered. Money-back guarantee if not satisfied.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-8 shadow-sm border border-blue-200">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  10,000+
                </div>
                <div className="text-slate-700 font-medium">Leads Delivered</div>
                <div className="text-slate-500 text-sm mt-1">To Happy Clients</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-8 shadow-sm border border-green-200">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  89%
                </div>
                <div className="text-slate-700 font-medium">Quality Score</div>
                <div className="text-slate-500 text-sm mt-1">Verified Leads</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-8 shadow-sm border border-purple-200">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  50+
                </div>
                <div className="text-slate-700 font-medium">Happy Clients</div>
                <div className="text-slate-500 text-sm mt-1">Across India</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-50 rounded-lg p-8 shadow-sm border border-orange-200">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                  7 Days
                </div>
                <div className="text-slate-700 font-medium">First Delivery</div>
                <div className="text-slate-500 text-sm mt-1">Guaranteed</div>
              </div>
            </div>
          </div>

          {/* Industry Tags */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-8 text-lg font-medium">Trusted by businesses in these industries:</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="px-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-semibold text-blue-700">🏢 Real Estate</span>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-semibold text-blue-700">🏥 Healthcare</span>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-semibold text-blue-700">💼 B2B Services</span>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-semibold text-blue-700">🏭 Manufacturing</span>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-semibold text-blue-700">🛍️ E-commerce</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Simple 3-Step Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How We Find & Verify
              <br />
              <span className="text-slate-600">
                Your Perfect Leads
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our multi-channel approach combines AI-powered data discovery with human verification to ensure every lead is sales-ready before it reaches your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">Multi-Channel Discovery</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We use AI technology to search Google Maps, LinkedIn, Facebook, and industry-specific directories to identify prospects that match your ideal customer profile.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Google Maps & local directories</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">LinkedIn company & contact data</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Industry-specific platforms</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Targeted Facebook/Google Ads</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">Quality Verification</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Every lead goes through rigorous verification. We confirm phone numbers are active, emails are valid, and the business matches your target criteria before delivery.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Phone number verification (90%+ active)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Email deliverability testing (95%+ valid)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Manual spot-checking for quality</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Quality scoring (0-100) based on ICP match</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">Direct Delivery</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Verified leads are delivered directly to your dashboard weekly. Each lead includes verified contact information, source details, quality score, and all the context you need to convert.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Weekly delivery to your dashboard</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Complete contact details & source</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Email & WhatsApp notifications</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">CSV export for CRM integration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-blue-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-6">Get a custom lead generation plan tailored to your business</p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4" asChild>
                <Link href="/consultation">
                  Request Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase */}
      <section id="features" className="py-24 px-4 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
              <Bot className="h-4 w-4 mr-2" />
              AI-Powered Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Your AI Marketing Team
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                in Action
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how our AI finds, qualifies, and converts prospects while you sleep. 
              <strong className="text-gray-900"> Real results, real time.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contacts */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Contacts Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AI-scraped contacts from web, ready for outreach. Track quality scores and outreach status.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ AI web scraping
                  <br />
                  ✓ Quality scoring (0-100)
                  <br />
                  ✓ Bulk operations
                </div>
              </CardContent>
            </Card>

            {/* Verified Leads */}
            <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <CardTitle className="text-xl">Verified Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  High-quality leads from outreach responses and ad inquiries, segregated by source.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Outreach responses
                  <br />
                  ✓ Meta Ads leads
                  <br />
                  ✓ Google Ads leads
                </div>
              </CardContent>
            </Card>

            {/* AI Scraping */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Search className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle className="text-xl">AI Web Scraping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automated daily scraping of Google Maps, directories, and LinkedIn for potential customers.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Scheduled campaigns
                  <br />
                  ✓ Custom search criteria
                  <br />
                  ✓ Auto quality filtering
                </div>
              </CardContent>
            </Card>

            {/* Outreach Campaigns */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <Send className="h-7 w-7 text-green-600" />
                </div>
                <CardTitle className="text-xl">Outreach Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Bulk WhatsApp & Email campaigns to contacts. Automated sending, response tracking, auto-conversion.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ WhatsApp bulk messaging
                  <br />
                  ✓ Email campaigns
                  <br />
                  ✓ Response auto-conversion
                </div>
              </CardContent>
            </Card>

            {/* Ad Campaigns */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Meta & Google Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Facebook, Instagram, and Google Ads campaigns running 24/7. Leads captured automatically.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Facebook/Instagram Ads
                  <br />
                  ✓ Google Lead Forms
                  <br />
                  ✓ Auto-import to dashboard
                </div>
              </CardContent>
            </Card>

            {/* Conversations */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                  <MessageCircle className="h-7 w-7 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Unified Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Chat with all verified leads in one place. Multi-channel messaging with complete history.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Real-time chat
                  <br />
                  ✓ WhatsApp/Email integration
                  <br />
                  ✓ Conversation history
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Examples Section */}
      <IndustryExamples />

      {/* Lead Sources */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Multiple Lead Sources, One Dashboard
            </h2>
            <p className="text-xl text-gray-600">
              We combine AI scraping, outreach, and paid ads for maximum lead generation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Web Scraping</h3>
              <p className="text-gray-600 mb-4">
                AI scrapes 100-500 contacts per day from Google Maps, directories, and LinkedIn
              </p>
              <div className="inline-flex items-center gap-2 text-purple-600 font-medium">
                <TrendingUp className="h-4 w-4" />
                Unverified → Contacts
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Send className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Outreach Campaigns</h3>
              <p className="text-gray-600 mb-4">
                Bulk WhatsApp/Email sent to contacts. Responses automatically become verified leads
              </p>
              <div className="inline-flex items-center gap-2 text-green-600 font-medium">
                <TrendingUp className="h-4 w-4" />
                Contact → Lead on Response
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <div className="flex gap-1">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <Chrome className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Meta & Google Ads</h3>
              <p className="text-gray-600 mb-4">
                Direct inquiries from Facebook, Instagram, and Google searches flow in 24/7
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
                <TrendingUp className="h-4 w-4" />
                Direct → Verified Leads
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Target className="h-4 w-4 mr-2" />
              Why We're Different
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Businesses Choose
              <br />
              <span className="text-blue-600">Transition Marketing AI</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We don't just send you lists. We deliver verified, sales-ready leads with complete transparency and unmatched reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Human Verification</h3>
                <p className="text-sm text-slate-600">
                  Every lead is manually spot-checked. We call numbers, test emails, and verify businesses before delivery—not just automated APIs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Quality Guarantee</h3>
                <p className="text-sm text-slate-600">
                  If we don't meet agreed lead volume or quality standards, you get a full refund. No questions asked. We put our money where our mouth is.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Custom Matching</h3>
                <p className="text-sm text-slate-600">
                  Leads are matched to your ideal customer profile (ICP). Not random contacts—prospects that actually fit your target market.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Complete Transparency</h3>
                <p className="text-sm text-slate-600">
                  See exactly where each lead came from, quality scores, verification status, and contact attempts. Full visibility into every lead.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-blue-50 rounded-2xl p-10 border-2 border-blue-200">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-blue-900 mb-2">90%+</div>
                <p className="text-blue-700 font-medium">Verified Contact Rate</p>
                <p className="text-sm text-blue-600 mt-1">Active phone numbers & valid emails</p>
              </div>
              <div className="text-center md:text-left border-l border-blue-300 pl-8">
                <div className="text-4xl font-bold text-blue-900 mb-2">85%+</div>
                <p className="text-blue-700 font-medium">Average Quality Score</p>
                <p className="text-sm text-blue-600 mt-1">ICP-matched, verified prospects</p>
              </div>
              <div className="text-center md:text-left border-l border-blue-300 pl-8">
                <div className="text-4xl font-bold text-blue-900 mb-2">7 Days</div>
                <p className="text-blue-700 font-medium">First Leads Delivered</p>
                <p className="text-sm text-blue-600 mt-1">From signup to your dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Quality Standards Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Our Quality Standards
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What Makes Our Leads
              <br />
              <span className="text-green-600">Sales-Ready</span>
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
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700 text-lg px-8 py-4" asChild>
                  <Link href="/login?demo=true">
                    <Zap className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk-Free Guarantee Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              100% Risk-Free Promise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Money-Back Guarantee
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're so confident in our ability to deliver quality leads that we offer a complete money-back guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 border-green-200 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Quality Guaranteed
                </h3>
                <p className="text-slate-600">
                  Every lead is verified with working phone number and email. If we can't deliver the promised quality, we refund you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Timely Delivery
                </h3>
                <p className="text-slate-600">
                  First leads delivered within 7 days. If we miss the deadline without good reason, get a full refund—no questions asked.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  30-Day Satisfaction
                </h3>
                <p className="text-slate-600">
                  Not satisfied with the lead quality in your first month? Cancel anytime and get a full refund. Zero risk to you.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-lg border-2 border-green-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Still Have Questions?
                </h3>
                <p className="text-slate-600 text-lg">
                  Book a free consultation call with our team. We'll answer all your questions and show you exactly how we can help your business grow.
                </p>
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 flex-shrink-0" asChild>
                <Link href="/consultation">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
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
                  <strong className="text-slate-900">Yes!</strong> All our plans are month-to-month with no long-term contracts. You can cancel anytime with 7 days' notice. Plus, we offer a 30-day money-back guarantee if you're not satisfied with the lead quality in your first month.
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
                <Button size="lg" variant="outline" className="border-2" asChild>
                  <Link href="/login?demo=true">
                    <Zap className="mr-2 h-5 w-5" />
                    View Demo
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
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700 text-lg px-10 py-6" asChild>
              <Link href="/login?demo=true">
                <Zap className="mr-2 h-5 w-5" />
                View Demo
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
                    <Link href="/login?demo=true" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      Live Demo
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


