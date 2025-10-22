'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Send, 
  Mail, 
  Check, 
  Clock,
  MessageCircle,
  X,
  Sparkles,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

const PENDING_EMAILS = [
  {
    id: 1,
    prospect_name: 'Rajesh Kumar',
    company: 'Tech Solutions Pvt Ltd',
    subject: "Quick question about Tech Solutions' growth",
    preview: "Hi Rajesh, I noticed Tech Solutions has been making great progress...",
    score: 92,
    generated_at: '2 hours ago',
  },
  {
    id: 2,
    prospect_name: 'Priya Sharma',
    company: 'Digital Ace Marketing',
    subject: 'Helping Digital Ace scale lead generation',
    preview: "Hi Priya, I see Digital Ace offers B2B marketing services...",
    score: 88,
    generated_at: '2 hours ago',
  },
];

const SENT_EMAILS = [
  {
    id: 3,
    prospect_name: 'Amit Patel',
    company: 'ShopEasy E-commerce',
    subject: 'Automate ShopEasy marketing',
    sent_at: '1 day ago',
    status: 'sent',
    opens: 2,
    clicks: 1,
  },
];

const RESPONDED = [
  {
    id: 4,
    prospect_name: 'Neha Gupta',
    company: 'FinTech Innovations',
    subject: 'Re: Quick question about FinTech Innovations',
    responded_at: '3 hours ago',
    response: "Hi! Yes, I'd be interested to learn more. Can we schedule a call?",
    sentiment: 'positive',
  },
];

export default function AIOutreachPage() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

  const toggleEmail = (id: number) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(e => e !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  const sendSelected = () => {
    toast.success(`${selectedEmails.length} emails sent! AI will handle follow-ups automatically.`);
    setSelectedEmails([]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Send className="h-8 w-8 text-blue-600" />
            AI Outreach
          </h1>
          <p className="text-gray-600 mt-1">Review AI-written emails and manage your outreach campaigns</p>
        </div>
        {selectedEmails.length > 0 && (
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
            onClick={sendSelected}
          >
            <Send className="h-5 w-5 mr-2" />
            Send {selectedEmails.length} Selected
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{PENDING_EMAILS.length}</div>
            <div className="text-xs text-gray-500 mt-1">AI emails awaiting approval</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Sent This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <div className="text-xs text-gray-500 mt-1">Emails delivered</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">23</div>
            <div className="text-xs text-gray-500 mt-1">14.7% response rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Meetings Booked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">5</div>
            <div className="text-xs text-gray-500 mt-1">From outreach</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Review ({PENDING_EMAILS.length})
          </TabsTrigger>
          <TabsTrigger value="sent">
            Sent
          </TabsTrigger>
          <TabsTrigger value="responded">
            Responded ({RESPONDED.length})
          </TabsTrigger>
        </TabsList>

        {/* Pending Emails */}
        <TabsContent value="pending" className="space-y-3 mt-6">
          {PENDING_EMAILS.map((email) => (
            <Card key={email.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(email.id)}
                    onChange={() => toggleEmail(email.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-lg">{email.prospect_name}</div>
                        <div className="text-sm text-gray-600">{email.company}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Score: {email.score}
                        </Badge>
                        <span className="text-xs text-gray-500">{email.generated_at}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="text-xs text-gray-500 mb-1">Subject:</div>
                      <div className="font-medium mb-3">{email.subject}</div>
                      <div className="text-sm text-gray-700">{email.preview}...</div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Full
                      </Button>
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          toast.success(`Email sent to ${email.prospect_name}!`);
                        }}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {selectedEmails.length > 0 && (
            <div className="sticky bottom-4 bg-blue-600 text-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{selectedEmails.length} emails selected</div>
                  <div className="text-sm opacity-90">AI will auto-send follow-ups if no response</div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedEmails([])}
                    className="text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={sendSelected}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Sent Emails */}
        <TabsContent value="sent" className="space-y-3 mt-6">
          {SENT_EMAILS.map((email) => (
            <Card key={email.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{email.prospect_name}</div>
                    <div className="text-sm text-gray-600">{email.company}</div>
                    <div className="text-sm text-gray-500 mt-2">{email.subject}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {email.sent_at}
                    </Badge>
                    <div className="text-xs text-gray-600">
                      <div>Opens: {email.opens}</div>
                      <div>Clicks: {email.clicks}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Responded */}
        <TabsContent value="responded" className="space-y-3 mt-6">
          {RESPONDED.map((item) => (
            <Card key={item.id} className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {item.prospect_name}
                      <Badge className="bg-green-600">Responded</Badge>
                    </div>
                    <div className="text-sm text-gray-600">{item.company}</div>
                  </div>
                  <span className="text-xs text-gray-500">{item.responded_at}</span>
                </div>

                <div className="bg-white rounded-lg p-3 mb-3 border border-green-200">
                  <div className="text-sm text-gray-700">{item.response}</div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Open Conversation
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

