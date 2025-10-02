-- Team Management & Multi-User Support
-- Migration 003: Team functionality extension

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  owner_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  slug text UNIQUE, -- team slug for URLs
  subscription_status text DEFAULT 'trial', -- trial, active, suspended, cancelled
  plan_id text DEFAULT 'starter', -- starter, growth, pro
  plan_expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role text CHECK (role IN ('owner', 'admin', 'manager', 'sales_rep')) DEFAULT 'sales_rep',
  permissions jsonb DEFAULT '{}', -- Custom permissions
  status text CHECK (status IN ('active', 'invited', 'suspended')) DEFAULT 'invited',
  joined_at timestamp with time zone DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Team invitations table
CREATE TABLE IF NOT EXISTS team_invitations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  role text CHECK (role IN ('admin', 'manager', 'sales_rep')) DEFAULT 'sales_rep',
  invited_by uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  token text UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  status text CHECK (status IN ('pending', 'accepted', 'expired', 'declined')) DEFAULT 'pending',
  expires_at timestamp with time zone DEFAULT (NOW() + INTERVAL '7 days'),
  createdAt timestamp with time zone DEFAULT NOW(),
  UNIQUE(team_id, email)
);

-- Subscription tracking table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  razorpay_plan_id text NOT NULL,
  razorpay_subscription_id text,
  status text CHECK (status IN ('active', 'cancelled', 'expired', 'trial')) DEFAULT 'trial',
  current_period_start timestamp with time zone DEFAULT NOW(),
  current_period_end timestamp with time zone DEFAULT (NOW() + INTERVAL '1 month'),
  trial_end timestamp with time zone DEFAULT (NOW() + INTERVAL '14 days'),
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

-- Payment transactions table
CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  razorpay_order_id text NOT NULL,
  razorpay_payment_id text,
  razorpay_signature text,
  amount integer NOT NULL, -- Amount in paise
  currency text DEFAULT 'INR',
  status text CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  plan_id text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

-- Usage tracking per team
CREATE TABLE IF NOT EXISTS team_usage (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  month text NOT NULL, -- YYYY-MM format
  leads_generated integer DEFAULT 0,
  content_created integer DEFAULT 0,
  emails_sent integer DEFAULT 0,
  social_posts integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW(),
  UNIQUE(team_id, month)
);

-- Update existing tables to reference teams
ALTER TABLE public.contacts ADD COLUMN team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE;
ALTER TABLE public.deals ADD COLUMN team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE;

-- Add team_id indexes
CREATE INDEX idx_contacts_team_id ON public.contacts(team_id);
CREATE INDEX idx_deals_team_id ON public.deals(team_id);
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX idx_team_invitations_team_id ON public.team_invitations(team_id);
CREATE INDEX idx_subscriptions_team_id ON public.subscriptions(team_id);
CREATE INDEX idx_payments_team_id ON public.payments(team_id);
CREATE INDEX idx_team_usage_team_id ON public.team_usage(team_id);

