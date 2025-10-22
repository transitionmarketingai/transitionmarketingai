# 🚀 TransitionAI - Quick Setup Guide

## Step 1: Environment Setup

Create a `.env.local` file in the root directory with these variables:

```bash
# Required for basic functionality
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Required for AI features
OPENAI_API_KEY=sk-your_openai_api_key_here

# Required for authentication
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Optional for enhanced features
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
```

## Step 2: Database Setup

Run the database migrations:

```bash
# Run the main schema
psql -h your-supabase-host -U postgres -d postgres -f COMPLETE_DATABASE_SCHEMA.sql

# Run additional tables
psql -h your-supabase-host -U postgres -d postgres -f additional-tables-migration.sql

# Run AI features tables
psql -h your-supabase-host -U postgres -d postgres -f advanced-ai-tables-migration.sql
```

## Step 3: Start Development Server

```bash
npm run dev
```

## Step 4: Test the Features

1. **Basic Dashboard**: http://localhost:3000/dashboard
2. **AI Lead Scoring**: Click "AI" button on any lead
3. **Sentiment Analysis**: Test with sample messages
4. **A/B Testing**: Generate test variants
5. **Budget Optimization**: View AI recommendations

## Step 5: Production Deployment

The site is already configured for Vercel deployment. Just push to GitHub and Vercel will auto-deploy.

## Troubleshooting

### Common Issues:

1. **Database Connection**: Ensure Supabase credentials are correct
2. **AI Features**: OpenAI API key required for AI functionality
3. **Authentication**: NextAuth secret must be set
4. **Dependencies**: Run `npm install` if packages are missing

### Getting API Keys:

1. **Supabase**: https://supabase.com (Free tier available)
2. **OpenAI**: https://platform.openai.com (Pay-per-use)
3. **SendGrid**: https://sendgrid.com (Free tier available)
4. **Razorpay**: https://razorpay.com (Test mode available)

## Features Available:

✅ **Complete Dashboard** - Lead management, campaigns, analytics
✅ **AI Lead Scoring** - Intelligent lead quality assessment
✅ **AI Follow-up Generation** - Personalized sequence creation
✅ **Sentiment Analysis** - Real-time message analysis
✅ **A/B Testing** - Automated message optimization
✅ **Budget Optimization** - AI-powered budget allocation
✅ **Competitor Intelligence** - Market analysis and insights
✅ **Predictive Analytics** - Conversion probability forecasting

## Support:

If you encounter any issues, check the console logs and ensure all environment variables are properly set.
