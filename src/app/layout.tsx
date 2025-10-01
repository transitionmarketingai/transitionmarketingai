import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://transitionmarketingai.com"),
  title: {
    default: "Transition Marketing AI — Automated AI Marketing Systems",
    template: "%s | Transition Marketing AI"
  },
  description: "Get qualified leads, consistent content, and smart AI tools in one subscription. Built for Indian SMBs. No hiring. No hassle.",
  keywords: [
    "AI marketing",
    "lead generation",
    "content marketing",
    "marketing automation",
    "Indian SMBs",
    "digital marketing",
    "AI tools",
    "marketing subscription",
    "B2B marketing",
    "sales automation",
    "customer acquisition",
    "marketing ROI",
    "business growth",
    "startup marketing",
    "SaaS marketing",
    "email marketing",
    "social media marketing",
    "SEO optimization",
    "conversion optimization",
    "marketing analytics"
  ],
  authors: [{ name: "Transition Marketing AI" }],
  creator: "Transition Marketing AI",
  publisher: "Transition Marketing AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Transition Marketing AI — Automated AI Marketing Systems",
    description: "Get qualified leads, consistent content, and smart AI tools in one subscription. Built for Indian SMBs.",
    url: "https://transitionmarketingai.com",
    siteName: "Transition Marketing AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Transition Marketing AI - Automated AI Marketing Systems",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transition Marketing AI — Automated AI Marketing Systems",
    description: "Get qualified leads, consistent content, and smart AI tools in one subscription.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://transitionmarketingai.com",
  },
  category: "technology",
  classification: "Business Software",
  other: {
    "application-name": "Transition Marketing AI",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Transition AI",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2563eb",
    "theme-color": "#2563eb",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-primary min-h-screen relative`}
      >
        {/* Subtle radial gradient glow behind content */}
        <div className="relative z-10">
          <StructuredData type="organization" />
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
