# Environment Variables Setup Guide

## 📋 Required Environment Variables

Create a `.env.local` file in the root directory with these variables:

```bash
# ============================================================================
# APP CONFIGURATION
# ============================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Production: https://yourplatform.in

# ============================================================================
# SUPABASE
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Get from: https://app.supabase.com/project/_/settings/api

# ============================================================================
# RAZORPAY (Payment Gateway)
# ============================================================================
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# Get from: https://dashboard.razorpay.com/app/keys
# Test Mode: Use rzp_test_* keys for development
# Live Mode: Use rzp_live_* keys for production

# ============================================================================
# FACEBOOK / META
# ============================================================================
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_ACCESS_TOKEN=your_long_lived_access_token
FACEBOOK_VERIFY_TOKEN=any_random_string_you_choose

# Get from: https://developers.facebook.com/apps/
# Long-lived token: https://developers.facebook.com/tools/access_token/

# ============================================================================
# TWILIO (WhatsApp Business API)
# ============================================================================
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Get from: https://console.twilio.com/
# WhatsApp Sandbox: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
# Production: Apply for WhatsApp Business API

# ============================================================================
# OPENAI (AI Lead Qualification)
# ============================================================================
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx

# Get from: https://platform.openai.com/api-keys
# Model used: gpt-4-turbo-preview

# ============================================================================
# OPTIONAL: EMAIL SERVICE
# ============================================================================
RESEND_API_KEY=re_xxxxxxxxxxxxx
# Get from: https://resend.com/api-keys

# ============================================================================
# OPTIONAL: GOOGLE ADS
# ============================================================================
GOOGLE_ADS_CLIENT_ID=your_google_ads_client_id
GOOGLE_ADS_CLIENT_SECRET=your_google_ads_client_secret
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token
```

---

## 🚀 Setup Instructions

### 1. Supabase Setup

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon/Public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role key → `SUPABASE_SERVICE_ROLE_KEY`
5. Run the SQL schema:
   - Go to SQL Editor
   - Copy contents of `database-schema-india-leadgen.sql`
   - Execute

---

### 2. Razorpay Setup

1. Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Sign up / Login
3. Switch to Test Mode (for development)
4. Go to Settings → API Keys
5. Generate new keys:
   - Key ID → `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - Key Secret → `RAZORPAY_KEY_SECRET`
6. Go to Settings → Webhooks
7. Create webhook:
   - URL: `https://yourplatform.in/api/webhooks/razorpay`
   - Events: Select all payment and subscription events
   - Copy Secret → `RAZORPAY_WEBHOOK_SECRET`

**Important**: For production, switch to Live Mode and get live keys!

---

### 3. Facebook/Meta Setup

1. Go to [https://developers.facebook.com](https://developers.facebook.com)
2. Create New App → Business → Lead Ads
3. Add Products:
   - ✅ Webhooks
   - ✅ Lead Ads
4. Basic Settings:
   - Copy App ID → `FACEBOOK_APP_ID`
   - Copy App Secret → `FACEBOOK_APP_SECRET`
5. Get Access Token:
   - Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
   - Get User Access Token
   - Select Permissions:
     - `pages_manage_ads`
     - `leads_retrieval`
     - `ads_management`
   - Generate Token
   - Extend to Long-Lived Token (60 days)
   - Copy → `FACEBOOK_ACCESS_TOKEN`
6. Set Verify Token:
   - Choose any random string → `FACEBOOK_VERIFY_TOKEN`
   - You'll use this when setting up webhooks

**Webhook Setup**:
- Go to App → Webhooks
- Subscribe to Page
- Callback URL: `https://yourplatform.in/api/webhooks/facebook/leads/{customerId}`
- Verify Token: (your chosen string)
- Subscribe to: `leadgen`

---

### 4. Twilio (WhatsApp) Setup

1. Go to [https://console.twilio.com](https://console.twilio.com)
2. Sign up / Login
3. Get credentials:
   - Account SID → `TWILIO_ACCOUNT_SID`
   - Auth Token → `TWILIO_AUTH_TOKEN`
4. For Development (WhatsApp Sandbox):
   - Go to Messaging → Try it Out → Send a WhatsApp message
   - Follow instructions to join sandbox
   - Sandbox Number → `TWILIO_WHATSAPP_NUMBER`
5. For Production:
   - Apply for WhatsApp Business API
   - Get approved number
   - Enable WhatsApp Template Messages

**Webhook Setup**:
- Go to Messaging → Settings → WhatsApp Sandbox Settings
- When a message comes in: `https://yourplatform.in/api/webhooks/whatsapp`

---

### 5. OpenAI Setup

1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Sign up / Login
3. Go to API Keys
4. Create new secret key
5. Copy → `OPENAI_API_KEY`

**Cost Estimate**:
- GPT-4 Turbo: ~₹0.80 per lead qualification
- Monthly (1000 leads): ~₹800

---

### 6. Email Service (Optional)

**Option A: Resend** (Recommended)
1. Go to [https://resend.com](https://resend.com)
2. Sign up
3. Create API Key → `RESEND_API_KEY`

**Option B: Gmail SMTP**
1. Enable 2FA on Gmail
2. Generate App Password
3. Use in `SMTP_*` variables

---

## 🧪 Testing

### Test Mode vs Production

**Development (.env.local)**:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886  # Sandbox
```

**Production (.env.production)**:
```bash
NEXT_PUBLIC_APP_URL=https://yourplatform.in
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+919876543210  # Your number
```

---

## 🔒 Security

**NEVER commit `.env.local` or `.env.production` to git!**

Add to `.gitignore`:
```
.env*
!.env.example
```

**Keep secrets secure**:
- Use Vercel Environment Variables for production
- Rotate keys regularly
- Use different keys for dev/prod
- Never share Service Role keys

---

## ✅ Verification

Test each service:

```bash
# Test Supabase
npm run test:supabase

# Test Razorpay
npm run test:razorpay

# Test WhatsApp
npm run test:whatsapp

# Test Facebook
npm run test:facebook

# Test OpenAI
npm run test:openai
```

---

## 📞 Need Help?

- Supabase: https://supabase.com/docs
- Razorpay: https://razorpay.com/docs/
- Twilio: https://www.twilio.com/docs/whatsapp
- Facebook: https://developers.facebook.com/docs/marketing-api/
- OpenAI: https://platform.openai.com/docs


