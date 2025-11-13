import type { Metadata } from "next";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: "Insights & Resources | Transition Marketing AI",
  description: "Learn how to use AI and paid ads to get real inquiries every week. We share playbooks, case studies, and practical tips for Indian businesses.",
};

export default function InsightsPage() {
  const articles = [
    {
      title: "How AI Lead Generation is Transforming Real Estate Marketing in India",
      description: "Discover how Indian real estate businesses are using AI to generate verified property inquiries and close deals faster.",
      tag: "Real Estate",
      tagColor: "bg-green-600",
      readTime: "6 min read",
      slug: "/insights/ai-real-estate-lead-generation",
      publishDate: new Date('2025-01-15')
    },
    {
      title: "Why Verified Inquiries Deliver Better ROI Than Buying Lead Lists",
      description: "Stop wasting money on outdated databases. Learn how verified ad inquiries outperform bulk lead lists in conversion and trust.",
      tag: "Strategy",
      tagColor: "bg-blue-600",
      readTime: "5 min read",
      slug: "/insights/verified-vs-bought-leads",
      publishDate: new Date('2025-01-10')
    },
    {
      title: "The Future of AI Marketing Automation for Indian Businesses",
      description: "Explore how AI marketing tools are changing the way Indian startups, agencies, and SMBs grow their customer base.",
      tag: "Automation",
      tagColor: "bg-purple-600",
      readTime: "7 min read",
      slug: "/insights/ai-marketing-automation-india",
      publishDate: new Date('2025-01-05')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" href="/" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</Link>
              <Link href="/#pricing" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</Link>
              <Link href="/#results" className="text-gray-700 hover:text-gray-900 font-medium">Results</Link>
              <Link href="/insights" className="text-gray-900 font-medium border-b-2 border-blue-600">Insights</Link>
              <Link href="/#faq" className="text-gray-700 hover:text-gray-900 font-medium">FAQ</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Client Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com'} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Insights & Resources
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Learn how to use AI and paid ads to get real inquiries every week. We share playbooks, case studies, and practical tips for Indian businesses.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="border-2 border-slate-200 hover:border-blue-300 transition-colors flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${article.tagColor} text-white`}>
                      {article.tag}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-4">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                    {article.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                    asChild
                  >
                    <Link href={article.slug}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Ready to Get Real Inquiries Every Week?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Book a free consultation and get your custom AI marketing report.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" asChild>
            <a href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com'} target="_blank" rel="noopener noreferrer">
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <Logo size="md" className="text-white mb-6" />
              <p className="text-slate-400 mb-6 leading-relaxed">
                India's most advanced AI-powered lead generation platform.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/#how-it-works" className="text-slate-400 hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#results" className="text-slate-400 hover:text-white transition-colors">
                    Results
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="text-slate-400 hover:text-white transition-colors">
                    Insights
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-400">
                © 2025 Transition Marketing AI. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

