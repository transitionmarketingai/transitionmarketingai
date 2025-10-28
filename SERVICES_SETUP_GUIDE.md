# 🔧 Complete Services Setup Guide

## Overview
This guide covers setting up all external services required for the consultation form to work in production.

---

## 📋 Services to Setup

1. **SMS Service (OTP)** - Fast2SMS (Recommended for India)
2. **Email Service** - Gmail SMTP (Free) or Resend (Better)
3. **WhatsApp** - Twilio (Current) or Gupshup (Recommended)
4. **Calendar** - Calendly (Free tier available)
5. **Database** - Supabase OTP table

---

## 1️⃣ SMS Service Setup (Fast2SMS)

### Why Fast2SMS?
- ✅ Cost: ₹0.30-0.50 per SMS (vs ₹2-3 with Twilio)
- ✅ Better delivery rates in India
- ✅ Simple API
- ✅ Free testing available

### Setup Steps:

1. **Sign up**: https://www.fast2sms.com
2. **Get API Key**:
   - Dashboard → API → API Key
   - Copy your API key

3. **Update code**:
   - File: `src/app/api/auth/otp/send/route.ts`
   - Replace TODO section with Fast2SMS integration

4. **Add to environment**:
   ```bash
   FAST2SMS_API_KEY=your_api_key_here
   ```

### Code Integration:
Already prepared! Just need to uncomment and add API key.

---

## 2️⃣ Email Service Setup

### Option A: Gmail SMTP (Free, Easy)

**Steps:**
1. Go to your Gmail account
2. Enable 2-Step Verification
3. Generate App Password:
   - Google Account → Security → 2-Step Verification
   - App Passwords → Generate
   - Copy the 16-digit password

4. **Add to environment**:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-digit-app-password
   SMTP_FROM=noreply@transitionmarketingai.com
   ```

**Limits**: 500 emails/day (free tier)

---

### Option B: Resend (Recommended)

**Why Resend?**
- ✅ 3,000 emails/month free
- ✅ Better deliverability
- ✅ Professional emails
- ✅ Easy setup

**Steps:**
1. Sign up: https://resend.com
2. Verify your domain (optional, can use their domain)
3. Get API key from dashboard
4. **Add to environment**:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM=noreply@transitionmarketingai.com
   ```

**Note**: Code needs to be updated to use Resend (currently using nodemailer)

---

## 3️⃣ WhatsApp Service Setup

### Option A: Twilio (Current)

**Already configured!** Just need credentials:

1. Sign up: https://www.twilio.com
2. Get Account SID and Auth Token
3. Add WhatsApp number:
   - Start with Twilio Sandbox: `whatsapp:+14155238886`
   - For production, apply for WhatsApp Business API
4. **Add to environment**:
   ```bash
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

**Cost**: ~₹2-3 per message
**Limits**: 1000 messages/month free on trial

---

### Option B: Gupshup (Recommended for India)

**Why Gupshup?**
- ✅ Cost: ₹0.5-1 per message
- ✅ Better for Indian market
- ✅ Higher delivery rates
- ✅ WhatsApp Business API ready

**Steps:**
1. Sign up: https://www.gupshup.io
2. Create account and verify
3. Get API Key from dashboard
4. **Add to environment**:
   ```bash
   GUPSHUP_API_KEY=your_api_key
   GUPSHUP_USERNAME=your_username
   GUPSHUP_SOURCE=919999999999  # Your WhatsApp number
   ```

**Note**: Code needs to be updated (currently using Twilio)

---

## 4️⃣ Calendar Setup (Calendly)

**Steps:**
1. Sign up: https://calendly.com
2. Create event type:
   - Name: "Free Lead Generation Consultation"
   - Duration: 30-45 minutes
   - Add intro/questions if needed
3. Get your Calendly link:
   - Example: `https://calendly.com/your-username/free-consultation`
4. **Add to environment**:
   ```bash
   CALENDLY_URL=https://calendly.com/your-username/free-consultation
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/free-consultation
   ```

**Free tier**: Unlimited bookings, 1 event type

---

## 5️⃣ Database Setup (Supabase)

