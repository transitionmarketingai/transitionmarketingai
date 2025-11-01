// Force dynamic rendering for industry pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

