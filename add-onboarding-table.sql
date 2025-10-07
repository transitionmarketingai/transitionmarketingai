-- Add onboarding and preferences tracking

-- Add onboarding status to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;

-- Create lead preferences table
CREATE TABLE IF NOT EXISTS lead_preferences (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  target_industry TEXT[],
  target_locations TEXT[],
  company_size_range TEXT,
  budget_range TEXT,
  keywords TEXT[],
  ideal_customer_description TEXT,
  pain_points TEXT[],
  monthly_lead_goal INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_prefs_user_id ON lead_preferences(user_id);

ALTER TABLE lead_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own preferences" ON lead_preferences;
CREATE POLICY "Users can manage their own preferences" ON lead_preferences
  FOR ALL USING (auth.uid() = user_id);

GRANT ALL ON lead_preferences TO service_role;
GRANT USAGE ON SEQUENCE lead_preferences_id_seq TO service_role;

