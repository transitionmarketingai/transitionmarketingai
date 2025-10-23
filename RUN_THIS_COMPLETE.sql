-- ============================================================================
-- ⚠️  IMPORTANT: COPY THIS **ENTIRE** FILE - FROM LINE 1 TO THE VERY END!
-- ============================================================================
-- DO NOT copy only part of this file!
-- DO NOT skip any sections!
-- COPY EVERYTHING from "-- Enable UUID" below to the very last line!
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE 1 of 8: SUBSCRIPTION_PLANS (no dependencies)
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id TEXT UNIQUE NOT NULL,
  plan_name TEXT NOT NULL,
  description TEXT,
  price_inr INTEGER NOT NULL,
  price_quarterly_inr INTEGER,
  price_annual_inr INTEGER,
  leads_quota INTEGER NOT NULL,
  overage_price_inr INTEGER NOT NULL,
  features JSONB DEFAULT '{}'::jsonb,
  max_campaigns INTEGER DEFAULT 5,
  max_team_members INTEGER DEFAULT 1,
  ad_platforms TEXT[] DEFAULT ARRAY['Facebook']::TEXT[],
  includes_ai_scoring BOOLEAN DEFAULT TRUE,
  includes_whatsapp BOOLEAN DEFAULT TRUE,
  includes_email BOOLEAN DEFAULT TRUE,
  includes_sms BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE 2 of 8: CUSTOMERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('real_estate', 'insurance', 'education', 'healthcare', 'finance', 'automotive', 'retail')),
  website TEXT,
  gst_number TEXT,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  alternate_phone TEXT,
  address JSONB DEFAULT '{}'::jsonb,
  service_areas TEXT[] DEFAULT ARRAY[]::TEXT[],
  lead_preferences JSONB DEFAULT '{"propertyTypes": [], "budgetRange": {}, "preferredTimeline": [], "autoAssign": true}'::jsonb,
  current_plan_id UUID REFERENCES subscription_plans(id),
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'past_due', 'cancelled', 'paused')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 0,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referred_by UUID REFERENCES customers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_industry ON customers(industry);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(subscription_status);

-- ============================================================================
-- TABLE 3 of 8: SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'cancelled', 'paused')),
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE,
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  leads_delivered_this_period INTEGER DEFAULT 0,
  leads_quota INTEGER NOT NULL,
  overage_leads INTEGER DEFAULT 0,
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  is_trial BOOLEAN DEFAULT FALSE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end ON subscriptions(current_period_end);

-- ============================================================================
-- TABLE 4 of 8: CAMPAIGNS
-- ============================================================================

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'google', 'linkedin')),
  campaign_type TEXT DEFAULT 'lead_generation',
  platform_campaign_id TEXT,
  platform_adset_id TEXT,
  platform_ad_id TEXT,
  targeting JSONB DEFAULT '{}'::jsonb,
  ad_creative JSONB DEFAULT '{}'::jsonb,
  lead_form_questions JSONB DEFAULT '[]'::jsonb,
  budget_inr INTEGER NOT NULL,
  daily_budget_inr INTEGER,
  spent_inr INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  cost_per_lead_inr DECIMAL(10, 2),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_approval', 'active', 'paused', 'completed', 'failed')),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  last_optimized_at TIMESTAMP WITH TIME ZONE,
  optimization_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_customer ON campaigns(customer_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_platform ON campaigns(platform);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);

-- ============================================================================
-- TABLE 5 of 8: LEADS
-- ============================================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  lead_data JSONB DEFAULT '{}'::jsonb,
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  ai_analysis JSONB DEFAULT '{}'::jsonb,
  intent TEXT CHECK (intent IN ('hot', 'warm', 'cold')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'meeting_scheduled', 'proposal_sent', 'won', 'lost')),
  source TEXT NOT NULL CHECK (source IN ('facebook_lead_ads', 'google_lead_forms', 'ai_outbound', 'manual_entry')),
  platform_lead_id TEXT,
  first_contact_at TIMESTAMP WITH TIME ZONE,
  last_contact_at TIMESTAMP WITH TIME ZONE,
  contact_count INTEGER DEFAULT 0,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_customer ON leads(customer_id);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_quality_score ON leads(quality_score);
