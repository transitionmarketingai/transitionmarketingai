# Daily Operations Checklist - India Lead Generation Platform

## ⏰ YOUR DAILY ROUTINE

---

## MORNING (9:00 AM - 12:00 PM)

### 9:00 AM - Check Overnight Activity (15 mins)

**Admin Dashboard Review**:
```
✓ Total leads generated overnight: _____
✓ New customer signups: _____
✓ Payment failures: _____
✓ Disputes filed: _____
```

**Quick Checks**:
- [ ] Any error alerts in Vercel/Supabase?
- [ ] Any customer WhatsApp messages?
- [ ] Any payment failures to follow up?

**Tools**: 
- Admin dashboard: `yourplatform.in/admin`
- Razorpay dashboard
- Twilio logs

---

### 9:30 AM - New Customer Onboarding (30-60 mins)

**For each new customer** (target: 2-3 per day):

**Checklist per customer** (20-30 minutes each):

**1. Review Onboarding Details** (2 mins)
```
Customer: _____________________
Industry: _____________________
Target: _______________________
Cities: _______________________
Plan: _________________________
```

**2. Create Facebook Campaign** (15 mins)

```
□ Log into YOUR Facebook Business Manager
□ Create new campaign:
   Name: [Customer]_[Industry]_[City]_[Date]
   Objective: Lead Generation
   Budget: ₹800/day (adjust based on plan)

□ Create Ad Set:
   Location: [Their cities from onboarding]
   Age: [From target audience]
   Interests: [Industry-specific]
   
□ Create Ad Creative:
   Image: [Industry stock photo or AI-generated]
   Headline: [Use template or AI-generate]
   Text: [Compelling copy]
   CTA: "Sign Up" or "Learn More"

□ Create Lead Form:
   Name: [Customer]_Form
   Questions:
   ✓ Full Name (pre-filled)
   ✓ Phone (pre-filled)
   ✓ Email (pre-filled)
   ✓ [Custom Q1 - budget/timeline]
   ✓ [Custom Q2 - specific need]
   ✓ [Custom Q3 - decision authority]
   
   Privacy: yourplatform.in/privacy
   Thank You: "We'll contact you within 24 hours"

□ Configure Webhook:
   URL: yourplatform.in/api/webhooks/facebook/leads/[CUSTOMER_ID]
   (Replace [CUSTOMER_ID] with actual ID from database)

□ Review and Submit for approval

□ Note campaign ID in your tracking sheet
```

**3. Update Database** (3 mins)
```
□ Go to Supabase → ad_campaigns table
□ Insert record:
   customer_id: [Customer ID]
   campaign_name: [Name you created]
   platform: facebook
   external_campaign_id: [Facebook campaign ID]
   external_form_id: [Form ID]
   daily_budget: 80000 (₹800 in paise)
   status: pending_approval
```

**4. Notify Customer** (5 mins)
```
□ Send WhatsApp:
"Hi [Name]! 👋

Your campaign is now live! 🎉

✓ Targeting: [Their target audience]
✓ Budget: ₹800/day
✓ Platform: Facebook + Google

You'll start receiving leads within 24-48 hours.

Questions? Just reply to this message!

Dashboard: yourplatform.in/dashboard

Team LeadGen Pro"
```

---

### 11:00 AM - Monitor Ad Performance (30 mins)

**For ALL active campaigns**:

**Facebook Ads Manager Review**:
```
□ Check each campaign:
   Cost per lead: Should be ₹200-₹400
   Quality score: Should be 60+
   Daily spend: Matches budget?
   
□ Identify issues:
   CPL > ₹500: Pause or adjust targeting
   CPL < ₹200: Increase budget (more leads!)
   Quality < 50: Change targeting or creative
   
□ Take action:
   ✓ Pause underperforming ads
   ✓ Increase budget on winners
   ✓ Test new creatives
```

**Quick Optimization Actions**:
- [ ] Pause ads with CPL > ₹500
- [ ] Increase budget on ads with CPL < ₹250
- [ ] Note what's working (targeting, creative, copy)
- [ ] Test 2-3 new ad variations

