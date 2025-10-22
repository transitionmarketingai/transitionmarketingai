'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  Search,
  Send,
  BarChart3,
  Bot,
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Building,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  X,
  Save,
  MessageCircle,
  PhoneCall,
  Mail as MailIcon
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  source: 'web_scraping' | 'facebook_ads' | 'google_ads' | 'outreach_response';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  createdAt: string;
  lastContact: string;
  notes: string;
  website?: string;
  industry?: string;
  companySize?: string;
}

interface LeadDetailsModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
}

export function LeadDetailsModal({ lead, isOpen, onClose, onUpdate }: LeadDetailsModalProps) {
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead });
    }
  }, [lead]);

  const handleSave = () => {
    if (editedLead) {
      onUpdate(editedLead);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (lead) {
      setEditedLead({ ...lead });
    }
    setIsEditing(false);
  };

  if (!lead || !editedLead) return null;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'web_scraping': return <Search className="h-4 w-4" />;
      case 'facebook_ads': return <ExternalLink className="h-4 w-4" />;
      case 'google_ads': return <ExternalLink className="h-4 w-4" />;
      case 'outreach_response': return <MessageSquare className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'web_scraping': return 'Web Scraping';
      case 'facebook_ads': return 'Facebook Ads';
      case 'google_ads': return 'Google Ads';
      case 'outreach_response': return 'Outreach Response';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'qualified': return 'bg-green-500';
      case 'converted': return 'bg-purple-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'contacted': return 'Contacted';
      case 'qualified': return 'Qualified';
      case 'converted': return 'Converted';
      case 'lost': return 'Lost';
      default: return 'Unknown';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{lead.name}</DialogTitle>
              <DialogDescription>{lead.company}</DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(lead.status)} text-white`}>
                {getStatusLabel(lead.status)}
              </Badge>
              <Badge variant="outline">Score: {lead.score}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  {isEditing ? (
                    <Input
                      value={editedLead.name}
                      onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm font-medium">{lead.name}</p>
                  )}
                </div>
                <div>
                  <Label>Company</Label>
                  {isEditing ? (
                    <Input
                      value={editedLead.company}
                      onChange={(e) => setEditedLead({ ...editedLead, company: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm font-medium">{lead.company}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      value={editedLead.email}
                      onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${lead.email}`} className="text-sm text-blue-600 hover:underline">
                        {lead.email}
                      </a>
                    </div>
                  )}
                </div>
                <div>
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input
                      value={editedLead.phone}
                      onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a href={`tel:${lead.phone}`} className="text-sm text-blue-600 hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Location</Label>
                {isEditing ? (
                  <Input
                    value={editedLead.location}
                    onChange={(e) => setEditedLead({ ...editedLead, location: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{lead.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lead Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Source</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getSourceIcon(lead.source)}
                    <span className="text-sm">{getSourceLabel(lead.source)}</span>
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  {isEditing ? (
                    <Select
                      value={editedLead.status}
                      onValueChange={(value) => setEditedLead({ ...editedLead, status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={`${getStatusColor(lead.status)} text-white mt-1`}>
                      {getStatusLabel(lead.status)}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Created</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <Label>Last Contact</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{new Date(lead.lastContact).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedLead.notes}
                  onChange={(e) => setEditedLead({ ...editedLead, notes: e.target.value })}
                  placeholder="Add notes about this lead..."
                  rows={4}
                />
              ) : (
                <p className="text-sm text-gray-700">{lead.notes || 'No notes added yet.'}</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
