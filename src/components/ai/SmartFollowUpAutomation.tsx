'use client'

import React, { useState, useEffect } from 'react'

interface CampaignMetrics {
  totalSent: number
  totalReceived: number
  openRate: number
  clickRate: number
  replyRate: number
  averageResponseTime: string
  bounceRate: number
}

interface FollowUpRule {
  id: string
  name: string
  trigger: 'no_reply' | 'opened_no_action' | 'low_engagement' | 'negative_response' | 'positive_response'
  delayHours: number
  channel: 'email' | 'linkedin' | 'sms' | 'call'
  template: string
  maxAttempts: number
  conditions: {
    industry?: string[]
    companySize?: string[]
    engagementLevel?: 'low' | 'medium' | 'high'
  }
  isActive: boolean
  performance: {
    timesUsed: number
    successRate: number
    averageResponseTime: string
  }
}

interface AutomatedSequence {
  id: string
  leadId: string
  campaignId: string
  currentStep: number
  status: 'waiting' | 'processing' | 'completed' | 'paused'
  responses: SequenceResponse[]
  nextAction: NextAction
  performance: {
    generatedAt: string
    lastChecked: string
    totalActions: number
    successfulActions: number
  }
}

interface SequenceResponse {
  id: string
  stepNumber: number
  channel: string
  content: string
  sentAt: string
  response?: {
    type: 'opened' | 'clicked' | 'replied' | 'called'
    timestamp: string
    sentiment?: 'positive' | 'neutral' | 'negative'
  }
  aiOptimization: {
    appliedRule: string
    confidence: number
    reasoning: string[]
  }
}

interface NextAction {
  type: 'follow_up' | 'escalate' | 'pause' | 'complete'
  channel: string
  scheduledFor: string
  priority: 'high' | 'medium' | 'low'
  reason: string
}

interface Recommendation {
  type: 'timing' | 'content' | 'channel' | 'strategy'
  issue: string
  solution: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
}

