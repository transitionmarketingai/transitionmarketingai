# Admin Dashboard Setup Guide

## Database Schema

**⚠️ Important:** The database schema is now unified in a single file.

**Use the unified schema file:** `supabase/initial_schema.sql`

This file contains all required tables including:
- `onboarding_submissions` - With `status` column and all required fields
- `client_onboarding_calls` - Complete call checklist table with all fields
- `waitlist` - Waitlist entries

### Quick Setup

1. **Open Supabase Dashboard** → SQL Editor
2. **Copy contents** of `supabase/initial_schema.sql`
3. **Paste and run** in SQL Editor

The schema is **idempotent** (safe to run multiple times) and will:
- Create all tables if they don't exist
- Add missing columns to existing tables
- Create all required indexes
- Set up auto-update triggers for `updated_at` timestamps

### For Detailed Setup Instructions

See **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** for:
- Complete environment variable setup
- Step-by-step schema application guide
- Supabase client usage examples
- Health check procedures
- Troubleshooting guide

## Environment Variables

Add to `.env.local` (and Vercel project settings for production):

```bash
# Admin password for /admin/login
ADMIN_PASSWORD=your_secure_admin_password_here

# Supabase configuration (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete environment variable documentation.**

## Route Protection

The admin routes are protected by middleware that checks for the `admin_session` cookie.

## Status Mapping

- `new` - New submission, not yet reviewed
- `in_progress` - Call scheduled or in progress
- `completed` - Call completed, outcome determined
- `not_fit` - Not a fit for our services
- `follow_up` - Needs follow-up

## Call Outcome Mapping

- `Pilot Sold` - Client purchased the pilot
- `Good Fit – Follow-up` - Good fit but needs follow-up
- `Not Ready – Nurture` - Not ready now, add to nurture sequence
- `Not a Fit` - Not a fit for our services

