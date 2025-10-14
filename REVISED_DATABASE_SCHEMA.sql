-- ============================================================================
-- REVISED DATABASE SCHEMA - AUTOMATED LEAD GENERATION PLATFORM
-- Contacts (Unverified) → Outreach → Leads (Verified)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. CONTACTS (Unverified Leads from AI Scraping)
-- ============================================================================

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  
  -- Location
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  
  -- Source & Campaign
  source TEXT NOT NULL DEFAULT 'ai_scraping' CHECK (source IN ('ai_scraping', 'manual_import', 'csv_upload')),
  scraping_campaign_id UUID REFERENCES scraping_campaigns(id),
  
  -- Quality & Analysis
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  ai_analysis JSONB DEFAULT '{}'::jsonb,
  enrichment_data JSONB DEFAULT '{}'::jsonb, -- LinkedIn, company info, etc.
  
  -- Outreach Status
  outreach_status TEXT DEFAULT 'pending' CHECK (outreach_status IN (
    'pending', 'sent', 'delivered', 'read', 'responded', 'no_response', 'bounced', 'invalid'
  )),
  outreach_attempts INTEGER DEFAULT 0,
  last_outreach_date TIMESTAMP WITH TIME ZONE,
  last_outreach_channel TEXT, -- 'whatsapp' or 'email'
  
  -- Verification
  verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'verified', 'invalid')),
  
  -- Conversion
  converted_to_lead BOOLEAN DEFAULT FALSE,
  lead_id UUID REFERENCES leads(id),
  converted_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  notes TEXT,
  tags TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contacts_customer ON contacts(customer_id);
CREATE INDEX idx_contacts_status ON contacts(outreach_status);
CREATE INDEX idx_contacts_score ON contacts(quality_score DESC);
CREATE INDEX idx_contacts_phone ON contacts(phone);
CREATE INDEX idx_contacts_email ON contacts(email);

-- ============================================================================
-- 2. LEADS (Verified - from Outreach Response or Direct Ads)
-- ============================================================================

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Lead Information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  
  -- Source & Origin
  source TEXT NOT NULL CHECK (source IN ('outreach_response', 'meta_ads', 'google_ads', 'manual_entry')),
  original_contact_id UUID REFERENCES contacts(id), -- If came from outreach
  campaign_id UUID REFERENCES ad_campaigns(id), -- If came from ads
  
  -- Lead Details (flexible JSONB for different industries)
  lead_data JSONB DEFAULT '{}'::jsonb,
  
  -- Quality & Intent
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  intent TEXT CHECK (intent IN ('hot', 'warm', 'cold')),
  ai_analysis JSONB DEFAULT '{}'::jsonb,
  
  -- Status & Pipeline
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'qualified', 'meeting_scheduled', 
    'proposal_sent', 'negotiation', 'won', 'lost'
  )),
  
  -- Assignment
  assigned_to UUID REFERENCES users(id),
  
  -- Communication History
  last_contact_at TIMESTAMP WITH TIME ZONE,
  contact_count INTEGER DEFAULT 0,
  
  -- Platform IDs
  platform_lead_id TEXT, -- ID from Facebook/Google
  
  -- Location
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  
  -- Metadata
  notes TEXT,
  tags TEXT[],
  
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_customer ON leads(customer_id);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(quality_score DESC);
CREATE INDEX idx_leads_received_at ON leads(received_at DESC);

-- ============================================================================
-- 3. AI SCRAPING CAMPAIGNS
-- ============================================================================