export default function SmartFollowUpAutomation() {
  const [activeTab, setActiveTab] = useState<'automation' | 'rules' | 'sequences' | 'recommendations'>('automation')
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all')
  const [isAutoOptimizing, setIsAutoOptimizing] = useState(false)
  const [followUpRules, setFollowUpRules] = useState<FollowUpRule[]>([])
  const [activeSequences, setActiveSequences] = useState<AutomatedSequence[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    // Sample follow-up rules
    setFollowUpRules([
      {
        id: '1',
        name: 'Tech Industry No Reply',
        trigger: 'no_reply',
        delayHours: 72,
        channel: 'email',
        template: 'cold_follow_up_tech',
        maxAttempts: 3,
        conditions: {
          industry: ['Technology', 'Software'],
          engagementLevel: 'low'
        },
        isActive: true,
        performance: {
          timesUsed: 45,
          successRate: 23.5,
          averageResponseTime: '4.2 hours'
        }
      },
      {
        id: '2',
        name: 'High-Engagement Escalation',
        trigger: 'opened_no_action',
        delayHours: 24,
        channel: 'linkedin',
        template: 'personal_connection',
        maxAttempts: 2,
        conditions: {
          engagementLevel: 'high'
        },
        isActive: true,
        performance: {
          timesUsed: 32,
          successRate: 31.8,
          averageResponseTime: '2.1 hours'
        }
      }
    ])

    // Sample active sequences
    setActiveSequences([
      {
        id: '1',
        leadId: 'lead_1',
        campaignId: 'campaign_1',
        currentStep: 2,
        status: 'waiting',
        responses: [
          {
            id: '1',
            stepNumber: 1,
            channel: 'email',
            content: 'Cold introduction sent',
            sentAt: '2024-03-01T09:00:00Z',
            response: {
              type: 'opened',
              timestamp: '2024-03-01T14:30:00Z',
              sentiment: 'neutral'
            },
            aiOptimization: {
              appliedRule: 'Tech Industry No Reply',
              confidence: 89,
              reasoning: ['Opened email within 4 hours', 'No click through detected', 'Tech industry engagement pattern']
            }
          },
          {
            id: '2',
            stepNumber: 2,
            channel: 'email',
            content: 'Follow-up with case study',
            sentAt: '2024-03-02T10:00:00Z',
            aiOptimization: {
              appliedRule: 'Case Study Follow-up',
              confidence: 92,
              reasoning: ['High engagement with initial email', 'Tech industry preference for detailed information']
            }
          }
        ],
        nextAction: {
          type: 'follow_up',
          channel: 'linkedin',
          scheduledFor: '2024-03-03T10:00:00Z',
          priority: 'medium',
          reason: 'Email opened but no engagement - LinkedIn connection may be more effective'
        },
        performance: {
          generatedAt: '2024-03-01T09:00:00Z',
          lastChecked: '2024-03-02T15:30:00Z',
          totalActions: 2,
          successfulActions: 1
        }
      }
    ])

    // Sample recommendations
    setRecommendations([
      {
        type: 'timing',
        issue: 'Low engagement for emails sent on Monday mornings',
        solution: 'Shift email timing to Tuesday-Thursday, 10 AM - 2 PM',
        impact: 'high',
        confidence: 87
      },
      {
        type: 'content',
        issue: 'Subject lines with "Quick question" have 40% lower open rates',
        solution: 'Use industry-specific references in subject lines',
        impact: 'medium',
        confidence: 92
      },
      {
        type: 'channel',
        issue: 'Tech industry leads prefer LinkedIn over email for follow-ups',
        solution: 'Prioritize LinkedIn after initial email contact',
        impact: 'high',
        confidence: 78
      }
    ])
  }, [])

  const renderAutomation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Smart Follow-up Automation</h3>
        <div className="flex space-x-2">
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Campaigns</option>
            <option value="campaign_1">Tech Recruitment</option>
            <option value="campaign_2">SaaS Sales</option>
          </select>
          <button
            onClick={() => setIsAutoOptimizing(true)}
            disabled={isAutoOptimizing}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAutoOptimizing ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isAutoOptimizing ? 'Optimizing...' : '🔧 Auto-Optimize'}
          </button>
        </div>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">247</div>
          <div className="text-sm text-gray-600">Active Sequences</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">23.5%</div>
          <div className="text-sm text-gray-600">Avg Response Rate</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">156</div>
          <div className="text-sm text-gray-600">Today's Actions</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">4.2h</div>
          <div className="text-sm text-gray-600">Avg Response Time</div>
        </div>
      </div>

      {/* Active Sequences */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Active Automation Sequences</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeSequences.map(sequence => (
                <tr key={sequence.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">Lead #{sequence.leadId}</div>
                    <div className="text-sm text-gray-500">Step {sequence.currentStep}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {sequence.campaignId.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      sequence.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                      sequence.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      sequence.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sequence.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{sequence.nextAction.type}</div>
                    <div className="text-xs text-gray-500">{sequence.nextAction.channel}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(sequence.nextAction.scheduledFor).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                      {sequence.responses[0]?.aiOptimization.confidence}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderRules = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Follow-up Rules Engine</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {followUpRules.map(rule => (
          <div key={rule.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h4 className="text-lg font-medium text-gray-900">{rule.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Trigger</div>
                    <div className="font-medium capitalize">{rule.trigger.replace('_', ' ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Delay</div>
                    <div className="font-medium">{rule.delayHours}h</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Channel</div>
                    <div className="font-medium capitalize">{rule.channel}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Max Attempts</div>
                  </div>
                </div>

                <div className="flex space-x-2 mb-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm">Duplicate</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </div>
              </div>

              <div className="space-y-2">
                <button className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  rule.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  ⚡
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Performance</h5>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Times Used</div>
                  <div className="font-medium">{rule.performance.timesUsed}</div>
                </div>
                <div>
                  <div className="text-gray-600">Success Rate</div>
                  <div className="font-medium">{rule.performance.successRate}%</div>
                </div>
                <div>
                  <div className="text-gray-600">Avg Response</div>
                  <div className="font-medium">{rule.performance.averageResponseTime}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSequences = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Sequence Details</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Statuses</option>
            <option>Waiting</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Data
          </button>
        </div>
      </div>

      {activeSequences.map(sequence => (
        <div key={sequence.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Sequence for Lead #{sequence.leadId}
              </h4>
              <p className="text-gray-600">{sequence.campaignId.replace('_', ' ')} Campaign</p>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              sequence.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
              sequence.status === 'processing' ? 'bg-blue-100 text-blue-800' :
              sequence.status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {sequence.status}
            </span>
          </div>

          {/* Sequence Timeline */}
          <div className="space-y-4">
            {sequence.responses.map((response, index) => (
              <div key={response.id} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-4">
                  {index + 1}
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{response.channel}</span>
                    <span className="text-sm text-gray-600">
                      {new Date(response.sentAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{response.content}</p>
                  
                  {response.response && (
                    <div className="mt-2 p-2 bg-white rounded border">
                      <span className="text-sm text-green-600">
                        ✓ {response.response.type.replace('_', ' ')} 
                        ({response.response.timestamp})
                      </span>
                    </div>
                  )}

                  <div className="mt-2 p-2 bg-purple-50 rounded">
                    <span className="text-xs text-purple-700">
                      AI Confidence: {response.aiOptimization.confidence}%
                    </span>
                    <div className="text-xs text-purple-600 mt-1">
                      Applied: {response.aiOptimization.appliedRule}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Next Action Preview */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-medium mr-4">
                ▶
              </div>
              <div className="flex-1 bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    Next: {sequence.nextAction.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    sequence.nextAction.priority === 'high' ? 'bg-red-100 text-red-800' :
                    sequence.nextAction.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {sequence.nextAction.priority}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{sequence.nextAction.reason}</p>
                <div className="text-sm text-gray-600">
                  Scheduled: {new Date(sequence.nextAction.scheduledFor).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">AI Optimization Recommendations</h3>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          🤖 Generate New Insights
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rec.type === 'timing' ? 'bg-orange-100 text-orange-800' :
                  rec.type === 'content' ? 'bg-blue-100 text-blue-800' :
                  rec.type === 'channel' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {rec.type.toUpperCase()}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  rec.impact === 'high' ? 'bg-red-100 text-red-800' :
                  rec.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.impact.toUpperCase()} IMPACT
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {rec.confidence}% confidence
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Issue Identified</h4>
              <p className="text-gray-700">{rec.issue}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Recommended Solution</h4>
              <p className="text-gray-700">{rec.solution}</p>
            </div>

            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                Apply
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                Test First
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Follow-up Automation</h3>
            <p className="text-gray-600">AI-powered automation for optimal follow-up timing and content</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('automation')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'automation' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'rules' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Rules Engine
        </button>
        <button
          onClick={() => setActiveTab('sequences')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'sequences' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sequences
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'recommendations' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          AI Insights
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'automation' && renderAutomation()}
      {activeTab === 'rules' && renderRules()}
      {activeTab === 'sequences' && renderSequences()}
      {activeTab === 'recommendations' && renderRecommendations()}
    </div>
  )
}
