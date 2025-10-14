'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  MapPin,
  IndianRupee,
  Clock,
  Star,
  BarChart3,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function RealEstateIndustryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/onboarding">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
                <Home className="h-3 w-3 mr-1" />
                For Real Estate Professionals
              </Badge>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get 50+ Verified Home Buyers
                <span className="block text-blue-600">
                  Every Month
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Stop chasing cold leads. We deliver qualified home buyers directly to your dashboard - 
                verified budget, timeline, and location preferences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8" asChild>
                  <Link href="/onboarding">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2" asChild>
                  <Link href="/login?demo=true">View Demo</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: '45-60 Leads/Month' },
                  { icon: IndianRupee, label: 'Avg CPL: ₹280' },
                  { icon: Target, label: '75% Quality Score' },
                  { icon: TrendingUp, label: '12% Conversion' }
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <h3 className="text-lg font-semibold mb-2">Today's Leads</h3>
                <p className="text-3xl font-bold">12 New Buyers</p>
                <p className="text-sm text-blue-100">Average quality: 82/100</p>
              </div>

              <div className="p-6 space-y-3">
                {[
                  { 
                    name: 'Rajesh Kumar', 
                    score: 92, 
                    budget: '₹80L-₹1Cr',
                    area: 'Andheri, Mumbai',
                    bhk: '2BHK',
                    timeline: 'Next 30 days'
                  },
                  { 
                    name: 'Priya Sharma', 
                    score: 88, 
                    budget: '₹1-1.5Cr',
                    area: 'Powai, Mumbai',
                    bhk: '3BHK',
                    timeline: 'Next 3 months'
                  },
                  { 
                    name: 'Amit Patel', 
                    score: 85, 
                    budget: '₹60-80L',
                    area: 'Thane West',
                    bhk: '2BHK',
                    timeline: 'Immediate'
                  },
                ].map((lead, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{lead.name}</h4>
                        <p className="text-sm text-gray-500">{lead.bhk} • {lead.budget}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-500">{lead.score}/100</Badge>
                        {lead.score >= 90 && <Badge className="bg-red-500">🔥</Badge>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {lead.area}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lead.timeline}
                      </div>
                    </div>
                    <Button size="sm" className="w-full">Contact via WhatsApp</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works for Real Estate */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Process</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works for Real Estate Agents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Tell Us Your Niche',
                description: 'Residential or commercial? Which areas? What budget range? New or resale?',
                icon: Target
              },
              {
                step: '2',
                title: 'We Create Ads',
                description: 'Professional Facebook and Google ads targeting home buyers in your area.',
                icon: BarChart3
              },
              {
                step: '3',
                title: 'Get Verified Buyers',
                description: 'AI filters out tire-kickers. Only serious buyers with verified budgets.',
                icon: Users
              },
              {
                step: '4',
                title: 'Close More Deals',
                description: 'Contact via WhatsApp, schedule site visits, close deals faster.',
                icon: TrendingUp
              }
            ].map((item, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start gap-6">
                <div className="text-6xl">👨‍💼</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 italic mb-4">
                    "In my first month, I got 58 leads. 12 scheduled site visits. Closed 2 deals worth ₹1.8 Crore. 
                    This platform paid for itself 100x over. Best investment I've made for my business."
                  </p>
                  <div>
                    <p className="font-bold text-gray-900">Rajesh Mehta</p>
                    <p className="text-sm text-gray-600">Independent Real Estate Agent, Mumbai</p>
                    <p className="text-sm text-gray-500 mt-1">Member since Jan 2025 • Closed 5 deals • ₹4.2Cr revenue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Stats */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Real Results from Real Estate Agents
            </h2>
            <p className="text-xl text-blue-100">
              Data from 150+ real estate professionals using our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">52</p>
              <p className="text-blue-100">Avg Leads/Month</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">₹287</p>
              <p className="text-blue-100">Avg Cost/Lead</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">12%</p>
              <p className="text-blue-100">Conversion Rate</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">5.2x</p>
              <p className="text-blue-100">Return on Investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Real Estate */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built Specifically for Real Estate
            </h2>
            <p className="text-xl text-gray-600">
              Features designed for property sales and rental businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Budget-Qualified Leads',
                description: 'Every lead includes verified budget range. No time wasters.',
                icon: IndianRupee
              },
              {
                title: 'Location Targeting',
                description: 'Hyper-local targeting. Get buyers looking in your exact service areas.',
                icon: MapPin
              },
              {
                title: 'Timeline Filtering',
                description: 'Know if they\'re buying now, in 3 months, or just exploring.',
                icon: Clock
              },
              {
                title: 'BHK Preferences',
                description: 'Match leads to your listings. 1BHK, 2BHK, 3BHK, or commercial.',
                icon: Home
              },
              {
                title: 'Site Visit Scheduling',
                description: 'Built-in calendar to schedule property viewings directly.',
                icon: CheckCircle
              },
              {
                title: 'Deal Tracking',
                description: 'Track from lead to site visit to closure. Complete CRM.',
                icon: BarChart3
              }
            ].map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Example */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Example Lead You'll Receive
            </h2>
            <p className="text-xl text-gray-600">
              Here's what a typical lead looks like in your dashboard
            </p>
          </div>

          <Card className="shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <Badge className="bg-white text-blue-600 mb-2">New Lead</Badge>
                  <h3 className="text-2xl font-bold">Rajesh Kumar</h3>
                  <p className="text-blue-100">Received 5 minutes ago</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-100">Quality Score</p>
                  <p className="text-4xl font-bold">92/100</p>
                  <Badge className="bg-red-500 mt-2">🔥 Hot Lead</Badge>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+91-98765-43210</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">rajesh.kumar@gmail.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">Andheri West, Mumbai</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Requirements</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-medium">2BHK Apartment</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">₹80 Lakhs - ₹1 Crore</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Timeline</p>
                      <Badge className="bg-green-500">Next 30 days</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Areas</p>
                      <p className="font-medium">Andheri, Goregaon, Malad</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">🎯 Why This is a Hot Lead:</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>✓ Budget verified and matches your listings</li>
                  <li>✓ Urgent timeline (ready to buy in 30 days)</li>
                  <li>✓ Located in your service area</li>
                  <li>✓ First-time buyer (highly motivated)</li>
                  <li>✓ Financing pre-approved</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button className="flex-1 bg-blue-600">
                  WhatsApp
                </Button>
                <Button className="flex-1" variant="outline">
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing for Real Estate */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Estate Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Plans designed for real estate professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Solo Agent',
                price: '14,999',
                leads: '40-50',
                desc: 'Perfect for individual agents',
                ideal: 'For agents closing 2-3 deals/month'
              },
              {
                name: 'Agency Team',
                price: '29,999',
                leads: '100-120',
                popular: true,
                desc: 'Best for small agencies',
                ideal: 'For teams of 3-5 agents'
              },
              {
                name: 'Developer',
                price: 'Custom',
                leads: '200+',
                desc: 'For large developers',
                ideal: 'For projects and bulk requirements'
              }
            ].map((plan, idx) => (
              <Card key={idx} className={plan.popular ? 'border-2 border-blue-500 shadow-xl' : ''}>
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    ⭐ Most Popular
                  </div>
                )}
                <CardContent className="pt-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.desc}</p>
                  <div className="text-4xl font-bold mb-1">
                    {plan.price === 'Custom' ? 'Custom' : `₹${parseInt(plan.price).toLocaleString('en-IN')}`}
                  </div>
                  {plan.price !== 'Custom' && <p className="text-gray-500 mb-4">/month</p>}
                  <p className="text-lg font-semibold text-blue-600 mb-4">{plan.leads} leads/month</p>
                  <p className="text-sm text-gray-600 mb-6 italic">{plan.ideal}</p>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                    <Link href="/onboarding">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              All plans include 7-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600">
              See how much you could earn with our leads
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Monthly Investment</p>
                  <p className="text-3xl font-bold text-blue-600">₹14,999</p>
                  <p className="text-xs text-gray-500 mt-1">Growth Plan</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Leads Received</p>
                  <p className="text-3xl font-bold text-purple-600">50</p>
                  <p className="text-xs text-gray-500 mt-1">Qualified buyers</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Expected Closures</p>
                  <p className="text-3xl font-bold text-green-600">6</p>
                  <p className="text-xs text-gray-500 mt-1">At 12% conversion</p>
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-2">Potential Commission Earned</p>
                <p className="text-5xl font-bold text-green-600 mb-2">₹3,60,000</p>
                <p className="text-sm text-gray-600">
                  (6 deals × ₹60,000 avg commission)
                </p>
                <div className="mt-6 pt-6 border-t border-green-200">
                  <p className="text-lg font-bold text-gray-900">ROI: 24x</p>
                  <p className="text-sm text-gray-600">For every ₹1 invested, earn ₹24</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Start Getting More Buyers Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 150+ real estate professionals already closing more deals
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-12" asChild>
            <Link href="/onboarding">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            7 days free • Setup in 5 minutes • First leads within 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}

