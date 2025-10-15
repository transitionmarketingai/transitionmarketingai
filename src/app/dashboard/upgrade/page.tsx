'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SubscriptionUpgrade from '@/components/SubscriptionUpgrade';

export default function UpgradePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upgrade Your Plan</h1>
          <p className="text-gray-600 mt-1">Choose the plan that fits your business</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Subscription Plans */}
      <SubscriptionUpgrade />

      {/* FAQ */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="font-semibold mb-2">Can I change plans later?</div>
            <p className="text-sm text-gray-600">
              Yes! You can upgrade anytime (takes effect immediately) or downgrade at the end of your billing cycle.
            </p>
          </div>
          <div className="border-b pb-4">
            <div className="font-semibold mb-2">Do I pay for ads separately?</div>
            <p className="text-sm text-gray-600">
              Yes. Your subscription covers platform access only. Ad spend on Facebook, Instagram, or Google is charged directly by those platforms to your connected accounts.
            </p>
          </div>
          <div className="border-b pb-4">
            <div className="font-semibold mb-2">What happens when I upgrade?</div>
            <p className="text-sm text-gray-600">
              Your new limits take effect immediately. You'll be charged prorated for the remainder of your billing cycle.
            </p>
          </div>
          <div className="pb-4">
            <div className="font-semibold mb-2">Can I cancel anytime?</div>
            <p className="text-sm text-gray-600">
              Yes. You can cancel anytime from your settings. You'll have access until the end of your billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

