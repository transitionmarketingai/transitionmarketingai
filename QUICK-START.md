# ⚡ Quick Start - Phase 1

## 🎯 Goal
Set up your Supabase database in 15 minutes

## 📋 Checklist

### Step 1: Supabase (5 min)
- [ ] Go to https://supabase.com
- [ ] Create account / Sign in
- [ ] Click "New Project"
- [ ] Name: "Transition Marketing AI"
- [ ] Region: Singapore/Mumbai
- [ ] Set password (save it!)
- [ ] Wait for project to be ready

### Step 2: Run SQL Script (2 min)
- [ ] Supabase Dashboard → SQL Editor
- [ ] New Query
- [ ] Open `complete-database-setup.sql`
- [ ] Copy ALL → Paste → Run
- [ ] See "Success. No rows returned"

### Step 3: Get Credentials (2 min)
- [ ] Settings → API
- [ ] Copy Project URL
- [ ] Copy anon public key
- [ ] Copy service_role key

### Step 4: Create .env.local (3 min)
- [ ] Create `.env.local` in project root
- [ ] Copy from `env-template.txt`
- [ ] Paste your 3 Supabase values
- [ ] Save file

### Step 5: Restart Server (1 min)
```bash
# Terminal: Ctrl+C to stop
npm run dev
```

### Step 6: Test (2 min)
- [ ] Visit http://localhost:3000/dashboard
- [ ] Click "Generate Leads"
- [ ] Check Supabase → Table Editor → leads
- [ ] See new rows?  ✅ DONE!

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't find SQL Editor | Look for `</>` icon in left sidebar |
| Script error | Copy entire script, run again |
| .env not working | Restart server (Ctrl+C, npm run dev) |
| No leads in table | Check browser console for errors |

---

## ✅ When Complete

Tell me "Phase 1 complete" and I'll start building:
- 🔐 Authentication (Sign up/in)
- 👤 User profiles
- 💳 Payment integration
- 📧 Email campaigns
- And more!

---

## 📁 Files to Use

1. `complete-database-setup.sql` - Run this in Supabase
2. `env-template.txt` - Copy to `.env.local`
3. `SETUP-GUIDE.md` - Detailed instructions

---

Total time: **15 minutes** ⏱️

