'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <Card>
            <CardContent className="p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Introduction</h2>
                <p className="text-slate-700 leading-relaxed">
                  We are committed to protecting your privacy and ensuring transparent, responsible handling of all data shared with Transition Marketing AI.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Information We Collect</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We collect data you provide during:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                  <li>Strategy session form submissions</li>
                  <li>Website interactions</li>
                  <li>Campaign activity</li>
                  <li>Verification calls</li>
                  <li>WhatsApp communications</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We may store:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Name, phone number, email</li>
                  <li>Business & inquiry details</li>
                  <li>Industry information</li>
                  <li>Verification notes</li>
                  <li>Campaign engagement signals</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-slate-700 leading-relaxed mb-4">We use your information solely to:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                  <li>Deliver verified inquiries</li>
                  <li>Improve campaign accuracy</li>
                  <li>Conduct identity validation</li>
                  <li>Provide customer support</li>
                  <li>Maintain account and dashboard access</li>
                </ul>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  We do <strong>NOT</strong> sell or rent data.
                </p>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  We do <strong>NOT</strong> share your data with other clients.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How Verified Inquiry Data Is Processed</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  To ensure authenticity:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>AI intent scoring may analyze user behaviour</li>
                  <li>Identity validation tools may verify phone/email accuracy</li>
                  <li>Human verification may confirm requirement and timeline</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  All processes follow strict privacy principles.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. WhatsApp & Email Communication Consent</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  By submitting forms or booking calls, you consent to be contacted via WhatsApp, SMS, email, or phone for:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Verification</li>
                  <li>Delivery of verified inquiries</li>
                  <li>Onboarding updates</li>
                  <li>Mandatory service notifications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Retention</h2>
                <p className="text-slate-700 leading-relaxed">
                  We retain data only as long as it is necessary for service delivery, performance monitoring, and legal compliance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
                <p className="text-slate-700 leading-relaxed mb-4">You may request:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Access to your data</li>
                  <li>Deletion of your data</li>
                  <li>Correction of inaccurate information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Security Measures</h2>
                <p className="text-slate-700 leading-relaxed mb-4">We use:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Encrypted storage</li>
                  <li>Access controls</li>
                  <li>Audit logs</li>
                  <li>Verification layers</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Contact</h2>
                <p className="text-slate-700 leading-relaxed">
                  For privacy concerns:
                </p>
                <p className="text-slate-700 leading-relaxed mt-2">
                  <strong>Email:</strong> <a href="mailto:support@transitionmarketingai.com" className="text-blue-600 hover:underline">support@transitionmarketingai.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

