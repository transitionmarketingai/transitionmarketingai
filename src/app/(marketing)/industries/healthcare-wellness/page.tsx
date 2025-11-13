import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Stethoscope, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function HealthcareIndustryPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" href="/" />
            <Link href="/onboarding">
              <Button className="bg-blue-600 hover:bg-blue-700">Start Free Onboarding</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Verified Patient Inquiries for Clinics & Wellness Brands.
            </h1>
          </div>

          <Card className="border-2 border-slate-200 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <X className="h-6 w-6 text-red-600" />
                The Problem
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>Wrong phone numbers, low-intent inquiries, and people who can't afford treatment waste your staff's time. You're paying for ads but getting inquiries from people who aren't serious patients.</p>
                <p>Traditional marketing gives you leads, but no verification that those leads are real people ready to book appointments or consultations.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                How We Solve It
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>We create targeted campaigns on Google, Facebook, and health platforms. When someone shows interest in your clinic or wellness services, we verify their phone number, email, and intent manually before sending them to you.</p>
                <p>Every patient inquiry is verified by our team—we confirm they're real people with genuine interest in your services. No fake numbers, no wasted appointments.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Typical Cost</h2>
              <p className="text-3xl font-bold text-blue-600 mb-2">₹450–₹700 per verified inquiry</p>
              <p className="text-slate-600">Typical range: ₹35,000–₹50,000 (includes ad spend). Exact quote after onboarding.</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
              <Link href="/onboarding">
                Start Free Onboarding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

