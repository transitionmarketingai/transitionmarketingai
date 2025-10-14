# 📊 PHASE 1: DATABASE SETUP - STEP-BY-STEP GUIDE

## Goal: Set up Supabase PostgreSQL database for the platform

**Time:** 2-3 hours  
**Status:** Starting...

---

## ✅ WHAT WE'RE BUILDING:

### **Database Tables:**
1. **customers** - Business accounts
2. **subscription_plans** - Pricing tiers (Starter, Professional, Enterprise)
3. **subscriptions** - Active subscriptions
4. **leads** - All generated leads
5. **campaigns** - Facebook/Google ad campaigns
6. **messages** - Customer-lead conversations
7. **notifications** - System notifications
8. **audit_logs** - Activity tracking

### **Total Tables:** 8 core tables + additional support tables

---

## 🚀 STEP-BY-STEP IMPLEMENTATION:

### **STEP 1: Create Supabase Account** ⏱️ 10 min

**Actions:**
1. Go to https://supabase.com
2. Sign up with GitHub or Email
3. Verify email
4. Create new organization (e.g., "Transition Marketing AI")

**What You'll Need:**
- Email address
- Password
- Organization name

---

### **STEP 2: Create New Project** ⏱️ 5 min

**In Supabase Dashboard:**
1. Click "New Project"
2. Enter details:
   - **Name:** `leadgen-platform` (or your choice)
   - **Database Password:** [SAVE THIS SECURELY!]
   - **Region:** Mumbai (ap-south-1) - closest to India
   - **Plan:** Free tier (for development)

3. Click "Create new project"
4. Wait 2-3 minutes for provisioning

**What You'll Get:**
- Project URL: `https://[project-id].supabase.co`
- API Keys (anon, service_role)
- Database connection string

---

### **STEP 3: Get API Credentials** ⏱️ 5 min

**In Supabase Dashboard:**
1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**
   - **anon (public) key**
   - **service_role (secret) key**

**Save them for .env.local file!**

---

### **STEP 4: Run Database Schema** ⏱️ 30 min

**In Supabase Dashboard:**
1. Go to SQL Editor
2. Click "New Query"
3. Copy & paste the entire contents of:
   ```
   database-schema-india-leadgen.sql
   ```
4. Click "Run"
5. Wait for execution
6. Verify all tables created (check "Table Editor")

**Expected Result:**
- ✅ 8-10 tables created
- ✅ All indexes created
- ✅ RLS policies enabled
- ✅ Functions & triggers working

---

### **STEP 5: Seed Initial Data** ⏱️ 15 min

**Create Subscription Plans:**

Run this SQL in Supabase SQL Editor:
```sql
-- Insert subscription plans
INSERT INTO subscription_plans (plan_id, plan_name, description, price_monthly, monthly_lead_quota, overage_price, features, max_campaigns, max_team_members, is_active, display_order) 
VALUES 
  (
    'starter',
    'Starter Plan',
    'Perfect for small businesses just getting started',
    499900, -- ₹4,999/month
    25,
    20000, -- ₹200 per extra lead
    '{"ad_platforms": ["Facebook"], "messaging": ["Email", "WhatsApp"], "support": "Email only", "ai_scoring": true, "analytics": "Basic"}',
    2,
    1,
    true,
    1
  ),
  (
    'professional',
    'Professional Plan',
    'For growing businesses that need more leads',
    999900, -- ₹9,999/month
    50,
    15000, -- ₹150 per extra lead
    '{"ad_platforms": ["Facebook", "Google"], "messaging": ["Email", "WhatsApp", "SMS"], "support": "Priority Email + Chat", "ai_scoring": true, "analytics": "Advanced", "custom_targeting": true}',
    5,
    3,
    true,
    2
  ),
  (
    'enterprise',
    'Enterprise Plan',
    'For established businesses with high volume needs',
    2499900, -- ₹24,999/month
    150,
    10000, -- ₹100 per extra lead
    '{"ad_platforms": ["Facebook", "Google", "LinkedIn"], "messaging": ["All channels"], "support": "Dedicated Account Manager", "ai_scoring": true, "analytics": "Premium", "custom_targeting": true, "api_access": true, "white_label": true}',
    99,
    10,
    true,
    3
  );
```

---

### **STEP 6: Configure Environment Variables** ⏱️ 10 min

**Create/Update `.env.local`:**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Payments (we'll add these later)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# OpenAI (we'll add later)
OPENAI_API_KEY=

# Twilio WhatsApp (we'll add later)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=

# Facebook & Google (we'll add later)
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
```

---

### **STEP 7: Test Database Connection** ⏱️ 15 min

**Create test file:**

I'll create a test script to verify the database connection works.

---

### **STEP 8: Update Supabase Client** ⏱️ 10 min

**Verify/update these files:**
- `src/lib/supabase/client.ts` - Client-side Supabase
- `src/lib/supabase/server.ts` - Server-side Supabase

---

## 📊 PHASE 1 PROGRESS:

```
Step 1: Create account           [ ] 10 min
Step 2: Create project           [ ] 5 min
Step 3: Get API credentials      [ ] 5 min
Step 4: Run schema               [ ] 30 min
Step 5: Seed data                [ ] 15 min
Step 6: Environment variables    [ ] 10 min
Step 7: Test connection          [ ] 15 min
Step 8: Update client files      [ ] 10 min
────────────────────────────────────────
Total: ~100 minutes (1.5-2 hours)
```

---

## 🎯 STARTING NOW:

Since I can't create a Supabase account for you, here's what I'll do:

**I'll prepare EVERYTHING you need:**
1. ✅ Complete SQL schema file (ready to run)
2. ✅ Seed data SQL (subscription plans)
3. ✅ Environment template
4. ✅ Test scripts
5. ✅ Updated Supabase client files
6. ✅ Step-by-step instructions

**Then YOU do:**
- Create Supabase account (5 min)
- Run the SQL (2 min)
- Add API keys to .env.local (2 min)

**Then WE continue** with Phase 2 together!

**Shall I prepare all the database files now?** 🚀


