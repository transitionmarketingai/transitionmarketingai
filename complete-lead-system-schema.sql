-- COMPLETE LEAD GENERATION SYSTEM - DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- ==================================================
-- 1. USER PREFERENCES TABLE
-- ==================================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  target_industries TEXT[] DEFAULT '{}',
  target_locations TEXT[] DEFAULT '{}',
  company_sizes TEXT[] DEFAULT '{}',
  budget TEXT,
  keywords TEXT[] DEFAULT '{}',
  monthly_lead_goal INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- ==================================================
-- 2. SAVED SEARCHES TABLE
-- ==================================================
CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  criteria JSONB NOT NULL,
  last_used TIMESTAMPTZ,
  total_leads_found INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_saved_searches_user_id ON saved_searches(user_id);
CREATE INDEX idx_saved_searches_favorite ON saved_searches(is_favorite);

ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own searches" ON saved_searches
  FOR ALL USING (auth.uid() = user_id);

-- ==================================================
-- 3. UPDATE LEADS TABLE FOR UNLOCKING
-- ==================================================

-- Add unlocking columns
ALTER TABLE leads ADD COLUMN IF NOT EXISTS is_unlocked BOOLEAN DEFAULT FALSE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS unlocked_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS unlocked_by UUID REFERENCES auth.users(id);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS credits_used INTEGER DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS search_id UUID REFERENCES saved_searches(id);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_hash TEXT; -- For duplicate detection

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_leads_unlocked ON leads(is_unlocked);
CREATE INDEX IF NOT EXISTS idx_leads_search_id ON leads(search_id);
CREATE INDEX IF NOT EXISTS idx_leads_lead_hash ON leads(lead_hash);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_unlocked ON leads(assigned_to, is_unlocked);

-- ==================================================
-- 4. LEAD UNLOCKS TRANSACTION LOG
-- ==================================================
CREATE TABLE IF NOT EXISTS lead_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  lead_id BIGINT REFERENCES leads(id) NOT NULL,
  credits_spent INTEGER NOT NULL DEFAULT 20,
  unlocked_fields TEXT[] DEFAULT '{"contact_name", "email", "phone", "website", "insights"}',
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lead_unlocks_user_id ON lead_unlocks(user_id);
CREATE INDEX idx_lead_unlocks_lead_id ON lead_unlocks(lead_id);
CREATE INDEX idx_lead_unlocks_date ON lead_unlocks(unlocked_at);

ALTER TABLE lead_unlocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own unlocks" ON lead_unlocks
  FOR SELECT USING (auth.uid() = user_id);

-- ==================================================
-- 5. HELPER FUNCTIONS
-- ==================================================

-- Function to generate lead hash (for duplicate detection)
CREATE OR REPLACE FUNCTION generate_lead_hash(
  p_company TEXT,
  p_industry TEXT,
  p_location TEXT
) RETURNS TEXT AS $$
BEGIN
  RETURN md5(LOWER(TRIM(p_company)) || '-' || LOWER(TRIM(p_industry)) || '-' || LOWER(TRIM(p_location)));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to unlock a lead (handles all the logic)
CREATE OR REPLACE FUNCTION unlock_lead(
  p_user_id UUID,
  p_lead_id BIGINT,
  p_credits_cost INTEGER DEFAULT 20
) RETURNS JSONB AS $$
DECLARE
  v_user_credits INTEGER;
  v_lead RECORD;
  v_result JSONB;
BEGIN
  -- Check user credits
  SELECT credits INTO v_user_credits
  FROM profiles
  WHERE id = p_user_id;

  IF v_user_credits < p_credits_cost THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Insufficient credits',
      'required', p_credits_cost,
      'available', v_user_credits
    );
  END IF;

  -- Check if already unlocked
  SELECT * INTO v_lead FROM leads WHERE id = p_lead_id;
  
  IF v_lead.is_unlocked = TRUE THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Lead already unlocked'
    );
  END IF;

  -- Unlock the lead
  UPDATE leads
  SET 
    is_unlocked = TRUE,
    unlocked_at = NOW(),
    unlocked_by = p_user_id,
    credits_used = p_credits_cost
  WHERE id = p_lead_id;

  -- Deduct credits
  UPDATE profiles
  SET credits = credits - p_credits_cost
  WHERE id = p_user_id;

  -- Log transaction
  INSERT INTO credit_transactions (user_id, amount, type, description, reference_id)
  VALUES (
    p_user_id,
    -p_credits_cost,
    'usage',
    'Unlocked lead: ' || v_lead.company,
    'lead_unlock_' || p_lead_id
  );

  -- Log unlock
  INSERT INTO lead_unlocks (user_id, lead_id, credits_spent)
  VALUES (p_user_id, p_lead_id, p_credits_cost);

  RETURN jsonb_build_object(
    'success', true,
    'lead_id', p_lead_id,
    'credits_remaining', v_user_credits - p_credits_cost
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==================================================
-- 6. UPDATE TRIGGERS
-- ==================================================

-- Auto-update updated_at for user_preferences
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at for saved_searches
CREATE TRIGGER update_saved_searches_updated_at
  BEFORE UPDATE ON saved_searches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate lead_hash before insert
CREATE OR REPLACE FUNCTION auto_generate_lead_hash()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_hash := generate_lead_hash(NEW.company, NEW.industry, NEW.location);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_lead_hash_trigger
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_lead_hash();

-- ==================================================
-- 7. GRANT PERMISSIONS
-- ==================================================

GRANT ALL ON user_preferences TO authenticated;
GRANT ALL ON saved_searches TO authenticated;
GRANT SELECT ON lead_unlocks TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ==================================================
-- 8. VERIFY SETUP
-- ==================================================

-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_preferences', 'saved_searches', 'lead_unlocks')
ORDER BY table_name;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

-- Success message
SELECT 'Lead generation system schema created successfully!' AS status;

