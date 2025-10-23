'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  Search,
  Send,
  BarChart3,
  Bot,
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Building,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';
import Logo from '@/components/Logo';
import { LeadDetailsModal } from '@/components/LeadDetailsModal';
import { CampaignCreationModal } from '@/components/CampaignCreationModal';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  source: 'web_scraping' | 'facebook_ads' | 'google_ads' | 'outreach_response';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  createdAt: string;
  lastContact: string;
  notes: string;
}

interface Campaign {
  id: string;
  name: string;
  type: 'web_scraping' | 'outreach' | 'facebook_ads' | 'google_ads';
  status: 'active' | 'paused' | 'completed';
  leadsGenerated: number;
  conversionRate: number;
  budget: number;
  spent: number;
  createdAt: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  useEffect(() => {
    // Check if onboarding is complete (skip for demo mode)
    const isDemoMode = localStorage.getItem('demo_mode') === 'true';
    if (!isDemoMode) {
      const onboardingCompleted = localStorage.getItem('onboarding_completed');
      if (!onboardingCompleted) {
        window.location.href = '/onboarding';
        return;
      }
    }
    setIsOnboardingComplete(true);

    // Load demo data
    loadDemoData();
  }, []);

  const loadDemoData = () => {
    // Demo leads data
    const demoLeads: Lead[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        company: 'TechCorp Solutions',
        email: 'rajesh@techcorp.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, Maharashtra',
        source: 'web_scraping',
        status: 'qualified',
        score: 92,
        createdAt: '2025-01-15T10:30:00Z',
        lastContact: '2025-01-15T14:20:00Z',
        notes: 'Interested in AI automation for their sales process'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        company: 'StartupXYZ',
        email: 'priya@startupxyz.com',
        phone: '+91 87654 32109',
        location: 'Bangalore, Karnataka',
        source: 'facebook_ads',
        status: 'contacted',
        score: 88,
        createdAt: '2025-01-15T09:15:00Z',
        lastContact: '2025-01-15T11:45:00Z',
        notes: 'Responded to WhatsApp message, wants to schedule a call'
      },
      {
        id: '3',
        name: 'Anita Patel',
        company: 'GrowthCo',
        email: 'anita@growthco.com',
        phone: '+91 76543 21098',
        location: 'Delhi, NCR',
        source: 'outreach_response',
        status: 'new',
        score: 95,
        createdAt: '2025-01-15T08:45:00Z',
        lastContact: '2025-01-15T08:45:00Z',
        notes: 'High-quality lead from email campaign'
      }
    ];

