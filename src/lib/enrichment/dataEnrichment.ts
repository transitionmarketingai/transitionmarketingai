// 🔍 DATA ENRICHMENT SYSTEM
// Enriches prospect data from multiple legal sources and validates information

export interface DataEnrichmentEngine {
  enrichmentSources: EnrichmentSource[];
  validationRules: ValidationRule[];
  enrichProspect: (prospect: ProspectInput) => Promise<EnrichedProspect>;
  batchEnrichProspects: (prospects: ProspectInput[]) => Promise<EnrichedProspect[]>;
  validateProspect: (prospect: ProspectInput) => Promise<ValidationResult>;
}

export interface ProspectInput {
  email?: string;
  phone?: string;
  company?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  linkedinProfile?: string;
  website?: string;
  [key: string]: any;
}

export interface EnrichedProspect extends ProspectInput {
  enrichedAt: Date;
  enrichmentSources: string[];
  validationStatus: ValidationStatus;
  confidenceScore: number; // 0-100
  additionalData: EnrichmentData;
  socialProfiles: SocialProfile[];
  companyData: CompanyData;
  industryData: IndustryData;
  contactVerified: ContactVerification;
}

export interface EnrichmentData {
  emailDeliverability: EmailStatus;
  phoneVerification: PhoneStatus;
  socialVerification: SocialStatus;
  companyVerification: CompanyStatus;
  technologyStack: TechStack[];
  companyMetrics: CompanyMetrics;
  locationData: LocationData;
}

export interface EmailStatus {
  deliverable: boolean;
  domain: string;
  suggestions?: string[];
  validationScore: number; // 0-100
  lastChecked: Date;
}

export interface PhoneStatus {
  valid: boolean;
  carrier?: string;
  lineType?: 'mobile' | 'landline' | 'voip';
  countryCode?: string;
  normalization?: string;
  validationScore: number; // 0-100
  lastChecked: Date;
}

export interface SocialStatus {
  linkedin?: LinkedInData;
  twitter?: TwitterData;
  facebook?: FacebookData;
}

export interface LinkedInData {
  profileUrl: string;
  headline: string;
  industry: string;
  location: string;
  connectionsCount: number;
  endorsements: number;
  verificationScore: number;
}

export interface TwitterData {
  handle: string;
  followersCount: number;
  verified: boolean;
  bio: string;
}

export interface FacebookData {
  pageUrl?: string;
  likes?: number;
  category: string;
}

export interface CompanyData {
  name: string;
  domain?: string;
  industry: string;
  companySize: string;
  foundedYear?: number;
  headquarters?: string;
  revenue?: string;
  employeeCount: number;
  description?: string;
  tags?: string[];
}

export interface CompanyStatus {
  verified: boolean;
  domainActive: boolean;
  businessRegistration?: BusinessRegistration;
  socialMediaPresence: SocialMediaPresence;
  onlineReputation: OnlineReputation;
}

export interface BusinessRegistration {
  registrationNumber?: string;
  registrationDate?: Date;
  registeredAddress?: string;
  legalStatus?: string;
  juristicPerson?: boolean;
}

export interface SocialMediaPresence {
  linkedinCompany?: string;
  facebookPage?: string;
  twitterHandle?: string;
  youtubeChannel?: string;
  instagramAccount?: string;
  domain?: string;
}

export interface OnlineReputation {
  reviewScore?: number;
  reviewCount?: number;
  newsSentiment?: 'positive' | 'neutral' | 'negative';
  trustScore?: number;
}

export interface IndustryData {
  industryCode?: string;
  industryName: string;
  subIndustry?: string;
  growthRate?: number;
  marketTrends?: string[];
  competitors?: string[];
}

export interface ContactVerification {
  emailVerified: boolean;
  phoneVerified: boolean;
  socialVerified: boolean;
  companyVerified: boolean;
  overallVerificationScore: number; // 0-100
}

export interface SocialProfile {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube';
  profileUrl: string;
  username: string;
  verified: boolean;
  followersCount?: number;
  profileData: any;
}

