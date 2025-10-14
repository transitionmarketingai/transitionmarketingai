'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Target,
  CheckCircle,
  Settings,
  Home,
  Search,
  Facebook,
  Instagram,
  Chrome,
  Zap,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

export default function DashboardSidebarNew() {
  const pathname = usePathname();
  const [leadGenExpanded, setLeadGenExpanded] = useState(true);
  const [leadsExpanded, setLeadsExpanded] = useState(true);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  };

  return (
    <div className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* Logo */}
      <Link href="/" className="p-4 border-b">
        <Logo size="sm" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Overview */}
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname === '/dashboard'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <Home className="h-5 w-5" />
          <span>Overview</span>
        </Link>

        {/* LEAD GENERATION Section */}
        <div className="pt-4">
          <button
            onClick={() => setLeadGenExpanded(!leadGenExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
          >
            <span>Lead Generation</span>
            {leadGenExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {leadGenExpanded && (
            <div className="mt-1 space-y-1">
              {/* AI Scraping */}
              <Link
                href="/dashboard/lead-gen/ai-scraping"
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-gen/ai-scraping')
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4" />
                  <span>AI Scraping</span>
                </div>
              </Link>

              {/* Facebook */}
              <Link
                href="/dashboard/lead-gen/facebook"
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-gen/facebook')
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook Ads</span>
                </div>
              </Link>

              {/* Instagram */}
              <Link
                href="/dashboard/lead-gen/instagram"
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-gen/instagram')
                    ? 'bg-pink-50 text-pink-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram Ads</span>
                </div>
              </Link>

              {/* Google */}
              <Link
                href="/dashboard/lead-gen/google"
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-gen/google')
                    ? 'bg-red-50 text-red-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <Chrome className="h-4 w-4" />
                  <span>Google Ads</span>
                </div>
              </Link>

              {/* Other Methods */}
              <Link
                href="/dashboard/lead-gen/other"
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-gen/other')
                    ? 'bg-gray-50 text-gray-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4" />
                  <span>Other Methods</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* LEADS Section */}
        <div className="pt-4">
          <button
            onClick={() => setLeadsExpanded(!leadsExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
          >
            <span>Leads</span>
            {leadsExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {leadsExpanded && (
            <div className="mt-1 space-y-1">
              <Link
                href="/dashboard/leads"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  pathname === '/dashboard/leads'
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <CheckCircle className="h-4 w-4" />
                <span>All Leads</span>
              </Link>

              <Link
                href="/dashboard/leads/analytics"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/leads/analytics')
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Target className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="pt-4">
          <Link
            href="/dashboard/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === '/dashboard/settings'
                ? 'bg-gray-50 text-gray-700'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
        >
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

