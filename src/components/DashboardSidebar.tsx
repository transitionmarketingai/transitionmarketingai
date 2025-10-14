'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  Target,
  Send,
  MessageCircle,
  BarChart3,
  Settings,
  Home,
  Search,
  Facebook,
  Chrome,
  Mail,
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Contacts',
    href: '/dashboard/contacts',
    icon: Users,
    description: 'Unverified leads',
  },
  {
    name: 'Leads',
    href: '/dashboard/leads',
    icon: CheckCircle,
    description: 'Verified leads',
  },
  {
    name: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: Target,
  },
  {
    name: 'Outreach',
    href: '/dashboard/outreach',
    icon: Send,
  },
  {
    name: 'Conversations',
    href: '/dashboard/conversations',
    icon: MessageCircle,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 p-2">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          T
        </div>
        <span className="font-bold text-lg">Transition AI</span>
      </Link>

      {/* Navigation */}
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>

              {/* Submenu */}
              {item.submenu && isActive && (
                <div className="ml-11 mt-1 space-y-1">
                  {item.submenu.map((subItem) => {
                    const SubIcon = subItem.icon;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                      >
                        <SubIcon className="h-4 w-4" />
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-8">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
        >
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
