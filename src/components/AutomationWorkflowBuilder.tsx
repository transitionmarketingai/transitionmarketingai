'use client';

import React, { useState, useRef, DragEvent } from 'react';

interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay' | 'join';
  title: string;
  description: string;
  icon: string;
  color: string;
  position: { x: number; y: number };
  config: {
    trigger?: TriggerConfig;
    condition?: ConditionConfig;
    action?: ActionConfig;
    delay?: DelayConfig;
  };
}

interface TriggerConfig {
  type: 'newLead' | 'emailOpened' | 'emailClicked' | 'formSubmitted' | 'scoreIncrease' | 'manual';
  filters?: Array<{ field: string; operator: string; value: string }>;
}

interface ConditionConfig {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'empty';
  value: string;
  logicalOperator?: 'AND' | 'OR';
}

interface ActionConfig {
  type: 'send_email' | 'send_sms' | 'call_assigned' | 'create_task' | 'update_field' | 'add_to_list' | 'send_linkedin_message';
  template?: string;
  assignTo?: string;
  field?: string;
  value?: string;
  delayMinutes?: number;
  businessHours?: boolean;
}

interface DelayConfig {
  duration: number;
  unit: 'minutes' | 'hours' | 'days';
  businessHours: boolean;
}

interface WorkflowConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label?: string;
}

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  triggerDate?: Date;
  nodes: AutomationNode[];
  connections: WorkflowConnection[];
  targetingRules: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
  performance: {
    totalExecutions: number;
    successRate: number;
    avgExecutionTime: number;
    lastExecuted?: Date;
  };
}

const PREDEFINED_TRIGGERS: AutomationNode[] = [
  {
    id: 'trigger_new_lead',
    type: 'trigger',
    title: 'New Lead Added',
    description: 'Triggers when a new prospect is added to the system',
    icon: '🆕',
    color: 'blue',
    position: { x: 50, y: 50 },
    config: {
      trigger: {
        type: 'newLead',
        filters: []
      }
    }
  },
  {
    id: 'trigger_email_opened',
    type: 'trigger',
    title: 'Email Opened',
    description: 'Triggers when a prospect opens an email',
    icon: '📧',
    color: 'green',
    position: { x: 50, y: 100 },
    config: {
      trigger: {
        type: 'emailOpened',
        filters: []
      }
    }
  },
  {
    id: 'trigger_form_submitted',
    type: 'trigger',
    title: 'Form Submitted',
    description: 'Triggers when a prospect submits a form',
    icon: '📝',
    color: 'purple',
    position: { x: 50, y: 150 },
    config: {
      trigger: {
        type: 'formSubmitted',
        filters: []
      }
    }
  }
];

const CONDITION_TEMPLATES: AutomationNode[] = [
  {
    id: 'condition_score_check',
    type: 'condition',
    title: 'Lead Score Check',
    description: 'Check if lead meets minimum qualification score',
    icon: '📊',
    color: 'yellow',
    position: { x: 200, y: 50 },
    config: {
      condition: {
        field: 'leadScore',
        operator: 'greater_than',
        value: '70'
      }
    }
  },
  {
    id: 'condition_industry_match',
    type: 'condition',
    title: 'Industry Match',
    description: 'Check if prospect industry matches target',
    icon: '🏭',
    color: 'orange',
    position: { x: 200, y: 100 },
    config: {
      condition: {
        field: 'industry',
        operator: 'equals',
        value: 'Technology & IT'
      }
    }
  },
  {
    id: 'condition_company_size',
    type: 'condition',
    title: 'Company Size',
    description: 'Check company employee count',
    icon: '🏢',
    color: 'indigo',
    position: { x: 200, y: 150 },
    config: {
      condition: {
        field: 'companySize',
        operator: 'greater_than',
        value: '10'
      }
    }
  }
];

