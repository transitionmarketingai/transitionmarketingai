import DashboardSidebarAI from '@/components/DashboardSidebarAI';
import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebarAI />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

