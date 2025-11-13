"use client";

import { useMemo } from "react";

interface CalendlyEmbedProps {
  className?: string;
  height?: number;
}

const FALLBACK_URL = "https://calendly.com";

export function CalendlyEmbed({ className, height = 700 }: CalendlyEmbedProps) {
  const url = useMemo(() => {
    const envUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
    if (!envUrl) {
      return FALLBACK_URL;
    }

    const calendlyUrl = new URL(envUrl);
    calendlyUrl.searchParams.set("hide_gdpr_banner", "1");
    calendlyUrl.searchParams.set("background_color", "ffffff");
    calendlyUrl.searchParams.set("text_color", "0f172a");
    calendlyUrl.searchParams.set("primary_color", "2563eb");
    return calendlyUrl.toString();
  }, []);

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

