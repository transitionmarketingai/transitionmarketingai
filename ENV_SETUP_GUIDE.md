# 🔐 ENVIRONMENT VARIABLES SETUP GUIDE

## Copy these to your `.env.local` file

**Create file:** `/Users/abhishekjohn/Documents/Business/TransitionMarketingAI/Website/TransitionMarketingAI/.env.local`

---

## 📝 COMPLETE .ENV.LOCAL TEMPLATE:

```bash
# ============================================================================
# SUPABASE (Required - Phase 1)
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# ============================================================================
# APP
# ============================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ============================================================================
# RAZORPAY (Phase 4 - Indian Payments)
# ============================================================================
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# ============================================================================
# OPENAI (Phase 8 - AI Lead Scoring)
# ============================================================================
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx

# ============================================================================
# TWILIO (Phase 9 - WhatsApp)
# ============================================================================
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=+14155238886

# ============================================================================
# FACEBOOK (Phase 6 - Lead Ads)
# ============================================================================
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_ACCESS_TOKEN=your_token
FACEBOOK_VERIFY_TOKEN=random_string_12345

# ============================================================================
# GOOGLE ADS (Phase 7 - Lead Forms)
# ============================================================================
GOOGLE_ADS_CLIENT_ID=your_client_id
GOOGLE_ADS_CLIENT_SECRET=your_secret
GOOGLE_ADS_REFRESH_TOKEN=your_token
GOOGLE_ADS_DEVELOPER_TOKEN=your_token
GOOGLE_ADS_CUSTOMER_ID=123-456-7890
```

---

## 🎯 SETUP STEPS:

### **NOW (Phase 1):**
1. Create Supabase project
2. Get URL and API keys
3. Add to .env.local

### **Later (Phases 4-9):**
- Add Razorpay when setting up payments
- Add OpenAI when implementing AI
- Add Twilio when adding WhatsApp
- Add Facebook/Google when connecting ads

---

**For now, just set up Supabase!** Other keys come later.


