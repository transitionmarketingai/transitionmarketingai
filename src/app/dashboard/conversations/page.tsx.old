'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Search,
  Phone,
  Mail,
  Star,
  Clock,
  Facebook,
  Chrome,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  lead_id: string;
  channel: string;
  status: string;
  unread_count: number;
  last_message_at?: string;
  last_message_preview?: string;
  leads: {
    name: string;
    phone: string;
    email?: string;
    source: string;
    quality_score: number;
    intent: string;
  };
}

interface Message {
  id: string;
  sender: string;
  message_text: string;
  sent_at: string;
  status: string;
}

export default function ConversationsPage() {
  const searchParams = useSearchParams();
  const preselectedLeadId = searchParams?.get('leadId');

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (preselectedLeadId && conversations.length > 0) {
      const conv = conversations.find(c => c.lead_id === preselectedLeadId);
      if (conv) {
        selectConversation(conv);
      }
    }
  }, [preselectedLeadId, conversations]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();

      if (response.ok) {
        setConversations(data.conversations || []);
        
        // Auto-select first conversation
        if (data.conversations?.length > 0 && !selectedConversation) {
          selectConversation(data.conversations[0]);
        }
      } else {
        toast.error('Failed to load conversations');
      }
    } catch (error) {
      console.error('Load conversations error:', error);
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    try {
      const response = await fetch(`/api/conversations/${conversation.id}/messages`);
      const data = await response.json();

      if (response.ok) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Load messages error:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    setSendingMessage(true);
    try {
      const response = await fetch(`/api/conversations/${selectedConversation.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_text: messageInput }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([...messages, data.message]);
        setMessageInput('');
        toast.success('Message sent');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const getSourceIcon = (source: string) => {
    if (source === 'meta_ads') return <Facebook className="h-4 w-4 text-blue-600" />;
    if (source === 'google_ads') return <Chrome className="h-4 w-4 text-red-600" />;
    if (source === 'outreach_response') return <Zap className="h-4 w-4 text-green-600" />;
    return null;
  };

  return (
    <div className="p-6">
      <Card className="h-[calc(100vh-12rem)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Conversations
            {conversations.filter(c => c.unread_count > 0).length > 0 && (
              <Badge className="bg-red-600">
                {conversations.reduce((sum, c) => sum + c.unread_count, 0)} unread
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="border-r overflow-y-auto">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </div>

              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No conversations yet</p>
                  <p className="text-sm">Conversations will appear when leads respond</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => selectConversation(conv)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{conv.leads.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">{conv.leads.name}</div>
                          {conv.unread_count > 0 && (
                            <Badge className="bg-red-600 text-white">{conv.unread_count}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          {getSourceIcon(conv.leads.source)}
                          <span className="truncate">{conv.last_message_preview || 'No messages yet'}</span>
                        </div>
                        {conv.last_message_at && (
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {new Date(conv.last_message_at).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Area */}
            <div className="col-span-2 flex flex-col">
              {!selectedConversation ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-lg">{selectedConversation.leads.name}</div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {selectedConversation.leads.phone}
                          </span>
                          {selectedConversation.leads.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {selectedConversation.leads.email}
                            </span>
                          )}
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {selectedConversation.leads.quality_score}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-500 py-12">
                        <p>No messages yet</p>
                        <p className="text-sm">Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender === 'customer'
                                ? 'bg-blue-600 text-white'
                                : message.sender === 'system'
                                ? 'bg-gray-100 text-gray-600 text-sm'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{message.message_text}</p>
                            <div className={`text-xs mt-1 ${
                              message.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.sent_at).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!messageInput.trim() || sendingMessage}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

