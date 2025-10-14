'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Chrome, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function GoogleLeadGenPage() {
  const campaigns = [
    {
      id: 1,
      name: 'Business Services Search Campaign',
      status: 'active',
      budget: 3000,
      spent: 1850,
      clicks: 234,
      leads: 12,
      cpl: 154,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Chrome className="h-8 w-8 text-red-600" />
            Google Lead Forms
          </h1>
          <p className="text-gray-600 mt-1">Capture leads from Google Search</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{campaigns[0].budget.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns[0].clicks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{campaigns[0].leads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Cost/Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{campaigns[0].cpl}</div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{campaigns[0].name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Google Search • Lead Form Extension</p>
            </div>
            <Badge>Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Budget Used</span>
              <span>{Math.round((campaigns[0].spent / campaigns[0].budget) * 100)}%</span>
            </div>
            <Progress value={(campaigns[0].spent / campaigns[0].budget) * 100} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Pause</Button>
            <Button size="sm" variant="outline">Edit</Button>
            <Button size="sm" variant="outline">View Leads</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How Google Lead Forms Work</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ User searches Google (e.g., "business software")</li>
            <li>✓ Your ad appears with "Get More Info" button</li>
            <li>✓ Lead form opens instantly</li>
            <li>✓ Form auto-filled with Google account data</li>
            <li>✓ Lead delivered to dashboard in real-time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

