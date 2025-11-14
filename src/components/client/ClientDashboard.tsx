'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  LogOut,
  Download,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  Filter,
  MessageCircle,
  Eye,
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';

interface ClientInfo {
  id: string;
  name: string;
  email: string;
  industry: string;
  phone: string;
  status: string;
  subscription: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  date: string;
  status: string;
  industry: string;
  notes: string;
}

interface Report {
  id: string;
  name: string;
  url: string;
  date: string;
  type: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  dueDate: string | null;
  url: string;
  description: string;
}

interface KPIs {
  verifiedLeads: number;
  avgCostPerLead: number;
  conversionRate: number;
  subscriptionStatus: string;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'reports' | 'billing' | 'support'>('overview');
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [kpis, setKpis] = useState<KPIs>({
    verifiedLeads: 0,
    avgCostPerLead: 0,
    conversionRate: 0,
    subscriptionStatus: 'Active',
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [supportForm, setSupportForm] = useState({ subject: '', message: '', type: 'general' });

  // Get client token
  const getToken = () => {
    return localStorage.getItem('client_token');
  };

  // Fetch client info
  const fetchClientInfo = async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/client/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setClientInfo(data.data.client);
        setKpis((prev) => ({
          ...prev,
          subscriptionStatus: data.data.client.status,
        }));
      }
    } catch (error) {
      console.error('Error fetching client info:', error);
    }
  };

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const response = await fetch(`/api/client/leads?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setLeads(data.data.leads || []);
        
        // Calculate KPIs
        const verifiedLeads = data.data.leads.filter((l: Lead) => l.status === 'Verified').length;
        setKpis((prev) => ({
          ...prev,
          verifiedLeads,
        }));
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    }
  };

  // Fetch reports
  const fetchReports = async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/client/reports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setReports(data.data.reports || []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Fetch invoices
  const fetchInvoices = async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/client/invoices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setInvoices(data.data.invoices || []);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to load invoices');
    }
  };

  // Load data based on active tab
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchClientInfo();
      
      if (activeTab === 'leads') {
        await fetchLeads();
      } else if (activeTab === 'reports') {
        await fetchReports();
      } else if (activeTab === 'billing') {
        await fetchInvoices();
      } else if (activeTab === 'overview') {
        await Promise.all([fetchLeads(), fetchInvoices()]);
      }
      
      setLoading(false);
    };

    loadData();
  }, [activeTab, searchTerm, statusFilter]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/client/logout', { method: 'POST' });
      localStorage.removeItem('client_token');
      localStorage.removeItem('client_token_expires');
      router.push('/client/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage anyway
      localStorage.removeItem('client_token');
      localStorage.removeItem('client_token_expires');
      router.push('/client/login');
    }
  };

  // Handle support request
  const handleSupportRequest = async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/client/request-support', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supportForm),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Support request submitted successfully');
        setShowSupportDialog(false);
        setSupportForm({ subject: '', message: '', type: 'general' });
      } else {
        toast.error(data.error || 'Failed to submit support request');
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
      toast.error('Failed to submit support request');
    }
  };

  // Export leads to CSV
  const exportLeadsToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Source', 'Date', 'Status'];
    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.source,
      new Date(lead.date).toLocaleDateString(),
      lead.status,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success('Leads exported to CSV');
    trackEvent('export_csv', {
      event_category: 'client',
      event_label: 'leads_exported',
      client_id: clientInfo?.id,
    });
  };

  // Download report
  const handleDownloadReport = async (report: Report) => {
    try {
      const token = getToken();
      const response = await fetch('/api/client/reports', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId: report.id }),
      });

      const data = await response.json();

      if (data.success && data.data.reportUrl) {
        window.open(data.data.reportUrl, '_blank');
        trackEvent('client_download_report', {
          event_category: 'client',
          event_label: 'report_downloaded',
          client_id: clientInfo?.id,
          report_id: report.id,
        });
      } else {
        // Fallback to direct URL
        if (report.url) {
          window.open(report.url, '_blank');
        }
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      if (report.url) {
        window.open(report.url, '_blank');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'active':
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'failed':
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'all' && lead.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Logo size="md" />
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Client Portal</h1>
                {clientInfo && (
                  <p className="text-sm text-slate-600">{clientInfo.name}</p>
                )}
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Verified Leads (This Month)</p>
                      <p className="text-2xl font-bold text-slate-900">{kpis.verifiedLeads}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Avg Cost per Lead</p>
                      <p className="text-2xl font-bold text-slate-900">₹{kpis.avgCostPerLead.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Conversion Rate</p>
                      <p className="text-2xl font-bold text-slate-900">{kpis.conversionRate.toFixed(1)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Subscription Status</p>
                      <p className="text-lg font-bold text-slate-900">{kpis.subscriptionStatus}</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">No leads found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeads.slice(0, 5).map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{lead.email}</div>
                                <div className="text-slate-500">{lead.phone}</div>
                              </div>
                            </TableCell>
                            <TableCell>{lead.source}</TableCell>
                            <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(lead.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => setActiveTab('leads')}>
                    View All Leads
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LEADS TAB */}
          <TabsContent value="leads" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Leads ({filteredLeads.length})</CardTitle>
                <Button variant="outline" onClick={exportLeadsToCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">No leads found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Verification Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{lead.email}</div>
                                <div className="text-slate-500">{lead.phone}</div>
                              </div>
                            </TableCell>
                            <TableCell>{lead.source}</TableCell>
                            <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(lead.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* REPORTS TAB */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p>No reports available yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <Card key={report.id} className="border-2 border-slate-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <FileText className="h-8 w-8 text-blue-600" />
                              <div>
                                <h3 className="font-semibold text-slate-900">{report.name}</h3>
                                <p className="text-sm text-slate-500">
                                  {new Date(report.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button onClick={() => handleDownloadReport(report)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* BILLING TAB */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : invoices.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p>No invoices found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice #</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                            <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                            <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                            <TableCell>
                              {invoice.url && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    window.open(invoice.url, '_blank');
                                    trackEvent('client_view_invoice', {
                                      event_category: 'client',
                                      event_label: 'invoice_viewed',
                                      client_id: clientInfo?.id,
                                      invoice_id: invoice.id,
                                    });
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUPPORT TAB */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    Need help? Contact us via WhatsApp or submit a support request.
                  </p>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
                        const message = encodeURIComponent(
                          `Hi, I'm ${clientInfo?.name || 'a client'}. I need support. Client ID: ${clientInfo?.id || 'N/A'}`
                        );
                        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                    <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Request Support
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Support Request</DialogTitle>
                          <DialogDescription>
                            Fill out the form below and we'll get back to you soon.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Subject</label>
                            <Input
                              value={supportForm.subject}
                              onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                              placeholder="What do you need help with?"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Message</label>
                            <textarea
                              className="w-full min-h-[150px] border border-slate-300 rounded-md p-2"
                              value={supportForm.message}
                              onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                              placeholder="Describe your issue or question..."
                            />
                          </div>
                          <Button onClick={handleSupportRequest} className="w-full">
                            Submit Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <a
                      href="mailto:hello@transitionmarketingai.com"
                      className="text-[#0053FF] hover:underline"
                    >
                      hello@transitionmarketingai.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}`}
                      className="text-[#0053FF] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +91 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9876543210'}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Response Time</p>
                    <p className="text-slate-900">Within 24 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

