# 🏗️ REVISED SYSTEM ARCHITECTURE
## Fully Automated Lead Generation & Qualification Platform

---

## 🎯 CORE CONCEPT:

**Self-Service, Fully Automated Lead Generation Platform where:**
1. Customer onboards → Sets up campaigns → Everything runs automatically
2. AI generates leads → Bulk outreach → Responses become verified leads
3. Ad inquiries → Directly to verified leads with chat
4. Zero manual work after setup

---

## 📊 COMPLETE SYSTEM FLOW:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER ONBOARDING                           │
│  Step 1: Business Info (industry, location, services)           │
│  Step 2: Target Audience (demographics, interests)              │
│  Step 3: Lead Gen Setup (AI scraping + Meta Ads + Google Ads)   │
│  Step 4: Outreach Templates (WhatsApp + Email)                  │
│  Step 5: Budget Allocation (split across channels)              │
│  Step 6: Launch (everything auto-starts)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  LEAD GENERATION (3 SOURCES)                     │
└─────────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
    ┌──────────┐        ┌──────────┐        ┌──────────┐
    │ AI WEB   │        │ META ADS │        │ GOOGLE   │
    │ SCRAPING │        │ (FB/IG)  │        │ ADS      │
    └────┬─────┘        └────┬─────┘        └────┬─────┘
         │                   │                    │
         ▼                   │                    │
  ┌─────────────┐            │                    │
  │  CONTACTS   │            │                    │
  │ (Unverified)│            │                    │
  │             │            │                    │
  │ - Name      │            │                    │
  │ - Email     │            │                    │
  │ - Phone     │            │                    │
  │ - Source    │            │                    │
  │ - Score     │            │                    │
  └──────┬──────┘            │                    │
         │                   │                    │
         ▼                   │                    │
  ┌─────────────┐            │                    │
  │  OUTREACH   │            │                    │
  │  CAMPAIGNS  │            │                    │
  │             │            │                    │
  │ WhatsApp ───┼─→ Send     │                    │
  │ Email ──────┼─→ Send     │                    │
  └──────┬──────┘            │                    │
         │                   │                    │
         ▼                   │                    │
    Response?                │                    │
         │                   │                    │
    ┌────┴────┐              │                    │
    │         │              │                    │
   YES       NO              │                    │
    │    (stays in           │                    │
    │     contacts)          │                    │
    │                        │                    │
    └────────┬───────────────┴────────────────────┘
             │
             ▼
      ┌─────────────┐
      │    LEADS    │
      │  (Verified) │
      │             │
      │ Segregated: │
      │ - Outreach  │
      │ - Meta Ads  │
      │ - Google    │
      │             │
      │ Features:   │
      │ - Chat      │
      │ - Status    │
      │ - Score     │
      │ - History   │
      └─────────────┘