export interface TechStack {
  category: string; // CRM, Email, Analytics, etc.
  tools: string[];
  confidence: number; // 0-100
}

export interface CompanyMetrics {
  estimatedRevenue?: string;
  fundingRaised?: string;
  lastFundingDate?: Date;
  investorCount?: number;
  employeeGrowth?: number;
  revenueGrowth?: number;
}

export interface LocationData {
  country: string;
  city: string;
  state?: string;
  postalCode?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
}

// 🏗️ ENRICHMENT SOURCE INTERFACE
export interface EnrichmentSource {
  sourceName: string;
  sourceType: 'api' | 'database' | 'scraping' | 'manual';
  costPerQuery: number;
  currency: string;
  reliability: number; // 0-100
  latency: number; // milliseconds
  rateLimit: RateLimit;
  capabilities: EnrichmentCapability[];
  legalCompliant: boolean;
  dataRetentionDays: number;
}

export interface EnrichmentCapability {
  dataType: 'email' | 'phone' | 'company' | 'social' | 'domain' | 'location';
  fields: string[];
  accuracy: number; // 0-100
}

export interface RateLimit {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit?: number;
}

// ⚡ ENRICHMENT ENGINE IMPLEMENTATION
export class DataEnrichmentService implements DataEnrichmentEngine {
  private sources: Map<string, EnrichmentSource> = new Map();
  private cache: Map<string, EnrichmentResult> = new Map();
  private validator: ProspectValidator;

  constructor() {
    this.validator = new ProspectValidator();
    this.initializeLegalSources();
  }

  private initializeLegalSources(): void {
    // 1. CLEANVERIFY API (Email validation)
    this.sources.set('cleaverify', {
      sourceName: 'CleverVerify',
      sourceType: 'api',
      costPerQuery: 0.008, // ₹0.60 per query
      currency: 'USD',
      reliability: 95,
      latency: 200,
      rateLimit: { requestsPerMinute: 100, requestsPerHour: 5000, requestsPerDay: 50000 },
      capabilities: [
        {
          dataType: 'email',
          fields: ['deliverability', 'domain', 'suggestions'],
          accuracy: 95
        }
      ],
      legalCompliant: true,
      dataRetentionDays: 90
    });

    // 2. NUMVERIFY API (Phone validation)
    this.sources.set('numverify', {
      sourceName: 'Numverify',
      sourceType: 'api',
      costPerQuery: 0.005, // ₹0.37 per query
      currency: 'USD',
      reliability: 90,
      latency: 300,
      rateLimit: { requestsPerMinute: 50, requestsPerHour: 1000, requestsPerDay: 10000 },
      capabilities: [
        {
          dataType: 'phone',
          fields: ['validity', 'carrier', 'line_type', 'country'],
          accuracy: 90
        }
      ],
      legalCompliant: true,
      dataRetentionDays: 90
    });

    // 3. CLEARBIT API (Company enrichment)
    this.sources.set('clearbit', {
      sourceName: 'Clearbit',
      sourceType: 'api',
      costPerQuery: 0.01, // ₹0.74 per query
      currency: 'USD',
      reliability: 85,
      latency: 500,
      rateLimit: { requestsPerMinute: 25, requestsPerHour: 1000, requestsPerDay: 50000 },
      capabilities: [
        {
          dataType: 'company',
          fields: ['industry', 'size', 'location', 'description', 'employees'],
          accuracy: 85
        },
        {
          dataType: 'domain',
          fields: ['tech_stack', 'analytics', 'advertising'],
          accuracy: 80
        }
      ],
      legalCompliant: true,
      dataRetentionDays: 180
    });

    // 4. APOLLO API (Social & professional data)
    this.sources.set('apollo', {
      sourceName: 'Apollo',
      sourceType: 'api',
      costPerQuery: 0.015, // ₹1.11 per query
      currency: 'USD',
      reliability: 90,
      latency: 400,
      rateLimit: { requestsPerMinute: 60, requestsPerHour: 3600, requestsPerDay: 86400 },
      capabilities: [
        {
          dataType: 'social',
          fields: ['linkedin', 'company_info', 'job_title', 'location'],
          accuracy: 90
        }
      ],
      legalCompliant: true,
      dataRetentionDays: 240
    });

    // 5. COMPANY HOUSE API (UK Business registry - free tier)
    this.sources.set('companieshouse', {
      sourceName: 'Companies House',
      sourceType: 'api',
      costPerQuery: 0, // Free for basic queries
      currency: 'GBP',
      reliability: 100,
      latency: 1000,
      rateLimit: { requestsPerMinute: 600, requestsPerHour: 36000, requestsPerDay: 864000 },
      capabilities: [
        {
          dataType: 'company',
          fields: ['registration', 'accounts', 'officers', 'status'],
          accuracy: 100
        }
      ],
      legalCompliant: true,
      dataRetentionDays: 365
    });

    // 6. GOOGLE MY BUSINESS API (Public business data)
    this.sources.set('googlebusiness', {
      sourceName: 'Google My Business',
      sourceType: 'api',
      costPerQuery: 0, // Free for public data
      currency: 'USD',
      reliability: 95,
      latency: 200,
      rateLimit: { requestsPerMinute: 100, requestsPerHour: 10000, requestsPerDay: 100000 },
      capabilities: [
        {
          dataType: 'company',
          fields: ['address', 'phone', 'hours', 'reviews'],
          accuracy: 95
        }
      ],
      legalCompliant: true,
      dataRetentionDays: 90
    });
  }

