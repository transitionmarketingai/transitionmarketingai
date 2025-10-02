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
              Generate{' '}
              <span className="text-blue-600">1,000+ qualified leads</span>{' '}
              monthly using AI for your business
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Designed specifically for Indian businesses. Our AI finds decision-makers, 
              creates personalized campaigns, and automates outreach in Hindi, English & regional languages. 
              Join the smart businesses growing faster with AI.
            </p>
            
            {/* Success Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">₹47</div>
                <div className="text-sm text-gray-600">Avg cost per qualified lead</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">12.4%</div>
                <div className="text-sm text-gray-600">Conversion rate (vs 2.5% industry avg)</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-purple-600">15 min</div>
                <div className="text-sm text-gray-600">Setup time to generate first leads</div>
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
                Start Generating Leads - Free Trial
              </Link>
              <Link 
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-all duration-300 text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M5 7h14M4 14h16" />
                </svg>
                Watch Demo (2 min)
              </Link>
            </div>
            
            <p className="text-sm text-gray-500">
              ✅ 14-day free trial • ✅ Setup in 15 minutes • ✅ Cancel anytime
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
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 mb-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">🚀 AI Lead Generation Active</h3>
                      <p className="text-xs text-gray-600">Finding prospects via LinkedIn, Company sites & industry directories</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Live
                    </span>
                  </div>
                </div>

                {/* Campaign Card */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm opacity-90">🎯 Bangalore IT Startups Campaign</div>
                    <span className="text-xs opacity-75">Active</span>
                  </div>
                  <div className="text-lg font-bold mb-1">23 leads generated today</div>
                  <div className="text-sm opacity-90">₹47 avg cost • 89% quality score</div>
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
    <section className="py-20 bg-white">
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
    <section className="py-20 bg-gray-50">
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

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '₹4,999',
      period: 'month',
      description: 'Perfect for small businesses',
      features: [
        '200 AI-generated leads/month',
        '5 automated campaigns',
        'Email & LinkedIn outreach',
        'Industry-specific templates',
        'Basic analytics',
        'Email support',
        'Mumbai, Delhi, Bangalore focus'
      ],
      highlighted: false,
      buttonText: 'Start Free Trial'
    },
    {
      name: 'Growth',
      price: '₹12,999',
      period: 'month', 
      description: 'Most popular for growing businesses',
      features: [
        '500 AI-generated leads/month',
        '15 automated campaigns',
        'Multi-channel outreach (Email, LinkedIn, WhatsApp)',
        'Advanced AI scoring',
        'Detailed analytics & reporting',
        'Priority support',
        'All major Indian cities',
        'Regional language support'
      ],
      highlighted: true,
      buttonText: 'Start Free Trial'
    },
    {
      name: 'Scale',
      price: '₹24,999',
      period: 'month',
      description: 'For serious growth and expansion',
      features: [
        '1,000+ AI-generated leads/month',
        'Unlimited campaigns',
        'All outreach channels + Voice calling',
        'Custom AI training for your industry',
        'Advanced CRM integration',
        'Dedicated success manager',
        'Enterprise support',
        'API access'
      ],
      highlighted: false,
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Simple Pricing for Indian Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that matches your business size. All plans include our core AI lead generation features.
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
      content: 'Generated 500+ qualified leads in our first month. Our sales team is now focusing on closing instead of prospecting.',
      metrics: '500+ leads/month'
    },
    {
      name: 'Priya Singh', 
      role: 'Marketing Director',
      company: 'DigitalFirst Apps',
      location: 'Chennai',
      image: '👩‍💼',
      content: 'The AI understands our B2B SaaS market perfectly. Much better than manual LinkedIn prospecting.',
      metrics: '₹45/lead cost'
    },
    {
      name: 'Amit Kumar',
      role: 'CEO',
      company: 'RealEstateTech',
      location: 'Mumbai', 
      image: '👨‍💻',
      content: 'Finally, a platform that gets Indian real estate business. Our conversion rate doubled.',
      metrics: '15.2% conversion'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Trusted by Indian Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Indian entrepreneurs and business leaders are growing their companies with AI-powered lead generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <IndustryFocusSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Generate More Qualified Leads?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 500+ Indian businesses already growing faster with AI-powered lead generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg transition-colors"
              >
                Start Free Trial - No Credit Card
              </Link>
              <Link 
                href="/demo"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 font-semibold text-lg transition-colors"
              >
                Watch Demo
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              ✅ Setup in 15 minutes • ✅ Cancel anytime • ✅ Dedicated Indian support
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