CREATE TABLE scraping_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Campaign Details
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'failed')),
  
  -- Search Criteria
  search_criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Example: {
  --   "industry": "real_estate",
  --   "job_titles": ["broker", "agent", "manager"],
  --   "locations": ["Mumbai", "Pune"],
  --   "company_size": "1-50",
  --   "keywords": ["property", "real estate"]
  -- }
  
  -- Sources
  scraping_sources TEXT[] DEFAULT ARRAY['google_maps', 'linkedin', 'directories']::TEXT[],
  
  -- Scheduling
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('once', 'daily', 'weekly', 'monthly')),
  schedule_time TIME DEFAULT '09:00:00',
  
  -- Limits
  max_contacts_per_run INTEGER DEFAULT 100,
  quality_threshold INTEGER DEFAULT 60, -- Only save contacts with score >= this
  
  -- Performance
  contacts_generated INTEGER DEFAULT 0,
  total_contacts INTEGER DEFAULT 0,
  last_run_at TIMESTAMP WITH TIME ZONE,
  next_run_at TIMESTAMP WITH TIME ZONE,
  last_run_status TEXT, -- 'success', 'partial', 'failed'
  last_run_contacts_found INTEGER,
  
  -- Cost Tracking
  cost_per_contact DECIMAL(10, 2) DEFAULT 0.50, -- in INR
  total_cost DECIMAL(10, 2) DEFAULT 0.00,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_scraping_campaigns_customer ON scraping_campaigns(customer_id);
CREATE INDEX idx_scraping_campaigns_status ON scraping_campaigns(status);
CREATE INDEX idx_scraping_campaigns_next_run ON scraping_campaigns(next_run_at);

-- ============================================================================
-- 4. OUTREACH CAMPAIGNS (WhatsApp & Email)
-- ============================================================================

CREATE TABLE outreach_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Campaign Details
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('whatsapp', 'email', 'sms')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'running', 'paused', 'completed')),
  
  -- Target Selection
  target_type TEXT DEFAULT 'filter' CHECK (target_type IN ('all', 'filter', 'selected')),
  target_filters JSONB DEFAULT '{}'::jsonb, -- Quality score, location, source, etc.
  target_contact_ids UUID[], -- Specific contacts if selected
  
  -- Message Content
  message_template TEXT NOT NULL,
  subject TEXT, -- For email
  variables JSONB DEFAULT '{}'::jsonb, -- For personalization: {{name}}, {{company}}, etc.
  
  -- Scheduling
  schedule_type TEXT DEFAULT 'immediate' CHECK (schedule_type IN ('immediate', 'scheduled', 'drip')),
  schedule_date TIMESTAMP WITH TIME ZONE,
  drip_sequence JSONB, -- For drip campaigns: [{delay: 0, template: "..."}, {delay: 2, template: "..."}]
  
  -- Sending Limits
  daily_limit INTEGER DEFAULT 100,
  total_limit INTEGER,
  
  -- Performance Metrics
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  read_count INTEGER DEFAULT 0, -- Email only
  opened_count INTEGER DEFAULT 0, -- Email only
  response_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0, -- Contacts that became leads
  
  -- Cost
  cost_per_message DECIMAL(10, 2) DEFAULT 1.00, -- INR
  total_cost DECIMAL(10, 2) DEFAULT 0.00,
  
  -- Automation
  auto_convert_responders BOOLEAN DEFAULT TRUE, -- Auto move to leads when they respond
  
  launched_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_outreach_campaigns_customer ON outreach_campaigns(customer_id);
CREATE INDEX idx_outreach_campaigns_status ON outreach_campaigns(status);
CREATE INDEX idx_outreach_campaigns_type ON outreach_campaigns(type);

-- ============================================================================
-- 5. OUTREACH MESSAGES (Individual Message Tracking)
-- ============================================================================

CREATE TABLE outreach_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  outreach_campaign_id UUID NOT NULL REFERENCES outreach_campaigns(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Message Details
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'email', 'sms')),
  message_content TEXT NOT NULL,
  subject TEXT, -- For email
  
  -- Status Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'sent', 'delivered', 'read', 'responded', 'bounced', 'failed'
  )),
  
  -- Provider IDs
  provider_message_id TEXT, -- Twilio/SendGrid ID
  
  -- Response
  response_received BOOLEAN DEFAULT FALSE,
  response_text TEXT,
  response_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  responded_at TIMESTAMP WITH TIME ZONE,
  
  -- Error Handling
  error_code TEXT,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_outreach_messages_campaign ON outreach_messages(outreach_campaign_id);
