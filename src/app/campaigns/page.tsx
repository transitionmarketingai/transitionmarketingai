"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Campaign {
  id: number;
  name: string;
  subject: string;
  status: string;
  sent_count: number;
  opened_count: number;
  clicked_count: number;
  created_at: string;
}

export default function CampaignsPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCampaigns();
    }
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      const { data } = await supabase
        .from('email_campaigns')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'scheduled': return 'bg-yellow-100 text-yellow-700';
      case 'sending': return 'bg-blue-100 text-blue-700';
      case 'sent': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Email Campaigns</h1>
            <div className="flex gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Back to Dashboard
              </Link>
              <Link
                href="/campaigns/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
            <div className="text-sm text-gray-600">Total Campaigns</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {campaigns.filter(c => c.status === 'sent').length}
            </div>
            <div className="text-sm text-gray-600">Sent</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">
              {campaigns.reduce((acc, c) => acc + c.sent_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Emails Sent</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-purple-600">
              {campaigns.reduce((acc, c) => acc + c.opened_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Opens</div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Your Campaigns</h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">📧</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h4>
              <p className="text-gray-600 mb-6">Create your first email campaign to start reaching out to leads.</p>
              <Link
                href="/campaigns/create"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Campaign
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opens</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.subject}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{campaign.sent_count}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {campaign.opened_count}
                        {campaign.sent_count > 0 && (
                          <span className="text-gray-500 ml-1">
                            ({Math.round((campaign.opened_count / campaign.sent_count) * 100)}%)
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{campaign.clicked_count}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(campaign.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                        <button className="text-green-600 hover:text-green-900">Send</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

