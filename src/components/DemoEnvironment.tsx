'use client';

import React, { useState, useEffect } from 'react';

interface DemoSession {
  id: string;
  prospectName: string;
  prospectCompany: string;
  prospectRole: string;
  industry: string;
  campaignName: string;
  nextAction: string;
  status: 'new' | 'scored' | 'contacted' | 'responded' | 'converted';
  score: number;
  timeline: Array<{
    timestamp: Date;
    action: string;
    channel: string;
    details: string;
  }>;
}

interface DemoScenario {
  id: string;
  name: string;
  description: string;
  industry: string;
  prospects: DemoSession[];
  campaignSteps: Array<{
    step: number;
    action: string;
    channel: string;
    template: string;
    delay: string;
  }>;
}

export default function DemoEnvironment({ 
  isOpen, 
  onClose, 
  scenarioType = 'tech-startup' 
}: {
  isOpen: boolean;
  onClose: () => void;
  scenarioType?: string;
}) {
  const [currentScenario, setCurrentScenario] = useState<DemoScenario | null>(null);
  const [simulationStatus, setSimulationStatus] = useState<'stopped' | 'running' | 'paused'>('stopped');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [demoTime, setDemoTime] = useState(new Date());

  const DEMO_SCENARIOS: { [key: string]: DemoScenario } = {
    'tech-startup': {
      id: 'tech-startup',
      name: 'Bangalore Tech Startup Lead Generation',
      description: 'Real-world example: AI-powered lead generation for SaaS startups',
      industry: 'Technology & IT',
      prospects: [
        {
          id: 'prospect-1',
          prospectName: 'Rajesh Kumar',
          prospectCompany: 'TechCorp Solutions',
          prospectRole: 'CTO',
          industry: 'Technology',
          campaignName: 'SaaS Tools Outreach',
          nextAction: 'Send personalized LinkedIn connection',
          status: 'new',
          score: 0,
          timeline: []
        },
        {
          id: 'prospect-2',
          prospectName: 'Priya Sharma',
          prospectCompany: 'Digital Innovations',
          prospectRole: 'Founder',
          industry: 'Technology',
          campaignName: 'SaaS Tools Outreach',
          nextAction: 'Welcome email sequence',
          status: 'scored',
          score: 87,
          timeline: [
            {
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              action: 'AI Lead Scoring Completed',
              channel: 'AI Engine',
              details: 'Score: 87/100 - High conversion potential'
            }
          ]
        },
        {
          id: 'prospect-3',
          prospectName: 'Amit Patel',
          prospectCompany: 'CloudFirst Apps',
          prospectRole: 'VP Engineering',
          industry: 'Technology',
          campaignName: 'SaaS Tools Outreach',
          nextAction: 'Schedule discovery call',
          status: 'contacted',
          score: 92,
          timeline: [
            {
              timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
              action: 'AI Lead Scoring Completed',
              channel: 'AI Engine',
              details: 'Score: 92/100 - Exceptional match'
            },
            {
              timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
              action: 'Welcome Email Sent',
              channel: 'Email',
              details: 'Personalized email: SaaS optimization for CloudFirst Apps'
            }
          ]
        },
        {
          id: 'prospect-4',
          prospectName: 'Sunita Reddy',
          prospectCompany: 'DataDriven Solutions',
          prospectRole: 'Marketing Director',
          industry: 'Technology',
          campaignName: 'SaaS Tools Outreach',
          nextAction: 'Close deal',
          status: 'converted',
          score: 89,
          timeline: [
            {
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
              action: 'AI Lead Scoring Completed',
              channel: 'AI Engine',
              details: 'Score: 89/100 - High conversion potential'
            },
            {
              timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
              action: 'Welcome Email Sent',
              channel: 'Email',
              details: 'Personalized email with SaaS optimization insights'
            },
            {
              timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
              action: 'Email Opened',
              channel: 'Email Analytics',
              details: 'Opened within 3 hours - high engagement'
            },
            {
              timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
              action: 'Follow-up Email Sent',
              channel: 'Email',
              details: 'SaaS automation case study for data companies'
            },
            {
              timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
              action: 'Demo Call Scheduled',
              channel: 'Calendar',
              details: 'Meeting confirmed for tomorrow 11 AM'
            },
            {
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
              action: 'Proposal Sent',
              channel: 'Email',
              details: 'ROI proposal with automation potential'
            }
          ]
        }
      ],
      campaignSteps: [
        {
          step: 1,
          action: 'AI Lead Scoring',
          channel: 'AI Engine',
          template: 'Professional Authority + Industry Intent + Response Likelihood',
          delay: 'Immediate'
        },
        {
          step: 2,
          action: 'Personalized Welcome Email',
          channel: 'Email',
          template: 'Hindi-English hybrid with company-specific insights',
          delay: '5 minutes'
        },
        {
          step: 3,
          action: 'LinkedIn Connection Request',
          channel: 'LinkedIn',
          template: 'Professional networking message',
          delay: '1 hour'
        },
        {
          step: 4,
          action: 'Follow-up Email',
          channel: 'Email',
          template: 'SaaS optimization case study',
          delay: '24 hours'
        },
        {
          step: 5,
          action: 'WhatsApp Business Message',
          channel: 'WhatsApp',
          template: 'Quick demo video link',
          delay: '1 day'
        },
        {
          step: 6,
          action: 'Discovery Call Scheduling',
          channel: 'Calendar',
          template: 'Automated calendar booking',
          delay: 'Triggered by engagement'
        }
      ]
    },
    'real-estate': {
      id: 'real-estate',
      name: 'Mumbai Real Estate Lead Generation',
      description: 'Focused campaign for luxury property developers',
      industry: 'Real Estate',
      prospects: [
        {
          id: 'prospect-re-1',
          prospectName: 'Vikram Mehta',
          prospectCompany: 'Mumbai Heights Developers',
          prospectRole: 'Director',
          industry: 'Real Estate',
          campaignName: 'Luxury Real Estate Platform',
          nextAction: 'AI scoring in progress',
          status: 'new',
          score: 0,
          timeline: []
        },
        {
          id: 'prospect-re-2',
          prospectName: 'Shreya Agarwal',
          prospectCompany: 'Golden Properties',
          prospectRole: 'Business Development Head',
          industry: 'Real Estate',
          campaignName: 'Luxury Real Estate Platform',
          nextAction: 'Follow-up email sequence',
          status: 'contacted',
          score: 81,
          timeline: [
            {
              timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
              action: 'AI Lead Scoring Completed',
              channel: 'AI Engine',
              details: 'Score: 81/100 - Real estate market match'
            },
            {
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              action: 'Personalized Email Sent',
              channel: 'Email',
              details: 'Mumbai luxury market insights for Golden Properties'
            },
            {
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
              action: 'WhatsApp Message Sent',
              channel: 'WhatsApp',
              details: 'Virtual property tour link shared'
            }
          ]
        }
      ],
      campaignSteps: [
        {
          step: 1,
          action: 'Real Estate Market Analysis',
          channel: 'AI Engine',
          template: 'Property value trends + location insights',
          delay: 'Immediate'
        },
        {
          step: 2,
          action: 'Property Portfolio Email',
          channel: 'Email',
          template: 'Luxury market analysis + case studies',
          delay: '20 minutes'
        },
        {
          step: 3,
          action: 'Virtual Tour Invitation',
          channel: 'WhatsApp',
          template: 'Personalized tour scheduling',
          delay: '2 hours'
        }
      ]
    }
  };

  useEffect(() => {
    setCurrentScenario(DEMO_SCENARIOS[scenarioType]);
  }, [scenarioType]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (simulationStatus === 'running') {
      timer = setInterval(() => {
        setDemoTime(prev => new Date(prev.getTime() + 30000)); // Fast-forward 30 seconds every real second
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [simulationStatus]);

  const startSimulation = () => {
    setSimulationStatus('running');
    setCurrentStepIndex(0);
  };

  const pauseSimulation = () => {
    setSimulationStatus('paused');
  };

  const stopSimulation = () => {
    setSimulationStatus('stopped');
    setCurrentStepIndex(0);
    setDemoTime(new Date());
  };

  const simulateNextAction = () => {
    if (currentScenario) {
      const nextProspect = currentScenario.prospects.find(p => p.status === 'new' || p.status === 'scored');
      if (nextProspect && currentScenario.campaignSteps[currentStepIndex]) {
        const step = currentScenario.campaignSteps[currentStepIndex];
        
        // Simulate prospect update
        const updatedProspect = {
          ...nextProspect,
          timeline: [
            ...nextProspect.timeline,
            {
              timestamp: demoTime,
              action: step.action,
              channel: step.channel,
              details: step.template
            }
          ]
        };

        if (step.action.includes('AI') && nextProspect.status === 'new') {
          updatedProspect.status = 'scored';
          updatedProspect.score = Math.floor(Math.random() * 20) + 80; // 80-100 range
        } else if (nextProspect.status === 'scored') {
          updatedProspect.status = 'contacted';
        } else if (nextProspect.status === 'contacted' && Math.random() > 0.5) {
          updatedProspect.status = 'responded';
        }

        // Update scenario
        setCurrentScenario(prev => ({
          ...prev!,
          prospects: prev!.prospects.map(p => 
            p.id === nextProspect.id ? updatedProspect : p
          )
        }));

        setCurrentStepIndex(prev => Math.min(prev + 1, currentScenario.campaignSteps.length - 1));
      }
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'new': return 'bg-gray-100 text-gray-800';
      case 'scored': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'new': return '🆕';
      case 'scored': return '📊';
      case 'contacted': return '📧';
      case 'responded': return '💬';
      case 'converted': return '✅';
      default: return '⭕';
    }
  };

  if (!isOpen || !currentScenario) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">🚀 Live Demo Environment</h2>
              <p className="text-purple-100 mt-1">{currentScenario.name}</p>
              <div className="flex items-center space-x-4 mt-2 text-purple-100 text-sm">
                <span>Industry: {currentScenario.industry}</span>
                <span>•</span>
                <span>Prospects: {currentScenario.prospects.length}</span>
                <span>•</span>
                <span>Campaign Steps: {currentScenario.campaignSteps.length}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right text-purple-100">
                <div className="text-sm">Demo Time</div>
                <div className="font-bold">{demoTime.toLocaleTimeString()}</div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                simulationStatus === 'running' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className="text-purple-100 text-sm font-medium">
                {simulationStatus === 'running' ? 'LIVE SIMULATION' : 'DEMO MADE'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {simulationStatus === 'stopped' && (
                <button
                  onClick={startSimulation}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  ▶️ Start Demo
                </button>
              )}
              {simulationStatus === 'running' && (
                <>
                  <button
                    onClick={pauseSimulation}
                    className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700"
                  >
                    ⏸️ Pause
                  </button>
                  <button
                    onClick={stopSimulation}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    ⏹️ Stop
                  </button>
                </>
              )}
              {simulationStatus === 'paused' && (
                <>
                  <button
                    onClick={startSimulation}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                  >
                    ▶️ Resume
                  </button>
                  <button
                    onClick={stopSimulation}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    ⏹️ Stop
                  </button>
                </>
              )}
            </div>

            <button
              onClick={simulateNextAction}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              disabled={simulationStatus === 'stopped'}
            >
              ⚡ Next Action
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Prospects List */}
          <div className="w-2/3 border-r border-gray-200 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Prospect Tracking</h3>
            
            <div className="space-y-4">
              {currentScenario.prospects.map(prospect => (
                <div key={prospect.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {prospect.prospectName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{prospect.prospectName}</div>
                        <div className="text-sm text-gray-600">{prospect.prospectRole} at {prospect.prospectCompany}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {prospect.score > 0 && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prospect.status)}`}>
                          {prospect.score}/100
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <span className="text-xl">{getStatusIcon(prospect.status)}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(prospect.status)}`}>
                          {prospect.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">{prospect.nextAction}</div>

                  {/* Timeline */}
                  {prospect.timeline.length > 0 && (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="text-xs text-gray-500 mb-2">Recent Activity:</div>
                      <div className="space-y-2">
                        {prospect.timeline.slice(-3).map((activity, index) => (
                          <div key={index} className="flex items-start space-x-2 text-xs">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                            <div>
                              <span className="font-medium">{activity.action}</span>
                              <span className="text-gray-500 ml-2">via {activity.channel}</span>
                              <div className="text-gray-600 mt-1">{activity.details}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Steps & Analytics */}
          <div className="w-1/3 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Flow</h3>

            {/* Campaign Steps */}
            <div className="space-y-3 mb-6">
              {currentScenario.campaignSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg ${
                    index <= currentStepIndex ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">{step.action}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{step.channel}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{step.template}</div>
                  <div className="text-xs text-gray-500">Delay: {step.delay}</div>
                </div>
              ))}
            </div>

            {/* Campaign Analytics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Campaign Analytics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Prospects:</span>
                  <span className="font-medium">{currentScenario.prospects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Scored:</span>
                  <span className="font-medium text-blue-600">
                    {currentScenario.prospects.filter(p => p.status !== 'new').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Contacted:</span>
                  <span className="font-medium text-yellow-600">
                    {currentScenario.prospects.filter(p => ['contacted', 'responded', 'converted'].includes(p.status)).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Converted:</span>
                  <span className="font-medium text-green-600">
                    {currentScenario.prospects.filter(p => p.status === 'converted').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Score:</span>
                  <span className="font-medium text-purple-600">
                    {currentScenario.prospects.filter(p => p.score > 0).reduce((sum, p) => sum + p.score, 0) / 
                     currentScenario.prospects.filter(p => p.score > 0).length || 0}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Industry-Specific Insights */}
            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-900 mb-2">AI Insights</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <div>• Industry match: {currentScenario.industry}</div>
                <div>• Regional targeting: Mumbai</div>
                <div>• Channel optimization: Multi-platform</div>
                <div>• Timing: Business hours local</div>
                <div>• Language: Hindi + English mix</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              This demo shows real-time AI-powered lead generation in action
            </div>
            <button
              onClick={() => {/* Export demo data */}}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm"
            >
              📊 Export Demo Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
