'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Building2,
  MapPin,
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  Shield,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  verification_status: 'pending' | 'verified' | 'failed' | 'in_progress';
  phone_verified: boolean;
  email_verified: boolean;
  business_verified: boolean;
  verified_at: string | null;
  verification_notes: string | null;
}

interface VerificationResult {
  phone: {
    status: 'verified' | 'failed' | 'pending';
    details?: string;
  };
  email: {
    status: 'verified' | 'failed' | 'pending';
    details?: string;
  };
  business: {
    status: 'verified' | 'failed' | 'pending';
    details?: string;
  };
}

export default function LeadVerificationPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'failed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/leads?status=${filter}`);
      if (!response.ok) throw new Error('Failed to fetch leads');
      
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const verifyLead = async (lead: Lead) => {
    try {
      setVerifying(lead.id);
      setSelectedLead(lead);

      // Simulate verification process
      const result: VerificationResult = {
        phone: { status: 'pending' },
        email: { status: 'pending' },
        business: { status: 'pending' },
      };

      // Phone verification
      const phoneResult = await verifyPhone(lead.phone);
      result.phone = phoneResult;

      // Email verification
      const emailResult = await verifyEmail(lead.email);
      result.email = emailResult;

      // Business verification
      const businessResult = await verifyBusiness(lead.company, lead.name);
      result.business = businessResult;

      // Determine overall status
      const allVerified = 
        result.phone.status === 'verified' &&
        result.email.status === 'verified' &&
        result.business.status === 'verified';

      const overallStatus = allVerified ? 'verified' : 'failed';

      // Update lead in database
      const updateResponse = await fetch(`/api/admin/leads/${lead.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_verified: result.phone.status === 'verified',
          email_verified: result.email.status === 'verified',
          business_verified: result.business.status === 'verified',
          verification_status: overallStatus,
          verification_notes: verificationNotes || `Phone: ${result.phone.details || 'N/A'}, Email: ${result.email.details || 'N/A'}, Business: ${result.business.details || 'N/A'}`,
        }),
      });

      if (!updateResponse.ok) throw new Error('Failed to update verification');

      toast.success(allVerified ? 'Lead verified successfully!' : 'Lead verification completed with some failures');
      setSelectedLead(null);
      setVerificationNotes('');
      fetchLeads();
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed');
    } finally {
      setVerifying(null);
    }
  };

  const verifyPhone = async (phone: string): Promise<{ status: 'verified' | 'failed' | 'pending'; details?: string }> => {
    try {
      // TODO: Integrate with Truecaller API or similar
      // For now, simulate with basic validation
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length >= 10 && cleaned.length <= 13) {
        return { status: 'verified', details: 'Phone number format valid' };
      }
      return { status: 'failed', details: 'Invalid phone format' };
    } catch (error) {
      return { status: 'failed', details: 'Verification service unavailable' };
    }
  };

  const verifyEmail = async (email: string): Promise<{ status: 'verified' | 'failed' | 'pending'; details?: string }> => {
    try {
      // TODO: Integrate with Hunter.io or ZeroBounce API
      // For now, simulate with basic validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        return { status: 'verified', details: 'Email format valid' };
      }
      return { status: 'failed', details: 'Invalid email format' };
    } catch (error) {
      return { status: 'failed', details: 'Verification service unavailable' };
    }
  };

  const verifyBusiness = async (company: string, name: string): Promise<{ status: 'verified' | 'failed' | 'pending'; details?: string }> => {
    try {
      // TODO: Integrate with Google Maps API
      // For now, simulate with basic validation
      if (company && company.length >= 2) {
        return { status: 'verified', details: 'Business name valid' };
      }
      return { status: 'failed', details: 'Business name missing or invalid' };
    } catch (error) {
      return { status: 'failed', details: 'Verification service unavailable' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-600">Verified</Badge>;
      case 'failed':
        return <Badge className="bg-red-600">Failed</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-600">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.includes(query) ||
        lead.company.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Lead Verification</h1>
            <p className="text-slate-600">Verify leads before delivering to clients</p>
          </div>
          <Button onClick={fetchLeads} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Total Leads</div>
            <div className="text-2xl font-bold text-slate-900">{leads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {leads.filter(l => l.verification_status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Verified</div>
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.verification_status === 'verified').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-slate-600 mb-1">Failed</div>
            <div className="text-2xl font-bold text-red-600">
              {leads.filter(l => l.verification_status === 'failed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Pending Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 text-slate-400 animate-spin mx-auto mb-4" />
              <p className="text-slate-600">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No leads found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                          <Building2 className="h-3 w-3" />
                          {lead.company}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <span className={lead.phone_verified ? 'text-green-600' : 'text-slate-600'}>
                            {lead.phone}
                            {lead.phone_verified && <CheckCircle className="h-3 w-3 inline ml-1" />}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span className={lead.email_verified ? 'text-green-600' : 'text-slate-600'}>
                            {lead.email}
                            {lead.email_verified && <CheckCircle className="h-3 w-3 inline ml-1" />}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone_verified ? (
                            <span className="text-green-600">✓ Verified</span>
                          ) : (
                            <span className="text-slate-400">Pending</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email_verified ? (
                            <span className="text-green-600">✓ Verified</span>
                          ) : (
                            <span className="text-slate-400">Pending</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {lead.business_verified ? (
                            <span className="text-green-600">✓ Verified</span>
                          ) : (
                            <span className="text-slate-400">Pending</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(lead.verification_status)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => verifyLead(lead)}
                        disabled={verifying === lead.id}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {verifying === lead.id ? (
                          <>
                            <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-3 w-3" />
                            Verify
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Verification Notes Modal/Dialog */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Add Verification Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Add any notes about this verification..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setSelectedLead(null);
                    setVerificationNotes('');
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    if (selectedLead) {
                      verifyLead(selectedLead);
                    }
                  }}
                >
                  Continue Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

