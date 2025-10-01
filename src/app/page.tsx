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

      {/* Hero Section - Sintra.ai Inspired */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 bg-black">
        {/* Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:space-y-12">
              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                  AI Marketing Agents:
                  <br />
                  <span className="text-white">
                    Your Helpers That Never Sleep
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                  Build, grow, and scale your business with a team of AI marketing agents.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/get-started"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold text-lg rounded-lg transition-all duration-200"
                >
                  How it works
                </Link>
              </div>
            </div>
            
            {/* Right Column - Marketing Office Mascot */}
            <div className="relative flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                {/* Modern Office Background */}
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-2xl overflow-hidden aspect-[4/3]">
                  {/* Office Ceiling */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-200 to-slate-300">
                    <div className="flex h-full">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex-1 border-r border-slate-400/30"></div>
                      ))}
                    </div>
                    {/* Ceiling Lights */}
                    <div className="absolute top-2 left-1/4 w-3 h-3 bg-yellow-300 rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute top-2 right-1/4 w-3 h-3 bg-yellow-300 rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  {/* Office Window */}
                  <div className="absolute top-16 left-4 w-24 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg shadow-inner">
                    <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded opacity-80"></div>
                    <div className="absolute bottom-1 left-2 w-1 h-1 bg-blue-800 rounded-full"></div>
                    <div className="absolute bottom-2 right-3 w-1 h-1 bg-blue-800 rounded-full"></div>
                    <div className="absolute top-2 left-3 w-1 h-1 bg-blue-800 rounded-full"></div>
                  </div>
                  
                  {/* Office Desk */}
                  <div className="absolute bottom-8 left-0 right-0 h-16 bg-gradient-to-t from-slate-800 to-slate-700 rounded-t-2xl shadow-lg">
                    {/* Desk Legs */}
                    <div className="absolute -bottom-4 left-4 w-2 h-4 bg-slate-800 rounded"></div>
                    <div className="absolute -bottom-4 right-4 w-2 h-4 bg-slate-800 rounded"></div>
                    
                    {/* Desk Items */}
                    <div className="absolute top-2 left-8 w-16 h-1 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full shadow-sm"></div>
                    <div className="absolute top-1 left-8 w-1 h-3 bg-gray-600 rounded-full"></div>
                    <div className="absolute top-1 right-8 w-1 h-3 bg-gray-600 rounded-full"></div>
                    
                    {/* Marketing Charts */}
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded shadow-sm"></div>
                    
                    {/* Office Supplies */}
                    <div className="absolute top-3 right-12 w-2 h-2 bg-slate-600 rounded-full"></div>
                    <div className="absolute top-4 right-16 w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                  </div>
                </div>
                
                {/* AI Marketing Robot Mascot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                    {/* Robot Body */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-purple-400 to-blue-500 rounded-t-2xl shadow-xl">
                      {/* Body Segments */}
                      <div className="absolute top-4 left-1 right-1 h-0.5 bg-purple-300 rounded"></div>
                      <div className="absolute top-8 left-1 right-1 h-0.5 bg-purple-300 rounded"></div>
                      <div className="absolute top-12 left-1 right-1 h-0.5 bg-purple-300 rounded"></div>
                      
                      {/* Chest Panel */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-purple-200 to-purple-300 rounded shadow-inner">
                        <div className="absolute top-1 left-1 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-purple-500 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Robot Head */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full shadow-xl">
                      {/* Glowing Pink Eyes */}
                      <div className="absolute top-3 left-2 right-2 h-8 bg-gradient-to-b from-pink-200/90 to-pink-300/70 rounded-full shadow-inner">
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      
                      {/* Head Details */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-purple-500 rounded"></div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-purple-500 rounded"></div>
                      
                      {/* Ear-like Structures */}
                      <div className="absolute top-2 -left-1 w-3 h-3 bg-cyan-400 rounded-full shadow-md"></div>
                      <div className="absolute top-2 -right-1 w-3 h-3 bg-cyan-400 rounded-full shadow-md"></div>
                    </div>
                    
                    {/* Robot Arms */}
                    <div className="absolute top-6 -left-3 w-5 h-10 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full shadow-lg">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-300 rounded"></div>
                    </div>
                    <div className="absolute top-6 -right-3 w-5 h-10 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full shadow-lg">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-300 rounded"></div>
                    </div>
                    
                    {/* TM Logo */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-purple-600 font-bold text-xs">TM</span>
                    </div>
                  </div>
                </div>
                
                {/* Holographic Marketing Displays */}
                <div className="absolute top-8 right-8 w-16 h-12 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-lg shadow-lg backdrop-blur-sm">
                  <div className="absolute inset-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-pink-400 rounded-full"></div>
                </div>
                
                <div className="absolute top-16 right-4 w-12 h-8 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-lg shadow-lg backdrop-blur-sm">
                  <div className="absolute inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Floating Marketing Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-12 right-12 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-16 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-8 right-16 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="py-20 px-6 lg:px-8 bg-[#0a0a0f]">
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
      <section className="py-20 px-6 lg:px-8 bg-[#0a0a0f]">
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
