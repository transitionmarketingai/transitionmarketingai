'use client';

import Link from 'next/link';

// Logo component
function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-white">Transition Marketing AI</span>
    </Link>
  );
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              href="/dashboard" 
              className="px-4 py-2 border border-purple-500 text-purple-400 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-200"
            >
              Demo
            </Link>
            <Link 
              href="/get-started" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Legal Section Component
function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Terms of Service</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Please read these terms carefully before using our AI marketing automation platform.
            </p>
            
            <div className="text-sm text-gray-400">
              Last updated: January 15, 2024
            </div>
          </div>

          {/* Terms of Service Content */}
          <div className="space-y-8">
            <LegalSection title="Acceptance of Terms">
              <p className="text-gray-300 mb-4">
                By accessing and using Transition Marketing AI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-300">
                These Terms of Service ("Terms") govern your use of our AI-powered marketing automation platform and services.
              </p>
            </LegalSection>

            <LegalSection title="Description of Service">
              <div className="space-y-4">
                <p className="text-gray-300">
                  Transition Marketing AI provides an AI-powered marketing automation platform that includes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>AI agents for lead generation and content creation</li>
                  <li>Marketing campaign management and optimization</li>
                  <li>Analytics and reporting tools</li>
                  <li>Integration with third-party marketing platforms</li>
                  <li>Customer support and training resources</li>
                </ul>
              </div>
            </LegalSection>

            <LegalSection title="User Accounts">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Creation</h3>
                  <p className="text-gray-300">
                    To use our Service, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>You are responsible for all activities under your account</li>
                    <li>You must notify us immediately of any unauthorized use</li>
                    <li>You must provide accurate and up-to-date information</li>
                    <li>You are responsible for maintaining account security</li>
                  </ul>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Acceptable Use">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Permitted Uses</h3>
                  <p className="text-gray-300">
                    You may use our Service for legitimate business purposes, including marketing automation, lead generation, and content creation for your own business or clients.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Prohibited Uses</h3>
                  <p className="text-gray-300 mb-2">You agree not to use our Service for:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Spam, phishing, or other malicious activities</li>
                    <li>Violating any applicable laws or regulations</li>
                    <li>Infringing on intellectual property rights</li>
                    <li>Harassment, abuse, or harmful content</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Reverse engineering or copying our technology</li>
                    <li>Reselling or redistributing our Service without permission</li>
                  </ul>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Payment and Billing">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Subscription Fees</h3>
                  <p className="text-gray-300">
                    Our Service is offered on a subscription basis. Fees are billed in advance on a monthly or annual basis, as selected during signup.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Payment Terms</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>All fees are non-refundable unless otherwise stated</li>
                    <li>We may change pricing with 30 days' notice</li>
                    <li>Failed payments may result in service suspension</li>
                    <li>You are responsible for all applicable taxes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Free Trial</h3>
                  <p className="text-gray-300">
                    We offer a 14-day free trial. You may cancel at any time during the trial period without charge. If you do not cancel, your subscription will automatically begin at the end of the trial.
                  </p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Intellectual Property">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Our Rights</h3>
                  <p className="text-gray-300">
                    The Service and its original content, features, and functionality are owned by Transition Marketing AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Content</h3>
                  <p className="text-gray-300">
                    You retain ownership of any content you upload or create using our Service. By using our Service, you grant us a license to use, process, and display your content as necessary to provide the Service.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Content</h3>
                  <p className="text-gray-300">
                    Content generated by our AI agents is provided for your use, but we make no claims to ownership of such content. You are responsible for ensuring compliance with applicable laws and regulations.
                  </p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Privacy and Data Protection">
              <p className="text-gray-300">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </LegalSection>

            <LegalSection title="Service Availability">
              <div className="space-y-4">
                <p className="text-gray-300">
                  We strive to maintain high service availability, but we do not guarantee uninterrupted access. The Service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical issues or system failures</li>
                  <li>Third-party service disruptions</li>
                  <li>Force majeure events</li>
                </ul>
              </div>
            </LegalSection>

            <LegalSection title="Limitation of Liability">
              <div className="space-y-4">
                <p className="text-gray-300">
                  To the maximum extent permitted by law, Transition Marketing AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                </p>
                <p className="text-gray-300">
                  Our total liability to you for any claims arising from or related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="Indemnification">
              <p className="text-gray-300">
                You agree to indemnify and hold harmless Transition Marketing AI from any claims, damages, or expenses arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
              </p>
            </LegalSection>

            <LegalSection title="Termination">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Termination by You</h3>
                  <p className="text-gray-300">
                    You may terminate your account at any time by contacting our support team or using the account settings in your dashboard.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Termination by Us</h3>
                  <p className="text-gray-300">
                    We may terminate or suspend your account immediately if you violate these Terms or engage in prohibited activities.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Effect of Termination</h3>
                  <p className="text-gray-300">
                    Upon termination, your right to use the Service ceases immediately. We may delete your account and data after a reasonable period, subject to our data retention policies.
                  </p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Governing Law">
              <p className="text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles. Any disputes shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </LegalSection>

            <LegalSection title="Changes to Terms">
              <p className="text-gray-300">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
              </p>
            </LegalSection>

            <LegalSection title="Contact Information">
              <div className="space-y-2">
                <p className="text-gray-300">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <ul className="list-none text-gray-300 space-y-1">
                  <li>Email: legal@transitionmarketingai.com</li>
                  <li>Address: [Your Business Address]</li>
                  <li>Phone: [Your Phone Number]</li>
                </ul>
              </div>
            </LegalSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">Transition Marketing AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered marketing automation for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/#agents" className="hover:text-white">AI Agents</Link></li>
                <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/book" className="hover:text-white">Book a Demo</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Get Started</h4>
              <p className="text-gray-400 mb-4">
                Start your free trial today and see the difference AI can make.
              </p>
              <Link 
                href="/get-started" 
                className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Transition Marketing AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}