'use client';

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
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
  { id: 'more', label: 'More', icon: '⋯', badge: null },
];

export default function DashboardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-16 bg-blue-900 flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-4 border-b border-blue-800">
        <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">
          T
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 pt-4">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center justify-center py-3 px-2 relative group ${
              activeSection === item.id ? 'bg-blue-800' : 'hover:bg-blue-800'
            } transition-colors`}
          >
            {/* Icon */}
            <div className="text-white text-lg">
              {item.icon}
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {item.label}
            </div>
            
            {/* Badge */}
            {item.badge && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {item.badge}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom spacer */}
      <div className="p-4">
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">TM</span>
        </div>
      </div>
    </div>
  );
}
