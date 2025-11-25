-- Create verified_inquiries table for storing verified inquiries
-- This table stores inquiries AFTER verification is complete

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
  created_at timestamp with time zone DEFAULT now(),
  delivered boolean DEFAULT false,
  delivered_at timestamp with time zone
);

-- Create index on verification_status for faster queries
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_status ON verified_inquiries(verification_status);

-- Create index on delivered for faster filtering
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_delivered ON verified_inquiries(delivered);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_verified_inquiries_created_at ON verified_inquiries(created_at);

