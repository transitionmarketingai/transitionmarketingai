# 🔧 ADMIN DASHBOARD - Complete Requirements

## 📊 **WHAT ADMIN NEEDS TO DO:**

### **Your Role as Platform Owner:**
1. Manage all customer accounts
2. Create & manage ad campaigns for each customer
3. Deliver leads to customers
4. Monitor quality & refunds
5. Track revenue & spending
6. Manage subscriptions & billing
7. System configuration
8. Support & operations

---

## 🏆 **PROVEN ADMIN DASHBOARDS ANALYZED:**

### **1. HubSpot Admin**
- Customer account management
- Usage analytics per customer
- Subscription/billing management
- Support ticketing
- System settings

### **2. Intercom Admin**
- All customer conversations
- Team member management
- Integration settings
- Analytics dashboard
- Billing & revenue

### **3. Stripe Dashboard**
- All customer subscriptions
- Payment tracking
- Refunds & disputes
- Revenue metrics
- Customer lifetime value

### **4. Facebook Ads Manager**
- All ad accounts
- Campaign creation & management
- Performance metrics
- Budget allocation
- Ad optimization

---

## 🎯 **COMPLETE ADMIN DASHBOARD STRUCTURE:**

### **NAVIGATION (Left Sidebar):**

1. **📊 Overview** - Key metrics & alerts
2. **👥 Customers** - All customer accounts
3. **📢 Campaigns** - Manage all ad campaigns
4. **🎯 Leads** - All leads across customers
5. **💬 Messages** - Support & customer communication
6. **💰 Billing** - Revenue, subscriptions, refunds
7. **📈 Analytics** - Platform performance
8. **🔗 Integrations** - Facebook, Google, WhatsApp setup
9. **👨‍💼 Team** - Admin users & permissions
10. **⚙️ Settings** - System configuration

---

## 📋 **PAGE-BY-PAGE BREAKDOWN:**

### **1. OVERVIEW (Admin Home)**

**Top Metrics Cards:**
- Total Customers: 47
- Active Subscriptions: 42
- Leads Delivered (Today): 127
- Monthly Revenue: ₹6,29,958
- Ad Spend (Today): ₹42,350
- Profit Margin: 33%

**Alerts & Notifications:**
- 🔴 3 campaigns need attention (low performance)
- ⚠️ 2 customers approaching quota limit
- ✅ 5 new signups today
- 💰 4 subscription renewals tomorrow

**Recent Activity:**
- New customer: "XYZ Interiors" signed up (Growth Plan)
- Lead delivered: Rajesh Kumar → ABC Real Estate
- Campaign optimized: 3BHK Andheri (CPL reduced to ₹280)
- Refund processed: Invalid lead for PQR Insurance
- Subscription renewed: ABC Real Estate (₹14,999)

**Quick Actions:**
- Create campaign for new customer
- Review pending refund requests
- Check low-performing campaigns
- Export today's revenue report

---

### **2. CUSTOMERS PAGE**

**Customer Table:**
```
| Customer         | Plan    | Status  | Leads  | Quota | MRR     | Actions      |
|------------------|---------|---------|--------|-------|---------|--------------|
| ABC Real Estate  | Growth  | Active  | 48/50  | 96%   | ₹14,999 | [View] [Edit]|
| XYZ Insurance    | Pro     | Active  | 115/120| 96%   | ₹29,999 | [View] [Edit]|
| PQR Education    | Starter | Trial   | 18/20  | 90%   | ₹7,999  | [View] [Edit]|
| LMN Finance      | Growth  | Paused  | 0/50   | 0%    | ₹0      | [Activate]   |
```

**Filters:**
- Status: All / Active / Trial / Paused / Churned
- Plan: All / Starter / Growth / Professional
- Industry: All / Real Estate / Insurance / Education
- Sort: Name / MRR / Usage / Signup Date

