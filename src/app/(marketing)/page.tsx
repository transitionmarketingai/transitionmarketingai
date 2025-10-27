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
                AI-Powered Lead Generation
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Get 50+ Verified Leads
                <br />
                <span className="text-blue-600">
                  Every Month - Guaranteed
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
                We don't just give you software. We deliver <strong className="text-slate-900">qualified, verified leads</strong> directly to your inbox. No setup. No guesswork. Just results.
              </p>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Verified Phone & Email</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Industry-Specific Targeting</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Delivered in 7 Days</span>
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
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">New Leads</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">47</p>
                    <p className="text-sm text-slate-500">This week</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">Quality Score</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">89%</p>
                    <p className="text-sm text-slate-500">Average</p>
                  </div>
                </div>

                {/* Recent Leads */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 text-sm">Recent Leads</h4>
                  {[
                    { name: "Priya Sharma", company: "TechCorp", score: 92, time: "2 min ago" },
                    { name: "Rajesh Kumar", company: "StartupXYZ", score: 88, time: "5 min ago" },
                    { name: "Anita Patel", company: "GrowthCo", score: 95, time: "8 min ago" }
                  ].map((lead, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.company} • {lead.time}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{lead.score}</div>
                        <Button size="sm" variant="outline" className="text-xs px-3 py-1 border-slate-300 text-slate-700">Contact</Button>
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
              From Zero to Qualified Leads
              <br />
              <span className="text-slate-600">
                in Just 3 Steps
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI handles everything while you focus on closing deals. 
              No technical skills required.
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
                  <CardTitle className="text-2xl text-slate-900">AI Finds Your Prospects</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Our AI searches Google Maps, LinkedIn, and business directories to find 
                    100-500 potential customers daily in your target area and industry.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">AI quality scoring (0-100)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Contact details verified</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Saved to your database</span>
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
                  <CardTitle className="text-2xl text-slate-900">Personalized Outreach</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    AI sends personalized WhatsApp and Email messages to each prospect. 
                    Responses automatically become qualified leads in your dashboard.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">WhatsApp + Email campaigns</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">AI-personalized messages</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Auto-conversion to leads</span>
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
                  <CardTitle className="text-2xl text-slate-900">Close More Deals</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Qualified leads appear in your dashboard with conversation history. 
                    Plus, Facebook & Google Ads bring in leads 24/7 from people actively searching for your services.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Real-time chat interface</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Meta & Google Ads integration</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Complete conversation history</span>
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

      {/* Clean Pricing */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <IndianRupee className="h-4 w-4 mr-2" />
              Flexible Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Custom Plans Tailored
              <br />
              <span className="text-slate-600">
                to Your Business
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Every business is unique. We create a custom lead generation plan based on your specific needs and budget.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="text-center pt-8 pb-6">
                <Badge variant="outline" className="mb-4">Example Tier</Badge>
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Starter</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹5,000</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <div className="bg-gray-50 rounded-lg py-4 px-6">
                  <p className="text-sm font-medium text-gray-700">For Small Businesses</p>
                  <p className="text-xs text-gray-500 mt-1">~25 Verified Leads/Month</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6" asChild>
                  <Link href="/consultation">
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">500 AI-scraped contacts/month</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">1,000 personalized outreach messages</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">₹5,000 Meta & Google ad credits</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">WhatsApp + Email campaigns</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Basic AI lead scoring</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional - Most Popular */}
            <Card className="relative border-2 border-blue-600 bg-white">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-6 py-2 text-sm font-medium rounded-lg">
                  <Zap className="h-4 w-4 mr-2 inline" />
                  Most Popular
                </div>
              </div>
              <CardHeader className="text-center pt-12 pb-6">
                <Badge variant="outline" className="mb-4">Example Tier</Badge>
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Professional</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹10,000</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <div className="bg-gray-50 rounded-lg py-4 px-6">
                  <p className="text-sm font-medium text-gray-700">For Growing Businesses</p>
                  <p className="text-xs text-gray-500 mt-1">~50 Verified Leads/Month</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6" asChild>
                  <Link href="/consultation">
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">2,000 AI-scraped contacts/month</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">5,000 personalized outreach messages</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">₹15,000 Meta & Google ad credits</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Priority support & onboarding</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Advanced AI lead scoring</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Predictive analytics dashboard</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="text-center pt-8 pb-6">
                <Badge variant="outline" className="mb-4">Example Tier</Badge>
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹25,000</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <div className="bg-gray-50 rounded-lg py-4 px-6">
                  <p className="text-sm font-medium text-gray-700">For Large Businesses</p>
                  <p className="text-xs text-gray-500 mt-1">~150 Verified Leads/Month</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6" asChild>
                  <Link href="/consultation">
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Unlimited AI-scraped contacts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Unlimited personalized outreach</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">₹50,000 Meta & Google ad credits</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Custom AI models & training</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">White-label options</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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