CREATE INDEX idx_outreach_messages_contact ON outreach_messages(contact_id);
CREATE INDEX idx_outreach_messages_status ON outreach_messages(status);
CREATE INDEX idx_outreach_messages_response ON outreach_messages(response_received);

-- ============================================================================
-- 6. AD CAMPAIGNS (Meta & Google)
-- ============================================================================

CREATE TABLE ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Ownership
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Platform
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'google', 'linkedin')),
  campaign_type TEXT DEFAULT 'lead_generation',
  
  -- Campaign Details
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN (
    'draft', 'pending_approval', 'active', 'paused', 'completed', 'failed'
  )),
  
  -- Budget
  budget_type TEXT DEFAULT 'daily' CHECK (budget_type IN ('daily', 'lifetime')),
  budget_amount INTEGER NOT NULL, -- in INR
  spent_amount INTEGER DEFAULT 0,
  
  -- Targeting
  targeting JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Example: {
  --   "locations": ["Mumbai", "Pune"],
  --   "age_range": [25, 45],
  --   "interests": ["real estate", "property"],
  --   "demographics": {...}
  -- }
  
  -- Creative
  ad_creative JSONB DEFAULT '{}'::jsonb,
  -- {
  --   "headline": "...",
  --   "description": "...",
  --   "images": [...],
  --   "cta": "Learn More"
  -- }
  
  -- Lead Form
  lead_form JSONB DEFAULT '{}'::jsonb,
  -- {
  --   "questions": [
  --     {"type": "text", "label": "Full Name", "required": true},
  --     {"type": "phone", "label": "Phone Number", "required": true}
  --   ]
  -- }
  
  -- Platform IDs
  platform_campaign_id TEXT,
  platform_adset_id TEXT,
  platform_ad_id TEXT,
  
  -- Performance
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  cost_per_click DECIMAL(10, 2),
  cost_per_lead DECIMAL(10, 2),
  
  -- Schedule
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  
  -- Optimization
  optimization_goal TEXT DEFAULT 'leads', -- 'leads', 'clicks', 'impressions'
  last_optimized_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ad_campaigns_customer ON ad_campaigns(customer_id);
CREATE INDEX idx_ad_campaigns_platform ON ad_campaigns(platform);
CREATE INDEX idx_ad_campaigns_status ON ad_campaigns(status);

-- ============================================================================
-- 7. CONVERSATIONS (Lead Chat Threads)
-- ============================================================================

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Conversation Details
  channel TEXT NOT NULL DEFAULT 'platform_chat' CHECK (channel IN (
    'platform_chat', 'whatsapp', 'email', 'sms'
  )),
  
  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
  
  -- Metadata
  subject TEXT,
  unread_count INTEGER DEFAULT 0,
  last_message_at TIMESTAMP WITH TIME ZONE,
  last_message_preview TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_lead ON conversations(lead_id);
CREATE INDEX idx_conversations_customer ON conversations(customer_id);
CREATE INDEX idx_conversations_status ON conversations(status);

-- ============================================================================
-- 8. MESSAGES (Individual Chat Messages)
-- ============================================================================

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Message Details
  sender TEXT NOT NULL CHECK (sender IN ('customer', 'lead', 'system', 'bot')),
  message_text TEXT NOT NULL,
  
  -- Channel
  channel TEXT DEFAULT 'platform_chat',
  
  -- Delivery Status
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  
  -- Metadata
  attachments JSONB DEFAULT '[]'::jsonb,
  is_automated BOOLEAN DEFAULT FALSE,
  template_id TEXT,
  
  -- Timestamps
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_lead ON messages(lead_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at DESC);

