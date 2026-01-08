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
  Link, 
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
  Unlock
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  platform: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  type: 'ads' | 'email' | 'analytics' | 'crm' | 'social' | 'ecommerce';
  lastSync: string;
  dataPoints: number;
  health: 'excellent' | 'good' | 'warning' | 'error';
  description: string;
  features: string[];
}

interface IntegrationManagerProps {
  onIntegrationConnected?: (integration: Integration) => void;
}

export default function IntegrationManager({ onIntegrationConnected }: IntegrationManagerProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [availableIntegrations, setAvailableIntegrations] = useState<Integration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  useEffect(() => {
    const mockIntegrations: Integration[] = [
      {
        id: '1',
        name: 'Google Ads',
        platform: 'Google',
        status: 'connected',
        type: 'ads',
        lastSync: '2 minutes ago',
        dataPoints: 1250,
        health: 'excellent',
        description: 'Connect your Google Ads account to automate campaign management and optimization',
        features: ['Campaign Management', 'Bid Optimization', 'Performance Tracking', 'Budget Control']
      },
      {
        id: '2',
        name: 'Facebook Ads',
        platform: 'Meta',
        status: 'connected',
        type: 'ads',
        lastSync: '5 minutes ago',
        dataPoints: 890,
        health: 'good',
        description: 'Integrate Facebook and Instagram advertising for cross-platform campaign management',
        features: ['Ad Creation', 'Audience Targeting', 'Creative Optimization', 'Performance Analytics']
      },
      {
        id: '3',
        name: 'Mailchimp',
        platform: 'Mailchimp',
        status: 'connected',
        type: 'email',
        lastSync: '1 minute ago',
        dataPoints: 2100,
        health: 'excellent',
        description: 'Sync your email marketing campaigns and subscriber data with Mailchimp',
        features: ['Email Campaigns', 'Subscriber Management', 'Automation', 'Analytics']
      },
      {
        id: '4',
        name: 'HubSpot',
        platform: 'HubSpot',
        status: 'pending',
        type: 'crm',
        lastSync: 'Never',
        dataPoints: 0,
        health: 'warning',
        description: 'Connect your HubSpot CRM for comprehensive lead and customer management',
        features: ['Lead Management', 'Contact Sync', 'Deal Tracking', 'Marketing Automation']
      },
      {
        id: '5',
        name: 'Google Analytics',
        platform: 'Google',
        status: 'connected',
        type: 'analytics',
        lastSync: '3 minutes ago',
        dataPoints: 5600,
        health: 'excellent',
        description: 'Track website performance and user behavior with Google Analytics',
        features: ['Traffic Analysis', 'User Behavior', 'Conversion Tracking', 'Custom Reports']
      },
      {
        id: '6',
        name: 'Shopify',
        platform: 'Shopify',
        status: 'error',
        type: 'ecommerce',
        lastSync: '2 hours ago',
        dataPoints: 340,
        health: 'error',
        description: 'Sync your Shopify store data for e-commerce marketing automation',
        features: ['Product Sync', 'Order Tracking', 'Customer Data', 'Inventory Management']
      }
    ];

    const mockAvailableIntegrations: Integration[] = [
      {
        id: '7',
        name: 'LinkedIn Ads',
        platform: 'LinkedIn',
        status: 'disconnected',
        type: 'ads',
        lastSync: 'Never',
        dataPoints: 0,
        health: 'good',
        description: 'Connect LinkedIn advertising for B2B campaign management',
        features: ['B2B Targeting', 'Lead Generation', 'Company Targeting', 'Professional Networks']
      },
      {
        id: '8',
        name: 'Salesforce',
        platform: 'Salesforce',
        status: 'disconnected',
        type: 'crm',
        lastSync: 'Never',
        dataPoints: 0,
        health: 'good',
        description: 'Integrate with Salesforce CRM for enterprise customer management',
        features: ['Lead Management', 'Opportunity Tracking', 'Customer Data', 'Sales Analytics']
      },
      {
        id: '9',
        name: 'Twitter Ads',
        platform: 'Twitter',
        status: 'disconnected',
        type: 'ads',
        lastSync: 'Never',
        dataPoints: 0,
        health: 'good',
        description: 'Connect Twitter advertising for social media campaign management',
        features: ['Tweet Promotion', 'Audience Targeting', 'Trend Analysis', 'Engagement Tracking']
      }
    ];

    setIntegrations(mockIntegrations);
    setAvailableIntegrations(mockAvailableIntegrations);
  }, []);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || integration.type === filterType;
    const matchesStatus = filterStatus === 'all' || integration.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'disconnected': return <Minus className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ads': return <Target className="h-4 w-4" />;
      case 'email': return <Users className="h-4 w-4" />;
      case 'analytics': return <BarChart3 className="h-4 w-4" />;
      case 'crm': return <Database className="h-4 w-4" />;
      case 'social': return <Globe className="h-4 w-4" />;
      case 'ecommerce': return <Server className="h-4 w-4" />;
      default: return <Link className="h-4 w-4" />;
    }
  };

  const handleConnectIntegration = (integration: Integration) => {
    // Simulate connection process
    const updatedIntegration = { ...integration, status: 'connected' as const, lastSync: 'Just now' };
    setIntegrations(prev => [updatedIntegration, ...prev]);
    setAvailableIntegrations(prev => prev.filter(i => i.id !== integration.id));
    onIntegrationConnected?.(updatedIntegration);
  };

  const handleDisconnectIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.filter(i => i.id !== integrationId));
  };

  const handleSyncIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(i => 
      i.id === integrationId 
        ? { ...i, lastSync: 'Just now', dataPoints: i.dataPoints + Math.floor(Math.random() * 100) }
        : i
    ));
  };

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <p className="text-xs text-muted-foreground">of {integrations.length} total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Data Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.reduce((acc, i) => acc + i.dataPoints, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Last Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1m</div>
            <p className="text-xs text-muted-foreground">ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Integrations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>Connect new platforms to expand your marketing capabilities</CardDescription>
            </div>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableIntegrations.map((integration) => (
              <div key={integration.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(integration.type)}
                    <h3 className="font-semibold">{integration.name}</h3>
                  </div>
                  <Badge variant="secondary">{integration.platform}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {integration.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {integration.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {integration.features.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{integration.features.length - 2} more features
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={() => handleConnectIntegration(integration)}
                  className="w-full"
                  size="sm"
                >
                  <Link className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connected Integrations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Manage your active platform connections</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
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
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ads">Ads</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="crm">CRM</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="disconnected">Disconnected</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Integrations List */}
          <div className="space-y-4">
            {filteredIntegrations.map((integration) => (
              <div key={integration.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(integration.type)}
                      <h3 className="font-semibold">{integration.name}</h3>
                      <Badge className={getStatusColor(integration.status)}>
                        {getStatusIcon(integration.status)}
                        <span className="ml-1">{integration.status}</span>
                      </Badge>
                      <Badge variant="outline">{integration.platform}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {integration.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Data Points</div>
                        <div className="font-medium">{integration.dataPoints.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Last Sync</div>
                        <div className="font-medium">{integration.lastSync}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Health</div>
                        <div className={`font-medium ${getHealthColor(integration.health)}`}>
                          {integration.health}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Features</div>
                        <div className="font-medium">{integration.features.length}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {integration.features.slice(0, 4).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {integration.features.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{integration.features.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSyncIntegration(integration.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDisconnectIntegration(integration.id)}
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

      {/* Integration Health */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Health</CardTitle>
          <CardDescription>Monitor the health and performance of your integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.filter(i => i.status === 'connected').map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(integration.type)}
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-muted-foreground">{integration.platform}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{integration.dataPoints.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">data points</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">{integration.lastSync}</div>
                    <div className="text-xs text-muted-foreground">last sync</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getHealthColor(integration.health)}`}>
                      {integration.health}
                    </div>
                    <div className="text-xs text-muted-foreground">health</div>
                  </div>
                  
                  <div className="w-16">
                    <Progress 
                      value={integration.health === 'excellent' ? 100 : integration.health === 'good' ? 75 : integration.health === 'warning' ? 50 : 25} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
