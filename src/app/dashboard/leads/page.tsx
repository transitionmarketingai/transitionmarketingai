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
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const DEMO_LEADS = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    source: 'meta_ads',
    quality_score: 92,
    intent: 'hot',
    status: 'new',
    city: 'Mumbai',
    received_at: new Date().toISOString(),
    lead_data: { company: 'Tech Solutions Pvt Ltd', inquiry: 'Product Demo' },
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    source: 'outreach_response',
    quality_score: 85,
    intent: 'warm',
    status: 'contacted',
    city: 'Delhi',
    received_at: new Date().toISOString(),
    lead_data: { company: 'Digital Marketing Agency', inquiry: 'Enterprise Plan' },
  },
  {
    id: '3',
    name: 'Amit Patel',
    phone: '+91 98765 43212',
    email: 'amit@example.com',
    source: 'google_ads',
    quality_score: 78,
    intent: 'warm',
    status: 'qualified',
    city: 'Bangalore',
    received_at: new Date().toISOString(),
    lead_data: { company: 'E-commerce Startup', inquiry: 'Pricing Information' },
  },
];

export default function LeadsPage() {
  const router = useRouter();
  const [leads] = useState(DEMO_LEADS);
  const [activeTab, setActiveTab] = useState('all');

  const filterLeadsByStage = (stage: string) => {
    if (stage === 'all') return leads;
    return leads.filter(l => l.status === stage);
  };

  const displayLeads = filterLeadsByStage(activeTab);

  const stats = {
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    meeting: leads.filter(l => l.status === 'meeting_scheduled').length,
    won: leads.filter(l => l.status === 'won').length,
    lost: leads.filter(l => l.status === 'lost').length,
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Leads Pipeline</h1>
          <p className="text-gray-600">Track your leads through each stage</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead Manually
        </Button>
      </div>

      {/* Stage Stats */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('new')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.new}</div>
            <div className="text-sm text-gray-600 mt-1">New</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('contacted')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.contacted}</div>
            <div className="text-sm text-gray-600 mt-1">Contacted</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('qualified')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.qualified}</div>
            <div className="text-sm text-gray-600 mt-1">Qualified</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('meeting_scheduled')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.meeting}</div>
            <div className="text-sm text-gray-600 mt-1">Meetings</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('won')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-green-700">{stats.won}</div>
            <div className="text-sm text-gray-600 mt-1">Won</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('lost')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-gray-500">{stats.lost}</div>
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
              {displayLeads.length === 0 ? (
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
                            {lead.city}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => router.push(`/dashboard/conversations?leadId=${lead.id}`)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
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
    </div>
  );
}

