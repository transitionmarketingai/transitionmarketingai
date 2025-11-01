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
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
                <p className="text-slate-700 leading-relaxed">
                  Transition Marketing AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our lead generation services and website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-medium text-slate-800 mb-2">2.1 Personal Information</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We may collect personal information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and business information</li>
                  <li>Billing and payment information</li>
                  <li>Consultation preferences and requirements</li>
                  <li>Any other information you provide in forms or communications</li>
                </ul>

                <h3 className="text-xl font-medium text-slate-800 mb-2">2.2 Usage Data</h3>
                <p className="text-slate-700 leading-relaxed">
                  We automatically collect certain information when you visit our website, including IP address, browser type, device information, pages viewed, and time spent on pages.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-700 leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Provide and deliver our lead generation services</li>
                  <li>Process your consultation requests and create custom plans</li>
                  <li>Send invoices and process payments</li>
                  <li>Communicate with you about our services, updates, and support</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our business (payment processors, email services, hosting)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you have explicitly given us permission</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
                <p className="text-slate-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Data Retention</h2>
                <p className="text-slate-700 leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Your Rights</h2>
                <p className="text-slate-700 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Withdraw consent at any time</li>
                  <li>Request data portability</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  To exercise these rights, please contact us at <a href="mailto:info@transitionmarketingai.com" className="text-blue-600 hover:underline">info@transitionmarketingai.com</a>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Cookies and Tracking</h2>
                <p className="text-slate-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage, and assist with our marketing efforts. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Third-Party Links</h2>
                <p className="text-slate-700 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Children's Privacy</h2>
                <p className="text-slate-700 leading-relaxed">
                  Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Changes to This Policy</h2>
                <p className="text-slate-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Contact Us</h2>
                <p className="text-slate-700 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us:
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

