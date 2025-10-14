# India Lead Generation Platform - Complete Setup Guide

## 🚀 FROM ZERO TO LAUNCH IN 3 DAYS

This guide will help you deploy the complete lead generation platform and get your first customer.

---

## DAY 1: DATABASE & INFRASTRUCTURE SETUP

### Step 1: Supabase Database Setup (30 minutes)

**1.1 Create Supabase Project**
```
1. Go to https://supabase.com
2. Click "New Project"
3. Name: "India LeadGen Platform"
4. Database Password: (save this securely!)
5. Region: Select Mumbai or Singapore (closest to India)
6. Wait 2-3 minutes for setup
```

**1.2 Run Database Schema**
```
1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Copy ENTIRE contents of: database-schema-india-leadgen.sql
4. Click "Run"
5. Verify: Check Tables section - should see 15+ tables
```

**1.3 Run Admin Functions**
```
1. In SQL Editor, create new query
2. Copy contents of: admin-analytics-functions.sql
3. Click "Run"
4. Verify: Should see functions in Database → Functions
```

**1.4 Get API Keys**
```
1. Go to Project Settings → API
2. Copy these values:
   - Project URL
   - anon/public key
   - service_role key (keep secret!)
3. Save for later (Step 3)
```

---

### Step 2: External Services Setup (2 hours)

**2.1 Razorpay Setup (20 minutes)**

```
1. Go to https://razorpay.com
2. Sign up with business details
3. Complete KYC (may take 1-2 days for approval)
4. For now, use TEST mode:
   - Dashboard → Settings → API Keys
   - Switch to "Test Mode"
   - Generate Test Keys
   - Copy Key ID and Key Secret
5. Set up webhook:
   - Dashboard → Settings → Webhooks
   - Create new webhook
   - URL: https://yourplatform.in/api/webhooks/razorpay
   - Active Events: Select ALL
   - Copy Webhook Secret
```

**2.2 Facebook App Setup (30 minutes)**

```
1. Go to https://developers.facebook.com
2. Create New App:
   - Use case: Business
   - App type: Business
   - App name: "YourPlatform LeadGen"
3. Add Products:
   - Webhooks ✓
   - Marketing API ✓
4. App Settings → Basic:
   - Copy App ID
   - Copy App Secret
5. Get Access Token:
   - Go to https://developers.facebook.com/tools/explorer/
   - Select your app
   - Get User Access Token
   - Add Permissions:
     • pages_manage_ads
     • leads_retrieval
     • ads_management
     • pages_read_engagement
   - Generate Token
   - Click "Extend Access Token" (makes it 60 days)
   - Copy this token
6. Get Long-Lived Token:
   curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
   
   Copy the returned access_token (this lasts 60 days)
```

**2.3 Twilio/WhatsApp Setup (30 minutes)**

```
1. Go to https://www.twilio.com
2. Sign up
3. Get free trial credit ($15 for testing)
4. Dashboard:
   - Copy Account SID
   - Copy Auth Token
5. WhatsApp Sandbox (for testing):
   - Go to Messaging → Try it out → Send a WhatsApp message
   - Send "join [code]" to the sandbox number
   - Copy Sandbox Number
6. Set up webhook:
   - WhatsApp Sandbox Settings
   - When a message comes in: https://yourplatform.in/api/webhooks/whatsapp
7. For Production:
   - Apply for WhatsApp Business API
   - Submit business documents
   - Wait 1-2 weeks for approval
```

**2.4 OpenAI Setup (10 minutes)**

```
1. Go to https://platform.openai.com
2. Sign up / Login
3. Add payment method (credit card)
4. Go to API Keys
5. Create new secret key
6. Copy the key (starts with sk-proj-)
7. Set usage limits:
   - Go to Settings → Limits
   - Set monthly budget: $100 (₹8,400)
```

---

### Step 3: Environment Variables (15 minutes)

**3.1 Create .env.local file**

Create file in project root:

```bash
# Copy this entire block and save as .env.local

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (from Step 1.4)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Razorpay (from Step 2.1)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxx

# Facebook (from Step 2.2)
FACEBOOK_APP_ID=123456789
FACEBOOK_APP_SECRET=xxxxx
FACEBOOK_ACCESS_TOKEN=EAAxxxxx
FACEBOOK_VERIFY_TOKEN=any_random_string_123
FACEBOOK_AD_ACCOUNT_ID=act_123456789
FACEBOOK_PAGE_ID=123456789

# Twilio/WhatsApp (from Step 2.3)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# OpenAI (from Step 2.4)
OPENAI_API_KEY=sk-proj-xxxxx
```

