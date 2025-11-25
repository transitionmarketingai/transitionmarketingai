# 🚀 TRANSITION MARKETING AI - LAUNCH CHECKLIST

## ✅ PRE-LAUNCH CHECKLIST

### 🔴 CRITICAL - Must Complete Before Launch

#### 1. Database Setup (Supabase)
- [ ] Run SQL to create `verified_inquiries` table (if not exists)
- [ ] Run SQL to add `client_email` column to `verified_inquiries`
- [ ] Run SQL to add `verification_notes` column to `verified_inquiries`
- [ ] Run SQL to add `verified_at` column to `verified_inquiries`
- [ ] Run SQL to add `ai_score`, `ai_reason`, `ai_scored_at` columns to `verified_inquiries`
- [ ] Verify all columns exist in Supabase dashboard

**SQL Commands:**
```sql
-- Create table if not exists
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

-- Add columns if table exists but columns are missing
ALTER TABLE verified_inquiries ADD COLUMN IF NOT EXISTS verification_notes text;
ALTER TABLE verified_inquiries ADD COLUMN IF NOT EXISTS verified_at timestamp with time zone;
ALTER TABLE verified_inquiries ADD COLUMN IF NOT EXISTS ai_score integer;
ALTER TABLE verified_inquiries ADD COLUMN IF NOT EXISTS ai_reason text;
ALTER TABLE verified_inquiries ADD COLUMN IF NOT EXISTS ai_scored_at timestamp with time zone;
ALTER TABLE verified_inquiries ADD COLUMN IF NOT EXISTS client_email text;
```

#### 2. Environment Variables (Vercel)
Add these to Vercel → Project Settings → Environment Variables:

**Required:**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://aqpvpxbhcyhxybvpchms.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication
NEXT_PUBLIC_ADMIN_KEY=your_secure_admin_key_here
# OR
ADMIN_API_KEY=your_secure_admin_key_here

# OpenAI (for AI scoring)
OPENAI_API_KEY=sk-your_openai_api_key

# Airtable (for booking form)
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_STRATEGY_SESSIONS_BASE_ID=your_base_id
AIRTABLE_BOOKINGS_TABLE_NAME=Bookings

# Client Dashboard
NEXT_PUBLIC_DEMO_CLIENT_EMAIL=client@example.com
```

**Optional but Recommended:**
```bash
# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@transitionmarketingai.com

# Admin Contact
ADMIN_EMAIL=info@transitionmarketingai.com

# App URL
NEXT_PUBLIC_APP_URL=https://transitionmarketingai.com
NEXT_PUBLIC_BASE_URL=https://transitionmarketingai.com
```

#### 3. Admin Key Consistency Check
- [ ] Verify `NEXT_PUBLIC_ADMIN_KEY` is set in Vercel
- [ ] Check that admin routes use the same key variable
- [ ] Test admin authentication on `/admin/dashboard`

---

### 🟡 IMPORTANT - Should Complete Before Launch

#### 4. Test Core Features
- [ ] **Booking Form** (`/book`): Submit a test booking
- [ ] **Admin Dashboard**: Access `/admin/dashboard` with admin key
- [ ] **Inquiry Creation**: Create a test inquiry via API
- [ ] **Inquiry Verification**: Mark an inquiry as verified/rejected
- [ ] **AI Scoring**: Generate AI score for an inquiry
- [ ] **Client Assignment**: Assign a client email to an inquiry
- [ ] **Delivery**: Mark an inquiry as delivered
- [ ] **Client Dashboard**: Access `/dashboard/client` and verify filtering

#### 5. Marketing Pages
- [ ] Homepage loads correctly
- [ ] All industry pages load (Real Estate, Healthcare, Education, B2B, SaaS)
- [ ] All CTAs point to `/book`
- [ ] Forms submit successfully
- [ ] No broken links

#### 6. API Routes Testing
Test these critical endpoints:
- [ ] `POST /api/bookings/create` - Booking form submission
- [ ] `POST /api/inquiries/create` - Create inquiry (admin)
- [ ] `POST /api/inquiries/verify` - Verify inquiry (admin)
- [ ] `POST /api/inquiries/ai-score` - AI scoring
- [ ] `POST /api/inquiries/assign-client` - Client assignment
- [ ] `POST /api/inquiries/deliver` - Deliver inquiry
- [ ] `GET /api/client/inquiries?email=...` - Client dashboard data

---

### 🟢 NICE TO HAVE - Can Complete After Launch

#### 7. Analytics & Tracking
- [ ] Google Analytics setup (if needed)
- [ ] UTM parameter tracking working
- [ ] Conversion tracking

#### 8. Email & Notifications
- [ ] Email notifications working (if SMTP configured)
- [ ] Admin receives booking notifications
- [ ] Client receives inquiry notifications

#### 9. Performance
- [ ] Page load times acceptable
- [ ] Images optimized
- [ ] No console errors in production

---

## 🧪 TESTING ROADMAP

### Phase 1: Database & Environment Setup (30 minutes)

1. **Supabase Setup**
   ```bash
   # Go to Supabase SQL Editor
   # Run the SQL commands from section 1 above
   # Verify table structure in Table Editor
   ```

2. **Vercel Environment Variables**
   ```bash
   # Go to Vercel Dashboard
   # Project → Settings → Environment Variables
   # Add all required variables from section 2
   # Redeploy after adding variables
   ```

3. **Verify Deployment**
   - Check Vercel deployment logs for errors
   - Ensure build completes successfully
   - Verify site is accessible

---

### Phase 2: Core Functionality Testing (1 hour)

#### Test 1: Booking Form Flow
1. Navigate to `https://yourdomain.com/book`
2. Fill out the form with test data
3. Submit the form
4. **Expected**: Form submits successfully, shows success message
5. **Check**: Verify data appears in Airtable (if configured)
6. **Check**: Verify data appears in Supabase `verified_inquiries` table

