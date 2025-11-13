"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { getWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const href = getWhatsAppUrl();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/40 transition-colors hover:bg-accent/90"
      aria-label="Chat with Transition Marketing AI on WhatsApp"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <MessageCircle className="size-5" />
      WhatsApp Us
    </motion.a>
  );
}
