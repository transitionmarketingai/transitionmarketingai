-- Admin Analytics Functions for India Lead Generation Platform
-- Add these to your Supabase project

-- ============================================================================
-- ADMIN DASHBOARD STATS
-- ============================================================================

-- Get overall admin statistics
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS JSON AS $$
DECLARE
  v_result JSON;
BEGIN
  SELECT json_build_object(
    'total_customers', (SELECT COUNT(*) FROM customers),
    'active_customers', (SELECT COUNT(*) FROM customers WHERE subscription_status = 'active' AND created_at < NOW() - INTERVAL '7 days'),
    'trial_customers', (SELECT COUNT(*) FROM customers WHERE subscription_status = 'active' AND created_at >= NOW() - INTERVAL '7 days'),
    'paused_customers', (SELECT COUNT(*) FROM customers WHERE subscription_status = 'paused'),
    'cancelled_customers', (SELECT COUNT(*) FROM customers WHERE subscription_status = 'cancelled'),
    
    'total_revenue_this_month', (
      SELECT COALESCE(SUM(total_amount), 0)
      FROM invoices
      WHERE status = 'paid'
        AND invoice_date >= date_trunc('month', CURRENT_DATE)
    ),
    
    'total_leads_this_month', (
      SELECT COUNT(*)
      FROM leads
      WHERE created_at >= date_trunc('month', CURRENT_DATE)
    ),
    
    'total_ad_spend_this_month', (
      SELECT COALESCE(SUM(amount_spent), 0)
      FROM ad_campaigns
      WHERE created_at >= date_trunc('month', CURRENT_DATE)
    ),
    
    'avg_quality_score', (
      SELECT COALESCE(AVG(quality_score), 0)
      FROM leads
      WHERE created_at >= date_trunc('month', CURRENT_DATE)
    ),
    
    'active_campaigns', (
      SELECT COUNT(*)
      FROM ad_campaigns
      WHERE status = 'active'
    ),
    
    'pending_setups', (
      SELECT COUNT(*)
      FROM customers c
      LEFT JOIN ad_campaigns ac ON ac.customer_id = c.id
      WHERE c.subscription_status = 'active'
        AND c.created_at >= NOW() - INTERVAL '3 days'
        AND ac.id IS NULL
    ),
    
    'trials_ending_soon', (
      SELECT COUNT(*)
      FROM subscriptions
      WHERE is_trial = TRUE
        AND trial_end <= NOW() + INTERVAL '3 days'
        AND trial_end >= NOW()
    )
  ) INTO v_result;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- CUSTOMER METRICS
-- ============================================================================

