# Step 3: Email Service Setup (Gmail SMTP)

## Quick Gmail Setup (Recommended - Free)

### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com
2. Click "Security" in left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow prompts to enable it (if not already enabled)

### Step 2: Generate App Password
1. Go back to: https://myaccount.google.com/security
2. Under "2-Step Verification", click "App passwords"
3. If prompted, sign in again
4. Select app: "Mail"
5. Select device: "Other (Custom name)"
6. Enter name: "Transition Marketing AI"
7. Click "Generate"
8. Copy the 16-digit password (like: `abcd efgh ijkl mnop`)

**Important**: Remove spaces when copying - use: `abcdefghijklmnop`

### Step 3: Add to Vercel
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add these variables:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-16-digit-app-password
SMTP_FROM = noreply@transitionmarketingai.com
```

**Replace:**
- `your-email@gmail.com` → Your actual Gmail address
- `your-16-digit-app-password` → The password from Step 2

3. Select all environments (Production, Preview, Development)
4. Click "Save"
5. Redeploy

## What Email Will Be Used

**For sending:**
- Admin notifications → `SMTP_FROM` (noreply@transitionmarketingai.com)
- Customer confirmations → `SMTP_FROM`

**For receiving:**
- Admin notifications → `ADMIN_EMAIL` (info@transitionmarketingai.com)

## Alternative: Use Resend (Recommended for Production)

If Gmail limits (500/day) are a concern, use Resend:
1. Sign up: https://resend.com
2. Get API key from dashboard
3. Add to Vercel: `RESEND_API_KEY=re_xxxxx`
4. (Code needs minor update - can do this later)

**Gmail is fine for testing!** Can switch to Resend later.

---

**Once done, we can test the complete form!** 🚀

## Testing Checklist After Setup:
- [ ] Submit consultation form
- [ ] Receive OTP via SMS
- [ ] Verify OTP
- [ ] Check inbox at info@transitionmarketingai.com
- [ ] Check customer email received
- [ ] Test works! ✅

