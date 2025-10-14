# Complete Operations Workflow - How The Business Actually Works

## 🎯 THE COMPLETE PROCESS (Customer Pays → Leads Delivered)

---

## STEP 1: CUSTOMER SIGNS UP & PAYS

### What Happens:

**Customer Side:**
```
1. Customer completes onboarding
2. Chooses Growth plan (₹14,999/month)
3. Starts 7-day free trial (no payment yet)
4. After 7 days, if satisfied:
   → Enters payment details
   → Pays ₹14,999 via Razorpay (UPI/Card/NetBanking)
   → Subscription becomes active
```

**Your Side (Automated):**
```
1. Payment received webhook from Razorpay
2. Subscription status → "active"
3. Customer gets confirmation email/WhatsApp
4. Internal notification sent to YOUR operations team:
   
   "🎉 New Customer Alert!
   
   Customer: ABC Real Estate
   Plan: Growth (50 leads/month)
   Industry: Real Estate
   Target: Home buyers in Mumbai, 2BHK, ₹80L-₹1Cr
   
   ACTION REQUIRED:
   ✓ Set up Facebook campaign
   ✓ Set up Google campaign
   ✓ Launch within 24 hours"
```

---

## STEP 2: YOU SET UP AD CAMPAIGNS (YOUR FACEBOOK/GOOGLE ACCOUNTS)

### Important: YOU Run Ads in YOUR Ad Accounts

**Why YOUR accounts, not theirs?**
- ✅ You control everything
- ✅ Easier to manage at scale
- ✅ You get bulk discounts
- ✅ They don't need ad accounts
- ✅ You can optimize across customers

### The Setup Process:

#### A. Facebook Lead Ads Campaign

**1. Log into YOUR Facebook Business Manager**
```
Business Manager: YourPlatform Business Account
Ad Account: YourPlatform Ads

You manage ALL customer campaigns from here!
```

**2. Create Campaign for This Customer**

**Manual Process (Initially - 20 minutes per customer):**

```
Step 1: Create Campaign
→ Open Facebook Ads Manager
→ Click "Create" campaign
→ Objective: "Lead Generation"
→ Campaign name: "ABC_Real_Estate_Mumbai_2BHK"

Step 2: Create Ad Set (Targeting)
→ Ad Set name: "Mumbai_HomeBuyers_25-45"
→ Location: Mumbai, Thane, Navi Mumbai (use customer's service areas)
→ Age: 25-45 (from customer's target audience)
→ Gender: All
→ Detailed Targeting:
   • Interests: Real Estate, Property, Home Buyers
   • Behaviors: Likely to move, New home shoppers
   • Income: Top 25-50% (for ₹80L+ budget)
→ Daily Budget: ₹800 ($10/day)
→ Schedule: Continuous

Step 3: Create Ad (Creative)
→ Ad name: "2BHK_Mumbai_Oct2024"
→ Format: Single Image or Carousel
→ Primary Text: 
   "Find Your Dream 2BHK in Mumbai
   
   Ready to move properties in Andheri, Goregaon, Malad
   Budget: ₹80L - ₹1Cr
   
   Get expert guidance from top real estate consultants.
   Fill the form to get personalized property recommendations."

→ Headline: "2BHK Apartments in Mumbai"
→ Description: "Premium locations, best prices"
→ Call to Action: "Get Quote"

→ Upload Image/Video:
   • Use stock photos of apartments
   • Or AI-generate with text overlay
   • Size: 1200x628px

Step 4: Create Lead Form (Critical!)
→ Form type: "More volume" (easier to fill)
→ Form name: "ABC_Real_Estate_Lead_Form"
→ Intro:
   Title: "Find Your Dream Home"
   Description: "Fill this quick form and we'll help you find the perfect 2BHK"
   
→ Questions:
   [Pre-filled by Facebook]
   ✓ Full Name
   ✓ Email
   ✓ Phone Number
   
   [Custom Questions - YOU add these]
   Q1: "What's your budget?"
       Options: ₹60-80L, ₹80L-1Cr, ₹1-1.5Cr, ₹1.5Cr+
   
   Q2: "When are you looking to buy?"
       Options: Immediately, Within 3 months, 3-6 months, Just exploring
   
   Q3: "Preferred areas in Mumbai?"
       Short Answer (they type)
   
   Q4: "Are you a first-time buyer?"
       Options: Yes, No

→ Privacy Policy: Link to YOUR platform's privacy policy
   (e.g., yourplatform.in/privacy)

→ Thank You Screen:
   "Thank you! ABC Real Estate will contact you within 24 hours."

Step 5: Review & Publish
→ Review all settings
→ Facebook reviews ad (takes 1-2 hours)
→ Once approved, campaign goes LIVE!
→ You start spending ₹800/day from YOUR money
```

