# Transition Marketing AI - Database Architecture Documentation

## 🏗️ **Database Schema Overview**

Our enhanced database schema is designed to power a comprehensive lead generation + CRM + messaging platform with the following core components:

### **📊 Core Entities**

#### **1. User Management**
- **Users**: Core user accounts with credit system integration
- **Business Profiles**: Extended user business information
- **Credit Transactions**: Usage tracking and billing

#### **2. Lead Generation Engine**
- **Campaigns**: Lead generation campaigns with targeting criteria
- **Leads**: Generated leads with comprehensive data and scoring
- **Industry Templates**: Pre-configured templates for different industries

#### **3. Messaging & Outreach**
- **Messages**: Multi-channel messaging (Email, LinkedIn, WhatsApp, SMS, Voice)
- **Message Templates**: Reusable message templates
- **Sequences**: Automated email/LinkedIn sequences

#### **4. Activity & Analytics**
- **Activities**: Lead interaction tracking
- **Analytics Snapshots**: Performance metrics storage
- **AI Insights**: AI-generated recommendations

#### **5. Integrations**
- **Integrations**

---

## 🔄 **API Service Architecture**

### **CreditService**
```typescript
// Credit management methods
getBalance(userId: string): Promise<number>
consumeCredits(userId: string, amount: number, type: string, description: string): Promise<boolean>
addCredits(userId: string, amount: number, type: CreditTransactionType): Promise<boolean>
getTransactionHistory(userId: string, limit?: number, offset?: number): Promise<CreditTransaction[]>
```

### **LeadService**
```typescript
// Lead management with advanced filtering
getLeads(userId: string, Filters?: LeadFilters, limit?: number, offset?: number): Promise<PaginatedResponse<Lead>>
createLead(userId: string, leadData: Prisma.LeadCreateInput): Promise<ApiResponse<Lead>>
updateLead(userId: string, leadId: string, updateData: Prisma.LeadUpdateInput): Promise<ApiResponse<Lead>>
bulkUpdateLeads(userId: string, leadIds: string[], updateData: Prisma.LeadUpdateInput): Promise<boolean>
deleteLead(userId: string, leadId: string): Promise<boolean>
getLeadAnalytics(userId: string): Promise<any>
```

### **CampaignService**
```typescript
// Campaign management for AI lead generation
getCampaigns(userId: string, filters?: CampaignFilters, limit?: number, offset?: number): Promise<PaginatedResponse<Campaign>>
createCampaign(userId: string, campaignData: Prisma.CampaignCreateInput): Promise<ApiResponse<Campaign>>
startLeadGeneration(campaignId: string): Promise<boolean>
```

### **MessageService**
```typescript
// Multi-channel messaging
sendMessage(userId: string, leadId: string, channel: MessageChannel, content: string): Promise<ApiResponse<Message>>
getLeadMessages(userId: string, leadId: string, limit?: number, offset?: number): Promise<PaginatedResponse<Message>>
createTemplate(userId: string, name: string, channel: MessageChannel, content: string): Promise<ApiResponse<MessageTemplate>>
```

---

## 💰 **Credit System Pricing**

### **Service Costs**
- **Lead Generation**: 2-5 credits per verified lead
- **Email Messaging**: 1 credit per email
- **LinkedIn Outreach**: 2 credits per message
- **WhatsApp Messaging**: 2 credits per message
- **Voice Calls**: 5 credits per call
- **SMS**: 3 credits per message

### **Credit Packages**
- **Starter**: 500 credits for ₹999/month
- **Professional**: 2,000 credits for ₹2,999/month
- **Enterprise**: Unlimited credits for ₹9,999/month

---

## 🚀 **Next Steps**

1. **Environment Setup**: Configure DATABASE_URL to point to Supabase
2. **Migration**: Run Prisma migrations to create tables
3. **API Testing**: Test core CRUD operations
4. **Integration**: Connect with existing dashboard components

---

## 🔧 **Getting Started**

```bash
# Install dependencies
npm install prisma @prisma/client

# Generate Prisma client
npx prisma generate

# Run migrations (when DATABASE_URL is configured)
npx prisma db push

# Development
npm run dev
```

---

## 📈 **Performance Considerations**

- **Indexes**: Optimized indexes on frequently queried columns
- **Pagination**: All list endpoints support pagination
- **Caching**: Consider Redis for frequently accessed data
- **Real-time**: Supabase subscriptions for live updates

---

## 🔒 **Security Features**

- **Row Level Security**: Users can only access their own data
- **API Validation**: Input validation on all endpoints
- **Credit Validation**: Prevents over-consumption of credits
- **Audit Logging**: All actions are logged via activities

