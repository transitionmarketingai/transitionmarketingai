"use client";

import Link from "next/link";
import { useState } from "react";

// Logo component
function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-white">
        Transition<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
      </span>
    </Link>
  );
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="hidden lg:flex items-center space-x-10">
            <Link href="/#agents" className="text-gray-300 hover:text-white transition-colors font-medium">
              Agents
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium">
              How it works
            </Link>
            <Link href="/#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">
              Pricing
            </Link>
          </div>

          <Link 
            href="/get-started" 
            className="px-7 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Agent Card Component (Circular Icons like mockup)
function AgentCard({ 
  icon, 
  name, 
  description, 
  gradient 
}: { 
  icon: string; 
  name: string; 
  description: string; 
  gradient: string;
}) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Circular Icon */}
      <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <span className="text-4xl">{icon}</span>
      </div>
      {/* Name */}
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      {/* Description */}
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

// Pricing Card Component
function PricingCard({ 
  name, 
  price, 
  agents, 
  features,
  highlighted 
}: { 
  name: string; 
  price: string; 
  agents: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={`rounded-2xl border-2 ${highlighted ? 'border-violet-600' : 'border-gray-800'} bg-[#14141f] p-8 hover:border-violet-600 transition-all duration-300`}>
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <div className="text-5xl font-bold text-white mb-2">
        ₹{price}
      </div>
      <p className="text-gray-400 mb-6">{agents}</p>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="text-gray-300 text-sm">
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const agents = [
    {
      icon: "📊",
      name: "LeadGen",
      description: "Generate leads",
      gradient: "from-teal-400 to-emerald-500"
    },
    {
      icon: "📢",
      name: "AdBuddy",
      description: "Create ads",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: "💖",
      name: "Soshie",
      description: "Plan social posts",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: "📧",
      name: "Outreach",
      description: "Send emails",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: "📈",
      name: "Analyst",
      description: "Analyze data",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: "🚀",
      name: "Closer",
      description: "Handle calls",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Your AI Marketing Team
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Six specialized AI agents working 24/7 to automate your marketing, 
              generate leads, and grow your business.
            </p>
            <Link 
              href="/get-started"
              className="inline-block px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
            >
              Try it free →
            </Link>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">AI Agents</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
            {agents.map((agent, index) => (
              <AgentCard key={index} {...agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Power Up Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Brain Illustration Placeholder */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                {/* Placeholder for 3D brain */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="text-9xl">🧠</div>
                </div>
                {/* Floating particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-5xl font-bold mb-8">Power Up!</h2>
              <h3 className="text-3xl font-bold mb-8">
                The smarter way to<br />grow your business
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-300">Accurate lead lists</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-300">Client-ready reports</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-300">In Hindi too!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section id="pricing" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">Simple Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="999"
              agents="6 agents"
              features={["Unlimited messages"]}
            />
            <PricingCard
              name="Pro"
              price="1999"
              agents="10 agents"
              features={["Unlimited messages", "First 5 confirmed leads free"]}
              highlighted={true}
            />
            <PricingCard
              name="Enterprise"
              price="4999"
              agents="Custom no. of agents"
              features={["Unlimited messages"]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">
            Try your first AI Agent today
          </h2>
          <Link 
            href="/get-started"
            className="inline-block px-12 py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
          >
            Get Started Free
          </Link>
          <p className="text-gray-400 mt-6">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo />
              <p className="text-gray-400 text-sm mt-4">
                AI-powered marketing automation
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/#agents" className="hover:text-white transition-colors">AI Agents</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/book" className="hover:text-white transition-colors">Book Demo</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Get Started</h4>
              <Link 
                href="/get-started" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-semibold text-sm hover:shadow-lg transition-all"
              >
                Try it free
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 TransitionAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