**3.2 Install Dependencies**

```bash
cd /Users/abhishekjohn/Documents/Business/TransitionMarketingAI/Website/TransitionMarketingAI

# Install all packages
npm install

# Install specific new dependencies
npm install razorpay twilio openai @supabase/ssr recharts
```

---

## DAY 2: LOCAL TESTING

### Step 4: Run Development Server (5 minutes)

```bash
# Start the app
npm run dev

# Open browser
http://localhost:3000
```

---

### Step 5: Test Onboarding Flow (10 minutes)

**5.1 Create Test Customer**
```
1. Go to http://localhost:3000/onboarding
2. Fill out all 6 steps:
   - Business: "Test Real Estate"
   - Industry: Real Estate
   - Contact: Your details
   - WhatsApp: Your number
   - Cities: Mumbai, Pune
   - Target: Home buyers
   - Plan: Growth (₹14,999/month)
3. Click "Start Free Trial"
4. Should redirect to dashboard
```

**5.2 Verify in Database**
```
1. Go to Supabase → Table Editor
2. Check "customers" table → should see your test customer
3. Check "subscriptions" table → should see trial subscription
4. is_trial = true
5. trial_end = 7 days from now
```

---

### Step 6: Test Facebook Webhook (30 minutes)

**6.1 Set up ngrok for local testing**
```bash
# Install ngrok
npm install -g ngrok

# Start ngrok tunnel (in new terminal)
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
```

**6.2 Configure Facebook Webhook**
```
1. Go to Facebook Developer App → Webhooks
2. Click "Add Subscription" → Page
3. Callback URL: https://abc123.ngrok.io/api/webhooks/facebook/leads/YOUR_CUSTOMER_ID
4. Verify Token: (same as FACEBOOK_VERIFY_TOKEN in .env.local)
5. Subscribe to: leadgen
6. Click "Verify and Save"
```

**6.3 Create Test Lead Form**
```
1. Go to Facebook Business Manager
2. Create a test ad campaign:
   - Objective: Lead Generation
   - Create ad set with targeting
   - Create simple lead form
   - Add test questions
3. Note the Form ID
4. Submit a test lead through Facebook
```

**6.4 Verify Lead Reception**
```
1. Check your terminal (ngrok shows webhook requests)
2. Check Supabase → leads table → should see new lead
3. Check WhatsApp → should receive notification
4. Check dashboard → should show new lead
```

---

### Step 7: Test WhatsApp (15 minutes)

**7.1 Join Sandbox**
```
1. Send WhatsApp message to Twilio sandbox number
2. Text: "join [your-code]"
3. Receive confirmation
```

**7.2 Test Sending**
```
# In browser console or API testing tool:
fetch('http://localhost:3000/api/test/whatsapp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '+919876543210', // Your number
    message: 'Test notification from LeadGen Platform'
  })
});

# Check your WhatsApp → should receive message
```

---

### Step 8: Test Razorpay Payment (20 minutes)

**8.1 Create Test Payment UI**
```
1. Go to http://localhost:3000/test-payment
2. Enter test amount: ₹100
3. Click "Pay Now"
4. Use Razorpay test cards:
   - Card: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: 123
   - Name: Test User
5. Complete payment
6. Check Supabase → payment_transactions table
```

---

## DAY 3: DEPLOYMENT & FIRST CUSTOMER

### Step 9: Deploy to Production (1 hour)

**9.1 Deploy to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Project name: india-leadgen-platform
# - Framework: Next.js
# - Root directory: ./
# - Build command: next build
# - Output directory: .next

# Production deployment
vercel --prod
```

**9.2 Set Production Environment Variables**
```
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add ALL variables from .env.local
4. Change URLs to production:
   - NEXT_PUBLIC_APP_URL=https://yourplatform.vercel.app
5. Switch Razorpay to LIVE mode keys (once KYC approved)
6. Save and redeploy
```

**9.3 Set up Custom Domain (Optional)**
```
1. Vercel → Settings → Domains
2. Add: yourplatform.in
3. Update DNS records (follow Vercel instructions)
4. Wait for SSL certificate (5-10 minutes)
```

**9.4 Update Webhooks with Production URLs**
```
Facebook:
- Callback: https://yourplatform.in/api/webhooks/facebook/leads/{customerId}

