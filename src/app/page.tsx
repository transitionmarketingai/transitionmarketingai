import Link from 'next/link';
import Navigation from '@/components/Navigation';

// Hero Section - Indian Lead Generation Focus
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Trusted by 500+ Indian Businesses
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The Complete{' '}
              <span className="text-blue-600">AI Lead Generation</span>{' '}
              Ecosystem for Indian Businesses
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Stop struggling with cold outreach. Our AI generates, qualifies, and nurtures leads automatically using 
              industry-specific templates. Complete platform: LinkedIn scraping → lead scoring → personalized outreach → CRM integration.
              Built specifically for Indian markets with Hindi, English & 12 regional languages. Success guarantee or refund.
            </p>
            
            {/* Success Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">8+</div>
                <div className="text-sm text-gray-600">Industry-Specific AI Templates</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">₹26</div>
                <div className="text-sm text-gray-600">Avg cost per qualified lead</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Lead qualification accuracy</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-orange-600">15 min</div>
                <div className="text-sm text-gray-600">Setup to first leads</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link 
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                🚀 Start FREE Trial - No Credit Card
              </Link>
              <Link 
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-all duration-300 text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M5 7h14M4 14h16" />
                </svg>
                📺 Watch LIVE Demo (2 min)
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 font-medium">
              ✅ 14-day free trial • ✅ Setup in 15 minutes • ✅ Cancel anytime • ✅ Success guarantee
            </p>
          </div>
          
          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300">
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
                {/* AI Banner */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-3 mb-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">🚀 AI Lead Generation LIVE</h3>
                      <p className="text-xs text-gray-600">Scraping LinkedIn + Company databases + Industry directories • Real-time</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full animate-pulse">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Campaign Card */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm opacity-90">🎯 Bangalore IT Startups Campaign</div>
                    <span className="text-xs opacity-75">Active</span>
                  </div>
                  <div className="text-lg font-bold mb-1">47 leads generated today</div>
                  <div className="text-sm opacity-90">₹26 avg cost • 89% quality score • ₹65K pipeline value</div>
                </div>
                
                {/* Lead Examples */}
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">👨‍💼</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Rajesh Sharma</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">92% Match</span>
                        </div>
                        <p className="text-sm text-gray-600">CTO • TechCorp Solutions • Bangalore</p>
                        <p className="text-xs text-gray-500">Series A startup • Hiring developers</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">👩‍💼</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Priya Singh</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">87% Match</span>
                        </div>
                        <p className="text-sm text-gray-600">Founder • DigitalFirst Apps • Chennai</p>
                        <p className="text-xs text-gray-500">Fintech expansion • Scaling operations</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">👨‍💻</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Amit Kumar</h4>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">83% Match</span>
                        </div>
                        <p className="text-sm text-gray-600">Product Manager • NextGen Tech • Hyderabad</p>
                        <p className="text-xs text-gray-500">B2B SaaS • Evaluating solutions</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    📧 AI-Generated Outreach Ready
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
              ⚡ 23 leads generated!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
              🎯 Avg ₹47 cost/lead
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: '🎯',
      title: 'Industry-Specific AI Templates',
      description: 'Pre-built campaigns for 8+ Indian industries: IT, E-commerce, Real Estate, Healthcare, Consulting, Manufacturing, Education, Finance',
      emphasize: true
    },
    {
      icon: '🔍',
      title: 'Intelligent Lead Discovery',
      description: 'AI scrapes LinkedIn, Company databases, Indian business directories & industry events automatically'
    },
    {
      icon: '📧',
      title: 'Multi-Language Outreach',
      description: 'Personalized messaging in Hindi, English & 12 regional languages for authentic communication'
    },
    {
      icon: '📊',
      title: 'AI Lead Scoring & Qualification',
      description: '89% accuracy rate - automatic lead qualification with Indian business context understanding'
    },
    {
      icon: '🏢',
      title: 'Pan-India City Targeting',
      description: 'Campaign targeting across all major Indian cities with local cultural adaptation & market awareness'
    },
    {
      icon: '📱',
      title: 'Multi-Channel Omnichannel',
      description: 'Email, LinkedIn, WhatsApp Business, Voice calling, SMS & social media for complete reach'
    },
    {
      icon: '🔄',
      title: 'Complete Lead Lifecycle',
      description: 'From prospect discovery → qualification → nurturing → conversion with automated workflows'
    },
    {
      icon: '👥',
      title: 'Team Collaboration & Handoffs',
      description: 'Role-based access, seamless team coordination, lead assignment & performance tracking'
    },
    {
      icon: '📈',
      title: 'Advanced ROI Analytics',
      description: 'Real-time performance tracking, cost per lead optimization & revenue attribution insights'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Generate & Convert Leads in India
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop building pipelines manually. Our AI handles the complete lead journey: LinkedIn scraping → 
            lead qualification → personalized outreach → CRM sync → ROI tracking. Built specifically for 
            Indian business culture, communication styles, and market dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
              feature.emphasize ? 'bg-blue-50 border-blue-200 border-2' : 'bg-white'
            }`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-semibold mb-3 ${
                feature.emphasize ? 'text-blue-900' : 'text-gray-900'
              }`}>{feature.title}</h3>
              <p className={`${feature.emphasize ? 'text-blue-800' : 'text-gray-600'}`}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm border border-blue-200">
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">Proven Results from Indian Businesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2.5M+</div>
              <div className="text-gray-600">Leads Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">₹26</div>
              <div className="text-gray-600">Avg Cost per Qualified Lead</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-gray-600">Lead Qualification Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Indian Businesses Trusting Us</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Industry Focus Section
