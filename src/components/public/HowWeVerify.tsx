'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3,
  Shield,
  Phone,
  CheckCircle
} from 'lucide-react';

interface HowWeVerifyProps {
  industryName?: string;
}

export default function HowWeVerify({ industryName }: HowWeVerifyProps) {
  const steps = [
    {
      step: 1,
      title: "AI Behavior Analysis",
      description: "Evaluates engagement patterns, page interactions, and click intent.",
      icon: BarChart3,
    },
    {
      step: 2,
      title: "AI Identity Validation",
      description: "Detects fake numbers, junk emails, duplicates, and spam-like behavior.",
      icon: Shield,
    },
    {
      step: 3,
      title: "Human Verification Call",
      description: "Short confirmation call ensures genuine interest, budget, and timeline.",
      icon: Phone,
    },
    {
      step: 4,
      title: "Verified Delivery",
      description: "Delivered instantly with proof, tags, and verification timestamp.",
      icon: CheckCircle,
    }
  ];

  return (
    <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-[#F7F8FA]">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
            VERIFICATION PROCESS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
            How We Verify Every Inquiry
          </h2>
          <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl leading-[1.5]">
            Our AI + human verification ensures that every inquiry you receive is genuine, qualified, and ready to convert.
          </p>
        </div>

        {/* Vertical Timeline Layout */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Desktop: Timeline with connecting line */}
            <div className="hidden md:block absolute left-[30px] top-0 bottom-0 w-0.5 bg-[#E4E7EC]"></div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative">
                    {/* Timeline Node */}
                    <div className="hidden md:block absolute left-[30px] top-[30px] transform -translate-x-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-[#233DFF] border-4 border-[#F7F8FA]"></div>
                    </div>

                    {/* Card */}
                    <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out ml-0 md:ml-16">
                      <CardContent className="p-8 lg:p-10">
                        <div className="flex items-start gap-6">
                          {/* Icon Container */}
                          <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center flex-shrink-0">
                            <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-[#233DFF] flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{item.step}</span>
                              </div>
                              <h3 className="text-xl font-bold text-[#1A1F2B]">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-[#1A1F2B] opacity-90 leading-[1.5]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: Simplified vertical stack without timeline line */}
          <div className="md:hidden space-y-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative">
                  <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center mb-4">
                          <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-[#233DFF] flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{item.step}</span>
                          </div>
                          <h3 className="text-xl font-bold text-[#1A1F2B]">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-[#1A1F2B] opacity-90 leading-[1.5] text-center">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Connecting Line */}
                  {idx < steps.length - 1 && (
                    <div className="flex justify-center mt-6 mb-6">
                      <div className="w-0.5 h-8 bg-[#E4E7EC]"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

