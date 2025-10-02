-- AI Lead Generation Tables for Transition Marketing AI

-- Lead Campaigns Table
CREATE TABLE public.lead_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'campaign_' || extract(epoch from now())::bigint,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  location TEXT[] DEFAULT '{}',
  target_roles TEXT[] DEFAULT '{}',
  company_size TEXT[] DEFAULT '{}',
  budget INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated Leads Table
CREATE TABLE public.generated_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  company VARCHAR(255) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  linkedin_url TEXT,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  notes TEXT[] DEFAULT '{}',
  source VARCHAR(50) DEFAULT 'ai_discovery',
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead Activities Table (tracks engagement)
CREATE TABLE public.lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.generated_leads(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  activity_type VARCHAR(50) NOT NULL, -- email_sent, linkedin_message, call_made, meeting_scheduled, response_received
  content TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, delivered, opened, clicked, responded
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Industry Templates Table
CREATE TABLE public.industry_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  industry_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  avg_cost_per_lead INTEGER DEFAULT 0,
  conversion_rate VARCHAR(20),
  key_cities TEXT[] DEFAULT '{}',
  target_keywords TEXT[] DEFAULT '{}',
  lead_sources TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead Scoring Rules Table
CREATE TABLE public.lead_scoring_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  industry VARCHAR(100) NOT NULL,
  rules JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.lead_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_scoring_rules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lead_campaigns
CREATE POLICY "Users can manage their own campaigns" ON public.lead_campaigns
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for generated_leads
CREATE POLICY "Users can manage their own leads" ON public.generated_leads
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for lead_activities
CREATE POLICY "Users can manage their own lead activities" ON public.lead_activities
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for industry_templates (read-only for users)
CREATE POLICY "Anyone can view active industry templates" ON public.industry_templates
  FOR SELECT USING (is_active = true);

-- RLS Policies for lead_scoring_rules
CREATE POLICY "Users can manage their own scoring rules" ON public.lead_scoring_rules
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_lead_campaigns_user_id ON public.lead_campaigns(user_id);
CREATE INDEX idx_lead_campaigns_status ON public.lead_campaigns(status);
CREATE INDEX idx_generated_leads_campaign_id ON public.generated_leads(campaign_id);
CREATE INDEX idx_generated_leads_user_id ON public.generated_leads(user_id);
CREATE INDEX idx_generated_leads_score ON public.generated_leads(score);
CREATE INDEX idx_generated_leads_status ON public.generated_leads(status);
CREATE INDEX idx_lead_activities_lead_id ON public.lead_activities(lead_id);
CREATE INDEX idx_lead_activities_user_id ON public.lead_activities(user_id);
CREATE INDEX idx_lead_scoring_rules_user_id ON public.lead_scoring_rules(user_id);

-- Create triggers for updated_at
CREATE TRIGGER trigger_lead_campaigns_updated_at
  BEFORE UPDATE ON public.lead_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_generated_leads_updated_at
  BEFORE UPDATE ON public.generated_leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_industry_templates_updated_at
  BEFORE UPDATE ON public.industry_templates
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_lead_scoring_rules_updated_at
  BEFORE UPDATE ON public.lead_scoring_rules
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default industry templates
INSERT INTO public.industry_templates (industry_id, name, description, avg_cost_per_lead, conversion_rate, key_cities, target_keywords, lead_sources) VALUES
('retail-commerce', 'Retail & E-commerce', 'Online sellers, marketplace vendors, retail businesses', 45, '8-15%', ARRAY['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'], ARRAY['online seller', 'ecommerce', 'marketplace', 'retail'], ARRAY['Instagram', 'Facebook', 'LinkedIn', 'Company websites']),
('consulting-services', 'Business Consulting', 'Management consultants, business advisors, corporate services', 125, '15-25%', ARRAY['Mumbai', 'Delhi', 'Pune', 'Bangalore'], ARRAY['consultant', 'advisor', 'strategy', 'business coach'], ARRAY['LinkedIn', 'Industry websites', 'Corporate directories']),
('real-estate', 'Real Estate', 'Property developers, real estate agents, prop-tech', 65, '5-12%', ARRAY['Mumbai', 'Delhi', 'Bangalore', 'Pune'], ARRAY['real estate', 'property', 'developer', 'agent'], ARRAY['Company sites', 'Property portals', 'LinkedIn']),
('healthcare-pharma', 'Healthcare & Pharma', 'Hospitals, clinics, pharmaceutical companies', 85, '10-20%', ARRAY['Mumbai', 'Delhi', 'Bangalore', 'Chennai'], ARRAY['hospital', 'clinic', 'pharma', 'healthcare'], ARRAY['Medical directories', 'Healthcare websites', 'LinkedIn']),
('education-training', 'Education & Training', 'Schools, coaching centers, online education platforms', 35, '6-18%', ARRAY['Bangalore', 'Chennai', 'Hyderabad', 'Pune'], ARRAY['school', 'college', 'coaching', 'education'], ARRAY['Education portals', 'School websites', 'Social media']),
('finance-insurance', 'Finance & Insurance', 'NBFCs, insurance companies, fintech startups', 75, '4-12%', ARRAY['Mumbai', 'Delhi', 'Bangalore', 'Chennai'], ARRAY['finance', 'insurance', 'nbfc', 'fintech'], ARRAY['Financial directories', 'Company websites', 'LinkedIn']),
('manufacturing-industrial', 'Manufacturing & Industrial', 'Manufacturing companies, industrial suppliers', 95, '8-20%', ARRAY['Chennai', 'Pune', 'Ahmedabad', 'Mumbai'], ARRAY['manufacturing', 'industrial', 'factory', 'supply chain'], ARRAY['Industry directories', 'Company sites', 'Trade publications']),
('technology-it', 'Technology & IT Services', 'Software companies, IT services, startups', 50, '10-25%', ARRAY['Bangalore', 'Hyderabad', 'Pune', 'Chennai'], ARRAY['software', 'IT services', 'startup', 'tech company'], ARRAY['Company websites', 'LinkedIn', 'Startup directories']);

-- Create functions for AI lead generation
CREATE OR REPLACE FUNCTION public.generate_ai_leads(
  p_campaign_id VARCHAR(255),
  p_limit INTEGER DEFAULT 50
)
RETURNS INTEGER AS $$
DECLARE
  campaign_record RECORD;
  lead_count INTEGER := 0;
BEGIN
  -- Get campaign details
  SELECT * INTO campaign_record 
  FROM public.lead_campaigns 
  WHERE campaign_id = p_campaign_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Campaign not found: %', p_campaign_id;
  END IF;

  -- Generate sample leads (in real implementation, this would call AI services)
  -- For now, we'll create sample data
  
  INSERT INTO public.generated_leads (
    campaign_id, user_id, name, title, company, industry, 
    location, email, phone, linkedin_url, score, notes, source
  )
  SELECT 
    p_campaign_id,
    campaign_record.user_id,
    array_agg(names)[array_length(array['Rajesh Sharma', 'Priya Singh', 'Amit Kumar', 'Sneha Patel', 'Vikram Reddy', 'Kavya Iyer', 'Arjun Mehta', 'Divya Joshi'], 1)],
    array_agg(titles)[array_length(array['CTO', 'Founder', 'CEO', 'Marketing Manager', 'Sales Director'], 1)],
    array_agg(companies)[array_length(array['TechCorp Solutions', 'DigitalFirst Apps', 'NextGen Tech', 'InnovateSoft'], 1)],
    campaign_record.industry,
    unnest(campaign_record.location),
    lower(replace(normalize(array['Rajesh Sharma', 'Priya Singh', 'Amit Kumar', 'Sneha Patel', 'Vikram Reddy'][generate_series(1, p_limit) % 5 + 1]), ' ', '.')) || '@' || lower(replace(array['TechCorp Solutions', 'DigitalFirst Apps', 'NextGen Tech', 'InnovateSoft'][generate_series(1, p_limit) % 4 + 1], ' ', '')) || '.com',
    '+91 ' || floor(random() * 9000000000 + 1000000000)::text,
    'https://linkedin.com/in/' || lower(replace(array['Rajesh Sharma', 'Priya Singh', 'Amit Kumar', 'Sneha Patel', 'Vikram Reddy'][generate_series(1, p_limit) % 5 + 1], ' ', '-')),
    70 + floor(random() * 25)::integer,
    ARRAY[
      'Active professional with strong engagement',
      'Decision maker in growing company',
      'Recently posted about business expansion'
    ],
    array_agg(sources)[array_length(array['linkedin', 'company_website', 'industry_db', 'ai_discovery'], 1)]
  FROM generate_series(1, LEAST(p_limit, 25))
  WHERE NOT EXISTS (
    SELECT 1 FROM public.generated_leads 
    WHERE campaign_id = p_campaign_id 
    AND created_at::date = CURRENT_DATE
  );

  GET DIAGNOSTICS lead_count = ROW_COUNT;

  -- Update campaign with latest run info
  UPDATE public.lead_campaigns 
  SET 
    settings = jsonb_set(
      COALESCE(settings, '{}'), 
      '{last_run}', 
      to_jsonb(NOW())
    )
  WHERE campaign_id = p_campaign_id;

  RETURN lead_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get campaign analytics
CREATE OR REPLACE FUNCTION public.get_campaign_analytics(p_campaign_id VARCHAR(255))
RETURNS JSONB AS $$
DECLARE
  analytics JSONB;
BEGIN
  SELECT to_jsonb(t) INTO analytics
  FROM (
    SELECT 
      COUNT(*) as total_leads,
      AVG(score) as avg_score,
      COUNT(*) FILTER (WHERE score >= 80) as high_quality_leads,
      COUNT(*) FILTER (WHERE email IS NOT NULL) as leads_with_email,
      COUNT(*) FILTER (WHERE phone IS NOT NULL) as leads_with_phone
    FROM public.generated_leads 
    WHERE campaign_id = p_campaign_id
  ) t;

  RETURN analytics;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
