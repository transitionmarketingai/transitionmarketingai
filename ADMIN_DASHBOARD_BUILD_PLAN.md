# 🔧 Admin Dashboard - Complete Build Plan

## 🎯 **Project Goal**
Build a comprehensive admin dashboard for managing a lead generation service with fully custom pricing per client.

---

## 📋 **Phase 1: Foundation (Days 1-3)**

### **Day 1: Admin Authentication & Layout**
- [ ] Create `/admin` route structure
- [ ] Build admin login page (`/admin/login`)
- [ ] Setup admin authentication (separate from customer auth)
- [ ] Create admin layout with sidebar
- [ ] Protect admin routes with middleware
- [ ] Build admin dashboard home with overview stats

### **Day 2-3: Client Management Core**
- [ ] Create clients database schema
- [ ] Build client list page with filters
- [ ] Create "Add New Client" form
- [ ] Build client detail page
- [ ] Add client status management
- [ ] Create custom plan builder for each client

---

## 📋 **Phase 2: Lead Management (Days 4-5)**

### **Day 4: Lead Upload System**
- [ ] Create leads database schema
- [ ] Build bulk CSV upload interface
- [ ] Add CSV parsing and validation
- [ ] Create lead preview before upload
- [ ] Add duplicate detection

### **Day 5: Lead Assignment**
- [ ] Build lead allocation dashboard
- [ ] Create assign leads to client interface
- [ ] Add lead quota tracking
- [ ] Build client lead history view
- [ ] Add lead filtering and search

---

## 📋 **Phase 3: Billing & Invoicing (Days 6-7)**

### **Day 6: Invoice System**
- [ ] Create invoices database schema
- [ ] Build invoice generator
- [ ] Add invoice templates
- [ ] Create invoice PDF export
- [ ] Build invoice email sending

### **Day 7: Payment Tracking**
- [ ] Add payment status tracking
- [ ] Build revenue dashboard
- [ ] Create billing history per client
- [ ] Add payment reminders system
- [ ] Build MRR tracking

---

## 📋 **Phase 4: Support & Communication (Days 8-9)**

### **Day 8: Ticket System**
- [ ] Create tickets database schema
- [ ] Build ticket list view
- [ ] Create ticket detail page
- [ ] Add ticket response system
- [ ] Build ticket status management

### **Day 9: Consultation Management**
- [ ] Create consultations database schema
- [ ] Build consultation scheduler
- [ ] Add calendar integration
- [ ] Create sales pipeline view
- [ ] Build follow-up reminders

---

## 📋 **Phase 5: Analytics & Automation (Days 10-12)**

### **Day 10: Analytics Dashboard**
- [ ] Build revenue analytics
- [ ] Create client metrics dashboard
- [ ] Add lead delivery tracking
- [ ] Build conversion funnel
- [ ] Add export functionality

### **Day 11: Automation Rules**
- [ ] Create email templates
- [ ] Build welcome email automation
- [ ] Add invoice reminder automation
- [ ] Create lead delivery automation
- [ ] Build renewal reminder system

### **Day 12: Polish & Testing**
- [ ] Fix bugs and edge cases
- [ ] Add loading states
- [ ] Improve error handling
- [ ] Add toast notifications
- [ ] Test all workflows end-to-end

---

## 🗄️ **Database Schema**

### **Admin Users**
```sql
- id
- email
- password_hash
- name
- role (super_admin, account_manager)
- created_at
```

### **Clients (Enhanced)**
```sql
- id
- company_name
- contact_person
- email
- phone
- industry
- location
- status (active, trial, paused, churned)
- account_manager_id
- created_at
- updated_at
```

### **Custom Plans**
```sql
- id
- client_id
- plan_name
- monthly_cost
- leads_quota
- cost_per_lead
- delivery_schedule (daily, weekly)
- lead_sources (json: linkedin, google_maps, etc.)
- geographic_focus
- industry_focus
- min_quality_score
- contract_start_date
- contract_end_date
- auto_renewal
- special_terms (text)
- created_at
- updated_at
```

### **Leads**
```sql
- id
- client_id (nullable - unassigned leads)
- name
- company
- email
- phone
- industry
- location
- source
- quality_score
- status (unassigned, assigned, contacted, qualified, converted)
- assigned_at
- notes
- created_at
```

### **Invoices**
```sql
- id
- client_id
- invoice_number
- amount
- status (draft, sent, paid, overdue)
- due_date
- paid_at
- payment_method
- notes
- created_at
```

### **Support Tickets**
```sql
- id
- client_id
- subject
- description
- status (open, in_progress, resolved, closed)
- priority (low, medium, high, urgent)
- assigned_to (admin_id)
- created_at
- resolved_at
```

### **Consultations**
```sql
- id
- name
- email
- phone
- company
- industry
- status (scheduled, completed, no_show, converted)
- scheduled_at
- notes
- proposal_sent
- proposal_amount
- converted_to_client_id
- created_at
```

---

## 🎨 **Admin Sidebar Structure**

```
Logo + "Admin Panel"

📊 Dashboard (Overview)
👥 Clients (List + Add)
📦 Leads (Upload + Assign)
💰 Billing (Invoices + Revenue)
🎫 Support (Tickets)
📞 Consultations (Sales Pipeline)
📈 Analytics (Reports)
⚙️ Settings (Profile + Team)
```

---

## 🔐 **Authentication Flow**

1. Admin logs in at `/admin/login`
2. Creates session with role check
3. Middleware protects `/admin/*` routes
4. Customer dashboard at `/dashboard` (separate)
5. No overlap between admin and customer sessions

---

## 💡 **Key Features Per Page**

### **Dashboard Overview**
- Total Active Clients
- MRR (Monthly Recurring Revenue)
- Leads Delivered This Month
- Pending Tickets
- Upcoming Consultations
- Quick Actions (Add Client, Upload Leads)

### **Client Detail Page**
- Company info + contact details
- Current custom plan details
- Edit plan (cost, quota, terms)
- Leads delivered history
- Billing history
- Support tickets
- Activity log
- Quick actions (Upload Leads, Generate Invoice)

### **Lead Upload**
- Drag & drop CSV
- Map CSV columns
- Preview leads
- Validate data
- Assign to client (dropdown)
- Bulk assign to multiple clients

### **Invoice Generator**
- Select client
- Add line items (plan cost, extra leads, etc.)
- Set due date
- Generate PDF
- Send email
- Mark as paid

---

## 🚀 **Tech Stack**

- **Framework:** Next.js 15 (already in place)
- **Database:** Supabase PostgreSQL
- **UI:** Shadcn UI + Tailwind CSS
- **Auth:** Supabase Auth (admin role)
- **PDF:** react-pdf or similar
- **CSV:** papaparse
- **Forms:** react-hook-form + zod

---

## 📝 **Success Criteria**

✅ Can add and manage clients easily
✅ Can create fully custom plans for each client
✅ Can upload and assign leads quickly
✅ Can generate and track invoices
✅ Can view revenue and analytics
✅ Can manage support tickets
✅ Can track sales pipeline
✅ Clean, professional UI
✅ Fast and responsive
✅ No bugs in critical flows

---

## ⏱️ **Timeline**

**Optimistic:** 10-12 working days
**Realistic:** 14-18 working days
**With buffer:** 3-4 weeks

---

**Started:** October 27, 2025
**Target Completion:** Mid-November 2025

Let's build! 🚀

