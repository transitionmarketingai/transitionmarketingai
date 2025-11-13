"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WA2 = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hi, I want to start the 14-day Ads Sprint and get hot enquiries."
)}`;

export default function FinalCTA() {
  return (
    <Section className="rounded-2xl bg-neutral-50 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl md:text-4xl font-semibold"
      >
        Ready to start this week?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="mt-2 text-neutral-600"
      >
        Kick off a 14-day Ads Sprint. We launch, verify, and share results daily.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-5 flex flex-wrap items-center justify-center gap-3"
      >
        <Button data-analytics-id="final_start" asChild>
          <a href="/consultation">Start Campaign</a>
        </Button>
        <Button data-analytics-id="final_whatsapp" variant="ghost" asChild>
          <a href={WA2} aria-label="WhatsApp Us">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp Us
          </a>
        </Button>
        <Button data-analytics-id="final_book" variant="outline" asChild>
          <a href="/consultation#calendar">Book a Call</a>
        </Button>
      </motion.div>
    </Section>
  );
}
