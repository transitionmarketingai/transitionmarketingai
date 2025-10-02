'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="relative z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {mounted ? (
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                <span className="text-blue-600">Transition</span> CRM
              </Link>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">Transition</span> CRM
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Dashboard
              </Link>
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center">
                  Products
                  {mounted && (
                    <svg className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {/* Dropdown menu would be implemented here */}
              </div>
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center">
                  Pricing
                  {mounted && (
                    <svg className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center">
                  Resources
                  {mounted && (
                    <svg className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center">
                  About
                  {mounted && (
                    <svg className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="relative group">
                <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Help
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                English (US)
              </button>
            </div>
            <Link
              href="/signin"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Try it free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-gray-200">
              <Link href="/products" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Products
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Pricing
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                About
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                Help
              </Link>
              <div className="border-t border-gray-200 pt-4">
                <div className="px-3 pb-2">
                  <select className="text-gray-600 text-sm bg-transparent border-none outline-none">
                    <option>English (US)</option>
                    <option>हिंदी</option>
                  </select>
                </div>
                <Link href="/signin" className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors">
                  Log in
                </Link>
                <Link href="/signup" className="bg-blue-600 text-white block px-3 py-2 text-base font-medium rounded-lg mt-2 hover:bg-blue-700 transition-all duration-300">
                  Try it free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}