-- ============================================================================
-- 9. TRIGGERS & FUNCTIONS
-- ============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_scraping_campaigns_updated_at BEFORE UPDATE ON scraping_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_outreach_campaigns_updated_at BEFORE UPDATE ON outreach_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ad_campaigns_updated_at BEFORE UPDATE ON ad_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-convert contact to lead when they respond
CREATE OR REPLACE FUNCTION auto_convert_contact_to_lead()
RETURNS TRIGGER AS $$
DECLARE
  v_contact contacts%ROWTYPE;
  v_lead_id UUID;
BEGIN
  -- Only process if this is a response
  IF NEW.response_received = TRUE AND OLD.response_received = FALSE THEN
    
    -- Get the contact
    SELECT * INTO v_contact FROM contacts WHERE id = NEW.contact_id;
    
    -- Create lead
    INSERT INTO leads (
      customer_id,
      name,
      email,
      phone,
      source,
      original_contact_id,
      lead_data,
      quality_score,
      intent,
      status,
      city,
      state
    ) VALUES (
      v_contact.customer_id,
      v_contact.name,
      v_contact.email,
      v_contact.phone,
      'outreach_response',
      v_contact.id,
      jsonb_build_object('response', NEW.response_text),
      v_contact.quality_score,
      'warm',
      'new',
      v_contact.city,
      v_contact.state
    ) RETURNING id INTO v_lead_id;
    
    -- Update contact
    UPDATE contacts 
    SET 
      converted_to_lead = TRUE,
      lead_id = v_lead_id,
      converted_at = NOW(),
      verification_status = 'verified'
    WHERE id = v_contact.id;
    
    -- Create conversation
    INSERT INTO conversations (lead_id, customer_id, channel)
    VALUES (v_lead_id, v_contact.customer_id, NEW.channel);
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_convert_on_response AFTER UPDATE ON outreach_messages
  FOR EACH ROW EXECUTE FUNCTION auto_convert_contact_to_lead();

-- ============================================================================
-- 10. ANALYTICS VIEWS
-- ============================================================================

-- Contact Performance View
CREATE OR REPLACE VIEW contact_performance AS
SELECT 
  c.customer_id,
  c.source,
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE c.converted_to_lead = TRUE) as converted_contacts,
  ROUND(AVG(c.quality_score), 1) as avg_quality_score,
  COUNT(*) FILTER (WHERE c.outreach_status = 'responded') as responded,
  ROUND(
    COUNT(*) FILTER (WHERE c.outreach_status = 'responded')::DECIMAL / 
    NULLIF(COUNT(*) FILTER (WHERE c.outreach_status IN ('sent', 'delivered', 'responded')), 0) * 100
  , 1) as response_rate_percent
FROM contacts c
GROUP BY c.customer_id, c.source;

-- Lead Pipeline View
CREATE OR REPLACE VIEW lead_pipeline AS
SELECT 
  l.customer_id,
  l.source,
  l.status,
  COUNT(*) as lead_count,
  ROUND(AVG(l.quality_score), 1) as avg_quality_score,
  COUNT(*) FILTER (WHERE l.intent = 'hot') as hot_leads,
  COUNT(*) FILTER (WHERE l.intent = 'warm') as warm_leads,
  COUNT(*) FILTER (WHERE l.intent = 'cold') as cold_leads
FROM leads l
GROUP BY l.customer_id, l.source, l.status;

-- Campaign ROI View
CREATE OR REPLACE VIEW campaign_roi AS
SELECT 
  ac.customer_id,
  ac.platform,
  COUNT(ac.id) as total_campaigns,
  SUM(ac.spent_amount) as total_spent,
  SUM(ac.leads_generated) as total_leads,
  ROUND(AVG(ac.cost_per_lead), 2) as avg_cost_per_lead,
  ROUND(SUM(ac.spent_amount)::DECIMAL / NULLIF(SUM(ac.leads_generated), 0), 2) as overall_cost_per_lead
FROM ad_campaigns ac
GROUP BY ac.customer_id, ac.platform;

-- ============================================================================
-- SCHEMA COMPLETE!
-- ============================================================================

SELECT 'Revised database schema created successfully!' as status;