```

---

## 🗂️ DATA MODEL:

### **1. CONTACTS (Unverified Leads)**
```
contacts
├─ id
├─ customer_id
├─ name
├─ email
├─ phone
├─ company
├─ title/role
├─ location (city, state)
├─ source ("ai_scraping", "manual_import")
├─ scrape_campaign_id
├─ quality_score (0-100, AI-generated)
├─ ai_analysis (insights from AI)
├─ outreach_status ("pending", "sent", "bounced", "responded", "no_response")
├─ outreach_attempts (count)
├─ last_outreach_date
├─ verification_status ("unverified", "verified", "invalid")
├─ converted_to_lead (boolean)
├─ converted_at (timestamp)
├─ created_at
└─ updated_at
```

### **2. LEADS (Verified)**
```
leads
├─ id
├─ customer_id
├─ name
├─ email
├─ phone
├─ source ("outreach_response", "meta_ads", "google_ads", "manual")
├─ original_contact_id (if from outreach)
├─ campaign_id
├─ lead_data (JSONB - form responses, interests, etc)
├─ quality_score (0-100)
├─ intent ("hot", "warm", "cold")
├─ ai_analysis (JSONB)
├─ status ("new", "contacted", "qualified", "meeting_scheduled", "proposal_sent", "won", "lost")
├─ assigned_to (team member)
├─ last_contact_at
├─ contact_count
├─ location
├─ platform_lead_id (Facebook/Google ID)
├─ received_at
└─ created_at
```

### **3. SCRAPING CAMPAIGNS**
```
scraping_campaigns
├─ id
├─ customer_id
├─ name
├─ status ("active", "paused", "completed")
├─ search_criteria (JSONB)
│  ├─ industry
│  ├─ job_titles
│  ├─ locations
│  ├─ company_size
│  └─ keywords
├─ sources (["linkedin", "google_maps", "directories"])
├─ frequency ("daily", "weekly")
├─ max_leads_per_run
├─ contacts_generated (count)
├─ last_run_at
├─ next_run_at
└─ created_at
```

### **4. OUTREACH CAMPAIGNS**
```
outreach_campaigns
├─ id
├─ customer_id
├─ name
├─ type ("whatsapp", "email")
├─ status ("draft", "scheduled", "running", "paused", "completed")
├─ target_contacts (contact_ids or filters)
├─ message_template
├─ variables (for personalization)
├─ schedule_type ("immediate", "scheduled", "drip")
├─ schedule_date
├─ sent_count
├─ delivered_count
├─ opened_count (email only)
├─ response_count
├─ conversion_count (contacts → leads)
├─ created_at
└─ launched_at
```

### **5. OUTREACH MESSAGES**
```
outreach_messages
├─ id
├─ outreach_campaign_id
├─ contact_id
├─ customer_id
├─ channel ("whatsapp", "email")
├─ message_content
├─ status ("pending", "sent", "delivered", "read", "responded", "failed")
├─ sent_at
├─ delivered_at
├─ read_at
├─ responded_at
├─ response_text
└─ error_message
```

### **6. AD CAMPAIGNS** (Meta/Google)
```
ad_campaigns
├─ id
├─ customer_id
├─ platform ("meta", "google")
├─ campaign_type ("lead_generation")
├─ status ("draft", "pending_approval", "active", "paused", "completed")
├─ budget_daily (INR)
├─ budget_total (INR)
├─ spent (INR)
├─ targeting (JSONB)
├─ ad_creative (JSONB)
├─ lead_form (JSONB)
├─ platform_campaign_id
├─ impressions
├─ clicks
├─ leads_generated
├─ cost_per_lead
├─ start_date
├─ end_date
└─ created_at
```

### **7. CONVERSATIONS**
```
conversations
├─ id
├─ lead_id
├─ customer_id
├─ channel ("platform_chat", "whatsapp", "email")
├─ status ("open", "closed")
├─ last_message_at
├─ unread_count
└─ created_at

messages
├─ id
├─ conversation_id
├─ sender ("customer", "lead", "system")
├─ message_text
├─ channel
├─ status ("sent", "delivered", "read")
├─ sent_at
└─ created_at
```

---

## 🎨 DASHBOARD STRUCTURE:

### **LEFT SIDEBAR NAVIGATION:**

```
🏠 Dashboard (Overview)
📇 Contacts (Unverified)
✅ Leads (Verified)
🎯 Campaigns
   ├─ AI Scraping
   ├─ Meta Ads
   └─ Google Ads
📤 Outreach
   ├─ WhatsApp Campaigns
   └─ Email Campaigns
