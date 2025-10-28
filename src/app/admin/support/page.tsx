'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Ticket, ArrowLeft } from 'lucide-react';

export default function AdminSupportPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Support Tickets</h1>
        <p className="text-slate-600">Manage customer support requests</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Ticket className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Support Center</h3>
          <p className="text-slate-600 mb-6">View and manage all customer support tickets.</p>
          <p className="text-sm text-slate-500">This feature will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}

