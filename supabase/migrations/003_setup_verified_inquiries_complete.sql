-- ============================================================================
-- Complete Setup for verified_inquiries Table
-- This migration safely creates the table and adds all required columns
-- Run this in Supabase SQL Editor
-- ============================================================================

-- Step 1: Create the table if it doesn't exist (with all columns)
CREATE TABLE IF NOT EXISTS verified_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text,
  email text,
  industry text,
  requirement text,
  budget text,
  timeline text,
  source text,
  utm jsonb DEFAULT '{}'::jsonb,
  verification_status text DEFAULT 'pending',
  verification_notes text,
  verified_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  delivered boolean DEFAULT false,
  delivered_at timestamp with time zone,
  ai_score integer,
  ai_reason text,
  ai_scored_at timestamp with time zone,
  client_email text
);

-- Step 2: Add any missing columns (safe - won't error if columns already exist)
DO $$ 
BEGIN
  -- Add verification_notes if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'verified_inquiries' 
    AND column_name = 'verification_notes'
  ) THEN
    ALTER TABLE verified_inquiries ADD COLUMN verification_notes text;
  END IF;

  -- Add verified_at if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'verified_inquiries' 
    AND column_name = 'verified_at'
  ) THEN
    ALTER TABLE verified_inquiries ADD COLUMN verified_at timestamp with time zone;
  END IF;

  -- Add ai_score if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'verified_inquiries' 
    AND column_name = 'ai_score'
  ) THEN
    ALTER TABLE verified_inquiries ADD COLUMN ai_score integer;
  END IF;

  -- Add ai_reason if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'verified_inquiries' 
    AND column_name = 'ai_reason'
  ) THEN
    ALTER TABLE verified_inquiries ADD COLUMN ai_reason text;
  END IF;

  -- Add ai_scored_at if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'verified_inquiries' 
    AND column_name = 'ai_scored_at'
  ) THEN
    ALTER TABLE verified_inquiries ADD COLUMN ai_scored_at timestamp with time zone;
  END IF;

  -- Add client_email if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'verified_inquiries' 
    AND column_name = 'client_email'
  ) THEN
    ALTER TABLE verified_inquiries ADD COLUMN client_email text;
  END IF;
END $$;

-- Step 3: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_status ON verified_inquiries(verification_status);
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_delivered ON verified_inquiries(delivered);
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_client_email ON verified_inquiries(client_email);
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_created_at ON verified_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_ai_score ON verified_inquiries(ai_score DESC);

-- Step 4: Verify the table structure (this will show you all columns)
-- You can run this separately to verify:
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'verified_inquiries'
-- ORDER BY ordinal_position;

