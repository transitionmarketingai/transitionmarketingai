# Lead Generation Platform - Implementation Roadmap

## Based on Proven Business Models (HomeAdvisor, Angi, Gupshup, Conversica)

---

## 🎯 SELECTED BUSINESS MODEL

**Model Type**: **Hybrid Lead Marketplace with AI-Powered Engagement**

This combines the best practices from:
- **Thumbtack/HomeAdvisor**: Pay-per-lead marketplace model
- **Conversica**: AI-powered lead engagement and qualification
- **Gupshup/Tidio**: Omnichannel messaging platform
- **Drift/Intercom**: Real-time chat and behavioral targeting

---

## 📋 PHASE 1: CORE PLATFORM (Weeks 1-6)

### Week 1-2: Messaging Infrastructure

#### 1.1 Real-Time Chat System ✅ (Partially Complete)
**Status**: You already have messaging components, need to enhance

**Required Features**:
```typescript
// Core messaging features needed:
- Real-time bidirectional messaging (WebSockets/Supabase Realtime)
- Typing indicators
- Read receipts
- File attachments
- Message history
- Search functionality
- Notifications (in-app, email, push)
```

**Database Schema Updates**:
```sql
-- conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  client_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'active', -- active, archived, closed
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id),
  sender_id UUID REFERENCES profiles(id),
  content TEXT,
  message_type TEXT DEFAULT 'text', -- text, file, image, video
  file_url TEXT,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- message_reactions table (for engagement tracking)
CREATE TABLE message_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES messages(id),
  user_id UUID REFERENCES profiles(id),
  reaction_type TEXT, -- like, helpful, etc.
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Components to Build**:
- `ConversationList.tsx` - List of all conversations
- `ChatWindow.tsx` - Main chat interface
- `MessageInput.tsx` - Text input with file upload
- `MessageBubble.tsx` - Individual message display
- `TypingIndicator.tsx` - Show when other person is typing

#### 1.2 Lead Management System

**Database Schema**:
```sql
-- Enhanced leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Lead Information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  
  -- Lead Source
  source TEXT, -- 'ai_chat', 'paid_ads', 'organic', 'referral'
  source_details JSONB, -- Campaign details, ad info, etc.
  
  -- Lead Quality
  quality_score INTEGER DEFAULT 0, -- 0-100 AI-calculated score
  qualification_status TEXT DEFAULT 'unqualified', -- unqualified, qualified, hot, cold
  
  -- Lead Assignment
  assigned_to UUID REFERENCES profiles(id),
  assigned_at TIMESTAMP,
  
  -- Lead Metadata
  industry TEXT,
  location JSONB, -- {city, state, country, lat, lng}
  budget_range TEXT,
  timeline TEXT,
  
  -- Engagement Tracking
  first_contact_at TIMESTAMP,
  last_contact_at TIMESTAMP,
  total_interactions INTEGER DEFAULT 0,
  
  -- AI Analysis
  ai_summary TEXT, -- AI-generated summary of the lead
  ai_insights JSONB, -- {buying_intent, pain_points, objections}
  
  -- Behavioral Data
  pages_visited JSONB, -- Array of page URLs
  time_on_site INTEGER, -- Seconds
  actions_taken JSONB, -- Array of actions
  
  -- Status
  status TEXT DEFAULT 'new', -- new, contacted, qualified, converted, lost
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Lead activities tracking
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  activity_type TEXT, -- 'page_view', 'form_submit', 'chat_message', 'email_open'
  activity_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lead scoring rules
