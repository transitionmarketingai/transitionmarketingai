import Navigation from '@/components/Navigation';
import Link from 'next/link';

const plans = [
  {
    name: "Essential",
    price: "₹899",
    period: "/mo",
    description: "Perfect for small teams getting started with CRM",
    features: [
      "Up to 5 users",
      "Sales pipeline management", 
      "Contact management",
      "Email notifications",
      "Basic reporting",
      "Mobile app access",
      "Email support"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Advanced", 
    price: "₹2,999",
    period: "/mo",
    description: "Best for growing sales teams",
    features: [
      "Up to 25 users",
      "Everything in Essential",
      "Advanced automation",
      "AI insights & analytics",
      "Custom fields",
      "Priority support",
      "Integration marketplace",
      "Advanced reporting"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Professional",
    price: "₹4,999",
    period: "/mo",
    description: "Complete solution for larger teams",
    features: [
      "Up to 100 users",
      "Everything in Advanced",
      "Custom dashboards",
      "Advanced analytics",
      "Dedicated manager",
      "Custom integrations",
      "White-label options",
      "API access"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    period: "",
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Everything in Professional",
      "Custom deployment",
      "24/7 support",
      "Training & onboarding",
      "Dedicated infrastructure",
      "SLA guarantee",
      "Custom development"
    ],
    cta: "Contact Sales",
    isEnterprise: true
  }
];

function PricingSection() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Choose the plan that's right for you
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
          
          {/* Development Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-4xl mx-auto mb-8">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 border-opacity-50' : 'border border-gray-200'} bg-white rounded-lg shadow-lg overflow-hidden`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center mb-4">
                    {plan.isEnterprise ? (
                      <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-1">{plan.period}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={plan.isEnterprise ? "/contact" : "/signup"}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : plan.isEnterprise ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's included in the free trial?</h3>
                <p className="text-gray-600">Full access to all features with sample data. No credit card required.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans later?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a mobile app?</h3>
                <p className="text-gray-600">Coming soon! For now, use our mobile-responsive web app.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">UPI, credit/debit cards, net banking. All payments processed securely.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer training?</h3>
                <p className="text-gray-600">Yes! We provide onboarding training and ongoing support.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">Absolutely. No cancellation fees or long-term commitments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <PricingSection />
    </div>
  );
}
