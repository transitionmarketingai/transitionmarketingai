# ✅ Quick Setup Checklist

## 🎯 Priority Order (Do These First)

### 1. **Supabase OTP Table** (5 minutes)
- [ ] Go to Supabase Dashboard
- [ ] Open SQL Editor
- [ ] Run the SQL from SERVICES_SETUP_GUIDE.md (section 5)
- [ ] Verify table created: `otp_verifications`

### 2. **Fast2SMS Setup** (10 minutes)
- [ ] Sign up: https://www.fast2sms.com
- [ ] Get API key from dashboard
- [ ] Add to Vercel: `FAST2SMS_API_KEY=your_key`
- [ ] Test: Form should send OTP via SMS

### 3. **Email Setup** (5 minutes)
- [ ] Gmail App Password OR Resend API key
- [ ] Add to Vercel (see SERVICES_SETUP_GUIDE.md)
- [ ] Test: Admin email should arrive

### 4. **Calendly** (10 minutes)
- [ ] Sign up: https://calendly.com
- [ ] Create consultation event
- [ ] Copy link
- [ ] Add to Vercel: `CALENDLY_URL` and `NEXT_PUBLIC_CALENDLY_URL`

### 5. **Admin WhatsApp** (2 minutes)
- [ ] Get your WhatsApp number (10 digits)
- [ ] Add to Vercel: `ADMIN_WHATSAPP=91XXXXXXXXXX`
- [ ] Configure Twilio (or skip if using Gupshup later)

### 6. **WhatsApp Service** (15 minutes - Optional)
- [ ] Option A: Twilio (already in code)
  - Sign up: https://www.twilio.com
  - Get credentials
  - Add to Vercel
- [ ] Option B: Gupshup (recommended, needs code update)
  - Sign up: https://www.gupshup.io
  - Get API key
  - (Code update needed)

---

## 🚀 After Setup - Test Checklist

- [ ] Submit consultation form with valid phone
- [ ] Receive OTP via SMS (check phone)
- [ ] Verify OTP successfully
- [ ] Submit form
- [ ] Receive admin email at info@transitionmarketingai.com
- [ ] Receive admin WhatsApp (if configured)
- [ ] Receive customer confirmation email
- [ ] Test rate limiting (3 OTP requests)
- [ ] Verify Calendly link works

---

## 📞 Support

If any service fails:
1. Check Vercel logs for errors
2. Verify environment variables are set
3. Check service dashboards for delivery status
4. Review SERVICES_SETUP_GUIDE.md for details

