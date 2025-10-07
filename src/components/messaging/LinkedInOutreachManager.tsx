'use client'

import React, { useState, useEffect } from 'react'

interface LinkedInTemplate {
  id: string
  name: string
  message: string
  type: 'connection_request' | 'message' | 'follow_up'
  variables: string[]
  createdAt: string
  usageCount: number
}

interface LinkedInSequence {
  id: string
  name: string
  description: string
  steps: LinkedInSequenceStep[]
  status: 'draft' | 'active' | 'completed' | 'paused'
  participantsCount: number
  connectionRate: number
  responseRate: number
}

interface LinkedInSequenceStep {
  id: string
  order: number
  delayHours: number
  template: LinkedInTemplate
  actionType: 'connect' | 'message' | 'follow_up'
}

interface LinkedInAccount {
  id: string
  email: string
  profileUrl: string
  status: 'connected' | 'disconnected' | 'error'
  lastConnection: string
  dailyLimit: number
  currentUsage: number
}

export default function LinkedInOutreachManager() {
  const [activeTab, setActiveTab] = useState<'templates' | 'sequences' | 'accounts'>('templates')
  const [templates, setTemplates] = useState<LinkedInTemplate[]>([])
  const [sequences, setSequences] = useState<LinkedInSequence[]>([])
  const [accounts, setAccounts] = useState<LinkedInAccount[]>([])
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showSequenceModal, setShowSequenceModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<LinkedInTemplate | null>(null)
  const [editingSequence, setEditingSequence] = useState<LinkedInSequence | null>(null)

  useEffect(() => {
    setTemplates([
      {
        id: '1',
        name: 'Cold Connection Request',
        message: `Hi {{firstName}},

I noticed your impressive work at {{company}} in the {{industry}} space. I'd love to connect and learn more about your growth strategies.

Best regards,
{{senderName}}`,
        type: 'connection_request',
        variables: ['firstName', 'company', 'industry', 'senderName'],
        createdAt: '2024-01-15',
        usageCount: 234
      },
      {
        id: '2',
        name: 'Post-Connection Message',
        message: `Hi {{firstName}},

Thank you for connecting! I see {{company}} is doing great work in {{industry}}.

I help similar companies optimize their {{service}} processes. Would you be open to a brief conversation about growth opportunities?

Best,
{{senderName}}`,
        type: 'message',
        variables: ['firstName', 'company', 'industry', 'service', 'senderName'],
        createdAt: '2024-01-10',
        usageCount: 156
      }
    ])

    setSequences([
      {
        id: '1',
        name: 'B2B Growth Prospecting',
        description: 'Multi-step LinkedIn sequence for B2B SaaS companies',
        steps: [
          {
            id: '1',
            order: 1,
            delayHours: 0,
            template: {
              id: '1',
              name: 'Cold Connection Request',
              message: '',
              type: 'connection_request',
              variables: [],
              createdAt: '',
              usageCount: 0
            },
            actionType: 'connect'
          },
          {
            id: '2',
            order: 2,
            delayHours: 24,
            template: {
              id: '2',
              name: 'Post-Connection Message',
              message: '',
              type: 'message',
              variables: [],
              createdAt: '',
              usageCount: 0
            },
            actionType: 'message'
          }
        ],
        status: 'active',
        participantsCount: 450,
        connectionRate: 28.4,
        responseRate: 15.6
      }
    ])

    setAccounts([
      {
        id: '1',
        email: 'john@company.com',
        profileUrl: 'linkedin.com/in/johnsmith',
        status: 'connected',
        lastConnection: '2024-03-01T10:30:00Z',
        dailyLimit: 100,
        currentUsage: 45
      }
    ])
  }, [])

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">LinkedIn Templates</h3>
        <button
          onClick={() => setShowTemplateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                template.type === 'connection_request' ? 'bg-blue-100 text-blue-800' :
                template.type === 'message' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {template.type.replace('_', ' ')}
              </span>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-600 hover:text-blue-600">✏️</button>
                <button className="p-1 text-gray-600 hover:text-red-600">🗑️</button>
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">{template.message}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Used {template.usageCount} times</span>
              <span>{template.variables.length} variables</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSequences = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">LinkedIn Sequences</h3>
        <button
          onClick={() => setShowSequenceModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Sequence
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sequences.map(sequence => (
          <div key={sequence.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{sequence.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    sequence.status === 'active' ? 'bg-green-100 text-green-800' :
                    sequence.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    sequence.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800' 
                  }`}>
                    {sequence.status.charAt(0).toUpperCase() + sequence.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600">{sequence.description}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Edit
                </button>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-700 text-sm">
                  Duplicate
                </button>
              </div>
            </div>

            {/* Performance metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{sequence.participantsCount}</div>
                <div className="text-sm text-gray-600">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{sequence.connectionRate}%</div>
                <div className="text-sm text-gray-600">Connection Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{sequence.responseRate}%</div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
            </div>

            {/* Sequence steps */}
            <div>
              <h5 className="font-medium text-gray-900">Steps ({sequence.steps.length})</h5>
              <div className="space-y-2 mt-2">
                {sequence.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">{step.template.name}</div>
                      <div className="text-sm text-gray-600">
                        Delay: {step.delayHours}h • Action: {step.actionType}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAccounts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">LinkedIn Accounts</h3>
        <button
          onClick={() => setShowAccountModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map(account => (
          <div key={account.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  account.status === 'connected' ? 'bg-green-400' :
                  account.status === 'disconnected' ? 'bg-gray-400' :
                  'bg-red-400'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{account.email}</h4>
                  <p className="text-sm text-gray-600">{account.profileUrl}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-600 hover:text-blue-600">⚙️</button>
                <button className="p-1 text-gray-600 hover:text-red-600">🗑️</button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Daily Usage</span>
                <span className="text-sm font-medium">{account.currentUsage}/{account.dailyLimit}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    account.currentUsage / account.dailyLimit > 0.8 ? 'bg-red-400' :
                    account.currentUsage / account.dailyLimit > 0.6 ? 'bg-yellow-400' :
                    'bg-green-400'
                  }`}
                  style={{ width: `${(account.currentUsage / account.dailyLimit) * 100}%` }}
                ></div>
              </div>

              <div className="text-xs text-gray-500">
                Last active: {new Date(account.lastConnection).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">LinkedIn Outreach Manager</h3>
            <p className="text-gray-600">Automate LinkedIn connection requests and personalized messaging</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">💼</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'templates' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('sequences')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'sequences' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sequences
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'accounts' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Accounts
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'sequences' && renderSequences()}
      {activeTab === 'accounts' && renderAccounts()}
    </div>
  )
}
