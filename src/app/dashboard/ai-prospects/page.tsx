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
  MessageCircle,
  Zap,
  CheckCircle2,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { EnrichmentData } from '@/lib/lead-enrichment/enricher';

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
  const [enrichmentData, setEnrichmentData] = useState<EnrichmentData | null>(null);
  const [enriching, setEnriching] = useState(false);

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

  const enrichProspect = async (prospect: any) => {
    setEnriching(true);
    toast.info('🔍 AI is enriching lead data...');
    
    try {
      const response = await fetch('/api/leads/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: prospect.name,
          email: prospect.email,
          phone: prospect.phone,
          company: prospect.company,
          location: prospect.location,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEnrichmentData(data.enrichment);
        toast.success(`✨ Found ${data.enrichment.enrichmentScore}% complete data!`);
      } else {
        toast.error('Failed to enrich lead data');
      }
    } catch (error) {
      console.error('Enrichment error:', error);
      toast.error('Failed to enrich lead data');
    } finally {
      setEnriching(false);
    }
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
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setSelectedProspect(prospect)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Start Conversation
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Start Conversation Dialog */}
      <Dialog open={!!selectedProspect} onOpenChange={() => {
        setSelectedProspect(null);
        setEnrichmentData(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-green-600" />
              Start Conversation with {selectedProspect?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedProspect && (
            <div className="space-y-6">
              {/* Prospect Details */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Prospect Details</h3>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => enrichProspect(selectedProspect)}
                      disabled={enriching}
                      className="bg-white"
                    >
                      {enriching ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Enriching...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Enrich Data
                        </>
                      )}
                    </Button>
                  </div>
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

              {/* Enriched Data */}
              {enrichmentData && (
                <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">AI-Enriched Data</h3>
                      </div>
                      <Badge className="bg-blue-600">
                        {enrichmentData.enrichmentScore}% Complete
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {enrichmentData.companySize && (
                        <div className="p-3 bg-white rounded">
                          <div className="text-gray-600">Company Size</div>
                          <div className="font-semibold">{enrichmentData.companySize} employees</div>
                        </div>
                      )}
                      {enrichmentData.companyRevenue && (
                        <div className="p-3 bg-white rounded">
                          <div className="text-gray-600">Revenue</div>
                          <div className="font-semibold">{enrichmentData.companyRevenue}</div>
                        </div>
                      )}
                      {enrichmentData.jobTitle && (
                        <div className="p-3 bg-white rounded">
                          <div className="text-gray-600">Job Title</div>
                          <div className="font-semibold">{enrichmentData.jobTitle}</div>
                        </div>
                      )}
                      {enrichmentData.seniorityLevel && (
                        <div className="p-3 bg-white rounded">
                          <div className="text-gray-600">Seniority</div>
                          <div className="font-semibold">{enrichmentData.seniorityLevel}</div>
                        </div>
                      )}
                      {enrichmentData.emailVerified !== undefined && (
                        <div className="p-3 bg-white rounded">
                          <div className="text-gray-600">Email Status</div>
                          <div className="font-semibold flex items-center gap-1">
                            {enrichmentData.emailVerified ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Verified
                              </>
                            ) : (
                              'Unverified'
                            )}
                          </div>
                        </div>
                      )}
                      {enrichmentData.fundingRound && (
                        <div className="p-3 bg-white rounded">
                          <div className="text-gray-600">Funding</div>
                          <div className="font-semibold">{enrichmentData.fundingRound}</div>
                        </div>
                      )}
                    </div>

                    {enrichmentData.linkedinUrl && (
                      <div className="mt-4 p-3 bg-white rounded">
                        <div className="text-gray-600 mb-2">Social Profiles</div>
                        <div className="flex gap-2">
                          {enrichmentData.linkedinUrl && (
                            <a 
                              href={enrichmentData.linkedinUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-1 hover:bg-blue-700"
                            >
                              LinkedIn <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {enrichmentData.facebookUrl && (
                            <a 
                              href={enrichmentData.facebookUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1 bg-blue-500 text-white rounded flex items-center gap-1 hover:bg-blue-600"
                            >
                              Facebook <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {enrichmentData.twitterUrl && (
                            <a 
                              href={enrichmentData.twitterUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1 bg-sky-500 text-white rounded flex items-center gap-1 hover:bg-sky-600"
                            >
                              Twitter <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {enrichmentData.recentNews && enrichmentData.recentNews.length > 0 && (
                      <div className="mt-4 p-3 bg-white rounded">
                        <div className="text-gray-600 mb-2">Recent News</div>
                        <div className="space-y-2">
                          {enrichmentData.recentNews.map((news, index) => (
                            <div key={index} className="text-xs p-2 bg-gray-50 rounded">
                              <div className="font-semibold">{news.title}</div>
                              <div className="text-gray-500 mt-1">{news.source} • {new Date(news.date).toLocaleDateString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {enrichmentData.techStack && enrichmentData.techStack.length > 0 && (
                      <div className="mt-4 p-3 bg-white rounded">
                        <div className="text-gray-600 mb-2">Tech Stack</div>
                        <div className="flex flex-wrap gap-2">
                          {enrichmentData.techStack.map((tech, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* AI-Generated First Message */}
              {(() => {
                const firstMessage = `Hi ${selectedProspect.name.split(' ')[0]}! 👋

I found ${selectedProspect.company} online and noticed you're in the ${selectedProspect.industry} space in ${selectedProspect.location}.

We help businesses like yours get 50-100 qualified leads monthly through AI automation—completely on autopilot.

Would you be interested in a quick chat about how it works?`;

                return (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <label className="text-sm font-semibold text-gray-700">
                          Will be sent via WhatsApp to: {selectedProspect.phone}
                        </label>
                      </div>
                      <div className="mt-1 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-sm whitespace-pre-line">
                            {firstMessage}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                      <p className="text-blue-900">
                        💬 <strong>Platform Chat:</strong> This message will be sent via WhatsApp. When {selectedProspect.name.split(' ')[0]} replies, the conversation will appear in your Conversations tab. All communication happens through our platform—AI will assist you with every reply!
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="lg"
                        onClick={() => {
                          toast.success(`Conversation started! Message sent to ${selectedProspect.name} via WhatsApp.`);
                          setSelectedProspect(null);
                          // In production: Create conversation + send via Twilio
                        }}
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Send via WhatsApp & Start Chat
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => toast.info('Edit message feature coming soon')}
                      >
                        Edit Message
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
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Bot className="h-5 w-5 text-green-600" />
            How Platform-Controlled Chat Works
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">1.</span>
              <span><strong>AI finds prospects daily</strong> with phone numbers from Google Maps, LinkedIn, and directories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">2.</span>
              <span><strong>You click "Start Conversation"</strong> → AI generates personalized first message</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">3.</span>
              <span><strong>Platform sends via WhatsApp</strong> (uses our Twilio integration) to prospect's phone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">4.</span>
              <span><strong>Prospect replies on WhatsApp</strong> → Conversation appears in your platform chat (real-time!)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">5.</span>
              <span><strong>All communication through platform</strong> → AI assists every reply, you never leave our site</span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-white rounded border border-green-300">
            <p className="text-xs text-green-900">
              <strong>🔒 Platform Lock-In:</strong> All conversations happen in your dashboard. Leads can't be taken off-platform. AI helps you with every message!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

