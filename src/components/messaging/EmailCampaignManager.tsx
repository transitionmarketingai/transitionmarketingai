'use client'

import React, { useState, useEffect } from 'react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
  category: string
  isAdvanced: boolean
  createdAt: string
  lastUsed?: string
  usageCount: number
}

interface EmailSequence {
  id: string
  name: string
  description: string
  steps: EmailSequenceStep[]
  status: 'draft' | 'active' | 'completed' | 'paused'
  sentCount: number
  openRate: number
  clickRate: number
  replyRate: number
}

interface EmailSequenceStep {
  id: string
  order: number
  delayDays: number
  delayType: 'business_days' | 'calendar_days'
  template: EmailTemplate
  conditions?: {
    trigger: 'opened' | 'clicked' | 'replied' | 'no_response'
    timeLimit?: number
  }
}

interface CampaignParticipant {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  currentStep: number
  status: 'in_progress' | 'completed' | 'unsubscribed' | 'bounced'
  lastActivity: string
  nextEmailDate?: string
}

export default function EmailCampaignManager() {
  const [activeTab, setActiveTab] = useState<'templates' | 'sequences' | 'campaigns'>('templates')
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [sequences, setSequences] = useState<EmailSequence[]>([])
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showSequenceModal, setShowSequenceModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [editingSequence, setEditingSequence] = useState<EmailSequence | null>(null)

  const templateCategories = [
    'Introduction',
    'Follow-up',
    'Value Proposition',
    'Objection Handling',
    'Closing',
    'Thank You',
    'Custom'
  ]

  // Sample data for demonstration
  useEffect(() => {
    setTemplates([
      {
        id: '1',
        name: 'Cold Introduction',
        subject: 'Quick question about {{company}} growth',
        content: `Hi {{firstName}},

I noticed {{company}} has been growing rapidly in the {{industry}} space. 

What's your current approach to {{topic}}? I'm curious because many {{industry}} companies I work with are facing similar challenges.

Would you be open to a quick 15-minute call next week to discuss?

Best regards,
{{senderName}}`,
        variables: ['firstName', 'company', 'industry', 'topic', 'senderName'],
        category: 'Introduction',
        isAdvanced: true,
        createdAt: '2024-01-15',
        usageCount: 150,
        lastUsed: '2024-03-01'
      },
      {
        id: '2',
        name: 'Follow-up #1',
        subject: 'Following up - {{company}} growth strategies',
        content: `Hi {{firstName}},

Following up on my previous message about {{company}} growth opportunities.

I've helped similar {{industry}} companies increase their growth by {{percentage}}% through strategic {{service}}.

Would you be interested in seeing how this could apply to {{company}}?

Let me know if next Tuesday at 2 PM works for a brief discussion.

Best,
{{senderName}}`,
        variables: ['firstName', 'company', 'industry', 'percentage', 'service', 'senderName'],
        category: 'Follow-up',
        isAdvanced: false,
        createdAt: '2024-01-10',
        usageCount: 89,
        lastUsed: '2024-02-28'
      }
    ])

    setSequences([
      {
        id: '1',
        name: 'Growth Acceleration Sequence',
        description: '7-step sequence focused on growth acceleration for tech startups',
        steps: [
          {
            id: '1',
            order: 1,
            delayDays: 0,
            delayType: 'calendar_days',
            template: {
              id: '1',
              name: 'Cold Introduction',
              subject: 'Quick question about {{company}} growth',
              content: '',
              variables: [],
              category: 'Introduction',
              isAdvanced: true,
              createdAt: '',
              usageCount: 0
            }
          },
          {
            id: '2',
            order: 2,
            delayDays: 3,
            delayType: 'business_days',
            template: {
              id: '2',
              name: 'Follow-up #1',
              subject: 'Following up - {{company}} growth strategies',
              content: '',
              variables: [],
              category: 'Follow-up',
              isAdvanced: false,
              createdAt: '',
              usageCount: 0
            },
            conditions: {
              trigger: 'no_response',
              timeLimit: 3
            }
          }
        ],
        status: 'active',
        sentCount: 1247,
        openRate: 34.5,
        clickRate: 8.2,
        replyRate: 12.3
      }
    ])
  }, [])

  const handleSaveTemplate = (templateData: Partial<EmailTemplate>) => {
    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id ? { ...t, ...templateData } : t
      ))
    } else {
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        name: templateData.name || '',
        subject: templateData.subject || '',
        content: templateData.content || '',
        variables: templateData.variables || [],
        category: templateData.category || 'Custom',
        isAdvanced: templateData.isAdvanced || false,
        createdAt: new Date().toISOString(),
        usageCount: 0
      }
      setTemplates([...templates, newTemplate])
    }
    setShowTemplateModal(false)
    setEditingTemplate(null)
  }

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
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
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  template.isAdvanced ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {template.category}
                </span>
                {template.isAdvanced && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Advanced
                  </span>
                )}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => {
                    setEditingTemplate(template)
                    setShowTemplateModal(true)
                  }}
                  className="p-1 text-gray-600 hover:text-blue-600"
                >
                  ✏️
                </button>
                <button className="p-1 text-gray-600 hover:text-red-600">
                  🗑️
                </button>
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Used {template.usageCount} times</span>
              <span>{template.variables.length} variables</span>
            </div>

            {template.lastUsed && (
              <div className="mt-2 text-xs text-gray-500">
                Last used: {new Date(template.lastUsed).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderSequences = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Email Sequences</h3>
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
                  <h4 className="text-lg font-medium text-gray-900">{sequence.name}</	h4>
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
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{sequence.sentCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{sequence.openRate}%</div>
                <div className="text-sm text-gray-600">Open Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{sequence.clickRate}%</div>
                <div className="text-sm text-gray-600">Click Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{sequence.replyRate}%</div>
                <div className="text-sm text-gray-600">Reply Rate</div>
              </div>
            </div>

            {/* Sequence steps */}
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Steps ({sequence.steps.length})</h5>
              <div className="space-y-2">
                {sequence.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">{step.template.name}</div>
                      <div className="text-sm text-gray-600">
                        Delay: {step.delayDays} {step.delayType.replace('_', ' ')} after previous step
                        {step.conditions && ` • Trigger: ${step.conditions.trigger}`}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {step.template.subject}
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Campaign Manager</h3>
            <p className="text-gray-600">Create, manage, and optimize email sequences for maximum engagement</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">📧</span>
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
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'campaigns' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Campaigns
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'sequences' && renderSequences()}
      {activeTab === 'campaigns' && (
        <div className="text-center py-12 text-gray-500">
          <h3 className="text-lg font-semibold mb-2">Campaign Management</h3>
          <p>Campaign execution and monitoring will be available here</p>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold text-gray-900">
                {editingTemplate ? 'Edit Template' : 'Create Email Template'}
              </h4>
              <button
                onClick={() => {
                  setShowTemplateModal(false)
                  setEditingTemplate(null)
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <TemplateEditor 
              template={editingTemplate}
              onSave={handleSaveTemplate}
              categories={templateCategories}
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface TemplateEditorProps {
  template: EmailTemplate | null
  onSave: (data: Partial<EmailTemplate>) => void
  categories: string[]
}

function TemplateEditor({ template, onSave, categories }: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    subject: template?.subject || '',
    content: template?.content || '',
    category: template?.category || 'Custom',
    isAdvanced: template?.isAdvanced || false,
    variables: template?.variables || []
  })

  const commonVariables = [
    'firstName', 'lastName', 'company', 'industry', 
    'position', 'location', 'senderName', 'senderTitle'
  ]

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g
    const matches = []
    let match
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[1])
    }
    return Array.from(new Set(matches))
  }

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content,
      variables: extractVariables(content)
    })
  }

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('template-content') as HTMLTextAreaElement
    const cursorPos = textarea.selectionStart
    const textBefore = formData.content.substring(0, cursorPos)
    const textAfter = formData.content.substring(cursorPos)
    
    const newContent = textBefore + `{{${variable}}}` + textAfter
    handleContentChange(newContent)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        cursorPos + variable.length + 4, 
        cursorPos + variable.length + 4
      )
    }, 100)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter template name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter email subject"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Email Content</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="advanced-mode"
              checked={formData.isAdvanced}
              onChange={(e) => setFormData({ ...formData, isAdvanced: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="advanced-mode" className="text-sm text-gray-600">Advanced Mode</label>
          </div>
        </div>
        
        {formData.isAdvanced && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Available Variables</h5>
            <div className="flex flex-wrap gap-2">
              {commonVariables.map(variable => (
                <button
                  key={variable}
                  onClick={() => insertVariable(variable)}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>
        )}

        <textarea
          id="template-content"
          value={formData.content}
          onChange={(e) => handleContentChange(e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write your email content here. Use {{variableName}} for dynamic content..."
        />
        
        {formData.variables.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Detected variables:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {formData.variables.map(variable => (
                <span key={variable} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => {
            setFormData({
              name: '', subject: '', content: '', 
              category: 'Custom', isAdvanced: false, variables: []
            })
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {template ? 'Update Template' : 'Create Template'}
        </button>
      </div>
    </div>
  )
}











