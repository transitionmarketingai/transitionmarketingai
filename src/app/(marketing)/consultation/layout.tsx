// Force dynamic rendering for consultation page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

