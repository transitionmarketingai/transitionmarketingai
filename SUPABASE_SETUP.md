# Supabase Setup Guide for Transition Marketing AI

## 🚀 Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a region close to your users (Asia Pacific for India)
4. Wait for the project to be created

### 2. Get Your Project URL and Keys
1. Go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://your-project-id.supabase.co`)
3. Copy your **service_role** key (starts with `eyJ...`)

### 3. Create the Database Table
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase-setup.sql` (created in your project)
3. Click **Run** to execute the SQL

### 4. Update Environment Variables
Create a `.env.local` file in your project root with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: OpenAI for future AI features
OPENAI_API_KEY=your-openai-api-key-here
```

### 5. Test the Integration
1. Restart your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Fill out the audit form and submit
4. Check your Supabase dashboard → **Table Editor** → **audit_submissions** to see the data

## 📊 Database Schema

The `audit_submissions` table includes:
- `id`: Auto-incrementing primary key
- `name`: User's full name
- `email`: User's email address
- `company`: Company name
- `website`: Company website (optional)
- `industry`: Selected industry
- `goal`: Marketing goals description
- `source`: Always "Website - Free Audit"
- `created_at`: Timestamp when submitted
- `updated_at`: Timestamp when last updated

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- **Service role** has full access for API operations
- **Indexes** on email, created_at, and industry for performance
- **Automatic timestamps** for tracking

## 🐛 Troubleshooting

### If submissions aren't appearing in database:
1. Check the browser console for errors
2. Check your terminal/server logs
3. Verify your Supabase URL and service role key
4. Ensure the table was created successfully

### If you get permission errors:
1. Make sure you're using the **service_role** key (not anon key)
2. Verify RLS policies are set up correctly
3. Check that the table exists in your database

## 📈 Next Steps

Once this is working:
1. Set up email notifications for new submissions
2. Create a dashboard to view submissions
3. Add AI-powered audit generation using OpenAI
4. Set up automated follow-up emails

## 🎯 Current Status

✅ **API Route**: Configured with Supabase integration
✅ **Form**: Working with proper validation
✅ **Database Schema**: Ready to create
✅ **Error Handling**: Graceful fallbacks if Supabase is unavailable

The form will work even if Supabase isn't configured yet - it will just log to the console instead of storing in the database.

