# ⚡ QUICK FIX - Run This SQL Script

## ❗ You Got an Error

That's because your `audit_submissions` table already exists but is missing some columns.

## ✅ SOLUTION (2 minutes)

### Run This Script Instead:

**File**: `migration-fix-tables.sql`

### Steps:

1. **Go to Supabase SQL Editor**:
   https://supabase.com/dashboard/project/veeylzzmymqqfecnlnqr/sql/new

2. **Open file**: `migration-fix-tables.sql`

3. **Copy ALL the content**

4. **Paste in SQL Editor**

5. **Click "Run"**

6. **See "Success"** ✅

### What This Does:

- ✅ Creates `profiles` table (for authentication)
- ✅ Creates `deals` table (for CRM pipeline)
- ✅ Creates `email_campaigns` table
- ✅ Creates `credit_transactions` table
- ✅ Creates `team_members` table
- ✅ Adds credit functions (deduct/add credits)
- ✅ Adds auto-profile creation trigger
- ✅ Sets up all permissions
- ✅ Skips tables that already exist (no errors!)

---

## 🧪 Then Test:

1. **Visit**: http://localhost:3000/signup
2. **Use EMAIL signup** (ignore Google/LinkedIn buttons for now)
3. **Fill form**:
   - Name: Your Name
   - Email: test@example.com
   - Password: test1234
4. **Click "Create Account"**
5. **Should redirect to dashboard!** ✅

---

## 🎉 That's It!

Once this script runs, everything will work:
- ✅ Email sign up/sign in
- ✅ User profiles
- ✅ Credit tracking
- ✅ AI lead generation
- ✅ Dashboard access

Social login (Google/LinkedIn) can be enabled later using `SOCIAL-AUTH-SETUP.md`!

---

**Run `migration-fix-tables.sql` and tell me when done!** 🚀

