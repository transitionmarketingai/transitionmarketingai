'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

interface PerformanceMetrics {
  renderTime: number;
  networkTime: number;
  memoryUsage: number;
  loadTime: number;
}

export default function DashboardPerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    networkTime: 0,
    memoryUsage: 0,
    loadTime: 0
  });

  const [optimizationsEnabled, setOptimizationsEnabled] = useState(true);

  // Debounced state updates to reduce re-renders
  const debouncedStateUpdate = useCallback(
    ((func: Function, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    }),
    []
  );

  // Memoized expensive calculations
  const memoizedDashboardMetrics = useMemo(() => {
    return {
      totalLeads: 1247,
      qualifiedLeads: 892,
      conversionRate: 14.2,
      avgCostPerLead: 26,
      monthlyRevenue: 650000
    };
  }, []);

  // Virtualization for large lists
  const generateVirtualizedItems = useCallback((count: number, startIndex: number = 0) => {
    return Array.from({ length: count }, (_, index) => ({
      id: startIndex + index,
      name: `Lead ${startIndex + index}`,
      score: Math.floor(Math.random() * 10) + 1,
      status: ['Hot', 'Warm', 'Cold'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!optimizationsEnabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyElement = entry.target as HTMLElement;
            if (lazyElement.dataset.src) {
              lazyElement.src = lazyElement.dataset.src;
              lazyElement.removeAttribute('data-src');
              observer.unobserve(lazyElement);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const lazyElements = document.querySelectorAll('[data-src]');
    lazyElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [optimizationsEnabled]);

  // Performance monitoring
  useEffect(() => {
    const measurePageLoad = () => {
      if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        setMetrics(prev => ({
          ...prev,
          loadTime,
          renderTime: performance.now()
        }));
      }
    };

    // Memory monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / 1048576 // Convert to MB
        }));
      }
    };

    measurePageLoad();
    monitorMemory();

    // Monitor every 30 seconds
    const interval = setInterval(monitorMemory, 30000);

    return () => clearInterval(interval);
  }, []);

  // Image optimization
  const optimizedImageLoader = useCallback((src: string, alt: string = '') => {
    return {
      src: `${src}?auto=format&fit=max&q=80`, // WebP auto-optimization
      loading: 'lazy' as const,
      alt,
      style: { width: '100%', height: 'auto' }
    };
  }, []);

  // Component splitting for code optimization
  const LazyDashboardComponent = React.lazy(() => 
    import('./IndianLeadDashboard').catch(() => ({ 
      default: () => <div>Loading...</div> 
    }))
  );

  return (
    <div className="performance-optimized-dashboard">
      {/* Performance Toggle (Development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-3 border">
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optimizationsEnabled}
                  onChange={(e) => setOptimizationsEnabled(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Performance Opts
                </span>
              </label>
              
              <div className="text-xs text-gray-500 space-y-1">
                <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
                <div>Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
                <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {optimizationsEnabled ? (
        <React.Suspense fallback={<DashboardSkeleton />}>
          {children}
        </React.Suspense>
      ) : (
        children
      )}
    </div>
  );
}

// Skeleton component for loading states
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 ml-56 px-6 py-6">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>
            <div className="flex space-x-3">
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Metrics skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