Razorpay:
- Webhook: https://yourplatform.in/api/webhooks/razorpay

Twilio/WhatsApp:
- Incoming: https://yourplatform.in/api/webhooks/whatsapp
```

---

### Step 10: Get Your First Customer (2-4 hours)

**10.1 Create Marketing Page**
```
1. Create simple landing page at yourplatform.in
2. Headline: "Get 50+ Qualified Leads Every Month"
3. Subheadline: "No Setup Required - We Do Everything For You"
4. Pricing: ₹14,999/month
5. CTA: "Start 7-Day Free Trial"
6. Include testimonials (can be from beta testers)
```

**10.2 Get Beta Customer**
```
Option A: Personal Network
- Reach out to 10 real estate agents you know
- Offer: "Free trial + 50% off first month"
- Close 2-3 beta customers

Option B: Facebook Ads
- Create simple ad promoting your service
- Budget: ₹500/day
- Target: Real estate agents, insurance agents
- Ad copy: "Get 50+ leads/month for ₹14,999"
- Land them on signup page

Option C: Direct Outreach
- Message 50 real estate agents on LinkedIn
- "I help agents get 50+ qualified buyer leads/month"
- Offer free trial
```

**10.3 Onboard First Customer**
```
1. Customer signs up through your platform
2. They complete onboarding (6 steps)
3. Start 7-day trial
4. You receive notification
```

**10.4 Set Up Their Campaign (Manual - First Time)**
```
1. Log into YOUR Facebook Business Manager
2. Create new campaign:
   - Name: "Customer1_RealEstate_Mumbai"
   - Objective: Lead Generation
   - Daily Budget: ₹800
3. Set targeting based on their onboarding:
   - Location: Mumbai
   - Age: 25-45
   - Interests: Real Estate, Property
4. Create ad creative:
   - Image: Stock photo of apartment
   - Headline: "Find Your Dream 2BHK in Mumbai"
   - Description: "Connect with expert consultants"
5. Create Lead Form:
   - Questions: Name, Phone, Email, Budget, Timeline
6. Set webhook for this campaign to point to:
   https://yourplatform.in/api/webhooks/facebook/leads/CUSTOMER_ID
7. Launch campaign
8. Wait for Facebook approval (1-2 hours)
```

**10.5 Deliver First Lead**
```
1. Wait for leads to come in (usually within 24 hours)
2. Lead submits form on Facebook
3. Your webhook receives lead
4. AI qualifies lead
5. Customer gets WhatsApp notification
6. Customer sees lead in dashboard
7. Customer contacts lead
8. SUCCESS! 🎉
```

---

## WEEK 2: OPTIMIZATION

### Step 11: Monitor and Optimize (Daily)

**Morning Routine (30 minutes)**
```
1. Check admin dashboard
2. Review new leads from overnight
3. Check ad performance:
   - Cost per lead
   - Quality scores
   - Customer satisfaction
4. Adjust budgets:
   - Increase winners
   - Pause losers
```

**Customer Check-ins (1 hour)**
```
1. WhatsApp message to each customer
2. Ask: "How are the leads? Any questions?"
3. Address concerns
4. Upsell if doing well
```

---

### Step 12: Scale to 10 Customers (Week 2-4)

**Acquire Customers**
```
Target: 2-3 new customers per week

Methods:
1. Direct outreach (LinkedIn, WhatsApp groups)
2. Referrals from existing customers
3. Small Facebook ads promoting your service
4. Content marketing (post case studies)
```

**Streamline Operations**
```
1. Create campaign templates for each industry
2. Document setup process
3. Automate what you can
4. Hire part-time support if needed
```

---

## 🎯 CRITICAL SUCCESS FACTORS

### 1. Lead Quality is Everything

```
Good Quality = Happy Customers = Retention + Referrals

How to ensure quality:
✓ Target ads carefully (right audience)
✓ Use qualifying questions in form
✓ AI scoring catches bad leads
✓ Monitor and adjust daily
✓ Remove duplicate leads
✓ Verify phone numbers
```

### 2. Fast Customer Support

```
Response time matters!

✓ Answer WhatsApp within 1 hour
✓ Solve issues immediately
✓ Weekly check-in calls
✓ Proactive communication
```

### 3. Transparent Communication

```
Show customers exactly what they're getting:

