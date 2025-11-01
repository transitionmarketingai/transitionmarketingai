# 📋 User Input Required - Final Checklist

**Platform Status:** ~85% Complete for MVP Launch  
**This checklist contains items that require your input/configuration before launch.**

---

## 🔴 **CRITICAL (Do Before Launch)**

### **1. Payment Gateway Configuration** ⚠️ REQUIRED
- [ ] **Razorpay Account:** Create Razorpay account at https://razorpay.com
- [ ] **Get API Keys:** 
  - Go to Razorpay Dashboard → Settings → API Keys
  - Copy `Key ID` and `Key Secret`
- [ ] **Add to Vercel:**
  - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
  - Add: `RAZORPAY_KEY_ID` = (your key id)
  - Add: `RAZORPAY_KEY_SECRET` = (your key secret)
  - Select: "Production", "Preview", and "Development"
- [ ] **Test Payment:** Use Razorpay test keys first to verify payment flow works
- [ ] **Set Up Webhooks (Optional but Recommended):**
  - In Razorpay Dashboard → Settings → Webhooks
  - Add webhook URL: `https://transitionmarketingai.com/api/payment/webhook`
  - Enable events: `payment.captured`, `payment.failed`

### **2. Email Service Configuration** ⚠️ REQUIRED
- [ ] **SMTP Provider:** Confirm which SMTP provider you'll use (Gmail, SendGrid, Resend, etc.)
- [ ] **SMTP Credentials:**
  - **Gmail:** Create App Password (Google Account → Security → 2-Step Verification → App Passwords)
  - **SendGrid/Resend:** Get API key from provider
