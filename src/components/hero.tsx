import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-display-lg font-bold text-foreground mb-6">
          Stop Buying Leads. Get Verified Inquiries Ready to Talk.
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          We generate 30-50 verified, high-intent inquiries for your business in 30 days using our AI Verification Engine™.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="#contact">Get Your Free Strategy Scan</Link>
          </Button>
        </div>
        <div className="mt-8 flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span> Verified Intent
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span> Identity Validated
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span> Payment Verified
          </div>
        </div>
      </div>
    </section>
  );
}
