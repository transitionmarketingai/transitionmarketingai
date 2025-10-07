'use client'

import React, { useState, useEffect } from 'react'

interface LeadProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  company: string
  position: string
  industry: string
  location: string
  companySize: string
  painPoints: string[]
  interests: string[]
  socialMedia: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  recentActivities: Activity[]
  communicationHistory: MessageInteraction[]
  personalizationScore: number
}

interface Activity {
  id: string
  type: 'post' | 'comment' | 'share' | 'event' | 'article'
  content: string
  platform: 'linkedin' | 'twitter' | 'website' | 'news'
  timestamp: string
  sentiment: 'positive' | 'neutral' | 'negative'
}

interface MessageInteraction {
  id: string
  channel: 'email' | 'linkedin' | 'call' | 'sms'
  subject?: string
  contentType: string
  opened: boolean
  clicked: boolean
  replied: boolean
  timestamp: string
  responseTime?: string
}

interface PersonalizedMessage {
  id: string
  originalTemplate: string
  personalizedContent: string
  variables: Record<string, string>
  confidence: number
  reasoning: string[]
  tone: 'professional' | 'casual' | 'urgent' | 'friendly'
  suggestedFollowUp?: string
  optimizedSubject?: string
}

interface PersonalizationInsight {
  type: 'behavior' | 'preference' | 'timing' | 'content'
  insight: string
  confidence: number
  impactLevel: 'high' | 'medium' | 'low'
}

