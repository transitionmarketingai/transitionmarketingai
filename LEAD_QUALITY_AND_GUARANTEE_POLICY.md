# Lead Quality Guarantee & Risk Management Policy

## 🎯 THE TWO PROBLEMS

### Problem 1: Customer unhappy with lead quality
**Scenario**: Customer says "These leads are not good, I can't reach them" or "They're not interested"

### Problem 2: Can't deliver promised quota
**Scenario**: Customer paid for 50 leads/month but you only generated 30 leads

---

## ✅ SOLUTION 1: LEAD QUALITY GUARANTEE (Copy HomeAdvisor Model)

### What Makes a "Valid Lead"?

Define EXACTLY what qualifies as a valid lead:

**Valid Lead Criteria** (Customer gets charged):
1. ✅ Contact information is accurate (phone/email works)
2. ✅ Lead matches target criteria (location, budget, timeline)
3. ✅ Lead expressed genuine interest (filled form, engaged with chatbot)
4. ✅ Lead is reachable (not a fake number, responds to messages)
5. ✅ Lead submitted within last 24-48 hours (fresh)
6. ✅ Lead is not a duplicate (same person within 90 days)

**Invalid Lead** (Customer gets refund/credit):
1. ❌ Phone number doesn't work / wrong number
2. ❌ Email bounces back
3. ❌ Lead says "I never filled this form" (fraud)
4. ❌ Lead is completely outside target criteria
5. ❌ Duplicate lead (sent to same customer before)
6. ❌ Lead is from competitor trying to waste time

---

## 💰 REFUND & CREDIT POLICY

### Money-Back Guarantee (30 Days)

**Copy Thumbtack's Policy**:

```
Lead Quality Guarantee:

If you're not satisfied with a lead, report it within 7 days and we'll:

1. Automatic Credit (No questions asked):
   - Phone doesn't work: Full credit
   - Email bounces: Full credit
   - Duplicate lead: Full credit
   - Wrong location/criteria: Full credit

2. Review Required:
   - "Lead not interested": We review conversation
   - "Lead didn't respond": We check if you contacted within 24hrs
   - "Lead quality poor": We review against criteria

3. How Credits Work:
   - Credit goes back to your account
   - Use credits for additional leads
   - Or apply to next month's bill
   - No cash refunds (credits only)

4. Abuse Prevention:
   - Max 20% of leads can be disputed per month
   - If >30% disputed, we review your account
   - Pattern of abuse = account suspension
```

---

## 📊 IMPLEMENTATION IN DATABASE

Add to database schema:

```sql
-- Lead Disputes
CREATE TABLE lead_disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id),
  lead_id UUID REFERENCES leads(id),
  
  -- Dispute Details
  dispute_reason TEXT NOT NULL, 
  -- 'phone_invalid', 'email_invalid', 'not_interested', 
  -- 'wrong_criteria', 'duplicate', 'fraud', 'no_response', 'other'
  
  dispute_description TEXT,
  evidence JSONB, -- Screenshots, conversation logs, etc.
  
  -- Resolution
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'resolved'
  resolution TEXT,
  resolved_by UUID, -- Admin who resolved
  resolved_at TIMESTAMP,
  
  -- Action Taken
  credit_amount INTEGER, -- In paise
  credit_issued BOOLEAN DEFAULT FALSE,
  credit_issued_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lead Credits
CREATE TABLE lead_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  customer_id UUID REFERENCES customers(id),
  
  -- Credit Details
  credit_amount INTEGER NOT NULL, -- In paise or lead count
  credit_type TEXT, -- 'disputed_lead', 'quota_shortfall', 'goodwill', 'promotion'
  
  reason TEXT,
  related_lead_id UUID REFERENCES leads(id),
  related_dispute_id UUID REFERENCES lead_disputes(id),
  
  -- Usage
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  used_for TEXT,
  
  -- Expiry
  expires_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Update subscriptions table to track credits
ALTER TABLE subscriptions ADD COLUMN available_credits INTEGER DEFAULT 0;
```

