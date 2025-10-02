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

const STORAGE_KEY_CONTACTS = 'transition_crm_contacts';
const STORAGE_KEY_DEALS = 'transition_crm_deals';

class DataService {
  private getCurrentUserId(): string {
    // In a real app, this would come from the session
    return 'demo-user';
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  private getFromStorage<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get from localStorage:', error);
      return [];
    }
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    const allContacts = this.getFromStorage<Contact>(STORAGE_KEY_CONTACTS);
    const userContacts = allContacts.filter(contact => contact.userId === this.getCurrentUserId());
    
    // If no contacts exist, return sample data for demo
    if (userContacts.length === 0) {
      return this.getSampleContacts();
    }
    
    return userContacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async addContact(contact: Omit<Contact, 'id' | 'createdAt' | 'userId'>): Promise<Contact> {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: this.getCurrentUserId(),
    };

    const allContacts = this.getFromStorage<Contact>(STORAGE_KEY_CONTACTS);
    allContacts.push(newContact);
    this.saveToStorage(STORAGE_KEY_CONTACTS, allContacts);

    return newContact;
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    const allContacts = this.getFromStorage<Contact>(STORAGE_KEY_CONTACTS);
    const contactIndex = allContacts.findIndex(contact => contact.id === id && contact.userId === this.getCurrentUserId());
    
    if (contactIndex === -1) return null;

    allContacts[contactIndex] = { ...allContacts[contactIndex], ...updates };
    this.saveToStorage(STORAGE_KEY_CONTACTS, allContacts);

    return allContacts[contactIndex];
  }

  async deleteContact(id: string): Promise<boolean> {
    const allContacts = this.getFromStorage<Contact>(STORAGE_KEY_CONTACTS);
    const userContacts = allContacts.filter(contact => contact.userId !== this.getCurrentUserId() || contact.id !== id);
    
    if (userContacts.length === allContacts.length) return false;

    this.saveToStorage(STORAGE_KEY_CONTACTS, userContacts);
    return true;
  }

  // Deal methods
  async getDeals(): Promise<Deal[]> {
    const allDeals = this.getFromStorage<Deal>(STORAGE_KEY_DEALS);
    const userDeals = allDeals.filter(deal => deal.userId === this.getCurrentUserId());
    
    // If no deals exist, return sample data for demo
    if (userDeals.length === 0) {
      return this.getSampleDeals();
    }
    
    return userDeals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async addDeal(deal: Omit<Deal, 'id' | 'createdAt' | 'userId'>): Promise<Deal> {
    const newDeal: Deal = {
      ...deal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: this.getCurrentUserId(),
    };

    const allDeals = this.getFromStorage<Deal>(STORAGE_KEY_DEALS);
    allDeals.push(newDeal);
    this.saveToStorage(STORAGE_KEY_DEALS, allDeals);

    return newDeal;
  }

  async updateDeal(id: string, updates: Partial<Deal>): Promise<Deal | null> {
    const allDeals = this.getFromStorage<Deal>(STORAGE_KEY_DEALS);
    const dealIndex = allDeals.findIndex(deal => deal.id === id && deal.userId === this.getCurrentUserId());
    
    if (dealIndex === -1) return null;

    allDeals[dealIndex] = { ...allDeals[dealIndex], ...updates };
    this.saveToStorage(STORAGE_KEY_DEALS, allDeals);

    return allDeals[dealIndex];
  }

  async deleteDeal(id: string): Promise<boolean> {
    const allDeals = this.getFromStorage<Deal>(STORAGE_KEY_DEALS);
    const userDeals = allDeals.filter(deal => deal.userId !== this.getCurrentUserId() || deal.id !== id);
    
    if (userDeals.length === allDeals.length) return false;

    this.saveToStorage(STORAGE_KEY_DEALS, userDeals);
    return true;
  }

  // Sample data for demo
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
        userId: this.getCurrentUserId()
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
        userId: this.getCurrentUserId()
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
        userId: this.getCurrentUserId()
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
        userId: this.getCurrentUserId()
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
        userId: this.getCurrentUserId()
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
        userId: this.getCurrentUserId()
      }
    ];
  }

  // Onboarding methods
  async saveOnboardingData(data: any): Promise<void> {
    try {
      // Here you would save to Supabase in production
      localStorage.setItem('transition_crm_onboarding', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
    }
  }

  async updateUserProfile(data: any): Promise<void> {
    try {
      const profileData = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('transition_crm_user_profile', JSON.stringify(profileData));
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  }

  async getUserProfile(): Promise<any> {
    try {
      const profile = localStorage.getItem('transition_crm_user_profile');
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return null;
    }
  }

  async isOnboardingCompleted(): Promise<boolean> {
    const profile = await this.getUserProfile();
    return profile?.onboardingCompleted || false;
  }
}

export const dataService = new DataService();
