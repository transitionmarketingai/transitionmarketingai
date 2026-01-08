'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Play,
  Download,
  ExternalLink,
  FileText,
  Code,
  HelpCircle,
  Mail,
  Phone,
  Clock,
  Star,
  Users,
  Shield,
  BarChart3,
  Target,
  Mail as MailIcon,
  Search as SearchIcon
} from 'lucide-react';
import Link from 'next/link';

const guides = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using our AI Marketing Agents',
    icon: BookOpen,
    color: 'blue',
    articles: [
      { title: 'Setting up your account', time: '5 min read', difficulty: 'Beginner' },
      { title: 'Choosing the right agents', time: '8 min read', difficulty: 'Beginner' },
      { title: 'Creating your first campaign', time: '12 min read', difficulty: 'Intermediate' },
      { title: 'Understanding analytics', time: '10 min read', difficulty: 'Intermediate' }
    ]
  },
  {
    id: 'agent-guides',
    title: 'Agent Guides',
    description: 'Detailed guides for each AI Marketing Agent',
    icon: Zap,
    color: 'green',
    articles: [
      { title: 'Content Agent best practices', time: '15 min read', difficulty: 'Intermediate' },
      { title: 'Ads Agent optimization', time: '18 min read', difficulty: 'Advanced' },
      { title: 'Email Agent automation', time: '12 min read', difficulty: 'Intermediate' },
      { title: 'SEO Agent strategies', time: '20 min read', difficulty: 'Advanced' },
      { title: 'Analytics Agent insights', time: '14 min read', difficulty: 'Intermediate' }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect with your existing tools and workflows',
    icon: Settings,
    color: 'purple',
    articles: [
      { title: 'Google Analytics integration', time: '8 min read', difficulty: 'Beginner' },
      { title: 'Facebook Ads connection', time: '10 min read', difficulty: 'Intermediate' },
      { title: 'Mailchimp setup', time: '6 min read', difficulty: 'Beginner' },
      { title: 'WordPress integration', time: '12 min read', difficulty: 'Intermediate' },
      { title: 'Custom webhook setup', time: '15 min read', difficulty: 'Advanced' }
    ]
  },
  {
    id: 'api-docs',
    title: 'API Documentation',
    description: 'Integrate TransitionMarketingAI with your existing tools',
    icon: Code,
    color: 'orange',
    articles: [
      { title: 'Authentication', time: '10 min read', difficulty: 'Intermediate' },
      { title: 'Endpoints reference', time: '25 min read', difficulty: 'Advanced' },
      { title: 'Webhooks', time: '12 min read', difficulty: 'Advanced' },
      { title: 'Rate limits', time: '5 min read', difficulty: 'Beginner' },
      { title: 'SDKs and libraries', time: '8 min read', difficulty: 'Intermediate' }
    ]
  }
];

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What are AI Marketing Agents?',
        answer: 'AI Marketing Agents are specialized AI assistants designed to handle different aspects of your marketing strategy. Each agent is trained on millions of marketing campaigns and optimized for specific tasks like content creation, ad optimization, email marketing, SEO, and analytics.',
        tags: ['agents', 'ai', 'marketing']
      },
      {
        question: 'How do I get started?',
        answer: 'Getting started is easy! Simply sign up for a free trial, choose your plan, connect your marketing platforms, and start using our AI agents to automate your marketing tasks. Our onboarding wizard will guide you through the entire process.',
        tags: ['getting-started', 'onboarding']
      },
      {
        question: 'Can I change plans anytime?',
        answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences. There are no long-term contracts or cancellation fees.',
        tags: ['billing', 'plans']
      }
    ]
  },
  {
    category: 'Features',
    questions: [
      {
        question: 'What marketing platforms do you integrate with?',
        answer: 'We integrate with over 50+ marketing platforms including Google Ads, Facebook Ads, LinkedIn Ads, Mailchimp, HubSpot, Salesforce, WordPress, Shopify, and many more. We\'re constantly adding new integrations based on user feedback.',
        tags: ['integrations', 'platforms']
      },
      {
        question: 'How accurate are the AI agents?',
        answer: 'Our AI agents are trained on millions of successful marketing campaigns and continuously learn from new data. They typically achieve 85-95% accuracy in their predictions and recommendations, with performance improving over time.',
        tags: ['accuracy', 'ai', 'performance']
      },
      {
        question: 'Can I customize the AI agents?',
        answer: 'Yes! You can customize agent behavior, set specific goals and KPIs, define your brand voice, and create custom workflows. Advanced customization options are available in our Growth and Scale plans.',
        tags: ['customization', 'brand-voice']
      }
    ]
  },
  {
    category: 'Support',
    questions: [
      {
        question: 'What kind of support do you provide?',
        answer: 'We offer email support for Starter plans, priority support for Growth plans, and 24/7 phone support for Scale plans. All plans include access to our comprehensive documentation and community forum.',
        tags: ['support', 'help']
      },
      {
        question: 'Is my data secure?',
        answer: 'Absolutely. We use enterprise-grade security measures including end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is never shared with third parties without your explicit consent.',
        tags: ['security', 'privacy', 'data']
      },
      {
        question: 'Do you offer training or onboarding?',
        answer: 'Yes! We provide comprehensive onboarding for all new users, including video tutorials, live training sessions, and personalized setup assistance. Scale plan customers get dedicated account managers for ongoing support.',
        tags: ['training', 'onboarding', 'support']
      }
    ]
  }
];

