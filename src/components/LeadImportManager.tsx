'use client';

import React, { useState, useRef } from 'react';

interface ImportedLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle: string;
  source: string;
  status: 'pending' | 'validating' | 'valid' | 'invalid' | 'duplicate';
  enrichmentData?: {
    emailVerified: boolean;
    companyData: any;
    socialProfiles: string[];
    confidenceScore: number;
  };
  validation: {
    emailFormat: boolean;
    emailDeliverable?: boolean;
    phoneFormat?: boolean;
    companyExists?: boolean;
    duplicates: string[]; // IDs of duplicate leads
  };
  errors: string[];
}

interface ImportSession {
  id: string;
  fileName: string;
  fileSize: number;
  uploadProgress: number;
  validationProgress: number;
  enrichmentProgress: number;
  status: 'uploading' | 'validating' | 'enriching' | 'completed' | 'error';
  importedLeads: ImportedLead[];
  summary: {
    total: number;
    valid: number;
    invalid: number;
    duplicates: number;
    enriched: number;
    errors: number;
  };
  nextSteps?: {
    campaignAssignment: boolean;
    bulkActions: boolean;
    crmSync: boolean;
  };
}

interface FieldMapping {
  csvColumn: string;
  platformField: string;
  validationRules: string[];
  transformation?: string;
  required: boolean;
}

const REQUIRED_FIELDS = [
  { platform: 'name', label: 'Full Name', required: true },
  { platform: 'email', label: 'Email Address', required: true },
  { platform: 'company', label: 'Company Name', required: true },
  { platform: 'jobTitle', label: 'Job Title', required: false },
  { platform: 'phone', label: 'Phone Number', required: false }
];

const OPTIONAL_FIELDS = [
  { platform: 'website', label: 'Company Website', required: false },
  { platform: 'city', label: 'City', required: false },
  { platform: 'industry', label: 'Industry', required: false },
  { platform: 'linkedin', label: 'LinkedIn URL', required: false },
  { platform: 'source', label: 'Original Source', required: false }
];