💬 Conversations
📊 Analytics
⚙️ Settings
```

---

## 📱 PAGE BREAKDOWN:

### **1. DASHBOARD (Overview)**
```
┌────────────────────────────────────────┐
│ Today's Summary                         │
│ ├─ New Contacts: 45                    │
│ ├─ New Verified Leads: 12              │
│ ├─ Active Campaigns: 8                 │
│ └─ Response Rate: 18%                  │
├────────────────────────────────────────┤
│ Lead Generation Performance            │
│ [Chart: Contacts vs Leads over time]   │
├────────────────────────────────────────┤
│ Campaign Status                        │
│ AI Scraping    [●] Active  250/day     │
│ Meta Ads       [●] Active  ₹2.5k spent │
│ Google Ads     [●] Active  ₹1.8k spent │
├────────────────────────────────────────┤
│ Recent Activity                        │
│ • 12 new contacts from AI scraping     │
│ • 3 responses from WhatsApp campaign   │
│ • 2 new leads from Meta Ads            │
└────────────────────────────────────────┘
```

### **2. CONTACTS (Unverified)**
```
┌────────────────────────────────────────┐
│ Contacts (1,247 total)                 │
│                                         │
│ [Search] [Filter ▼] [Bulk Actions ▼]  │
│                                         │
│ ☐ Select All | Send Outreach Campaign │
│                                         │
│ ┌──────────────────────────────────┐   │
│ │ ☐ Rajesh Kumar                   │   │
│ │   Software Engineer @ TCS        │   │
│ │   Mumbai | Score: 85             │   │
│ │   Source: AI Scraping            │   │
│ │   Status: Pending Outreach       │   │
│ │   [Send WhatsApp] [Send Email]   │   │
│ └──────────────────────────────────┘   │
│                                         │
│ ┌──────────────────────────────────┐   │
│ │ ☐ Priya Sharma                   │   │
│ │   Business Owner                 │   │
│ │   Delhi | Score: 78              │   │
│ │   Source: AI Scraping            │   │
│ │   Status: WhatsApp Sent (No Resp)│   │
│ │   [Follow Up] [Mark Invalid]     │   │
│ └──────────────────────────────────┘   │
│                                         │
│ Filters:                                │
│ • Source: [All] AI / Manual            │
│ • Score: [All] High / Med / Low        │
│ • Status: [All] Pending / Sent / etc   │
│ • Location: [All cities]               │
└────────────────────────────────────────┘
```

### **3. LEADS (Verified)**
```
┌────────────────────────────────────────┐
│ Leads (342 total)                      │
│                                         │
│ Tabs: [All] [Outreach] [Meta] [Google]│
│                                         │
│ [Search] [Filter by Status ▼]          │
│                                         │
│ ┌──────────────────────────────────┐   │
│ │ Amit Patel ⭐⭐⭐                 │   │
│ │ Score: 92 | Hot                  │   │
│ │ Source: Meta Ads                 │   │
│ │ Status: New                      │   │
│ │ Interested in: 3BHK, ₹80L budget │   │
│ │ [Open Chat] [Update Status]      │   │
│ └──────────────────────────────────┘   │
│                                         │
│ ┌──────────────────────────────────┐   │
│ │ Neha Singh                       │   │
│ │ Score: 75 | Warm                 │   │
│ │ Source: WhatsApp Response        │   │
│ │ Status: Contacted                │   │
│ │ Replied: "Interested, call me"   │   │
│ │ [Open Chat] [Schedule Call]      │   │
│ └──────────────────────────────────┘   │
└────────────────────────────────────────┘
```

### **4. CAMPAIGNS → AI SCRAPING**
```
┌────────────────────────────────────────┐
│ AI Scraping Campaigns                  │
│                                         │
│ [+ Create New Campaign]                │
│                                         │
│ Active Campaign: "Mumbai Real Estate"  │
│ Status: ● Active                       │
│ Frequency: Daily at 9 AM               │
│ Contacts Generated: 1,247              │
│ Last Run: 2 hours ago                  │
│ Next Run: Tomorrow 9 AM                │
│                                         │
│ Search Criteria:                       │
│ • Industry: Real Estate Agents         │
│ • Locations: Mumbai, Pune, Thane       │
│ • Job Titles: Broker, Agent, Manager   │
│ • Sources: Google Maps, Directories    │
│                                         │
│ [Edit] [Pause] [View Contacts]         │
│                                         │
│ Recent Contacts:                       │
│ • 45 added today                       │
│ • Avg Quality Score: 72                │
│ • Top Location: Mumbai (32)            │
└────────────────────────────────────────┘
```

### **5. OUTREACH → WhatsApp Campaigns**
```
┌────────────────────────────────────────┐
│ WhatsApp Outreach Campaigns            │
│                                         │
│ [+ Create Campaign]                    │
│                                         │
│ Active: "Welcome Sequence"             │
│ Target: 500 new contacts               │
│ Status: ● Running                      │
│                                         │
│ Performance:                           │
│ ├─ Sent: 450                           │
│ ├─ Delivered: 442                      │
│ ├─ Read: 289                           │
│ ├─ Responded: 82 (18%)                 │
│ └─ Converted to Leads: 12              │
│                                         │
│ Message Template:                      │
│ "Hi {{name}}, I noticed you're in      │
│  {{industry}}. We help businesses...   │
│  Reply YES if interested."             │
│                                         │
│ Schedule: Daily at 10 AM               │
│ Send Limit: 100/day                    │
│                                         │
│ [Edit] [Pause] [View Responses]        │
└────────────────────────────────────────┘
```

### **6. CONVERSATIONS**
```
┌────────────────────────────────────────┐
│ Conversations (23 unread)              │
│                                         │
│ ┌─────────────┬────────────────────┐   │
│ │ Conversations│  Chat with Amit P. │   │
│ │             │                    │   │
│ │ Amit P.  ●  │ [Amit]: Hi, I'm   │   │
│ │ Meta Ads    │ interested in 3BHK │   │
│ │ 2 min ago   │                    │   │
│ │             │ [You]: Great! We   │   │
│ │ Neha S.  2  │ have several...    │   │
│ │ WhatsApp    │                    │   │
│ │ 1 hr ago    │ [Type message...]  │   │
│ │             │ [Send]             │   │
│ │ Rajesh K.   │                    │   │
│ │ Google Ads  │                    │   │
│ │ Yesterday   │                    │   │
│ └─────────────┴────────────────────┘   │
└────────────────────────────────────────┘
```

---

## ⚙️ AUTOMATION WORKFLOWS:

### **WORKFLOW 1: AI Scraping → Outreach → Conversion**
```
Daily 9 AM:
  1. AI Scraping Campaign runs
  2. Searches Google Maps/LinkedIn/Directories
  3. Extracts: Name, Email, Phone, Company, Title
  4. AI scores quality (0-100)
  5. Saves to CONTACTS table
  6. Triggers notification to customer

