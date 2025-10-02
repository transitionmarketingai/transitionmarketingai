import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Demo - Transition CRM',
  description: 'Try Transition CRM with our interactive demo. See how easy it is to manage your sales pipeline.',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Try Transition CRM
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the power of our sales pipeline CRM. No signup required - 
              explore all features with our interactive demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="#demo-section"
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 transition-colors"
              >
                Watch Demo Video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            {/* Browser Bar */}
            <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 ml-2">transitioncrm.com/dashboard</span>
            </div>
            
            {/* Interactive Demo Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-600 rounded-lg p-6 text-white">
                  <div className="text-sm opacity-90 mb-2">Total Revenue</div>
                  <div className="text-3xl font-bold">₹12.4L</div>
                  <div className="text-sm opacity-90 mt-1">+24% from last month</div>
                </div>
                <div className="bg-green-600 rounded-lg p-6 text-white">
                  <div className="text-sm opacity-90 mb-2">Deals Closed</div>
                  <div className="text-3xl font-bold">43</div>
                  <div className="text-sm opacity-90 mt-1">67% win rate</div>
                </div>
                <div className="bg-purple-600 rounded-lg p-6 text-white">
                  <div className="text-sm opacity-90 mb-2">Active Pipeline</div>
                  <div className="text-3xl font-bold">₹18.7L</div>
                  <div className="text-sm opacity-90 mt-1">89 deals in progress</div>
                </div>
              </div>
              
              {/* Pipeline Demo */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Pipeline</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-700 mb-2">Leads (12)</div>
                    <div className="space-y-2">
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">Website Development</div>
                        <div className="text-xs text-gray-600">₹75,000</div>
                      </div>
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">Digital Marketing</div>
                        <div className="text-xs text-gray-600">₹45,000</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-yellow-700 mb-2">Contacted (8)</div>
                    <div className="space-y-2">
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">E-commerce Platform</div>
                        <div className="text-xs text-gray-600">₹1,20,000</div>
                      </div>
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">Mobile App</div>
                        <div className="text-xs text-gray-600">₹85,000</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-purple-700 mb-2">Proposal (6)</div>
                    <div className="space-y-2">
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">CRM Implementation</div>
                        <div className="text-xs text-gray-600">₹2,00,000</div>
                      </div>
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">Data Analytics</div>
                        <div className="text-xs text-gray-600">₹60,000</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-700 mb-2">Closed Won (3)</div>
                    <div className="space-y-2">
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">Cloud Migration</div>
                        <div className="text-xs text-gray-600">₹3,50,000</div>
                      </div>
                      <div className="bg-white rounded p-2 text-sm border">
                        <div className="font-medium">Security Audit</div>
                        <div className="text-xs text-gray-600">₹95,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Highlight */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Key Features You'll Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & Drop Pipeline</h3>
                <p className="text-gray-600">
                  Move deals through stages effortlessly. Visual pipeline makes sales management intuitive.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                <p className="text-gray-600">
                  Share deals, assign contacts, and collaborate seamlessly with your sales team.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
                <p className="text-gray-600">
                  Track performance, forecast sales, and make data-driven decisions with instant reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Sales?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian businesses already using Transition CRM to close more deals.
          </p>
          <Link
            href="/signup"
            className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </section>
    </div>
  );
}


