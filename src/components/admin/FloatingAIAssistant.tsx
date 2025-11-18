'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Loader2, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';

export default function FloatingAIAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'task-suggestion', // Generic assistant type
          content: message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.data.result);
        trackEvent('ai_assistant_used', {
          event_category: 'ai',
          event_label: 'floating_assistant',
        });
      } else {
        toast.error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      toast.error('Error getting AI response');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
    setResponse('');
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 flex items-center justify-center"
        size="lg"
        aria-label="Open AI Assistant"
      >
        <Brain className="h-6 w-6 text-white" />
      </Button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Assistant
            </DialogTitle>
            <DialogDescription>
              Ask me anything about your leads, tickets, or operations. I can help summarize, analyze, and provide recommendations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Input */}
            <div>
              <Textarea
                placeholder="E.g., 'Summarize today's support tickets' or 'Analyze the top 5 leads from this week'..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleSend();
                  }
                }}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-slate-500">
                  Press Cmd/Ctrl + Enter to send
                </p>
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Response */}
            {response && (
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-blue-900">AI Response</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setResponse('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-slate-700 whitespace-pre-wrap font-sans">
                  {response}
                </div>
              </div>
            )}

            {/* Example Prompts */}
            {!response && !loading && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Example prompts:</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => setMessage("Summarize today's support tickets and list action items")}
                  >
                    📋 Summarize today's support tickets
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => setMessage("Analyze the top 5 leads from this week and recommend next steps")}
                  >
                    🎯 Analyze top leads this week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => setMessage("What are the most common issues in support tickets?")}
                  >
                    🔍 Common support issues
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


