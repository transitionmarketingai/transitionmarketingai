# 📋 Self-Service SaaS Model - Implementation Plan

## ✅ Business Model Decision: Self-Service SaaS

**Chosen Model:** Users connect their own ad accounts, platform automates campaigns

**Pricing:** ₹999-4,999/month (SaaS subscription)

**Free Trial:** 14 days platform access + AI Search

---

## 🎯 Implementation Phases

### **Phase 1: Update Pricing & Onboarding** ✅ IN PROGRESS
- [ ] Create pricing page with 3 tiers
- [ ] Update onboarding to show pricing
- [ ] Add "Skip to Free Trial" option
- [ ] Update dashboard to show plan limits

### **Phase 2: Add "Connect Ad Account" Flows**
- [ ] Facebook OAuth integration
- [ ] Instagram (via Facebook) OAuth
- [ ] Google Ads OAuth integration
- [ ] Account connection status in dashboard
- [ ] "Connect Account" CTAs on campaign pages

### **Phase 3: Campaign Templates**
- [ ] Pre-built campaign templates
- [ ] One-click campaign launch
- [ ] Automated targeting based on onboarding
- [ ] Budget recommendations

### **Phase 4: Free Trial Features**
- [ ] AI Search (unlimited during trial)
- [ ] Email/WhatsApp outreach (limited)
- [ ] Trial expiry notifications
- [ ] Upgrade prompts

### **Phase 5: Payment Integration**
- [ ] Razorpay subscription setup
- [ ] Plan upgrade/downgrade
- [ ] Invoice generation
- [ ] Payment failure handling

---

## 💰 Pricing Tiers

### **Starter - ₹999/month**
- Platform access
- 1 connected ad account
- AI Search: 500 contacts/month
- Email outreach: 1,000/month
- WhatsApp: 500/month
- Basic support

### **Growth - ₹2,999/month**
- Everything in Starter
- 3 connected ad accounts
- AI Search: 2,000 contacts/month
- Email outreach: 5,000/month
- WhatsApp: 2,000/month
- Priority support
- Campaign templates

### **Business - ₹4,999/month**
- Everything in Growth
- Unlimited ad accounts
- AI Search: Unlimited
- Email/WhatsApp: Unlimited
- Dedicated support
- API access
- Custom integrations

### **14-Day Free Trial**
- All Growth features
- No credit card required
- AI Search: 100 contacts
- Email/WhatsApp: 500 each

---

## 🔄 User Journey

### **Day 1: Sign Up**
1. User visits landing page
2. Clicks "Start Free Trial"
3. Completes 4-step onboarding
4. Lands on dashboard with trial banner

### **Day 1-3: Explore Platform**
1. Runs AI Search → Gets real leads
2. Sees campaign pages with "Connect Account" prompts
3. Tries email/WhatsApp outreach
4. Views analytics

### **Day 4-7: Connect Accounts (Optional)**
1. User decides to try paid ads
2. Clicks "Connect Facebook Account"
3. OAuth flow → Account connected
4. Creates first campaign from template
5. Platform automates targeting & optimization

### **Day 8-14: See Results**
1. Leads start coming in
2. User sees value in platform
3. Gets upgrade prompts
4. Trial expiry reminders

### **Day 15: Convert to Paid**
1. Trial expires → Limited access
2. "Upgrade Now" CTA
3. Selects plan (Starter/Growth/Business)
4. Razorpay payment
5. Full access restored

---

## 🎨 UI Changes Needed

### **Landing Page**
- Clear pricing section
- "Start Free Trial" CTA
- No credit card required badge
- Plan comparison table

### **Onboarding**
- Add plan selection step (optional, defaults to trial)
- Show what's included in trial
- "Skip to Dashboard" option

### **Dashboard**
- Trial banner at top
- Days remaining counter
- Upgrade CTA
- Plan limits display

### **Campaign Pages**
- "Connect Account" button (if not connected)
- OAuth flow modal
- Connection status indicator
- "Launch Campaign" button (when connected)

### **Settings**
- "Billing & Plans" tab
- Current plan display
- Usage meters (AI searches, outreach sent)
- Upgrade/downgrade options

---

## 🔗 Ad Account Connection Flow

### **Facebook/Instagram**
```
1. User clicks "Connect Facebook"
2. OAuth popup opens
3. User authorizes app
4. We get access token
5. Save to database
6. Show "Connected ✅"
7. Enable campaign creation
```

### **Google Ads**
```
1. User clicks "Connect Google Ads"
2. OAuth popup opens
3. User selects ad account
4. We get refresh token
5. Save to database
6. Show "Connected ✅"
7. Enable campaign creation
```

---

## 📊 Free Trial Strategy

### **What's Free:**
- ✅ Full platform access (14 days)
- ✅ AI Search (100 contacts)
- ✅ Email outreach (500 emails)
- ✅ WhatsApp outreach (500 messages)
- ✅ Campaign templates
- ✅ Analytics & reports

### **What Requires Payment:**
- ❌ Ad spend (they pay Facebook/Google directly)
- ❌ After 14 days (must upgrade)
- ❌ Exceeding trial limits

### **Why This Works:**
- Low cost for us (AI Search ~₹50-100/user)
- User gets real value (100 leads for free)
- If they want more → they upgrade
- If they want ads → they connect accounts (no cost to us)

---

## 🚀 Next Steps (In Order)

### **Step 1: Pricing Page** ⏳ NEXT
Create `/pricing` page with 3 tiers

### **Step 2: Update Onboarding**
Add plan selection step

### **Step 3: Trial Banner**
Add to dashboard layout

### **Step 4: Connect Account Buttons**
Add to Facebook/Instagram/Google pages

### **Step 5: OAuth Flows**
Implement Facebook & Google OAuth

### **Step 6: Payment Integration**
Razorpay subscriptions

---

## 💡 Key Advantages

### **For Users:**
✅ Try before they buy (14-day trial)
✅ No upfront ad spend
✅ Full control of their accounts
✅ Transparent pricing
✅ Cancel anytime

### **For You:**
✅ Zero cash flow risk
✅ Predictable SaaS revenue
✅ Highly scalable (no manual work)
✅ Standard payment model
✅ Can start with 0 capital

---

## 📈 Revenue Projections

### **Conservative (First 3 Months):**
- 100 trial signups/month
- 20% conversion rate
- Avg plan: ₹2,000/month

**Month 1:** 20 customers × ₹2,000 = **₹40,000 MRR**
**Month 2:** 40 customers × ₹2,000 = **₹80,000 MRR**
**Month 3:** 60 customers × ₹2,000 = **₹120,000 MRR**

### **Optimistic (Month 6):**
- 500 trial signups/month
- 25% conversion rate
- Avg plan: ₹2,500/month

**Month 6:** 300+ customers × ₹2,500 = **₹750,000 MRR**

---

**Current Status:** ✅ Dashboard built, ready for pricing & OAuth integration

**Next Action:** Create pricing page → Update onboarding → Add OAuth flows

