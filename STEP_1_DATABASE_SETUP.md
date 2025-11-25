# 📋 STEP 1: Database Setup

## What We're Doing
Setting up the `verified_inquiries` table in Supabase with all required columns for the inquiry management system.

## Time Required
~5 minutes

## Instructions

### 1. Open Supabase SQL Editor
1. Go to your Supabase project: https://supabase.com/dashboard
2. Select your project
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New query"**

### 2. Copy and Paste the SQL
Copy the entire contents of `supabase/migrations/003_setup_verified_inquiries_complete.sql` and paste it into the SQL Editor.

**Or copy this directly:**

```sql
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
```

### 3. Run the SQL
1. Click the **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
2. Wait for the query to complete
3. You should see: **"Success. No rows returned"** or similar success message

### 4. Verify the Setup
1. Go to **"Table Editor"** in the left sidebar
2. Look for the **`verified_inquiries`** table
3. Click on it to view the table structure
4. Verify you see all these columns:
   - ✅ id
   - ✅ name
   - ✅ phone
   - ✅ email
   - ✅ industry
   - ✅ requirement
   - ✅ budget
   - ✅ timeline
   - ✅ source
   - ✅ utm
   - ✅ verification_status
   - ✅ verification_notes
   - ✅ verified_at
   - ✅ created_at
   - ✅ delivered
   - ✅ delivered_at
   - ✅ ai_score
   - ✅ ai_reason
   - ✅ ai_scored_at
   - ✅ client_email

## ✅ Success Criteria

You'll know Step 1 is complete when:
- ✅ SQL query runs without errors
- ✅ `verified_inquiries` table exists in Table Editor
- ✅ All 20 columns are visible in the table structure
- ✅ No error messages in the SQL Editor

## 🐛 Troubleshooting

**Error: "relation already exists"**
- ✅ This is OK! The table already exists. The script will just add missing columns.

**Error: "column already exists"**
- ✅ This is OK! The column already exists. The script safely handles this.

**Error: "permission denied"**
- ❌ Check that you're using the correct Supabase project
- ❌ Verify you have admin access to the project

**Can't find the table in Table Editor**
- Refresh the page
- Check you're looking at the correct project
- Verify the SQL ran successfully

## Next Step

Once Step 1 is complete and verified, let me know and we'll move to **Step 2: Environment Variables Setup**.

---

**Ready?** Run the SQL and let me know when it's done! 🚀

