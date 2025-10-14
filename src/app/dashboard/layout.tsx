import DashboardSidebarNew from '@/components/DashboardSidebarNew';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebarNew />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

