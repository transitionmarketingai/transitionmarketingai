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
  Mail, 
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
  Zap,
  CheckCircle,
  Clock,
  Play,
  Pause,
  Settings,
  Send,
  UserPlus,
  UserMinus,
  Activity
} from 'lucide-react';
import { generateEmailCampaign } from '@/lib/marketing-utils';
import { EmailTemplate, AutomationWorkflow, Audience } from '@/lib/marketing-data';

interface EmailManagerProps {
  onCampaignGenerated?: (template: EmailTemplate) => void;
}

export default function EmailManager({ onCampaignGenerated }: EmailManagerProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<string>('newsletter');
  const [selectedAudience, setSelectedAudience] = useState<string>('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  useEffect(() => {
    const mockTemplates: EmailTemplate[] = [
      {
        id: '1',
        name: 'Welcome Series - Day 1',
        subject: 'Welcome to TransitionMarketingAI!',
        content: 'Thank you for joining us! We\'re excited to help you transform your marketing with AI...',
        type: 'welcome',
        openRate: 94.2,
        clickRate: 18.7,
        unsubRate: 0.3
      },
      {
        id: '2',
        name: 'Weekly Newsletter',
        subject: 'This Week in Marketing: AI Trends & Tips',
        content: 'Here are the latest marketing insights and AI trends...',
        type: 'newsletter',
        openRate: 89.2,
        clickRate: 12.4,
        unsubRate: 0.8
      },
      {
        id: '3',
        name: 'Holiday Promotion',
        subject: '50% Off - Limited Time Offer!',
        content: 'Don\'t miss our biggest sale of the year...',
        type: 'promotional',
        openRate: 76.8,
        clickRate: 24.5,
        unsubRate: 1.2
      }
    ];

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

    setTemplates(mockTemplates);
    setWorkflows(mockWorkflows);
    setAudiences(mockAudiences);
  }, []);

  const handleGenerateCampaign = async () => {
    setIsGenerating(true);
    try {
      const campaign = await generateEmailCampaign(selectedType, selectedAudience);
      setGeneratedCampaign(campaign);
      
      // Create new template
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        name: `${selectedType} - ${selectedAudience}`,
        subject: campaign.subject,
        content: campaign.content,
        type: selectedType as any,
        openRate: campaign.performance.openRate,
        clickRate: campaign.performance.clickRate,
        unsubRate: 0.5
      };
      
      setTemplates(prev => [newTemplate, ...prev]);
      onCampaignGenerated?.(newTemplate);
    } catch (error) {
      console.error('Error generating campaign:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome': return 'bg-blue-100 text-blue-800';
      case 'newsletter': return 'bg-green-100 text-green-800';
      case 'promotional': return 'bg-orange-100 text-orange-800';
      case 'nurture': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Campaign Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            AI Email Campaign Generator
          </CardTitle>
          <CardDescription>
            Create personalized email campaigns with AI-powered content and automation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Campaign Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome Series</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="nurture">Nurture Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Target Audience</label>
              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Audience</SelectItem>
                  <SelectItem value="tech">Tech Professionals</SelectItem>
                  <SelectItem value="business">Business Owners</SelectItem>
                  <SelectItem value="marketers">Marketing Professionals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Campaign Topic</label>
            <Input placeholder="e.g., Weekly marketing insights, product updates, holiday promotion" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Segment Audience
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              A/B Test
            </Button>
          </div>
          
          <Button 
            onClick={handleGenerateCampaign} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Generating Campaign...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate AI Email Campaign
              </>
            )}
          </Button>
          
          {generatedCampaign && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Generated Subject Line</label>
                <Input value={generatedCampaign.subject} readOnly className="bg-muted/30" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Generated Content</label>
                <Textarea
                  value={generatedCampaign.content}
                  readOnly
                  rows={12}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-primary/20"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Open Rate</div>
                  <div className="text-lg font-bold text-blue-600">{generatedCampaign.performance.openRate}%</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Click Rate</div>
                  <div className="text-lg font-bold text-green-600">{generatedCampaign.performance.clickRate}%</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Conversion</div>
                  <div className="text-lg font-bold text-purple-600">{generatedCampaign.performance.conversionRate}%</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Campaign
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Send Test
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Manage your email campaign templates</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
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
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Templates List */}
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" />
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge className={getTypeColor(template.type)}>
                        {template.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Subject:</strong> {template.subject}
                    </p>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {template.content.substring(0, 150)}...
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Open Rate</div>
                        <div className="font-medium text-blue-600">{template.openRate}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Click Rate</div>
                        <div className="font-medium text-green-600">{template.clickRate}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Unsub Rate</div>
                        <div className="font-medium text-red-600">{template.unsubRate}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Workflows */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Automation Workflows</CardTitle>
              <CardDescription>Set up automated email sequences and triggers</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4" />
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Trigger:</strong> {workflow.trigger.replace('_', ' ')}
                    </p>
                    
                    <div className="flex gap-2 mb-3">
                      {workflow.actions.map((action, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {action.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Subscribers</div>
                        <div className="font-medium">{workflow.subscribers.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Conversion Rate</div>
                        <div className="font-medium text-green-600">{workflow.conversionRate}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      {workflow.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
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

      {/* Audience Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Manage your email subscriber segments</CardDescription>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audiences.map((audience) => (
              <div key={audience.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      <h3 className="font-semibold">{audience.name}</h3>
                      <Badge variant="secondary">
                        {audience.size.toLocaleString()} subscribers
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-muted-foreground">Engagement</div>
                        <div className="font-medium text-blue-600">{audience.behavior.engagement}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Conversion</div>
                        <div className="font-medium text-green-600">{audience.behavior.conversion}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">LTV</div>
                        <div className="font-medium text-purple-600">${audience.behavior.lifetimeValue}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <strong>Demographics:</strong> {audience.demographics.age}, {audience.demographics.gender}, {audience.demographics.location}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {audiences.reduce((acc, a) => acc + a.size, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg. Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(templates.reduce((acc, t) => acc + t.openRate, 0) / templates.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg. Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(templates.reduce((acc, t) => acc + t.clickRate, 0) / templates.length)}%
            </div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
        
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
      </div>
    </div>
  );
}