-- Enable RLS on new tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Teams
CREATE POLICY "Users can view teams they belong to" ON public.teams
  FOR SELECT USING (
    id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can update their teams" ON public.teams
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Users can create teams" ON public.teams
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- RLS Policies for Team Members
CREATE POLICY "Users can view team members of their teams" ON public.team_members
  FOR SELECT USING (
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners/admins can manage team members" ON public.team_members
  FOR ALL USING (
    team_id IN (
      SELECT id FROM public.teams WHERE owner_id = auth.uid()
    ) OR
    (SELECT role FROM public.team_members WHERE team_id = team_members.team_id AND user_id = auth.uid()) IN ('admin', 'owner')
  );

-- RLS Policies for Team Invitations
CREATE POLICY "Users can view invitations to their teams" ON public.team_invitations
  FOR SELECT USING (
    team_id IN (
      SELECT id FROM public.teams WHERE owner_id = auth.uid()
    ) OR
    (SELECT role FROM public.team_members WHERE team_id = team_invitations.team_id AND user_id = auth.uid()) IN ('admin', 'owner')
  );

CREATE POLICY "Team admins can manage invitations" ON public.team_invitations
  FOR ALL USING (
    team_id IN (
      SELECT id FROM public.teams WHERE owner_id = auth.uid()
    ) OR
    (SELECT role FROM public.team_members WHERE team_id = team_invitations.team_id AND user_id = auth.uid()) IN ('admin', 'owner')
  );

-- RLS Policies for Subscriptions
CREATE POLICY "Team owners can view their subscriptions" ON public.subscriptions
  FOR SELECT USING (
    team_id IN (
      SELECT id FROM public.teams WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can manage their subscriptions" ON public.subscriptions
  FOR ALL USING (
    team_id IN (
      SELECT id FROM public.teams WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for Payments
CREATE POLICY "Team owners can view their payments" ON public.payments
  FOR SELECT USING (
    team_id IN (
      SELECT id FROM public.teams WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can create payments" ON public.payments
  FOR INSERT WITH CHECK (
    team_id IN (
      SELECT id FROM public.teams WHERE owner_id = auth.uid()
    )
  );

-- Functions for team management
CREATE OR REPLACE FUNCTION public.create_team_with_owner(
  team_name text,
  team_slug text,
  owner_user_id uuid
) RETURNS uuid AS $$
DECLARE
  new_team_id uuid;
BEGIN
  -- Create the team
  INSERT INTO public.teams (name, slug, owner_id)
  VALUES (team_name, team_slug, owner_user_id)
  RETURNING id INTO new_team_id;
  
  -- Add owner as team member
  INSERT INTO public.team_members (team_id, user_id, role, status)
  VALUES (new_team_id, owner_user_id, 'owner', 'active');
  
  -- Create default trial subscription
  INSERT INTO public.subscriptions (team_id, razorpay_plan_id, status)
  VALUES (new_team_id, 'starter', 'trial');
  
  RETURN new_team_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to invite team member
CREATE OR REPLACE FUNCTION public.invite_team_member(
  target_team_id uuid,
  invitee_email text,
  member_role text,
  inviter_user_id uuid
) RETURNS text AS $$
DECLARE
  invitation_token text;
BEGIN
  -- Check if user has permission to invite
  IF NOT EXISTS (
    SELECT 1 FROM public.teams 
    WHERE id = target_team_id AND owner_id = inviter_user_id
    UNION
    SELECT 1 FROM public.team_members tm
    WHERE tm.team_id = target_team_id 
    AND tm.user_id = inviter_user_id 
    AND tm.role IN ('admin', 'owner')
  ) THEN
    RAISE EXCEPTION 'User does not have permission to invite members';
  END IF;
  
  -- Create invitation
  INSERT INTO public.team_invitations (team_id, email, role, invited_by)
  VALUES (target_team_id, invitee_email, member_role, inviter_user_id)
  RETURNING token INTO invitation_token;
  
  RETURN invitation_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to accept team invitation
CREATE OR REPLACE FUNCTION public.accept_team_invitation(
  invitation_token text,
  accepting_user_id uuid
) RETURNS boolean AS $$
DECLARE
  invitation_record RECORD;
BEGIN
  -- Get invitation details
  SELECT * INTO invitation_record
  FROM public.team_invitations
  WHERE token = invitation_token
  AND status = 'pending'
  AND expires_at > NOW();
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Add user to team
  INSERT INTO public.team_members (team_id, user_id, role, status)
  VALUES (invitation_record.team_id, accepting_user_id, invitation_record.role, 'active')
  ON CONFLICT (team_id, user_id) DO NOTHING;
  
  -- Update invitation status
  UPDATE public.team_invitations
  SET status = 'accepted'
  WHERE token = invitation_token;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for updated_at
CREATE TRIGGER trigger_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_team_usage_updated_at
  BEFORE UPDATE ON public.team_usage
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Comments
COMMENT ON TABLE public.teams IS 'Organizations with multi-user access';
COMMENT ON TABLE public.team_members IS 'Users belonging to teams with roles';
COMMENT ON TABLE public.team_invitations IS 'Pending team invitations';
COMMENT ON TABLE public.subscriptions IS 'Razorpay subscription tracking';
COMMENT ON TABLE public.payments IS 'Payment transaction records';
COMMENT ON TABLE public.team_usage IS 'Usage tracking per team per month';
