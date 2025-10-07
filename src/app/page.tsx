'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuditForm from '@/components/AuditForm';

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState('overview');

  const features = [
    {
      id: 'overview',
      name: 'Dashboard Overview',
      icon: '📊',
      description: 'Real-time metrics and performance tracking',
      image: '/screenshots/dashboard-overview.jpg',
      details: 'Monitor your campaigns across Indian markets - Delhi, Mumbai, Bangalore, Chennai with region-specific analytics and Indian customer insights.'
    },
    {
      id: 'ai-leads',
      name: 'AI Lead Generation',
      icon: '🤖',
      description: 'AI-powered lead discovery and enrichment',
      image: '/screenshots/ai-lead-generation.jpg',
      details: 'Generate leads from Indian companies using AI that understands Indian business patterns - CII members, FICCI companies, Mumbai corporates, Bangalore startups.'
    },
    {
      id: 'crm-pipeline',
      name: 'CRM Pipeline',
      icon: '🏗️',
      description: 'Visual deal pipeline with drag & drop',
      image: '/screenshots/crm-pipeline.jpg',
      details: 'Indian sales process management - track deals through traditional Indian sales cycles, regional customization, and local payment methods.'
    },
    {
      id: 'billing',
      name: 'Credit Management',
      icon: '💰',
      description: 'Flexible credit system and billing',
      image: '/screenshots/credit-management.jpg',
      details: 'Flexible pricing in INR with Razorpay, Paytm integrations. Scale across Indian markets without currency conversion or international fees.'
    }
  ];

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content="AI-powered lead generation with smart unlocking. Preview unlimited leads FREE, unlock contacts for 5 credits. Try before you buy!" />
        <meta name="keywords" content="AI lead generation, credit-based leads, unlock contacts, lead preview, marketing automation, CRM, B2B leads India" />
      </head>
      <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                T
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Transition Marketing AI</h1>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</a>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/signin" className="hidden sm:block text-gray-600 hover:text-gray-900 text-sm md:text-base font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="px-3 py-2 md:px-6 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base font-medium">
                <span className="hidden sm:inline">Start Free Trial</span>
                <span className="sm:hidden">Start Trial</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Preview Unlimited Leads FREE.</span><br/>
              Unlock Only the Best.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-3xl mx-auto px-4">
              Generate unlimited leads with AI. See company names, AI scores, and quality indicators for FREE. 
              Only pay 20 credits to unlock the contacts you actually want.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8 text-sm font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Unlimited Searches</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">AI-Scored Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Pay Per Unlock</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all">
                Try AI Lead Generation
              </Link>
              <Link href="/checkout?plan=starter" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 font-semibold">
                Start Free Trial
              </Link>
            </div>

            {/* Hero Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 mx-auto max-w-6xl">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4">Transition Marketing AI Dashboard</span>
                </div>
              </div>
              
              {/* Lead Preview Mockup - Shows Unlock Feature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Locked Lead Card */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-gray-900">TechCorp Solutions</div>
                      <div className="text-xs text-gray-600">Technology · Mumbai · 50-200</div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">95</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded p-2 mb-3">
                    <div className="text-xs text-blue-800">💡 Growing company, active online</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2 mb-2 filter blur-sm">
                    <div className="text-xs text-gray-400">Contact: ████████</div>
                    <div className="text-xs text-gray-400">Email: ████@████.com</div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded font-medium">
                    🔓 Unlock - 20 Credits
                  </button>
                </div>

                {/* Unlocked Lead Card */}
                <div className="bg-white border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-gray-900">HealthFirst Clinic</div>
                      <div className="text-xs text-gray-600">Healthcare · Delhi · 10-50</div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">92</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-2 mb-2">
                    <div className="text-xs text-gray-700"><strong>Contact:</strong> Dr. Sharma</div>
                    <div className="text-xs text-gray-700"><strong>Email:</strong> sharma@health.com</div>
                    <div className="text-xs text-gray-700"><strong>Phone:</strong> +91-98765-43210</div>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex-1 py-1.5 border border-blue-300 text-blue-700 text-xs rounded font-medium">CRM</button>
                    <button className="flex-1 py-1.5 bg-purple-600 text-white text-xs rounded font-medium">Email</button>
                  </div>
                  <div className="mt-2 text-xs text-green-600 text-center">✅ Unlocked</div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-900">127</div>
                  <div className="text-xs text-blue-700">Leads This Week</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-900">18</div>
                  <div className="text-xs text-purple-700">Unlocked</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-900">640</div>
                  <div className="text-xs text-green-700">Credits Left</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered lead generation to automated outreach and pipeline management, 
              we provide the complete toolkit for modern marketers.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeFeature === feature.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{feature.icon}</span>
                    <span>{feature.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Feature Display */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Feature Description */}
              <div className="p-12">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-4">
                    <span className="mr-2">{features.find(f => f.id === activeFeature)?.icon}</span>
                    {features.find(f => f.id === activeFeature)?.name}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {features.find(f => f.id === activeFeature)?.description}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {features.find(f => f.id === activeFeature)?.details}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-3">✓</span>
                    <span className="text-gray-700">Advanced AI algorithms for precise targeting</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-3">✓</span>
                    <span className="text-gray-700">Real-time data enrichment and validation</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-3">✓</span>
                    <span className="text-gray-700">Automated scoring and qualification</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-3">✓</span>
                    <span className="text-gray-700">Seamless CRM integration</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                    Try Feature Now
                  </Link>
                </div>
              </div>

              {/* Feature Screenshot */}
              <div className="bg-gray-50 p-6 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-full max-w-lg">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="ml-2">{features.find(f => f.id === activeFeature)?.name}</span>
                    </div>
                  </div>
                  
                  {/* Mock Feature Interface */}
                  <div className="space-y-4">
                    {activeFeature === 'overview' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-lg font-bold text-blue-900">1,247</div>
                            <div className="text-xs text-blue-700">Total Leads</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-lg font-bold text-green-900">12.8%</div>
                            <div className="text-xs text-green-700">Conversion</div>
                          </div>
                        </div>
                        <div className="h-20 bg-gray-100 rounded-lg flex items-end p-2">
                          <div className="flex space-x-1 w-full">
                            {[30, 50, 70, 60, 80, 90, 85].map((h, i) => (
                              <div key={i} className="bg-blue-500 rounded-t" style={{ height: `${h}%`, flex: 1 }}></div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activeFeature === 'ai-leads' && (
                      <>
                        <div className="space-y-2">
                          <div className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs mr-2">SJ</div>
                              <div className="flex-1">
                                <div className="text-sm font-medium">Sarah Johnson</div>
                                <div className="text-XS text-gray-500">TechCorp Solutions</div>
                              </div>
                              <div className="w-8 bg-gray-200 rounded-full h-1">
                                <div className="bg-green-500 h-1 rounded-full" style={{ width: '87%' }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs mr-2">MC</div>
                              <div className="flex-1">
                                <div className="text-sm font-medium">Michael Chen</div>
                                <div className="text-XS text-gray-500">StartupXYZ</div>
                              </div>
                              <div className="w-8 bg-gray-200 rounded-full h-1">
                                <div className="bg-green-500 h-1 rounded-full" style={{ width: '95%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                          🚀 Generate AI Leads
                        </button>
                      </>
                    )}

                    {activeFeature === 'crm-pipeline' && (
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900">Pipeline Overview</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-purple-50 rounded p-2">
                            <div className="text-lg font-bold text-purple-900">8</div>
                            <div className="text-xs text-purple-700">Qualified</div>
                          </div>
                          <div className="bg-blue-50 rounded p-2">
                            <div className="text-lg font-bold text-blue-900">5</div>
                            <div className="text-xs text-blue-700">Proposals</div>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-2 h-16 flex items-center justify-center">
                          <div className="text-xs text-gray-600">Drag & drop interface</div>
                        </div>
                      </div>
                    )}

                    {activeFeature === 'billing' && (
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900">Credit Balance</div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-blue-900">1,250</div>
                          <div className="text-xs text-blue-700">Available Credits</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-600">Used this month</span>
                            <span className="text-gray-900">4,890 credits</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Marketing Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of marketers who've scaled their lead generation with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl font-bold text-emerald-600 mb-2">2.5M+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Leads Generated</div>
              <div className="text-gray-600">Across all customer campaigns</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">89%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Success Rate</div>
              <div className="text-gray-600">Campaign conversion average</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Active Users</div>
              <div className="text-gray-600">Growing every day</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pay Only for Leads You Want
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monthly subscription for platform access + credits. Generate unlimited leads FREE, unlock only the best contacts.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-blue-900">20 credits = 1 unlocked contact (name + email + phone)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">₹4,999</div>
                <div className="text-gray-600 mb-4">per month</div>
                <p className="text-gray-600">Perfect for small businesses getting started</p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-1">200 Credits</div>
                  <div className="text-sm text-blue-700">= 10 Unlocked Contacts/month</div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Unlimited</strong> lead generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Unlimited</strong> FREE previews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">200 credits (10 unlocks)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">AI-powered lead scoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Email & CRM tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Real-time analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>

              <Link href="/signup" className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold text-center block">
                Start Free Trial
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-xl border-2 border-blue-500 p-8 relative shadow-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">₹12,999</div>
                <div className="text-gray-600 mb-4">per month</div>
                <p className="text-gray-600">For growing teams with higher volume needs</p>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-300 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-900 mb-1">500 Credits</div>
                  <div className="text-sm text-purple-700">= 25 Unlocked Contacts/month</div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Unlimited</strong> lead generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Unlimited</strong> FREE previews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">500 credits (25 unlocks)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Saved searches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Advanced AI insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Multi-channel outreach</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Priority support + API access</span>
                </li>
              </ul>

              <Link href="/signup" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-center block">
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">₹24,999</div>
                <div className="text-gray-600 mb-4">per month</div>
                <p className="text-gray-600">Custom solutions for large organizations</p>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-300 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-900 mb-1">1000 Credits</div>
                  <div className="text-sm text-indigo-700">= 50 Unlocked Contacts/month</div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Unlimited</strong> lead generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Unlimited</strong> FREE previews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">1000 credits (50 unlocks)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Saved searches + favorites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">White-label options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Dedicated success manager</span>
                </li>
              </ul>

              <Link href="/contact" className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 font-semibold text-center block">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* How Credits Work */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💎 How Credits Work</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Always FREE</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Generate unlimited leads</li>
                        <li>• Preview company names</li>
                        <li>• See AI quality scores</li>
                        <li>• View basic insights</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Pay Per Unlock</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 20 credits per contact</li>
                        <li>• Get name, email, phone</li>
                        <li>• Detailed AI insights</li>
                        <li>• Keep unlocked forever</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-purple-300">
                <h4 className="font-bold text-gray-900 mb-4 text-center">Need More Credits?</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100</div>
                    <div className="text-sm text-gray-600">credits</div>
                    <div className="text-lg font-bold text-blue-600 mt-1">₹1,000</div>
                    <div className="text-xs text-gray-500">(₹10/credit)</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="text-xs text-blue-600 font-medium mb-1">BEST VALUE</div>
                    <div className="text-2xl font-bold text-gray-900">500</div>
                    <div className="text-sm text-gray-600">credits</div>
                    <div className="text-lg font-bold text-blue-600 mt-1">₹4,000</div>
                    <div className="text-xs text-gray-500">(₹8/credit - 20% off)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1000</div>
                    <div className="text-sm text-gray-600">credits</div>
                    <div className="text-lg font-bold text-blue-600 mt-1">₹7,000</div>
                    <div className="text-xs text-gray-500">(₹7/credit - 30% off)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Try Before You Buy. Unlock Only the Best.
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Generate unlimited leads with AI. Preview quality for FREE. Pay only for the contacts you actually want to reach.
            Start your 14-day trial with 200 free credits!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-semibold shadow-lg">
              Start Free Trial
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 font-semibold">
              Schedule Demo
            </button>
          </div>

          <p className="text-emerald-100 mt-6 text-sm">
            ✅ No credit card required • ✅ 14-day trial + 200 credits FREE • ✅ Cancel anytime
          </p>
        </div>
      </section>

      {/* Free AI Marketing Audit Form */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get a Free AI Marketing Audit</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your business and goals. We'll send you a personalized audit with recommended automations and strategies.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AuditForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                  T
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-bold">Transition Marketing AI</h3>
                </div>
              </div>
              <p className="text-gray-400">
                AI-powered lead generation platform for modern marketers.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">AI Lead Generation</a></li>
                <li><a href="#" className="hover:text-white">CRM Pipeline</a></li>
                <li><a href="#" className="hover:text-white">Email Automation</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Documentation</a></li>
                                <li><a href="#" className="hover:text-white">API Reference</a></li>
                                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Transition Marketing AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}