- [ ] **Add to Vercel:**
  - `SMTP_HOST` = smtp.gmail.com (or your provider's host)
  - `SMTP_PORT` = 587 (or your provider's port)
  - `SMTP_USER` = your-email@gmail.com
  - `SMTP_PASSWORD` = your-app-password-or-api-key
  - `SMTP_FROM` = noreply@transitionmarketingai.com (or your preferred from address)
- [ ] **Test Email:** Send a test email to verify SMTP is working

### **3. Contact Information** ⚠️ REQUIRED
- [ ] **Support Email:** Confirm `info@transitionmarketingai.com` is correct (or update)
- [ ] **Phone Number:** Confirm business phone number
- [ ] **WhatsApp Number:** Confirm WhatsApp number (or remove if not using)
- [ ] **Update in Code:**
  - Search for `info@transitionmarketingai.com` and replace if needed
  - Update `NEXT_PUBLIC_PHONE_NUMBER` in environment variables
  - Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in environment variables

### **4. Legal Content Review** ⚠️ REQUIRED
- [ ] **Privacy Policy:** 
  - Read `/privacy` page
  - Update with your specific data collection practices
  - Add any additional clauses needed for your business
- [ ] **Terms of Service:**
  - Read `/terms` page
  - Review payment terms (currently "Net 30 days" - update if different)
  - Review service agreement terms
  - Add refund policy if applicable
- [ ] **About Us:**
  - Customize `/about` page with your actual:
    - Company story
    - Mission and values
    - Team information (if you want to share)
    - Why you started this business

### **5. Pricing & Business Terms** ⚠️ REQUIRED
- [ ] **Payment Terms:** 
  - Confirm: Net 15, Net 30, or upfront payment?
  - Update in Terms of Service if different from default
- [ ] **GST Rate:**
  - Currently set to 18% (standard for India)
  - Confirm if this applies to your business
  - Update in invoice generation code if different (`src/lib/invoices/pdf-generator.tsx` line ~123)
- [ ] **Refund Policy:**
  - Decide: Do you offer refunds? Under what conditions?
  - Add refund policy to Terms of Service or create separate page

### **6. Database Migrations** ⚠️ REQUIRED
- [ ] **Run Migrations in Supabase:**
  - Go to Supabase Dashboard → SQL Editor
  - Run: `supabase/migrations/add_consultation_fields.sql`
  - Run: `supabase/migrations/add_lead_verification_fields.sql`
  - Verify tables have the new columns

---

## 🟡 **HIGH PRIORITY (Strongly Recommended)**

### **7. Content Review & Customization**
- [ ] **Homepage:**
  - Review all text on homepage
  - Ensure messaging matches your brand voice
  - Update any placeholder content
- [ ] **Feature Descriptions:**
  - Review all feature descriptions for accuracy
  - Make sure they match what you actually offer
- [ ] **FAQ Section:**
  - Review all FAQ answers
  - Add more questions if needed
  - Ensure answers are accurate for your business model
- [ ] **How It Works Page:**
  - Review step-by-step process description
  - Ensure it matches your actual process

### **8. Email Templates Review**
- [ ] **Consultation Confirmation Email:**
  - Test consultation form submission
  - Review email received by customer
  - Customize if needed
- [ ] **Invoice Email:**
  - Generate a test invoice
  - Review email sent to client
  - Customize template if needed (`src/lib/invoices/email-sender.ts`)
- [ ] **Welcome Email:**
  - Create welcome email template for new clients
  - Include dashboard login instructions

### **9. End-to-End Testing**
- [ ] **Consultation Flow:**
  1. Submit consultation form on marketing site
  2. Check email received (admin and customer)
  3. Login as admin
  4. View consultation in admin dashboard
  5. Update consultation status
  6. Add notes
  7. Start onboarding process
- [ ] **Client Onboarding:**
  1. Complete onboarding form
  2. Create custom plan
  3. Verify client appears in clients list
  4. Verify client can login to dashboard
- [ ] **Invoice & Payment:**
  1. Create invoice for client
  2. Send invoice via email
  3. Verify payment link in email
  4. Test payment (use Razorpay test mode)
  5. Verify invoice status updates to "paid"
- [ ] **Lead Management:**
  1. Upload leads (CSV or manual)
  2. Verify leads appear in client dashboard
  3. Test lead export (CSV)
  4. Test search and filtering

### **10. Mobile Responsiveness**
- [ ] **Test All Pages on Mobile:**
  - Homepage
  - Consultation form
  - Admin dashboard (all pages)
  - Client dashboard (all pages)
  - Invoice pages
- [ ] **Fix Any Issues:**
  - Buttons too small
  - Text too small
  - Forms hard to fill
  - Tables not scrolling properly

---

## 🟢 **RECOMMENDED (Can Do Post-Launch)**

### **11. Analytics & Tracking**
- [ ] Set up Google Analytics
- [ ] Add tracking code to site
- [ ] Set up conversion goals (consultation form submissions)
- [ ] Set up error monitoring (Sentry, LogRocket)

### **12. SEO Optimization**
- [ ] Review meta tags
- [ ] Add structured data (JSON-LD)
- [ ] Create sitemap.xml
- [ ] Submit to Google Search Console

### **13. Performance Optimization**
- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Enable caching where appropriate
- [ ] Minimize bundle size

---

## 📝 **CONFIGURATION VALUES TO UPDATE**

### **Environment Variables Template**
```bash
# Already Configured (Verify these)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ⚠️ ADD THESE (Required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@transitionmarketingai.com

RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# ⚠️ UPDATE THESE (Contact Info)
NEXT_PUBLIC_APP_URL=https://transitionmarketingai.com
NEXT_PUBLIC_PHONE_NUMBER=+91-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
ADMIN_WHATSAPP=91XXXXXXXXXX

# Optional (If using WhatsApp API)
GUPSHUP_API_KEY= (if using Gupshup)
TWILIO_ACCOUNT_SID= (if using Twilio)
```

### **Code Locations to Update**
1. **Support Email:**
   - Search for: `info@transitionmarketingai.com`
   - Files: Multiple email templates and contact pages

2. **Company Name:**
   - Search for: `Transition Marketing AI`
   - Files: Invoices, emails, marketing pages

3. **Payment Terms:**
   - File: `src/app/(marketing)/terms/page.tsx`
   - Update: Payment terms section

4. **GST Rate:**
   - File: `src/lib/invoices/pdf-generator.tsx`
   - Line: ~123 (taxRate = 0.18)
   - Update if different from 18%

---

## ✅ **QUICK START GUIDE**

### **1. Configure Environment Variables (30 min)**
1. Go to Vercel Dashboard
2. Project → Settings → Environment Variables
3. Add all variables from template above
4. Redeploy

### **2. Test Consultation Flow (15 min)**
1. Submit consultation form
2. Check emails received
3. Login as admin
4. View consultation

### **3. Test Invoice & Payment (15 min)**
1. Create test client
2. Generate invoice
3. Send invoice
4. Test payment link (Razorpay test mode)

### **4. Review Content (1 hour)**
1. Read Privacy Policy and Terms
2. Review homepage content
3. Check FAQ answers
4. Customize About Us page

### **5. Mobile Test (30 min)**
1. Open site on mobile browser
2. Test all main pages
3. Fix any layout issues

---

## 🎯 **LAUNCH READINESS**

### **You're Ready to Launch When:**
- ✅ All environment variables configured
- ✅ Razorpay payment tested (test mode)
- ✅ Email notifications working
- ✅ Legal pages reviewed
- ✅ Content reviewed
- ✅ End-to-end flow tested
- ✅ Mobile responsive (basic check)

### **Post-Launch Tasks:**
- Monitor error logs
- Track conversions
- Gather user feedback
- Add testimonials when available
- Enhance features based on usage

---

## 📞 **NEED HELP?**

If you get stuck on any item:
1. Check the error message
2. Check Vercel logs
3. Check Supabase logs
4. Review the implementation summary document

**Most common issues:**
- **Razorpay errors:** Usually means keys not set or incorrect
- **Email not sending:** Check SMTP credentials
- **Database errors:** Check if migrations ran
- **Build errors:** Check for missing environment variables

---

**Estimated time to complete all critical items: 2-3 hours**  
**Estimated time for high-priority items: 2-3 hours**  
**Total time to launch-ready: 4-6 hours**

