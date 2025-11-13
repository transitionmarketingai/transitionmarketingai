# Supabase Setup Guide - Transition Marketing AI

Complete guide for setting up Supabase database, environment variables, and client configuration for Transition Marketing AI.

---

## 📋 Table of Contents

1. [Environment Variables](#environment-variables)
2. [Running the Schema](#running-the-schema)
3. [Supabase Client Usage](#supabase-client-usage)
4. [Health Check](#health-check)
5. [Troubleshooting](#troubleshooting)

---

## 🔐 Environment Variables

### Required Environment Variables

Add these to your `.env.local` file for local development, and to your Vercel project settings for production.

#### Supabase Configuration

```bash
# Supabase Project URL (found in Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anonymous Key (found in Project Settings > API)
# This key is safe to expose in client-side code
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key (found in Project Settings > API)
# ⚠️ KEEP THIS SECRET - Never expose in client-side code
# Only use in server-side API routes for admin operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find these:**
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (click "Reveal" to see it)

#### Admin Authentication

```bash
# Password for /admin login page
# Choose a strong password and keep it secure
ADMIN_PASSWORD=your-secure-admin-password-here
```

#### Optional: Email Service (for future offer email feature)

```bash
# Resend API Key (recommended) or SMTP credentials
# Get from: https://resend.com/api-keys
RESEND_API_KEY=re_your-api-key-here

# Or use SMTP (e.g., SendGrid, Gmail)
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=noreply@transitionmarketingai.com
```

#### Calendly Integration (optional)

```bash
# Your Calendly scheduling URL
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
```

---

## 🗄️ Running the Schema

### Option 1: Supabase Dashboard (Recommended for First-Time Setup)

1. **Open Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Open SQL Editor**
   - Click **SQL Editor** in the left sidebar
   - Click **New query**

3. **Run the Schema**
   - Open `supabase/initial_schema.sql` from this repository
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click **Run** (or press `Cmd/Ctrl + Enter`)

4. **Verify Tables Created**
   - Go to **Table Editor** in the left sidebar
   - You should see:
     - `onboarding_submissions`
     - `waitlist`
     - `client_onboarding_calls`

### Option 2: Supabase CLI (For Advanced Users)

If you have Supabase CLI installed and linked to your project:

```bash
# Initialize Supabase (if not already done)
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

Or manually:

```bash
# Apply the schema directly
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" -f supabase/initial_schema.sql
```

**Note:** The schema file is **idempotent** - it's safe to run multiple times. It uses `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` to avoid errors.

---

## 🔌 Supabase Client Usage

### Server-Side (API Routes & Server Components)

Use the server-side client from `src/lib/supabase/server.ts`:

```typescript
import { createClient } from '@/lib/supabase/server';

// In API routes or server components
const supabase = await createClient();

// Example: Fetch onboarding submissions
const { data, error } = await supabase
  .from('onboarding_submissions')
  .select('*')
  .order('created_at', { ascending: false });
```

### Admin Operations (Service Role Key)

For admin operations that bypass Row Level Security (RLS), use the admin client:

```typescript
import { createAdminClient } from '@/lib/supabase/server';

// In admin API routes only
const supabase = await createAdminClient();

// This client has full access (bypasses RLS)
const { data, error } = await supabase
  .from('onboarding_submissions')
  .update({ status: 'completed' })
  .eq('id', submissionId);
```

**⚠️ Important:** Only use `createAdminClient()` in server-side code (API routes), never in client components.

### Client-Side (React Components)

For client-side components, use the browser client:

```typescript
import { createClient } from '@/lib/supabase/client';

// In client components ('use client')
const supabase = createClient();

// Example: Submit waitlist entry
const { data, error } = await supabase
  .from('waitlist')
  .insert({ name, email, phone });
```

---

## ✅ Health Check

After setting up the schema and environment variables, verify everything works:

### 1. Test Onboarding Quiz Submission

1. Visit `/onboarding` on your site
2. Complete the quiz
3. Check Supabase Dashboard → **Table Editor** → `onboarding_submissions`
4. You should see a new row with your submission

### 2. Test Waitlist Submission

1. Visit `/not-a-fit` (or get a low quiz score)
2. Submit the waitlist form
3. Check `waitlist` table in Supabase

### 3. Test Admin Dashboard

1. Visit `/admin/login`
2. Enter your `ADMIN_PASSWORD`
3. You should see the admin dashboard with all submissions
4. Click on a submission to view/edit the call checklist
5. Fill in some fields and click "Save"
6. Check `client_onboarding_calls` table in Supabase

### 4. Test PDF Generation

1. In admin dashboard, open a client detail page
2. Fill in:
   - `recommended_pilot_investment_min`
   - `recommended_pilot_investment_max`
   - `target_inquiries_min`
   - `target_inquiries_max`
3. Click "Generate Offer PDF"
4. PDF should download successfully

### 5. Test WhatsApp Summary

1. In admin dashboard, open a client detail page
2. Ensure required fields are filled (same as PDF)
3. Click "Generate WhatsApp Summary"
4. Message should appear in the textarea
5. Click "Copy to Clipboard" - should copy successfully
6. Click "Open in WhatsApp" - should open WhatsApp Web with pre-filled message

---

## 🔍 Troubleshooting

### Issue: "Supabase not configured - using mock client"

**Solution:** Check that your environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**For local development:**
- Ensure `.env.local` exists in the project root
- Restart your Next.js dev server after adding env vars

**For production (Vercel):**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add all required variables
- Redeploy your application

### Issue: "relation does not exist" or "table not found"

**Solution:** The schema hasn't been applied yet.
1. Go to Supabase Dashboard → SQL Editor
2. Run `supabase/initial_schema.sql`
3. Verify tables exist in Table Editor

### Issue: Admin login not working

**Solution:** 
1. Check that `ADMIN_PASSWORD` is set in environment variables
2. Ensure you're using the exact password (case-sensitive)
3. Clear browser cookies and try again

### Issue: "Unauthorized" errors in API routes

**Solution:**
- For admin routes: Ensure `admin_session` cookie is set (login via `/admin/login`)
- For public routes: Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- For admin operations: Ensure `SUPABASE_SERVICE_ROLE_KEY` is set

### Issue: Foreign key constraint errors

**Solution:** 
- Ensure `onboarding_submissions` table exists before creating `client_onboarding_calls`
- Run the schema in order (or run the entire `initial_schema.sql` file which handles dependencies)

### Issue: PDF/WhatsApp generation fails with "missing required fields"

**Solution:**
- Ensure these fields are filled in `client_onboarding_calls`:
  - `recommended_pilot_investment_min`
  - `recommended_pilot_investment_max`
  - `target_inquiries_min`
  - `target_inquiries_max`
- These are required for PDF and WhatsApp generation

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

## 🎯 Quick Reference

**Schema File:** `supabase/initial_schema.sql`

**Client Files:**
- Server-side: `src/lib/supabase/server.ts`
- Client-side: `src/lib/supabase/client.ts`

**Main Tables:**
- `onboarding_submissions` - Quiz submissions
- `waitlist` - Waitlist entries
- `client_onboarding_calls` - Admin call checklists

**Status Values:**
- `new`, `in_progress`, `completed`, `not_fit`, `follow_up`

**Call Outcome Values:**
- `Pilot Sold`, `Good Fit – Follow-up`, `Not Ready – Nurture`, `Not a Fit`

---

**Last Updated:** 2025-01-XX  
**Schema Version:** 1.0.0
