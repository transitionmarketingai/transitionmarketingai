'use client';

import { useEffect, useState } from 'react';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function Loading({ 
  text = "Loading...", 
  size = 'md', 
  fullScreen = false 
}: LoadingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary border-t-transparent`} />
      <p className={`${textSizeClasses[size]} text-secondary font-medium`}>
        {text}{dots}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
}

// Skeleton components for better UX
export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-surface-elevated rounded w-3/4"></div>
        <div className="h-4 bg-surface-elevated rounded w-1/2"></div>
        <div className="h-20 bg-surface-elevated rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="card animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-surface-elevated rounded w-1/4"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-surface-elevated rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="space-y-4">
            <div className="h-4 bg-surface-elevated rounded w-1/2"></div>
            <div className="h-8 bg-surface-elevated rounded w-3/4"></div>
            <div className="h-3 bg-surface-elevated rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}


