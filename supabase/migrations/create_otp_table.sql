-- Create OTP verifications table for consultation form
-- Run this in Supabase SQL Editor

-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone text NOT NULL,
  otp text NOT NULL,
  verified boolean DEFAULT false,
  verified_at timestamp,
  expires_at timestamp NOT NULL,
  created_at timestamp DEFAULT NOW()
);

-- Create unique constraint for rate limiting
CREATE UNIQUE INDEX IF NOT EXISTS idx_otp_phone_created 
ON otp_verifications(phone, created_at);

-- Index for phone lookups
CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone);

-- Index for expiry cleanup
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);

-- Clean up old verified/expired OTPs (optional maintenance)
-- This can be run periodically or set up as a cron job
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_verifications 
  WHERE expires_at < NOW() - INTERVAL '1 day'
     OR (verified = true AND verified_at < NOW() - INTERVAL '7 days');
END;
$$ LANGUAGE plpgsql;

-- Enable RLS (Row Level Security) if needed
-- ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Example: Grant access if using service role
-- GRANT ALL ON otp_verifications TO service_role;

COMMENT ON TABLE otp_verifications IS 'Stores OTP codes for phone verification in consultation form';
COMMENT ON COLUMN otp_verifications.phone IS 'Phone number (digits only, with country code)';
COMMENT ON COLUMN otp_verifications.otp IS '6-digit OTP code';
COMMENT ON COLUMN otp_verifications.expires_at IS 'OTP expiration timestamp (10 minutes from creation)';

