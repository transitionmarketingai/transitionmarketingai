'use client';

import React, { useState } from 'react';
import LeadsNavigation from './LeadsNavigation';

interface LeadFormData {
  contactPerson: string;
  organization: string;
  title: string;
  value: string;
  currency: string;
  labels: string;
  owner: string;
  expectedCloseDate: string;
  sourceChannel: string;
  sourceChannelId: string;
  visibleTo: string;
  phone: string;
  phoneType: string;
  email: string;
  emailType: string;
}

const leadFormFields = [
  { name: 'contactPerson', label: 'Contact person', icon: '👤', required: true },
  { name: 'organization', label: 'Organization', icon: '🏢', required: false },
  { name: 'title', label: 'Title', icon: null, required: false },
  { name: 'value', label: 'Value', icon: '💰', required: false, currency: true },
  { name: 'labels', label: 'Labels', icon: '🏷️', required: false },
  { name: 'owner', label: 'Owner', icon: null, required: true },
  { name: 'expectedCloseDate', label: 'Expected close date', icon: null, required: false },
  { name: 'sourceChannel', label: 'Source channel', icon: null, required: false },
  { name: 'sourceChannelId', label: 'Source channel ID', icon: null, required: false },
  { name: 'visibleTo', label: 'Visible to', icon: '👥', required: true },
];

const leadBoosterFeatures = [
  {
    id: 'live-chat',
    title: 'Live Chat',
    description: 'Add a human touch to your Chatbot conversations.',
    icon: '💻',
    color: 'blue'
  },
  {
    id: 'prospector',
    title: 'Prospector',
    description: 'Find leads from a database of 400 million profiles, then use credits to reveal their contact data.',
    icon: '🌐',
    color: 'green',
    hasInfo: true
  },
  {
    id: 'chatbot',
    title: 'Chatbot',
    description: 'Engage with leads 24/7. Customize how it looks, the questions it asks and how it replies.',
    icon: '🤖',
    color: 'purple'
  },
  {
    id: 'web-forms',
    title: 'Web Forms',
    description: 'Ensure your leads\' vital data is captured with intuitive forms that are easy to share.',
    icon: '📝',
    color: 'orange'
  }
];

