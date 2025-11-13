/**
 * Analytics & Event Tracking Utilities
 * Handles GA4, Meta Pixel, and custom event tracking
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Track custom events (pushes to dataLayer for GTM)
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  // Also track in GA4 if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Track in Meta Pixel if available
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventParams);
  }
}

/**
 * Track onboarding form submission
 */
export function trackOnboardingSubmit(data: {
  industry?: string;
  score?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}) {
  trackEvent('onboarding_submit', {
    industry: data.industry,
    lead_score: data.score,
    utm_source: data.utmSource,
    utm_medium: data.utmMedium,
    utm_campaign: data.utmCampaign,
  });
}

/**
 * Track Calendly booking
 */
export function trackCalendlyBooking() {
  trackEvent('calendly_booking', {
    event_category: 'conversion',
    event_label: 'consultation_booked',
  });
}

/**
 * Track WhatsApp click
 */
export function trackWhatsAppClick() {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'whatsapp_contact',
  });
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string) {
  trackEvent('page_view', {
    page_path: url,
    page_title: title || document.title,
  });
}

/**
 * Get UTM parameters from URL
 */
export function getUTMParams(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
} {
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const utm: any = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      // Store in localStorage for later use
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        // Ignore localStorage errors
      }
    } else {
      // Try to get from localStorage if not in URL
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          utm[key] = stored;
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  });

  return utm;
}

/**
 * Get stored UTM parameters (from localStorage)
 */
export function getStoredUTMParams(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
} {
  if (typeof window === 'undefined') {
    return {};
  }

  const utm: any = {};

  try {
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        utm[key] = stored;
      }
    });
  } catch (e) {
    // Ignore localStorage errors
  }

  return utm;
}

/**
 * A/B Test variant selection (consistent per user)
 */
export function getABTestVariant(testName: string, variants: string[]): string {
  if (typeof window === 'undefined') {
    return variants[0];
  }

  const storageKey = `ab_test_${testName}`;
  
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && variants.includes(stored)) {
      return stored;
    }

    // Assign variant consistently based on user ID (or random)
    const userHash = Math.random().toString(36).substring(7);
    const variantIndex = userHash.charCodeAt(0) % variants.length;
    const selectedVariant = variants[variantIndex];

    localStorage.setItem(storageKey, selectedVariant);
    return selectedVariant;
  } catch (e) {
    // Fallback to first variant if localStorage fails
    return variants[0];
  }
}

