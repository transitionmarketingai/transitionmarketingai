import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function ProfessionalServicesPage() {
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
              Verified B2B Service Inquiries for Indian Businesses.
            </h1>
          </div>

          <Card className="border-2 border-slate-200 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <X className="h-6 w-6 text-red-600" />
                The Problem
              </h2>
              <div className="space-y-3 text-slate-700">
                <p>Tire-kickers and fake inquiry forms waste your sales team's time. You're spending hours on calls with people who aren't serious about buying your services, or filling out forms just to get information with no real intent.</p>
                <p>Traditional B2B lead generation gives you contact lists, but no way to verify which businesses actually need your services and have budget allocated.</p>
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
                <p>We run targeted campaigns on Google, LinkedIn, and business platforms. When decision-makers click your ad, we verify their business details, need, and budget before delivering them to you.</p>
                <p>Every B2B inquiry is verified—real businesses, confirmed decision-makers, and genuine intent to buy. Your sales team only talks to businesses ready to close.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Typical Cost</h2>
              <p className="text-3xl font-bold text-blue-600 mb-2">₹1,500–₹3,000 per verified inquiry</p>
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

