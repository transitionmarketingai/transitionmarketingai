# 🔌 Integrations & Setup Checklist

## ✅ Already Configured & Working

### 1. Google Analytics 4 ✅
- **Status**: ✅ Active
- **ID**: `G-G8K39NN5QJ`
- **Location**: `src/app/layout.tsx`
- **Tracking**: Page views, custom events (onboarding, Calendly, WhatsApp)
- **Action**: None needed - already live!

### 2. Supabase Database ✅
- **Status**: Should already be configured
- **Tables**: `onboarding_submissions`, `client_onboarding_calls`, `waitlist`
- **Action**: Verify connection in production

---

## 🔧 Required for Core Functionality

### 3. Meta Pixel (Facebook/Instagram Ads) ⏳
**Priority**: High (for ad tracking)
- **Status**: Component ready, needs Pixel ID
- **Required**: `NEXT_PUBLIC_META_PIXEL_ID`
- **How to get**:
  1. Go to https://business.facebook.com/events_manager2
  2. Create a new Pixel or use existing one
  3. Copy the Pixel ID (format: `123456789012345`)
  4. Add to Vercel: `NEXT_PUBLIC_META_PIXEL_ID=123456789012345`

### 4. Calendly Integration ⏳
**Priority**: High (for consultation bookings)
- **Status**: Code ready, needs URL
- **Required**: `NEXT_PUBLIC_CALENDLY_URL`
- **How to get**:
  1. Go to https://calendly.com/integrations/public_api
  2. Create a Calendly event (e.g., "Free Consultation")
  3. Copy your Calendly link (e.g., `https://calendly.com/yourname/consultation`)
  4. Add to Vercel: `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourname/consultation`

### 5. WhatsApp Contact ⏳
**Priority**: Medium (for contact button)
- **Status**: Code ready, needs number
- **Required**: `NEXT_PUBLIC_WHATSAPP_NUMBER`
- **Format**: Country code + number (e.g., `919876543210` for India)
- **How to set**:
  - Add to Vercel: `NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210`

---

## 📊 Analytics & Tracking (Optional but Recommended)

### 6. Google Tag Manager (Optional) ⏳
**Priority**: Low (skip for now - GA4 is enough)
- **Status**: Component ready, disabled
- **When to use**: If you want to manage multiple tags from one dashboard
- **Required**: `NEXT_PUBLIC_GTM_ID` (format: `GTM-XXXXXXX`)
- **Action**: Skip for now

---

## 🤖 Automation & Webhooks (Optional)

### 7. Airtable Integration (Optional) ⏳
**Priority**: Low (nice to have)
- **Status**: Webhook endpoint ready
- **Purpose**: Auto-sync onboarding submissions to Airtable
- **Required**: 
  - `AIRTABLE_WEBHOOK_URL`
  - `AIRTABLE_API_KEY`
- **Action**: Only if you want to track leads in Airtable

### 8. Google Sheets Integration (Optional) ⏳
**Priority**: Low (nice to have)
- **Status**: Webhook endpoint ready
- **Purpose**: Auto-sync onboarding submissions to Google Sheets
- **Required**: `GOOGLE_SHEETS_WEBHOOK_URL`
- **Action**: Only if you want to track leads in Google Sheets

### 9. WhatsApp Automation (Optional) ⏳
**Priority**: Low (future feature)
- **Status**: Webhook endpoint ready
- **Purpose**: Auto-send WhatsApp messages on onboarding submission
- **Required**: `WHATSAPP_WEBHOOK_URL`
- **Action**: Skip for now

---

## 🎯 Priority Action Items (Do These First)

### Immediate Setup (Required for Launch)

1. **Meta Pixel** ⏳
   - Get Pixel ID from Facebook Events Manager
   - Add to Vercel: `NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id`

2. **Calendly** ⏳
   - Create Calendly event
   - Add to Vercel: `NEXT_PUBLIC_CALENDLY_URL=your_calendly_link`

3. **WhatsApp Number** ⏳
   - Add to Vercel: `NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210`

### Verification Steps

4. **Verify Supabase Connection** ⏳
   - Check `/admin` dashboard loads
   - Test onboarding form submission
   - Verify data appears in Supabase dashboard

5. **Test Analytics** ⏳
   - Visit your site
   - Check Google Analytics Realtime reports
   - Verify events are tracking (onboarding_submit, calendly_booking, whatsapp_click)

---

## 📝 Quick Setup Guide for Vercel

1. **Go to Vercel Dashboard**:
   - https://vercel.com/dashboard
   - Select your project
   - Go to Settings → Environment Variables

2. **Add These Variables**:
   ```bash
   # Meta Pixel (Required)
   NEXT_PUBLIC_META_PIXEL_ID=123456789012345
   
   # Calendly (Required)
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourname/consultation
   
   # WhatsApp (Required)
   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
   ```

3. **Redeploy**:
   - After adding variables, trigger a new deployment
   - Or wait for next push to auto-deploy

---

## 🔍 Testing Checklist

After adding environment variables:

- [ ] Meta Pixel: Visit site, check Network tab for `fbevents.js` requests
- [ ] Calendly: Click "Book Free Consultation" button, should open Calendly
- [ ] WhatsApp: Click WhatsApp button, should open WhatsApp with pre-filled message
- [ ] Analytics: Complete onboarding form, check GA4 for `onboarding_submit` event
- [ ] Supabase: Submit onboarding form, check Supabase dashboard for new entry

---

## 📚 Documentation Links

- **Meta Pixel Setup**: https://www.facebook.com/business/help/952192354843755
- **Calendly Setup**: https://help.calendly.com/hc/en-us/articles/223147027
- **Google Analytics**: https://support.google.com/analytics/answer/9304153
- **Supabase Dashboard**: https://app.supabase.com

---

## ❓ Need Help?

If you need help setting up any of these:
1. Check the documentation links above
2. Each integration has error handling - site won't break if missing
3. Start with Meta Pixel + Calendly + WhatsApp (minimum viable setup)

---

**Last Updated**: Phase 3 Completion

