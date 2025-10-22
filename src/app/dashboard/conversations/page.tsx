'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle,
  Send,
  Bot,
  Phone,
  Building2,
  Clock,
  CheckCheck,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

const CONVERSATIONS = [
  {
    id: 1,
    prospect_name: 'Rajesh Kumar',
    company: 'Tech Solutions Pvt Ltd',
    phone: '+91 98765 43210',
    last_message: "Yes, I'd be interested to learn more",
    last_message_time: '2 min ago',
    unread: 1,
    status: 'active',
    intent: 'hot',
  },
  {
    id: 2,
    prospect_name: 'Priya Sharma',
    company: 'Digital Ace Marketing',
    phone: '+91 98765 43211',
    last_message: 'Can we schedule a call?',
    last_message_time: '1 hour ago',
    unread: 0,
    status: 'active',
    intent: 'hot',
  },
  {
    id: 3,
    prospect_name: 'Amit Patel',
    company: 'ShopEasy E-commerce',
    phone: '+91 98765 43212',
    last_message: 'Thanks for reaching out',
    last_message_time: '3 hours ago',
    unread: 0,
    status: 'active',
    intent: 'warm',
  },
];

const DEMO_MESSAGES = [
  {
    id: 1,
    sender: 'user',
    message: "Hi Rajesh! 👋\n\nI found Tech Solutions online and noticed you're in the Software space in Mumbai.\n\nWe help businesses like yours get 50-100 qualified leads monthly through AI automation—completely on autopilot.\n\nWould you be interested in a quick chat about how it works?",
    sent_at: '10:30 AM',
    read: true,
  },
  {
    id: 2,
    sender: 'prospect',
    message: "Hi! Yes, I'd be interested to learn more. What does your platform do exactly?",
    sent_at: '10:45 AM',
    read: false,
  },
];

export default function PlatformChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [messageInput, setMessageInput] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  const aiSuggestions = [
    {
      type: 'short',
      text: "Great! Our AI finds 500 qualified prospects monthly and writes all your outreach. Can we do a quick 15-min demo Tuesday?",
    },
    {
      type: 'detailed',
      text: "Happy to explain! Our platform uses AI to: 1) Find your ideal customers automatically from Google Maps/LinkedIn, 2) Write personalized outreach messages for each, 3) Handle all follow-ups, and 4) Deliver qualified meetings to you. Typical clients get 2-5 booked meetings per week. Would you like to see it in action?",
    },
    {
      type: 'question',
      text: "Thanks for your interest! Quick question: What's your biggest challenge right now with lead generation? That'll help me show you the most relevant features.",
    },
  ];

  const handleSend = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      message: messageInput,
      sent_at: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    toast.success('Message sent via WhatsApp!');
    setSelectedSuggestion(null);
  };

  const useSuggestion = (index: number) => {
    setMessageInput(aiSuggestions[index].text);
    setSelectedSuggestion(index);
  };

  return (
    <div className="p-6">
      <Card className="h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-12 h-full">
          {/* Left: Conversations List */}
          <div className="col-span-3 border-r flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Conversations
                <Badge className="ml-auto">{CONVERSATIONS.length}</Badge>
              </CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-y-auto">
              {CONVERSATIONS.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-semibold flex items-center gap-2">
                      {conv.prospect_name}
                      {conv.intent === 'hot' && <span className="text-red-600">🔥</span>}
                      {conv.unread > 0 && (
                        <Badge className="bg-green-600 text-white">{conv.unread}</Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{conv.last_message_time}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {conv.company}
                  </div>
                  <div className="text-sm text-gray-700 truncate">{conv.last_message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Chat Interface */}
          <div className="col-span-6 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{selectedConversation.prospect_name}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    {selectedConversation.phone}
                    <span className="text-gray-400">•</span>
                    <Building2 className="h-3 w-3" />
                    {selectedConversation.company}
                  </div>
                </div>
                <Badge className={selectedConversation.intent === 'hot' ? 'bg-red-600' : 'bg-yellow-600'}>
                  {selectedConversation.intent === 'hot' ? '🔥 Hot Lead' : 'Warm Lead'}
                </Badge>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'} rounded-lg p-3 shadow-sm`}>
                    <div className="text-sm whitespace-pre-line">{msg.message}</div>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      <Clock className="h-3 w-3" />
                      {msg.sent_at}
                      {msg.sender === 'user' && msg.read && <CheckCheck className="h-3 w-3" />}
                    </div>
                    {msg.sender === 'prospect' && (
                      <div className="mt-2 text-xs bg-green-50 text-green-700 px-2 py-1 rounded inline-block">
                        📱 via WhatsApp
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              {selectedSuggestion !== null && (
                <div className="mb-2 p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-900">
                  <Bot className="h-3 w-3 inline mr-1" />
                  Using AI suggestion (you can edit before sending)
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message... (or use AI suggestions →)"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send via WhatsApp
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💬 Message will be sent via WhatsApp API to {selectedConversation.phone}
              </p>
            </div>
          </div>

          {/* Right: AI Assistant Panel */}
          <div className="col-span-3 border-l bg-gradient-to-b from-purple-50 to-blue-50 flex flex-col">
            <div className="p-4 border-b bg-white">
              <div className="font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                AI Assistant
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* AI Analysis */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-4">
                  <div className="text-sm font-semibold text-green-900 mb-2">
                    🎯 AI Analysis: HIGH INTEREST
                  </div>
                  <div className="text-xs text-green-700 space-y-1">
                    <div><strong>Intent:</strong> Ready to learn more</div>
                    <div><strong>Sentiment:</strong> Positive</div>
                    <div><strong>Next Action:</strong> Schedule demo call</div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <div>
                <div className="text-sm font-semibold mb-3 flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  AI Suggested Replies:
                </div>
                <div className="space-y-2">
                  {aiSuggestions.map((suggestion, idx) => (
                    <Card 
                      key={idx}
                      className={`cursor-pointer hover:shadow-md transition-all ${
                        selectedSuggestion === idx ? 'border-2 border-purple-600 bg-purple-50' : ''
                      }`}
                      onClick={() => useSuggestion(idx)}
                    >
                      <CardContent className="p-3">
                        <div className="text-xs font-semibold text-gray-600 mb-1">
                          {suggestion.type === 'short' && '⚡ Quick Reply'}
                          {suggestion.type === 'detailed' && '📝 Detailed'}
                          {suggestion.type === 'question' && '❓ Ask Question'}
                        </div>
                        <div className="text-xs text-gray-700">{suggestion.text}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-4">
                  <div className="text-sm font-semibold mb-3">Quick Actions:</div>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      Send Pricing
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      Share Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

