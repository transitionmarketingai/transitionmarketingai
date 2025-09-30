// Analytics and monitoring utilities

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

class Analytics {
  private isEnabled: boolean;
  private apiKey: string | null;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.apiKey = process.env.ANALYTICS_API_KEY || null;
  }

  // Track page views
  trackPageView(url: string, title?: string) {
    if (!this.isEnabled) return;

    this.track('page_view', {
      url,
      title: title || document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });
  }

  // Track user actions
  track(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const eventData: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date(),
    };

    // Send to analytics service
    this.sendEvent(eventData);
  }

  // Track conversion events
  trackConversion(type: string, value?: number, currency = 'INR') {
    this.track('conversion', {
      type,
      value,
      currency,
    });
  }

  // Track errors
  trackError(error: Error, context?: Record<string, any>) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number, unit = 'ms') {
    this.track('performance', {
      metric,
      value,
      unit,
    });
  }

  // Send event to analytics service
  private async sendEvent(eventData: AnalyticsEvent) {
    try {
      // In production, send to your analytics service
      if (this.apiKey) {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });
      }
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Performance monitoring
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS((metric) => analytics.trackPerformance('CLS', metric.value));
    onINP((metric) => analytics.trackPerformance('INP', metric.value));
    onFCP((metric) => analytics.trackPerformance('FCP', metric.value));
    onLCP((metric) => analytics.trackPerformance('LCP', metric.value));
    onTTFB((metric) => analytics.trackPerformance('TTFB', metric.value));
  });
}

// Error boundary for React
export function trackReactError(error: Error, errorInfo: any) {
  analytics.trackError(error, {
    componentStack: errorInfo.componentStack,
    errorBoundary: true,
  });
}

// Track user interactions
export function trackUserInteraction(action: string, element?: string) {
  analytics.track('user_interaction', {
    action,
    element,
    timestamp: new Date().toISOString(),
  });
}

// Track business metrics
export function trackBusinessMetric(metric: string, value: number) {
  analytics.track('business_metric', {
    metric,
    value,
    timestamp: new Date().toISOString(),
  });
}
