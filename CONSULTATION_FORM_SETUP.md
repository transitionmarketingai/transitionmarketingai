# ✅ Consultation Form - Complete Setup Guide

## 🎯 What Was Implemented

### 1. ✅ Simplified Form (Name, Email, Phone Only)
- Streamlined to essential fields
- Phone number with OTP verification
- WhatsApp opt-in checkbox

### 2. ✅ Phone OTP Verification
- **Send OTP API**: `/api/auth/otp/send`
- **Verify OTP API**: `/api/auth/otp/verify`
- OTP valid for 10 minutes
- Required before form submission

### 3. ✅ Admin Notifications
- **Email to**: `info@transitionmarketingai.com`
- **WhatsApp** to admin number
- Real-time notifications when someone signs up

### 4. ✅ Customer Confirmation
- Email confirmation with calendar booking link
- WhatsApp confirmation (if opted in)

### 5. ✅ Calendar Integration
- Calendly link on thank you page
- Calendar link in confirmation emails
- Easy booking for customers

---

## 📋 Database Setup

Create the OTP table in Supabase:

```sql
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone text NOT NULL,
  otp text NOT NULL,
  verified boolean DEFAULT false,
  verified_at timestamp,
  expires_at timestamp NOT NULL,
  created_at timestamp DEFAULT NOW(),
  UNIQUE(phone, otp)
);

CREATE INDEX idx_otp_phone ON otp_verifications(phone);
CREATE INDEX idx_otp_expires ON otp_verifications(expires_at);
```

---

## 🔧 Environment Variables

Add to `.env.local` and Vercel:

```bash
# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@transitionmarketingai.com

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Admin Contact
ADMIN_WHATSAPP=919999999999  # Your WhatsApp number (without + or spaces)

# Calendar (Calendly)
CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username

# App URL
NEXT_PUBLIC_APP_URL=https://transitionmarketingai.com
```

---

## 📱 OTP Setup (Production)

### Option 1: Fast2SMS (Recommended for India)
- Cost: ₹0.30-0.50 per SMS
- Sign up at: https://www.fast2sms.com
- Get API key
- Update `src/app/api/auth/otp/send/route.ts`:

```typescript
// Add Fast2SMS integration
const fast2smsResponse = await fetch('https://www.fast2sms.com/dev/bulkV2', {
  method: 'POST',
  headers: {
    'authorization': process.env.FAST2SMS_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    route: 'otp',
    variables_values: otp,
    numbers: phone.replace(/\D/g, '')
  })
});
```

### Option 2: Twilio SMS (Current)
- Already integrated with WhatsApp
- Use same Twilio account
- Cost: ~₹2-3 per SMS

### Option 3: Gupshup (Best for India)
- Better delivery rates
- Lower cost: ₹0.50-1 per SMS
- Sign up at: https://www.gupshup.io

**Development Mode**: OTP is returned in response (check browser console)

---

## 📅 Calendar Setup (Calendly)

1. **Sign up**: https://calendly.com
2. **Create event type**: "Free Consultation Call" (30-45 mins)
3. **Get link**: Copy your Calendly URL
4. **Add to env**: `CALENDLY_URL` and `NEXT_PUBLIC_CALENDLY_URL`

**Alternative**: Use Cal.com, Google Calendar API, or custom booking system

---

## ✅ Testing Checklist

### Form Submission:
- [ ] Fill name, email, phone
- [ ] Send OTP → Receive OTP (dev: check console)
- [ ] Verify OTP
- [ ] Submit form
- [ ] See thank you page with calendar link

### Admin Notifications:
- [ ] Email received at info@transitionmarketingai.com
- [ ] WhatsApp received on admin number
- [ ] Entry visible in admin dashboard (`/admin/consultations`)

### Customer Notifications:
- [ ] Confirmation email received
- [ ] WhatsApp confirmation (if opted in)
- [ ] Calendar booking link works

### OTP Verification:
- [ ] OTP sent successfully
- [ ] Invalid OTP rejected
- [ ] Expired OTP rejected
- [ ] Can resend OTP

---

## 🚀 Production Deployment Steps

1. **Set up Fast2SMS** (or preferred SMS service)
2. **Create OTP table** in Supabase
3. **Configure SMTP** email (Gmail/Resend)
4. **Set up Calendly** and add URL to env
5. **Add admin WhatsApp** number to env
6. **Test end-to-end** flow
7. **Deploy to production**

---

## 📊 What Happens When Someone Submits:

1. **Form Submission** → OTP required, phone verified
2. **Consultation Saved** → Database entry created
3. **Admin Email** → Sent to info@transitionmarketingai.com
4. **Admin WhatsApp** → Notification sent
5. **Customer Email** → Confirmation with calendar link
6. **Customer WhatsApp** → If opted in
7. **Admin Dashboard** → New entry in `/admin/consultations`

---

## 🔗 Important URLs

- **Form**: `https://transitionmarketingai.com/consultation`
- **Admin Dashboard**: `https://transitionmarketingai.com/admin/consultations`
- **Thank You Page**: Auto-redirect after submission
- **Calendly**: Set in environment variables

---

## ⚠️ Next Steps

1. **Test with real phone number** (production OTP)
2. **Verify email delivery** (check spam folder)
3. **Test WhatsApp notifications**
4. **Set up Calendly** with your availability
5. **Test admin dashboard** shows new consultations
6. **Monitor first few submissions** to ensure everything works

**Ready to test!** 🎉

