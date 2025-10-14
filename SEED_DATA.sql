-- ============================================================================
-- SEED DATA - Subscription Plans & Initial Configuration
-- Run this AFTER running COMPLETE_DATABASE_SCHEMA.sql
-- ============================================================================

-- Insert Subscription Plans (matching frontend demo)
INSERT INTO subscription_plans (
  plan_id, 
  plan_name, 
  description, 
  price_inr, 
  price_quarterly_inr,
  price_annual_inr,
  leads_quota, 
  overage_price_inr, 
  features,
  max_campaigns, 
  max_team_members,
  ad_platforms,
  includes_ai_scoring,
  includes_whatsapp,
  includes_email,
  includes_sms,
  is_active, 
  is_visible,
  display_order
) VALUES 
  -- STARTER PLAN
  (
    'starter',
    'Starter Plan',
    'Perfect for small businesses just getting started with lead generation',
    4999, -- ₹4,999/month
    13499, -- ₹13,499/quarter (10% discount)
    47999, -- ₹47,999/year (20% discount)
    25, -- 25 leads/month
    200, -- ₹200 per extra lead
    '{
      "ad_platforms": ["Facebook Ads"],
      "messaging_channels": ["Email", "WhatsApp"],
      "support": "Email support (24-48hr response)",
      "ai_lead_scoring": true,
      "basic_analytics": true,
      "monthly_reports": true
    }'::jsonb,
    2, -- Max 2 campaigns
    1, -- 1 team member
    ARRAY['Facebook']::TEXT[],
    true, -- AI scoring included
    true, -- WhatsApp included
    true, -- Email included
    false, -- SMS not included
    true, -- Active
    true, -- Visible
    1 -- Display order
  ),
  
  -- PROFESSIONAL PLAN (Most Popular)
  (
    'professional',
    'Professional Plan',
    'For growing businesses that need consistent, high-quality leads',
    9999, -- ₹9,999/month
    26999, -- ₹26,999/quarter (10% discount)
    95999, -- ₹95,999/year (20% discount)
    50, -- 50 leads/month
    150, -- ₹150 per extra lead
    '{
      "ad_platforms": ["Facebook Ads", "Google Ads"],
      "messaging_channels": ["Email", "WhatsApp", "SMS"],
      "support": "Priority Email + Chat (12-24hr response)",
      "ai_lead_scoring": true,
      "advanced_analytics": true,
      "custom_targeting": true,
      "monthly_strategy_call": true,
      "performance_optimization": true
    }'::jsonb,
    5, -- Max 5 campaigns
    3, -- 3 team members
    ARRAY['Facebook', 'Google']::TEXT[],
    true, -- AI scoring included
    true, -- WhatsApp included
    true, -- Email included
    true, -- SMS included
    true, -- Active
    true, -- Visible
    2 -- Display order
  ),
  
  -- ENTERPRISE PLAN
  (
    'enterprise',
    'Enterprise Plan',
    'For established businesses with high-volume lead needs',
    24999, -- ₹24,999/month
    67499, -- ₹67,499/quarter (10% discount)
    239999, -- ₹2,39,999/year (20% discount)
    150, -- 150 leads/month
    100, -- ₹100 per extra lead
    '{
      "ad_platforms": ["Facebook Ads", "Google Ads", "LinkedIn Ads"],
      "messaging_channels": ["All channels - Email, WhatsApp, SMS, Voice"],
      "support": "Dedicated Account Manager + 24/7 Priority Support",
      "ai_lead_scoring": true,
      "premium_analytics": true,
      "custom_reporting": true,
      "api_access": true,
      "white_label_option": true,
      "advanced_ai_features": true,
      "bi_weekly_strategy_calls": true,
      "dedicated_campaign_manager": true
    }'::jsonb,
    99, -- Unlimited campaigns
    10, -- 10 team members
    ARRAY['Facebook', 'Google', 'LinkedIn']::TEXT[],
    true, -- AI scoring included
    true, -- WhatsApp included
    true, -- Email included
    true, -- SMS included
    true, -- Active
    true, -- Visible
    3 -- Display order
  );

-- ============================================================================
-- VERIFY SEED DATA
-- ============================================================================

-- Check subscription plans created
SELECT 
  plan_id,
  plan_name,
  price_inr,
  leads_quota,
  max_campaigns,
  is_active
FROM subscription_plans
ORDER BY display_order;

-- ============================================================================
-- SEED DATA COMPLETE!
-- ============================================================================

-- Expected Output:
-- starter       | Starter Plan       | 4999  | 25  | 2  | true
-- professional  | Professional Plan  | 9999  | 50  | 5  | true
-- enterprise    | Enterprise Plan    | 24999 | 150 | 99 | true


