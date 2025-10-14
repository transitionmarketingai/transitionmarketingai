'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  MessageSquare, 
  Target, 
  BarChart3,
  Shield,
  Clock,
  Zap,
  Users,
  Bell,
  Globe,
  Lock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Same as homepage */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
                LeadGen Pro
              </div>
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
              <Link href="/onboarding">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-4">All Features</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Generate More Leads
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete lead generation platform built for Indian businesses
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* AI-Powered Qualification */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <Badge>AI-Powered</Badge>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI Lead Qualification
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every single lead is analyzed by our AI. Get quality scores from 0-100, 
                buying intent detection, and actionable insights.
              </p>
              
              <div className="space-y-4">
                {[
                  'Automatic quality scoring (0-100)',
                  'Buying intent detection (high/medium/low)',
                  'Budget and timeline analysis',
                  'Decision authority identification',
                  'Red flag detection',
                  'Personalized follow-up recommendations'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
              <Card className="shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Lead Analysis</h3>
                    <Badge className="bg-green-500">AI Verified</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Quality Score</span>
                        <span className="font-bold text-2xl">85/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-green-900 mb-2">🎯 Hot Lead</p>
                      <p className="text-sm text-green-800">
                        High buying intent • Budget matches • Immediate timeline
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Key Signals:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ Budget: ₹80L-₹1Cr (matches listing)</li>
                        <li>✓ Timeline: Next 30 days (urgent)</li>
                        <li>✓ Location: Mumbai Andheri (service area)</li>
                      </ul>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Messaging Platform */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mockup First (Left) */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 order-2 lg:order-1">
              <Card className="shadow-xl">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
                  <h3 className="font-bold">Conversation with Rajesh Kumar</h3>
                  <p className="text-sm text-blue-100">Active now</p>
                </div>
                <CardContent className="p-0">
                  <div className="p-4 space-y-3 h-64 overflow-y-auto">
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs">
                        <p className="text-sm">Hi Rajesh! I saw you're looking for a 2BHK in Andheri. We have some great options.</p>
                        <p className="text-xs text-blue-100 mt-1">10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-200 rounded-lg px-4 py-2 max-w-xs">
                        <p className="text-sm">Yes! Budget is ₹90 lakhs. Can we see some properties this weekend?</p>
                        <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs">
                        <p className="text-sm">Absolutely! I'll arrange viewings. What time works best?</p>
                        <p className="text-xs text-blue-100 mt-1">10:33 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-1 px-4 py-2 border rounded-lg"
                      disabled
                    />
                    <Button size="sm" className="bg-blue-600">Send</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content (Right) */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <Badge>All-in-One</Badge>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Unified Messaging Platform
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Contact leads via WhatsApp, Email, or SMS - all from one beautiful inbox. 
                Never switch between apps again.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: MessageSquare, text: 'WhatsApp Business', color: 'green' },
                  { icon: Mail, text: 'Email Integration', color: 'blue' },
                  { icon: Phone, text: 'SMS Messaging', color: 'purple' },
                  { icon: Smartphone, text: 'Mobile Optimized', color: 'orange' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  'Real-time conversation syncing',
                  'Message templates for quick replies',
                  'Read receipts and typing indicators',
                  'File attachments support',
                  'Conversation history forever',
                  'AI-suggested responses'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation */}
        <section className="py-16 bg-gray-50 -mx-4 px-4 lg:-mx-0 lg:px-8 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <Badge>Done-For-You</Badge>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We Run Your Ads For You
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No need to learn Facebook or Google Ads. We handle everything - 
                from campaign creation to optimization.
              </p>
              
              <div className="space-y-6 mb-6">
                {[
                  {
                    title: 'Professional Ad Campaigns',
                    description: 'Expert-designed ads with proven creatives and compelling copy',
                    icon: Target
                  },
                  {
                    title: 'Smart Targeting',
                    description: 'AI-powered audience targeting to reach your ideal customers',
                    icon: Users
                  },
                  {
                    title: 'Continuous Optimization',
                    description: 'Daily monitoring and adjustments to improve cost per lead',
                    icon: TrendingUp
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium mb-1">
                  ✨ Powered by Facebook & Google Ad Platforms
                </p>
                <p className="text-xs text-blue-700">
                  We leverage the same technology used by Fortune 500 companies to target and acquire your ideal customers.
                </p>
              </div>
            </div>

            {/* Mockup */}
            <div className="space-y-4">
              <Card className="border-2 border-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      FB
                    </div>
                    <div>
                      <h4 className="font-bold">Facebook Campaign</h4>
                      <p className="text-sm text-gray-500">Active • ₹800/day</p>
                    </div>
                    <Badge className="ml-auto bg-green-500">Live</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">28</p>
                      <p className="text-xs text-gray-500">Leads Today</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">₹287</p>
                      <p className="text-xs text-gray-500">Cost/Lead</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">82</p>
                      <p className="text-xs text-gray-500">Quality Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <div>
                      <h4 className="font-bold">Google Search Ads</h4>
                      <p className="text-sm text-gray-500">Active • ₹1,000/day</p>
                    </div>
                    <Badge className="ml-auto bg-blue-500">Live</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">18</p>
                      <p className="text-xs text-gray-500">Leads Today</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">₹445</p>
                      <p className="text-xs text-gray-500">Cost/Lead</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">78</p>
                      <p className="text-xs text-gray-500">Quality Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-Time Dashboard */}
        <section className="py-16">
          <div className="text-center mb-12">
            <Badge className="mb-4">Dashboard</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Beautiful, Real-Time Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track everything in one place. See quota usage, lead quality, and campaign performance at a glance.
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Welcome back, Rajesh! 👋</h3>
                <p className="text-blue-100">ABC Real Estate</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 p-6 border-b">
                {[
                  { label: 'Total Leads', value: '48', icon: Users, color: 'blue' },
                  { label: 'Qualified', value: '38', icon: Target, color: 'green' },
                  { label: 'Quality Score', value: '82/100', icon: Sparkles, color: 'purple' },
                  { label: 'Campaigns', value: '2', icon: TrendingUp, color: 'orange' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <stat.icon className={`h-8 w-8 text-${stat.color}-600 mx-auto mb-2`} />
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Quota Bar */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Lead Quota Status</span>
                  <Badge>48/50 Used</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '96%'}}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">2 leads remaining this month</p>
              </div>

              {/* Recent Leads Preview */}
              <div className="p-6">
                <h4 className="font-bold mb-4">Recent Leads</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Priya Sharma', score: 88, time: '5 mins ago' },
                    { name: 'Amit Patel', score: 92, time: '1 hour ago' },
                  ].map((lead, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">{lead.score}/100</Badge>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Features Grid */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Feature Set
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Instant Lead Delivery', desc: 'Leads appear in your dashboard within 30 seconds of submission' },
              { icon: Bell, title: 'WhatsApp Notifications', desc: 'Get instant alerts on WhatsApp for every new lead' },
              { icon: Shield, title: 'Quality Guarantee', desc: '7-day money-back on any invalid or poor-quality leads' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Track performance, ROI, and conversion rates' },
              { icon: Lock, title: 'Secure & Private', desc: 'Bank-level security with end-to-end encryption' },
              { icon: Globe, title: 'Multi-Location', desc: 'Target multiple cities and states simultaneously' },
              { icon: Users, title: 'Team Collaboration', desc: 'Add team members, assign leads, track performance' },
              { icon: TrendingUp, title: 'Smart Optimization', desc: 'AI continuously improves your campaigns' },
              { icon: Clock, title: '24/7 Support', desc: 'WhatsApp and phone support whenever you need it' }
            ].map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to 10X Your Lead Generation?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of businesses already generating qualified leads on autopilot
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8" asChild>
                <Link href="/onboarding">
                  Start Free Trial - No Credit Card Required
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}


