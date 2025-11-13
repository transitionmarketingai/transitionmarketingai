"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hi, I want to start the 14-day Ads Sprint and get hot enquiries."
)}`;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold md:text-4xl">Something went wrong</h1>
          <p className="text-neutral-600">Try again, or contact us now.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => reset()} data-analytics-id="error_retry">
              Retry
            </Button>
            <Button asChild variant="ghost" data-analytics-id="error_whatsapp">
              <a href={WA}>
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="outline" data-analytics-id="error_start">
              <Link href="/consultation">Start Campaign</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
