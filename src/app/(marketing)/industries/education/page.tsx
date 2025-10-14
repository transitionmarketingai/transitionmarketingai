'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  BookOpen,
  IndianRupee,
  Clock,
  Star,
  BarChart3,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function EducationIndustryPage() {
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
                <GraduationCap className="h-3 w-3 mr-1" />
                For Coaching Institutes & Edtech
              </Badge>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get 80+ Serious Students
                <span className="block text-blue-600">
                  Every Month
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                No more empty classrooms. We deliver motivated students directly to your dashboard - 
                verified course interest, exam dates, and budget confirmed.
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
                  { icon: Users, label: '70-90 Leads/Month' },
                  { icon: IndianRupee, label: 'Avg CPL: ₹150' },
                  { icon: Target, label: '82% Quality Score' },
                  { icon: TrendingUp, label: '18% Enrollment' }
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
                <p className="text-3xl font-bold">18 New Students</p>
                <p className="text-sm text-blue-100">Average quality: 88/100</p>
              </div>

              <div className="p-6 space-y-3 bg-gray-50">
                {[
                  { 
                    name: 'Arjun Mehta', 
                    course: 'JEE Coaching',
                    exam: 'JEE 2025',
                    budget: '₹60K-80K',
                    score: 95,
                    urgent: true
                  },
                  { 
                    name: 'Sanya Gupta', 
                    course: 'CA Foundation',
                    exam: 'Nov 2024',
                    budget: '₹40K-50K',
                    score: 90,
                    urgent: true
                  },
                  { 
                    name: 'Rohan Singh', 
                    course: 'NEET Coaching',
                    exam: 'NEET 2025',
                    budget: '₹70K-90K',
                    score: 87,
                    urgent: false
                  }
                ].map((lead, idx) => (
                  <div key={idx} className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {lead.name}
                          {lead.urgent && <Badge className="bg-red-500 text-xs">Urgent</Badge>}
                        </h4>
                        <p className="text-sm text-gray-600">{lead.course}</p>
                        <p className="text-xs text-gray-500">{lead.exam} • {lead.budget}</p>
                      </div>
                      <Badge className="bg-blue-600">{lead.score}/100</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">2 mins ago</span>
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
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Coaching Centers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12,000+</div>
              <div className="text-blue-100">Students Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹150</div>
              <div className="text-blue-100">Avg Cost Per Lead</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">18%</div>
              <div className="text-blue-100">Avg Enrollment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Every Type of Course
            </h2>
            <p className="text-xl text-gray-600">
              Motivated students for all educational programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'JEE / NEET Coaching', desc: 'Engineering & Medical entrance prep', leads: '30-40/month' },
              { icon: BookOpen, title: 'CA / CS Coaching', desc: 'Foundation, Intermediate, Final', leads: '25-35/month' },
              { icon: BookOpen, title: 'IAS / UPSC Coaching', desc: 'Civil services exam preparation', leads: '15-20/month' },
              { icon: BookOpen, title: 'MBA Entrance (CAT)', desc: 'CAT, XAT, SNAP, NMAT prep', leads: '20-25/month' },
              { icon: BookOpen, title: 'Skill Development', desc: 'Digital Marketing, Coding, Design', leads: '35-45/month' },
              { icon: BookOpen, title: 'Language Courses', desc: 'English, IELTS, German, French', leads: '25-30/month' }
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
              How Student Lead Generation Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to fill your coaching center
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Define Your Courses',
                desc: 'Choose courses (JEE, CA, NEET, etc.), batch timings, fee structure, and target student demographics'
              },
              {
                step: '2',
                title: 'We Run Targeted Ads',
                desc: 'Our team creates Facebook & Google ads targeting students actively searching for coaching'
              },
              {
                step: '3',
                title: 'Get Verified Students',
                desc: 'Receive prospects with verified course interest, exam dates, education level, and budget'
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
              Education-Specific Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Plans designed for coaching institutes & edtech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Single Center',
                price: '7,999',
                leads: '40',
                features: ['40 qualified leads/month', 'All course types', 'WhatsApp notifications', 'Email support']
              },
              {
                name: 'Growing Institute',
                price: '14,999',
                leads: '90',
                popular: true,
                features: ['90 qualified leads/month', 'Multi-location support', 'Batch-wise filtering', 'Priority support', 'Counselor training']
              },
              {
                name: 'Large Franchise',
                price: '27,999',
                leads: '200',
                features: ['200+ qualified leads/month', 'Enterprise dashboard', 'Custom integrations', 'Dedicated manager', '24/7 support']
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
            Ready to Fill Your Coaching Center?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 200+ institutes getting motivated students daily
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

