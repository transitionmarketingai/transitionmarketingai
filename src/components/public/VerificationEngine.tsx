'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3,
  Shield,
  Phone,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface VerificationEngineProps {
  variant?: 'homepage' | 'industry';
}

export default function VerificationEngine({ variant = 'homepage' }: VerificationEngineProps) {
  const steps = [
    {
      step: 1,
      title: "AI Intent Scoring",
      description: "We analyze behaviour, click signals, and engagement patterns to detect real purchase intent.",
      icon: BarChart3,
    },
    {
      step: 2,
      title: "AI Identity Validation",
      description: "Our models flag fake numbers, invalid emails, and duplicate submissions automatically.",
      icon: Shield,
    },
    {
      step: 3,
      title: "Human Verification Call",
      description: "A short manual confirmation ensures genuine interest, accurate requirement, budget, and timeline.",
      icon: Phone,
    },
    {
      step: 4,
      title: "Verified Delivery",
      description: "You receive verified inquiries instantly on WhatsApp and in your AI dashboard.",
      icon: CheckCircle,
    }
  ];

  return (
    <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-white">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className={`mb-16 md:mb-20 ${variant === 'homepage' ? 'text-center md:text-left' : 'text-center'}`}>
          <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
            VERIFICATION SYSTEM
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
            AI Verification Engine™
          </h2>
          <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl leading-[1.5]">
            How we ensure every inquiry is real, qualified, and ready to convert.
          </p>
        </div>

        {/* 4-Step Layout */}
        <div className="relative">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:flex items-start gap-8 lg:gap-10 relative">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex-1 relative">
                  <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out">
                    <CardHeader className="p-8 lg:p-10 pb-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center mb-5">
                          <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-[#1A1F2B] text-center leading-tight mb-3">
                        {item.step}. {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 lg:p-10 pt-0">
                      <p className="text-[#1A1F2B] opacity-90 text-sm text-center leading-[1.5]">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Connecting Arrow */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[30px] -right-5 z-10">
                      <ArrowRight className="h-6 w-6 text-[#233DFF] opacity-40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical Stack */}
          <div className="md:hidden space-y-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative">
                  <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                    <CardHeader className="p-8 pb-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center mb-5">
                          <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-[#1A1F2B] text-center leading-tight mb-3">
                        {item.step}. {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      <p className="text-[#1A1F2B] opacity-90 text-sm text-center leading-[1.5]">
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

        {/* Light Grey Separator Line */}
        <div className="mt-20 pt-20 border-t border-[#E4E7EC]"></div>
      </div>
    </section>
  );
}

