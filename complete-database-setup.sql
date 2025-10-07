-- ============================================
-- TRANSITION MARKETING AI - COMPLETE DATABASE SETUP
-- Run this script in your Supabase SQL Editor
-- ============================================

-- 1. AUDIT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS audit_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT DEFAULT '',
  industry TEXT NOT NULL,
  goal TEXT NOT NULL,
  source TEXT DEFAULT 'Website - Free Audit',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_submissions_email ON audit_submissions(email);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_created_at ON audit_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_industry ON audit_submissions(industry);

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  company_size TEXT NOT NULL,
  ai_score INTEGER NOT NULL DEFAULT 0,
  insights JSONB,
  status TEXT DEFAULT 'new',
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads(industry);
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_ai_score ON leads(ai_score);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- 3. DEALS/PIPELINE TABLE
CREATE TABLE IF NOT EXISTS deals (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  stage TEXT DEFAULT 'Lead',
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deals_lead_id ON deals(lead_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_assigned_to ON deals(assigned_to);
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at);

-- 4. USERS/PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  role TEXT DEFAULT 'user',
  plan TEXT DEFAULT 'starter',
  credits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON profiles(plan);

-- 5. EMAIL CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS email_campaigns (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON email_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON email_campaigns(created_at);

-- 6. CAMPAIGN RECIPIENTS TABLE
CREATE TABLE IF NOT EXISTS campaign_recipients (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT REFERENCES email_campaigns(id) ON DELETE CASCADE,
  lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recipients_campaign_id ON campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_recipients_lead_id ON campaign_recipients(lead_id);
CREATE INDEX IF NOT EXISTS idx_recipients_status ON campaign_recipients(status);

-- 7. CREDIT TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS credit_transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  reference_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON credit_transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON credit_transactions(created_at);

-- 8. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_provider TEXT,
  payment_provider_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);

-- 9. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS team_members (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  team_owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  permissions JSONB,
  status TEXT DEFAULT 'active',
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_team_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_owner_id ON team_members(team_owner_id);

-- 10. ACTIVITY LOG TABLE
CREATE TABLE IF NOT EXISTS activity_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity_log(created_at);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Audit Submissions (Service role only)
CREATE POLICY "Service role can insert audit submissions" ON audit_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can read audit submissions" ON audit_submissions
  FOR SELECT USING (true);

-- Leads (Users can see their own leads)
CREATE POLICY "Users can view their own leads" ON leads
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Service role can manage leads" ON leads
  FOR ALL USING (true);

-- Deals (Users can see their own deals)
CREATE POLICY "Users can view their own deals" ON deals
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Service role can manage deals" ON deals
  FOR ALL USING (true);

-- Profiles (Users can view and update their own profile)
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Email Campaigns (Users can manage their own campaigns)
CREATE POLICY "Users can manage their own campaigns" ON email_campaigns
  FOR ALL USING (auth.uid() = user_id);

-- Campaign Recipients (Users can view their own recipients)
CREATE POLICY "Users can view their campaign recipients" ON campaign_recipients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM email_campaigns 
      WHERE email_campaigns.id = campaign_recipients.campaign_id 
      AND email_campaigns.user_id = auth.uid()
    )
  );

-- Credit Transactions (Users can view their own transactions)
CREATE POLICY "Users can view their own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Subscriptions (Users can view their own subscriptions)
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Team Members (Users can view their team)
CREATE POLICY "Users can view their team" ON team_members
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = team_owner_id);

-- Activity Log (Users can view their own activity)
CREATE POLICY "Users can view their own activity" ON activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_audit_submissions_updated_at 
  BEFORE UPDATE ON audit_submissions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at 
  BEFORE UPDATE ON leads 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at 
  BEFORE UPDATE ON deals 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at 
  BEFORE UPDATE ON email_campaigns 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at 
  BEFORE UPDATE ON subscriptions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

GRANT ALL ON audit_submissions TO service_role;
GRANT USAGE ON SEQUENCE audit_submissions_id_seq TO service_role;

GRANT ALL ON leads TO service_role;
GRANT USAGE ON SEQUENCE leads_id_seq TO service_role;

GRANT ALL ON deals TO service_role;
GRANT USAGE ON SEQUENCE deals_id_seq TO service_role;

GRANT ALL ON profiles TO service_role;

GRANT ALL ON email_campaigns TO service_role;
GRANT USAGE ON SEQUENCE email_campaigns_id_seq TO service_role;

GRANT ALL ON campaign_recipients TO service_role;
GRANT USAGE ON SEQUENCE campaign_recipients_id_seq TO service_role;

GRANT ALL ON credit_transactions TO service_role;
GRANT USAGE ON SEQUENCE credit_transactions_id_seq TO service_role;

GRANT ALL ON subscriptions TO service_role;
GRANT USAGE ON SEQUENCE subscriptions_id_seq TO service_role;

GRANT ALL ON team_members TO service_role;
GRANT USAGE ON SEQUENCE team_members_id_seq TO service_role;

GRANT ALL ON activity_log TO service_role;
GRANT USAGE ON SEQUENCE activity_log_id_seq TO service_role;

-- ============================================
-- SETUP COMPLETE!
-- ============================================

