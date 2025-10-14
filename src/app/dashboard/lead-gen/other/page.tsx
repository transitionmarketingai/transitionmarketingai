'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Mail, Phone, Globe } from 'lucide-react';

export default function OtherMethodsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Zap className="h-8 w-8 text-yellow-600" />
          Other Lead Generation Methods
        </h1>
        <p className="text-gray-600 mt-1">Additional ways to generate leads</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Email Marketing</h3>
            <p className="text-sm text-gray-600 mb-4">Bulk email campaigns to cold leads</p>
            <Button variant="outline" className="w-full">Coming Soon</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <Phone className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Cold Calling</h3>
            <p className="text-sm text-gray-600 mb-4">Automated calling campaigns</p>
            <Button variant="outline" className="w-full">Coming Soon</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <Globe className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Website Forms</h3>
            <p className="text-sm text-gray-600 mb-4">Embed forms on your website</p>
            <Button variant="outline" className="w-full">Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

