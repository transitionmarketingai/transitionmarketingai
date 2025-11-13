import type { Metadata } from "next";

// Force dynamic rendering for marketing pages (they use client components with interactivity)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Transition Marketing AI | AI-Powered Lead Generation & Marketing Automation in India",
  description: "Transition Marketing AI builds AI-powered paid ad systems that deliver real, verified inquiries to Indian businesses. Get campaigns, dashboards, and WhatsApp automation for real estate, healthcare, SaaS, local services, and more.",
  openGraph: {
    title: "Transition Marketing AI | AI-Powered Lead Generation & Marketing Automation in India",
    description: "Transition Marketing AI builds AI-powered paid ad systems that deliver verified inquiries straight to your WhatsApp and dashboard. Get real leads every week with our managed campaigns.",
    type: "website",
    url: "https://transitionmarketingai.com",
    images: [
      {
        url: "/images/og-transition-marketing-ai.png",
        width: 1200,
        height: 630,
        alt: "Transition Marketing AI - AI-Powered Lead Generation & Marketing Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transition Marketing AI | AI-Powered Lead Generation & Marketing Automation in India",
    description: "Transition Marketing AI builds AI-powered paid ad systems that deliver verified inquiries straight to your WhatsApp and dashboard. Get real leads every week with our managed campaigns.",
    images: ["/images/og-transition-marketing-ai.png"],
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

