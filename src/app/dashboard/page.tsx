'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { dataService, Contact, Deal } from '@/lib/dataService';
import OnboardingFlow from '@/components/OnboardingFlow';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardTopNav from '@/components/DashboardTopNav';
import MobileDashboardSidebar from '@/components/MobileDashboardSidebar';
import MobileDashboardNav from '@/components/MobileDashboardNav';
import SetupGuide from '@/components/SetupGuide';
import ContactsPage from '@/components/ContactsPage';
import ToolsAndApps from '@/components/ToolsAndApps';
import DealsPage from '@/components/DealsPage';
import ActivitiesPage from '@/components/ActivitiesPage';
import LeadsPage from '@/components/LeadsPage';
import InsightsPage from '@/components/InsightsPage';
import CommunicationsPage from '@/components/CommunicationsPage';
import ProductsPage from '@/components/ProductsPage';
import TeamManagement from '@/components/TeamManagement';
import AIContentCreator from '@/components/AIContentCreator';
import IndianLeadDashboard from '@/components/IndianLeadDashboard';

function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');
  const [showOnboarding, setShowOnboarding] = useState(false);

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
    if (session?.user?.email) {
      // Skip onboarding for demo user (they already know the platform)
      if (session.user.email === 'demo@transitionai.com') {
        return;
      }
      
      const isCompleted = await dataService.isOnboardingCompleted();
      if (!isCompleted) {
        setShowOnboarding(true);
      }
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Refresh the page or redirect to ensure clean state
    window.location.reload();
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'overview':
        return <IndianLeadDashboard />;
      case 'campaigns':
        return <IndianLeadDashboard />;
      case 'leads':
        return <IndianLeadDashboard />;
      case 'industries':
        return <IndianLeadDashboard />;
      case 'settings':
        return <IndianLeadDashboard />;
      case 'setup-guide':
        return <SetupGuide />;
      case 'contacts':
        return <ContactsPage />;
      case 'organizations':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
                <p className="text-gray-600 mt-2">Manage your B2B target organizations and accounts</p>
              </div>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600">B2B organization management coming soon...</p>
            </div>
          </div>
        );
      case 'leads':
        return <LeadsPage />;
      case 'tools-apps':
        return <ToolsAndApps />;
      case 'campaigns':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">AI Campaigns</h1>
              <p className="text-gray-600">AI-powered marketing campaigns coming soon...</p>
            </div>
          </div>
        );
      case 'products':
        return <AIContentCreator />;
      case 'deals':
        return <DealsPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'analytics':
        return <InsightsPage />;
      case 'communications':
        return <CommunicationsPage />;
      case 'products':
        return <ProductsPage />;
      case 'team':
        return <TeamManagement />;
      default:
        return <SetupGuide />;
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to signin
  }

  const getCurrentPageTitle = () => {
        const titles = {
          'setup-guide': 'AI Setup Guide',
          'leads': 'AI Lead Generation',
          'contacts': 'Contact Management',
          'organizations': 'B2B Organizations',
          'campaigns': 'AI Campaigns',
          'timeline': 'Marketing Timeline',
          'merge': 'Lead Deduplication',
          'deals': 'Sales Pipeline',
          'activities': 'Marketing Activities',
          'analytics': 'Marketing Analytics',
          'communications': 'Email & Outreach',
          'products': 'AI Content Creation',
          'team': 'Team Management',
          'tools-apps': 'Marketing Tools',
          'automations': 'Marketing Automation'
        };
    return titles[activeSection as keyof typeof titles] || activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
  };

      return (
        <div className="min-h-screen bg-gray-50">
          {/* Use the new Indian Lead Dashboard */}
          <IndianLeadDashboard />
          
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

export default DashboardPage;