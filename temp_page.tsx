import Link from 'next/link';
import Navigation from '@/components/Navigation';
import DashboardMockup from '@/components/DashboardMockup';

// Simplified Features Section
function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to close deals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transition CRM gives you all the tools you need to organize your sales process 
            and close more deals efficiently.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Sales Pipeline */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="mb-6">
              <DashboardMockup variant="pipeline" className="mx-0 p-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Visual Sales Pipeline</h3>
            <p className="text-gray-600 mb-4">
              See exactly where each deal stands in your sales process. Drag and drop deals 
              between stages to keep your pipeline moving forward.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Customizable pipeline stages
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414-0z" clipRule="evenodd" />
                </svg>
                Deal probability tracking
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 0zz 1.414 0z" clipRule="evenodd" />
                </svg>
                Automatic deal aging alerts
              </li>
            </ul>
          </div>

          {/* Contact Management */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="mb-6">
              <DashboardMockup variant="contacts" className="mx-0 p-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact & Company Management</h3>
            <p className="text-gray-600 mb-4">
              Keep all your contacts organized in one place. Track interactions, 
              store important information, and build stronger relationships.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Complete contact history
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom fields and tags
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Import from other systems
              </li>
            </ul>
          </div>

          {/* Mobile Access */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="mb-6">
              <DashboardMockup variant="mobile" className="mx-0 p-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile CRM Access</h3>
            <p className="text-gray-600 mb-4">
              Access your CRM anywhere with our mobile apps. Update deals, 
              log activities, and stay connected with your sales process on the go.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Native iOS and Android apps
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Real-time notifications
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Activity logging on-the-go
              </li>
            </ul>
          </div>
        </div>

        {/* More Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "📧",
              title: "Email Integration",
              description: "Sync with Gmail and Outlook. Send emails directly from Transition CRM and track email opens."
            },
            {
              icon: "📅",
              title: "Activity Scheduling", 
              description: "Schedule calls, meetings, and tasks. Automatic reminders keep you on track."
            },
            {
              icon: "🤖",
              title: "Smart Insights",
              description: "AI-powered recommendations help you focus on opportunities most likely to close."
            },
            {
              icon: "📊",
              title: "Sales Reports",
              description: "Comprehensive reports and forecasts help you track performance and plan ahead."
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FeaturesSection };


