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
  Target, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Zap,
  CheckCircle,
  Clock,
  Play,
  Pause,
  Settings,
  AlertCircle
} from 'lucide-react';
import { optimizeCampaign } from '@/lib/marketing-utils';
import { Campaign, CampaignMetrics } from '@/lib/marketing-data';

interface AdsManagerProps {
  onCampaignOptimized?: (campaign: Campaign) => void;
}

export default function AdsManager({ onCampaignOptimized }: AdsManagerProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState<any>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock campaigns data
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Q4 Product Launch',
        type: 'ads',
        status: 'active',
        budget: 5000,
        startDate: '2024-10-01',
        endDate: '2024-12-31',
        metrics: {
          impressions: 125000,
          clicks: 3750,
          conversions: 187,
          cost: 3750,
          revenue: 18700,
          ctr: 3.0,
          cpc: 1.0,
          roas: 4.99
        },
        settings: {
          targetAudience: ['tech professionals', 'small business owners'],
          keywords: ['AI marketing', 'automation tools'],
          platforms: ['google', 'facebook', 'linkedin'],
          budget: 5000,
          automation: true
        }
      },
      {
        id: '2',
        name: 'Holiday Sale Campaign',
        type: 'ads',
        status: 'active',
        budget: 3000,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        metrics: {
          impressions: 89000,
          clicks: 2670,
          conversions: 134,
          cost: 2670,
          revenue: 13400,
          ctr: 3.0,
          cpc: 1.0,
          roas: 5.02
        },
        settings: {
          targetAudience: ['holiday shoppers', 'deal seekers'],
          keywords: ['holiday sale', 'discount', 'promotion'],
          platforms: ['google', 'facebook'],
          budget: 3000,
          automation: true
        }
      },
      {
        id: '3',
        name: 'Brand Awareness Campaign',
        type: 'ads',
        status: 'paused',
        budget: 2000,
        startDate: '2024-11-01',
        endDate: '2024-11-30',
        metrics: {
          impressions: 45000,
          clicks: 900,
          conversions: 18,
          cost: 1800,
          revenue: 1800,
          ctr: 2.0,
          cpc: 2.0,
          roas: 1.0
        },
        settings: {
          targetAudience: ['general audience'],
          keywords: ['brand awareness', 'company name'],
          platforms: ['google', 'facebook'],
          budget: 2000,
          automation: false
        }
      }
    ];
    setCampaigns(mockCampaigns);
  }, []);

  const handleOptimizeCampaign = async (campaignId: string) => {
    setIsOptimizing(true);
    try {
      const results = await optimizeCampaign(campaignId);
      setOptimizationResults(results);
      onCampaignOptimized?.(campaigns.find(c => c.id === campaignId)!);
    } catch (error) {
      console.error('Error optimizing campaign:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <Edit className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Campaign Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Create New Campaign
          </CardTitle>
          <CardDescription>
            Set up and launch new advertising campaigns across multiple platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Campaign Name</label>
              <Input placeholder="e.g., Q1 Product Launch Campaign" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Campaign Type</label>
              <Select defaultValue="search">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="search">Search Campaign</SelectItem>
                  <SelectItem value="display">Display Campaign</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="video">Video Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Budget</label>
              <Input placeholder="5000" type="number" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Start Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <Input type="date" />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Target Platforms</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Google Ads
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Facebook Ads
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                LinkedIn Ads
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Target Audience</label>
            <Textarea placeholder="Describe your target audience, demographics, interests, and behaviors..." rows={3} />
          </div>
          
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              AI Optimize
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Optimization */}
      {optimizationResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Optimization Results
            </CardTitle>
            <CardDescription>
              AI-powered recommendations to improve campaign performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Recommendations</h4>
              <div className="space-y-2">
                {optimizationResults.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Budget Adjustments</h4>
              <div className="space-y-2">
                {optimizationResults.budgetAdjustments.map((adj: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <span className="font-medium">{adj.platform}</span>
                      <p className="text-sm text-muted-foreground">{adj.reason}</p>
                    </div>
                    <Badge variant={adj.adjustment > 0 ? "default" : "secondary"}>
                      {adj.adjustment > 0 ? '+' : ''}{adj.adjustment}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Performance Predictions</h4>
              <div className="grid grid-cols-2 gap-4">
                {optimizationResults.performancePredictions.map((pred: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="text-sm font-medium">{pred.metric}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">{pred.current}</span>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{pred.predicted}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Apply Recommendations
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Manage and monitor your advertising campaigns</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
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
                  placeholder="Search campaigns..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4" />
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusIcon(campaign.status)}
                        <span className="ml-1">{campaign.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Budget</div>
                        <div className="font-medium">{formatCurrency(campaign.budget || 0)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Spent</div>
                        <div className="font-medium">{formatCurrency(campaign.metrics.cost || 0)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">ROAS</div>
                        <div className="font-medium">{campaign.metrics.roas?.toFixed(2)}x</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Conversions</div>
                        <div className="font-medium">{campaign.metrics.conversions}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {campaign.startDate} - {campaign.endDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {campaign.settings.targetAudience.join(', ')}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {campaign.settings.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOptimizeCampaign(campaign.id)}
                      disabled={isOptimizing}
                    >
                      {isOptimizing ? (
                        <Clock className="h-4 w-4 animate-spin" />
                      ) : (
                        <Zap className="h-4 w-4" />
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

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(campaigns.reduce((acc, c) => acc + (c.metrics.cost || 0), 0))}
            </div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg. ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(campaigns.reduce((acc, c) => acc + (c.metrics.roas || 0), 0) / campaigns.length).toFixed(2)}x
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((acc, c) => acc + (c.metrics.conversions || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">of {campaigns.length} total</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
