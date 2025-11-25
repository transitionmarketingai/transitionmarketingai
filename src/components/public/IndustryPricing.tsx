'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface IndustryPricingProps {
  industryName?: string;
  typicalRange?: string;
  costPerInquiry?: string;
  costPerInquirySubtext?: string;
}

export default function IndustryPricing({ 
  industryName = "Industry",
  typicalRange = "₹35,000–₹50,000",
  costPerInquiry = "₹700–₹1,100",
  costPerInquirySubtext = "Per verified inquiry"
}: IndustryPricingProps) {
  return (
    <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-[#F7F8FA]">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
            INVESTMENT RANGE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
            Typical Investment Range
          </h2>
          <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl leading-[1.5]">
            Your exact plan and quote are shared during your free strategy session.
          </p>
        </div>

        {/* Single Pricing Card - Centered */}
        <div className="flex justify-center">
          <Card className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out w-full max-w-[600px]">
            <CardHeader className="p-8 lg:p-10 pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center">
                  <DollarSign className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                </div>
                <CardTitle className="text-2xl font-bold text-[#1A1F2B]">
                  {industryName} Pricing
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 lg:p-10 pt-0 space-y-6">
              {/* Typical Range */}
              <div className="pb-6 border-b border-[#E4E7EC]">
                <p className="text-sm font-medium text-[#1A1F2B] opacity-60 mb-2 uppercase tracking-wide">
                  Typical Range
                </p>
                <p className="text-3xl md:text-4xl font-bold text-[#1A1F2B] mb-2">
                  {typicalRange}
                </p>
                <p className="text-sm text-[#1A1F2B] opacity-60 leading-[1.5]">
                  (includes ad spend)
                </p>
              </div>

              {/* Cost per Verified Inquiry */}
              <div>
                <p className="text-sm font-medium text-[#1A1F2B] opacity-60 mb-2 uppercase tracking-wide">
                  Cost per Verified Inquiry
                </p>
                <p className="text-3xl md:text-4xl font-bold text-[#1A1F2B] mb-2">
                  {costPerInquiry}
                </p>
                <p className="text-sm text-[#1A1F2B] opacity-60 leading-[1.5]">
                  {costPerInquirySubtext}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

