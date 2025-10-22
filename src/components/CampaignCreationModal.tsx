'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Search,
  Send,
  ExternalLink,
  Target,
  MapPin,
  Building,
  Users,
  DollarSign,
  Calendar,
  Zap,
  Save,
  X
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'web_scraping' | 'outreach' | 'facebook_ads' | 'google_ads';
  status: 'active' | 'paused' | 'completed';
  leadsGenerated: number;
  conversionRate: number;
  budget: number;
  spent: number;
  createdAt: string;
}

interface CampaignFormData {
  name: string;
  type: 'web_scraping' | 'outreach' | 'facebook_ads' | 'google_ads';
  description: string;
  targetLocation: string;
  targetIndustry: string;
  targetKeywords: string[];
  budget: number;
  dailyLimit: number;
  contactMethods: string[];
  messageTemplate: string;
}

interface CampaignCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (campaign: Campaign) => void;
}

export function CampaignCreationModal({ isOpen, onClose, onCreate }: CampaignCreationModalProps) {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    type: 'web_scraping',
    description: '',
    targetLocation: '',
    targetIndustry: '',
    targetKeywords: [],
    budget: 0,
    dailyLimit: 0,
    contactMethods: [],
    messageTemplate: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const industries = [
    'Real Estate', 'Healthcare', 'Consulting', 'Manufacturing', 'E-commerce',
    'Technology', 'Education', 'Finance', 'Legal', 'Marketing', 'Other'
  ];

  const contactMethods = [
    'WhatsApp', 'Email', 'Phone calls', 'SMS', 'LinkedIn messages'
  ];

  const handleSubmit = () => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      status: 'active',
      leadsGenerated: 0,
      conversionRate: 0,
      budget: formData.budget,
      spent: 0,
      createdAt: new Date().toISOString()
    };

    onCreate(newCampaign);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'web_scraping',
      description: '',
      targetLocation: '',
      targetIndustry: '',
      targetKeywords: [],
      budget: 0,
      dailyLimit: 0,
      contactMethods: [],
      messageTemplate: ''
    });
    setCurrentStep(1);
  };

  const updateFormData = (field: keyof CampaignFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up a new lead generation campaign to start finding prospects
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
        </div>

        {/* Step 1: Campaign Basics */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Campaign Basics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Campaign Name *</Label>
                  <Input
                    id="campaignName"
                    placeholder="e.g., Mumbai Tech Companies Scraping"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="campaignType">Campaign Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web_scraping">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Web Scraping
                        </div>
                      </SelectItem>
                      <SelectItem value="outreach">
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Outreach Campaign
                        </div>
                      </SelectItem>
                      <SelectItem value="facebook_ads">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Facebook Ads
                        </div>
                      </SelectItem>
                      <SelectItem value="google_ads">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Google Ads
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this campaign will do..."
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Targeting */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Targeting Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="targetLocation">Target Location *</Label>
                  <Input
                    id="targetLocation"
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    value={formData.targetLocation}
                    onChange={(e) => updateFormData('targetLocation', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="targetIndustry">Target Industry *</Label>
                  <Select value={formData.targetIndustry} onValueChange={(value) => updateFormData('targetIndustry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="targetKeywords">Target Keywords</Label>
                  <Input
                    id="targetKeywords"
                    placeholder="e.g., CEO, Founder, Director (comma separated)"
                    value={formData.targetKeywords.join(', ')}
                    onChange={(e) => updateFormData('targetKeywords', e.target.value.split(',').map(k => k.trim()))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Budget & Contact */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Budget & Contact Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Monthly Budget (₹)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="10000"
                      value={formData.budget}
                      onChange={(e) => updateFormData('budget', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dailyLimit">Daily Lead Limit</Label>
                    <Input
                      id="dailyLimit"
                      type="number"
                      placeholder="50"
                      value={formData.dailyLimit}
                      onChange={(e) => updateFormData('dailyLimit', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">Contact Methods</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {contactMethods.map((method) => (
                      <div key={method} className="flex items-center space-x-3">
                        <Checkbox
                          id={method}
                          checked={formData.contactMethods.includes(method)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData('contactMethods', [...formData.contactMethods, method]);
                            } else {
                              updateFormData('contactMethods', formData.contactMethods.filter(m => m !== method));
                            }
                          }}
                        />
                        <Label htmlFor={method} className="text-sm font-normal cursor-pointer">
                          {method}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="messageTemplate">Message Template</Label>
                  <Textarea
                    id="messageTemplate"
                    placeholder="Hi {name}, I noticed {company} is in the {industry} space. I'd love to share how we've helped similar companies..."
                    value={formData.messageTemplate}
                    onChange={(e) => updateFormData('messageTemplate', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