**Track in Spreadsheet**:
```
Campaign | Customer | Spend Today | Leads Today | CPL | Action Taken
---------|----------|-------------|-------------|-----|-------------
ABC_RE   | Customer1| ₹720       | 3           | ₹240| ✓ Increase budget
XYZ_Ins  | Customer2| ₹850       | 1           | ₹850| ⚠ Adjust targeting
```

---

## AFTERNOON (2:00 PM - 5:00 PM)

### 2:00 PM - Customer Support (1 hour)

**WhatsApp Messages**:
```
□ Respond to all customer messages (target: within 1 hour)
□ Common questions:
   • "When will I get leads?" → "Within 24-48 hours of campaign launch"
   • "Lead not responding?" → "Try calling, some prefer voice"
   • "Lead quality poor?" → "Can you share details? We'll issue credit"
   • "Want more leads?" → "Sure! Let me upgrade your quota"

□ Track issues in spreadsheet:
   Customer | Issue | Resolution | Follow-up Needed
```

**Email Tickets**:
- [ ] Check inbox
- [ ] Respond to queries
- [ ] Escalate if needed

---

### 3:00 PM - Lead Quality Review (30 mins)

**Check Lead Quality Metrics**:
```
□ Admin Dashboard → Analytics
□ Today's average quality score: _____ (target: 70+)
□ Leads below 40 score: _____ (should be <10%)
□ Disputed leads: _____ (should be <5%)

□ If quality dropping:
   ✓ Review recent form responses
   ✓ Check ad targeting
   ✓ Adjust qualification criteria
   ✓ Contact customers for feedback
```

---

### 3:30 PM - Growth Activities (90 mins)

**Option A: Acquire New Customers** (if <50 customers)
```
□ Send 20 LinkedIn messages to prospects
□ Post in 3 Facebook groups
□ Follow up with 5 leads from yesterday
□ Target: 1-2 new signups per day
```

**Option B: Customer Success Calls** (if >20 customers)
```
□ Call 3-5 customers (15 mins each)
□ Ask: "How are the leads? Closing any deals?"
□ Listen for upsell opportunities
□ Address concerns
□ Get testimonials if happy
```

**Option C: Optimize Campaigns** (ongoing)
```
□ A/B test new ad creatives (2-3 variants)
□ Test different targeting options
□ Analyze top-performing ads
□ Document what works
□ Replicate across customers
```

---

### 5:00 PM - End of Day Review (15 mins)

**Daily Summary**:
```
Today's Stats:
• New customers: _____
• Total leads delivered: _____
• Average quality score: _____
• Ad spend: ₹_____
• Revenue: ₹_____
• Customer support tickets: _____

Wins:
• _________________________
• _________________________

Issues:
• _________________________
• _________________________

Tomorrow's Focus:
• _________________________
• _________________________
```

---

## WEEKLY TASKS

### Monday Morning (30 mins)
- [ ] Review weekend performance
- [ ] Plan week's goals
- [ ] Set campaigns for new customers

### Wednesday (1 hour)
- [ ] Mid-week campaign optimization
- [ ] Check quota usage for all customers
- [ ] Send alerts to customers near limit

### Friday (1 hour)
- [ ] Week-end reporting
- [ ] Prepare for weekend (reduce budgets if B2B)
- [ ] Send weekly summary to customers

---

## MONTHLY TASKS

### Week 1 (Month Start)
- [ ] Month-end reports sent to all customers
- [ ] Quota resets verified
- [ ] Overage billing processed
- [ ] Check trial expirations

### Week 2
- [ ] Review churn (any cancellations?)
- [ ] Retention campaigns
- [ ] Upsell to higher plans
- [ ] New feature planning

### Week 3
- [ ] Financial review (revenue vs costs)
- [ ] Campaign performance audit
- [ ] Industry-specific optimization
- [ ] Customer success stories

### Week 4
- [ ] Prepare for next month
- [ ] Set growth targets
- [ ] Plan new customer acquisition
- [ ] Team meeting (if applicable)

---

## 🚨 EMERGENCY PROCEDURES

### If Ad Account Suspended:
1. Contact Facebook support immediately
2. Review policy violations
3. Pause all campaigns
4. Notify affected customers
5. Use backup ad account

### If Payment Failure Spike:
1. Check Razorpay dashboard
2. Identify common issues
3. Contact affected customers
4. Offer payment alternatives
5. Pause campaigns if needed

