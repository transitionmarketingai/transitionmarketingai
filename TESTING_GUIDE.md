# 🧪 TESTING GUIDE - Transition Marketing AI

## Quick Start Testing

### 1. Test Booking Form (Public)

**URL**: `https://yourdomain.com/book`

**Steps**:
1. Fill out the form:
   - Name: "Test User"
   - Phone: "9876543210"
   - Business Name: "Test Company"
   - Industry: Select any industry
   - Primary Goal: "Get more leads"
2. Submit the form
3. **Expected**: Success message or redirect
4. **Verify**: Check Airtable "Bookings" table (if configured)
5. **Verify**: Check Supabase `verified_inquiries` table

**API Test** (if form doesn't work):
```bash
curl -X POST https://yourdomain.com/api/bookings/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "9876543210",
    "industry": "Real Estate",
    "business_name": "Test Company",
    "main_goal": "Get more leads"
  }'
```

---

### 2. Test Admin Dashboard

**URL**: `https://yourdomain.com/admin/dashboard`

**Steps**:
1. Navigate to the URL
2. **Expected**: Should show list of inquiries or require authentication
3. If it shows inquiries, verify:
   - Table loads
   - Filters work
   - Summary stats display correctly

**If Protected**:
- Check browser console for errors
- Verify `NEXT_PUBLIC_ADMIN_KEY` is set in Vercel

---

### 3. Test Inquiry Management Flow

#### Step 1: Create an Inquiry

**Via API**:
```bash
curl -X POST https://yourdomain.com/api/inquiries/create \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "industry": "Real Estate",
    "requirement": "Looking for 3BHK apartment in Mumbai",
    "budget": "1-2 Cr",
    "timeline": "Within 3 months",
    "source": "Website"
  }'
```

**Expected Response**:
```json
{
  "success": true
}
```

**Verify in Supabase**:
- Go to Supabase → Table Editor → `verified_inquiries`
- Find the new record
- Verify all fields are saved correctly

#### Step 2: View Inquiry Details

**URL**: `https://yourdomain.com/admin/inquiries/[INQUIRY_ID]`

Replace `[INQUIRY_ID]` with the ID from step 1.

**Expected**:
- Inquiry details displayed
- Status badge visible
- Verification buttons visible
- AI Score section visible (empty initially)

#### Step 3: Verify Inquiry

On the inquiry details page:
1. Click "Mark as Verified"
2. Confirm the dialog
3. Add verification notes (optional)
4. **Expected**: Status updates to "Verified"
5. **Verify**: `verified_at` timestamp is set in database

**Via API**:
```bash
curl -X POST https://yourdomain.com/api/inquiries/verify \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{
    "id": "INQUIRY_ID",
    "verification_status": "verified",
    "notes": "Verified via phone call"
  }'
```

#### Step 4: Generate AI Score

On the inquiry details page:
1. Click "Generate AI Score" button
2. **Expected**: 
   - Loading state appears
   - Score (0-100) displays
   - Reason text displays
   - "Last scored" timestamp appears
3. **Verify**: Check database for `ai_score`, `ai_reason`, `ai_scored_at`

**Via API**:
```bash
curl -X POST https://yourdomain.com/api/inquiries/ai-score \
  -H "Content-Type: application/json" \
  -d '{
    "id": "INQUIRY_ID"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "score": 75,
  "reason": "High intent based on budget and timeline"
}
```

**Note**: Requires `OPENAI_API_KEY` to be set. If missing, will return error.

#### Step 5: Assign Client

On the inquiry details page:
1. Enter client email: `client@example.com`
2. Click "Save Client Email"
3. **Expected**: Email saved and displayed
4. **Verify**: Check database `client_email` field

**Via API**:
```bash
curl -X POST https://yourdomain.com/api/inquiries/assign-client \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{
    "id": "INQUIRY_ID",
    "client_email": "client@example.com"
  }'
```

#### Step 6: Deliver Inquiry

On the inquiry details page:
1. Click "Deliver to Client" button
2. **Expected**: 
   - Button becomes disabled
   - "Delivered" status appears
   - `delivered_at` timestamp displayed
3. **Verify**: Check database `delivered` = true, `delivered_at` is set

**Via API**:
```bash
curl -X POST https://yourdomain.com/api/inquiries/deliver \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{
    "id": "INQUIRY_ID"
  }'
```

---

### 4. Test Client Dashboard

**URL**: `https://yourdomain.com/dashboard/client`

**Expected**:
- Shows inquiries where `client_email` matches `NEXT_PUBLIC_DEMO_CLIENT_EMAIL`
- Summary stats at top
- Filters work (search, industry, status, intent)
- Export CSV button works

**Test Filters**:
1. **Search**: Type a name or email - should filter results
2. **Industry Filter**: Select an industry - should filter
3. **Status Filter**: Select a status - should filter
4. **Intent Filter**: Select High/Medium/Low - should filter

**Test Export**:
1. Apply some filters
2. Click "Export CSV"
3. **Expected**: CSV file downloads with filtered data

**API Test**:
```bash
curl "https://yourdomain.com/api/client/inquiries?email=client@example.com"
```

**Expected Response**:
```json
{
  "success": true,
  "inquiries": [
    {
      "id": "...",
      "name": "...",
      "phone": "...",
      "email": "...",
      "industry": "...",
      "ai_score": 75,
      "verification_status": "verified",
      "delivered": true,
      "delivered_at": "2025-01-20T10:15:00Z",
      "requirement": "...",
      "client_email": "client@example.com"
    }
  ]
}
```

---

### 5. Test Marketing Pages

#### Homepage
**URL**: `https://yourdomain.com/`

**Check**:
- [ ] Page loads without errors
- [ ] All sections visible
- [ ] CTAs point to `/book`
- [ ] Mobile responsive
- [ ] No console errors

#### Industry Pages
Test each:
- `/industries/real-estate`
- `/industries/healthcare-wellness`
- `/industries/education-training`
- `/industries/professional-services`
- `/industries/startups-saas`

**Check**:
- [ ] Page loads
- [ ] "How Our Verified Inquiry Funnel Works" section visible
- [ ] All 5 steps displayed
- [ ] CTA button works
- [ ] Mobile responsive

---

## 🐛 Common Issues & Fixes

### Issue 1: Admin Dashboard Not Accessible

**Symptoms**:
- 401 Unauthorized error
- Blank page
- Redirects to login

**Fix**:
1. Check `NEXT_PUBLIC_ADMIN_KEY` is set in Vercel
2. Verify the key matches what you're using
3. Check browser console for errors
4. Verify `checkAdminKey` function is working

### Issue 2: AI Scoring Fails

**Symptoms**:
- Error: "AI scoring failed"
- 500 error from API

**Fix**:
1. Check `OPENAI_API_KEY` is set in Vercel
2. Verify key is valid and has credits
3. Check API route logs in Vercel
4. Test OpenAI API key separately

### Issue 3: Client Dashboard Shows No Data

**Symptoms**:
- "No inquiries found" message
- Empty table

**Fix**:
1. Verify `NEXT_PUBLIC_DEMO_CLIENT_EMAIL` is set
2. Check that inquiries have `client_email` matching the demo email
3. Verify inquiries are marked as `delivered = true`
4. Check API response: `/api/client/inquiries?email=...`

### Issue 4: Booking Form Doesn't Submit

**Symptoms**:
- Form doesn't submit
- Error message appears
- No data in Airtable/Supabase

**Fix**:
1. Check browser console for errors
2. Verify Airtable credentials are set (if using Airtable)
3. Check Supabase connection
4. Verify form validation passes
5. Check API route logs in Vercel

### Issue 5: Database Columns Missing

**Symptoms**:
- Error: "column does not exist"
- 500 errors from API

**Fix**:
1. Run SQL migrations in Supabase
2. Verify all columns exist in `verified_inquiries` table
3. Check column names match code exactly
4. Re-run migrations if needed

---

## 📊 Testing Checklist

Use this checklist to track your testing:

### Database
- [ ] `verified_inquiries` table exists
- [ ] All columns present (verification_notes, verified_at, ai_score, etc.)
- [ ] Can insert test record
- [ ] Can update test record
- [ ] Can query test record

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] `NEXT_PUBLIC_ADMIN_KEY` set
- [ ] `OPENAI_API_KEY` set (for AI scoring)
- [ ] `AIRTABLE_API_KEY` set (for booking form)
- [ ] `NEXT_PUBLIC_DEMO_CLIENT_EMAIL` set

