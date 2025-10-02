'use client';

interface DashboardMockupProps {
  variant?: 'pipeline' | 'contacts' | 'reports' | 'mobile';
  className?: string;
}

export default function DashboardMockup({ variant = 'pipeline', className = '' }: DashboardMockupProps) {
  
  if (variant === 'pipeline') {
    return (
      <div className={`bg-gray-50 rounded-xl p-6 ${className}`}>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-sm">Add Deal</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-sm">Filter</button>
              </div>
            </div>
          </div>
          
          {/* Pipeline Stages */}
          <div className="flex p-6 space-x-4 min-h-[400px]">
            {/* Lead */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-2">Lead (5)</h4>
                <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                  <div className="bg-blue-600 h-2 rounded-full w-4/6"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">Chandigarh Tech Solutions</h5>
                      <p className="text-sm text-gray-600">₹2,50,000</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Hot</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Added 2 days ago</div>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">Mumbai Digital Agency</h5>
                      <p className="text-sm text-gray-600">₹1,80,000</p>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Warm</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Added 1 week ago</div>
                </div>
              </div>
            </div>
            
            {/* Qualified */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-2">Qualified (3)</h4>
                <div className="w-full bg-purple-200 rounded-full h-2 mb-2">
                  <div className="bg-purple-600 h-2 rounded-full w-3/5"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">Delhi Business Hub</h5>
                      <p className="text-sm text-gray-600">₹4,20,000</p>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Contacted 3 days ago</div>
                </div>
              </div>
            </div>
            
            {/* Proposal */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-2">Proposal (2)</h4>
                <div className="w-full bg-green-200 rounded-full h-2 mb-2">
                  <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Negotiation */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-2">Negotiation (1)</h4>
                <div className="w-full bg-red-200 rounded-full h-2 mb-2">
                  <div className="bg-red-600 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
            
            {/* Closed Won */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-2">Closed Won (4)</h4>
                <div className="w-full bg-emerald-200 rounded-full h-2 mb-2">
                  <div className="bg-emerald-600 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">Bangalore Tech Hub</h5>
                      <p className="text-sm text-gray-600">₹3,50,000</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Won</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Closed yesterday</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'contacts') {
    return (
      <div className={`bg-gray-50 rounded-xl p-6 ${className}`}>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Contacts & Companies</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-sm">Add Contact</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-sm">Import</button>
              </div>
            </div>
          </div>
          
          {/* Contact List */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  RS
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">Rajesh Sharma</h4>
                  <p className="text-sm text-gray-600">Chandigarh Tech Solutions</p>
                  <p className="text-sm text-gray-500">rajesh@techsolutions.in</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">₹2,50,000</p>
                  <p className="text-xs text-gray-500">Hot Lead</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  PD
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">Priya Devi</h4>
                  <p className="text-sm text-gray-600">Mumbai Digital Agency</p>
                  <p className="text-sm text-gray-500">priya@digitalagency.co.in</p>
                </div>
                <div className={className}>
                  <p className="text-sm font-medium text-orange-600">₹1,80,000</p>
                  <p className="text-xs text-gray-500">Warm Lead</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                  AM
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">Amit Malhotra</h4>
                  <p className="text-sm text-gray-600">Delhi Business Hub</p>
                  <p className="text-sm text-gray-500">amit@businesshub.delhi</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">₹4,20,000</p>
                  <p className="text-xs text-gray-500">Proposal Sent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`bg-gray-100 rounded-xl p-4 max-w-sm mx-auto ${className}`}>
        <div className="bg-black rounded-2xl p-2">
          <div className="bg-white rounded-xl overflow-hidden">
            {/* Mobile Header */}
            <div className="bg-blue-600 px-4 py-3 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Transition CRM</h3>
                <span className="text-xs bg-blue-500 px-2 py-1 rounded">Today</span>
              </div>
            </div>
            
            {/* Mobile Content */}
            <div className="p-4 space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center bg-green-50 p-2 rounded">
                  <div className="text-lg font-bold text-green-600">₹2.4L</div>
                  <div className="text-xs text-gray-600">Pipeline</div>
                </div>
                <div className="text-center bg-blue-50 p-2 rounded">
                  <div className="text-lg font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-600">Deals</div>
                </div>
                <div className="text-center bg-purple-50 p-2 rounded">
                  <div className="text-lg font-bold text-purple-600">8</div>
                  <div className="text-xs text-gray-600">Activities</div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-900">Call with Rajesh Sharma</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-900">Proposal sent</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reports variant
  return (
    <div className={`bg-gray-50 rounded-xl p-6 ${className}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sales Reports</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-sm">Export</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-sm">Filter</button>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="p-32">
          <div className="grid grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-4">Monthly Revenue</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">₹2.4L</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">₹1.8L</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-2/3"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">₹2.1L</span>
                </div>
              </div>
            </div>
            
            {/* Conversion Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-4">Conversion Rates</h4>
              <div className="flex items-center justify-center h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded">
                <span className="text-2xl font-bold text-blue-600">65%</span>
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">Lead to Deal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
