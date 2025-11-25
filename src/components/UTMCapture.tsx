'use client';

import { useEffect } from 'react';

/**
 * UTMCapture Component
 * 
 * Captures UTM parameters from URL and stores them in localStorage.
 * Runs on every page load to persist UTM values across navigation.
 */
export function UTMCapture() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    keys.forEach((key) => {
      const val = params.get(key);
      if (val) {
        try {
          localStorage.setItem(key, val);
        } catch (e) {
          // Ignore localStorage errors (e.g., private browsing mode)
        }
      }
    });
  }, []);

  return null;
}

