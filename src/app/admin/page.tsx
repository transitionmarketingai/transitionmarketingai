'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BillingDashboard from '@/components/admin/BillingDashboard';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for admin session
    const session = localStorage.getItem('admin_session');
    const expiresAt = localStorage.getItem('admin_session_expires');
    
    if (session && expiresAt) {
      const expires = new Date(expiresAt);
      if (expires > new Date()) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem('admin_session');
        localStorage.removeItem('admin_session_expires');
        router.push('/admin/login');
      }
    } else {
      // No session, redirect to login
      router.push('/admin/login');
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return <BillingDashboard />;
}
