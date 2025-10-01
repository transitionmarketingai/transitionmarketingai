# 🧹 Project Cleanup Plan

## Files to DELETE (Old/Unnecessary):

### Root Level Screenshots (Old Design):
- ❌ dashboard-analytics.png
- ❌ dashboard-campaigns.png
- ❌ dashboard-content.png
- ❌ dashboard-desktop.png
- ❌ dashboard-fresh-cache.png
- ❌ dashboard-full.png
- ❌ dashboard-leads.png
- ❌ dashboard-mobile-overview.png
- ❌ dashboard-mobile.png
- ❌ dashboard-notifications-open.png
- ❌ dashboard-overview.png
- ❌ dashboard-settings.png
- ❌ dashboard-tablet-overview.png
- ❌ dashboard-tablet.png
- ❌ dashboard-widget-selector.png
- ❌ homepage-desktop.png
- ❌ homepage-fresh-cache.png
- ❌ homepage-mobile.png

### Documentation (Consolidate):
- ❌ clear-cache-instructions.md
- ❌ setup-env-instructions.md
- ❌ AI_MASCOT_PROMPTS.md (replace with IMAGE_GENERATION_PROMPTS.md)
- ❌ QUICK_START_MASCOTS.md (redundant)
- ❌ RUN_IN_SUPABASE.md (keep for now, will consolidate)

### Old Config Files:
- ❌ docker-compose.yml (not using Docker yet)
- ❌ Dockerfile (not using Docker yet)
- ❌ playwright.config.ts (old testing)
- ❌ tests/ folder (old UI tests)
- ❌ test-results/ folder

### Prisma (Switching to Supabase):
- ❌ prisma/dev.db
- ❌ prisma/schema.prisma
- ❌ prisma/schema.production.prisma
- ❌ supabase-setup.sql (old)

### Old Data Services:
- ❌ src/lib/dataService.ts
- ❌ src/lib/supabaseDataService.ts (replaced with new structure)
- ❌ src/lib/mockDataService.ts (was for demo only)
- ❌ src/lib/prisma.ts

### Old Components (Keep Some):
- ❌ src/components/AnalyticsProvider.tsx (rebuild later)
- ❌ src/components/PerformanceMonitor.tsx (rebuild later)
- ✅ KEEP: AuditForm, CheckoutButton, RazorpayButton (still needed)

### Old API Routes (Audit):
- ❌ src/app/api/audit/ (old audit form)
- ❌ src/app/api/analytics/ (rebuild with new agents)
- ❌ src/app/api/content/ (rebuild)
- ❌ src/app/api/leads/ (rebuild)
- ✅ KEEP: payments, auth (still needed)

### Old Pages:
- ❌ src/app/auth/signin (rebuild simpler)
- ❌ src/app/auth/signup (rebuild simpler)
- ❌ src/app/cancel/page.tsx
- ❌ src/app/success/page.tsx

---

## Files to KEEP (Essential):

### Core:
- ✅ package.json
- ✅ tsconfig.json
- ✅ next.config.ts
- ✅ tailwind.config.js
- ✅ postcss.config.mjs
- ✅ eslint.config.mjs

### Environment:
- ✅ env.template
- ✅ .env.local (your machine only)

### New Documentation:
- ✅ PRODUCT_ROADMAP.md
- ✅ WEEK_1_SETUP_CHECKLIST.md
- ✅ IMAGE_GENERATION_PROMPTS.md
- ✅ README.md

### App Structure:
- ✅ src/app/page.tsx (new dark design)
- ✅ src/app/layout.tsx
- ✅ src/app/globals.css
- ✅ src/app/dashboard/page.tsx (will rebuild)
- ✅ src/app/how-it-works/page.tsx (will update to dark)
- ✅ src/app/get-started/page.tsx (will update to dark)
- ✅ src/app/checkout/page.tsx
- ✅ src/app/book/page.tsx
- ✅ src/app/privacy/page.tsx
- ✅ src/app/terms/page.tsx

### Components (Minimal):
- ✅ src/components/AuditForm.tsx
- ✅ src/components/CheckoutButton.tsx
- ✅ src/components/RazorpayButton.tsx
- ✅ src/components/SessionProvider.tsx
- ✅ src/components/ErrorBoundary.tsx

### New Infrastructure:
- ✅ supabase/migrations/001_initial_schema.sql
- ✅ scripts/test-connections.ts
- ✅ scripts/run-migration.ts
- ✅ src/lib/supabase.ts
- ✅ src/lib/auth.ts
- ✅ src/lib/razorpay.ts

### Public Assets:
- ✅ public/favicon.ico
- ✅ public/mascots/ (for new mascots)
- ✅ public/images/ (for new graphics)

---

## Estimated Space Saved:
- ~50MB of old screenshots
- ~20 unnecessary files
- Cleaner structure