---

## 🎯 SOLUTION 2: QUOTA FULFILLMENT GUARANTEE

### What if you can't deliver 50 leads?

**Tiered Approach** (Best Practice):

### Option A: Prorated Pricing (Recommended)

**How it works**:
```
Customer Plan: Growth (₹14,999/month for 50 leads)
Price per lead: ₹14,999 ÷ 50 = ₹299.98 per lead

Month 1:
- Delivered: 35 leads only
- Charge: 35 × ₹300 = ₹10,500 (instead of ₹14,999)
- Savings to customer: ₹4,499

Month 2:
- Delivered: 52 leads
- Included: 50 leads = ₹14,999
- Overage: 2 leads × ₹400 = ₹800
- Total charge: ₹15,799
```

**Pros**:
- Fair to customer (pay for what you get)
- Reduces refund requests
- Builds trust

**Cons**:
- Unpredictable revenue
- Need good tracking system

---

### Option B: Rollover System (Like Mobile Data Plans)

**How it works**:
```
Customer Plan: Growth (50 leads/month)

Month 1:
- Quota: 50 leads
- Delivered: 35 leads
- Rollover to next month: 15 leads

Month 2:
- Base quota: 50 leads
- Rollover: +15 leads
- Total available: 65 leads
- Delivered: 58 leads
- Rollover to next month: 7 leads

Rollover Rules:
- Max rollover: 50% of monthly quota (25 leads for Growth plan)
- Expires after 2 months
- Only for unused quota, not purchased overages
```

**Pros**:
- Keeps monthly revenue stable
- Customer feels they get value
- Less refund pressure

**Cons**:
- Some months you need to deliver more
- Tracking complexity

---

### Option C: Minimum Guarantee + Prorated (BEST!)

**Combine both approaches**:

```
Growth Plan: ₹14,999/month
Minimum Guarantee: 30 leads (60% of quota)
Full Quota: 50 leads

Scenario 1: Delivered 45 leads
- Customer charged: Full ₹14,999 ✓
- Reason: Above minimum guarantee
- Customer happy: Got 90% of quota

Scenario 2: Delivered 25 leads (below minimum)
- Option A: Prorated charge (25 × ₹300 = ₹7,500)
- Option B: Full charge but 25 lead credit for next month
- Option C: Refund ₹7,500 + apologize + offer goodwill credit

Scenario 3: Delivered 55 leads
- Included: 50 leads = ₹14,999
- Bonus: 5 extra leads (free! builds goodwill)
- Or charge: 5 × ₹400 = ₹2,000
```

**This is what I recommend** ⭐

---

## 📋 CLEAR TERMS OF SERVICE

### What Customer Agrees To:

```markdown
## Lead Delivery Terms

1. **Lead Quota**:
   - Your plan includes X qualified leads per month
   - Leads are delivered throughout the month
   - We guarantee minimum 60% of quota (e.g., 30 of 50 leads)

2. **Lead Quality**:
   - All leads are AI-verified for quality
   - Leads match your target criteria
   - Contact information is validated
   - Fresh leads (delivered within 24 hours of capture)

3. **Lead Validity**:
   - You have 7 days to dispute a lead
   - Valid disputes receive automatic credit
   - Credits can be used for additional leads

4. **Quota Shortfall**:
   - If we deliver <60% of quota, you get:
     • Prorated billing (pay only for leads delivered)
     • OR credits for next month
     • OR partial refund
   - If we deliver 60-100% of quota:
     • You pay full monthly fee
     • Unused leads roll over (max 50% of quota)

5. **Lead Response**:
   - You must contact leads within 48 hours
   - We track your response time
   - Poor response = lower quality scores for you

6. **Refund Policy**:
   - Credits issued for invalid leads
   - Prorated billing if quota not met
   - No cash refunds, credits only
   - Trial period: Full refund if not satisfied
```

---

## 🛡️ RISK MITIGATION STRATEGIES

### For YOU (Platform Owner):

