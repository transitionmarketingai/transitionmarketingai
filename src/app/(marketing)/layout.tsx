// Force dynamic rendering for marketing pages (they use client components with interactivity)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

