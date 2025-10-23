'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports</h1>
        <p className="text-slate-600">Generate detailed reports and export your data</p>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Advanced Reports Coming Soon</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Export detailed reports on leads, campaigns, ROI, and team performance.
          </p>
          <Button className="gap-2" variant="outline">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

