'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Loader2,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  DollarSign,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CampaignPerformance {
  campaignName: string;
  platform: 'Google' | 'Meta';
  spend: number;
  clicks: number;
  conversions: number;
  cpl: number;
  ctr: number;
  impressions?: number;
}

interface OptimizationRecommendation {
  campaignsToScale: Array<{
    campaignName: string;
    platform: string;
    currentCPL: number;
    currentCTR: number;
    recommendedBudgetIncrease: number;
    reason: string;
  }>;
  campaignsToPause: Array<{
    campaignName: string;
    platform: string;
    currentCPL: number;
    currentCTR: number;
    reason: string;
  }>;
  budgetRedistribution: {
    totalBudget: number;
    allocations: Array<{
      campaignName: string;
      platform: string;
      currentBudget: number;
      recommendedBudget: number;
      percentageChange: number;
    }>;
  };
  targetingRecommendations: Array<{
    campaignName: string;
    recommendation: string;
    expectedImpact: string;
  }>;
  creativeRecommendations: Array<{
    campaignName: string;
    recommendation: string;
    reason: string;
  }>;
}

export default function AdminAdsPage() {
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [performanceData, setPerformanceData] = useState<{
    google: any;
    meta: any;
  } | null>(null);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'google' | 'meta'>('summary');

  // Sync ad data
  const syncAds = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/ads-sync');
      const data = await response.json();

      if (data.success) {
        setPerformanceData(data.data);
        toast.success('Ad data synced successfully');
      } else {
        toast.error('Failed to sync ad data');
      }
    } catch (error) {
      console.error('Error syncing ads:', error);
      toast.error('Error syncing ads');
    } finally {
      setSyncing(false);
    }
  };

  // Run AI analysis
  const runAIAnalysis = async () => {
    if (!performanceData) {
      toast.error('Please sync ad data first');
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch('/api/ai-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ performanceData }),
      });

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data.recommendations);
        toast.success('AI analysis completed');
      } else {
        toast.error('Failed to generate recommendations');
      }
    } catch (error) {
      console.error('Error running AI analysis:', error);
      toast.error('Error running AI analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  // Apply optimization
  const applyOptimization = async (campaignName: string, platform: string, newBudget: number, currentBudget: number) => {
    try {
      // In a real implementation, you'd get the campaign ID from the performance data
      const response = await fetch('/api/ads-adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: `campaign_${campaignName}`, // Placeholder
          platform,
          newBudget,
          currentBudget,
          autoAdjustEnabled: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Budget adjusted for ${campaignName}`);
        syncAds(); // Refresh data
      } else {
        toast.error(data.error || 'Failed to adjust budget');
      }
    } catch (error) {
      console.error('Error applying optimization:', error);
      toast.error('Error applying optimization');
    }
  };

  useEffect(() => {
    syncAds();
  }, []);

  // Calculate combined metrics
  const combinedMetrics = performanceData
    ? {
        totalSpend: 0,
        totalClicks: 0,
        totalConversions: 0,
        avgCPL: 0,
        avgCTR: 0,
      }
    : null;

  if (performanceData) {
    const allCampaigns: CampaignPerformance[] = [];
    
    if (performanceData.google?.campaigns) {
      performanceData.google.campaigns.forEach((camp: any) => {
        const cost = (camp.metrics?.cost_micros || 0) / 1000000; // Convert micros to currency
        const clicks = camp.metrics?.clicks || 0;
        const conversions = camp.metrics?.conversions || 0;
        allCampaigns.push({
          campaignName: camp.campaign?.name || 'Unknown',
          platform: 'Google',
          spend: cost,
          clicks,
          conversions,
          cpl: conversions > 0 ? cost / conversions : 0,
          ctr: camp.metrics?.ctr || 0,
          impressions: camp.metrics?.impressions || 0,
        });
      });
    }

    if (performanceData.meta?.campaigns) {
      performanceData.meta.campaigns.forEach((camp: any) => {
        const spend = parseFloat(camp.spend || 0);
        const clicks = parseInt(camp.clicks || 0);
        const conversions = camp.actions?.find((a: any) => a.action_type === 'lead')?.value || 0;
        allCampaigns.push({
          campaignName: camp.campaign_name || 'Unknown',
          platform: 'Meta',
          spend,
          clicks,
          conversions,
          cpl: conversions > 0 ? spend / conversions : 0,
          ctr: parseFloat(camp.ctr || 0),
          impressions: parseInt(camp.impressions || 0),
        });
      });
    }

    if (combinedMetrics && allCampaigns.length > 0) {
      combinedMetrics.totalSpend = allCampaigns.reduce((sum, c) => sum + c.spend, 0);
      combinedMetrics.totalClicks = allCampaigns.reduce((sum, c) => sum + c.clicks, 0);
      combinedMetrics.totalConversions = allCampaigns.reduce((sum, c) => sum + c.conversions, 0);
      combinedMetrics.avgCPL =
        combinedMetrics.totalConversions > 0
          ? combinedMetrics.totalSpend / combinedMetrics.totalConversions
          : 0;
      combinedMetrics.avgCTR =
        allCampaigns.reduce((sum, c) => sum + c.ctr, 0) / allCampaigns.length;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Campaign Optimization</h1>
              <p className="text-slate-600">AI-powered ad performance analysis and optimization</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={syncAds} disabled={syncing} variant="outline">
                {syncing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Data
                  </>
                )}
              </Button>
              <Button onClick={runAIAnalysis} disabled={analyzing || !performanceData}>
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Run AI Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        {combinedMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-slate-900">
                  ₹{combinedMetrics.totalSpend.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Avg CPL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-slate-900">
                  ₹{combinedMetrics.avgCPL.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Avg CTR</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-slate-900">
                  {combinedMetrics.avgCTR.toFixed(2)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-slate-900">
                  {combinedMetrics.totalConversions}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="google">Google Ads</TabsTrigger>
            <TabsTrigger value="meta">Meta Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            {/* Spend vs Leads Chart */}
            {performanceData && (
              <Card>
                <CardHeader>
                  <CardTitle>Spend vs Leads (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="campaign" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="spend" fill="#3b82f6" name="Spend (₹)" />
                      <Bar yAxisId="right" dataKey="leads" fill="#10b981" name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* AI Recommendations */}
            {recommendations && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Campaigns to Scale */}
                  {recommendations.campaignsToScale && recommendations.campaignsToScale.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Campaigns to Scale
                      </h3>
                      <div className="space-y-3">
                        {recommendations.campaignsToScale.map((campaign, idx) => (
                          <div key={idx} className="p-4 border rounded-lg bg-green-50 border-green-200">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-green-900">{campaign.campaignName}</h4>
                                <p className="text-sm text-green-700">{campaign.platform}</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">
                                +{campaign.recommendedBudgetIncrease}%
                              </Badge>
                            </div>
                            <p className="text-sm text-green-800 mb-2">{campaign.reason}</p>
                            <div className="flex gap-2 text-xs text-green-700">
                              <span>CPL: ₹{campaign.currentCPL.toFixed(0)}</span>
                              <span>•</span>
                              <span>CTR: {campaign.currentCTR.toFixed(2)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Campaigns to Pause */}
                  {recommendations.campaignsToPause && recommendations.campaignsToPause.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        Campaigns to Pause
                      </h3>
                      <div className="space-y-3">
                        {recommendations.campaignsToPause.map((campaign, idx) => (
                          <div key={idx} className="p-4 border rounded-lg bg-red-50 border-red-200">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-red-900">{campaign.campaignName}</h4>
                                <p className="text-sm text-red-700">{campaign.platform}</p>
                              </div>
                              <Badge className="bg-red-100 text-red-800">Pause</Badge>
                            </div>
                            <p className="text-sm text-red-800">{campaign.reason}</p>
                            <div className="flex gap-2 text-xs text-red-700 mt-2">
                              <span>CPL: ₹{campaign.currentCPL.toFixed(0)}</span>
                              <span>•</span>
                              <span>CTR: {campaign.currentCTR.toFixed(2)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Creative Recommendations */}
                  {recommendations.creativeRecommendations && recommendations.creativeRecommendations.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-600" />
                        Creative Recommendations
                      </h3>
                      <div className="space-y-3">
                        {recommendations.creativeRecommendations.map((rec, idx) => (
                          <div key={idx} className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                            <h4 className="font-medium text-yellow-900 mb-1">{rec.campaignName}</h4>
                            <p className="text-sm text-yellow-800 mb-2">{rec.recommendation}</p>
                            <p className="text-xs text-yellow-700">{rec.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Approval Queue */}
            {recommendations?.budgetRedistribution?.allocations && recommendations.budgetRedistribution.allocations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Approval Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.budgetRedistribution.allocations.map((allocation, idx) => (
                      <div key={idx} className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{allocation.campaignName}</h4>
                          <p className="text-sm text-slate-600">
                            {allocation.platform} • Current: ₹{allocation.currentBudget.toLocaleString()} → Recommended: ₹{allocation.recommendedBudget.toLocaleString()}
                          </p>
                          <p className={`text-xs mt-1 ${allocation.percentageChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {allocation.percentageChange > 0 ? '+' : ''}{allocation.percentageChange.toFixed(1)}%
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => applyOptimization(
                              allocation.campaignName,
                              allocation.platform,
                              allocation.recommendedBudget,
                              allocation.currentBudget
                            )}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Apply
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="google">
            <Card>
              <CardHeader>
                <CardTitle>Google Ads Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {performanceData?.google ? (
                  <p className="text-slate-600">
                    {performanceData.google.totalCampaigns} campaigns synced
                  </p>
                ) : (
                  <p className="text-slate-500">No Google Ads data available. Click "Sync Data" to fetch.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meta">
            <Card>
              <CardHeader>
                <CardTitle>Meta Ads Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {performanceData?.meta ? (
                  <p className="text-slate-600">
                    {performanceData.meta.totalCampaigns} campaigns synced
                  </p>
                ) : (
                  <p className="text-slate-500">No Meta Ads data available. Click "Sync Data" to fetch.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


