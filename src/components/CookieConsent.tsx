'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

/**
 * Simple cookie consent banner
 * Only shows if analytics cookies are used
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    // Optionally disable analytics here
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700">
            <p className="font-semibold mb-1">We use cookies to improve your experience</p>
            <p className="text-slate-600">
              We use analytics cookies to understand how you use our site and improve our services. 
              By continuing, you agree to our use of cookies.{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="text-slate-700 border-slate-300"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Accept
          </Button>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

