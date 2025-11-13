-- ============================================================================
-- Transition Marketing AI - Unified Supabase Schema
-- ============================================================================
-- This file is idempotent and safe to run multiple times.
-- It creates all tables required for:
--   - Onboarding quiz submissions
--   - Waitlist entries
--   - Admin dashboard and call checklists
--   - PDF generation and WhatsApp summaries
-- ============================================================================

-- ============================================================================
-- Table: onboarding_submissions
-- Purpose: Stores quiz submissions from /onboarding page
-- ============================================================================

CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  industry TEXT,
  city TEXT,
  avg_customer_value TEXT,
  current_inquiries TEXT,
  desired_inquiries TEXT,
  budget_range TEXT,
  has_sales_team TEXT,
  score INTEGER,
  status TEXT DEFAULT 'new',
  raw_answers JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add columns that may not exist in older installations
DO $$ 
BEGIN
  -- Add status column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'onboarding_submissions' AND column_name = 'status'
  ) THEN
    ALTER TABLE onboarding_submissions ADD COLUMN status TEXT DEFAULT 'new';
    UPDATE onboarding_submissions SET status = 'new' WHERE status IS NULL;
  END IF;

  -- Add raw_answers column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'onboarding_submissions' AND column_name = 'raw_answers'
  ) THEN
    ALTER TABLE onboarding_submissions ADD COLUMN raw_answers JSONB DEFAULT '{}'::jsonb;
  END IF;

  -- Add updated_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'onboarding_submissions' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE onboarding_submissions ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL;
  END IF;

  -- Convert UUID primary key to BIGSERIAL if needed (for new installations)
  -- Note: This is a one-way migration. If you already have UUID, keep it.
  -- Uncomment below only if starting fresh:
  -- ALTER TABLE onboarding_submissions ALTER COLUMN id TYPE BIGSERIAL;
END $$;

-- Indexes for onboarding_submissions
CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_status ON onboarding_submissions(status);
CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_score ON onboarding_submissions(score);
CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_created_at ON onboarding_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_email ON onboarding_submissions(email) WHERE email IS NOT NULL;

-- ============================================================================
-- Table: waitlist
-- Purpose: Stores /not-a-fit waitlist entries
-- ============================================================================

CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source_submission_id BIGINT REFERENCES onboarding_submissions(id) ON DELETE SET NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for waitlist
CREATE INDEX IF NOT EXISTS idx_waitlist_source_submission ON waitlist(source_submission_id) WHERE source_submission_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- ============================================================================
-- Table: client_onboarding_calls
-- Purpose: Stores detailed call checklist and admin notes for each client
-- ============================================================================

CREATE TABLE IF NOT EXISTS client_onboarding_calls (
  id BIGSERIAL PRIMARY KEY,
  submission_id BIGINT NOT NULL REFERENCES onboarding_submissions(id) ON DELETE CASCADE,
  
  -- Business Overview
  business_name TEXT,
  business_description TEXT,
  ideal_customer TEXT,
  is_local_or_pan_india TEXT,
  
  -- Current Lead Flow
  current_leads_per_month INTEGER,
  current_lead_sources TEXT,
  what_is_working TEXT,
  what_is_not_working TEXT,
  
  -- Customer Value
  avg_customer_value NUMERIC,
  lifetime_value TEXT,
  capacity_per_month INTEGER,
  
  -- Sales Process
  how_leads_are_handled TEXT,
  has_sales_team BOOLEAN,
  sales_team_notes TEXT,
  
  -- Pain & Urgency
  main_pain_points TEXT,
  what_happens_if_no_change TEXT,
  urgency_score INTEGER,
  
  -- Our Assessment
  fit_level TEXT,
  recommended_pilot_investment_min NUMERIC,
  recommended_pilot_investment_max NUMERIC,
  target_inquiries_min INTEGER,
  target_inquiries_max INTEGER,
  notes_for_campaign_strategy TEXT,
  
  -- Call Outcome
  call_outcome TEXT,
  pilot_price_final NUMERIC,
  pilot_start_date DATE,
  follow_up_date DATE,
  follow_up_channel TEXT,
  final_notes TEXT,
  
  -- Email tracking (for future offer email feature)
  offer_email_sent_at TIMESTAMPTZ,
  offer_email_status TEXT,
  offer_email_error TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add unique constraint on submission_id (one call record per submission)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'client_onboarding_calls_submission_unique'
  ) THEN
    ALTER TABLE client_onboarding_calls 
    ADD CONSTRAINT client_onboarding_calls_submission_unique 
    UNIQUE (submission_id);
  END IF;
END $$;

-- Add email tracking columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_onboarding_calls' AND column_name = 'offer_email_sent_at'
  ) THEN
    ALTER TABLE client_onboarding_calls ADD COLUMN offer_email_sent_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_onboarding_calls' AND column_name = 'offer_email_status'
  ) THEN
    ALTER TABLE client_onboarding_calls ADD COLUMN offer_email_status TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_onboarding_calls' AND column_name = 'offer_email_error'
  ) THEN
    ALTER TABLE client_onboarding_calls ADD COLUMN offer_email_error TEXT;
  END IF;
END $$;

-- Indexes for client_onboarding_calls
CREATE INDEX IF NOT EXISTS idx_client_onboarding_calls_submission_id ON client_onboarding_calls(submission_id);
CREATE INDEX IF NOT EXISTS idx_client_onboarding_calls_call_outcome ON client_onboarding_calls(call_outcome) WHERE call_outcome IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_client_onboarding_calls_created_at ON client_onboarding_calls(created_at);

-- ============================================================================
-- Trigger Function: Auto-update updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_onboarding_submissions_updated_at ON onboarding_submissions;
CREATE TRIGGER update_onboarding_submissions_updated_at
  BEFORE UPDATE ON onboarding_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_onboarding_calls_updated_at ON client_onboarding_calls;
CREATE TRIGGER update_client_onboarding_calls_updated_at
  BEFORE UPDATE ON client_onboarding_calls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Notes:
-- ============================================================================
-- 1. This schema uses BIGSERIAL for primary keys. If you have existing tables
--    with UUID primary keys, you may need to adjust the foreign key references.
--
-- 2. The status column in onboarding_submissions can have these values:
--    - 'new': New submission, not yet reviewed
--    - 'in_progress': Call scheduled or in progress
--    - 'completed': Call completed, outcome determined
--    - 'not_fit': Not a fit for our services
--    - 'follow_up': Needs follow-up
--
-- 3. The call_outcome column in client_onboarding_calls can have these values:
--    - 'Pilot Sold': Client purchased the pilot
--    - 'Good Fit – Follow-up': Good fit but needs follow-up
--    - 'Not Ready – Nurture': Not ready now, add to nurture sequence
--    - 'Not a Fit': Not a fit for our services
--
-- 4. All timestamps use TIMESTAMPTZ (timezone-aware) for consistency.
--
-- 5. The raw_answers JSONB column allows storing the entire quiz payload
--    for future analysis or debugging.
-- ============================================================================

