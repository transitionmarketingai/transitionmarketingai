# 🔄 Complete Operational Workflow

## From Consultation to Lead Delivery - Everything You Need

This is your **complete playbook** for running your lead generation service.

---

## 📊 THE COMPLETE WORKFLOW (10 Steps)

```
1. Consultation Request
2. Call & Discovery
3. Fill Onboarding Form
4. Calculate Quotation
5. Send Proposal
6. Client Pays
7. Generate Leads
8. Quality Check
9. Deliver to Client (Dashboard + Email + WhatsApp)
10. Invoice & Repeat
```

Let's break down each step in detail:

---

## 📋 STEP 1: Consultation Request
**Where:** Client fills form at `/consultation`
**What Happens:** Request saved to database, you get notified
**Your Action:** Check `/admin/consultations` daily

---

## 📞 STEP 2: Call & Discovery
**When:** Within 24 hours
**Duration:** 15-20 minutes
**Goal:** Understand their needs + qualify them

**Call Script:** See `CLIENT_ONBOARDING_WORKFLOW.md`

---

## 📝 STEP 3: Fill Onboarding Form
**Where:** `/admin/consultations/[id]/onboard`
**When:** During or immediately after call
**Duration:** 10-15 minutes

**6 Steps in Form:**
1. Basic Info
2. Business Details
3. Current Situation
4. Target Market & ICP
5. Lead Requirements
6. Proposal & Notes

---

## 💰 STEP 4: Calculate Quotation
**How:** Use the pricing matrix (see `PRICING_CALCULATOR_GUIDE.md`)

### **Quick Calculation Process:**

**Formula:**
```
Base Cost = Industry Rate × Quality Level
Source Adjusted = Base Cost × Source Factor
Total Before Discount = Source Adjusted × Volume
Discount = Total × Volume Discount %
Add-ons = Sum of additional services
FINAL = (Total - Discount) + Add-ons
```

**Example (Real Estate, 30 verified leads, AI scraping):**
```
₹400 (industry rate) × 1.0 (AI scraping) × 30 leads = ₹12,000
10% discount (26-50 volume) = -₹1,200
FINAL = ₹10,800/month
Cost Per Lead = ₹360
```

**Fill this in Step 6 of onboarding form:**
- Proposed monthly budget: ₹10,800
- Proposed leads quota: 30
- Cost per lead: ₹360 (auto-calculated!)

---

## 📧 STEP 5: Send Proposal
**When:** Same day as call
**How:** Email (template in `CLIENT_ONBOARDING_WORKFLOW.md`)

**What to Include:**
- Pricing breakdown
- What's included
- Timeline
- Guarantee
- Next steps

**Follow-up:**
- Day 2: Check if they received it
- Day 3: Call to answer questions
- Day 5: Final follow-up, then move on

---

## 💳 STEP 6: Client Pays
**Payment Methods:**
- Bank transfer
- UPI
- Payment gateway (Razorpay, etc.)

