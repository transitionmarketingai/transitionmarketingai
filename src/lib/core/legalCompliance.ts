// ⚖️ LEGAL COMPLIANCE & DATA SOURCING INFRASTRUCTURE
// This implements legally compliant data handling and processing

export interface ComplianceFramework {
  dataSourcing: DataSourcingPolicy;
  privacy: PrivacyProtectionPolicy;
  consent: ConsentManagement;
  audit: AuditAndLogging;
}

export interface DataSourcingPolicy {
  permittedSources: LegalDataSource[];
  prohibitedSources: ProhibitedDataSource[];
  attributionRequirements: AttributionRule[];
  updateFrequency: UpdateFrequency;
}

export interface LegalDataSource {
  source: string;
  accessMethod: 'API' | 'Direct Upload' | 'CRM Integration' | 'Business Directory';
  legalityStatus: 'Verified Legal' | 'Standard Contract' | 'Requires Review';
  costPerQuery?: number;
  limitations: string[];
  requiresConsent: boolean;
}

export interface ProhibitedDataSource {
  source: string;
  reason: string;
  risks: string[];
  alternatives: string[];
}

export interface AttributionRule {
  dataType: string;
  requiredFields: string[];
  displayFormat: string;
  retentionPeriod: string;
}

export interface UpdateFrequency {
  dataSource: string;
  updateInterval: 'Real-time' | 'Daily' | 'Weekly' | 'Monthly';
  automatedRefresh: boolean;
  manualReviewRequired: boolean;
}

// 🏛️ LEGAL DATA SOURCING INFRASTRUCTURE
export const LEGAL_DATA_SOURCES: LegalDataSource[] = [
  {
    source: 'LinkedIn Sales Navigator API',
    accessMethod: 'API',
    legalityStatus: 'Verified Legal',
    costPerQuery: 0.05, // ₹5 per query
    limitations: [
      'Commercial use requires paid license',
      'Rate limited to 100 requests/day on basic plan',
      'Cannot export contact data without explicit consent',
      'Must comply with LinkedIn Developer Terms'
    ],
    requiresConsent: true
  },
  
  {
    source: 'HubSpot CRM Integration',
    accessMethod: 'CRM Integration',
    legalityStatus: 'Verified Legal',
    limitations: [
      'Data ownership remains with customer',
      'Cannot access data without customer permission',
      'Sync only data customer explicitly selects',
      'Respect HubSpot data export policies'
    ],
    requiresConsent: true
  },
  
  {
    source: 'Salesforce CRM Integration',
    accessMethod: 'CRM Integration',
    legalityStatus: 'Verified Legal',
    limitations: [
      'Requires Salesforce admin approval',
      'Limited to Standard and Custom Objects',
      'Cannot access Personal Identifiable Information without consent',
      'Subject to Salesforce Data Sharing Rules'
    ],
    requiresConsent: true
  },
  
  {
    source: 'Google My Business API',
    accessMethod: 'API',
    legalityStatus: 'Verified Legal',
    costPerQuery: 0.02, // ₹2 per query
    limitations: [
      'Public business information only',
      'Cannot access private business data',
      'Rate limited to 1000 queries/day',
      'Must comply with Google Maps Platform terms'
    ],
    requiresConsent: false // Public business data
  },
  
  {
    source: 'Customer Data Upload',
    accessMethod: 'Direct Upload',
    legalityStatus: 'Verified Legal',
    limitations: [
      'Customer owns all uploaded data',
      'Must comply with data source origin legally',
      'Customer responsible for consent compliance',
      'Data retention limited to customer subscription period'
    ],
    requiresConsent: true
  },
  
  {
    source: 'Yellow Pages India API',
    accessMethod: 'API',
    legalityStatus: 'Standard Contract',
    costPerQuery: 0.01, // ₹1 per query
    limitations: [
      'Public directory information only',
      //Monthly quotas apply',
      'Cannot store data permanently without license',
      'Must attribute Yellow Pages in results'
    ],
    requiresConsent: false // Public directory data
  },
  
  {
    source: 'Indian Company Registrations Database',
    accessMethod: 'API',
    legalityStatus: 'Verified Legal',
    costPerQuery: 0.03, // ₹3 per query
    limitations: [
      'MCA-registered companies only',
      'Public company information only',
      'Cannot access private financial data',
      'Must comply with corporate data protection rules'
    ],
    requiresConsent: false // Public corporate data
  },
  
  {
    source: 'Zoho CRM Integration',
    accessMethod: 'CRM Integration',
    legalityStatus: 'Standard Contract',
    limitations: [
      'Indian data residency requirements',
      'Limited to CRM objects customer shares',
      'Cannot access contact data without permission',
      'Complies with Indian data protection regulations'
    ],
    requiresConsent: true
  }
];

