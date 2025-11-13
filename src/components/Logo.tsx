import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  href?: string;
  theme?: 'light' | 'dark'; // 'light' = dark logo on light bg, 'dark' = white logo on dark bg
}

export default function Logo({ 
  size = 'md', 
  variant = 'full', 
  className = '',
  href = '/',
  theme = 'light' // default to light theme (dark logo)
}: LogoProps) {
  // Size mappings for the SVG logo
  const logoDimensions = {
    sm: { width: 140, height: 40 },  // ~35% scale
    md: { width: 210, height: 60 },  // 50% scale (recommended)
    lg: { width: 280, height: 80 },  // ~67% scale
    xl: { width: 420, height: 120 }  // 100% scale
  };

  const iconDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 }
  };

  // Mobile: max 40px height, desktop: use size prop
  const dimensions = logoDimensions[size];
  const iconDims = iconDimensions[size];

  // Determine which logo file to use based on variant and theme
  const getLogoSrc = () => {
    if (variant === 'icon') {
      return theme === 'dark' ? '/branding/logo-icon-white.svg' : '/branding/logo-icon.svg';
    }
    return theme === 'dark' ? '/branding/logo-header-white.svg' : '/branding/logo-header.svg';
  };

  // If variant is 'text', return text-only version
  if (variant === 'text') {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl'
    };

    return (
      <Link href={href} className={`font-bold ${sizeClasses[size]} ${className}`}>
        <span className="text-[#0A3A8C]">Transition</span>
        <span className="text-gray-900"> Marketing AI</span>
      </Link>
    );
  }

  // Create the logo image component with mobile responsiveness
  const LogoImage = variant === 'icon' ? (
    <Image
      src={getLogoSrc()}
      alt="Transition Marketing AI"
      width={iconDims.width}
      height={iconDims.height}
      priority
      className={`h-auto w-auto ${className}`}
    />
  ) : (
    <Image
      src={getLogoSrc()}
      alt="Transition Marketing AI"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className={`h-auto w-auto max-h-[40px] md:max-h-none ${className}`}
    />
  );

  // Icon or Full variant - wrap in Link and return
  return (
    <Link href={href} className="flex items-center">
      {LogoImage}
    </Link>
  );
}
