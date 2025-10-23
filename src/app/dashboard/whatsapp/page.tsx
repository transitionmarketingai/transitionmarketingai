'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Plus } from 'lucide-react';

export default function WhatsAppPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">WhatsApp Messaging</h1>
        <p className="text-slate-600">Connect with leads via WhatsApp Business</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <MessageCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">WhatsApp Integration Coming Soon</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Send messages, share catalogs, and engage with leads directly on WhatsApp Business API.
          </p>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-4 w-4" />
            Connect WhatsApp
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

