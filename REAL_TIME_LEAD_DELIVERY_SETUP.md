# 🚀 Real-Time Lead Delivery Setup Guide

## Overview

This system ensures leads are delivered **instantly** to clients when someone shows interest (ad form submission, inquiry, etc.), not waiting until end of week.

---

## ✅ **COMPLETED**

### **1. Database Migrations Created**
- ✅ `supabase/migrations/add_consultation_fields.sql` - Adds budget_range, contact_preference
- ✅ `supabase/migrations/add_lead_verification_fields.sql` - Adds verification fields to leads

### **2. Real-Time Webhook Endpoint**
- ✅ `/api/webhooks/lead-delivery` - Receives leads and delivers instantly
- ✅ Handles ad leads (auto-verified) vs scraped leads (needs verification)
- ✅ Sends instant email + WhatsApp notifications
- ✅ Creates dashboard notifications

### **3. Notification System**
- ✅ Email notifications for new leads
- ✅ WhatsApp notifications (if opted in)
- ✅ Dashboard notifications

---

## 🔧 **NEXT STEPS TO COMPLETE**

### **Step 1: Run Database Migrations**

Run these SQL files in your Supabase dashboard:

1. **Consultation Fields:**
   ```sql
   -- Run: supabase/migrations/add_consultation_fields.sql
   ```
   - Adds `budget_range` column
   - Adds `contact_preference` column
   - Creates indexes

2. **Lead Verification Fields:**
   ```sql
   -- Run: supabase/migrations/add_lead_verification_fields.sql
   ```
   - Adds `verification_status`, `phone_verified`, `email_verified`, `business_verified`
   - Adds `verified_at`, `verification_notes`

### **Step 2: Configure Webhook URLs**

#### **Facebook Lead Ads:**
1. Go to Facebook Events Manager
2. Add Webhook URL: `https://yourdomain.com/api/webhooks/lead-delivery`
3. Subscribe to `leadgen` events
4. Set verification token

#### **Google Ads (Form Extensions):**
1. Google Ads → Extensions → Lead Form
2. Set webhook URL: `https://yourdomain.com/api/webhooks/lead-delivery`
3. Configure form submission webhook

#### **LinkedIn Lead Ads:**
1. LinkedIn Campaign Manager → Webhooks
2. Add webhook: `https://yourdomain.com/api/webhooks/lead-delivery`
3. Subscribe to lead events

### **Step 3: Set Environment Variables**

Add to Vercel environment variables:

```env
# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=918888888888
ADMIN_WHATSAPP=918888888888

# Phone
NEXT_PUBLIC_PHONE_NUMBER=+918888888888

# App URL
NEXT_PUBLIC_APP_URL=https://transitionmarketingai.com
```

### **Step 4: Test Real-Time Delivery**

**Test Flow:**
1. Submit a test lead via webhook
2. Verify lead appears in dashboard instantly
3. Check email notification sent
4. Check WhatsApp notification (if phone provided)
5. Check dashboard notification badge

**Test Endpoint:**
```bash
POST /api/webhooks/lead-delivery
{
  "customer_id": "uuid-here",
  "name": "Test Lead",
  "email": "test@example.com",
  "phone": "+919876543210",
  "company": "Test Company",
  "source": "facebook_ads",
  "verified": true
}
```

---

## 📊 **HOW IT WORKS**

### **For Ad-Generated Leads (Instant):**

1. **User fills form on Facebook/Google ad**
   ↓
2. **Webhook triggered → `/api/webhooks/lead-delivery`**
   ↓
3. **Lead inserted with `verification_status: 'verified'`** (form submission = verified)
   ↓
4. **Instant notifications sent:**
   - Email to client
   - WhatsApp (if opted in)
   - Dashboard notification
   ↓
5. **Lead visible in client dashboard immediately**

**Timeline:** < 5 seconds from form submission to dashboard

### **For Scraped Leads (24-48 hours):**

1. **AI scraping finds prospect**
   ↓
2. **Lead inserted with `verification_status: 'pending'`**
   ↓
3. **Admin verifies lead** (phone, email, business)
   ↓
4. **Once verified → Instant notification sent**
   ↓
5. **Lead delivered to client dashboard**

**Timeline:** 24-48 hours (verification time) + instant delivery once verified

---

## 🔐 **WEBHOOK SECURITY**

### **Add Authentication (Recommended):**

Update `/api/webhooks/lead-delivery/route.ts`:

```typescript
// Verify webhook secret
const webhookSecret = req.headers.get('x-webhook-secret');
if (webhookSecret !== process.env.WEBHOOK_SECRET) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

Add to Vercel:
```env
WEBHOOK_SECRET=your-secret-key-here
```

---

## ✅ **CHECKLIST**

- [ ] Run database migrations in Supabase
- [ ] Set environment variables in Vercel
- [ ] Configure Facebook Lead Ads webhook
- [ ] Configure Google Ads form webhook
- [ ] Configure LinkedIn Lead Ads webhook
- [ ] Test webhook endpoint with sample lead
- [ ] Verify email notifications work
- [ ] Verify WhatsApp notifications work
- [ ] Verify dashboard notifications appear
- [ ] Test with real ad form submission

---

## 🎯 **EXPECTED RESULTS**

After setup:
- ✅ Leads appear in dashboard within seconds (ad leads)
- ✅ Email notification sent immediately
- ✅ WhatsApp notification sent (if opted in)
- ✅ Dashboard notification badge updated
- ✅ No more "weekly batch" delays
- ✅ Clients can contact leads while they're hot

---

**The system is ready - just need to run migrations and configure webhooks!**