export default function LeadImportManager({ onComplete, onClose }: {
  onComplete?: (leads: ImportedLead[]) => void;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentSession, setCurrentSession] = useState<ImportSession | null>(null);
  const [fieldMapping, setFieldMapping] = useState<FieldMapping[]>([]);
  const [detectedColumns, setDetectedColumns] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'upload' | 'mapping' | 'validation' | 'preview' | 'complete'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a CSV or Excel file only.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    // Start upload session
    const sessionId = `session_${Date.now()}`;
    const newSession: ImportSession = {
      id: sessionId,
      fileName: file.name,
      fileSize: file.size,
      uploadProgress: 0,
      validationProgress: 0,
      enrichmentProgress: 0,
      status: 'uploading',
      importedLeads: [],
      summary: { total: 0, valid: 0, invalid: 0, duplicates: 0, enriched: 0, errors: 0 }
    };

    setCurrentSession(newSession);

    try {
      // Simulate file upload
      await simulateFileUpload(file, sessionId);
      
      // Detect columns
      const columns = await detectCSVColumns(file);
      setDetectedColumns(columns);
      setCurrentStep('mapping');
      
    } catch (error) {
      console.error('Upload failed:', error);
      setCurrentSession(prev => prev ? { ...prev, status: 'error' } : null);
    }
  };

  // Simulate file upload with progress
  const simulateFileUpload = async (file: File, sessionId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        progress = Math.min(progress, 100);
        
        setCurrentSession(prev => prev ? { 
          ...prev, 
          uploadProgress: progress,
          status: progress >= 100 ? 'validating' : 'uploading'
        } : null);

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  // Detect CSV columns
  const detectCSVColumns = async (file: File): Promise<string[]> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const columns = lines[0]?.split(',').map(col => col.trim().replace(/"/g, '')) || [];
        resolve(columns);
      };
      reader.readAsText(file);
    });
  };

  // Initialize field mapping
  const initializeFieldMapping = async () => {
    if (!detectedColumns.length) return;

    const mappings: FieldMapping[] = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].map(field => {
      const detectedColumn = detectedColumns.find(col => 
        col.toLowerCase().includes(field.platform.toLowerCase()) ||
        col.toLowerCase().includes(field.label.toLowerCase())
      );

      return {
        csvColumn: detectedColumn || '',
        platformField: field.platform,
        validationRules: getValidationRules(field.platform),
        required: field.required
      };
    });

    setFieldMapping(mappings);
  };

  // Get validation rules for each field
  const getValidationRules = (fieldType: string): string[] => {
    const rules: Record<string, string[]> = {
      email: ['email', 'deliverable', 'unique'],
      phone: ['phone', 'format'],
      name: ['required', 'format'],
      company: ['required', 'company_exists'],
      website: ['url'],
      jobTitle: ['format']
    };
    return rules[fieldType] || [];
  };

  // Process validation
  const processValidation = async () => {
    if (!currentSession) return;

    setIsProcessing(true);
    setCurrentStep('validation');

    try {
      // TODO: Implement actual validation API call
      const mockLeads = await generateMockLeads(currentSession.summary.total);
      
      // Update session with session results
      setCurrentSession(prev => prev ? {
        ...prev,
        importedLeads: mockLeads,
        summary: {
          total: mockLeads.length,
          valid: mockLeads.filter(l => l.status === 'valid').length,
          invalid: mockLeads.filter(l => l.status === 'invalid').length,
          duplicates: mockLeads.filter(l => l.status === 'duplicate').length,
          enriched: mockLeads.filter(l => l.enrichmentData).length,
          errors: mockLeads.reduce((sum, l) => sum + l.errors.length, 0)
        },
        status: 'validating'
      } : null);

      // Simulate enrichment process
      await simulateEnrichmentProcess();
      
      setCurrentStep('preview');
      
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate mock leads for demonstration
  const generateMockLeads = async (count: number): Promise<ImportedLead[]> => {
    const sampleLeads: Partial<ImportedLead>[] = [
      { name: 'Rajesh Sharma', email: 'rajesh.sharma@techcorp.com', company: 'TechCorp Solutions', jobTitle: 'CTO', source: 'LinkedIn' },
      { name: 'Priya Singh', email: 'priya@digitalfirst.com', company: 'DigitalFirst Apps', jobTitle: 'Founder', source: 'Website' },
      { name: 'invalid@email', email: 'invalid', company: 'Test Corp', source: 'Unknown' },
      { name: 'Duplicate Lead', email: 'rajesh.sharma@techcorp.com', company: 'TechCorp Solutions', source: 'Import' }
    ];

    return Array.from({ length: Math.min(count, sampleLeads.length) }, (_, index) => ({
      id: `lead_${index}`,
      ...sampleLeads[index],
      status: determineLeadStatus(sampleLeads[index]),
      validation: validateLead(sampleLeads[index]),
      errors: generateLeadErrors(sampleLeads[index])
    } as ImportedLead));
  };

  // Determine lead status
  const determineLeadStatus = (lead: Partial<ImportedLead>): ImportedLead['status'] => {
    if (lead.email === 'invalid') return 'invalid';
    if (lead.email === 'rajesh.sharma@techcorp.com' && lead.name !== 'Rajesh Sharma') return 'duplicate';
    return 'valid';
  };

  // Validate individual lead
  const validateLead = (lead: Partial<ImportedLead>) => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email || '');
    return {
      emailFormat,
      emailDeliverable: emailFormat,
      phoneFormat: true,
      companyExists: true,
      duplicates: []
    };
  };

  // Generate lead errors
  const generateLeadErrors = (lead: Partial<ImportedLead>): string[] => {
    const errors: string[] = [];
    if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      errors.push('Invalid email format');
    }
    if (!lead.name) errors.push('Name is required');
    if (!lead.company) errors.push('Company is required');
    return errors;
  };

  // Simulate enrichment process
  const simulateEnrichmentProcess = async (): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        progress = Math.min(progress, 100);
        
        setCurrentSession(prev => prev ? {
          ...prev,
          enrichmentProgress: progress
        } : null);

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  // Complete import process
  const completeImport = () => {
    setCurrentStep('complete');
    setCurrentSession(prev => prev ? {
      ...prev,
      nextSteps: {
        campaignAssignment: true,
        bulkActions: prev.summary.valid > 0,
        crmSync: true
      }
    } : null);
  };

  // Retry validation
  const retryValidation = () => {
    setCurrentStep('validation');
    processValidation();
  };

  if (currentStep === 'upload') {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">📥</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Import Prospect List</h3>
          <p className="text-gray-600">
            Upload your CSV or Excel file to import and validate prospect data
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-4xl mb-4">📄</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Choose File to Upload</h4>
            <p className="text-gray-600 mb-4">
              Drag and drop or click to select CSV/Excel file
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Browse Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          
          <div className="mt-6 text-center">
            <a href={undefined} className="text-blue-600 hover:text-blue-700">
              Download sample CSV template →
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'mapping') {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Field Mapping</h3>
          <p className="text-gray-600">
            Map your CSV columns to our lead fields. Required fields are marked with *
          </p>
        </div>

        <div className="space-y-4">
          {[...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].map(field => (
            <div key={field.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${field.required ? 'text-red-600' : 'text-gray-700'}`}>
                  {field.label} {field.required && '*'}
                </span>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Column</option>
                {detectedColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
                <option value="">Skip this field</option>
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => { initializeFieldMapping(); processValidation(); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Validate Data →
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'validation' && currentSession) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Data</h3>
          <p className="text-gray-600">
            Validating {currentSession.fileName} and enriching prospect information...
          </p>
        </div>

        <div className="space-y-4">
          {/* Upload Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">File Upload</span>
              <span className="text-gray-600">{currentSession.uploadProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${currentSession.uploadProgress}%` }}></div>
            </div>
          </div>

          {/* Validation Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Data Validation</span>
              <span className="text-gray-600">{currentSession.validationProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${currentSession.validationProgress}%` }}></div>
            </div>
          </div>

          {/* Enrichment Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Data Enrichment</span>
              <span className="text-gray-600">{currentSession.enrichmentProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${currentSession.enrichmentProgress}%` }}></div>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Processing data...</p>
          </div>
        )}
      </div>
    );
  }

  if (currentStep === 'preview' && currentSession) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Import Summary</h3>
          <p className="text-gray-600">
            Review validated prospects before finalizing import
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{currentSession.summary.total}</div>
            <div className="text-sm text-blue-700">Total Records</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{currentSession.summary.valid}</div>
            <div className="text-sm text-green-700">Valid Prospects</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{currentSession.summary.invalid}</div>
            <div className="text-sm text-red-700">Invalid Records</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{currentSession.summary.duplicates}</div>
            <div className="text-sm text-yellow-700">Duplicates</div>
          </div>
        </div>

        {/* Sample Leads Preview */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Sample Prospects</h4>
          <div className="space-y-2">
            {currentSession.importedLeads.slice(0, 5).map(lead => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 rounded-full ${
                    lead.status === 'valid' ? 'bg-green-500' :
                    lead.status === 'invalid' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}></span>
                  <div>
                    <div className="font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-600">{lead.company} • {lead.email}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  lead.status === 'valid' ? 'bg-green-100 text-green-800' :
                  lead.status === 'invalid' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={() => setCurrentStep('upload')} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            ← Back to Upload
          </button>
          <div className="space-x-3">
            <button onClick={retryValidation} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Retry Validation
            </button>
            <button onClick={completeImport} disabled={currentSession.summary.valid === 0} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Import {currentSession.summary.valid} Valid Prospects →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'complete' && currentSession) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">✅</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Import Complete!</h3>
          <p className="text-gray-600">
            Successfully imported {currentSession.summary.valid} qualified prospects
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">🚀 Next Steps</h4>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-25">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Assign to Campaign</span>
                <span className="text-sm text-gray-600">Set up outreach automation</span>
              </div>
            </button>
            <button className="w-full text-left p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-25">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Sync to CRM</span>
                <span className="text-sm text-gray-600">Transfer to HubSpot/Salesforce</span>
              </div>
            </button>
            <button className="w-full text-left p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-25">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">AI Lead Scoring</span>
                <span className="text-sm text-gray-600">Run qualification algorithm</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={() => { onComplete?.(currentSession.importedLeads.filter(l => l.status === 'valid')); onClose(); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Continue to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return null;
}
