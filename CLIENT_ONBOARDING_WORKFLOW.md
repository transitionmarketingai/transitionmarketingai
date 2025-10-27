# 📋 Client Onboarding Workflow Guide

## Complete Post-Consultation Process

This document explains your **entire workflow** from consultation request to client onboarding.

---

## 🔄 The Complete Client Journey

### Step 1: Lead Requests Consultation
**Where:** `/consultation` page on your website

**What Happens:**
- Prospect fills out consultation request form
- Data saved to `consultations` table
- Status: `pending`

**Data Captured:**
- Name, Email, Phone
- Company, Industry
- Preferred day/time
- WhatsApp opt-in
- Message/requirements

---

### Step 2: You Review Consultation Requests
**Where:** `/admin/consultations`

**What You See:**
- List of all consultation requests
- Filter by status (pending, scheduled, completed, converted)
- Search by name/company
- Stats dashboard showing conversion rates

**Actions You Can Take:**
- View full details
- Call directly (one-click call button)
- Email directly (one-click email button)
- Update status
- Add internal notes

---

### Step 3: You Call the Prospect
**When:** Within 24 hours (or based on their preferred time)

**Your Consultation Call Script:**

#### **Introduction (2 min)**
- "Hi [Name], this is [Your Name] from Transition Marketing AI"
- "Thanks for requesting a consultation. Do you have 15-20 minutes to discuss your lead generation needs?"

#### **Discovery Questions (10 min)**
Use the onboarding form as your guide. Ask about:

1. **Current Situation:**
   - "Tell me about your business and what you do"
   - "How are you currently generating leads?"
   - "How many leads are you getting per month?"
   - "What's your biggest challenge with lead generation?"

2. **Target Market:**
   - "Who is your ideal customer?"
   - "What geographic area do you target?"
   - "What makes a 'good lead' for your business?"

3. **Budget & Goals:**
   - "What's your current marketing budget?"
   - "How many leads do you need per month to meet your goals?"
   - "What cost per lead would make this worthwhile for you?"

4. **Timeline:**
   - "How soon do you need to start seeing results?"
   - "Are you the decision maker, or does anyone else need to approve this?"

#### **Presentation (5 min)**
- Explain how your service works
- Show relevant industry examples
- Address their specific pain points
- Present custom solution

#### **Proposal (3 min)**
- "Based on what you've told me, here's what I recommend..."
- Present pricing: "₹[X] per month for [Y] verified leads"
- Explain what's included
- Share money-back guarantee

#### **Close:**
- "Does this sound like something that could help your business?"
- If YES → "Great! I'll send you a detailed proposal and onboarding link"
- If MAYBE → "What concerns do you have? Let me address those"
- If NO → "No problem. Can I ask what made you decide against it?"

---

### Step 4: Fill Out Onboarding Form
**Where:** `/admin/consultations/[id]/onboard`

**When:** During OR immediately after the consultation call

**How to Access:**
1. Go to `/admin/consultations`
2. Click on the consultation
3. Click "Onboard Client" button
4. You'll be taken to the comprehensive onboarding form

#### **The 6-Step Onboarding Form:**

##### **Step 1: Basic Information**
What to fill:
- Business name
- Contact person
- Email & phone
- Alternate phone
- Website

**Tip:** This should be pre-filled from consultation data!

##### **Step 2: Business Details**
What to fill:
- Industry (dropdown)
- Business type (B2B, B2C, B2B2C)
- Company size (employees)
- Location (city, state)

**Why This Matters:**
- Helps you tailor lead sources
- Different industries have different lead quality expectations
- Location determines targeting strategy

##### **Step 3: Current Marketing Situation**
What to fill:
- Current lead sources (checkboxes: cold calling, referrals, ads, etc.)
- Monthly lead volume they're getting now
- Current marketing budget
- Key pain points & challenges (detailed textarea)

**Why This Matters:**
- Shows what's NOT working for them
- Helps you position your solution
- Identifies gaps you can fill
- Sets baseline for comparison

##### **Step 4: Target Market & ICP**
What to fill:
- Target audience description
- Ideal Customer Profile (detailed)
- Geographic target areas
- Main competitors (optional)

**Why This Matters:**
- **THIS IS CRITICAL!** You need this to generate the right leads
- Poor targeting = unhappy client
- The more specific, the better quality leads you can deliver

