'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  Star,
  Calendar,
  MapPin,
  TrendingUp,
  Clock,
  Target,
  Trophy,
  X,
  Plus,
  Loader2,
  Brain,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useLeads, useLeadStats } from '@/hooks/useLeads';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LeadPredictionCard } from '@/components/ai/LeadPredictionCard';
import { FollowUpGenerator } from '@/components/ai/FollowUpGenerator';

export default function LeadsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiTab, setAiTab] = useState('prediction');
  
  // Use real data hooks
  const { leads, loading, createLead, updateLeadStatus } = useLeads(activeTab === 'all' ? undefined : activeTab, searchTerm);
  const { stats, loading: statsLoading } = useLeadStats();

  const displayLeads = leads;

  // Add lead form state
  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    property: '',
    budget: '',
    location: '',
    timeline: '',
  });

  const handleAddLead = async () => {
    if (!newLead.name || !newLead.phone || !newLead.email) {
      toast.error('Name, phone, and email are required');
      return;
    }

    try {
      await createLead(newLead);
      setShowAddLeadModal(false);
      setNewLead({
        name: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        property: '',
        budget: '',
        location: '',
        timeline: '',
      });
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const handleOpenAI = (lead: any) => {
    setSelectedLead(lead);
    setShowAIModal(true);
    setAiTab('prediction');
  };

  const handleScoreUpdate = (newScore: number) => {
    if (selectedLead) {
      setSelectedLead({ ...selectedLead, quality_score: newScore });
      // Update the leads list
      // This would typically trigger a refetch or update local state
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, any> = {
      new: { color: 'bg-blue-100 text-blue-700', icon: Clock },
      contacted: { color: 'bg-yellow-100 text-yellow-700', icon: Phone },
      qualified: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      meeting_scheduled: { color: 'bg-purple-100 text-purple-700', icon: Calendar },
      won: { color: 'bg-green-600 text-white', icon: Trophy },
      lost: { color: 'bg-gray-300 text-gray-700', icon: X },
    };

    const { color, icon: Icon } = config[status] || config.new;

    return (
      <Badge className={color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getIntentBadge = (intent: string) => {
    if (intent === 'hot') return <Badge className="bg-red-600">🔥 Hot</Badge>;
    if (intent === 'warm') return <Badge className="bg-yellow-600">Warm</Badge>;
    return <Badge variant="secondary">Cold</Badge>;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leads Pipeline</h1>
          <p className="text-slate-600">Track your leads through each stage</p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Dialog open={showAddLeadModal} onOpenChange={setShowAddLeadModal}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead Manually
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="Enter lead name"
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="lead@example.com"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={newLead.city}
                    onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={newLead.state}
                    onChange={(e) => setNewLead({ ...newLead, state: e.target.value })}
                    placeholder="Maharashtra"
                  />
                </div>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleAddLead}
                >
                  Add Lead
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stage Stats */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('new')}>
          <CardContent className="pt-6 text-center">
            {statsLoading ? (
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-blue-600" />
            ) : (
              <div className="text-3xl font-bold text-blue-600">{stats.new}</div>
            )}
            <div className="text-sm text-gray-600 mt-1">New</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('contacted')}>
          <CardContent className="pt-6 text-center">
            {statsLoading ? (
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-yellow-600" />
            ) : (
              <div className="text-3xl font-bold text-yellow-600">{stats.contacted}</div>
            )}
            <div className="text-sm text-gray-600 mt-1">Contacted</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('qualified')}>
          <CardContent className="pt-6 text-center">
            {statsLoading ? (
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-green-600" />
            ) : (
              <div className="text-3xl font-bold text-green-600">{stats.qualified}</div>
            )}
            <div className="text-sm text-gray-600 mt-1">Qualified</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('meeting_scheduled')}>
          <CardContent className="pt-6 text-center">
            {statsLoading ? (
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-purple-600" />
            ) : (
              <div className="text-3xl font-bold text-purple-600">{stats.meeting_scheduled}</div>
            )}
            <div className="text-sm text-gray-600 mt-1">Meetings</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('won')}>
          <CardContent className="pt-6 text-center">
            {statsLoading ? (
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-green-700" />
            ) : (
              <div className="text-3xl font-bold text-green-700">{stats.won}</div>
            )}
            <div className="text-sm text-gray-600 mt-1">Won</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('lost')}>
          <CardContent className="pt-6 text-center">
            {statsLoading ? (
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-500" />
            ) : (
              <div className="text-3xl font-bold text-gray-500">{stats.lost}</div>
            )}
            <div className="text-sm text-gray-600 mt-1">Lost</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === 'all' ? 'All Leads' : `${activeTab.replace('_', ' ')} Leads`} ({displayLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="qualified">Qualified</TabsTrigger>
              <TabsTrigger value="meeting_scheduled">Meeting</TabsTrigger>
              <TabsTrigger value="won">Won</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" />
                  <p className="text-gray-500 mt-2">Loading leads...</p>
                </div>
              ) : displayLeads.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No leads in this stage</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Intent</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.phone}</div>
                            {lead.email && (
                              <div className="text-sm text-gray-500">{lead.email}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getIntentBadge(lead.intent)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{lead.quality_score}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{lead.source.replace('_', ' ')}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" />
                            {lead.city || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 gap-1"
                              onClick={() => {
                                window.location.href = `tel:${lead.phone}`;
                                toast.success(`Calling ${lead.name}...`);
                              }}
                            >
                              <Phone className="h-4 w-4" />
                              Call
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedLead(lead);
                                toast.info('Lead details opened');
                              }}
                              className="gap-1"
                            >
                              <Mail className="h-4 w-4" />
                              View Contact
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenAI(lead)}
                              className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 gap-1"
                            >
                              <Brain className="h-4 w-4" />
                              AI
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Modal */}
      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Assistant - {selectedLead?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedLead && (
            <Tabs value={aiTab} onValueChange={setAiTab} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="prediction">Lead Prediction</TabsTrigger>
                <TabsTrigger value="followup">Follow-up Generator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="prediction" className="mt-4">
                <LeadPredictionCard
                  leadId={selectedLead.id}
                  leadName={selectedLead.name}
                  currentScore={selectedLead.quality_score}
                  onScoreUpdate={handleScoreUpdate}
                />
              </TabsContent>
              
              <TabsContent value="followup" className="mt-4">
                <FollowUpGenerator
                  leadId={selectedLead.id}
                  leadName={selectedLead.name}
                  leadIndustry={selectedLead.lead_data?.industry || 'real_estate'}
                  onSequenceGenerated={(sequence) => {
                    toast.success(`Generated ${sequence.steps.length}-step follow-up sequence`);
                  }}
                />
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