  async enrichProspect(prospectInput: ProspectInput): Promise<EnrichedProspect> {
    // Check cache first
    const cacheKey = this.generateCacheKey(prospectInput);
    const cachedResult = this.cache.get(cacheKey);
    
    if (cachedResult && this.isCacheValid(cachedResult)) {
      return this.transformCacheToEnriched(cachedResult, prospectInput);
    }

    // Start enrichment process
    const enrichmentPromises: Array<Promise<Partial<EnrichmentData>>> = [];
    
    // 1. Email validation
    if (prospectInput.email) {
      enrichmentPromises.push(this.enrichEmail(prospectInput.email));
    }
    
    // 2. Phone validation
    if (prospectInput.phone) {
      enrichmentPromises.push(this.enrichPhone(prospectInput.phone));
    }
    
    // 3. Company enrichment
    if (prospectInput.company || prospectInput.email) {
      enrichmentPromises.push(this.enrichCompany(prospectInput));
    }
    
    // 4. Social media enrichment
    if (prospectInput.linkedinProfile || prospectInput.email) {
      enrichmentPromises.push(this.enrichSocialProfiles(prospectInput));
    }
    
    // 5. Domain/website analysis
    if (prospectInput.website || prospectInput.email) {
      enrichmentPromises.push(this.enrichTechnologyStack(prospectInput));
    }

    // Execute all enrichment tasks in parallel
    const enrichmentResults = await Promise.allSettled(enrichmentPromises);
    
    // Merge results
    const enrichedData = this.mergeEnrichmentResults(enrichmentResults);
    
    // Validate prospect
    const validationResult = await this.validateProspect(prospectInput);
    
    // Calculate confidence score
    const confidenceScore = this.calculateConfidenceScore(enrichedData, validationResult);
    
    // Build final enriched prospect
    const enrichedProspect: EnrichedProspect = {
      ...prospectInput,
      enrichedAt: new Date(),
      enrichmentSources: Object.keys(enrichedData),
      validationStatus: validationResult.status,
      confidenceScore,
      additionalData: enrichedData,
      socialProfiles: [],
      companyData: enrichedData.companyVerification?.companyData || this.defaultCompanyData(prospectInput),
      industryData: enrichedData.companyVerification?.industryData || this.defaultIndustryData(),
      contactVerified: this.calculateVerificationStatus(enrichedData, validationResult)
    };

    // Cache result
    this.cache.set(cacheKey, {
      prospectInput,
      enrichedData,
      validationResult,
      confidenceScore,
      enrichedAt: enrichedProspect.enrichedAt
    });

    return enrichedProspect;
  }

