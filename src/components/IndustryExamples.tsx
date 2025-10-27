'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Heart,
  Briefcase,
  ShoppingBag,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    icon: Building2,
    title: 'Real Estate Developers',
    challenge: 'Finding serious property buyers in Mumbai, Pune & Bangalore',
    color: 'blue',
    results: {
      leadsPerMonth: 50,
      avgBudget: '₹80L - ₹1.2Cr',
      conversionRate: '12%',
    },
    exampleLead: {
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      budget: '₹80L - ₹1.2Cr',
      need: '2-3 BHK in Powai/Vikhroli',
      phone: '+91 98765 43210',
      intent: 'High (searched 5 times this week)',
    },
    howWeHelp: [
      'AI scrapes property search websites and forums',
      'Identifies people actively searching in your area',
      'Verifies phone numbers and email addresses',
      'Delivers 50+ qualified leads every month',
    ],
  },
  {
    icon: Heart,
    title: 'Healthcare Providers',
    challenge: 'Attracting patients for specialized treatments',
    color: 'red',
    results: {
      leadsPerMonth: 75,
      avgBudget: '₹5,000 - ₹50,000',
      conversionRate: '25%',
    },
    exampleLead: {
      name: 'Rajesh Kumar',
      location: 'Bangalore, Karnataka',
      budget: '₹10,000 - ₹25,000',
      need: 'Orthopedic consultation for knee pain',
      phone: '+91 98765 43211',
      intent: 'Urgent (called 2 other clinics)',
    },
    howWeHelp: [
      'Target people searching for your services',
      'Local SEO + Google Ads + Social Media',
      'Deliver verified patient inquiries',
      'Book appointments directly to your calendar',
    ],
  },
  {
    icon: Briefcase,
    title: 'B2B Services',
    challenge: 'Finding decision-makers in target companies',
    color: 'purple',
    results: {
      leadsPerMonth: 40,
      avgBudget: '₹50,000 - ₹5L',
      conversionRate: '15%',
    },
    exampleLead: {
      name: 'Amit Patel (CTO)',
      location: 'Bangalore, Karnataka',
      budget: '₹2L - ₹5L',
      need: 'Cloud migration services',
      phone: 'amit.patel@techcorp.in',
      intent: 'High (downloaded whitepaper)',
    },
    howWeHelp: [
      'LinkedIn scraping + Email verification',
      'Target by job title, company size, industry',
      'Personalized outreach campaigns',
      'Direct contact with decision-makers',
    ],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Brands',
    challenge: 'Finding bulk buyers and distributors',
    color: 'green',
    results: {
      leadsPerMonth: 60,
      avgBudget: '₹1L - ₹10L',
      conversionRate: '10%',
    },
    exampleLead: {
      name: 'Suresh Enterprises',
      location: 'Delhi NCR',
      budget: '₹5L - ₹10L',
      need: 'Electronics wholesale supplier',
      phone: '+91 98765 43213',
      intent: 'High (requested product catalog)',
    },
    howWeHelp: [
      'Identify retailers looking for suppliers',
      'Target by order volume and location',
      'Deliver verified business contacts',
      'Connect you with bulk buyers',
    ],
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      icon: 'text-blue-600 bg-blue-100',
      badge: 'bg-blue-600',
      card: 'border-blue-200 bg-blue-50',
    },
    red: {
      icon: 'text-red-600 bg-red-100',
      badge: 'bg-red-600',
      card: 'border-red-200 bg-red-50',
    },
    purple: {
      icon: 'text-purple-600 bg-purple-100',
      badge: 'bg-purple-600',
      card: 'border-purple-200 bg-purple-50',
    },
    green: {
      icon: 'text-green-600 bg-green-100',
      badge: 'bg-green-600',
      card: 'border-green-200 bg-green-50',
    },
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export default function IndustryExamples() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            Industry-Specific Solutions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Proven Success Across
            <br />
            <span className="text-blue-600">
              Multiple Industries
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how we help businesses like yours generate qualified leads every month
          </p>
        </div>

        {/* Industry Cards */}
        <div className="space-y-16">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const colors = getColorClasses(industry.color);
            
            return (
              <Card key={index} className={`border-2 ${colors.card} overflow-hidden`}>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Left Column - Industry Info */}
                    <div className="p-8 lg:p-12">
                      <div className={`w-16 h-16 rounded-xl ${colors.icon} flex items-center justify-center mb-6`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-slate-900 mb-4">
                        {industry.title}
                      </h3>
                      
                      <div className="mb-6">
                        <p className="text-slate-600 font-medium mb-2">Challenge:</p>
                        <p className="text-lg text-slate-800">{industry.challenge}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <div className="text-2xl font-bold text-slate-900">{industry.results.leadsPerMonth}</div>
                          <div className="text-xs text-slate-600">Leads/Month</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <div className="text-xl font-bold text-slate-900">{industry.results.avgBudget}</div>
                          <div className="text-xs text-slate-600">Avg Budget</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                          <div className="text-2xl font-bold text-green-600">{industry.results.conversionRate}</div>
                          <div className="text-xs text-slate-600">Conversion</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8">
                        <p className="font-semibold text-slate-900 mb-4">How We Help:</p>
                        {industry.howWeHelp.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{point}</span>
                          </div>
                        ))}
                      </div>

                      <Button className={`${colors.badge} hover:opacity-90 w-full`} asChild>
                        <Link href="/consultation">
                          Get Started for {industry.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Right Column - Example Lead */}
                    <div className="bg-white p-8 lg:p-12 border-l border-slate-200">
                      <div className="mb-6">
                        <Badge className="mb-4" variant="outline">Example Lead</Badge>
                        <h4 className="text-2xl font-bold text-slate-900 mb-6">
                          What You'll Receive
                        </h4>
                      </div>

                      <Card className="border-2 border-slate-200 bg-slate-50">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                            <div>
                              <p className="text-lg font-bold text-slate-900">{industry.exampleLead.name}</p>
                              <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {industry.exampleLead.location}
                              </p>
                            </div>
                            <Badge className={colors.badge}>Verified</Badge>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-600">Budget Range:</p>
                            <p className="text-slate-900 font-semibold">{industry.exampleLead.budget}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-600">Looking For:</p>
                            <p className="text-slate-900 font-semibold">{industry.exampleLead.need}</p>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-700">{industry.exampleLead.phone}</span>
                              <Badge variant="outline" className="ml-auto text-xs">✓ Verified</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <TrendingUp className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-700">Intent: <strong>{industry.exampleLead.intent}</strong></span>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Ready to Contact
                              </p>
                              <p className="text-xs text-green-700 mt-1">
                                Phone verified • Email validated • Intent confirmed
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <p className="text-sm text-slate-600 mt-6 italic">
                        * This is a sample lead format. All leads include verified contact details and intent signals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Don't See Your Industry?
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                We work with businesses across 20+ industries. Book a free consultation to discuss your specific needs.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4" asChild>
                <Link href="/consultation">
                  Request Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

