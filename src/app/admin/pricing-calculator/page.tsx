'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calculator,
  Copy,
  Download,
  IndianRupee,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Mail,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface PricingOption {
  name: string;
  monthlyPrice: number;
  leadVolume: number;
  costPerLead: number;
  adLeads: number;
  scrapedLeads: number;
  adPercentage: number;
  scrapedPercentage: number;
  verificationTier: string;
  features: string[];
}

export default function PricingCalculatorPage() {
  const [budget, setBudget] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [options, setOptions] = useState<PricingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // CPL by source
  const AD_CPL = 400; // Average cost per ad lead
  const SCRAPED_CPL = 150; // Cost per scraped lead (including verification)
  const MARGIN = 0.50; // 50% margin

  const calculateOptions = () => {
    const budgetNum = parseInt(budget);
    if (!budgetNum || budgetNum < 10000) {
      toast.error('Budget should be at least ₹10,000');
      return;
    }

    const calculatedOptions: PricingOption[] = [];

    // Option 1: Quality Focus (Higher ad percentage, premium verification)
    const option1Budget = budgetNum;
    const option1Leads = Math.floor(option1Budget / 700); // Higher CPL for quality
    const option1AdLeads = Math.floor(option1Leads * 0.7);
    const option1ScrapedLeads = option1Leads - option1AdLeads;
    const option1Cost = (option1AdLeads * AD_CPL) + (option1ScrapedLeads * SCRAPED_CPL);
    const option1Price = Math.round(option1Cost / (1 - MARGIN));

    calculatedOptions.push({
      name: 'Quality Focus',
      monthlyPrice: option1Price,
      leadVolume: option1Leads,
      costPerLead: Math.round(option1Price / option1Leads),
      adLeads: option1AdLeads,
      scrapedLeads: option1ScrapedLeads,
      adPercentage: 70,
      scrapedPercentage: 30,
      verificationTier: 'Premium',
      features: [
        '70% High-intent ad leads',
        '30% Verified scraped leads',
        'Premium verification (decision-maker contacts)',
        'Weekly delivery',
        'Priority support',
      ],
    });

    // Option 2: Balanced (Equal mix, standard verification)
    const option2Budget = budgetNum;
    const option2Leads = Math.floor(option2Budget / 550); // Balanced CPL
    const option2AdLeads = Math.floor(option2Leads * 0.5);
    const option2ScrapedLeads = option2Leads - option2AdLeads;
    const option2Cost = (option2AdLeads * AD_CPL) + (option2ScrapedLeads * SCRAPED_CPL);
    const option2Price = Math.round(option2Cost / (1 - MARGIN));

    calculatedOptions.push({
      name: 'Balanced',
      monthlyPrice: option2Price,
      leadVolume: option2Leads,
      costPerLead: Math.round(option2Price / option2Leads),
      adLeads: option2AdLeads,
      scrapedLeads: option2ScrapedLeads,
      adPercentage: 50,
      scrapedPercentage: 50,
      verificationTier: 'Enhanced',
      features: [
        '50% High-intent ad leads',
        '50% Verified scraped leads',
        'Enhanced verification (phone + email + business)',
        'Weekly delivery',
        'Dashboard access',
      ],
    });

    // Option 3: Volume Focus (Higher scraping percentage, basic verification)
    const option3Budget = budgetNum;
    const option3Leads = Math.floor(option3Budget / 450); // Lower CPL for volume
    const option3AdLeads = Math.floor(option3Leads * 0.3);
    const option3ScrapedLeads = option3Leads - option3AdLeads;
    const option3Cost = (option3AdLeads * AD_CPL) + (option3ScrapedLeads * SCRAPED_CPL);
    const option3Price = Math.round(option3Cost / (1 - MARGIN));

    calculatedOptions.push({
      name: 'Volume Focus',
      monthlyPrice: option3Price,
      leadVolume: option3Leads,
      costPerLead: Math.round(option3Price / option3Leads),
      adLeads: option3AdLeads,
      scrapedLeads: option3ScrapedLeads,
      adPercentage: 30,
      scrapedPercentage: 70,
      verificationTier: 'Basic',
      features: [
        '30% High-intent ad leads',
        '70% Verified scraped leads',
        'Basic verification (phone + email + business)',
        'Weekly delivery',
        'Dashboard access',
      ],
    });

    setOptions(calculatedOptions);
    toast.success(`Generated ${calculatedOptions.length} pricing options`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const generateProposalText = (option: PricingOption) => {
    return `CUSTOM PRICING PROPOSAL - ${clientName || 'Client'}

Industry: ${industry || 'Not specified'}

OPTION: ${option.name}
Monthly Investment: ${formatCurrency(option.monthlyPrice)}
Lead Volume: ${option.leadVolume} verified leads/month
Cost Per Lead: ${formatCurrency(option.costPerLead)}

Lead Mix:
- Ad-Generated Leads: ${option.adLeads} (${option.adPercentage}%)
  → High-intent leads from Facebook/Google ads
  → Verified by form submission (intent confirmed)
  
- Scraped & Verified Leads: ${option.scrapedLeads} (${option.scrapedPercentage}%)
  → Sourced from Google Maps, LinkedIn, directories
  → Verified: Phone active + Email valid + Business confirmed

Verification Tier: ${option.verificationTier}

Features:
${option.features.map(f => `• ${f}`).join('\n')}

Delivery: Weekly batches to your dashboard

${notes ? `\nAdditional Notes:\n${notes}` : ''}

---
Why this mix?
- Higher ad percentage = More intent, higher conversion potential
- Higher scraping percentage = More cost-effective, verified before delivery
- All leads verified = No quality complaints, only confirmed contacts

Next Steps:
1. Select this option
2. We'll set up your custom lead criteria
3. Leads start delivering within 7 business days

Questions? Reply to this email or call us.

Transition Marketing AI
info@transitionmarketingai.com`;
  };

  const downloadProposal = (option: PricingOption) => {
    const text = generateProposalText(option);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pricing-Proposal-${clientName || 'Client'}-${option.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Proposal downloaded!');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Pricing Calculator</h1>
        <p className="text-slate-600">Generate custom pricing options based on client budget</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Client Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., ABC Company"
                />
              </div>

              <div>
                <Label htmlFor="budget">Monthly Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 35000"
                  min="10000"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Minimum: ₹10,000
                </p>
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., Real Estate, IT Services"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific requirements or preferences..."
                  rows={3}
                />
              </div>

              <Button
                onClick={calculateOptions}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!budget || parseInt(budget) < 10000}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Generate Pricing Options
              </Button>
            </CardContent>
          </Card>

          {/* Cost Breakdown Info */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Cost Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-600 space-y-1">
              <p>• Ad Leads: ₹400/lead (CPC)</p>
              <p>• Scraped Leads: ₹150/lead (includes verification)</p>
              <p>• Margin: 50%</p>
              <p className="text-slate-500 mt-2">
                These are estimates. Actual costs may vary based on industry, targeting, and competition.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Options Display */}
        <div className="lg:col-span-2">
          {options.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Generate Pricing Options
                </h3>
                <p className="text-slate-600">
                  Enter client budget and details, then click "Generate Pricing Options" to create 3 custom proposals.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Generated Options ({options.length})
                </h2>
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                  Ready to Share
                </Badge>
              </div>

              <Tabs defaultValue="0" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {options.map((option, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      Option {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {options.map((option, index) => (
                  <TabsContent key={index} value={index.toString()}>
                    <Card className="border-2 border-blue-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl mb-2">{option.name}</CardTitle>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge className="bg-blue-600">
                                {formatCurrency(option.monthlyPrice)}/month
                              </Badge>
                              <Badge variant="outline">
                                {option.leadVolume} leads
                              </Badge>
                              <Badge variant="outline">
                                {formatCurrency(option.costPerLead)}/lead
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(generateProposalText(option))}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadProposal(option)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Lead Mix */}
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-3">Lead Mix</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">Ad Leads</span>
                                <span className="text-sm font-bold text-blue-600">{option.adPercentage}%</span>
                              </div>
                              <div className="text-2xl font-bold text-blue-600">{option.adLeads}</div>
                              <p className="text-xs text-slate-500 mt-1">High-intent, form submission</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">Scraped Leads</span>
                                <span className="text-sm font-bold text-slate-600">{option.scrapedPercentage}%</span>
                              </div>
                              <div className="text-2xl font-bold text-slate-600">{option.scrapedLeads}</div>
                              <p className="text-xs text-slate-500 mt-1">Verified before delivery</p>
                            </div>
                          </div>
                        </div>

                        {/* Verification Tier */}
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-3">Verification Tier</h3>
                          <Badge className="bg-green-600">{option.verificationTier}</Badge>
                          <p className="text-sm text-slate-600 mt-2">
                            {option.verificationTier === 'Premium' && 'Decision-maker contacts, budget qualification, recent activity signals'}
                            {option.verificationTier === 'Enhanced' && 'Phone + email + business verification, intent scoring'}
                            {option.verificationTier === 'Basic' && 'Phone active + email valid + business confirmed'}
                          </p>
                        </div>

                        {/* Features */}
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-3">Included Features</h3>
                          <ul className="space-y-2">
                            {option.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="bg-slate-50 rounded-lg p-4">
                          <h3 className="font-semibold text-slate-900 mb-3">Cost Breakdown</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Ad Leads ({option.adLeads} × ₹400)</span>
                              <span className="font-medium">{formatCurrency(option.adLeads * AD_CPL)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Scraped Leads ({option.scrapedLeads} × ₹150)</span>
                              <span className="font-medium">{formatCurrency(option.scrapedLeads * SCRAPED_CPL)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-200">
                              <span className="text-slate-600">Total Cost</span>
                              <span className="font-medium">{formatCurrency((option.adLeads * AD_CPL) + (option.scrapedLeads * SCRAPED_CPL))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Margin (50%)</span>
                              <span className="font-medium">{formatCurrency(option.monthlyPrice - ((option.adLeads * AD_CPL) + (option.scrapedLeads * SCRAPED_CPL)))}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-200 font-semibold">
                              <span className="text-slate-900">Monthly Price</span>
                              <span className="text-blue-600">{formatCurrency(option.monthlyPrice)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                              setSelectedOption(index);
                              copyToClipboard(generateProposalText(option));
                              toast.success('Proposal copied! Ready to paste in email.');
                            }}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Copy for Email
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => downloadProposal(option)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Download Proposal
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

