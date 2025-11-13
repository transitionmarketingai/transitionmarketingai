'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, CheckCircle, AlertCircle, FileText, MessageCircle, Copy, ExternalLink, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateWhatsAppMessage, generateWhatsAppWebUrl, formatPhoneForWhatsApp } from '@/lib/whatsapp/message-generator';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  city: string;
  avg_customer_value: string;
  current_inquiries: string;
  desired_inquiries: string;
  budget_range: string;
  has_sales_team: string;
  score: number;
  status: string;
  created_at: string;
}

interface CallRecord {
  id?: string;
  submission_id: string;
  business_name?: string;
  business_description?: string;
  ideal_customer?: string;
  is_local_or_pan_india?: string;
  current_leads_per_month?: number;
  current_lead_sources?: string;
  what_is_working?: string;
  what_is_not_working?: string;
  avg_customer_value?: number;
  lifetime_value?: string;
  capacity_per_month?: number;
  how_leads_are_handled?: string;
  has_sales_team?: boolean;
  sales_team_notes?: string;
  main_pain_points?: string;
  what_happens_if_no_change?: string;
  urgency_score?: number;
  fit_level?: string;
  recommended_pilot_investment_min?: number;
  recommended_pilot_investment_max?: number;
  target_inquiries_min?: number;
  target_inquiries_max?: number;
  notes_for_campaign_strategy?: string;
  call_outcome?: string;
  pilot_price_final?: number;
  pilot_start_date?: string;
  follow_up_date?: string;
  follow_up_channel?: string;
  final_notes?: string;
}

interface ClientDetailPageProps {
  submission: Submission;
  callRecord: CallRecord | null;
}

