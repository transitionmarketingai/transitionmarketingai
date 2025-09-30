"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, trackWebVitals } from "@/lib/analytics";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    analytics.trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    // Track Web Vitals
    trackWebVitals();
  }, []);

  return <>{children}</>;
}
