"use client";

import { useMemo, useEffect } from "react";

interface CalendlyEmbedProps {
  className?: string;
  height?: number;
  url?: string;
  onEventScheduled?: () => void;
}

const FALLBACK_URL = "https://calendly.com";

export function CalendlyEmbed({ className, height = 700, url: customUrl, onEventScheduled }: CalendlyEmbedProps) {
  const url = useMemo(() => {
    const envUrl = customUrl || process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
    if (!envUrl) {
      return FALLBACK_URL;
    }

    const calendlyUrl = new URL(envUrl);
    calendlyUrl.searchParams.set("hide_gdpr_banner", "1");
    calendlyUrl.searchParams.set("background_color", "ffffff");
    calendlyUrl.searchParams.set("text_color", "0f172a");
    calendlyUrl.searchParams.set("primary_color", "2563eb");
    return calendlyUrl.toString();
  }, [customUrl]);

  // Listen for Calendly events
  useEffect(() => {
    if (typeof window === 'undefined' || !onEventScheduled) return;

    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        onEventScheduled();
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [onEventScheduled]);

  return (
    <iframe
      id="calendly-embed"
      title="Book a consultation"
      src={url}
      className={className}
      height={height}
      loading="lazy"
      allowFullScreen
      style={{ width: "100%", border: "none" }}
    />
  );
}

