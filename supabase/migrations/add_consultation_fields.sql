-- Migration: Add budget_range and requirements fields to consultations table
-- Date: Today
-- Purpose: Support new consultation form fields

-- Add budget_range column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'consultations' 
    AND column_name = 'budget_range'
  ) THEN
    ALTER TABLE consultations 
    ADD COLUMN budget_range VARCHAR(50);
    
    COMMENT ON COLUMN consultations.budget_range IS 'Monthly budget range selected by client (e.g., 10000-25000, 25000-50000)';
  END IF;
END $$;

-- Add contact_preference column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'consultations' 
    AND column_name = 'contact_preference'
  ) THEN
    ALTER TABLE consultations 
    ADD COLUMN contact_preference VARCHAR(20) DEFAULT 'phone' 
    CHECK (contact_preference IN ('phone', 'whatsapp', 'email'));
    
    COMMENT ON COLUMN consultations.contact_preference IS 'Preferred contact method: phone, whatsapp, or email';
  END IF;
END $$;

-- Update message column to also store requirements if needed
-- (message column should already exist and can handle requirements text)

-- Create index for budget_range for faster filtering
CREATE INDEX IF NOT EXISTS idx_consultations_budget_range ON consultations(budget_range);

-- Create index for contact_preference
CREATE INDEX IF NOT EXISTS idx_consultations_contact_preference ON consultations(contact_preference);

