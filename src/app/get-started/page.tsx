import { Metadata } from 'next';
import AuditForm from '@/components/AuditForm';

export const metadata: Metadata = {
  title: 'Get Started - Transition Marketing AI',
  description: 'Start your free trial and get a comprehensive AI marketing audit. Join the first 10 businesses and get 30 days free.',
};

// Modern Logo component
function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-heading-4 text-primary font-bold">Transition AI</span>
    </div>
  );
}

// Benefits component
function Benefits() {
  const benefits = [
    {
      icon: "🎯",
      title: "5 Guaranteed Leads",
      description: "We guarantee 5 confirmed leads during your trial period"
    },
    {
      icon: "💰",
      title: "30 Days Free",
      description: "No credit card required. Full access to all features"
    },
    {
      icon: "📊",
      title: "Free Marketing Audit",
      description: "Comprehensive analysis of your current marketing strategy"
    },
    {
      icon: "🚀",
      title: "Locked-in Pricing",
      description: "Keep your trial pricing for life, even as we scale"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-surface-elevated">
          <div className="text-2xl">{benefit.icon}</div>
          <div>
            <h3 className="font-semibold text-primary mb-1">{benefit.title}</h3>
            <p className="text-sm text-secondary">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-subtle">
        <div className="container-custom">
          <nav className="flex items-center justify-between py-6">
            <a href="/">
              <Logo />
            </a>
            
            <div className="flex items-center space-x-6">
              <a href="/" className="text-body text-secondary hover:text-primary transition-colors">
                Home
              </a>
              <a href="/how-it-works" className="text-body text-secondary hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="/dashboard" className="text-body text-secondary hover:text-primary transition-colors">
                Demo Dashboard
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  🎉 Beta Offer: First 10 businesses get 30 days free
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Start Your <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Free Trial</span>
              </h1>
              <p className="text-xl text-secondary mb-8 leading-relaxed">
                Get a comprehensive AI marketing audit and start generating qualified leads in days, not months.
              </p>
            </div>
          </div>
        </section>

        {/* Form and Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className="card p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      Get Your Free AI Marketing Audit
                    </h2>
                    <p className="text-secondary">
                      Tell us about your business and goals. We'll send a comprehensive audit with recommended automations.
                    </p>
                  </div>
                  
                  <AuditForm />
                </div>

                {/* Benefits Section */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      What You Get
                    </h2>
                    <Benefits />
                  </div>

                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">
                      🎯 Our Guarantee
                    </h3>
                    <p className="text-secondary mb-4">
                      We guarantee 5 confirmed leads during your 30-day trial period, or you don't pay when it ends.
                    </p>
                    <div className="text-sm text-secondary">
                      <p>✓ No long-term contracts</p>
                      <p>✓ Cancel anytime</p>
                      <p>✓ Full access to all features</p>
                      <p>✓ Dedicated support team</p>
                    </div>
                  </div>

                  <div className="card p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                    <h3 className="text-lg font-semibold text-primary mb-4">
                      🚀 What Happens Next?
                    </h3>
                    <div className="space-y-3 text-sm text-secondary">
                      <div className="flex items-start">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                        <span>We review your business profile and goals</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                        <span>Send you a comprehensive marketing audit within 24 hours</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                        <span>Set up your AI marketing engine and start generating leads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-8">
                Trusted by Growing Businesses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-secondary">Businesses in Beta</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-secondary">Leads Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-secondary">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <div className="text-body text-primary mb-2">
                © {new Date().getFullYear()} Transition Marketing AI
              </div>
              <div className="text-caption">
                Made with ❤️ in India
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href="mailto:hello@transitionmarketingai.com"
                className="text-body text-secondary hover:text-primary transition-colors"
              >
                hello@transitionmarketingai.com
              </a>
              <div className="flex items-center gap-6">
                <a
                  href="/privacy"
                  className="text-caption hover:text-primary transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  className="text-caption hover:text-primary transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


