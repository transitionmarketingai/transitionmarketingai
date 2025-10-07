# 🚀 PRODUCTION SETUP GUIDE
# Transition Marketing AI - Production Readiness Checklist

## 1. ENVIRONMENT VARIABLES SETUP

Create `.env.local` file with these variables:

```bash
# Database (Required)
DATABASE_URL="postgresql://username:password@localhost:5432/transition_marketing_ai"

# NextAuth.js (Required)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Razorpay (Indian Payment Gateway)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# SendGrid (Email Service)
SENDGRID_API_KEY="your_sendgrid_api_key"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"

# App Configuration
APP_NAME="Transition Marketing AI"
APP_URL="https://yourdomain.com"

# AI Services (for lead generation)
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

## 2. DATABASE SETUP

### Option A: PostgreSQL (Recommended)
1. Install PostgreSQL locally or use cloud service (Railway, Supabase, Neon)
2. Create database: `transition_marketing_ai`
3. Run migrations: `npm run db:migrate`

### Option B: Supabase (Easier)
1. Create Supabase project
2. Copy connection string to DATABASE_URL
3. Run migrations

## 3. PAYMENT INTEGRATION

### Razorpay Setup
1. Create Razorpay account
2. Get API keys from dashboard
3. Set up webhook endpoints
4. Test with test keys first

## 4. EMAIL SERVICE

### SendGrid Setup
1. Create SendGrid account
2. Verify sender email
3. Get API key
4. Test email sending

## 5. AI SERVICES

### OpenAI Setup
1. Create OpenAI account
2. Get API key
3. Add credits for lead generation

## 6. DEPLOYMENT

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Alternative: Railway/Render
1. Connect repository
2. Set environment variables
3. Deploy with PostgreSQL

## 7. DOMAIN SETUP

1. Buy domain (recommend .co.in for Indian market)
2. Point DNS to hosting provider
3. Set up SSL certificate

## 8. MONITORING

1. Set up Sentry for error tracking
2. Add Google Analytics
3. Set up uptime monitoring

## 9. TESTING CHECKLIST

- [ ] User registration works
- [ ] Login/logout works
- [ ] Dashboard loads with real data
- [ ] Payment processing works
- [ ] Email sending works
- [ ] Lead generation works
- [ ] All forms submit properly
- [ ] Mobile responsiveness
- [ ] Performance optimization

## 10. GO-LIVE CHECKLIST

- [ ] All environment variables set
- [ ] Database connected and migrated
- [ ] Payment gateway tested
- [ ] Email service tested
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Support system ready
- [ ] Legal pages (Privacy, Terms) updated
