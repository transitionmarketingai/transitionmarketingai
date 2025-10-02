// Multi-User Team Management Service with Razorpay Integration
import { supabase } from './supabase';
import razorpayInstance, { PLANS, createRazorpayOrder } from './razorpay';

export interface Team {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  subscriptionStatus: 'trial' | 'active' | 'suspended' | 'cancelled';
  planId: 'starter' | 'growth' | 'enterprise';
  planExpiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: 'owner' | 'admin' | 'manager' | 'sales_rep';
  permissions: any;
  status: 'active' | 'invited' | 'suspended';
  joinedAt: string;
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  email: string;
  role: 'admin' | 'manager' | 'sales_rep';
  invitedBy: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired' | 'declined';
  expiresAt: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  teamId: string;
  razorpayPlanId: string;
  razorpaySubscriptionId?: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEnd: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  teamId: string;
  userId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number; // Amount in paise
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  planId: string;
  createdAt: string;
  updatedAt: string;
}

class TeamService {
  private async getCurrentUserId(): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || 'demo-user';
  }

  // Team Management
  async createTeam(teamName: string, teamSlug: string): Promise<Team> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .rpc('create_team_with_owner', {
          team_name: teamName,
          team_slug: teamSlug,
          owner_user_id: userId
        });

      if (error) {
        console.error('Error creating team:', error);
        throw error;
      }

      return await this.getTeam(data);
    } catch (error) {
      console.error('Error in createTeam:', error);
      throw error;
    }
  }

  async getTeam(teamId: string): Promise<Team> {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamId)
        .single();

      if (error) {
        console.error('Error fetching team:', error);
        throw error;
      }

      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        ownerId: data.owner_id,
        subscriptionStatus: data.subscription_status,
        planId: data.plan_id,
        planExpiresAt: data.plan_expires_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error in getTeam:', error);
      throw error;
    }
  }

  async getUserTeams(): Promise<Team[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          team_id,
          teams (
            id, name, slug, owner_id, subscription_status, plan_id, plan_expires_at, created_at, updated_at
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching user teams:', error);
        throw error;
      }

      return data.map((item: any) => ({
        id: item.teams.id,
        name: item.teams.name,
        slug: item.teams.slug,
        ownerId: item.teams.owner_id,
        subscriptionStatus: item.teams.subscription_status,
        planId: item.teams.plan_id,
        planExpiresAt: item.teams.plan_expires_at,
        createdAt: item.teams.created_at,
        updatedAt: item.teams.updated_at
      }));
    } catch (error) {
      console.error('Error in getUserTeams:', error);
      throw error;
    }
  }

  // Team Members Management
  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          id, team_id, user_id, role, permissions, status, joined_at,
          users (name, email, image)
        `)
        .eq('team_id', teamId);

      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }

      return data.map((item: any) => ({
        id: item.id,
        teamId: item.team_id,
        userId: item.user_id,
        role: item.role,
        permissions: item.permissions,
        status: item.status,
        joinedAt: item.joined_at,
        user: {
          name: item.users?.name || 'Unknown',
          email: item.users?.email || '',
          image: item.users?.image
        }
      }));
    } catch (error) {
      console.error('Error in getTeamMembers:', error);
      throw error;
    }
  }

  async inviteTeamMember(teamId: string, email: string, role: 'admin' | 'manager' | 'sales_rep'): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .rpc('invite_team_member', {
          target_team_id: teamId,
          invitee_email: email,
          member_role: role,
          inviter_user_id: userId
        });

      if (error) {
        console.error('Error inviting team member:', error);
        throw error;
      }

      // TODO: Send email invitation here
      console.log('Invitation token:', data);
    } catch (error) {
      console.error('Error in inviteTeamMember:', error);
      throw error;
    }
  }

  async acceptTeamInvitation(token: string): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .rpc('accept_team_invitation', {
          invitation_token: token,
          accepting_user_id: userId
        });

      if (error) {
        console.error('Error accepting invitation:', error);
        return false;
      }

      return data;
    } catch (error) {
      console.error('Error in acceptTeamInvitation:', error);
      return false;
    }
  }

  async removeTeamMember(teamId: string, memberUserId: string): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      
      // Check permissions (only owner/admin can remove members)
      const { data: memberCheck, error: checkError } = await supabase
        .from('team_members')
        .select('role')
        .eq('team_id', teamId)
        .eq('user_id', userId)
        .single();

      if (checkError || !memberCheck || !['owner', 'admin'].includes(memberCheck.role)) {
        throw new Error('Insufficient permissions to remove team member');
      }

      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', memberUserId);

      if (error) {
        console.error('Error removing team member:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in removeTeamMember:', error);
      throw error;
    }
  }

  // Subscription Management with Razorpay
  async getSubscription(teamId: string): Promise<Subscription | null> {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('team_id', teamId)
        .single();

      if (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }

      return {
        id: data.id,
        teamId: data.team_id,
        razorpayPlanId: data.razorpay_plan_id,
        razorpaySubscriptionId: data.razorpay_subscription_id,
        status: data.status,
        currentPeriodStart: data.current_period_start,
        currentPeriodEnd: data.current_period_end,
        trialEnd: data.trial_end,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error in getSubscription:', error);
      return null;
    }
  }

  async createPaymentOrder(teamId: string, planId: 'starter' | 'growth' | 'enterprise'): Promise<any> {
    try {
      const userId = await this.getCurrentUserId();
      const plan = PLANS[planId];
      
      if (!plan) {
        throw new Error('Invalid plan selected');
      }

      // Create Razorpay order
      const razorpayOrder = await createRazorpayOrder(planId, userId);

      // Save payment record in database
      const { data, error } = await supabase
        .from('payments')
        .insert([{
          team_id: teamId,
          user_id: userId,
          razorpay_order_id: razorpayOrder.id,
          amount: plan.price * 100, // Convert to paise
          currency: plan.currency,
          status: 'pending',
          plan_id: planId
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating payment record:', error);
        throw error;
      }

      return {
        orderId: razorpayOrder.id,
        amount: plan.price * 100,
        currency: plan.currency,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: "Transition Marketing AI",
        description: `${plan.name} Plan - ${plan.description}`,
        order_receipt: razorpayOrder.receipt,
        handler: async (response: any) => {
          await this.verifyPayment(response, teamId, planId);
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
          }
        }
      };
    } catch (error) {
      console.error('Error in createPaymentOrder:', error);
      throw error;
    }
  }

  async verifyPayment(razorpayResponse: any, teamId: string, planId: string): Promise<void> {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = razorpayResponse;
      
      // Verify payment signature
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        throw new Error('Invalid payment signature');
      }

      // Update payment record
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          razorpay_payment_id,
          razorpay_signature,
          status: 'completed'
        })
        .eq('razorpay_order_id', razorpay_order_id);

      if (updateError) {
        console.error('Error updating payment:', updateError);
        throw updateError;
      }

      // Update team subscription
      await this.updateTeamSubscription(teamId, planId, 'active');

      // Update team plan
      const { error: teamError } = await supabase
        .from('teams')
        .update({
          plan_id: planId,
          subscription_status: 'active',
          plan_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
        .eq('id', teamId);

      if (teamError) {
        console.error('Error updating team subscription:', teamError);
        throw teamError;
      }

    } catch (error) {
      console.error('Error in verifyPayment:', error);
      
      // Mark payment as failed
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('team_id', teamId);

      throw error;
    }
  }

  async updateTeamSubscription(teamId: string, planId: string, status: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          razorpay_plan_id: planId,
          status: status,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('team_id', teamId);

      if (error) {
        console.error('Error updating subscription:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in updateTeamSubscription:', error);
      throw error;
    }
  }

  // Usage Tracking
  async updateUsageStats(teamId: string, usageType: 'leads_generated' | 'content_created' | 'emails_sent' | 'social_posts', increment: number = 1): Promise<void> {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
      
      const { data: existingUsage, error: fetchError } = await supabase
        .from('team_usage')
        .select('*')
        .eq('team_id', teamId)
        .eq('month', currentMonth)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error fetching existing usage:', fetchError);
        throw fetchError;
      }

      if (existingUsage) {
        // Update existing usage
        const newValue = (existingUsage[usageType] || 0) + increment;
        const { error: updateError } = await supabase
          .from('team_usage')
          .update({ [usageType]: newValue })
          .eq('id', existingUsage.id);

        if (updateError) {
          console.error('Error updating usage stats:', updateError);
          throw updateError;
        }
      } else {
        // Create new usage record
        const newUsage: any = {
          team_id: teamId,
          month: currentMonth,
          [usageType]: increment
        };

        const { error: insertError } = await supabase
          .from('team_usage')
          .insert([newUsage]);

        if (insertError) {
          console.error('Error creating usage stats:', insertError);
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Error also:', error);
      throw error;
    }
  }

  async getUsageStats(teamId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('team_usage')
        .select('*')
        .eq('team_id', teamId)
        .order('month', { ascending: false });

      if (error) {
        console.error('Error fetching usage stats:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getUsageStats:', error);
      throw error;
    }
  }

  // Check if user can perform action (permission check)
  async canPerformAction(teamId: string, action: 'manage_members' | 'manage_subscription' | 'view_analytics'): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('team_members')
        .select('role, permissions')
        .eq('team_id', teamId)
        .eq('user_id', userId)
        .single();

      if (error || !data) {
        return false;
      }

      const { role, permissions } = data;

      // Check role-based permissions
      switch (action) {
        case 'manage_members':
          return ['owner', 'admin'].includes(role);
        case 'manage_subscription':
          return role === 'owner';
        case 'view_analytics':
          return ['owner', 'admin', 'manager'].includes(role);
        default:
          return false;
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
      return false;
    }
  }
}

export const teamService = new TeamService();
