import AdminSidebar from '@/components/admin/AdminSidebar';
import FloatingAIAssistant from '@/components/admin/FloatingAIAssistant';

// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <FloatingAIAssistant />
    </div>
  );
}
