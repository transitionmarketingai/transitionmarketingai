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
        {/* Overview Section */}
        <div className="mb-4">
          {!collapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overview
            </div>
          )}
          
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
                : 'text-slate-700 hover:bg-slate-50',
              collapsed && 'justify-center'
            )}
            title="New Prospects"
          >
            <Bot className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between">
                <span>New Prospects</span>
                <Badge className="bg-purple-600 text-white text-xs">
                  10 🔒
                </Badge>
              </div>
            )}
          </Link>

          {/* My Leads (Unlocked Contacts) */}
          <Link
            href="/dashboard/leads"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/leads')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50',
              collapsed && 'justify-center'
            )}
            title="My Leads"
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between">
                <span>My Leads</span>
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
                  24
                </Badge>
              </div>
            )}
          </Link>

          {/* Campaigns */}
          <Link
            href="/dashboard/campaigns"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/campaigns')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50',
              collapsed && 'justify-center'
            )}
            title="Campaigns"
          >
            <Target className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between">
                <span>Campaigns</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                  3 Active
                </Badge>
              </div>
            )}
          </Link>
        </div>

        {/* Outreach Section - Coming Soon */}
        <div className="mb-4">
          {!collapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Outreach</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700">
                Soon
              </Badge>
            </div>
          )}

          {/* Email Campaigns */}
          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed',
              collapsed && 'justify-center'
            )}
            title="Email Campaigns (Coming Soon)"
          >
            <Mail className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between">
                <span>Email Campaigns</span>
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed',
              collapsed && 'justify-center'
            )}
            title="WhatsApp (Coming Soon)"
          >
            <MessageCircle className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>WhatsApp</span>}
          </div>

          {/* Phone Calls */}
          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed',
              collapsed && 'justify-center'
            )}
            title="Phone Calls (Coming Soon)"
          >
            <Phone className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Phone Calls</span>}
          </div>
        </div>

        {/* AI Tools Section - Coming Soon */}
        <div className="mb-4">
          {!collapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>AI Tools</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700">
                Soon
              </Badge>
            </div>
          )}

          {/* AI Ad Generator */}
          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed',
              collapsed && 'justify-center'
            )}
            title="AI Ad Generator (Coming Soon)"
          >
            <Zap className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>AI Ad Generator</span>}
          </div>

          {/* AI Outreach Assistant */}
          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed',
              collapsed && 'justify-center'
            )}
            title="AI Outreach (Coming Soon)"
          >
            <Send className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>AI Outreach</span>}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mb-4">
          {!collapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Analytics
            </div>
          )}

          {/* Analytics */}
          <Link
            href="/dashboard/analytics"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/analytics')
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-700 hover:bg-slate-50',
              collapsed && 'justify-center'
            )}
            title="Analytics"
          >
            <BarChart3 className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Analytics</span>}
          </Link>
        </div>

        {/* Divider */}
        <div className="py-2">
          <div className="border-t border-slate-200"></div>
        </div>

        {/* Credits Section - Compact */}
        {!collapsed && (
          <div className="mb-4">
            <div className="mx-3 my-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-700">Credits</span>
                <Link href="/dashboard/settings" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Buy
                </Link>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold text-slate-900">1,250</span>
                <span className="text-xs text-slate-500">available</span>
              </div>
              <div className="bg-slate-200 h-1 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>
        )}

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
              : 'text-slate-600 hover:bg-slate-50',
            collapsed && 'justify-center'
          )}
          title="Settings"
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </nav>
    </div>
  );
}
