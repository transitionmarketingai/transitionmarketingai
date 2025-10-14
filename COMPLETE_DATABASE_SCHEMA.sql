-- ============================================================================
-- TRANSITION MARKETING AI - LEAD GENERATION PLATFORM
-- Complete Database Schema for Subscription Model
-- Built for Supabase PostgreSQL
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. CUSTOMERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Authentication (links to Supabase auth.users)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  
  -- Business Information
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('real_estate', 'insurance', 'education', 'healthcare', 'finance', 'automotive', 'retail')),
  website TEXT,
  gst_number TEXT,
  
  -- Contact Information
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  alternate_phone TEXT,
  
  -- Address (JSONB for flexibility)
  address JSONB DEFAULT '{}'::jsonb,
  
  -- Service Areas (cities/states they operate in)
  service_areas TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Lead Preferences
  lead_preferences JSONB DEFAULT '{
    "propertyTypes": [],
    "budgetRange": {},
    "preferredTimeline": [],
    "autoAssign": true
  }'::jsonb,
  
  -- Current Subscription
  current_plan_id UUID REFERENCES subscription_plans(id),
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'past_due', 'cancelled', 'paused')),
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 0,
  
  -- Marketing Attribution
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referred_by UUID REFERENCES customers(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for customers
CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_industry ON customers(industry);
CREATE INDEX idx_customers_status ON customers(subscription_status);

-- ============================================================================
-- 2. SUBSCRIPTION PLANS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Plan Identification
  plan_id TEXT UNIQUE NOT NULL,
  plan_name TEXT NOT NULL,
  description TEXT,
  
  -- Pricing (in INR)
  price_inr INTEGER NOT NULL, -- Monthly price
  price_quarterly_inr INTEGER, -- Quarterly price (if applicable)
  price_annual_inr INTEGER, -- Annual price (if applicable)
  
  -- Lead Quota
  leads_quota INTEGER NOT NULL, -- Leads per month
  overage_price_inr INTEGER NOT NULL, -- Price per extra lead
  
  -- Features
  features JSONB DEFAULT '{}'::jsonb,
  
  -- Limits
  max_campaigns INTEGER DEFAULT 5,
  max_team_members INTEGER DEFAULT 1,
  ad_platforms TEXT[] DEFAULT ARRAY['Facebook']::TEXT[],
  
  -- Add-ons
  includes_ai_scoring BOOLEAN DEFAULT TRUE,
  includes_whatsapp BOOLEAN DEFAULT TRUE,
  includes_email BOOLEAN DEFAULT TRUE,
  includes_sms BOOLEAN DEFAULT FALSE,
  
  -- Admin
  is_active BOOLEAN DEFAULT TRUE,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 3. SUBSCRIPTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id),
  
  -- Subscription Details
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'cancelled', 'paused')),
  
  -- Billing
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE,
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  
  -- Lead Tracking
  leads_delivered_this_period INTEGER DEFAULT 0,
  leads_quota INTEGER NOT NULL,
  overage_leads INTEGER DEFAULT 0,
  
  -- Trial
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  is_trial BOOLEAN DEFAULT FALSE,
  
  -- Cancellation
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_period_end ON subscriptions(current_period_end);

-- ============================================================================
-- 4. LEADS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Assignment
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id),
  
  -- Lead Information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  
  -- Lead Details (flexible for different industries)
  lead_data JSONB DEFAULT '{}'::jsonb, -- Property type, budget, timeline, etc.
  
  -- Quality
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  ai_analysis JSONB DEFAULT '{}'::jsonb, -- AI scoring breakdown
  intent TEXT CHECK (intent IN ('hot', 'warm', 'cold')),
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'meeting_scheduled', 'proposal_sent', 'won', 'lost')),
  
  -- Source
  source TEXT NOT NULL CHECK (source IN ('facebook_lead_ads', 'google_lead_forms', 'ai_outbound', 'manual_entry')),
  platform_lead_id TEXT, -- ID from Facebook/Google
  
  -- Contact History
  first_contact_at TIMESTAMP WITH TIME ZONE,
  last_contact_at TIMESTAMP WITH TIME ZONE,
  contact_count INTEGER DEFAULT 0,
  
  -- Location
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  
  -- Metadata
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE, -- Lead freshness
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_customer ON leads(customer_id);
CREATE INDEX idx_leads_campaign ON leads(campaign_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_quality_score ON leads(quality_score);
CREATE INDEX idx_leads_received_at ON leads(received_at DESC);
CREATE INDEX idx_leads_phone ON leads(phone);

-- ============================================================================
-- 5. CAMPAIGNS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Campaign Details
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'google', 'linkedin')),
  campaign_type TEXT DEFAULT 'lead_generation',
  
  -- Platform IDs
  platform_campaign_id TEXT,
  platform_adset_id TEXT,
  platform_ad_id TEXT,
  
  -- Targeting
  targeting JSONB DEFAULT '{}'::jsonb, -- Location, demographics, interests
  
  -- Creative
  ad_creative JSONB DEFAULT '{}'::jsonb, -- Images, copy, CTA
  lead_form_questions JSONB DEFAULT '[]'::jsonb,
  
  -- Budget
  budget_inr INTEGER NOT NULL,
  daily_budget_inr INTEGER,
  spent_inr INTEGER DEFAULT 0,
  
  -- Performance
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  cost_per_lead_inr DECIMAL(10, 2),
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_approval', 'active', 'paused', 'completed', 'failed')),
  
  -- Schedule
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  
  -- Optimization
  last_optimized_at TIMESTAMP WITH TIME ZONE,
  optimization_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_campaigns_customer ON campaigns(customer_id);