export default function AIPersonalizationEngine() {
  const [selectedLead, setSelectedLead] = useState<LeadProfile | null>(null)
  const [personalizedMessages, setPersonalizedMessages] = useState<PersonalizedMessage[]>([])
  const [insights, setInsights] = useState<PersonalizationInsight[]>([])
  const [activeTab, setActiveTab] = useState<'leads' | 'personalize' | 'insights'>('leads')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Sample leads data
  useEffect(() => {
    setSelectedLead({
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@techcorp.com',
      company: 'TechCorp Solutions',
      position: 'VP of Engineering',
      industry: 'Technology',
      location: 'San Francisco',
      companySize: '201-1000',
      painPoints: ['scaling infrastructure', 'developer productivity', 'security compliance'],
      interests: ['AI/ML', 'cloud architecture', 'team management'],
      socialMedia: {
        linkedin: 'linkedin.com/in/sarahjohnson',
        twitter: '@sarahjtech'
      },
      recentActivities: [
        {
          id: '1',
          type: 'post',
          content: 'Excited to speak at the AI Engineering Summit next month about scaling ML models!',
          platform: 'linkedin',
          timestamp: '2024-03-01T10:00:00Z',
          sentiment: 'positive'
        },
        {
          id: '2',
          type: 'article',
          content: 'Published article: "Best Practices for Microservices Architecture"',
          platform: 'website',
          timestamp: '2024-02-28T14:00:00Z',
          sentiment: 'neutral'
        }
      ],
      communicationHistory: [
        {
          id: '1',
          channel: 'email',
          subject: 'Introduction - Growth Solutions',
          contentType: 'cold_intro',
          opened: true,
          clicked: true,
          replied: false,
          timestamp: '2024-02-15T09:00:00Z',
          responseTime: '2 hours'
        }
      ],
      personalizationScore: 87
    })
  }, [])

  const templates = [
    {
      id: 'intro',
      title: 'Cold Introduction',
      content: `Hi {{firstName}},

I noticed your work at {{company}} in {{industry}}. Your insights on {{interest}} are impressive.

I help {{industry}} companies like {{company}} overcome {{painPoint}} challenges. Would you be interested in a brief conversation?

Best regards,
{{senderName}}`
    },
    {
      id: 'followup',
      title: 'Follow-up Message',
      content: `Hi {{firstName}},

Following up on my previous message about {{painPoint}} solutions for {{industry}} companies.

I saw you'll be speaking at {{event}} - looking forward to your insights on {{topic}}!

Would next Tuesday work for a 15-minute call?

Best,
{{senderName}}`
    },
    {
      id: 'value_prop',
      title: 'Value Proposition',
      content: `Hi {{firstName}},

Companies like {{company}} typically face {{painPoint}} challenges when {{context}}.

Our {{solution}} has helped {{industry}} companies achieve {{results}}.

Would you like to see how this applies to {{company}}?

{{senderName}}`
    }
  ]

  const generatePersonalizedMessage = async () => {
    if (!selectedLead || !selectedTemplate) return

    setIsAnalyzing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const template = templates.find(t => t.id === selectedTemplate)
      if (!template) return

      const personalizedContent = `Hi Sarah,

I noticed your upcoming speech at the AI Engineering Summit on scaling ML models - very exciting!

I saw TechCorp Solutions has been focusing on AI/ML initiatives, and I imagine scaling infrastructure for ML models at your company size (201-1000 employees) must present some unique challenges.

Your insights on cloud architecture from your recent article caught my attention. I help technology companies overcome scaling infrastructure challenges with AI-powered automation solutions.

Given your interest in ML and team management, would you be open to a brief 15-minute conversation about how we've helped similar VP Engineers achieve 40% faster deployment cycles?

Looking forward to connecting!

Best regards,
{{senderName}}`

      const newMessage: PersonalizedMessage = {
        id: Date.now().toString(),
        originalTemplate: template.content,
        personalizedContent,
        variables: {
          firstName: 'Sarah',
          company: 'TechCorp Solutions',
          industry: 'technology',
          interest: 'AI/ML',
          painPoint: 'scaling infrastructure',
          event: 'AI Engineering Summit',
          topic: 'scaling ML models'
        },
        confidence: 94,
        reasoning: [
          'Analyzed LinkedIn activity about AI Summit speaking engagement',
          'Detected high engagement with ML/scaling content',
          'Matched solution to identified pain points',
          'Optimized timing based on positive sentiment toward AI topics',
          'Personalized reference to recent article on cloud architecture'
        ],
        tone: 'professional',
        suggestedFollowUp: 'Book a demo call specifically around ML infrastructure challenges',
        optimizedSubject: 'Quick question about your ML scaling approach at TechCorp'
      }

      setPersonalizedMessages([newMessage])
      setIsAnalyzing(false)
    }, 2000)
  }

  const generateInsights = () => {
    if (!selectedLead) return

    const newInsights: PersonalizationInsight[] = [
      {
        type: 'timing',
        insight: 'Best response time: Tuesday-Thursday, 10-11 AM PT (based on LinkedIn activity patterns)',
        confidence: 89,
        impactLevel: 'high'
      },
      {
        type: 'content',
        insight: 'Responds positively to technical content about AI/ML and cloud architecture',
        confidence: 92,
        impactLevel: 'high'
      },
      {
        type: 'behavior',
        insight: 'Opens emails but seldom replies to generic subject lines. Prefers personalized technical references.',
        confidence: 85,
        impactLevel: 'medium'
      },
      {
        type: 'preference',
        insight: 'Values data-driven solutions and cites specific metrics in decision-making',
        confidence: 78,
        impactLevel: 'medium'
      }
    ]
    
    setInsights(newInsights)
  }

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Lead Analysis & Personalization</h3>
        <button
          onClick={generateInsights}
          disabled={!selectedLead}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
        >
          Analyze Lead
        </button>
      </div>

      {selectedLead && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-semibold text-gray-900">
                  {selectedLead.firstName} {selectedLead.lastName}
                </h4>
                <p className="text-gray-600">{selectedLead.position} at {selectedLead.company}</p>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedLead.personalizationScore > 80 ? 'bg-green-100 text-green-800' :
                    selectedLead.personalizationScore > 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Personalization Score: {selectedLead.personalizationScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Profile Data</h5>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Industry:</span> {selectedLead.industry}</div>
                <div><span className="text-gray-600">Location:</span> {selectedLead.location}</div>
                <div><span className="text-gray-600">Company Size:</span> {selectedLead.companySize}</div>
                <div><span className="text-gray-600">Pain Points:</span></div>
                <ul className="ml-4 space-y-1">
                  {selectedLead.painPoints.map((point, index) => (
                    <li key={index} className="text-gray-600">• {point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-3">Recent Activities</h5>
              <div className="space-y-3">
                {selectedLead.recentActivities.slice(0, 3).map(activity => (
                  <div key={activity.id} className="border-l-2 border-blue-200 pl-4">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.type === 'post' ? '📝 Posted' : 
                       activity.type === 'article' ? '📄 Published' : activity.type}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {activity.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleDateString()} • {activity.platform}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-3">Engagement History</h5>
              <div className="space-y-2 text-sm">
                {selectedLead.communicationHistory.map(msg => (
                  <div key={msg.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="capitalize">{msg.channel}</span>
                    <div className="flex space-x-1">
                      {msg.opened && <span className="text-green-600">👁️</span>}
                      {msg.clicked && <span className="text-blue-600">👆</span>}
                      {msg.replied && <span className="text-purple-600">💬</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          {insights.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-3">🤖 AI Personalization Insights</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {insights.map((insight, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        insight.type === 'timing' ? 'bg-orange-100 text-orange-800' :
                        insight.type === 'content' ? 'bg-blue-100 text-blue-800' :
                        insight.type === 'behavior' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {insight.type}
                      </span>
                      <span className="text-xs text-gray-600">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderPersonalize = () => (
    <div className="space-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">AI Message Personalization</h3>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Select Template</h5>
            <div className="space-y-3">
              {templates.map(template => (
                <label key={template.id} className="flex p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{template.title}</div>
                    <div className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {template.content.substring(0, 100)}...
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={generatePersonalizedMessage}
              disabled={!selectedTemplate || isAnalyzing}
              className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-colors ${
                !selectedTemplate || isAnalyzing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  AI is analyzing...
                </div>
              ) : (
                '🤖 Generate Personalized Message'
              )}
            </button>
          </div>

          {/* Personalization Results */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">AI Personalization Result</h5>
            {personalizedMessages.length > 0 ? (
              <div className="space-y-4">
                {personalizedMessages.map(message => (
                  <div key={message.id} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {message.confidence}% Confidence
                      </span>
                      <span className="text-xs text-gray-600">
                        {message.tone.charAt(0).toUpperCase() + message.tone.slice(1)} tone
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded border mb-3">
                      <h6 className="font-medium text-gray-900 mb-2">
                        Optimized Subject: {message.optimizedSubject}
                      </h6>
                      <div className="text-sm text-gray-700 whitespace-pre-line">
                        {message.personalizedContent}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h6 className="font-medium text-gray-900">AI Reasoning:</h6>
                      <ul className="space-y-2">
                        {message.reasoning.map((reason, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-purple-600 mr-2">•</span>
                            <span className="text-gray-700">{reason}</span>
                          </li>
                        ))}
                      </ul>

                      {message.suggestedFollowUp && (
                        <div className="mt-3 p-3 bg-blue-100 rounded">
                          <h6 className="font-medium text-blue-900 mb-1">Suggested Follow-up:</h6>
                          <p className="text-sm text-blue-800">{message.suggestedFollowUp}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <p>Select a template and generate AI personalization</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Personalization Engine</h3>
            <p className="text-gray-600">Powerful AI-powered message customization based on lead analysis</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'leads' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Lead Analysis
        </button>
        <button
          onClick={() => setActiveTab('personalize')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'personalize' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Message Personalization
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'insights' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          AI Insights
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'leads' && renderLeads()}
      {activeTab === 'personalize' && renderPersonalize()}
      {activeTab === 'insights' && (
        <div className="text-center py-12 text-gray-500">
          <h3 className="text-lg font-semibold mb-2">AI Performance Insights</h3>
          <p>Advanced analytics and optimization recommendations will be available here</p>
        </div>
      )}
    </div>
  )
}
