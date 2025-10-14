'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Play, 
  Pause, 
  Calendar,
  MapPin,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function AIScrapingPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Mumbai Real Estate Leads',
      status: 'active',
      frequency: 'daily',
      contactsGenerated: 1247,
      lastRun: '2 hours ago',
      nextRun: 'Tomorrow 9 AM',
      locations: ['Mumbai', 'Pune', 'Thane'],
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Search className="h-8 w-8 text-purple-600" />
            AI Web Scraping
          </h1>
          <p className="text-gray-600 mt-1">Automatically find potential customers from the web</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Scraping Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create AI Scraping Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Campaign Name</Label>
                <Input placeholder="e.g., Mumbai Real Estate Leads" />
              </div>
              <div>
                <Label>Target Locations</Label>
                <Input placeholder="Mumbai, Pune, Delhi" />
              </div>
              <div>
                <Label>Search Keywords</Label>
                <Input placeholder="real estate, property broker" />
              </div>
              <div>
                <Label>Frequency</Label>
                <select className="w-full border rounded-md p-2">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  toast.success('Campaign created! AI scraping will start tomorrow.');
                  setShowCreateModal(false);
                }}
              >
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,247</div>
            <div className="text-xs text-gray-500 mt-1">From AI scraping</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{campaigns.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
            <div className="text-xs text-gray-500 mt-1">Out of 100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cost/Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹2</div>
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
                  <CardTitle className="flex items-center gap-2">
                    {campaign.name}
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Frequency: {campaign.frequency} at 9:00 AM
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {campaign.status === 'active' ? (
                    <><Pause className="h-4 w-4 mr-2" /> Pause</>
                  ) : (
                    <><Play className="h-4 w-4 mr-2" /> Resume</>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Users className="h-3 w-3" /> Contacts Generated
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{campaign.contactsGenerated}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Last Run
                  </div>
                  <div className="text-sm font-medium">{campaign.lastRun}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Next Run
                  </div>
                  <div className="text-sm font-medium">{campaign.nextRun}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Locations
                  </div>
                  <div className="text-sm font-medium">{campaign.locations.join(', ')}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Contacts</Button>
                <Button size="sm" variant="outline">Edit Campaign</Button>
                <Button size="sm" variant="outline">Run Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            How AI Scraping Works
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ AI searches Google Maps, LinkedIn, and directories daily</li>
            <li>✓ Extracts contact information (name, phone, email, company)</li>
            <li>✓ AI scores quality (0-100) based on profile completeness</li>
            <li>✓ Only saves contacts above your quality threshold</li>
            <li>✓ Contacts appear in your Contacts database</li>
            <li>✓ Ready for bulk outreach campaigns</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

