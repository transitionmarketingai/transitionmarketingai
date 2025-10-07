"use client";

interface Lead {
  id: number;
  company: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  industry: string;
  location: string;
  company_size: string;
  ai_score: number;
  insights?: string[];
  status: string;
  is_unlocked: boolean;
  unlocked_at?: string;
  created_at: string;
}

interface LeadCardProps {
  lead: Lead;
  onUnlock: (leadId: number) => void;
  onAddToCRM?: (lead: Lead) => void;
  onSendEmail?: (lead: Lead) => void;
}

export default function LeadCard({ lead, onUnlock, onAddToCRM, onSendEmail }: LeadCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'Excellent', emoji: '🌟' };
    if (score >= 80) return { label: 'Great', emoji: '⭐' };
    if (score >= 70) return { label: 'Good', emoji: '👍' };
    return { label: 'Fair', emoji: '👌' };
  };

  const badge = getScoreBadge(lead.ai_score);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{lead.company}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{lead.industry}</span>
            <span>•</span>
            <span>{lead.location}</span>
            <span>•</span>
            <span>{lead.company_size}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border-2 ${getScoreColor(lead.ai_score)}`}>
          <div className="text-xs font-medium">AI Score</div>
          <div className="text-xl font-bold text-center">{lead.ai_score}</div>
        </div>
      </div>

      {/* Score Badge */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
          <span>{badge.emoji}</span>
          <span>{badge.label} Match</span>
        </span>
      </div>

      {/* Basic Insight (Always Visible) */}
      {lead.insights && lead.insights[0] && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
          <div className="text-sm text-blue-900">
            💡 {typeof lead.insights[0] === 'string' ? lead.insights[0] : lead.insights[0]}
          </div>
        </div>
      )}

      {/* Contact Information - Locked or Unlocked */}
      {lead.is_unlocked ? (
        <>
          {/* Unlocked - Show Full Contact */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-green-900">Contact Unlocked</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700 w-20">Contact:</span>
                <span className="text-gray-900">{lead.contact_name}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700 w-20">Email:</span>
                <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-700 w-20">Phone:</span>
                  <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                    {lead.phone}
                  </a>
                </div>
              )}
              {lead.website && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-700 w-20">Website:</span>
                  <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {lead.website}
                  </a>
                </div>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-green-300 text-xs text-green-700">
              ✅ Unlocked on {lead.unlocked_at ? new Date(lead.unlocked_at).toLocaleDateString() : 'recently'}
            </div>
          </div>

          {/* Detailed Insights (Unlocked) */}
          {lead.insights && lead.insights.length > 1 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-purple-900 mb-2">🎯 AI Insights:</h4>
              <ul className="space-y-1 text-sm text-purple-800">
                {lead.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{typeof insight === 'string' ? insight : insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions for Unlocked Leads */}
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCRM?.(lead)}
              className="flex-1 px-4 py-2 border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add to CRM
            </button>
            <button
              onClick={() => onSendEmail?.(lead)}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Locked - Show Blurred Preview */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-4 relative">
            <div className="space-y-2 text-sm filter blur-sm select-none">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700 w-20">Contact:</span>
                <span className="text-gray-500">████████</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700 w-20">Email:</span>
                <span className="text-gray-500">████████@████.com</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700 w-20">Phone:</span>
                <span className="text-gray-500">+91-████████</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700 w-20">Website:</span>
                <span className="text-gray-500">████████.com</span>
              </div>
            </div>
            
            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-5 rounded-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg mb-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-700">Contact Details Locked</div>
              </div>
            </div>
          </div>

          {/* Unlock Button */}
          <button
            onClick={() => onUnlock(lead.id)}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Unlock Full Contact - 20 Credits
          </button>

          {/* Info */}
          <div className="mt-3 text-xs text-center text-gray-500">
            💎 One-time unlock • Keep forever • Export anytime
          </div>
        </>
      )}

      {/* Footer Meta */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Added {new Date(lead.created_at).toLocaleDateString()}</span>
        <span className="capitalize px-2 py-1 bg-gray-100 rounded text-gray-700">
          {lead.status}
        </span>
      </div>
    </div>
  );
}

