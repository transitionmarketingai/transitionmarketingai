import type { Metadata } from "next";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Verified Inquiries vs. Bought Leads — What Indian Businesses Need to Know | Transition Marketing AI",
  description: "Most Indian businesses still buy raw leads — but the industry is shifting quickly toward verified inquiries. Learn why the difference matters more than ever.",
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
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Strategy
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Verified Inquiries vs. Bought Leads — What Indian Businesses Need to Know
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Most Indian businesses still buy raw leads — but the industry is shifting quickly toward verified inquiries. Here's why the difference matters more than ever.
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
              Most Indian businesses still buy raw leads — but the industry is shifting quickly toward verified inquiries. Here's why the difference matters more than ever.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              What Are Bought Leads?
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Bought leads are raw data purchased from lists, marketplaces, or agencies. These leads typically have several problems:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-slate-700">
              <li><strong>Raw data from lists, marketplaces, or agencies:</strong> Contact information is collected from various sources without verification of intent or accuracy.</li>
              <li><strong>Often duplicate, outdated, or fake:</strong> Many contacts in these lists are no longer valid, have already been contacted, or were never real to begin with.</li>
              <li><strong>No verification of intent:</strong> There's no way to know if the person on the list is actually interested in your service or even aware they're on a lead list.</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              The Hidden Cost of Bought Leads
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              While bought leads may seem inexpensive upfront, the hidden costs quickly add up:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-slate-700">
              <li><strong>Time wasted calling uninterested people:</strong> Your sales team spends hours reaching out to contacts who have no interest in your service, wasting valuable time that could be spent on real prospects.</li>
              <li><strong>Low conversion rates:</strong> Without intent verification, conversion rates from bought leads typically range from 2-5%, meaning most of your investment goes to waste.</li>
              <li><strong>Weak ROI:</strong> When you factor in the time cost of calling unqualified leads, the actual ROI becomes negative for many businesses.</li>
              <li><strong>No accountability:</strong> Lead vendors don't guarantee results or take responsibility for low conversion rates, leaving you with no recourse when leads don't convert.</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              What Is a Verified Inquiry?
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              A verified inquiry is fundamentally different from a bought lead. It goes through a rigorous verification process:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-slate-700">
              <li><strong>Real user → real ad click:</strong> Every inquiry starts with a real person clicking on your ad, showing genuine interest in your service.</li>
              <li><strong>AI intent scoring:</strong> The system analyzes user behavior, engagement patterns, and click signals to score intent before the inquiry reaches you.</li>
              <li><strong>AI identity validation:</strong> Automated systems check for fake numbers, invalid emails, duplicates, and spam patterns to ensure contact information is real.</li>
              <li><strong>Human confirmation:</strong> A short manual call confirms genuine interest, accurate requirement, budget, and timeline before delivery.</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Why Verified Inquiries Convert Better
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Verified inquiries deliver significantly better results because they address the core problems with bought leads:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-slate-700">
              <li><strong>Genuine intent:</strong> Every verified inquiry has shown real interest through ad engagement and passed intent scoring, meaning they're actively looking for what you offer.</li>
              <li><strong>Correct contact details:</strong> Identity validation ensures phone numbers and emails are active and belong to real people, eliminating wasted calls to disconnected numbers.</li>
              <li><strong>Valid budget/timeline:</strong> Human verification confirms the prospect has the budget for your service and a realistic timeline, ensuring you're talking to qualified buyers.</li>
              <li><strong>Exclusive delivery:</strong> Each inquiry is delivered to only one business, never shared or recycled, giving you exclusive access to that prospect.</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Performance Guarantee vs No Guarantee
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The difference in accountability is stark:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-slate-700">
              <li><strong>Agencies cannot guarantee results:</strong> Traditional lead vendors and agencies sell you data but take no responsibility for conversion rates or lead quality. If leads don't convert, you bear the full cost.</li>
              <li><strong>Verified Inquiry system is performance-backed:</strong> With a verified inquiry system, if minimum verified inquiries aren't delivered, campaigns continue at the provider's cost until targets are met. This aligns incentives and ensures accountability.</li>
            </ul>

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
              Conclusion
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Verified inquiries remove the uncertainty from lead generation. It's a reliable, predictable way for businesses to grow without wasting time or money. Instead of buying raw data with no guarantees, verified inquiries deliver real people with genuine intent, validated contact information, and confirmed requirements — backed by a performance guarantee that ensures you get results.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-12 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ready to Get Verified Inquiries for Your Business?</h3>
              <p className="text-slate-700 mb-4">
                Book your free strategy session and see how many verified inquiries we can deliver for your business.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white mb-2" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book My Free Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
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

