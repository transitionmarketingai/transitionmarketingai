'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Send, 
  UserPlus, 
  Pause, 
  Play, 
  X, 
  FileText,
  DollarSign,
  Users,
  AlertCircle,
  TrendingUp,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Lead {
  id: string;
  name: string;
  business: string;
  industry: string;
  budget: string;
  goal: string;
  status: string;
  email: string;
  phone: string;
  created: string;
  reportUrl?: string;
}

interface Client {
  id: string;
  client: string;
  industry: string;
  subscription: string;
  amount: number;
  lastPayment: string;
  nextRenewal: string;
  billingStatus: string;
  email: string;
  phone: string;
  notes: string;
  razorpaySubscriptionId?: string;
  razorpayPaymentId?: string;
  invoiceUrl?: string;
}

interface BillingMetrics {
  monthlyRevenue: number;
  activeClients: number;
  failedPayments: number;
  totalClients: number;
}

export default function BillingDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'clients' | 'reports'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [billingMetrics, setBillingMetrics] = useState<BillingMetrics>({
    monthlyRevenue: 0,
    activeClients: 0,
    failedPayments: 0,
    totalClients: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showOverdue, setShowOverdue] = useState(false);
  
  // Modal states
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const [subscriptionForm, setSubscriptionForm] = useState({
    planAmount: '',
    planId: '',
    period: 'monthly' as 'monthly' | 'quarterly' | 'yearly',
  });

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (industryFilter !== 'all') params.set('industry', industryFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchTerm) params.set('search', searchTerm);

      const response = await fetch(`/api/admin/airtable/leads?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setLeads(data.data.leads || []);
      } else {
        toast.error('Failed to fetch leads');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Error fetching leads');
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients
  const fetchClients = async () => {
    try {
      const params = new URLSearchParams();
      if (showOverdue) params.set('showOverdue', 'true');

      const response = await fetch(`/api/admin/airtable/clients?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        const clientsData = data.data.clients || [];
        setClients(clientsData);
        
        // Calculate metrics
        const activeClients = clientsData.filter((c: Client) => c.billingStatus === 'Active').length;
        const failedPayments = clientsData.filter((c: Client) => c.billingStatus === 'Failed').length;
        const monthlyRevenue = clientsData
          .filter((c: Client) => c.billingStatus === 'Active')
          .reduce((sum: number, c: Client) => sum + (c.amount || 0), 0);

        setBillingMetrics({
          monthlyRevenue,
          activeClients,
          failedPayments,
          totalClients: clientsData.length,
        });
      } else {
        toast.error('Failed to fetch clients');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error fetching clients');
    }
  };

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    } else if (activeTab === 'clients') {
      fetchClients();
    } else if (activeTab === 'reports') {
      fetchClients(); // Also fetch clients for reports
    }
  }, [activeTab, industryFilter, statusFilter, searchTerm, showOverdue]);

  // Handle actions
  const handleMarkAsClient = async (leadId: string) => {
    try {
      const response = await fetch('/api/admin/airtable/mark-as-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadRecordId: leadId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Lead marked as client');
        trackEvent('lead_marked_as_client', {
          event_category: 'admin',
          event_label: 'lead_converted',
          lead_id: leadId,
        });
        fetchLeads();
        fetchClients();
      } else {
        toast.error(data.error || 'Failed to mark as client');
      }
    } catch (error) {
      console.error('Error marking as client:', error);
      toast.error('Error marking as client');
    }
  };

  const handleSendProposal = async (leadId: string) => {
    try {
      const response = await fetch('/api/send-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId: leadId, sendEmail: true }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Proposal sent successfully');
        trackEvent('proposal_sent_manual', {
          event_category: 'admin',
          event_label: 'proposal_sent_from_dashboard',
          lead_id: leadId,
        });
        fetchLeads();
      } else {
        toast.error(data.error || 'Failed to send proposal');
      }
    } catch (error) {
      console.error('Error sending proposal:', error);
      toast.error('Error sending proposal');
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      const response = await fetch('/api/admin/airtable/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId: leadId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Lead deleted');
        fetchLeads();
        setShowDeleteConfirm(false);
        setSelectedLead(null);
      } else {
        toast.error(data.error || 'Failed to delete lead');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Error deleting lead');
    }
  };

  const handleSubscriptionAction = async (action: 'pause' | 'resume' | 'cancel', subscriptionId: string, clientRecordId: string) => {
    try {
      const response = await fetch(`/api/razorpay/subscription/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId, clientRecordId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Subscription ${action}d successfully`);
        fetchClients();
      } else {
        toast.error(data.error || `Failed to ${action} subscription`);
      }
    } catch (error) {
      console.error(`Error ${action}ing subscription:`, error);
      toast.error(`Error ${action}ing subscription`);
    }
  };

  const handleCreateSubscription = async (clientId: string, clientName: string, email: string) => {
    try {
      const response = await fetch('/api/razorpay/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          email,
          planAmount: parseFloat(subscriptionForm.planAmount),
          period: subscriptionForm.period,
          planId: subscriptionForm.planId || undefined,
          clientRecordId: clientId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Subscription created successfully');
        trackEvent('subscription_created', {
          event_category: 'billing',
          event_label: 'razorpay_subscription_created',
          client_id: clientId,
        });
        setShowNewSubscription(false);
        setSubscriptionForm({ planAmount: '', planId: '', period: 'monthly' });
        fetchClients();
      } else {
        toast.error(data.error || 'Failed to create subscription');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error('Error creating subscription');
    }
  };

  const handleGenerateReport = async (client: Client) => {
    try {
      // Fetch client details from Airtable to get full data
      const response = await fetch(`/api/admin/airtable/clients`);
      const data = await response.json();
      const clientData = data.data.clients.find((c: Client) => c.id === client.id);

      if (!clientData) {
        toast.error('Client data not found');
        return;
      }

      // Generate report
      const reportResponse = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: client.client,
          business: client.client,
          industry: client.industry,
          ad_budget: `₹${client.amount.toLocaleString()}`,
          goal: 'Scale Existing Campaign',
          est_inquiries: '40–60',
        }),
      });

      if (reportResponse.ok) {
        const blob = await reportResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transition-marketing-report-${client.client.replace(/\s+/g, '-').toLowerCase()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast.success('Report generated and downloaded');
        trackEvent('client_report_generated', {
          event_category: 'admin',
          event_label: 'report_generated_from_dashboard',
          client_id: client.id,
        });
      } else {
        toast.error('Failed to generate report');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Error generating report');
    }
  };

  // Prepare chart data
  const leadsByIndustry = leads.reduce((acc: Record<string, number>, lead) => {
    acc[lead.industry] = (acc[lead.industry] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(leadsByIndustry).map(([industry, count]) => ({
    industry,
    leads: count,
  }));

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'proposal sent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'paused':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem('admin_session');
                window.location.href = '/admin/login';
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* LEADS TAB */}
          <TabsContent value="leads" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search by name, business, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="B2B">B2B</SelectItem>
                      <SelectItem value="SaaS">SaaS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Call Booked">Call Booked</SelectItem>
                      <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <Card>
              <CardHeader>
                <CardTitle>Leads ({leads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">No leads found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Industry</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Budget</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Goal</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Created</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium text-slate-900">{lead.name}</div>
                                <div className="text-sm text-slate-500">{lead.business}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-700">{lead.industry}</td>
                            <td className="py-3 px-4 text-slate-700">{lead.budget}</td>
                            <td className="py-3 px-4 text-slate-700">{lead.goal}</td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusBadgeColor(lead.status)}>
                                {lead.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-500">
                              {new Date(lead.created).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {lead.reportUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => window.open(lead.reportUrl, '_blank')}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSendProposal(lead.id)}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsClient(lead.id)}
                                >
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedLead(lead);
                                    setShowDeleteConfirm(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CLIENTS TAB */}
          <TabsContent value="clients" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant={showOverdue ? 'default' : 'outline'}
                    onClick={() => setShowOverdue(!showOverdue)}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Show Overdue Clients
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clients Table */}
            <Card>
              <CardHeader>
                <CardTitle>Clients ({clients.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : clients.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">No clients found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Client</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Industry</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Plan</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Amount</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Last Payment</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Next Renewal</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client) => (
                          <tr key={client.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4 font-medium text-slate-900">{client.client}</td>
                            <td className="py-3 px-4 text-slate-700">{client.industry}</td>
                            <td className="py-3 px-4 text-slate-700">{client.subscription}</td>
                            <td className="py-3 px-4 text-slate-700">₹{client.amount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-sm text-slate-500">
                              {client.lastPayment ? new Date(client.lastPayment).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-500">
                              {client.nextRenewal ? new Date(client.nextRenewal).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusBadgeColor(client.billingStatus)}>
                                {client.billingStatus}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {client.invoiceUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => window.open(client.invoiceUrl, '_blank')}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                )}
                                {client.razorpaySubscriptionId && (
                                  <>
                                    {client.billingStatus === 'Active' && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSubscriptionAction('pause', client.razorpaySubscriptionId!, client.id)}
                                      >
                                        <Pause className="h-4 w-4" />
                                      </Button>
                                    )}
                                    {client.billingStatus === 'Paused' && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSubscriptionAction('resume', client.razorpaySubscriptionId!, client.id)}
                                      >
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleSubscriptionAction('cancel', client.razorpaySubscriptionId!, client.id)}
                                    >
                                      <X className="h-4 w-4 text-red-600" />
                                    </Button>
                                  </>
                                )}
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSelectedClient(client)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>{client.client} - Details</DialogTitle>
                                      <DialogDescription>Client information and billing details</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label>Contact Info</Label>
                                        <p className="text-sm text-slate-600">Email: {client.email || 'N/A'}</p>
                                        <p className="text-sm text-slate-600">Phone: {client.phone || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <Label>Subscription</Label>
                                        <p className="text-sm text-slate-600">Type: {client.subscription}</p>
                                        <p className="text-sm text-slate-600">Amount: ₹{client.amount.toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <Label>Notes</Label>
                                        <textarea
                                          className="w-full min-h-[100px] border border-slate-300 rounded-md p-2 text-sm"
                                          defaultValue={client.notes}
                                          onChange={(e) => {
                                            // Update notes in Airtable
                                            fetch('/api/admin/airtable/clients', {
                                              method: 'PATCH',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({
                                                recordId: client.id,
                                                fields: { Notes: e.target.value },
                                              }),
                                            });
                                          }}
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <Button onClick={() => handleGenerateReport(client)}>
                                          <FileText className="h-4 w-4 mr-2" />
                                          Generate Report
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() => {
                                            // Send proposal for client
                                            // This would need client's lead record ID
                                            toast.info('Feature coming soon');
                                          }}
                                        >
                                          <Send className="h-4 w-4 mr-2" />
                                          Send Proposal
                                        </Button>
                                        {!client.razorpaySubscriptionId && (
                                          <Button
                                            variant="outline"
                                            onClick={() => {
                                              setSelectedClient(client);
                                              setShowNewSubscription(true);
                                            }}
                                          >
                                            <CreditCard className="h-4 w-4 mr-2" />
                                            New Subscription
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* REPORTS TAB */}
          <TabsContent value="reports" className="space-y-6">
            {/* Billing Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-slate-900">₹{billingMetrics.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Active Clients</p>
                      <p className="text-2xl font-bold text-slate-900">{billingMetrics.activeClients}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Failed Payments</p>
                      <p className="text-2xl font-bold text-slate-900">{billingMetrics.failedPayments}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Clients</p>
                      <p className="text-2xl font-bold text-slate-900">{billingMetrics.totalClients}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leads by Industry</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="leads" fill="#0053FF" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Funnel Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { month: 'Jan', leads: leads.length, proposals: leads.filter(l => l.status === 'Proposal Sent').length, clients: clients.length },
                      { month: 'Feb', leads: 0, proposals: 0, clients: 0 },
                      { month: 'Mar', leads: 0, proposals: 0, clients: 0 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="leads" stroke="#0053FF" />
                      <Line type="monotone" dataKey="proposals" stroke="#10B981" />
                      <Line type="monotone" dataKey="clients" stroke="#8B5CF6" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedLead?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedLead && handleDeleteLead(selectedLead.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New Subscription Dialog */}
      <Dialog open={showNewSubscription} onOpenChange={setShowNewSubscription}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Subscription</DialogTitle>
            <DialogDescription>
              Create a Razorpay subscription for {selectedClient?.client}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Plan Amount (₹)</Label>
              <Input
                type="number"
                value={subscriptionForm.planAmount}
                onChange={(e) => setSubscriptionForm({ ...subscriptionForm, planAmount: e.target.value })}
                placeholder="45000"
              />
            </div>
            <div>
              <Label>Plan ID (Optional)</Label>
              <Input
                value={subscriptionForm.planId}
                onChange={(e) => setSubscriptionForm({ ...subscriptionForm, planId: e.target.value })}
                placeholder="plan_xxxxxxxxxxxxx"
              />
            </div>
            <div>
              <Label>Billing Period</Label>
              <Select
                value={subscriptionForm.period}
                onValueChange={(v: any) => setSubscriptionForm({ ...subscriptionForm, period: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (selectedClient) {
                  handleCreateSubscription(selectedClient.id, selectedClient.client, selectedClient.email);
                }
              }}
            >
              Create Subscription
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

