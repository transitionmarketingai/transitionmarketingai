# 📋 STEP 2B: Admin Credentials Setup

## What We're Doing
Setting up email and password authentication for the admin dashboard.

## Updated Admin Credentials

- **Email**: `info@transitionmarketingai.com`
- **Password**: `Transition@123#`

## Instructions

### Step 1: Add Environment Variables to Vercel

Go to Vercel → Your Project → Settings → Environment Variables

**Add Variable 1:**
- **Name**: `ADMIN_EMAIL`
- **Value**: `info@transitionmarketingai.com`
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

**Add Variable 2:**
- **Name**: `ADMIN_PASSWORD`
- **Value**: `Transition@123#`
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

### Step 2: Verify

After adding the variables:
- [ ] `ADMIN_EMAIL` is set to `info@transitionmarketingai.com`
- [ ] `ADMIN_PASSWORD` is set to `Transition@123#`
- [ ] Both variables are saved in Vercel

### Step 3: Redeploy

**Important**: After adding variables, redeploy your project:
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

---

## ✅ Success Criteria

You'll know Step 2B is complete when:
- ✅ Both environment variables are added to Vercel
- ✅ Project has been redeployed
- ✅ You can log in at `/admin/login` with:
  - Email: `info@transitionmarketingai.com`
  - Password: `Transition@123#`

---

## 🔐 Security Notes

- The password is stored as an environment variable (not in code)
- Email comparison is case-insensitive
- Session cookies are httpOnly and secure in production
- Password is never exposed to the client

---

## Next Step

Once you've added the credentials and redeployed, let me know and we'll move to **Step 2D: Airtable Setup**.

---

**Ready?** Add the two variables, redeploy, and let me know when done! 🔐

