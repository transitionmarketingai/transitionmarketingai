// Message Templates Management Component
'use client'

import React, { useState, useEffect } from 'react'

interface MessageTemplate {
  id: string
  name: string
  category: string
  subject: string
  content: string
  variables: string[]
  useAI: boolean
  industrySpecific: boolean
  createdAt: string
  _count: { messages: number }
}

interface TemplateUsage {
  totalTemplates: number
  totalMessagesSent: number
  totalCreditsUsed: number
}

interface SuggestedTemplate {
  name: string
  category: string
  subject: string
  content: string
  variables: string[]
  isSuggested: boolean
}

export default function MessageTemplates() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [suggestedTemplates, setSuggestedTemplates] = useState<SuggestedTemplate[]>([])
  const [usage, setUsage] = useState<TemplateUsage | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null)
  
  // Form state for creating templates
  const [formData, setFormData] = useState({
    name: '',
    category: 'OUTREACH',
    subject: '',
    content: '',
    useAI: false,
    industrySpecific: false
  })

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/crm/message-templates')
      const data = await response.json()
      
      if (data.success) {
        setTemplates(data.data.templates)
        setUsage(data.data.usage)
        setSuggestedTemplates(data.data.suggestedTemplates)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/v1/crm/message-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        await fetchTemplates()
        setShowCreateModal(false)
        setFormData({
          name: '',
          category: 'OUTREACH',
          subject: '',
          content: '',
          useAI: false,
          industrySpecific: false
        })
      }
    } catch (error) {
      console.error('Error creating template:', error)
    }
  }

  const handleUseSuggestedTemplate = async (template: SuggestedTemplate) => {
    setFormData({
      name: template.name,
      category: template.category,
      subject: template.subject,
      content: template.content,
      useAI: true,
      industrySpecific: false
    })
    setShowCreateModal(true)
  }

  const parseVariables = (content: string): string[] => {
    const matches = content.match(/\{\{([^}]+)\}\}/g)
    return matches ? matches.map(match => match.slice(2, -2)) : []
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      OUTREACH: 'bg-blue-100 text-blue-800',
      FOLLOW_UP: 'bg-yellow-100 text-yellow-800',
      MEETING: 'bg-green-100 text-green-800',
      CLOSE: 'bg-purple-100 text-purple-800',
      OTHER: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || colors.OTHER
  }

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Usage Statistics */}
      {usage && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Usage</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div>{usage.totalTemplates}</div>
              <div className="text-sm text-gray-600">Total Templates</div>
            </div>
            <div className="text-center">
              <div>{usage.totalMessagesSent}</div>
              <div className="text-sm text-gray-600">Messages Sent</div>
            </div>
            <div className="text-center">
              <div>{usage.totalCreditsUsed}</div>
              <div className="text-sm text-gray-600">Credits Used</div>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Templates */}
      {suggestedTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Templates</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedTemplates.map((template, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Suggested
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">{template.subject}</div>
                
                <div className="text-xs text-gray-500 mb-3">
                  Variables: {template.variables.length}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleUseSuggestedTemplate(template)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Use Template
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedTemplate({ ...template, id: 'preview' } as MessageTemplate)
                      setShowPreviewModal(true)
                    }}
                    className="text-gray-600 hover:text-gray-700 text-sm"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category.replace('_', ' ')}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(template.category)}`}>
                  {template.category.replace('_', ' ')}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                {template.useAI && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    AI
                  </span>
                )}
                {template.industrySpecific && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Industry
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-3">{template.subject}</div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>{template.variables.length} variables</span>
              <span>{template._count.messages} uses</span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedTemplate(template)
                  setShowPreviewModal(true)
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Preview
              </button>
              <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Create Message Template</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateTemplate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="OUTREACH">Outreach</option>
                  <option value="FOLLOW_UP">Follow Up</option>
                  <option value="MEETING">Meeting</option>
                  <option value="CLOSE">Close</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Use {{variables}} for dynamic content"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hi {{firstName}},..."
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.useAI}
                    onChange={(e) => setFormData({ ...formData, useAI: e.target.checked })}
                    className="mr-2"
                  />
                  Use AI Enhancement
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.industrySpecific}
                    onChange={(e) => setFormData({ ...formData, industrySpecific: e.target.checked })}
                    className="mr-2"
                  />
                  Industry Specific
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Preview: {selectedTemplate.name}</h3>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Subject</label>
                <div className="bg-gray-50 p-3 rounded-lg">{selectedTemplate.subject}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Content</label>
                <div className="bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{selectedTemplate.content}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Variables Required</label>
                <div className="flex flex-wrap gap-2">
                  {parseVariables(selectedTemplate.content + ' ' + selectedTemplate.subject).map((variable, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {templates.length === 0 && suggestedTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📧</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
          <p className="text-gray-600 mb-4">Create your first message template to start sending personalized messages.</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Your First Template
          </button>
        </div>
      )}
    </div>
  )
}

