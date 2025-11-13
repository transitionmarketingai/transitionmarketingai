"use client";

import { useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  push?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: FbqFunction;
  }
}

export function AnalyticsProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (GTM_ID) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(gtmScript);
    }

    if (GA_ID) {
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(gtagScript);

      const inline = document.createElement("script");
      inline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `;
      document.head.appendChild(inline);
    }

    if (META_ID) {
      if (!window.fbq) {
        const fbq: FbqFunction = (...args: unknown[]) => {
          if (fbq.callMethod) {
            fbq.callMethod(...args);
          } else {
            fbq.queue.push(args);
          }
        };
        fbq.queue = [];
        fbq.loaded = true;
        fbq.version = "2.0";
        window.fbq = fbq;

        const pixelScript = document.createElement("script");
        pixelScript.async = true;
        pixelScript.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(pixelScript);
      }

      window.fbq?.("init", META_ID);
      window.fbq?.("track", "PageView");
    }
  }, []);

  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

export function trackEvent(name: string, data: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, data);
  }

  try {
    window.dataLayer?.push({ event: name, ...data });
    window.gtag?.("event", name, data);
    window.fbq?.("trackCustom", name, data);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] error", error);
    }
  }
}

export function useClickTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      let current: HTMLElement | null = target;
      let tracked: HTMLElement | null = null;

      while (current) {
        if (current.dataset.analyticsId) {
          tracked = current;
          break;
        }
        current = current.parentElement;
      }

      if (!tracked) return;

      const id = tracked.dataset.analyticsId ?? null;
      if (!id) return;

      const anchor = tracked.closest("a") as HTMLAnchorElement | null;
      const href = anchor?.href ?? (tracked instanceof HTMLAnchorElement ? tracked.href : undefined);
      const text = (anchor?.textContent ?? tracked.textContent ?? "").trim();

      trackEvent("cta_click", { id, href, text });
    };

    const options: AddEventListenerOptions = { capture: true };
    document.addEventListener("click", handler, options);

    return () => {
      document.removeEventListener("click", handler, options);
    };
  }, []);
}
