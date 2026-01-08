import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-display-lg font-bold text-foreground mb-6">
          AI Marketing Agents for Your Business
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Automate content, ads, emails and analytics with specialised AI helpers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/signup">Start Free Trial</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/agents">Explore Agents</Link>
          </Button>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
        </div>
      </div>
    </section>
  );
}
