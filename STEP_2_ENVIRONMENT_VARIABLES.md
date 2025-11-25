# 📋 STEP 2: Environment Variables Setup

## What We're Doing
Adding all required environment variables to Vercel so the application can connect to Supabase, OpenAI, Airtable, and other services.

## Time Required
~10 minutes

## Instructions

### 1. Open Vercel Project Settings
1. Go to https://vercel.com/dashboard
2. Select your **Transition Marketing AI** project
3. Click on **"Settings"** in the top navigation
4. Click on **"Environment Variables"** in the left sidebar

### 2. Add Required Variables

Add each variable one by one. Click **"Add New"** for each:

#### A. Supabase Variables (REQUIRED)

**Variable 1:**
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://aqpvpxbhcyhxybvpchms.supabase.co`
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

**Variable 2:**
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon key (get from Supabase → Settings → API)
- **Environment**: Select all
- Click **"Save"**

**Variable 3:**
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Your Supabase service role key (get from Supabase → Settings → API)
- **Environment**: Select all
- Click **"Save"**

**How to get Supabase keys:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

---

#### B. Admin Authentication (REQUIRED)

**Variable 4:**
- **Name**: `NEXT_PUBLIC_ADMIN_KEY`
- **Value**: Generate a secure random key (see below)
- **Environment**: Select all
- Click **"Save"**

**How to generate admin key:**
Run this in your terminal:
```bash
openssl rand -base64 32
```

Or use an online generator: https://randomkeygen.com/
Copy the generated key and paste it as the value.

**⚠️ Important**: Save this key somewhere safe! You'll need it to access the admin dashboard.

---

#### C. OpenAI (REQUIRED for AI Scoring)

**Variable 5:**
- **Name**: `OPENAI_API_KEY`
- **Value**: `sk-your_openai_api_key_here`
- **Environment**: Select all
- Click **"Save"**

**How to get OpenAI key:**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-`)
5. Paste as the value

**Note**: If you don't have OpenAI yet, you can skip this for now, but AI scoring won't work.

---

#### D. Airtable (REQUIRED for Booking Form)

**Variable 6:**
- **Name**: `AIRTABLE_API_KEY`
- **Value**: Your Airtable API key
- **Environment**: Select all
- Click **"Save"**

**Variable 7:**
- **Name**: `AIRTABLE_BASE_ID`
- **Value**: Your Airtable base ID
- **Environment**: Select all
- Click **"Save"**

**Variable 8:**
- **Name**: `AIRTABLE_STRATEGY_SESSIONS_BASE_ID`
- **Value**: Same as `AIRTABLE_BASE_ID` (or your specific base ID)
- **Environment**: Select all
- Click **"Save"**

**Variable 9:**
- **Name**: `AIRTABLE_BOOKINGS_TABLE_NAME`
- **Value**: `Bookings` (or your table name)
- **Environment**: Select all
- Click **"Save"**

**How to get Airtable keys:**
1. Go to https://airtable.com/api
2. Select your base
3. Copy the **API key** from the documentation
4. Copy the **Base ID** from the URL or documentation
5. Or go to Account Settings → Developer → Personal access tokens

---

#### E. Client Dashboard (REQUIRED)

**Variable 10:**
- **Name**: `NEXT_PUBLIC_DEMO_CLIENT_EMAIL`
- **Value**: `client@example.com` (or your actual client email)
- **Environment**: Select all
- Click **"Save"**

**Note**: This is used to filter inquiries in the client dashboard. Change to your actual client email when ready.

---

### 3. Optional but Recommended Variables

These are not critical but recommended for full functionality:

**Email (for notifications):**
- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = `your-email@gmail.com`
- `SMTP_PASSWORD` = `your-app-password`
- `SMTP_FROM` = `noreply@transitionmarketingai.com`

**Admin Contact:**
- `ADMIN_EMAIL` = `info@transitionmarketingai.com`

**App URL:**
- `NEXT_PUBLIC_APP_URL` = `https://transitionmarketingai.com`
- `NEXT_PUBLIC_BASE_URL` = `https://transitionmarketingai.com`

---

### 4. Redeploy After Adding Variables

**Important**: After adding all variables, you must redeploy:

1. Go to **"Deployments"** tab in Vercel
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger a new deployment

**Why?** Environment variables are only loaded during build time. A redeploy ensures all new variables are available.

---

## ✅ Verification Checklist

After adding all variables, verify:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] `NEXT_PUBLIC_ADMIN_KEY` is set (and you saved it!)
- [ ] `OPENAI_API_KEY` is set (if you have it)
- [ ] `AIRTABLE_API_KEY` is set
- [ ] `AIRTABLE_BASE_ID` is set
- [ ] `NEXT_PUBLIC_DEMO_CLIENT_EMAIL` is set
- [ ] Project has been redeployed after adding variables

---

## 🐛 Troubleshooting

**Variables not working after deployment:**
- ✅ Make sure you redeployed after adding variables
- ✅ Check that variables are set for the correct environment (Production/Preview/Development)
- ✅ Verify there are no typos in variable names (case-sensitive!)

**Can't find Supabase keys:**
- Go to Supabase Dashboard → Settings → API
- Keys are shown there

**Can't find Airtable keys:**
- Go to https://airtable.com/api
- Select your base to see the API documentation with keys

**Admin key not working:**
- Verify the key matches exactly (no extra spaces)
- Check you're using `NEXT_PUBLIC_ADMIN_KEY` (not `ADMIN_API_KEY`)
- Try regenerating the key if needed

---

## Next Step

Once all variables are added and the project is redeployed, let me know and we'll move to **Step 3: Testing & Verification**.

---

**Ready?** Add all the variables, redeploy, and let me know when it's done! 🚀

