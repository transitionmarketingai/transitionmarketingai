'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  FileText,
  Download,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  CreditCard,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  invoice_date: string;
  due_date: string;
  paid_at: string | null;
  payment_method: string | null;
  transaction_id: string | null;
  created_at: string;
  clients?: {
    company_name: string;
    email: string;
  };
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/invoices');
      
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }

      const data = await response.json();
      setInvoices(data.invoices || []);
    } catch (error: any) {
      console.error('Failed to fetch invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Paid</Badge>;
      case 'sent':
        return <Badge className="bg-blue-600"><Send className="h-3 w-3 mr-1" /> Sent</Badge>;
      case 'overdue':
        return <Badge className="bg-red-600"><Clock className="h-3 w-3 mr-1" /> Overdue</Badge>;
      case 'draft':
        return <Badge variant="outline"><FileText className="h-3 w-3 mr-1" /> Draft</Badge>;
      case 'cancelled':
        return <Badge variant="secondary"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clients?.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clients?.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === 'paid').length,
    sent: invoices.filter((i) => i.status === 'sent').length,
    overdue: invoices.filter((i) => {
      if (i.status === 'sent' || i.status === 'draft') {
        const dueDate = new Date(i.due_date);
        const today = new Date();
        return dueDate < today;
      }
      return i.status === 'overdue';
    }).length,
    totalRevenue: invoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.total_amount, 0),
    pendingRevenue: invoices.filter((i) => i.status !== 'paid' && i.status !== 'cancelled').reduce((sum, i) => sum + i.total_amount, 0),
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-slate-600 mt-1">Manage all client invoices and payments</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Invoices</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Paid</p>
                  <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Sent</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
                </div>
                <Send className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                </div>
                <Clock className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Revenue</p>
                  <p className="text-xl font-bold text-slate-900">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-slate-500">Pending: ₹{stats.pendingRevenue.toLocaleString('en-IN')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border border-slate-200 mt-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by invoice number, company, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle>All Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading invoices...</p>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No invoices found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => {
                    const isOverdue = invoice.status === 'sent' && new Date(invoice.due_date) < new Date();
                    return (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium font-mono">
                          {invoice.invoice_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoice.clients?.company_name || 'N/A'}</p>
                            <p className="text-xs text-slate-500">{invoice.clients?.email || ''}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">₹{invoice.total_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                            <p className="text-xs text-slate-500">Tax: ₹{invoice.tax_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {new Date(invoice.invoice_date).toLocaleDateString('en-IN')}
                        </TableCell>
                        <TableCell>
                          <div className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
                            {new Date(invoice.due_date).toLocaleDateString('en-IN')}
                            {isOverdue && <span className="ml-1">⚠️</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          {isOverdue ? (
                            <Badge className="bg-red-600"><Clock className="h-3 w-3 mr-1" /> Overdue</Badge>
                          ) : (
                            getStatusBadge(invoice.status)
                          )}
                        </TableCell>
                        <TableCell>
                          {invoice.status === 'paid' ? (
                            <div className="text-sm">
                              <p className="text-green-600 font-medium">Paid</p>
                              {invoice.paid_at && (
                                <p className="text-xs text-slate-500">
                                  {new Date(invoice.paid_at).toLocaleDateString('en-IN')}
                                </p>
                              )}
                              {invoice.payment_method && (
                                <Badge variant="outline" className="text-xs mt-1">
                                  {invoice.payment_method}
                                </Badge>
                              )}
                            </div>
                          ) : invoice.transaction_id ? (
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-blue-600" />
                              <span className="text-xs text-blue-600">Payment Link</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-sm">No payment link</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                window.open(`/api/invoices/${invoice.invoice_number}/pdf`, '_blank');
                              }}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                            {invoice.status !== 'paid' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={async () => {
                                  try {
                                    const response = await fetch(`/api/invoices/${invoice.invoice_number}/send`, {
                                      method: 'POST',
                                    });
                                    if (response.ok) {
                                      toast.success('Invoice sent successfully');
                                      fetchInvoices();
                                    } else {
                                      throw new Error('Failed to send invoice');
                                    }
                                  } catch (error: any) {
                                    toast.error(error.message || 'Failed to send invoice');
                                  }
                                }}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Send
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                window.location.href = `/admin/clients/${invoice.client_id}`;
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Client
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    );
}

