'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  ArrowLeft,
  Send,
  Clock,
  MapPin,
  Briefcase,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import type { Lead, Message, Conversation } from '@/types/india-leadgen';
import { formatIndianCurrency } from '@/types/india-leadgen';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadLeadData();
    subscribeToMessages();
  }, [leadId]);

  async function loadLeadData() {
    const supabase = createClient();

    try {
      // Get lead details
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

      if (leadError) throw leadError;
      setLead(leadData);

      // Get or create conversation
      let { data: conversationData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('lead_id', leadId)
        .single();

      if (convError || !conversationData) {
        // Create new conversation
        const { data: newConv } = await supabase
          .from('conversations')
          .insert({
            lead_id: leadId,
            customer_id: leadData.customer_id,
            channel: 'whatsapp',
            status: 'active'
          })
          .select()
          .single();
        
        conversationData = newConv;
      }

      setConversation(conversationData);

      // Get messages
      if (conversationData) {
        const { data: messagesData } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationData.id)
          .order('created_at', { ascending: true });

        setMessages(messagesData || []);
      }

    } catch (error) {
      console.error('Error loading lead:', error);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToMessages() {
    const supabase = createClient();

    const channel = supabase
      .channel(`messages:${leadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `lead_id=eq.${leadId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function sendMessage() {
    if (!newMessage.trim() || !conversation) return;

    setSending(true);
    const supabase = createClient();

    try {
      // Send via API
      const response = await fetch('/api/messaging/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversation.id,
          lead_id: leadId,
          channel: 'whatsapp',
          content: newMessage
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      setNewMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Lead Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const qualityColor = 
    lead.quality_score >= 80 ? 'bg-green-500' :
    lead.quality_score >= 60 ? 'bg-blue-500' :
    lead.quality_score >= 40 ? 'bg-yellow-500' : 'bg-gray-500';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {lead.name || 'Unknown Lead'}
                </h1>
                <p className="text-sm text-gray-500">
                  Received {new Date(lead.created_at).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className={qualityColor}>
                {lead.quality_score}/100
              </Badge>
              {lead.qualification_status === 'hot' && (
                <Badge className="bg-red-500">🔥 Hot Lead</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lead.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{lead.phone}</p>
                    </div>
                  </div>
                )}
                {lead.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{lead.email}</p>
                    </div>
                  </div>
                )}
                {lead.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {lead.location.city}, {lead.location.state}
                      </p>
                    </div>
                  </div>
                )}
                {lead.company && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{lead.company}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Quality Score</span>
                    <span className="font-bold">{lead.quality_score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${qualityColor}`}
                      style={{ width: `${lead.quality_score}%` }}
                    />
                  </div>
                </div>

                {lead.qualification_reason && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Why This Score?</p>
                    <p className="text-sm">{lead.qualification_reason}</p>
                  </div>
                )}

                {lead.ai_summary && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Summary</p>
                    <p className="text-sm">{lead.ai_summary}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Form Responses */}
            {lead.form_responses && Object.keys(lead.form_responses).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Form Responses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(lead.form_responses).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}
                      </p>
                      <p className="font-medium">{String(value)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Messaging Area */}
          <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-16rem)]">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversation</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No messages yet</p>
                      <p className="text-sm text-gray-400">
                        Start the conversation by sending a WhatsApp message
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_type === 'customer' 
                            ? 'justify-end' 
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender_type === 'customer'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_type === 'customer'
                              ? 'text-blue-100'
                              : 'text-gray-500'
                          }`}>
                            {new Date(message.created_at).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {message.sender_type === 'customer' && message.status === 'read' && (
                              <CheckCircle className="inline h-3 w-3 ml-1" />
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      rows={2}
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim() || sending}
                      className="self-end"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Messages sent via WhatsApp • Press Enter to send
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