CREATE TABLE lead_scoring_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_name TEXT,
  condition JSONB, -- {field: 'budget_range', operator: '>', value: 10000}
  score_impact INTEGER, -- +10, -5, etc.
  is_active BOOLEAN DEFAULT TRUE
);
```

**Components to Build**:
- `LeadDashboard.tsx` - Overview of all leads
- `LeadCard.tsx` - Individual lead display
- `LeadDetails.tsx` - Detailed lead information
- `LeadScoreIndicator.tsx` - Visual quality score
- `LeadAssignment.tsx` - Assign leads to team members

#### 1.3 AI Chatbot Integration

**AI Chatbot Features**:
```typescript
// AI capabilities needed:
1. Initial Engagement: Greet visitors within 3 seconds
2. Qualification Questions: Ask relevant questions based on industry
3. Intent Recognition: Understand what the visitor wants
4. Lead Capture: Smoothly collect contact information
5. Appointment Scheduling: Book calls/meetings
6. Handoff to Human: Transfer to live agent when needed
7. Multilingual Support: Communicate in visitor's language
```

**Implementation Options**:

**Option A: OpenAI GPT-4 (Recommended)**
```typescript
// lib/ai/chatbot.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateChatResponse(
  messages: Array<{role: string, content: string}>,
  leadContext: any
) {
  const systemPrompt = `You are a helpful sales assistant for [Your Company].
  Your goal is to:
  1. Engage the visitor in a friendly conversation
  2. Understand their needs and pain points
  3. Qualify them by asking about budget, timeline, and decision-making authority
  4. Collect their contact information (name, email, phone)
  5. Schedule a call if they're interested
  
  Current visitor context: ${JSON.stringify(leadContext)}
  
  Be conversational, helpful, and never pushy. If they're not a good fit, politely direct them to resources.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return response.choices[0].message.content;
}
```

**Option B: Anthropic Claude (Alternative)**
```typescript
// lib/ai/chatbot-claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function generateClaudeResponse(
  messages: Array<{role: string, content: string}>,
  leadContext: any
) {
  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    messages: messages
  });

  return response.content[0].text;
}
```

**Database for AI Conversations**:
```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  session_id TEXT,
  messages JSONB, -- Array of {role, content, timestamp}
  lead_qualified BOOLEAN DEFAULT FALSE,
  handoff_requested BOOLEAN DEFAULT FALSE,
  handoff_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Components to Build**:
- `AIChatWidget.tsx` - Floating chat widget on website
- `AIChatInterface.tsx` - Main chat interface
- `AITypingIndicator.tsx` - Shows when AI is "thinking"
- `LiveAgentHandoff.tsx` - Transfer to human agent

---

## 📋 PHASE 2: LEAD GENERATION ENGINE (Weeks 3-8)

### Week 3-4: Landing Pages & Lead Capture

#### 2.1 Industry-Specific Landing Pages

**Page Structure**:
```
/leads/[industry]
Examples:
- /leads/real-estate
- /leads/insurance
- /leads/solar
- /leads/legal
- /leads/home-services
```

**Template Components**:
```typescript
// components/landing/LeadLandingPage.tsx
interface LeadLandingPageProps {
  industry: string;
  headline: string;
  subheadline: string;
  benefits: string[];
  testimonials: Testimonial[];
  ctaText: string;
}

// Key elements:
- Hero section with value proposition
- Trust indicators (reviews, client logos)
- Lead capture form (email, phone)
- AI chat widget
- Social proof
- Clear CTA buttons
- Mobile responsive
```

**Lead Capture Forms**:
```typescript
// components/forms/LeadCaptureForm.tsx
interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  industry: string;
  budget: string;
  timeline: string;
  message: string;
}

// Features:
- Multi-step forms (reduce friction)
- Real-time validation
- AI pre-qualification during form fill
- Progress indicators
- Mobile-optimized
- A/B testing variants
```

#### 2.2 Paid Advertising Setup

**Google Ads Campaign Structure**:
```
Campaign: Lead Generation - [Industry]
  ├── Ad Group 1: High-Intent Keywords
  │   ├── Keywords: "[industry] leads", "buy [industry] leads"
  │   ├── Landing Page: /leads/[industry]
  │   └── Budget: $50/day
  │
  ├── Ad Group 2: Problem-Aware Keywords
  │   ├── Keywords: "how to get [industry] clients"
  │   ├── Landing Page: /leads/[industry]/guide
  │   └── Budget: $30/day
  │
  └── Ad Group 3: Competitor Keywords
      ├── Keywords: "[competitor] alternative"
      ├── Landing Page: /leads/[industry]/compare
      └── Budget: $20/day
```

**Ad Copy Templates**:
```
Headline 1: Get High-Quality [Industry] Leads
Headline 2: Only Pay For Qualified Leads
Headline 3: AI-Verified, Ready to Buy
Description: Generate qualified [industry] leads with our AI-powered platform. 
Pay per lead, cancel anytime. Get started in 5 minutes.
CTA: Start Getting Leads →
```

**Facebook/Instagram Ads**:
```
Objective: Lead Generation
  ├── Campaign 1: Lead Form Ads
  │   ├── Target: Business owners, [Industry] professionals
  │   ├── Creative: Video testimonial or carousel
  │   └── Form: Native Facebook lead form
  │
  ├── Campaign 2: Website Conversions
  │   ├── Target: Warm audience (website visitors, engaged users)
  │   ├── Creative: Case study or before/after
  │   └── Landing Page: /leads/[industry]
  │
  └── Campaign 3: Retargeting
      ├── Target: Form abandoners, page visitors
      ├── Creative: Special offer or urgency
      └── Landing Page: /leads/[industry]?offer=special
