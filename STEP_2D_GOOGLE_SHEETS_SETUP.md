# 📋 STEP 2D: Google Sheets Setup (Alternative to Airtable)

## What We're Doing
Setting up Google Sheets integration so the booking form (`/book`) can save submissions to a Google Sheet.

## Why Google Sheets?
- ✅ **Free** - No tier limits
- ✅ **Familiar** - Most people already use Google Sheets
- ✅ **Easy Setup** - Simple service account setup
- ✅ **Real-time** - See bookings appear instantly
- ✅ **Flexible** - Easy to customize columns

## Time Required
~10 minutes

## Instructions

### Step 1: Create a Google Sheet

1. Go to: https://sheets.google.com
2. Create a new spreadsheet
3. Name it: "Strategy Call Bookings" (or any name you prefer)
4. **Rename the first sheet** to: `Bookings` (or keep it as `Sheet1`)
5. **Add headers in Row 1:**
   ```
   Timestamp | Name | Phone | Email | Business Name | Industry | Main Goal | Revenue Range | UTM Source | UTM Medium | UTM Campaign | UTM Term | UTM Content | Referrer | Status
   ```

### Step 2: Create a Google Cloud Project & Service Account

1. Go to: https://console.cloud.google.com
2. Click **"Select a project"** → **"New Project"**
3. Name it: "Transition Marketing AI" (or any name)
4. Click **"Create"**

5. **Enable Google Sheets API:**
   - Go to: https://console.cloud.google.com/apis/library
   - Search for "Google Sheets API"
   - Click on it
   - Click **"Enable"**

6. **Create Service Account:**
   - Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
   - Click **"Create Service Account"**
   - Name: `booking-form-service`
   - Click **"Create and Continue"**
   - Skip role assignment (click **"Continue"**)
   - Click **"Done"**

7. **Create Key:**
   - Click on the service account you just created
   - Go to **"Keys"** tab
   - Click **"Add Key"** → **"Create new key"**
   - Select **"JSON"**
   - Click **"Create"**
   - A JSON file will download - **SAVE THIS FILE** (you'll need it)

### Step 3: Share Google Sheet with Service Account

1. Open the JSON file you downloaded
2. Find the `client_email` field (looks like: `booking-form-service@project-id.iam.gserviceaccount.com`)
3. Copy that email address
4. Go back to your Google Sheet
5. Click **"Share"** button (top right)
6. Paste the service account email
7. Give it **"Editor"** permission
8. **Uncheck** "Notify people" (service accounts don't need notifications)
9. Click **"Share"**

### Step 4: Get Your Sheet ID

1. Look at your Google Sheet URL:
   ```
   https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   ```
2. Copy the `SHEET_ID` (the long string between `/d/` and `/edit`)

**Example:**
- URL: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
- Sheet ID: `1a2b3c4d5e6f7g8h9i0j`

### Step 5: Extract Credentials from JSON

Open the JSON file you downloaded. You need:

1. **`client_email`** - The service account email
2. **`private_key`** - The private key (starts with `-----BEGIN PRIVATE KEY-----`)

**Important**: The private key is multi-line. You'll need to copy the entire key including the `-----BEGIN` and `-----END` lines.

### Step 6: Add Variables to Vercel

Go to Vercel → Your Project → Settings → Environment Variables

**Add Variable 1:**
- **Name**: `GOOGLE_SHEETS_ID`
- **Value**: Your Sheet ID (from Step 4)
- **Environment**: Select all (Production, Preview, Development)
- Click **"Save"**

**Add Variable 2:**
- **Name**: `GOOGLE_SHEETS_NAME`
- **Value**: `Bookings` (or your sheet name, default is `Sheet1`)
- **Environment**: Select all
- Click **"Save"**

**Add Variable 3:**
- **Name**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- **Value**: The `client_email` from your JSON file
- **Environment**: Select all
- Click **"Save"**

**Add Variable 4:**
- **Name**: `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- **Value**: The entire `private_key` from your JSON file (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- **Environment**: Select all
- Click **"Save"**

**⚠️ Important for Private Key:**
- Copy the ENTIRE key including the BEGIN and END lines
- It should look like:
  ```
  -----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n
  ```
- Vercel will handle the `\n` characters automatically

---

### Step 7: Verify Setup

After adding variables and redeploying:

1. Go to `/book` on your website
2. Fill out the form with test data
3. Submit it
4. Check your Google Sheet - you should see a new row appear!

---

## ✅ Success Criteria

You'll know Step 2D is complete when:
- ✅ Google Sheet created with headers
- ✅ Service account created and key downloaded
- ✅ Sheet shared with service account email
- ✅ All 4 variables added to Vercel
- ✅ Project redeployed
- ✅ Test submission appears in Google Sheet

---

## 🐛 Troubleshooting

**"Permission denied" error:**
- ✅ Make sure you shared the sheet with the service account email
- ✅ Service account should have "Editor" permission

**"Sheet not found" error:**
- ✅ Check `GOOGLE_SHEETS_ID` is correct
- ✅ Check `GOOGLE_SHEETS_NAME` matches your sheet name exactly

**"Invalid credentials" error:**
- ✅ Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` is correct
- ✅ Verify `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` includes BEGIN and END lines
- ✅ Make sure the private key is the complete key from JSON

**Data not appearing:**
- ✅ Check Vercel logs for errors
- ✅ Verify all 4 variables are set
- ✅ Make sure Google Sheets API is enabled in your project

---

## 📊 Sheet Structure

Your Google Sheet should have these columns (in order):
1. Timestamp
2. Name
3. Phone
4. Email
5. Business Name
6. Industry
7. Main Goal
8. Revenue Range
9. UTM Source
10. UTM Medium
11. UTM Campaign
12. UTM Term
13. UTM Content
14. Referrer
15. Status

---

## Next Step

Once you've set up Google Sheets and added all 4 variables, let me know and we'll move to **Step 2E: Client Dashboard Email** (the last one!).

---

**Ready?** Follow the steps above and let me know when done! 📊

