import DashboardSidebarAI from '@/components/DashboardSidebarAI';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebarAI />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