CREATE INDEX IF NOT EXISTS idx_leads_received_at ON leads(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

-- ============================================================================
-- TABLE 6 of 8: MESSAGES
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('customer', 'lead', 'system')),
  channel TEXT DEFAULT 'platform' CHECK (channel IN ('platform', 'whatsapp', 'email', 'sms')),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  delivery_status JSONB DEFAULT '{}'::jsonb,
  is_automated BOOLEAN DEFAULT FALSE,
  template_id TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_lead ON messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_customer ON messages(customer_id);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON messages(sent_at DESC);

-- ============================================================================
-- TABLE 7 of 8: NOTIFICATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('new_lead', 'lead_contacted', 'campaign_update', 'payment', 'system', 'support')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  action_label TEXT,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_customer ON notifications(customer_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================================================
-- TABLE 8 of 8: AUDIT_LOGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  user_email TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  changes JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failed', 'error')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_customer ON audit_logs(customer_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_subscription_plans_updated_at ON subscription_plans;
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns;
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

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

DROP TRIGGER IF EXISTS reset_quota_on_period_change ON subscriptions;
CREATE TRIGGER reset_quota_on_period_change BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION reset_subscription_quota();

-- ============================================================================
-- ROW LEVEL SECURITY - Enable on all tables first
-- ============================================================================

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ROW LEVEL SECURITY - Drop existing policies (if any)
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view subscription plans" ON subscription_plans;
DROP POLICY IF EXISTS "Customers can view own data" ON customers;
DROP POLICY IF EXISTS "Customers can update own data" ON customers;
DROP POLICY IF EXISTS "Customers can view own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Customers can view assigned leads" ON leads;
DROP POLICY IF EXISTS "Customers can update assigned leads" ON leads;
DROP POLICY IF EXISTS "Customers can view own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Customers can create own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Customers can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Customers can view own messages" ON messages;
DROP POLICY IF EXISTS "Customers can send messages" ON messages;
DROP POLICY IF EXISTS "Customers can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Customers can update own notifications" ON notifications;

-- ============================================================================
-- ROW LEVEL SECURITY - Create new policies
-- ============================================================================

-- Subscription plans - anyone can view active plans
CREATE POLICY "Anyone can view subscription plans" ON subscription_plans
  FOR SELECT USING (is_active = true AND is_visible = true);

-- Customers - can only see/update their own data
CREATE POLICY "Customers can view own data" ON customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Customers can update own data" ON customers
  FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions - customers can view their own
CREATE POLICY "Customers can view own subscriptions" ON subscriptions
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Leads - customers can view/update their assigned leads
CREATE POLICY "Customers can view assigned leads" ON leads
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update assigned leads" ON leads
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Campaigns - customers can view/create/update their own campaigns
CREATE POLICY "Customers can view own campaigns" ON campaigns
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can create own campaigns" ON campaigns
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update own campaigns" ON campaigns
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Messages - customers can view/send their own messages
CREATE POLICY "Customers can view own messages" ON messages
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can send messages" ON messages
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Notifications - customers can view/update their own notifications
CREATE POLICY "Customers can view own notifications" ON notifications
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update own notifications" ON notifications
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- ============================================================================
-- SEED DATA - Insert default subscription plans
-- ============================================================================

INSERT INTO subscription_plans (plan_id, plan_name, description, price_inr, price_annual_inr, leads_quota, overage_price_inr, max_campaigns, max_team_members, ad_platforms, display_order)
VALUES 
  ('starter', 'Starter', 'Perfect for small businesses getting started', 4999, 49999, 50, 80, 3, 1, ARRAY['facebook'], 1),
  ('growth', 'Growth', 'Ideal for growing businesses', 9999, 99999, 150, 60, 10, 3, ARRAY['facebook', 'google'], 2),
  ('professional', 'Professional', 'For established businesses', 19999, 199999, 500, 35, 25, 10, ARRAY['facebook', 'google', 'linkedin'], 3),
  ('enterprise', 'Enterprise', 'Custom solution for large organizations', 49999, 499999, 2000, 20, -1, -1, ARRAY['facebook', 'google', 'linkedin'], 4)
ON CONFLICT (plan_id) DO NOTHING;

-- ============================================================================
-- SUCCESS! Verify everything was created
-- ============================================================================

SELECT 
  '✅ SUCCESS! All tables created!' as status,
  COUNT(*) as tables_created
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('subscription_plans', 'customers', 'subscriptions', 'campaigns', 'leads', 'messages', 'notifications', 'audit_logs');

-- ============================================================================
-- 🎉 DONE! You should see "8 tables_created" in the result above
-- ============================================================================

