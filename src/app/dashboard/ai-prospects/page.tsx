'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Star, 
  Mail, 
  Phone,
  Building2,
  MapPin,
  TrendingUp,
  Clock,
  Sparkles,
  Eye,
  Send,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const DEMO_PROSPECTS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    company: 'Tech Solutions Pvt Ltd',
    industry: 'Software/SaaS',
    location: 'Mumbai',
    email: 'rajesh@techsolutions.in',
    phone: '+91 98765 43210',
    score: 92,
    intent: 'hot',
    found_date: 'Today, 9:00 AM',
    ai_reasoning: 'High match: Growing tech company, 50+ employees, recently hired for sales roles, active on LinkedIn',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    company: 'Digital Ace Marketing',
    industry: 'Marketing Agency',
    location: 'Delhi',
    email: 'priya@digitalace.in',
    phone: '+91 98765 43211',
    score: 88,
    intent: 'hot',
    found_date: 'Today, 9:00 AM',
    ai_reasoning: 'Strong fit: Agency with 20-30 employees, offers B2B services, has case studies page',
  },
  {
    id: 3,
    name: 'Amit Patel',
    company: 'ShopEasy E-commerce',
    industry: 'E-commerce',
    location: 'Bangalore',
    email: 'amit@shopeasy.in',
    phone: '+91 98765 43212',
    score: 85,
    intent: 'warm',
    found_date: 'Today, 9:00 AM',
    ai_reasoning: 'Good match: D2C brand, 10-25 employees, moderate social presence',
  },
];

export default function AIProspectsPage() {
  const [prospects] = useState(DEMO_PROSPECTS);
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const filteredProspects = filter === 'all' 
    ? prospects 
    : prospects.filter(p => p.intent === filter);

  const getIntentBadge = (intent: string) => {
    if (intent === 'hot') return <Badge className="bg-red-600">🔥 Hot</Badge>;
    if (intent === 'warm') return <Badge className="bg-yellow-600">Warm</Badge>;
    return <Badge variant="secondary">Cold</Badge>;
  };

  const generateAIEmail = (prospect: any) => {
    return {
      subject: `Quick question about ${prospect.company}'s growth`,
      body: `Hi ${prospect.name.split(' ')[0]},

I noticed ${prospect.company} has been making great progress in the ${prospect.industry} space in ${prospect.location}.

We help businesses like yours automate their lead generation and marketing—our AI typically helps companies generate 50-100 qualified leads per month on complete autopilot.

Would you be open to a quick 15-minute call this week to explore if we could help ${prospect.company} scale faster?

Best regards,
Demo User
Transition Marketing AI`,
    };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bot className="h-8 w-8 text-purple-600" />
          AI Prospects
        </h1>
        <p className="text-gray-600 mt-1">
          AI finds ideal prospects daily. Review, approve AI-generated emails, and send.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Today's Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">10</div>
            <div className="text-xs text-gray-500 mt-1">Found at 9:00 AM</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
            <div className="text-xs text-gray-500 mt-1">Prospects found</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Avg Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">86</div>
            <div className="text-xs text-gray-500 mt-1">Out of 100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Hot Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">3</div>
            <div className="text-xs text-gray-500 mt-1">Score 85+</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
          🔥 Hot ({prospects.filter(p => p.intent === 'hot').length})
        </Button>
        <Button 
          variant={filter === 'warm' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('warm')}
        >
          Warm ({prospects.filter(p => p.intent === 'warm').length})
        </Button>
      </div>

      {/* Prospects Table */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Found Prospects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prospect</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Found</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {prospect.name}
                        {prospect.score >= 90 && <Sparkles className="h-3 w-3 text-purple-600" />}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {prospect.company}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{prospect.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getIntentBadge(prospect.intent)}</TableCell>
                  <TableCell>
                    <span className="text-sm">{prospect.industry}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {prospect.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {prospect.found_date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setSelectedProspect(prospect)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View AI Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Email Preview Dialog */}
      <Dialog open={!!selectedProspect} onOpenChange={() => setSelectedProspect(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-purple-600" />
              AI-Generated Email for {selectedProspect?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedProspect && (
            <div className="space-y-6">
              {/* Prospect Details */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Company</div>
                      <div className="font-semibold">{selectedProspect.company}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Quality Score</div>
                      <div className="font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {selectedProspect.score}/100
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Industry</div>
                      <div className="font-semibold">{selectedProspect.industry}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Location</div>
                      <div className="font-semibold">{selectedProspect.location}</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border border-purple-200">
                    <div className="text-xs text-purple-900 font-semibold mb-1">AI Reasoning:</div>
                    <div className="text-xs text-gray-700">{selectedProspect.ai_reasoning}</div>
                  </div>
                </CardContent>
              </Card>

              {/* AI-Generated Email */}
              {(() => {
                const email = generateAIEmail(selectedProspect);
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Subject Line</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded border">
                        {email.subject}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Email Body</label>
                      <div className="mt-1 p-4 bg-gray-50 rounded border whitespace-pre-line font-mono text-sm">
                        {email.body}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                      <p className="text-blue-900">
                        ✨ <strong>AI-Personalized:</strong> This email was written by AI specifically for {selectedProspect.name} based on their company, industry, and location. You can edit it or send as-is.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        size="lg"
                        onClick={() => {
                          toast.success(`Email sent to ${selectedProspect.name}! AI will handle follow-ups.`);
                          setSelectedProspect(null);
                        }}
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Approve & Send Email
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => toast.info('Edit feature coming soon')}
                      >
                        Edit Email
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
            How AI Prospecting Works
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">1.</span>
              <span><strong>Every day at 9 AM,</strong> AI searches Google Maps, LinkedIn, and business directories for your ideal customers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">2.</span>
              <span><strong>AI extracts</strong> company name, contact person, email, phone, and business details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">3.</span>
              <span><strong>AI scores quality</strong> (0-100) based on company size, growth signals, and match to your criteria</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">4.</span>
              <span><strong>AI writes personalized emails</strong> for each prospect using their company info</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">5.</span>
              <span><strong>You review & approve</strong> → AI sends and handles all follow-ups automatically</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

