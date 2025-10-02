'use client';

import React, { useState } from 'react';

interface ToolItem {
  id: string;
  name: string;
  icon: string;
  description?: string;
  category: 'tools' | 'apps';
  badge?: string;
}

const toolsList: ToolItem[] = [
  // TOOLS SECTION
  { id: 'automations', name: 'Automations', icon: '🤖', category: 'tools', description: '0/150 active automations' },
  { id: 'automatic-assignment', name: 'Automatic assignment', icon: '⚡', category: 'tools' },
  { id: 'ai-features', name: 'Transition AI', icon: '✨', category: 'tools', description: 'Review and manage AI features' },
  { id: 'phone-calls', name: 'Phone calls', icon: '📞', category: 'tools' },
  { id: 'products', name: 'Products', icon: '📦', category: 'tools' },
  { id: 'webhooks', name: 'Webhooks', icon: '🔗', category: 'tools' },
  { id: 'documents', name: 'Documents', icon: '📄', category: 'tools' },
  { id: 'import-data', name: 'Import data', icon: '📥', category: 'tools' },
  { id: 'export-data', name: 'Export data', icon: '📤', category: 'tools' },
  { id: 'merge-duplicates', name: 'Merge duplicates', icon: '🔄', category: 'tools' },
  { id: 'restore-data', name: 'Restore data', icon: '↩️', category: 'tools' },

  // APPS SECTION
  { id: 'slack', name: 'Slack', icon: '💬', category: 'apps' },
  { id: 'asana', name: 'Asana', icon: '📋', category: 'apps' },
  { id: 'mailchimp-sync', name: 'Mailchimp sync', icon: '📧', category: 'apps', badge: 'NEW' },
  { id: 'mailchimp', name: 'Mailchimp', icon: '📮', category: 'apps' },
  { id: 'teams', name: 'Microsoft Teams', icon: '👥', category: 'apps' },
  { id: 'docusign', name: 'DocuSign', icon: '✍️', badge: 'NEW', category: 'apps' },
  { id: 'invoicing', name: 'Invoicing', icon: '💲', category: 'apps' },
  { id: 'messaging', name: 'Messaging', icon: '💬', category: 'apps' },
  { id: 'installed-apps', name: 'Installed apps', icon: '🏪', category: 'apps' },
];

