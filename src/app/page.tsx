"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Logo component
function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-gray-900">
        Transition<span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">AI</span>
      </span>
    </Link>
  );
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="hidden lg:flex items-center space-x-10">
            <Link href="/#helpers" className="text-gray-700 hover:text-violet-600 transition-colors font-medium text-[15px]">
              Helpers
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-violet-600 transition-colors font-medium text-[15px]">
              How it works
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-violet-600 transition-colors font-medium text-[15px]">
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/get-started" 
              className="px-7 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-semibold text-[15px] hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-200"
            >
              Try it free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function HomePage() {
  const [email, setEmail] = useState("");

  const helpers = [
    {
      emoji: "🎯",
      name: "Lead Finder",
      description: "Discovers qualified leads from LinkedIn, databases, and social media 24/7.",
      color: "from-violet-50 to-purple-100",
      borderColor: "border-violet-200",
      image: "/mascots/lead-finder-mascot.png"
    },
    {
      emoji: "✍️",
      name: "Content Writer",
      description: "Creates SEO blogs, social posts, emails, and ads that actually convert.",
      color: "from-blue-50 to-cyan-100",
      borderColor: "border-blue-200",
      image: "/mascots/content-writer-mascot.png"
    },
    {
      emoji: "📧",
      name: "Email Pro",
      description: "Manages personalized email campaigns and follow-ups automatically.",
      color: "from-green-50 to-emerald-100",
      borderColor: "border-green-200",
      image: "/mascots/email-pro-mascot.png"
    },
    {
      emoji: "📱",
      name: "Social Manager",
      description: "Handles posting, engagement, and monitoring across all platforms.",
      color: "from-orange-50 to-amber-100",
      borderColor: "border-orange-200",
      image: "/mascots/social-manager-mascot.png"
    },
    {
      emoji: "🔍",
      name: "SEO Expert",
      description: "Optimizes your content and tracks rankings to boost organic traffic.",
      color: "from-pink-50 to-rose-100",
      borderColor: "border-pink-200",
      image: "/mascots/seo-expert-mascot.png"
    },
    {
      emoji: "📊",
      name: "Data Analyst",
      description: "Tracks everything, creates reports, and tells you what's working.",
      color: "from-cyan-50 to-sky-100",
      borderColor: "border-cyan-200",
      image: "/mascots/data-analyst-mascot.png"
    }
  ];

  const integrations = [
    { name: "Gmail", logo: "📧" },
    { name: "Slack", logo: "💬" },
    { name: "Google Calendar", logo: "📅" },
    { name: "LinkedIn", logo: "💼" },
    { name: "Facebook", logo: "📘" },
    { name: "Twitter", logo: "🐦" },
    { name: "Instagram", logo: "📷" },
    { name: "HubSpot", logo: "🔶" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section - Exact Sintra Style */}
      <section className="pt-32 pb-16 px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-violet-700 font-medium text-sm">AI-powered marketing on autopilot</span>
            </div>
            
            {/* Main Heading - Sintra Style */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-[1.1]">
              Your Team of<br />
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                AI Marketing Helpers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Six friendly AI agents handle everything from finding leads to creating content. 
              It's like having a full marketing team, minus the overhead.
            </p>

            {/* Email Signup - Sintra Style */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-violet-500 focus:outline-none text-gray-900 font-medium"
              />
              <Link 
                href="/get-started"
                className="w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-200"
              >
                Try it free →
              </Link>
            </div>

            <p className="text-sm text-gray-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Hero Image/Dashboard Mockup Placeholder */}
          <div className="relative max-w-5xl mx-auto mt-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Placeholder for hero-dashboard.png */}
              <div className="aspect-video bg-gradient-to-br from-violet-100 via-purple-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">💻</div>
                  <p className="text-gray-700 font-semibold text-lg">Dashboard Preview</p>
                  <p className="text-sm text-gray-500 mt-2">Placeholder: hero-dashboard.png</p>
                  <p className="text-xs text-gray-400 mt-1">Generate using ChatGPT prompt from IMAGE_GENERATION_PROMPTS.md</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Sintra Style */}
      <section className="py-8 px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-6">TRUSTED BY 500+ GROWING BUSINESSES</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((company, i) => (
              <div key={i} className="text-xl font-bold text-gray-400">{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Helpers Section - Exact Sintra Layout */}
      <section id="helpers" className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-6">
              <span className="text-violet-700 font-medium text-sm">✨ Meet your AI crew</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              6 AI Helpers,<br />One Powerful Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each helper specializes in something different. Together, they handle 
              all your marketing so you can focus on growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpers.map((helper, index) => (
              <div 
                key={index} 
                className={`relative bg-gradient-to-br ${helper.color} rounded-3xl border-2 ${helper.borderColor} p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 group overflow-hidden`}
              >
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Image/Mascot Placeholder */}
                <div className="relative mb-6 h-40 flex items-center justify-center">
                  <div className="text-8xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {helper.emoji}
                  </div>
                  {/* Placeholder hint */}
                  <div className="absolute bottom-0 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full inline-block">
                      Image: {helper.image.split('/').pop()}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{helper.name}</h3>
                <p className="text-gray-700 leading-relaxed">{helper.description}</p>
                
                {/* Learn more link */}
                <div className="mt-6 flex items-center text-violet-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Sintra Style */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Simple as 1, 2, 3
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes, not months. No technical skills required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Tell us about your business",
                description: "Share your goals, target audience, and brand voice. Takes 5 minutes.",
                icon: "🎯"
              },
              {
                step: "02",
                title: "AI helpers get to work",
                description: "Your team springs into action—finding leads, creating content, managing campaigns.",
                icon: "🚀"
              },
              {
                step: "03",
                title: "Watch your business grow",
                description: "Monitor everything from your dashboard. Adjust and optimize as you go.",
                icon: "📈"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-6">{item.icon}</div>
                <div className="text-violet-600 font-bold text-sm mb-2">STEP {item.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/how-it-works"
              className="inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold text-lg group"
            >
              See the full process
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Sintra Style */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-violet-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">10x</div>
              <div className="text-violet-100">Faster growth</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">70%</div>
              <div className="text-violet-100">Lower costs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-violet-100">Always working</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-violet-100">Happy customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations - Sintra Style */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Works with the tools you already use
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center space-x-2 px-6 py-3 bg-gray-50 rounded-full border border-gray-200">
                <span className="text-2xl">{integration.logo}</span>
                <span className="font-medium text-gray-700">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Sintra Style */}
      <section id="pricing" className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free. Scale as you grow. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "₹15,999",
                description: "Perfect for small businesses",
                features: [
                  "100 leads per month",
                  "10 blog posts",
                  "30 social posts",
                  "1,000 emails",
                  "3 AI helpers",
                  "Email support"
                ],
                cta: "Start free trial",
                highlight: false
              },
              {
                name: "Growth",
                price: "₹39,999",
                description: "For growing teams",
                features: [
                  "500 leads per month",
                  "30 blog posts",
                  "100 social posts",
                  "5,000 emails",
                  "All 6 AI helpers",
                  "Priority support",
                  "Advanced analytics"
                ],
                cta: "Start free trial",
                highlight: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Unlimited leads",
                  "Unlimited content",
                  "Unlimited emails",
                  "All 6 AI helpers",
                  "Custom integrations",
                  "Dedicated support",
                  "White-label option"
                ],
                cta: "Contact sales",
                highlight: false
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-2xl ${
                  plan.highlight 
                    ? 'border-violet-600 shadow-xl scale-105' 
                    : 'border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-6 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-600 ml-2">/mo</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-violet-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/get-started"
                  className={`block w-full text-center px-8 py-4 rounded-full font-semibold transition-all duration-200 ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center mt-12 text-gray-600">
            All plans include 14-day free trial • No credit card required
          </p>
        </div>
      </section>

      {/* Final CTA - Sintra Style */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join 500+ businesses already using AI to automate their marketing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-violet-500 focus:outline-none text-gray-900 font-medium"
            />
            <Link 
              href="/get-started"
              className="w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-200"
            >
              Try it free →
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer - Sintra Style */}
      <footer className="bg-gray-900 text-white py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">TransitionAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered marketing automation for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/#helpers" className="hover:text-white transition-colors">Helpers</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/book" className="hover:text-white transition-colors">Book demo</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Get Started</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Start your free trial today.
              </p>
              <Link 
                href="/get-started" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-semibold text-sm hover:shadow-lg transition-all"
              >
                Try it free
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TransitionAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