  async batchEnrichProspects(prospects: ProspectInput[]): Promise<EnrichedProspect[]> {
    const batches = this.createBatches(prospects, 10); // Process 10 at a time
    const results: EnrichedProspect[] = [];

    for (const batch of batches) {
      const batchPromises = batch.map(prospect => this.enrichProspect(prospect));
      const batchResults = await Promise.allSettled(batchPromises);
      
      results.push(...batchResults
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<EnrichedProspect>).value));
      
      // Rate limiting delay between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return results;
  }

  async validateProspect(prospect: ProspectInput): Promise<ValidationResult> {
    return await this.validator.validateProspect(prospect);
  }

  // 🏢 EMAIL ENRICHMENT
  private async enrichEmail(email: string): Promise<Partial<EnrichmentData>> {
    try {
      const cleaverifySource = this.sources.get('cleaverify')!;
      
      // Simulate API call (replace with actual CleverVerify integration)
      const emailStatus: EmailStatus = {
        deliverable: await this.checkEmailDeliverability(email),
        domain: email.split('@')[1],
        validationScore: 92,
        lastChecked: new Date()
      };

      return {
        emailDeliverability: emailStatus
      };
    } catch (error) {
      console.error('Email enrichment failed:', error);
      return {};
    }
  }

  private async checkEmailDeliverability(email: string): Promise<boolean> {
    const domain = email.split('@')[1];
    
    // Basic email validation
    if (!this.isValidEmailFormat(email)) {
      return false;
    }

    // Domain validation
    const disposableDomains = ['10minutemail.com', 'guerrillamail.com', 'tempmail.org'];
    if (disposableDomains.includes(domain.toLowerCase())) {
      return false;
    }

    // Simulate more sophisticated validation
    return Math.random() > 0.1; // 90% deliverable rate simulation
  }

  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 📱 PHONE ENRICHMENT
  private async enrichPhone(phone: string): Promise<Partial<EnrichmentData>> {
    try {
      const numverifySource = this.sources.get('numverify')!;
      
      const phoneStatus: PhoneStatus = {
        valid: this.isValidPhoneFormat(phone),
        carrier: await this.detectCarrier(phone),
        lineType: await this.detectLineType(phone),
        countryCode: this.extractCountryCode(phone),
        validationScore: 88,
        lastChecked: new Date()
      };

      return {
        phoneVerification: phoneStatus
      };
    } catch (error) {
      console.error('Phone enrichment failed:', error);
      return {};
    }
  }

  private isValidPhoneFormat(phone: string): boolean {
    const normalized = phone.replace(/[\s\-\(\)]/g, '');
    return /^\+?\d{10,15}$/.test(normalized);
  }

  private async detectCarrier(phone: string): Promise<string | undefined> {
    // Simulate carrier detection
    const carriers = ['Airtel', 'JIO', 'Vodafone', 'BSNL', 'Vi'];
    return carriers[Math.floor(Math.random() * carriers.length)];
  }

  private async detectLineType(phone: string): Promise<'mobile' | 'landline' | 'voip'> {
    // Basic detection logic
    const mobilePrefixes = ['+91-9', '+91-8', '+91-7', '+91-6'];
    const startsWithMobile = mobilePrefixes.some(prefix => phone.startsWith(prefix));
    
    return startsWithMobile ? 'mobile' : 'landline';
  }

  private extractCountryCode(phone: string): string | undefined {
    // Extract country code logic
    if (phone.startsWith('+91')) return 'IN';
    if (phone.startsWith('+1')) return 'US';
    if (phone.startsWith('+44')) return 'GB';
    return undefined;
  }

  // 🏢 COMPANY ENRICHMENT
  private async enrichCompany(prospect: ProspectInput): Promise<Partial<EnrichmentData>> {
    try {
      const companyName = prospect.company || this.extractCompanyFromEmail(prospect.email);
      if (!companyName) return {};

      const clearbitSource = this.sources.get('clearbit')!;
      
      // Simulate Clearbit API call
      const companyData: CompanyData = await this.extractCompanyData(companyName);
      const companyStatus: CompanyStatus = await this.validateCompany(companyData);

      return {
        companyVerification: {
          verified: companyStatus.verified,
          companyData,
          industryData: this.extractIndustryData(companyData.industry)
        }
      };
    } catch (error) {
      console.error('Company enrichment failed:', error);
      return {};
    }
  }

  private extractCompanyFromEmail(email?: string): string | undefined {
    if (!email) return undefined;
    
    const domain = email.split('@')[1];
    if (!domain) return undefined;
    
    // Remove common TLDs and extract probable company name
    const domainWithoutTLD = domain.split('.')[0];
    return domainWithoutTLD.toLowerCase()
      .replace(/[0-9]/g, '') // Remove numbers
      .replace(/^(mail|info|contact|support|hello|sales)/, ''); // Remove generic prefixes
  }

  private async extractCompanyData(companyName: string): Promise<CompanyData> {
    // Simulate company data extraction
    const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing'];
    
    return {
      name: companyName,
      domain: `${companyName.toLowerCase().replace(/\s/g, '')}.com`,
      industry: industries[Math.floor(Math.random() * industries.length)],
      companySize: this.determineCompanySize(),
      foundedYear: 2010 + Math.floor(Math.random() * 14),
      headquarters: 'Bangalore, Karnataka, India',
      employeeCount: Math.floor(Math.random() * 500) + 10,
      description: `Leading ${companyName} providing innovative solutions`
    };
  }

  private determineCompanySize(): string {
    const sizes = ['Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)'];
    const weights = [20, 30, 25, 15, 10]; // Probable distribution
    
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (let i = 0; i < sizes.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return sizes[i];
      }
    }
    
    return sizes[1]; // Default to Small
  }

  private async validateCompany(companyData: CompanyData): Promise<CompanyStatus> {
    return {
      verified: Math.random() > 0.2, // 80% verification rate
      domainActive: companyData.domain !== undefined,
      socialMediaPresence: {
        linkedinCompany: `linkedin.com/company/${companyData.name.toLowerCase().replace(/\s/g, '')}`,
        domain: companyData.domain
      },
      onlineReputation: {
        reviewScore: 4.0 + Math.random() * 1.0,
        reviewCount: Math.floor(Math.random() * 100),
        trustScore: 75 + Math.random() * 25
      }
    };
  }

  private extractIndustryData(industry: string): IndustryData {
    const industryMapping: Record<string, IndustryData> = {
      'Technology': {
        industryCode: 'IT',
        industryName: 'Information Technology',
        growthRate: 15.2,
        marketTrends: ['AI/ML', 'Cloud Computing', 'Cybersecurity']
      },
      'Healthcare': {
        industryCode: 'HLTH',
        industryName: 'Healthcare',
        growthRate: 8.5,
        marketTrends: ['Telemedicine', 'Digital Health', 'Medical Devices']
      },
      'Finance': {
        industryCode: 'FIN',
        industryName: 'Financial Services',
        growthRate: 12.1,
        marketTrends: ['Fintech', 'Digital Banking', 'Blockchain']
      }
    };

    return industryMapping[industry] || {
      industryName: industry,
      growthRate: 5.0,
      marketTrends: ['Digital Transformation']
    };
  }

  // 📱 SOCIAL MEDIA ENRICHMENT
  private async enrichSocialProfiles(prospect: ProspectInput): Promise<Partial<EnrichmentData>> {
    try {
      const socialProfiles: SocialProfile[] = [];
      
      // LinkedIn enrichment
      if (prospect.linkedinProfile || prospect.email) {
        const linkedinData = await this.extractLinkedInData(prospect);
        if (linkedinData) {
          socialProfiles.push(linkedinData);
        }
      }

      return {
        socialVerification: {
          linkedin: await this.extractLinkedInData(prospect),
          twitter: await this.extractTwitterData(prospect),
          facebook: await this.extractFacebookData(prospect)
        }
      };
    } catch (error) {
      console.error('Social enrichment failed:', error);
      return {};
    }
  }

  private async extractLinkedInData(prospect: ProspectInput): Promise<LinkedInData | undefined> {
    // Simulate LinkedIn data extraction
    return {
      profileUrl: prospect.linkedinProfile || `linkedin.com/in/${prospect.firstName?.toLowerCase()}-${prospect.lastName?.toLowerCase()}`,
      headline: `${prospect.jobTitle} at ${prospect.company}`,
      industry: prospect.company?.includes('Tech') ? 'Technology' : 'Business',
      location: 'Bangalore, Karnataka, India',
      connectionsCount: Math.floor(Math.random() * 1000) + 100,
      endorsements: Math.floor(Math.random() * 100) + 10,
      verificationScore: 85
    };
  }

  // 💻 TECHNOLOGY STACK ENRICHMENT
  private async enrichTechnologyStack(prospect: ProspectInput): Promise<Partial<EnrichmentData>> {
    const domain = this.extractDomain(prospect);
    if (!domain) return {};

    // Simulate technology detection
    const techStack: TechStack[] = [
      {
        category: 'CRM',
        tools: ['HubSpot', 'Salesforce'],
        confidence: 85
      },
      {
        category: 'Analytics',
        tools: ['Google Analytics', 'Hotjar'],
        confidence: 90
      },
      {
        category: 'Email Marketing',
        tools: ['MailChimp', 'Constant Contact'],
        confidence: 75
      }
    ];

    return {
      technologyStack: techStack
    };
  }

  private extractDomain(prospect: ProspectInput): string | undefined {
    if (prospect.website) {
      return prospect.website.replace(/^https?:\/\//, '').split('/')[0];
    }
    
    if (prospect.email) {
      return prospect.email.split('@')[1];
    }
    
    return undefined;
  }

  // 🔧 UTILITY METHODS
  private generateCacheKey(prospect: ProspectInput): string {
    const key = prospect.email || prospect.phone || prospect.company || 'unknown';
    return `enrichment_${Buffer.from(key).toString('base64')}`;
  }

  private isCacheValid(result: EnrichmentResult): boolean {
    const cacheMaxAge = 24 * 60 * 60 * 1000; // 24 hours
    return Date.now() - result.enrichedAt.getTime() < cacheMaxAge;
  }

  private transformCacheToEnriched(result: EnrichmentResult, prospect: ProspectInput): EnrichedProspect {
    return {
      ...prospect,
      enrichedAt: result.enrichedAt,
      enrichmentSources: Object.keys(result.enrichedData),
      validationStatus: result.validationResult.status,
      confidenceScore: result.confidenceScore,
      additionalData: result.enrichedData,
      socialProfiles: [],
      companyData: result.enrichedData.companyVerification?.companyData || this.defaultCompanyData(prospect),
      industryData: result.enrichedData.companyVerification?.industryData || this.defaultIndustryData(),
      contactVerified: this.calculateVerificationStatus(result.enrichedData, result.validationResult)
    };
  }

  private mergeEnrichmentResults(results: Array<PromiseSettledResult<Partial<EnrichmentData>>>): EnrichmentData {
    const enrichedData: EnrichmentData = {
      emailDeliverability: { deliverable: false, domain: '', validationScore: 0, lastChecked: new Date() },
      phoneVerification: { valid: false, validationScore: 0, lastChecked: new Date() },
      socialVerification: {},
      companyVerification: { verified: false },
      technologyStack: [],
      companyMetrics: {},
      locationData: { country: '', city: '' }
    };

    results.forEach(result => {
      if (result.status === 'fulfilled') {
        Object.assign(enrichedData, result.value);
      }
    });

    return enrichedData;
  }

  private calculateConfidenceScore(enrichedData: EnrichmentData, validationResult: ValidationResult): number {
    let score = 0;
    let factors = 0;

    if (enrichedData.emailDeliverability?.validationScore) {
      score += enrichedData.emailDeliverability.validationScore;
      factors++;
    }

    if (enrichedData.phoneVerification?.validationScore) {
      score += enrichedData.phoneVerification.validationScore;
      factors++;
    }

    if (enrichedData.companyVerification?.verified) {
      score += 90; // High weight for verified companies
      factors++;
    }

    if (validationResult.status === 'valid') {
      score += 85;
      factors++;
    }

    return factors > 0 ? Math.round(score / factors) : 50;
  }

  private calculateVerificationStatus(enrichedData: EnrichmentData, validationResult: ValidationResult): ContactVerification {
    return {
      emailVerified: enrichedData.emailDeliverability?.deliverable || false,
      phoneVerified: enrichedData.phoneVerification?.valid || false,
      socialVerified: Object.keys(enrichedData.socialVerification || {}).length > 0,
      companyVerified: enrichedData.companyVerification?.verified || false,
      overallVerificationScore: this.calculateConfidenceScore(enrichedData, validationResult)
    };
  }

  private defaultCompanyData(prospect: ProspectInput): CompanyData {
    return {
      name: prospect.company || 'Unknown Company',
      industry: 'Unknown',
      employeeCount: 0,
      companySize: 'Unknown'
    };
  }

  private defaultIndustryData(): IndustryData {
    return {
      industryName: 'Unknown',
      growthRate: 0
    };
  }

  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  private async extractTwitterData(prospect: ProspectInput): Promise<TwitterData | undefined> {
    // Simulate Twitter data extraction
    return Math.random() > 0.5 ? {
      handle: `@${prospect.firstName?.toLowerCase()}_${prospect.company?.toLowerCase()}`,
      followersCount: Math.floor(Math.random() * 5000) + 100,
      verified: Math.random() > 0.8,
      bio: `Professional at ${prospect.company}`
    } : undefined;
  }

  private async extractFacebookData(prospect: ProspectInput): Promise<FacebookData | undefined> {
    // Simulate Facebook data extraction
    return Math.random() > 0.3 ? {
      category: 'Professional Services',
      likes: Math.floor(Math.random() * 10000) + 50
    } : undefined;
  }
}

