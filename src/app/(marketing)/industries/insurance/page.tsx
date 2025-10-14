'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  Heart,
  IndianRupee,
  Clock,
  Star,
  BarChart3,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function InsuranceIndustryPage() {
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
                <Shield className="h-3 w-3 mr-1" />
                For Insurance Agents & Brokers
              </Badge>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get 60+ Verified Insurance Leads
                <span className="block text-blue-600">
                  Every Month
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Stop wasting time on cold calls. We deliver qualified insurance prospects directly to your dashboard - 
                verified coverage needs, budget, and family details.
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
                  { icon: Users, label: '50-70 Leads/Month' },
                  { icon: IndianRupee, label: 'Avg CPL: ₹220' },
                  { icon: Target, label: '80% Quality Score' },
                  { icon: TrendingUp, label: '15% Conversion' }
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
                <p className="text-3xl font-bold">15 New Prospects</p>
                <p className="text-sm text-blue-100">Average quality: 85/100</p>
              </div>

              <div className="p-6 space-y-3 bg-gray-50">
                {[
                  { 
                    name: 'Priya Sharma', 
                    type: 'Health Insurance',
                    budget: '₹15K-20K/year',
                    coverage: '₹10L family',
                    score: 92,
                    urgent: true
                  },
                  { 
                    name: 'Amit Patel', 
                    type: 'Term Life Insurance',
                    budget: '₹25K-35K/year',
                    coverage: '₹1Cr cover',
                    score: 88,
                    urgent: false
                  },
                  { 
                    name: 'Neha Reddy', 
                    type: 'Car Insurance',
                    budget: '₹8K-12K/year',
                    coverage: 'Comprehensive',
                    score: 85,
                    urgent: true
                  }
                ].map((lead, idx) => (
                  <div key={idx} className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {lead.name}
                          {lead.urgent && <Badge className="bg-red-500 text-xs">Urgent</Badge>}
                        </h4>
                        <p className="text-sm text-gray-600">{lead.type}</p>
                        <p className="text-xs text-gray-500">{lead.coverage} • {lead.budget}</p>
                      </div>
                      <Badge className="bg-blue-600">{lead.score}/100</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">Just now</span>
                      <Button size="sm" className="h-7 bg-blue-600 hover:bg-blue-700">
                        <Phone className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Insurance Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8,500+</div>
              <div className="text-blue-100">Leads Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹220</div>
              <div className="text-blue-100">Avg Cost Per Lead</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-blue-100">Avg Conversion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Every Type of Insurance Lead
            </h2>
            <p className="text-xl text-gray-600">
              Qualified prospects for all insurance products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Health Insurance', desc: '₹10L-₹50L coverage • Family & Individual plans', leads: '25-30/month' },
              { icon: Shield, title: 'Term Life Insurance', desc: '₹50L-₹2Cr coverage • 20-30 year terms', leads: '15-20/month' },
              { icon: Shield, title: 'Car Insurance', desc: 'Comprehensive & Third-party • New & renewal', leads: '20-25/month' },
              { icon: Shield, title: 'Home Insurance', desc: 'Property protection • ₹20L-₹1Cr coverage', leads: '8-12/month' },
              { icon: Shield, title: 'Travel Insurance', desc: 'Domestic & International • Family & Solo', leads: '10-15/month' },
              { icon: Shield, title: 'Business Insurance', desc: 'SME & Corporate policies • Customized plans', leads: '5-10/month' }
            ].map((type, idx) => (
              <Card key={idx} className="border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded bg-blue-50 flex items-center justify-center mb-4">
                    <type.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{type.desc}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-gray-900">{type.leads}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Insurance Lead Generation Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start getting qualified prospects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Define Your Target',
                desc: 'Choose insurance types (Health, Life, Car, etc.), coverage ranges, and customer demographics'
              },
              {
                step: '2',
                title: 'We Run Targeted Ads',
                desc: 'Our team creates Facebook & Google ads targeting people actively searching for insurance'
              },
              {
                step: '3',
                title: 'Get Verified Leads',
                desc: 'Receive prospects with verified needs, budget, family size, and coverage requirements'
              }
            ].map((item, idx) => (
              <Card key={idx} className="border text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 rounded bg-blue-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Insurance-Specific Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Plans designed for insurance agents & brokers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Solo Agent',
                price: '9,999',
                leads: '30',
                features: ['30 qualified leads/month', 'Health + Life + Car leads', 'WhatsApp notifications', 'Email support']
              },
              {
                name: 'Team Plan',
                price: '18,999',
                leads: '70',
                popular: true,
                features: ['70 qualified leads/month', 'All insurance types', 'Multi-user access', 'Priority support', 'CRM integration']
              },
              {
                name: 'Agency',
                price: '35,999',
                leads: '150',
                features: ['150+ qualified leads/month', 'Custom lead filters', 'API access', 'Dedicated manager', '24/7 support']
              }
            ].map((plan, idx) => (
              <Card key={idx} className={`relative ${plan.popular ? 'border-2 border-blue-600 shadow-xl' : 'border'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                
                <CardContent className="pt-8 pb-6 text-center">
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-6">{plan.leads} Leads</p>
                  
                  <Button 
                    className={`w-full mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link href="/onboarding">Start Free Trial</Link>
                  </Button>

                  <div className="space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get More Insurance Clients?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 150+ agents generating qualified insurance leads daily
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-12" asChild>
              <Link href="/onboarding">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 text-lg px-8" asChild>
              <Link href="/login?demo=true">View Demo</Link>
            </Button>
          </div>
          <p className="text-blue-100 mt-6">
            7 days free • No credit card • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/">
            <Logo size="md" className="mx-auto mb-4" />
          </Link>
          <p className="text-sm text-gray-600">
            © 2024 Transition Marketing AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

