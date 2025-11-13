import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  href?: string;
}

export default function Logo({ 
  size = 'md', 
  variant = 'full', 
  className = '',
  href = '/'
}: LogoProps) {
  // Size mappings for the SVG logo
  const logoDimensions = {
    sm: { width: 140, height: 40 },  // ~35% scale
    md: { width: 210, height: 60 },  // 50% scale (recommended)
    lg: { width: 280, height: 80 },  // ~67% scale
    xl: { width: 420, height: 120 }  // 100% scale
  };

  // Mobile: max 40px height, desktop: use size prop
  const dimensions = logoDimensions[size];

  // Create the logo image component with mobile responsiveness
  const LogoImage = (
    <Image
      src="/branding/logo-header.svg"
      alt="Transition Marketing AI"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className={`h-auto w-auto max-h-[40px] md:max-h-none ${className}`}
    />
  );

  // If variant is 'icon' or 'text', keep old behavior for backward compatibility
  // Otherwise return new logo
  if (variant === 'icon' || variant === 'text') {
    // Fallback to old text logo for icon/text variants
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl'
    };

    if (variant === 'text') {
      return (
        <Link href={href} className={`font-bold ${sizeClasses[size]} ${className}`}>
          <span className="text-[#0A3A8C]">Transition</span>
          <span className="text-gray-900"> Marketing AI</span>
        </Link>
      );
    }

    // Icon variant - use small logo
    return (
      <Link href={href} className="flex items-center">
        <Image
          src="/branding/logo-header.svg"
          alt="Transition Marketing AI"
          width={80}
          height={23}
          priority
          className="h-auto w-auto max-h-[32px]"
        />
      </Link>
    );
  }

  // Full variant (default) - use new logo with Link
  return (
    <Link href={href} className="flex items-center">
      {LogoImage}
    </Link>
  );
}
