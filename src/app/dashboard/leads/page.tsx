'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Star,
  TrendingUp,
  Facebook,
  Chrome,
  Zap,
  MapPin,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  source: string;
  quality_score: number;
  intent: string;
  status: string;
  lead_data: any;
  city?: string;
  received_at: string;
  last_contact_at?: string;
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    by_source: { outreach: 0, meta_ads: 0, google_ads: 0 },
    by_status: { new: 0, contacted: 0, qualified: 0, won: 0 },
    by_intent: { hot: 0, warm: 0, cold: 0 },
  });

  useEffect(() => {
    loadLeads();
  }, [activeTab, filterStatus]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      // Source filter based on active tab
      if (activeTab !== 'all') {
        params.append('source', activeTab);
      }
      
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/v2/leads?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setLeads(data.leads || []);
        setStats(data.statistics || stats);
      } else {
        toast.error('Failed to load leads');
      }
    } catch (error) {
      console.error('Load leads error:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const openChat = (leadId: string) => {
    router.push(`/dashboard/conversations?leadId=${leadId}`);
  };

  const getIntentBadge = (intent: string) => {
    const config: Record<string, { variant: any; icon: any }> = {
      hot: { variant: 'destructive', icon: TrendingUp },
      warm: { variant: 'default', icon: Star },
      cold: { variant: 'secondary', icon: Star },
    };

    const { variant, icon: Icon } = config[intent] || config.warm;

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {intent.toUpperCase()}
      </Badge>
    );
  };

  const getSourceIcon = (source: string) => {
    if (source === 'meta_ads') return <Facebook className="h-4 w-4 text-blue-600" />;
    if (source === 'google_ads') return <Chrome className="h-4 w-4 text-red-600" />;
    if (source === 'outreach_response') return <Zap className="h-4 w-4 text-green-600" />;
    return <Star className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Verified Leads</h1>
        <p className="text-gray-600">High-quality leads ready for follow-up</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-1">
              <Facebook className="h-4 w-4" /> Meta Ads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.by_source.meta_ads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-1">
              <Chrome className="h-4 w-4" /> Google Ads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.by_source.google_ads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-1">
              <Zap className="h-4 w-4" /> Outreach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.by_source.outreach}</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Leads by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Leads</TabsTrigger>
              <TabsTrigger value="outreach_response">From Outreach</TabsTrigger>
              <TabsTrigger value="meta_ads">Meta Ads</TabsTrigger>
              <TabsTrigger value="google_ads">Google Ads</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && loadLeads()}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="meeting_scheduled">Meeting Scheduled</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              {loading ? (
                <div className="text-center py-12">Loading leads...</div>
              ) : leads.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No leads in this category yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Intent</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Received</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSourceIcon(lead.source)}
                            <div>
                              <div className="font-medium">{lead.name}</div>
                              <div className="text-sm text-gray-500">{lead.phone}</div>
                            </div>
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
                          <Badge variant="outline">{lead.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" />
                            {lead.city || 'Unknown'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {new Date(lead.received_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => openChat(lead.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Open Chat
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

