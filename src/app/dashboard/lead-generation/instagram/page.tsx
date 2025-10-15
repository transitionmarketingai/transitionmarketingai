'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Plus, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function InstagramLeadGenPage() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    toast.loading('Opening Instagram/Facebook OAuth...');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Instagram account connected successfully!');
      setIsConnected(true);
    }, 2000);
  };

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
        <Button 
          className="bg-pink-600 hover:bg-pink-700"
          disabled={!isConnected}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <Card className="border-2 border-pink-200 bg-pink-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Connect Your Instagram Account</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Instagram ads use the same platform as Facebook. Connect your Facebook Business account to run Instagram campaigns.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ One connection for both Facebook & Instagram</li>
                  <li>✓ You pay Meta directly for ad spend</li>
                  <li>✓ We handle campaign setup & optimization</li>
                </ul>
              </div>
              <div className="ml-6">
                <Button 
                  size="lg"
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={handleConnect}
                >
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Connect Instagram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="py-12 text-center">
          <Instagram className="h-16 w-16 mx-auto mb-4 text-pink-300" />
          <h3 className="text-xl font-semibold mb-2">No Instagram Campaigns Yet</h3>
          <p className="text-gray-600 mb-6">Instagram ads share the same platform as Facebook. Create your first campaign!</p>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Create First Campaign
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-pink-50 border-pink-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How Instagram Lead Ads Work</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Ads appear in Instagram Stories or Feed</li>
            <li>✓ Users swipe up → Lead form opens</li>
            <li>✓ Form pre-filled with Instagram data</li>
            <li>✓ Instant delivery to your dashboard</li>
            <li>✓ Same automation as Facebook</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

