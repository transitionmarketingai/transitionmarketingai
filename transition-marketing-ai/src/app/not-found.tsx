"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hi, I want to start the 14-day Ads Sprint and get hot enquiries."
)}`;

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 text-center">
      <div className="space-y-5">
        <h1 className="text-3xl font-semibold md:text-4xl">Page not found</h1>
        <p className="text-neutral-600">Let’s get you back to enquiries.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild data-analytics-id="404_start">
            <Link href="/consultation">Start Campaign</Link>
          </Button>
          <Button asChild variant="ghost" data-analytics-id="404_whatsapp">
            <a href={WA}>
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </a>
          </Button>
          <Button asChild variant="outline" data-analytics-id="404_home">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
