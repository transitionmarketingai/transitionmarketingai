'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  MessageCircle,
  User,
} from 'lucide-react';
import { toast } from 'sonner';

interface Consultation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  industry: string | null;
  message: string | null;
  preferred_time: string | null;
  preferred_day: string | null;
  whatsapp_updates: boolean;
  status: 'pending' | 'scheduled' | 'completed' | 'converted' | 'cancelled';
  notes: string | null;
  created_at: string;
}

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/consultations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch consultations');
      }

      const data = await response.json();
      setConsultations(data.consultations || []);
    } catch (error: any) {
      console.error('Failed to fetch consultations:', error);
      toast.error('Failed to load consultations');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (consultationId: string, newStatus: string, notes?: string) => {
    try {
      setUpdatingStatus(true);
      const response = await fetch(`/api/admin/consultations/${consultationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      toast.success('Status updated successfully');
      fetchConsultations();
      setIsDialogOpen(false);
      setSelectedConsultation(null);
    } catch (error: any) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-600"><Calendar className="h-3 w-3 mr-1" /> Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>;
      case 'converted':
        return <Badge className="bg-purple-600"><CheckCircle className="h-3 w-3 mr-1" /> Converted</Badge>;
      case 'cancelled':
        return <Badge variant="secondary"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || consultation.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: consultations.length,
    pending: consultations.filter((c) => c.status === 'pending').length,
    scheduled: consultations.filter((c) => c.status === 'scheduled').length,
    completed: consultations.filter((c) => c.status === 'completed').length,
    converted: consultations.filter((c) => c.status === 'converted').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Consultation Requests</h1>
            <p className="text-slate-600 mt-1">Manage consultation requests and convert to clients</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Converted</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.converted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === 'scheduled' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('scheduled')}
                >
                  Scheduled
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === 'converted' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('converted')}
                >
                  Converted
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consultations Table */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle>All Consultations ({filteredConsultations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading consultations...</p>
            </div>
          ) : filteredConsultations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No consultations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Preferred Time</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          {consultation.first_name} {consultation.last_name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          {consultation.company}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-slate-400" />
                            <a href={`mailto:${consultation.email}`} className="text-blue-600 hover:underline">
                              {consultation.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <a href={`tel:${consultation.phone}`} className="text-blue-600 hover:underline">
                              {consultation.phone}
                            </a>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {consultation.industry ? (
                          <Badge variant="outline">{consultation.industry}</Badge>
                        ) : (
                          <span className="text-slate-400 text-sm">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {consultation.preferred_day && (
                            <div>{consultation.preferred_day}</div>
                          )}
                          {consultation.preferred_time && (
                            <div className="text-slate-500">{consultation.preferred_time}</div>
                          )}
                          {!consultation.preferred_day && !consultation.preferred_time && (
                            <span className="text-slate-400">Flexible</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {consultation.whatsapp_updates ? (
                          <MessageCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-slate-400 text-sm">No</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {new Date(consultation.created_at).toLocaleDateString('en-IN')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedConsultation(consultation);
                            setIsDialogOpen(true);
                          }}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consultation Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Consultation Details</DialogTitle>
          </DialogHeader>
          {selectedConsultation && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Name</p>
                  <p className="text-slate-900">{selectedConsultation.first_name} {selectedConsultation.last_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Company</p>
                  <p className="text-slate-900">{selectedConsultation.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Email</p>
                  <a href={`mailto:${selectedConsultation.email}`} className="text-blue-600 hover:underline">
                    {selectedConsultation.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Phone</p>
                  <a href={`tel:${selectedConsultation.phone}`} className="text-blue-600 hover:underline">
                    {selectedConsultation.phone}
                  </a>
                </div>
              </div>

              {selectedConsultation.message && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Message</p>
                  <p className="text-slate-900 bg-slate-50 p-4 rounded-lg">{selectedConsultation.message}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">Update Status</p>
                <Select
                  defaultValue={selectedConsultation.status}
                  onValueChange={(value) => handleUpdateStatus(selectedConsultation.id, value)}
                  disabled={updatingStatus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="converted">Converted to Client</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    window.location.href = `/admin/consultations/${selectedConsultation.id}/onboard`;
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Onboard Client
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(`tel:${selectedConsultation.phone}`);
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(`mailto:${selectedConsultation.email}`);
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