#### Test 2: Admin Dashboard Access
1. Navigate to `https://yourdomain.com/admin/dashboard`
2. **Expected**: Should require authentication or show inquiries
3. If protected, test with admin key in headers

#### Test 3: Inquiry Management Flow
1. **Create Inquiry** (via API or admin UI):
   ```bash
   curl -X POST https://yourdomain.com/api/inquiries/create \
     -H "Content-Type: application/json" \
     -H "x-admin-key: YOUR_ADMIN_KEY" \
     -d '{
       "name": "Test User",
       "phone": "9876543210",
       "email": "test@example.com",
       "industry": "Real Estate",
       "requirement": "Looking for 3BHK"
     }'
   ```

2. **Verify Inquiry**:
   - Go to `/admin/inquiries/[id]`
   - Click "Mark as Verified"
   - Add verification notes
   - **Expected**: Status updates, `verified_at` timestamp set

3. **Generate AI Score**:
   - Click "Generate AI Score" button
   - **Expected**: Score appears (0-100), reason displayed
   - **Check**: Verify `ai_score`, `ai_reason`, `ai_scored_at` in database

4. **Assign Client**:
   - Enter client email: `client@example.com`
   - Click "Save Client Email"
   - **Expected**: Email saved, displayed on page

5. **Deliver Inquiry**:
   - Click "Deliver to Client" button
   - **Expected**: `delivered` = true, `delivered_at` timestamp set

#### Test 4: Client Dashboard
1. Navigate to `https://yourdomain.com/dashboard/client`
2. **Expected**: Shows inquiries where `client_email` matches `NEXT_PUBLIC_DEMO_CLIENT_EMAIL`
3. **Test Filters**: Search, industry filter, status filter, intent filter
4. **Test Export**: Click "Export CSV" - should download filtered data

---

### Phase 3: Marketing Pages Testing (30 minutes)

1. **Homepage** (`/`)
   - [ ] All sections load correctly
   - [ ] CTAs work and point to `/book`
   - [ ] No broken images or links
   - [ ] Mobile responsive

2. **Industry Pages**
   - [ ] `/industries/real-estate` - All sections visible
   - [ ] `/industries/healthcare-wellness` - All sections visible
   - [ ] `/industries/education-training` - All sections visible
   - [ ] `/industries/professional-services` - All sections visible
   - [ ] `/industries/startups-saas` - All sections visible
   - [ ] All CTAs point to `/book`