**Example Good ICP:**
> "First-time home buyers in Mumbai, Navi Mumbai, and Thane. Age 25-40. Budget ₹50L-1Cr. Salaried professionals (IT, Banking, Consulting). Looking for 2BHK/3BHK. High intent to buy within 3-6 months."

**Example Bad ICP:**
> "People who want to buy property"

##### **Step 5: Lead Requirements & Expectations**
What to fill:
- Desired monthly lead volume
- Acceptable cost per lead
- Urgency/timeline
- Lead quality expectations (what makes a good lead for them?)
- Preferred lead sources (AI, Facebook, Google, LinkedIn, etc.)
- Contact method preferences (phone, email, WhatsApp, SMS)
- Reporting frequency (daily, weekly, monthly)

**Why This Matters:**
- Sets clear expectations upfront
- Prevents "these leads are no good" complaints later
- Helps you choose the right lead generation methods

##### **Step 6: Custom Proposal & Internal Notes**
What to fill:

**PROPOSAL SECTION (Blue Box):**
- Proposed monthly budget (₹)
- Proposed leads quota per month
- Cost per lead (auto-calculated!)
- Payment terms (advance, net 30, 50-50, etc.)
- Contract duration (1 month trial, 3/6/12 months)
- Additional services:
  - ☑️ Outreach service (email/WhatsApp campaigns)
  - ☑️ Appointment setting
  - ☑️ CRM integration
- Additional requirements (custom needs)

**INTERNAL NOTES SECTION (Amber Box - NOT visible to client):**
- Consultation notes (key points from call, their tone, concerns)
- Buying timeline
- Is decision maker? (checkbox)
- Objections/concerns raised
- Next steps (follow up Friday, send proposal, schedule demo, etc.)

**Why This Matters:**
- Creates a custom plan tailored to their needs
- Internal notes help you remember context later
- Tracks objections so you can address them
- Documents next steps so nothing falls through cracks

---

### Step 5: Submit & System Creates Everything
**What Happens When You Click "Complete Onboarding":**

1. **Client Record Created** in `clients` table
   - Status: `pending` (until they pay)
   - All contact info saved
   - Notes stored as JSON

2. **Custom Plan Created** in `custom_plans` table
   - Monthly cost, leads quota, cost per lead
   - Services included (AI scraping, ads, outreach, etc.)
   - Contract terms documented
   - Status: `draft` (until client accepts)

3. **Onboarding Data Stored** in `client_onboarding_data` table
   - Full form data preserved
   - Linked to consultation
   - Timestamp of completion

4. **Consultation Status Updated**
   - Status changed to `converted`
   - Linked to new client record

5. **Activity Log Created**
   - Records who onboarded the client and when

6. **You're Redirected** to client detail page
   - Where you can review everything
   - Upload leads
   - Generate invoices
   - Manage the relationship

---

## 📧 Step 6: Send Proposal to Client

**What to Send:**
After onboarding is complete, send them:

### Email Template:

```
Subject: Your Custom Lead Generation Proposal - [Business Name]

Hi [Contact Person],

Thank you for taking the time to speak with me today about [Business Name]'s lead generation needs.

Based on our conversation, I've prepared a custom plan for you:

📊 YOUR CUSTOM PLAN

Monthly Investment: ₹[X]
Verified Leads: [Y] leads/month
Cost Per Lead: ₹[Z]
Contract Duration: [Duration]

WHAT'S INCLUDED:
✓ [List services from onboarding form]
✓ Verified phone numbers and emails
✓ [Reporting frequency] performance reports
✓ Dedicated account manager
✓ Money-back guarantee

TARGET AUDIENCE:
[Paste their ICP from form]

LEAD SOURCES:
[List preferred sources they selected]

💰 PAYMENT TERMS: [Payment terms from form]

🎯 NEXT STEPS:
1. Review this proposal
2. If you have questions, reply to this email or call me at [your phone]
3. Ready to start? I'll send you payment details and dashboard access

🛡️ OUR GUARANTEE:
- First leads delivered within 7 days
- All leads verified before delivery
- 30-day money-back guarantee if not satisfied

Ready to get started?

Best regards,
[Your Name]
Transition Marketing AI
[Phone]
[Email]
```

---

## 💳 Step 7: Client Accepts & Pays

**When they agree:**

1. **Send Payment Link/Details**
   - Bank transfer details
   - UPI ID
   - Payment gateway link (if you have one)

2. **Generate Invoice**
   - Go to `/admin/clients/[id]/invoice`
   - Create first invoice
   - Send to client

3. **Update Client Status**
   - Change from `pending` to `active`
   - Activate their custom plan

