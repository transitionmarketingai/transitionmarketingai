-- TransitionAI - Complete Database Schema for AI Agents
-- Migration 001: Initial Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  industry VARCHAR(100),
  plan VARCHAR(50) DEFAULT 'starter', -- starter, growth, enterprise
  status VARCHAR(50) DEFAULT 'active', -- active, suspended, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User business profiles
CREATE TABLE IF NOT EXISTS business_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255),
  website VARCHAR(255),
  target_audience TEXT,
  brand_voice VARCHAR(100), -- professional, casual, friendly, etc.
  marketing_goals TEXT[],
  ideal_customer_profile JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- USAGE TRACKING & LIMITS
-- ============================================================================

CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month VARCHAR(7) NOT NULL, -- YYYY-MM format
  leads_generated INTEGER DEFAULT 0,
  content_created INTEGER DEFAULT 0,
  campaigns_launched INTEGER DEFAULT 0,
  emails_sent INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- ============================================================================
-- AGENT 1: LEAD FINDER
-- ============================================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  job_title VARCHAR(255),
  industry VARCHAR(100),
  company_size VARCHAR(50),
  location VARCHAR(255),
  linkedin_url VARCHAR(500),
  website VARCHAR(500),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted, lost
  source VARCHAR(100), -- LinkedIn, Website, Apollo, etc.
  score INTEGER DEFAULT 0, -- 0-100 lead quality score
  notes TEXT,
  metadata JSONB, -- Additional enrichment data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(score DESC);

-- Lead generation jobs
CREATE TABLE IF NOT EXISTS lead_generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  criteria JSONB NOT NULL, -- industry, location, company_size, keywords
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
  leads_found INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- AGENT 2: CONTENT WRITER
-- ============================================================================

CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  type VARCHAR(50) NOT NULL, -- blog, social, email, ad, landing
  status VARCHAR(50) DEFAULT 'draft', -- draft, review, published, archived
  content_body TEXT,
  seo_keywords VARCHAR(255)[],
  meta_description TEXT,
  target_url VARCHAR(500),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  performance JSONB, -- {views, clicks, conversions, engagement}
  ai_metadata JSONB, -- Generation params, model used, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_content_user_id ON content(user_id);
CREATE INDEX idx_content_type ON content(type);
CREATE INDEX idx_content_status ON content(status);

-- Content generation jobs
CREATE TABLE IF NOT EXISTS content_generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL,
  criteria JSONB NOT NULL, -- topic, tone, length, keywords
  status VARCHAR(50) DEFAULT 'pending',
  content_id UUID REFERENCES content(id) ON DELETE SET NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- AGENT 3: EMAIL PRO
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  from_name VARCHAR(255),
  from_email VARCHAR(255),
  email_body TEXT,
  status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, sending, sent, failed
  recipient_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  performance JSONB, -- {opens, clicks, replies, bounces, unsubscribes}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_email_campaigns_user_id ON email_campaigns(user_id);
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);

-- Email sequences (drip campaigns)
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  emails JSONB NOT NULL, -- Array of email templates with delays
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- AGENT 4: SOCIAL MANAGER
-- ============================================================================

CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- linkedin, twitter, facebook, instagram
  content TEXT NOT NULL,
  media_urls VARCHAR(500)[],
  status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, published, failed
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  post_id VARCHAR(255), -- Platform's post ID
  performance JSONB, -- {likes, comments, shares, impressions}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX idx_social_posts_platform ON social_posts(platform);
CREATE INDEX idx_social_posts_status ON social_posts(status);

-- ============================================================================
-- AGENT 5: SEO EXPERT
-- ============================================================================

CREATE TABLE IF NOT EXISTS seo_keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  keyword VARCHAR(255) NOT NULL,
  search_volume INTEGER,
  difficulty INTEGER, -- 0-100
  current_rank INTEGER,
  target_rank INTEGER,
  tracking_url VARCHAR(500),
  last_checked TIMESTAMP WITH TIME ZONE,
  rank_history JSONB, -- Historical ranking data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seo_keywords_user_id ON seo_keywords(user_id);

-- SEO audits
CREATE TABLE IF NOT EXISTS seo_audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  score INTEGER, -- Overall SEO score 0-100
  issues JSONB, -- Array of issues found
  recommendations JSONB, -- Array of recommendations
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- AGENT 6: DATA ANALYST
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  metrics JSONB NOT NULL, -- All metrics for the day
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, snapshot_date)
);

CREATE INDEX idx_analytics_user_date ON analytics_snapshots(user_id, snapshot_date DESC);

-- AI-generated insights
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  insight_type VARCHAR(100), -- recommendation, alert, opportunity, warning
  title VARCHAR(500),
  description TEXT,
  confidence DECIMAL(3,2), -- 0.00 - 1.00
  actionable BOOLEAN DEFAULT true,
  actioned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- CAMPAIGNS
-- ============================================================================

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- email, social, paid, content
  status VARCHAR(50) DEFAULT 'draft',
  budget DECIMAL(10,2),
  spent DECIMAL(10,2) DEFAULT 0,
  performance JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- BACKGROUND JOBS & AUTOMATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS job_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_type VARCHAR(100) NOT NULL, -- lead_gen, content_gen, email_send, etc.
  priority INTEGER DEFAULT 5, -- 1-10, 10 = highest
  payload JSONB,
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_job_queue_status ON job_queue(status, scheduled_for);
CREATE INDEX idx_job_queue_user_id ON job_queue(user_id);

-- ============================================================================
-- INTEGRATIONS & CONNECTED ACCOUNTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS connected_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform VARCHAR(100) NOT NULL, -- google_analytics, linkedin, facebook, etc.
  account_name VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- ============================================================================
-- NOTIFICATIONS & ALERTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- success, info, warning, error
  title VARCHAR(500) NOT NULL,
  message TEXT,
  read BOOLEAN DEFAULT false,
  action_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id_read ON notifications(user_id, read, created_at DESC);

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
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE ON business_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON email_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only see their own data
CREATE POLICY "Users can view their own data" ON leads
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own data" ON leads
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own data" ON leads
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Similar policies for other tables
CREATE POLICY "Users can view their own content" ON content
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own content" ON content
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert sample data for demo user (will be replaced with real data)
-- This is optional and for testing purposes only

COMMENT ON TABLE leads IS 'Stores all leads generated by Lead Finder Agent';
COMMENT ON TABLE content IS 'Stores all content created by Content Writer Agent';
COMMENT ON TABLE email_campaigns IS 'Email campaigns managed by Email Pro Agent';
COMMENT ON TABLE social_posts IS 'Social media posts managed by Social Manager Agent';
COMMENT ON TABLE seo_keywords IS 'Keywords tracked by SEO Expert Agent';
COMMENT ON TABLE analytics_snapshots IS 'Daily analytics snapshots from Data Analyst Agent';

