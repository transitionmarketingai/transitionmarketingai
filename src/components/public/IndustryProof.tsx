'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';

interface IndustryProofProps {
  industryName?: string;
  proofCards?: Array<{
    metric: string;
    description: string;
    client: string;
    icon: any;
  }>;
}

export default function IndustryProof({ industryName, proofCards: customProofCards }: IndustryProofProps) {
  // Placeholder proof cards - will be customized per industry later
  const defaultProofCards = [
    {
      metric: "60+ verified inquiries delivered",
      description: "Converted into X results",
      client: "Placeholder Name, City",
      icon: TrendingUp,
    },
    {
      metric: "Verified qualified prospects delivered in 30 days",
      description: "All inquiries verified and ready to convert",
      client: "Client Name, Location",
      icon: CheckCircle,
    }
  ];

  const proofCards = customProofCards || defaultProofCards;

  return (
    <section className="py-[120px] md:py-[160px] px-4 md:px-8 bg-white">
      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1A1F2B] opacity-60 font-semibold mb-4">
            RESULTS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1F2B] mb-5 leading-[1.1] tracking-tight">
            What Our Clients Achieved
          </h2>
          <p className="text-lg text-[#1A1F2B] opacity-90 max-w-2xl leading-[1.5]">
            Real verified inquiries delivered across India.
          </p>
        </div>

        {/* Proof Cards Grid - 2 cards on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {proofCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card key={idx} className="border border-[#E4E7EC] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-500 ease-out">
                <CardContent className="p-8 lg:p-10">
                  <div className="flex flex-col">
                    {/* Icon */}
                    <div className="w-[60px] h-[60px] rounded-full bg-[#F5F6FA] flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-[#233DFF]" strokeWidth={2} />
                    </div>

                    {/* Metric */}
                    <h3 className="text-2xl font-bold text-[#1A1F2B] mb-3 leading-tight">
                      {card.metric}
                    </h3>

                    {/* Description */}
                    <p className="text-[#1A1F2B] opacity-90 mb-4 leading-[1.5]">
                      {card.description}
                    </p>

                    {/* Client Name */}
                    <p className="text-sm text-[#1A1F2B] opacity-60 font-medium">
                      {card.client}
                    </p>
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