Daily 10 AM:
  7. WhatsApp Campaign checks new contacts
  8. Selects contacts with score > 60
  9. Sends personalized WhatsApp message
  10. Tracks delivery & read status

When Response Received:
  11. Contact marked as "responded"
  12. Automatically moves to LEADS table
  13. Creates conversation thread
  14. Notifies customer (push + WhatsApp)
  15. Customer can reply via dashboard
```

### **WORKFLOW 2: Meta Ads → Direct Lead**
```
Continuous:
  1. Meta Ad running (targeting set by customer)
  2. User clicks ad → Fills lead form
  3. Facebook sends webhook to platform
  4. Platform receives lead data
  5. AI scores quality
  6. Saves directly to LEADS table
  7. Creates conversation (pre-populated with form data)
  8. Sends WhatsApp to customer: "New lead!"
  9. Sends WhatsApp to lead: "Thanks, we'll contact you"
  10. Customer can chat with lead immediately
```

### **WORKFLOW 3: Google Ads → Direct Lead**
```
Continuous:
  1. Google Ad running (keywords set by customer)
  2. User clicks ad → Fills Google Lead Form
  3. Google sends lead to platform (API polling or extension)
  4. Platform receives lead data
  5. AI scores quality
  6. Saves directly to LEADS table
  7. Creates conversation
  8. Notifies customer
  9. Ready for chat
```

---

## 🎯 CUSTOMER JOURNEY (Onboarding):

```
Step 1: Welcome & Business Info
  - What's your business?
  - Which industry?
  - Where do you operate?

