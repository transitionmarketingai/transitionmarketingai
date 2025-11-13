import type { Metadata } from "next";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Why Verified Inquiries Deliver Better ROI Than Buying Lead Lists | Transition Marketing AI",
  description: "Stop wasting money on outdated databases. Learn how verified ad inquiries outperform bulk lead lists in conversion and trust.",
};

export default function VerifiedLeadsArticle() {
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
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
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
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Strategy
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Why Verified Inquiries Deliver Better ROI Than Buying Lead Lists
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Stop wasting money on outdated databases. Learn how verified ad inquiries outperform bulk lead lists in conversion and trust.
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
              alt="Verified Leads vs Lead Lists"
              width={1200}
              height={630}
              className="w-full h-auto"
              loading="eager"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Many businesses in India still buy lead lists from data vendors, hoping to find customers. But these lists are often outdated, inaccurate, and filled with contacts who have no interest in your service. Verified inquiries from AI-powered ad campaigns, on the other hand, come from people actively engaging with your ads—meaning they're already interested and ready to talk.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Comparison: Verified Inquiries vs. Purchased Lead Lists
            </h2>

            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-slate-300 rounded-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">Factor</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">Verified Inquiries</th>
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">Purchased Lists</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">Accuracy</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">90%+ verified phone & email</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">30-50% outdated/disconnected</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">Intent</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">High (actively engaging with ads)</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">Low (no engagement signal)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">ROI</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">12-25% conversion rate</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">2-5% conversion rate</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">Cost per Lead</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">₹400-₹500 (verified, high-intent)</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">₹50-₹200 (but 70% waste)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">Follow-up Automation</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">Yes (WhatsApp + Dashboard)</td>
                    <td className="border border-slate-300 px-4 py-3 text-slate-700">No (manual calling required)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              How AI Filters for High-Intent Leads
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              AI-powered systems don't just collect contact information—they analyze user behavior to identify genuine buying intent. When someone clicks on your ad, views your landing page, fills out a form, or engages with your content, the AI system tracks these signals and scores each lead based on likelihood to convert.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              This means you only receive inquiries from people who have shown clear interest in your service. The AI also verifies contact information in real-time, ensuring phone numbers are active and email addresses are deliverable. This combination of intent scoring and verification dramatically improves your conversion rates compared to cold lists.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Hidden Cost of Low-Quality Lead Lists
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              While purchased lead lists seem cheaper upfront (₹50-₹200 per lead), the hidden costs quickly add up. When 70% of those leads are outdated or uninterested, your sales team wastes hours calling disconnected numbers and emailing invalid addresses. This wasted time costs more than the list itself, and the poor conversion rates mean you're spending money without seeing real results.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Verified inquiries, on the other hand, may cost more per lead (₹400-₹500), but they deliver significantly better ROI. With a 12-25% conversion rate compared to 2-5% for purchased lists, you're not just buying contacts—you're buying real business opportunities. Every verified inquiry has been confirmed as genuine and interested, meaning your team's time is spent on leads that actually convert.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The choice is clear: stop wasting money on outdated databases and start investing in verified inquiries from real ad campaigns. <Link href="/onboarding" className="text-blue-600 hover:text-blue-700 font-semibold">Take our 30-second onboarding quiz</Link> to see if you qualify for our 30-day pilot program and start receiving verified inquiries every week.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-12 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ready to Switch to Verified Inquiries?</h3>
              <p className="text-slate-700 mb-4">
                Book a free consultation to see how verified AI-generated inquiries can improve your ROI.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white mb-2" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <p className="text-sm text-slate-600 mt-4">
                Or <Link href="/onboarding" className="text-blue-600 hover:text-blue-700 font-semibold">start the onboarding quiz</Link> to see if you qualify.
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

