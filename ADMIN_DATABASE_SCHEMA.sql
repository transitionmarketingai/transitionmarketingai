-- ============================================
-- ADMIN DASHBOARD DATABASE SCHEMA
-- ============================================

-- ============================================
-- 1. CLIENTS TABLE (Enhanced from existing)
-- ============================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Company Info
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  industry VARCHAR(100),
  location VARCHAR(255),
  website VARCHAR(255),
  
  -- Status
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'trial', 'paused', 'churned')),
  
  -- Assignment
  account_manager_id UUID REFERENCES auth.users(id),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_account_manager ON clients(account_manager_id);
CREATE INDEX idx_clients_created_at ON clients(created_at DESC);

-- ============================================
-- 2. CUSTOM PLANS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS custom_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Plan Details
  plan_name VARCHAR(255) NOT NULL,
  monthly_cost DECIMAL(10,2) NOT NULL,
  leads_quota INT NOT NULL,
  cost_per_lead DECIMAL(10,2) NOT NULL,
  
  -- Delivery & Preferences
  delivery_schedule VARCHAR(50) DEFAULT 'daily' CHECK (delivery_schedule IN ('daily', 'weekly', 'biweekly')),
  lead_sources JSONB, -- {linkedin: true, google_maps: true, facebook: false}
  geographic_focus TEXT[],
  industry_focus TEXT[],
  min_quality_score INT DEFAULT 80,
  
  -- Contract Terms
  contract_start_date DATE NOT NULL,
  contract_end_date DATE,
  auto_renewal BOOLEAN DEFAULT true,
  special_terms TEXT,
  
  -- Quota Tracking
  leads_delivered_this_period INT DEFAULT 0,
  period_start_date DATE DEFAULT CURRENT_DATE,
  period_end_date DATE,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_custom_plans_client ON custom_plans(client_id);
CREATE INDEX idx_custom_plans_active ON custom_plans(is_active);

-- ============================================
-- 3. CLIENT LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS client_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  
  -- Lead Info
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  industry VARCHAR(100),
  location VARCHAR(255),
  
  -- Source & Quality
  source VARCHAR(100), -- linkedin, google_maps, facebook_ads
  quality_score INT DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
  
  -- Status
  status VARCHAR(50) DEFAULT 'unassigned' CHECK (status IN (
    'unassigned', 'assigned', 'contacted', 'qualified', 'converted', 'not_interested'
  )),
  
  -- Assignment
  assigned_at TIMESTAMPTZ,
  assigned_by UUID REFERENCES auth.users(id),
  
  -- Notes
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_leads_client ON client_leads(client_id);
CREATE INDEX idx_client_leads_status ON client_leads(status);
CREATE INDEX idx_client_leads_quality ON client_leads(quality_score DESC);
CREATE INDEX idx_client_leads_created ON client_leads(created_at DESC);

-- ============================================
-- 4. INVOICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Invoice Details
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Line Items (JSONB for flexibility)
  line_items JSONB, -- [{description: "Growth Plan", quantity: 1, price: 35000}]
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  
  -- Dates
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  
  -- Payment
  payment_method VARCHAR(100),
  transaction_id VARCHAR(255),
  
  -- Notes
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);

-- ============================================
-- 5. SUPPORT TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Ticket Info
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  
  -- Status & Priority
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Assignment
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Resolution
  resolution TEXT,
  resolved_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_support_tickets_client ON support_tickets(client_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_support_tickets_assigned ON support_tickets(assigned_to);

-- ============================================
-- 6. TICKET RESPONSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ticket_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  
  -- Response
  message TEXT NOT NULL,
  is_staff_response BOOLEAN DEFAULT true,
  
  -- Author
  author_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ticket_responses_ticket ON ticket_responses(ticket_id);
CREATE INDEX idx_ticket_responses_created ON ticket_responses(created_at);

-- ============================================
-- 7. CONSULTATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Prospect Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  industry VARCHAR(100),
  
  -- Meeting
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 30,
  meeting_link VARCHAR(500),
  
  -- Status
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN (
    'scheduled', 'completed', 'no_show', 'rescheduled', 'converted'
  )),
  
  -- Notes & Proposal
  notes TEXT,
  proposal_sent BOOLEAN DEFAULT false,
  proposal_amount DECIMAL(10,2),
  
  -- Conversion
  converted_to_client_id UUID REFERENCES clients(id),
  converted_at TIMESTAMPTZ,
  
  -- Assignment
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_scheduled ON consultations(scheduled_at);
CREATE INDEX idx_consultations_assigned ON consultations(assigned_to);

-- ============================================
-- 8. ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Entity
  entity_type VARCHAR(50) NOT NULL, -- client, lead, invoice, ticket, consultation
  entity_id UUID NOT NULL,
  
  -- Action
  action VARCHAR(100) NOT NULL, -- created, updated, deleted, status_changed
  description TEXT NOT NULL,
  
  -- Changes (for audit)
  changes JSONB,
  
  -- Actor
  actor_id UUID REFERENCES auth.users(id),
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_actor ON activity_log(actor_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all relevant tables
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_plans_updated_at BEFORE UPDATE ON custom_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_leads_updated_at BEFORE UPDATE ON client_leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Admin users can do everything
-- (You'll need to add admin role to user metadata or create an admins table)

-- For now, allow authenticated users (we'll refine this)
CREATE POLICY "Allow all for authenticated users" ON clients
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON custom_plans
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON client_leads
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON invoices
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON support_tickets
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON ticket_responses
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON consultations
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON activity_log
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Insert demo client
-- INSERT INTO clients (company_name, contact_person, email, phone, industry, location, status)
-- VALUES ('Demo Real Estate Inc', 'John Doe', 'john@demo.com', '+91-9876543210', 'Real Estate', 'Mumbai, Maharashtra', 'active');

-- ============================================
-- END OF SCHEMA
-- ============================================

