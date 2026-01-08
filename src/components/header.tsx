'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link 
            href="/" 
            className="text-xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            aria-label="TransitionMarketingAI - Home"
          >
            TransitionMarketingAI
          </Link>
          <nav 
            className="hidden md:flex items-center space-x-6"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              href="/agents"
              className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            >
              Agents
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            >
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/signup" aria-label="Get started with TransitionMarketingAI">
              Get Started
            </Link>
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container py-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current="page"
            >
              Home
            </Link>
            <Link
              href="/agents"
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Agents
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