4. **Send Welcome & Dashboard Access**
   - Create their user account (if you build client dashboard)
   - Send login credentials
   - Welcome email with what to expect

---

## 🚀 Step 8: Deliver Leads

**Now the real work begins!**

### Weekly Workflow:

**Monday:**
- Generate leads using AI scraping, ads, or other sources
- Verify contact information
- Score lead quality

**Tuesday-Thursday:**
- Continue lead generation
- Quality check all leads

**Friday:**
- Go to `/admin/clients/[id]/leads/upload`
- Upload the week's leads (CSV or manual)
- Leads appear in client's dashboard
- Client can unlock contacts with credits

**Monthly:**
- Generate invoice for next month
- Send performance report
- Schedule check-in call

---

## 📊 Key Metrics to Track

### For Each Client:
- Leads delivered vs quota
- Average quality score
- Client satisfaction
- Payment status
- Churn risk

### Overall Business:
- Consultation → Client conversion rate
- Average deal size
- Monthly Recurring Revenue (MRR)
- Client Lifetime Value (LTV)
- Cost to acquire customer

---

## 🎯 Best Practices

### During Consultation:
1. **Listen More Than You Talk** (70/30 rule)
2. **Ask Open-Ended Questions** ("Tell me more about...")
3. **Take Notes** (you'll fill the onboarding form from these)
4. **Address Objections** (price, quality, timeline)
5. **Always Schedule Next Steps** (don't leave it open-ended)

### Filling Onboarding Form:
1. **Be Thorough** - More detail = better service delivery
2. **Copy Their Words** - Use client's language in ICP section
3. **Document Everything** - Future you will thank present you
4. **Set Realistic Expectations** - Don't overpromise
5. **Complete Within 24 Hours** - While call is fresh in mind

### After Onboarding:
1. **Send Proposal Same Day** - Strike while iron is hot
2. **Follow Up in 2 Days** - If no response
3. **Be Ready to Start** - Once they pay, deliver fast
4. **Over-Communicate** - Especially in first month

---

## 🔥 Common Objections & How to Handle

### "The price is too high"
**Response:** "I understand budget is important. Let's break it down: at ₹[X] per lead, you're getting verified contacts with [quality criteria]. If even [Y]% of these convert, your ROI is [Z]x. Plus, we have a money-back guarantee if you're not satisfied."

### "I need to think about it"
**Response:** "Of course! What specific aspects would you like to think over? [Address concerns]. How about I send you the proposal in writing, and we can schedule a 10-minute follow-up call on [specific day]?"

### "How do I know the leads will be good quality?"
**Response:** "Great question! That's exactly why we [verification process]. We also track quality score on every lead. And here's the key: you only pay if we deliver [quality criteria]. Plus our 30-day guarantee."

### "Can I start with a smaller package?"
**Response:** "Absolutely! We can do a 1-month trial with [reduced quota] leads to prove the value. If it works (and I'm confident it will), we can scale up to [original proposal]."

---

## 🎓 Training Checklist

Before your first consultation, make sure you can:

- [ ] Access consultation requests at `/admin/consultations`
- [ ] Use one-click call and email buttons
- [ ] Navigate to onboarding form
- [ ] Fill out all 6 steps of onboarding form
- [ ] Explain your service clearly in 2 minutes
- [ ] Handle top 3 objections confidently
- [ ] Send proposal email
- [ ] Upload leads to client dashboard
- [ ] Generate and send invoices

---

## 📝 Quick Reference

| Action | Where to Go |
|--------|-------------|
| View consultation requests | `/admin/consultations` |
| Onboard new client | `/admin/consultations/[id]/onboard` |
| View client details | `/admin/clients/[id]` |
| Upload leads | `/admin/clients/[id]/leads/upload` |
| Create invoice | `/admin/clients/[id]/invoice` |
| Build custom plan | `/admin/clients/[id]/plan` |
| View analytics | `/admin/analytics` |
| Manage all clients | `/admin/clients` |

---

## 🚀 Success Tips

1. **Speed Matters** - Call back within 24 hours of request
2. **Preparation Matters** - Research their business before calling
3. **Details Matter** - Complete onboarding form thoroughly
4. **Follow-Up Matters** - Don't let leads go cold
5. **Quality Matters** - Better to deliver 40 great leads than 60 mediocre ones

---

**Built for your success! 🎉**

This onboarding system gives you everything you need to convert consultations into happy, paying clients.

