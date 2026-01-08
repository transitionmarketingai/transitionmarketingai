import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  X, 
  Star, 
  ArrowRight, 
  Zap, 
  Shield, 
  Headphones, 
  BarChart3,
  Users,
  Clock,
  MessageSquare,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const plans = [
  {
    name: 'Starter',
    price: '$39',
    period: '/month',
    description: 'Perfect for small businesses getting started with AI marketing',
    features: [
      '1 AI Agent (your choice)',
      '100 tasks per month',
      '2 team seats',
      'Email support',
      'Basic analytics dashboard',
      'Standard integrations',
      '14-day free trial'
    ],
    limitations: [
      'Limited to 1 agent',
      'Basic reporting only',
      'Email support only'
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'blue'
  },
  {
    name: 'Growth',
    price: '$97',
    period: '/month',
    description: 'Ideal for growing businesses ready to scale their marketing',
    features: [
      'All 5 AI Agents',
      '500 tasks per month',
      '5 team seats',
      'Priority email support',
      'Advanced analytics & insights',
      'Custom integrations',
      'A/B testing tools',
      '14-day free trial'
    ],
    limitations: [
      'Monthly task limits',
      'Standard integrations only'
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'green'
  },
  {
    name: 'Scale',
    price: '$199',
    period: '/month',
    description: 'For high-volume businesses with advanced needs',
    features: [
      'All 5 AI Agents',
      'Unlimited tasks',
      'Unlimited team seats',
      '24/7 phone & chat support',
      'Custom analytics & reporting',
      'White-label options',
      'Dedicated account manager',
      'API access',
      '14-day free trial'
    ],
    limitations: [],
    cta: 'Start Free Trial',
    popular: false,
    color: 'purple'
  },
];

const features = [
  {
    category: 'AI Agents',
    items: [
      { name: 'Content Agent', starter: true, growth: true, scale: true },
      { name: 'Ads Agent', starter: true, growth: true, scale: true },
      { name: 'Email Agent', starter: false, growth: true, scale: true },
      { name: 'SEO Agent', starter: false, growth: true, scale: true },
      { name: 'Analytics Agent', starter: false, growth: true, scale: true }
    ]
  },
  {
    category: 'Usage & Limits',
    items: [
      { name: 'Monthly Tasks', starter: '100', growth: '500', scale: 'Unlimited' },
      { name: 'Team Seats', starter: '2', growth: '5', scale: 'Unlimited' },
      { name: 'Data Retention', starter: '6 months', growth: '2 years', scale: 'Unlimited' },
      { name: 'API Calls', starter: '1,000/month', growth: '10,000/month', scale: 'Unlimited' }
    ]
  },
  {
    category: 'Support & Features',
    items: [
      { name: 'Email Support', starter: true, growth: true, scale: true },
      { name: 'Priority Support', starter: false, growth: true, scale: true },
      { name: '24/7 Phone Support', starter: false, growth: false, scale: true },
      { name: 'Dedicated Account Manager', starter: false, growth: false, scale: true },
      { name: 'Custom Integrations', starter: false, growth: true, scale: true },
      { name: 'White-label Options', starter: false, growth: false, scale: true }
    ]
  },
  {
    category: 'Analytics & Reporting',
    items: [
      { name: 'Basic Dashboard', starter: true, growth: true, scale: true },
      { name: 'Advanced Analytics', starter: false, growth: true, scale: true },
      { name: 'Custom Reports', starter: false, growth: false, scale: true },
      { name: 'Real-time Monitoring', starter: false, growth: true, scale: true },
      { name: 'ROI Tracking', starter: false, growth: true, scale: true }
    ]
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    plan: 'Growth',
    content: 'The Growth plan gave us everything we needed to scale our marketing. ROI increased by 340% in just 3 months.',
    rating: 5,
    savings: '$15,000'
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'ScaleUp Inc.',
    plan: 'Scale',
    content: 'The Scale plan with dedicated support has been a game-changer. Our marketing team is now 5x more productive.',
    rating: 5,
    savings: '$50,000'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'StartupXYZ',
    plan: 'Starter',
    content: 'Perfect for our startup. The Content Agent alone has saved us 20 hours per week on content creation.',
    rating: 5,
    savings: '$8,000'
  }
];

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
  },
  {
    question: 'What happens if I exceed my task limit?',
    answer: 'We\'ll notify you when you\'re approaching your limit. You can upgrade your plan or purchase additional tasks as needed.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees, no hidden costs. You only pay the monthly subscription fee. All plans include a 14-day free trial.'
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer: 'Yes! For businesses with unique needs, we offer custom enterprise plans with dedicated support, custom integrations, and tailored features.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions. All payments are processed securely.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time. Your account will remain active until the end of your current billing period.'
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Choose the plan that fits your business needs. All plans include a 14-day free trial with no credit card required.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : 'shadow-lg'} transition-all duration-300`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground text-lg">{plan.period}</span>
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                          Limitations
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <X className="h-4 w-4 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button asChild className="w-full" size="lg" variant={plan.popular ? 'default' : 'outline'}>
                      <Link href="/signup">
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Feature Comparison</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Compare all features across our plans to find the perfect fit for your business.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-6 font-semibold">Features</th>
                    <th className="text-center p-6 font-semibold">
                      <div>Starter</div>
                      <div className="text-sm text-muted-foreground font-normal">$39/month</div>
                    </th>
                    <th className="text-center p-6 font-semibold bg-primary/5">
                      <div>Growth</div>
                      <div className="text-sm text-muted-foreground font-normal">$97/month</div>
                    </th>
                    <th className="text-center p-6 font-semibold">
                      <div>Scale</div>
                      <div className="text-sm text-muted-foreground font-normal">$199/month</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="bg-muted/30">
                        <td colSpan={4} className="p-4 font-semibold text-primary">
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b hover:bg-muted/20">
                          <td className="p-4 font-medium">{item.name}</td>
                          <td className="text-center p-4">
                            {typeof item.starter === 'boolean' ? (
                              item.starter ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                            ) : (
                              <span className="text-sm">{item.starter}</span>
                            )}
                          </td>
                          <td className="text-center p-4 bg-primary/5">
                            {typeof item.growth === 'boolean' ? (
                              item.growth ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                            ) : (
                              <span className="text-sm">{item.growth}</span>
                            )}
                          </td>
                          <td className="text-center p-4">
                            {typeof item.scale === 'boolean' ? (
                              item.scale ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                            ) : (
                              <span className="text-sm">{item.scale}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how businesses are saving time and money with our AI marketing agents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 relative">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.plan} Plan
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                    Saved {testimonial.savings}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get answers to common questions about our pricing and plans.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="billing" className="space-y-4">
                  {faqs.slice(2, 4).map((faq, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="features" className="space-y-4">
                  {faqs.slice(4, 6).map((faq, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of businesses already using AI to automate and optimize their marketing. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/login">Try Demo Dashboard</Link>
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}