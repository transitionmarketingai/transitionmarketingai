# 🚀 Transition Marketing AI - Complete Setup Guide

## Phase 1: Database Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Project Name**: Transition Marketing AI
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to India (Singapore or Mumbai if available)
6. Click "Create new project" (wait 2-3 minutes)

### Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, click **Settings** (gear icon)
2. Click **API** in the left sidebar
3. Copy these values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → This is your `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Run Database Setup Script

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open the file `complete-database-setup.sql` from your project
4. Copy ALL the content
5. Paste it into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Wait for "Success. No rows returned" message
8. ✅ Your database is now set up with 10 tables!

### Step 4: Configure Environment Variables

1. In your project root, create a file called `.env.local`
2. Copy the content from `env-template.txt`
3. Fill in your Supabase credentials from Step 2:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
4. Save the file

### Step 5: Test Database Connection

1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Go to `http://localhost:3000/dashboard`
3. Click "Generate Leads"
4. Check the browser console for any errors
5. Go back to Supabase → **Table Editor** → Check if `leads` table has new rows
6. ✅ If you see data, database is connected!

---

## Phase 2: OpenAI Integration (AI Lead Generation)

### Step 1: Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Click your profile → **View API keys**
4. Click **Create new secret key**
5. Name it "Transition Marketing AI"
6. Copy the key (you won't see it again!)
7. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

### Step 2: Add Credits to OpenAI Account

1. Go to **Settings** → **Billing**
2. Add payment method
3. Add at least $5 credit for testing

### Step 3: Test AI Lead Generation

1. Restart dev server
2. Go to dashboard
3. Click "Generate Leads"
4. Check if leads have AI scores and insights
5. ✅ AI integration working!

---

## Phase 3: Payment Integration (Razorpay)

### Step 1: Create Razorpay Account

1. Go to [razorpay.com](https://razorpay.com)
2. Sign up for a business account
3. Complete KYC verification (required for live mode)
4. For testing, switch to **Test Mode**

### Step 2: Get Razorpay Credentials

1. In Razorpay Dashboard, go to **Settings** → **API Keys**
2. Click **Generate Test Keys** (or **Generate Live Keys** for production)
3. Copy:
   - **Key Id** → This is your `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - **Key Secret** → This is your `RAZORPAY_KEY_SECRET`
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

### Step 3: Test Payment Flow

1. Restart dev server
2. Go to homepage → Click "Start Free Trial"
3. Select a plan → Click "Proceed to Payment"
4. Use Razorpay test cards:
   - **Card**: 4111 1111 1111 1111
   - **CVV**: Any 3 digits
   - **Expiry**: Any future date
5. Complete payment
6. Check Razorpay Dashboard for payment
7. ✅ Payment integration working!

---

## Phase 4: Email Setup (Gmail SMTP)

### Step 1: Enable Gmail SMTP

1. Go to your Google Account settings
2. **Security** → **2-Step Verification** → Enable it
3. **App Passwords** → Generate password
4. Select "Mail" and "Other (Custom name)"
5. Name it "Transition Marketing AI"
6. Copy the 16-character password

### Step 2: Configure Email

Add to `.env.local`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
```

### Step 3: Test Email Sending

1. Restart dev server
2. Submit the audit form
3. Check your email inbox
4. ✅ Email working!

---

## Phase 5: Install Missing Dependencies

Run these commands in your terminal:

```bash
# Supabase client (if not installed)
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Email sending
npm install nodemailer

# Payment processing
npm install razorpay

# Form validation
npm install zod

# Date handling
npm install date-fns
```

---

## Verification Checklist

- [ ] Supabase project created
- [ ] Database tables created (10 tables)
- [ ] `.env.local` file created with Supabase credentials
- [ ] Database connection tested (leads can be created)
- [ ] OpenAI API key added
- [ ] AI lead generation working (scores and insights)
- [ ] Razorpay account created
- [ ] Razorpay test payment successful
- [ ] Gmail SMTP configured
- [ ] Audit form emails working
- [ ] All dependencies installed

---

## Next Steps

Once all the above is complete, we'll move to:

1. **Authentication System** - Sign up/Sign in pages
2. **User Profiles** - Dashboard personalization
3. **Subscription Management** - Plan upgrades/downgrades
4. **Email Campaigns** - Bulk email sending
5. **WhatsApp Integration** - Multi-channel outreach
6. **Team Collaboration** - Invite team members
7. **Production Deployment** - Deploy to Vercel

---

## Need Help?

If you encounter any issues:

1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are correct
4. Make sure dev server is restarted after .env changes
5. Check Supabase logs in the dashboard

Common issues:
- **"NEXT_PUBLIC_SUPABASE_URL is not defined"** → Add to `.env.local` and restart server
- **"Failed to fetch leads"** → Check Supabase RLS policies
- **"OpenAI API error"** → Verify API key and check billing
- **"Razorpay failed"** → Check test/live mode matches your keys

---

## Current Status

✅ **Completed:**
- Homepage with all features
- Comprehensive dashboard with 14 sections
- AI lead generation API
- Audit form with Supabase integration
- Checkout flow with Razorpay
- Complete database schema

⏳ **In Progress:**
- Database setup
- Environment configuration

📋 **Upcoming:**
- Authentication system
- User management
- Full payment integration
- Email campaigns
- WhatsApp/LinkedIn integration
- Production deployment

