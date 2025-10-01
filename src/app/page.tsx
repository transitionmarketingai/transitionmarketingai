import Link from "next/link";
import Image from "next/image";

// Logo component
function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-gray-900">
        Transition<span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">AI</span>
      </span>
    </Link>
  );
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="hidden lg:flex items-center space-x-10">
            <Link href="/#agents" className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-[15px]">
              Agents
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-[15px]">
              How it works
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-[15px]">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-[15px]">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/get-started" 
              className="px-7 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold text-[15px] hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-200"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Agent Card with Image Placeholder
function AgentCard({ 
  icon, 
  name, 
  description, 
  color,
  imagePlaceholder
}: { 
  icon: string; 
  name: string; 
  description: string; 
  color: string;
  imagePlaceholder: string;
}) {
  const colorClasses = {
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200',
    pink: 'from-pink-50 to-pink-100 border-pink-200',
    cyan: 'from-cyan-50 to-cyan-100 border-cyan-200',
  };

  return (
    <div className={`relative bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-3xl border-2 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden`}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
      
      {/* Image/Mascot Placeholder */}
      <div className="relative mb-6 h-32 flex items-center justify-center">
        <div className="text-7xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          {icon}
        </div>
        {/* Placeholder for future 3D mascot */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity">
          <div className="text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full">
            {imagePlaceholder}
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{name}</h3>
      <p className="text-gray-700 leading-relaxed text-[15px]">{description}</p>
      
      {/* Action hint */}
      <div className="mt-6 flex items-center text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Learn more</span>
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// Feature Badge
function FeatureBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center space-x-3 bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
      <div className="text-3xl">{icon}</div>
      <span className="font-semibold text-gray-900 text-[15px]">{text}</span>
    </div>
  );
}

// Pricing Card
function PricingCard({ 
  name, 
  price, 
  period,
  description, 
  features, 
  isPopular,
  planId,
  badge
}: { 
  name: string; 
  price: string;
  period: string;
  description: string; 
  features: string[];
  isPopular?: boolean;
  planId: string;
  badge?: string;
}) {
  return (
    <div className={`relative bg-white rounded-3xl border-2 ${isPopular ? 'border-purple-600 shadow-2xl shadow-purple-500/20 scale-105' : 'border-gray-200'} p-8 transition-all duration-300 hover:shadow-2xl`}>
      {isPopular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            ⭐ Most Popular
          </div>
        </div>
      )}
      
      {badge && !isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-500 text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {badge}
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{name}</h3>
        <div className="mb-3">
          <span className="text-5xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 ml-2 text-lg">/{period}</span>
        </div>
        <p className="text-gray-600 text-[15px]">{description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700 text-[15px]">{feature}</span>
          </li>
        ))}
      </ul>

      <Link 
        href={`/checkout?plan=${planId}`}
        className={`block w-full text-center px-8 py-4 rounded-xl font-semibold text-[15px] transition-all duration-200 ${
          isPopular 
            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Start free trial
      </Link>
      
      {isPopular && (
        <p className="text-center mt-4 text-sm text-gray-600">
          No credit card required
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const agents = [
    {
      icon: "🎯",
      name: "Lead Finder",
      description: "Discovers and qualifies high-quality leads from LinkedIn, databases, and social media automatically.",
      color: "purple",
      imagePlaceholder: "3D mascot: Detective character with magnifying glass"
    },
    {
      icon: "✍️",
      name: "Content Writer",
      description: "Creates SEO-optimized blogs, social posts, emails, and ad copy that drives engagement and conversions.",
      color: "blue",
      imagePlaceholder: "3D mascot: Writer character with pen and paper"
    },
    {
      icon: "📧",
      name: "Email Pro",
      description: "Manages personalized email campaigns, follow-ups, and drip sequences to nurture leads at scale.",
      color: "green",
      imagePlaceholder: "3D mascot: Mail carrier character with envelope"
    },
    {
      icon: "📱",
      name: "Social Manager",
      description: "Schedules posts, monitors engagement, and manages your presence across all social platforms.",
      color: "orange",
      imagePlaceholder: "3D mascot: Social butterfly character with phone"
    },
    {
      icon: "🔍",
      name: "SEO Expert",
      description: "Optimizes content for search engines, tracks rankings, and improves your organic visibility.",
      color: "pink",
      imagePlaceholder: "3D mascot: Search explorer character with telescope"
    },
    {
      icon: "📊",
      name: "Data Analyst",
      description: "Tracks performance metrics, generates reports, and provides actionable insights to grow faster.",
      color: "cyan",
      imagePlaceholder: "3D mascot: Analyst character with charts and graphs"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹15,999",
      period: "month",
      description: "Perfect for small businesses",
      planId: "starter",
      badge: "🚀 Best Value",
      features: [
        "100 verified leads per month",
        "10 SEO blog posts",
        "30 social media posts",
        "1,000 outreach emails",
        "3 AI agents active",
        "Email support",
        "Analytics dashboard"
      ]
    },
    {
      name: "Growth",
      price: "₹39,999",
      period: "month",
      description: "For growing businesses",
      planId: "growth",
      isPopular: true,
      features: [
        "500 verified leads per month",
        "30 SEO blog posts",
        "100 social media posts",
        "5,000 outreach emails",
        "All 6 AI agents active",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "A/B testing"
      ]
    },
    {
      name: "Enterprise",
      price: "₹99,999",
      period: "month",
      description: "For large teams",
      planId: "enterprise",
      features: [
        "Unlimited verified leads",
        "100 SEO blog posts",
        "Unlimited social posts",
        "20,000 outreach emails",
        "All agents + custom",
        "24/7 dedicated support",
        "White-label options",
        "API access",
        "Custom AI training",
        "Onboarding specialist"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Sintra-style */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-white opacity-70"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white border-2 border-purple-100 shadow-lg mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-semibold text-[15px]">Powered by Advanced AI Models</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Meet Your<br />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                AI Marketing Team
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Six friendly AI agents that handle your marketing on autopilot. 
              From finding leads to creating content—it's like having a full team, without the overhead.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
              <Link 
                href="/get-started" 
                className="px-10 py-5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-200"
              >
                Try it free →
              </Link>
              <Link 
                href="/how-it-works" 
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all duration-200"
              >
                See how it works
              </Link>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <FeatureBadge icon="⚡" text="Setup in 5 minutes" />
              <FeatureBadge icon="💳" text="No credit card" />
              <FeatureBadge icon="🎯" text="100+ leads/month" />
              <FeatureBadge icon="🚀" text="24/7 automation" />
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl border-4 border-white shadow-2xl overflow-hidden aspect-video">
              {/* Placeholder for dashboard screenshot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-gray-600 font-semibold">Dashboard Screenshot Placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">Add your dashboard image here</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section - Sintra Helper Style */}
      <section id="agents" className="py-24 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-purple-50 text-purple-700 font-semibold mb-6 text-[15px] border-2 border-purple-100">
              <span className="mr-2">✨</span>
              Your AI Helper Crew
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              6 AI Agents,<br />Endless Possibilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Think of them as your personal marketing team—each one an expert, 
              all working together to make your business grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <AgentCard key={index} {...agent} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/how-it-works" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-bold text-lg group"
            >
              See how they work together
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">10x</div>
                <div className="text-purple-100 text-[15px]">Faster lead gen</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">70%</div>
                <div className="text-purple-100 text-[15px]">Cost reduction</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-purple-100 text-[15px]">Always working</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-purple-100 text-[15px]">Happy businesses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold mb-6 text-[15px]">
              <span className="mr-2">💰</span>
              Simple Pricing
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free. Scale as you grow. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-[15px]">
              All plans include 14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-600 via-blue-500 to-purple-600 rounded-3xl p-12 md:p-16 text-white text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-10 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-10 -ml-32 -mb-32"></div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to 10x Your Marketing?
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join hundreds of businesses already growing with AI agents. 
                Start your free trial today.
              </p>
              <Link 
                href="/get-started" 
                className="inline-block px-12 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Start free trial →
              </Link>
              <p className="mt-6 text-purple-100 text-sm">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">
                  Transition<span className="text-purple-400">AI</span>
                </span>
              </div>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                AI-powered marketing automation for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[15px]">Product</h4>
              <ul className="space-y-3 text-gray-400 text-[15px]">
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/#agents" className="hover:text-white transition-colors">AI Agents</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[15px]">Company</h4>
              <ul className="space-y-3 text-gray-400 text-[15px]">
                <li><Link href="/book" className="hover:text-white transition-colors">Book Demo</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[15px]">Get Started</h4>
              <p className="text-gray-400 mb-4 text-[15px]">
                Start your free trial and see results in 24 hours.
              </p>
              <Link 
                href="/get-started" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold text-[15px] hover:shadow-lg transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 TransitionAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
