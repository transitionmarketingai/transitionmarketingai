'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  FileText,
  Ticket,
  Phone,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calculator,
  CheckCircle,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Clients',
    href: '/admin/clients',
    icon: Users,
  },
  {
    name: 'Consultations',
    href: '/admin/consultations',
    icon: Phone,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'Resources',
    href: '/admin/resources',
    icon: BookOpen,
    badge: 'New',
  },
  {
    name: 'Pricing Calculator',
    href: '/admin/pricing-calculator',
    icon: Calculator,
  },
  {
    name: 'Leads',
    href: '/admin/leads',
    icon: Package,
  },
  {
    name: 'Billing',
    href: '/admin/billing',
    icon: CreditCard,
  },
  {
    name: 'Invoices',
    href: '/admin/invoices',
    icon: FileText,
  },
  {
    name: 'Support',
    href: '/admin/support',
    icon: Ticket,
  },
  {
    name: 'Tasks',
    href: '/admin/tasks',
    icon: CheckCircle,
  },
  {
    name: 'Forecast',
    href: '/admin/forecast',
    icon: TrendingUp,
  },
  {
    name: 'Ads',
    href: '/admin/ads',
    icon: BarChart3,
  },
  {
    name: 'Sales',
    href: '/admin/sales',
    icon: DollarSign,
  },
  {
    name: 'Retention',
    href: '/admin/retention',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Logged out successfully');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <div
      className={cn(
        'bg-slate-900 text-white min-h-screen flex flex-col transition-all duration-300 relative border-r border-slate-800',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border border-slate-700 bg-slate-900 p-0 hover:bg-slate-800 shadow-sm text-white"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg">Admin Portal</h1>
              <p className="text-xs text-slate-400">Lead Generation</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                collapsed && 'justify-center'
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="flex-1">{item.name}</span>
              )}
              {!collapsed && item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-red-400 hover:bg-red-500/10 hover:text-red-300',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

