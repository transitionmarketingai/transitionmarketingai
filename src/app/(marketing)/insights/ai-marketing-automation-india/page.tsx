import type { Metadata } from "next";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "The Future of AI Marketing Automation for Indian Businesses | Transition Marketing AI",
  description: "Explore how AI marketing tools are changing the way Indian startups, agencies, and SMBs grow their customer base.",
};

export default function AutomationArticle() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Logo size="md" />
              </Link>
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
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Automation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              The Future of AI Marketing Automation for Indian Businesses
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Explore how AI marketing tools are changing the way Indian startups, agencies, and SMBs grow their customer base.
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
              alt="AI Marketing Automation"
              width={1200}
              height={630}
              className="w-full h-auto"
              loading="eager"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Indian businesses are rapidly adopting AI marketing automation to compete in an increasingly digital marketplace. From automated ad optimization to intelligent CRM integration, AI is transforming how startups, agencies, and SMBs acquire and nurture customers—without the need for large marketing teams or massive budgets.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Automated Ad Optimization
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Traditional ad management requires constant monitoring, A/B testing, and manual adjustments. AI-powered systems automate this entire process. They continuously analyze ad performance, identify winning creatives and targeting strategies, and automatically pause underperforming campaigns while scaling successful ones. This means your ads get better over time without manual intervention.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              Intelligent Dashboards and Reporting
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Modern AI marketing platforms provide real-time dashboards that show exactly where your inquiries are coming from, which campaigns are performing best, and what your cost per inquiry is. These dashboards integrate with your existing CRM systems, automatically updating contact records and lead statuses. You get complete visibility into your marketing ROI without spending hours on spreadsheets.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              CRM Integration and Workflow Automation
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              AI marketing systems don't just generate leads—they integrate seamlessly with your CRM to automate follow-ups, qualify leads, and route high-priority inquiries to the right team members. When a verified inquiry comes in, the system automatically creates a contact record, sends initial WhatsApp messages, and schedules follow-up tasks. This eliminates manual data entry and ensures no lead falls through the cracks.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
              The "Made in India" AI Ecosystem
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              India's AI ecosystem is growing rapidly, with homegrown solutions designed specifically for Indian business needs. These solutions understand local market dynamics, language preferences, payment methods, and customer behavior patterns unique to the Indian market. Transition Marketing AI is part of this ecosystem, building AI marketing tools that work for Indian businesses—from real estate developers in Mumbai to SaaS startups in Bangalore.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              As more Indian businesses adopt AI marketing automation, we're seeing a shift from expensive, manual marketing processes to intelligent, automated systems that deliver better results at lower costs. The future belongs to businesses that leverage AI to scale their marketing operations efficiently.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-12 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ready to Automate Your Marketing?</h3>
              <p className="text-slate-700 mb-4">
                Book a free consultation to see how AI marketing automation can transform your customer acquisition process.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
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

