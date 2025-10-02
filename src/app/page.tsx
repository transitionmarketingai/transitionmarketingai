import Link from 'next/link';
import Navigation from '@/components/Navigation';

// Hero Section - Pipedrive Style
function HeroSection() {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              AI-powered{' '}
              <span className="text-blue-600">lead generation</span>{' '}
              that converts prospects into customers
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Transition Marketing AI finds qualified prospects, creates personalized campaigns, automates outreach, 
              and tracks conversions. Turn AI into your best marketing team member.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">AI-powered prospect discovery & qualification</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Personalized AI content & campaign automation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Multi-channel outreach automation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">ROI analytics & conversion tracking</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Try Transition Marketing AI free
              </Link>
              <Link 
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-all duration-300"
              >
                View demo
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
          
          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Browser Bar */}
              <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-600 ml-2 font-mono">transitionmarketingai.ai/dashboard</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 mb-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">AI Marketing Dashboard</h3>
                      <p className="text-xs text-gray-600">Automated lead generation</p>
                    </div>
                    <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded-full">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm opacity-90">AI Leads Generated</div>
                      <svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    </div>
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm opacity-90">qualified prospects this month</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm opacity-90">Campaign CTR</div>
                      <svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="text-2xl font-bold">12.4%</div>
                    <div className="text-sm opacity-90">industry-leading click rate</div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">AI Marketing Activity</h4>
                    <span className="text-xs text-blue-600 font-medium">View All →</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">New deal: Rajesh Sharma</div>
                        <div className="text-xs text-gray-500">₹1.2L • TechCorp project</div>
                      </div>
                      <div className="text-xs text-gray-400">2m</div>
                    </div>
                    
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">Deal closed: Priya Singh</div>
                        <div className="text-xs text-gray-500">₹3.5L • StartupXYZ contract</div>
                      </div>
                      <div className="text-xs text-gray-400">15m</div>
                    </div>
                    
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">Lead added: Amit Kumar</div>
                        <div className="text-xs text-gray-500">Software solutions inquiry</div>
                      </div>
                      <div className="text-xs text-gray-400">1h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Deal Won!</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">New Activity</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-8">
            Trusted by more than 10,000 Indian businesses
          </p>
          
          {/* Customer Logos Placeholder */}
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {['TechStart India', 'Digital Hub', 'Business Solutions', 'Growth Engine'].map((company, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{company.split(' ')[0][0]}</span>
                </div>
                <span className="text-sm text-gray-500">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Trust Indicators Section
function TrustSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 mb-8">
          <strong className="text-gray-900">Built for Indian businesses</strong>
        </p>
        
        {/* Development Status */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🚀 Currently in Development</h3>
          <p className="text-blue-800 text-sm mb-3">
            We're building the CRM features you see here. Sign up for early access and help shape the product!
          </p>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors inline-block"
          >
            Join Early Access
          </Link>
        </div>
        
        {/* Features Coming Soon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Core CRM Features</h3>
              <p className="text-gray-600 text-sm">Contact management, sales pipeline, deal tracking</p>
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Q2 2024</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Apps</h3>
              <p className="text-gray-600 text-sm">Native iOS and Android apps for sales teams</p>
              <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Q3 2024</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Integrations</h3>
              <p className="text-gray-600 text-sm">Smart insights, automated workflows</p>
              <span className="inline-block mt-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Q4 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CRM Features Section
function FeaturesSection() {
  const features = [
    {
      icon: "🤖",
      title: "Save hours with automated lead nurturing",
      description: "Never miss a follow-up with automated sales conversations and AI-powered prompts to focus on the right leads.",
      testimonial: {
        text: "Transition CRM is the best tool I've ever found! от email tracking to workflow automations and game-changing integrations, it has plenty of features that help us go beyond our sales targets.",
        author: "Rajesh Sharma",
        title: "Managing Director, TechStart India"
      }
    },
    {
      icon: "📊",
      title: "Harness sales insights to drive your strategy", 
      description: "Dive into real-time sales reports and grasp the ins and outs of your sales funnel with AI suggestions. Our forecasting, goal-setting, team monitoring and advanced sales metrics tools help you make swift, informed decisions.",
      testimonial: {
        text: "Transition CRM has enabled us to have instant access to data, so it's not just quadrupling our revenue but ensuring that we have predictable revenue.",
        author: "Priya Kumar",
        title: "Founder and MD, Digital Growth Co"
      }
    },
    {
      icon: "🎯",
      title: "The CRM tailored to your business",
      description: "Seamlessly switch to a sales tool that matches every step of your buyer's journey. Transition CRM is more than just a pipeline.",
      testimonial: {
        text: "Transition CRM adapts well to what we need, and I like that. Unlike other CRM solutions, it fits our needs and doesn't force us to simply conform to what it can provide.",
        author: "Amit Verma",
        title: "CEO and Founder, ScaleUp Solutions"
      }
    },
    {
      icon: "⚡",
      title: "Unlock sales success",
      description: "Simplify your workflow and unite your sales tasks in one workspace. Get AI-powered, personalized tips to help you focus on winning deals.",
      testimonial: {
        text: "Transition CRM has made me a salesperson with good habits. And without a doubt I am much more organized than before.",
        author: "Deepak Singh",
        title: "Sales Manager, GrowthEngine India"
      }
    },
    {
      icon: "📈",
      title: "Refine your strategy with real-time performance insights",
      description: "Leverage real-time, visual data to easily make tough decisions and identify what works.",
      testimonial: {
        text: "The insights we get from Transition CRM help us make data-driven decisions that actually drive growth.",
        author: "Sneha Patel",
        title: "Marketing Director, NextGen Tech"
      }
    },
    {
      icon: "⚙️",
      title: "Customize Transition CRM to your unique sales process",
      description: "Discover the power of a CRM that adapts to your sales strategy, giving you the tools and tips you need to succeed.",
      testimonial: {
        text: "By customizing and automating our customer journey, we were able to remove so much clutter, bottlenecking, manual admin and confusion.",
        author: "Vikram Malhotra",
        title: "Founder and CEO, SmartBusiness Solutions"
      }
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CRM software sales teams will love
          </h2>
          
          {/* CRM Experience Switch */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 inline-flex">
              <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-all">
                I've used a CRM before
              </button>
              <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-all">
                I haven't used a CRM before
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="space-y-8">
              {/* Feature Content */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <blockquote className="text-gray-700 leading-relaxed mb-4 text-lg">
                  "{feature.testimonial.text}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {feature.testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{feature.testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{feature.testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-50 rounded-3xl p-12 border border-blue-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Join growing businesses using Transition CRM to gain real-time insights and more!
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Less time managing, more time closing deals.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Watch demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// AI Features Section
function AIFeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-xl">
            🤖
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Say hello to Transition CRM AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Boost your sales success with our AI-powered features. Phase out manual processes, streamline communication 
            and make data-driven decisions for smarter, faster sales.
          </p>
          <Link
            href="/ai-features"
            className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg rounded-lg transition-all duration-300 mt-8"
          >
            Find out more
          </Link>
        </div>
      </div>
    </section>
  );
}

// Integrations Section
function IntegrationsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connect your tech stack and discover tools with Transition's Marketplace
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Integrate Transition CRM with the apps that drive your business. Seamlessly connect your favorite 
              software or find new tools with tailored recommendations.
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg rounded-lg transition-all duration-300"
            >
              Browse all apps
            </Link>
          </div>
          
          {/* Integration Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
              <div className="grid grid-cols-4 gap-4">
                {['📧', '📱', '💼', '📊'].map((icon, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                    <div className="text-3xl mb-3">{icon}</div>
                    <div className="text-sm text-gray-600">App {index + 1}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-500">500+ integrations available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sales Process Features
function SalesProcessSection() {
  const processes = [
    {
      icon: "👥",
      title: "Easily manage leads and deals",
      description: "Organize customer data and interactions in one simple tool and act fast when opportunity strikes."
    },
    {
      icon: "📋",
      title: "One space for all your sales activities", 
      description: "Easily track sales conversations and tasks in one tool, giving your salespeople the context they need to follow up faster."
    },
    {
      icon: "⚡",
      title: "Automate and scale",
      description: "Streamline your sales process and use AI – get more done with less work."
    },
    {
      icon: "📈",
      title: "Instant sales insights",
      description: "Take advantage of real-time data analytics to track sales metrics and fine-tune your strategy."
    },
    {
      icon: "🔧",
      title: "Enhance your CRM experience",
      description: "Simple, secure and flexible ecosystem helps you stay on track for sales success."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Optimize your sales process
          </h2>
          <p className="text-xl text-gray-600">
            Supercharge every step of your sales cycle and empower your team to win deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {processes.map((process, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl mx-auto mb-6">
                {process.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
              <p className="text-gray-600 leading-relaxed">{process.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Success Stories Section
function SuccessStoriesSection() {
  const stories = [
    {
      quote: "If you want to scale and manage your client base effectively you need a CRM, like Transition CRM, simple as that.",
      author: "Eden Brownlee",
      title: "Director and Senior Digital Strategy Consultant, Accentuate Web Design & Marketing",
      initial: "EB"
    },
    {
      quote: "Our sales process has improved by 20% and overall hours spent on administrative tasks has been reduced by 40%.",
      author: "Jana Hodboďová", 
      title: "Chief Sales Officer, Leadspicker",
      initial: "JH"
    },
    {
      quote: "Transition CRM is significantly better value than other CRMs but still has an easy-to-use interface. It became apparent that it was a great fit for our team at a cost we could afford.",
      author: "Oliver Lee",
      title: "Sales Director, CreativeRace",
      initial: "OL"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See how Transition CRM helps Indian businesses grow
          </h2>
          <Link href="/case-studies" className="text-blue-600 hover:text-blue-700 font-medium">
            Read more success stories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                "{story.quote}"
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {story.initial}
                </div>
                <div>
                  <Link href="/case-studies" className="text-blue-600 hover:text-blue-700 font-medium">
                    <p className="font-semibold text-gray-900">{story.author}</p>
                    <p className="text-gray-600 text-sm">{story.title}</p>
                    <p className="text-blue-600 text-sm mt-1">Learn more</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Awards Section
function AwardsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Award-winning CRM software
          </h2>
          <p className="text-xl text-gray-600">
            Industry experts recognize Transition CRM as a top-rated solution.
          </p>
        </div>

        {/* Indian Companies Using CRM */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {[
            { name: 'Reliance', type: 'Enterprise' },
            { name: 'Tata Group', type: 'Large Corp' },  
            { name: 'Infosys', type: 'IT Services' },
            { name: 'Tech Mahindra', type: 'Technology' },
            { name: 'Wipro', type: 'Software' },
            { name: 'ICICI Bank', type: 'Banking' }
          ].map((client, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{client.name.split(' ')[0].slice(0, 2)}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{client.name}</h3>
                <p className="text-xs text-gray-600">{client.type}</p>
                <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Essential",
      price: "₹899",
      period: "/mo",
      description: "Perfect for small teams getting started",
      features: ["3 users", "Sales pipeline", "Contact management", "Email notifications", "Basic reports"]
    },
    {
      name: "Advanced", 
      price: "₹2,999",
      period: "/mo", 
      description: "Best for growing sales teams",
      features: ["25 users", "Everything in Essential", "Advanced automation", "AI insights", "Priority support"],
      popular: true
    },
    {
      name: "Professional",
      price: "₹4,999",
      period: "/mo",
      description: "Complete solution for larger teams", 
      features: ["100 users", "Everything in Advanced", "Advanced analytics", "Custom fields", "Dedicated manager"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: ["Unlimited users", "Everything in Professional", "White-label", "Custom integrations", "24/7 support"]
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose your plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
          
          {/* Development Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 17c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <span className="text-yellow-800 font-semibold">MVP Pricing</span>
            </div>
            <p className="text-yellow-700 text-sm">
              These features are currently in development. Pricing may change before launch. 
              Early access users get founding member pricing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/signup"
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-block text-center`}
                >
                  Start free trial
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "What is Transition CRM?",
      answer: "Transition CRM is a sales pipeline CRM designed to help Indian businesses manage leads, track sales activities and close more deals."
    },
    {
      question: "How does Transition CRM work?",
      answer: "Transition CRM enables sales teams in Indian businesses to: Streamline processes and consolidate sales data in one unified CRM tool, Automate follow-ups and ensure timely responses to leads, Keep an eye on sales achievements and assess team performance for ongoing improvement."
    },
    {
      question: "How to set up Transition CRM?",
      answer: "Setting up Transition CRM is straightforward: Begin by importing existing data or building your leads database, Define your sales pipeline, create active deals, and start scheduling activities, Set up team access with granular permissions, Keep a close eye on sales outcomes by creating real-time reports and dashboards."
    },
    {
      question: "Will Transition CRM work for a big team?",
      answer: "Yes! Transition CRM is well-suited for startups and larger teams alike. Large teams have access to a dedicated account manager to help them make the most of the platform."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CRM FAQs
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Driving business growth
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of Indian businesses using Transition CRM to optimize their sales process.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Try it free
        </Link>
        <p className="text-sm text-gray-400 mt-4">
          Full access. No credit card needed.
        </p>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-blue-400">Transition</span> CRM
            </h3>
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              The easy and effective CRM for closing deals. Built for Indian businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-xl">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link href="/ai-features" className="text-gray-300 hover:text-blue-400 transition-colors">AI Features</Link></li>
              <li><Link href="/integrations" className="text-gray-300 hover:text-blue-400 transition-colors">Integrations</Link></li>
              <li><Link href="/mobile" className="text-gray-300 hover:text-blue-400 transition-colors">Mobile Apps</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-xl">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="/help" className="text-gray-300 hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link href="/case-studies" className="text-gray-300 hover:text-blue-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/api" className="text-gray-300 hover:text-blue-400 transition-colors">API Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-xl">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/security" className="text-gray-300 hover:text-blue-400 transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 Transition CRM. All rights reserved.</p>
            <div className="flex space-x-8">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Notice</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Homepage Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <AIFeaturesSection />
      <IntegrationsSection />
      <SalesProcessSection />
      <SuccessStoriesSection />
      <AwardsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}