const popularArticles = [
  {
    title: 'How to Set Up Your First AI Marketing Campaign',
    category: 'Getting Started',
    readTime: '12 min',
    views: '2.3k',
    rating: 4.8
  },
  {
    title: 'Optimizing Your Content Agent for Maximum Engagement',
    category: 'Content Agent',
    readTime: '15 min',
    views: '1.8k',
    rating: 4.9
  },
  {
    title: 'Advanced Facebook Ads Optimization Strategies',
    category: 'Ads Agent',
    readTime: '20 min',
    views: '3.1k',
    rating: 4.7
  },
  {
    title: 'Email Automation Best Practices',
    category: 'Email Agent',
    readTime: '18 min',
    views: '2.7k',
    rating: 4.8
  }
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = faqs.flatMap(category => 
    category.questions.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Documentation & Help Center
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Everything you need to know about TransitionMarketingAI. Find guides, tutorials, and answers to common questions.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search documentation, guides, and FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Guides & Tutorials</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Issue Resolution</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">4.9</div>
                <div className="text-sm text-muted-foreground">Support Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Popular Articles</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Start with these most-read articles to get up and running quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularArticles.map((article, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit text-xs">
                      {article.category}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {article.views}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(article.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{article.rating}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10">
                      Read Article
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Documentation Guides</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive guides to help you master every aspect of TransitionMarketingAI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guides.map((guide) => {
                const IconComponent = guide.icon;
                return (
                  <Card key={guide.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 bg-${guide.color}-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`h-8 w-8 text-${guide.color}-600`} />
                      </div>
                      <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                      <CardDescription className="text-base">
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {guide.articles.slice(0, 3).map((article, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                            <span className="text-sm font-medium">{article.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {article.difficulty}
                            </Badge>
                          </div>
                        ))}
                        {guide.articles.length > 3 && (
                          <div className="text-center">
                            <Button variant="ghost" size="sm">
                              +{guide.articles.length - 3} more articles
                            </Button>
                          </div>
                        )}
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/docs/${guide.id}`}>
                          View Guide
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

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find quick answers to the most common questions about TransitionMarketingAI.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                </TabsList>
                
                {faqs.map((category) => (
                  <TabsContent key={category.category.toLowerCase()} value={category.category.toLowerCase()} className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <Card key={index} className="p-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg">{faq.question}</h3>
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {searchQuery && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Search Results</h2>
                <p className="text-xl text-muted-foreground">
                  Found {filteredFAQs.length} results for "{searchQuery}"
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Support Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our support team is here to help you succeed. Get in touch with us through any of these channels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="p-6 bg-white/10 rounded-lg">
                <Mail className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm opacity-90 mb-4">Get help via email within 24 hours</p>
                <Button variant="secondary" size="sm">
                  <a href="mailto:support@transitionmarketingai.com">Send Email</a>
                </Button>
              </div>
              
              <div className="p-6 bg-white/10 rounded-lg">
                <MessageSquare className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm opacity-90 mb-4">Chat with our support team in real-time</p>
                <Button variant="secondary" size="sm">
                  Start Chat
                </Button>
              </div>
              
              <div className="p-6 bg-white/10 rounded-lg">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm opacity-90 mb-4">24/7 phone support for Scale plans</p>
                <Button variant="secondary" size="sm">
                  Call Now
                </Button>
              </div>
            </div>

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