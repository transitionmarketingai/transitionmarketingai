"use client";

import { useClickTracking } from "@/lib/analytics";

export function GlobalClickTracker() {
  useClickTracking();
  return null;
}
