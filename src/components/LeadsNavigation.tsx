'use client';

import React, { useState } from 'react';

interface LeadsNavProps {
  activeSubSection: string;
  onSubSectionChange: (section: string) => void;
  isCollapsed?: boolean;
}

export default function LeadsNavigation({ activeSubSection, onSubSectionChange, isCollapsed = false }: LeadsNavProps) {
  const [showLinkedInCard, setShowLinkedInCard] = useState(true);

  const sections = [
    // LEADS SECTION
    {
      label: 'LEADS',
      items: [
        { id: 'leads-inbox', label: 'Leads Inbox', icon: '📋', badge: '13' },
        { id: 'live-chat', label: 'Live Chat', icon: '💬', badge: '1' },
        { id: 'chatbot', label: 'Chatbot', icon: '🤖', badge: null },
        { id: 'web-forms', label: 'Web Forms', icon: '📝', badge: null },
        { id: 'prospector', label: 'Prospector', icon: '🔍', badge: null },
      ]
    },
    // ADD-ONS SECTION
    {
      label: 'ADD-ONS',
      items: [
        { id: 'web-visitors', label: 'Web Visitors', icon: '👁️', badge: null },
      ]
    },
    // INTEGRATIONS SECTION
    {
      label: 'INTEGRATIONS',
      items: [
        { id: 'messaging', label: 'Messaging', icon: '💬', badge: 'BETA' },
        { id: 'linkedin', label: 'LinkedIn', icon: '🔗', badge: 'NEW' },
      ]
    }
  ];

  if (isCollapsed) {
    return (
      <div className="w-16 bg-blue-900 h-screen fixed left-0 top-0 z-50">
        {/* Logo */}
        <div className="p-4 border-b border-blue-800">
          <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">
            T
          </div>
        </div>

        {/* Collapsed Icons */}
        <div className="flex-1 pt-4">
          {sections.map(section => 
            section.items.map(item => (
              <button
                key={item.id}
                onClick={() => onSubSectionChange(item.id)}
                className={`w-full flex items-center justify-center py-3 px-2 relative group mb-1 ${
                  activeSubSection === item.id ? 'bg-blue-800' : 'hover:bg-blue-800'
                } transition-colors`}
                title={item.label}
              >
                <div className="text-white text-lg">
                  {item.icon}
                </div>
                {item.badge && (
                  <div className={`absolute -top-1 -right-1 ${
                    item.badge === 'BETA' || item.badge === 'NEW' 
                      ? 'bg-blue-500' 
                      : 'bg-red-500'
                  } text-white rounded-full text-xs px-1 py-0.5 min-w-[18px] h-4 flex items-center justify-center`}>
                    {item.badge}
                  </div>
                )}
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {item.label}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Bottom section */}
        <div className="p-4 border-t border-blue-800">
          <button className="w-full text-white text-xs hover:bg-blue-800 p-2 rounded">
            ⋯
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-100 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-4">
          Leads
        </div>

        {/* Navigation Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={section.label} className="mb-6">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
              {section.label}
            </div>
            
            <div className="space-y-1">
              {section.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onSubSectionChange(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    activeSubSection === item.id 
                      ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  
                  {item.badge && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.badge === 'BETA' || item.badge === 'NEW'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* LinkedIn Promotion Card */}
        {showLinkedInCard && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="font-semibold text-sm text-gray-900">Add + enrich LinkedIn leads</div>
              <button
                onClick={() => setShowLinkedInCard(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 mb-3">
              <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                S
              </div>
              <span className="text-sm font-medium text-gray-900">Surfe</span>
            </div>
            
            <div className="flex items-center space-x-1 mb-3">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.851-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600">4.5</span>
            </div>
            
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
              Learn more →
            </button>
          </div>
        )}

        {/* Bottom spacer */}
        <div className="mt-8 text-center">
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6.5 19a4.5 4.5 0 010-9l3-3a4.5 4.5 0 017.18 3H19l-7.5 7.5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
