# 🔧 Gmail App Password - Alternative Solutions

## Issue: Can't Find App Passwords

This happens if:
- 2-Step Verification is not fully enabled
- Using a Workspace/Organization account
- Account type doesn't support app passwords

## Solution 1: Direct Link to App Passwords

Try this direct link:
**https://myaccount.google.com/apppasswords**

If it says "App passwords aren't available", continue to Solution 2.

---

## Solution 2: Use "Less Secure App Access" (Not Recommended)

**⚠️ This is less secure and Google is phasing it out.**
Only use if app passwords aren't available.

1. Go to: https://myaccount.google.com/lesssecureapps
2. Turn ON "Allow less secure apps"
3. Use your regular Gmail password (not app password)

**Add to Vercel:**
```
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-regular-gmail-password
```

---

## Solution 3: Use Resend (Recommended Alternative)

**Better option if Gmail doesn't work!**

1. Sign up: https://resend.com (free tier: 3,000 emails/month)
2. Get API key from dashboard
3. Add to Vercel:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM=noreply@transitionmarketingai.com
   ```
4. I'll update the code to use Resend instead

**Benefits:**
- ✅ Easier setup (just API key)
- ✅ Better deliverability
- ✅ Higher limits (3,000/month free)
- ✅ No Gmail restrictions

---

## Solution 4: Check Account Type

**Personal Gmail:**
- Should support app passwords
- Try: https://myaccount.google.com/apppasswords directly

**Workspace Gmail:**
- Admin may have disabled app passwords
- Check with your Workspace admin
- Or use Resend (Solution 3)

---

## Quick Decision Guide

**Can't get Gmail App Password?**
→ Use **Resend** (Solution 3) - It's better anyway!

**Want to use Gmail?**
→ Make sure 2-Step Verification is ON first
→ Then try direct link: https://myaccount.google.com/apppasswords

---

**Which option would you like to use?**
1. Try Resend (recommended - 5 minutes)
2. Keep trying Gmail app passwords
3. Use less secure apps (not recommended)