```

**Tracking Implementation**:
```typescript
// lib/tracking/analytics.ts
export function trackLeadSource(leadId: string, source: {
  medium: string; // 'cpc', 'social', 'organic', 'referral'
  source: string; // 'google', 'facebook', 'linkedin'
  campaign: string;
  adGroup: string;
  keyword: string;
  gclid?: string; // Google Click ID
  fbclid?: string; // Facebook Click ID
}) {
  // Store in database
  // Send to analytics platforms
  // Attribute lead to campaign
}
```

#### 2.3 AI Lead Scoring & Qualification

**Scoring Algorithm**:
```typescript
// lib/ai/leadScoring.ts
interface LeadScoringFactors {
  // Demographic factors
  industry: string; // +10 if target industry
  companySize: number; // +5 if >10 employees
  location: string; // +5 if target geography
  
  // Behavioral factors
  pagesViewed: number; // +2 per page, max +10
  timeOnSite: number; // +1 per minute, max +10
  formSubmissions: number; // +15 per submission
  chatEngagement: number; // +10 if had conversation
  
  // Qualification factors
  budgetRange: string; // +20 if >$5k/month
  timeline: string; // +15 if "immediate"
  decisionMaker: boolean; // +20 if yes
  
  // Engagement factors
  emailOpens: number; // +3 per open
  emailClicks: number; // +5 per click
  responseSpeed: number; // +10 if <1hr response
}

export function calculateLeadScore(factors: LeadScoringFactors): number {
  let score = 0;
  
  // Apply scoring logic
  // ...
  
  // Normalize to 0-100
  return Math.min(100, Math.max(0, score));
}