CREATE INDEX idx_campaigns_platform ON campaigns(platform);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- ============================================================================
-- 6. MESSAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Message Content
  message_text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('customer', 'lead', 'system')),
  
  -- Channel
  channel TEXT DEFAULT 'platform' CHECK (channel IN ('platform', 'whatsapp', 'email', 'sms')),
  
  -- Status
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  delivery_status JSONB DEFAULT '{}'::jsonb,
  
  -- Metadata
  is_automated BOOLEAN DEFAULT FALSE,
  template_id TEXT,
  
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_lead ON messages(lead_id);
CREATE INDEX idx_messages_customer ON messages(customer_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at DESC);

-- ============================================================================
-- 7. NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Recipient
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Notification Details
  type TEXT NOT NULL CHECK (type IN ('new_lead', 'lead_contacted', 'campaign_update', 'payment', 'system', 'support')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Associated Records
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Actions
  action_url TEXT,
  action_label TEXT,
  
  -- Priority
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_customer ON notifications(customer_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================================================
-- 8. AUDIT LOGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Actor
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  user_email TEXT,
  
  -- Action
  action TEXT NOT NULL, -- 'created', 'updated', 'deleted', 'viewed', 'exported'
  resource_type TEXT NOT NULL, -- 'lead', 'campaign', 'subscription', etc.
  resource_id UUID,
  
  -- Details
  changes JSONB DEFAULT '{}'::jsonb, -- What changed
  metadata JSONB DEFAULT '{}'::jsonb, -- IP, user agent, etc.
  
  -- Result
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failed', 'error')),
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_logs_customer ON audit_logs(customer_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- 9. FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all relevant tables
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to reset lead quota at period start
CREATE OR REPLACE FUNCTION reset_subscription_quota()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.current_period_start > OLD.current_period_start THEN
    NEW.leads_delivered_this_period = 0;
    NEW.overage_leads = 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reset_quota_on_period_change BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION reset_subscription_quota();

-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Customers can only see their own data
CREATE POLICY "Customers can view own data" ON customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Customers can update own data" ON customers
  FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions - customers can view their own
CREATE POLICY "Customers can view own subscriptions" ON subscriptions
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Leads - customers can view their assigned leads
CREATE POLICY "Customers can view assigned leads" ON leads
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update assigned leads" ON leads
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Campaigns - customers can view their own campaigns
CREATE POLICY "Customers can view own campaigns" ON campaigns
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Messages - customers can view their conversations
CREATE POLICY "Customers can view own messages" ON messages
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can send messages" ON messages
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Notifications - customers can view their own
CREATE POLICY "Customers can view own notifications" ON notifications
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update own notifications" ON notifications
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- ============================================================================
-- 11. ANALYTICS VIEWS
-- ============================================================================

-- Customer Dashboard Stats View
CREATE OR REPLACE VIEW customer_dashboard_stats AS
SELECT 
  c.id as customer_id,
  c.business_name,
  COUNT(DISTINCT l.id) as total_leads,
  COUNT(DISTINCT CASE WHEN l.status = 'new' THEN l.id END) as new_leads,
  COUNT(DISTINCT CASE WHEN l.status = 'contacted' THEN l.id END) as contacted_leads,
  COUNT(DISTINCT CASE WHEN l.status = 'won' THEN l.id END) as won_leads,
  ROUND(AVG(l.quality_score), 1) as avg_quality_score,
  s.leads_quota,
  s.leads_delivered_this_period,
  sp.plan_name,
  sp.price_inr
FROM customers c
LEFT JOIN leads l ON l.customer_id = c.id AND l.received_at >= CURRENT_DATE - INTERVAL '30 days'
LEFT JOIN subscriptions s ON s.customer_id = c.id AND s.status = 'active'
LEFT JOIN subscription_plans sp ON sp.id = s.plan_id
GROUP BY c.id, c.business_name, s.leads_quota, s.leads_delivered_this_period, sp.plan_name, sp.price_inr;

-- ============================================================================
-- SCHEMA SETUP COMPLETE!
-- ============================================================================

-- Verify tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;


