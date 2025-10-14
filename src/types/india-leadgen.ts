// TypeScript Types for India Lead Generation Platform

export type Industry = 
  | 'real_estate'
  | 'insurance'
  | 'education'
  | 'healthcare'
  | 'finance'
  | 'home_services'
  | 'automobile'
  | 'legal';

export type SubscriptionPlan = 'starter' | 'growth' | 'professional' | 'enterprise';

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'past_due';

export type LeadSource = 
  | 'facebook_lead_ad'
  | 'google_lead_form'
  | 'linkedin_lead_gen'
  | 'ai_outbound_email'
  | 'ai_outbound_whatsapp';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost' | 'duplicate';

export type QualificationStatus = 'pending' | 'qualified' | 'unqualified' | 'hot' | 'warm' | 'cold';

export type MessageChannel = 'whatsapp' | 'email' | 'sms' | 'voice';

export type CampaignPlatform = 'facebook' | 'google' | 'linkedin' | 'instagram';

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';

// ============================================================================
// CUSTOMER / BUSINESS
// ============================================================================

export interface Customer {
  id: string;
  user_id: string;
  
  // Business Information
  business_name: string;
  industry: Industry;
  website?: string;
  gst_number?: string;
  
  // Contact Information
  contact_person: string;
  email: string;
  phone: string;
  alternate_phone?: string;
  
  // Address
  address?: {
    street?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  
  // Service Details
  service_description?: string;
  average_deal_value?: number;
  service_areas?: {
    cities: string[];
    states: string[];
  };
  
  // Target Audience
  target_audience?: {
    description: string;
    age_range?: { min: number; max: number };
    gender?: 'male' | 'female' | 'all';
    income_level?: 'budget' | 'mid-range' | 'premium';
    interests?: string[];
  };
  
  lead_preferences?: {
    min_quality_score?: number;
    preferred_contact_method?: MessageChannel;
    response_time_hours?: number;
  };
  
  // Subscription
  current_plan: SubscriptionPlan;
  subscription_status: SubscriptionStatus;
  subscription_start_date: string;
  subscription_end_date?: string;
  billing_cycle: 'monthly' | 'quarterly' | 'annual';
  
  // Onboarding
  onboarding_completed: boolean;
  onboarding_step: number;
  
  // Marketing
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referred_by?: string;
  
  created_at: string;
  updated_at: string;
}

export interface OnboardingFormData {
  // Step 1: Business Details
  business_name: string;
  industry: Industry;
  website?: string;
  gst_number?: string;
  
  // Step 2: Contact Information
  contact_person: string;
  email: string;
  phone: string;
  
  // Step 3: Service Areas
  service_cities: string[];
  service_states: string[];
  
  // Step 4: Target Audience
  target_audience_description: string;
  age_range_min?: number;
  age_range_max?: number;
  target_gender?: 'male' | 'female' | 'all';
  income_level?: 'budget' | 'mid-range' | 'premium';
  
  // Step 5: Service Details
  service_description: string;
  average_deal_value: number;
  
  // Step 6: Plan Selection
  selected_plan: SubscriptionPlan;
}

// ============================================================================
// SUBSCRIPTION & BILLING
// ============================================================================

export interface SubscriptionPlanDetails {
  id: string;
  plan_id: SubscriptionPlan;
  plan_name: string;
  description: string;
  
  // Pricing (in paise)
  price_monthly: number;
  price_quarterly?: number;
  price_annual?: number;
  
  // Quotas
  monthly_lead_quota: number;
  overage_price: number; // per lead in paise
  
  // Features
  features: {
    ad_platforms: CampaignPlatform[];
    messaging_channels: MessageChannel[];
    support_level: string;
    analytics: 'basic' | 'advanced' | 'premium';
    crm_integration: boolean;
    white_label?: boolean;
    dedicated_manager?: boolean;
    api_access?: boolean;
  };
  
  max_campaigns: number;
  max_team_members: number;
  is_active: boolean;
  display_order: number;
}

export interface Subscription {
  id: string;
  customer_id: string;
  plan_id: string;
  
  // Razorpay
  razorpay_subscription_id?: string;
  razorpay_plan_id?: string;
  razorpay_customer_id?: string;
  
  // Status
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  
  // Usage
  leads_used_this_period: number;
  leads_quota: number;
  overage_leads: number;
  
  // Cancellation
  cancel_at_period_end: boolean;
  cancelled_at?: string;
  cancellation_reason?: string;
  
