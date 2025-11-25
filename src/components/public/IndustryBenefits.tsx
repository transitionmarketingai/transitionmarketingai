'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle,
  Shield,
  Target,
  Clock,
  MessageCircle,
  BarChart3,
  Filter,
  Star
} from 'lucide-react';

interface IndustryBenefitsProps {
  industryName?: string;
  benefits?: Array<{
    title: string;
    description: string;
    icon: any;
  }>;
}

export default function IndustryBenefits({ industryName, benefits: customBenefits }: IndustryBenefitsProps) {
  const defaultBenefits = [
    {
      title: "Verified intent",
      description: "Placeholder description for verified intent benefit",
      icon: Target,
    },
    {
      title: "Verified contact information",
      description: "Placeholder description for verified contact information benefit",
      icon: Shield,
    },
    {
      title: "Industry-specific targeting",
      description: "Placeholder description for industry-specific targeting benefit",
      icon: CheckCircle,
    },
    {
      title: "Budget & timeline confirmation",
      description: "Placeholder description for budget and timeline confirmation benefit",
      icon: Clock,
    },
    {
      title: "Real-time WhatsApp delivery",
      description: "Placeholder description for real-time WhatsApp delivery benefit",
      icon: MessageCircle,
    },
    {
      title: "Dashboard tracking",
      description: "Placeholder description for dashboard tracking benefit",
      icon: BarChart3,
    },
    {
      title: "Spam & fake inquiry filtering",
      description: "Placeholder description for spam and fake inquiry filtering benefit",
      icon: Filter,
    },
    {
      title: "Quality scoring",
      description: "Placeholder description for quality scoring benefit",
      icon: Star,
    }
  ];

  const benefits = customBenefits || defaultBenefits;

  return (
    <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-white">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
            BENEFITS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
            What You Receive
          </h2>
          <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl leading-[1.5]">
            Everything delivered is verified, filtered, and matched to your business needs.
          </p>
        </div>

        {/* Benefits Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <Card key={idx} className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out">
                <CardContent className="p-8 lg:p-10">
                  <div className="flex items-start gap-4 lg:gap-6">
                    <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center flex-shrink-0">
                      <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1A1F2B] mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-[#1A1F2B] opacity-90 text-sm leading-[1.5]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