// ✅ PROSPECT VALIDATOR
export class ProspectValidator {
  private validationRules: ValidationRule[] = [];

  constructor() {
    this.initializeValidationRules();
  }

  private initializeValidationRules(): void {
    this.validationRules = [
      {
        field: 'email',
        type: 'format',
        validator: (value: any) => this.isValidEmail(value),
        errorMessage: 'Invalid email format'
      },
      {
        field: 'phone',
        type: 'format',
        validator: (value: any) => this.isValidPhone(value),
        errorMessage: 'Invalid phone format'
      },
      {
        field: 'company',
        type: 'required',
        validator: (value: any) => Boolean(value),
        errorMessage: 'Company name is required'
      },
      {
        field: 'firstName',
        type: 'required',
        validator: (value: any) => Boolean(value),
        errorMessage: 'First name is required'
      }
    ];
  }

  async validateProspect(prospect: ProspectInput): Promise<ValidationResult> {
    const errors: string[] = [];
    let isValid = true;

    for (const rule of this.validationRules) {
      const value = prospect[rule.field as keyof ProspectInput];
      
      if (rule.type === 'required' && !value) {
        errors.push(rule.errorMessage);
        isValid = false;
      } else if (rule.type === 'format' && value && !rule.validator(value)) {
        errors.push(rule.errorMessage);
        isValid = false;
      }
    }

    return {
      status: isValid ? 'valid' : 'invalid',
      errors,
      score: isValid ? 100 : 50
    };
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const normalized = phone.replace(/[\s\-\(\)]/g, '');
    return /^\+?\d{10,15}$/.test(normalized);
  }
}

// INTERFACE DEFINITIONS
export interface ValidationRule {
  field: string;
  type: 'required' | 'format' | 'range' | 'enum';
  validator: (value: any) => boolean;
  errorMessage: string;
}

export interface ValidationResult {
  status: 'valid' | 'invalid' | 'partial';
  errors: string[];
  score: number; // 0-100
}

export interface ValidationStatus {
  overall: ValidationResult;
  fieldResults: Record<string, ValidationResult>;
}

export interface EnrichmentResult {
  prospectInput: ProspectInput;
  enrichedData: EnrichmentData;
  validationResult: ValidationResult;
  confidenceScore: number;
  enrichedAt: Date;
}

// Singleton export
export const dataEnrichmentService = new DataEnrichmentService();
