import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Target, 
  Mail, 
  Search, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Clock,
  Users,
  TrendingUp,
  Star,
  Play,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

const agents = [
  {
    id: 'content',
    name: 'Content Agent',
    icon: FileText,
    color: 'blue',
    badge: 'AI-Powered',
    description: 'Creates engaging blog posts, social media content, and email newsletters tailored to your audience.',
    features: [
      'Blog post generation',
      'Social media content',
      'Email newsletter creation',
      'Content optimization',
      'Brand voice consistency'
    ],
    stats: [
      { label: 'Posts Created', value: '47', period: 'this month' },
      { label: 'Engagement Rate', value: '89.2%' },
      { label: 'Total Views', value: '12.5k' }
    ],
    useCases: [
      'Blog content strategy',
      'Social media management',
      'Email marketing campaigns',
      'Content calendar planning'
    ]
  },
  {
    id: 'ads',
    name: 'Ads Agent',
    icon: Target,
    color: 'green',
    badge: 'Auto-Optimized',
    description: 'Manages and optimizes your Facebook, Google, and LinkedIn ad campaigns for maximum ROI.',
    features: [
      'Campaign optimization',
      'Bid management',
      'Audience targeting',
      'A/B testing',
      'Performance tracking'
    ],
    stats: [
      { label: 'Total Revenue', value: '$24,500' },
      { label: 'Average ROAS', value: '4.2x' },
      { label: 'Average CTR', value: '3.1%' }
    ],
    useCases: [
      'Facebook advertising',
      'Google Ads management',
      'LinkedIn campaigns',
      'Retargeting strategies'
    ]
  },
  {
    id: 'email',
    name: 'Email Agent',
    icon: Mail,
    color: 'purple',
    badge: 'Personalized',
    description: 'Sends personalized email campaigns and automated sequences that convert leads into customers.',
    features: [
      'Email automation',
      'Personalization',
      'Segmentation',
      'A/B testing',
      'Deliverability optimization'
    ],
    stats: [
      { label: 'Subscribers', value: '15,420' },
      { label: 'Open Rate', value: '89.2%' },
      { label: 'Click Rate', value: '12.4%' }
    ],
    useCases: [
      'Welcome sequences',
      'Nurture campaigns',
      'Product launches',
      'Customer retention'
    ]
  },
  {
    id: 'seo',
    name: 'SEO Agent',
    icon: Search,
    color: 'orange',
    badge: 'Ranking Optimized',
    description: 'Optimizes your content for search engines and tracks keyword rankings to drive organic traffic.',
    features: [
      'Keyword research',
      'Content optimization',
      'Rank tracking',
      'Technical SEO',
      'Link building'
    ],
    stats: [
      { label: 'Top 10 Keywords', value: '156' },
      { label: 'Monthly Traffic', value: '45.2k' },
      { label: 'Traffic Growth', value: '+23%' }
    ],
    useCases: [
      'Content optimization',
      'Keyword strategy',
      'Technical audits',
      'Competitor analysis'
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    icon: BarChart3,
    color: 'red',
    badge: 'AI Insights',
    description: 'Analyzes all your marketing data and provides actionable insights to improve performance.',
    features: [
      'Data analysis',
      'Performance insights',
      'ROI tracking',
      'Predictive analytics',
      'Custom reports'
    ],
    stats: [
      { label: 'Total Revenue', value: '$45,200' },
      { label: 'Marketing ROI', value: '4.8x' },
      { label: 'Total Leads', value: '12,450' }
    ],
    useCases: [
      'Performance analysis',
      'ROI optimization',
      'Data visualization',
      'Strategic planning'
    ]
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    content: 'The Content Agent has revolutionized our content strategy. We\'ve seen a 300% increase in engagement.',
    rating: 5
  },
  {
    name: 'Mike Chen',
    role: 'CEO',
    company: 'GrowthCo',
    content: 'Our Ads Agent consistently delivers 4x ROAS. It\'s like having a PPC expert working 24/7.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'E-commerce Manager',
    company: 'ShopSmart',
    content: 'The Email Agent\'s personalization features have doubled our email conversion rates.',
    rating: 5
  }
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Your AI Marketing Team
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Five specialized AI agents working together to automate and optimize every aspect of your marketing strategy. 
                Each agent is designed to handle specific tasks while sharing intelligence for maximum impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Try Demo Dashboard</Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-sm text-muted-foreground">AI Agents</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Automation</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">4.2x</div>
                <div className="text-sm text-muted-foreground">Average ROAS</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">89%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Specialized AI Agents</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Each agent is trained on millions of marketing campaigns and optimized for specific tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {agents.map((agent) => {
                const IconComponent = agent.icon;
                return (
                  <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-16 h-16 bg-${agent.color}-100 rounded-xl flex items-center justify-center`}>
                          <IconComponent className={`h-8 w-8 text-${agent.color}-600`} />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {agent.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{agent.name}</CardTitle>
                      <CardDescription className="text-base">
                        {agent.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {agent.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stats */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                          Performance
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {agent.stats.map((stat, index) => (
                            <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                              <div className="text-lg font-bold text-primary">{stat.value}</div>
                              <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                          Use Cases
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.useCases.map((useCase, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <Link href="/signup">
                          Get Started with {agent.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How Agents Work Together */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How Agents Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI agents don't work in isolation. They share data, insights, and collaborate to create a unified marketing strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Intelligent Collaboration</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Real-time Data Sharing</h4>
                      <p className="text-muted-foreground">
                        Agents continuously share performance data, audience insights, and optimization opportunities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cross-Agent Intelligence</h4>
                      <p className="text-muted-foreground">
                        SEO insights inform content creation, email engagement data optimizes ad targeting, and analytics drive all decisions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">24/7 Optimization</h4>
                      <p className="text-muted-foreground">
                        Agents work around the clock, making real-time adjustments based on performance and market conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h4 className="font-semibold mb-4">Example Workflow</h4>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Search className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm">SEO Agent identifies trending keywords</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm">Content Agent creates optimized blog post</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-sm">Email Agent includes in newsletter</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center p-3 bg-red-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-red-600 mr-3" />
                    <span className="text-sm">Analytics Agent tracks performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how businesses are transforming their marketing with our AI agents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Meet Your AI Marketing Team?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of businesses already using AI agents to automate and optimize their marketing.
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}