### If Lead Quality Drops:
1. Review recent leads
2. Check targeting changes
3. Pause poor-performing campaigns
4. Contact customers
5. Offer credits proactively

### If System Downtime:
1. Check Vercel status
2. Check Supabase status
3. Post status update
4. Notify customers via WhatsApp
5. Estimate resolution time

---

## 📊 KPI TRACKING (Daily)

**Track these numbers every day**:

### Revenue Metrics:
- [ ] MRR (Monthly Recurring Revenue): ₹_____
- [ ] New customer signups: _____
- [ ] Churn: _____ (target: <5%)

### Lead Metrics:
- [ ] Total leads delivered today: _____
- [ ] Average quality score: _____ (target: 70+)
- [ ] Leads per customer: _____ (target: 1-2/day)

### Cost Metrics:
- [ ] Total ad spend today: ₹_____
- [ ] Cost per lead: ₹_____ (target: ₹200-₹400)
- [ ] Ad account balance: ₹_____

### Customer Metrics:
- [ ] Active customers: _____
- [ ] Trial customers: _____
- [ ] Customer satisfaction: _____ (weekly survey)

### Operational Metrics:
- [ ] Response time to customer queries: _____ (target: <1 hour)
- [ ] New campaigns launched: _____
- [ ] Issues resolved: _____

---

## 🎯 PERFORMANCE TARGETS

### Daily:
- ✅ Deliver 150-200 leads total (for 100 customers)
- ✅ Maintain 70+ average quality score
- ✅ Keep ad spend under ₹50,000
- ✅ Respond to customers within 1 hour
- ✅ Launch campaigns for new customers within 24 hours

### Weekly:
- ✅ 10-15 new customer signups
- ✅ <5% churn rate
- ✅ 90%+ customer satisfaction
- ✅ ₹3-5 Lakhs revenue

### Monthly:
- ✅ 40-50 new customers
- ✅ <3% monthly churn
- ✅ Profitable operations
- ✅ 70%+ trial-to-paid conversion

---

## 📱 TOOLS YOU'LL USE

### Every Day:
- **Your Admin Dashboard** - yourplatform.in/admin
- **Facebook Ads Manager** - business.facebook.com
- **WhatsApp** - Customer communication
- **Razorpay Dashboard** - Payments

### Weekly:
- **Google Ads** - ads.google.com
- **Supabase Dashboard** - Database management
- **Twilio Console** - WhatsApp monitoring

### Monthly:
- **Analytics** - Performance reviews
- **Financial Reports** - P&L tracking
- **Customer Surveys** - Satisfaction scores

---

## ✅ EFFICIENCY TIPS

### Batch Similar Tasks:
- Set up all new customer campaigns together (morning)
- Do all customer calls in one block (afternoon)
- Review all campaigns at once (daily)

### Use Templates:
- Ad creative templates by industry
- Message templates for support
- Campaign naming conventions
- Standard targeting profiles

### Automate Where Possible:
- Webhooks (already automated!)
- Notifications (already automated!)
- Billing (already automated!)
- Reports (use scheduled queries)

### Delegate Early:
- Month 3: Hire part-time support (₹20k/month)
- Month 6: Hire full-time ads manager (₹40k/month)
- Month 9: Hire customer success (₹30k/month)

---

## 📊 DAILY SCORECARD

Print this and fill out every day:

```
Date: __________

NEW CUSTOMERS:
□ Signups: _____
□ Campaigns set up: _____

LEADS:
□ Total delivered: _____
□ Average quality: _____/100
□ Disputed: _____

AD PERFORMANCE:
□ Total spend: ₹_____
□ Average CPL: ₹_____
□ Campaigns optimized: _____

CUSTOMER SUPPORT:
□ WhatsApp messages answered: _____
□ Issues resolved: _____
□ Happy customers: _____

REVENUE:
□ Today's revenue: ₹_____
□ MRR: ₹_____

WINS:
□ _________________________
□ _________________________

ISSUES:
□ _________________________
□ _________________________

TOMORROW'S PRIORITY:
□ _________________________
```

---

**Use this checklist EVERY DAY to stay on track! ✅**

**Time required**: 3-5 hours/day for 50-100 customers
**Can be reduced to**: 2-3 hours with team


