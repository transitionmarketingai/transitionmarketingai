# 📋 STEP 2B: Admin Authentication Key

## What We're Doing
Creating a secure admin key that will protect your admin dashboard and API routes.

## Why This is Important
This key acts as a password to access the admin dashboard and manage inquiries. Keep it secret!

## Instructions

### Step 1: Generate a Secure Key

You have two options:

#### Option A: Using Terminal (Recommended)
1. Open your terminal
2. Run this command:
   ```bash
   openssl rand -base64 32
   ```
3. Copy the output (it will be a long random string)

#### Option B: Using Online Generator
1. Go to: https://randomkeygen.com/
2. Scroll to "CodeIgniter Encryption Keys"
3. Copy any of the keys shown

**Example output**: `Xk9pL2mN8qR5tW3vY7zA1bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2`

### Step 2: Add to Vercel

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Click **"Add New"**
3. Fill in:
   - **Name**: `NEXT_PUBLIC_ADMIN_KEY`
   - **Value**: Paste the key you generated
   - **Environment**: Select all three (Production, Preview, Development)
4. Click **"Save"**

### Step 3: Save This Key Securely

⚠️ **IMPORTANT**: Save this key somewhere safe! You'll need it to:
- Access the admin dashboard
- Make API calls to admin endpoints
- Test the system

**Suggested places to save:**
- Password manager (1Password, LastPass, etc.)
- Secure note app
- Encrypted file on your computer

**DO NOT:**
- Commit it to Git
- Share it publicly
- Put it in code comments

### Step 4: Verify

After adding the variable:
- [ ] Variable is saved in Vercel
- [ ] Key is saved securely on your side
- [ ] You can see it in the Environment Variables list

---

## ✅ Success Criteria

You'll know Step 2B is complete when:
- ✅ `NEXT_PUBLIC_ADMIN_KEY` appears in your Vercel environment variables
- ✅ You have the key saved securely
- ✅ The key is a long random string (at least 32 characters)

---

## Next Step

Once you've added the admin key, let me know and we'll move to **Step 2D: Airtable Setup**.

---

**Ready?** Generate the key, add it to Vercel, save it securely, and let me know when done! 🔐

