import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  ArrowRight,
  X,
  Zap,
  Shield,
  TrendingUp,
  Users,
  MessageCircle,
  BarChart3,
  Target,
  Clock,
  Home,
  Stethoscope,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function PilotOfferPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Logo size="md" />
              </Link>
              <Badge variant="outline" className="border-blue-600 text-blue-700 bg-blue-50">
                🇮🇳 India
              </Badge>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</Link>
              <Link href="/#pilot-offer" className="text-gray-700 hover:text-gray-900 font-medium">Pilot Offer</Link>
              <Link href="/#results" className="text-gray-700 hover:text-gray-900 font-medium">Results</Link>
              <Link href="/insights" className="text-gray-700 hover:text-gray-900 font-medium">Insights</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Get 30–50 Qualified Inquiries in 30 Days — Guaranteed.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed font-medium">
              AI-powered paid ads + human verification. Delivered directly to WhatsApp & dashboard.
            </p>

            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">10,000+ leads delivered</span>
              <span>•</span>
              <span className="font-semibold text-slate-900">90% verified</span>
              <span>•</span>
              <span className="font-semibold text-slate-900">Serving India</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
                <Link href="/onboarding">
                  Start the 30-Second Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book Free Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is The 30-Day Pilot? */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What Is The 30-Day Pilot?
            </h2>
            <p className="text-2xl text-slate-700 font-medium">
              A complete done-for-you system that delivers real leads.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              The 30-Day Pilot is our flagship offer: a complete AI-powered marketing system that runs paid ad campaigns, 
              verifies every inquiry, and delivers qualified leads directly to your WhatsApp and dashboard. No guesswork. 
              No excuses. Just real inquiries from real people actively searching for your services.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'AI-optimized campaigns on Google, Facebook & LinkedIn',
                'Human verification of every inquiry (phone + email)',
                'Real-time dashboard tracking all leads',
                'WhatsApp delivery for instant follow-up',
                'Weekly optimization and performance reports',
                'No lock-in, no contract, no hidden fees',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For / Not For */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Who This Is For
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* This Works Best For */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-green-900">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  This Works Best For:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Real Estate developers & builders',
                    'Hospitals & clinics',
                    'Education & coaching providers',
                    'B2B service companies',
                    'High-ticket local businesses',
                    'Startups & SaaS',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Not For */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-red-900">
                  <X className="h-6 w-6 text-red-600" />
                  Not For:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Low-ticket ₹499 product sellers',
                    'People without a sales process',
                    'Those unwilling to invest in ads',
                    'People expecting leads without follow-up',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How The Pilot Works (3 Steps) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How The Pilot Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple 3-step process from onboarding to lead delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Onboarding + Strategy",
                timeframe: "Day 1–2",
                description: "Complete the onboarding quiz. We analyze your business, target customers, and design your custom AI campaign strategy.",
                icon: Target,
                color: "bg-blue-600"
              },
              {
                step: 2,
                title: "Campaign Launch",
                timeframe: "Day 3–5",
                description: "We build and launch your AI-optimized paid ad campaigns across Google, Facebook, and LinkedIn. Campaigns go live within 48 hours.",
                icon: Zap,
                color: "bg-green-600"
              },
              {
                step: 3,
                title: "Lead Delivery",
                timeframe: "Day 5–30",
                description: "Verified inquiries start flowing to your dashboard and WhatsApp every week. All leads are human-verified before delivery.",
                icon: CheckCircle,
                color: "bg-purple-600"
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {item.step}
                      </div>
                      <Icon className={`h-8 w-8 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">{item.timeframe}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example Economics */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Example Economics
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real numbers from our 30-day pilot program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real Estate */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-700">Real Estate</Badge>
                </div>
                <CardTitle className="text-lg">Real Estate Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Investment:</p>
                    <p className="text-2xl font-bold text-slate-900">₹45,000</p>
                    <p className="text-xs text-slate-500">(all-inclusive pilot)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Output:</p>
                    <p className="text-xl font-bold text-green-600">40–60 verified property inquiries</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹700–₹1,100</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Sample Lead:</p>
                    <p className="text-xs text-slate-700">Priya Sharma, Mumbai</p>
                    <p className="text-xs text-slate-600">2BHK • ₹80L-₹1.2Cr • Next 30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                  <Badge className="bg-green-100 text-green-700">Healthcare</Badge>
                </div>
                <CardTitle className="text-lg">Healthcare Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Investment:</p>
                    <p className="text-2xl font-bold text-slate-900">₹35,000</p>
                    <p className="text-xs text-slate-500">(all-inclusive pilot)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Output:</p>
                    <p className="text-xl font-bold text-green-600">50–80 inquiries</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹450–₹700</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Sample Lead:</p>
                    <p className="text-xs text-slate-700">Rajesh Kumar, Bangalore</p>
                    <p className="text-xs text-slate-600">Orthopedic consultation • Urgent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-700">Education</Badge>
                </div>
                <CardTitle className="text-lg">Education Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Investment:</p>
                    <p className="text-2xl font-bold text-slate-900">₹30,000</p>
                    <p className="text-xs text-slate-500">(all-inclusive pilot)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Output:</p>
                    <p className="text-xl font-bold text-green-600">50–90 inquiries</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹350–₹600</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Sample Lead:</p>
                    <p className="text-xs text-slate-700">Amit Patel, Delhi</p>
                    <p className="text-xs text-slate-600">Digital marketing course • ₹25K-₹50K</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B2B */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                  <Badge className="bg-amber-100 text-amber-700">B2B</Badge>
                </div>
                <CardTitle className="text-lg">B2B Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Investment:</p>
                    <p className="text-2xl font-bold text-slate-900">₹55,000</p>
                    <p className="text-xs text-slate-500">(all-inclusive pilot)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Output:</p>
                    <p className="text-xl font-bold text-green-600">15–30 decision-maker inquiries</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost per inquiry:</p>
                    <p className="text-lg font-semibold text-slate-900">₹1,500–₹3,000</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Sample Lead:</p>
                    <p className="text-xs text-slate-700">Rajesh Mehta, CTO</p>
                    <p className="text-xs text-slate-600">SaaS solution • ₹5-10L/year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Guarantee */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Performance Guarantee
            </h2>
            <p className="text-2xl text-slate-700 font-medium mb-8">
              If we don't deliver, we work for free until we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'No excuses',
              'No algorithm blame',
              'No extra fees',
              '100% performance-based',
            ].map((item, idx) => (
              <Card key={idx} className="border-2 border-green-200 bg-green-50 text-center">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-slate-700">
              We guarantee 30–50 verified inquiries in 30 days. If we don't deliver, we keep working for free until we do. 
              You only pay for performance.
            </p>
          </div>
        </div>
      </section>

      {/* Value Stack — What You Get */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Value Stack — What You Get
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything included in the 30-day pilot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'AI-Optimized Campaigns',
                description: 'Professional paid ad campaigns on Google, Facebook, and LinkedIn, continuously optimized by AI for maximum performance.',
                icon: Zap,
              },
              {
                title: '3 Platform Coverage',
                description: 'We run campaigns across Google Ads, Facebook Ads, and LinkedIn Ads to reach your ideal customers wherever they are.',
                icon: Target,
              },
              {
                title: 'Human Verification',
                description: 'Every inquiry is verified by our team: active phone numbers, valid emails, confirmed business details, and verified intent.',
                icon: CheckCircle,
              },
              {
                title: 'WhatsApp Delivery',
                description: 'All verified inquiries are instantly delivered to your WhatsApp for immediate follow-up and response.',
                icon: MessageCircle,
              },
              {
                title: 'AI Dashboard',
                description: 'Real-time dashboard tracking all inquiries, campaign performance, cost per inquiry, and conversion metrics.',
                icon: BarChart3,
              },
              {
                title: 'Weekly Optimization',
                description: 'Our team reviews and optimizes your campaigns every week to improve performance and reduce cost per inquiry.',
                icon: TrendingUp,
              },
              {
                title: 'Dedicated Support',
                description: 'Get direct access to our team for questions, strategy adjustments, and campaign optimization throughout the pilot.',
                icon: Users,
              },
              {
                title: 'No Lock-In',
                description: 'No contracts, no commitments. You can cancel anytime. We only succeed when you get real, verified inquiries.',
                icon: Shield,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini Case Studies */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Real Results from Real Businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                industry: 'Real Estate',
                result: '60+ qualified inquiries in 30 days',
                location: 'Mumbai developer',
                icon: Home,
                color: 'bg-blue-600',
              },
              {
                industry: 'Healthcare',
                result: '72 patient inquiries generated',
                location: 'Clinic in Bangalore',
                icon: Stethoscope,
                color: 'bg-green-600',
              },
              {
                industry: 'B2B SaaS',
                result: '45 demo call inquiries',
                location: 'B2B tech company',
                icon: Briefcase,
                color: 'bg-purple-600',
              },
              {
                industry: 'Education',
                result: '120 student inquiries in one month',
                location: 'Delhi coaching center',
                icon: GraduationCap,
                color: 'bg-amber-600',
              },
            ].map((study, idx) => {
              const Icon = study.icon;
              return (
                <Card key={idx} className="border-2 border-slate-200 shadow-lg rounded-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${study.color} rounded-full flex items-center justify-center text-white shadow-md`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge className={`${study.color.replace('bg-', 'bg-')}100 ${study.color.replace('bg-', 'text-')}700`}>
                        {study.industry}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{study.result}</CardTitle>
                    <p className="text-sm text-slate-600 mt-2">{study.location}</p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objections Handled */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Objections Handled
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What if I don't get the minimum inquiries?",
                answer: "We work for free until we do. Our guarantee means we keep optimizing and running campaigns until you get 30–50 verified inquiries. No excuses, no extra fees.",
              },
              {
                question: "How do I know the inquiries are real?",
                answer: "Every inquiry is human-verified: we test phone numbers, validate emails, confirm business details, and verify intent from ad engagement. We don't deliver unverified leads.",
              },
              {
                question: "What if I'm not ready to invest that much?",
                answer: "The pilot is designed to be an all-inclusive investment. It includes ad spend, campaign management, verification, and dashboard access. Your exact investment will be shown after the onboarding quiz based on your business size and goals.",
              },
              {
                question: "Do I need to manage the campaigns myself?",
                answer: "No. This is completely done-for-you. We build, launch, optimize, and manage all campaigns. You just receive verified inquiries in your dashboard and WhatsApp.",
              },
              {
                question: "What happens after the 30 days?",
                answer: "If you're happy with results, you can continue with a monthly plan. If not, you can cancel with no obligations. The pilot is risk-free with our performance guarantee.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="border-2 border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.question}</h3>
                  <p className="text-slate-700 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block — Quiz */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See If You Qualify for the 30-Day Pilot
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Take our 30-second quiz to get your estimated inquiries and investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-6 font-semibold" asChild>
              <Link href="/onboarding">
                Start the 30-Second Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6" asChild>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Ready to Get Real Leads Instead of Excuses?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Start the onboarding quiz and see if you qualify for the 30-day pilot.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
            <Link href="/onboarding">
              Start the Onboarding Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © 2025 Transition Marketing AI. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">How It Works</Link>
              <Link href="/#pilot-offer" className="text-slate-400 hover:text-white transition-colors text-sm">Pilot Offer</Link>
              <Link href="/insights" className="text-slate-400 hover:text-white transition-colors text-sm">Insights</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

