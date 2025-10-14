import DashboardSidebarFinal from '@/components/DashboardSidebarFinal';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebarFinal />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

