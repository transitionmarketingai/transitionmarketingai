import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Transition Marketing AI",
  description: "Subscription terms for Transition Marketing AI's automated marketing services.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <Link href="/" className="inline-flex items-center text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium mb-8">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
      
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
          <span className="text-gradient">Terms of Service</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Last updated: January 15, 2025
        </p>
      </div>
      
      <div className="rounded-3xl glass-effect p-8 md:p-12 animate-scale-in">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-50 mb-6">📋 Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "#agreement", label: "Agreement" },
              { href: "#services", label: "Services" },
              { href: "#subscriptions", label: "Subscriptions" },
              { href: "#free-trial", label: "Free Trial" },
              { href: "#cancellations", label: "Cancellations" },
              { href: "#refunds", label: "Refunds" },
              { href: "#acceptable-use", label: "Acceptable Use" },
              { href: "#intellectual-property", label: "Intellectual Property" },
              { href: "#third-party-services", label: "Third-Party Services" },
              { href: "#limitations", label: "Limitations" },
              { href: "#indemnity", label: "Indemnity" },
              { href: "#governing-law", label: "Governing Law" },
              { href: "#changes", label: "Changes" },
              { href: "#contact", label: "Contact" }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="flex items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors duration-300 text-slate-300 hover:text-cyan-400"
              >
                <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section id="agreement" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">📝</span>
              Agreement
            </h2>
            <p className="text-lg">These Terms of Service constitute a binding agreement between you and Transition Marketing AI. By using our services, you agree to be bound by these terms.</p>
          </section>
          
          <section id="services" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">⚙️</span>
              Services
            </h2>
            <p className="text-lg mb-4">We provide automated marketing services including:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">LeadGen AI:</strong> Automated lead generation and outreach</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Content AI Suite:</strong> SEO content, social media posts, and newsletters</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Add-ons:</strong> Additional AI-powered marketing tools</div>
              </li>
            </ul>
            <p className="mt-4 text-lg">Services are delivered as managed automations with dashboard access for monitoring and control.</p>
          </section>
          
          <section id="subscriptions" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">💳</span>
              Subscriptions
            </h2>
            <p className="text-lg mb-4">Our services are provided on a subscription basis:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Billing occurs monthly on a recurring basis</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Taxes may apply based on your location</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Price changes will be communicated with advance notice</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>You authorize us or our payment partner (Stripe/Razorpay) to charge your payment method</div>
              </li>
            </ul>
          </section>
          
          <section id="free-trial" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🎁</span>
              Free Trial
            </h2>
            <p className="text-lg">The first 10 businesses to sign up receive a 30-day free trial. The trial automatically converts to a paid subscription unless canceled before the trial period ends.</p>
          </section>
          
          <section id="cancellations" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">❌</span>
              Cancellations
            </h2>
            <p className="text-lg">You may cancel your subscription at any time from your billing portal. Service will continue until the end of your current billing period, after which access will be terminated.</p>
          </section>
          
          <section id="refunds" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">💰</span>
              Refunds
            </h2>
            <p className="text-lg mb-4">Our refund policy:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>The trial period is free with no charges</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>After the trial, payments are non-refundable for the current period</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Refunds may be provided where required by applicable law</div>
              </li>
            </ul>
          </section>
          
          <section id="acceptable-use" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">✅</span>
              Acceptable Use
            </h2>
            <p className="text-lg mb-4">You agree to use our services responsibly and in compliance with:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>All applicable laws and regulations</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Platform policies (WhatsApp, email providers, LinkedIn)</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Anti-spam laws and best practices</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>No unlawful scraping or misuse of our systems</div>
              </li>
            </ul>
          </section>
          
          <section id="intellectual-property" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🧠</span>
              Intellectual Property
            </h2>
            <p className="text-lg mb-4">Our intellectual property:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Website, content, templates, and code are owned by Transition Marketing AI</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Your brand assets and content remain your property</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>You grant us license to use your content for service delivery</div>
              </li>
            </ul>
          </section>
          
          <section id="third-party-services" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🔗</span>
              Third-Party Services
            </h2>
            <p className="text-lg">You may connect external tools such as Calendly, Airtable, and email providers. The terms and conditions of these third-party services apply to your use of them.</p>
          </section>
          
          <section id="limitations" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              Limitations
            </h2>
            <p className="text-lg">Our services are provided &quot;as is&quot; without warranties. We do not guarantee specific revenue outcomes or marketing results. Your success depends on various factors including market conditions and your business practices.</p>
          </section>
          
          <section id="indemnity" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🛡️</span>
              Indemnity
            </h2>
            <p className="text-lg">You agree to indemnify and hold harmless Transition Marketing AI from any claims, damages, or expenses arising from your misuse of our services or violation of these terms.</p>
          </section>
          
          <section id="governing-law" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">⚖️</span>
              Governing Law
            </h2>
            <p className="text-lg">These terms are governed by the laws of India, specifically the state of Maharashtra, unless required otherwise by applicable law.</p>
          </section>
          
          <section id="changes" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🔄</span>
              Changes
            </h2>
            <p className="text-lg">We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
          </section>
          
          <section id="contact" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">📞</span>
              Contact
            </h2>
            <p className="text-lg mb-4">For questions about these terms, contact us at:</p>
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20">
              <a href="mailto:hello@transitionmarketingai.com" className="text-cyan-400 hover:text-cyan-300 text-lg font-medium">
                hello@transitionmarketingai.com
              </a>
            </div>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <p className="text-slate-300 text-lg text-center">
              <strong>📝 Terms Updates:</strong> We may update these terms from time to time. We&apos;ll post any changes on this page and update the &quot;Last updated&quot; date.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

