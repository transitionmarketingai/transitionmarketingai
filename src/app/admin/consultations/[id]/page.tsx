'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  User,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string | null;
  budget_range: string | null;
  requirements: string | null;
  preferred_day: string | null;
  preferred_time: string | null;
  contact_preference: string | null;
  whatsapp_updates: boolean;
  status: string;
  notes: string | null;
  created_at: string;
}

export default function ConsultationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (consultationId) {
      fetchConsultation();
    }
  }, [consultationId]);

  const fetchConsultation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/consultations/${consultationId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch consultation');
      }

      const data = await response.json();
      setConsultation(data.consultation);
      setStatus(data.consultation.status);
      setNotes(data.consultation.notes || '');
    } catch (error: any) {
      console.error('Failed to fetch consultation:', error);
      toast.error('Failed to load consultation details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/consultations/${consultationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update consultation');
      }

      toast.success('Consultation updated successfully');
      fetchConsultation();
    } catch (error: any) {
      console.error('Failed to update consultation:', error);
      toast.error('Failed to update consultation');
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading consultation details...</p>
        </div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Consultation not found</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/admin/consultations">Back to Consultations</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/consultations">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Consultation Details</h1>
            <p className="text-slate-600 mt-1">View and manage consultation request</p>
          </div>
        </div>
        {getStatusBadge(consultation.status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Name</p>
                  <p className="text-slate-900 font-semibold">{consultation.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Company</p>
                  <p className="text-slate-900 font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    {consultation.company}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Email</p>
                  <a href={`mailto:${consultation.email}`} className="text-blue-600 hover:underline flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {consultation.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Phone</p>
                  <a href={`tel:${consultation.phone}`} className="text-blue-600 hover:underline flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {consultation.phone}
                  </a>
                </div>
                {consultation.industry && (
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Industry</p>
                    <Badge variant="outline">{consultation.industry}</Badge>
                  </div>
                )}
                {consultation.budget_range && (
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Budget Range</p>
                    <p className="text-slate-900">{consultation.budget_range}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preferred Time & Contact Preference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduling & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {consultation.preferred_day && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Preferred Day/Date</p>
                  <p className="text-slate-900">{consultation.preferred_day}</p>
                </div>
              )}
              {consultation.preferred_time && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Preferred Time</p>
                  <p className="text-slate-900">{consultation.preferred_time}</p>
                </div>
              )}
              {consultation.contact_preference && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Contact Preference</p>
                  <Badge variant="outline">{consultation.contact_preference}</Badge>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">WhatsApp Updates</p>
                {consultation.whatsapp_updates ? (
                  <Badge className="bg-green-600">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                ) : (
                  <Badge variant="outline">Disabled</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          {consultation.requirements && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 whitespace-pre-wrap">{consultation.requirements}</p>
              </CardContent>
            </Card>
          )}

          {/* Notes & Status */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">Status</p>
                <Select value={status} onValueChange={setStatus}>
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
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">Call Notes</p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes from your consultation call..."
                  className="min-h-[120px]"
                />
              </div>
              <Button
                onClick={handleUpdate}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`tel:${consultation.phone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Client
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`mailto:${consultation.email}`)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              {consultation.whatsapp_updates && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(`https://wa.me/${consultation.phone.replace(/\D/g, '')}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              )}
              {consultation.status === 'completed' && (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    router.push(`/admin/consultations/${consultationId}/onboard`);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Start Onboarding
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Information */}
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-slate-600">Request Date</p>
                <p className="text-slate-900 font-medium">
                  {new Date(consultation.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-slate-600">Consultation ID</p>
                <p className="text-slate-900 font-mono text-xs">{consultation.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

