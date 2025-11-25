'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Mic,
  MicOff,
  Send,
  Loader2,
  MessageSquare,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Ticket,
  CheckCircle,
  BarChart3,
  Clock,
  Bot,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  intent?: string;
  actionExecuted?: boolean;
}

interface ActionLog {
  id: string;
  action: string;
  timestamp: Date;
  status: 'success' | 'failed';
}

export default function CommandCenterPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [autonomousMode, setAutonomousMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast.error('Speech recognition failed');
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load recent commands from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('command_center_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })));
      } catch (e) {
        console.error('Failed to load saved messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('command_center_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/command-center', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          voiceInput: voiceEnabled,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.data.reply,
          timestamp: new Date(),
          intent: data.data.intent,
          actionExecuted: data.data.actionExecuted,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Log action if executed
        if (data.data.actionExecuted) {
          setActionLogs((prev) => [
            {
              id: Date.now().toString(),
              action: data.data.intent || 'unknown',
              timestamp: new Date(),
              status: 'success',
            },
            ...prev,
          ]);
        }
      } else {
        toast.error(data.error || 'Failed to process command');
        setActionLogs((prev) => [
          {
            id: Date.now().toString(),
            action: 'command',
            timestamp: new Date(),
            status: 'failed',
          },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error('Command center error:', error);
      toast.error('Error processing command');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition not available in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setVoiceEnabled(true);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const suggestions = [
    { label: "Today's Metrics", query: "Show today's metrics and KPIs", icon: BarChart3 },
    { label: 'Client Summary', query: 'Summarize all active clients', icon: Users },
    { label: 'Create Task', query: 'Create a task to follow up with top leads', icon: CheckCircle },
    { label: 'Run Forecast', query: 'Run sales forecast for next month', icon: TrendingUp },
    { label: 'Revenue Report', query: 'What is our revenue this month?', icon: DollarSign },
    { label: 'Support Issues', query: 'Summarize all support issues today', icon: Ticket },
    { label: 'Top Leads', query: 'Show top 10 leads this week', icon: Package },
    { label: 'Churn Risk', query: 'Which clients have highest churn risk?', icon: Users },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Bot className="h-8 w-8 text-blue-600" />
          Business Command Center
        </h1>
        <p className="text-slate-600 mt-1">
          Ask questions, request reports, trigger actions, and get insights about your entire platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Window */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant={voiceEnabled ? 'default' : 'outline'}
                    size="sm"
                    onClick={handleVoiceToggle}
                    disabled={!recognitionRef.current}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        Listening...
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Voice
                      </>
                    )}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <Bot className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">Start a conversation</p>
                      <p className="text-sm text-slate-500">
                        Try: "How many leads did we get this week?"
                      </p>
                    </div>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs ${
                            message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.intent && (
                          <Badge
                            variant="outline"
                            className={
                              message.role === 'user'
                                ? 'border-blue-300 text-blue-100'
                                : 'border-slate-300'
                            }
                          >
                            {message.intent}
                          </Badge>
                        )}
                        {message.actionExecuted && (
                          <Badge className="bg-green-600">Action Executed</Badge>
                        )}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-slate-600" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-slate-100 rounded-lg p-3">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask a question or give a command..."
                    className="min-h-[80px] resize-none"
                    disabled={loading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestion Chips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {suggestions.map((suggestion, idx) => {
                  const Icon = suggestion.icon;
                  return (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto py-2 px-3"
                      onClick={() => handleSuggestionClick(suggestion.query)}
                    >
                      <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-xs">{suggestion.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Action Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Action Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {actionLogs.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No actions executed yet
                  </p>
                ) : (
                  actionLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-2 rounded border border-slate-200"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-900">{log.action}</p>
                        <p className="text-xs text-slate-500">
                          {log.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge
                        variant={log.status === 'success' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {log.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Autonomous Mode Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autonomousMode}
                    onChange={(e) => setAutonomousMode(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-slate-700">
                    Autonomous Mode
                  </span>
                </label>
                <p className="text-xs text-slate-500">
                  AI may auto-correct issues without asking (e.g., auto-reassign overdue tasks,
                  auto-close resolved tickets)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs text-slate-600">
                <p className="font-medium">Metrics:</p>
                <p>• "How many leads this week?"</p>
                <p>• "Show MRR by industry"</p>
                <p className="font-medium mt-3">Actions:</p>
                <p>• "Create task to follow up with Dr Priya"</p>
                <p>• "Run the forecast"</p>
                <p>• "Send monthly reports now"</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

