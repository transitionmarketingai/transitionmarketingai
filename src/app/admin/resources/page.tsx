'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  DollarSign,
  Target,
  CheckSquare,
  Workflow,
  Lightbulb,
  Download,
  ExternalLink,
  PlayCircle,
  Phone,
  Mail,
  Bot,
  TrendingUp,
  AlertCircle,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminResourcesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          Admin Resources & Guides
        </h1>
        <p className="text-slate-600">Everything you need to run your lead generation business</p>
      </div>

      {/* Quick Start Banner */}
      <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <PlayCircle className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-900">First Time Here?</h3>
              </div>
              <p className="text-blue-800 mb-4">
                Start with the Testing Checklist to verify everything works, then follow the Quick Start Guide to onboard your first client.
              </p>
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="#testing">
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Testing Checklist
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#quickstart">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Quick Start Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Resources Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="leads">Lead Gen</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complete Workflow Guide */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Workflow className="h-8 w-8 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-700">Essential</Badge>
                </div>
                <CardTitle>Complete Operational Workflow</CardTitle>
                <CardDescription>
                  End-to-end process from consultation to lead delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>10-step workflow guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Lead generation methods (AI + Ads)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Quality verification process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Delivery automation setup</span>
                  </li>
                </ul>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                    window.open('/COMPLETE_OPERATIONAL_WORKFLOW.md', '_blank');
                  }}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Calculator */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <Badge className="bg-green-100 text-green-700">Essential</Badge>
                </div>
                <CardTitle>Pricing Calculator Guide</CardTitle>
                <CardDescription>
                  How to calculate quotations for any client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Industry pricing matrix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Volume discounts (10-25%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Real calculation examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Quotation templates</span>
                  </li>
                </ul>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                    window.open('/PRICING_CALCULATOR_GUIDE.md', '_blank');
                  }}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Client Onboarding */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Phone className="h-8 w-8 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-700">Essential</Badge>
                </div>
                <CardTitle>Client Onboarding Workflow</CardTitle>
                <CardDescription>
                  Consultation call script & onboarding process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Consultation call script</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>6-step onboarding form guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Proposal email template</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Objection handling</span>
                  </li>
                </ul>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                    window.open('/CLIENT_ONBOARDING_WORKFLOW.md', '_blank');
                  }}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Platform Completion */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-8 w-8 text-amber-600" />
                  <Badge className="bg-amber-100 text-amber-700">Reference</Badge>
                </div>
                <CardTitle>Platform Build Summary</CardTitle>
                <CardDescription>
                  Complete list of all features built
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>20+ features documented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Technical implementation details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Files created/modified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>What's ready to use NOW</span>
                  </li>
                </ul>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                    window.open('/COMPREHENSIVE_BUILD_COMPLETE.md', '_blank');
                  }}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                Pricing Calculator
              </CardTitle>
              <CardDescription>Calculate quotations for any client scenario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Pricing Matrix */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Industry Base Rates (Verified Leads)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { industry: 'Real Estate', rate: '₹400' },
                    { industry: 'Healthcare', rate: '₹500' },
                    { industry: 'IT Services', rate: '₹350' },
                    { industry: 'Manufacturing', rate: '₹450' },
                    { industry: 'Financial Services', rate: '₹550' },
                    { industry: 'Education', rate: '₹300' },
                    { industry: 'E-commerce', rate: '₹250' },
                    { industry: 'Consulting', rate: '₹500' },
                    { industry: 'Hospitality', rate: '₹350' },
                  ].map((item) => (
                    <div key={item.industry} className="p-4 border rounded-lg bg-slate-50">
                      <p className="text-sm text-slate-600">{item.industry}</p>
                      <p className="text-xl font-bold text-slate-900">{item.rate}/lead</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Discounts */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Volume Discounts</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-slate-700">1-25 leads/month</span>
                    <Badge variant="secondary">No discount</Badge>
                  </div>
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-slate-700">26-50 leads/month</span>
                    <Badge className="bg-green-100 text-green-700">10% off</Badge>
                  </div>
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-slate-700">51-100 leads/month</span>
                    <Badge className="bg-green-100 text-green-700">15% off</Badge>
                  </div>
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-slate-700">101-200 leads/month</span>
                    <Badge className="bg-green-100 text-green-700">20% off</Badge>
                  </div>
                  <div className="flex justify-between p-3 border rounded-lg">
                    <span className="text-slate-700">200+ leads/month</span>
                    <Badge className="bg-green-100 text-green-700">25% off</Badge>
                  </div>
                </div>
              </div>

              {/* Example Calculation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 text-blue-900">Example Calculation</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-700">
                    <strong>Scenario:</strong> Real Estate, 30 verified leads, AI Scraping
                  </p>
                  <div className="space-y-1 text-slate-600 pl-4 border-l-2 border-blue-300">
                    <p>Base Cost: ₹400 × 30 = ₹12,000</p>
                    <p>Volume Discount (10%): -₹1,200</p>
                    <p>Source Factor (AI 1.0x): No change</p>
                    <p className="font-bold text-slate-900 pt-2">Final: ₹10,800/month (₹360/lead)</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={() => {
                window.open('/PRICING_CALCULATOR_GUIDE.md', '_blank');
              }}>
                <BookOpen className="mr-2 h-4 w-4" />
                Open Complete Pricing Guide
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lead Generation Tab */}
        <TabsContent value="leads">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  Lead Generation Methods
                </CardTitle>
                <CardDescription>How to generate leads for your clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Method 1: AI Scraping */}
                <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-blue-900 mb-1">Method 1: AI Web Scraping</h3>
                      <p className="text-sm text-blue-700">Cheapest, most common. Best for local businesses & B2B.</p>
                    </div>
                    <Badge className="bg-blue-600 text-white">Recommended</Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-blue-900 mb-2">Tools Needed:</p>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span><strong>Apify</strong> - Google Maps, websites (₹2,000-5,000/mo)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span><strong>PhantomBuster</strong> - LinkedIn, social media (₹3,000-8,000/mo)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span><strong>Hunter.io</strong> - Email finding & verification (₹2,500/mo)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-blue-900 mb-2">Process:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                        <li>Define target criteria from client ICP</li>
                        <li>Set up scraper with filters</li>
                        <li>Run scraper (1-6 hours)</li>
                        <li>Export to CSV</li>
                        <li>Verify contacts (phone + email)</li>
                        <li>Score quality (0-100)</li>
                        <li>Upload to dashboard</li>
                      </ol>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Example:</strong> Real Estate agents in Mumbai
                        <br />
                        <span className="text-blue-700">Search "real estate agent Mumbai" on Google Maps → Get 500-1000 leads</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Method 2: Paid Ads */}
                <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-purple-900 mb-1">Method 2: Facebook/Google Ads</h3>
                      <p className="text-sm text-purple-700">Higher cost, higher quality. Best for high-budget clients.</p>
                    </div>
                    <Badge className="bg-purple-600 text-white">Premium</Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-purple-900 mb-2">When to Use:</p>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Client has budget (₹20,000+ monthly)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Needs high-intent leads (people actively searching)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>Competitive industry where scraping isn't enough</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-purple-900 mb-2">Setup Process:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-purple-800">
                        <li>Client gives you ad account access (Meta/Google)</li>
                        <li>You create lead generation campaigns</li>
                        <li>Set up lead forms or landing pages</li>
                        <li>Leads fill forms → Export data</li>
                        <li>Deliver to client dashboard</li>
                      </ol>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-purple-900">
                        <strong>Cost Structure:</strong>
                        <br />
                        <span className="text-purple-700">You charge: ₹600/lead • Ad spend: ₹300/lead • Your margin: ₹300/lead</span>
                      </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-amber-900">
                          <strong>Important:</strong> Always run ads in client's ad account, not yours. This keeps transparency and they own the data.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Method 3: Hybrid */}
                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-green-900 mb-1">Method 3: Hybrid Approach</h3>
                      <p className="text-sm text-green-700">Best of both worlds. Recommended for most clients.</p>
                    </div>
                    <Badge className="bg-green-600 text-white">Best Value</Badge>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-green-800">
                      Combine AI scraping (70%) with paid ads (30%) to balance cost and quality.
                    </p>

                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-green-900 font-semibold mb-2">4-Week Schedule:</p>
                      <div className="space-y-2 text-sm text-green-800">
                        <p><strong>Week 1-2:</strong> AI scraping (fast, cheap, build volume)</p>
                        <p><strong>Week 3-4:</strong> Facebook Ads (higher quality, prove value)</p>
                        <p><strong>Result:</strong> 70% scraping + 30% ads = Balanced quality & cost</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quality Verification */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Quality Verification (CRITICAL!)
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Phone Verification</p>
                        <p className="text-slate-600">Use Truecaller API (₹0.50/check). Goal: 90%+ active numbers</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Email Verification</p>
                        <p className="text-slate-600">Use ZeroBounce (₹0.30/check). Goal: 95%+ valid emails</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Quality Scoring</p>
                        <p className="text-slate-600">Score 0-100 based on completeness, ICP match, intent, verification</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold">4</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Manual Spot Check</p>
                        <p className="text-slate-600">Call 3-5 numbers per batch to verify quality</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={() => {
                  window.open('/COMPLETE_OPERATIONAL_WORKFLOW.md', '_blank');
                }}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Open Complete Lead Generation Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Workflow Tab */}
        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-6 w-6" />
                Complete Workflow (10 Steps)
              </CardTitle>
              <CardDescription>From consultation to lead delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: 'Consultation Request',
                    desc: 'Client fills form at /consultation',
                    action: 'Check /admin/consultations daily',
                  },
                  {
                    num: 2,
                    title: 'Call & Discovery',
                    desc: 'Call within 24 hours, 15-20 minutes',
                    action: 'Use consultation call script',
                  },
                  {
                    num: 3,
                    title: 'Fill Onboarding Form',
                    desc: 'During or after call',
                    action: 'Go to /admin/consultations/[id]/onboard',
                  },
                  {
                    num: 4,
                    title: 'Calculate Quotation',
                    desc: 'Use pricing matrix',
                    action: 'Base rate × volume × source factor - discount',
                  },
                  {
                    num: 5,
                    title: 'Send Proposal',
                    desc: 'Same day as call',
                    action: 'Use email template, follow up in 2 days',
                  },
                  {
                    num: 6,
                    title: 'Client Pays',
                    desc: 'Payment received',
                    action: 'Update status to active, generate invoice',
                  },
                  {
                    num: 7,
                    title: 'Generate Leads',
                    desc: 'AI scraping or ads',
                    action: 'Use Apify, PhantomBuster, or run ad campaigns',
                  },
                  {
                    num: 8,
                    title: 'Quality Check',
                    desc: 'Verify all contacts',
                    action: 'Phone + email verification, quality scoring',
                  },
                  {
                    num: 9,
                    title: 'Deliver Leads',
                    desc: 'Dashboard + email + WhatsApp',
                    action: 'Upload at /admin/clients/[id]/leads/upload',
                  },
                  {
                    num: 10,
                    title: 'Invoice & Repeat',
                    desc: 'Monthly billing',
                    action: 'Generate invoice, collect payment, continue',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">{step.num}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-slate-600 mb-1">{step.desc}</p>
                      <p className="text-sm text-blue-600">→ {step.action}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6" onClick={() => {
                window.open('/COMPLETE_OPERATIONAL_WORKFLOW.md', '_blank');
              }}>
                <BookOpen className="mr-2 h-4 w-4" />
                Open Complete Workflow Guide
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" id="testing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-6 w-6" />
                Testing Checklist
              </CardTitle>
              <CardDescription>Verify everything works before going live</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Marketing Website */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">1</span>
                    Marketing Website
                  </h3>
                  <div className="space-y-2 ml-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Visit homepage, check all sections load</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Read FAQ section, verify content makes sense</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Check guarantee section displays properly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Test consultation request form (/consultation)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Submit test consultation, verify it appears in admin</span>
                    </label>
                  </div>
                </div>

                {/* Admin Dashboard */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">2</span>
                    Admin Dashboard
                  </h3>
                  <div className="space-y-2 ml-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Login at /admin/login</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">View consultations at /admin/consultations</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Click test consultation, verify details show</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Click "Onboard Client" button</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Fill out all 6 steps of onboarding form</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Submit onboarding, verify redirect to client page</span>
                    </label>
                  </div>
                </div>

                {/* Client Management */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">3</span>
                    Client Management
                  </h3>
                  <div className="space-y-2 ml-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Go to /admin/clients, see test client listed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Click on client, view detail page</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Check all tabs work (Overview, Plan, Leads, Activity)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">View custom plan, verify pricing displays</span>
                    </label>
                  </div>
                </div>

                {/* Lead Upload */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">4</span>
                    Lead Upload System
                  </h3>
                  <div className="space-y-2 ml-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Click "Upload Leads" from client page</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Try manual entry, add 2-3 test leads</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Download CSV template</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Upload CSV with 5-10 leads</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Verify leads appear in client detail page</span>
                    </label>
                  </div>
                </div>

                {/* Invoice System */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">5</span>
                    Invoice Generator
                  </h3>
                  <div className="space-y-2 ml-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Click "Create Invoice" from client page</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Verify client info auto-fills</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Add line items, verify amounts calculate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Check GST (18%) calculates correctly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Save invoice, verify success message</span>
                    </label>
                  </div>
                </div>

                {/* Demo Mode */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">6</span>
                    Customer Dashboard (Demo Mode)
                  </h3>
                  <div className="space-y-2 ml-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Go to /login?demo=true</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Click demo button, verify dashboard loads</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Navigate to different sidebar sections</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Check "Coming Soon" sections display properly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">View prospects, verify locked leads display</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">View leads, check table formatting</span>
                    </label>
                  </div>
                </div>

                {/* Analytics */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">7</span>
                    Analytics Dashboard
                  </h3>
                  <div className="space-y-2 ml-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Go to /admin/analytics</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Verify key metrics display</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Check different tabs (Overview, Revenue, Clients, Leads)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Test time range selector</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Once all checked:</p>
                    <p className="text-sm text-green-800">Your platform is ready for real clients! Move to Quick Start guide.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick Start Tab */}
        <TabsContent value="quickstart" id="quickstart">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6" />
                Quick Start Guide
              </CardTitle>
              <CardDescription>Your first week checklist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Today */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-blue-600">📅 Today (Setup)</h3>
                  <div className="space-y-2 ml-4">
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Read Pricing Calculator Guide (20 min)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Read Complete Operational Workflow (30 min)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Sign up for Apify (web scraping)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Sign up for Hunter.io (email verification)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Complete testing checklist above</span>
                    </label>
                  </div>
                </div>

                {/* This Week */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-purple-600">📅 This Week (Practice)</h3>
                  <div className="space-y-2 ml-4">
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Generate 100 test leads using Apify (your industry)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Verify test leads using Hunter.io</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Upload test leads to platform (use test client)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Practice pricing calculation (3 scenarios)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Practice onboarding form (fill completely)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Set up WhatsApp Business (for notifications)</span>
                    </label>
                  </div>
                </div>

                {/* Next Week */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-green-600">📅 Next Week (First Client)</h3>
                  <div className="space-y-2 ml-4">
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Get consultation request (or reach out to prospects)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Call prospect (use consultation script)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Fill onboarding form during/after call</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Calculate quotation using pricing guide</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Send proposal email (use template)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Follow up in 2 days</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Collect payment</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Generate their leads</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Verify quality (phone + email)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Upload to dashboard</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Send delivery notification (email + WhatsApp)</span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="w-4 h-4 mt-1" />
                      <span className="text-sm">Generate and send invoice</span>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-blue-900 mb-3">🎯 Success Criteria</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>✅ Platform tested and working</p>
                    <p>✅ Tools set up (Apify, Hunter.io)</p>
                    <p>✅ Generated test leads successfully</p>
                    <p>✅ Practiced full workflow</p>
                    <p>✅ Ready to onboard first paying client!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

