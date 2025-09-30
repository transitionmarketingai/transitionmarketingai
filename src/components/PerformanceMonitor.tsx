'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const monitorWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (lastEntry) {
            console.log('LCP:', lastEntry.startTime);
            
            // Send to analytics
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                name: 'LCP',
                value: Math.round(lastEntry.startTime),
                event_category: 'Web Vitals',
                event_label: 'Largest Contentful Paint'
              });
            }
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.log('LCP observer not supported');
        }
      }

      // First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            console.log('FID:', entry.processingStart - entry.startTime);
            
            // Send to analytics
            if ((window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(entry.processingStart - entry.startTime),
                event_category: 'Web Vitals',
                event_label: 'First Input Delay'
              });
            }
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.log('FID observer not supported');
        }
      }

      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          console.log('CLS:', clsValue);
          
          // Send to analytics
          if ((window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round(clsValue * 1000),
              event_category: 'Web Vitals',
              event_label: 'Cumulative Layout Shift'
            });
          }
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.log('CLS observer not supported');
        }
      }
    };

    // Monitor page load performance
    const monitorPageLoad = () => {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            const metrics = {
              dns: navigation.domainLookupEnd - navigation.domainLookupStart,
              tcp: navigation.connectEnd - navigation.connectStart,
              request: navigation.responseStart - navigation.requestStart,
              response: navigation.responseEnd - navigation.responseStart,
              dom: navigation.domContentLoadedEventEnd - navigation.navigationStart,
              load: navigation.loadEventEnd - navigation.navigationStart
            };
            
            console.log('Page Load Metrics:', metrics);
            
            // Send to analytics
            if ((window as any).gtag) {
              Object.entries(metrics).forEach(([key, value]) => {
                (window as any).gtag('event', 'page_load', {
                  name: key,
                  value: Math.round(value),
                  event_category: 'Performance',
                  event_label: key
                });
              });
            }
          }
        }, 0);
      });
    };

    // Monitor resource loading
    const monitorResources = () => {
      if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.duration > 1000) { // Log slow resources (>1s)
              console.log('Slow Resource:', {
                name: entry.name,
                duration: entry.duration,
                size: entry.transferSize
              });
              
              // Send to analytics
              if ((window as any).gtag) {
                (window as any).gtag('event', 'slow_resource', {
                  name: entry.name,
                  value: Math.round(entry.duration),
                  event_category: 'Performance',
                  event_label: 'Slow Resource'
                });
              }
            }
          });
        });
        
        try {
          resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
          console.log('Resource observer not supported');
        }
      }
    };

    // Monitor JavaScript errors
    const monitorErrors = () => {
      window.addEventListener('error', (event) => {
        console.error('JavaScript Error:', event.error);
        
        // Send to analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'exception', {
            description: event.error?.message || 'Unknown error',
            fatal: false,
            event_category: 'Error',
            event_label: 'JavaScript Error'
          });
        }
      });

      window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
        
        // Send to analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'exception', {
            description: event.reason?.message || 'Unhandled promise rejection',
            fatal: false,
            event_category: 'Error',
            event_label: 'Promise Rejection'
          });
        }
      });
    };

    // Initialize monitoring
    monitorWebVitals();
    monitorPageLoad();
    monitorResources();
    monitorErrors();

    // Cleanup function
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null; // This component doesn't render anything
}
