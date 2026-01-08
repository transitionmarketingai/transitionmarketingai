'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AutomationWorkflows from '@/components/marketing/automation-workflows';
import IntegrationManager from '@/components/marketing/integrations-manager';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  Search, 
  FileText,
  Target,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  Eye,
  MousePointer,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  MoreHorizontal,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Hash,
  Tag,
  Link,
  Image,
  Workflow,
  ExternalLink,
  Copy,
  UserPlus,
  UserMinus,
  MessageSquare,
  Star,
  Triangle,
  Square,
  Circle,
  Hexagon,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Minus,
  Upload,
  Key,
  Shield,
  Lock,
  Unlock,
  Server,
  Cloud,
  Wifi,
  Signal,
  Database,
  Heart,
  Share2
} from 'lucide-react';

const mockData = {
  overview: {
    metrics: [
      {
        title: 'Total Revenue',
        value: '$45,200',
        change: '+23.5%',
        changeType: 'positive',
        icon: DollarSign,
        color: 'green'
      },
      {
        title: 'Content Generated',
        value: '47',
        change: '+12%',
        changeType: 'positive',
        icon: FileText,
        color: 'blue'
      },
      {
        title: 'Email Opens',
        value: '15,420',
        change: '+8.2%',
        changeType: 'positive',
        icon: Mail,
        color: 'purple'
      },
      {
        title: 'Ad Clicks',
        value: '3,250',
        change: '+15.3%',
        changeType: 'positive',
        icon: Target,
        color: 'orange'
      },
      {
        title: 'Social Engagement',
        value: '89.2%',
        change: '+5.1%',
        changeType: 'positive',
        icon: Heart,
        color: 'pink'
      },
      {
        title: 'SEO Rankings',
        value: '156',
        change: '+8',
        changeType: 'positive',
        icon: TrendingUp,
        color: 'indigo'
      },
      {
        title: 'Lead Conversion',
        value: '12.4%',
        change: '+2.3%',
        changeType: 'positive',
        icon: Users,
        color: 'teal'
      },
      {
        title: 'Campaign ROI',
        value: '4.8x',
        change: '+0.3x',
        changeType: 'positive',
        icon: BarChart3,
        color: 'emerald'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'content',
        action: 'Blog post published',
        title: '5 Ways AI is Revolutionizing Digital Marketing',
        time: '2 hours ago',
        status: 'completed'
      },
      {
        id: 2,
        type: 'ads',
        action: 'Campaign optimized',
        title: 'Q4 Product Launch Campaign',
        time: '4 hours ago',
        status: 'completed'
      },
      {
        id: 3,
        type: 'email',
        action: 'Newsletter sent',
        title: 'Weekly Marketing Insights',
        time: '6 hours ago',
        status: 'completed'
      },
      {
        id: 4,
        type: 'seo',
        action: 'Keywords analyzed',
        title: '15 new keywords identified',
        time: '8 hours ago',
        status: 'completed'
      }
    ]
  },
  agents: {
    content: {
      name: 'Content Agent',
      status: 'active',
      icon: FileText,
      color: 'blue',
      metrics: {
        postsGenerated: 47,
        engagementRate: '89.2%',
        totalViews: '12.5k',
        avgReadTime: '4.2 min'
      },
      recentWork: [
        'Generated blog post: "5 Ways AI is Revolutionizing Digital Marketing"',
        'Drafted 3 social media posts for Q4 campaign',
        'Created email newsletter for product update',
        'Optimized content for SEO keywords'
      ],
      performance: {
        efficiency: 92,
        quality: 88,
        speed: 95
      }
    },
    ads: {
      name: 'Ads Agent',
      status: 'active',
      icon: Target,
      color: 'green',
      metrics: {
        revenueGenerated: '$24,500',
        roas: '4.2x',
        ctr: '3.1%',
        cpc: '$1.25'
      },
      recentWork: [
        'Optimized Google Ads for keyword performance',
        'Launched new Facebook campaign for lead generation',
        'Adjusted LinkedIn ad spend for Q4 targets',
        'A/B tested ad creatives for better conversion'
      ],
      performance: {
        efficiency: 89,
        quality: 91,
        speed: 87
      }
    },
    email: {
      name: 'Email Agent',
      status: 'active',
      icon: Mail,
      color: 'purple',
      metrics: {
        subscribers: '15,420',
        openRate: '89.2%',
        clickRate: '12.4%',
        unsubRate: '0.8%'
      },
      recentWork: [
        'Created new welcome series for sign-ups',
        'A/B tested subject lines for holiday promotion',
        'Segmented audience for targeted product launch',
        'Automated follow-up sequences for leads'
      ],
      performance: {
        efficiency: 94,
        quality: 90,
        speed: 92
      }
    },
    seo: {
      name: 'SEO Agent',
      status: 'active',
      icon: Search,
      color: 'orange',
      metrics: {
        keywordsInTop10: 156,
        monthlyOrganicTraffic: '45.2k',
        avgPosition: '3.2',
        backlinks: '1,250'
      },
      recentWork: [
        'Identified 10 new high-volume keywords',
        'Improved ranking for "AI marketing tools" to #3',
        'Audited website for broken links and redirects',
        'Optimized meta descriptions for better CTR'
      ],
      performance: {
        efficiency: 87,
        quality: 93,
        speed: 85
      }
    },
    analytics: {
      name: 'Analytics Agent',
      status: 'active',
      icon: BarChart3,
      color: 'red',
      metrics: {
        totalRevenue: '$45,200',
        marketingROI: '4.8x',
        conversionRate: '3.2%',
        costPerLead: '$12.50'
      },
      recentWork: [
        'Identified peak conversion times for email campaigns',
        'Recommended budget reallocation for underperforming ads',
        'Generated weekly performance report with key insights',
        'Analyzed customer journey for optimization opportunities'
      ],
      performance: {
        efficiency: 91,
        quality: 95,
        speed: 88
      }
    }
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [isDemo, setIsDemo] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState('content');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const demoUser = localStorage.getItem('demo-user');
    if (!demoUser) {
      router.push('/login');
    } else {
      setIsDemo(true);
    }
  }, [router]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    localStorage.removeItem('demo-email');
    router.push('/login');
  };

  if (!isDemo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">TransitionMarketingAI</h1>
            <Badge variant="secondary" className="text-xs">Demo Mode</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@demo" />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Demo User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      demo@transitionmarketingai.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, Demo User!</h2>
              <p className="text-muted-foreground">
                Your AI agents are working 24/7 to optimize your marketing campaigns. Here's what they've accomplished today.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="ads">Ads</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
              {mockData.overview.metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xs font-medium truncate">{metric.title}</CardTitle>
                      <IconComponent className={`h-4 w-4 text-${metric.color}-500`} />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-lg font-bold">{metric.value}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {metric.changeType === 'positive' ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
                          {metric.change}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Advanced Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Performance Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>Last 30 days performance across all agents</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Last 30 days
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg border-2 border-dashed border-primary/20">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                      <p className="text-muted-foreground font-medium">Advanced Performance Analytics</p>
                      <p className="text-sm text-muted-foreground mt-2">Real-time charts with drill-down capabilities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Top performing campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Q4 Product Launch</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">+24.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Holiday Email Series</span>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">+18.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">Social Media Boost</span>
                      </div>
                      <span className="text-sm text-purple-600 font-medium">+12.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">SEO Content Push</span>
                      </div>
                      <span className="text-sm text-orange-600 font-medium">+9.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Alerts</CardTitle>
                  <CardDescription>System notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Budget Alert</p>
                        <p className="text-xs text-muted-foreground">Google Ads budget 80% used</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Campaign Complete</p>
                        <p className="text-xs text-muted-foreground">Email sequence finished</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Optimization</p>
                        <p className="text-xs text-muted-foreground">New keywords identified</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Marketing Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions from your AI agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.overview.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground truncate">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Automation */}
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Automation</CardTitle>
                  <CardDescription>Active workflows and sequences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Welcome Series</span>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Abandoned Cart</span>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Lead Nurturing</span>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">Re-engagement</span>
                      </div>
                      <Badge variant="outline">Paused</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audience Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Audience Insights</CardTitle>
                  <CardDescription>Customer behavior analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">New Visitors</span>
                      <span className="text-sm text-green-600 font-medium">+15.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Returning Visitors</span>
                      <span className="text-sm text-blue-600 font-medium">+8.7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Mobile Traffic</span>
                      <span className="text-sm text-purple-600 font-medium">68.4%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Avg. Session</span>
                      <span className="text-sm text-orange-600 font-medium">4m 32s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Agent Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Agent Status & Performance</CardTitle>
                  <CardDescription>Real-time monitoring of all AI agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(mockData.agents).map(([key, agent]) => {
                      const IconComponent = agent.icon;
                      return (
                        <div key={key} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setActiveTab(key)}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-${agent.color}-100 rounded-lg flex items-center justify-center`}>
                              <IconComponent className={`h-5 w-5 text-${agent.color}-600`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">{agent.name}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="text-xs">
                                  {agent.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">Efficiency: {agent.performance.efficiency}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-muted-foreground">Active</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Channels */}
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Channels</CardTitle>
                  <CardDescription>Performance across all marketing channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Website</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">45.2k visitors</div>
                        <div className="text-xs text-green-600">+12.3%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">89.2% open rate</div>
                        <div className="text-xs text-green-600">+5.1%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Paid Ads</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">4.2x ROAS</div>
                        <div className="text-xs text-green-600">+0.3x</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">SEO</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">156 top 10 keywords</div>
                        <div className="text-xs text-green-600">+8</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Share2 className="h-4 w-4 text-pink-500" />
                        <span className="text-sm font-medium">Social Media</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">2.4k engagements</div>
                        <div className="text-xs text-green-600">+18.7%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Individual Agent Tabs */}
          {Object.entries(mockData.agents).map(([key, agent]) => {
            const IconComponent = agent.icon;
            return (
              <TabsContent key={key} value={key} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-${agent.color}-100 rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`h-8 w-8 text-${agent.color}-600`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{agent.name}</h2>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{agent.status}</Badge>
                        <span className="text-sm text-muted-foreground">Last active: 2 minutes ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Run Task
                    </Button>
                  </div>
                </div>

                {/* Advanced Agent Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(agent.metrics).map(([metricKey, value]) => (
                    <Card key={metricKey} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium capitalize">
                          {metricKey.replace(/([A-Z])/g, ' $1').trim()}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{value}</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-green-600">+5.2%</span>
                          <span className="ml-1">vs last week</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Advanced Agent Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Controls</CardTitle>
                      <CardDescription>Manage agent behavior and settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Auto-optimization</span>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Learning mode</span>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Performance alerts</span>
                        <Button variant="outline" size="sm">
                          <Bell className="h-4 w-4 mr-2" />
                          Setup
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Integration Status</CardTitle>
                      <CardDescription>Connected platforms and APIs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Google Ads</span>
                        </div>
                        <Badge variant="secondary">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Facebook Ads</span>
                        </div>
                        <Badge variant="secondary">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Mailchimp</span>
                        </div>
                        <Badge variant="secondary">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm font-medium">HubSpot</span>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Insights</CardTitle>
                      <CardDescription>Machine learning recommendations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Optimization Opportunity</p>
                            <p className="text-xs text-muted-foreground">Increase budget by 15% for better ROI</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Performance Boost</p>
                            <p className="text-xs text-muted-foreground">Try A/B testing new creatives</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-purple-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Audience Expansion</p>
                            <p className="text-xs text-muted-foreground">New demographic segments identified</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Agent efficiency and quality scores</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(agent.performance).map(([metric, value]) => (
                        <div key={metric} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium capitalize">{metric}</span>
                            <span className="text-sm text-muted-foreground">{value}%</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Work */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Work</CardTitle>
                      <CardDescription>Latest tasks completed by this agent</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {agent.recentWork.map((work, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{work}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Advanced Interactive Demo */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Agent Interface</CardTitle>
                      <CardDescription>Interact with this agent to see advanced capabilities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {key === 'content' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Blog Post
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-2" />
                              Social Media
                            </Button>
                          </div>
                          <div>
                            <label htmlFor="content-topic" className="text-sm font-medium">
                              Content Topic & Style
                            </label>
                            <Input id="content-topic" placeholder="e.g., AI in marketing, professional tone" className="mt-1" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Hash className="h-4 w-4 mr-2" />
                              Add Keywords
                            </Button>
                            <Button variant="outline" size="sm">
                              <Target className="h-4 w-4 mr-2" />
                              Set Audience
                            </Button>
                          </div>
                          <Button className="w-full">
                            <Zap className="h-4 w-4 mr-2" />
                            Generate Advanced Content
                          </Button>
                          <Textarea placeholder="AI-generated content with SEO optimization, audience targeting, and engagement strategies will appear here..." rows={8} readOnly className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-primary/20" />
                        </div>
                      )}
                      {key === 'ads' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Target className="h-4 w-4 mr-2" />
                              Google Ads
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-2" />
                              Facebook Ads
                            </Button>
                          </div>
                          <div>
                            <label htmlFor="ad-campaign" className="text-sm font-medium">
                              Campaign Details & Budget
                            </label>
                            <Input id="ad-campaign" placeholder="e.g., Q4 Product Launch, $5000 budget" className="mt-1" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
                              Audience Research
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Competitor Analysis
                            </Button>
                          </div>
                          <Button className="w-full">
                            <Target className="h-4 w-4 mr-2" />
                            Optimize Campaign Strategy
                          </Button>
                          <Textarea placeholder="Advanced campaign optimization with audience insights, bid strategies, creative recommendations, and performance predictions will appear here..." rows={8} readOnly className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-dashed border-primary/20" />
                        </div>
                      )}
                      {key === 'email' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-2" />
                              Newsletter
                            </Button>
                            <Button variant="outline" size="sm">
                              <Zap className="h-4 w-4 mr-2" />
                              Automation
                            </Button>
                          </div>
                          <div>
                            <label htmlFor="email-template" className="text-sm font-medium">
                              Email Type & Audience
                            </label>
                            <Input id="email-template" placeholder="e.g., Welcome Series, new subscribers" className="mt-1" />
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
                          <Button className="w-full">
                            <Mail className="h-4 w-4 mr-2" />
                            Generate Email Campaign
                          </Button>
                          <Textarea placeholder="Personalized email templates with segmentation, automation triggers, A/B testing variants, and performance optimization will appear here..." rows={8} readOnly className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-primary/20" />
                        </div>
                      )}
                      {key === 'seo' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Search className="h-4 w-4 mr-2" />
                              Keyword Research
                            </Button>
                            <Button variant="outline" size="sm">
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Rank Tracking
                            </Button>
                          </div>
                          <div>
                            <label htmlFor="seo-keyword" className="text-sm font-medium">
                              SEO Focus & Goals
                            </label>
                            <Input id="seo-keyword" placeholder="e.g., best marketing automation, increase organic traffic" className="mt-1" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Globe className="h-4 w-4 mr-2" />
                              Competitor Analysis
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Content Audit
                            </Button>
                          </div>
                          <Button className="w-full">
                            <Search className="h-4 w-4 mr-2" />
                            Advanced SEO Analysis
                          </Button>
                          <Textarea placeholder="Comprehensive SEO strategy with keyword opportunities, content gaps, technical recommendations, and ranking predictions will appear here..." rows={8} readOnly className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-dashed border-primary/20" />
                        </div>
                      )}
                      {key === 'analytics' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Performance
                            </Button>
                            <Button variant="outline" size="sm">
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Predictions
                            </Button>
                          </div>
                          <div>
                            <label htmlFor="analytics-query" className="text-sm font-medium">
                              Analysis Request & Timeframe
                            </label>
                            <Input id="analytics-query" placeholder="e.g., why is conversion rate low, last 30 days" className="mt-1" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
                              User Journey
                            </Button>
                            <Button variant="outline" size="sm">
                              <Target className="h-4 w-4 mr-2" />
                              Attribution
                            </Button>
                          </div>
                          <Button className="w-full">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Generate AI Insights
                          </Button>
                          <Textarea placeholder="Advanced analytics insights with predictive modeling, user behavior analysis, attribution modeling, and actionable recommendations will appear here..." rows={8} readOnly className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-dashed border-primary/20" />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Features</CardTitle>
                      <CardDescription>Professional marketing tools and capabilities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Database className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Data Integration</span>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Auto-Optimization</span>
                          </div>
                          <Badge variant="secondary">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="h-4 w-4 text-purple-500" />
                            <span className="text-sm font-medium">Predictive Analytics</span>
                          </div>
                          <Badge variant="secondary">Learning</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">Audience Intelligence</span>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-pink-500" />
                            <span className="text-sm font-medium">Cross-Channel Sync</span>
                          </div>
                          <Badge variant="secondary">Synced</Badge>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Data
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <Bell className="h-4 w-4 mr-2" />
                            Set Alerts
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            );
          })}

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <AutomationWorkflows />
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <IntegrationManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}