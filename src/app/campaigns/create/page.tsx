"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function CreateCampaignPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    selectedLeads: [] as number[],
  });

  const emailTemplates = [
    {
      id: 'intro',
      name: 'Introduction Email',
      subject: 'Quick question about {{company}}',
      body: `Hi {{name}},\n\nI noticed {{company}} is in the {{industry}} space. We help businesses like yours {{value_proposition}}.\n\nWould you be open to a quick 15-minute call to discuss how we can help?\n\nBest regards,\n{{sender_name}}`
    },
    {
      id: 'follow-up',
      name: 'Follow-up Email',
      subject: 'Following up on my previous email',
      body: `Hi {{name}},\n\nI wanted to follow up on my previous email about {{topic}}.\n\nI understand you're busy, but I believe we can help {{company}} with {{pain_point}}.\n\nWould you have 10 minutes this week for a quick chat?\n\nBest,\n{{sender_name}}`
    },
    {
      id: 'value',
      name: 'Value Proposition',
      subject: 'How {{your_company}} can help {{company}}',
      body: `Hi {{name}},\n\nI've been researching {{company}} and noticed you might benefit from {{solution}}.\n\nWe've helped similar companies in {{industry}} achieve:\n- {{benefit_1}}\n- {{benefit_2}}\n- {{benefit_3}}\n\nInterested in learning more?\n\nBest,\n{{sender_name}}`
    }
  ];

  const useTemplate = (template: typeof emailTemplates[0]) => {
    setFormData({
      ...formData,
      subject: template.subject,
      body: template.body,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create campaign
      const { data: campaign, error } = await supabase
        .from('email_campaigns')
        .insert({
          user_id: user?.id,
          name: formData.name,
          subject: formData.subject,
          body: formData.body,
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;

      router.push('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Create Email Campaign</h1>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Templates Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Email Templates</h3>
              <div className="space-y-3">
                {emailTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => useTemplate(template)}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{template.subject}</div>
                  </button>
                ))}
              </div>

              {/* Variables Guide */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Available Variables:</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div><code>{'{{name}}'}</code> - Contact name</div>
                  <div><code>{'{{company}}'}</code> - Company name</div>
                  <div><code>{'{{industry}}'}</code> - Industry</div>
                  <div><code>{'{{location}}'}</code> - City</div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Campaign Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Campaign Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Q1 Outreach Campaign"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Quick question about {{company}}"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Body *
                    </label>
                    <textarea
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      rows={12}
                      placeholder="Hi {{name}},&#10;&#10;I noticed {{company}} is..."
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use variables like {'{{name}}'} and {'{{company}}'} for personalization
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Save as Draft'}
                </button>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-all"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

