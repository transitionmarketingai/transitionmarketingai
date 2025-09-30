import AuditForm from "@/components/AuditForm";

// Modern Logo component
function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-heading-4 text-primary font-bold">Transition AI</span>
    </div>
  );
}

// Modern Badge component
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-surface border-subtle text-secondary">
      {children}
    </span>
  );
}


// Type definitions
type Tier = { 
  name: string; 
  price: string; 
  blurb: string; 
  features: string[]; 
  planId: string 
};

// Modern Section Title component
function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <div className="mb-6">
        <Badge>{label}</Badge>
      </div>
      <h2 className="text-heading-2 text-primary mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-lg text-secondary max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

// Modern Pricing Table component
function PricingTable({ tiers }: { tiers: Tier[] }) {
  const allFeatures = [
    "Verified leads/month",
    "SEO blogs/month", 
    "Social posts/month",
    "Outreach channels",
    "AI personalization",
    "Analytics dashboard",
    "Support level"
  ];

  const getFeatureValue = (tier: Tier, feature: string) => {
    switch (feature) {
      case "Verified leads/month":
        return tier.features[0].split(" ")[0];
      case "SEO blogs/month":
        return tier.features[1].split(" ")[0];
      case "Social posts/month":
        return tier.features[2].split(" ")[0];
      case "Outreach channels":
        return tier.features[3];
      case "AI personalization":
        return tier.features[4] || "Basic";
      case "Analytics dashboard":
        return tier.features[5] || "Basic";
      case "Support level":
        return tier.features[6] || "Email";
      default:
        return "—";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="text-body-sm text-secondary font-medium">Features</div>
          {tiers.map((tier, index) => (
            <div key={tier.planId} className={`text-center ${index === 1 ? 'relative' : ''}`}>
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-primary text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`p-6 rounded-xl ${index === 1 ? 'bg-surface-elevated border-2 border-cyan-500/30' : 'bg-surface border border-subtle'}`}>
                <h3 className="text-heading-4 text-primary mb-3">{tier.name}</h3>
                <div className="text-4xl font-bold text-primary mb-3">{tier.price}</div>
                <p className="text-body-sm text-secondary">{tier.blurb}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        <div className="space-y-3">
          {allFeatures.map((feature, featureIndex) => (
            <div key={featureIndex} className="grid grid-cols-4 gap-6 items-center py-4 px-2 rounded-lg hover:bg-surface/50 transition-colors">
              <div className="text-body text-secondary font-medium">{feature}</div>
              {tiers.map((tier, tierIndex) => (
                <div key={tier.planId} className={`text-center p-3 rounded-lg ${tierIndex === 1 ? 'bg-surface-elevated' : 'bg-surface'}`}>
                  <span className="text-body text-primary font-medium">
                    {getFeatureValue(tier, feature)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <div></div>
          {tiers.map((tier, index) => (
            <div key={tier.planId} className="text-center">
              <a
                href={`/checkout?plan=${tier.planId}`}
                className={`w-full inline-block text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  tier.planId === 'growth'
                    ? 'btn-primary text-lg'
                    : 'btn-secondary text-lg'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simplified 3-tier pricing structure
const pricingTiers: Tier[] = [
  { 
    name: "Starter", 
    price: "₹4,999/mo", 
    blurb: "Perfect for small businesses", 
    planId: "starter", 
    features: [
      "200 verified leads/month",
      "4 SEO blogs/month",
      "8 social posts/month",
      "Email & WhatsApp outreach",
      "Basic analytics dashboard",
      "Email support"
    ] 
  },
  { 
    name: "Growth", 
    price: "₹12,999/mo", 
    blurb: "Most popular for growing businesses", 
    planId: "growth", 
    features: [
      "500 verified leads/month",
      "8 SEO blogs/month",
      "20 social posts/month",
      "Multi-channel outreach (Email, WhatsApp, LinkedIn)",
      "AI-personalised messages",
      "Advanced analytics & reporting",
      "Priority support"
    ] 
  },
  { 
    name: "Pro", 
    price: "₹24,999/mo", 
    blurb: "For serious growth and scale", 
    planId: "pro", 
    features: [
      "1,000+ verified leads/month",
      "12+ SEO blogs/month",
      "30 social posts/month",
      "All channels + AI voice agent",
      "CRM integration & custom dashboards",
      "Dedicated success manager",
      "24/7 priority support"
    ] 
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-subtle">
        <div className="container-custom">
          <nav className="flex items-center justify-between py-6">
            <Logo />
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how" className="text-body text-secondary hover:text-primary transition-colors">
                How it works
              </a>
              <a href="#solutions" className="text-body text-secondary hover:text-primary transition-colors">
                Solutions
              </a>
              <a href="#pricing" className="text-body text-secondary hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="/dashboard" className="text-body text-secondary hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#contact" className="text-body text-secondary hover:text-primary transition-colors">
                Contact
              </a>
            </div>

            {/* CTA Button */}
            <a href="#pricing" className="btn-primary">
              Start Free Trial
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="viewport-height">
        {/* Hero Section - Optimized for single viewport */}
        <section className="flex-1 flex items-center justify-center py-16">
          <div className="container-custom">
            <div className="text-center max-w-5xl mx-auto">
              {/* Badge */}
              <div className="mb-6">
                <Badge>🚀 Automated • 💰 Subscription • 🇮🇳 India-first</Badge>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
                AI marketing systems that{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">run on autopilot</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
                Get qualified leads, consistent content, and smart AI tools in one subscription. 
                Built for Indian SMBs. No hiring. No hassle.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a href="#pricing" className="btn-primary px-8 py-4 text-lg w-full sm:w-auto text-center">
                  View Plans
                </a>
                <a href="/book" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto text-center">
                  Book a Strategy Call
                </a>
                <a href="/dashboard" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto text-center">
                  View Demo Dashboard
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-sm text-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>5 guaranteed leads in trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>No long-term contracts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audit Form Section - Compact for viewport */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Get a <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Free AI Marketing Audit</span>
                </h2>
                <p className="text-lg text-secondary max-w-2xl mx-auto">
                  Tell us about your business and goals. We&apos;ll send a comprehensive audit with recommended automations.
                </p>
              </div>

              <div className="card p-8">
                <AuditForm />
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section - Compact */}
        <section id="how" className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Three simple steps</h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">From signup to results in days, not months.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Pick your plan & goals",
                  description: "Select your industry, region, and targets. We tailor the automations to you.",
                  icon: "🎯"
                },
                {
                  step: "2", 
                  title: "We set up your AI engine",
                  description: "Lead scraping/validation + personalised outreach, or SEO + social + newsletter.",
                  icon: "⚙️"
                },
                {
                  step: "3",
                  title: "You get leads & content", 
                  description: "View results in your dashboard. Scale up or down anytime.",
                  icon: "📈"
                }
              ].map((item, index) => (
                <div key={index} className="card text-center p-6 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section - Compact */}
        <section id="solutions" className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Launch with two flagship products</h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">More AI add-ons coming soon.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  title: "LeadGen AI",
                  description: "Automated lead generation and outreach that works 24/7. Find, verify, and contact your ideal customers across multiple channels.",
                  icon: "🎯",
                  features: [
                    "AI-powered lead discovery and verification",
                    "Multi-channel outreach (Email, WhatsApp, LinkedIn)",
                    "Personalised messaging and follow-up sequences"
                  ]
                },
                {
                  title: "Content AI Suite",
                  description: "Complete content marketing automation. SEO blogs, social media posts, and newsletters that drive organic traffic and engagement.",
                  icon: "📝",
                  features: [
                    "SEO-optimised blog content generation",
                    "Social media content and scheduling",
                    "Email newsletter creation and distribution"
                  ]
                }
              ].map((solution, index) => (
                <div key={index} className="card p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{solution.icon}</div>
                    <h3 className="text-xl font-semibold text-primary">{solution.title}</h3>
                  </div>
                  
                  <p className="text-secondary mb-6">
                    {solution.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-secondary">
                        <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - Compact */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Simple, transparent subscriptions</h2>
              <p className="text-lg text-secondary max-w-2xl mx-auto">30-day free trial for the first 10 businesses. Locked-in pricing for life.</p>
            </div>
            
            <div className="card p-8">
              <PricingTable tiers={pricingTiers} />
            </div>
          </div>
        </section>

        {/* Beta Offer Section - Compact */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="card text-center p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                🎉 Beta Offer: First 10 businesses get 30 days free
              </h3>
              <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
                We guarantee 5 confirmed leads during trial, or you don&apos;t pay when it ends.
              </p>
              <a href="#pricing" className="btn-primary px-8 py-4 text-lg">
                Claim Your Free Trial
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="py-12 border-t border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <div className="text-body text-primary mb-2">
                © {new Date().getFullYear()} Transition Marketing AI
              </div>
              <div className="text-caption">
                Made with ❤️ in India
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href="mailto:hello@transitionmarketingai.com"
                className="text-body text-secondary hover:text-primary transition-colors"
              >
                hello@transitionmarketingai.com
              </a>
              <div className="flex items-center gap-6">
                <a
                  href="/privacy"
                  className="text-caption hover:text-primary transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  className="text-caption hover:text-primary transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