**Automated Process (After 3-6 months with Facebook API):**

```typescript
// Use Facebook Marketing API to create campaign automatically

const campaign = await facebookAPI.createCampaign({
  customer_id: "customer_123",
  objective: "LEAD_GENERATION",
  name: `${customer.business_name}_${customer.industry}_${Date.now()}`,
  
  targeting: {
    geo_locations: {
      cities: customer.service_cities, // ["Mumbai", "Thane"]
    },
    age_min: customer.target_audience.age_range.min || 25,
    age_max: customer.target_audience.age_range.max || 55,
    genders: customer.target_audience.gender === 'all' ? [1, 2] : [1], // 1=male, 2=female
    interests: deriveInterests(customer.industry, customer.target_audience.description),
    behaviors: deriveBehaviors(customer.industry),
  },
  
  budget: {
    daily_budget: 80000, // ₹800 in paise
    currency: 'INR'
  },
  
  creative: {
    name: `${customer.business_name}_Creative_1`,
    image_url: await generateAIImage(customer.industry, customer.service_description),
    body: await generateAdCopy(customer),
    link_description: customer.service_description,
    call_to_action_type: 'LEARN_MORE'
  },
  
  lead_form: {
    name: `${customer.business_name}_Form`,
    questions: generateFormQuestions(customer.industry, customer.target_audience),
    privacy_policy_url: 'https://yourplatform.in/privacy',
    follow_up_action_url: `https://yourplatform.in/thank-you?customer=${customer.id}`
  }
});

// Campaign is now live!
// Save campaign ID to database
await saveCampaign({
  customer_id: customer.id,
  platform: 'facebook',
  external_campaign_id: campaign.id,
  external_form_id: campaign.lead_form.id,
  daily_budget: 80000,
  status: 'active'
});

// Set up webhook to receive leads
await facebookAPI.subscribeToLeadgen({
  page_id: YOUR_FACEBOOK_PAGE_ID,
  app_id: YOUR_FACEBOOK_APP_ID,
  callback_url: `https://yourplatform.in/api/webhooks/facebook/leads/${customer.id}`,
  verify_token: YOUR_VERIFY_TOKEN
});
```

---

#### B. Google Lead Form Extensions (Similar Process)

**Manual Process:**

```
Step 1: Log into YOUR Google Ads Account
→ Account: YourPlatform Google Ads

Step 2: Create Search Campaign
→ Campaign name: "ABC_Real_Estate_Search"
→ Type: Search
→ Goal: Leads

Step 3: Add Keywords
→ Keywords (for real estate example):
   • "2bhk flat in mumbai"
   • "2bhk property mumbai"
   • "buy 2bhk mumbai"
   • "2bhk for sale andheri"
   • "mumbai 2bhk price"
   (Use keyword research tool)

Step 4: Create Ads
→ Headlines:
   H1: "2BHK Flats in Mumbai"
   H2: "₹80L-₹1Cr Budget Range"
   H3: "Expert Real Estate Guidance"

