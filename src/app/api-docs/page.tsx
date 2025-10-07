export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">API Documentation</h1>
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Getting Started */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            The Transition Marketing AI API allows you to programmatically generate leads, manage campaigns, and access your data.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Base URL</h3>
            <code className="text-sm text-blue-700">https://transitionmarketingai.com/api</code>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
          <p className="text-gray-600 mb-4">
            All API requests require an API key. Include it in the Authorization header:
          </p>
          
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-6">
          {/* Generate Leads */}
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Generate Leads</h3>
            <p className="text-gray-600 mb-4">Generate qualified leads based on your criteria</p>
            
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-700 mb-2">Endpoint</div>
                <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-sm">
                  POST /api/leads/generate
                </div>
              </div>

              <div>
                <div className="font-semibold text-gray-700 mb-2">Request Body</div>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "industry": "Technology",
  "location": "Mumbai",
  "companySize": "50-200",
  "budget": "₹50,000+",
  "keywords": ["AI", "automation"],
  "quantity": 10,
  "userId": "your-user-id"
}`}
                </pre>
              </div>

              <div>
                <div className="font-semibold text-gray-700 mb-2">Response</div>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "success": true,
  "leads": [...],
  "total": 10,
  "creditsUsed": 50
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Get Leads */}
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Get Leads</h3>
            <p className="text-gray-600 mb-4">Retrieve your generated leads</p>
            
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-700 mb-2">Endpoint</div>
                <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-sm">
                  GET /api/leads
                </div>
              </div>

              <div>
                <div className="font-semibold text-gray-700 mb-2">Query Parameters</div>
                <div className="space-y-2 text-sm">
                  <div><code className="bg-gray-100 px-2 py-1 rounded">industry</code> - Filter by industry</div>
                  <div><code className="bg-gray-100 px-2 py-1 rounded">status</code> - Filter by status</div>
                  <div><code className="bg-gray-100 px-2 py-1 rounded">minScore</code> - Minimum AI score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rate Limits</h3>
            <div className="space-y-2 text-gray-600">
              <div>• <strong>Starter:</strong> 100 requests/hour</div>
              <div>• <strong>Growth:</strong> 500 requests/hour</div>
              <div>• <strong>Enterprise:</strong> Unlimited</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

