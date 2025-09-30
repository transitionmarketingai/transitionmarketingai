import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Strategy Call — Transition Marketing AI",
  description: "Schedule your consultation to plan automated AI marketing systems.",
};

export default function BookPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      {/* Enhanced Breadcrumb */}
      <Link href="/" className="inline-flex items-center text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium mb-8">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      {/* Enhanced Header */}
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 mb-6">
          Book a <span className="text-gradient">Strategy Call</span>
        </h1>
        <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
          Pick a time that works for you. We&apos;ll review your goals and show you how the automations fit your business.
        </p>
      </div>

      {/* Enhanced Scheduling Section */}
      <div className="rounded-3xl glass-effect p-8 animate-scale-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-50 mb-4">
            🗓️ Choose Your Preferred Time
          </h2>
          <p className="text-slate-300 text-lg">
            All times are shown in IST. We&apos;ll confirm the exact time over email.
          </p>
        </div>
        
        <div className="relative w-full" style={{ minHeight: 700 }}>
          <iframe
            src="https://calendly.com/transitionmarketingai/30min"
            title="Schedule a call — Transition Marketing AI"
            className="absolute inset-0 h-full w-full rounded-2xl"
            frameBorder={0}
            allow="fullscreen"
            aria-label="Scheduling embed"
          />
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Don&apos;t see your timezone? We&apos;ll confirm over email.
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: "🎯",
            title: "Goal Review",
            description: "We&apos;ll understand your business objectives and marketing challenges"
          },
          {
            icon: "⚙️",
            title: "Automation Demo",
            description: "See how our AI systems can work specifically for your industry"
          },
          {
            icon: "📈",
            title: "Custom Plan",
            description: "Get a tailored recommendation for your business needs"
          }
        ].map((item, index) => (
          <div 
            key={index}
            className="text-center p-6 rounded-2xl glass-effect animate-fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-slate-50 mb-3">{item.title}</h3>
            <p className="text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