export default function ClientDetailPage({ submission, callRecord: initialCallRecord }: ClientDetailPageProps) {
  const router = useRouter();
  const [callRecord, setCallRecord] = useState<CallRecord>(initialCallRecord || {
    submission_id: submission.id,
    avg_customer_value: parseFloat(submission.avg_customer_value) || undefined,
    has_sales_team: submission.has_sales_team === 'yes',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pdfError, setPdfError] = useState<string>('');
  const [whatsappMessage, setWhatsappMessage] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  const updateField = (field: keyof CallRecord, value: any) => {
    setCallRecord(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch(`/api/admin/clients/${submission.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callRecord,
          status: callRecord.call_outcome === 'Pilot Sold' ? 'completed' :
                  callRecord.call_outcome === 'Not a Fit' ? 'not_fit' :
                  callRecord.call_outcome ? 'in_progress' : submission.status,
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const canGeneratePDF = () => {
    return !!(
      callRecord.recommended_pilot_investment_min &&
      callRecord.recommended_pilot_investment_max &&
      callRecord.target_inquiries_min &&
      callRecord.target_inquiries_max
    );
  };

  const handleGeneratePDF = async () => {
    setPdfError('');
    
    if (!canGeneratePDF()) {
      setPdfError('Fill in investment and target inquiries to enable PDF generation.');
      return;
    }

    try {
      const url = `/api/admin/generate-offer-pdf?submissionId=${submission.id}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        setPdfError(errorData.error || 'Failed to generate PDF');
        return;
      }

      // Get the PDF blob and trigger download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `transition-pilot-${submission.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('PDF generation error:', error);
      setPdfError('An error occurred while generating the PDF');
    }
  };

  const generateWhatsAppSummary = () => {
    try {
      const message = generateWhatsAppMessage(submission, callRecord);
      setWhatsappMessage(message);
    } catch (error) {
      console.error('Error generating WhatsApp message:', error);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!whatsappMessage) {
      generateWhatsAppSummary();
      return;
    }

    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!whatsappMessage) {
      generateWhatsAppSummary();
      return;
    }

    const whatsappUrl = generateWhatsAppWebUrl(submission.phone, whatsappMessage);
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
  };

  const canGenerateWhatsApp = () => {
    return !!(
      callRecord.recommended_pilot_investment_min &&
      callRecord.recommended_pilot_investment_max &&
      callRecord.target_inquiries_min &&
      callRecord.target_inquiries_max
    );
  };

  // Auto-generate message on mount if all required fields exist
  useEffect(() => {
    if (canGenerateWhatsApp() && !whatsappMessage) {
      generateWhatsAppSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const showPilotFields = callRecord.call_outcome === 'Pilot Sold';
  const showFollowUpFields = callRecord.call_outcome === 'Good Fit – Follow-up' || callRecord.call_outcome === 'Not Ready – Nurture';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <span className="text-slate-600 font-medium">Client Onboarding Call</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              {saveStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Saved
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Error saving
                </div>
              )}
              <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Proposal Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Proposal Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={handleGeneratePDF}
                  disabled={!canGeneratePDF()}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Offer PDF
                </Button>
                
                {!canGeneratePDF() && (
                  <p className="text-sm text-slate-600">
                    Fill in investment and target inquiries to enable PDF generation.
                  </p>
                )}
                
                {pdfError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{pdfError}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Summary */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                WhatsApp Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!canGenerateWhatsApp() && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-2" />
                    Fill in investment and target inquiries in the checklist to generate the WhatsApp summary.
                  </div>
                )}

                {canGenerateWhatsApp() && (
                  <>
                    <Button
                      onClick={generateWhatsAppSummary}
                      className="bg-green-600 hover:bg-green-700 text-white w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Generate WhatsApp Summary
                    </Button>

                    {whatsappMessage && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-semibold mb-2 block">Message Preview:</Label>
                          <Textarea
                            value={whatsappMessage}
                            readOnly
                            className="font-mono text-sm bg-white min-h-[200px]"
                            rows={12}
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            onClick={handleCopyToClipboard}
                            variant="outline"
                            className="flex-1 border-2"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                          </Button>

                          <Button
                            onClick={handleOpenWhatsApp}
                            disabled={!submission.phone || !formatPhoneForWhatsApp(submission.phone)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in WhatsApp
                          </Button>
                        </div>

                        {(!submission.phone || !formatPhoneForWhatsApp(submission.phone)) && (
                          <p className="text-xs text-red-600">
                            Client phone not available. Please add it to the submission first.
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Read-Only Summary */}
        <Card className="mb-6 border-2 border-slate-200">
          <CardHeader>
            <CardTitle>Quiz Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600 mb-1">Name</p>
                <p className="font-semibold">{submission.name}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Email</p>
                <p className="font-semibold">{submission.email}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Phone</p>
                <p className="font-semibold">{submission.phone}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Industry</p>
                <p className="font-semibold">{submission.industry}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">City</p>
                <p className="font-semibold">{submission.city}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Score</p>
                <p className="font-semibold">{submission.score}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Avg Customer Value</p>
                <p className="font-semibold">{submission.avg_customer_value}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Desired Inquiries</p>
                <p className="font-semibold">{submission.desired_inquiries}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Budget Range</p>
                <p className="font-semibold">{submission.budget_range}</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">Status</p>
                <p className="font-semibold">{submission.status || 'new'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editable Call Checklist Form */}
        <form className="space-y-6">
          {/* 1. Business Overview */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>1. Business Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="business_name">Business Name</Label>
                <Input
                  id="business_name"
                  value={callRecord.business_name || ''}
                  onChange={(e) => updateField('business_name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="business_description">Business Description</Label>
                <Textarea
                  id="business_description"
                  value={callRecord.business_description || ''}
                  onChange={(e) => updateField('business_description', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="ideal_customer">Ideal Customer</Label>
                <Textarea
                  id="ideal_customer"
                  value={callRecord.ideal_customer || ''}
                  onChange={(e) => updateField('ideal_customer', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="is_local_or_pan_india">Market Scope</Label>
                <Select
                  value={callRecord.is_local_or_pan_india || ''}
                  onValueChange={(value) => updateField('is_local_or_pan_india', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Local">Local</SelectItem>
                    <SelectItem value="Pan-India">Pan-India</SelectItem>
                    <SelectItem value="Global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 2. Current Lead Flow */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>2. Current Lead Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current_leads_per_month">Current Leads per Month</Label>
                <Input
                  id="current_leads_per_month"
                  type="number"
                  value={callRecord.current_leads_per_month || ''}
                  onChange={(e) => updateField('current_leads_per_month', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="current_lead_sources">Current Lead Sources</Label>
                <Textarea
                  id="current_lead_sources"
                  value={callRecord.current_lead_sources || ''}
                  onChange={(e) => updateField('current_lead_sources', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="what_is_working">What Is Working</Label>
                <Textarea
                  id="what_is_working"
                  value={callRecord.what_is_working || ''}
                  onChange={(e) => updateField('what_is_working', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="what_is_not_working">What Is Not Working</Label>
                <Textarea
                  id="what_is_not_working"
                  value={callRecord.what_is_not_working || ''}
                  onChange={(e) => updateField('what_is_not_working', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 3. Customer Value */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>3. Customer Value</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="avg_customer_value">Average Customer Value (₹)</Label>
                <Input
                  id="avg_customer_value"
                  type="number"
                  value={callRecord.avg_customer_value || ''}
                  onChange={(e) => updateField('avg_customer_value', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="lifetime_value">Lifetime Value</Label>
                <Input
                  id="lifetime_value"
                  value={callRecord.lifetime_value || ''}
                  onChange={(e) => updateField('lifetime_value', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="capacity_per_month">Capacity per Month</Label>
                <Input
                  id="capacity_per_month"
                  type="number"
                  value={callRecord.capacity_per_month || ''}
                  onChange={(e) => updateField('capacity_per_month', parseInt(e.target.value) || 0)}
                />
              </div>
            </CardContent>
          </Card>

          {/* 4. Sales Process */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>4. Sales Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="how_leads_are_handled">How Leads Are Handled</Label>
                <Textarea
                  id="how_leads_are_handled"
                  value={callRecord.how_leads_are_handled || ''}
                  onChange={(e) => updateField('how_leads_are_handled', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="has_sales_team">Has Sales Team</Label>
                <Switch
                  id="has_sales_team"
                  checked={callRecord.has_sales_team || false}
                  onCheckedChange={(checked) => updateField('has_sales_team', checked)}
                />
              </div>
              {callRecord.has_sales_team && (
                <div>
                  <Label htmlFor="sales_team_notes">Sales Team Notes</Label>
                  <Textarea
                    id="sales_team_notes"
                    value={callRecord.sales_team_notes || ''}
                    onChange={(e) => updateField('sales_team_notes', e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 5. Pain & Urgency */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>5. Pain & Urgency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="main_pain_points">Main Pain Points</Label>
                <Textarea
                  id="main_pain_points"
                  value={callRecord.main_pain_points || ''}
                  onChange={(e) => updateField('main_pain_points', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="what_happens_if_no_change">What Happens If No Change</Label>
                <Textarea
                  id="what_happens_if_no_change"
                  value={callRecord.what_happens_if_no_change || ''}
                  onChange={(e) => updateField('what_happens_if_no_change', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="urgency_score">Urgency Score (1-10)</Label>
                <Select
                  value={callRecord.urgency_score?.toString() || ''}
                  onValueChange={(value) => updateField('urgency_score', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency score" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 6. Our Assessment */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>6. Our Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fit_level">Fit Level</Label>
                <Select
                  value={callRecord.fit_level || ''}
                  onValueChange={(value) => updateField('fit_level', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fit level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recommended_pilot_investment_min">Recommended Investment Min (₹)</Label>
                  <Input
                    id="recommended_pilot_investment_min"
                    type="number"
                    value={callRecord.recommended_pilot_investment_min || ''}
                    onChange={(e) => updateField('recommended_pilot_investment_min', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="recommended_pilot_investment_max">Recommended Investment Max (₹)</Label>
                  <Input
                    id="recommended_pilot_investment_max"
                    type="number"
                    value={callRecord.recommended_pilot_investment_max || ''}
                    onChange={(e) => updateField('recommended_pilot_investment_max', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target_inquiries_min">Target Inquiries Min</Label>
                  <Input
                    id="target_inquiries_min"
                    type="number"
                    value={callRecord.target_inquiries_min || ''}
                    onChange={(e) => updateField('target_inquiries_min', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="target_inquiries_max">Target Inquiries Max</Label>
                  <Input
                    id="target_inquiries_max"
                    type="number"
                    value={callRecord.target_inquiries_max || ''}
                    onChange={(e) => updateField('target_inquiries_max', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes_for_campaign_strategy">Notes for Campaign Strategy</Label>
                <Textarea
                  id="notes_for_campaign_strategy"
                  value={callRecord.notes_for_campaign_strategy || ''}
                  onChange={(e) => updateField('notes_for_campaign_strategy', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* 7. Call Outcome */}
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <CardTitle>7. Call Outcome</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="call_outcome">Call Outcome</Label>
                <Select
                  value={callRecord.call_outcome || ''}
                  onValueChange={(value) => updateField('call_outcome', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pilot Sold">Pilot Sold</SelectItem>
                    <SelectItem value="Good Fit – Follow-up">Good Fit – Follow-up</SelectItem>
                    <SelectItem value="Not Ready – Nurture">Not Ready – Nurture</SelectItem>
                    <SelectItem value="Not a Fit">Not a Fit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {showPilotFields && (
                <>
                  <div>
                    <Label htmlFor="pilot_price_final">Pilot Price Final (₹)</Label>
                    <Input
                      id="pilot_price_final"
                      type="number"
                      value={callRecord.pilot_price_final || ''}
                      onChange={(e) => updateField('pilot_price_final', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pilot_start_date">Pilot Start Date</Label>
                    <Input
                      id="pilot_start_date"
                      type="date"
                      value={callRecord.pilot_start_date || ''}
                      onChange={(e) => updateField('pilot_start_date', e.target.value)}
                    />
                  </div>
                </>
              )}
              {showFollowUpFields && (
                <>
                  <div>
                    <Label htmlFor="follow_up_date">Follow-up Date</Label>
                    <Input
                      id="follow_up_date"
                      type="date"
                      value={callRecord.follow_up_date || ''}
                      onChange={(e) => updateField('follow_up_date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="follow_up_channel">Follow-up Channel</Label>
                    <Select
                      value={callRecord.follow_up_channel || ''}
                      onValueChange={(value) => updateField('follow_up_channel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="final_notes">Final Notes</Label>
                <Textarea
                  id="final_notes"
                  value={callRecord.final_notes || ''}
                  onChange={(e) => updateField('final_notes', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}

