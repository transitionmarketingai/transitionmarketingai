import Link from "next/link";
import Image from "next/image";

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
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/#agents" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              AI Agents
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/get-started" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Agent Card Component
function AgentCard({ 
  icon, 
  name, 
  description, 
  capabilities 
}: { 
  icon: string; 
  name: string; 
  description: string; 
  capabilities: string[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-purple-300 transition-all duration-300 group">
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{name}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <div className="space-y-2">
        {capabilities.map((capability, index) => (
          <div key={index} className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700 text-sm">{capability}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pricing Card Component
function PricingCard({ 
  name, 
  price, 
  description, 
  features, 
  isPopular,
  planId 
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: string[];
  isPopular?: boolean;
  planId: string;
}) {
  return (
    <div className={`relative bg-white rounded-2xl border-2 ${isPopular ? 'border-purple-600 shadow-2xl scale-105' : 'border-gray-200'} p-8 transition-all duration-300 hover:shadow-xl`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="text-5xl font-bold text-gray-900 mb-2">
          {price}
          <span className="text-lg font-normal text-gray-600">/mo</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link 
        href={`/checkout?plan=${planId}`}
        className={`block w-full text-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          isPopular 
            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg hover:scale-105' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
}

export default function HomePage() {
  const agents = [
    {
      icon: "🎯",
      name: "Lead Generation Agent",
      description: "Automatically finds and qualifies high-quality leads based on your ideal customer profile.",
      capabilities: [
        "LinkedIn & social media prospecting",
        "Company database scanning",
        "Lead scoring & qualification",
        "CRM integration & updates"
      ]
    },
    {
      icon: "✍️",
      name: "Content Creation Agent",
      description: "Creates SEO-optimized content across all channels to drive engagement and conversions.",
      capabilities: [
        "Blog posts & articles",
        "Social media content",
        "Email campaigns",
        "Ad copy & landing pages"
      ]
    },
    {
      icon: "📧",
      name: "Email Outreach Agent",
      description: "Manages personalized email campaigns at scale with intelligent follow-ups and scheduling.",
      capabilities: [
        "Personalized email sequences",
        "Smart follow-up timing",
        "A/B testing & optimization",
        "Response tracking & analysis"
      ]
    },
    {
      icon: "📱",
      name: "Social Media Agent",
      description: "Manages your social presence across platforms with consistent, engaging content.",
      capabilities: [
        "Multi-platform posting",
        "Engagement monitoring",
        "Trending topic suggestions",
        "Performance analytics"
      ]
    },
    {
      icon: "🔍",
      name: "SEO Optimization Agent",
      description: "Improves your search rankings through continuous optimization and technical SEO.",
      capabilities: [
        "Keyword research & tracking",
        "On-page SEO optimization",
        "Technical SEO audits",
        "Competitor analysis"
      ]
    },
    {
      icon: "📊",
      name: "Analytics Agent",
      description: "Tracks performance across all channels and provides actionable insights.",
      capabilities: [
        "Real-time performance tracking",
        "Custom report generation",
        "ROI measurement",
        "Predictive analytics"
      ]
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹15,999",
      description: "Perfect for small businesses",
      planId: "starter",
      features: [
        "100 verified leads/month",
        "10 SEO blog posts/month",
        "30 social media posts/month",
        "1,000 outreach emails/month",
        "3 AI agents active",
        "Basic analytics dashboard",
        "Email support"
      ]
    },
    {
      name: "Growth",
      price: "₹39,999",
      description: "For growing businesses",
      planId: "growth",
      isPopular: true,
      features: [
        "500 verified leads/month",
        "30 SEO blog posts/month",
        "100 social media posts/month",
        "5,000 outreach emails/month",
        "All 6 AI agents active",
        "Advanced analytics & insights",
        "Priority support",
        "Custom integrations"
      ]
    },
    {
      name: "Enterprise",
      price: "₹99,999",
      description: "For large teams",
      planId: "enterprise",
      features: [
        "Unlimited verified leads",
        "100 SEO blog posts/month",
        "Unlimited social posts",
        "20,000 outreach emails/month",
        "All 6 AI agents + custom",
        "Custom analytics & reports",
        "24/7 dedicated support",
        "White-label options",
        "API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-8">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2 animate-pulse"></span>
              Powered by Advanced AI
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Your Team of
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"> AI Marketing </span>
              Agents
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Automate your entire marketing workflow with specialized AI agents that work 24/7 to grow your business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link 
                href="/get-started" 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Start Free Trial →
              </Link>
              <Link 
                href="/how-it-works" 
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium text-lg border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600 transition-all duration-200"
              >
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">10x</div>
                <div className="text-gray-600">Faster Lead Generation</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">70%</div>
                <div className="text-gray-600">Cost Reduction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Always Active</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">6</div>
                <div className="text-gray-600">Specialized Agents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
              Meet Your AI Team
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Specialized Agents for Every Task
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each agent is trained for specific marketing tasks and works together seamlessly to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <AgentCard key={index} {...agent} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6">
              Simple Process
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Start in Minutes, Not Months
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Set Your Goals</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your business, target audience, and marketing objectives. Our AI learns your brand voice and preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Agents Get to Work</h3>
              <p className="text-gray-600 leading-relaxed">
                Your AI team springs into action, finding leads, creating content, and managing campaigns across all channels.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Watch Growth Happen</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor real-time performance, get actionable insights, and watch your business grow while AI handles the work.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/how-it-works" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-lg"
            >
              Learn more about how it works →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-6">
              Simple Pricing
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Choose Your AI Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start with a free trial. Scale as you grow. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-12 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to 10x Your Marketing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of businesses already growing with AI marketing agents.
            </p>
            <Link 
              href="/get-started" 
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-medium text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Start Free Trial →
            </Link>
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
                Get Started
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
