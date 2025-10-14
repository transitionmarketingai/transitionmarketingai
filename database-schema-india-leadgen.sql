-- Lead Generation Platform - Database Schema for Indian Market
-- Built for Supabase/PostgreSQL

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Customers (businesses who pay for leads)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Authentication (links to Supabase auth.users)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Business Information
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL, -- 'real_estate', 'insurance', 'education', 'healthcare', 'finance'
  website TEXT,
  gst_number TEXT,
  
  -- Contact Information
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL, -- WhatsApp number
  alternate_phone TEXT,
  
  -- Address
  address JSONB, -- {street, city, state, pincode, country}
  
  -- Service Details
  service_description TEXT,
  average_deal_value INTEGER, -- in INR
  service_areas JSONB, -- {cities: [], states: []}
  
  -- Target Audience Preferences
  target_audience JSONB, -- {description, age_range, gender, income_level, interests}
  lead_preferences JSONB, -- {min_quality_score, preferred_contact_method, response_time}
  
  -- Subscription
  current_plan TEXT NOT NULL DEFAULT 'starter', -- 'starter', 'growth', 'professional', 'enterprise'
  subscription_status TEXT DEFAULT 'active', -- 'active', 'paused', 'cancelled', 'past_due'
  subscription_start_date TIMESTAMP DEFAULT NOW(),
  subscription_end_date TIMESTAMP,
  billing_cycle TEXT DEFAULT 'monthly', -- 'monthly', 'quarterly', 'annual'
  
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 0,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referred_by UUID REFERENCES customers(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_customers_industry ON customers(industry);
CREATE INDEX idx_customers_status ON customers(subscription_status);
CREATE INDEX idx_customers_plan ON customers(current_plan);

-- ============================================================================
-- SUBSCRIPTION & BILLING
-- ============================================================================

-- Subscription Plans
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Plan Details
  plan_id TEXT UNIQUE NOT NULL, -- 'starter', 'growth', 'professional', 'enterprise'
  plan_name TEXT NOT NULL,
  description TEXT,
  
  -- Pricing (in INR paise - multiply by 100)
  price_monthly INTEGER NOT NULL, -- e.g., 1499900 = ₹14,999
  price_quarterly INTEGER,
  price_annual INTEGER,
  
  -- Quotas
  monthly_lead_quota INTEGER NOT NULL,
  overage_price INTEGER NOT NULL, -- price per extra lead in paise
  
  -- Features (JSONB for flexibility)
  features JSONB, -- {ad_platforms: [], messaging_channels: [], support_level: '', etc}
  
  -- Limits
  max_campaigns INTEGER,
  max_team_members INTEGER,
  api_access BOOLEAN DEFAULT FALSE,
  white_label BOOLEAN DEFAULT FALSE,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default plans
INSERT INTO subscription_plans (plan_id, plan_name, description, price_monthly, price_quarterly, price_annual, monthly_lead_quota, overage_price, features, max_campaigns, max_team_members) VALUES
('starter', 'Starter', 'Perfect for individual agents and small businesses', 799900, 2159700, 7999000, 20, 50000, 
  '{"ad_platforms": ["facebook", "google"], "messaging_channels": ["whatsapp", "email"], "support_level": "email", "analytics": "basic", "crm_integration": false}'::jsonb, 
  5, 1),
('growth', 'Growth', 'Best for growing teams and agencies', 1499900, 4049700, 14999000, 50, 40000,
  '{"ad_platforms": ["facebook", "google", "linkedin"], "messaging_channels": ["whatsapp", "email", "sms"], "support_level": "phone_whatsapp", "analytics": "advanced", "crm_integration": true, "dedicated_manager": true}'::jsonb,
  15, 3),
('professional', 'Professional', 'For established businesses and large teams', 2999900, 8099700, 29999000, 120, 35000,
  '{"ad_platforms": ["facebook", "google", "linkedin", "instagram"], "messaging_channels": ["whatsapp", "email", "sms", "voice"], "support_level": "priority_24x7", "analytics": "premium", "crm_integration": true, "white_label": true, "dedicated_manager": true, "api_access": true}'::jsonb,
  50, 10);

-- Subscriptions (actual customer subscriptions)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  
  -- Razorpay Integration
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_plan_id TEXT,
  razorpay_customer_id TEXT,
  
  -- Subscription Details
  status TEXT DEFAULT 'active', -- 'active', 'past_due', 'cancelled', 'paused'
  current_period_start TIMESTAMP DEFAULT NOW(),
  current_period_end TIMESTAMP,
  
  -- Usage Tracking
  leads_used_this_period INTEGER DEFAULT 0,
  leads_quota INTEGER NOT NULL,
  overage_leads INTEGER DEFAULT 0,
  
  -- Billing
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMP,
  cancellation_reason TEXT,
  
  -- Trial
  trial_start TIMESTAMP,
  trial_end TIMESTAMP,
  is_trial BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_razorpay ON subscriptions(razorpay_subscription_id);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  
  -- Invoice Details
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_date TIMESTAMP DEFAULT NOW(),
  due_date TIMESTAMP,
  
  -- Amounts (in paise)
  subtotal INTEGER NOT NULL,
  tax_amount INTEGER DEFAULT 0, -- GST 18%
  discount_amount INTEGER DEFAULT 0,
  total_amount INTEGER NOT NULL,
  amount_paid INTEGER DEFAULT 0,
  
  -- Razorpay
  razorpay_invoice_id TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  paid_at TIMESTAMP,
  
  -- Line Items
  line_items JSONB, -- [{description, quantity, unit_price, amount}]
  
  -- Tax Details
  billing_address JSONB,
  gst_number TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- Payment Transactions
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES invoices(id),
  
  -- Razorpay Details
  razorpay_payment_id TEXT UNIQUE,
  razorpay_order_id TEXT,
  razorpay_signature TEXT,
  
  -- Transaction Details
  amount INTEGER NOT NULL, -- in paise
  currency TEXT DEFAULT 'INR',
  payment_method TEXT, -- 'upi', 'card', 'netbanking', 'wallet'
  payment_method_details JSONB,
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'success', 'failed'
  error_code TEXT,
  error_description TEXT,
  
  -- Metadata
  description TEXT,
  notes JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_customer ON payment_transactions(customer_id);
CREATE INDEX idx_transactions_razorpay ON payment_transactions(razorpay_payment_id);

-- ============================================================================
-- CAMPAIGNS & ADS
-- ============================================================================

-- Ad Campaigns (campaigns YOU run for customers)
CREATE TABLE ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Campaign Details
  campaign_name TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'facebook', 'google', 'linkedin', 'instagram'
  campaign_objective TEXT, -- 'lead_generation', 'conversions', 'traffic'
  
  -- External IDs (from ad platforms)
  external_campaign_id TEXT, -- Facebook campaign ID, Google campaign ID, etc.
  external_adset_id TEXT,
  external_ad_id TEXT,
  external_form_id TEXT, -- Lead form ID
  
  -- Targeting
  targeting JSONB, -- {locations, age_range, gender, interests, behaviors, etc}
  
  -- Budget
  daily_budget INTEGER, -- in paise
  total_budget INTEGER,
  currency TEXT DEFAULT 'INR',
  
  -- Creative
  ad_creative JSONB, -- {headline, description, image_url, video_url, cta_text, etc}
  
  -- Lead Form Configuration
  lead_form_questions JSONB, -- [{type, label, required, options}]
  
  -- Performance Metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  amount_spent INTEGER DEFAULT 0, -- in paise
  
  -- Calculated Metrics
  ctr DECIMAL(5,2), -- Click-through rate
  cpc INTEGER, -- Cost per click in paise
  cpl INTEGER, -- Cost per lead in paise
  conversion_rate DECIMAL(5,2),
  
  -- Status
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed', 'archived'
  
  -- Schedule
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  
  -- Metadata
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_campaigns_customer ON ad_campaigns(customer_id);
CREATE INDEX idx_campaigns_platform ON ad_campaigns(platform);
CREATE INDEX idx_campaigns_status ON ad_campaigns(status);
CREATE INDEX idx_campaigns_external ON ad_campaigns(external_campaign_id);

-- ============================================================================
-- LEADS
-- ============================================================================

-- Leads (the actual leads generated)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES ad_campaigns(id),
  
  -- Lead Information
  name TEXT,
  email TEXT,
  phone TEXT,
  alternate_phone TEXT,
  
  -- Additional Details
  company TEXT,
  job_title TEXT,
  location JSONB, -- {city, state, pincode}
  
  -- Source Tracking
  source TEXT NOT NULL, -- 'facebook_lead_ad', 'google_lead_form', 'ai_outbound_email', 'ai_outbound_whatsapp'
  source_details JSONB, -- {ad_id, campaign_id, form_id, etc}
  
  -- Lead Form Responses
  form_responses JSONB, -- {question_id: answer, ...}
  
  -- AI Qualification
  quality_score INTEGER DEFAULT 0, -- 0-100
  qualification_status TEXT DEFAULT 'pending', -- 'pending', 'qualified', 'unqualified', 'hot', 'warm', 'cold'
  qualification_reason TEXT,
  ai_summary TEXT,
  
  -- Behavioral Data
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  ip_address INET,
  
  -- Engagement
  first_contact_at TIMESTAMP,
  last_contact_at TIMESTAMP,
  total_messages_exchanged INTEGER DEFAULT 0,
  
  -- Lead Status
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost', 'duplicate'
  lead_stage TEXT, -- 'prospect', 'opportunity', 'customer'
  
  -- Assignment
  assigned_to UUID, -- Team member ID
  assigned_at TIMESTAMP,
  
  -- Conversion
  is_converted BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMP,
  conversion_value INTEGER, -- Deal value in INR
  
  -- Billing
  is_charged BOOLEAN DEFAULT FALSE,
  charged_amount INTEGER, -- Amount charged to customer in paise
  charged_at TIMESTAMP,
  is_within_quota BOOLEAN DEFAULT TRUE,
  
  -- Notes
  internal_notes TEXT,
  tags TEXT[],
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_customer ON leads(customer_id);
CREATE INDEX idx_leads_campaign ON leads(campaign_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_quality ON leads(quality_score);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- Lead Activities (tracking all interactions)
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Activity Details
  activity_type TEXT NOT NULL, -- 'created', 'contacted', 'email_sent', 'whatsapp_sent', 'call_made', 'note_added', 'status_changed'
  activity_description TEXT,
  
  -- Metadata
  metadata JSONB,
  performed_by UUID, -- User who performed the action
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activities_lead ON lead_activities(lead_id);
CREATE INDEX idx_activities_customer ON lead_activities(customer_id);
CREATE INDEX idx_activities_type ON lead_activities(activity_type);

-- ============================================================================
-- MESSAGING
-- ============================================================================

-- Conversations (message threads with leads)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  
  -- Conversation Details
  channel TEXT NOT NULL, -- 'whatsapp', 'email', 'sms', 'voice'
  status TEXT DEFAULT 'active', -- 'active', 'archived', 'closed'
  
  -- Participants
  customer_phone TEXT,
  lead_phone TEXT,
  customer_email TEXT,
  lead_email TEXT,
  
  -- External IDs
  whatsapp_conversation_id TEXT,
  
  -- Tracking
  last_message_at TIMESTAMP,
  last_message_from TEXT, -- 'customer', 'lead'
  unread_count INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  
  -- Assignment
  assigned_to UUID,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_customer ON conversations(customer_id);
CREATE INDEX idx_conversations_lead ON conversations(lead_id);
CREATE INDEX idx_conversations_channel ON conversations(channel);
CREATE INDEX idx_conversations_status ON conversations(status);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  
  -- Message Details
  sender_type TEXT NOT NULL, -- 'customer', 'lead', 'system', 'ai_bot'
  sender_id UUID,
  
  channel TEXT NOT NULL, -- 'whatsapp', 'email', 'sms'
  
  -- Content
  content TEXT,
  content_type TEXT DEFAULT 'text', -- 'text', 'image', 'video', 'audio', 'document'
  
  -- Attachments
  attachments JSONB, -- [{url, type, size, filename}]
  
  -- External IDs
  whatsapp_message_id TEXT,
  email_message_id TEXT,
  
  -- Delivery Status
  status TEXT DEFAULT 'sent', -- 'sent', 'delivered', 'read', 'failed'
  sent_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP,
  read_at TIMESTAMP,
  failed_reason TEXT,
  
  -- AI Analysis
  sentiment TEXT, -- 'positive', 'neutral', 'negative'
  intent TEXT, -- 'inquiry', 'objection', 'interested', 'not_interested'
  ai_suggested_reply TEXT,
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_lead ON messages(lead_id);
CREATE INDEX idx_messages_channel ON messages(channel);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

-- ============================================================================
-- NOTIFICATIONS
-- ============================================================================

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Notification Details
  notification_type TEXT NOT NULL, -- 'new_lead', 'message_received', 'campaign_update', 'payment_due', 'quota_alert'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Related Entities
  related_lead_id UUID REFERENCES leads(id),
  related_campaign_id UUID REFERENCES ad_campaigns(id),
  
  -- Channels
  channels TEXT[], -- ['in_app', 'email', 'whatsapp', 'sms']
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  
  -- Actions
  action_url TEXT,
  action_text TEXT,
  
  -- Priority
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_customer ON notifications(customer_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- ============================================================================
-- ANALYTICS & REPORTING
-- ============================================================================

-- Daily Campaign Stats (aggregated daily for performance)
CREATE TABLE daily_campaign_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  campaign_id UUID REFERENCES ad_campaigns(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Date
  stat_date DATE NOT NULL,
  
  -- Metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  amount_spent INTEGER DEFAULT 0, -- in paise
  
  -- Calculated
  ctr DECIMAL(5,2),
  cpc INTEGER,
  cpl INTEGER,
  conversion_rate DECIMAL(5,2),
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(campaign_id, stat_date)
);

CREATE INDEX idx_daily_stats_campaign ON daily_campaign_stats(campaign_id);
CREATE INDEX idx_daily_stats_date ON daily_campaign_stats(stat_date DESC);

-- Customer Analytics (monthly aggregates)
CREATE TABLE customer_monthly_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Period
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  
  -- Lead Metrics
  total_leads INTEGER DEFAULT 0,
  qualified_leads INTEGER DEFAULT 0,
  converted_leads INTEGER DEFAULT 0,
  average_quality_score DECIMAL(5,2),
  
  -- Revenue Metrics
  total_conversion_value INTEGER DEFAULT 0, -- in paise
  average_conversion_value INTEGER,
  
  -- Engagement Metrics
  total_messages_sent INTEGER DEFAULT 0,
  total_conversations INTEGER DEFAULT 0,
  average_response_time INTEGER, -- in minutes
  
  -- Campaign Metrics
  active_campaigns INTEGER DEFAULT 0,
  total_ad_spend INTEGER DEFAULT 0,
  average_cpl INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(customer_id, year, month)
);

CREATE INDEX idx_monthly_stats_customer ON customer_monthly_stats(customer_id);
CREATE INDEX idx_monthly_stats_period ON customer_monthly_stats(year, month);

-- ============================================================================
-- WEBHOOKS & INTEGRATIONS
-- ============================================================================

-- Webhook Logs (for Facebook/Google webhooks)
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Webhook Details
  source TEXT NOT NULL, -- 'facebook', 'google', 'razorpay'
  event_type TEXT NOT NULL,
  
  -- Request Data
  payload JSONB NOT NULL,
  headers JSONB,
  
  -- Processing
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMP,
  error_message TEXT,
  
  -- Related Entity
  related_lead_id UUID REFERENCES leads(id),
  related_campaign_id UUID REFERENCES ad_campaigns(id),
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_webhooks_source ON webhook_logs(source);
CREATE INDEX idx_webhooks_processed ON webhook_logs(processed);
CREATE INDEX idx_webhooks_created ON webhook_logs(created_at DESC);

-- CRM Integrations
CREATE TABLE crm_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Integration Details
  crm_type TEXT NOT NULL, -- 'salesforce', 'hubspot', 'zoho', 'custom'
  
  -- Credentials (encrypted)
  api_key TEXT,
  api_secret TEXT,
  access_token TEXT,
  refresh_token TEXT,
  
  -- Configuration
  field_mapping JSONB, -- Map platform fields to CRM fields
  sync_settings JSONB,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  last_sync_at TIMESTAMP,
  sync_status TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_crm_customer ON crm_integrations(customer_id);

-- ============================================================================
-- TEAM & PERMISSIONS (for multi-user accounts)
-- ============================================================================

-- Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Member Details
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Role
  role TEXT DEFAULT 'member', -- 'owner', 'admin', 'manager', 'member'
  permissions JSONB, -- {can_view_leads, can_contact_leads, can_manage_campaigns, etc}
  
  -- Status
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'invited'
  invited_at TIMESTAMP,
  joined_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(customer_id, email)
);

CREATE INDEX idx_team_customer ON team_members(customer_id);
CREATE INDEX idx_team_user ON team_members(user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to all tables with updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON ad_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check and update lead quota
CREATE OR REPLACE FUNCTION check_lead_quota(p_customer_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_subscription RECORD;
  v_result JSONB;
BEGIN
  -- Get current subscription
  SELECT * INTO v_subscription
  FROM subscriptions
  WHERE customer_id = p_customer_id
    AND status = 'active'
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'within_quota', false,
      'reason', 'no_active_subscription'
    );
  END IF;
  
  -- Check quota
  IF v_subscription.leads_used_this_period < v_subscription.leads_quota THEN
    -- Within quota
    RETURN jsonb_build_object(
      'within_quota', true,
      'used', v_subscription.leads_used_this_period,
      'quota', v_subscription.leads_quota,
      'remaining', v_subscription.leads_quota - v_subscription.leads_used_this_period,
      'charge_amount', 0
    );
  ELSE
    -- Over quota - charge for overage
    RETURN jsonb_build_object(
      'within_quota', false,
      'used', v_subscription.leads_used_this_period,
      'quota', v_subscription.leads_quota,
      'overage', v_subscription.leads_used_this_period - v_subscription.leads_quota + 1,
      'charge_amount', (SELECT overage_price FROM subscription_plans WHERE id = v_subscription.plan_id)
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to increment lead usage
CREATE OR REPLACE FUNCTION increment_lead_usage(p_customer_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE subscriptions
  SET leads_used_this_period = leads_used_this_period + 1,
      overage_leads = CASE 
        WHEN leads_used_this_period >= leads_quota 
        THEN overage_leads + 1 
        ELSE overage_leads 
      END
  WHERE customer_id = p_customer_id
    AND status = 'active';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Customers can only see their own data
CREATE POLICY "Customers can view own data" ON customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Customers can update own data" ON customers
  FOR UPDATE USING (auth.uid() = user_id);

-- Leads policies
CREATE POLICY "Customers can view own leads" ON leads
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update own leads" ON leads
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Similar policies for other tables...

-- ============================================================================
-- SAMPLE DATA (for development)
-- ============================================================================

-- This will be populated when customers sign up
-- For now, schema is ready!

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================

-- Customer Dashboard Summary View
CREATE OR REPLACE VIEW customer_dashboard_summary AS
SELECT 
  c.id as customer_id,
  c.business_name,
  c.current_plan,
  
  -- Subscription
  s.leads_used_this_period,
  s.leads_quota,
  (s.leads_quota - s.leads_used_this_period) as leads_remaining,
  
  -- This Month Leads
  COUNT(DISTINCT CASE WHEN l.created_at >= date_trunc('month', CURRENT_DATE) THEN l.id END) as leads_this_month,
  COUNT(DISTINCT CASE WHEN l.created_at >= date_trunc('month', CURRENT_DATE) AND l.qualification_status IN ('qualified', 'hot', 'warm') THEN l.id END) as qualified_leads_this_month,
  
  -- Average Quality Score
  AVG(CASE WHEN l.created_at >= date_trunc('month', CURRENT_DATE) THEN l.quality_score END) as avg_quality_score_this_month,
  
  -- Active Campaigns
  COUNT(DISTINCT CASE WHEN ac.status = 'active' THEN ac.id END) as active_campaigns,
  
  -- Total Spent This Month
  SUM(CASE WHEN ac.status = 'active' THEN ac.amount_spent ELSE 0 END) as total_spent_this_month
  
FROM customers c
LEFT JOIN subscriptions s ON s.customer_id = c.id AND s.status = 'active'
LEFT JOIN leads l ON l.customer_id = c.id
LEFT JOIN ad_campaigns ac ON ac.customer_id = c.id
GROUP BY c.id, c.business_name, c.current_plan, s.leads_used_this_period, s.leads_quota;

-- Done! Database schema is ready.