### API Routes
- [ ] `POST /api/bookings/create` works
- [ ] `POST /api/inquiries/create` works
- [ ] `POST /api/inquiries/verify` works
- [ ] `POST /api/inquiries/ai-score` works
- [ ] `POST /api/inquiries/assign-client` works
- [ ] `POST /api/inquiries/deliver` works
- [ ] `GET /api/client/inquiries` works

### Frontend Pages
- [ ] Homepage loads
- [ ] Booking form (`/book`) works
- [ ] Admin dashboard (`/admin/dashboard`) loads
- [ ] Inquiry details page works
- [ ] Client dashboard (`/dashboard/client`) loads
- [ ] All industry pages load

### Features
- [ ] Inquiry creation works
- [ ] Inquiry verification works
- [ ] AI scoring works
- [ ] Client assignment works
- [ ] Delivery works
- [ ] Client dashboard filtering works
- [ ] CSV export works

---

## 🚀 Ready to Launch?

Your site is ready when:
1. ✅ All database migrations complete
2. ✅ All environment variables set
3. ✅ All API routes tested and working
4. ✅ All frontend pages load correctly
5. ✅ No critical errors in console
6. ✅ Mobile responsive on all pages

---

**Need Help?**
- Check Vercel logs for API errors
- Check Supabase logs for database errors
- Check browser console for frontend errors
- Review `LAUNCH_CHECKLIST.md` for detailed setup