export const PROHIBITED_DATA_SOURCES: ProhibitedDataSource[] = [
  {
    source: 'LinkedIn Profile Scraping',
    reason: 'Violates LinkedIn Terms of Service',
    risks: [
      'Account suspension',
      'Legal action from Microsoft/LinkedIn',
      'Platform shutdown',
      'Damage to business reputation'
    ],
    alternatives: [
      'Use LinkedIn Sales Navigator API',
      'Request connections from prospects',
      'Use LinkedIn messaging within ToS',
      'Focus on other channels'
    ]
  },
  
  {
    source: 'Website Email Scraping',
    reason: 'Creates spam risk and legal liability',
    risks: [
      'CAN-SPAM Act violations',
      'GDPR violations',
      'Reputation damage',
      'Professional network destruction'
    ],
    alternatives: [
      'Source from opt-in lists',
      'Use permission-based email marketing',
      'Request email via contact forms',
      'Focus on other communication channels'
    ]
  },
  
  {
    source: 'Social Media Data Mining',
    reason: 'Privacy violations and platform ToS',
    risks: [
      'Privacy law violations',
      'Platform account termination',
      'Legal repercussions',
      'Public criticism'
    ],
    alternatives: [
      'Use social media advertising APIs',
      'Engage with public content only',
      'Focus on content marketing',
      'Utilize employee advocacy programs'
    ]
  }
];

// 🛡️ PRIVACY PROTECTION FRAMEWORK
export interface PrivacyProtectionPolicy {
  dataCollection: DataCollectionStandards;
  processing: DataProcessingRules;
  storage: DataStorageSecurity;
  deletion: DataDeletionPolicies;
  access: DataAccessControls;
}

export interface DataCollectionStandards {
  minimizationPrinciple: boolean; // Only collect necessary data
  purposeSpecificity: boolean; // Data used only for stated purposes
  consentBeforeCollection: boolean; // Always ask before collecting
  dataAccuracy: boolean; // Ensure data is accurate and up-to-date
}

export interface DataProcessingRules {
  lawfulBasis: LawfulBasis[];
  processingLimitations: ProcessingLimitation[];
  automatedDecisionMaking: AutomatedDecisionPolicy;
}

export interface LawfulBasis {
  basis: string;
  applicableFor: string[];
  documentationRequired: string[];
}

export interface ProcessingLimitation {
  purpose: string;
  limitations: string[];
  dataRetentionPeriod: string;
}

export interface AutomatedDecisionPolicy {
  allowed: boolean;
  requiresExplanation: boolean;
  humanReviewRequired: boolean;
  optOutAvailable: boolean;
}

export interface DataStorageSecurity {
  encryptionAtRest: boolean;
  encryptionInTransit: boolean;
  accessControl: string[];
  auditLogging: boolean;
  geographicRestriction: string[];
}

export interface DataDeletionPolicies {
  automaticDeletionSchedule: DeletionSchedule[];
  onRequestDeletion: boolean;
  completeDataPurge: boolean;
  deletionConfirmation: boolean;
}