Step 2: Target Audience
  - Who are your ideal customers?
  - Job titles, industries, locations
  - Company size, interests

Step 3: AI Scraping Setup
  ✓ Enable AI Scraping? [Yes/No]
  - How many leads per day? [50/100/250]
  - Search criteria: [Define...]
  - Quality threshold: [60+/70+/80+]

Step 4: Ad Campaigns Setup
  ✓ Enable Meta Ads? [Yes/No]
    - Daily budget: ₹[____]
    - Target locations: [Select]
    - Ad preview: [Auto-generated]
  
  ✓ Enable Google Ads? [Yes/No]
    - Daily budget: ₹[____]
    - Keywords: [Auto-suggested]
    - Ad preview: [Auto-generated]

Step 5: Outreach Templates
  WhatsApp Message:
  [Text area with variables: {{name}}, {{company}}]
  
  Email Subject & Body:
  [Text area with variables]

Step 6: Budget & Billing
  Total Monthly Budget: ₹[____]
  Allocation:
  - AI Scraping: ₹[____]
  - Meta Ads: ₹[____]
  - Google Ads: ₹[____]
  - WhatsApp: ₹[____]
  - Email: ₹[____]

Step 7: Review & Launch
  [Summary of everything]
  [Terms & Conditions]
  [Launch Campaign] ← Starts everything automatically
```

---

## 💰 PRICING MODEL SUGGESTION:

### **Option A: All-Inclusive Subscription**
```
Starter: ₹9,999/month
  - 500 AI-scraped contacts/month
  - 1,000 outreach messages (WhatsApp + Email)
  - ₹5,000 ad credits (Meta + Google)
  - 50 verified leads/month
  - Basic AI scoring

Professional: ₹19,999/month
  - 2,000 AI-scraped contacts/month
  - 5,000 outreach messages
  - ₹15,000 ad credits
  - 150 verified leads/month
  - Advanced AI scoring
  - Priority support

Enterprise: ₹49,999/month
  - Unlimited AI-scraped contacts
  - Unlimited outreach
  - ₹50,000 ad credits
  - Unlimited leads
  - Custom AI models
  - Dedicated account manager
```

### **Option B: Pay-Per-Lead**
```
₹200-500 per verified lead
  - All tools included
  - Only pay for leads that convert
  - Customer sets budget cap
```

---

## 🔧 TECHNICAL REQUIREMENTS:

### **NEW APIs/Services Needed:**

1. **AI Web Scraping:**
   - Bright Data / Apify
   - Custom scraper with Puppeteer
   - LinkedIn API (limited)
   - Google Maps API

2. **Bulk WhatsApp:**
   - Twilio WhatsApp Business API
   - OR WATI / Gupshup (India-specific)
   - Template message approval

3. **Email Campaigns:**
   - SendGrid / Resend
   - Template management
   - Delivery tracking

4. **AI Lead Scoring:**
   - OpenAI GPT-4 (already planned)
   - Enhanced for quality prediction

---

## ✅ CONFIRMATION NEEDED:

**Before I proceed, please confirm:**

1. **Lead Sources Priority:**
   - AI Scraping: Essential?
   - Meta Ads: Essential?
   - Google Ads: Essential?

2. **Automation Level:**
   - 100% automated after onboarding? ✓
   - Customer never needs to manually add leads? ✓

3. **Segregation:**
   - Contacts vs Leads - Separate sections? ✓
   - Leads further split by source (tabs)? ✓

4. **Outreach:**
   - Bulk campaigns for contacts? ✓
   - Individual chat for leads? ✓

5. **Budget:**
   - Is AI scraping cost included in subscription?
   - Or charge per contact/lead?

---

**Reply with:**
- "Looks good, proceed!" 
- OR specific changes needed

**Then I'll create:**
1. Revised database schema
2. Dashboard wireframes
3. Complete automation workflows
4. Then rebuild backend accordingly

🎯

