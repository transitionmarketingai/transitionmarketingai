# 🚀 SUPABASE DATABASE SETUP - Complete Instructions

## Phase 1: Database Setup (DO THIS FIRST!)

**Time:** 30-40 minutes  
**Difficulty:** Easy (just follow steps)

---

## 📋 STEP-BY-STEP GUIDE:

### **STEP 1: Create Supabase Account** ⏱️ 5 min

1. Go to: **https://supabase.com**
2. Click "Start your project"
3. Sign up with:
   - GitHub (recommended)
   - OR Google
   - OR Email + Password
4. Verify your email if required
5. Create organization name: `Transition Marketing AI`

**✅ Done when:** You see the Supabase dashboard

---

### **STEP 2: Create New Project** ⏱️ 5 min

**In Supabase Dashboard:**

1. Click **"New Project"** button

2. Fill in project details:
   ```
   Name: leadgen-platform
   Database Password: [CREATE STRONG PASSWORD - SAVE IT!]
   Region: Mumbai (ap-south-1)  ← Closest to India!
   Pricing Plan: Free
   ```

3. Click **"Create new project"**

4. **WAIT 2-3 MINUTES** while Supabase provisions your database
   - You'll see a loading screen
   - Don't close the browser!

**✅ Done when:** You see "Project is ready" message

---

### **STEP 3: Get API Credentials** ⏱️ 2 min

**In Supabase Dashboard (left sidebar):**

1. Click ⚙️ **Settings** → **API**

2. **COPY THESE VALUES:**
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGci...  (starts with eyJ)
   service_role key: eyJhbGci... (starts with eyJ - KEEP SECRET!)
   ```

3. **SAVE THEM SOMEWHERE SAFE!** (You'll add them to .env.local next)

**✅ Done when:** You have all 3 values saved

---

### **STEP 4: Create .env.local File** ⏱️ 3 min

**On your computer:**

1. Navigate to your project folder:
   ```bash
   /Users/abhishekjohn/Documents/Business/TransitionMarketingAI/Website/TransitionMarketingAI
   ```

2. Create a new file named: `.env.local`

3. Paste this content and **fill in your actual values from Step 3:**
   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
   
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Save the file

**✅ Done when:** .env.local file exists with your Supabase credentials

---

### **STEP 5: Run Database Schema** ⏱️ 10 min

**Back in Supabase Dashboard:**

1. Click **SQL Editor** in left sidebar

2. Click **"New query"** button

3. **Copy the ENTIRE contents** of this file:
   ```
   COMPLETE_DATABASE_SCHEMA.sql
   ```
   (It's in your project root folder)

4. **Paste** into the SQL Editor

5. Click **"Run"** button (or press Cmd/Ctrl + Enter)

6. **WAIT** for execution (~10-30 seconds)

7. **Check for success:**
   - Should say "Success. No rows returned"
   - No red error messages

**✅ Done when:** SQL runs successfully without errors

---

### **STEP 6: Seed Subscription Plans** ⏱️ 3 min

**In SQL Editor (same place):**

1. Click **"New query"** again

2. **Copy the ENTIRE contents** of:
   ```
   SEED_DATA.sql
   ```

3. **Paste** into SQL Editor

4. Click **"Run"**

5. **Verify results:**
   - Should show 3 rows at the bottom
   - Starter Plan: ₹4,999
   - Professional Plan: ₹9,999
   - Enterprise Plan: ₹24,999

**✅ Done when:** You see 3 subscription plans listed

---

### **STEP 7: Verify Tables Created** ⏱️ 5 min

**In Supabase Dashboard:**

1. Click **"Table Editor"** in left sidebar

2. **You should see these tables:**
   - ✅ audit_logs
   - ✅ campaigns
   - ✅ customers
   - ✅ leads
   - ✅ messages
   - ✅ notifications
   - ✅ subscription_plans
   - ✅ subscriptions

3. Click on **"subscription_plans"** table

4. **Verify you see 3 rows:**
   - Starter (₹4,999, 25 leads)
   - Professional (₹9,999, 50 leads)
   - Enterprise (₹24,999, 150 leads)

**✅ Done when:** All 8 tables exist and subscription_plans has 3 rows

---

### **STEP 8: Test Database Connection** ⏱️ 5 min

**On your computer (Terminal):**

1. Navigate to project:
   ```bash
   cd /Users/abhishekjohn/Documents/Business/TransitionMarketingAI/Website/TransitionMarketingAI
   ```

2. Create test file: `test-database.js`
   ```javascript
   require('dotenv').config({ path: '.env.local' });
   const { createClient } = require('@supabase/supabase-js');

   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL,
     process.env.SUPABASE_SERVICE_ROLE_KEY
   );

   async function testConnection() {
     console.log('Testing Supabase connection...\n');
     
     // Test 1: Fetch subscription plans
     const { data: plans, error } = await supabase
       .from('subscription_plans')
       .select('*')
       .order('display_order');

     if (error) {
       console.error('❌ Error:', error.message);
       return;
     }

     console.log('✅ Database connection successful!\n');
     console.log('📊 Subscription Plans:');
     plans.forEach(plan => {
       console.log(`  - ${plan.plan_name}: ₹${plan.price_inr.toLocaleString()}/month (${plan.leads_quota} leads)`);
     });
     
     console.log('\n🎉 Phase 1 Complete! Database is ready!');
   }

   testConnection();
   ```

3. Run the test:
   ```bash
   node test-database.js
   ```

4. **Expected output:**
   ```
   Testing Supabase connection...

   ✅ Database connection successful!

   📊 Subscription Plans:
     - Starter Plan: ₹4,999/month (25 leads)
     - Professional Plan: ₹9,999/month (50 leads)
     - Enterprise Plan: ₹24,999/month (150 leads)

   🎉 Phase 1 Complete! Database is ready!
   ```

**✅ Done when:** Test script runs successfully

---

## 🎉 PHASE 1 COMPLETE CHECKLIST:

- [ ] Supabase account created
- [ ] Project provisioned
- [ ] API credentials copied
- [ ] .env.local file created with credentials
- [ ] Database schema executed successfully
- [ ] Seed data inserted (3 subscription plans)
- [ ] All 8 tables visible in Table Editor
- [ ] Test connection successful

---

## ⏭️ WHAT'S NEXT:

Once all checkboxes above are ✅:

**Phase 2: Authentication**
- User signup/login
- Session management
- Protected routes

**Tell me when Phase 1 is complete and I'll start building Phase 2!**

---

## 🆘 TROUBLESHOOTING:

### **Error: "relation does not exist"**
- SQL wasn't run completely
- Re-run COMPLETE_DATABASE_SCHEMA.sql

### **Error: "duplicate key value"**
- Seed data was run twice
- It's okay, plans already exist!

### **Error: "permission denied"**
- Wrong API key
- Make sure you're using SERVICE_ROLE_KEY for server operations

### **Connection timeout**
- Check SUPABASE_URL is correct
- Verify API keys have no extra spaces

---

## 📞 NEED HELP?

If you get stuck on any step, let me know:
- Which step number?
- What error message?
- Screenshot if helpful

**I'm here to help!** 🚀