export function getLeadQuality(score: number): string {
  if (score >= 80) return 'hot';
  if (score >= 60) return 'warm';
  if (score >= 40) return 'qualified';
  if (score >= 20) return 'cold';
  return 'unqualified';
}
```

**AI-Powered Qualification**:
```typescript
// lib/ai/leadQualification.ts
export async function qualifyLeadWithAI(leadData: any) {
  const prompt = `Analyze this lead and determine their quality:
  
  Lead Information:
  - Industry: ${leadData.industry}
  - Budget: ${leadData.budget}
  - Timeline: ${leadData.timeline}
  - Company Size: ${leadData.companySize}
  - Conversation: ${leadData.chatTranscript}
  
  Provide:
  1. Quality Score (0-100)
  2. Buying Intent (Low/Medium/High)
  3. Key Pain Points (list)
  4. Recommended Next Steps
  5. Red Flags (if any)
  
  Format as JSON.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
}
```

---

## 📋 PHASE 3: MONETIZATION (Weeks 5-10)

### Week 5-6: Subscription System

#### 3.1 Pricing Tiers Implementation

**Database Schema**:
```sql
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- 'Starter', 'Growth', 'Professional', 'Enterprise'
  price_monthly INTEGER NOT NULL, -- In cents
  price_annual INTEGER, -- Annual pricing (discounted)
  leads_per_month INTEGER,
  features JSONB, -- Array of feature flags
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  plan_id UUID REFERENCES subscription_plans(id),
  stripe_subscription_id TEXT,
  status TEXT, -- 'active', 'canceled', 'past_due'
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  leads_used_this_period INTEGER DEFAULT 0,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lead_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  lead_id UUID REFERENCES leads(id),
  price INTEGER, -- In cents
  stripe_payment_intent_id TEXT,
  purchased_at TIMESTAMP DEFAULT NOW()
);
```

**Pricing Plans**:
```typescript
// config/pricingPlans.ts
export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9900, // $99/month
    priceAnnual: 99000, // $990/year (2 months free)
    features: {
      leadsPerMonth: 10,
      chatSupport: true,
      emailIntegration: true,
      basicAnalytics: true,
      aiChatbot: false,
      whatsappIntegration: false,
      crmIntegration: false,
      apiAccess: false,
      customBranding: false,
      dedicatedSupport: false
    }
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 29900, // $299/month
    priceAnnual: 299000, // $2,990/year
    popular: true,
    features: {
      leadsPerMonth: 50,
      chatSupport: true,
      emailIntegration: true,
      basicAnalytics: true,
      aiChatbot: true,
      whatsappIntegration: true,
      crmIntegration: true,
      apiAccess: false,
      customBranding: false,
      dedicatedSupport: false
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 59900, // $599/month
    priceAnnual: 599000, // $5,990/year
    features: {
      leadsPerMonth: 150,
      chatSupport: true,
      emailIntegration: true,
      basicAnalytics: true,
      aiChatbot: true,
      whatsappIntegration: true,
      crmIntegration: true,
      apiAccess: true,
      customBranding: true,
      dedicatedSupport: true
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null, // Custom pricing
    features: {
      leadsPerMonth: 'Unlimited',
      chatSupport: true,
      emailIntegration: true,
      basicAnalytics: true,
      aiChatbot: true,
      whatsappIntegration: true,
      crmIntegration: true,
      apiAccess: true,
      customBranding: true,
      dedicatedSupport: true,
      customIntegrations: true,
      sla: true
    }
  }
];

// Pay-per-lead pricing tiers
export const LEAD_PRICING = {
  tier1: { maxScore: 40, price: 2000 }, // $20 per lead
  tier2: { maxScore: 60, price: 3500 }, // $35 per lead
  tier3: { maxScore: 80, price: 5000 }, // $50 per lead
  tier4: { maxScore: 100, price: 7500 }, // $75 per lead
};
```

**Components to Build**:
```typescript
// components/pricing/PricingTable.tsx
// components/subscription/SubscriptionManager.tsx
// components/subscription/UsageIndicator.tsx
// components/billing/BillingDashboard.tsx
// components/billing/InvoiceHistory.tsx
```

#### 3.2 Stripe Integration Enhancement

**Subscription Management API**:
```typescript
// app/api/subscriptions/create/route.ts
export async function POST(req: Request) {
  const { planId, userId, paymentMethodId } = await req.json();
  
  // Create Stripe customer if doesn't exist
  const customer = await stripe.customers.create({
    metadata: { userId }
  });
  
  // Attach payment method
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customer.id
  });
  
  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: getPriceId(planId) }],
    default_payment_method: paymentMethodId,
    metadata: { userId, planId }
  });
  
  // Save to database
  await saveSubscription(userId, planId, subscription);
  
  return Response.json({ success: true, subscription });
}
```

**Pay-Per-Lead Purchase**:
```typescript
// app/api/leads/purchase/route.ts
export async function POST(req: Request) {
  const { leadId, userId } = await req.json();
  
  // Get lead score
  const lead = await getLeadById(leadId);
  const price = calculateLeadPrice(lead.quality_score);
  
  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'usd',
    metadata: { leadId, userId }
  });
  
  return Response.json({ clientSecret: paymentIntent.client_secret });
}
```

#### 3.3 Usage Tracking & Limits

**Middleware for Usage Enforcement**:
```typescript
// middleware/checkLeadLimit.ts
export async function checkLeadLimit(userId: string) {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription) {
    throw new Error('No active subscription');
  }
  
  const usage = await getUsageThisPeriod(userId, subscription);
  const limit = subscription.plan.leads_per_month;
  
  if (usage >= limit) {
    return {
      allowed: false,
      message: 'Lead limit reached. Upgrade or purchase additional leads.',
      usage,
      limit
    };
  }
  
  return { allowed: true, usage, limit };
}
```

---

## 📋 PHASE 4: OMNICHANNEL INTEGRATION (Weeks 7-12)

### Week 7-8: WhatsApp Business Integration

**Setup**:
1. Apply for WhatsApp Business API access
2. Choose provider: Twilio, MessageBird, or direct Meta
3. Implement webhook endpoints
4. Build message templates (required for WhatsApp)

**Implementation**:
```typescript
// lib/messaging/whatsapp.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsAppMessage(
  to: string,
  message: string,
  templateName?: string
) {
  return await client.messages.create({
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${to}`,
    body: message
  });
}

