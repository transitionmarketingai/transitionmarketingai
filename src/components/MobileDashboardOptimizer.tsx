'use client';

import React, { useState, useEffect } from 'react';

interface MobileDashboardOptimizerProps {
  children: React.ReactNode;
  activeSection: string;
}

export default function MobileDashboardOptimizer({ children, activeSection }: MobileDashboardOptimizerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Navigation Panel
  const mobileNavItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊', color: 'blue' },
    { id: 'campaigns', label: 'Campaigns', icon: '🎯', color: 'green' },
    { id: 'leads', label: 'Leads', icon: '👥', color: 'purple' },
    { id: 'templates', label: 'Templates', icon: '🏭', color: 'orange' },
    { id: 'automation', label: 'Automation', icon: '⚡', color: 'red' },
    { id: 'analytics', label: 'Analytics', icon: '📈', color: 'indigo' }
  ];

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Lead Control</h1>
              <p className="text-xs text-gray-500">AI Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 bg-blue-600 text-white rounded-lg"
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="bg-white h-full w-80 shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {mobileNavItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl text-left transition-all ${
                      activeSection === item.id
                        ? `bg-${item.color}-50 border-2 border-${item.color}-200`
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center text-xl`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.label}</h3>
                      <p className="text-sm text-gray-600">
                        {item.id === 'overview' && 'Real-time metrics & performance'}
                        {item.id === 'campaigns' && 'AI lead generation campaigns'}
                        {item.id === 'leads' && 'Qualified leads & scoring'}
                        {item.id === 'templates' && 'Industry-specific templates'}
                        {item.id === 'automation' && 'Smart nurturing workflows'}
                        {item.id === 'analytics' && 'Performance insights'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile Quick Actions */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-green-600 text-white rounded-lg text-sm font-medium">
                    New Campaign
                  </button>
                  <button className="p-3 bg-purple-600 text-white rounded-lg text-sm font-medium">
                    Import Leads
                  </button>
                  <button className="p-3 bg-orange-600 text-white rounded-lg text-sm font-medium">
                    Setup Automation
                  </button>
                  <button className="p-3 bg-blue-600 text-white rounded-lg text-sm font-medium">
                    View Templates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Content */}
      <div className="p-4 pb-20">
        {children}
        
        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-pb">
          <div className="flex justify-around">
            {mobileNavItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                className={`flex flex-col items-center space-y-1 p-2 ${
                  activeSection === item.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
