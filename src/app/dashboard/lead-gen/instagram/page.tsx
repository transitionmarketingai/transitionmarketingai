'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Instagram } from 'lucide-react';
import { toast } from 'sonner';

export default function InstagramAdsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Instagram className="h-8 w-8 text-pink-600" />
            Instagram Lead Ads
          </h1>
          <p className="text-gray-600 mt-1">Capture leads from Instagram Stories & Feed</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => toast.info('Campaign creation coming soon')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Instagram Campaign
        </Button>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Instagram className="h-16 w-16 mx-auto mb-4 text-pink-300" />
          <h3 className="text-xl font-semibold mb-2">No Instagram Campaigns Yet</h3>
          <p className="text-gray-600 mb-6">Instagram ads share the same platform as Facebook. Create your first campaign to start generating leads!</p>
          <Button className="bg-pink-600 hover:bg-pink-700">Create Campaign</Button>
        </CardContent>
      </Card>

      <Card className="bg-pink-50 border-pink-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Instagram Lead Ads - How It Works</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Ads appear in Instagram Stories or Feed</li>
            <li>✓ Users swipe up → Lead form opens</li>
            <li>✓ Form pre-filled with Instagram data</li>
            <li>✓ Instant webhook delivery to your dashboard</li>
            <li>✓ Same automation as Facebook</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

