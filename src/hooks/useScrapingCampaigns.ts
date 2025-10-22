import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface ScrapingCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  frequency: 'daily' | 'weekly' | 'monthly';
  search_criteria: {
    locations?: string[];
    keywords?: string[];
    industry?: string;
  };
  scraping_sources: string[];
  max_contacts_per_run: number;
  quality_threshold: number;
  next_run_at: string;
  created_at: string;
  contacts_generated?: number;
  last_run_at?: string;
}

export interface ScrapingCampaignsResponse {
  campaigns: ScrapingCampaign[];
  total: number;
}

export function useScrapingCampaigns() {
  const [campaigns, setCampaigns] = useState<ScrapingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/scraping/campaigns');
      
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }

      const data: ScrapingCampaignsResponse = await response.json();
      setCampaigns(data.campaigns);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load scraping campaigns');
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData: Partial<ScrapingCampaign>) => {
    try {
      const response = await fetch('/api/scraping/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      });

      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }

      const result = await response.json();
      toast.success('Scraping campaign created successfully');
      
      // Refresh campaigns list
      await fetchCampaigns();
      
      return result.campaign;
    } catch (err: any) {
      toast.error('Failed to create scraping campaign');
      throw err;
    }
  };

  const updateCampaignStatus = async (campaignId: string, status: ScrapingCampaign['status']) => {
    try {
      const response = await fetch(`/api/scraping/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update campaign');
      }

      toast.success('Campaign status updated');
      
      // Update local state
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === campaignId ? { ...campaign, status } : campaign
      ));
    } catch (err: any) {
      toast.error('Failed to update campaign status');
      throw err;
    }
  };

  const executeCampaign = async (campaignId: string) => {
    try {
      const response = await fetch('/api/scraping/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaign_id: campaignId }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute campaign');
      }

      toast.success('Campaign execution started');
      
      // Refresh campaigns list after a delay
      setTimeout(() => {
        fetchCampaigns();
      }, 2000);
    } catch (err: any) {
      toast.error('Failed to execute campaign');
      throw err;
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
    updateCampaignStatus,
    executeCampaign,
  };
}

export function useScrapingStats() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeCampaigns: 0,
    avgQualityScore: 0,
    costPerContact: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // For now, we'll calculate stats from campaigns
        // In the future, this should come from a dedicated stats API
        const response = await fetch('/api/scraping/campaigns');
        
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }

        const data = await response.json();
        const campaigns = data.campaigns;
        
        const totalContacts = campaigns.reduce((sum: number, campaign: ScrapingCampaign) => 
          sum + (campaign.contacts_generated || 0), 0
        );
        
        const activeCampaigns = campaigns.filter((c: ScrapingCampaign) => c.status === 'active').length;
        
        setStats({
          totalContacts,
          activeCampaigns,
          avgQualityScore: 78, // This should come from actual data
          costPerContact: 2, // This should come from actual data
        });
      } catch (err) {
        console.error('Failed to fetch scraping stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
