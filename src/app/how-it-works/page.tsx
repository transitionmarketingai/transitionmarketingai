import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works - Transition Marketing AI',
  description: 'Learn how our AI marketing automation works in 3 simple steps. From signup to results in days, not months.',
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

// Step component
function Step({ 
  number, 
  title, 
  description, 
  details, 
  icon, 
  timeline 
}: { 
  number: string; 
  title: string; 
  description: string; 
  details: string[]; 
  icon: string; 
  timeline: string; 
}) {
  return (
    <div className="card p-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {number}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{icon}</span>
            <h3 className="text-2xl font-bold text-primary">{title}</h3>
            <span className="ml-auto text-sm text-secondary bg-surface-elevated px-3 py-1 rounded-full">
              {timeline}
            </span>
          </div>
          <p className="text-lg text-secondary mb-6">{description}</p>
          <ul className="space-y-3">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start text-secondary">
                <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Feature comparison component
function FeatureComparison() {
  const features = [
    {
      category: "Lead Generation",
      traditional: "Manual research, cold emails, follow-ups",
      ourWay: "AI-powered discovery, personalized outreach, automated follow-ups"
    },
    {
      category: "Content Creation",
      traditional: "Hire writers, manage schedules, track performance",
      ourWay: "AI-generated content, automated publishing, real-time analytics"
    },
    {
      category: "Time Investment",
      traditional: "20-40 hours/week",
      ourWay: "2-3 hours/week for review and optimization"
    },
    {
      category: "Cost",
      traditional: "₹50,000-2,00,000/month (team + tools)",
      ourWay: "₹4,999-24,999/month (all-inclusive)"
    }
  ];

  return (
    <div className="card p-8">
      <h3 className="text-2xl font-bold text-primary mb-8 text-center">Traditional vs Our AI Approach</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-subtle">
              <th className="text-left py-4 px-4 text-body font-medium text-secondary">Category</th>
              <th className="text-left py-4 px-4 text-body font-medium text-secondary">Traditional Way</th>
              <th className="text-left py-4 px-4 text-body font-medium text-primary">Our AI Way</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-subtle/50 hover:bg-surface/50">
                <td className="py-4 px-4 text-body font-medium text-primary">{feature.category}</td>
                <td className="py-4 px-4 text-body text-secondary">{feature.traditional}</td>
                <td className="py-4 px-4 text-body text-primary font-medium">{feature.ourWay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Onboarding & Setup",
      description: "We learn about your business, goals, and target audience to customize your AI marketing engine.",
      details: [
        "Complete business profile and goals assessment",
        "Define target audience and ideal customer profile",
        "Set up tracking and analytics infrastructure",
        "Configure AI models for your industry and region"
      ],
      icon: "🎯",
      timeline: "Day 1-2"
    },
    {
      number: "2",
      title: "AI Engine Activation",
      description: "Our AI systems start working immediately - finding leads, creating content, and optimizing campaigns.",
      details: [
        "AI lead discovery and verification begins",
        "Content generation and publishing starts",
        "Multi-channel outreach campaigns launch",
        "Real-time performance monitoring activates"
      ],
      icon: "⚙️",
      timeline: "Day 3-5"
    },
    {
      number: "3",
      title: "Results & Optimization",
      description: "You start seeing qualified leads and content performance. We continuously optimize for better results.",
      details: [
        "First qualified leads delivered to your dashboard",
        "Content performance analytics available",
        "Weekly optimization and strategy adjustments",
        "Scale up or down based on results"
      ],
      icon: "📈",
      timeline: "Day 6+"
    }
  ];

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
              <a href="/get-started" className="btn-primary">
                Get Started Free
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                How Our <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">AI Marketing</span> Works
              </h1>
              <p className="text-xl text-secondary mb-8 leading-relaxed">
                From signup to results in days, not months. Our AI handles the heavy lifting while you focus on growing your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/get-started" className="btn-primary px-8 py-4 text-lg">
                  Start Your Free Trial
                </a>
                <a href="/dashboard" className="btn-secondary px-8 py-4 text-lg">
                  View Demo Dashboard
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Three Simple Steps to Success
              </h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">
                Our streamlined process gets you from zero to generating qualified leads in under a week.
              </p>
            </div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <Step key={index} {...step} />
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16">
          <div className="container-custom">
            <FeatureComparison />
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                What You Get Every Month
              </h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">
                All the tools and results you need to grow your business, delivered automatically.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Qualified Leads",
                  description: "Verified, contactable leads that match your ideal customer profile",
                  icon: "🎯",
                  metric: "200-1000+ leads/month"
                },
                {
                  title: "SEO Content",
                  description: "High-quality blog posts optimized for search engines and your audience",
                  icon: "📝",
                  metric: "4-12+ blogs/month"
                },
                {
                  title: "Social Media",
                  description: "Engaging social media posts across all major platforms",
                  icon: "📱",
                  metric: "8-30+ posts/month"
                },
                {
                  title: "Email Campaigns",
                  description: "Personalized email sequences and newsletter content",
                  icon: "📧",
                  metric: "Automated sequences"
                },
                {
                  title: "Analytics Dashboard",
                  description: "Real-time insights into leads, content performance, and ROI",
                  icon: "📊",
                  metric: "24/7 monitoring"
                },
                {
                  title: "Dedicated Support",
                  description: "Expert support team to help optimize your campaigns",
                  icon: "🤝",
                  metric: "Priority support"
                }
              ].map((item, index) => (
                <div key={index} className="card p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-secondary mb-4">{item.description}</p>
                  <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                    {item.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="card text-center p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
                Join the first 10 businesses and get 30 days free. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/get-started" className="btn-primary px-8 py-4 text-lg">
                  Start Free Trial
                </a>
                <a href="/book" className="btn-secondary px-8 py-4 text-lg">
                  Book a Strategy Call
                </a>
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
