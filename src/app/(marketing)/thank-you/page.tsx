'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { trackCalendlyBooking } from '@/lib/tracking';

export default function ThankYouPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  const handleCalendlyEvent = () => {
    trackCalendlyBooking();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200/80 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Logo size="md" href="/" className="hover:opacity-90 transition-opacity" />
            <Link href="/">
              <Button variant="outline" className="text-sm">Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-28 md:pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-200 bg-green-50/50 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                We're Preparing Your Custom AI Marketing Report
              </h1>
              
              <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                You'll receive your proposal within 24 hours.
              </p>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Meanwhile, confirm your call below.
              </p>

              <div className="bg-white rounded-lg p-6 mb-8 border border-slate-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">Schedule Your Strategy Call</h3>
                </div>
                <p className="text-slate-600 mb-4 text-sm">
                  Choose a time that works for you. We'll send your personalized proposal before the call.
                </p>
              </div>

              {/* Calendly Embed */}
              <div className="mb-8 rounded-lg overflow-hidden border-2 border-slate-200 bg-white">
                <CalendlyEmbed
                  url={calendlyUrl}
                  onEventScheduled={handleCalendlyEvent}
                  height={700}
                />
              </div>

              <div className="bg-white rounded-lg p-6 mb-8 border border-slate-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">What's Next?</h3>
                </div>
                <ul className="text-left space-y-2 text-slate-700 max-w-md mx-auto">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>We'll review your qualification details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Our team will craft your custom campaign strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>You'll receive a detailed proposal via email within 24 hours</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/">
                    Back to Home
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
