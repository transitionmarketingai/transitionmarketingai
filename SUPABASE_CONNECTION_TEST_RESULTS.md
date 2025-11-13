# Supabase Connection Test Results

## Test Status: ⚠️ Manual Verification Required

Since the automated tests require environment variables that may only be set in production (Vercel), please verify the following manually:

## ✅ Manual Test Checklist

### 1. Test Onboarding Quiz Submission

1. Visit: `https://transitionmarketingai.com/onboarding`
2. Complete the quiz with test data
3. Submit the form
4. **Check Supabase Dashboard:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Go to **Table Editor** → `onboarding_submissions`
   - You should see your test submission

**Expected Result:** ✅ Submission appears in Supabase table

---

### 2. Test Waitlist Submission

1. Visit: `https://transitionmarketingai.com/not-a-fit` (or get a low quiz score)
2. Fill out the waitlist form
3. Submit
4. **Check Supabase Dashboard:**
   - Go to **Table Editor** → `waitlist`
   - You should see your waitlist entry

**Expected Result:** ✅ Entry appears in `waitlist` table

---

### 3. Test Admin Dashboard

1. Visit: `https://transitionmarketingai.com/admin/login`
2. Enter your admin password (from Vercel env vars: `ADMIN_PASSWORD`)
3. You should see the admin dashboard
4. **Check:**
   - Dashboard loads without errors
   - You can see onboarding submissions
   - You can click on a submission to view details

**Expected Result:** ✅ Admin dashboard loads and shows data

---

### 4. Test Client Call Checklist

1. In admin dashboard, click on any submission
2. Fill in some fields in the call checklist
3. Click "Save"
4. **Check Supabase Dashboard:**
   - Go to **Table Editor** → `client_onboarding_calls`
   - You should see the call record

**Expected Result:** ✅ Call record is saved in Supabase

---

### 5. Test PDF Generation

1. In admin dashboard, open a client detail page
2. Fill in these required fields:
   - `recommended_pilot_investment_min`
   - `recommended_pilot_investment_max`
   - `target_inquiries_min`
   - `target_inquiries_max`
3. Click "Generate Offer PDF"
4. **Expected Result:** ✅ PDF downloads successfully

---

### 6. Test WhatsApp Summary

1. In admin dashboard, open a client detail page
2. Ensure required fields are filled (same as PDF)
3. Click "Generate WhatsApp Summary"
4. **Expected Result:** ✅ Message appears in textarea
5. Click "Copy to Clipboard"
6. **Expected Result:** ✅ Message is copied

---

## 🔍 If Tests Fail

### Check Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these are set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`

### Check Supabase Database Schema

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Run this query to check tables:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('onboarding_submissions', 'waitlist', 'client_onboarding_calls');
   ```
5. **Expected Result:** Should return 3 rows

### Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Check **Function Logs** for any errors
4. Look for Supabase-related errors

---

## 📊 Test Results Template

Copy and fill this out:

```
✅ Onboarding Quiz Submission: [PASS/FAIL]
✅ Waitlist Submission: [PASS/FAIL]
✅ Admin Dashboard: [PASS/FAIL]
✅ Client Call Checklist: [PASS/FAIL]
✅ PDF Generation: [PASS/FAIL]
✅ WhatsApp Summary: [PASS/FAIL]

Notes:
[Any issues or observations]
```

---

## 🎯 Quick Verification Commands

If you have access to Vercel CLI:

```bash
# Check environment variables
vercel env ls

# Check deployment logs
vercel logs --follow
```

