'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Lightbulb,
  AlertCircle,
  Phone,
  Mail,
  DollarSign,
  Target,
  Users,
  TrendingUp,
} from 'lucide-react';

export default function OnboardingGuide({ currentStep }: { currentStep: number }) {
  const steps = [
    {
      number: 1,
      title: 'Basic Information',
      questions: [
        'What is the full legal business name?',
        'Who is the main contact person?',
        'What is their best contact email and phone?',
        'Do they have an alternate phone number?',
      ],
      tips: ['Verify business registration if needed', 'Get WhatsApp number if possible'],
    },
    {
      number: 2,
      title: 'Business Details',
      questions: [
        'What industry/sector are they in?',
        'Business type: B2B, B2C, or B2B2C?',
        'How many employees? (company size)',
        'What is their primary location?',
      ],
      tips: ['Use specific industries for better targeting', 'Ask about multiple locations'],
    },
    {
      number: 3,
      title: 'Current Marketing Situation',
      questions: [
        'What lead sources are they using now?',
        'How many leads do they get per month?',
        'What is their monthly marketing budget?',
        'What are their biggest pain points?',
      ],
      tips: ['Listen for frustration points', 'Understand their current CPL'],
    },
    {
      number: 4,
      title: 'Target Market & ICP',
      questions: [
        'Who is their ideal customer? (describe)',
        'What is their ideal customer profile (ICP)?',
        'Which geographic areas do they target?',
        'Who are their main competitors?',
      ],
      tips: ['Get specific examples', 'Ask about previous successful clients'],
    },
    {
      number: 5,
      title: 'Lead Requirements',
      questions: [
        'How many leads do they need per month?',
        'What cost per lead (CPL) is acceptable?',
        'How urgent is their need? (timeline)',
        'What quality expectations do they have?',
        'Preferred lead sources? (AI scraping, ads, both)',
        'How often do they want updates?',
      ],
      tips: ['Be realistic about expectations', 'Discuss quality vs quantity'],
    },
    {
      number: 6,
      title: 'Custom Proposal',
      questions: [
        'What is the proposed monthly budget?',
        'How many leads can we guarantee?',
        'Calculate cost per lead (auto-calculated)',
        'Payment terms? (Advance, Net 30, etc.)',
        'Contract duration? (1, 3, 6, 12 months)',
      ],
      tips: [
        'Use pricing guidelines box for reference',
        'Offer discounts for 3-6 month prepaid',
        'Include quality guarantee in terms',
      ],
    },
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <Card className="sticky top-4 border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          Step {currentStep} Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">{currentStepData.title}</h4>
          <p className="text-sm text-slate-600 mb-3">Key questions to ask:</p>
          <ul className="space-y-2">
            {currentStepData.questions.map((question, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Pro Tips
          </p>
          <ul className="space-y-1">
            {currentStepData.tips.map((tip, idx) => (
              <li key={idx} className="text-xs text-blue-700">• {tip}</li>
            ))}
          </ul>
        </div>

        {currentStep === 6 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-900 mb-2">
              💡 After Submission:
            </p>
            <ul className="space-y-1 text-xs text-amber-800">
              <li>✅ Email will be sent automatically to client</li>
              <li>✅ Client created in system</li>
              <li>✅ Next: Generate leads for this client</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