export async function handleWhatsAppWebhook(req: Request) {
  const { From, Body, ProfileName } = await req.json();
  
  // Find or create lead
  const lead = await findOrCreateLeadByPhone(From);
  
  // Store message
  await storeMessage({
    leadId: lead.id,
    channel: 'whatsapp',
    content: Body,
    direction: 'inbound'
  });
  
  // Trigger AI response or notify team
  await processInboundMessage(lead, Body);
}
```

**Database Schema**:
```sql
CREATE TABLE messaging_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  channel_type TEXT, -- 'whatsapp', 'sms', 'email', 'web_chat'
  channel_identifier TEXT, -- phone number, email, etc.
  is_verified BOOLEAN DEFAULT FALSE,
  is_opted_in BOOLEAN DEFAULT FALSE,
  opted_in_at TIMESTAMP,
  opted_out_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Week 9-10: Email Integration

**Email Service Setup**:
```typescript
// lib/messaging/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadEmail(
  to: string,
  subject: string,
  content: string,
  leadId: string
) {
  const result = await resend.emails.send({
    from: 'leads@yourdomain.com',
    to,
    subject,
    html: content,
    tags: [
      { name: 'lead_id', value: leadId },
      { name: 'type', value: 'lead_communication' }
    ]
  });
  
  // Track email activity
  await trackEmailActivity({
    leadId,
    emailId: result.id,
    type: 'sent',
    timestamp: new Date()
  });
  
  return result;
}

// Handle incoming emails (via webhook)
export async function handleInboundEmail(emailData: any) {
  const leadEmail = extractLeadEmail(emailData.from);
  const lead = await findLeadByEmail(leadEmail);
  
  if (lead) {
    await storeMessage({
      leadId: lead.id,
      channel: 'email',
      content: emailData.text || emailData.html,
      direction: 'inbound'
    });
    
    // Notify assigned team member
    await notifyTeamMember(lead.assigned_to, {
      type: 'new_email',
      leadId: lead.id
    });
  }
}
```

**Email Templates**:
```typescript
// templates/emails/leadFollowUp.tsx
import { Html, Button, Text } from '@react-email/components';

export default function LeadFollowUpEmail({
  leadName,
  assignedPerson
}: {
  leadName: string;
  assignedPerson: string;
}) {
  return (
    <Html>
      <Text>Hi {leadName},</Text>
      <Text>
        Thanks for your interest! I'm {assignedPerson}, and I'd love to learn
        more about your needs.
      </Text>
      <Button href="https://yourdomain.com/schedule">
        Schedule a Call
      </Button>
    </Html>
  );
}
```

### Week 11-12: SMS Integration

**Implementation**:
```typescript
// lib/messaging/sms.ts
import twilio from 'twilio';

export async function sendSMS(to: string, message: string, leadId: string) {
  const result = await client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
    body: message
  });
  
  await storeMessage({
    leadId,
    channel: 'sms',
    content: message,
    direction: 'outbound',
    externalId: result.sid
  });
  
  return result;
}

// Handle incoming SMS
export async function handleInboundSMS(req: Request) {
  const { From, Body } = await req.json();
  
  const lead = await findLeadByPhone(From);
  
  if (lead) {
    await storeMessage({
      leadId: lead.id,
      channel: 'sms',
      content: Body,
      direction: 'inbound'
    });
    
    // Auto-respond or notify team
    if (isBusinessHours()) {
      await notifyTeamMember(lead.assigned_to);
    } else {
      await sendSMS(From, 'Thanks! We\'ll respond during business hours.', lead.id);
    }
  }
}
```

---

## 📋 PHASE 5: ANALYTICS & OPTIMIZATION (Weeks 9-14)

### Week 13: Analytics Dashboard

**Key Metrics to Track**:
```typescript
// Dashboard KPIs
interface PlatformMetrics {
  // Lead Metrics
  totalLeads: number;
  newLeadsToday: number;
  qualifiedLeads: number;
  averageLeadScore: number;
  leadConversionRate: number;
  
  // Revenue Metrics
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  revenueThisMonth: number;
  revenuePerLead: number;
  ltv: number; // Customer Lifetime Value
  
  // Engagement Metrics
  activeConversations: number;
  averageResponseTime: number;
  messagesSentToday: number;
  chatEngagementRate: number;
  
  // Campaign Metrics
  adSpend: number;
  costPerLead: number;
  roi: number;
  topPerformingCampaigns: Campaign[];
  
  // Customer Metrics
  activeSubscriptions: number;
  churnRate: number;
  customerSatisfaction: number;
  nps: number; // Net Promoter Score
}
```