**Customer Detail View (Click on customer):**
```
┌─────────────────────────────────────────────────────┐
│ ABC Real Estate - Customer Details                  │
├─────────────────────────────────────────────────────┤
│ Account Info:                                        │
│ • Customer ID: CUST-0123                            │
│ • Business: ABC Real Estate                         │
│ • Contact: Rahul Sharma                             │
│ • Phone: +91 98765 43210                            │
│ • Email: rahul@abcrealestate.com                    │
│ • Joined: Dec 15, 2023                              │
│                                                     │
│ Subscription:                                        │
│ • Plan: Growth Plan (₹14,999/month)                │
│ • Status: Active                                    │
│ • Leads Quota: 50/month                             │
│ • Current Period: Jan 15 - Feb 15                   │
│ • Usage: 48/50 (96%)                                │
│ • Auto-renewal: ON                                  │
│ • Next billing: Feb 15, 2024                        │
│                                                     │
│ Lead Preferences:                                    │
│ • Property Types: 2BHK, 3BHK, 4BHK                  │
│ • Budget: ₹50L - ₹1.5Cr                            │
│ • Areas: Andheri, BKC, Powai, Bandra               │
│ • Timeline: Immediate, 1 month, 3 months           │
│                                                     │
│ Campaigns (3 Active):                               │
│ • 3BHK Andheri Campaign (FB) - 28 leads, ₹302 CPL │
│ • Luxury BKC (Google) - 16 leads, ₹625 CPL        │
│ • Budget Homes (FB) - Paused                       │
│                                                     │
│ Performance:                                         │
│ • Leads Delivered: 48 this month                    │
│ • Contact Rate: 92%                                 │
│ • Conversion Rate: 16.7%                            │
│ • Customer Satisfaction: 4.8/5                      │
│                                                     │
│ Revenue:                                             │
│ • Lifetime Value: ₹89,994 (6 months)               │
│ • Monthly: ₹14,999                                  │
│ • Ad Spend Allocated: ₹10,000/month                │
│ • Our Margin: ₹4,999/month                         │
│                                                     │
│ [Edit Profile] [Manage Subscription] [View Leads]  │
│ [Pause Account] [Contact Customer]                  │
└─────────────────────────────────────────────────────┘
```

---

### **3. CAMPAIGNS PAGE (Admin View)**

**All Campaigns Across All Customers:**

**View Options:**
- By Customer
- By Platform (Facebook / Google)
- By Status (Active / Paused / Completed)
- By Performance (High / Medium / Low)

**Campaign Table:**
```
| Campaign                | Customer        | Platform | Status | Leads | CPL   | Budget | Spent  | Actions        |
|-------------------------|-----------------|----------|--------|-------|-------|--------|--------|----------------|
| 3BHK Andheri Campaign   | ABC Real Estate | Facebook | Active | 28    | ₹302  | ₹15K   | ₹8.5K  | [View] [Edit]  |
| Health Insurance Leads  | XYZ Insurance   | Google   | Active | 45    | ₹215  | ₹20K   | ₹9.7K  | [View] [Edit]  |
| JEE Coaching Students   | PQR Education   | Facebook | Low    | 12    | ₹450  | ₹10K   | ₹5.4K  | [Optimize]     |
```

**Campaign Creation Wizard (For Customer):**
```
Step 1: Select Customer
└─ Dropdown: ABC Real Estate ▼

Step 2: Choose Platform
├─ [Facebook Ads] ✓
└─ [Google Ads]

Step 3: Campaign Settings
├─ Campaign Name: ___________
├─ Budget: ₹_________/month
├─ Target Audience:
│  ├─ Location: Mumbai, Thane
│  ├─ Age: 28-55
│  ├─ Interests: Real Estate, Property
│  └─ Income: Top 25%
│
└─ Lead Form Fields:
   ├─ Name, Phone, Email (required)
   ├─ Property Type (2BHK/3BHK/4BHK)
   ├─ Budget Range
   ├─ Preferred Location
   └─ Timeline

Step 4: Ad Creative
├─ Headline: ___________
├─ Description: ___________
├─ Image: [Upload]
└─ CTA: "Get Details"

Step 5: Review & Launch
├─ Preview ad
├─ Estimated reach: 45,000-52,000
├─ Estimated CPL: ₹280-₹350
├─ Expected leads: 40-50/month
└─ [Launch Campaign]
```

