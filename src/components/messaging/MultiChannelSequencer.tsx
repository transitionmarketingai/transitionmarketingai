'use client'

import React, { useState, useEffect } from 'react'

interface ChannelAction {
  id: string
  channel: 'email' | 'linkedin' | 'sms' | 'call'
  type: string
  template?: any
  delay?: number
  delayUnit: 'minutes' | 'hours' | 'days'
  conditions?: string[]
}

interface SequenceStep {
  id: string
  order: number
  name: string
  actions: ChannelAction[]
  delayAfter: number
  delayUnit: 'hours' | 'days'
}

interface ChannelPerformance {
  channel: string
  sent: number
  opened: number
  clicked: number
  replied: number
  conversionRate: number
}

interface SequenceParticipant {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  currentStep: number
  channelPreferences: {
    email: boolean
    linkedin: boolean
    sms: boolean
    call: boolean
  }
  responses: {
    email: boolean
    linkedin: boolean
    sms: boolean
    call: boolean
  }
  nextAction?: {
    channel: string
    scheduledFor: string
    action: string
  }
}

export default function MultiChannelSequencer() {
  const [sequences, setSequences] = useState<any[]>([])
  const [participants, setParticipants] = useState<SequenceParticipant[]>([])
  const [selectedSequence, setSelectedSequence] = useState<any>(null)
  const [showBuilder, setShowBuilder] = useState(false)
  const [performance, setPerformance] = useState<ChannelPerformance[]>([])
  const [viewMode, setViewMode] = useState<'builder' | 'performance' | 'participants'>('builder')

  useEffect(() => {
    setSequences([
      {
        id: '1',
        name: 'Full-Funnel Outreach',
        description: 'Multi-channel sequence for high-value prospects',
        totalSteps: 5,
        channels: ['email', 'linkedin', 'sms'],
        status: 'active',
        participantsCount: 234
      },
      {
        id: '2',
        name: 'Cold to Close',
        description: 'Direct sales approach across all channels',
        totalSteps: 8,
        channels: ['email', 'linkedin', 'call'],
        status: 'draft',
        participantsCount: 0
      }
    ])

    setParticipants([
      {
        id: '1',
        email: 'john@techcorp.com',
        firstName: 'John',
        lastName: 'Smith',
        company: 'TechCorp',
        currentStep: 2,
        channelPreferences: {
          email: true,
          linkedin: true,
          sms: false,
          call: true
        },
        responses: {
          email: false,
          linkedin: true,
          sms: false,
          call: false
        },
        nextAction: {
          channel: 'email',
          scheduledFor: '2024-03-05T10:00:00Z',
          action: 'Schedule meeting'
        }
      },
      {
        id: '2',
        email: 'sarah@startup.io',
        firstName: 'Sarah',
        lastName: 'Johnson',
        company: 'StartupCo',
        currentStep: 1,
        channelPreferences: {
          email: true,
          linkedin: false,
          sms: true,
          call: true
        },
        responses: {
          email: false,
          linkedin: false,
          sms: false,
          call: false
        },
        nextAction: {
          channel: 'linkedin',
          scheduledFor: '2024-03-04T14:30:00Z',
          action: 'Send connection request'
        }
      }
    ])

    setPerformance([
      {
        channel: 'email',
        sent: 1247,
        opened: 423,
        clicked: 87,
        replied: 34,
        conversionRate: 8.1
      },
      {
        channel: 'linkedin',
        sent: 856,
        opened: 423,
        clicked: 123,
        replied: 67,
        conversionRate: 15.6
      },
      {
        channel: 'sms',
        sent: 234,
        opened: 234,
        clicked: 89,
        replied: 45,
        conversionRate: 19.2
      },
      {
        channel: 'call',
        sent: 156,
        opened: 156,
        clicked: 156,
        replied: 67,
        conversionRate: 42.9
      }
    ])
  }, [])

  const renderSequenceBuilder = () => {
    if (!selectedSequence) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Multi-Channel Sequence</h3>
          <p className="text-gray-600 mb-6">Build automated sequences across email, LinkedIn, SMS, and calls</p>
          <button
            onClick={() => setShowBuilder(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Building
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{selectedSequence.name}</h3>
            <p className="text-gray-600">{selectedSequence.description}</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Preview
            </button>
            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
              Activate
            </button>
          </div>
        </div>

        {/* Sequence Canvas */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Sequence Steps</h4>
            <button className="px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
              + Add Step
            </button>
          </div>

          {/* Step 1 */}
          <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    1
                  </span>
                  <h5 className="font-medium text-gray-900">Initial Outreach</h5>
                </div>
                <div className="ml-9 space-y-2">
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                    <span className="text-sm text-gray-600">Email: Welcome message</span>
                    <span className="ml-auto text-xs text-gray-500">Immediate</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                    <span className="text-sm text-gray-600">LinkedIn: Connection request</span>
                    <span className="ml-auto text-xs text-gray-500">+2 hours</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-600 hover:text-blue-600">✏️</button>
                <button className="p-1 text-gray-600 hover:text-red-600">🗑️</button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-yellow-400">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    2
                  </span>
                  <h5 className="font-medium text-gray-900">Follow-up Engagement</h5>
                </div>
                <div className="ml-9 space-y-2">
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                    <span className="text-sm text-gray-600">Email: Case study</span>
                    <span className="ml-auto text-xs text-gray-500">+3 days</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                    <span className="text-sm text-gray-600">SMS: Quick pulse check</span>
                    <span className="ml-auto text-xs text-gray-500">+4 days</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-600 hover:text-blue-600">✏️</button>
                <button className="p-1 text-gray-600 hover:text-red-600">🗑️</button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    3
                  </span>
                  <h5 className="font-medium text-gray-900">Closing Attempt</h5>
                </div>
                <div className="ml-9 space-y-2">
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                    <span className="text-sm text-gray-600">Call: Demo scheduling</span>
                    <span className="ml-auto text-xs text-gray-500">+7 days</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                    <span className="text-sm text-gray-600">LinkedIn: Professional touch</span>
                    <span className="ml-auto text-xs text-gray-500">+8 days</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-600 hover:text-blue-600">✏️</button>
                <button className="p-1 text-gray-600 hover:text-red-600">🗑️</button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Available Channels</h4>
            <div className="space-y-2">
              {['email', 'linkedin', 'sms', 'call'].map(channel => (
                <button
                  key={channel}
                  className="w-full text-left p-2 border border-gray-200 rounded hover:bg-gray-50 flex items-center"
                >
                  <span className="mr-2">{getChannelIcon(channel)}</span>
                  <span className="capitalize">{channel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Templates</h4>
            <div className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">Cold Email</div>
                <div className="text-gray-500">2 templates</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">LinkedIn Messages</div>
                <div className="text-gray-500">4 templates</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">SMS Templates</div>
                <div className="text-gray-500">1 template</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Triggers</h4>
            <div className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">✓ Response received</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">✓ Email opened</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">✓ Link clicked</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Channel Performance</h3>
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>All time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performance.map(channel => (
          <div key={channel.channel} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{getChannelIcon(channel.channel)}</span>
                <h4 className="font-medium text-gray-900 capitalize">{channel.channel}</h4>
              </div>
              <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                {channel.conversionRate}%
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sent</span>
                <span className="text-sm font-medium">{channel.sent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Opened</span>
                <span className="text-sm font-medium">{channel.opened.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Clicked</span>
                <span className="text-sm font-medium">{channel.clicked.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Replied</span>
                <span className="text-sm font-medium">{channel.replied.toLocaleString()}</span>
              </div>
            </div>

            {/* Mini funnel */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-400 h-1.5 rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-green-400 h-1.5 rounded-full"
                  style={{ width: `${(channel.opened / channel.sent) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-medium text-gray-900 mb-4">Conversion Funnel</h4>
        <div className="h-64 flex items-end space-x-4">
          {performance.map(channel => (
            <div key={channel.channel} className="flex-1">
              <div className="text-center mb-2">
                <div className="text-lg font-semibold">{channel.conversionRate}%</div>
                <div className="text-xs text-gray-600 capitalize">{channel.channel}</div>
              </div>
              <div 
                className="bg-blue-500 rounded-t"
                style={{ height: `${channel.conversionRate * 4}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderParticipants = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sequence Participants</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Sequences</option>
            <option>Full-Funnel Outreach</option>
            <option>Cold to Close</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Participants
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channels</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {participants.map(participant => (
              <tr key={participant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {participant.firstName[0]}{participant.lastName[0]}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {participant.firstName} {participant.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{participant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{participant.company}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Step {participant.currentStep}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-1">
                    {Object.entries(participant.channelPreferences).map(([channel, enabled]) => (
                      <span
                        key={channel}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                        }`}
                        title={channel}
                      >
                        {getChannelIcon(channel)}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {participant.nextAction && (
                    <div>
                      <div>{participant.nextAction.action}</div>
                      <div className="text-gray-500">
                        {new Date(participant.nextAction.scheduledFor).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    In Progress
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return '📧'
      case 'linkedin': return '💼'
      case 'sms': return '💬'
      case 'call': return '📞'
      default: return '📊'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Channel Sequencer</h3>
            <p className="text-gray-600">Build and manage unified messaging campaigns across all channels</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setViewMode('builder')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            viewMode === 'builder' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sequence Builder
        </button>
        <button
          onClick={() => setViewMode('performance')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            viewMode === 'performance' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => setViewMode('participants')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            viewMode === 'participants' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Participants
        </button>
      </div>

      {/* Content */}
      {viewMode === 'builder' && renderSequenceBuilder()}
      {viewMode === 'performance' && renderPerformance()}
      {viewMode === 'participants' && renderParticipants()}
    </div>
  )
}
