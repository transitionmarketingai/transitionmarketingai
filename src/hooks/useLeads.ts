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
