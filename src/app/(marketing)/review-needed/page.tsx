import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

export default function ReviewNeededPage() {
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
          {/* Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              You're a Good Fit
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Most businesses like you invest ₹20k–₹40k for the 30-day pilot.
            </p>
            <p className="text-lg text-slate-700">
              Book your consultation to design your custom plan.
            </p>
          </div>

          {/* Explanation Card */}
          <Card className="border-2 border-blue-200 bg-blue-50 mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">What This Means:</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Based on your answers, you're a good fit for our AI-powered lead generation system. 
                Your estimated investment range reflects your business size and goals.
              </p>
              <p className="text-slate-700 leading-relaxed">
                During your consultation, we'll review your specific needs and create a customized 
                plan that matches your budget and growth goals. We'll show you exactly how many 
                verified inquiries you can expect and what your cost per inquiry will be.
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mb-8">
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