  // Trial
  trial_start?: string;
  trial_end?: string;
  is_trial: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  customer_id: string;
  subscription_id?: string;
  
  invoice_number: string;
  invoice_date: string;
  due_date?: string;
  
  // Amounts (in paise)
  subtotal: number;
  tax_amount: number; // GST 18%
  discount_amount: number;
  total_amount: number;
  amount_paid: number;
  
  // Razorpay
  razorpay_invoice_id?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paid_at?: string;
  
  line_items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
  }>;
  
  billing_address?: {
    street?: string;
    city: string;
    state: string;
    pincode: string;
  };
  gst_number?: string;
  
  created_at: string;
}

// ============================================================================
// CAMPAIGNS
// ============================================================================

export interface AdCampaign {
  id: string;
  customer_id: string;
  
  campaign_name: string;
  platform: CampaignPlatform;
  campaign_objective: string;
  
  // External IDs
  external_campaign_id?: string;
  external_adset_id?: string;
  external_ad_id?: string;
  external_form_id?: string;
  
  // Targeting
  targeting: {
    locations?: string[]; // Cities/states
    age_min?: number;
    age_max?: number;
    gender?: 'male' | 'female' | 'all';
    interests?: string[];
    behaviors?: string[];
    custom_audiences?: string[];
  };
  
  // Budget
  daily_budget: number; // in paise
  total_budget?: number;
  currency: string;
  
  // Creative
  ad_creative: {
    headline: string;
    description: string;
    image_url?: string;
    video_url?: string;
    cta_text: string;
    cta_type?: string;
  };
  
  // Lead Form
  lead_form_questions: Array<{
    type: 'text' | 'email' | 'phone' | 'select' | 'radio' | 'checkbox';
    label: string;
    required: boolean;
    options?: string[];
  }>;
  
  // Performance
  impressions: number;
  clicks: number;
  conversions: number;
  leads_generated: number;
  amount_spent: number;
  
  ctr?: number;
  cpc?: number;
  cpl?: number;
  conversion_rate?: number;
  
  status: CampaignStatus;
  
  start_date?: string;
  end_date?: string;
  
  notes?: string;
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// LEADS
// ============================================================================

export interface Lead {
  id: string;
  customer_id: string;
  campaign_id?: string;
  
  // Lead Information
  name?: string;
  email?: string;
  phone?: string;
  alternate_phone?: string;
  company?: string;
  job_title?: string;
  
  location?: {
    city?: string;
    state?: string;
    pincode?: string;
  };
  
  // Source
  source: LeadSource;
  source_details?: Record<string, any>;
  
  // Form Responses
  form_responses?: Record<string, any>;
  
  // AI Qualification
  quality_score: number; // 0-100
  qualification_status: QualificationStatus;
  qualification_reason?: string;
  ai_summary?: string;
  
  // Tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  device_type?: string;
  browser?: string;
  ip_address?: string;
  
  // Engagement
  first_contact_at?: string;
  last_contact_at?: string;
  total_messages_exchanged: number;
  
  // Status
  status: LeadStatus;
  lead_stage?: 'prospect' | 'opportunity' | 'customer';
  
  // Assignment
  assigned_to?: string;
  assigned_at?: string;
  
  // Conversion
  is_converted: boolean;
  converted_at?: string;
  conversion_value?: number;
  
  // Billing
  is_charged: boolean;
  charged_amount?: number;
  charged_at?: string;
  is_within_quota: boolean;
  
  internal_notes?: string;
  tags?: string[];
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// MESSAGING
// ============================================================================

export interface Conversation {
  id: string;
  customer_id: string;
  lead_id: string;
  
  channel: MessageChannel;
  status: 'active' | 'archived' | 'closed';
  
  customer_phone?: string;
  lead_phone?: string;
  customer_email?: string;
  lead_email?: string;
  
  last_message_at?: string;
  last_message_from?: 'customer' | 'lead';
  unread_count: number;
  message_count: number;
  
  assigned_to?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  lead_id: string;
  
  sender_type: 'customer' | 'lead' | 'system' | 'ai_bot';
  sender_id?: string;
  
  channel: MessageChannel;
  content: string;
  content_type: 'text' | 'image' | 'video' | 'audio' | 'document';
  
  attachments?: Array<{
    url: string;
    type: string;
    size: number;
    filename: string;
  }>;
  
  whatsapp_message_id?: string;
  email_message_id?: string;
  
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sent_at: string;
  delivered_at?: string;
  read_at?: string;
  failed_reason?: string;
  
