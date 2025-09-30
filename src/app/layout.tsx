import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import AnalyticsProvider from "@/components/AnalyticsProvider";

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
    "marketing subscription"
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
        <div className="fixed inset-0 bg-gradient-radial from-blue-50/20 via-background to-background pointer-events-none" />
        <div className="relative z-10">
          <SessionProvider>
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
