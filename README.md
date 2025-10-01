# 🚀 TransitionAI - AI Marketing Automation Platform

## Overview
A complete AI-powered marketing automation platform with 6 specialized agents that handle lead generation, content creation, email campaigns, social media, SEO, and analytics.

## Tech Stack
- **Frontend:** Next.js 15, React, Tailwind CSS
- **Backend:** Next.js API Routes, Supabase
- **Database:** PostgreSQL (Supabase)
- **AI:** OpenAI GPT-4, Anthropic Claude
- **Payments:** Razorpay
- **Deployment:** Vercel

## Project Structure

```
transitionai/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Homepage (dark theme)
│   │   ├── dashboard/         # User dashboard
│   │   ├── get-started/       # Signup flow
│   │   ├── how-it-works/      # Info page
│   │   ├── checkout/          # Payment page
│   │   └── api/               # API routes
│   │       ├── auth/          # NextAuth
│   │       ├── payments/      # Razorpay
│   │       └── email/         # SendGrid
│   ├── components/            # React components
│   └── lib/                   # Utilities & services
│       ├── supabase.ts       # Supabase client
│       ├── auth.ts           # Authentication
│       └── razorpay.ts       # Payment processing
├── supabase/
│   └── migrations/           # Database migrations
├── scripts/                  # Utility scripts
├── public/                   # Static assets
│   ├── mascots/             # AI agent mascots
│   └── images/              # Graphics
└── docs/                     # Documentation
    ├── PRODUCT_ROADMAP.md
    └── WEEK_1_SETUP_CHECKLIST.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key
- Supabase account

### Installation

```bash
npm install
```

### Environment Setup

1. Copy template:
```bash
cp env.template .env.local
```

2. Add your API keys to `.env.local`

3. Run database migration in Supabase SQL Editor

4. Start development server:
```bash
npm run dev
```

## Development Progress

### ✅ Completed (Week 1)
- Dark theme homepage design
- 6 AI agent structure
- Database schema design
- Supabase integration
- OpenAI connection
- Environment setup

### 🔄 In Progress
- Agent #1: Lead Finder
- Background job system
- Real automation workflows

### 📋 Upcoming
- Agent #2: Content Writer
- Agent #3: Email Pro
- Agent #4: Social Manager
- Agent #5: SEO Expert
- Agent #6: Data Analyst

## Documentation

- `PRODUCT_ROADMAP.md` - Complete development roadmap
- `WEEK_1_SETUP_CHECKLIST.md` - API setup guide
- `IMAGE_GENERATION_PROMPTS.md` - Mascot generation guide
- `CLEANUP_PLAN.md` - Project cleanup tracking

## Deployment

Automatic deployment via Vercel on push to main branch.

**Live Site:** https://transitionmarketingai.com

## License

Proprietary - All rights reserved
