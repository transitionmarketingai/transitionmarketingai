-- Create audit_submissions table for Transition Marketing AI
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS audit_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT DEFAULT '',
  industry TEXT NOT NULL,
  goal TEXT NOT NULL,
  source TEXT DEFAULT 'Website - Free Audit',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_audit_submissions_email ON audit_submissions(email);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_created_at ON audit_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_submissions_industry ON audit_submissions(industry);

-- Enable Row Level Security (RLS)
ALTER TABLE audit_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows service role to insert data
CREATE POLICY "Service role can insert audit submissions" ON audit_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows service role to read all data
CREATE POLICY "Service role can read audit submissions" ON audit_submissions
  FOR SELECT USING (true);

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_audit_submissions_updated_at 
  BEFORE UPDATE ON audit_submissions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON audit_submissions TO service_role;
GRANT USAGE ON SEQUENCE audit_submissions_id_seq TO service_role;