**Analytics Queries**:
```typescript
// lib/analytics/metrics.ts
export async function getLeadMetrics(dateRange: DateRange) {
  return await supabase.rpc('get_lead_metrics', {
    start_date: dateRange.start,
    end_date: dateRange.end
  });
}

// SQL function
/*
CREATE OR REPLACE FUNCTION get_lead_metrics(start_date DATE, end_date DATE)
RETURNS TABLE (
  total_leads BIGINT,
  qualified_leads BIGINT,
  average_score NUMERIC,
  conversion_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE quality_score >= 60) as qualified_leads,
    AVG(quality_score) as average_score,
    (COUNT(*) FILTER (WHERE status = 'converted')::NUMERIC / COUNT(*)::NUMERIC * 100) as conversion_rate
  FROM leads
  WHERE created_at BETWEEN start_date AND end_date;
END;
$$ LANGUAGE plpgsql;
*/
```

**Components**:
```typescript
// components/analytics/AnalyticsDashboard.tsx
// components/analytics/LeadFunnel.tsx
// components/analytics/RevenueChart.tsx
// components/analytics/CampaignPerformance.tsx
// components/analytics/EngagementMetrics.tsx
```

### Week 14: A/B Testing Framework

**Testing Infrastructure**:
```typescript
// lib/testing/abTest.ts
interface ABTest {
  id: string;
  name: string;
  variants: {
    id: string;
    name: string;
    weight: number; // 0-100 (percentage)
  }[];
  metric: string; // 'conversion_rate', 'lead_quality', etc.
  status: 'draft' | 'running' | 'completed';
}

export function assignVariant(userId: string, testId: string): string {
  // Consistent hashing to assign variant
  const hash = hashString(`${userId}-${testId}`);
  const test = getTest(testId);
  
  let cumulative = 0;
  for (const variant of test.variants) {
    cumulative += variant.weight;
    if (hash % 100 < cumulative) {
      return variant.id;
    }
  }
  
  return test.variants[0].id;
}

export async function trackTestEvent(
  testId: string,
  variant: string,
  event: string,
  value?: number
) {
  await supabase.from('ab_test_events').insert({
    test_id: testId,
    variant,
    event,
    value,
    created_at: new Date()
  });
}
```

**Things to Test**:
- Landing page headlines and copy
- CTA button text and colors
- Form field order and quantity
- Pricing page layouts
- Email subject lines
- AI chatbot greeting messages
- Lead qualification questions

---

## 📋 PHASE 6: SCALING & AUTOMATION (Weeks 15+)

### Advanced Features

#### 6.1 Lead Routing Automation
```typescript
// lib/automation/leadRouting.ts
interface RoutingRule {
  condition: {
    field: string;
    operator: 'equals' | 'greater_than' | 'contains';
    value: any;
  };
  assignTo: string; // user_id or team_id
  priority: number;
}

export async function routeLead(lead: Lead) {
  const rules = await getActiveRoutingRules();
  
  // Sort by priority
  rules.sort((a, b) => b.priority - a.priority);
  
  // Find matching rule
  for (const rule of rules) {
    if (evaluateCondition(lead, rule.condition)) {
      await assignLead(lead.id, rule.assignTo);
      await notifyAssignee(rule.assignTo, lead);
      return;
    }
  }
  
  // Default: round-robin assignment
  await assignToNextAvailable(lead);
}
```

#### 6.2 Automated Follow-Up Sequences
```typescript
// lib/automation/followUpSequences.ts
interface FollowUpSequence {
  id: string;
  name: string;
  trigger: 'lead_created' | 'form_submitted' | 'chat_ended';
  steps: FollowUpStep[];
}

interface FollowUpStep {
  delay: number; // minutes
  action: 'send_email' | 'send_sms' | 'create_task';
  template: string;
  condition?: {
    field: string;
    operator: string;
    value: any;
  };
}

export async function startSequence(
  sequenceId: string,
  leadId: string
) {
  const sequence = await getSequence(sequenceId);
  
  for (const step of sequence.steps) {
    // Schedule step
    await scheduleTask({
      executeAt: new Date(Date.now() + step.delay * 60000),
      type: 'follow_up_step',
      data: { leadId, step }
    });
  }
}
```

