'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Loader2,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Brain,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface ClientInsight {
  clientId: string;
  clientName: string;
  churnRisk: 'High' | 'Medium' | 'Low';
  upsellPotential: 'High' | 'Medium' | 'Low';
  lifetimeValueTrend: '↑' | '↓' | '→';
  recommendedAction: string;
  reasoning: string;
  industry?: string;
  lastPayment?: string;
  nextRenewal?: string;
  mrr?: number;
}

interface RetentionAnalysis {
  clients: ClientInsight[];
  portfolioSummary: {
    totalClients: number;
    atRiskCount: number;
    upsellOpportunities: number;
    avgLTV: number;
    churnRiskDistribution: {
      High: number;
      Medium: number;
      Low: number;
    };
  };
  recommendations: Array<{
    priority: string;
    action: string;
    expectedImpact: string;
  }>;
}

export default function AdminRetentionPage() {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<RetentionAnalysis | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientInsight | null>(null);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [retentionEmail, setRetentionEmail] = useState<string | null>(null);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Fetch client data and run analysis
  const runPortfolioAnalysis = async () => {
    setAnalyzing(true);
    try {
      // First, fetch all clients from Airtable
      const airtableApiKey = process.env.AIRTABLE_API_KEY;
      const airtableBaseId = process.env.AIRTABLE_BASE_ID;
      const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

      // In a real implementation, you'd fetch this server-side
      // For now, we'll call the API endpoint
      const clientsResponse = await fetch('/api/admin/clients');
      const clientsData = await clientsResponse.json();

      if (!clientsData.success) {
        toast.error('Failed to fetch clients');
        return;
      }

      // Transform client data for analysis
      const clientDataForAnalysis = clientsData.data.clients.map((client: any) => ({
        clientId: client.id,
        clientName: client.name || client['Client Name'] || 'Unknown',
        industry: client.industry || 'Unknown',
        startDate: client['Start Date'] || client.created_at,
        mrr: client['Plan Amount'] || client['Monthly Amount'] || 0,
        billingStatus: client['Billing Status'] || 'Active',
        lastPayment: client['Last Payment'] || null,
        nextRenewal: client['Next Renewal'] || null,
        supportTickets: client.supportTicketsCount || 0,
        leadsDelivered: client.leadsDelivered || 0,
      }));

      // Run AI analysis
      const analysisResponse = await fetch('/api/ai-retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientData: clientDataForAnalysis }),
      });

      const analysisResult = await analysisResponse.json();

      if (analysisResult.success) {
        setAnalysis(analysisResult.data.analysis);
        toast.success('Portfolio analysis completed');
      } else {
        toast.error('Failed to generate analysis');
      }
    } catch (error) {
      console.error('Error running portfolio analysis:', error);
      toast.error('Error running analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  // Generate retention email
  const generateRetentionEmail = async (client: ClientInsight) => {
    setLoadingEmail(true);
    try {
      const response = await fetch('/api/ai-followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deal: {
            client: client.clientName,
            stage: 'Renewal',
            value: client.mrr || 0,
          },
          context: `Write a friendly renewal reminder highlighting verified-lead results and value delivered. Include optional incentive (discount or upgrade). Churn risk: ${client.churnRisk}.`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRetentionEmail(data.data.message);
        trackEvent('retention_action_sent', {
          event_category: 'retention',
          event_label: 'retention_email_generated',
          client_id: client.clientId,
          churn_risk: client.churnRisk,
        });
      } else {
        toast.error('Failed to generate email');
      }
    } catch (error) {
      console.error('Error generating retention email:', error);
      toast.error('Error generating email');
    } finally {
      setLoadingEmail(false);
    }
  };

  useEffect(() => {
    runPortfolioAnalysis();
  }, []);

  const getChurnRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getUpsellBadge = (potential: string) => {
    switch (potential) {
      case 'High':
        return <Badge className="bg-green-100 text-green-800 border-green-300">High</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-slate-100 text-slate-800 border-slate-300">Low</Badge>;
      default:
        return <Badge variant="outline">{potential}</Badge>;
    }
  };

  // Prepare pie chart data
  const churnDistributionData = analysis?.portfolioSummary.churnRiskDistribution
    ? [
        { name: 'Low Risk', value: analysis.portfolioSummary.churnRiskDistribution.Low, color: '#10b981' },
        { name: 'Medium Risk', value: analysis.portfolioSummary.churnRiskDistribution.Medium, color: '#f59e0b' },
        { name: 'High Risk', value: analysis.portfolioSummary.churnRiskDistribution.High, color: '#ef4444' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Retention Intelligence</h1>
              <p className="text-slate-600">Predict churn risk and identify upsell opportunities</p>
            </div>
            <Button onClick={runPortfolioAnalysis} disabled={analyzing}>
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Portfolio Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Portfolio Health Cards */}
        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Active Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-slate-900">
                  {analysis.portfolioSummary.totalClients}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  At-Risk Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">
                  {analysis.portfolioSummary.atRiskCount}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Upsell Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {analysis.portfolioSummary.upsellOpportunities}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  Avg Lifetime Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-slate-900">
                  ₹{analysis.portfolioSummary.avgLTV.toLocaleString('en-IN')}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="health" className="mb-8">
          <TabsList>
            <TabsTrigger value="health">Portfolio Health</TabsTrigger>
            <TabsTrigger value="insights">Client Insights</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-6">
            {/* Churn Risk Distribution */}
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle>Churn Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={churnDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {churnDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* Client Insights Table */}
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle>Client Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Client</th>
                          <th className="text-left p-2">Industry</th>
                          <th className="text-left p-2">Churn Risk</th>
                          <th className="text-left p-2">Upsell Potential</th>
                          <th className="text-left p-2">Last Payment</th>
                          <th className="text-left p-2">Next Renewal</th>
                          <th className="text-left p-2">Recommended Action</th>
                          <th className="text-left p-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.clients.map((client) => (
                          <tr key={client.clientId} className="border-b hover:bg-slate-50">
                            <td className="p-2 font-medium">{client.clientName}</td>
                            <td className="p-2">{client.industry || 'N/A'}</td>
                            <td className="p-2">
                              <Badge className={getChurnRiskColor(client.churnRisk)}>
                                {client.churnRisk}
                              </Badge>
                            </td>
                            <td className="p-2">{getUpsellBadge(client.upsellPotential)}</td>
                            <td className="p-2 text-sm">
                              {client.lastPayment ? new Date(client.lastPayment).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-2 text-sm">
                              {client.nextRenewal ? new Date(client.nextRenewal).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-2 text-sm text-slate-600">{client.recommendedAction}</td>
                            <td className="p-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedClient(client);
                                  setShowClientDialog(true);
                                  setRetentionEmail(null);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            {/* AI Recommendations */}
            {analysis && analysis.recommendations && analysis.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={`p-4 border rounded-lg ${
                        rec.priority === 'High'
                          ? 'bg-red-50 border-red-200'
                          : rec.priority === 'Medium'
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{rec.action}</h4>
                        <Badge
                          className={
                            rec.priority === 'High'
                              ? 'bg-red-100 text-red-800'
                              : rec.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700">{rec.expectedImpact}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Client Detail Dialog */}
      <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedClient?.clientName}</DialogTitle>
            <DialogDescription>
              Retention analysis and recommended actions
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6 mt-4">
              {/* Risk Assessment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">Churn Risk</label>
                  <Badge className={getChurnRiskColor(selectedClient.churnRisk)}>
                    {selectedClient.churnRisk}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">Upsell Potential</label>
                  {getUpsellBadge(selectedClient.upsellPotential)}
                </div>
              </div>

              {/* LTV Trend */}
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">Lifetime Value Trend</label>
                <div className="text-2xl">
                  {selectedClient.lifetimeValueTrend === '↑' && <span className="text-green-600">↑ Increasing</span>}
                  {selectedClient.lifetimeValueTrend === '↓' && <span className="text-red-600">↓ Decreasing</span>}
                  {selectedClient.lifetimeValueTrend === '→' && <span className="text-slate-600">→ Stable</span>}
                </div>
              </div>

              {/* Recommended Action */}
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">Recommended Action</label>
                <p className="text-slate-700">{selectedClient.recommendedAction}</p>
                <p className="text-sm text-slate-500 mt-2">{selectedClient.reasoning}</p>
              </div>

              {/* Generate Retention Email */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-600">Retention Email</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateRetentionEmail(selectedClient)}
                    disabled={loadingEmail}
                  >
                    {loadingEmail ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate Email
                      </>
                    )}
                  </Button>
                </div>
                {retentionEmail && (
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <p className="text-sm text-blue-900 whitespace-pre-wrap">{retentionEmail}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send via WhatsApp
                      </Button>
                      <Button size="sm" variant="outline">
                        Send via Email
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