  sentiment?: 'positive' | 'neutral' | 'negative';
  intent?: 'inquiry' | 'objection' | 'interested' | 'not_interested';
  ai_suggested_reply?: string;
  
  metadata?: Record<string, any>;
  
  created_at: string;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  customer_id: string;
  
  notification_type: 'new_lead' | 'message_received' | 'campaign_update' | 'payment_due' | 'quota_alert' | 'system';
  title: string;
  message: string;
  
  related_lead_id?: string;
  related_campaign_id?: string;
  
  channels: Array<'in_app' | 'email' | 'whatsapp' | 'sms'>;
  
  is_read: boolean;
  read_at?: string;
  
  action_url?: string;
  action_text?: string;
  
  priority: 'low' | 'normal' | 'high' | 'urgent';
  
  metadata?: Record<string, any>;
  
  created_at: string;
}

// ============================================================================
// ANALYTICS
// ============================================================================

export interface DashboardSummary {
  customer_id: string;
  business_name: string;
  current_plan: SubscriptionPlan;
  
  // Subscription
  leads_used_this_period: number;
  leads_quota: number;
  leads_remaining: number;
  
  // This Month
  leads_this_month: number;
  qualified_leads_this_month: number;
  avg_quality_score_this_month: number;
  
  // Campaigns
  active_campaigns: number;
  total_spent_this_month: number;
}

export interface CampaignStats {
  campaign_id: string;
  stat_date: string;
  
  impressions: number;
  clicks: number;
  conversions: number;
  leads_generated: number;
  amount_spent: number;
  
  ctr: number;
  cpc: number;
  cpl: number;
  conversion_rate: number;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// ============================================================================
// RAZORPAY
// ============================================================================

export interface RazorpayOrder {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, any>;
  created_at: number;
}

export interface RazorpayPayment {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpaySubscription {
  id: string;
  entity: 'subscription';
  plan_id: string;
  customer_id: string;
  status: 'created' | 'authenticated' | 'active' | 'paused' | 'cancelled' | 'completed';
  current_start: number;
  current_end: number;
  charge_at: number;
  start_at: number;
  end_at: number;
  total_count: number;
  paid_count: number;
  customer_notify: boolean;
  quantity: number;
  notes: Record<string, any>;
  created_at: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type IndianCity = 
  | 'Mumbai'
  | 'Delhi'
  | 'Bangalore'
  | 'Hyderabad'
  | 'Chennai'
  | 'Kolkata'
  | 'Pune'
  | 'Ahmedabad'
  | 'Jaipur'
  | 'Lucknow'
  | 'Kanpur'
  | 'Nagpur'
  | 'Indore'
  | 'Thane'
  | 'Bhopal'
  | 'Visakhapatnam'
  | 'Pimpri-Chinchwad'
  | 'Patna'
  | 'Vadodara'
  | 'Ghaziabad'
  | 'Ludhiana'
  | 'Agra'
  | 'Nashik'
  | 'Faridabad'
  | 'Meerut'
  | 'Rajkot'
  | 'Kalyan-Dombivali'
  | 'Vasai-Virar'
  | 'Varanasi'
  | 'Srinagar'
  | 'Aurangabad'
  | 'Dhanbad'
  | 'Amritsar'
  | 'Navi Mumbai'
  | 'Allahabad'
  | 'Ranchi'
  | 'Howrah'
  | 'Coimbatore'
  | 'Jabalpur'
  | 'Gwalior'
  | 'Vijayawada'
  | 'Jodhpur'
  | 'Madurai'
  | 'Raipur'
  | 'Kota';

export type IndianState =
  | 'Andhra Pradesh'
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Bihar'
  | 'Chhattisgarh'
  | 'Goa'
  | 'Gujarat'
  | 'Haryana'
  | 'Himachal Pradesh'
  | 'Jharkhand'
  | 'Karnataka'
  | 'Kerala'
  | 'Madhya Pradesh'
  | 'Maharashtra'
  | 'Manipur'
  | 'Meghalaya'
  | 'Mizoram'
  | 'Nagaland'
  | 'Odisha'
  | 'Punjab'
  | 'Rajasthan'
  | 'Sikkim'
  | 'Tamil Nadu'
  | 'Telangana'
  | 'Tripura'
  | 'Uttar Pradesh'
  | 'Uttarakhand'
  | 'West Bengal'
  | 'Delhi'
  | 'Puducherry'
  | 'Jammu and Kashmir'
  | 'Ladakh';

// Helper functions
export const formatIndianCurrency = (amountInPaise: number): string => {
  const amount = amountInPaise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatIndianNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};