#### 6.3 CRM Integrations
```typescript
// lib/integrations/crm.ts

// Salesforce
export async function syncToSalesforce(lead: Lead) {
  const sf = new Salesforce({
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
    redirectUri: process.env.SF_REDIRECT_URI
  });
  
  const contact = await sf.sobject('Contact').create({
    FirstName: lead.name.split(' ')[0],
    LastName: lead.name.split(' ').slice(1).join(' '),
    Email: lead.email,
    Phone: lead.phone,
    LeadSource: 'Platform',
    Custom_Quality_Score__c: lead.quality_score
  });
  
  return contact;
}

// HubSpot
export async function syncToHubSpot(lead: Lead) {
  const hubspot = new HubSpotClient({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN
  });
  
  const contact = await hubspot.crm.contacts.basicApi.create({
    properties: {
      email: lead.email,
      firstname: lead.name.split(' ')[0],
      lastname: lead.name.split(' ').slice(1).join(' '),
      phone: lead.phone,
      lead_source: 'Platform',
      hs_lead_status: getHubSpotStatus(lead.status)
    }
  });
  
  return contact;
}
```

---

## 🎯 IMPLEMENTATION PRIORITIES

### Must-Have (Phase 1-2)
1. ✅ Real-time messaging system
2. ✅ AI chatbot for engagement
3. ✅ Lead capture and storage
4. ✅ Basic lead scoring
5. ✅ Landing pages
6. ✅ Paid ads setup
7. ✅ Subscription system

### Should-Have (Phase 3-4)
1. WhatsApp integration
2. Email integration
3. SMS integration
4. Advanced analytics
5. CRM integrations
6. A/B testing
7. Mobile app

### Nice-to-Have (Phase 5-6)
1. Video chat
2. Advanced automation
3. API for third parties
4. White-label options
5. Custom integrations
6. Enterprise features

---

## 📊 SUCCESS METRICS

### Month 1 Goals
- [ ] 10 beta customers signed up
- [ ] 100 leads generated through platform
- [ ] AI chatbot handling 70%+ of initial conversations
- [ ] Average lead score >50
- [ ] $1,000 MRR

### Month 3 Goals
- [ ] 50 paying customers
- [ ] 1,000 leads generated
- [ ] 3+ messaging channels active
- [ ] 60% lead qualification rate
- [ ] $10,000 MRR

### Month 6 Goals
- [ ] 200 paying customers
- [ ] 5,000 leads generated
- [ ] Cost per lead <$30
- [ ] 15% lead-to-customer conversion
- [ ] $50,000 MRR

### Month 12 Goals
- [ ] 1,000 paying customers
- [ ] 25,000 leads generated
- [ ] $300,000 MRR
- [ ] Profitable operations
- [ ] Series A ready

---

## 💰 BUDGET ALLOCATION

### Month 1-3 (Validation Phase)
- **Development**: $0 (in-house)
- **Paid Ads**: $3,000/month
- **Tools & Services**: $500/month (APIs, hosting)
- **Total**: $3,500/month

### Month 4-6 (Growth Phase)
- **Development**: $0 (in-house)
- **Paid Ads**: $10,000/month
- **Tools & Services**: $1,500/month
- **Team Expansion**: $5,000/month (contractors)
- **Total**: $16,500/month

### Month 7-12 (Scale Phase)
- **Development**: $10,000/month (team)
- **Paid Ads**: $30,000/month
- **Tools & Services**: $3,000/month
- **Sales & Marketing**: $10,000/month
- **Total**: $53,000/month

**Expected ROI by Month 12**:
- Revenue: $300,000/month
- Costs: $53,000/month
- Profit: $247,000/month
- Profit Margin: 82%

---

## 🚀 NEXT STEPS

1. **Choose Target Industry** (This Week)
   - Research which industry to start with
   - Analyze competition and demand
   - Validate with market research

2. **Build MVP Features** (Weeks 1-4)
   - Implement messaging system
   - Integrate AI chatbot
   - Create landing pages
   - Set up lead database

3. **Launch Beta** (Week 5)
   - Recruit 10 beta testers
   - Offer discounted pricing
   - Gather feedback

4. **Start Paid Ads** (Week 6)
   - Small budget ($1,000-$2,000)
   - Test different campaigns
   - Optimize for lead quality

5. **Iterate & Scale** (Weeks 7+)
   - Refine based on data
   - Add requested features
   - Increase ad budget
   - Expand to new industries

---

**Ready to implement? Let's start with Phase 1, Week 1: Real-Time Messaging System. Confirm and I'll begin building the components!**