-- Get detailed metrics for a specific customer
CREATE OR REPLACE FUNCTION get_customer_metrics(p_customer_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
BEGIN
  SELECT json_build_object(
    'total_leads', (
      SELECT COUNT(*)
      FROM leads
      WHERE customer_id = p_customer_id
    ),
    
    'leads_this_month', (
      SELECT COUNT(*)
      FROM leads
      WHERE customer_id = p_customer_id
        AND created_at >= date_trunc('month', CURRENT_DATE)
    ),
    
    'qualified_leads', (
      SELECT COUNT(*)
      FROM leads
      WHERE customer_id = p_customer_id
        AND qualification_status IN ('hot', 'warm', 'qualified')
    ),
    
    'converted_leads', (
      SELECT COUNT(*)
      FROM leads
      WHERE customer_id = p_customer_id
        AND is_converted = TRUE
    ),
    
    'conversion_rate', (
      SELECT CASE 
        WHEN COUNT(*) > 0 THEN 
          (COUNT(*) FILTER (WHERE is_converted = TRUE)::NUMERIC / COUNT(*)::NUMERIC * 100)
        ELSE 0
      END
      FROM leads
      WHERE customer_id = p_customer_id
    ),
    
    'avg_quality_score', (
      SELECT COALESCE(AVG(quality_score), 0)
      FROM leads
      WHERE customer_id = p_customer_id
    ),
    
    'avg_response_time', (
      SELECT COALESCE(
        AVG(EXTRACT(EPOCH FROM (first_contact_at - created_at)) / 3600),
        0
      )
      FROM leads
      WHERE customer_id = p_customer_id
        AND first_contact_at IS NOT NULL
    ),
    
    'total_ad_spend', (
      SELECT COALESCE(SUM(amount_spent), 0)
      FROM ad_campaigns
      WHERE customer_id = p_customer_id
    ),
    
    'avg_cost_per_lead', (
      SELECT CASE
        WHEN COUNT(l.id) > 0 THEN
          COALESCE(SUM(ac.amount_spent), 0) / COUNT(l.id)
        ELSE 0
      END
      FROM ad_campaigns ac
      LEFT JOIN leads l ON l.campaign_id = ac.id
      WHERE ac.customer_id = p_customer_id
    )
  ) INTO v_result;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- CAMPAIGN PERFORMANCE
-- ============================================================================

-- Get campaign performance summary
CREATE OR REPLACE FUNCTION get_campaign_performance(p_campaign_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
BEGIN
  SELECT json_build_object(
    'total_impressions', impressions,
    'total_clicks', clicks,
    'total_leads', leads_generated,
    'total_spent', amount_spent,
    'ctr', CASE WHEN impressions > 0 THEN (clicks::NUMERIC / impressions::NUMERIC * 100) ELSE 0 END,
    'cpc', CASE WHEN clicks > 0 THEN (amount_spent / clicks) ELSE 0 END,
    'cpl', CASE WHEN leads_generated > 0 THEN (amount_spent / leads_generated) ELSE 0 END,
    'conversion_rate', CASE WHEN clicks > 0 THEN (conversions::NUMERIC / clicks::NUMERIC * 100) ELSE 0 END,
    
    'leads_by_quality', (
      SELECT json_build_object(
        'hot', COUNT(*) FILTER (WHERE quality_score >= 80),
        'warm', COUNT(*) FILTER (WHERE quality_score >= 60 AND quality_score < 80),
        'qualified', COUNT(*) FILTER (WHERE quality_score >= 40 AND quality_score < 60),
        'cold', COUNT(*) FILTER (WHERE quality_score < 40)
      )
      FROM leads
      WHERE campaign_id = p_campaign_id
    )
  )
  INTO v_result
  FROM ad_campaigns
  WHERE id = p_campaign_id;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- REVENUE ANALYTICS
-- ============================================================================

-- Get monthly revenue breakdown
CREATE OR REPLACE FUNCTION get_monthly_revenue(p_year INTEGER, p_month INTEGER)
RETURNS TABLE (
  subscription_revenue NUMERIC,
  overage_revenue NUMERIC,
  total_revenue NUMERIC,
  customers_count INTEGER,
  avg_revenue_per_customer NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(
      CASE WHEN line_items->0->>'description' LIKE '%Subscription%' 
      THEN (line_items->0->>'amount')::INTEGER 
      ELSE 0 END
    ), 0)::NUMERIC / 100 as subscription_revenue,
    
    COALESCE(SUM(
      CASE WHEN line_items->0->>'description' LIKE '%Overage%' 
      THEN (line_items->0->>'amount')::INTEGER 
      ELSE 0 END
    ), 0)::NUMERIC / 100 as overage_revenue,
    
    COALESCE(SUM(total_amount), 0)::NUMERIC / 100 as total_revenue,
    
    COUNT(DISTINCT customer_id)::INTEGER as customers_count,
    
    CASE WHEN COUNT(DISTINCT customer_id) > 0 
      THEN (COALESCE(SUM(total_amount), 0)::NUMERIC / COUNT(DISTINCT customer_id) / 100)
      ELSE 0 
    END as avg_revenue_per_customer
    
  FROM invoices
  WHERE status = 'paid'
    AND EXTRACT(YEAR FROM invoice_date) = p_year
    AND EXTRACT(MONTH FROM invoice_date) = p_month;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- LEAD QUALITY ANALYTICS
-- ============================================================================

-- Get lead quality distribution
CREATE OR REPLACE FUNCTION get_lead_quality_distribution(
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL
)
RETURNS TABLE (
  quality_range TEXT,
  lead_count BIGINT,
  percentage NUMERIC
) AS $$
DECLARE
  v_start_date DATE := COALESCE(p_start_date, date_trunc('month', CURRENT_DATE)::DATE);
  v_end_date DATE := COALESCE(p_end_date, CURRENT_DATE);
  v_total_leads BIGINT;
BEGIN
  SELECT COUNT(*) INTO v_total_leads
  FROM leads
  WHERE created_at::DATE BETWEEN v_start_date AND v_end_date;
  
  RETURN QUERY
  SELECT 
    quality_range,
    lead_count,
    CASE WHEN v_total_leads > 0 
      THEN (lead_count::NUMERIC / v_total_leads::NUMERIC * 100)
      ELSE 0 
    END as percentage
  FROM (
    SELECT 
      '80-100 (Hot)' as quality_range,
      COUNT(*) as lead_count
    FROM leads
    WHERE created_at::DATE BETWEEN v_start_date AND v_end_date
      AND quality_score >= 80
    
    UNION ALL
    
    SELECT 
      '60-79 (Warm)' as quality_range,
      COUNT(*) as lead_count
    FROM leads
    WHERE created_at::DATE BETWEEN v_start_date AND v_end_date
      AND quality_score >= 60 AND quality_score < 80
    
    UNION ALL
    
    SELECT 
      '40-59 (Qualified)' as quality_range,
      COUNT(*) as lead_count
    FROM leads
    WHERE created_at::DATE BETWEEN v_start_date AND v_end_date
      AND quality_score >= 40 AND quality_score < 60
    
    UNION ALL
    
    SELECT 
      '0-39 (Cold)' as quality_range,
      COUNT(*) as lead_count
    FROM leads
    WHERE created_at::DATE BETWEEN v_start_date AND v_end_date
      AND quality_score < 40
  ) quality_breakdown
  ORDER BY lead_count DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PLATFORM PERFORMANCE
-- ============================================================================

-- Get platform-wide performance metrics
CREATE OR REPLACE FUNCTION get_platform_performance(
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  v_start_date DATE := COALESCE(p_start_date, date_trunc('month', CURRENT_DATE)::DATE);
  v_end_date DATE := COALESCE(p_end_date, CURRENT_DATE);
  v_result JSON;
BEGIN
  SELECT json_build_object(
    'total_leads', COUNT(l.id),
    'total_ad_spend', COALESCE(SUM(ac.amount_spent), 0),
    'avg_cost_per_lead', CASE 
      WHEN COUNT(l.id) > 0 THEN COALESCE(SUM(ac.amount_spent), 0) / COUNT(l.id)
      ELSE 0 
    END,
    
    'leads_by_source', (
      SELECT json_object_agg(source, lead_count)
      FROM (
        SELECT source, COUNT(*) as lead_count
        FROM leads
        WHERE created_at::DATE BETWEEN v_start_date AND v_end_date
        GROUP BY source
      ) source_breakdown
    ),
    
    'leads_by_industry', (
      SELECT json_object_agg(industry, lead_count)
      FROM (
        SELECT c.industry, COUNT(l.id) as lead_count
        FROM leads l
        JOIN customers c ON c.id = l.customer_id
        WHERE l.created_at::DATE BETWEEN v_start_date AND v_end_date
        GROUP BY c.industry
      ) industry_breakdown
    ),
    
    'avg_quality_by_platform', (
      SELECT json_object_agg(platform, avg_quality)
      FROM (
        SELECT ac.platform, AVG(l.quality_score) as avg_quality
        FROM leads l
        JOIN ad_campaigns ac ON ac.id = l.campaign_id
        WHERE l.created_at::DATE BETWEEN v_start_date AND v_end_date
        GROUP BY ac.platform
      ) platform_quality
    )
  )
  INTO v_result
  FROM leads l
  LEFT JOIN ad_campaigns ac ON ac.id = l.campaign_id
  WHERE l.created_at::DATE BETWEEN v_start_date AND v_end_date;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- CUSTOMER HEALTH SCORE
-- ============================================================================

-- Calculate customer health score (for predicting churn)
CREATE OR REPLACE FUNCTION calculate_customer_health(p_customer_id UUID)
RETURNS JSON AS $$
DECLARE
  v_customer RECORD;
  v_subscription RECORD;
  v_health_score INTEGER := 0;
  v_health_status TEXT;
  v_signals JSON;
BEGIN
  -- Get customer and subscription data
  SELECT * INTO v_customer FROM customers WHERE id = p_customer_id;
  SELECT * INTO v_subscription FROM subscriptions WHERE customer_id = p_customer_id AND status = 'active';
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'health_score', 0,
      'health_status', 'inactive',
      'signals', '[]'::json
    );
  END IF;
  
  -- Payment status (30 points)
  IF v_subscription.status = 'active' THEN
    v_health_score := v_health_score + 30;
  END IF;
  
  -- Quota usage (20 points)
  IF v_subscription.leads_used_this_period > 0 THEN
    v_health_score := v_health_score + 20;
  END IF;
  
  -- Lead engagement (25 points)
  IF EXISTS (
    SELECT 1 FROM leads 
    WHERE customer_id = p_customer_id 
      AND first_contact_at IS NOT NULL
      AND created_at >= NOW() - INTERVAL '7 days'
  ) THEN
    v_health_score := v_health_score + 25;
  END IF;
  
  -- Conversion success (25 points)
  IF EXISTS (
    SELECT 1 FROM leads
    WHERE customer_id = p_customer_id
      AND is_converted = TRUE
      AND created_at >= NOW() - INTERVAL '30 days'
  ) THEN
    v_health_score := v_health_score + 25;
  END IF;
  
  -- Determine health status
  IF v_health_score >= 80 THEN
    v_health_status := 'healthy';
  ELSIF v_health_score >= 60 THEN
    v_health_status := 'stable';
  ELSIF v_health_score >= 40 THEN
    v_health_status := 'at_risk';
  ELSE
    v_health_status := 'critical';
  END IF;
  
  RETURN json_build_object(
    'health_score', v_health_score,
    'health_status', v_health_status,
    'customer_id', p_customer_id,
    'subscription_status', v_subscription.status,
    'leads_used_percentage', 
      CASE WHEN v_subscription.leads_quota > 0 
        THEN (v_subscription.leads_used_this_period::NUMERIC / v_subscription.leads_quota::NUMERIC * 100)
        ELSE 0 
      END
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- DAILY OPERATIONS REPORT
-- ============================================================================

-- Get tasks that need attention today
CREATE OR REPLACE FUNCTION get_daily_operations_tasks()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'new_customers_need_setup', (
      SELECT json_agg(json_build_object(
        'customer_id', c.id,
        'business_name', c.business_name,
        'plan', c.current_plan,
        'signed_up', c.created_at
      ))
      FROM customers c
      LEFT JOIN ad_campaigns ac ON ac.customer_id = c.id
      WHERE c.subscription_status = 'active'
        AND c.created_at >= NOW() - INTERVAL '3 days'
        AND ac.id IS NULL
    ),
    
    'underperforming_campaigns', (
      SELECT json_agg(json_build_object(
        'campaign_id', id,
        'campaign_name', campaign_name,
        'customer_id', customer_id,
        'cpl', cpl,
        'target_cpl', 40000
      ))
      FROM ad_campaigns
      WHERE status = 'active'
        AND cpl > 40000 -- ₹400 target
        AND leads_generated > 5
    ),
    
    'quota_alerts', (
      SELECT json_agg(json_build_object(
        'customer_id', c.id,
        'business_name', c.business_name,
        'leads_used', s.leads_used_this_period,
        'leads_quota', s.leads_quota,
        'percentage', (s.leads_used_this_period::NUMERIC / s.leads_quota::NUMERIC * 100)
      ))
      FROM customers c
      JOIN subscriptions s ON s.customer_id = c.id
      WHERE s.status = 'active'
        AND s.leads_quota > 0
        AND (s.leads_used_this_period::NUMERIC / s.leads_quota::NUMERIC) >= 0.8
    ),
    
    'payment_failures', (
      SELECT json_agg(json_build_object(
        'customer_id', customer_id,
        'amount', amount,
        'error', error_description
      ))
      FROM payment_transactions
      WHERE status = 'failed'
        AND created_at >= NOW() - INTERVAL '24 hours'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- LEAD SOURCE PERFORMANCE
-- ============================================================================

-- Compare performance across lead sources
CREATE OR REPLACE FUNCTION compare_lead_sources(
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL
)
RETURNS TABLE (
  source TEXT,
  total_leads BIGINT,
  avg_quality_score NUMERIC,
  conversion_rate NUMERIC,
  avg_cost_per_lead NUMERIC
) AS $$
DECLARE
  v_start_date DATE := COALESCE(p_start_date, date_trunc('month', CURRENT_DATE)::DATE);
  v_end_date DATE := COALESCE(p_end_date, CURRENT_DATE);
BEGIN
  RETURN QUERY
  SELECT 
    l.source,
    COUNT(l.id)::BIGINT as total_leads,
    AVG(l.quality_score) as avg_quality_score,
    (COUNT(*) FILTER (WHERE l.is_converted = TRUE)::NUMERIC / COUNT(*)::NUMERIC * 100) as conversion_rate,
    CASE 
      WHEN COUNT(l.id) > 0 THEN
        COALESCE(SUM(ac.amount_spent), 0)::NUMERIC / COUNT(l.id)::NUMERIC
      ELSE 0
    END as avg_cost_per_lead
  FROM leads l
  LEFT JOIN ad_campaigns ac ON ac.id = l.campaign_id
  WHERE l.created_at::DATE BETWEEN v_start_date AND v_end_date
  GROUP BY l.source
  ORDER BY total_leads DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- CUSTOMER LIFETIME VALUE
-- ============================================================================

-- Calculate customer LTV
CREATE OR REPLACE FUNCTION calculate_customer_ltv(p_customer_id UUID)
RETURNS NUMERIC AS $$
DECLARE
  v_total_paid NUMERIC;
  v_months_active INTEGER;
  v_avg_monthly NUMERIC;
  v_ltv NUMERIC;
BEGIN
  -- Get total amount paid
  SELECT COALESCE(SUM(total_amount), 0) / 100
  INTO v_total_paid
  FROM invoices
  WHERE customer_id = p_customer_id
    AND status = 'paid';
  
  -- Get months active
  SELECT EXTRACT(EPOCH FROM (CURRENT_DATE - created_at::DATE)) / (30 * 24 * 60 * 60)
  INTO v_months_active
  FROM customers
  WHERE id = p_customer_id;
  
  -- Calculate average monthly revenue
  IF v_months_active > 0 THEN
    v_avg_monthly := v_total_paid / v_months_active;
  ELSE
    v_avg_monthly := 0;
  END IF;
  
  -- Project LTV (assume 12 month average retention)
  v_ltv := v_avg_monthly * 12;
  
  RETURN v_ltv;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION get_admin_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION get_customer_metrics(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_campaign_performance(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_monthly_revenue(INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_lead_quality_distribution(DATE, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION compare_lead_sources(DATE, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION calculate_customer_ltv(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_daily_operations_tasks() TO authenticated;
GRANT EXECUTE ON FUNCTION calculate_customer_health(UUID) TO authenticated;

-- Done! These functions power the admin analytics


