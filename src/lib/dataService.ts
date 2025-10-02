// Production-ready data persistence service with Supabase integration
import { supabase } from './supabase';

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Lead' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  dealValue: number;
  lastContact: string;
  createdAt: string;
  userId: string;
}

export interface Deal {
  id: string;
  contactName: string;
  company: string;
  dealValue: number;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  probability: number;
  expectedClose: string;
  createdAt: string;
  userId: string;
}

class DataService {
  private async getCurrentUserId(): Promise<string> {
    // Get the current user from Supabase auth
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || 'demo-user';
  }

  // Contact methods with Supabase
  async getContacts(): Promise<Contact[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        return this.getSampleContacts();
      }

      if (!data || data.length === 0) {
        return this.getSampleContacts();
      }

      return data.map(contact => ({
        id: contact.id,
        name: contact.name,
        company: contact.company,
        email: contact.email,
        phone: contact.phone || '',
        status: contact.status,
        dealValue: contact.deal_value,
        lastContact: contact.last_contact,
        createdAt: contact.created_at,
        userId: contact.user_id
      }));
    } catch (error) {
      console.error('Error in getContacts:', error);
      return this.getSampleContacts();
    }
  }

  async addContact(contact: Omit<Contact, 'id' | 'createdAt' | 'userId'>): Promise<Contact> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          user_id: userId,
          name: contact.name,
          company: contact.company,
          email: contact.email,
          phone: contact.phone,
          status: contact.status,
          deal_value: contact.dealValue,
          last_contact: contact.lastContact
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding contact:', error);
        throw error;
      }

      return {
        id: data.id,
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone || '',
        status: data.status,
        dealValue: data.deal_value,
        lastContact: data.last_contact,
        createdAt: data.created_at,
        userId: data.user_id
      };
    } catch (error) {
      console.error('Error in addContact:', error);
      throw error;
    }
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    try {
      const userId = await this.getCurrentUserId();
      
      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.company !== undefined) updateData.company = updates.company;
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.phone !== undefined) updateData.phone = updates.phone;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.dealValue !== undefined) updateData.deal_value = updates.dealValue;
      if (updates.lastContact !== undefined) updateData.last_contact = updates.lastContact;

      const { data, error } = await supabase
        .from('contacts')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating contact:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone || '',
        status: data.status,
        dealValue: data.deal_value,
        lastContact: data.last_contact,
        createdAt: data.created_at,
        userId: data.user_id
      };
    } catch (error) {
      console.error('Error in updateContact:', error);
      return null;
    }
  }

  async deleteContact(id: string): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting contact:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteContact:', error);
      return false;
    }
  }

  // Deal methods with Supabase
  async getDeals(): Promise<Deal[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching deals:', error);
        return this.getSampleDeals();
      }

      if (!data || data.length === 0) {
        return this.getSampleDeals();
      }

      return data.map(deal => ({
        id: deal.id,
        contactName: deal.contact_name,
        company: deal.company,
        dealValue: deal.deal_value,
        stage: deal.stage,
        probability: deal.probability,
        expectedClose: deal.expected_close,
        createdAt: deal.created_at,
        userId: deal.user_id
      }));
    } catch (error) {
      console.error('Error in getDeals:', error);
      return this.getSampleDeals();
    }
  }

  async addDeal(deal: Omit<Deal, 'id' | 'createdAt' | 'userId'>): Promise<Deal> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('deals')
        .insert([{
          user_id: userId,
          contact_name: deal.contactName,
          company: deal.company,
          deal_value: deal.dealValue,
          stage: deal.stage,
          probability: deal.probability,
          expected_close: deal.expectedClose
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding deal:', error);
        throw error;
      }

      return {
        id: data.id,
        contactName: data.contact_name,
        company: data.company,
        dealValue: data.deal_value,
        stage: data.stage,
        probability: data.probability,
        expectedClose: data.expected_close,
        createdAt: data.created_at,
        userId: data.user_id
      };
    } catch (error) {
      console.error('Error in addDeal:', error);
      throw error;
    }
  }

  async updateDeal(id: string, updates: Partial<Deal>): Promise<Deal | null> {
    try {
      const userId = await this.getCurrentUserId();
      
      const updateData: any = {};
      if (updates.contactName !== undefined) updateData.contact_name = updates.contactName;
      if (updates.company !== undefined) updateData.company = updates.company;
      if (updates.dealValue !== undefined) updateData.deal_value = updates.dealValue;
      if (updates.stage !== undefined) updateData.stage = updates.stage;
      if (updates.probability !== undefined) updateData.probability = updates.probability;
      if (updates.expectedClose !== undefined) updateData.expected_close = updates.expectedClose;

      const { data, error } = await supabase
        .from('deals')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating deal:', error);
        return null;
      }

      return {
        id: data.id,
        contactName: data.contact_name,
        company: data.company,
        dealValue: data.deal_value,
        stage: data.stage,
        probability: data.probability,
        expectedClose: data.expected_close,
        createdAt: data.created_at,
        userId: data.user_id
      };
    } catch (error) {
      console.error('Error in updateDeal:', error);
      return null;
    }
  }

  async deleteDeal(id: string): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting deal:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteDeal:', error);
      return false;
    }
  }

  // Sample data for demo (fallback when Supabase is not available)
  private getSampleContacts(): Contact[] {
    return [
      {
        id: '1',
        name: "Rajesh Sharma",
        company: "TechCorp Solutions",
        email: "rajesh@techcorp.in",
        phone: "+91 98765 43210",
        status: "Lead",
        dealValue: 120000,
        lastContact: "2025-01-01",
        createdAt: "2025-01-01T00:00:00.000Z",
        userId: 'demo-user'
      },
      {
        id: '2',
        name: "Priya Singh",
        company: "StartupXYZ",
        email: "priya.singh@startupxyz.com",
        phone: "+91 87654 32100",
        status: "Proposal",
        dealValue: 350000,
        lastContact: "2024-12-28",
        createdAt: "2024-12-28T00:00:00.000Z",
        userId: 'demo-user'
      },
      {
        id: '3',
        name: "Amit Kumar",
        company: "Innovation Labs",
        email: "amit@innovationlabs.in",
        phone: "+91 76543 21000",
        status: "Qualified",
        dealValue: 250000,
        lastContact: "2024-12-30",
        createdAt: "2024-12-30T00:00:00.000Z",
        userId: 'demo-user'
      }
    ];
  }

  private getSampleDeals(): Deal[] {
    return [
      {
        id: '1',
        contactName: "Rajesh Sharma",
        company: "TechCorp Solutions",
        dealValue: 120000,
        stage: "Lead",
        probability: 20,
        expectedClose: "2025-02-15",
        createdAt: "2025-01-01T00:00:00.000Z",
        userId: 'demo-user'
      },
      {
        id: '2',
        contactName: "Priya Singh",
        company: "StartupXYZ",
        dealValue: 350000,
        stage: "Proposal",
        probability: 60,
        expectedClose: "2025-01-20",
        createdAt: "2024-12-28T00:00:00.000Z",
        userId: 'demo-user'
      },
      {
        id: '3',
        contactName: "Amit Kumar",
        company: "Innovation Labs",
        dealValue: 250000,
        stage: "Qualified",
        probability: 40,
        expectedClose: "2025-03-01",
        createdAt: "2024-12-30T00:00:00.000Z",
        userId: 'demo-user'
      }
    ];
  }

  // User Profile methods (still using localStorage for session management)
  async saveOnboardingData(data: any): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      
      // Save onboarding data to Supabase users table
      const { error } = await supabase
        .from('users')
        .update({
          name: data.name,
          company: data.company,
          team_size: data.teamSize,
          phone: data.phone
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        // Fallback to localStorage
        localStorage.setItem('transition_crm_onboarding', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      localStorage.setItem('transition_crm_onboarding', JSON.stringify(data));
    }
  }

  async updateUserProfile(data: any): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { error } = await supabase
        .from('users')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        // Fallback to localStorage
        const profileData = {
          ...data,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('transition_crm_user_profile', JSON.stringify(profileData));
      }
    } catch (error) {
      console.error('Failed to update user profile:', error);
      const profileData = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('transition_crm_user_profile', JSON.stringify(profileData));
    }
  }

  async getUserProfile(): Promise<any> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // Fallback to localStorage
        const profile = localStorage.getItem('transition_crm_user_profile');
        return profile ? JSON.parse(profile) : null;
      }

      return data;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      const profile = localStorage.getItem('transition_crm_user_profile');
      return profile ? JSON.parse(profile) : null;
    }
  }

  async isOnboardingCompleted(): Promise<boolean> {
    try {
      const profile = await this.getUserProfile();
      return profile?.name && profile?.company;
    } catch (error) {
      const localProfile = localStorage.getItem('transition_crm_user_profile');
      const profile = localProfile ? JSON.parse(localProfile) : null;
      return profile?.onboardingCompleted || false;
    }
  }
}

export const dataService = new DataService();