export interface DeletionSchedule {
  trigger: string;
  action: string;
  timeframe: string;
  notificationRequired: boolean;
}

export interface DataAccessControls {
  roleBasedAccess: RoleBasedAccess[];
  auditTrail: boolean;
  permissionLogging: boolean;
  accessRevocationPolicy: string;
}

export interface RoleBasedAccess {
  role: string;
  permissions: string[];
  dataAccessLevel: string;
}

export const PRIVACY_PROTECTION_POLICY: PrivacyProtectionPolicy = {
  dataCollection: {
    minimizationPrinciple: true,
    purposeSpecificity: true,
    consentBeforeCollection: true,
    dataAccuracy: true
  },
  
  processing: {
    lawfulBasis: [
      {
        basis: 'Consent',
        applicableFor: ['Personal Email Addresses', 'Phone Numbers', 'Social Profiles'],
        documentationRequired: ['Consent Timestamp', 'Consent Purpose', 'Withdrawal Mechanism']
      },
      {
        basis: 'Legitimate Interest',
        applicableFor: ['Public Business Information', 'Job Titles', 'Company Data'],
        documentationRequired: ['Legitimate Interest Assessment', 'Impact Analysis', 'Opt-out Option']
      },
      {
        basis: 'Contract',
        applicableFor: ['CRM Data', 'Customer Upload Data', 'Platform Usage Data'],
        documentationRequired: ['Contract Reference', 'Purpose Specification', 'Duration Limits']
      }
    ],
    
    processingLimitations: [
      {
        purpose: 'Lead Qualification',
        limitations: ['Email addresses', 'Job titles', 'Company information', 'Contact preferences'],
        dataRetentionPeriod: 'Subscription period + 30 days'
      },
      {
        purpose: 'CRM Synchronization',
        limitations: ['Contact updates', 'Activity data', 'Response tracking'],
        dataRetentionPeriod: 'As per customer CRM settings'
      },
      {
        purpose: 'Analytics and Reporting',
        limitations: ['Aggregated metrics', 'Performance data', 'Usage statistics'],
        dataRetentionPeriod: '24 months'
      }
    ],
    
    automatedDecisionMaking: {
      allowed: true,
      requiresExplanation: true,
      humanReviewRequired: false,
      optOutAvailable: true
    }
  },
  
  storage: {
    encryptionAtRest: true,
    encryptionInTransit: true,
    accessControl: ['Role-based Access Control (RBAC)', 'Multi-factor Authentication (MFA)'],
    auditLogging: true,
    geographicRestriction: ['Indian data centers preferred', 'No data transfer outside India', 'Cross-border transfer protocols']
  },
  
  deletion: {
    automaticDeletionSchedule: [
      {
        trigger: 'Subscription Cancellation',
        action: 'Complete Data Deletion',
        timeframe: '30 days after cancellation',
        notificationRequired: true
      },
      {
        trigger: 'Inactive Account (12 months)',
        action: 'Archive and Schedule Data Deletion',
        timeframe: 'Archive + 60 days',
        notificationRequired: true
      },
      {
        trigger: 'Consent Withdrawal',
        action: 'Immediate Data Removal',
        timeframe: 'Immediate',
        notificationRequired: true
      }
    ],
    onRequestDeletion: true,
    completeDataPurge: true,
    deletionConfirmation: true
  },
  
  access: {
    roleBasedAccess: [
      {
        role: 'Customer User',
        permissions: ['view own prospects', 'manage own campaigns', 'export own data'],
        dataAccessLevel: 'Own data only'
      },
      {
        role: 'Customer Admin',
        permissions: ['manage team access', 'view team analytics', 'export team data'],
        dataAccessLevel: 'Team data only'
      },
      {
        role: 'Platform Support',
        permissions: ['view anonymized logs', 'access admin panel', 'system monitoring'],
        dataAccessLevel: 'System data only, no prospect PII'
      },
      {
        role: 'Platform Administrator',
        permissions: ['full system access', 'audit logs', 'compliance reporting'],
        dataAccessLevel: 'All data with audit trail'
      }
    ],
    auditTrail: true,
    permissionLogging: true,
    accessRevocationPolicy: 'Immediate revocation upon role change or termination'
  }
};

