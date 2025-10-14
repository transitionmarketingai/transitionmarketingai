# Cleanup Plan - Remove Old Files

## Files to DELETE (Old Business Model)

### API Routes (Old):
- api/audit/
- api/beta-testing/
- api/campaigns/ (old version)
- api/crm/
- api/email/send/
- api/leads/ (old version - keep only what's in webhooks)
- api/payments/create-checkout-session/
- api/payments/create-order/
- api/payments/verify/
- api/payments/webhook/
- api/searches/
- api/system/
- api/v1/ (entire v1 API)
- api/auth/[...nextauth]/ (old auth)
- api/auth/register/

### Pages (Old):
- api-docs/
- billing/
- book/
- campaigns/ (old version)
- cancel/
- checkout/
- credits/
- demo/
- forgot-password/
- get-started/
- help/
- how-it-works/ (replaced by marketing pages)
- integrations/
- onboarding/page.tsx (old - we have new in (auth)/)
- pricing/page.tsx (old - we have new in (marketing)/)
- settings/
- signin/ (old)
- signup/ (old)
- success/
- privacy/
- terms/

### Keep:
- (auth)/onboarding/ (NEW)
- (marketing)/* (ALL NEW)
- admin/* (NEW)
- api/onboarding/ (NEW)
- api/messaging/ (NEW)
- api/webhooks/ (NEW)
- dashboard/* (NEW)
- layout.tsx, globals.css, etc.
