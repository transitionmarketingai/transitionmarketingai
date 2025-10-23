'use client';

import { useState } from 'react';
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
  Zap,
  Users,
  Target,
  Mail,
  Phone,
  Globe,
  TrendingUp,
  Folder,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DashboardSidebarAI() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  };

  return (
    <div className={cn(
      "bg-white border-r border-slate-200 min-h-screen flex flex-col transition-all duration-300 relative",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border border-slate-200 bg-white p-0 hover:bg-slate-50 shadow-sm"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Logo */}
      <Link href="/dashboard" className="p-4 border-b border-slate-200">
        {collapsed ? (
          <div className="flex justify-center">
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
        ) : (
          <Logo size="sm" />
        )}
      </Link>

      {/* AI Badge */}
      {!collapsed && (
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-blue-900">AI Autopilot Active</span>
          </div>
          <p className="text-xs text-slate-600 mt-1">Finding prospects 24/7</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* Main Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Overview
          </div>
          
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === '/dashboard'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50',
              collapsed && 'justify-center'
            )}
            title="Dashboard"
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </div>

        {/* Lead Pipeline Section */}
        <div className="mb-4">
          {!collapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Lead Pipeline
            </div>
          )}

          {/* AI Prospects (Locked - Need to Unlock) */}
          <Link
            href="/dashboard/prospects"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/prospects')
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Bot className="h-5 w-5" />
            <div className="flex-1 flex items-center justify-between">
              <span>New Prospects</span>
              <Badge className="bg-purple-600 text-white text-xs">
                10 🔒
              </Badge>
            </div>
          </Link>

          {/* My Leads (Unlocked Contacts) */}
          <Link
            href="/dashboard/leads"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/leads')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Users className="h-5 w-5" />
            <div className="flex-1 flex items-center justify-between">
              <span>My Leads</span>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
                24
              </Badge>
            </div>
          </Link>

          {/* Campaigns */}
          <Link
            href="/dashboard/campaigns"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/campaigns')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Target className="h-5 w-5" />
            <div className="flex-1 flex items-center justify-between">
              <span>Campaigns</span>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                3 Active
              </Badge>
            </div>
          </Link>
        </div>

        {/* Outreach Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Outreach
          </div>

          {/* Conversations */}
          <Link
            href="/dashboard/conversations"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/conversations')
                ? 'bg-green-50 text-green-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <MessageCircle className="h-5 w-5" />
            <div className="flex-1 flex items-center justify-between">
              <span>Conversations</span>
              <Badge className="bg-green-600 text-white text-xs">
                3
              </Badge>
            </div>
          </Link>

          {/* Phone Calls */}
          <Link
            href="/dashboard/calls"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/calls')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Phone className="h-5 w-5" />
            <span>Phone Calls</span>
          </Link>

          {/* Email Campaigns */}
          <Link
            href="/dashboard/email-campaigns"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/email-campaigns')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Mail className="h-5 w-5" />
            <span>Email Campaigns</span>
          </Link>

          {/* WhatsApp */}
          <Link
            href="/dashboard/whatsapp"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/whatsapp')
                ? 'bg-green-50 text-green-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
          </Link>
        </div>

        {/* AI Tools Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            AI Tools
          </div>

          {/* AI Ad Generator */}
          <Link
            href="/dashboard/ai-ad-generator"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/ai-ad-generator')
                ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Zap className="h-5 w-5" />
            <span>AI Ad Generator</span>
          </Link>

          {/* AI Outreach Assistant */}
          <Link
            href="/dashboard/ai-outreach"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/ai-outreach')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Send className="h-5 w-5" />
            <span>AI Outreach</span>
          </Link>
        </div>

        {/* Analytics Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Analytics
          </div>

          {/* Analytics */}
          <Link
            href="/dashboard/analytics"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/analytics')
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>

          {/* Reports */}
          <Link
            href="/dashboard/reports"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/reports')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <FileText className="h-5 w-5" />
            <span>Reports</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="py-2">
          <div className="border-t border-slate-200"></div>
        </div>

        {/* Settings */}
        <Link
          href="/dashboard/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname?.startsWith('/dashboard/settings')
              ? 'bg-slate-50 text-slate-900'
              : 'text-slate-600 hover:bg-slate-50'
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Bottom - Credits & Activity */}
      <div className="p-4 border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-xs text-slate-500 mb-3 font-medium flex items-center justify-between">
          <span>Your Credits</span>
          <Link href="/dashboard/settings" className="text-blue-600 hover:text-blue-700 font-semibold">
            Buy More
          </Link>
        </div>
        <div className="space-y-3">
          {/* Credit Balance */}
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Available Credits</span>
              <span className="text-lg font-bold text-slate-900">1,250</span>
            </div>
            <div className="mt-2 bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: '62%' }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">62% remaining</p>
          </div>

          {/* Today's Activity */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Prospects found:</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-purple-600" />
                <span className="font-semibold text-purple-600">10</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Leads unlocked:</span>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-blue-600" />
                <span className="font-semibold text-blue-600">5</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Calls made:</span>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-green-600" />
                <span className="font-semibold text-green-600">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
