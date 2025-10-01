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

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Privacy Policy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            
            <div className="text-sm text-gray-400">
              Last updated: January 15, 2024
            </div>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            <LegalSection title="Introduction">
              <p className="text-gray-300 mb-4">
                Transition Marketing AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered marketing automation platform.
              </p>
              <p className="text-gray-300">
                By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </LegalSection>

            <LegalSection title="Information We Collect">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Company information and job title</li>
                    <li>Payment and billing information</li>
                    <li>Account credentials and preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Platform usage patterns and interactions</li>
                    <li>AI agent performance and results</li>
                    <li>Campaign data and analytics</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Third-Party Data</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Data from connected integrations (Google Analytics, Facebook Ads, etc.)</li>
                    <li>Lead information from external sources</li>
                    <li>Social media and marketing platform data</li>
                  </ul>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="How We Use Your Information">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Service Provision</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Provide and maintain our AI marketing automation platform</li>
                    <li>Process transactions and manage your account</li>
                    <li>Deliver AI-generated content and lead generation services</li>
                    <li>Provide customer support and technical assistance</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Improvement and Analytics</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Analyze usage patterns to improve our services</li>
                    <li>Train and enhance our AI models</li>
                    <li>Generate insights and performance reports</li>
                    <li>Develop new features and capabilities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Communication</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Send important service updates and notifications</li>
                    <li>Provide marketing communications (with your consent)</li>
                    <li>Respond to your inquiries and support requests</li>
                  </ul>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Data Sharing and Disclosure">
              <div className="space-y-4">
                <p className="text-gray-300">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Service Providers</h3>
                  <p className="text-gray-300">
                    We may share information with trusted third-party service providers who assist us in operating our platform, such as cloud hosting providers, payment processors, and analytics services.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Legal Requirements</h3>
                  <p className="text-gray-300">
                    We may disclose information when required by law, court order, or government regulation, or to protect our rights, property, or safety.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Business Transfers</h3>
                  <p className="text-gray-300">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
                  </p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Data Security">
              <div className="space-y-4">
                <p className="text-gray-300">
                  We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Security Measures</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and assessments</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Secure data centers and infrastructure</li>
                  </ul>
                </div>
                
                <p className="text-gray-300">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </LegalSection>

            <LegalSection title="Your Rights and Choices">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Access and Control</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Access and update your personal information</li>
                    <li>Download your data in a portable format</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of marketing communications</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Data Portability</h3>
                  <p className="text-gray-300">
                    You can request a copy of your data in a machine-readable format. We will provide this within 30 days of your request.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
                  <p className="text-gray-300">
                    To exercise your rights or for any privacy-related questions, contact us at privacy@transitionmarketingai.com
                  </p>
                </div>
              </div>
            </LegalSection>

            <LegalSection title="Data Retention">
              <p className="text-gray-300">
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will delete your personal information within 30 days, unless we are required to retain it for legal or regulatory purposes.
              </p>
            </LegalSection>

            <LegalSection title="International Data Transfers">
              <p className="text-gray-300">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </LegalSection>

            <LegalSection title="Changes to This Policy">
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our service after any changes constitutes acceptance of the updated policy.
              </p>
            </LegalSection>

            <LegalSection title="Contact Information">
              <div className="space-y-2">
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-none text-gray-300 space-y-1">
                  <li>Email: privacy@transitionmarketingai.com</li>
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