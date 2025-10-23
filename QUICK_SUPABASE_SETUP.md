# 🚀 Quick Supabase Setup - Copy & Paste

## ⚠️ IMPORTANT: Run These SQL Files, NOT the Markdown (.md) Files!

---

## Step 1: Open Supabase SQL Editor

1. Go to: **https://supabase.com/dashboard/project/veeylzzmymqqfecnlnqr**
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

---

## Step 2: Run SQL Migration #1

### File: `COMPLETE_DATABASE_SCHEMA.sql`

**How to run it:**
1. Open the file `COMPLETE_DATABASE_SCHEMA.sql` in your code editor (VS Code/Cursor)
2. Copy **ALL** the content (Cmd+A, then Cmd+C)
3. Paste into Supabase SQL Editor
4. Click **"Run"** button (or press Cmd+Enter)
5. Wait for success message ✅

**What it creates:**
- `customers` table
- `leads` table
- `subscriptions` table
- `subscription_plans` table
- `notifications` table
- `activities` table
- `webhooks` table
- And more core tables...

---

## Step 3: Run SQL Migration #2

### File: `additional-tables-migration.sql`

**How to run it:**
1. Click **"New Query"** in Supabase
2. Open the file `additional-tables-migration.sql` in your code editor
3. Copy **ALL** the content
4. Paste into Supabase SQL Editor
5. Click **"Run"**
6. Wait for success message ✅

**What it creates:**
- `scraping_campaigns` table
- `contacts` table
- `outreach_campaigns` table
- `conversations` table
- `messages` table
- And more campaign-related tables...

---

## Step 4: Run SQL Migration #3

### File: `advanced-ai-tables-migration.sql`

**How to run it:**
1. Click **"New Query"** in Supabase
2. Open the file `advanced-ai-tables-migration.sql` in your code editor
3. Copy **ALL** the content
4. Paste into Supabase SQL Editor
5. Click **"Run"**
6. Wait for success message ✅

**What it creates:**
- `lead_scoring_rules` table
- `ai_generated_content` table
- `ab_test_campaigns` table
- `competitor_tracking` table
- And more AI-related tables...

---

## Step 5: Verify Tables Were Created

1. In Supabase, click **"Table Editor"** in the left sidebar
2. You should see these tables in the list:
   - ✅ customers
   - ✅ leads
   - ✅ subscriptions
   - ✅ subscription_plans
   - ✅ notifications
   - ✅ activities
   - ✅ scraping_campaigns
   - ✅ ad_campaigns
   - ✅ contacts
   - ✅ outreach_campaigns
   - ✅ conversations
   - ✅ messages
   - ✅ lead_scoring_rules
   - ✅ ai_generated_content
   - And many more...

If you see these tables, **SUCCESS!** ✅

---

## Step 6: Update Vercel Environment Variables

1. Go to: **https://vercel.com/dashboard**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these TWO variables (if not already added):

```
Variable Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://veeylzzmymqqfecnlnqr.supabase.co
```

```
Variable Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZXlsenpteW1xcWZlY25sbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzg3ODEsImV4cCI6MjA3NDgxNDc4MX0.w3N3YvKYJYtmcxgSpRnz-JGTbfyJNZHbeEMvkw0gFOI
```

5. Click **"Save"**
6. Go to **Deployments** tab
7. Find the latest deployment
8. Click the 3 dots (•••) → **"Redeploy"**

---

## Step 7: Restart Local Server

Your local server already has the `.env.local` file with Supabase credentials!

Just restart it:
```bash
# Press Ctrl+C to stop the current server
# Then run:
npm run dev
```

---

## 🧪 Test Everything

### Test Localhost:
1. Go to: http://localhost:3000/signup
2. Try creating a test account
3. Check your email for verification
4. Complete onboarding
5. See your dashboard

### Test Production (after Vercel redeploys):
1. Go to: https://transitionmarketingai.com/signup
2. Create a real account
3. Check email for verification
4. Complete onboarding
5. See your dashboard

---

## ✅ Quick Checklist

- [ ] Opened Supabase SQL Editor
- [ ] Ran `COMPLETE_DATABASE_SCHEMA.sql` (File #1)
- [ ] Ran `additional-tables-migration.sql` (File #2)
- [ ] Ran `advanced-ai-tables-migration.sql` (File #3)
- [ ] Verified tables exist in Table Editor
- [ ] Added Vercel environment variables
- [ ] Redeployed on Vercel
- [ ] Restarted local server (Ctrl+C, then `npm run dev`)
- [ ] Tested signup on localhost ✅
- [ ] Tested signup on production ✅

---

## 🔴 Common Mistakes to Avoid

❌ **DON'T** run markdown files (.md) in SQL Editor  
✅ **DO** run SQL files (.sql)

❌ **DON'T** copy file names  
✅ **DO** copy the file CONTENTS

❌ **DON'T** forget to click "Run" after pasting  
✅ **DO** click "Run" and wait for success

❌ **DON'T** run migrations out of order  
✅ **DO** run them in order: 1, 2, 3

---

## 📁 File Locations

All SQL files are in your project root:

```
TransitionMarketingAI/
├── COMPLETE_DATABASE_SCHEMA.sql          ← Run this FIRST
├── additional-tables-migration.sql       ← Run this SECOND
├── advanced-ai-tables-migration.sql      ← Run this THIRD
└── .env.local                            ← Already created! ✅
```

---

## 🎉 After Setup Complete

You'll have:
- ✅ Full database with all tables
- ✅ Authentication working
- ✅ Real user signups working
- ✅ Onboarding working
- ✅ Dashboard working
- ✅ Data persisting in Supabase
- ✅ Demo mode still working

**Estimated time: 15-20 minutes**

---

## 🆘 Need Help?

If you see any errors in the SQL Editor, just send me the error message and I'll help you fix it!

Common issues:
- **"relation already exists"** → Table already created, that's fine!
- **"syntax error at or near #"** → You're running a .md file, not a .sql file!
- **"permission denied"** → Make sure you're logged into the correct Supabase project

