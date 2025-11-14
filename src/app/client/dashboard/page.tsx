'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientDashboard from '@/components/client/ClientDashboard';

export default function ClientDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for client token
    const token = localStorage.getItem('client_token');
    const expiresAt = localStorage.getItem('client_token_expires');
    
    if (token && expiresAt) {
      const expires = new Date(expiresAt);
      if (expires > new Date()) {
        // Verify token with server
        fetch('/api/client/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              setIsAuthenticated(true);
            } else {
              // Token invalid, clear and redirect
              localStorage.removeItem('client_token');
              localStorage.removeItem('client_token_expires');
              router.push('/client/login');
            }
          })
          .catch(() => {
            router.push('/client/login');
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        // Token expired
        localStorage.removeItem('client_token');
        localStorage.removeItem('client_token_expires');
        router.push('/client/login');
        setIsLoading(false);
      }
    } else {
      // No token
      router.push('/client/login');
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0053FF] mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return <ClientDashboard />;
}

