import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works - Transition AI | AI Marketing Agents',
  description: 'Learn how our AI marketing agents work together to automate lead generation, content creation, and campaign management. Get started in minutes.',
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

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Business",
      description: "Tell us about your business, target audience, and marketing goals. Our AI learns your brand voice and objectives.",
      icon: "🎯",
      timeline: "5 minutes",
      features: [
        "Business profile setup",
        "Target audience definition",
        "Brand voice configuration",
        "Goal setting & KPIs"
      ]
    },
    {
      number: "02",
      title: "AI Agents Activate",
      description: "Your team of AI agents springs into action, each handling specialized marketing tasks automatically.",
      icon: "🤖",
      timeline: "Instant",
      features: [
        "Lead generation starts immediately",
        "Content creation begins",
        "Campaign automation launches",
        "Analytics tracking activates"
      ]
    },
    {
      number: "03",
      title: "Monitor & Optimize",
      description: "Watch your marketing run on autopilot from your dashboard. AI continuously optimizes for better results.",
      icon: "📊",
      timeline: "Ongoing",
      features: [
        "Real-time performance tracking",
        "Automated A/B testing",
        "Continuous optimization",
        "Weekly insights & reports"
      ]
    }
  ];

  const agents = [
    {
      icon: "🎯",
      name: "Lead Gen Agent",
      task: "Finding Prospects",
      description: "Scans LinkedIn, databases, and social media for qualified leads matching your ICP."
    },
    {
      icon: "✍️",
      name: "Content Agent",
      task: "Creating Content",
      description: "Generates SEO-optimized blogs, social posts, emails, and ad copy on schedule."
    },
    {
      icon: "📧",
      name: "Outreach Agent",
      task: "Email Campaigns",
      description: "Sends personalized emails, manages follow-ups, and tracks engagement."
    },
    {
      icon: "📱",
      name: "Social Agent",
      task: "Social Management",
      description: "Posts content, monitors engagement, and responds to interactions."
    },
    {
      icon: "🔍",
      name: "SEO Agent",
      task: "Search Optimization",
      description: "Optimizes content for search engines and tracks keyword rankings."
    },
    {
      icon: "📊",
      name: "Analytics Agent",
      task: "Performance Tracking",
      description: "Monitors all metrics, generates reports, and provides actionable insights."
    }
  ];

  const comparison = [
    {
      aspect: "Setup Time",
      traditional: "2-4 weeks",
      withAI: "5 minutes"
    },
    {
      aspect: "Team Size",
      traditional: "5-10 people",
      withAI: "Just you + AI"
    },
    {
      aspect: "Monthly Cost",
      traditional: "₹1,50,000+",
      withAI: "₹15,999+"
    },
    {
      aspect: "Lead Generation",
      traditional: "Manual research",
      withAI: "Automated 24/7"
    },
    {
      aspect: "Content Creation",
      traditional: "Hire writers",
      withAI: "AI-generated"
    },
    {
      aspect: "Campaign Management",
      traditional: "Manual tracking",
      withAI: "Auto-optimized"
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
              Simple & Powerful
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              How Your
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"> AI Team </span>
              Works
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              From setup to results in minutes. Your AI marketing agents work 24/7 while you focus on growing your business.
            </p>

            <Link 
              href="/get-started" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-6">{step.icon}</div>
                <div className="text-purple-600 font-bold text-sm mb-2">STEP {step.number}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                
                <div className="flex items-center space-x-2 mb-6">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-500">{step.timeline}</span>
                </div>

                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Working Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
              Behind the Scenes
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Your Agents Working 24/7
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              While you sleep, your AI team is finding leads, creating content, and optimizing campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{agent.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{agent.name}</h3>
                    <div className="text-xs text-purple-600 font-medium mb-2">{agent.task}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{agent.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6">
              The Difference
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Traditional vs AI Automation
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm"></th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Traditional Marketing</th>
                  <th className="text-left py-4 px-6 text-purple-600 font-medium text-sm">With Transition AI</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{item.aspect}</td>
                    <td className="py-4 px-6 text-gray-600">{item.traditional}</td>
                    <td className="py-4 px-6 text-purple-600 font-medium">{item.withAI}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-12 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Automate Your Marketing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/get-started" 
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-medium text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Start Free Trial →
              </Link>
              <Link 
                href="/book" 
                className="px-8 py-4 bg-purple-800 text-white rounded-lg font-medium text-lg hover:bg-purple-900 transition-all duration-200"
              >
                Book a Demo
              </Link>
            </div>
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
