'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <Card>
            <CardContent className="p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Introduction</h2>
                <p className="text-slate-700 leading-relaxed">
                  By accessing TransitionMarketingAI.com or using our services, you agree to the following terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Service Definition</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Transition Marketing AI provides:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                  <li>Verified inquiry delivery</li>
                  <li>Campaign management</li>
                  <li>Verification processing</li>
                  <li>Dashboard access</li>
                </ul>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  We do not guarantee sales, appointments, or revenue—only verified inquiries.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Performance Guarantee</h2>
                <p className="text-slate-700 leading-relaxed">
                  Our commitment: "If we do not deliver the minimum verified inquiries agreed during onboarding, we continue running your campaign at our cost until the target is met."
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Verification Criteria</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  An inquiry is considered verified when:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>It originated from a real ad click</li>
                  <li>Passed AI intent scoring</li>
                  <li>Passed identity validation</li>
                  <li>Passed human confirmation, if applicable</li>
                  <li>Contains accurate contact information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Payment & Billing</h2>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Investments include ad spend</li>
                  <li>Fees are non-refundable</li>
                  <li>Billing cycles start on onboarding approval</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Prohibited Use</h2>
                <p className="text-slate-700 leading-relaxed mb-4">Clients may not:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Attempt to reverse-engineer data</li>
                  <li>Spam or misuse verified inquiries</li>
                  <li>Resell or share inquiry data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-slate-700 leading-relaxed mb-4">We are not liable for:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>User actions or outcomes after delivery</li>
                  <li>Client-side conversion errors</li>
                  <li>Platform outages or external ad platform issues</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Termination</h2>
                <p className="text-slate-700 leading-relaxed mb-4">We may suspend or terminate accounts for:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Abuse</li>
                  <li>Fraud</li>
                  <li>Non-payment</li>
                  <li>Terms violation</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Amendments</h2>
                <p className="text-slate-700 leading-relaxed">
                  These terms may be updated with notice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

