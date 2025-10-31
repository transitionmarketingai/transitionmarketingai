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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" asChild>
          <Link href="/admin/leads/verify">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Verify Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Verify leads before delivering to clients</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Go to Verification Dashboard
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">View all leads across clients (coming soon)</p>
            <p className="text-sm text-slate-500">For now, manage leads from individual client pages.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