### Create OTP Table:

Run this SQL in Supabase SQL Editor:

```sql
-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone text NOT NULL,
  otp text NOT NULL,
  verified boolean DEFAULT false,
  verified_at timestamp,
  expires_at timestamp NOT NULL,
  created_at timestamp DEFAULT NOW()
);

-- Create unique constraint for rate limiting
CREATE UNIQUE INDEX IF NOT EXISTS idx_otp_phone_created 
ON otp_verifications(phone, created_at);

-- Index for phone lookups
CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone);

-- Index for expiry cleanup
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);

-- Clean up expired OTPs (optional, for maintenance)
-- You can run this periodically or add a cron job
DELETE FROM otp_verifications 
WHERE expires_at < NOW() - INTERVAL '1 day';
```

---

## 📝 Complete Environment Variables

Add these to `.env.local` (local) and Vercel (production):

```bash
# SMS (Fast2SMS)
FAST2SMS_API_KEY=your_fast2sms_api_key

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@transitionmarketingai.com

# OR Email (Resend) - Alternative
# RESEND_API_KEY=re_xxxxxxxxxxxxx

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# OR WhatsApp (Gupshup) - Alternative
# GUPSHUP_API_KEY=your_api_key
# GUPSHUP_USERNAME=your_username
# GUPSHUP_SOURCE=919999999999

# Admin Contact
ADMIN_EMAIL=info@transitionmarketingai.com
ADMIN_WHATSAPP=919999999999  # Your WhatsApp (no + or spaces)

# Calendar
CALENDLY_URL=https://calendly.com/your-username/free-consultation
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/free-consultation

# App URL
NEXT_PUBLIC_APP_URL=https://transitionmarketingai.com

# Supabase (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🚀 Quick Setup Checklist

- [ ] Fast2SMS account created and API key obtained
- [ ] Email service configured (Gmail/Resend)
- [ ] WhatsApp service configured (Twilio/Gupshup)
- [ ] Calendly account created and link copied
- [ ] Admin WhatsApp number added to env
- [ ] OTP table created in Supabase
- [ ] All environment variables added to Vercel
- [ ] Test OTP sending (dev mode shows OTP in console)
- [ ] Test email notification
- [ ] Test WhatsApp notification

---

## 🧪 Testing

### Test OTP:
1. Fill consultation form
2. Enter phone number
3. Click "Send OTP"
4. In dev mode: Check console for OTP
5. In production: Check SMS
6. Verify OTP

### Test Email:
1. Submit consultation form
2. Check inbox for:
   - Admin email to info@transitionmarketingai.com
   - Customer confirmation email

### Test WhatsApp:
1. Submit consultation form
2. Check WhatsApp for:
   - Admin notification
   - Customer confirmation (if opted in)

### Test Rate Limiting:
1. Request OTP 3 times quickly
2. 4th request should be blocked with error message

---

## 📊 Cost Estimates (Monthly)

**For 100 consultations/month:**
- SMS (Fast2SMS): ₹30-50 (₹0.30-0.50 per OTP)
- Email (Resend free): ₹0 (up to 3,000/month)
- WhatsApp (Twilio): ₹200-300 (₹2-3 per message)
- WhatsApp (Gupshup): ₹50-100 (₹0.5-1 per message)
- Calendly: ₹0 (free tier)

**Recommendation**: Use Fast2SMS + Resend + Gupshup = ~₹50-150/month for 100 consultations

---

## ⚠️ Important Notes

1. **SMS OTP**: Production code will send via SMS. Dev mode still shows in console.
2. **Email Limits**: Gmail has 500/day limit. Use Resend for production.
3. **WhatsApp**: Twilio sandbox works for testing. Need Business API for production.
4. **Rate Limiting**: 3 OTP/hour per number is enforced.
5. **Calendly**: Free tier is sufficient for start.

---

## 🔄 Next Steps After Setup

1. Integrate Fast2SMS in OTP API
2. Switch email to Resend (optional but recommended)
3. Test all flows end-to-end
4. Monitor first few real submissions
5. Set up alerts for failures

**Ready to start setup?** 🚀