### 1. **Start Conservative**

```
Don't overpromise!

Instead of:
❌ "Get 50 leads guaranteed!"

Say:
✅ "Get UP TO 50 qualified leads per month"
✅ "Target: 50 leads (minimum 30 guaranteed)"
✅ "Average: 45-55 leads per month"

Set expectations right:
- "Results may vary by location and industry"
- "Lead volume depends on market demand"
- "We optimize campaigns for quality over quantity"
```

### 2. **Build Buffer Into Pricing**

```
Don't price at exact cost!

Your cost per lead: ₹280
Don't charge: ₹280 × 50 = ₹14,000

Charge: ₹14,999 (buffer of ₹999)

This ₹999 buffer covers:
- Lead disputes and refunds
- Months when you deliver >50 leads
- Quality variations
- Customer acquisition cost
```

### 3. **Quality Over Quantity**

```
Better to:
✅ Deliver 35 GREAT leads
Than:
❌ Deliver 50 mediocre leads

Why?
- Customer converts more = stays longer
- Less disputes = less headache
- Better testimonials = easier sales
- Higher LTV = more profitable
```

### 4. **Transparent Dashboard**

Show customers EXACTLY what they're getting:

```
Dashboard should show:

This Month:
✓ 32 leads delivered (64% of quota)
✓ Average quality score: 78/100
✓ Your contact rate: 88% (28 of 32 contacted)
✓ Conversion rate: 12% (4 customers closed)

Lead Status:
✓ 28 contacted
✓ 4 converted to customers
✓ 0 disputed
✓ 18 remaining quota

Campaign Performance:
✓ Facebook: 20 leads (avg quality: 82)
✓ Google: 12 leads (avg quality: 75)
✓ Cost per lead: ₹295
```

This transparency builds trust!

### 5. **Proactive Communication**

**If having a bad month**:

```
Email/WhatsApp to customer (Day 20 of month):

"Hi [Name],

Quick update on your campaign this month:

✓ 22 leads delivered so far (target: 50)
⚠️ We're seeing lower-than-expected response rates

Here's what we're doing:
• Adjusted targeting to focus on higher-intent audiences
• Testing new ad creatives
• Increased daily budget by 20%

Expected by month-end: 38-42 leads

If we don't hit 30 leads (our minimum guarantee), you'll get:
• Prorated billing, OR
• Rollover credits for next month

Questions? Reply to this message or call: [number]

Best,
[Your Team]"
```

**This proactive approach**:
- Shows you care
- Manages expectations
- Reduces disputes
- Builds trust

---

## 💡 BEST PRACTICE: HYBRID APPROACH

### What I Recommend:

**Tier Structure With Guarantees**:

```
STARTER (₹7,999/month):
• Target: 20 leads
• Minimum Guarantee: 12 leads (60%)
• If <12: Prorated billing
• If 12-20: Full charge, unused rollover
• If >20: Free bonus (goodwill)

GROWTH (₹14,999/month):
• Target: 50 leads
• Minimum Guarantee: 30 leads (60%)
• If <30: Prorated billing OR full credit next month
• If 30-50: Full charge, unused rollover (max 25)
• If >50: First 5 extra free, then ₹400 each

PROFESSIONAL (₹29,999/month):
• Target: 120 leads
• Minimum Guarantee: 75 leads (62.5%)
• If <75: Prorated + ₹5,000 goodwill credit
• If 75-120: Full charge, unused rollover (max 60)
• If >120: First 10 extra free, then ₹350 each
```

---

## 📊 FINANCIAL IMPACT

### Scenario Analysis:

**Assume 100 customers on Growth plan (₹14,999/month)**

**Scenario 1: Perfect Execution**
```
All customers get 50 leads:
Revenue: 100 × ₹14,999 = ₹14,99,900/month
Cost: 100 × 50 × ₹280 = ₹14,00,000
Gross Profit: ₹99,900 (6.7% margin)
```

