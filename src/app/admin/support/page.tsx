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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';

interface Ticket {
  id: string;
  ticketId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    from: string;
    message: string;
    timestamp: string;
  }>;
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('admin', 'true');
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (priorityFilter !== 'all') params.set('priority', priorityFilter);

      const response = await fetch(`/api/support/list?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setTickets(data.data.tickets || []);
      } else {
        toast.error('Failed to fetch tickets');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Error fetching tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter, priorityFilter]);

  // Handle view ticket
  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDialog(true);
  };

  // Handle send reply
  const handleSendReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) {
      return;
    }

    try {
      const response = await fetch('/api/support/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          message: replyMessage,
          from: 'Admin',
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Reply sent successfully');
        setReplyMessage('');
        fetchTickets();
        // Refresh selected ticket
        const updatedTicket = tickets.find((t) => t.id === selectedTicket.id);
        if (updatedTicket) {
          setSelectedTicket(updatedTicket);
        }
      } else {
        toast.error(data.error || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    }
  };

  // Handle update ticket
  const handleUpdateTicket = async (field: 'status' | 'priority' | 'assignedTo', value: string) => {
    if (!selectedTicket) return;

    try {
      const updateData: any = {};
      if (field === 'status') updateData.status = value;
      if (field === 'priority') updateData.priority = value;
      if (field === 'assignedTo') updateData.assignedTo = value;

      const response = await fetch('/api/support/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          ...updateData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Ticket updated successfully');
        fetchTickets();
        // Refresh selected ticket
        const updatedTicket = tickets.find((t) => t.id === selectedTicket.id);
        if (updatedTicket) {
          setSelectedTicket(updatedTicket);
        }
      } else {
        toast.error(data.error || 'Failed to update ticket');
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Failed to update ticket');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Open</Badge>;
      case 'in progress':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      return (
        ticket.subject.toLowerCase().includes(query) ||
        ticket.clientName.toLowerCase().includes(query) ||
        ticket.ticketId.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Support Tickets</h1>
          <p className="text-slate-600">Manage and respond to client support tickets</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by ticket ID, subject, or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets ({filteredTickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No tickets found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.ticketId}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.clientName}</div>
                            <div className="text-sm text-slate-500">{ticket.clientEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{ticket.assignedTo || 'Unassigned'}</TableCell>
                        <TableCell>{new Date(ticket.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewTicket(ticket)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Open
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
      </div>

      {/* Ticket Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTicket?.subject}</DialogTitle>
            <DialogDescription>
              Ticket ID: {selectedTicket?.ticketId} • Client: {selectedTicket?.clientName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Ticket Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select
                  value={selectedTicket?.status || ''}
                  onValueChange={(value) => handleUpdateTicket('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <Select
                  value={selectedTicket?.priority || ''}
                  onValueChange={(value) => handleUpdateTicket('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Assign To</label>
                <Input
                  value={selectedTicket?.assignedTo || ''}
                  onChange={(e) => handleUpdateTicket('assignedTo', e.target.value)}
                  placeholder="Enter name..."
                />
              </div>
            </div>

            {/* Messages Thread */}
            <div>
              <h3 className="font-semibold mb-4">Conversation</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded-lg p-4">
                {selectedTicket?.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      msg.from === 'Admin' ? 'bg-blue-50 ml-8' : 'bg-slate-50 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">{msg.from}</span>
                      <span className="text-xs text-slate-500">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-700">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Form */}
            <div className="border-t pt-4">
              <label className="text-sm font-medium mb-2 block">Your Reply</label>
              <textarea
                className="w-full min-h-[120px] border border-slate-300 rounded-md p-2"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
              />
              <Button
                onClick={handleSendReply}
                className="mt-2 bg-[#0053FF] hover:bg-[#0046E0]"
                disabled={!replyMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
