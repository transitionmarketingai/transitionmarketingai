'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
  Filter, 
  Send, 
  Mail, 
  MessageCircle, 
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building2,
  MapPin,
  Star,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  city?: string;
  state?: string;
  source: string;
  quality_score: number;
  outreach_status: string;
  outreach_attempts: number;
  last_outreach_date?: string;
  converted_to_lead: boolean;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    sent: 0,
    responded: 0,
    converted: 0,
  });

  useEffect(() => {
    loadContacts();
  }, [filterStatus, filterSource]);

  const loadContacts = async () => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterSource !== 'all') params.append('source', filterSource);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/contacts?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts || []);
        setStats(data.statistics || stats);
      } else {
        toast.error('Failed to load contacts');
      }
    } catch (error) {
      console.error('Load contacts error:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.id));
    }
  };

  const handleSelectContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleBulkOutreach = (type: 'whatsapp' | 'email') => {
    if (selectedContacts.length === 0) {
      toast.error('Please select contacts first');
      return;
    }

    // TODO: Open modal to create outreach campaign
    toast.success(`Creating ${type} campaign for ${selectedContacts.length} contacts...`);
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Contact deleted');
        loadContacts();
      } else {
        toast.error('Failed to delete contact');
      }
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any; icon: any }> = {
      pending: { label: 'Pending', variant: 'secondary', icon: Clock },
      sent: { label: 'Sent', variant: 'default', icon: Send },
      delivered: { label: 'Delivered', variant: 'default', icon: CheckCircle },
      responded: { label: 'Responded', variant: 'default', icon: MessageCircle },
      no_response: { label: 'No Response', variant: 'secondary', icon: XCircle },
      bounced: { label: 'Bounced', variant: 'destructive', icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getQualityBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-600">High ({score})</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-600">Medium ({score})</Badge>;
    return <Badge variant="destructive">Low ({score})</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Contacts</h1>
        <p className="text-gray-600">Unverified leads from AI scraping - ready for outreach</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Outreach Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Responded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.responded}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Converted to Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.converted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Contacts ({contacts.length})</CardTitle>
            <div className="flex items-center gap-2">
              {selectedContacts.length > 0 && (
                <>
                  <Button
                    onClick={() => handleBulkOutreach('whatsapp')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send WhatsApp ({selectedContacts.length})
                  </Button>
                  <Button
                    onClick={() => handleBulkOutreach('email')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email ({selectedContacts.length})
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search & Filters */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, phone, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && loadContacts()}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="no_response">No Response</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="ai_scraping">AI Scraping</SelectItem>
                <SelectItem value="manual_import">Manual Import</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadContacts}>
              <Filter className="h-4 w-4 mr-2" />
              Apply
            </Button>
          </div>

          {/* Contacts Table */}
          {loading ? (
            <div className="text-center py-12">Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No contacts found</p>
              <p className="text-sm">Contacts will appear here when AI scraping campaigns run</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === contacts.length}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contact.company || '-'}</div>
                        <div className="text-sm text-gray-500">{contact.job_title || '-'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {contact.city || 'Unknown'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getQualityBadge(contact.quality_score)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(contact.outreach_status)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {contact.source === 'ai_scraping' ? 'AI Scraping' : 'Manual'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info('Opening WhatsApp...')}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Send WhatsApp
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Opening email...')}>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteContact(contact.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

