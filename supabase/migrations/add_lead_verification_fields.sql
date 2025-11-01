-- Migration: Add verification fields to leads table
-- Date: Today
-- Purpose: Support lead verification system

-- Add verification_status column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' 
    AND column_name = 'verification_status'
  ) THEN
    ALTER TABLE leads 
    ADD COLUMN verification_status VARCHAR(20) DEFAULT 'pending' 
    CHECK (verification_status IN ('pending', 'verified', 'failed', 'in_progress'));
    
    COMMENT ON COLUMN leads.verification_status IS 'Overall verification status: pending, verified, failed, or in_progress';
  END IF;
END $$;

-- Add phone_verified column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' 
    AND column_name = 'phone_verified'
  ) THEN
    ALTER TABLE leads 
    ADD COLUMN phone_verified BOOLEAN DEFAULT false;
    
    COMMENT ON COLUMN leads.phone_verified IS 'Whether the phone number has been verified as active';
  END IF;
END $$;

-- Add email_verified column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' 
    AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE leads 
    ADD COLUMN email_verified BOOLEAN DEFAULT false;
    
    COMMENT ON COLUMN leads.email_verified IS 'Whether the email address has been verified as valid and deliverable';
  END IF;
END $$;

-- Add business_verified column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' 
    AND column_name = 'business_verified'
  ) THEN
    ALTER TABLE leads 
    ADD COLUMN business_verified BOOLEAN DEFAULT false;
    
    COMMENT ON COLUMN leads.business_verified IS 'Whether the business has been verified to exist (e.g., Google Maps)';
  END IF;
END $$;

-- Add verified_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' 
    AND column_name = 'verified_at'
  ) THEN
    ALTER TABLE leads 
    ADD COLUMN verified_at TIMESTAMPTZ;
    
    COMMENT ON COLUMN leads.verified_at IS 'Timestamp when the lead was fully verified';
  END IF;
END $$;

-- Add verification_notes column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' 
    AND column_name = 'verification_notes'
  ) THEN
    ALTER TABLE leads 
    ADD COLUMN verification_notes TEXT;
    
    COMMENT ON COLUMN leads.verification_notes IS 'Notes about the verification process or results';
  END IF;
END $$;

-- Create indexes for verification queries
CREATE INDEX IF NOT EXISTS idx_leads_verification_status ON leads(verification_status);
CREATE INDEX IF NOT EXISTS idx_leads_verified_at ON leads(verified_at DESC);

