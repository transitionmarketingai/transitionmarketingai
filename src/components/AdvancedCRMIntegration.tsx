'use client';

import React, { useState, useEffect } from 'react';

interface CRMPlatform {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  user: string;
  orgId?: string;
  lastSync: string;
  automationEnabled: boolean;
}

interface SyncRule {
  id: string;
  name: string;
  direction: 'bidirectional' | 'inbound' | 'outbound';
  frequency: 'realtime' | 'hourly' | 'daily';
  lastRun: string;
  recordsProcessed: number;
}

export default function AdvancedCRMIntegration() {
  const [connectedCRMs, setConnectedCRMs] = useState<CRMPlatform[]>([]);
  const [availableCRMs] = useState([
    {
      id: 'hubspot',
      name: 'HubSpot',
      icon: '🎯',
      description: 'Most popular CRM for inbound marketing',
      users: '500K+ companies',
      features: ['Contact Management', 'Lead Scoring', 'Automation', 'Reporting']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      icon: '☁️',
      description: 'Enterprise CRM leader',
      users: '150K+ companies',
      features: ['Enterprise Sales', 'Advanced Analytics', 'Custom Objects', 'API Access']
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      icon: '🏢',
      description: 'Indian CRM with local support',
      users: '250K+ companies',
      features: ['Indian Market Focus', 'Hindi Support', 'GST Integration', 'Local Payment']
    }
  ]);
  
  const [syncRules, setSyncRules] = useState<SyncRule[]>([]);

  useEffect(() => {
    // Mock connected CRMs data
    const mockConnectedCRMs: CRMPlatform[] = [
      {
        id: 'hubspot',
        name: 'HubSpot',
        icon: '🎯',
        status: 'connected',
        user: 'rajesh@techinnovate.com',
        lastSync: '2 minutes ago',
        automationEnabled: true
      },
      {
        id: 'zoho',
        name: 'Zoho CRM',
        icon: '🏢',
        status: 'connected',
        user: 'priya@digitalgrowth.co',
        lastSync: '5 minutes ago',
        automationEnabled: false
      }
    ];

    setConnectedCRMs(mockConnectedCRMs);

    // Mock sync rules
    setSyncRules([
      {
        id: 'rule1',
        name: 'Hot Leads Auto-Sync',
        direction: 'bidirectional',
        frequency: 'realtime',
        lastRun: '1 minute ago',
        recordsProcessed: 1247
      },
      {
        id: 'rule2',
        name: 'Daily Contact Backup',
        direction: 'outbound',
        frequency: 'daily',
        lastRun: '2 hours ago',
        recordsProcessed: 567
      }
    ]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🔗 Advanced CRM Integration</h2>
          <p className="text-gray-600 mt-2">Connect your CRM and automate lead management workflows</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">
          📊 Sync Dashboard
        </button>
      </div>

      {/* Connected CRMs */}
      {connectedCRMs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">✅ Connected Platforms</h3>
            <p className="text-gray-600">Your CRMs are syncing automatically</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {connectedCRMs.map((crm) => (
                <div key={crm.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                        {crm.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{crm.name}</h4>
                        <p className="text-sm text-gray-600">{crm.user}</p>
                        <p className="text-xs text-gray-500">Last sync: {crm.lastSync}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-green-600">
                          Connected
                        </span>
                      </div>
                      
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        crm.automationEnabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {crm.automationEnabled ? '🤖 Automated' : '⏸️ Manual'}
                      </button>

                      <button className="px-3 py-1 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium">
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Available CRMs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">🔌 Available CRM Platforms</h3>
          <p className="text-gray-600">Connect with your existing CRM to streamline lead management</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableCRMs.map((crm) => {
              const isConnected = connectedCRMs.some(c => c.id === crm.id);
              
              return (
                <div key={crm.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                      {crm.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{crm.name}</h4>
                      <p className="text-sm text-gray-600">{crm.users}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{crm.description}</p>

                  <div className="space-y-2 mb-4">
                    {crm.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-2 rounded-lg font-medium ${
                    isConnected
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    {isConnected ? '✅ Connected' : '🔗 Connect'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sync Rules */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">⚡ Synchronization Rules</h3>
              <p className="text-gray-600">Automated workflows for data synchronization</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              ➕ Add Rule
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {syncRules.map((rule) => (
              <div key={rule.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{rule.name}</h4>
                    <p className="text-sm text-gray-600">
                      {rule.direction === 'bidirectional' ? '🔄 Two-way sync' : 
                       rule.direction === 'inbound' ? '⬇️ Import only' : 
                       '⬆️ Export only'} • {rule.frequency}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last run: {rule.lastRun}<br/>
                    Records: {rule.recordsProcessed}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                    Edit Rule
                  </button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50">
                    Run Now
                  </button>
                  <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}