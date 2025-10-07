-- Additional Tables for Lead Generation Business Model
-- Run this in Supabase SQL Editor after complete-database-setup.sql

-- Table: unlocked_leads (tracks which leads each user has unlocked)
CREATE TABLE IF NOT EXISTS unlocked_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  credits_spent INTEGER DEFAULT 5 NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lead_id)
);

CREATE INDEX IF NOT EXISTS idx_unlocked_leads_user ON unlocked_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_unlocked_leads_lead ON unlocked_leads(lead_id);
CREATE INDEX IF NOT EXISTS idx_unlocked_leads_date ON unlocked_leads(unlocked_at);

-- RLS for unlocked_leads
ALTER TABLE unlocked_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own unlocked leads" ON unlocked_leads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can unlock leads" ON unlocked_leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Table: lead_searches (tracks all lead generation searches)
CREATE TABLE IF NOT EXISTS lead_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  filters JSONB NOT NULL,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_searches_user ON lead_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_lead_searches_date ON lead_searches(created_at);

-- RLS for lead_searches
ALTER TABLE lead_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own searches" ON lead_searches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create searches" ON lead_searches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Table: saved_searches (user's saved search templates)
CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  filters JSONB NOT NULL,
  last_run TIMESTAMPTZ,
  total_runs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_searches_user ON saved_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_searches_name ON saved_searches(name);

-- RLS for saved_searches
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their saved searches" ON saved_searches
  FOR ALL USING (auth.uid() = user_id);

-- Function: Check if lead is unlocked for user
CREATE OR REPLACE FUNCTION is_lead_unlocked(p_user_id UUID, p_lead_id BIGINT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM unlocked_leads 
    WHERE user_id = p_user_id AND lead_id = p_lead_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get user's unlocked lead IDs
CREATE OR REPLACE FUNCTION get_unlocked_lead_ids(p_user_id UUID)
RETURNS BIGINT[] AS $$
BEGIN
  RETURN ARRAY(
    SELECT lead_id FROM unlocked_leads 
    WHERE user_id = p_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Unlock lead (with credit check)
CREATE OR REPLACE FUNCTION unlock_lead(
  p_user_id UUID,
  p_lead_id BIGINT,
  p_credits_cost INTEGER DEFAULT 5
)
RETURNS TABLE(success BOOLEAN, message TEXT, credits_remaining INTEGER) AS $$
DECLARE
  v_current_credits INTEGER;
  v_new_credits INTEGER;
BEGIN
  -- Check if already unlocked
  IF is_lead_unlocked(p_user_id, p_lead_id) THEN
    RETURN QUERY SELECT FALSE, 'Lead already unlocked', NULL::INTEGER;
    RETURN;
  END IF;

  -- Get current credits
  SELECT credits INTO v_current_credits
  FROM profiles
  WHERE id = p_user_id;

  -- Check sufficient credits
  IF v_current_credits < p_credits_cost THEN
    RETURN QUERY SELECT FALSE, 'Insufficient credits', v_current_credits;
    RETURN;
  END IF;

  -- Deduct credits
  v_new_credits := v_current_credits - p_credits_cost;
  
  UPDATE profiles 
  SET credits = v_new_credits 
  WHERE id = p_user_id;

  -- Record unlock
  INSERT INTO unlocked_leads (user_id, lead_id, credits_spent)
  VALUES (p_user_id, p_lead_id, p_credits_cost);

  -- Log credit transaction
  INSERT INTO credit_transactions (user_id, amount, type, description, reference_id)
  VALUES (
    p_user_id,
    -p_credits_cost,
    'usage',
    'Unlocked lead contact information',
    'lead_unlock_' || p_lead_id
  );

  RETURN QUERY SELECT TRUE, 'Lead unlocked successfully', v_new_credits;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT ALL ON unlocked_leads TO service_role;
GRANT ALL ON lead_searches TO service_role;
GRANT ALL ON saved_searches TO service_role;

GRANT EXECUTE ON FUNCTION is_lead_unlocked TO service_role;
GRANT EXECUTE ON FUNCTION get_unlocked_lead_ids TO service_role;
GRANT EXECUTE ON FUNCTION unlock_lead TO service_role;

-- Success message
SELECT 'New lead generation tables created successfully! ✅' as status;

