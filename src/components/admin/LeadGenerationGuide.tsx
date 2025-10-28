'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  Users,
  Mail,
  Phone,
  Chrome,
  Facebook,
  CheckCircle,
  ArrowRight,
  FileText,
  Target,
  Zap,
  AlertCircle,
} from 'lucide-react';

interface LeadGenerationGuideProps {
  open: boolean;
  onClose: () => void;
  clientId?: string;
  clientIndustry?: string;
  clientLocation?: string;
}

export default function LeadGenerationGuide({
  open,
  onClose,
  clientId,
  clientIndustry,
  clientLocation,
}: LeadGenerationGuideProps) {
  const router = useRouter();
  const steps = [
    {
      number: 1,
      title: 'AI Web Scraping',
      icon: Search,
      description: 'Use AI to find prospects from Google Maps, LinkedIn, and directories',
      tools: ['Google Maps API', 'LinkedIn Scraper', 'Justdial', 'IndiaMART'],
      process: [
        'Set location filters (city, state)',
        'Set industry keywords',
        'Set business type filters',
        'Run AI scraper (100-500 contacts/day)',
        'Export results to CSV',
      ],
      time: '2-4 hours',
    },
    {
      number: 2,
      title: 'Contact Verification',
      icon: CheckCircle,
      description: 'Verify phone numbers and email addresses before delivery',
      tools: ['Truecaller API', 'Hunter.io', 'Manual spot-checking'],
      process: [
        'Format validation (10-digit mobile)',
        'Active number check (Truecaller)',
        'Email domain verification (Hunter.io)',
        'Manual spot-call (5-10 random)',
        'Mark verified contacts',
      ],
      time: '1-2 hours',
    },
    {
      number: 3,
      title: 'Quality Scoring',
      icon: Target,
      description: 'Score each lead based on ICP match and quality',
      tools: ['AI Scoring Algorithm', 'Client ICP Data'],
      process: [
        'Match to client ICP (industry, size, location)',
        'Assign quality score (0-100)',
        'Filter out low-quality leads (<70)',
        'Prioritize high-intent leads (85+)',
        'Generate final lead list',
      ],
      time: '30 minutes',
    },
    {
      number: 4,
      title: 'Facebook/Google Ads (Optional)',
      icon: Facebook,
      description: 'Run targeted ad campaigns for high-intent leads',
      tools: ['Facebook Ads Manager', 'Google Ads', 'Lead Forms'],
      process: [
        'Create ad campaign in Facebook/Google',
        'Set targeting (location, interests, demographics)',
        'Set lead form on landing page',
        'Launch campaign (₹5,000-20,000 budget)',
        'Monitor and optimize daily',
      ],
      time: '2-3 days (setup)',
    },
    {
      number: 5,
      title: 'Upload & Deliver Leads',
      icon: Upload,
      description: 'Upload verified leads to client dashboard',
      tools: ['Admin Dashboard', 'CSV Upload', 'Client Dashboard'],
      process: [
        'Go to client detail → Leads → Upload',
        'Upload CSV or add leads manually',
        'Verify all fields are correct',
        'Deliver to client dashboard',
        'Send email notification to client',
      ],
      time: '15-30 minutes',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            Lead Generation Guide
          </DialogTitle>
          <DialogDescription>
            Step-by-step process to generate and deliver verified leads for your client
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Info */}
          {(clientIndustry || clientLocation) && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Client Requirements:</h3>
                <div className="flex gap-4 text-sm">
                  {clientIndustry && (
                    <div>
                      <span className="text-blue-700">Industry:</span>{' '}
                      <Badge>{clientIndustry}</Badge>
                    </div>
                  )}
                  {clientLocation && (
                    <div>
                      <span className="text-blue-700">Location:</span>{' '}
                      <Badge>{clientLocation}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.number} className="border-2 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-600">Step {step.number}</Badge>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                        <p className="text-slate-600 text-sm">{step.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {step.time}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Tools */}
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">Tools Required:</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tools.map((tool, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Process */}
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">Process:</p>
                      <ol className="space-y-2">
                        {step.process.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Start */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Start Action Items
              </h3>
              <ol className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Today:</strong> Run AI scraper for client's target location and industry</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Tomorrow:</strong> Verify contacts and score leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Day 3:</strong> Upload first batch of leads to client dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Ongoing:</strong> Monitor ad campaigns, optimize daily</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Always verify phone numbers before delivery (90%+ active rate required)</li>
                <li>• Quality over quantity - better to deliver 10 verified leads than 50 unverified</li>
                <li>• Use a mix of AI scraping (70%) and ads (30%) for best results</li>
                <li>• Check lead sources daily and rotate if any source quality drops</li>
                <li>• Communicate with client weekly about lead quality and feedback</li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex gap-3 pt-4 border-t">
            {clientId && (
              <Button className="flex-1" onClick={() => {
                onClose();
                router.push(`/admin/clients/${clientId}/leads/upload`);
              }}>
                <Upload className="mr-2 h-4 w-4" />
                Go to Lead Upload
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close Guide
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

