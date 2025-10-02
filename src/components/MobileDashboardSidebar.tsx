'use client';

import React, { useState } from 'react';

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: 'setup-guide', label: 'Setup guide', icon: '📋', badge: '13' },
  { id: 'leads', label: 'Leads', icon: '🎯', badge: '13' },
  { id: 'contacts', label: 'People', icon: '👥', badge: null },
  { id: 'organizations', label: 'Organizations', icon: '🏢', badge: null },
  { id: 'deals', label: 'Deals', icon: '💰', badge: null },
  { id: 'activities', label: 'Activities', icon: '📅', badge: '1' },
  { id: 'timeline', label: 'Timeline', icon: '❤️', badge: '1' },
  { id: 'tools-apps', label: 'Tools and apps', icon: '🔧', badge: null },
  { id: 'analytics', label: 'Analytics', icon: '📊', badge: null },
  { id: 'communications', label: 'Communications', icon: '📧', badge: null },
  { id: 'team', label: 'Team', icon: '👥', badge: null },
];

export default function MobileDashboardSidebar({ activeSection, onSectionChange }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden bg-blue-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <span className="font-semibold">Menu</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
            T
          </div>
          <span className="font-semibold">Transition AI</span>
        </div>
        
        {/* Search icon or notifications */}
        <button className="p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl">
            {/* Header */}
            <div className="bg-blue-900 text-white px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
                  T
                </div>
                <div>
                  <p className="font-bold text-lg">Transition AI</p>
                  <p className="text-blue-200 text-sm">CRM Dashboard</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1 px-4">
                {sidebarItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeSection === item.id 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Badge */}
                    {item.badge && (
                      <div className="bg-red-500 text-white rounded-full text-xs px-2 py-1 min-w-[20px] text-center">
                        {item.badge}
                      </div>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">U</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">User Account</p>
                  <p className="text-gray-500 text-sm">view profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
