'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  CheckCircle,
  Send,
  ArrowRight,
  MapPin,
  Users,
  Facebook,
  Chrome,
  TrendingUp,
  Phone,
  Mail,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Client Login</Link>
            </Button>
            <Button asChild>
              <Link href="/consultation">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How We Find & Verify Your Leads
          </h1>
          <p className="text-xl text-slate-600">
            A detailed look at our multi-channel lead generation and verification process
          </p>
        </div>
      </section>

      {/* Lead Sources Detail */}
      <section id="sources" className="py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Where We Source Your Leads
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We use multiple channels to find leads, then verify each one before delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Google Maps */}
            <Card>
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle>Google Maps & Directories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  AI-powered scraping of local business listings from Google Maps, Justdial, and industry-specific directories.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Location-based search by industry keywords</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Phone format validation & active status check</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Manual spot-call verification (90%+ active)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn */}
            <Card>
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle>LinkedIn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Automated search by job title, company, industry filters, and location across LinkedIn company pages and profiles.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Email pattern matching & domain verification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Deliverability testing (95%+ valid)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>ICP-based quality scoring</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facebook Ads */}
            <Card>
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Facebook className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle>Facebook & Instagram Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Targeted campaigns with lead capture forms for high-intent prospects on Facebook and Instagram.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Auto-verified via form submission</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Cross-reference validation & duplicate check</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>100% verified (direct inquiry)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Ads */}
            <Card>
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Chrome className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle>Google Search Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Paid search campaigns targeting active searchers with landing page forms and lead generation.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Form submission → Email validation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Phone format check & intent scoring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>100% verified (high intent)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry Directories */}
            <Card>
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle>Industry Directories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Sector-specific platforms like TradeIndia, IndiaMART scraped for B2B contacts matching your ICP.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Data extraction & contact deduplication</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Phone + email verification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Quality scoring (85%+ match)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section id="verification" className="py-16 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How We Verify Quality
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every lead goes through rigorous verification before it reaches your dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Phone Verification</h3>
              <p className="text-sm text-slate-600">
                We test every phone number to confirm it's active and reachable. 90%+ of our leads have verified active phone numbers.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Email Validation</h3>
              <p className="text-sm text-slate-600">
                All email addresses are tested for deliverability and validity. 95%+ of emails are confirmed deliverable.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Quality Scoring</h3>
              <p className="text-sm text-slate-600">
                Each lead is scored 0-100 based on ICP match, business details, and verification status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Request a free consultation to see how we can generate verified leads for your business
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/consultation">
              Request Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

