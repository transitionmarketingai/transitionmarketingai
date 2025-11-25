'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Target,
  Shield,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Phone
} from 'lucide-react';

interface IndustryFunnelProps {
  industryName?: string;
  step1Title?: string;
  step1Bullets?: string[];
  step2VerificationSteps?: { num: number; text: string }[];
  step3Title?: string;
  step3Bullets?: string[];
}

export default function IndustryFunnel({ 
  industryName,
  step1Title,
  step1Bullets,
  step2VerificationSteps,
  step3Title,
  step3Bullets
}: IndustryFunnelProps) {
  const defaultSteps = [
    {
      step: 1,
      title: "AI Targeting for Your Industry",
      icon: Target,
      bullets: [
        "Predictive audiences",
        "Optimized creatives/keywords",
        "Multi-platform targeting (Google + Meta + LinkedIn)"
      ]
    },
    {
      step: 2,
      title: "AI Verification Engine™",
      icon: Shield,
      verificationSteps: [
        { num: 1, text: "Intent scoring" },
        { num: 2, text: "Identity validation" },
        { num: 3, text: "Human verification" },
        { num: 4, text: "Verified delivery" }
      ]
    },
    {
      step: 3,
      title: "Verified Inquiries Delivered",
      icon: CheckCircle,
      bullets: [
        "Delivered on WhatsApp",
        "Dashboard tracking",
        "Budget + timeline tags",
        "Source proof"
      ]
    }
  ];

  const steps = [
    {
      step: 1,
      title: step1Title || defaultSteps[0].title,
      icon: Target,
      bullets: step1Bullets || defaultSteps[0].bullets
    },
    {
      step: 2,
      title: defaultSteps[1].title,
      icon: Shield,
      verificationSteps: step2VerificationSteps || defaultSteps[1].verificationSteps
    },
    {
      step: 3,
      title: step3Title || defaultSteps[2].title,
      icon: CheckCircle,
      bullets: step3Bullets || defaultSteps[2].bullets
    }
  ];

  return (
    <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-[#F7F8FA]">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
            INDUSTRY FUNNEL
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
            How Your Industry Funnel Works
          </h2>
          <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl leading-[1.5]">
            AI-built funnel + Verification Engine™ ensures only real, qualified inquiries reach your business.
          </p>
        </div>

        {/* 3-Step Funnel Layout */}
        <div className="relative">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:flex items-start gap-8 lg:gap-10 relative">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex-1 relative">
                  <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out h-full">
                    <CardHeader className="p-8 lg:p-10 pb-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center mb-5">
                          <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-[#1A1F2B] text-center leading-tight mb-4">
                        {item.step}. {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 lg:p-10 pt-0">
                      {item.bullets ? (
                        <ul className="space-y-3">
                          {item.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-[#233DFF] flex-shrink-0 mt-0.5" strokeWidth={2} />
                              <span className="text-[#1A1F2B] opacity-90 text-sm leading-[1.5]">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : item.verificationSteps ? (
                        <ul className="space-y-3">
                          {item.verificationSteps.map((verStep, verIdx) => (
                            <li key={verIdx} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#233DFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">{verStep.num}</span>
                              </div>
                              <span className="text-[#1A1F2B] opacity-90 text-sm leading-[1.5]">{verStep.text}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
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
                      <CardTitle className="text-xl font-bold text-[#1A1F2B] text-center leading-tight mb-4">
                        {item.step}. {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      {item.bullets ? (
                        <ul className="space-y-3">
                          {item.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-[#233DFF] flex-shrink-0 mt-0.5" strokeWidth={2} />
                              <span className="text-[#1A1F2B] opacity-90 text-sm leading-[1.5]">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : item.verificationSteps ? (
                        <ul className="space-y-3">
                          {item.verificationSteps.map((verStep, verIdx) => (
                            <li key={verIdx} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#233DFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">{verStep.num}</span>
                              </div>
                              <span className="text-[#1A1F2B] opacity-90 text-sm leading-[1.5]">{verStep.text}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
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

