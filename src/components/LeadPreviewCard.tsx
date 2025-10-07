"use client";

import { useState } from 'react';
import { toast } from 'sonner';

interface Lead {
  id: number;
  company: string;
  industry: string;
  location: string;
  companySize: string;
  website: string;
  aiScore: number;
  insights: string[];
  
  // Masked contact info
  contactPreview: string;
  emailPreview: string;
  phonePreview: string;
  
  // Unlock status
  unlocked: boolean;
  creditsRequired: number;
  
  // Full info (if unlocked)
  contactName?: string;
  email?: string;
  phone?: string;
}

interface LeadPreviewCardProps {
  lead: Lead;
  userCredits: number;
  onUnlock: (leadId: number) => void;
  onAddToCRM?: (leadId: number) => void;
  unlocking?: boolean;
}

export default function LeadPreviewCard({ 
  lead, 
  userCredits, 
  onUnlock,
  onAddToCRM,
  unlocking = false 
}: LeadPreviewCardProps) {
  const [showFullInsights, setShowFullInsights] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    return 'Potential Match';
  };

  const handleUnlock = () => {
    if (userCredits < lead.creditsRequired) {
      toast.error('Insufficient credits. Please top up your account.');
      return;
    }
    onUnlock(lead.id);
  };

  return (
    <div className={`bg-white rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
      lead.unlocked 
        ? 'border-green-500 bg-green-50/30' 
        : 'border-gray-200 hover:border-blue-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            {lead.company}
            {lead.unlocked && (
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                ✓ Unlocked
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{lead.industry}</span>
            <span>•</span>
            <span>{lead.location}</span>
            <span>•</span>
            <span>{lead.companySize} employees</span>
          </div>
        </div>
        
        {/* AI Score Badge */}
        <div className="flex flex-col items-end">
          <div className={`px-3 py-1 rounded-full text-white font-bold text-sm ${getScoreColor(lead.aiScore)}`}>
            {lead.aiScore}/100
          </div>
          <span className="text-xs text-gray-500 mt-1">{getScoreLabel(lead.aiScore)}</span>
        </div>
      </div>

      {/* Website */}
      {lead.website && (
        <a
          href={lead.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          {lead.website.replace('https://', '').replace('http://', '')}
        </a>
      )}

      {/* AI Insights */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Insights
        </h4>
        <ul className="space-y-1">
          {lead.insights.slice(0, showFullInsights ? undefined : 2).map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {insight}
            </li>
          ))}
        </ul>
        {lead.insights.length > 2 && (
          <button
            type="button"
            onClick={() => setShowFullInsights(!showFullInsights)}
            className="text-sm text-blue-600 hover:text-blue-700 mt-1 font-medium"
          >
            {showFullInsights ? 'Show less' : `Show ${lead.insights.length - 2} more insights`}
          </button>
        )}
      </div>

      {/* Contact Information */}
      <div className="border-t-2 border-gray-100 pt-4 mb-4">
        {lead.unlocked ? (
          // UNLOCKED - Show full contact info
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-900">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-semibold">{lead.contactName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">
                {lead.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${lead.phone}`} className="hover:text-blue-600 transition-colors">
                {lead.phone}
              </a>
            </div>
          </div>
        ) : (
          // LOCKED - Show blurred preview
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="blur-sm select-none">{lead.contactPreview}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="blur-sm select-none">{lead.emailPreview}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="blur-sm select-none">{lead.phonePreview}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!lead.unlocked ? (
          <button
            onClick={handleUnlock}
            disabled={unlocking || userCredits < lead.creditsRequired}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {unlocking ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Unlocking...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Unlock Contact - {lead.creditsRequired} Credits
              </>
            )}
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                navigator.clipboard.writeText(lead.email || '');
                toast.success('Email copied to clipboard!');
              }}
              className="flex-1 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Email
            </button>
            {onAddToCRM && (
              <button
                onClick={() => onAddToCRM(lead.id)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to CRM
              </button>
            )}
          </>
        )}
      </div>

      {/* Credit Warning */}
      {!lead.unlocked && userCredits < lead.creditsRequired && (
        <div className="mt-3 flex items-center gap-2 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="font-medium text-red-900">Insufficient credits</p>
            <p className="text-red-700">You need {lead.creditsRequired - userCredits} more credits to unlock this lead.</p>
          </div>
        </div>
      )}
    </div>
  );
}

