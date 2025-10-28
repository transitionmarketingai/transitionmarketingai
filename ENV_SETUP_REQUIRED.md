# 🔧 Environment Variables Setup Required

## ✅ Already Added
- `FAST2SMS_API_KEY` - Added to Vercel ✅

## 📝 Still Need to Add (Copy these to Vercel)

### Critical (Required for Testing)
```bash
# Admin Contact
ADMIN_EMAIL=info@transitionmarketingai.com
ADMIN_WHATSAPP=919999999999  # Replace with your actual WhatsApp number (10 digits)

# Email (Choose ONE option)

# Option 1: Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-digit-app-password
SMTP_FROM=noreply@transitionmarketingai.com

# Option 2: Resend (Recommended)
# RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Recommended (Optional but Important)
```bash
# Calendar
CALENDLY_URL=https://calendly.com/your-username/free-consultation
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/free-consultation

# WhatsApp Service (Optional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Already Set (Check if exists)
```bash
NEXT_PUBLIC_APP_URL=https://transitionmarketingai.com
```

## 🎯 Minimum for Testing

**You need at least:**
1. ✅ Fast2SMS_API_KEY (Done)
2. ⏳ ADMIN_EMAIL
3. ⏳ ADMIN_WHATSAPP (your number)
4. ⏳ SMTP credentials (Gmail OR Resend)

**Plus:**
5. ⏳ Run SQL in Supabase to create OTP table

## 📋 Quick Copy-Paste for Vercel

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add these one by one:

```
ADMIN_EMAIL = info@transitionmarketingai.com
ADMIN_WHATSAPP = 91XXXXXXXXXX (your number)
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-app-password
SMTP_FROM = noreply@transitionmarketingai.com
```

Then redeploy! 🚀

