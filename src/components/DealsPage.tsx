'use client';

import React, { useState } from 'react';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: string;
  owner: string;
  nextActivity: string;
  probability: number;
}

const sampleDeals: Deal[] = [
  {
    id: '1',
    title: '[Sample] Benjamin Leon Collaboration Tools Deal',
    company: '[Sample] Leon Digital Systems',
    value: 10000,
    stage: 'Qualified',
    owner: 'Transition Marketing',
    nextActivity: 'Follow-up call',
    probability: 20
  },
  {
    id: '2',
    title: '[Sample] Tony Turner IT Infrastructure Security Deal',
    company: '[Sample] MoveEr Tech Group',
    value: 30000,
    stage: 'Contact Made',
    owner: 'Transition Marketing',
    nextActivity: 'Product demo scheduled',
    probability: 40
  }
];

const pipelineStages = [
  { name: 'Qualified', color: 'bg-blue-500', value: 10000, count: 1 },
  { name: 'Contact Made', color: 'bg-purple-500', value: 30000, count: 1 },
  { name: 'Demo Scheduled', color: 'bg-yellow-500', value: 0, count: 0 },
  { name: 'Proposal Made', color: 'bg-orange-500', value: 0, count: 0 },
  { name: 'Negotiations Started', color: 'bg-red-500', value: 0, count: 0 }
];

export default function DealsPage() {
  const [activeView, setActiveView] = useState<'kanban' | 'list' | 'timeline' | 'forecast'>('kanban');
  const [showImportBanner, setShowImportBanner] = useState(true);
  const [deals] = useState<Deal[]>(sampleDeals);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getDealsForStage = (stageName: string) => {
    return deals.filter(deal => deal.stage === stageName);
  };

  return (
    <div className="max-w-full mx-auto h-full flex flex-col">
      {/* Import Data Banner */}
      {showImportBanner && (
        <div className="bg-purple-50 border-b border-purple-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            <div>
              <h3 className="font-semibold text-purple-900">Import your contact and sales data</h3>
              <p className="text-sm text-purple-700">Bring in your data to streamline your operations. Unlock the full potential of what Transition CRM can do for your business.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Import data
            </button>
            <button
              onClick={() => setShowImportBanner(false)}
              className="text-purple-500 hover:text-purple-700 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Top Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* View Options */}
            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setActiveView('kanban')}
                className={`p-2 rounded ${activeView === 'kanban' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9m0 10h8M9 7h8m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
                </svg>
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`p-2 rounded ${activeView === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
              </button>
              <button
                onClick={() => setActiveView('timeline')}
                className={`p-2 rounded ${activeView === 'timeline' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 uc-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.965-4.03-9-9-9"></path>
                </svg>
              </button>
              <button
                onClick={() => setActiveView('forecast')}
                className={`p-2 rounded ${activeView === 'forecast' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </button>
            </div>

            {/* Add Deal Button */}
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              + Deal
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{deals.length} deals</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>

            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Pipeline</option>
              <option>Closed Won</option>
              <option>Closed Lost</option>
            </select>

            <button className="text-gray-500 hover:text-gray-700 p-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>

            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm">Filter</button>
          </div>
        </div>
      </div>

      {/* Pipeline Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="text-sm text-blue-600">Pin filters</button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="flex items-center space-x-1 border border-gray-300 rounded px-3 py-1 text-sm">
              <span>Next activity</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Pipeline */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <div className="flex space-x-6 h-full">
          {pipelineStages.map((stage) => {
            const stageDeals = getDealsForStage(stage.name);
            return (
              <div key={stage.name} className="w-80 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Stage Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(stage.value)} - {stage.count} deal{stage.count !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    </div>
                  </div>

                  {/* Deals */}
                  <div className="p-4 space-y-3">
                    {stageDeals.length > 0 ? (
                      stageDeals.map((deal) => (
                        <div key={deal.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900 text-sm leading-tight">{deal.title}</h4>
                            <p className="text-xs text-gray-600">{deal.company}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">{formatCurrency(deal.value)}</span>
                              <div className="flex items-center space-x-2">
                                {deal.stage === 'Qualified' ? (
                                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l3 3 7-7"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.75-.907.103-1.794.38-2.615.86a4.2 4.2 0 01-1.149.98V19h-2v-4.25"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Next: {deal.nextActivity}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        <p className="text-sm">No deals in this stage</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
