-- ============================================================================
-- Advanced AI Features Database Tables
-- ============================================================================

-- 1. AB_TESTS TABLE
CREATE TABLE IF NOT EXISTS ab_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  variants JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed', 'paused')),
  results JSONB DEFAULT '[]'::jsonb,
  winner TEXT,
  insights TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ab_tests_customer ON ab_tests(customer_id);
CREATE INDEX idx_ab_tests_status ON ab_tests(status);
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own AB tests" ON ab_tests FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Customers can manage own AB tests" ON ab_tests FOR ALL USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE TRIGGER update_ab_tests_updated_at BEFORE UPDATE ON ab_tests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2. INTELLIGENCE_REPORTS TABLE
CREATE TABLE IF NOT EXISTS intelligence_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  industry TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('competitive_intelligence', 'market_insights', 'sentiment_analysis')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_intelligence_reports_customer ON intelligence_reports(customer_id);
CREATE INDEX idx_intelligence_reports_type ON intelligence_reports(report_type);
ALTER TABLE intelligence_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own intelligence reports" ON intelligence_reports FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Customers can manage own intelligence reports" ON intelligence_reports FOR ALL USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE TRIGGER update_intelligence_reports_updated_at BEFORE UPDATE ON intelligence_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. SENTIMENT_ANALYSIS TABLE
CREATE TABLE IF NOT EXISTS sentiment_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  emotions JSONB DEFAULT '{}'::jsonb,
  intent TEXT CHECK (intent IN ('buying', 'browsing', 'objection', 'information', 'comparison')),
  keywords TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  next_action TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sentiment_analysis_customer ON sentiment_analysis(customer_id);
CREATE INDEX idx_sentiment_analysis_lead ON sentiment_analysis(lead_id);
CREATE INDEX idx_sentiment_analysis_sentiment ON sentiment_analysis(sentiment);
ALTER TABLE sentiment_analysis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own sentiment analysis" ON sentiment_analysis FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Customers can manage own sentiment analysis" ON sentiment_analysis FOR ALL USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

-- 4. BUDGET_OPTIMIZATIONS TABLE
CREATE TABLE IF NOT EXISTS budget_optimizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  total_budget DECIMAL(12,2) NOT NULL,
  allocations JSONB NOT NULL DEFAULT '[]'::jsonb,
  expected_leads INTEGER,
  expected_revenue DECIMAL(12,2),
  expected_roi DECIMAL(5,2),
  risk_factors TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_budget_optimizations_customer ON budget_optimizations(customer_id);
ALTER TABLE budget_optimizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own budget optimizations" ON budget_optimizations FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Customers can manage own budget optimizations" ON budget_optimizations FOR ALL USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE TRIGGER update_budget_optimizations_updated_at BEFORE UPDATE ON budget_optimizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. AI_INSIGHTS TABLE (for storing various AI insights)
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('lead_scoring', 'sentiment', 'ab_test', 'budget', 'competitor', 'prediction')),
  insight_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ai_insights_customer ON ai_insights(customer_id);
CREATE INDEX idx_ai_insights_type ON ai_insights(insight_type);
CREATE INDEX idx_ai_insights_lead ON ai_insights(lead_id);
CREATE INDEX idx_ai_insights_campaign ON ai_insights(campaign_id);
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view own AI insights" ON ai_insights FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
CREATE POLICY "Customers can manage own AI insights" ON ai_insights FOR ALL USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

-- 6. Update messages table to include delivery_status for sentiment analysis
ALTER TABLE messages ADD COLUMN IF NOT EXISTS delivery_status JSONB DEFAULT '{}'::jsonb;

-- 7. Update leads table to include AI analysis fields
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ai_analysis JSONB DEFAULT '{}'::jsonb;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS sentiment_trend JSONB DEFAULT '[]'::jsonb;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS engagement_pattern JSONB DEFAULT '{}'::jsonb;

-- 8. Update campaigns table to include AI optimization fields
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS ai_optimization JSONB DEFAULT '{}'::jsonb;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS performance_prediction JSONB DEFAULT '{}'::jsonb;

-- 9. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_delivery_status ON messages USING GIN (delivery_status);
CREATE INDEX IF NOT EXISTS idx_leads_ai_analysis ON leads USING GIN (ai_analysis);
CREATE INDEX IF NOT EXISTS idx_campaigns_ai_optimization ON campaigns USING GIN (ai_optimization);

-- 10. Insert sample data for testing
INSERT INTO ab_tests (customer_id, name, industry, variants, status, created_at)
SELECT 
  c.id,
  'Sample A/B Test - Email Campaign',
  c.industry,
  '[
    {
      "id": "variant_1",
      "name": "Professional Direct",
      "message": "Hi there, I would like to discuss our services with you.",
      "channel": "email",
      "personalizationLevel": "high",
      "tone": "professional",
      "ctaType": "direct"
    },
    {
      "id": "variant_2", 
      "name": "Casual Soft",
      "message": "Hey! Hope you are doing well. Would love to chat about our services!",
      "channel": "email",
      "personalizationLevel": "medium",
      "tone": "casual",
      "ctaType": "soft"
    }
  ]'::jsonb,
  'draft',
  NOW()
FROM customers c
WHERE c.id IN (SELECT id FROM customers LIMIT 1)
ON CONFLICT DO NOTHING;

-- 11. Create a function to get AI insights summary
CREATE OR REPLACE FUNCTION get_ai_insights_summary(customer_uuid UUID)
RETURNS TABLE (
  total_insights BIGINT,
  lead_scoring_count BIGINT,
  sentiment_analysis_count BIGINT,
  ab_tests_count BIGINT,
  budget_optimizations_count BIGINT,
  avg_confidence DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_insights,
    COUNT(*) FILTER (WHERE insight_type = 'lead_scoring') as lead_scoring_count,
    COUNT(*) FILTER (WHERE insight_type = 'sentiment') as sentiment_analysis_count,
    (SELECT COUNT(*) FROM ab_tests WHERE customer_id = customer_uuid) as ab_tests_count,
    (SELECT COUNT(*) FROM budget_optimizations WHERE customer_id = customer_uuid) as budget_optimizations_count,
    AVG(confidence) as avg_confidence
  FROM ai_insights 
  WHERE customer_id = customer_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_ai_insights_summary(UUID) TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
