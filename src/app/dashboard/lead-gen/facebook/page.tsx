'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Facebook, Play, Pause, DollarSign, Users, TrendingUp, Target } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

export default function FacebookAdsPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: '3BHK Apartments Mumbai',
      status: 'active',
      budget: 5000,
      spent: 3250,
      impressions: 45200,
      clicks: 892,
      leads: 23,
      cpl: 141,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Facebook className="h-8 w-8 text-blue-600" />
            Facebook Lead Ads
          </h1>
          <p className="text-gray-600 mt-1">Capture leads directly from Facebook News Feed</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => toast.info('Campaign creation opens...')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Facebook Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Cost/Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹141</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{campaign.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Facebook News Feed • Lead Form</p>
                </div>
                <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="text-xl font-bold">₹{campaign.budget.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Spent</div>
                  <div className="text-xl font-bold">₹{campaign.spent.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Impressions</div>
                  <div className="text-xl font-bold">{(campaign.impressions / 1000).toFixed(1)}K</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Clicks</div>
                  <div className="text-xl font-bold">{campaign.clicks}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Leads</div>
                  <div className="text-xl font-bold text-green-600">{campaign.leads}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget Used</span>
                  <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                </div>
                <Progress value={(campaign.spent / campaign.budget) * 100} />
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Pause className="h-4 w-4 mr-1" /> Pause
                </Button>
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">View Leads</Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View in Facebook</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Facebook Lead Ads - How It Works</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Your ad appears in Facebook News Feed to targeted audience</li>
            <li>✓ Users click → Instant form opens (pre-filled with Facebook data)</li>
            <li>✓ Lead submits → Webhook captures data instantly</li>
            <li>✓ Lead appears in your dashboard as "Verified Lead"</li>
            <li>✓ Conversation auto-created → You can chat immediately</li>
            <li>✓ WhatsApp notification sent to you</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

