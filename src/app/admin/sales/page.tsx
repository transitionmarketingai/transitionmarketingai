'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  Brain,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Clock,
  Eye,
  Loader2,
  Table as TableIcon,
  LayoutGrid,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Deal {
  id: string;
  dealId: string;
  leadId: string;
  client: string;
  stage: string;
  value: number;
  owner: string;
  closeProbability: number;
  nextAction: string;
  nextFollowUp: string;
  createdAt: string;
  notes: string;
  industry: string;
}

export default function AdminSalesPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showDealDialog, setShowDealDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [aiFollowUp, setAiFollowUp] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [newDeal, setNewDeal] = useState({
    client: '',
    stage: 'Qualified',
    value: '',
    owner: '',
    industry: '',
    notes: '',
  });

  // Fetch deals
  const fetchDeals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (stageFilter !== 'all') params.set('stage', stageFilter);
      if (ownerFilter !== 'all') params.set('owner', ownerFilter);

      const response = await fetch(`/api/deals?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setDeals(data.data.deals || []);
      } else {
        toast.error('Failed to fetch deals');
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast.error('Error fetching deals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [stageFilter, ownerFilter]);

  // Create new deal
  const handleCreateDeal = async () => {
    if (!newDeal.client || !newDeal.value) {
      toast.error('Client and value are required');
      return;
    }

    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: newDeal.client,
          stage: newDeal.stage,
          value: parseFloat(newDeal.value),
          owner: newDeal.owner,
          industry: newDeal.industry,
          notes: newDeal.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Deal created successfully');
        setShowCreateDialog(false);
        setNewDeal({
          client: '',
          stage: 'Qualified',
          value: '',
          owner: '',
          industry: '',
          notes: '',
        });
        fetchDeals();
      } else {
        toast.error(data.error || 'Failed to create deal');
      }
    } catch (error) {
      console.error('Error creating deal:', error);
      toast.error('Error creating deal');
    }
  };

  // Update deal stage
  const handleUpdateStage = async (dealId: string, newStage: string) => {
    try {
      const response = await fetch(`/api/deals/${dealId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Deal updated');
        fetchDeals();
        if (selectedDeal?.id === dealId) {
          setSelectedDeal({ ...selectedDeal, stage: newStage });
        }
      } else {
        toast.error(data.error || 'Failed to update deal');
      }
    } catch (error) {
      console.error('Error updating deal:', error);
      toast.error('Error updating deal');
    }
  };

  // Generate AI follow-up
  const handleGenerateFollowUp = async () => {
    if (!selectedDeal) return;

    setLoadingAI(true);
    try {
      const response = await fetch('/api/ai-followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deal: selectedDeal,
          context: `Deal is in ${selectedDeal.stage} stage with ${selectedDeal.closeProbability}% close probability.`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAiFollowUp(data.data.message);
      } else {
        toast.error('Failed to generate follow-up');
      }
    } catch (error) {
      console.error('Error generating follow-up:', error);
      toast.error('Error generating follow-up');
    } finally {
      setLoadingAI(false);
    }
  };

  // Calculate metrics
  const pipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const forecastValue = deals.reduce((sum, deal) => sum + (deal.value * (deal.closeProbability / 100)), 0);
  const closedWon = deals.filter((d) => d.stage === 'Closed-Won').length;
  const closedLost = deals.filter((d) => d.stage === 'Closed-Lost').length;
  const winRate = closedWon + closedLost > 0 ? (closedWon / (closedWon + closedLost)) * 100 : 0;

  const getProbabilityBadge = (probability: number) => {
    if (probability >= 80) {
      return <Badge className="bg-green-100 text-green-800 border-green-300">{probability}%</Badge>;
    } else if (probability >= 50) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{probability}%</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-300">{probability}%</Badge>;
    }
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'Qualified': 'bg-blue-100 text-blue-800 border-blue-300',
      'Proposal Sent': 'bg-purple-100 text-purple-800 border-purple-300',
      'Negotiation': 'bg-orange-100 text-orange-800 border-orange-300',
      'Closed-Won': 'bg-green-100 text-green-800 border-green-300',
      'Closed-Lost': 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[stage] || 'bg-slate-100 text-slate-800 border-slate-300';
  };

  const stages = ['Qualified', 'Proposal Sent', 'Negotiation', 'Closed-Won', 'Closed-Lost'];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Sales Pipeline</h1>
            <p className="text-slate-600">Manage deals from proposal to closed revenue</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <TableIcon className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Pipeline Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <p className="text-3xl font-bold text-slate-900">
                  ₹{pipelineValue.toLocaleString('en-IN')}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <p className="text-3xl font-bold text-slate-900">{winRate.toFixed(1)}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Forecast (30 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <p className="text-3xl font-bold text-slate-900">
                  ₹{forecastValue.toLocaleString('en-IN')}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Open Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">
                {deals.filter((d) => !d.stage.includes('Closed')).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  <SelectItem value="Sales 1">Sales 1</SelectItem>
                  <SelectItem value="Sales 2">Sales 2</SelectItem>
                  <SelectItem value="Manager 1">Manager 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        {viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stages.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              return (
                <div key={stage} className="flex flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-700">
                      {stage} ({stageDeals.length})
                    </h3>
                  </div>
                  <div className="space-y-3 min-h-[400px]">
                    {stageDeals.map((deal) => (
                      <Card
                        key={deal.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => {
                          setSelectedDeal(deal);
                          setShowDealDialog(true);
                          setAiFollowUp(null);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="mb-2">
                            <h4 className="font-medium text-slate-900 mb-1">{deal.client}</h4>
                            <p className="text-sm text-slate-500">{deal.industry || 'N/A'}</p>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-lg font-bold text-blue-600">
                              ₹{deal.value.toLocaleString('en-IN')}
                            </p>
                            {getProbabilityBadge(deal.closeProbability)}
                          </div>
                          <div className="text-xs text-slate-500">
                            {deal.owner || 'Unassigned'} • {deal.nextAction || 'No action'}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="text-center text-slate-400 py-8 text-sm">No deals</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <Card>
            <CardHeader>
              <CardTitle>Deals ({deals.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Deal ID</th>
                      <th className="text-left p-2">Client</th>
                      <th className="text-left p-2">Stage</th>
                      <th className="text-left p-2">Value</th>
                      <th className="text-left p-2">Probability</th>
                      <th className="text-left p-2">Owner</th>
                      <th className="text-left p-2">Next Action</th>
                      <th className="text-left p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map((deal) => (
                      <tr key={deal.id} className="border-b hover:bg-slate-50">
                        <td className="p-2 font-medium">{deal.dealId}</td>
                        <td className="p-2">{deal.client}</td>
                        <td className="p-2">
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                        </td>
                        <td className="p-2 font-semibold">₹{deal.value.toLocaleString('en-IN')}</td>
                        <td className="p-2">{getProbabilityBadge(deal.closeProbability)}</td>
                        <td className="p-2">{deal.owner || 'Unassigned'}</td>
                        <td className="p-2 text-sm text-slate-600">{deal.nextAction || 'N/A'}</td>
                        <td className="p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedDeal(deal);
                              setShowDealDialog(true);
                              setAiFollowUp(null);
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

        {/* Conversion Funnel Chart */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stages.map((stage) => ({
                stage,
                count: deals.filter((d) => d.stage === stage).length,
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Deals" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Deal Detail Dialog */}
      <Dialog open={showDealDialog} onOpenChange={setShowDealDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDeal?.client}</DialogTitle>
            <DialogDescription>
              Deal ID: {selectedDeal?.dealId} • Stage: {selectedDeal?.stage} • Value: ₹{selectedDeal?.value.toLocaleString('en-IN')}
            </DialogDescription>
          </DialogHeader>
          {selectedDeal && (
            <div className="space-y-6 mt-4">
              {/* Deal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Stage</label>
                  <Select
                    value={selectedDeal.stage}
                    onValueChange={(value) => handleUpdateStage(selectedDeal.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Close Probability</label>
                  <div className="mt-2">{getProbabilityBadge(selectedDeal.closeProbability)}</div>
                </div>
              </div>

              {/* AI Follow-Up */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-600">AI Follow-Up Message</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateFollowUp}
                    disabled={loadingAI}
                  >
                    {loadingAI ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                {aiFollowUp && (
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <p className="text-sm text-blue-900 whitespace-pre-wrap">{aiFollowUp}</p>
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

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">Notes</label>
                <textarea
                  className="w-full min-h-[100px] border border-slate-300 rounded-md p-2"
                  value={selectedDeal.notes}
                  readOnly
                  placeholder="No notes"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Deal Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Deal</DialogTitle>
            <DialogDescription>Add a new deal to the sales pipeline</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Client Name</label>
              <Input
                value={newDeal.client}
                onChange={(e) => setNewDeal({ ...newDeal, client: e.target.value })}
                placeholder="Enter client name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Stage</label>
                <Select
                  value={newDeal.stage}
                  onValueChange={(value) => setNewDeal({ ...newDeal, stage: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Value (₹)</label>
                <Input
                  type="number"
                  value={newDeal.value}
                  onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Owner</label>
                <Input
                  value={newDeal.owner}
                  onChange={(e) => setNewDeal({ ...newDeal, owner: e.target.value })}
                  placeholder="Sales 1"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Industry</label>
                <Input
                  value={newDeal.industry}
                  onChange={(e) => setNewDeal({ ...newDeal, industry: e.target.value })}
                  placeholder="Real Estate"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Notes</label>
              <textarea
                className="w-full min-h-[80px] border border-slate-300 rounded-md p-2"
                value={newDeal.notes}
                onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                placeholder="Additional notes..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDeal}>Create Deal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


