'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  Check,
  AlertCircle,
  Download,
  Trash2,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface LeadRow {
  name: string;
  email: string;
  phone: string;
  source: string;
  quality_score: number;
  data: any;
}

export default function LeadUploadPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;

  const [uploadMethod, setUploadMethod] = useState<'csv' | 'manual'>('csv');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedLeads, setParsedLeads] = useState<LeadRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Manual entry state
  const [manualLeads, setManualLeads] = useState<LeadRow[]>([
    { name: '', email: '', phone: '', source: 'manual', quality_score: 85, data: {} }
  ]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setCsvFile(file);
    await parseCSV(file);
  };

  const parseCSV = async (file: File) => {
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        toast.error('CSV file must have a header row and at least one data row');
        return;
      }

      // Parse header
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      // Find column indices
      const nameIdx = header.findIndex(h => h.includes('name'));
      const emailIdx = header.findIndex(h => h.includes('email'));
      const phoneIdx = header.findIndex(h => h.includes('phone') || h.includes('mobile') || h.includes('contact'));
      
      if (nameIdx === -1 || emailIdx === -1 || phoneIdx === -1) {
        toast.error('CSV must have columns: name, email, and phone');
        return;
      }

      // Parse data rows
      const leads: LeadRow[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length < 3) continue;

        const lead: LeadRow = {
          name: values[nameIdx] || '',
          email: values[emailIdx] || '',
          phone: values[phoneIdx] || '',
          source: 'csv_upload',
          quality_score: 85,
          data: {}
        };

        // Add any additional columns as extra data
        header.forEach((col, idx) => {
          if (idx !== nameIdx && idx !== emailIdx && idx !== phoneIdx && values[idx]) {
            lead.data[col] = values[idx];
          }
        });

        if (lead.name && lead.email && lead.phone) {
          leads.push(lead);
        }
      }

      setParsedLeads(leads);
      toast.success(`Parsed ${leads.length} leads from CSV`);

    } catch (error) {
      console.error('CSV parsing error:', error);
      toast.error('Failed to parse CSV file');
    }
  };

  const handleUpload = async () => {
    const leadsToUpload = uploadMethod === 'csv' ? parsedLeads : manualLeads.filter(l => l.name && l.email && l.phone);

    if (leadsToUpload.length === 0) {
      toast.error('No valid leads to upload');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(`/api/admin/clients/${clientId}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: leadsToUpload }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploadSuccess(true);
      toast.success(`Successfully uploaded ${result.count} leads!`);
      
      setTimeout(() => {
        router.push(`/admin/clients/${clientId}`);
      }, 2000);

    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload leads');
    } finally {
      setUploading(false);
    }
  };

  const addManualLead = () => {
    setManualLeads([...manualLeads, {
      name: '', email: '', phone: '', source: 'manual', quality_score: 85, data: {}
    }]);
  };

  const removeManualLead = (index: number) => {
    setManualLeads(manualLeads.filter((_, i) => i !== index));
  };

  const updateManualLead = (index: number, field: keyof LeadRow, value: any) => {
    const updated = [...manualLeads];
    updated[index] = { ...updated[index], [field]: value };
    setManualLeads(updated);
  };

  const downloadTemplate = () => {
    const csv = 'name,email,phone,company,location,notes\n' +
                'John Doe,john@example.com,+91-9876543210,ABC Corp,Mumbai,Interested in premium plan\n' +
                'Jane Smith,jane@example.com,+91-9876543211,XYZ Ltd,Delhi,Requested demo\n';
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead_upload_template.csv';
    a.click();
    toast.success('Template downloaded!');
  };

  if (uploadSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Successful!</h2>
            <p className="text-slate-600 mb-6">Leads have been added to the client's dashboard.</p>
            <Button asChild>
              <Link href={`/admin/clients/${clientId}`}>
                View Client Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href={`/admin/clients/${clientId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Client
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Leads</h1>
        <p className="text-slate-600">Add new verified leads to deliver to this client</p>
      </div>

      {/* Upload Method Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Choose Upload Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setUploadMethod('csv')}
              className={`p-6 border-2 rounded-lg transition-all ${
                uploadMethod === 'csv'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <FileSpreadsheet className={`h-8 w-8 mx-auto mb-3 ${
                uploadMethod === 'csv' ? 'text-blue-600' : 'text-slate-400'
              }`} />
              <p className="font-semibold text-slate-900">CSV Upload</p>
              <p className="text-sm text-slate-600 mt-1">Bulk upload from CSV file</p>
            </button>

            <button
              onClick={() => setUploadMethod('manual')}
              className={`p-6 border-2 rounded-lg transition-all ${
                uploadMethod === 'manual'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Plus className={`h-8 w-8 mx-auto mb-3 ${
                uploadMethod === 'manual' ? 'text-blue-600' : 'text-slate-400'
              }`} />
              <p className="font-semibold text-slate-900">Manual Entry</p>
              <p className="text-sm text-slate-600 mt-1">Add leads one by one</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* CSV Upload Section */}
      {uploadMethod === 'csv' && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>CSV File Upload</CardTitle>
            <CardDescription>
              Upload a CSV file with columns: name, email, phone (required). Additional columns will be saved as extra data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Download Template */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900 mb-1">Need a template?</p>
                  <p className="text-sm text-blue-700 mb-3">
                    Download our CSV template with the correct format and example data.
                  </p>
                  <Button variant="outline" size="sm" onClick={downloadTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </div>
              </div>
            </div>

            {/* File Input */}
            <div>
              <Label htmlFor="csv-file" className="mb-2 block">
                Select CSV File
              </Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
            </div>

            {/* Preview */}
            {parsedLeads.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">
                    Preview ({parsedLeads.length} leads)
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCsvFile(null);
                      setParsedLeads([]);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b sticky top-0">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium text-slate-700">Name</th>
                          <th className="text-left p-3 text-sm font-medium text-slate-700">Email</th>
                          <th className="text-left p-3 text-sm font-medium text-slate-700">Phone</th>
                          <th className="text-left p-3 text-sm font-medium text-slate-700">Extra Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedLeads.map((lead, idx) => (
                          <tr key={idx} className="border-b hover:bg-slate-50">
                            <td className="p-3 text-sm">{lead.name}</td>
                            <td className="p-3 text-sm">{lead.email}</td>
                            <td className="p-3 text-sm">{lead.phone}</td>
                            <td className="p-3 text-sm text-slate-500">
                              {Object.keys(lead.data).length > 0 ? (
                                <span>{Object.keys(lead.data).length} fields</span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Manual Entry Section */}
      {uploadMethod === 'manual' && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Manual Lead Entry</CardTitle>
                <CardDescription>Add leads one by one with full details</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addManualLead}>
                <Plus className="mr-2 h-4 w-4" />
                Add Another
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {manualLeads.map((lead, idx) => (
              <div key={idx} className="border rounded-lg p-6 relative">
                {manualLeads.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4"
                    onClick={() => removeManualLead(idx)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                )}
                
                <h4 className="font-semibold text-slate-900 mb-4">Lead #{idx + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`name-${idx}`}>Name *</Label>
                    <Input
                      id={`name-${idx}`}
                      value={lead.name}
                      onChange={(e) => updateManualLead(idx, 'name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`email-${idx}`}>Email *</Label>
                    <Input
                      id={`email-${idx}`}
                      type="email"
                      value={lead.email}
                      onChange={(e) => updateManualLead(idx, 'email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`phone-${idx}`}>Phone *</Label>
                    <Input
                      id={`phone-${idx}`}
                      value={lead.phone}
                      onChange={(e) => updateManualLead(idx, 'phone', e.target.value)}
                      placeholder="+91-9876543210"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`source-${idx}`}>Source</Label>
                    <Select
                      value={lead.source}
                      onValueChange={(value) => updateManualLead(idx, 'source', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Entry</SelectItem>
                        <SelectItem value="ai_scraping">AI Scraping</SelectItem>
                        <SelectItem value="facebook_ads">Facebook Ads</SelectItem>
                        <SelectItem value="google_ads">Google Ads</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`quality-${idx}`}>Quality Score</Label>
                    <Input
                      id={`quality-${idx}`}
                      type="number"
                      min="0"
                      max="100"
                      value={lead.quality_score}
                      onChange={(e) => updateManualLead(idx, 'quality_score', parseInt(e.target.value) || 85)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upload Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 mb-1">
                Ready to upload {uploadMethod === 'csv' ? parsedLeads.length : manualLeads.filter(l => l.name && l.email && l.phone).length} leads?
              </p>
              <p className="text-sm text-slate-600">
                Leads will be immediately available in the client's dashboard
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleUpload}
              disabled={uploading || (uploadMethod === 'csv' ? parsedLeads.length === 0 : manualLeads.every(l => !l.name || !l.email || !l.phone))}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Leads
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="mt-6 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 mb-2">Tips for best results:</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Verify all contact information before uploading</li>
                <li>Use consistent phone number format (+91-XXXXXXXXXX)</li>
                <li>Include additional data columns for better lead context</li>
                <li>Quality score affects client satisfaction and retention</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

