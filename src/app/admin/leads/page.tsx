'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';

export default function AdminLeadsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">All Leads</h1>
        <p className="text-slate-600">Manage leads across all clients</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Leads Management</h3>
          <p className="text-slate-600 mb-6">View and manage all leads across clients from here.</p>
          <p className="text-sm text-slate-500">This feature will be available soon. For now, manage leads from individual client pages.</p>
        </CardContent>
      </Card>
    </div>
  );
}