export default function LeadsPage() {
  const [activeSubSection, setActiveSubSection] = useState('leads-inbox');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>({
    contactPerson: '',
    organization: '',
    title: '',
    value: '',
    currency: 'Indian Rupee (₹)',
    labels: '',
    owner: 'Transition Marketing (You)',
    expectedCloseDate: '',
    sourceChannel: '',
    sourceChannelId: '',
    visibleTo: 'Item owner\'s visibility group',
    phone: '',
    phoneType: 'Work',
    email: '',
    emailType: 'Work'
  });

  const renderSubSection = () => {
    switch (activeSubSection) {
      case 'leads-inbox':
        return (
          <div className="flex-1 bg-white flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                👥
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Take your leads to the next level</h1>
              <p className="text-gray-600 mb-8">
                Add new lead or{' '}
                <button className="text-blue-600 hover:text-blue-800 font-medium">import your existing leads from spreadsheet</button>.
              </p>
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
                + Lead
              </button>
            </div>
          </div>
        );

      case 'chatbot':
        return (
          <div className="flex-1 bg-white p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <span className="text-blue-600 text-xl font-bold">NEW</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">LeadBooster</h1>
                <p className="text-xl text-gray-600 mb-6">LeadBooster provides you powerful ways to get more leads</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium">
                  Continue to Chatbot
                </button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {leadBoosterFeatures.map((feature) => (
                  <div key={feature.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                        {feature.icon}
                      </div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        {feature.hasInfo && (
                          <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Video Section */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Get more leads with LeadBooster</h2>
                <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                  <div className="w-full bg-gray-200 rounded aspect-video flex items-center justify-center mb-4">
                    <button className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">01:25</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium mt-4">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        );

      case 'linkedin':
        return (
          <div className="flex-1 bg-white p-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">LinkedIn integration by Surfe</h1>
                <p className="text-xl text-gray-600 mb-2">Add contacts, manage their data, deals and pipelines directly from LinkedIn.</p>
                <p className="text-base text-gray-600 mb-6">Special offer: Get exclusive access to a 60-day free Surfe trial.</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium mb-4">
                  Start free trial
                </button>
                <p className="text-sm text-gray-500">
                  We'll share your email address with Surfe to identify you as a Transition CRM user. This is required to set up the integration.{' '}
                  <button className="text-blue-600 hover:text-blue-800">Privacy Notice →</button>
                </p>
              </div>

              {/* LinkedIn Integration Demo */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* LinkedIn Side */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          AB
                        </div>
                        <div>
                          <div className="font-semibold">Aiden Brooks</div>
                          <div className="text-sm text-gray-600">Head of Sales</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full bg-blue-600 text-white py-2 rounded text-sm">Connect</button>
                        <button className="w-full bg-gray-100 text-gray-700 py-2 rounded text-sm">+ Message</button>
                        <button className="w-full bg-gray-100 text-gray-700 py-2 rounded text-sm">More</button>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="text-sm font-medium mb-2">Add to Transition CRM</div>
                        <div className="text-xs text-gray-500 mb-2">Aiden is not in your CRM yet</div>
                        <div className="space-y-2">
                          <button className="w-full bg-green-600 text-white py-2 rounded text-sm">Add as Contact</button>
                          <button className="w-full bg-blue-600 text-white py-2 rounded text-sm">Add as Lead</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CRM Side */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold mb-2">Contacts / People</h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          AB
                        </div>
                        <div>
                          <div className="font-medium">Aiden Brooks</div>
                          <div className="text-xs text-gray-500">Wave Studio</div>
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="text-gray-600">Email: aiden@wavestudio.com</div>
                        <div className="text-gray-600">Phone: 06 89 34 56 76</div>
                        <div className="text-gray-600">Company: Wave Studio</div>
                        <div className="text-gray-600">Owner: Iwi Rotorua</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'web-visitors':
        return (
          <div className="flex-1 bg-white p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Web Visitors</h1>
                <p className="text-xl text-gray-600 mb-6">Uncover hot leads and hidden opportunities amongst companies visiting your site. Contact your leads before competitors are even aware of them.</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium mb-4">
                  Start a free trial
                </button>
                <p className="text-sm text-gray-500 mb-4">
                  14 days for free. Add-on price starts from $49 monthly.{' '}
                  <button className="text-blue-600 hover:text-blue-800">More about pricing →</button>
                </p>
                
                <div className="flex items-center justify-center space-x-2 mb-8">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm text-gray-600">See the list of organizations who visit your website</span>
                </div>
              </div>

              {/* Web Visitors Demo */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded border-2 border-blue-700"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                  
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg">🏢</div>
                    <div>
                      <div className="font-semibold">Acme Corporation</div>
                      <div className="text-sm text-gray-600">New York, United States</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Description: Leading technology company specializing in innovative solutions</div>
                    <div>Employees: 500-1000</div>
                    <div>Industry: Technology</div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="flex space-x-2">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165 la-10.024-2.53c-.138.596-.556 1.128-1.253 1.458-.577.27-1.268.316-1.906.193 1.022.637 2.093 1.033 3.312 1.043 2.104 3.207 5.439 5.234 9.002 5.407-1.33 1.02-3.015 1.628-4.843 1.628-3.146 0-5.68-1.69-6.688-4.018 4.383.266 8.484-2.281 11.24-4.104 3.05 5.75 7.753 8.993 13.16 9.313-2.7 1.06-6.089 1.62-9.354 1.62-6.071 0-10.987-5.109-10.987-11.40-.002-2.06.553-4.031 1.59-5.716"/>
                      </svg>
                      <svg className="w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.115v-5.592c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.690H9.351V9h3.114v1.561h.043c.429-.816 1.484-1.35 2.551-1.35 2.717 0 3.219 1.789 3.219 4.116v6.124h-2.16V13.81c0-.975-.016-2.218-1.352-2.218-1.353 0-1.559 1.056-1.559 2.146v4.705z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Watch video (30:40) →
                </button>
              </div>
            </div>
          </div>
        );

      case 'messaging':
        return (
          <div className="flex-1 bg-white p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  ƒ
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Messenger</h1>
                <p className="text-sm text-gray-600 mb-2">by Transition CRM</p>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-4">FREE</span>
                
                <p className="text-lg text-gray-600 mb-6">Manage Facebook business communication in Transition CRM and convert new incoming conversations into contacts, leads and deals.</p>
                
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium mb-8">
                  Connect
                </button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    📞
                  </div>
                  <h3 className="font-semibold mb-2">Focus on sales</h3>
                  <p className="text-sm text-gray-600">Organize all customer communications in one place</p>
                </div>
                <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                    👥
                  </div>
                  <h3 className="font-semibold mb-2">Shared context</h3>
                  <p className="text-sm text-gray-600">Manage messages as a team for better results</p>
                </div>
                <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    🔄
                  </div>
                  <h3 className="font-semibold mb-2">Seamless sync</h3>
                  <p className="text-sm text-gray-600">Link conversations to contacts, leads and deals</p>
                </div>
              </div>

              {/* Video Section */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <div className="flex items-center justify-center mb-6">
                  <button className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">MESSENGER INTEGRATION</h3>
                  <p className="text-gray-600 mb-2">Manage your Messenger interactions within Transition CRM</p>
                  <p className="text-sm text-gray-500 mb-4">Integrate with Messenger and communicate with your prospects and customers直接 from Transition CRM.</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Learn how Messenger can elevate your business →
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Explore more messaging channels in the Marketplace →
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 bg-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">{activeSubSection.replace('-', ' ')}</h1>
              <p className="text-gray-600">This section is coming soon...</p>
            </div>
          </div>
        );
    }
  };

  const getCurrentPageTitle = () => {
    const titles: { [key: string]: string } = {
      'leads-inbox': 'Leads / Leads Inbox',
      'live-chat': 'Leads / Live Chat',
      'chatbot': 'Leads / Chatbot',
      'web-forms': 'Leads / Web Forms',
      'prospector': 'Leads / Prospector',
      'web-visitors': 'Leads / Web Visitors',
      'messaging': 'Leads / Messaging',
      'linkedin': 'Leads / LinkedIn',
    };
    return titles[activeSubSection] || 'Leads';
  };

  return (
    <div className="h-full flex">
      {/* Navigation Sidebar */}
      <LeadsNavigation 
        activeSubSection={activeSubSection} 
        onSubSectionChange={setActiveSubSection}
        isCollapsed={false}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getCurrentPageTitle()}</h1>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
                + Lead
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center">
                ✨ AI chat
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-10 10h2a2 2 0 002-2V6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {renderSubSection()}
      </div>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add lead</h2>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    {leadFormFields[0].icon && <span className="mr-2">{leadFormFields[0].icon}</span>}
                    Contact person
                    <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 that 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {leadFormFields.slice(1).map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      {field.icon && <span className="mr-2">{field.icon}</span>}
                      {field.label}
                      <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </label>
                    
                    {field.currency ? (
                      <div className="flex space-x-2">
                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Indian Rupee (₹)</option>
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                        </select>
                      </div>
                    ) : field.name === 'phone' ? (
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input type="tel" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Work</option>
                            <option>Mobile</option>
                            <option>Home</option>
                          </select>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">+ Add phone</button>
                      </div>
                    ) : field.name === 'email' ? (
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input type="email" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Work</option>
                            <option>Personal</option>
                          </select>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">+ Add email</button>
                      </div>
                    ) : field.name === 'labels' ? (
                      <div className="flex items-center space-x-2">
                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    ) : field.name === 'visibleTo' ? (
                      <div className="flex items-center space-x-2">
                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"></path>
                        </svg>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    ) : (
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column - Person Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">PERSON</h3>
                <p className="text-sm text-gray-500 mb-4">Contact information will be displayed here once saved.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Import
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">2/15,000</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                
                <button
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
