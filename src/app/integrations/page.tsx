'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      <span className="text-xl font-bold text-white">Transition Marketing AI</span>
    </Link>
  );
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              href="/dashboard" 
              className="px-4 py-2 border border-purple-500 text-purple-400 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-200"
            >
              Demo
            </Link>
            <Link 
              href="/get-started" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Integration Card Component
function IntegrationCard({ 
  name, 
  description, 
  icon, 
  connected, 
  onToggle 
}: { 
  name: string; 
  description: string; 
  icon: string; 
  connected: boolean; 
  onToggle: () => void; 
}) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
          connected ? 'bg-green-500' : 'bg-gray-600'
        }`}>
          <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
            connected ? 'translate-x-6' : 'translate-x-0.5'
          } mt-0.5`}></div>
        </div>
      </div>
      
      <button
        onClick={onToggle}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          connected 
            ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
            : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
        }`}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState([
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: '📊',
      connected: false
    },
    {
      id: 'facebook-ads',
      name: 'Facebook Ads',
      description: 'Manage Facebook advertising campaigns',
      icon: '📱',
      connected: false
    },
    {
      id: 'linkedin-ads',
      name: 'LinkedIn Ads',
      description: 'Connect LinkedIn advertising account',
      icon: '💼',
      connected: false
    },
    {
      id: 'google-ads',
      name: 'Google Ads',
      description: 'Manage Google advertising campaigns',
      icon: '🔍',
      connected: false
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing automation',
      icon: '📧',
      connected: false
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'CRM and marketing automation',
      icon: '🎯',
      connected: false
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Customer relationship management',
      icon: '☁️',
      connected: false
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows between apps',
      icon: '⚡',
      connected: false
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and notifications',
      icon: '💬',
      connected: false
    },
    {
      id: 'webhook',
      name: 'Webhooks',
      description: 'Custom API integrations',
      icon: '🔗',
      connected: false
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 font-medium mb-6 border border-purple-500/30">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              {connectedCount} Connected
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Integrations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect your favorite tools and platforms to supercharge your marketing automation.
            </p>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                name={integration.name}
                description={integration.description}
                icon={integration.icon}
                connected={integration.connected}
                onToggle={() => toggleIntegration(integration.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Connect Integrations?</h2>
            <p className="text-gray-300">Unlock the full potential of your marketing stack</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔄",
                title: "Automated Workflows",
                description: "Seamlessly sync data between platforms without manual work"
              },
              {
                icon: "📊",
                title: "Unified Analytics",
                description: "Get a complete view of your marketing performance across all channels"
              },
              {
                icon: "⚡",
                title: "Real-time Sync",
                description: "Keep all your tools updated with the latest data instantly"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Integration?</h2>
            <p className="text-gray-300 mb-8">
              Don't see your favorite tool? We can build custom integrations for any platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-started"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Request Integration
              </Link>
              <Link 
                href="/dashboard"
                className="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
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
                <span className="text-xl font-bold text-white">Transition Marketing AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered marketing automation for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/#agents" className="hover:text-white">AI Agents</Link></li>
                <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/book" className="hover:text-white">Book a Demo</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Get Started</h4>
              <p className="text-gray-400 mb-4">
                Start your free trial today and see the difference AI can make.
              </p>
              <Link 
                href="/get-started" 
                className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Transition Marketing AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
