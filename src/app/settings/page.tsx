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

// Settings Section Component
function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      {children}
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300">{label}</span>
      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-green-500' : 'bg-gray-600'
        }`}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        } mt-0.5`}></div>
      </button>
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      marketing: false
    },
    account: {
      twoFactor: false,
      sessionTimeout: '24h',
      autoLogout: true
    }
  });

  const toggleSetting = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !(prev[category as keyof typeof prev] as any)[setting]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Settings</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Configure your account preferences and security settings.
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Account Settings */}
            <SettingsSection title="Account Settings">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    defaultValue="Your Company"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Plan</label>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Pro Plan</div>
                      <div className="text-gray-400 text-sm">₹1,999/month</div>
                    </div>
                    <Link 
                      href="/#pricing"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Upgrade
                    </Link>
                  </div>
                </div>
              </div>
            </SettingsSection>

            {/* Notification Settings */}
            <SettingsSection title="Notifications">
              <div className="space-y-2">
                <ToggleSwitch
                  enabled={settings.notifications.email}
                  onToggle={() => toggleSetting('notifications', 'email')}
                  label="Email notifications"
                />
                <ToggleSwitch
                  enabled={settings.notifications.push}
                  onToggle={() => toggleSetting('notifications', 'push')}
                  label="Push notifications"
                />
                <ToggleSwitch
                  enabled={settings.notifications.sms}
                  onToggle={() => toggleSetting('notifications', 'sms')}
                  label="SMS notifications"
                />
              </div>
            </SettingsSection>

            {/* Privacy Settings */}
            <SettingsSection title="Privacy & Data">
              <div className="space-y-2">
                <ToggleSwitch
                  enabled={settings.privacy.dataSharing}
                  onToggle={() => toggleSetting('privacy', 'dataSharing')}
                  label="Share data with third parties"
                />
                <ToggleSwitch
                  enabled={settings.privacy.analytics}
                  onToggle={() => toggleSetting('privacy', 'analytics')}
                  label="Usage analytics"
                />
                <ToggleSwitch
                  enabled={settings.privacy.marketing}
                  onToggle={() => toggleSetting('privacy', 'marketing')}
                  label="Marketing communications"
                />
              </div>
            </SettingsSection>

            {/* Security Settings */}
            <SettingsSection title="Security">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <ToggleSwitch
                    enabled={settings.account.twoFactor}
                    onToggle={() => toggleSetting('account', 'twoFactor')}
                    label="Two-factor authentication"
                  />
                  <ToggleSwitch
                    enabled={settings.account.autoLogout}
                    onToggle={() => toggleSetting('account', 'autoLogout')}
                    label="Auto-logout on inactivity"
                  />
                </div>
              </div>
            </SettingsSection>

            {/* API Settings */}
            <SettingsSection title="API & Integrations">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      defaultValue="sk-...abc123"
                      readOnly
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      Copy
                    </button>
                    <button className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Regenerate
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL</label>
                  <input
                    type="url"
                    placeholder="https://your-domain.com/webhook"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </SettingsSection>

            {/* Save Button */}
            <div className="flex justify-end space-x-4">
              <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200">
                Cancel
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                Save Changes
              </button>
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
