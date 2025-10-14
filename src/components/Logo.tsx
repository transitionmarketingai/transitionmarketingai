import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export default function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Modern professional icon with upward arrow/growth symbol
  const LogoIcon = ({ className: iconClass = '' }: { className?: string }) => (
    <div className={`bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-md ${iconClass}`}>
      <svg viewBox="0 0 48 48" fill="none" className="w-4/5 h-4/5">
        {/* Upward trending arrow */}
        <path 
          d="M8 36 L18 26 L26 30 L40 12" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Arrow head */}
        <path 
          d="M32 12 L40 12 L40 20" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Data points */}
        <circle cx="8" cy="36" r="2.5" fill="white" />
        <circle cx="18" cy="26" r="2.5" fill="white" />
        <circle cx="26" cy="30" r="2.5" fill="white" />
        <circle cx="40" cy="12" r="3" fill="#FFD700" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon className={`${iconSizes[size]} ${className}`} />;
  }

  if (variant === 'text') {
    return (
      <div className={`font-bold ${sizeClasses[size]} ${className}`}>
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Transition
        </span>
        <span className="text-gray-900"> Marketing AI</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon className={iconSizes[size]} />
      <div>
        <div className={`font-bold ${sizeClasses[size]} leading-tight`}>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Transition
          </span>
        </div>
        <div className={`font-bold ${sizeClasses[size]} leading-tight`}>
          <span className="text-gray-700">Marketing AI</span>
        </div>
      </div>
    </div>
  );
}
