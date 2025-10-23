# 🗄️ Supabase Setup Instructions

## ✅ Step 1: Set Up Local Environment (2 minutes)

Create a file called `.env.local` in your project root with these contents:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://veeylzzmymqqfecnlnqr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZXlsenpteW1xcWZlY25sbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzg3ODEsImV4cCI6MjA3NDgxNDc4MX0.w3N3YvKYJYtmcxgSpRnz-JGTbfyJNZHbeEMvkw0gFOI

# OpenAI (Optional - for AI features)
# OPENAI_API_KEY=your_openai_key_here
```

**How to create it**:
```bash
# In your project root directory:
touch .env.local
# Then paste the content above
```

---

## ✅ Step 2: Run SQL Migrations in Supabase (15 minutes)

### **Go to Supabase Dashboard**:
1. Visit: https://supabase.com/dashboard
2. Select your project: `veeylzzmymqqfecnlnqr`
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

### **Run These 3 SQL Files in Order**:

#### **Migration 1: COMPLETE_DATABASE_SCHEMA.sql**
- Click "New Query"
- Copy the contents of `COMPLETE_DATABASE_SCHEMA.sql` file (in your project root)
- Paste into SQL Editor
- Click **"Run"** (or press Ctrl+Enter)
- Wait for success message

#### **Migration 2: additional-tables-migration.sql**
- Click "New Query" again
- Copy the contents of `additional-tables-migration.sql` file
- Paste into SQL Editor
- Click **"Run"**
- Wait for success message

#### **Migration 3: advanced-ai-tables-migration.sql**
- Click "New Query" again
- Copy the contents of `advanced-ai-tables-migration.sql` file
- Paste into SQL Editor
- Click **"Run"**
- Wait for success message

### **Verify Tables Were Created**:
1. In Supabase, click **"Table Editor"** in left sidebar
2. You should see these tables:
   - ✅ customers
   - ✅ leads
   - ✅ subscriptions
   - ✅ subscription_plans
   - ✅ notifications
   - ✅ scraping_campaigns
   - ✅ ad_campaigns
   - ✅ contacts
   - ✅ outreach_campaigns
   - ✅ conversations
   - ✅ messages
   - And more...

---

## ✅ Step 3: Configure Supabase Auth (5 minutes)

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://transitionmarketingai.com`
3. Add **Redirect URLs**:
   - `https://transitionmarketingai.com/*`
   - `http://localhost:3000/*` (for local testing)

4. Go to **Authentication** → **Email Templates**
5. Verify these templates exist (they should by default):
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

---

## ✅ Step 4: Update Vercel Environment Variables (5 minutes)

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Update these variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://veeylzzmymqqfecnlnqr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZXlsenpteW1xcWZlY25sbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzg3ODEsImV4cCI6MjA3NDgxNDc4MX0.w3N3YvKYJYtmcxgSpRnz-JGTbfyJNZHbeEMvkw0gFOI
```

5. Click **"Save"**
6. Go to **Deployments** tab
7. Click **"Redeploy"** on the latest deployment

---

## ✅ Step 5: Test Everything (10 minutes)

### **Test Local Development**:
```bash
# Restart your local server
# Press Ctrl+C to stop current server
npm run dev
```

Then test:
1. ✅ Demo mode: http://localhost:3000/login?demo=true (should work)
2. ✅ Signup: http://localhost:3000/signup (create test account)
3. ✅ Check email for verification
4. ✅ Login with your credentials
5. ✅ Complete onboarding
6. ✅ See dashboard

### **Test Production**:
1. Wait for Vercel deployment to complete (~2 minutes)
2. Visit: https://transitionmarketingai.com
3. Try signing up with a real email
4. Complete flow end-to-end

---

## 🔍 Troubleshooting

### **Issue: "getaddrinfo ENOTFOUND" error**
**Solution**: 
- Make sure `.env.local` file is created in project root
- Restart your development server
- Check that Supabase URL is correct

### **Issue: Tables not created**
**Solution**:
- Check SQL Editor for error messages
- Run migrations one by one
- Verify you're in the correct Supabase project

### **Issue: Auth not working**
**Solution**:
- Check Supabase → Authentication → URL Configuration
- Make sure Site URL is set
- Check email templates are configured

### **Issue: Can't create `.env.local`**
**Solution**:
```bash
# In project root:
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://veeylzzmymqqfecnlnqr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZXlsenpteW1xcWZlY25sbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzg3ODEsImV4cCI6MjA3NDgxNDc4MX0.w3N3YvKYJYtmcxgSpRnz-JGTbfyJNZHbeEMvkw0gFOI
EOF
```

---

## ✅ Success Checklist

- [ ] Created `.env.local` file
- [ ] Ran all 3 SQL migrations in Supabase
- [ ] Verified tables exist in Table Editor
- [ ] Configured Auth URLs in Supabase
- [ ] Updated Vercel environment variables
- [ ] Redeployed on Vercel
- [ ] Restarted local dev server
- [ ] Tested demo mode (works)
- [ ] Tested real signup (works)
- [ ] Tested login (works)
- [ ] Tested dashboard (works)

---

## 🎉 Once Complete

You'll be able to:
- ✅ Accept real user signups
- ✅ Users can complete onboarding
- ✅ Users can access their dashboard
- ✅ Data is stored in Supabase
- ✅ Authentication works
- ✅ Demo mode still works

**Estimated Total Time**: 30-40 minutes

---

## 📝 Quick Reference

**Supabase Dashboard**: https://supabase.com/dashboard/project/veeylzzmymqqfecnlnqr  
**Vercel Dashboard**: https://vercel.com/dashboard  
**Production Site**: https://transitionmarketingai.com  
**Demo Mode**: https://transitionmarketingai.com/login?demo=true  

**SQL Files to Run** (in order):
1. `COMPLETE_DATABASE_SCHEMA.sql`
2. `additional-tables-migration.sql`
3. `advanced-ai-tables-migration.sql`

All files are in your project root directory!
