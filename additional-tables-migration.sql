-- ============================================================================
-- SCRAPING CAMPAIGNS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS scraping_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Campaign Details
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'failed')),
  
  -- Search Criteria (JSONB for flexibility)
  search_criteria JSONB DEFAULT '{}'::jsonb, -- locations, keywords, industry, etc.
  
  -- Scraping Sources
  scraping_sources TEXT[] DEFAULT ARRAY['google_maps']::TEXT[],
  
  -- Schedule
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  schedule_time TIME DEFAULT '09:00:00',
  next_run_at TIMESTAMP WITH TIME ZONE,
  last_run_at TIMESTAMP WITH TIME ZONE,
  
  -- Limits & Quality
  max_contacts_per_run INTEGER DEFAULT 100,
  quality_threshold INTEGER DEFAULT 60,
  
  -- Results
  contacts_generated INTEGER DEFAULT 0,
  total_runs INTEGER DEFAULT 0,
  successful_runs INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_scraping_campaigns_customer ON scraping_campaigns(customer_id);
CREATE INDEX idx_scraping_campaigns_status ON scraping_campaigns(status);
CREATE INDEX idx_scraping_campaigns_next_run ON scraping_campaigns(next_run_at);

-- RLS Policy
ALTER TABLE scraping_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own scraping campaigns" ON scraping_campaigns
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can create own scraping campaigns" ON scraping_campaigns
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update own scraping campaigns" ON scraping_campaigns
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Trigger for updated_at
CREATE TRIGGER update_scraping_campaigns_updated_at BEFORE UPDATE ON scraping_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- CONTACTS TABLE (for unverified leads from scraping)
-- ============================================================================

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Assignment
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES scraping_campaigns(id),
  
  -- Contact Information
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  company TEXT,
  
  -- Source Information
  source_url TEXT,
  source_platform TEXT DEFAULT 'google_maps',
  
  -- Quality & Status
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'verified', 'invalid')),
  
  -- Location
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  
  -- Metadata
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  converted_to_lead_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contacts_customer ON contacts(customer_id);
CREATE INDEX idx_contacts_campaign ON contacts(campaign_id);
CREATE INDEX idx_contacts_quality_score ON contacts(quality_score);
CREATE INDEX idx_contacts_scraped_at ON contacts(scraped_at DESC);

-- RLS Policy
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own contacts" ON contacts
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can create own contacts" ON contacts
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Trigger for updated_at
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- OUTREACH CAMPAIGNS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS outreach_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Campaign Details
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  
  -- Target Criteria
  target_criteria JSONB DEFAULT '{}'::jsonb, -- quality_score_min, source, etc.
  
  -- Message Templates
  whatsapp_template TEXT,
  email_template TEXT,
  sms_template TEXT,
  
  -- Schedule
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  schedule_time TIME DEFAULT '10:00:00',
  next_run_at TIMESTAMP WITH TIME ZONE,
  last_run_at TIMESTAMP WITH TIME ZONE,
  
  -- Limits
  max_messages_per_run INTEGER DEFAULT 50,
  
  -- Results
  messages_sent INTEGER DEFAULT 0,
  responses_received INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_outreach_campaigns_customer ON outreach_campaigns(customer_id);
CREATE INDEX idx_outreach_campaigns_status ON outreach_campaigns(status);

-- RLS Policy
ALTER TABLE outreach_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own outreach campaigns" ON outreach_campaigns
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can create own outreach campaigns" ON outreach_campaigns
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update own outreach campaigns" ON outreach_campaigns
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Trigger for updated_at
CREATE TRIGGER update_outreach_campaigns_updated_at BEFORE UPDATE ON outreach_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- OUTREACH MESSAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS outreach_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  campaign_id UUID NOT NULL REFERENCES outreach_campaigns(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Message Details
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'email', 'sms')),
  message_text TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed', 'replied')),
  delivery_status JSONB DEFAULT '{}'::jsonb,
  
  -- Response Tracking
  response_received_at TIMESTAMP WITH TIME ZONE,
  response_text TEXT,
  
  -- Conversion
  converted_to_lead BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_outreach_messages_campaign ON outreach_messages(campaign_id);
CREATE INDEX idx_outreach_messages_contact ON outreach_messages(contact_id);
CREATE INDEX idx_outreach_messages_lead ON outreach_messages(lead_id);
CREATE INDEX idx_outreach_messages_customer ON outreach_messages(customer_id);
CREATE INDEX idx_outreach_messages_sent_at ON outreach_messages(sent_at DESC);

-- RLS Policy
ALTER TABLE outreach_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own outreach messages" ON outreach_messages
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can create own outreach messages" ON outreach_messages
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- ============================================================================
-- CONVERSATIONS TABLE (for platform-controlled chat)
-- ============================================================================

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Conversation Details
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- AI Assistant
  ai_enabled BOOLEAN DEFAULT TRUE,
  ai_personality TEXT DEFAULT 'professional',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_lead ON conversations(lead_id);
CREATE INDEX idx_conversations_customer ON conversations(customer_id);
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at DESC);

-- RLS Policy
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own conversations" ON conversations
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can create own conversations" ON conversations
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can update own conversations" ON conversations
  FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- Trigger for updated_at
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- MESSAGES TABLE (for conversation messages)
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Message Content
  message_text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('customer', 'lead', 'ai_assistant')),
  
  -- Channel
  channel TEXT DEFAULT 'platform' CHECK (channel IN ('platform', 'whatsapp', 'email', 'sms')),
  
  -- Status
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  delivery_status JSONB DEFAULT '{}'::jsonb,
  
  -- AI Features
  is_ai_generated BOOLEAN DEFAULT FALSE,
  ai_suggestion BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  is_automated BOOLEAN DEFAULT FALSE,
  template_id TEXT,
  
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_lead ON messages(lead_id);
CREATE INDEX idx_messages_customer ON messages(customer_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at DESC);

-- RLS Policy
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own messages" ON messages
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Customers can send messages" ON messages
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
  );

-- ============================================================================
-- SUBSCRIPTION PLANS SEED DATA
-- ============================================================================

INSERT INTO subscription_plans (plan_id, plan_name, description, price_inr, leads_quota, overage_price_inr, features, max_campaigns, max_team_members, ad_platforms, includes_ai_scoring, includes_whatsapp, includes_email, includes_sms, display_order) VALUES
('starter', 'Starter Plan', 'Perfect for small businesses getting started', 2999, 100, 30, '{"ai_scoring": true, "basic_analytics": true, "email_support": true}', 3, 1, ARRAY['Facebook'], true, true, true, false, 1),
('professional', 'Professional Plan', 'For growing businesses that need more leads', 7999, 500, 25, '{"ai_scoring": true, "advanced_analytics": true, "priority_support": true, "team_collaboration": true}', 10, 5, ARRAY['Facebook', 'Google'], true, true, true, true, 2),
('enterprise', 'Enterprise Plan', 'For large businesses with high volume needs', 19999, 2000, 20, '{"ai_scoring": true, "advanced_analytics": true, "dedicated_support": true, "team_collaboration": true, "white_label": true, "api_access": true}', 50, 25, ARRAY['Facebook', 'Google', 'LinkedIn'], true, true, true, true, 3)
ON CONFLICT (plan_id) DO NOTHING;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Verify tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('scraping_campaigns', 'contacts', 'outreach_campaigns', 'outreach_messages', 'conversations', 'messages')
ORDER BY table_name;