→ Descriptions:
   D1: "Find your dream 2BHK in Mumbai. Top locations, best prices."
   D2: "Talk to expert consultants. Get personalized recommendations."

Step 5: Add Lead Form Extension
→ Extension type: "Lead form"
→ Form headline: "Get Property Details"
→ Description: "Fill this form for personalized recommendations"
→ Questions: (same as Facebook)
→ Background image: Upload property image

Step 6: Set Budget & Bid
→ Daily budget: ₹1,000
→ Bidding: Maximize conversions
→ Target CPA: ₹400 (cost per lead)

Step 7: Launch
→ Google reviews (instant usually)
→ Campaign goes live
→ You spend ₹1,000/day
```

---

## STEP 3: LEADS START COMING IN (AUTOMATED)

### How Leads Flow to You:

**Real-Time Process:**

```
12:34 PM - Potential lead sees Facebook ad
         ↓
12:35 PM - Clicks on ad, lead form opens in Facebook app
         ↓
12:36 PM - Fills form (name, phone, email, budget, timeline)
         ↓
12:36 PM - Clicks "Submit"
         ↓
12:36 PM - Facebook sends webhook to YOUR platform
         
POST https://yourplatform.in/api/webhooks/facebook/leads/customer_123
{
  "entry": [{
    "changes": [{
      "field": "leadgen",
      "value": {
        "leadgen_id": "fb_lead_98765",
        "form_id": "form_12345",
        "page_id": "page_67890",
        "created_time": "2024-10-13T12:36:00+0000"
      }
    }]
  }]
}
         ↓
12:36 PM - YOUR webhook handler receives this
         ↓
12:36 PM - You fetch full lead data from Facebook API:
         
const leadData = await facebook.getLeadData("fb_lead_98765");
// Returns:
{
  "field_data": [
    {"name": "full_name", "values": ["Rajesh Kumar"]},
    {"name": "phone_number", "values": ["+919876543210"]},
    {"name": "email", "values": ["rajesh@gmail.com"]},
    {"name": "budget", "values": ["₹80L-1Cr"]},
    {"name": "timeline", "values": ["Within 3 months"]},
    {"name": "preferred_areas", "values": ["Andheri, Goregaon"]}
  ]
}
         ↓
12:37 PM - YOUR AI analyzes and scores the lead:
         
AI Analysis:
✓ Budget matches (₹80L-1Cr) - Score +30
✓ Timeline good (3 months) - Score +25  
✓ Location matches (Andheri) - Score +20
✓ Phone format valid - Score +10
✓ Email valid - Score +10
Total Quality Score: 85/100
Status: "qualified" (hot lead!)
         ↓
12:37 PM - Lead saved to database:
         
INSERT INTO leads (
  customer_id: "customer_123",
  name: "Rajesh Kumar",
  phone: "+919876543210",
  email: "rajesh@gmail.com",
  source: "facebook_lead_ad",
  quality_score: 85,
  qualification_status: "hot",
  form_responses: {budget: "₹80L-1Cr", timeline: "3 months"},
  is_charged: true,
  charged_amount: 30000 (₹300 if within quota)
)
         ↓
12:37 PM - Customer gets instant WhatsApp notification:
         
