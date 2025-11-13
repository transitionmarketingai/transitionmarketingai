import type { Metadata } from "next";

// Force dynamic rendering for marketing pages (they use client components with interactivity)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Transition Marketing AI | AI-Powered Lead Generation & Marketing Automation in India",
  description: "Build a complete AI-powered marketing system for your business. We run paid ads, deliver verified inquiries, and automate your follow-ups via WhatsApp and dashboard access.",
  keywords: [
    "AI lead generation India",
    "verified business inquiries",
    "paid ads automation",
    "AI marketing dashboard",
    "Transition Marketing AI",
    "AI marketing automation",
    "lead generation software",
    "WhatsApp automation",
    "Indian businesses",
    "AI-powered marketing"
  ],
  openGraph: {
    title: "Transition Marketing AI | AI-Powered Lead Generation & Marketing Automation in India",
    description: "Build a complete AI-powered marketing system for your business. We run paid ads, deliver verified inquiries, and automate your follow-ups via WhatsApp and dashboard access.",
    type: "website",
    url: "https://transitionmarketingai.com",
    images: [
      {
        url: "/images/dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "Transition Marketing AI - AI-Powered Lead Generation & Marketing Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transition Marketing AI | AI-Powered Lead Generation & Marketing Automation in India",
    description: "Build a complete AI-powered marketing system for your business. We run paid ads, deliver verified inquiries, and automate your follow-ups via WhatsApp and dashboard access.",
    images: ["/images/dashboard-preview.png"],
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

