# Onboarding Quiz System - Setup Guide

## ✅ What Was Implemented

### 1. Onboarding Quiz Page (`/onboarding`)
- Multi-step quiz UI with progress indicator
- 8 questions total:
  1. Industry (dropdown with 13 industries)
  2. City (text input)
  3. Average customer value (multiple-choice buttons)
  4. Current monthly inquiries (multiple-choice)
  5. Desired monthly inquiries (multiple-choice)
  6. Comfort monthly ad budget (multiple-choice)
  7. Sales team (Yes/No buttons)
  8. Contact information (Name, Email, Phone)

### 2. Lead Scoring Logic
Score calculation based on:
- **High-ticket industries**: +20 points
  - Real Estate & Builders
  - Healthcare & Wellness
  - Finance & Insurance
  - Logistics & B2B
  - Startups & SaaS
- **Customer value**: +10 to +30 points
  - Under ₹10k: 0
  - ₹10k-50k: +10
  - ₹50k-1L: +15
  - ₹1L-5L: +25
  - Over ₹5L: +30
- **Budget range**: +10 to +30 points
  - Under ₹25k: +10
  - ₹25k-40k: +15
  - ₹40k-60k: +20
  - ₹60k-1L: +25
  - Over ₹1L: +30
- **Sales team**: +15 (Yes), 0 (No)
- **Current inquiries > 10**: +10
- **Desired leads > 50**: +10
- **Tier-1 cities**: +10
  - Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Surat, Lucknow, Kanpur

**Total Score Range**: 0-100

### 3. Redirect Logic
- **Score >= 70**: Redirect to `/qualified`
  - Message: "Great news! You qualify for our 30-day pilot program. Your estimated investment: ₹35k–₹55k (including ads)."
- **Score 40-69**: Redirect to `/review-needed`
  - Message: "You're a good fit. Most businesses like you invest ₹20k–₹40k for the 30-day pilot."
- **Score < 40**: Redirect to `/not-a-fit`
  - Message: "We currently only partner with businesses ready to scale quickly. You can join our waitlist here."

### 4. Result Pages
- **`/qualified`**: Success page with Calendly embed and benefits list
- **`/review-needed`**: Good fit page with explanation and Calendly embed
- **`/not-a-fit`**: Waitlist page with form submission

### 5. Backend Storage
- API endpoint: `/api/onboarding/submit` - Stores quiz results
- API endpoint: `/api/waitlist/submit` - Stores waitlist entries
- Both use Supabase for storage

---

## 📋 Database Setup

**⚠️ Important:** The database schema is now unified in a single file.

**Use the unified schema file:** `supabase/initial_schema.sql`

This file contains all required tables:
- `onboarding_submissions` - Quiz submissions with status tracking
- `waitlist` - Waitlist entries
- `client_onboarding_calls` - Admin call checklists (for admin dashboard)

### Quick Setup

1. **Open Supabase Dashboard** → SQL Editor
2. **Copy contents** of `supabase/initial_schema.sql`
3. **Paste and run** in SQL Editor

The schema is **idempotent** (safe to run multiple times) and includes:
- All required columns with proper types
- Indexes for performance
- Foreign key relationships
- Auto-update triggers for `updated_at` timestamps
- Support for both new installations and existing databases

### For Detailed Setup Instructions

See **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** for:
- Complete environment variable setup
- Step-by-step schema application guide
- Supabase client usage examples
- Health check procedures
- Troubleshooting guide

---

## 🔧 Features

### Quiz Features
- ✅ Progress bar showing completion percentage
- ✅ Step-by-step navigation (Back/Next buttons)
- ✅ Form validation (can't proceed without answering)
- ✅ Mobile-responsive design
- ✅ Clean card-based UI matching site design

### Scoring Features
- ✅ Real-time score calculation
- ✅ Industry-specific scoring
- ✅ City-based scoring (Tier-1 cities)
- ✅ Budget and value-based scoring

### Result Pages Features
- ✅ Calendly integration for qualified/review-needed
- ✅ Waitlist form for not-a-fit
- ✅ Success confirmations
- ✅ Consistent design with homepage

---

## 🚀 Usage

1. Users visit `/onboarding`
2. Complete 8-step quiz
3. System calculates score automatically
4. User is redirected based on score:
   - High score (70+): `/qualified` → Book consultation
   - Medium score (40-69): `/review-needed` → Book consultation
   - Low score (<40): `/not-a-fit` → Join waitlist

---

## 📊 Analytics

All quiz submissions are stored in `onboarding_submissions` table with:
- All quiz answers
- Calculated score
- Contact information
- Timestamp

This allows you to:
- Track conversion rates by score
- Analyze which industries score highest
- Review budget ranges and customer values
- Follow up with qualified leads

---

## 🎨 Design Notes

- Matches existing site design (Hormozi-style)
- Uses same fonts, colors, and button styles
- Fully responsive on mobile
- Progress indicator for user engagement
- Clear CTAs on all result pages

---

## ✅ Next Steps

1. Create database tables in Supabase (SQL above)
2. Test quiz flow end-to-end
3. Verify redirects work correctly
4. Test Calendly embeds on result pages
5. Monitor submissions in Supabase dashboard

