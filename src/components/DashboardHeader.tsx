'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Bot, User, Settings, LogOut, HelpCircle, CreditCard, ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';

interface DashboardHeaderProps {
  showLogo?: boolean;
}

export default function DashboardHeader({ showLogo = false }: DashboardHeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState('Demo User');
  const [userEmail, setUserEmail] = useState('demo@example.com');
  const [notifications, setNotifications] = useState(3);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check if in demo mode
    const demoMode = localStorage.getItem('demo_mode') === 'true';
    setIsDemoMode(demoMode);

    // Load user data
    if (demoMode) {
      const demoCustomer = localStorage.getItem('demo_customer');
      if (demoCustomer) {
        const customer = JSON.parse(demoCustomer);
        setUserName(customer.contact_person || 'Demo User');
      }
    } else {
      // TODO: Load real user data from API
      const onboardingData = localStorage.getItem('onboarding_data');
      if (onboardingData) {
        const data = JSON.parse(onboardingData);
        setUserName(data.contactPerson || 'User');
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear all local storage
    localStorage.clear();
    
    // Redirect to login
    router.push('/login');
  };

  const handleSettings = () => {
    router.push('/dashboard/settings');
  };

  const handleProfile = () => {
    router.push('/dashboard/profile');
  };

  const handleBilling = () => {
    router.push('/dashboard/settings?tab=billing');
  };

  const handleHelp = () => {
    window.open('https://help.transitionmarketingai.com', '_blank');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo (optional) */}
          {showLogo && (
            <div className="flex-shrink-0">
              <Logo size="sm" />
            </div>
          )}

          {/* Center - AI Status Badge */}
          <div className={`${showLogo ? '' : 'flex-1'}`}>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
              <Bot className="h-3 w-3 mr-1" />
              AI Active
            </Badge>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => router.push('/dashboard/notifications')}
            >
              <Bell className="h-5 w-5 text-slate-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {notifications}
                </span>
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9 px-3">
                  <Avatar className="h-8 w-8 bg-blue-600 flex items-center justify-center text-white rounded-full">
                    <span className="text-sm font-medium">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-medium text-slate-900">{userName}</div>
                    {isDemoMode && (
                      <div className="text-xs text-slate-500">Demo Mode</div>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-slate-500">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={handleBilling}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleHelp}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

