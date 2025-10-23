'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Plus } from 'lucide-react';

export default function EmailCampaignsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Email Campaigns</h1>
        <p className="text-slate-600">Create and manage email campaigns to nurture your leads</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Email Campaigns Coming Soon</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Create automated email sequences, track opens and clicks, and nurture your leads at scale.
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

