import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, GraduationCap, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function EducationIndustryPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
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
              Student Enquiries That Convert — Verified Before You Call.
            </h1>
          </div>

          <Card className="border-2 border-slate-200 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <X className="h-6 w-6 text-red-600" />
                The Problem
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>Irrelevant leads waste your counselors' time. You're calling students who aren't interested in your courses, or parents who can't afford your fees. Your team spends hours on follow-ups that go nowhere.</p>
                <p>Traditional student lead generation gives you contact lists, but no way to verify which students actually want to enroll in your courses right now.</p>
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
                <p>We run targeted ads on Google, Facebook, and education platforms. When students or parents click your ad, we verify their interest, course preference, and enrollment timeline before delivering them to you.</p>
                <p>Every student inquiry is verified—real phone numbers, confirmed interest, and genuine intent to enroll. Your counselors only call students ready to convert.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Typical Cost</h2>
              <p className="text-3xl font-bold text-blue-600 mb-2">₹350–₹600 per verified inquiry</p>
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

