-- Create verified schema for verified inquiries system
CREATE SCHEMA IF NOT EXISTS verified;

-- Table: verified.inquiries
CREATE TABLE IF NOT EXISTS verified.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  industry TEXT,
  intent_score INTEGER,
  identity_score INTEGER,
  fraud_flags JSONB DEFAULT '{}'::jsonb,
  human_verified BOOLEAN DEFAULT false,
  timeline TEXT,
  budget TEXT,
  requirement TEXT,
  source TEXT,
  utm JSONB DEFAULT '{}'::jsonb,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  delivered BOOLEAN DEFAULT false,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: verified.verification_logs
CREATE TABLE IF NOT EXISTS verified.verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES verified.inquiries(id) ON DELETE CASCADE,
  step TEXT NOT NULL,
  status TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: verified.clients
CREATE TABLE IF NOT EXISTS verified.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: verified.sessions (strategy call sessions)
CREATE TABLE IF NOT EXISTS verified.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airtable_id INTEGER,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  industry TEXT,
  revenue_range TEXT,
  inquiry_volume TEXT,
  utm JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_inquiries_verification_status ON verified.inquiries(verification_status);
CREATE INDEX IF NOT EXISTS idx_inquiries_delivered ON verified.inquiries(delivered);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON verified.inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_verification_logs_inquiry_id ON verified.verification_logs(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_sessions_airtable_id ON verified.sessions(airtable_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON verified.sessions(created_at);

-- Enable Row Level Security (RLS) - can be configured later
ALTER TABLE verified.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified.verification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified.sessions ENABLE ROW LEVEL SECURITY;

