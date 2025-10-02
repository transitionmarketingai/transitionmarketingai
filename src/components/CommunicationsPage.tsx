'use client';

import React, { useState } from 'react';

interface Folder {
  id: string;
  name: string;
  icon: string;
  active: boolean;
  badge?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

const folders: Folder[] = [
  { id: 'inbox', name: 'Inbox', icon: '📥', active: true },
  { id: 'drafts', name: 'Drafts', icon: '📝', active: false },
  { id: 'outbox', name: 'Outbox', icon: '📤', active: false },
  { id: 'sent', name: 'Sent', icon: '✅', active: false },
  { id: 'archive', name: 'Archive', icon: '🗂️', active: false },
];

const features = [
  {
    icon: '🔗',
    title: 'Powerful features',
    description: 'Link emails to deals and leads. Send emails in bulk, track opens and clicks, set up templates.'
  },
  {
    icon: '✨',
    title: 'Enhanced tools',
    description: 'Write and summarize conversations using AI.'
  },
  {
    icon: '👥',
    title: 'Team Inbox',
    description: 'Add team members to collaborate in the same inbox. Assign emails for better collaboration.'
  },
  {
    icon: '🔒',
    title: 'Secure and private',
    description: 'You decide who can see your emails. Your data is safe with us.'
  }
];

const faqs: FAQ[] = [
  {
    id: 'two-way-sync',
    question: 'How does two-way email sync work?',
    answer: 'Once active, conversations are synced both ways. Use Transition CRM\'s Sales Inbox or your email provider\'s inbox to compose and read messages. They\'ll always show up in both places. Your choice. Learn more',
    expanded: true
  },
  {
    id: 'email-privacy',
    question: 'Can I control which emails are private or shared with my team?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    expanded: false
  },
  {
    id: 'email-security',
    question: 'How does Transition CRM handle email security?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    expanded: false
  },
  {
    id: 'auto-linking',
    question: 'Do my emails automatically link with contacts, deals and leads?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    expanded: false
  }
];

const benefits = [
  {
    icon: '💰',
    title: 'Add 3.4x more deals',
    description: 'Teams working with Sales Inbox experience a higher volume of deals.'
  },
  {
    icon: '⚡',
    title: 'Close deals 20% faster',
    description: 'Email collaboration and templates help close deals more efficiently.'
  },
  {
    icon: '🏆',
    title: 'Win 23% more deals',
    description: 'Using Sales Inbox templates wins more deals.'
  }
];

export default function CommunicationsPage() {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [emailAddress, setEmailAddress] = useState('info@transitionmarketingai.com');
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>({});

  const toggleFAQ = (id: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isFAQExpanded = (id: string) => expandedFaqs[id] || false;

  return (
    <div className="h-full flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-100 border-r h-screen overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Communications</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <span>📧</span>
              <span>Sales Inbox</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                13
              </span>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              + New email
            </button>
          </div>

          {/* Folders */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">EMAIL FOLDERS</div>
            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  folder.active 
                    ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-lg">{folder.icon}</span>
                <span className="font-medium">{folder.name}</span>
                {folder.badge && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full ml-auto">
                    {folder.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">QUICK ACTIONS</div>
            <div className="space-y-1">
              <button className="w-full text-left p-2 text-gray-700 hover:bg-gray-50 rounded">📧 Email Templates</button>
              <button className="w-full text-left p-2 text-gray-700 hover:bg-gray-50 rounded">🤖 AI Assistant</button>
              <button className="w-full text-left p-2 text-gray-700 hover:bg-gray-50 rounded">📊 Email Analytics</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white overflow-y-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Close deals faster with better email.<br />
                  Smart, secure, configurable Sales Inbox.
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium">
                    Get started
                  </button>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <button className="flex items-center space-x-2 hover:text-blue-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Watch video (01:45)</span>
                  </button>
                  <span>Included with your Premium billing plan</span>
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-8">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                      ✍︎
                    </div>
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                      ✉︎
                    </div>
                  </div>
                  <div className="absolute top-8 right-8 w-4 h-4 bg-purple-300 rounded-full"></div>
                  <div className="absolute bottom-12 left-8 w-3 h-3 bg-blue-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* FAQ List */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
                <div className="space-y-4">
                  {faqs.map(faq => (
                    <div key={faq.id} className="bg-white rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                          <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              isFAQExpanded(faq.id) ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </button>
                      {isFAQExpanded(faq.id) && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-gray-600">
                            {faq.answer}
                            {faq.id === 'two-way-sync' && (
                              <button className="text-blue-600 hover:text-blue-800 ml-1">
                                Learn more →
                              </button>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                  <div className="w-48 h-32 bg-gray-100 rounded flex items-center justify-center relative">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                      ✉︎
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                      🔒
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Drive better results</h2>
              <p className="text-lg text-gray-600">See how Sales Inbox transforms your sales performance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Close deals faster with better email.<br />
              Smart, secure, configurable Sales Inbox.
            </h2>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="px-4 py-3 border border-white rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium">
                Get started
              </button>
            </div>
            
            <p className="text-blue-100">Included with your Premium billing plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
