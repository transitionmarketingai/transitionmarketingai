'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Workflow, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  Play,
  Pause,
  Settings,
  Activity,
  Zap,
  Globe,
  Database,
  Server,
  Cloud,
  Wifi,
  Signal,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Download,
  Upload,
  Key,
  Shield,
  Lock,
  Unlock,
  FileText,
  Mail,
  Search as SearchIcon,
  ArrowRight,
  ArrowLeft,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Star,
  Heart,
  MessageSquare,
  Bell,
  UserPlus,
  UserMinus,
  Tag,
  Hash,
  Link,
  ExternalLink,
  Copy,
  Share2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  name: string;
  description: string;
  icon: any;
  config: any;
  status: 'active' | 'inactive' | 'error';
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft' | 'error';
  trigger: string;
  steps: WorkflowStep[];
  lastRun: string;
  nextRun: string;
  totalRuns: number;
  successRate: number;
  category: 'lead_nurturing' | 'onboarding' | 'retention' | 'sales' | 'marketing' | 'support';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface AutomationWorkflowsProps {
  onWorkflowCreated?: (workflow: Workflow) => void;
}

export default function AutomationWorkflows({ onWorkflowCreated }: AutomationWorkflowsProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  // Mock data
  useEffect(() => {
    const mockWorkflows: Workflow[] = [
      {
        id: '1',
        name: 'Welcome Series',
        description: 'Automated welcome email sequence for new subscribers',
        status: 'active',
        trigger: 'New subscriber signup',
        steps: [
          {
            id: '1-1',
            type: 'trigger',
            name: 'New Subscriber',
            description: 'Triggered when someone subscribes to newsletter',
            icon: UserPlus,
            config: { source: 'newsletter_signup' },
            status: 'active'
          },
          {
            id: '1-2',
            type: 'delay',
            name: 'Wait 1 Day',
            description: 'Wait 24 hours before sending first email',
            icon: Clock,
            config: { duration: '24h' },
            status: 'active'
          },
          {
            id: '1-3',
            type: 'action',
            name: 'Send Welcome Email',
            description: 'Send personalized welcome email',
            icon: Mail,
            config: { template: 'welcome_v1' },
            status: 'active'
          }
        ],
        lastRun: '2 hours ago',
        nextRun: 'In 22 hours',
        totalRuns: 1247,
        successRate: 98.5,
        category: 'onboarding',
        tags: ['email', 'welcome', 'automation'],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        name: 'Lead Nurturing',
        description: 'Nurture leads through the sales funnel with targeted content',
        status: 'active',
        trigger: 'Lead score reaches 50',
        steps: [
          {
            id: '2-1',
            type: 'trigger',
            name: 'Lead Score 50+',
            description: 'Triggered when lead score reaches 50',
            icon: TrendingUp,
            config: { score: 50 },
            status: 'active'
          },
          {
            id: '2-2',
            type: 'action',
            name: 'Send Case Study',
            description: 'Send relevant case study email',
            icon: FileText,
            config: { template: 'case_study_v2' },
            status: 'active'
          },
          {
            id: '2-3',
            type: 'delay',
            name: 'Wait 3 Days',
            description: 'Wait 3 days before next action',
            icon: Clock,
            config: { duration: '72h' },
            status: 'active'
          },
          {
            id: '2-4',
            type: 'action',
            name: 'Schedule Demo Call',
            description: 'Automatically schedule demo call',
            icon: Calendar,
            config: { type: 'demo_call' },
            status: 'active'
          }
        ],
        lastRun: '1 hour ago',
        nextRun: 'In 2 hours',
        totalRuns: 892,
        successRate: 94.2,
        category: 'lead_nurturing',
        tags: ['lead', 'nurturing', 'sales'],
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18'
      },
      {
        id: '3',
        name: 'Abandoned Cart Recovery',
        description: 'Recover abandoned shopping carts with targeted emails',
        status: 'paused',
        trigger: 'Cart abandoned for 1 hour',
        steps: [
          {
            id: '3-1',
            type: 'trigger',
            name: 'Cart Abandoned',
            description: 'Triggered when cart is abandoned for 1 hour',
            icon: AlertCircle,
            config: { duration: '1h' },
            status: 'active'
          },
          {
            id: '3-2',
            type: 'action',
            name: 'Send Reminder Email',
            description: 'Send cart reminder email with discount',
            icon: Mail,
            config: { template: 'cart_reminder', discount: '10%' },
            status: 'active'
          }
        ],
        lastRun: '3 days ago',
        nextRun: 'Paused',
        totalRuns: 2341,
        successRate: 89.7,
        category: 'retention',
        tags: ['ecommerce', 'cart', 'recovery'],
        createdAt: '2024-01-05',
        updatedAt: '2024-01-19'
      },
      {
        id: '4',
        name: 'Content Distribution',
        description: 'Automatically distribute new content across all channels',
        status: 'active',
        trigger: 'New blog post published',
        steps: [
          {
            id: '4-1',
            type: 'trigger',
            name: 'New Blog Post',
            description: 'Triggered when new blog post is published',
            icon: FileText,
            config: { source: 'blog_cms' },
            status: 'active'
          },
          {
            id: '4-2',
            type: 'action',
            name: 'Create Social Posts',
            description: 'Generate social media posts from blog content',
            icon: Share2,
            config: { platforms: ['twitter', 'linkedin', 'facebook'] },
            status: 'active'
          },
          {
            id: '4-3',
            type: 'action',
            name: 'Send Newsletter',
            description: 'Include in weekly newsletter',
            icon: Mail,
            config: { template: 'weekly_newsletter' },
            status: 'active'
          }
        ],
        lastRun: '30 minutes ago',
        nextRun: 'In 6 hours',
        totalRuns: 156,
        successRate: 96.8,
        category: 'marketing',
        tags: ['content', 'social', 'newsletter'],
        createdAt: '2024-01-12',
        updatedAt: '2024-01-21'
      }
    ];

    setWorkflows(mockWorkflows);
  }, []);

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || workflow.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || workflow.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lead_nurturing': return 'bg-blue-100 text-blue-800';
      case 'onboarding': return 'bg-green-100 text-green-800';
      case 'retention': return 'bg-purple-100 text-purple-800';
      case 'sales': return 'bg-orange-100 text-orange-800';
      case 'marketing': return 'bg-pink-100 text-pink-800';
      case 'support': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'trigger': return <Zap className="h-4 w-4" />;
      case 'action': return <ArrowRight className="h-4 w-4" />;
      case 'condition': return <Circle className="h-4 w-4" />;
      case 'delay': return <Clock className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const handleCreateWorkflow = () => {
    // Simulate creating a new workflow
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: 'New Workflow',
      description: 'A new automation workflow',
      status: 'draft',
      trigger: 'Manual trigger',
      steps: [],
      lastRun: 'Never',
      nextRun: 'Not scheduled',
      totalRuns: 0,
      successRate: 0,
      category: 'marketing',
      tags: ['new'],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setWorkflows(prev => [newWorkflow, ...prev]);
    onWorkflowCreated?.(newWorkflow);
  };

  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ));
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== workflowId));
  };

  return (
    <div className="space-y-6">
      {/* Workflow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.filter(w => w.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((workflows.filter(w => w.status === 'active').length / workflows.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.reduce((acc, w) => acc + w.totalRuns, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Automation Workflows</CardTitle>
              <CardDescription>Create and manage your marketing automation workflows</CardDescription>
            </div>
            <Button onClick={handleCreateWorkflow}>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lead_nurturing">Lead Nurturing</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
                <SelectItem value="retention">Retention</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Workflows List */}
          <div className="space-y-4">
            {filteredWorkflows.map((workflow) => (
              <div key={workflow.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Workflow className="h-4 w-4" />
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <Badge className={getStatusColor(workflow.status)}>
                        {getStatusIcon(workflow.status)}
                        <span className="ml-1">{workflow.status}</span>
                      </Badge>
                      <Badge className={getCategoryColor(workflow.category)}>
                        {workflow.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {workflow.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Trigger</div>
                        <div className="font-medium text-sm">{workflow.trigger}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Last Run</div>
                        <div className="font-medium text-sm">{workflow.lastRun}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Runs</div>
                        <div className="font-medium text-sm">{workflow.totalRuns.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                        <div className="font-medium text-sm">{workflow.successRate}%</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {workflow.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedWorkflow(workflow)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleWorkflow(workflow.id)}
                    >
                      {workflow.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Details Modal */}
      {selectedWorkflow && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedWorkflow.name}</CardTitle>
                <CardDescription>{selectedWorkflow.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Workflow Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge className={getStatusColor(selectedWorkflow.status)}>
                    {getStatusIcon(selectedWorkflow.status)}
                    <span className="ml-1">{selectedWorkflow.status}</span>
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Category</div>
                  <Badge className={getCategoryColor(selectedWorkflow.category)}>
                    {selectedWorkflow.category.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Runs</div>
                  <div className="font-medium">{selectedWorkflow.totalRuns.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="font-medium">{selectedWorkflow.successRate}%</div>
                </div>
              </div>

              {/* Workflow Steps */}
              <div>
                <h4 className="font-semibold mb-4">Workflow Steps</h4>
                <div className="space-y-3">
                  {selectedWorkflow.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        {getStepIcon(step.type)}
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{step.description}</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {step.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="font-semibold mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Last Run</div>
                    <div className="font-medium">{selectedWorkflow.lastRun}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Next Run</div>
                    <div className="font-medium">{selectedWorkflow.nextRun}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="font-medium">{selectedWorkflow.successRate}%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
