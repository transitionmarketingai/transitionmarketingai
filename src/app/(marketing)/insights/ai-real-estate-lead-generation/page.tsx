import type { Metadata } from "next";
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "How AI Lead Generation is Transforming Real Estate Marketing in India | Transition Marketing AI",
  description: "Discover how Indian real estate businesses are using AI to generate verified property inquiries and close deals faster.",
};

export default function RealEstateArticle() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" href="/" />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book My Free Strategy Call</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/insights" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              ← Back to Insights
            </Link>
          </div>

          <header className="mb-12">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Real Estate
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              How AI Lead Generation is Transforming Real Estate Marketing in India
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Discover how Indian real estate businesses are using AI to generate verified property inquiries and close deals faster.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>Transition Marketing AI Team</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          {/* Header Image */}
          <div className="mb-12 rounded-xl overflow-hidden">
            <Image
              src="/images/dashboard-preview.png"
              alt="AI Lead Generation Dashboard"
              width={1200}
              height={630}
              className="w-full h-auto"
              loading="eager"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The real estate industry in India has long relied on traditional methods like cold calling, newspaper ads, and expensive lead lists. But these approaches are becoming increasingly ineffective and costly. Today, forward-thinking real estate developers and brokers are turning to AI-powered lead generation systems that deliver verified, high-intent property inquiries directly to their WhatsApp and dashboards.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Shift from Cold Calling to AI-Based Ad Systems
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Traditional real estate marketing involves spending hours on cold calls to people who may not even be looking for property. You buy expensive lead lists with outdated contact information, only to discover that most numbers are disconnected or the leads have already purchased elsewhere. This approach wastes time, money, and your sales team's energy.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              AI-powered lead generation changes this completely. Instead of calling random numbers, AI systems run targeted paid ad campaigns on Google, Facebook, and LinkedIn to find people actively searching for properties. These systems analyze user behavior, search patterns, and engagement signals to identify high-intent buyers before they even contact you.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              How Transition Marketing AI Verifies Inquiries and Automates Follow-ups
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              At Transition Marketing AI, we build complete marketing systems for real estate businesses. Our AI runs paid ad campaigns across multiple platforms, targeting people who match your ideal buyer profile—budget, location, property type, and purchase timeline. Every inquiry that comes through our system is verified before it reaches you.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              We verify phone numbers, email addresses, and business details to ensure you're talking to real, interested buyers. Once verified, these inquiries are automatically delivered to your personal dashboard and sent to your WhatsApp. Our system also handles initial follow-ups, qualifying leads, and routing high-priority inquiries to your sales team—all without manual intervention.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              This means your sales team spends time on serious buyers who are ready to visit properties and make decisions, not on tire-kickers or outdated contacts. The result? Higher conversion rates, faster deal closures, and significantly better ROI on your marketing spend.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Real Results for Indian Real Estate Businesses
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Our clients have seen remarkable improvements in their lead quality and conversion rates. One Mumbai developer who previously relied on cold calling and newspaper ads saw their conversion rate increase from 3% to 18% after switching to our AI-powered verified inquiry system. They now receive 40-60 verified property inquiries per month, with each inquiry from a genuine buyer ready to make a purchase decision.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The key difference is verification. Unlike traditional lead lists, every inquiry we deliver has been manually verified—we confirm the phone number works, the email is active, and most importantly, the buyer has genuine interest in purchasing property. This verification process eliminates wasted time on fake numbers, wrong contacts, or tire-kickers who aren't serious about buying.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              If you're tired of wasting hours on cold calls that go nowhere, or if you want to see verified property inquiries delivered directly to your WhatsApp every week, <Link href="/onboarding" className="text-blue-600 hover:text-blue-700 font-semibold">start the 30-second onboarding quiz</Link> to see if you qualify for our 30-day pilot program.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-12 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ready to Transform Your Real Estate Lead Generation?</h3>
              <p className="text-slate-700 mb-4">
                Book a free consultation to see how AI-powered marketing can bring verified property inquiries to your business every week.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white mb-2" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <p className="text-sm text-slate-600 mt-4">
                Or <Link href="/onboarding" className="text-blue-600 hover:text-blue-700 font-semibold">see if you qualify</Link> for our 30-day pilot program.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2025 Transition Marketing AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

