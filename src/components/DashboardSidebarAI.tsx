'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Bot,
  Send,
  MessageCircle,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function DashboardSidebarAI() {
  const pathname = usePathname();

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

      {/* AI Badge */}
      <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span className="font-semibold text-purple-900">AI Autopilot Active</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">Finding prospects daily at 9 AM</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {/* Dashboard */}
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

        {/* AI Prospects */}
        <Link
          href="/dashboard/ai-prospects"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/ai-prospects')
              ? 'bg-purple-50 text-purple-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <Bot className="h-5 w-5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>AI Prospects</span>
              <span className="text-xs bg-purple-600 text-white rounded-full px-2 py-0.5">
                10 New
              </span>
            </div>
          </div>
        </Link>

        {/* AI Outreach */}
        <Link
          href="/dashboard/ai-outreach"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/ai-outreach')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <Send className="h-5 w-5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>AI Outreach</span>
              <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
                5 Pending
              </span>
            </div>
          </div>
        </Link>

        {/* Conversations */}
        <Link
          href="/dashboard/conversations"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/conversations')
              ? 'bg-green-50 text-green-700'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <MessageCircle className="h-5 w-5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>Conversations</span>
              <span className="text-xs bg-green-600 text-white rounded-full px-2 py-0.5">
                3
              </span>
            </div>
          </div>
        </Link>

        {/* Analytics */}
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

        {/* Settings */}
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

      {/* Bottom - AI Stats */}
      <div className="p-4 border-t bg-gray-50">
        <div className="text-xs text-gray-500 mb-2">AI Activity Today</div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Prospects found:</span>
            <span className="font-semibold text-purple-600">10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Emails sent:</span>
            <span className="font-semibold text-blue-600">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Responses:</span>
            <span className="font-semibold text-green-600">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

