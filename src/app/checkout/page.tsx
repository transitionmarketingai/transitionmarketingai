"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import RazorpayButton from "@/components/RazorpayButton";

const PLANS = {
  "starter": { 
    name: "Starter", 
    price: "₹4,999/mo",
    amount: 4999,
    currency: "INR",
    features: [
      "200 qualified leads delivered monthly",
      "Choose from 8 industry templates",
      "AI-powered lead scoring & qualification",
      "Multi-channel nurture sequences",
      "WhatsApp, Email, LinkedIn outreach",
      "Real-time analytics dashboard",
      "Priority customer support",
      "All major Indian cities covered"
    ] 
  },
  "growth": { 
    name: "Growth", 
    price: "₹12,999/mo",
    amount: 12999,
    currency: "INR",
    features: [
      "500 qualified leads delivered monthly",
      "All industry templates + custom options",
      "Advanced AI lead qualification",
      "Complete lead management platform",
      "AI-powered nurture sequences",
      "Multi-language support (Hindi + Regional)",
      "Dedicated account manager",
      "API access for integrations"
    ] 
  },
  "enterprise": { 
    name: "Enterprise", 
    price: "₹24,999/mo",
    amount: 24999,
    currency: "INR",
    features: [
      "1000+ qualified leads delivered monthly",
      "Custom industry templates",
      "Advanced lead intelligence & insights",
      "Full CRM integration & automation",
      "Team collaboration & lead assignment",
      "Custom outreach campaigns",
      "White-label options available",
      "Dedicated success manager & SLA"
    ] 
  },
} as const;

type PlanId = keyof typeof PLANS;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CheckoutPageProps {}

function PaymentButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') as PlanId;
  const plan = planId ? PLANS[planId] : null;

  const handleSuccess = () => {
    router.push("/dashboard?welcome=true");
  };

  const handleError = (error: Error) => {
    console.error('Payment error:', error.message);
    // You could show a toast notification here
  };

  if (!plan) {
    return (
      <button
        disabled
        className="w-full sm:w-auto bg-gray-500 text-white font-bold px-10 py-4 rounded-2xl cursor-not-allowed text-lg"
      >
        Invalid Plan
      </button>
    );
  }

  return (
    <RazorpayButton
      teamId="demo-team"
      planId={planId}
      planPrice={plan.amount}
      planName={plan.name}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') as PlanId;
  const plan = planId ? PLANS[planId] : null;

  if (!plan) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <Link href="/" className="inline-flex items-center text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
            Plan Not Found
          </h1>
          <p className="text-slate-300 text-lg">
            The plan you&apos;re looking for doesn&apos;t exist or the link is invalid.
          </p>
        </div>
        
        <div className="rounded-3xl glass-effect p-12 text-center animate-scale-in">
          <div className="text-6xl mb-6">🔍</div>
          <p className="text-slate-300 mb-8 text-lg">
            Let&apos;s find the perfect plan for your business needs.
          </p>
          <Link
            href="/#pricing"
            className="bg-gradient-to-r from-cyan-500 to-green-500 text-slate-900 font-bold px-10 py-4 rounded-2xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 inline-block text-lg"
          >
            View Available Plans
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/" className="inline-flex items-center text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium mb-8">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
          Complete Your <span className="text-gradient">Lead Generation Setup</span>
        </h1>
        <p className="text-slate-300 text-lg">
          You&apos;re just one step away from getting qualified leads delivered to your inbox every month
        </p>
      </div>
      
      <div className="rounded-3xl glass-effect p-10 animate-scale-in">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-50 mb-4">
            {plan.name}
          </h2>
          <div className="text-5xl font-bold text-gradient mb-6">
            {plan.price}
          </div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Your first 50 leads FREE with trial
            </div>
        </div>
        
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-slate-50 mb-6 text-center">What&apos;s included:</h3>
          <ul className="space-y-4">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start text-slate-300">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center mb-10">
          <p className="text-slate-300 text-lg">
            💳 Secure payment • 🔒 Cancel anytime • 🚀 Start immediately
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <PaymentButton />
          <Link
            href="/#pricing"
            className="w-full sm:w-auto border-2 border-slate-600 text-slate-50 font-bold px-10 py-4 rounded-2xl hover:bg-slate-700/50 transition-all duration-300 text-center text-lg"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage({}: CheckoutPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