✓ Real-time dashboard updates
✓ Weekly performance emails
✓ Honest about underdelivery
✓ Celebrate wins together
```

---

## 💰 FINANCIAL MANAGEMENT

### Manage Cash Flow

**Month 1:**
```
Customers: 10
Revenue: ₹1,50,000 (received upfront)
Ad spend: ₹1,20,000 (spent throughout month)
Profit: ₹30,000

✓ Keep ₹1,20,000 in bank for ad spend
✓ Don't spend all revenue immediately!
```

**Month 2:**
```
Customers: 20 (10 new + 10 renewed)
Revenue: ₹3,00,000
Ad spend: ₹2,40,000
Profit: ₹60,000

✓ Maintain 2x ad spend in bank balance
✓ Reinvest profit into growth
```

---

## 🛠️ TOOLS YOU'LL USE DAILY

### Facebook Business Manager
```
Purpose: Create and manage ad campaigns
Daily use: 1-2 hours
Cost: Free (you pay for ads)
```

### Twilio Console
```
Purpose: Monitor WhatsApp messages
Daily use: 30 minutes
Cost: Pay per message (~₹0.50)
```

### Razorpay Dashboard
```
Purpose: Check payments, refunds
Daily use: 15 minutes
Cost: 2% transaction fee
```

### Your Admin Dashboard
```
Purpose: Monitor all customers, leads, campaigns
Daily use: 2-3 hours
Cost: $0
```

---

## 📊 WHAT SUCCESS LOOKS LIKE

### Week 1:
- ✅ 3 beta customers signed up
- ✅ Campaigns running for all 3
- ✅ First leads delivered
- ✅ Customers happy with quality

### Month 1:
- ✅ 10 paying customers
- ✅ ₹1,50,000 MRR
- ✅ 400-500 leads delivered
- ✅ 70%+ quality score average
- ✅ 0 churned customers

### Month 3:
- ✅ 30 paying customers
- ✅ ₹4,50,000 MRR
- ✅ 1,500 leads delivered
- ✅ Cost per lead down to ₹250
- ✅ 90%+ retention rate

### Month 6:
- ✅ 75 paying customers
- ✅ ₹11,25,000 MRR
- ✅ Profitable operations
- ✅ Part-time team member hired
- ✅ Process documented

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue 1: Facebook Ad Rejected
**Solution**: Follow Facebook ad policies
- Don't use shocking images
- Don't make unrealistic claims
- Include disclaimers
- Follow local regulations

### Issue 2: Low Lead Quality
**Solution**: Tighten targeting
- Narrow age range
- Better interest targeting
- Add budget qualifier in form
- Improve ad copy

### Issue 3: High Cost Per Lead
**Solution**: Optimize campaigns
- Test different creatives
- Adjust targeting
- Change ad copy
- Improve landing page (form)

### Issue 4: Customer Not Responding to Leads
**Solution**: Train and remind
- Send tutorial on how to contact leads
- Remind to respond within 24 hours
- Track their response rate
- Penalize slow responders

---

## 📞 SUPPORT RESOURCES

### Documentation:
- Facebook Marketing API: https://developers.facebook.com/docs/marketing-api
- Razorpay API: https://razorpay.com/docs/api/
- Twilio WhatsApp: https://www.twilio.com/docs/whatsapp
- OpenAI API: https://platform.openai.com/docs
- Supabase: https://supabase.com/docs

### Community:
- Facebook Developer Community
- Razorpay Slack
- Twilio Discord
- IndieHackers (for SaaS advice)

---

## ✅ LAUNCH CHECKLIST

**Before accepting first paying customer:**

- [ ] Database schema deployed
- [ ] All environment variables set
- [ ] Facebook app approved
- [ ] WhatsApp sandbox working
- [ ] Razorpay test mode working
- [ ] Onboarding flow tested
- [ ] Dashboard loads correctly
- [ ] Webhook endpoints working
- [ ] Payment collection tested
- [ ] AI qualification working
- [ ] WhatsApp notifications working

**Production readiness:**

- [ ] Razorpay in LIVE mode
- [ ] WhatsApp Business API approved (or using sandbox)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Facebook webhooks using production URL
- [ ] Error monitoring set up (Sentry)
- [ ] Analytics tracking (Google Analytics)
- [ ] Support system ready (WhatsApp, email)

---

## 🎉 YOU'RE READY TO LAUNCH!

**The platform is COMPLETE and ready for customers!**

**Next Action**: Get your first customer and start delivering leads! 🚀


