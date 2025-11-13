"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hi, I want to start the 14-day Ads Sprint and get hot enquiries."
)}`;

export default function Hero() {
  return (
    <Section className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-5xl font-semibold tracking-tight"
      >
        We bring you hot, in-market enquiries.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="mt-3 md:mt-4 text-base md:text-lg text-neutral-600"
      >
        Meta + Google ads → real people who want your service. We verify by WhatsApp/phone and deliver fast.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-4 flex flex-wrap justify-center gap-2 text-sm"
      >
        <span className="rounded-full bg-neutral-100 px-3 py-1">Speed-to-lead &lt;5 min</span>
        <span className="rounded-full bg-neutral-100 px-3 py-1">95%+ valid emails</span>
        <span className="rounded-full bg-neutral-100 px-3 py-1">90%+ active phones</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        <Button data-analytics-id="hero_start" asChild>
          <a href="/consultation">Start Campaign</a>
        </Button>
        <Button data-analytics-id="hero_book" variant="outline" asChild>
          <a href="/consultation#calendar">Book a Call</a>
        </Button>
        <Button data-analytics-id="hero_whatsapp" variant="ghost" asChild>
          <a href={WA} aria-label="WhatsApp Us">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp Us
          </a>
        </Button>
      </motion.div>
    </Section>
  );
}
