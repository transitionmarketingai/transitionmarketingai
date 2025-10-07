"use client";

import { useState } from 'react';

interface Lead {
  id: number;
  company: string;
  industry: string;
  location: string;
  company_size: string;
  ai_score: number;
  insights?: string[];
}

interface LeadUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  userCredits: number;
  onConfirm: (leadId: number) => Promise<void>;
}

export default function LeadUnlockModal({
  isOpen,
  onClose,
  lead,
  userCredits,
  onConfirm
}: LeadUnlockModalProps) {
  const [unlocking, setUnlocking] = useState(false);
  
  if (!isOpen || !lead) return null;

  const UNLOCK_COST = 20;
  const hasEnoughCredits = userCredits >= UNLOCK_COST;

  const handleUnlock = async () => {
    setUnlocking(true);
    try {
      await onConfirm(lead.id);
      onClose();
    } catch (error) {
      console.error('Unlock error:', error);
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Unlock Lead Contact?</h3>
          <p className="text-sm text-gray-600 mt-1">Get full contact details for this lead</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Lead Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-900">{lead.company}</div>
                <div className="text-sm text-gray-600">
                  {lead.industry} · {lead.location}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Company Size: {lead.company_size}
                </div>
              </div>
              <div className="bg-white px-3 py-1 rounded-full border-2 border-green-500">
                <div className="text-xs text-gray-500">AI Score</div>
                <div className="text-xl font-bold text-green-600">{lead.ai_score}</div>
              </div>
            </div>
            {lead.insights && lead.insights[0] && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="text-sm text-gray-700">
                  💡 {lead.insights[0]}
                </div>
              </div>
            )}
          </div>

          {/* What You'll Get */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">You'll get access to:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Decision maker's name</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Verified email address</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Direct phone number</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Company website</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">3 detailed AI insights</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium text-gray-900">Unlock Cost:</div>
                <div className="text-xs text-gray-600">One-time charge</div>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {UNLOCK_COST}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-blue-200">
              <span className="text-sm text-gray-700">Your credit balance:</span>
              <span className={`text-lg font-bold ${hasEnoughCredits ? 'text-green-600' : 'text-red-600'}`}>
                {userCredits} credits
              </span>
            </div>
            {!hasEnoughCredits && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                ⚠️ You need {UNLOCK_COST - userCredits} more credits
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-xs text-gray-500 text-center">
            💎 Unlocked leads stay unlocked forever • Export anytime • No recurring fees
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={unlocking}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          {hasEnoughCredits ? (
            <button
              onClick={handleUnlock}
              disabled={unlocking}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {unlocking ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                  Unlock for {UNLOCK_COST} Credits
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                // Navigate to credits page
              }}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Buy More Credits
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

