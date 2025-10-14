import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface Customer {
  id: string;
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  industry: string;
  subscription_status: string;
  current_plan_id: string;
}

interface AuthState {
  user: User | null;
  customer: Customer | null;
  loading: boolean;
  authenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    customer: null,
    loading: true,
    authenticated: false,
  });
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchCustomerProfile(session.user);
      } else {
        setAuthState({
          user: null,
          customer: null,
          loading: false,
          authenticated: false,
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchCustomerProfile(session.user);
      } else {
        setAuthState({
          user: null,
          customer: null,
          loading: false,
          authenticated: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCustomerProfile = async (user: User) => {
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setAuthState({
      user,
      customer,
      loading: false,
      authenticated: true,
    });
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }

    if (data.user) {
      await fetchCustomerProfile(data.user);
      router.push('/dashboard');
    }

    return data;
  };

  const signup = async (email: string, password: string, businessData: any) => {
    setAuthState(prev => ({ ...prev, loading: true }));

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        ...businessData,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setAuthState(prev => ({ ...prev, loading: false }));
      throw new Error(result.error || 'Signup failed');
    }

    // Auto-login after signup
    await login(email, password);
    return result;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthState({
      user: null,
      customer: null,
      loading: false,
      authenticated: false,
    });
    router.push('/login');
  };

  return {
    user: authState.user,
    customer: authState.customer,
    loading: authState.loading,
    authenticated: authState.authenticated,
    login,
    signup,
    logout,
  };
}