3. **Booking Page** (`/book`)
   - [ ] Form loads correctly
   - [ ] All fields visible
   - [ ] Conditional fields show/hide based on industry
   - [ ] Form validation works
   - [ ] Submission works

---

### Phase 4: Edge Cases & Error Handling (30 minutes)

1. **Missing Environment Variables**
   - Test with missing `OPENAI_API_KEY` - AI scoring should fail gracefully
   - Test with missing `SUPABASE_SERVICE_ROLE_KEY` - Should show error

2. **Empty States**
   - Client dashboard with no inquiries - Should show "No inquiries found"
   - Admin dashboard with no inquiries - Should show empty state

3. **Invalid Data**
   - Submit booking form with invalid phone - Should show validation error
   - Try to verify inquiry without admin key - Should return 401

---

## 🐛 KNOWN ISSUES TO CHECK

### 1. Admin Key Variable Mismatch
**Issue**: `checkAdminKey.ts` uses `ADMIN_API_KEY` but routes may use `NEXT_PUBLIC_ADMIN_KEY`
**Fix**: Ensure both are set to the same value, or standardize on one

### 2. Client Dashboard Email Filter
**Issue**: Uses `NEXT_PUBLIC_DEMO_CLIENT_EMAIL` constant
**Fix**: For production, consider using authentication to get client email

### 3. AI Scoring API Key
**Issue**: Requires `OPENAI_API_KEY` - if missing, scoring will fail
**Fix**: Ensure key is set, or add better error handling

---

## 📋 FINAL PRE-LAUNCH CHECKLIST

### Before Going Live:
- [ ] All database migrations run
- [ ] All environment variables set in Vercel
- [ ] Test booking form submission
- [ ] Test admin dashboard access
- [ ] Test inquiry verification flow
- [ ] Test AI scoring (if OpenAI key is set)
- [ ] Test client dashboard
- [ ] All marketing pages load correctly
- [ ] No console errors in production
- [ ] Mobile responsive on all pages
- [ ] All CTAs work correctly
- [ ] Domain configured in Vercel
- [ ] SSL certificate active (automatic with Vercel)

---

## 🚀 LAUNCH DAY CHECKLIST

### Morning (Before Launch):
- [ ] Final database migration check
- [ ] Environment variables verified
- [ ] Test one complete flow end-to-end
- [ ] Backup current database (if needed)

### Launch:
- [ ] Deploy latest code to production
- [ ] Verify deployment successful
- [ ] Test homepage loads
- [ ] Test booking form works
- [ ] Monitor error logs for first hour

### Post-Launch (First 24 Hours):
- [ ] Monitor Vercel logs for errors
- [ ] Check Supabase for new inquiries
- [ ] Test admin dashboard access
- [ ] Respond to any test bookings
- [ ] Monitor site performance

---

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues:

**Build Fails:**
- Check for syntax errors in latest commit
- Verify all dependencies installed
- Check Vercel build logs

**API Routes Return 500:**
- Check environment variables are set
- Verify Supabase connection
- Check API route logs in Vercel

**Database Errors:**
- Verify table structure matches code
- Check Supabase connection string
- Verify service role key is correct

**Admin Dashboard Not Accessible:**
- Check `NEXT_PUBLIC_ADMIN_KEY` is set
- Verify admin key matches in code
- Check browser console for errors

---

## ✅ SUCCESS CRITERIA

Your site is ready to launch when:
1. ✅ All database tables exist with correct schema
2. ✅ All environment variables are set
3. ✅ Booking form submits successfully
4. ✅ Admin dashboard is accessible
5. ✅ Inquiry management flow works end-to-end
6. ✅ Client dashboard shows filtered inquiries
7. ✅ All marketing pages load without errors
8. ✅ No critical console errors
9. ✅ Mobile responsive on all pages

---

## 🎯 NEXT STEPS AFTER LAUNCH

1. **Monitor First Week**
   - Track booking form submissions
   - Monitor error rates
   - Check inquiry creation flow

2. **Gather Feedback**
   - Test with real users
   - Collect feedback on UX
   - Identify pain points

3. **Iterate**
   - Fix any bugs found
   - Improve based on feedback
   - Add missing features

---

**Last Updated**: Based on current codebase state
**Status**: Ready for testing and launch preparation