const ACTION_TEMPLATES: AutomationNode[] = [
  {
    id: 'action_send_welcome_email',
    type: 'action',
    title: 'Send Welcome Email',
    description: 'Send personalized welcome email to new leads',
    icon: '👋',
    color: 'green',
    position: { x: 350, y: 50 },
    config: {
      action: {
        type: 'send_email',
        template: 'welcome_sequence_1',
        delayMinutes: 5
      }
    }
  },
  {
    id: 'action_send_follow_up',
    type: 'action',
    title: 'Send Follow-up Email',
    description: 'Send follow-up email based on engagement',
    icon: '📬',
    color: 'blue',
    position: { x: 350, y: 100 },
    config: {
      action: {
        type: 'send_email',
        template: 'follow_up_sequence',
        delayMinutes: 1440 // 24 hours
      }
    }
  },
  {
    id: 'action_assigned_caller',
    type: 'action',
    title: 'Assign to Sales Rep',
    description: 'Assign hot leads to sales representative',
    icon: '👨‍💼',
    color: 'red',
    position: { x: 350, y: 150 },
    config: {
      action: {
        type: 'call_assigned',
        assignTo: 'sales_team',
        businessHours: true
      }
    }
  },
  {
    id: 'action_linkedin_message',
    type: 'action',
    title: 'Send LinkedIn Message',
    description: 'Send personalized LinkedIn connection message',
    icon: '💼',
    color: 'linkedin',
    position: { x: 350, y: 200 },
    config: {
      action: {
        type: 'send_linkedin_message',
        template: 'linkedin_connection_request',
        delayMinutes: 60
      }
    }
  }
];

const DELAY_TEMPLATES: AutomationNode[] = [
  {
    id: 'delay_1_hour',
    type: 'delay',
    title: 'Wait 1 Hour',
    description: 'Wait 1 hour before next action',
    icon: '⏰',
    color: 'gray',
    position: { x: 500, y: 50 },
    config: {
      delay: {
        duration: 1,
        unit: 'hours',
        businessHours: false
      }
    }
  },
  {
    id: 'delay_24_hours',
    type: 'delay',
    title: 'Wait 1 Day',
    description: 'Wait 24 hours before next action',
    icon: '📅',
    color: 'gray',
    position: { x: 500, y: 100 },
    config: {
      delay: {
        duration: 24,
        unit: 'hours',
        businessHours: true
      }
    }
  },
  {
    id: 'delay_1_week',
    type: 'delay',
    title: 'Wait 1 Week',
    description: 'Wait 7 days before next action',
    icon: '🗓️',
    color: 'gray',
    position: { x: 500, y: 150 },
    config: {
      delay: {
        duration: 7,
        unit: 'days',
        businessHours: true
      }
    }
  }
];

