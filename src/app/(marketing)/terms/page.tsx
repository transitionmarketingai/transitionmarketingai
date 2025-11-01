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
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-700 leading-relaxed">
                  By accessing and using Transition Marketing AI's services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Services Description</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Transition Marketing AI provides lead generation services including:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>AI-powered lead discovery and verification</li>
                  <li>Multi-channel lead generation (ads, scraping, outreach)</li>
                  <li>Lead delivery through our dashboard platform</li>
                  <li>Custom pricing plans based on consultation</li>
                  <li>Support and consultation services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Service Agreement</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Our services are provided under a custom plan agreement determined after a free consultation. Key terms include:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li><strong>Plan Details:</strong> Lead volume, pricing, and delivery schedule as agreed in consultation</li>
                  <li><strong>Payment Terms:</strong> As specified in your invoice (typically Net 30 days)</li>
                  <li><strong>Service Period:</strong> Monthly subscription as per your plan</li>
                  <li><strong>Lead Quality:</strong> We verify all leads before delivery, but results may vary</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Payment Terms</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Payment terms are as follows:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Invoices are due according to the terms specified (typically Net 30 days)</li>
                  <li>Late payments may result in service suspension</li>
                  <li>All prices are in Indian Rupees (₹) and include applicable taxes</li>
                  <li>Payment is non-refundable once services have been delivered</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. User Responsibilities</h2>
                <p className="text-slate-700 leading-relaxed mb-4">You agree to:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Provide accurate and complete information during consultation and onboarding</li>
                  <li>Use leads in compliance with applicable laws and regulations (GDPR, TCPA, etc.)</li>
                  <li>Not resell or redistribute leads to third parties</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Notify us immediately of any unauthorized account access</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Lead Quality and Guarantees</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We strive to deliver high-quality, verified leads. However:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>We verify phone numbers and email addresses to the best of our ability</li>
                  <li>Lead quality may vary by source and industry</li>
                  <li>We do not guarantee conversion rates or response rates from leads</li>
                  <li>Client is responsible for compliant use of leads in their outreach</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Intellectual Property</h2>
                <p className="text-slate-700 leading-relaxed">
                  All content, features, and functionality of our platform, including our logo, design, and software, are owned by Transition Marketing AI and protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-slate-700 leading-relaxed">
                  To the maximum extent permitted by law, Transition Marketing AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Termination</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Either party may terminate the service agreement:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li><strong>By Client:</strong> With 30 days written notice</li>
                  <li><strong>By Us:</strong> For non-payment, breach of terms, or illegal use of services</li>
                  <li>Upon termination, all outstanding invoices must be paid</li>
                  <li>Access to the dashboard will be revoked after termination</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Changes to Terms</h2>
                <p className="text-slate-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes via email or dashboard notification. Continued use of services after changes constitutes acceptance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Governing Law</h2>
                <p className="text-slate-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Contact Information</h2>
                <p className="text-slate-700 leading-relaxed">
                  For questions about these Terms, please contact us:
                </p>
                <p className="text-slate-700 leading-relaxed mt-2">
                  <strong>Email:</strong> <a href="mailto:info@transitionmarketingai.com" className="text-blue-600 hover:underline">info@transitionmarketingai.com</a><br />
                  <strong>Website:</strong> <a href="https://transitionmarketingai.com" className="text-blue-600 hover:underline">transitionmarketingai.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