**Campaign Performance Details:**
- Impressions: 45,230
- Clicks: 892 (CTR: 1.97%)
- Leads: 28
- CPL: ₹302
- Form submissions: 32
- Valid leads: 28 (87.5% quality)
- Invalid/rejected: 4
- Audience demographics
- Device breakdown
- Time-of-day performance
- Geographic distribution

---

### **4. LEADS PAGE (All Leads)**

**Global Lead Dashboard:**

**Filters:**
- Customer: All / ABC Real Estate / XYZ Insurance
- Status: All / Delivered / Pending / Rejected
- Quality Score: All / 90+ / 80-90 / Below 80
- Date Range: Today / This Week / This Month
- Source: All / Facebook / Google

**Lead Table:**
```
| Lead ID | Name          | Customer        | Score | Status    | Delivered | Actions          |
|---------|---------------|-----------------|-------|-----------|-----------|------------------|
| L-1234  | Rajesh Kumar  | ABC Real Estate | 92    | Delivered | 5 min ago | [View] [Edit]    |
| L-1235  | Priya Sharma  | ABC Real Estate | 88    | Delivered | 2h ago    | [View] [Edit]    |
| L-1236  | Invalid Lead  | XYZ Insurance   | 42    | Rejected  | Today     | [Review] [Delete]|
```

**Lead Processing:**
- New lead captured from Facebook
- AI qualification (score 0-100)
- If score < 70: Mark as low quality, review needed
- If score 70-89: Deliver to customer
- If score 90+: Mark as "Hot Lead"
- Deliver to customer dashboard instantly
- Send WhatsApp notification to customer

**Bulk Actions:**
- Deliver selected leads to customer
- Reject low-quality leads
- Reassign to different customer
- Export leads (CSV)
- Delete leads

---

### **5. MESSAGES/SUPPORT PAGE**

**Customer Support Inbox:**

**Tabs:**
- All Messages
- Open Tickets
- Resolved
- Urgent

**Support Tickets:**
```
| Ticket | Customer        | Subject                | Priority | Status | Last Update |
|--------|-----------------|------------------------|----------|--------|-------------|
| #245   | ABC Real Estate | Low quality lead       | High     | Open   | 2h ago      |
| #244   | XYZ Insurance   | Need more health leads | Medium   | Open   | 1d ago      |
| #243   | PQR Education   | Change service areas   | Low      | Closed | 2d ago      |
```

**Ticket Detail:**
- Full conversation thread
- Customer details
- Related leads/campaigns
- Internal notes (not visible to customer)
- Assign to team member
- Change priority/status
- Quick actions (refund, add leads, adjust campaign)

---

### **6. BILLING/REVENUE PAGE**

**Revenue Dashboard:**

**Top Metrics:**
- MRR (Monthly Recurring Revenue): ₹6,29,958
- Total Revenue (This Month): ₹6,29,958
- Total Ad Spend: ₹4,20,000
- Gross Profit: ₹2,09,958 (33%)
- New MRR (This Month): ₹44,997 (3 new customers)
- Churned MRR: ₹14,999 (1 customer left)
- Net New MRR: ₹29,998

**Subscription Overview:**
- Active Subscriptions: 42
- Trial Subscriptions: 8
- Paused: 3
- Cancelled: 2

**Revenue Breakdown by Plan:**
- Starter (₹7,999): 15 customers = ₹1,19,985
- Growth (₹14,999): 22 customers = ₹3,29,978
- Professional (₹29,999): 5 customers = ₹1,49,995

