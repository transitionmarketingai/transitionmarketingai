-- Fix the leads table to match the API expectations

-- Add missing columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_size TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_score INTEGER DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS insights JSONB;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_to UUID;

-- Rename 'score' to 'ai_score' if it exists (for compatibility)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='score') THEN
    ALTER TABLE leads RENAME COLUMN score TO ai_score_backup;
  END IF;
END $$;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_leads_contact_name ON leads(contact_name);
CREATE INDEX IF NOT EXISTS idx_leads_ai_score ON leads(ai_score);
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads(industry);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);

