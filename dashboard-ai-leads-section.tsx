  // NEW: Render AI Leads Section with Freemium Model
  const renderAILeads = () => (
    <div className="space-y-6">
      {/* Lead Generation Form */}
      <LeadGenerationForm
        onGenerate={handleGenerateLeads}
        onboardingPreferences={onboardingPreferences}
        loading={generating}
      />

      {/* Lead Previews Results */}
      {leadPreviews.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Search Results: {leadPreviews.length} Leads Found
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Preview is FREE • Unlock contact info for 5 credits each
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Credit Balance */}
              <div className="text-right">
                <div className="text-sm text-gray-600">Your Credits</div>
                <div className="text-2xl font-bold text-blue-600">{userCredits}</div>
                <div className="text-xs text-gray-500">{Math.floor(userCredits / 5)} unlocks left</div>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedLeads.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedLeads.length === leadPreviews.filter(l => !l.unlocked).length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLeads(leadPreviews.filter(l => !l.unlocked).map(l => l.id));
                    } else {
                      setSelectedLeads([]);
                    }
                  }}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="font-semibold text-gray-900">
                  {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <button
                onClick={handleBulkUnlock}
                disabled={unlocking}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                    🔓 Unlock Selected ({selectedLeads.length * 5} credits)
                  </>
                )}
              </button>
            </div>
          )}

          {/* Sort & Filter Controls */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const sorted = [...leadPreviews].sort((a, b) => {
                    if (e.target.value === 'score-high') return b.aiScore - a.aiScore;
                    if (e.target.value === 'score-low') return a.aiScore - b.aiScore;
                    if (e.target.value === 'company') return a.company.localeCompare(b.company);
                    return 0;
                  });
                  setLeadPreviews(sorted);
                }}
              >
                <option value="score-high">Sort: AI Score (High to Low)</option>
                <option value="score-low">Sort: AI Score (Low to High)</option>
                <option value="company">Sort: Company Name (A-Z)</option>
              </select>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  All ({leadPreviews.length})
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Unlocked ({leadPreviews.filter(l => l.unlocked).length})
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Locked ({leadPreviews.filter(l => !l.unlocked).length})
                </button>
              </div>
            </div>
          </div>

          {/* Lead Preview Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {leadPreviews.map(lead => (
              <div key={lead.id} className="relative">
                {!lead.unlocked && (
                  <div className="absolute top-4 left-4 z-10">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads([...selectedLeads, lead.id]);
                        } else {
                          setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                        }
                      }}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </div>
                )}
                <LeadPreviewCard
                  lead={lead}
                  userCredits={userCredits}
                  onUnlock={handleUnlockLead}
                  onAddToCRM={(leadId) => {
                    toast.success('Lead added to CRM pipeline!');
                    // Add CRM logic here
                  }}
                  unlocking={unlocking}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {leadPreviews.length === 0 && !generating && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Find Leads?</h3>
          <p className="text-gray-600 mb-6">
            Use the form above to search for qualified prospects. Preview is FREE!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Preview: FREE (0 credits)</span>
            <span className="mx-2">•</span>
            <span>Unlock: 5 credits per lead</span>
          </div>
        </div>
      )}
    </div>
  );