export default function AutomationWorkflowBuilder({ 
  onComplete, 
  initialWorkflow, 
  isOpen, 
  onClose 
}: {
  onComplete?: (workflow: AutomationWorkflow) => void;
  initialWorkflow?: Partial<AutomationWorkflow>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [workflow, setWorkflow] = useState<AutomationWorkflow>({
    id: initialWorkflow?.id || `workflow_${Date.now()}`,
    name: initialWorkflow?.name || '',
    description: initialWorkflow?.description || '',
    status: initialWorkflow?.status || 'draft',
    nodes: initialWorkflow?.nodes || [],
    connections: initialWorkflow?.connections || [],
    targetingRules: initialWorkflow?.targetingRules || [],
    performance: {
      totalExecutions: 0,
      successRate: 0,
      avgExecutionTime: 0
    }
  });

  const [draggedNodes, setDraggedNodes] = useState<AutomationNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<AutomationNode | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showNodeLibrary, setShowNodeLibrary] = useState(false);

  if (!isOpen) return null;

  const handleDragStart = (e: DragEvent, node: AutomationNode) => {
    e.dataTransfer.setData('application/json', JSON.stringify(node));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const nodeData = JSON.parse(e.dataTransfer.getData('application/json'));
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newNode: AutomationNode = {
      ...nodeData,
      id: `${nodeData.type}_${Date.now()}`,
      position: {
        x: e.clientX - rect.left - 100,
        y: e.clientY - rect.top - 50
      }
    };

    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  };

  const connectNodes = (fromNodeId: string, toNodeId: string) => {
    const newConnection: WorkflowConnection = {
      id: `connection_${Date.now()}`,
      fromNodeId,
      toNodeId
    };

    setWorkflow(prev => ({
      ...prev,
      connections: [...prev.connections, newConnection]
    }));
  };

  const updateNodeConfig = (nodeId: string, config: any) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === nodeId 
          ? { ...node, config: { ...node.config, ...config } }
          : node
      )
    }));
  };

  const deleteNode = (nodeId: string) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.filter(node => node.id !== nodeId),
      connections: prev.connections.filter(conn => 
        conn.fromNodeId !== nodeId && conn.toNodeId !== nodeId
      )
    }));
  };

  const simulateWorkflow = async () => {
    setIsSimulating(true);
    
    try {
      // TODO: Implement actual workflow simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate execution results
      setWorkflow(prev => ({
        ...prev,
        status: 'active',
        performance: {
          totalExecutions: prev.performance.totalExecutions + 1,
          successRate: Math.min(95, prev.performance.successRate + Math.random() * 5),
          avgExecutionTime: prev.performance.avgExecutionTime + Math.random() * 100,
          lastExecuted: new Date()
        }
      }));
      
    } catch (error) {
      console.error('Workflow simulation failed:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  const saveWorkflow = async () => {
    // TODO: Implement workflow saving to API
    try {
      const response = await fetch('/api/automation/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflow)
      });

      if (response.ok) {
        onComplete?.(workflow);
        onClose();
      }
    } catch (error) {
      console.error('Failed to save workflow:', error);
    }
  };

  const getAllTemplates = () => [
    ...PREDEFINED_TRIGGERS,
    ...CONDITION_TEMPLATES,
    ...ACTION_TEMPLATES,
    ...DELAY_TEMPLATES
  ];

  const getNodeColor = (node: AutomationNode): string => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 border-blue-300 text-blue-800',
      green: 'bg-green-100 border-green-300 text-green-800',
      purple: 'bg-purple-100 border-purple-300 text-purple-800',
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      orange: 'bg-orange-100 border-orange-300 text-orange-800',
      indigo: 'bg-indigo-100 border-indigo-300 text-indigo-800',
      gray: 'bg-gray-100 border-gray-300 text-gray-800',
      linkedin: 'bg-blue-600 border-blue-700 text-white'
    };
    return colorMap[node.color] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full h-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Automation Workflow Builder</h2>
            <p className="text-gray-600">Create intelligent nurturing sequences for your leads</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNodeLibrary(!showNodeLibrary)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              {showNodeLibrary ? 'Hide' : 'Show'} Templates
            </button>
            <button
              onClick={simulateWorkflow}
              disabled={isSimulating || workflow.nodes.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSimulating ? 'Simulating...' : '🧪 Test Workflow'}
            </button>
            <button
              onClick={() => onClose()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Templates */}
          {showNodeLibrary && (
            <div className="w-80 border-r border-gray-200 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Templates</h3>
                
                {/* Workflow Properties */}
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Workflow Name"
                    value={workflow.name}
                    onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Workflow Description"
                    value={workflow.description}
                    onChange={(e) => setWorkflow(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {/* Trigger Templates */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Triggers</h4>
                  <div className="space-y-2">
                    {PREDEFINED_TRIGGERS.map(node => (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, node)}
                        className={`p-3 border rounded-lg cursor-move hover:shadow-md transition-shadow ${getNodeColor(node)}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{node.icon}</span>
                          <div>
                            <div className="font-medium">{node.title}</div>
                            <div className="text-xs text-opacity-80 mt-1">{node.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condition Templates */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Conditions</h4>
                  <div className="space-y-2">
                    {CONDITION_TEMPLATES.map(node => (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, node)}
                        className={`p-3 border rounded-lg cursor-move hover:shadow-md transition-shadow ${getNodeColor(node)}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{node.icon}</span>
                          <div>
                            <div className="font-medium">{node.title}</div>
                            <div className="text-xs text-opacity-80 mt-1">{node.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Templates */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                  <div className="space-y-2">
                    {ACTION_TEMPLATES.map(node => (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, node)}
                        className={`p-3 border rounded-lg cursor-move hover:shadow-md transition-shadow ${getNodeColor(node)}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{node.icon}</span>
                          <div>
                            <div className="font-medium">{node.title}</div>
                            <div className="text-xs text-opacity-80 mt-1">{node.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delay Templates */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Delays</h4>
                  <div className="space-y-2">
                    {DELAY_TEMPLATES.map(node => (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, node)}
                        className={`p-3 border rounded-lg cursor-move hover:shadow-md transition-shadow ${getNodeColor(node)}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{node.icon}</span>
                          <div>
                            <div className="font-medium">{node.title}</div>
                            <div className="text-xs text-opacity-80 mt-1">{node.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Canvas */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Toolbar */}
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-600">
                    Nodes: {workflow.nodes.length} • Connections: {workflow.connections.length}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                    workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {workflow.status}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Performance:</span>
                  <span className="text-xs text-green-600">{workflow.performance.successRate.toFixed(1)}%</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-blue-600">{workflow.performance.totalExecutions} runs</span>
                </div>
              </div>
            </div>

            {/* Workflow Canvas */}
            <div
              ref={canvasRef}
              className="flex-1 bg-gray-50 overflow-auto relative"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{ minHeight: '600px' }}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#CBD5E0" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Workflow Nodes */}
              {workflow.nodes.map(node => (
                <div
                  key={node.id}
                  className={`absolute border-2 border-dashed rounded-lg cursor-pointer transition-all hover:shadow-lg ${getNodeColor(node)} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    width: '180px',
                    minHeight: '80px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(node);
                  }}
                >
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{node.icon}</span>
                      <div className="text-sm font-medium">{node.title}</div>
                    </div>
                    <div className="text-xs text-opacity-80 mb-2">{node.description}</div>
                    
                    {/* Connection Points */}
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white cursor-pointer hover:bg-blue-700"
                         onClick={(e) => {
                           e.stopPropagation();
                           const targetNode = workflow.nodes.find(n => n.id !== node.id);
                           if (targetNode) connectNodes(node.id, targetNode.id);
                         }}
                    ></div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                      if (selectedNode?.id === node.id) setSelectedNode(null);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Workflow Connections */}
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                {workflow.connections.map(connection => {
                  const fromNode = workflow.nodes.find(n => n.id === connection.fromNodeId);
                  const toNode = workflow.nodes.find(n => n.id === connection.toNodeId);
                  
                  if (!fromNode || !toNode) return null;
                  
                  return (
                    <line
                      key={connection.id}
                      x1={fromNode.position.x + 180} // Right side of source node
                      y1={fromNode.position.y + 40}
                      x2={toNode.position.x} // Left side of target node
                      y2={toNode.position.y + 40}
                      stroke="#4299E1"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })}
                
                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#4299E1"
                    />
                  </marker>
                </defs>
              </svg>

              {/* Empty State */}
              {workflow.nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Your First Automation</h3>
                    <p className="text-gray-600 mb-6">Drag triggers, conditions, and actions from the sidebar to create intelligent workflows</p>
                    <button
                      onClick={() => setShowNodeLibrary(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Open Templates Library
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setWorkflow(prev => ({ ...prev, status: prev.status === 'active' ? 'paused' : 'active' }))}
                disabled={workflow.nodes.length === 0}
                className={`px-4 py-2 rounded-lg font-medium ${
                  workflow.status === 'active' 
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                } disabled:opacity-50`}
              >
                {workflow.status === 'active' ? '⏸️ Pause' : '▶️ Activate'}
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onClose()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveWorkflow}
                disabled={workflow.nodes.length === 0 || !workflow.name.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                💾 Save Workflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
