# 🗄️ Supabase Database Integration Setup Guide

## Overview
This guide will help you set up Supabase database integration to replace localStorage with real data persistence for the Transition Marketing AI CRM.

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up/login and click "New Project"
3. Choose organization and set project details:
   - **Name**: `transition-marketing-ai`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"

## Step 2: Run Database Migrations

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref your-project-id
   ```

4. **Run migrations**:
   ```bash
   supabase db push
   ```

## Step 3: Environment Variables

Create/update `.env.local` with Supabase credentials:

```env
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-from-settings"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-from-settings"
```

**Where to find these values:**
1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Database Schema Verification

Your Supabase database will have these tables:

### Users Table
- `id` (UUID, Primary Key)
- `email` (Unique)
- `name`, `company`, `team_size`, `phone`
- `created_at`, `updated_at`

### Contacts Table
- `id` (UUID, Primary Key)
- `user_id` (Foreign Key to users)
- `name`, `company`, `email`, `phone`
- `status` (Lead, Qualified, Proposal, Won, Lost)
- `deal_value` (Integer)
- `last_contact` (Date)
- `created_at`, `updated_at`

### Deals Table
- `id` (UUID, Primary Key)
- `user_id`, `contact_id` (Foreign Keys)
- `contact_name`, `company`
- `deal_value` (Integer)
- `stage` (Lead, Qualified, Proposal, Won, Lost)
- `probability` (0-100)
- `expected_close` (Date)
- `created_at`, `updated_at`

## Step 5: Authentication Setup

### Enable Authentication Providers

1. Go to **Authentication** → **Providers**
2. Enable providers you need:
   - **Email** (enabled by default)
   - **Google OAuth** (update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`)
   - **GitHub** (optional)

### Configure OAuth (Google Example)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3000/api/auth/callback/google` (for development)

## Step 6: Row Level Security (RLS)

RLS is already configured with policies:

- **Users can only see their own data**
- **All CRUD operations are user-scoped**
- **Automatic authentication via NextAuth**

## Step 7: Testing Database Integration

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test Contact Management**:
   - Sign in to `/dashboard`
   - Navigate to Contacts section
   - Add a new contact
   - Verify data persists after refresh

3. **Verify Authentication**:
   - Sign up with email
   - Check `auth.users` table in Supabase
   - Verify user record created in `public.users`

## Step 8: Production Deployment

### Vercel Deployment

1. Update Vercel environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

2. Redeploy:
   ```bash
   vercel --prod
   ```

### Database Scaling

For production scaling:
- Enable **Connection pooling**
- Set up **Database backups**
- Configure **Production SSL certificates**
- Monitor **Usage metrics**

## Benefits of Supabase Integration

✅ **Real Data Persistence** - Data survives browser resets
✅ **Multi-User Support** - User isolation with RLS
✅ **Real-time Updates** - Live collaboration capabilities  
✅ **Advanced Querying** - SQL capabilities for complex reports
✅ **Automatic Backups** - Point-in-time recovery
✅ **Row Level Security** - Enterprise-grade security
✅ **SCALABILITY** - Handle thousands of users
✅ **Performance** - Optimized database queries

## Troubleshooting

### Common Issues

1. **Connection Errors**:
   - Verify environment variables
   - Check Supabase project status
   - Ensure RLS policies are correct

2. **Authentication Issues**:
   - Verify OAuth redirect URLs
   - Check Google Cloud Console settings
   - Test with email authentication first

3. **Data Not Persisting**:
   - Check browser console for errors
   - Verify user authentication
   - Test RLS policies in Supabase

### Development vs Production

- **Development**: Falls back to localStorage + sample data
- **Production**: Full Supabase integration with real persistence

## Migration Strategy

The application automatically:
1. Tries to use Supabase first
2. Falls back to localStorage/sample data if Supabase unavailable
3. Provides seamless transition for existing users

---

## 🚀 Next Steps

After Supabase setup:
1. **Test Multi-User Support** - Multiple user registrations
2. **Implement Real-time Features** - Live data updates
3. **Add Advanced Reporting** - SQL-based analytics
4. **Set up Monitoring** - Database performance tracking

**Ready to scale to enterprise level!** 🎯
