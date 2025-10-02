'use client';

import React, { useState } from 'react';

interface DashboardWidget {
  id: string;
  title: string;
  subtitle: string;
  type: 'revenue' | 'pipeline-health' | 'sales-person' | 'activities';
  data: {
    currentValue?: string;
    previousValue?: string;
    change?: string;
    currency?: string;
    winRate?: string;
    stages?: Array<{name: string; deals: number; conversion: string}>;
    salesPeople?: Array<{name: string; openDeals: number; wonDeals: number}>;
    todo?: {
      call: number;
      meeting: number;
      total: number;
    };
  };
}

const sampleDashboard: DashboardWidget[] = [
  {
    id: 'deals-won-revenue',
    title: '$ Deals won revenue',
    subtitle: 'THIS YEAR WON',
    type: 'revenue',
    data: {
      currentValue: '₹0',
      previousValue: '₹0',
      change: '0%',
      currency: 'INR'
    }
  },
  {
    id: 'pipeline-health',
    title: '$ Pipeline health',
    subtitle: 'PIPELINE THIS YEAR WON, LOST, OPEN',
    type: 'pipeline-health',
    data: {
      winRate: '0%',
      stages: [
        { name: 'Qualified', deals: 2, conversion: '0%' },
        { name: 'Contact Made', deals: 1, conversion: '0%' },
        { name: 'Demo Scheduled', deals: 0, conversion: '0%' },
        { name: 'Proposal Made', deals: 0, conversion: '0%' },
        { name: 'Negotiations Started', deals: 0, conversion: '0%' },
        { name: 'Won', deals: 0, conversion: '100%' }
      ]
    }
  },
  {
    id: 'deals-sales-person',
    title: '$ Deals status by sales person',
    subtitle: 'THIS YEAR',
    type: 'sales-person',
    data: {
      salesPeople: [
        { name: 'Transition Marketing', openDeals: 2, wonDeals: 0 }
      ]
    }
  },
  {
    id: 'activities-status',
    title: 'Activities status',
    subtitle: 'THIS MONTH',
    type: 'activities',
    data: {
      todo: {
        call: 2,
        meeting: 2,
        total: 4
      }
    }
  }
];

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<'dashboards' | 'reports'>('dashboards');
  const [showSampleDataBanner, setShowSampleDataBanner] = useState(true);
  const [showMaintenanceBanner, setShowMaintenanceBanner] = useState(true);

  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'revenue':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{widget.title}</h3>
                <p className="text-sm text-gray-500">{widget.subtitle}</p>
              </div>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                AI
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm">↑</span>
                <span className="text-gray-600 text-sm">{widget.data.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{widget.data.currentValue}</div>
              <div className="text-sm text-gray-500">{widget.data.previousValue}</div>
              <div className="text-xs text-gray-500">Deal value ({widget.data.currency})</div>
            </div>
          </div>
        );

      case 'pipeline-health':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{widget.title}</h3>
                <p className="text-sm text-gray-500">{widget.subtitle}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-900">
                Win rate is <span className="text-blue-600">{widget.data.winRate}</span>
              </div>
              <div className="space-y-2">
                {widget.data.stages?.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 w-24">{stage.name}</span>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(stage.deals / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 w-16 text-right">{stage.deals}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Reached stage</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Won</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sales-person':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{widget.title}</h3>
                <p className="text-sm text-gray-500">{widget.subtitle}</p>
              </div>
              <div className="flex space-x-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              {widget.data.salesPeople?.map((person: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{person.name}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4 w-24">
                        <div 
                          className="bg-blue-500 h-4 rounded-full flex items-center justify-center text-white text-xs"
                          style={{ width: `${(person.openDeals / 4) * 100}%` }}
                        >
                          {person.openDeals}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{person.openDeals}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Open</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{widget.title}</h3>
                <p className="text-sm text-gray-500">{widget.subtitle}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div className="space-y-3">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-gray-900">{widget.data.todo?.total}</div>
                <div className="text-sm text-gray-600">To do</div>
              </div>
              <div className="flex justify-center">
                <div className="w-20 h-4 bg-gray-200 rounded-full relative">
                  <div 
                    className="bg-blue-600 h-4 rounded-full absolute top-0 left-0"
                    style={{ width: `${((widget.data.todo?.call || 0) / (widget.data.todo?.total || 1)) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-blue-500 h-4 rounded-full absolute top-0"
                    style={{ 
                      width: `${((widget.data.todo?.meeting || 0) / (widget.data.todo?.total || 1)) * 100}%`,
                      left: `${((widget.data.todo?.call || 0) / (widget.data.todo?.total || 1)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Call ({widget.data.todo?.call})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Meeting ({widget.data.todo?.meeting})</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-100 border-r h-screen overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">🎯 Insights</h2>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Create
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <button className="bg-purple-100 text-purple-600 px-3 py-2">
                🎓
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="Search from Insights" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            {/* Dashboards */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">DASHBOARDS</h3>
              <div className="space-y-1">
                <div className={`p-2 rounded ${activeTab === 'dashboards' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <div className="text-sm font-medium">My dashboards</div>
                  <div className="text-xs text-gray-500">My dashboard</div>
                </div>
                <button className="w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <div className="text-sm font-medium">+ New dashboard</div>
                </button>
              </div>
            </div>

            {/* Goals */}
            <div>
              <h3 className="text-sm font font-semibold text-gray-900 uppercase tracking-wide mb-3">GOALS</h3>
              <div className="p-2 text-xs text-gray-500">No goals</div>
            </div>

            {/* Reports */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                REPORTS <span className="text-xs text-gray-500 font-normal">(0/250)</span>
              </h3>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 p-2">My reports</div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-600 p-1 bg-blue-50 rounded border-l-2 border-blue-500">Activities status</div>
                  <div className="text-xs text-gray-600 p-1">Deals status by sales p...</div>
                  <div className="text-xs text-gray-600 p-1">Deals won revenue</div>
                  <div className="text-xs text-gray-600 p-1">Pipeline health</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My dashboard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center">
                📊 Generate report AI
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                📅
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                ⋯
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6.5 19a4.5 4.5 0 010-9l3-3a4.5 4.5 0 017.18 3H19l-7.5 7.5z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sample Data Banner */}
        {showSampleDataBanner && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 text-sm">You are viewing reports based on sample data.</span>
              <button 
                onClick={() => setShowSampleDataBanner(false)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Remove sample data
              </button>
            </div>
          </div>
        )}

        {/* Maintenance Banner */}
        {showMaintenanceBanner && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-4">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <span className="text-yellow-800 text-sm">Account under maintenance This may temporarily affect your reports. If you experience any inaccuracies, check back later.</span>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Dashboard Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {sampleDashboard.map(widget => (
              <div key={widget.id} className="col-span-1">
                {renderWidget(widget)}
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Identify growth opportunities. Take action.</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Set up your personalized, customizable reporting dashboard. Track Transition CRM的数据 related to your sales activities. Make informed decisions at the right time.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium">
                Create dashboard
              </button>
              <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg text-lg font-medium flex items-center">
                📊 Generate report AI
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full ml-2">AI</span>
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg text-lg font-medium flex items-center">
                ▶︎ Watch video (0:35)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
