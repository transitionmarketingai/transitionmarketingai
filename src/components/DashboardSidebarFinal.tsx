'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  LayoutDashboard,
  Target,
  Users,
  Send,
  MessageCircle,
  BarChart3,
  Settings,
  Search,
  Facebook,
  Instagram,
  Chrome,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function DashboardSidebarFinal() {
  const pathname = usePathname();
  const [leadGenExpanded, setLeadGenExpanded] = useState(true);

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
      <nav className="flex-1 p-4 space-y-1">
        {/* Dashboard Overview */}
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname === '/dashboard'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        {/* LEAD GENERATION Section */}
        <div className="pt-3">
          <button
            onClick={() => setLeadGenExpanded(!leadGenExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Lead Generation</span>
            </div>
            {leadGenExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {leadGenExpanded && (
            <div className="mt-1 space-y-1 ml-2">
              {/* AI Scraping */}
              <Link
                href="/dashboard/lead-generation/ai-search"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-generation/ai-search')
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Search className="h-4 w-4" />
                <span>AI Search</span>
              </Link>

              {/* Facebook */}
              <Link
                href="/dashboard/lead-generation/facebook"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-generation/facebook')
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </Link>

              {/* Instagram */}
              <Link
                href="/dashboard/lead-generation/instagram"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-generation/instagram')
                    ? 'bg-pink-50 text-pink-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </Link>

              {/* Google */}
              <Link
                href="/dashboard/lead-generation/google"
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive('/dashboard/lead-generation/google')
                    ? 'bg-red-50 text-red-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Chrome className="h-4 w-4" />
                <span>Google</span>
              </Link>
            </div>
          )}
        </div>

        {/* LEADS */}
        <Link
          href="/dashboard/leads"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/leads')
              ? 'bg-green-50 text-green-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <Users className="h-5 w-5" />
          <span>Leads</span>
        </Link>

        {/* OUTREACH */}
        <Link
          href="/dashboard/outreach"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/outreach')
              ? 'bg-orange-50 text-orange-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <Send className="h-5 w-5" />
          <span>Outreach</span>
        </Link>

        {/* CONVERSATIONS */}
        <Link
          href="/dashboard/conversations"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/conversations')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <MessageCircle className="h-5 w-5" />
          <span>Conversations</span>
        </Link>

        {/* ANALYTICS */}
        <Link
          href="/dashboard/analytics"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/analytics')
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Analytics</span>
        </Link>

        {/* Divider */}
        <div className="pt-3 pb-1">
          <div className="border-t"></div>
        </div>

        {/* SETTINGS */}
        <Link
          href="/dashboard/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/settings')
              ? 'bg-gray-50 text-gray-700'
              : 'text-gray-600 hover:bg-gray-50'
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t bg-gray-50">
        <div className="text-xs text-gray-500 mb-2">Need help?</div>
        <Link
          href="/help"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