**Upcoming Renewals:**
- Tomorrow: 4 customers (₹59,996)
- This Week: 12 customers (₹1,79,988)
- This Month: 28 customers (₹4,19,972)

**Failed Payments:**
- ABC Real Estate: Payment failed (retry scheduled)
- LMN Finance: Card expired (email sent)

**Refund Requests:**
- Pending: 2 (₹420 + ₹280)
- Approved This Month: 5 (₹1,750)
- Rejected: 1

---

### **7. ANALYTICS PAGE**

**Platform Performance:**

**Lead Metrics:**
- Total Leads Generated: 2,347 (this month)
- Delivered to Customers: 2,240
- Pending Quality Review: 42
- Rejected (Low Quality): 65 (2.8%)
- Average Quality Score: 84/100
- Refund Rate: 1.2%

**Campaign Metrics:**
- Total Campaigns: 127
- Active: 95
- Paused: 18
- Completed: 14
- Average CPL: ₹285
- Best CPL: ₹180 (Education)
- Worst CPL: ₹625 (Luxury Real Estate)

**Customer Metrics:**
- Total Customers: 55
- Active: 42 (76%)
- Trial: 8 (15%)
- Churned: 5 (9%)
- Average Satisfaction: 4.6/5
- Net Promoter Score (NPS): 62

**Financial Metrics:**
- Total Revenue: ₹6,29,958
- Total Ad Spend: ₹4,20,000
- Gross Margin: ₹2,09,958 (33%)
- CAC (Customer Acquisition Cost): ₹8,500
- LTV (Lifetime Value): ₹89,994 (avg 6 months)
- LTV:CAC Ratio: 10.6:1 (excellent!)
- Churn Rate: 8% (target: <10%)

**Charts:**
- Revenue trend (last 6 months)
- Customer growth
- Lead volume over time
- CPL trend by industry
- Customer satisfaction trend

---

### **8. INTEGRATIONS PAGE**

**Connected Accounts:**

**Facebook:**
- Ad Account: Connected ✅
- Status: Active
- Campaigns: 68 active
- Spend Today: ₹28,450
- [Reconnect] [Settings] [View in Facebook]

**Google Ads:**
- Ad Account: Connected ✅
- Status: Active
- Campaigns: 27 active
- Spend Today: ₹13,900
- [Reconnect] [Settings] [View in Google]

**WhatsApp Business:**
- Account: Connected ✅
- Phone: +91 91234 56789
- Messages Sent Today: 127
- Template Status: 8 approved, 2 pending
- [Manage Templates] [View Logs]

**Razorpay:**
- Account: Connected ✅
- Status: Active
- Transactions Today: 4
- Amount: ₹59,996
- [View Dashboard] [Settings]

**Supabase:**
- Database: Connected ✅
- Status: Healthy
- Storage Used: 2.3 GB / 10 GB
- [View Database] [Manage]

---

### **9. TEAM PAGE**

**Team Members:**
```
| Name          | Role              | Permissions            | Last Active | Actions      |
|---------------|-------------------|------------------------|-------------|--------------|
| You           | Owner             | All access             | Just now    | -            |
| Campaign Mgr  | Campaign Manager  | Campaigns, Leads       | 10 min ago  | [Edit] [Remove]|
| Support Agent | Customer Support  | Messages, Customers    | 1h ago      | [Edit] [Remove]|
```

**Roles & Permissions:**
- **Owner**: Full access to everything
- **Admin**: All except billing
- **Campaign Manager**: Create/manage campaigns, view leads
- **Support Agent**: Customer communication, view customer details
- **Analyst**: View-only access to analytics
- **Finance**: Billing & revenue only

**Add Team Member:**
- Name, Email
- Role selection
- Permission customization
- Send invitation email

---

### **10. SETTINGS PAGE**

**Platform Configuration:**