function IndustryFocusSection() {
  const industries = [
    { name: 'Technology & IT', icon: '💻', leads: '200-800/month', cost: '₹50 avg', popular: ['Bangalore', 'Hyderabad', 'Pune'] },
    { name: 'E-commerce & Retail', icon: '🛒', leads: '500-2000/month', cost: '₹45 avg', popular: ['Mumbai', 'Delhi', 'Bangalore'] },
    { name: 'Business Consulting', icon: '💼', leads: '100-500/month', cost: '₹125 avg', popular: ['Mumbai', 'Delhi', 'Pune'] },
    { name: 'Real Estate', icon: '🏢', leads: '200-800/month', cost: '₹65 avg', popular: ['Mumbai', 'Delhi', 'Bangalore'] },
    { name: 'Healthcare', icon: '🏥', leads: '50-300/month', cost: '₹85 avg', popular: ['Mumbai', 'Delhi', 'Bangalore'] },
    { name: 'Education', icon: '🎓', leads: '300-1500/month', cost: '₹35 avg', popular: ['Chennai', 'Hyderabad', 'Pune'] }
  ];

  return (
    <section id="industries" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Built for Indian Industries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI understands the Indian business landscape and generates leads tailored 
            to your specific industry with local market knowledge and cultural context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600">Proven lead generation for Indian businesses</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-600">Monthly Leads</span>
                  <span className="font-semibold text-blue-600">{industry.leads}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-600">Cost per Lead</span>
                  <span className="font-semibold text-green-600">{industry.cost}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Popular in:</p>
                <div className="flex flex-wrap gap-2">
                  {industry.popular.map((city) => (
                    <span key={city} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Create Campaign for {industry.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Industry',
      description: 'Select from 8+ Indian business templates or create custom targeting',
      image: '🤖',
      details: ['Select industry (IT, E-commerce, Consulting, etc.)', 'Choose target locations (Bangalore, Mumbai, Delhi, etc.)', 'Set decision-maker roles and company size']
    },
    {
      step: '02', 
      title: 'AI Finds Your Prospects',
      description: 'Our AI scans LinkedIn, company websites, and databases in real-time',
      image: '🔍',
      details: ['Scans 10M+ Indian business profiles', 'Evaluates decision-making authority', 'Scores lead quality (85-95% accuracy)']
    },
    {
      step: '03',
      title: 'AI-Written Outreach',
      description: 'Personalized emails, LinkedIn messages, and WhatsApp outreach',
      image: '📧',
      details: ['Creates industry-specific messaging', 'Personalizes each message', 'Supports Hindi, English & regional languages']
    },
    {
      step: '04',
      title: 'Track & Convert',
      description: 'Monitor engagement, responses, and optimize campaigns for better ROI',
      image: '📊',
      details: ['Real-time lead tracking', 'Response rate analytics', 'AI-powered optimization']
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            How AI Lead Generation Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From industry selection to closing deals - all automated with AI specifically 
            trained for Indian business contexts and communication styles.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-lg font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-xl text-gray-600 mb-6">{step.description}</p>
                
                <div className="space-y-3">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4">{step.image}</div>
                    <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                  </div>
                  
                  {index === 1 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm text-gray-700">Profiles Scanned</span>
                        <span className="font-bold text-blue-600">247K</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-gray-700">Quality Score</span>
                        <span className="font-bold text-green-600">89.4%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm text-gray-700">Leads Found</span>
                        <span className="font-bold text-purple-600">23</span>
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">Hi Rajesh,</p>
                        <p className="text-sm text-gray-600">I noticed TechCorp Solutions recently raised Series A funding. Congratulations on scaling up...</p>
                        <p className="text-xs text-gray-500 mt-2">👤 Personalized based in LinkedIn profile</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Indian Market Advantages Section
function IndianMarketAdvantagesSection() {
  const advantages = [
    {
      title: "Hindi + Regional Languages",
      description: "Authentic communication in Hindi, Tamil, Telugu, Kannada, Bengali, Gujarati & 6 more languages",
      icon: "🇮🇳",
      metric: "12 Languages"
    },
    {
      title: "Indian Business Context",
      description: "AI trained on Indian business culture, communication styles, festivals, and local market dynamics",
      icon: "🏢",
      metric: "100% Localized"
    },
    {
      title: "GST-Compliant Invoicing",
      description: "Automated GST invoice generation, tax calculations, and compliance reporting for Indian businesses",
      icon: "📄",
      metric: "GST Ready"
    },
    {
      title: "Indian Payment Gateway",
      description: "Seamless payments via Razorpay, PhonePe, UPI, and all major Indian payment methods",
      icon: "💰",
      metric: "UPI Integration"
    },
    {
      title: "Indian Business Hours",
      description: "Campaign timing optimized for Indian business hours, time zones, and cultural preferences",
      icon: "🕐",
      metric: "IST Optimized"
    },
    {
      title: "Local Support Team",
      description: "Dedicated Indian customer success team available in Hindi and English for round-the-clock support",
      icon: "👥",
      metric: "24/7 Support"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="text-lg">🇮🇳</span>
            Made for Indian Businesses
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Built Specifically for Indian Market Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand Indian business culture, communication preferences, and market dynamics. 
            Our platform is designed to help Indian businesses succeed in lead generation with local context and authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{advantage.icon}</div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {advantage.metric}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{advantage.title}</h3>
              <p className="text-gray-600 text-center">{advantage.description}</p>
            </div>
          ))}
        </div>

        {/* Success Stories Banner */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Real Success from Real Indian Businesses</h3>
          <p className="text-lg opacity-90 mb-6">
            From Mumbai startups to Bangalore IT companies to Delhi consulting firms - see how Indian businesses 
            are scaling their lead generation with our platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">₹12 Lakh</div>
              <div className="text-sm opacity-90">Revenue Generated</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">3,500+</div>
              <div className="text-sm opacity-90">Qualified Leads</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">₹18</div>
              <div className="text-sm opacity-90">Avg Cost per Lead</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '₹4,999',
      period: 'month',
      description: 'Perfect for consultants & small agencies',
      features: [
        '200 qualified leads delivered monthly',
        'Choose from 8 industry templates',
        'AI-powered lead scoring & qualification',
        'Multi-channel nurture sequences',
        'WhatsApp, Email, LinkedIn outreach',
        'Real-time analytics dashboard',
        'Priority customer support',
        'All major Indian cities covered'
      ],
      highlighted: false,
      buttonText: 'Start FREE Trial',
      costPerLead: '₹25 per lead',
      guarantee: '500+ leads guarantee or refund'
    },
    {
      name: 'Growth',
      price: '₹12,999',
      period: 'month', 
      description: 'Most popular for growing businesses',
      features: [
        '500 qualified leads delivered monthly',
        'All industry templates + custom options',
        'Advanced AI lead qualification',
        'Complete lead management platform',
        'AI-powered nurture sequences',
        'Multi-language support (Hindi + Regional)',
        'Dedicated account manager',
        'API access for integrations'
      ],
      highlighted: true,
      buttonText: 'Start FREE Trial',
      costPerLead: '₹26 per lead',
      guarantee: '1000+ leads guarantee or refund'
    },
    {
      name: 'Enterprise',
      price: '₹24,999',
      period: 'month',
      description: 'For enterprises & revenue teams',
      features: [
        '1000+ qualified leads delivered monthly',
        'Custom industry templates',
        'Advanced lead intelligence & insights',
        'Full CRM integration & automation',
        'Team collaboration & lead assignment',
        'Custom outreach campaigns',
        'White-label options available',
        'Dedicated success manager & SLA'
      ],
      highlighted: false,
      buttonText: 'Contact Sales Team',
      costPerLead: '₹25 per lead',
      guarantee: '2000+ leads guarantee or refund'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Transparent Lead Generation Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pay only for qualified leads delivered. No complex features, no hidden fees. 
            Every plan includes industry-specific AI templates and guaranteed lead delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-xl border-2 p-8 ${plan.highlighted ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                plan.highlighted 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ✅ 14-day free trial • ✅ No credit card required • ✅ Cancel anytime
          </p>
          <p className="text-sm text-gray-500">
            All plans include GST. Invoice generation available for Indian businesses.
          </p>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      image: '👨‍💼',
      content: 'Started with 50 leads/month, now getting 500 qualified leads delivered every month. Our sales pipeline is always full.',
      metrics: '500 leads/month delivered'
    },
    {
      name: 'Priya Singh', 
      role: 'Marketing Director',
      company: 'DigitalFirst Apps',
      location: 'Chennai',
      image: '👩‍💼',
      content: 'At ₹26 per qualified lead, this is 60% cheaper than hiring a sales development team. The industry templates work perfectly for SaaS.',
      metrics: '₹26 per qualified lead'
    },
    {
      name: 'Amit Kumar',
      role: 'CEO',
      company: 'RealEstateTech',
      location: 'Mumbai', 
      image: '👨‍💻',
      content: 'Real estate template found our ideal buyers automatically. From 2 deals/month to 8 deals using the Mumbai property template.',
      metrics: '4x more deals closed'
    },
    {
      name: 'Sunita Reddy',
      role: 'Business Owner',
      company: 'Healthcare Connect',
      location: 'Hyderabad',
      image: '👩‍⚕️',
      content: 'Healthcare professionals template delivered 157 qualified doctors in first month. ROI was evident within 15 days.',
      metrics: '157 doctors in month 1'
    },
    {
      name: 'Vikram Mehta',
      role: 'Sales Head',
      company: 'ManufacturingCorp',
      location: 'Pune',
      image: '👨‍🔧',
      content: 'Industrial template found procurement managers at Pune companies automatically. Our sales cycle reduced from 6 months to 3 months.',
      metrics: '50% faster sales cycle'
    },
    {
      name: 'Deepika Kapoor',
      role: 'Agency Owner',
      company: 'DigitalGrowth Agency',
      location: 'Delhi',
      image: '👩‍💼',
      content: 'Using multiple industry templates for our 8 clients. Each gets 200+ leads/month without any manual work from our team.',
      metrics: '8 clients, 1600+ leads total'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Real Results from Indian Business Owners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            500+ businesses now rely on our AI-powered lead generation platform. 
            See how they're getting qualified leads delivered automatically every month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {testimonial.metrics}
                </span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.851-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
          <main>
        <HeroSection />
        <FeaturesSection />
        <IndustryFocusSection />
        <HowItWorksSection />
        <IndianMarketAdvantagesSection />
        <PricingSection />
        <TestimonialsSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Stop Struggling. Start Generating Leads Today.
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 500+ Indian businesses who've transformed their sales pipeline with automated AI lead generation. 
              Setup in 15 minutes. Success guaranteed or full refund. No credit card required for trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg transition-colors"
              >
                🚀 Free Trial - No Credit Card Required
              </Link>
              <Link 
                href="/demo"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 font-semibold text-lg transition-colors"
              >
                📺 Watch 2-Min Demo
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              ✅ Setup in 15 minutes • ✅ Cancel anytime • ✅ Success guarantee • ✅ Indian support team
            </p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">TM</span>
                </div>
                <span className="font-bold text-lg">Transition Marketing AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered lead generation platform built for Indian businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">AI Lead Generation</a></li>
                <li><a href="#" className="hover:text-white">Industry Templates</a></li>
                <li><a href="#" className="hover:text-white">Analytics Dashboard</a></li>
                <li><a href="#" className="hover:text-white">API Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Support</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Transition Marketing AI. All rights reserved. Built for Indian businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}