WhatsApp to +91-XXXXXXXXXX (customer's number):

"🎯 New Hot Lead! (Score: 85/100)

Name: Rajesh Kumar
Phone: +91-9876543210
Budget: ₹80L-1Cr
Timeline: Next 3 months
Areas: Andheri, Goregaon

✓ High buying intent
✓ Budget matches perfectly
✓ Ready to buy soon

View & Contact: 
yourplatform.in/leads/lead_98765

⏰ Contact within 1 hour for best results!"
         ↓
12:37 PM - Email notification sent
12:37 PM - In-app notification created
12:37 PM - Lead appears in customer's dashboard
         ↓
12:40 PM - Customer logs in, sees new lead!
```

**This whole process takes 3-5 minutes!** ⚡

---

## STEP 4: CUSTOMER CONTACTS LEAD (THROUGH YOUR PLATFORM)

**Customer Dashboard View:**

```
┌────────────────────────────────────────┐
│  New Lead: Rajesh Kumar (3 mins ago)   │
├────────────────────────────────────────┤
│  Quality Score: 85/100 🔥 HOT          │
│                                        │
│  📞 +91-9876543210                    │
│  📧 rajesh@gmail.com                  │
│  💰 Budget: ₹80L-1Cr                  │
│  ⏰ Timeline: 3 months                │
│  📍 Interested in: Andheri, Goregaon  │
│                                        │
│  Why Qualified:                        │
│  ✓ Budget matches your listings       │
│  ✓ Immediate timeline                 │
│  ✓ Located in your service area       │
│                                        │
│  [💬 Send WhatsApp]  [📧 Send Email]  │
│  [📞 Call Now]                        │
└────────────────────────────────────────┘
```

**Customer clicks "Send WhatsApp":**

```
Messaging Interface Opens:

┌────────────────────────────────────────┐
│  Conversation with Rajesh Kumar        │
├────────────────────────────────────────┤
│                                        │
│  [AI Suggested Message]                │
│                                        │
│  "Hi Rajesh,                          │
│                                        │
│  I'm [Name] from ABC Real Estate.     │
│  I saw you're looking for a 2BHK      │
│  in Andheri/Goregaon area.            │
│                                        │
│  We have some excellent properties    │
│  in your budget range (₹80L-₹1Cr).   │
│                                        │
│  Would you be available for a quick   │
│  call today to discuss your           │
│  requirements?                         │
│                                        │
│  Best regards,                         │
│  [Your Name]                          │
│  ABC Real Estate"                     │
│                                        │
│  [Edit] [Send via WhatsApp]           │
└────────────────────────────────────────┘
```

**Customer clicks "Send via WhatsApp":**

```
YOUR system sends WhatsApp message via Twilio API:

1. Message goes from YOUR WhatsApp Business number
   From: +91-XXXXXXXXX (Your platform's number)
   Display Name: "ABC Real Estate via LeadGen Pro"

2. Rajesh receives WhatsApp message

3. Rajesh replies:
   "Hi! Yes, I'm interested. Can we see properties tomorrow?"

4. Reply comes back to YOUR platform via webhook

5. Shows up in customer's dashboard messaging inbox

6. Customer sees reply and continues conversation

7. All messages tracked and stored by YOU
```

---

## STEP 5: YOUR DAILY OPERATIONS

### What YOU Do Every Day:

**Morning (9 AM - 12 PM):**

```
9:00 AM - Check dashboard for overnight activity
└── New customers: 2
└── Total active campaigns: 45
└── Leads generated overnight: 87
└── Issues/disputes: 1

9:15 AM - Review new customer onboarding
Customer: XYZ Insurance
Action: Create Facebook + Google campaigns
Time: 20-30 minutes per customer

10:00 AM - Monitor ad performance
└── Check Facebook Ads Manager
    • Total spend today: ₹36,500
    • Leads generated: 42
    • Average CPL: ₹869
    • Underperforming ads: 3
    
Action needed:
✓ Pause 2 ads with CPL >₹1,500
✓ Increase budget on 3 winning ads
✓ Test new creative for 1 campaign

11:00 AM - Handle customer support
└── WhatsApp messages: 12
└── Email tickets: 5
└── Lead disputes: 1

Dispute review:
Customer: "Lead phone doesn't work"
Action: Verify → Issue credit → Mark lead as invalid
```

**Afternoon (2 PM - 5 PM):**

```
2:00 PM - Create campaigns for new customers
Customer 1: ABC Legal Services
  • Set up Facebook campaign (15 mins)
  • Set up Google campaign (15 mins)
  • Test and launch (5 mins)
  Total: 35 minutes

Customer 2: XYZ Coaching Institute
  • Same process
  Total: 35 minutes

3:00 PM - Optimize existing campaigns
  • A/B test new ad creatives
  • Adjust targeting based on performance
  • Increase budgets for winners
  • Pause/modify underperformers

4:00 PM - Weekly customer check-in calls
  • Call 5 customers
  • Ask about lead quality
  • Offer optimization suggestions
  • Upsell opportunities
```

**Evening (6 PM - 7 PM):**

```
6:00 PM - Generate reports
  • Daily performance reports
  • Customer-specific updates
  • Team performance metrics

6:30 PM - Plan tomorrow
  • Review campaigns launching tomorrow
  • Check budget allocation
  • Prepare creative for new campaigns
```

---

## STEP 6: BILLING & QUOTA TRACKING (AUTOMATED)

### How Billing Works:

**Monthly Cycle:**

```
Customer: ABC Real Estate
Plan: Growth (₹14,999/month, 50 leads quota)

Day 1 (Oct 1): Subscription renews
  • Razorpay charges ₹14,999
  • Quota resets to 0/50
  • Rollover from last month: +5 leads
  • Total available: 55 leads

Day 5: 12 leads delivered
  • Used: 12/55
  • Remaining: 43
  • All within quota (no extra charge)

Day 15: 30 leads delivered (total)
  • Used: 30/55
  • Remaining: 25
  • Still within quota

Day 25: 50 leads delivered (total)
  • Used: 50/55
  • Remaining: 5
  • Still within quota

Day 27: 52 leads delivered (total)
  • Used: 52/55
  • Remaining: 3
  • Still within quota (rollover buffer)

Day 30: 58 leads delivered (total)
  • Used: 58/55
  • Exceeded by: 3 leads
  • Overage charge: 3 × ₹400 = ₹1,200
  
  Invoice generated:
  - Base subscription: ₹14,999 (already paid)
  - Overage: 3 leads × ₹400 = ₹1,200
  - Total additional: ₹1,200
  
  Razorpay automatically charges ₹1,200
  
Next month (Nov 1):
  • Quota resets to 0/50
  • No rollover (used all + more)
```

---

## STEP 7: YOUR AD SPEND MANAGEMENT

### How You Manage Money:

**Your Ad Account Balance:**

```
You have: 100 customers
Average daily budget per customer: ₹900
Total daily ad spend: ₹90,000/day
Monthly ad spend: ₹27,00,000 (₹27 Lakhs)

Your Revenue:
100 customers × ₹15,000 avg = ₹15,00,000/month

Your Costs:
Ad spend: ₹27,00,000 
(Wait, this doesn't work!)

Actually:
You DON'T spend ₹900/day per customer!

You spend based on LEAD DELIVERY:
Target: 50 leads/month per customer
Cost per lead: ₹280
Monthly spend per customer: 50 × ₹280 = ₹14,000

For 100 customers:
Ad spend: ₹14,00,000/month (₹14 Lakhs)
Revenue: ₹15,00,000/month
Gross profit: ₹1,00,000/month
```

**How to Control Ad Spend:**

```
Facebook Campaign Settings:

Daily Budget: ₹800
Monthly Budget Cap: ₹15,000 (to not overspend)

Once you've delivered 50 leads (quota met):
→ Pause campaign automatically
→ Or reduce budget to ₹100/day (slow mode)
→ Or keep running if customer buying overages

Smart automation:
IF leads_delivered >= quota AND customer_not_buying_overages:
  THEN pause_campaign()
```

---

## 🤖 AUTOMATION LEVELS

### Level 1: Fully Manual (Month 1-3)
**You do everything manually:**
- Create campaigns in Facebook/Google interface
- Monitor daily
- Adjust budgets manually
- Handle leads manually

**Time**: 2-3 hours/day for 10 customers

---

### Level 2: Semi-Automated (Month 4-6)
**Some automation:**
- Use Facebook/Google APIs to create campaigns
- Automated lead reception via webhooks
- Automated notifications
- Manual optimization still

**Time**: 3-4 hours/day for 50 customers

---

### Level 3: Mostly Automated (Month 7-12)
**Heavy automation:**
- Campaigns created via API automatically
- AI optimizes targeting and budgets
- Auto-pause when quota met
- Automated dispute handling
- Only handle exceptions

**Time**: 4-5 hours/day for 200 customers

---

### Level 4: Fully Automated (Year 2+)
**AI does everything:**
- Campaign creation
- Budget optimization  
- Creative generation
- Lead qualification
- Quality monitoring

**You only do:**
- Customer support
- Strategic decisions
- Hiring team

**Time**: 2-3 hours/day, team of 10 handles 1000+ customers

---

## 💰 FINANCIAL FLOW

### Money In vs Money Out:

**Example Month:**

```
MONEY IN (Revenue):
100 customers × ₹15,000 avg = ₹15,00,000
Received via Razorpay on 1st of month

MONEY OUT (Costs):
Facebook Ads: ₹9,00,000 (paid daily to Facebook)
Google Ads: ₹3,00,000 (paid to Google)
WhatsApp API: ₹30,000 (Twilio)
Platform costs: ₹50,000 (Supabase, hosting, etc.)
Team salaries: ₹1,00,000 (2 people)
Total: ₹13,80,000

NET PROFIT: ₹1,20,000 (8% margin)

As you optimize:
Ad costs reduce by 20-30% over 3-6 months
₹9,00,000 → ₹6,30,000 (better targeting)

NEW NET PROFIT: ₹3,90,000 (26% margin)
```

---

## 📊 TOOLS YOU NEED

### Essential Tools:

**1. Facebook Business Manager** (Free)
- Manage all Facebook ad campaigns
- Track performance
- Receive leads

**2. Google Ads Account** (Free)
- Manage search campaigns
- Lead form extensions
- Performance tracking

**3. Twilio Account** (Pay per use)
- WhatsApp Business API
- SMS sending
- ~₹0.05 per WhatsApp message

**4. Razorpay Account** (2% transaction fee)
- Collect payments
- Subscription billing
- Automatic invoicing

**5. Your Platform** (Supabase + Next.js)
- Customer dashboard
- Lead management
- Campaign tracking
- Analytics

**6. OpenAI API** (Pay per use)
- Lead qualification
- Ad copy generation
- Chatbot responses

---

## ✅ COMPLETE WORKFLOW SUMMARY

```
1. Customer pays ₹14,999
   ↓
2. YOU create Facebook/Google campaigns (20 mins)
   ↓
3. YOUR ads run using YOUR ad account money
   ↓
4. Leads submit forms on Facebook/Google
   ↓
5. Webhooks send leads to YOUR platform (instant)
   ↓
6. AI qualifies leads (quality score)
   ↓
7. Leads appear in customer's dashboard
   ↓
8. Customer gets WhatsApp notification
   ↓
9. Customer contacts lead via YOUR platform
   ↓
10. All conversations tracked by YOU
   ↓
11. Month-end: Quota tracking, overage billing
   ↓
12. Repeat next month!
```

---

## 🎯 KEY POINTS

✅ **YOU run ads in YOUR accounts** (not customer's)
✅ **YOU spend money on ads** (from customer's payment)
✅ **Leads come to YOUR platform** (webhooks)
✅ **Customer contacts leads via YOUR platform** (WhatsApp API)
✅ **YOU track everything** (quota, quality, billing)

**YOU are the middleman between:**
- Ad platforms (Facebook/Google) 
- AND customers

**You provide the complete service!**

---

**Ready for me to build the operations dashboard and Facebook webhook integration?** 🚀


