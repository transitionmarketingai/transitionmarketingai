'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FinalCTAProps {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryLink?: string;
  secondaryLinkText?: string;
}

export default function FinalCTA({
  headline = "Ready for Verified Inquiries?",
  subtext = "Book your free strategy session to see how we deliver verified, qualified inquiries to your business.",
  buttonText = "Book My Free Strategy Call",
  buttonLink = "/book",
  secondaryLink,
  secondaryLinkText = "Learn how verified inquiries work"
}: FinalCTAProps) {
  return (
    <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-white relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#E4E7EC]"></div>
      
      {/* Soft gradient overlay (optional subtle effect) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F8FA]/30 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1A1F2B] mb-6 text-center leading-[1.1]">
          {headline}
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg text-[#1A1F2B] opacity-90 mb-10 text-center max-w-2xl mx-auto leading-[1.5]">
          {subtext}
        </p>

        {/* Primary CTA Button */}
        <div className="flex justify-center mb-6">
          <Button 
            size="lg" 
            className="bg-[#233DFF] hover:bg-[#1E35E6] text-white text-[17px] font-medium px-12 py-6 rounded-[16px] shadow-[0_6px_20px_rgba(35,61,255,0.15)] hover:shadow-[0_8px_24px_rgba(35,61,255,0.2)] hover:scale-[1.02] transition-all w-full md:w-auto" 
            asChild
          >
            <Link href={buttonLink}>
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Optional Secondary CTA Link */}
        {secondaryLink && (
          <div className="text-center">
            <Link 
              href={secondaryLink}
              className="text-sm text-[#1A1F2B] opacity-60 hover:opacity-100 hover:text-[#233DFF] hover:underline transition-all duration-300 inline-flex items-center gap-1"
            >
              {secondaryLinkText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

