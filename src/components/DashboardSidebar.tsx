'use client';

import React, { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | null;
  category: 'primary' | 'secondary' | 'advanced';
  description: string;
}

const sidebarItems: SidebarItem[] = [
  // PRIMARY ACTIONS (Most Important)
  { 
    id: 'overview', 
    label: 'Dashboard', 
    icon: '📊', 
    badge: null,
    category: 'primary',
    description: 'Real-time performance & metrics'
  },
  { 
    id: 'campaigns', 
    label: 'Campaigns', 
    icon: '🎯', 
    badge: '8 Active',
    category: 'primary',
    description: 'AI lead generation campaigns'
  },
  { 
    id: 'leads', 
    label: 'Leads', 
    icon: '👥', 
    badge: '1,247',
    category: 'primary',
    description: 'Qualified leads & scoring'
  },
  
  // SECONDARY ACTIONS (Regular Use)
  { 
    id: 'templates', 
    label: 'Templates', 
    icon: '🏭', 
    badge: null,
    category: 'secondary',
    description: 'Industry-specific templates'
  },
  { 
    id: 'automation', 
    label: 'Automation', 
    icon: '⚡', 
    badge: null,
    category: 'secondary',
    description: 'Smart nurturing workflows'
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: '📈', 
    badge: null,
    category: 'secondary',
    description: 'Performance insights'
  },
  
  // ADVANCED FEATURES (Occasional Use)
  { 
    id: 'integrations', 
    label: 'Integrations', 
    icon: '🔗', 
    badge: null,
    category: 'advanced',
    description: 'CRM & system connections'
  },
  { 
    id: 'team', 
    label: 'Team', 
    icon: '👥', 
    badge: null,
    category: 'advanced',
    description: 'Team management'
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: '⚙️', 
    badge: null,
    category: 'advanced',
    description: 'Account & preferences'
  }
];

const categoryColors = {
  primary: 'bg-blue-600',
  secondary: 'bg-blue-800', 
  advanced: 'bg-gray-600'
};

const categoryLabels = {
  primary: 'Core Actions',
  secondary: 'Regular Use',
  advanced: 'Advanced'
};

export default function DashboardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [showCategoryFolders, setShowCategoryFolders] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const itemsByCategory = sidebarItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const renderCategorySection = (category: keyof typeof categoryColors, label: string) => {
    const items = itemsByCategory[category];
    if (!items.length) return null;

    const bgColor = categoryColors[category];

    return (
      <div key={category} className="mb-4">
        {/* Category Header - Compact */}
        <button
          onClick={() => setShowCategoryFolders(!showCategoryFolders)}
          className={`w-full px-2 py-1 flex items-center justify-center ${bgColor} rounded-lg mb-2 transition-all duration-200 hover:opacity-90`}
        >
          <span className="text-white text-xs font-medium">
            {showCategoryFolders ? label : '⋯'}
          </span>
        </button>

        {/* Category Items */}
        {showCategoryFolders && (
          <div className="space-y-1">
            {items.map(item => (
              <button
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center justify-center py-2 px-1 relative group transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-blue-700 scale-105 shadow-lg' 
                    : 'hover:bg-blue-800 hover:scale-102'
                }`}
              >
                {/* Icon */}
                <div className="text-white text-base">
                  {item.icon}
                </div>
                
                {/* Tooltip for collapsed view */}
                {!showCategoryFolders && hoveredItem === item.id && (
                  <div className="absolute left-full ml-3 bg-gray-900 text-white px-3 py-2 rounded-xl shadow-lg z-50 opacity-100 transition-all duration-200">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-300 mt-1">{item.description}</div>
                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
                
                {/* Badge */}
                {item.badge && (
                  <div className={`absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1 py-1 min-w-[18px] h-4 flex items-center justify-center font-semibold ${
                    !showCategoryFolders ? 'left-full ml-2 top-1' : ''
                  }`}>
                    {item.badge}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${showCategoryFolders ? 'w-56' : 'w-14'} bg-blue-900 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 shadow-lg`}>
      {/* Logo */}
      <div className="p-3 border-b border-blue-800">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
          TM
        </div>
        {showCategoryFolders && (
          <div className="text-white text-xs font-medium mt-2 text-center">
            Lead AI
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 pt-4 overflow-y-auto">
        <div className="px-2">
          {renderCategorySection('primary', `${categoryLabels.primary}`)}
          {renderCategorySection('secondary', `${categoryLabels.secondary}`)}
          {renderCategorySection('advanced', `${categoryLabels.advanced}`)}
        </div>
      </div>

      {/* Bottom spacer with user */}
      <div className="p-3 border-t border-blue-800">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">U</span>
          </div>
          {showCategoryFolders && (
            <div className="text-white">
              <div className="text-xs font-medium">Account</div>
              <div className="text-xs text-blue-300">Premium</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
