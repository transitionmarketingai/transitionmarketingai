import { Metadata } from 'next';
import Link from 'next/link';
import AuditForm from '@/components/AuditForm';

export const metadata: Metadata = {
  title: 'Get Started - Transition AI | Start Your Free Trial',
  description: 'Start your free 14-day trial of AI marketing automation. No credit card required. Setup in 5 minutes.',
};

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
      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Transition AI
      </span>
    </Link>
  );
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Pricing
            </Link>
          </div>

          <Link 
            href="/dashboard" 
            className="px-6 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function GetStarted() {
  const benefits = [
    {
      icon: "🎯",
      title: "100 Verified Leads",
      description: "Get qualified leads in your first month"
    },
    {
      icon: "✍️",
      title: "10 Blog Posts",
      description: "SEO-optimized content created for you"
    },
    {
      icon: "📱",
      title: "30 Social Posts",
      description: "Engaging content across all platforms"
    },
    {
      icon: "📧",
      title: "Email Campaigns",
      description: "Personalized outreach at scale"
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track performance across all channels"
    },
    {
      icon: "🤝",
      title: "Priority Support",
      description: "Expert help when you need it"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Share Your Info",
      description: "Tell us about your business and goals"
    },
    {
      number: "2",
      title: "AI Setup",
      description: "We configure your AI agents"
    },
    {
      number: "3",
      title: "Start Growing",
      description: "Watch leads and content roll in"
    }
  ];

  const guarantees = [
    "14-day free trial",
    "No credit card required",
    "Cancel anytime",
    "Keep your data",
    "24/7 support",
    "Money-back guarantee"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
              Start Your Free Trial
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"> AI Marketing Team </span>
              Today
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              No credit card required. Setup in 5 minutes. Start seeing results in 24 hours.
            </p>

            {/* Steps */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto mb-12">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-200 px-6 py-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.number}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-sm">{step.title}</div>
                      <div className="text-gray-600 text-xs">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <svg className="hidden md:block w-6 h-6 text-gray-300 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Your Free Trial</h2>
              <AuditForm />
            </div>

            {/* Benefits Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300">
                      <div className="text-3xl mb-3">{benefit.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Guarantee</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">+500 businesses</span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">
                  "We 10x'd our lead generation in the first month. The AI agents work better than our entire marketing team combined."
                </p>
                <p className="text-sm text-gray-900 font-medium mt-2">- Rajesh Kumar, CEO at TechStartup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Growing Businesses</h2>
            <p className="text-gray-600">Join hundreds of companies already automating their marketing</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {['Company A', 'Company B', 'Company C', 'Company D'].map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does setup take?",
                a: "Just 5 minutes. Fill out the form, answer a few questions about your business, and your AI agents will be ready to work."
              },
              {
                q: "Do I need a credit card for the trial?",
                a: "No! Start your 14-day free trial without any payment information. Upgrade anytime."
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel with one click from your dashboard. No questions asked, no fees."
              },
              {
                q: "What if I need help?",
                a: "We provide 24/7 priority support via chat, email, and phone. Our team is here to ensure your success."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <summary className="font-semibold text-gray-900 cursor-pointer">{faq.q}</summary>
                <p className="text-gray-600 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
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
                <span className="text-xl font-bold">Transition AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered marketing automation for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/#agents" className="hover:text-white">AI Agents</Link></li>
                <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/book" className="hover:text-white">Book a Demo</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
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
            <p>&copy; 2024 Transition AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
