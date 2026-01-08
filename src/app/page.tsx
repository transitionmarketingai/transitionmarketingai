import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import ComparisonTable from '@/components/marketing/comparison-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Target,
  Mail,
  Search,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* The Problem Section */}
        <ComparisonTable />

        {/* The Solution / Verification Engine */}
        <section id="process" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The AI Verification Engine™</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We don't just "run ads". We use a proprietary 5-step AI process to verified intent, identity, and ability to pay before you ever speak to a lead.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Content Agent -> Intent Scoring */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">1. AI Intent Scoring</CardTitle>
                      <Badge variant="secondary" className="text-xs">Step 1</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    We analyze thousands of data points to identify prospects who are actively looking for your solution right now.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Ads Agent -> Identity Validation */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">2. Identity Validation</CardTitle>
                      <Badge variant="secondary" className="text-xs">Step 2</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Our AI cross-references contact details with social profiles (LinkedIn, TrueCaller) to ensure every lead is a real person.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Email Agent -> Nurture & Qualify */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">3. Auto-Nurture</CardTitle>
                      <Badge variant="secondary" className="text-xs">Step 3</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    We engage leads immediately via SMS and Email to qualify their budget and timeline before passing them to you.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* SEO Agent -> Market Authority */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Search className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">4. Authority Positioning</CardTitle>
                      <Badge variant="secondary" className="text-xs">Step 4</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    We position your brand as the expert choice so prospects are pre-sold when they get on the call.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Analytics Agent -> Performance Loop */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">5. ROI Tracking</CardTitle>
                      <Badge variant="secondary" className="text-xs">Step 5</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    We track every dollar. If a lead doesn't turn into an opportunity, our system learns and adjusts instantly.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Delivery */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Verified Delivery</CardTitle>
                      <Badge variant="default" className="text-xs">The Result</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    You only get the leads that pass all 5 steps. Clean, verified, and ready to buy.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* What is Verified? */}
            <div className="bg-muted/50 rounded-xl p-8 mb-16 border border-border">
              <h3 className="text-2xl font-bold text-center mb-8">What exactly is a "Verified Lead"?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2">100% Valid Contact Info</h4>
                  <p className="text-muted-foreground text-sm">We ping the number and verify email deliverability. No more fake numbers.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2">High Intent Action</h4>
                  <p className="text-muted-foreground text-sm">They didn't just "click". They filled a form, answered qualifying questions, and requested information.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Replacements Guaranteed</h4>
                  <p className="text-muted-foreground text-sm">If a lead has a disconnect number, we replace it instantly. No questions asked.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="hover-glow hover-lift px-8">
                <Link href="#contact">
                  See If Your Area Is Available
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Industries We Specialize In</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI models are trained on millions of data points specific to these high-value sectors.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Real Estate', 'Healthcare & Clinics', 'B2B SaaS', 'Coaching & EdTech', 'Interior Design', 'Financial Services', 'Solar & Energy', 'Legal Services'].map((industry) => (
                <div key={industry} className="p-4 bg-muted/30 rounded-lg text-center font-medium border border-transparent hover:border-primary/20 transition-colors cursor-default">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works / Engagement Model */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How We Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                No complex software to learn. No long-term contracts. Just results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">1</div>
                <h3 className="text-xl font-bold mb-4">Audit & Strategy</h3>
                <p className="text-muted-foreground">We analyze your market and show you exactly how many verified leads are available right now.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">2</div>
                <h3 className="text-xl font-bold mb-4">Launch Verification</h3>
                <p className="text-muted-foreground">We deploy our AI agents. Campaigns go live in 7 days. We start filtering traffic immediately.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">3</div>
                <h3 className="text-xl font-bold mb-4">You Close Deals</h3>
                <p className="text-muted-foreground">You get notified instantly when a verified inquiry arrives. You just pick up the phone and close.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results / Social Proof Section (Simplified) */}
        <section id="results" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">What Our Clients Said After 30 Days</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="italic text-muted-foreground mb-4">"We stopped buying shared leads from aggregators. The inquiries from Transition are actually waiting for our call."</p>
                  <p className="font-bold">Real Estate Agency, Mumbai</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="italic text-muted-foreground mb-4">"35 verified patient inquiries in the first month. ROI was positive by week 3."</p>
                  <p className="font-bold">Dental Clinic, Bangalore</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="italic text-muted-foreground mb-4">"Finally an agency that doesn't talk about 'clicks'. They just sent me appointments."</p>
                  <p className="font-bold">B2B SaaS Founder, Delhi</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Fill Your Calendar?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
              Stop chasing cold leads. Let us deliver 30 verified inquiries in the next 30 days.
            </p>
            <div className="bg-white/10 p-8 rounded-lg max-w-lg mx-auto backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Get Your Free Marketing Scan</h3>
              <p className="text-sm mb-6 opacity-80">See how many verified leads are available in your area.</p>
              <div className="space-y-4">
                {/* Placeholder for form - linking to a demo lead capture for now */}
                <Button variant="secondary" size="lg" className="w-full text-lg font-bold h-12">
                  Check Availability Now
                </Button>
                <p className="text-xs opacity-60">No credit card required. Free analysis.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}