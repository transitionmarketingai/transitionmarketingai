'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Mail, 
  Plus, 
  Play,
  Pause,
  BarChart3,
  Send,
  CheckCircle,
  Eye,
  Reply,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface OutreachCampaign {
  id: string;
  name: string;
  type: 'whatsapp' | 'email';
  status: string;
  total_recipients: number;
  sent_count: number;
  delivered_count: number;
  read_count?: number;
  response_count: number;
  conversion_count: number;
  created_at: string;
  launched_at?: string;
}

export default function OutreachPage() {
  const [campaigns, setCampaigns] = useState<OutreachCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadCampaigns();
  }, [activeTab]);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.append('type', activeTab);

      const response = await fetch(`/api/outreach/campaigns?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setCampaigns(data.campaigns || []);
      } else {
        toast.error('Failed to load campaigns');
      }
    } catch (error) {
      console.error('Load campaigns error:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    return {
      total: campaigns.length,
      whatsapp: campaigns.filter(c => c.type === 'whatsapp').length,
      email: campaigns.filter(c => c.type === 'email').length,
      total_sent: campaigns.reduce((sum, c) => sum + c.sent_count, 0),
      total_responses: campaigns.reduce((sum, c) => sum + c.response_count, 0),
      total_conversions: campaigns.reduce((sum, c) => sum + c.conversion_count, 0),
      avg_response_rate: campaigns.length > 0
        ? Math.round((campaigns.reduce((sum, c) => sum + c.response_count, 0) / 
            campaigns.reduce((sum, c) => sum + Math.max(c.sent_count, 1), 0)) * 100)
        : 0,
    };
  };

  const stats = calculateStats();

  const getResponseRate = (campaign: OutreachCampaign) => {
    if (campaign.sent_count === 0) return 0;
    return Math.round((campaign.response_count / campaign.sent_count) * 100);
  };

  const getConversionRate = (campaign: OutreachCampaign) => {
    if (campaign.response_count === 0) return 0;
    return Math.round((campaign.conversion_count / campaign.response_count) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Outreach Campaigns</h1>
          <p className="text-gray-600">Bulk WhatsApp & Email campaigns to contacts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-gray-500">
              {stats.whatsapp} WhatsApp, {stats.email} Email
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Messages Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total_sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.avg_response_rate}%</div>
            <div className="text-xs text-gray-500">{stats.total_responses} responses</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.total_conversions}</div>
            <div className="text-xs text-gray-500">Contacts → Leads</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="whatsapp">
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {loading ? (
            <div className="text-center py-12">Loading campaigns...</div>
          ) : campaigns.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Send className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No outreach campaigns yet</p>
                <Button>Create Your First Campaign</Button>
              </CardContent>
            </Card>
          ) : (
            campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {campaign.type === 'whatsapp' ? (
                          <MessageCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Mail className="h-5 w-5 text-blue-600" />
                        )}
                        {campaign.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {campaign.launched_at 
                          ? `Launched ${new Date(campaign.launched_at).toLocaleDateString()}`
                          : 'Not launched yet'}
                      </p>
                    </div>
                    <Badge variant={campaign.status === 'running' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Send className="h-3 w-3" /> Sent
                      </div>
                      <div className="text-xl font-bold">{campaign.sent_count}</div>
                      <div className="text-xs text-gray-500">
                        of {campaign.total_recipients}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Delivered
                      </div>
                      <div className="text-xl font-bold">{campaign.delivered_count}</div>
                    </div>
                    {campaign.type === 'email' && (
                      <div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Opened
                        </div>
                        <div className="text-xl font-bold">{campaign.read_count || 0}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Reply className="h-3 w-3" /> Responded
                      </div>
                      <div className="text-xl font-bold text-green-600">{campaign.response_count}</div>
                      <div className="text-xs text-gray-500">
                        {getResponseRate(campaign)}% rate
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Converted
                      </div>
                      <div className="text-xl font-bold text-purple-600">{campaign.conversion_count}</div>
                      <div className="text-xs text-gray-500">
                        {getConversionRate(campaign)}% rate
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Campaign Progress</span>
                      <span>{Math.round((campaign.sent_count / campaign.total_recipients) * 100)}%</span>
                    </div>
                    <Progress value={(campaign.sent_count / campaign.total_recipients) * 100} />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

