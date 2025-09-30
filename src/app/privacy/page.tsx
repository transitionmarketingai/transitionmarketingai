import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Transition Marketing AI",
  description: "How we collect, use, and protect your data at Transition Marketing AI.",
};

export default function PrivacyPage() {
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
          <span className="text-gradient">Privacy Policy</span>
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
              { href: "#scope", label: "Scope" },
              { href: "#data-we-collect", label: "Data We Collect" },
              { href: "#how-we-use", label: "How We Use Your Data" },
              { href: "#legal-bases", label: "Legal Bases" },
              { href: "#data-sharing", label: "Data Sharing" },
              { href: "#retention", label: "Data Retention" },
              { href: "#security", label: "Security" },
              { href: "#your-rights", label: "Your Rights" },
              { href: "#international", label: "International Transfers" },
              { href: "#contact", label: "Contact Us" }
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
          <section id="scope" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Scope
            </h2>
            <p className="text-lg">This Privacy Policy applies to our website, checkout process, audit form, and automated marketing services. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
          </section>
          
          <section id="data-we-collect" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">📊</span>
              Data We Collect
            </h2>
            <p className="text-lg mb-4">We collect the following types of information:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200">Account Information:</strong> Name, email address, company details
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200">Billing Details:</strong> Payment information (handled securely by Stripe/Razorpay)
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200">Usage Analytics:</strong> How you interact with our services and dashboards
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200">Audit Form Data:</strong> Information provided in our &quot;Free AI Marketing Audit&quot; form
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>
                  <strong className="text-slate-200">Communications:</strong> Support tickets, emails, and feedback
                </div>
              </li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-green-300 text-sm">
                <strong>🔒 Security Note:</strong> We do not collect passwords for third-party services unless explicitly authorized by you.
              </p>
            </div>
          </section>
          
          <section id="how-we-use" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">⚙️</span>
              How We Use Your Data
            </h2>
            <p className="text-lg mb-4">We use your information to:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Provide our services (lead generation and content automation)</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Deliver customer support and respond to inquiries</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Improve our services and develop new features</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Prevent fraud and ensure security</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Comply with legal obligations</div>
              </li>
            </ul>
          </section>
          
          <section id="legal-bases" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">⚖️</span>
              Legal Bases
            </h2>
            <p className="text-lg mb-4">We process your data based on:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Consent:</strong> When you provide explicit consent</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Contract:</strong> To fulfill our service agreement with you</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Legitimate Interests:</strong> To improve our services and prevent fraud</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Legal Obligations:</strong> To comply with applicable laws</div>
              </li>
            </ul>
          </section>
          
          <section id="data-sharing" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🤝</span>
              Data Sharing
            </h2>
            <p className="text-lg mb-4">We may share your data with:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Service Providers:</strong> Hosting, analytics, email services, and Airtable/Sheets if configured</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Payment Processors:</strong> Stripe and Razorpay for billing</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div><strong className="text-slate-200">Legal Requirements:</strong> When required by law or to protect our rights</div>
              </li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-300 text-sm">
                <strong>🚫 Important:</strong> We do not sell your personal data to third parties.
              </p>
            </div>
          </section>
          
          <section id="retention" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">⏰</span>
              Data Retention
            </h2>
            <p className="text-lg mb-4">We retain your data:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>As long as your subscription is active</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>As required by applicable laws and regulations</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Audit form data is retained for evaluation purposes unless deleted upon request</div>
              </li>
            </ul>
          </section>
          
          <section id="security" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🔒</span>
              Security
            </h2>
            <p className="text-lg">We implement administrative, technical, and organizational measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
          </section>
          
          <section id="your-rights" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">👤</span>
              Your Rights
            </h2>
            <p className="text-lg mb-4">You have the right to:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Access your personal data</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Correct inaccurate information</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Request deletion of your data</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Data portability</div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <div>Withdraw consent where applicable</div>
              </li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-cyan-300 text-sm">
                <strong>📧 Contact:</strong> To exercise these rights, contact us at <a href="mailto:hello@transitionmarketingai.com" className="text-cyan-400 hover:text-cyan-300 underline">hello@transitionmarketingai.com</a>.
              </p>
            </div>
          </section>
          
          <section id="international" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">🌍</span>
              International Transfers
            </h2>
            <p className="text-lg">Your data may be processed outside your country of residence. We ensure that our service providers apply appropriate safeguards to protect your data in accordance with applicable data protection laws.</p>
          </section>
          
          <section id="contact" className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-50 mb-4 flex items-center">
              <span className="text-2xl mr-3">📞</span>
              Contact Us
            </h2>
            <p className="text-lg mb-4">If you have questions about this Privacy Policy, contact us at:</p>
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
              <strong>📝 Policy Updates:</strong> We may update this policy from time to time. We&apos;ll post any changes on this page and update the &quot;Last updated&quot; date.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

