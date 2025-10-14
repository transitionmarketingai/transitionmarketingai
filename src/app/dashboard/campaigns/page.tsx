'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Play, 
  Pause, 
  BarChart3, 
  Facebook, 
  Chrome, 
  Zap,
  Plus,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Target,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CampaignsPage() {
  const [scrapingCampaigns, setScrapingCampaigns] = useState<any[]>([]);
  const [adCampaigns, setAdCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllCampaigns();
  }, []);

  const loadAllCampaigns = async () => {
    setLoading(true);
    try {
      // Load scraping campaigns
      const scrapingRes = await fetch('/api/scraping/campaigns');
      const scrapingData = await scrapingRes.json();
      setScrapingCampaigns(scrapingData.campaigns || []);

      // Load ad campaigns
      const adRes = await fetch('/api/campaigns/ad-campaigns');
      const adData = await adRes.json();
      setAdCampaigns(adData.campaigns || []);

    } catch (error) {
      console.error('Load campaigns error:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaignStatus = async (campaignId: string, currentStatus: string, type: 'scraping' | 'ad') => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    
    try {
      const endpoint = type === 'scraping' 
        ? `/api/scraping/campaigns/${campaignId}`
        : `/api/campaigns/ad-campaigns/${campaignId}`;

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success(`Campaign ${newStatus === 'active' ? 'resumed' : 'paused'}`);
        loadAllCampaigns();
      } else {
        toast.error('Failed to update campaign');
      }
    } catch (error) {
      toast.error('Failed to update campaign');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-gray-600">Manage your lead generation campaigns</p>
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
            <div className="text-2xl font-bold">
              {scrapingCampaigns.length + adCampaigns.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {scrapingCampaigns.filter(c => c.status === 'active').length +
               adCampaigns.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Contacts/Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {scrapingCampaigns.reduce((sum, c) => sum + (c.contacts_generated || 0), 0) +
               adCampaigns.reduce((sum, c) => sum + (c.leads_generated || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(adCampaigns.reduce((sum, c) => sum + (c.spent_amount || 0), 0)).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Tabs */}
      <Tabs defaultValue="scraping">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scraping">
            <Search className="h-4 w-4 mr-2" />
            AI Scraping ({scrapingCampaigns.length})
          </TabsTrigger>
          <TabsTrigger value="meta">
            <Facebook className="h-4 w-4 mr-2" />
            Meta Ads ({adCampaigns.filter(c => c.platform === 'meta').length})
          </TabsTrigger>
          <TabsTrigger value="google">
            <Chrome className="h-4 w-4 mr-2" />
            Google Ads ({adCampaigns.filter(c => c.platform === 'google').length})
          </TabsTrigger>
        </TabsList>

        {/* AI Scraping Campaigns */}
        <TabsContent value="scraping" className="space-y-4">
          {scrapingCampaigns.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No AI scraping campaigns yet</p>
                <Button>Create Scraping Campaign</Button>
              </CardContent>
            </Card>
          ) : (
            scrapingCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{campaign.name}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Frequency: {campaign.frequency} at {campaign.schedule_time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleCampaignStatus(campaign.id, campaign.status, 'scraping')}
                      >
                        {campaign.status === 'active' ? (
                          <><Pause className="h-4 w-4 mr-1" /> Pause</>
                        ) : (
                          <><Play className="h-4 w-4 mr-1" /> Resume</>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Contacts Generated</div>
                      <div className="text-2xl font-bold">{campaign.contacts_generated || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Last Run</div>
                      <div className="text-sm">
                        {campaign.last_run_at 
                          ? new Date(campaign.last_run_at).toLocaleString()
                          : 'Never'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Next Run</div>
                      <div className="text-sm">
                        {campaign.next_run_at 
                          ? new Date(campaign.next_run_at).toLocaleString()
                          : '-'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Quality Threshold</div>
                      <div className="text-2xl font-bold">{campaign.quality_threshold}+</div>
                    </div>
                  </div>

                  {/* Search Criteria */}
                  <div className="text-sm">
                    <span className="font-medium">Search Criteria:</span>{' '}
                    {campaign.search_criteria?.locations?.join(', ') || 'Not set'}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Meta Ads Campaigns */}
        <TabsContent value="meta" className="space-y-4">
          {adCampaigns.filter(c => c.platform === 'meta').length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Facebook className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No Meta Ads campaigns yet</p>
                <Button>Create Meta Ads Campaign</Button>
              </CardContent>
            </Card>
          ) : (
            adCampaigns.filter(c => c.platform === 'meta').map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        {campaign.name}
                      </CardTitle>
                    </div>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Budget</div>
                      <div className="text-xl font-bold">₹{campaign.budget_amount?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Spent</div>
                      <div className="text-xl font-bold">₹{campaign.spent_amount?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Impressions</div>
                      <div className="text-xl font-bold">{campaign.impressions?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Clicks</div>
                      <div className="text-xl font-bold">{campaign.clicks?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Leads</div>
                      <div className="text-xl font-bold text-green-600">{campaign.leads_generated || 0}</div>
                    </div>
                  </div>
                  {campaign.budget_amount && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Budget Used</span>
                        <span>{Math.round((campaign.spent_amount / campaign.budget_amount) * 100)}%</span>
                      </div>
                      <Progress value={(campaign.spent_amount / campaign.budget_amount) * 100} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Google Ads Campaigns */}
        <TabsContent value="google" className="space-y-4">
          {adCampaigns.filter(c => c.platform === 'google').length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Chrome className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No Google Ads campaigns yet</p>
                <Button>Create Google Ads Campaign</Button>
              </CardContent>
            </Card>
          ) : (
            adCampaigns.filter(c => c.platform === 'google').map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Chrome className="h-5 w-5 text-red-600" />
                        {campaign.name}
                      </CardTitle>
                    </div>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Budget</div>
                      <div className="text-xl font-bold">₹{campaign.budget_amount?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Spent</div>
                      <div className="text-xl font-bold">₹{campaign.spent_amount?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Clicks</div>
                      <div className="text-xl font-bold">{campaign.clicks?.toLocaleString() || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Leads</div>
                      <div className="text-xl font-bold text-green-600">{campaign.leads_generated || 0}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Cost/Lead</div>
                      <div className="text-xl font-bold">
                        {campaign.cost_per_lead ? `₹${Math.round(campaign.cost_per_lead)}` : '-'}
                      </div>
                    </div>
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

