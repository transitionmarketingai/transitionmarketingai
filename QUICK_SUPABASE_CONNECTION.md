# Quick Supabase Connection Guide

Follow these steps to connect your Supabase project to the backend.

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** (gear icon) → **API**
4. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (click "Reveal" to see it)

## Step 2: Create Environment Variables File

Create a file named `.env.local` in the root of your project with:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Password (REQUIRED for /admin routes)
ADMIN_PASSWORD=your-secure-password-here

# Optional: Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
```

**Replace the placeholder values with your actual Supabase credentials.**

## Step 3: Run the Database Schema

1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Open `supabase/initial_schema.sql` from this project
4. Copy the entire file contents
5. Paste into the SQL Editor
6. Click **Run** (or press `Cmd/Ctrl + Enter`)

You should see "Success. No rows returned" - this is normal.

## Step 4: Verify Tables Created

1. In Supabase Dashboard, click **Table Editor** (left sidebar)
2. You should see these tables:
   - `onboarding_submissions`
   - `waitlist`
   - `client_onboarding_calls`

## Step 5: Test the Connection

1. **Restart your Next.js dev server** (if running):
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

2. **Test the onboarding quiz**:
   - Visit `http://localhost:3000/onboarding`
   - Complete the quiz
   - Check Supabase Dashboard → Table Editor → `onboarding_submissions`
   - You should see your submission!

3. **Test the admin dashboard**:
   - Visit `http://localhost:3000/admin/login`
   - Enter your `ADMIN_PASSWORD`
   - You should see the admin dashboard with submissions

## Troubleshooting

### "Supabase not configured" error
- Check that `.env.local` exists in the project root
- Verify all three Supabase variables are set
- Restart your dev server after adding env vars

### "Table does not exist" error
- Make sure you ran the schema SQL (Step 3)
- Check that tables appear in Table Editor

### Admin login not working
- Verify `ADMIN_PASSWORD` is set in `.env.local`
- Restart your dev server

## Next Steps

Once connected, you can:
- ✅ Submit onboarding quizzes (stored in `onboarding_submissions`)
- ✅ Submit waitlist entries (stored in `waitlist`)
- ✅ Use admin dashboard to manage clients
- ✅ Generate PDF offers and WhatsApp summaries

For production (Vercel), add the same environment variables in:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

