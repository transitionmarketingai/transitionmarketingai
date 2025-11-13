import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

export default function QualifiedPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Link href="/" className="text-slate-600 hover:text-slate-900">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              You're Qualified!
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Great news! You qualify for our 30-day pilot program.
            </p>
            <p className="text-2xl font-bold text-blue-600">
              Your estimated investment: ₹35k–₹55k (including ads)
            </p>
          </div>

          {/* Benefits Card */}
          <Card className="border-2 border-green-200 bg-green-50 mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">What You Get:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">30–50 inquiries in 30 days guaranteed</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">AI-optimized paid ad campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Lead verification (phone + email)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">WhatsApp delivery + AI dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Weekly optimization and reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">No lock-in, no contract</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mb-8">
            <p className="text-lg text-slate-600 mb-6">
              Book your consultation below to get your exact plan.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Calendly Embed */}
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6">
              <CalendlyEmbed className="rounded-lg" height={700} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