**Scenario 2: 80% Delivery Rate**
```
Average delivery: 40 leads per customer

With Prorated Billing:
Revenue: 100 × 40 × ₹300 = ₹12,00,000
Cost: 100 × 40 × ₹280 = ₹11,20,000
Gross Profit: ₹80,000 (6.7% margin)

With Rollover System:
Revenue: 100 × ₹14,999 = ₹14,99,900 (full)
Cost: ₹11,20,000
But owe: 1,000 leads next month (need to deliver extra)
```

**Scenario 3: Quality Issues (10% dispute rate)**
```
Delivered: 5,000 leads to 100 customers
Disputed: 500 leads (10%)
Credits issued: 500 × ₹300 = ₹1,50,000

Revenue: ₹14,99,900
Cost: ₹14,00,000
Credits: -₹1,50,000
Net: -₹50,100 (LOSS!)

This is why quality matters!
```

---

## ✅ FINAL RECOMMENDATIONS

### 1. **Set Clear Expectations**
- "Up to X leads" not "X leads guaranteed"
- Minimum guarantee at 60% of quota
- Quality over quantity focus

### 2. **Implement Tiered Guarantees**
- Minimum delivery threshold (60%)
- Prorated billing if below minimum
- Rollover system for 60-100% delivery
- Free bonus for over-delivery

### 3. **Lead Quality Standards**
- Clear definition of valid lead
- 7-day dispute window
- Automatic credits for obvious issues
- Review process for subjective disputes

### 4. **Financial Protection**
- Build 10-15% buffer in pricing
- Max 20% disputes allowed per customer
- Credits instead of cash refunds
- Goodwill credits for retention

### 5. **Transparency & Communication**
- Real-time dashboard showing progress
- Weekly updates to customers
- Proactive communication if underdelivering
- Celebrate when over-delivering

### 6. **Trial Period Safety**
- 7-day trial with 5-10 sample leads
- No payment needed during trial
- If they're unhappy, they cancel (no loss to you)
- Only charge after they see results

---

## 🎯 IMPLEMENTATION IN YOUR PLATFORM

### Add to Customer Dashboard:

```typescript
// Show quota status with guarantees
{
  plan: "Growth",
  monthly_fee: 1499900,
  target_leads: 50,
  minimum_guarantee: 30,
  delivered_this_month: 32,
  quota_status: "on_track", // 'on_track', 'below_target', 'at_risk'
  projected_month_end: 48,
  
  billing_status: {
    will_charge_full: true,
    reason: "Above minimum guarantee",
    rollover_available: 0
  },
  
  quality_metrics: {
    average_score: 78,
    your_contact_rate: 88,
    your_conversion_rate: 12.5
  }
}
```

---

## 💬 CUSTOMER-FACING MESSAGING

### In Dashboard:

```
📊 Your Lead Status

This Month: 32 of 50 leads delivered (64%)
Minimum Guarantee: 30 leads ✓ (Met!)

Quality Score: 78/100 (Good!)
Your Performance:
  • 28 of 32 contacted (88%) ✓
  • 4 converted (12.5% conversion) 🎉

Projected Month-End: 45-50 leads

You're on track! We'll deliver your full quota.

[View All Leads] [Dispute a Lead]
```

### If Underdelivering:

```
⚠️ Important Update

This Month: 22 of 50 leads delivered (44%)
Below Minimum Guarantee (30 leads)

What This Means:
• If we don't hit 30 leads by month-end
• You'll only pay for leads delivered
• Example: 28 leads = ₹8,400 (not ₹14,999)

What We're Doing:
✓ Optimized targeting
✓ New ad creatives
✓ Increased budget

Projected: 38-42 leads by month-end

Questions? [Chat with Support]
```

---

**BOTTOM LINE:**

✅ **Be honest and transparent**
✅ **Under-promise, over-deliver**
✅ **Have clear refund policy**
✅ **Prorated billing if you can't deliver**
✅ **Quality > Quantity always**

This protects BOTH you and the customer! 🛡️

Would you like me to implement these policies in the database and dashboard?