**General Settings:**
- Platform name: Transition Marketing AI
- Support email: support@transitionmarketingai.com
- Support phone: +91 91234 56789
- Time zone: IST (UTC+5:30)
- Currency: INR (₹)
- Language: English

**Lead Quality Rules:**
- Minimum score: 70/100
- Auto-reject below: 60/100
- Hot lead threshold: 90+
- Quality guarantee: 7 days

**Scoring Criteria (Editable):**
- Budget verified: +25 points
- Urgent timeline: +20 points
- Location specific: +15 points
- Loan pre-approved: +20 points
- Complete form: +12 points
- Phone verified: +8 points

**Refund Policy:**
- Auto-approve refunds for score < 60
- Manual review for 60-70
- Refund window: 7 days
- Refund rate target: < 2%

**Notification Settings:**
- New signup: Email + Slack
- Campaign needs attention: Email
- Payment failed: Email + SMS
- Refund requested: Email
- Daily revenue summary: Email at 9 AM

**API & Webhooks:**
- API Key: **********************
- Webhook URL: https://api.transitionmarketingai.com/webhooks
- Facebook Webhook: Configured ✅
- Google Webhook: Configured ✅
- Razorpay Webhook: Configured ✅

---

## 🔥 **CRITICAL ADMIN FEATURES:**

### **Campaign Management:**
1. Create campaign for customer
2. Set budget from their subscription
3. Define targeting (location, demographics, interests)
4. Create lead form fields
5. Launch on Facebook/Google
6. Monitor performance daily
7. Optimize (adjust targeting, budget)
8. Pause/resume as needed

### **Lead Delivery:**
1. Receive lead from Facebook/Google webhook
2. Run AI qualification (score 0-100)
3. If score < 70: Reject or manual review
4. If score 70+: Deliver to customer
5. Send WhatsApp notification to customer
6. Track in customer's quota (48/50)
7. Customer sees lead in their dashboard instantly

### **Quality Management:**
1. Customer requests refund
2. Admin reviews lead quality
3. Check score, form data, phone validity
4. Approve/reject refund
5. If approved: Add replacement lead + credit
6. Track refund rate (must be < 2%)

### **Subscription Management:**
1. Customer signs up → Trial starts
2. After 7 days → First payment
3. Track usage (48/50 leads)
4. Monitor payment status
5. Handle failed payments (retry, email)
6. Process renewals
7. Handle upgrades/downgrades
8. Manage cancellations

---

## 💡 **ADMIN WORKFLOW EXAMPLES:**

### **Scenario 1: New Customer Signup**
1. Customer: "XYZ Insurance" signs up for Growth Plan
2. **Admin sees alert**: "New signup: XYZ Insurance"
3. **Admin action**: Create campaigns
   - Campaign 1: Health Insurance Leads (Facebook)
   - Campaign 2: Life Insurance Leads (Google)
4. Set budget: ₹10,000/month (from their ₹14,999 subscription)
5. Define targeting: Age 30-50, Family interests, Mumbai
6. Launch campaigns
7. **Result**: Leads start flowing to customer dashboard

### **Scenario 2: Lead Delivered**
1. Facebook webhook: New lead captured
2. AI scores: 92/100
3. **Admin sees**: Lead passes quality check
4. **System automatically**: Delivers to ABC Real Estate dashboard
5. **System automatically**: Sends WhatsApp to Rahul: "New lead: Rajesh Kumar (92/100)"
6. **Admin can monitor**: Lead appeared in customer dashboard

