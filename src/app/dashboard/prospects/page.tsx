'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Star, 
  Lock,
  Unlock,
  Building2,
  MapPin,
  Target,
  TrendingUp,
  Eye,
  Filter,
  Search,
  AlertCircle,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const DEMO_PROSPECTS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    company: 'Tech Solutions Pvt Ltd',
    industry: 'Software/SaaS',
    location: 'Mumbai, Maharashtra',
    source: 'LinkedIn Scraping',
    score: 92,
    intent: 'hot',
    found_date: '2 hours ago',
    locked: true,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    company: 'Digital Ace Marketing',
    industry: 'Marketing Agency',
    location: 'Delhi, NCR',
    source: 'Google Maps',
    score: 88,
    intent: 'hot',
    found_date: '3 hours ago',
    locked: true,
  },
  {
    id: 3,
    name: 'Amit Patel',
    company: 'ShopEasy E-commerce',
    industry: 'E-commerce',
    location: 'Bangalore, Karnataka',
    source: 'Facebook Ads',
    score: 85,
    intent: 'warm',
    found_date: '5 hours ago',
    locked: true,
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    company: 'Prime Real Estate',
    industry: 'Real Estate',
    location: 'Hyderabad, Telangana',
    source: 'Google Maps',
    score: 90,
    intent: 'hot',
    found_date: '1 day ago',
    locked: true,
  },
  {
    id: 5,
    name: 'Vikram Singh',
    company: 'Elite Consultants',
    industry: 'Consulting',
    location: 'Pune, Maharashtra',
    source: 'LinkedIn Scraping',
    score: 82,
    intent: 'warm',
    found_date: '1 day ago',
    locked: true,
  },
];

export default function ProspectsPage() {
  const [prospects] = useState(DEMO_PROSPECTS);
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProspects = prospects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || p.intent === filter;
    return matchesSearch && matchesFilter;
  });

  const getIntentBadge = (intent: string) => {
    if (intent === 'hot') return <Badge className="bg-red-600 hover:bg-red-700">🔥 Hot</Badge>;
    if (intent === 'warm') return <Badge className="bg-yellow-600 hover:bg-yellow-700">⚡ Warm</Badge>;
    return <Badge variant="secondary">Cold</Badge>;
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-600">Excellent</Badge>;
    if (score >= 80) return <Badge className="bg-blue-600">Good</Badge>;
    return <Badge variant="secondary">Fair</Badge>;
  };

  const handleUnlock = (prospect: any) => {
    setSelectedProspect(prospect);
    setUnlockDialogOpen(true);
  };

  const confirmUnlock = () => {
    toast.success(`Contact unlocked for ${selectedProspect.name}! 10 credits used.`);
    setUnlockDialogOpen(false);
    // In real app: deduct credits, reveal contact, move to leads
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Bot className="h-8 w-8 text-purple-600" />
          New Prospects
          <Lock className="h-6 w-6 text-slate-400" />
        </h1>
        <p className="text-slate-600">
          AI-found prospects with locked contact details. Unlock with credits to reveal phone & email.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Today's Prospects</p>
                <p className="text-2xl font-bold text-purple-600">10</p>
              </div>
              <Bot className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-slate-900">247</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Quality</p>
                <p className="text-2xl font-bold text-slate-900">86/100</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Hot Leads</p>
                <p className="text-2xl font-bold text-red-600">4</p>
              </div>
              <Target className="h-8 w-8 text-red-600" />
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
                  placeholder="Search by name or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({prospects.length})
              </Button>
              <Button 
                variant={filter === 'hot' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('hot')}
                className={filter === 'hot' ? 'bg-red-600' : ''}
              >
                🔥 Hot
              </Button>
              <Button 
                variant={filter === 'warm' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('warm')}
                className={filter === 'warm' ? 'bg-yellow-600' : ''}
              >
                Warm
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prospects Table */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Found Prospects</CardTitle>
          <CardDescription>Review and unlock to reveal contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name & Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Found</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map((prospect) => (
                <TableRow key={prospect.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        {prospect.name}
                        <Lock className="h-3 w-3 text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {prospect.company}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-700">{prospect.industry}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-slate-700">
                      <MapPin className="h-3 w-3" />
                      {prospect.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {prospect.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-slate-900">{prospect.score}</span>
                      {getScoreBadge(prospect.score)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getIntentBadge(prospect.intent)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{prospect.found_date}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleUnlock(prospect)}
                      size="sm"
                      className="gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Unlock className="h-4 w-4" />
                      Unlock Contact
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredProspects.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No prospects found</h3>
              <p className="text-slate-600">Try adjusting your filters or wait for AI to find new prospects.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unlock Dialog */}
      <Dialog open={unlockDialogOpen} onOpenChange={setUnlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Unlock className="h-5 w-5 text-purple-600" />
              Unlock Contact Details
            </DialogTitle>
            <DialogDescription>
              Reveal full contact information for this prospect
            </DialogDescription>
          </DialogHeader>

          {selectedProspect && (
            <div className="py-4 space-y-4">
              {/* Prospect Info */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">{selectedProspect.name}</h3>
                <p className="text-sm text-slate-600 mb-1">{selectedProspect.company}</p>
                <p className="text-sm text-slate-600">{selectedProspect.location}</p>
                <div className="flex gap-2 mt-3">
                  {getIntentBadge(selectedProspect.intent)}
                  {getScoreBadge(selectedProspect.score)}
                </div>
              </div>

              {/* Cost Info */}
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-1">Credit Cost</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Unlocking this contact will cost <strong>10 credits</strong>
                    </p>
                    <p className="text-xs text-blue-600">
                      You'll get: Phone number, Email address, and full contact details
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Balance */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Your current balance:</span>
                <span className="font-bold text-slate-900">1,250 credits</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">After unlock:</span>
                <span className="font-bold text-green-600">1,240 credits</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setUnlockDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUnlock} className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Unlock className="h-4 w-4" />
              Unlock for 10 Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
