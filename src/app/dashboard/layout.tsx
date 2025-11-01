import DashboardSidebarAI from '@/components/DashboardSidebarAI';
import DashboardHeader from '@/components/DashboardHeader';

// Force dynamic rendering for all dashboard pages (they all use client components with interactivity)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Fixed Sidebar */}
      <DashboardSidebarAI />
      
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
