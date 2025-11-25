import type { Metadata } from "next";
import { UTMCapture } from '@/components/UTMCapture';

// Force dynamic rendering for marketing pages (they use client components with interactivity)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Verified Lead Generation in India | Transition Marketing AI",
  description: "AI-powered verified lead generation for Indian businesses — 30–50 real inquiries in 30 days, backed by a performance guarantee.",
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
    "AI-powered marketing",
    "verified leads",
    "warm inquiries",
    "real inquiries"
  ],
  openGraph: {
    title: "Verified Lead Generation in India | Transition Marketing AI",
    description: "AI-powered verified lead generation for Indian businesses — 30–50 real inquiries in 30 days, backed by a performance guarantee.",
    type: "website",
    url: "https://transitionmarketingai.com",
    images: [
      {
        url: "/images/dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "Transition Marketing AI - Verified Lead Generation & Marketing Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified Lead Generation in India | Transition Marketing AI",
    description: "AI-powered verified lead generation for Indian businesses — 30–50 real inquiries in 30 days, backed by a performance guarantee.",
    images: ["/images/dashboard-preview.png"],
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UTMCapture />
      {children}
    </>
  );
}