export default function ToolsAndApps() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = toolsList.filter(item => item.category === 'tools');
  const apps = toolsList.filter(item => item.category === 'apps');

  const renderToolContent = (toolId: string) => {
    switch (toolId) {
      case 'automations':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
                <p className="text-sm text-gray-600">0/150 active automations</p>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
                <span className="mr-2">+</span>
                Automation
              </button>
            </div>

            <div className="flex space-x-1 border-b">
              <button className="pb-2 px-4 border-b-2 border-blue-600 text-blue-600 font-medium">Templates</button>
              <button className="pb-2 px-4 text-gray-500 hover:text-gray-700">Automations</button>
              <button className="pb-2 px-4 text-gray-500 hover:text-gray-700">History</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Add activities as deals progress', desc: 'Add an activity when a deal changes stage and another when the last one is done.', preview: 'Park Place deal • Activity scheduled ✅' },
                { title: 'Avoid rotting deals', desc: 'Follow up with an email or activity when a deal stays too long in the same pipeline stage.', preview: 'Pet insurance deal • Email sent ✅' },
                { title: 'React to deals moving', desc: 'Follow up with an email or activity when a deal moves to a new stage in your pipeline.', preview: 'Dream college deal • Activity scheduled ✅' },
                { title: 'Follow up on unresponsive deals', desc: 'Send an email when a deal is added, and follow up if there\'s no reply.', preview: 'Inbox • Send email #2' },
                { title: 'Welcome new deals right away', desc: 'Follow up with an email or activity when a new lead enters your pipeline.', preview: 'Rio housing deal • Intro call scheduled' },
                { title: 'Re-engage with inactive deals', desc: 'Follow up on inactive deals with an email or activity to spark interest again.', preview: 'Willamette Co deal • Email composition' }
              ].map((template, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-24 mb-3 rounded flex items-center justify-center text-xs text-gray-600">
                    {template.preview}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.desc}</p>
                  <button className="text-blue-600 text-sm font-medium">Preview →</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-green-600 rounded" defaultChecked />
                  <span className="ml-2 text-sm text-gray-600">Enabled</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600">Enables you to create products or services, price them and link them to deals.</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-green-600">✓</span>
                <span>Create custom products in multiple currencies</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-600">✓</span>
                <span>Supports price variations</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-600">✓</span>
                <span>Link your products to deals in bulk</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-600">✓</span>
                <span>Deal value is calculated automatically based on the sum of product prices in that deal</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Default tax setting</h3>
              <p className="text-gray-600 mb-4">This will be the default tax setting when adding products to deals.</p>
              <select className="border border-gray-300 rounded-lg px-3 py-2 mr-4">
                <option>Tax inclusive</option>
                <option>Tax exclusive</option>
                <option>No tax</option>
              </select>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>
        );

      case 'webhooks':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Webhooks</h1>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                + Webhook
              </button>
            </div>

            <div className="flex space-x-1 border-b">
              <button className="pb-2 px-4 border-b-2 border-blue-600 text-blue-600 font-medium">Webhooks</button>
              <button className="pb-2 px-4 text-gray-500 hover:text-gray-700">Automated webhooks</button>
            </div>

            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                🐠
              </div>
              <h2 className="text-lg font-semibold mb-2">Get started by adding a webhook</h2>
              <div className="space-y-2">
                <button className="text-blue-600 hover:text-blue-800 font-medium">Add a webhook</button>
                <br />
                <button className="text-blue-600 hover:text-blue-800 font-medium">Learn more about webhooks →</button>
              </div>
            </div>
          </div>
        );

      case 'ai-features':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transition AI</h1>
              <p className="text-gray-600">Review and manage AI features for your company. AI beta features can be accessed on the Beta program page.</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-purple-600 mr-2">🎓</span>
                <span className="text-purple-800 font-medium">Transition AI is an AI you can trust.</span>
                <button className="text-purple-600 hover:text-purple-800 ml-2">Learn more →</button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'AI-powered notifications', icon: '💰', enabled: true },
                { name: 'AI email creation', icon: '📧', enabled: true },
                { name: 'AI smart-app recommendations', icon: '📱', enabled: true },
                { name: 'AI-powered marketplace search', icon: '🔍', enabled: true },
                { name: 'AI-assisted report generation', icon: '📊', enabled: true },
                { name: 'AI chat', icon: '✨', enabled: true },
                { name: 'AI import assistant', icon: '📥', enabled: true }
              ].map(({ name, icon, enabled }) => (
                <div key={name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{icon}</span>
                    <span className="font-medium">{name}</span>
                  </div>
                  <button className={`px-4 py-2 rounded-full text-sm font-medium ${
                    enabled ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
                  }`}>
                    {enabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
              🔧
            </div>
            <h2 className="text-xl font-semibold mb-2">{toolsList.find(t => t.id === toolId)?.name || 'Tool'}</h2>
            <p className="text-gray-600">This tool is coming soon. Stay tuned for updates!</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-50 border-r">
        <div className="p-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">TOOLS</h2>
          <div className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                  selectedTool === tool.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{tool.icon}</span>
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    {tool.description && (
                      <div className="text-xs text-gray-500">{tool.description}</div>
                    )}
                  </div>
                </div>
                {tool.badge && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">NEW</span>
                )}
              </button>
            ))}
          </div>

          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 mt-8">APPS</h2>
          <div className="space-y-2">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedTool(app.id)}
                className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                  selectedTool === app.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{app.icon}</span>
                  <span className="font-medium">{app.name}</span>
                </div>
                {app.badge && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{app.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        <div className="p-8">
          {selectedTool ? (
            renderToolContent(selectedTool)
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                🔧
              </div>
              <h2 className="text-xl font-semibold mb-2">Tools and Apps</h2>
              <p className="text-gray-600 mb-6">Select a tool or app from the sidebar to get started</p>
              <button
                onClick={() => setSelectedTool('automations')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Start with Automations
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
