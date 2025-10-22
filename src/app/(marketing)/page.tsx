'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Bot className="h-3 w-3 mr-1" />
              Your AI Marketing Team
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              AI Finds 500 Prospects Monthly.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Writes Every Email. Books Meetings.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Your entire lead generation runs on autopilot. AI discovers ideal prospects daily, 
              writes personalized outreach, handles follow-ups, and delivers qualified meetings.
              <strong className="text-gray-900"> Get your first 50 prospects in 24 hours.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-10 py-6" asChild>
                <Link href="/signup">
                  Start 14-Day Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2" asChild>
                <Link href="/login?demo=true">
                  View Live Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>100% Automated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>No Setup Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1,000+</div>
              <div className="text-blue-100">Contacts Generated/Month</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Verified Leads/Month</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">18%</div>
              <div className="text-blue-100">Average Response Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Working For You</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Automation in 3 Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Set up once, then our AI does all the work. No manual effort required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="relative border-2 hover:shadow-xl transition-shadow">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <CardHeader className="pt-10">
                <Bot className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">AI Scrapes The Web</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our AI automatically searches Google Maps, directories, and LinkedIn for potential customers in your industry and location.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>100-500 contacts found daily</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>AI quality scores each contact</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Saved to your Contacts database</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative border-2 hover:shadow-xl transition-shadow">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <CardHeader className="pt-10">
                <Send className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Bulk Outreach Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automatically sends personalized WhatsApp & Email messages to contacts. When they respond, they're instantly converted to verified leads.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>WhatsApp + Email campaigns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Personalized for each contact</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Auto-converts responses to leads</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative border-2 hover:shadow-xl transition-shadow">
              <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <CardHeader className="pt-10">
                <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Chat & Close Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Verified leads appear in your dashboard with chat conversations ready. Plus, Facebook & Google ad leads come in 24/7.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Real-time chat with all leads</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Meta & Google Ads integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Segregated by source</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview with Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Complete Lead Generation Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to generate, qualify, and convert leads - all automated
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

      {/* Lead Sources */}
      <section className="py-24 px-4">
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

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <Card className="relative">
              <CardHeader className="text-center pt-8 pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Starter</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">₹4,999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <div className="bg-gray-100 rounded py-3 px-4">
                  <p className="text-sm text-gray-600">500 Contacts + 25 Leads</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">500 AI-scraped contacts/month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">1,000 outreach messages</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">₹5,000 ad credits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">WhatsApp + Email</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional - Most Popular */}
            <Card className="relative border-2 border-blue-600 shadow-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pt-8 pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Professional</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">₹9,999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <div className="bg-blue-50 rounded py-3 px-4">
                  <p className="text-sm text-blue-600 font-medium">2,000 Contacts + 50 Leads</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">2,000 AI-scraped contacts/month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">5,000 outreach messages</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">₹15,000 ad credits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Advanced AI scoring</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="relative">
              <CardHeader className="text-center pt-8 pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">₹24,999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <div className="bg-gray-100 rounded py-3 px-4">
                  <p className="text-sm text-gray-600">Unlimited Contacts + 150 Leads</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Unlimited AI-scraped contacts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Unlimited outreach</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">₹50,000 ad credits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Dedicated account manager</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Custom AI models</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Automate Your Lead Generation?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Start your 14-day free trial. No credit card required. Set up in 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-blue-700 text-lg px-10 py-6" asChild>
              <Link href="/login?demo=true">
                View Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" className="text-white mb-4" />
              <p className="text-sm">
                India's most advanced automated lead generation platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/login?demo=true" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li className="text-sm">support@transitionmarketingai.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 Transition Marketing AI. All rights reserved. Made in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

