'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Phone, 
  PhoneCall, 
  PhoneMissed, 
  Clock, 
  Search,
  Filter,
  Download,
  Play,
  Pause
} from 'lucide-react';

export default function CallsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Demo call data
  const calls = [
    {
      id: '1',
      leadName: 'Rajesh Kumar',
      leadCompany: 'Sunrise Properties',
      phone: '+91 98765 43210',
      duration: '5:23',
      status: 'answered',
      timestamp: '2024-10-23T10:30:00',
      notes: 'Interested in premium listings. Follow up next week.',
      recording: true
    },
    {
      id: '2',
      leadName: 'Priya Sharma',
      leadCompany: 'Elite Realty',
      phone: '+91 98765 43211',
      duration: '3:45',
      status: 'answered',
      timestamp: '2024-10-23T09:15:00',
      notes: 'Requested demo for next month.',
      recording: true
    },
    {
      id: '3',
      leadName: 'Amit Patel',
      leadCompany: 'Metro Homes',
      phone: '+91 98765 43212',
      duration: '0:00',
      status: 'missed',
      timestamp: '2024-10-23T08:45:00',
      notes: '',
      recording: false
    },
    {
      id: '4',
      leadName: 'Sneha Reddy',
      leadCompany: 'Dream Estates',
      phone: '+91 98765 43213',
      duration: '2:10',
      status: 'voicemail',
      timestamp: '2024-10-22T16:20:00',
      notes: 'Left voicemail about our services.',
      recording: true
    },
    {
      id: '5',
      leadName: 'Vikram Singh',
      leadCompany: 'Royal Properties',
      phone: '+91 98765 43214',
      duration: '7:55',
      status: 'answered',
      timestamp: '2024-10-22T14:10:00',
      notes: 'Very interested! Scheduled meeting for Friday.',
      recording: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'answered':
        return <Badge className="bg-green-100 text-green-700">Answered</Badge>;
      case 'missed':
        return <Badge className="bg-red-100 text-red-700">Missed</Badge>;
      case 'voicemail':
        return <Badge className="bg-yellow-100 text-yellow-700">Voicemail</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered':
        return <PhoneCall className="h-4 w-4 text-green-600" />;
      case 'missed':
        return <PhoneMissed className="h-4 w-4 text-red-600" />;
      default:
        return <Phone className="h-4 w-4 text-yellow-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Phone Calls</h1>
        <p className="text-slate-600">Track and manage all your lead calls in one place</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Calls</p>
                <p className="text-2xl font-bold text-slate-900">37</p>
              </div>
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Answered</p>
                <p className="text-2xl font-bold text-green-600">28</p>
              </div>
              <PhoneCall className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Missed</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <PhoneMissed className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Duration</p>
                <p className="text-2xl font-bold text-slate-900">4:32</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by lead name, company, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>Your call history with leads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calls.map((call) => (
              <div
                key={call.id}
                className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(call.status)}
                </div>

                {/* Call Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1">{call.leadName}</h3>
                      <p className="text-sm text-slate-600">{call.leadCompany}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(call.status)}
                      <span className="text-sm text-slate-500">{formatTimestamp(call.timestamp)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {call.phone}
                    </span>
                    {call.duration !== '0:00' && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {call.duration}
                      </span>
                    )}
                  </div>

                  {call.notes && (
                    <p className="text-sm text-slate-700 mb-3 bg-slate-50 p-2 rounded">
                      {call.notes}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Call Again
                    </Button>
                    {call.recording && (
                      <Button size="sm" variant="ghost" className="gap-2">
                        <Play className="h-4 w-4" />
                        Play Recording
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      Add Notes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State (if no calls) */}
      {calls.length === 0 && (
        <Card className="mt-8">
          <CardContent className="p-12 text-center">
            <Phone className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No calls yet</h3>
            <p className="text-slate-600 mb-6">
              Start calling your leads and track all conversations here.
            </p>
            <Button className="gap-2">
              <Phone className="h-4 w-4" />
              Make First Call
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

