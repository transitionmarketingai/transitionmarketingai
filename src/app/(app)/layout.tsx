export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar placeholder */}
        <aside className="w-64 bg-card border-r min-h-screen p-6">
          <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
          <nav className="space-y-2">
            <a href="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground">
              Overview
            </a>
            <a href="/dashboard/agents" className="block text-sm text-muted-foreground hover:text-foreground">
              Agents
            </a>
            <a href="/dashboard/analytics" className="block text-sm text-muted-foreground hover:text-foreground">
              Analytics
            </a>
            <a href="/dashboard/settings" className="block text-sm text-muted-foreground hover:text-foreground">
              Settings
            </a>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
