# Step 2: Add Admin Contact Details

## What You Need

1. **Your WhatsApp Number** (10 digits, without + or spaces)
   - Example: If your number is +91 98765 43210
   - Use: `919876543210`

2. **Admin Email** (already know this: info@transitionmarketingai.com)

## Steps to Add to Vercel

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Click on your project (transitionmarketingai)

2. **Navigate to Settings**
   - Click "Settings" tab
   - Click "Environment Variables" in the left sidebar

3. **Add First Variable:**
   - Click "Add New"
   - **Key**: `ADMIN_EMAIL`
   - **Value**: `info@transitionmarketingai.com`
   - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

4. **Add Second Variable:**
   - Click "Add New" again
   - **Key**: `ADMIN_WHATSAPP`
   - **Value**: `91XXXXXXXXXX` (Replace X's with your actual 10-digit phone number)
   - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

5. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

## Example

If your WhatsApp number is **98765 43210**, add:
```
ADMIN_WHATSAPP = 919876543210
```

**Important**: 
- Include country code `91` at the start
- No spaces or + sign
- Just digits: `919876543210`

## What This Does

- When someone submits the consultation form, you'll get:
  - WhatsApp notification on your number
  - Email to info@transitionmarketingai.com

---

**Once done, move to Step 3: Email Service Setup** 📧

