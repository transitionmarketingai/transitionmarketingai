'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import OnboardingFlow from '@/components/OnboardingFlow';
import { dataService } from '@/lib/dataService';

export default function GetStartedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/signin');
      return;
    }

    // Check if user needs onboarding
    checkOnboardingStatus();
  }, [session, status, router]);

  const checkOnboardingStatus = async () => {
    if (!session?.user?.email) return;
    
    try {
      const isCompleted = await dataService.isOnboardingCompleted();
      if (isCompleted) {
        // User has completed onboarding, redirect to dashboard
        router.push('/dashboard');
        return;
      }
      
      setShowOnboarding(true);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsCheckingOnboarding(false);
    }
  };

  const handleOnboardingComplete = () => {
    // Redirect to dashboard after onboarding completion
    router.push('/dashboard');
  };

  if (status === 'loading' || isCheckingOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Setting up your account...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to signin
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Transition CRM!</h1>
            <p className="text-gray-600 text-lg">
              Thank you for signing up. Let's set up your account to get you started with your CRM.
            </p>
          </div>

          <div className="space-y-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>Account created successfully</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.934-1.48a8.99 8.99 0 01-3.066-3.066A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
                </svg>
              </div>
              <span>Email verified as <strong>{session?.user?.email}</strong></span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <span>Set up your profile and preferences</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Don't worry!</strong> This quick setup takes just 2 minutes and helps us customize 
                  your CRM experience with relevant features and sample data based on your business needs.
                </p>
              </div>
            </div>
          </div>

          {showOnboarding && (
            <div className="mt-8">
              <button
                onClick={() => setShowOnboarding(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Let's Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Onboarding Flow */}
      {showOnboarding && session?.user?.email && (
        <OnboardingFlow 
          userEmail={session.user.email}
          onComplete={handleOnboardingComplete}
        />
      )}
    </div>
  );
}