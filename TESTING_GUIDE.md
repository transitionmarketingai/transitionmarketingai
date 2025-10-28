# 🧪 Complete Testing Guide for Transition Marketing AI

## 📋 Table of Contents
1. [Admin Login Setup](#admin-login-setup)
2. [Admin Dashboard Testing](#admin-dashboard-testing)
3. [Marketing Website Testing](#marketing-website-testing)
4. [Client Dashboard Testing](#client-dashboard-testing)
5. [End-to-End Workflow Testing](#end-to-end-workflow-testing)

---

## 🔐 Admin Login Setup

### Step 1: Create Admin User in Supabase

You need to create an admin user in Supabase Auth. Here's how:

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Add User"** → **"Create New User"**
4. Enter the following:
   - **Email**: `admin@transitionmarketingai.com` (or your preferred email)
   - **Password**: Choose a strong password (e.g., `Admin@2024!`)
   - **Auto Confirm User**: ✅ Check this box
5. Click **"Create User"**

#### Option B: Using SQL (Alternative)

1. Go to Supabase **SQL Editor**
2. Run this query (replace email/password):

```sql
-- Create admin user via Supabase Auth
-- Note: You'll need to use Supabase Auth API or Dashboard to create users
-- This is just for reference

-- The admin login checks for emails ending in @transitionmarketingai.com
-- OR the specific email: admin@leadgen.in
```

### Step 2: Admin Login Credentials

**Default Admin Login:**
- **URL**: `https://your-domain.com/admin/login`
- **Email**: `admin@transitionmarketingai.com` (or `admin@leadgen.in`)
- **Password**: (the password you set when creating the user)

**Note**: The admin login route checks for:
- Emails ending with `@transitionmarketingai.com`
- OR the specific email: `admin@leadgen.in`

---

## 🎯 Admin Dashboard Testing

### 1. **Admin Login Flow**
- [ ] Go to `/admin/login`
- [ ] Enter admin credentials
- [ ] Should redirect to `/admin/dashboard`
- [ ] Sidebar should show all admin sections

### 2. **Admin Dashboard Overview**
- [ ] View total clients, consultations, revenue stats
- [ ] Check recent activity feed
- [ ] Verify time range selector works
- [ ] Review revenue charts

### 3. **Consultations Management** (`/admin/consultations`)
- [ ] View list of consultation requests
- [ ] Filter by status (pending, scheduled, completed, converted)
- [ ] Click "Onboard Client" to start onboarding process
- [ ] Update consultation status
- [ ] Add notes to consultations

### 4. **Client Onboarding Flow** (`/admin/consultations/[id]/onboard`)
- [ ] Complete all 6 steps of onboarding:
  1. **Basic Information**: Business name, contact, email, phone
  2. **Business Details**: Industry, type, size, location
  3. **Current Marketing Situation**: Lead sources, budget, pain points
  4. **Target Market**: ICP, geographic areas, competitors
  5. **Lead Requirements**: Volume, CPL, urgency, quality expectations
  6. **Custom Proposal**: Budget, quota, CPL (auto-calculated), pricing guidelines
- [ ] Submit onboarding form
- [ ] Should redirect to new client detail page

### 5. **Client Management** (`/admin/clients`)
- [ ] View all clients list
- [ ] Search and filter clients
- [ ] Click on client to view details
- [ ] Check client stats (total leads, delivered, revenue)
- [ ] View client tabs:
  - Overview
  - Plan Details
  - Leads Delivered
  - Activity History

### 6. **Custom Plan Builder** (`/admin/clients/[id]/plan`)
- [ ] View existing plan
- [ ] Edit plan details:
  - Monthly cost
  - Leads quota
  - Cost per lead (auto-calculated)
  - Service selection (AI Scraping, Outreach, Meta Ads, Google Ads)
  - Custom services
  - Payment terms
  - Contract duration
- [ ] Save plan changes

### 7. **Lead Upload** (`/admin/clients/[id]/leads/upload`)
- [ ] Upload CSV file with leads
- [ ] Download CSV template
- [ ] Preview parsed leads
- [ ] Add leads manually
- [ ] Verify leads appear in client dashboard

### 8. **Invoice Generator** (`/admin/clients/[id]/invoice`)
- [ ] Generate new invoice
- [ ] Add line items
- [ ] Test auto-calculations (subtotal, tax, total)
- [ ] Set payment terms
- [ ] Download/print invoice preview
- [ ] Save invoice

### 9. **Analytics Dashboard** (`/admin/analytics`)
- [ ] View revenue trends (last 7, 30, 90 days, all time)
- [ ] Check client status distribution
- [ ] Review lead generation stats
- [ ] View recent activity feed

### 10. **Resources Hub** (`/admin/resources`)
- [ ] Browse 6 resource tabs:
  - Overview
  - Pricing Guide
  - Lead Generation
  - Workflow
  - Testing Checklist
  - Quick Start
- [ ] Copy code snippets
- [ ] Review guides and checklists

---

## 🌐 Marketing Website Testing

### 1. **Homepage** (`/`)
- [ ] Hero section looks professional
- [ ] Dashboard mockup displays correctly
- [ ] Infographic table shows lead sources
- [ ] All CTAs link to `/consultation`
- [ ] Page is fully responsive (mobile, tablet, desktop)
- [ ] No industry mentions visible
- [ ] No stats/social proof numbers

### 2. **Consultation Request Form** (`/consultation`)
- [ ] Fill out the form:
  - Name, Email, Phone, Company
  - Industry (dropdown)
  - Preferred day/time
  - WhatsApp opt-in
- [ ] Submit form
- [ ] Should show success message
- [ ] Should appear in admin consultations list

### 3. **Navigation**
- [ ] All nav links work (Features, How It Works, Pricing, FAQ)
- [ ] "Request Free Consultation" button works
- [ ] "Watch Demo" button redirects to demo login

### 4. **Responsive Design**
- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Infographic table scrolls horizontally on mobile
- [ ] All sections stack properly on mobile
- [ ] Typography scales correctly

### 5. **Demo Mode** (`/login?demo=true`)
- [ ] Click "Watch Demo" from homepage
- [ ] Should auto-login to demo dashboard
- [ ] Demo dashboard should show sample data
- [ ] All sidebar links work
- [ ] No redirects to login page

---

## 👤 Client Dashboard Testing

### 1. **Signup Flow** (`/signup`)
- [ ] Create new account
- [ ] Fill signup form
- [ ] Should create customer record in Supabase
- [ ] Should assign trial subscription
- [ ] Redirect to onboarding

### 2. **Onboarding Flow** (Client-side)
- [ ] Complete client onboarding steps
- [ ] Should save to database
- [ ] Redirect to dashboard after completion

### 3. **Client Dashboard** (`/dashboard`)
- [ ] View dashboard overview
- [ ] Check stats cards
- [ ] View recent leads table
- [ ] All sidebar links work:
  - Overview
  - Prospects (locked leads)
  - All Leads (unlocked)
  - Analytics
  - Settings

### 4. **Leads Management**
- [ ] View prospects list (with "Unlock Contact" buttons)
- [ ] View all leads (unlocked contacts)
- [ ] Filter and search leads
- [ ] View lead details modal
- [ ] Check lead sources and quality scores

---

## 🔄 End-to-End Workflow Testing

### Complete Client Journey:

1. **Marketing Website** → Consultation Request
   - [ ] User visits homepage
   - [ ] Clicks "Request Free Consultation"
   - [ ] Fills consultation form
   - [ ] Submits request

2. **Admin** → Process Consultation
   - [ ] Admin logs in
   - [ ] Views new consultation in `/admin/consultations`
   - [ ] Clicks "Onboard Client"
   - [ ] Completes 6-step onboarding form
   - [ ] Creates custom plan
   - [ ] Submits onboarding

3. **Admin** → Generate & Deliver Leads
   - [ ] Goes to client detail page
   - [ ] Uploads leads via CSV or manual entry
   - [ ] Leads appear in client dashboard

4. **Client** → View Leads
   - [ ] Client logs in
   - [ ] Sees leads in dashboard
   - [ ] Can view contact details
   - [ ] Can export leads

5. **Admin** → Generate Invoice
   - [ ] Goes to invoice page
   - [ ] Creates invoice for client
   - [ ] Invoice saved to database

---

## 🐛 Common Issues & Troubleshooting

### Admin Login Not Working?
1. **Check Supabase User**: Ensure user exists in Supabase Auth
2. **Check Email Domain**: Must be `@transitionmarketingai.com` or `admin@leadgen.in`
3. **Check Password**: Ensure correct password
4. **Check Console**: Look for error messages in browser console

### Database Connection Issues?
1. **Check Environment Variables**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
2. **Check Supabase**: Verify database tables exist (run SQL migrations)
3. **Check RLS Policies**: Ensure Row Level Security policies allow access

### Leads Not Showing?
1. **Check Demo Mode**: If in demo mode, uses mock data
2. **Check API Endpoints**: Verify `/api/admin/clients/[id]/leads` works
3. **Check Database**: Verify leads exist in `client_leads` table

### Onboarding Form Not Saving?
1. **Check Console**: Look for API errors
2. **Check Network Tab**: Verify POST request to `/api/admin/onboarding` succeeds
3. **Check Database**: Ensure all required tables exist

---

## 📝 Testing Checklist Summary

### ✅ Admin Features
- [ ] Admin login works
- [ ] Dashboard loads with stats
- [ ] Consultations management works
- [ ] Client onboarding form works
- [ ] Custom plan builder works
- [ ] Lead upload (CSV + manual) works
- [ ] Invoice generator works
- [ ] Analytics dashboard works
- [ ] Resources hub accessible

### ✅ Marketing Website
- [ ] Homepage loads correctly
- [ ] Consultation form works
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] All links work
- [ ] Demo mode works

### ✅ Client Dashboard
- [ ] Signup works
- [ ] Onboarding works
- [ ] Dashboard displays data
- [ ] Leads management works
- [ ] All sidebar links work

---

## 🚀 Quick Start Testing Commands

```bash
# Run local development
npm run dev

# Test production build
npm run build
npm start

# Run linting
npm run lint
```

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check Network tab for failed API calls
3. Check Supabase logs
4. Review this guide's troubleshooting section

---

**Last Updated**: January 2025
**Version**: 1.0

