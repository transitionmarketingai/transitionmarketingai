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
  Zap,
  Users,
  Target,
  Mail,
  Phone,
  Globe,
  TrendingUp,
  Folder,
  FileText,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Badge } from '@/components/ui/badge';

export default function DashboardSidebarAI() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      {/* Logo */}
      <Link href="/dashboard" className="p-4 border-b border-slate-200">
        <Logo size="sm" />
      </Link>

      {/* AI Badge */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <span className="font-semibold text-blue-900">AI Autopilot Active</span>
        </div>
        <p className="text-xs text-slate-600 mt-1">Finding prospects 24/7</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* Main Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Main
          </div>
          
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === '/dashboard'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>

          {/* All Leads */}
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
              <span>All Leads</span>
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

        {/* AI Tools Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            AI Tools
          </div>

          {/* AI Prospects */}
          <Link
            href="/dashboard/ai-prospects"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/ai-prospects')
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Bot className="h-5 w-5" />
            <div className="flex-1 flex items-center justify-between">
              <span>AI Prospects</span>
              <Badge className="bg-purple-600 text-white text-xs">
                10 New
              </Badge>
            </div>
          </Link>

          {/* AI Outreach */}
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
            <div className="flex-1 flex items-center justify-between">
              <span>AI Outreach</span>
              <Badge className="bg-blue-600 text-white text-xs">
                5
              </Badge>
            </div>
          </Link>

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
            <div className="flex-1 flex items-center justify-between">
              <span>AI Ad Generator</span>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                NEW
              </Badge>
            </div>
          </Link>
        </div>

        {/* Communication Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Communication
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
            <Phone className="h-5 w-5" />
            <span>WhatsApp</span>
          </Link>
        </div>

        {/* Data & Insights Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Data & Insights
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

          {/* Lead Sources */}
          <Link
            href="/dashboard/lead-sources"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname?.startsWith('/dashboard/lead-sources')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Globe className="h-5 w-5" />
            <span>Lead Sources</span>
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

      {/* Bottom - AI Stats */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="text-xs text-slate-500 mb-3 font-medium">AI Activity Today</div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Prospects found:</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-purple-600" />
              <span className="font-semibold text-purple-600">10</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Emails sent:</span>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-blue-600" />
              <span className="font-semibold text-blue-600">23</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Responses:</span>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3 text-green-600" />
              <span className="font-semibold text-green-600">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
