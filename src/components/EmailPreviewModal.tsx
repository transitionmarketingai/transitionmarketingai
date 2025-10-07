"use client";

import { useState } from 'react';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    subject: string;
    body: string;
    variables?: Record<string, string>;
  };
  sampleLead?: {
    name: string;
    company: string;
    email: string;
  };
  onSend?: () => void;
}

export default function EmailPreviewModal({ 
  isOpen, 
  onClose, 
  template, 
  sampleLead,
  onSend 
}: EmailPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  // Replace variables in template
  const lead = sampleLead || {
    name: 'John Doe',
    company: 'Sample Company',
    email: 'john@example.com'
  };

  const replaceVariables = (text: string) => {
    return text
      .replace(/\{name\}/g, lead.name)
      .replace(/\{company\}/g, lead.company)
      .replace(/\{email\}/g, lead.email)
      .replace(/\{firstName\}/g, lead.name.split(' ')[0]);
  };

  const previewSubject = replaceVariables(template.subject);
  const previewBody = replaceVariables(template.body);

  const handleSendTest = async () => {
    if (!testEmail) return;
    setSending(true);
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
    alert(`Test email sent to ${testEmail}`);
    setTestEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Email Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'html'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              HTML Source
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'preview' ? (
            <div className="space-y-6">
              {/* Email metadata */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-500 w-20">From:</span>
                  <span className="text-sm text-gray-900">hello@transitionmarketingai.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-500 w-20">To:</span>
                  <span className="text-sm text-gray-900">{lead.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-500 w-20">Subject:</span>
                  <span className="text-sm font-semibold text-gray-900">{previewSubject}</span>
                </div>
              </div>

              {/* Email body preview */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <div className="prose max-w-none">
                  {previewBody.split('\n').map((line, index) => (
                    <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Variables used */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Variables Replaced:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-blue-700"><code>{'{name}'}</code> → {lead.name}</div>
                  <div className="text-blue-700"><code>{'{company}'}</code> → {lead.company}</div>
                  <div className="text-blue-700"><code>{'{firstName}'}</code> → {lead.name.split(' ')[0]}</div>
                  <div className="text-blue-700"><code>{'{email}'}</code> → {lead.email}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-green-400 font-mono overflow-x-auto">
                <code>{`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${previewSubject}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    ${previewBody.split('\n').map(line => 
      `<p style="margin-bottom: 16px;">${line}</p>`
    ).join('\n    ')}
  </div>
</body>
</html>`}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
          {/* Test Email */}
          <div className="flex items-center gap-2 flex-1">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter email to send test"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendTest}
              disabled={!testEmail || sending}
              className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {sending ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Test
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {onSend && (
              <button
                onClick={() => {
                  onSend();
                  onClose();
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

