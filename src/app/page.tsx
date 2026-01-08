import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Target, 
  Mail, 
  Search, 
  BarChart3, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Features Preview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">5 AI Agents Working 24/7 for Your Business</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our specialized AI agents handle every aspect of your marketing, from content creation to campaign optimization, 
                all working together seamlessly to drive results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Content Agent */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in animate-stagger-1">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Content Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Creates engaging blog posts, social media content, and email newsletters tailored to your audience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>47 posts created this month</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>89.2% engagement rate</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>12.5k total views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ads Agent */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in animate-stagger-2">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Ads Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Auto-Optimized</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Manages and optimizes your Facebook, Google, and LinkedIn ad campaigns for maximum ROI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>$24,500 total revenue</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>4.2x average ROAS</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>3.1% average CTR</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Agent */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in animate-stagger-3">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Email Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Personalized</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Sends personalized email campaigns and automated sequences that convert leads into customers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>15,420 subscribers</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>89.2% open rate</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>12.4% click rate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Agent */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in animate-stagger-4">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Search className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">SEO Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">Ranking Optimized</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Optimizes your content for search engines and tracks keyword rankings to drive organic traffic.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>156 keywords in top 10</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>45.2k monthly traffic</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>+23% traffic growth</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Agent */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in animate-stagger-5">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Analytics Agent</CardTitle>
                      <Badge variant="secondary" className="text-xs">AI Insights</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Analyzes all your marketing data and provides actionable insights to improve performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>$45,200 total revenue</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>4.8x marketing ROI</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>12,450 total leads</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integration Card */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Seamless Integration</CardTitle>
                      <Badge variant="default" className="text-xs">All Connected</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    All agents work together, sharing data and insights to create a unified marketing strategy.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Real-time synchronization</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Cross-agent intelligence</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Automated workflows</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center animate-bounce-in">
              <Button asChild size="lg" className="hover-glow hover-lift">
                <Link href="/login">
                  Try Demo Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up animate-stagger-1">
                Our AI-powered marketing platform automates your entire marketing strategy, from content creation to campaign optimization, 
                all working together seamlessly to drive measurable results.
              </p>
            </div>

            {/* Step 1: Setup */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      1
                    </div>
                    <h3 className="text-2xl font-bold">Quick Setup & Onboarding</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Get started in minutes with our intelligent onboarding process. Simply connect your existing marketing tools, 
                    define your business goals, and let our AI learn your brand voice and target audience.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-3" />
                      <span>Connect your marketing platforms</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-primary mr-3" />
                      <span>Define your marketing goals</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-primary mr-3" />
                      <span>Set up secure data connections</span>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 p-8 rounded-lg">
                  <h4 className="font-semibold mb-4">Onboarding Checklist</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span>Business profile setup</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span>Marketing goals configuration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span>Target audience definition</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span>Budget and KPI settings</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      <span>AI agent activation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: AI Agents */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-muted/30 p-8 rounded-lg">
                    <h4 className="font-semibold mb-4">AI Agent Ecosystem</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                        <div>
                          <div className="font-medium">Content Agent</div>
                          <div className="text-sm text-muted-foreground">Creates blog posts, social content, and email newsletters</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Target className="h-5 w-5 text-green-500 mr-3 mt-1" />
                        <div>
                          <div className="font-medium">Ads Agent</div>
                          <div className="text-sm text-muted-foreground">Optimizes Facebook, Google, and LinkedIn campaigns</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                        <div>
                          <div className="font-medium">Email Agent</div>
                          <div className="text-sm text-muted-foreground">Sends personalized campaigns and automation sequences</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Search className="h-5 w-5 text-orange-500 mr-3 mt-1" />
                        <div>
                          <div className="font-medium">SEO Agent</div>
                          <div className="text-sm text-muted-foreground">Optimizes content and tracks keyword rankings</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BarChart3 className="h-5 w-5 text-red-500 mr-3 mt-1" />
                        <div>
                          <div className="font-medium">Analytics Agent</div>
                          <div className="text-sm text-muted-foreground">Analyzes data and provides actionable insights</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      2
                    </div>
                    <h3 className="text-2xl font-bold">AI Agents Work Together</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Our five specialized AI agents work in harmony, sharing data and insights to create a unified marketing strategy. 
                    Each agent has a specific role but they all collaborate to maximize your results.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-primary mr-3" />
                      <span>Real-time data synchronization</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-primary mr-3" />
                      <span>Cross-agent intelligence sharing</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-3" />
                      <span>24/7 automated optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Automation */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      3
                    </div>
                    <h3 className="text-2xl font-bold">Automated Workflows</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Once set up, your marketing runs on autopilot. Our AI agents create content, optimize campaigns, 
                    send emails, and analyze performance - all automatically, 24/7.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Content Marketing Workflow</h4>
                      <p className="text-sm text-muted-foreground">
                        SEO Agent identifies trending keywords → Content Agent creates blog post → 
                        Social media posts auto-generated → Email newsletter updated → Performance tracked
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Lead Generation Workflow</h4>
                      <p className="text-sm text-muted-foreground">
                        Ads Agent creates targeted campaigns → Landing pages optimized → 
                        Email sequences triggered → Content Agent creates nurturing content → Analytics tracks conversion
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 p-8 rounded-lg">
                  <h4 className="font-semibold mb-4">Daily Automation</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-3" />
                      <span>Morning: Performance review and optimization</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-3" />
                      <span>Content creation based on trends</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-3" />
                      <span>Campaign optimization and bid adjustments</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-3" />
                      <span>Email sequences and personalization</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-3" />
                      <span>SEO monitoring and content updates</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-3" />
                      <span>Evening: Performance analysis and insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Results */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-muted/30 p-8 rounded-lg">
                    <h4 className="font-semibold mb-4">Real Results</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">+23.5%</div>
                        <div className="text-sm text-muted-foreground">ROI Improvement</div>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">89.2%</div>
                        <div className="text-sm text-muted-foreground">Email Open Rate</div>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">4.2x</div>
                        <div className="text-sm text-muted-foreground">Average ROAS</div>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">156</div>
                        <div className="text-sm text-muted-foreground">Top 10 Keywords</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      4
                    </div>
                    <h3 className="text-2xl font-bold">Measurable Results</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Track your success with comprehensive analytics and AI-powered insights. Our platform provides 
                    detailed performance metrics, ROI calculations, and actionable recommendations to continuously improve your marketing.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-primary mr-3" />
                      <span>Comprehensive performance analytics</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-primary mr-3" />
                      <span>ROI tracking across all channels</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-primary mr-3" />
                      <span>AI-powered optimization recommendations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-primary/5 p-12 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Marketing?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using AI to automate their marketing and drive better results. 
                Start your free trial today and see the difference AI can make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Try Demo Dashboard</Link>
                </Button>
              </div>
            </div>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}