// 📝 CONSENT MANAGEMENT SYSTEM
export interface ConsentManagement {
  consentTypes: ConsentType[];
  consentCollection: ConsentCollectionMethod[];
  consentTracking: ConsentTracking;
  consentWithdrawal: ConsentWithdrawal;
}

export interface ConsentType {
  type: string;
  purpose: string;
  lawfulBasis: string;
  dataCategories: string[];
  retentionPeriod: string;
  withdrawalAvailable: boolean;
}

export interface ConsentCollectionMethod {
  method: string;
  description: string;
  legalCompliant: boolean;
  documentationRequired: boolean;
}

export interface ConsentTracking {
  uniqueConsentId: boolean;
  timestampRecording: boolean;
  versionControl: boolean;
  consentChangesLogged: boolean;
}

export interface ConsentWithdrawal {
  immediateEffect: boolean;
  processingStoppage: boolean;
  dataDeletion: boolean;
  confirmationFlow: boolean;
}

export const CONSENT_MANAGEMENT: ConsentManagement = {
  consentTypes: [
    {
      type: 'Marketing Communication',
      purpose: 'Send promotional emails and LinkedIn messages',
      lawfulBasis: 'Consent',
      dataCategories: ['Email Address', 'Name', 'Job Title', 'Company'],
      retentionPeriod: '3 years or until withdrawal',
      withdrawalAvailable: true
    },
    {
      type: 'Lead Generation Services',
      purpose: 'AI-powered lead qualification and outreach automation',
      lawfulBasis: 'Contract',
      dataCategories: ['Contact Information', 'Business Data', 'Professional Profile'],
      retentionPeriod: 'Subscription period + 30 days',
      withdrawalAvailable: false // Required for service delivery
    },
    {
      type: 'CRM Integration',
      purpose: 'Synchronize prospect data with customer CRM systems',
      lawfulBasis: 'Contract',
      dataCategories: ['Updated Contact Information', 'Activity Data', 'Response History'],
      retentionPeriod: 'As per CRM settings',
      withdrawalAvailable: true
    },
    {
      type: 'Analytics and Research',
      purpose: 'Improve AI algorithms and provide platform analytics',
      lawfulBasis: 'Legitimate Interest',
      dataCategories: ['Aggregated Metrics', 'Usage Patterns', 'Performance Data'],
      retentionPeriod: '24 months',
      withdrawalAvailable: true
    }
  ],
  
  consentCollection: [
    {
      method: 'Web Form Checkbox',
      description: 'Explicit opt-in checkboxes during account creation',
      legalCompliant: true,
      documentationRequired: true
    },
    {
      method: 'Double Confirmation',
      description: 'Consent confirmation via email after initial signup',
      legalCompliant: true,
      documentationRequired: true
    },
    {
      method: 'Granular Consent',
      description: 'Separate consent for each data processing purpose',
      legalCompliant: true,
      documentationRequired: true
    },
    {
      method: 'Data Upload Consent',
      description: 'Consent collected when customers upload prospect data',
      legalCompliant: true,
      documentationRequired: true
    }
  ],
  
  consentTracking: {
    uniqueConsentId: true,
    timestampRecording: true,
    versionControl: true,
    consentChangesLogged: true
  },
  
  consentWithdrawal: {
    immediateEffect: true,
    processingStoppage: true,
    dataDeletion: true,
    confirmationFlow: true
  }
};

// 📊 AUDIT AND LOGGING FRAMEWORK
export interface AuditAndLogging {
  dataProcessingLog: ProcessingLog[];
  accessAuditLog: AccessAuditLog[];
  complianceChecks: ComplianceCheck[];
  incidentResponse: IncidentResponsePolicy;
}

