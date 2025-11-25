# 📋 STEP 2D: Airtable Setup

## What We're Doing
Setting up Airtable integration so the booking form (`/book`) can save submissions to your Airtable base.

## Why This is Needed
When someone fills out the booking form on your website, it saves the data to Airtable so you can manage strategy call bookings.

## Time Required
~5 minutes

## Instructions

### Step 1: Get Your Airtable API Key

**Option A: From Airtable API Docs (Easiest)**
1. Go to: https://airtable.com/api
2. Sign in to your Airtable account
3. Select the base you want to use (or create a new one)
4. On the API documentation page, you'll see your **API key** at the top
5. Copy it

**Option B: From Account Settings**
1. Go to: https://airtable.com/account
2. Click on **"Developer"** or **"Personal access tokens"**
3. Create a new token or copy an existing one
4. Copy the API key

---

### Step 2: Get Your Airtable Base ID

**From API Documentation:**
1. Go to: https://airtable.com/api
2. Select your base
3. Look at the URL or the API documentation
4. The Base ID is in the URL: `https://api.airtable.com/v0/{BASE_ID}/TableName`
5. Or find it in the API docs under "Base ID"

**Example Base ID format**: `appXXXXXXXXXXXXXX`

---

### Step 3: Get Your Table Name

1. In your Airtable base, look at the table name
2. Default is usually `Bookings` or `Strategy Sessions`
3. Note the exact name (case-sensitive)

**If you need to create the table:**
- Create a new table called `Bookings`
- Add these columns (at minimum):
  - `Name` (Single line text)
  - `Phone` (Phone number)
  - `Email` (Email)
  - `Industry` (Single select or text)
  - `Business Name` (Single line text)
  - `Main Goal` (Long text)
  - `Created At` (Date)

---

### Step 4: Add Variables to Vercel

Go to Vercel → Your Project → Settings → Environment Variables

**Add Variable 1:**
- **Name**: `AIRTABLE_API_KEY`
- **Value**: Your Airtable API key (from Step 1)
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

**Add Variable 2:**
- **Name**: `AIRTABLE_BASE_ID`
- **Value**: Your Airtable Base ID (from Step 2)
- **Environment**: Select all
- Click **"Save"**

**Add Variable 3:**
- **Name**: `AIRTABLE_STRATEGY_SESSIONS_BASE_ID`
- **Value**: Same as `AIRTABLE_BASE_ID` (or your specific base ID)
- **Environment**: Select all
- Click **"Save"**

**Add Variable 4:**
- **Name**: `AIRTABLE_BOOKINGS_TABLE_NAME`
- **Value**: `Bookings` (or your actual table name)
- **Environment**: Select all
- Click **"Save"**

---

### Step 5: Verify Your Airtable Base Setup

**Check your Airtable base has:**
- [ ] A table named `Bookings` (or whatever you set in `AIRTABLE_BOOKINGS_TABLE_NAME`)
- [ ] Required columns exist (Name, Phone, Email, etc.)
- [ ] Base is accessible with your API key

**Test the connection:**
After adding variables and redeploying, you can test by:
1. Going to `/book` on your website
2. Filling out the form
3. Submitting it
4. Checking your Airtable base for the new record

---

## ✅ Success Criteria

You'll know Step 2D is complete when:
- ✅ All 4 Airtable variables are added to Vercel
- ✅ You have your API key and Base ID ready
- ✅ Your Airtable base has a `Bookings` table (or your custom table name)
- ✅ Project has been redeployed

---

## 🐛 Troubleshooting

**Can't find API key:**
- Go to https://airtable.com/api and select your base
- The key is shown at the top of the API documentation

**Can't find Base ID:**
- Look in the API documentation URL
- Or check the base settings in Airtable

**Table not found error:**
- Verify the table name matches exactly (case-sensitive)
- Check the table exists in your base
- Ensure your API key has access to the base

**Form submission fails:**
- Check Vercel logs for errors
- Verify all 4 variables are set correctly
- Ensure API key has proper permissions

---

## Next Step

Once you've added all 4 Airtable variables and redeployed, let me know and we'll move to **Step 2E: Client Dashboard Email**.

---

**Ready?** Get your Airtable credentials, add the 4 variables, and let me know when done! 📊