### **Scenario 3: Refund Request**
1. Customer: "Lead phone number invalid"
2. **Admin sees ticket**: Refund request from ABC Real Estate
3. **Admin reviews**: Lead L-1234, phone +91 9876543210
4. **Admin tests**: Call phone → number doesn't exist
5. **Admin approves**: Refund + replacement lead
6. **System**: Credits customer (doesn't count toward 50 quota)
7. **System**: Sends replacement lead
8. **Admin tracks**: Refund rate now 1.3% (still under 2% target)

---

## 📊 **RECOMMENDED ADDITIONS TO CUSTOMER DASHBOARD:**

### **What's Missing:**

1. **Customer Feedback Widget**
   - Rate this lead (1-5 stars)
   - Report issue
   - Request refund

2. **Lead Notes**
   - Add internal notes per lead
   - Track conversation history
   - Set reminders

3. **Lead Status Pipeline**
   - New → Contacted → Qualified → Proposal → Won/Lost
   - Drag-and-drop status change
   - Visual pipeline board

4. **Export Options**
   - Export all leads to CSV
   - Export by date range
   - Export by status

5. **Onboarding Checklist**
   - ✅ Account created
   - ✅ Preferences set
   - ⏳ First lead received
   - ⏳ First lead contacted
   - ⏳ First deal closed

6. **Help & Support**
   - Live chat widget
   - Knowledge base
   - Video tutorials
   - "Contact Support" button

---

## 🎯 **BUSINESS MODEL RECOMMENDATIONS:**

### **Current Model:**
- Customer pays ₹14,999/month
- Gets 50 leads
- You spend ₹10K on ads
- Profit: ₹4,999/customer

### **Improvements:**

**1. Usage-Based Overage**
If customer uses all 50 leads before month ends:
- Offer additional leads at ₹400/lead
- Or upgrade to next plan
- **Extra revenue opportunity!**

**2. Lead Quality Tiers**
- Standard leads (score 70-85): Included in quota
- Premium leads (score 86-94): Count as 1 lead
- Hot leads (score 95-100): Count as 1.5 leads OR charge extra ₹200
- **Encourage quality over quantity**

**3. Performance Bonuses**
If customer closes deals from your leads:
- Customer shares success (optional)
- You can use as testimonial
- Offer referral bonus: Refer 3 businesses, get 10 free leads
- **Build case studies & social proof**

**4. Add-On Services**
- Premium WhatsApp support: +₹2,000/month
- Dedicated account manager: +₹5,000/month
- Custom landing pages: +₹3,000/month
- CRM integration: +₹2,500/month
- **Increase ARPU (Average Revenue Per User)**

**5. Annual Plans (Discount)**
- Growth Plan: ₹14,999/month OR ₹1,49,990/year (save ₹29,998)
- Locks in customer for 12 months
- Improves cash flow
- Reduces churn

---

## 📋 **MISSING FEATURES TO ADD:**

### **Customer Dashboard:**
1. ✅ Lead scoring transparency (you built this!)
2. ❌ Lead feedback/rating widget
3. ❌ Drag-and-drop status pipeline
4. ❌ CSV export
5. ❌ Help widget (bottom right)
6. ❌ Onboarding checklist
7. ❌ Message templates library (more templates)
8. ❌ Schedule follow-up reminders
9. ❌ Team member invitation (for higher plans)
10. ❌ Deal tracking (won/lost with revenue amount)

### **Admin Dashboard:**
1. ❌ Complete admin dashboard (need to build!)
2. ❌ Campaign creation wizard
3. ❌ Customer management interface
4. ❌ Lead delivery automation view
5. ❌ Refund request handling
6. ❌ Revenue analytics
7. ❌ Team management
8. ❌ System settings

---

## 🚀 **NEXT STEPS:**

**1. Logo & UI Updates** ✅ (DONE)
- New logo created
- Notifications as icon
- User profile dropdown

**2. Build Admin Dashboard** (NOW)
- Customer management
- Campaign creation
- Lead delivery tracking
- Billing & revenue
- Support tickets
- Analytics

**3. Add Missing Customer Features** (AFTER ADMIN)
- Lead feedback widget
- More templates
- Help widget
- Onboarding checklist

---

**Shall I now build the COMPLETE ADMIN DASHBOARD?**

It will have all 10 pages for you to manage the entire platform! 🔧

