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
    <div className={`rounded-2xl border-2 ${highlighted ? 'border-violet-600 bg-violet-600/10' : 'border-gray-800'} bg-gray-900/50 backdrop-blur-sm p-8 hover:border-violet-600 transition-all duration-300 relative`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <div className="text-5xl font-bold text-white mb-2">
          ₹{price}
          <span className="text-lg text-gray-400 font-normal">/month</span>
        </div>
        <p className="text-gray-400 mb-8">{agents}</p>
        
        <div className="space-y-4 mb-8 text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-violet-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <Link 
          href="/get-started"
          className={`block w-full px-6 py-3 rounded-lg font-medium text-center transition-all duration-200 ${
            highlighted 
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/50' 
              : 'border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const agents = [
    {
      icon: "🎯",
      name: "LeadGen",
      description: "Find and qualify leads",
      gradient: "from-teal-400 to-emerald-500"
    },
    {
      icon: "📢",
      name: "AdBuddy",
      description: "Create ad campaigns",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: "📱",
      name: "Soshie",
      description: "Manage social media",
      gradient: "from-blue-400 to-blue-600"
    }
  ];

  const integrations = [
    { icon: "⏰", name: "Clock" },
    { icon: "📧", name: "Email" },
    { icon: "🔄", name: "Sync" },
    { icon: "📷", name: "Camera", highlighted: true },
    { icon: "✉️", name: "Mail" }
  ];

  const powerUps = [
    {
      title: "Campaign Funnels",
      description: "Automate, optimize, thrive"
    },
    {
      title: "Ad Tuner",
      description: "Precise ad copy as pro level"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "689",
      period: "month",
      agents: "Up to 3 agents",
      features: ["Basic lead generation", "Email support", "Standard templates"]
    },
    {
      name: "Essential",
      price: "999",
      period: "month",
      agents: "Up to 5 agents",
      features: ["Advanced features", "Priority support", "Custom integrations"],
      highlighted: true
    }
  ];

  const industries = [
    { name: "Real Estate", color: "from-blue-500 to-purple-600" },
    { name: "Clinics", color: "from-green-500 to-teal-600" },
    { name: "Education", color: "from-orange-500 to-red-600" }
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {agents.map((agent, index) => (
              <AgentCard key={index} {...agent} />
            ))}
          </div>
          
          {/* Integration Icons */}
          <div className="flex justify-center items-center space-x-6 mb-16">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  integration.highlighted 
                    ? 'bg-blue-500' 
                    : 'bg-gray-800 hover:bg-gray-700'
                } transition-colors`}
              >
                {integration.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section - Two Column Layout */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column */}
            <div className="space-y-16">
              
              {/* Built for INDIA Section */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-8">Built for INDIA</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Campaigns</h3>
                    <p className="text-gray-300 text-sm">Learn and optimize your campaign management with advanced automation.</p>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Content</h3>
                    <p className="text-gray-300 text-sm">Create engaging content and manage your social media presence effectively.</p>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Contact</h3>
                    <p className="text-gray-300 text-sm">Break your barriers and connect with all stakeholders through intelligent automation.</p>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Proposals</h3>
                    <p className="text-gray-300 text-sm">Create professional proposals and manage client relationships with ease.</p>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Hindi Support</h3>
                    <p className="text-gray-300 text-sm">Available in Hindi language with full support for Indian business needs.</p>
                  </div>
                </div>
              </div>

              {/* Power-Ups Section */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-8">Power-Ups for Your Agents</h2>
                <div className="space-y-6">
                  {powerUps.map((powerUp, index) => (
                    <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                      <h3 className="text-xl font-bold text-white mb-2">{powerUp.title}</h3>
                      <p className="text-gray-300">{powerUp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Section */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-8">Pricing</h2>
                <div className="space-y-6">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-4">Starter</h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      ₹55 <span className="text-lg text-gray-400 font-normal">/ month</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Basic lead generation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Email support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Standard templates</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Basic analytics</span>
                      </div>
                    </div>
                    <Link 
                      href="/get-started"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium text-center hover:shadow-lg transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-violet-600">
                    <h3 className="text-xl font-bold text-white mb-4">Pro</h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      ₹590 <span className="text-lg text-gray-400 font-normal">/ month</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Advanced lead generation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Priority support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Custom integrations</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Advanced analytics</span>
                      </div>
                    </div>
                    <Link 
                      href="/get-started"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium text-center hover:shadow-lg transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-4">Business</h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      ₹1030 <span className="text-lg text-gray-400 font-normal">/ month</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Unlimited everything</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">Dedicated account manager</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">White-label solution</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">API access</span>
                      </div>
                    </div>
                    <Link 
                      href="/get-started"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium text-center hover:shadow-lg transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tour Section */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Tour our platform</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-300">Explore premium plans?</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-300">What to expect from our platform?</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-300">Do I get a free setup?</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-16">
              
              {/* How It Works Section */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-8">How It Works</h2>
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Sign up in minutes</h3>
                    <p className="text-gray-300">Register with UPI and get started instantly with our streamlined process.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Chat with your personal AI</h3>
                    <p className="text-gray-300">Interact directly with your dedicated AI assistant for all marketing needs.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Get results on autopilot</h3>
                    <p className="text-gray-300">Watch your marketing campaigns run automatically and deliver consistent results.</p>
                  </div>
                  
                  <div className="text-center">
                    <Link 
                      href="/get-started"
                      className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-200"
                    >
                      Get Started Free
                    </Link>
                  </div>
                </div>
              </div>

              {/* Your Brand Brain Section */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Your Brand Brain</h2>
                <p className="text-xl text-gray-300 mb-8">
                  An AI trained on your brand and business.
                </p>
                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                      <div className="text-6xl">🧠</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Try Prototype Section */}
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Try Prototype</h2>
                <p className="text-xl text-gray-300 mb-8">Chat with your personal AI agent</p>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                    <p className="text-gray-300">List healthcare information for medical offices?</p>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                    <p className="text-gray-300">Add landscaping, reporting, and project management</p>
                  </div>
                  
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                    <p className="text-gray-300">Create campaigns for real estate, clinics, and education</p>
                  </div>
                </div>
                
                <Link 
                  href="/get-started"
                  className="block w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-bold text-center hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
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
