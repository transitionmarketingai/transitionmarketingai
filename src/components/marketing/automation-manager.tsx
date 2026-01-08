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
  Zap, 
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
  Workflow,
  ArrowRight,
  ArrowDown,
  Circle,
  Square,
  Diamond,
  Triangle,
  Hexagon,
  Octagon,
  UserPlus,
  ShoppingCart,
  Mail,
  Tag,
  Gift,
  MessageSquare,
  FileText,
  Star,
  Download
} from 'lucide-react';
import { AutomationWorkflow, Audience } from '@/lib/marketing-data';

interface AutomationManagerProps {
  onWorkflowCreated?: (workflow: AutomationWorkflow) => void;
}

export default function AutomationManager({ onWorkflowCreated }: AutomationManagerProps) {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  useEffect(() => {
    const mockWorkflows: AutomationWorkflow[] = [
      {
        id: '1',
        name: 'Welcome Series',
        trigger: 'new_subscriber',
        actions: ['send_welcome_email', 'add_to_segment', 'schedule_follow_up'],
        status: 'active',
        subscribers: 15420,
        conversionRate: 12.4
      },
      {
        id: '2',
        name: 'Abandoned Cart Recovery',
        trigger: 'cart_abandoned',
        actions: ['send_reminder_email', 'offer_discount', 'schedule_final_email'],
        status: 'active',
        subscribers: 8930,
        conversionRate: 18.7
      },
      {
        id: '3',
        name: 'Re-engagement Campaign',
        trigger: 'inactive_30_days',
        actions: ['send_re_engagement_email', 'offer_incentive', 'survey_request'],
        status: 'paused',
        subscribers: 2340,
        conversionRate: 8.9
      },
      {
        id: '4',
        name: 'Post-Purchase Follow-up',
        trigger: 'purchase_completed',
        actions: ['send_thank_you_email', 'request_review', 'offer_upsell'],
        status: 'active',
        subscribers: 5670,
        conversionRate: 24.3
      },
      {
        id: '5',
        name: 'Lead Nurturing Sequence',
        trigger: 'lead_created',
        actions: ['send_lead_magnet', 'schedule_demo', 'add_to_nurture'],
        status: 'active',
        subscribers: 12340,
        conversionRate: 15.8
      }
    ];

    const mockAudiences: Audience[] = [
      {
        id: '1',
        name: 'All Subscribers',
        size: 15420,
        demographics: {
          age: '25-45',
          gender: 'mixed',
          location: 'US, UK, Canada',
          interests: ['technology', 'AI', 'automation']
        },
        behavior: {
          engagement: 89.2,
          conversion: 12.4,
          lifetimeValue: 1250
        }
      },
      {
        id: '2',
        name: 'High-Value Customers',
        size: 2340,
        demographics: {
          age: '30-50',
          gender: 'mixed',
          location: 'North America',
          interests: ['premium features', 'enterprise solutions']
        },
        behavior: {
          engagement: 94.5,
          conversion: 28.7,
          lifetimeValue: 3500
        }
      }
    ];

    setWorkflows(mockWorkflows);
    setAudiences(mockAudiences);
  }, []);

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || workflow.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <Edit className="h-4 w-4" />;
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'new_subscriber': return <UserPlus className="h-4 w-4" />;
      case 'cart_abandoned': return <ShoppingCart className="h-4 w-4" />;
      case 'inactive_30_days': return <Clock className="h-4 w-4" />;
      case 'purchase_completed': return <CheckCircle className="h-4 w-4" />;
      case 'lead_created': return <Target className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'send_welcome_email': return <Mail className="h-4 w-4" />;
      case 'add_to_segment': return <Users className="h-4 w-4" />;
      case 'schedule_follow_up': return <Calendar className="h-4 w-4" />;
      case 'send_reminder_email': return <Mail className="h-4 w-4" />;
      case 'offer_discount': return <Tag className="h-4 w-4" />;
      case 'send_re_engagement_email': return <Mail className="h-4 w-4" />;
      case 'offer_incentive': return <Gift className="h-4 w-4" />;
      case 'survey_request': return <FileText className="h-4 w-4" />;
      case 'send_thank_you_email': return <Mail className="h-4 w-4" />;
      case 'request_review': return <Star className="h-4 w-4" />;
      case 'offer_upsell': return <TrendingUp className="h-4 w-4" />;
      case 'send_lead_magnet': return <Download className="h-4 w-4" />;
      case 'schedule_demo': return <Calendar className="h-4 w-4" />;
      case 'add_to_nurture': return <Users className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            Automation Workflow Builder
          </CardTitle>
          <CardDescription>
            Create intelligent marketing automation workflows with AI-powered triggers and actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Workflow Name</label>
              <Input placeholder="e.g., Welcome Series, Abandoned Cart Recovery" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Trigger Event</label>
              <Select defaultValue="new_subscriber">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_subscriber">New Subscriber</SelectItem>
                  <SelectItem value="cart_abandoned">Cart Abandoned</SelectItem>
                  <SelectItem value="inactive_30_days">Inactive 30 Days</SelectItem>
                  <SelectItem value="purchase_completed">Purchase Completed</SelectItem>
                  <SelectItem value="lead_created">Lead Created</SelectItem>
                  <SelectItem value="form_submitted">Form Submitted</SelectItem>
                  <SelectItem value="page_visited">Page Visited</SelectItem>
                  <SelectItem value="email_opened">Email Opened</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Target Audience</label>
            <Select defaultValue="all_subscribers">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_subscribers">All Subscribers</SelectItem>
                <SelectItem value="high_value">High-Value Customers</SelectItem>
                <SelectItem value="new_customers">New Customers</SelectItem>
                <SelectItem value="inactive_users">Inactive Users</SelectItem>
                <SelectItem value="premium_users">Premium Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Workflow Actions</label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Add to Segment
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Action
              </Button>
              <Button variant="outline" size="sm">
                <Tag className="h-4 w-4 mr-2" />
                Apply Tag
              </Button>
              <Button variant="outline" size="sm">
                <Gift className="h-4 w-4 mr-2" />
                Offer Incentive
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Send Survey
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Workflow Description</label>
            <Textarea placeholder="Describe the purpose and goals of this automation workflow..." rows={3} />
          </div>
          
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              AI Optimize
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Visualization</CardTitle>
          <CardDescription>Visual representation of your automation workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredWorkflows.slice(0, 2).map((workflow) => (
              <div key={workflow.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-5 w-5" />
                    <h3 className="font-semibold">{workflow.name}</h3>
                    <Badge className={getStatusColor(workflow.status)}>
                      {getStatusIcon(workflow.status)}
                      <span className="ml-1">{workflow.status}</span>
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {workflow.subscribers.toLocaleString()} subscribers
                  </div>
                </div>
                
                {/* Workflow Steps */}
                <div className="flex items-center justify-center space-x-4">
                  {/* Trigger */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      {getTriggerIcon(workflow.trigger)}
                    </div>
                    <div className="text-xs text-center">
                      <div className="font-medium">Trigger</div>
                      <div className="text-muted-foreground">{workflow.trigger.replace('_', ' ')}</div>
                    </div>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {workflow.actions.map((action, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          {getActionIcon(action)}
                        </div>
                        <div className="text-xs text-center">
                          <div className="font-medium">Action</div>
                          <div className="text-muted-foreground">{action.replace('_', ' ')}</div>
                        </div>
                        {index < workflow.actions.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-muted-foreground mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Subscribers</div>
                      <div className="font-medium">{workflow.subscribers.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Conversion Rate</div>
                      <div className="font-medium text-green-600">{workflow.conversionRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Status</div>
                      <div className="font-medium">{workflow.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflows List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Automation Workflows</CardTitle>
              <CardDescription>Manage your marketing automation sequences</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
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
                      <Activity className="h-4 w-4" />
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <Badge className={getStatusColor(workflow.status)}>
                        {getStatusIcon(workflow.status)}
                        <span className="ml-1">{workflow.status}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Trigger:</strong> {workflow.trigger.replace('_', ' ')}
                    </p>
                    
                    <div className="flex gap-2 mb-3">
                      {workflow.actions.map((action, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {getActionIcon(action)}
                          <span className="ml-1">{action.replace('_', ' ')}</span>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Subscribers</div>
                        <div className="font-medium">{workflow.subscribers.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Conversion Rate</div>
                        <div className="font-medium text-green-600">{workflow.conversionRate}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Actions</div>
                        <div className="font-medium">{workflow.actions.length}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedWorkflow(workflow.id)}
                    >
                      {workflow.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.filter(w => w.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">of {workflows.length} total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.reduce((acc, w) => acc + w.subscribers, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg. Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(workflows.reduce((acc, w) => acc + w.conversionRate, 0) / workflows.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Automation Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">+5 points this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
