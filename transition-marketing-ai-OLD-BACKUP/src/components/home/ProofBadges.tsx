"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";

const badges = [
  "Made in India",
  "DPDP & GDPR aware",
  "Transparent reporting",
  "No long-term lock-in",
];

export default function ProofBadges() {
  return (
    <Section className="pt-2">
      <motion.ul
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-700"
      >
        {badges.map((text) => (
          <li
            key={text}
            className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1"
          >
            {text}
          </li>
        ))}
      </motion.ul>
    </Section>
  );
}