export interface ProcessingLog {
  eventType: string;
  dataSubject: string;
  processingPurpose: string;
  timestamp: Date;
  legalBasis: string;
  processingDetails: string[];
}

export interface AccessAuditLog {
  userId: string;
  accessLevel: string;
  accessedData: string[];
  timestamp: Date;
  accessReason: string;
  authorization: string;
}

export interface ComplianceCheck {
  checkType: string;
  frequency: string;
  results: ComplianceResult[];
  remediationActions: string[];
}

export interface ComplianceResult {
  checkDate: Date;
  status: 'Pass' | 'Fail' | 'Warning';
  issuesIdentified: string[];
  correctionsMade: string[];
}

export interface IncidentResponsePolicy {
  incidentTypes: IncidentType[];
  escalationPaths: EscalationPath[];
  notificationRequirements: NotificationRequirement[];
  remediationResponse: RemediationResponse;
}

export interface IncidentType {
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  detectionMethod: string;
  responseTimeframe: string;
}

export interface EscalationPath {
  incidentType: string;
  immediateActions: string[];
  escalationTriggers: string[];
  responsibleParties: string[];
}

export interface NotificationRequirement {
  incidentType: string;
  affectedParties: string[];
  notificationMethod: string[];
  timeframe: string;
}

export interface RemediationResponse {
  dataProcessingStoppage: boolean;
  dataAccessRevocation: boolean;
  incidentAnalysis: boolean;
  preventiveMeasures: boolean;
  regulatoryNotification: boolean;
}

// Export main compliance framework
export const COMPLIANCE_FRAMEWORK: ComplianceFramework = {
  dataSourcing: {
    permittedSources: LEGAL_DATA_SOURCES,
    prohibitedSources: PROHIBITED_DATA_SOURCES,
    attributionRequirements: [
      {
        dataType: 'LinkedIn Professional Data',
        requiredFields: ['source', 'access_method', 'consent_confirmation'],
        displayFormat: 'Data sourced from LinkedIn Sales Navigator API',
        retentionPeriod: 'As per LinkedIn API terms'
      },
      {
        dataType: 'Public Business Information',
        requiredFields: ['source', 'public_status', 'verification_date'],
        displayFormat: 'Public business information from official sources',
        retentionPeriod: '24 months'
      }
    ],
    updateFrequency: [
      {
        dataSource: 'LinkedIn Sales Navigator',
        updateInterval: 'Daily',
        automatedRefresh: true,
        manualReviewRequired: false
      },
      {
        dataSource: 'Google My Business',
        updateInterval: 'Weekly',
        automatedRefresh: true,
        manualReviewRequired: false
      }
    ]
  },
  
  privacy: PRIVACY_PROTECTION_POLICY,
  consent: CONSENT_MANAGEMENT,
  audit: {
    dataProcessingLog: [],
    accessAuditLog: [],
    complianceChecks: [],
    incidentResponse: {
      incidentTypes: [
        {
          type: 'Data Breach',
          severity: 'Critical',
          detectionMethod: 'Automated monitoring',
          responseTimeframe: 'Immediate (within 1 hour)'
        },
        {
          type: 'Unauthorized Access',
          severity: 'High',
          detectionMethod: 'Access audit logs',
          responseTimeframe: 'Immediate investigation'
        },
        {
          type: 'Consent Violation',
          severity: 'Medium',
          detectionMethod: 'Consent tracking system',
          responseTimeframe: 'Within 24 hours'
        }
      ],
      escalationPaths: [],
      notificationRequirements: [],
      remediationResponse: {
        dataProcessingStoppage: true,
        dataAccessRevocation: true,
        incidentAnalysis: true,
        preventiveMeasures: true,
        regulatoryNotification: true
      }
    }
  }
};