    // Demo campaigns data
    const demoCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Mumbai Tech Companies Scraping',
        type: 'web_scraping',
        status: 'active',
        leadsGenerated: 47,
        conversionRate: 12.5,
        budget: 5000,
        spent: 3200,
        createdAt: '2025-01-10T00:00:00Z'
      },
      {
        id: '2',
        name: 'WhatsApp Outreach Campaign',
        type: 'outreach',
        status: 'active',
        leadsGenerated: 23,
        conversionRate: 18.2,
        budget: 2000,
        spent: 1200,
        createdAt: '2025-01-12T00:00:00Z'
      },
      {
        id: '3',
        name: 'Facebook Lead Ads - Real Estate',
        type: 'facebook_ads',
        status: 'active',
        leadsGenerated: 15,
        conversionRate: 25.0,
        budget: 10000,
        spent: 7500,
        createdAt: '2025-01-08T00:00:00Z'
      }
    ];

    setLeads(demoLeads);
    setCampaigns(demoCampaigns);
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsLeadModalOpen(true);
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    setSelectedLead(updatedLead);
  };

  const handleCampaignCreate = (newCampaign: Campaign) => {
    setCampaigns([...campaigns, newCampaign]);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'web_scraping': return <Search className="h-4 w-4" />;
      case 'facebook_ads': return <ExternalLink className="h-4 w-4" />;
      case 'google_ads': return <ExternalLink className="h-4 w-4" />;
      case 'outreach_response': return <MessageSquare className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'web_scraping': return 'Web Scraping';
      case 'facebook_ads': return 'Facebook Ads';
      case 'google_ads': return 'Google Ads';
      case 'outreach_response': return 'Outreach Response';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'qualified': return 'bg-green-500';
      case 'converted': return 'bg-purple-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'contacted': return 'Contacted';
      case 'qualified': return 'Qualified';
      case 'converted': return 'Converted';
      case 'lost': return 'Lost';
      default: return 'Unknown';
    }
  };

  if (!isOnboardingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Your AI is working 24/7 to generate qualified leads. Here's what's happening:
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Play className="h-4 w-4 mr-1" />
                All running
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">18.5%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                +3.2% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Spend</p>
                  <p className="text-2xl font-bold text-gray-900">₹11,900</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                This month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recent Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(lead.status)} text-white text-xs`}>
                            {getStatusLabel(lead.status)}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">Score: {lead.score}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Leads
                  </Button>
                </CardContent>
              </Card>

              {/* Lead Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Lead Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Web Scraping</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">47 leads</p>
                        <p className="text-xs text-gray-500">62% of total</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Facebook Ads</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">15 leads</p>
                        <p className="text-xs text-gray-500">20% of total</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Outreach Response</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">14 leads</p>
                        <p className="text-xs text-gray-500">18% of total</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          {campaign.type === 'web_scraping' && <Search className="h-6 w-6 text-blue-600" />}
                          {campaign.type === 'outreach' && <Send className="h-6 w-6 text-green-600" />}
                          {campaign.type === 'facebook_ads' && <ExternalLink className="h-6 w-6 text-purple-600" />}
                          {campaign.type === 'google_ads' && <ExternalLink className="h-6 w-6 text-red-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-gray-500">
                            {campaign.leadsGenerated} leads • {campaign.conversionRate}% conversion
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">
                          {campaign.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    All Leads
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lead
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.company}</p>
                          <p className="text-xs text-gray-400">{lead.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{lead.email}</p>
                          <p className="text-sm text-gray-500">{lead.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {getSourceIcon(lead.source)}
                            <span className="text-xs text-gray-500">{getSourceLabel(lead.source)}</span>
                          </div>
                          <Badge className={`${getStatusColor(lead.status)} text-white`}>
                            {getStatusLabel(lead.status)}
                          </Badge>
                          <Badge variant="outline">
                            {lead.score}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleLeadClick(lead)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Campaigns
                  </CardTitle>
                  <Button onClick={() => setIsCampaignModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Campaign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-6 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                            {campaign.type === 'web_scraping' && <Search className="h-8 w-8 text-blue-600" />}
                            {campaign.type === 'outreach' && <Send className="h-8 w-8 text-green-600" />}
                            {campaign.type === 'facebook_ads' && <ExternalLink className="h-8 w-8 text-purple-600" />}
                            {campaign.type === 'google_ads' && <ExternalLink className="h-8 w-8 text-red-600" />}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <p className="text-sm text-gray-500">
                              Created {new Date(campaign.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500 text-white">
                            {campaign.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{campaign.leadsGenerated}</p>
                          <p className="text-sm text-gray-500">Leads Generated</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{campaign.conversionRate}%</p>
                          <p className="text-sm text-gray-500">Conversion Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">₹{campaign.budget.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Budget</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">₹{campaign.spent.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Spent</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Generation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart will be implemented here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Source Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart will be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Business Name</label>
                        <input className="w-full p-2 border rounded-lg" defaultValue="Your Business" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Industry</label>
                        <input className="w-full p-2 border rounded-lg" defaultValue="Technology" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Lead Generation Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Web Scraping</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Outreach Campaigns</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Facebook Ads Integration</span>
                        <Button size="sm" variant="outline">Connect</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Google Ads Integration</span>
                        <Button size="sm" variant="outline">Connect</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <LeadDetailsModal
        lead={selectedLead}
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onUpdate={handleLeadUpdate}
      />

      <CampaignCreationModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        onCreate={handleCampaignCreate}
      />
    </div>
  );
}