**Actions After Payment:**
1. Update client status: `pending` → `active`
2. Activate custom plan
3. Generate invoice (#1)
4. Send welcome email
5. Send dashboard credentials (if you build client portal)
6. **Start lead generation!**

---

## 🎯 STEP 7: Generate Leads (THE CRITICAL PART!)

This is where you actually **get the leads**. Here's how:

### **Method 1: AI Web Scraping** (Cheapest, Most Common)

**Tools You Need:**
- **Google Maps Scraper** (for local businesses)
  - Tool: Phantombuster, Apify, Scrapingdog
  - Cost: ₹2,000-5,000/month
  - Use case: Real estate agents, doctors, restaurants, local services

- **LinkedIn Scraper** (for B2B)
  - Tool: PhantomBuster, Wiza, Lusha
  - Cost: ₹3,000-8,000/month
  - Use case: IT services, consultants, B2B sales

- **Facebook/Instagram Scraper**
  - Tool: Apify, Bright Data
  - Cost: ₹2,000-5,000/month
  - Use case: E-commerce, local businesses

- **Industry-Specific Scrapers**
  - Justdial, IndiaMART, TradeIndia, etc.
  - Tool: Custom Python scripts or Apify actors
  - Cost: ₹1,000-3,000/month

**Process:**
1. **Define Target Criteria** (from onboarding form ICP)
   - Location: "Mumbai, Navi Mumbai, Thane"
   - Keywords: "Real estate agent", "Property consultant"
   - Filters: Active listings, has website, verified

2. **Run Scraper**
   - Set up search parameters
   - Run overnight (usually takes 1-6 hours)
   - Export to CSV

3. **You Get Raw Data:**
   ```
   Name, Phone, Email, Website, Address, Rating, Reviews, etc.
   ```

---

### **Method 2: Facebook/Google Ads** (Higher Cost, Higher Quality)

**When to Use:**
- Client has budget (₹20,000+ monthly)
- Needs high-intent leads
- Competitive industry

**Process:**
1. **Client gives you ad account access** (or you create campaigns in their account)
2. **You create lead generation campaigns**
   - Facebook Lead Ads
   - Google Search Ads
   - Landing page with form
3. **Leads fill forms** → You get their info
4. **Export leads** → Deliver to client

**Cost Structure:**
- You charge: ₹600/lead (includes ad spend)
- Facebook ad spend: ₹300/lead
- Your margin: ₹300/lead

---

### **Method 3: Hybrid (Recommended)**
- **Week 1-2:** AI scraping (fast, cheap, build volume)
- **Week 3-4:** Facebook Ads (higher quality, prove value)
- **Mix:** 70% scraping, 30% ads

---

## ✅ STEP 8: Quality Check (CRITICAL!)

**Before delivering ANY lead:**

### **Verification Checklist:**

**1. Phone Number Verification**
- Tool: Truecaller API, NumVerify
- Check: Is number active? Is it mobile or landline?
- Cost: ₹0.50-1 per check
- **Goal:** 90%+ active numbers

**2. Email Verification**
- Tool: ZeroBounce, NeverBounce, Hunter.io
- Check: Is email valid? Does it accept mail?
- Cost: ₹0.20-0.50 per check
- **Goal:** 95%+ valid emails

**3. Data Enrichment**
- Add missing fields (company size, industry, etc.)
- Cross-reference multiple sources
- Tool: Clearbit, Apollo.io

**4. Quality Scoring**
- Score each lead 0-100 based on:
  - Contact information completeness (30 points)
  - Target match (ICP alignment) (30 points)
  - Intent signals (website activity, recency) (20 points)
  - Verification status (20 points)
- **Goal:** Average quality score 80%+

**5. Manual Review** (Sample Check)
- Check 5-10 leads manually each batch
- Call 2-3 numbers to verify
- Send test email to verify deliverability

---

## 📦 STEP 9: Deliver Leads (AUTOMATED!)

### **Delivery Channels:**

#### **A. Dashboard Upload** ✅ (Already Built!)
**Where:** `/admin/clients/[id]/leads/upload`

**Process:**
1. Go to client detail page
2. Click "Upload Leads"
3. Choose CSV upload or manual entry
4. Select source, quality score
5. Click "Upload"
6. **Leads appear in client's dashboard instantly!**

---

#### **B. Email Notification** (Need to Build)

**What to Send:**
```
Subject: 🎯 10 New Leads Delivered - [Date]

Hi [Client Name],

Great news! We've just delivered 10 new verified leads to your dashboard.

📊 THIS BATCH:
• Lead Source: AI Scraping - Google Maps
• Average Quality Score: 87%
• Geographic Focus: Mumbai, Navi Mumbai
• Verified: Phone + Email confirmed

🔗 VIEW LEADS:
Login to your dashboard: [link]

Or download CSV: [attachment]

LEAD BREAKDOWN:
• Name, Phone, Email, Location
• [List first 3 leads as preview]
• + 7 more in dashboard

Need help? Reply to this email or call me at [phone].

Best regards,
[Your Name]
Transition Marketing AI
```

**Automation:**
- When you upload leads → System sends email automatically
- Use Resend.com or SendGrid API
- Cost: Free for first 1,000 emails/month

---

#### **C. WhatsApp Notification** (Need to Build)

**What to Send:**
```
🎯 NEW LEADS DELIVERED!

Hi [Client Name],

10 new verified leads just added to your dashboard!

Quality Score: 87% ✅
Source: AI Scraping

View now: [dashboard link]

- Transition Marketing AI
```

**How to Set Up:**
1. **Option 1: WhatsApp Business API** (Official, Best)
   - Provider: Gupshup, Twilio, MessageBird
   - Cost: ₹0.25-0.50 per message
   - Setup: 2-3 days approval
   - **Recommended!**

2. **Option 2: WhatsApp Bot** (Unofficial, Risky)
   - Tool: wa-automate, Baileys
   - Cost: Free
   - Risk: Account can be banned
   - **Not recommended for business**

3. **Option 3: Manual WhatsApp**
   - Just send from your personal WhatsApp
   - Free, but not scalable
   - **Good for first 5-10 clients**

---

### **Delivery Schedule (Recommended):**

**Weekly Delivery:**
```
Monday: Start generating leads
Tuesday-Thursday: Continue + quality check
Friday: Upload to dashboard + send notifications
```

**Why weekly?**
- Consistent schedule client can expect
- You have time for quality checks
- Builds anticipation ("Friday is lead day!")

**Alternative: Bi-weekly**
```
Week 1-2: Generate 60 leads
End of Week 2: Deliver all 60 at once
```

---

## 💼 STEP 10: Invoice & Repeat

**Monthly Cycle:**

**Week 1:**
- Generate leads for current clients
- Quality check
- Deliver

**Week 2:**
- Continue lead generation
- Quality check
- Deliver

**Week 3:**
- Continue lead generation
- Quality check
- Deliver
- **Generate invoices for next month**

**Week 4:**
- Final week of current month
- Deliver last batch
- **Send invoices**
- Follow up on payments
- Schedule monthly review calls

---

## 📊 CLIENT STATUS TRACKING (In Admin Dashboard)

### **Visual Pipeline Stages:**

You should see this for each client:

```
[1. Onboarded] → [2. Quote Sent] → [3. Payment Pending] → 
[4. Active] → [5. Delivering] → [6. Invoice Sent] → [Repeat 4-6]
```

**What Each Stage Means:**

**1. Onboarded**
- Completed onboarding form
- Quotation calculated
- Status: `pending`
- Next Action: Send proposal

**2. Quote Sent**
- Proposal emailed
- Waiting for response
- Next Action: Follow up in 2 days

**3. Payment Pending**
- Client said YES
- Waiting for payment
- Next Action: Send payment details, follow up

**4. Active - Setup**
- Payment received ✅
- Setting up lead generation
- Status: `active`
- Next Action: Start generating leads

**5. Active - Delivering**
- Generating leads
- Weekly deliveries happening
- Track: [X] of [Y] leads delivered this month
- Next Action: Continue deliveries

**6. Invoice Sent**
- Month ending
- Invoice generated and sent
- Next Action: Collect payment, start new month

---

## 🎯 RECOMMENDED TOOLS & COSTS

### **Lead Generation Tools:**
| Tool | Purpose | Cost/Month | Link |
|------|---------|------------|------|
| **Apify** | Web scraping | ₹2,000-5,000 | apify.com |
| **PhantomBuster** | LinkedIn/social scraping | ₹3,000-8,000 | phantombuster.com |
| **Hunter.io** | Email finding/verification | ₹2,500 | hunter.io |
| **Truecaller API** | Phone verification | ₹0.50/check | truecaller.com |
| **ZeroBounce** | Email verification | ₹0.30/check | zerobounce.net |

### **Delivery/Automation Tools:**
| Tool | Purpose | Cost/Month | Link |
|------|---------|------------|------|
| **Resend** | Email API | Free-₹1,000 | resend.com |
| **Gupshup** | WhatsApp Business API | ₹0.30/msg | gupshup.io |
| **Zapier** | Automation | ₹1,500 | zapier.com |

### **Total Monthly Tool Costs:**
- **Starter (5-10 clients):** ₹8,000-12,000/month
- **Growth (10-25 clients):** ₹15,000-25,000/month
- **Scale (25+ clients):** ₹30,000-50,000/month

---

## 💡 LEAD GENERATION WORKFLOWS (By Industry)

### **Real Estate Example:**

**Target:** Real estate agents in Mumbai

**Scraping Process:**
1. **Google Maps**
   - Search: "real estate agent Mumbai"
   - Filter: Rating 4.0+, has reviews
   - Scrape: Name, phone, email, address, rating
   - Result: 500-1000 leads

2. **99acres/MagicBricks**
   - Scrape agent listings
   - Get: Name, phone, email, properties listed
   - Result: 300-500 leads

3. **LinkedIn**
   - Search: "Real Estate" + "Mumbai" + "Sales"
   - Get: Name, company, email pattern
   - Result: 200-300 leads

4. **Combine & Deduplicate**
   - Merge all sources
   - Remove duplicates
   - Verify contacts
   - **Final: 800-1200 unique, verified leads**

**Your Client Needs:** 30/month
**Your Pipeline:** 800+ leads
**You're Set For:** 26 months! (Or 26 clients!)

---

### **Healthcare Example:**

**Target:** Doctors/clinics in specific specialty

**Scraping Process:**
1. **Practo**
   - Scrape doctor profiles
   - Get: Name, specialty, clinic, phone, email
   - Filter: Specific specialty, location, rating

2. **Google Maps**
   - Search: "cardiologist Mumbai"
   - Get: Clinic name, phone, address

3. **Justdial**
   - Search medical professionals
   - Verify with Practo data

4. **Hospital Websites**
   - Scrape doctor directories
   - Get consultant lists

**Result:** 300-500 verified doctor contacts

---

### **B2B Services Example:**

**Target:** IT companies, decision makers

**Scraping Process:**
1. **LinkedIn Sales Navigator**
   - Search: "CTO" OR "CEO" + "IT Services" + "Mumbai"
   - Get: Name, company, email pattern
   - Result: 500-1000 contacts

2. **Company Websites**
   - Find IT companies
   - Scrape contact pages
   - Get: Email, phone

3. **AngelList/Crunchbase**
   - Tech company databases
   - Get founder/leadership info

**Result:** 400-600 verified B2B contacts

---

## 🚨 QUALITY CONTROL CHECKLIST

Before delivering ANY batch:

- [ ] All phone numbers verified (90%+ active)
- [ ] All emails verified (95%+ valid)
- [ ] No duplicates in batch
- [ ] No duplicates with previous batches
- [ ] All required fields filled (name, phone, email minimum)
- [ ] Quality score assigned to each lead
- [ ] Source documented
- [ ] Matches client's ICP (target audience)
- [ ] Sample checked manually (called 3-5 numbers)
- [ ] CSV formatted correctly

---

## 📈 SUCCESS METRICS TO TRACK

### **For Each Client:**
```
- Leads delivered vs. quota: 30/30 ✅
- Average quality score: 87%
- Client satisfaction: Happy/Neutral/Unhappy
- Payment status: Paid/Pending/Overdue
- Delivery timeline: On time/Late
- Churn risk: Low/Medium/High
```

### **Your Business:**
```
- Total active clients: 12
- Monthly Recurring Revenue (MRR): ₹2,40,000
- Average deal size: ₹20,000
- Client retention rate: 85%
- Lead delivery accuracy: 95%
- Average quality score across all clients: 84%
```

---

## 🎯 SCALING STRATEGY

### **When You Have 1-5 Clients:**
- Do everything manually
- Learn what works
- Build your scraping pipelines
- Perfect your quality checks

### **When You Have 5-15 Clients:**
- Automate scraping (weekly cron jobs)
- Automate verification (API integration)
- Automate delivery notifications
- Hire a VA for quality checks

### **When You Have 15+ Clients:**
- Hire lead generation specialist
- Build custom dashboard for clients
- Advanced automation (Zapier/Make)
- Team of 2-3 people

---

## ⚠️ COMMON PITFALLS & SOLUTIONS

### **Problem 1: "Leads aren't good quality"**
**Solution:**
- Review their ICP again
- Show them quality scores
- Offer to refine targeting
- Give 5 replacement leads for every bad one

### **Problem 2: "Not enough volume"**
**Solution:**
- Expand geographic area
- Loosen filtering criteria
- Add more lead sources
- Be transparent about market size

### **Problem 3: "Takes too long to verify"**
**Solution:**
- Invest in better tools (batch verification)
- Hire VA for verification tasks
- Accept 85-90% verification rate instead of 100%

### **Problem 4: Client churns**
**Solution:**
- Monthly check-in calls
- Share success stories (other clients)
- Show value: "You got 30 leads, did any convert?"
- Offer to help with their follow-up process

---

## 🎓 TRAINING CHECKLIST

Before going live with first paying client:

- [ ] Tested lead scraping tools (generated 100+ test leads)
- [ ] Verified contacts using verification APIs
- [ ] Practiced quality scoring
- [ ] Uploaded test leads to dashboard
- [ ] Calculated pricing for 3 different scenarios
- [ ] Set up WhatsApp Business account
- [ ] Set up email sending (Resend/SendGrid)
- [ ] Created proposal templates
- [ ] Practiced objection handling
- [ ] Know your tools inside out

---

## 📞 WHEN THINGS GO WRONG

**Scenario 1: Scraper breaks**
- Have backup scrapers ready
- Manual backup: Hire VA on Upwork to research
- Timeline buffer: Start early in the week

**Scenario 2: Low verification rate**
- Accept it, inform client
- Offer bonus leads
- Adjust pricing for next month

**Scenario 3: Client complains about quality**
- Ask for specific examples
- Review ICP together
- Offer replacements
- If necessary, refund and part ways professionally

---

## 🚀 NEXT STEPS

**Immediate (Today):**
1. Review pricing calculator
2. Sign up for Apify (scraping tool)
3. Sign up for Hunter.io (email verification)
4. Test scrape 100 leads in your niche

**This Week:**
1. Complete first client onboarding (real or practice)
2. Generate first batch of 30 leads
3. Verify all contacts
4. Upload to dashboard
5. Practice sending delivery notifications

**This Month:**
1. Onboard 3-5 paying clients
2. Perfect your workflow
3. Set up automation
4. Track metrics
5. Refine processes

---

**You now have the complete operational playbook! Let's build the automation next.** 🚀

