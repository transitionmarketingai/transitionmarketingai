import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  quality_score: number;
  intent: 'hot' | 'warm' | 'cold';
  status: 'new' | 'contacted' | 'qualified' | 'meeting_scheduled' | 'won' | 'lost';
  city?: string;
  state?: string;
  received_at: string;
  lead_data?: any;
}

export interface LeadsResponse {
  leads: Lead[];
  total: number;
  limit: number;
  offset: number;
}

export function useLeads(status?: string, search?: string) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if in demo mode
      const isDemoMode = typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true';

      if (isDemoMode) {
        // Return demo data
        const demoLeads: Lead[] = [
          {
            id: '1',
            name: 'Rajesh Kumar',
            phone: '+91 98765 43210',
            email: 'rajesh@techcorp.com',
            source: 'web_scraping',
            quality_score: 92,
            intent: 'hot',
            status: 'qualified',
            city: 'Mumbai',
            state: 'Maharashtra',
            received_at: '2025-01-15T10:30:00Z',
            lead_data: { company: 'TechCorp Solutions', budget: '₹50L - ₹1Cr' }
          },
          {
            id: '2',
            name: 'Priya Sharma',
            phone: '+91 87654 32109',
            email: 'priya@startupxyz.com',
            source: 'facebook_ads',
            quality_score: 88,
            intent: 'warm',
            status: 'contacted',
            city: 'Bangalore',
            state: 'Karnataka',
            received_at: '2025-01-15T09:15:00Z',
            lead_data: { company: 'StartupXYZ', budget: '₹20L - ₹50L' }
          },
          {
            id: '3',
            name: 'Anita Patel',
            phone: '+91 76543 21098',
            email: 'anita@growthco.com',
            source: 'google_ads',
            quality_score: 95,
            intent: 'hot',
            status: 'new',
            city: 'Delhi',
            state: 'NCR',
            received_at: '2025-01-15T08:45:00Z',
            lead_data: { company: 'GrowthCo', budget: '₹1Cr+' }
          },
          {
            id: '4',
            name: 'Vikram Singh',
            phone: '+91 65432 10987',
            email: 'vikram@techventures.com',
            source: 'web_scraping',
            quality_score: 78,
            intent: 'warm',
            status: 'new',
            city: 'Pune',
            state: 'Maharashtra',
            received_at: '2025-01-14T16:20:00Z',
            lead_data: { company: 'Tech Ventures', budget: '₹30L - ₹60L' }
          },
          {
            id: '5',
            name: 'Meera Reddy',
            phone: '+91 54321 09876',
            email: 'meera@innovatesolutions.com',
            source: 'outreach_response',
            quality_score: 85,
            intent: 'hot',
            status: 'meeting_scheduled',
            city: 'Hyderabad',
            state: 'Telangana',
            received_at: '2025-01-14T14:10:00Z',
            lead_data: { company: 'Innovate Solutions', budget: '₹40L - ₹80L' }
          }
        ];

        // Filter by status if provided
        let filteredLeads = demoLeads;
        if (status && status !== 'all') {
          filteredLeads = demoLeads.filter(lead => lead.status === status);
        }

        // Filter by search term if provided
        if (search && search.trim()) {
          const searchLower = search.toLowerCase();
          filteredLeads = filteredLeads.filter(lead => 
            lead.name.toLowerCase().includes(searchLower) ||
            lead.email?.toLowerCase().includes(searchLower) ||
            lead.phone.includes(search)
          );
        }

        setLeads(filteredLeads);
        setTotal(filteredLeads.length);
        setLoading(false);
        return;
      }

      // Real API call for authenticated users
      const params = new URLSearchParams();
      if (status && status !== 'all') params.append('status', status);
      if (search) params.append('search', search);
      params.append('limit', '100');
      params.append('offset', '0');

      const response = await fetch(`/api/leads?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const data: LeadsResponse = await response.json();
      setLeads(data.leads);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: Partial<Lead>) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to create lead');
      }

      const result = await response.json();
      toast.success('Lead created successfully');
      
      // Refresh leads list
      await fetchLeads();
      
      return result.lead;
    } catch (err: any) {
      toast.error('Failed to create lead');
      throw err;
    }
  };

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      toast.success('Lead status updated');
      
      // Update local state
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status } : lead
      ));
    } catch (err: any) {
      toast.error('Failed to update lead status');
      throw err;
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [status, search]);

  return {
    leads,
    loading,
    error,
    total,
    fetchLeads,
    createLead,
    updateLeadStatus,
  };
}

export function useLeadStats() {
  const [stats, setStats] = useState({
    new: 0,
    contacted: 0,
    qualified: 0,
    meeting_scheduled: 0,
    won: 0,
    lost: 0,
    total: 0,
    avgQualityScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Check if in demo mode
        const isDemoMode = typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true';

        if (isDemoMode) {
          // Return demo stats
          setStats({
            new: 2,
            contacted: 1,
            qualified: 1,
            meeting_scheduled: 1,
            won: 0,
            lost: 0,
            total: 5,
            avgQualityScore: 88,
          });
          setLoading(false);
          return;
        }

        // Real API call for authenticated users
        const response = await fetch('/api/analytics/dashboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data.stats);
      } catch (err) {
        console.error('Failed to fetch lead stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
