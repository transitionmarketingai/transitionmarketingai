import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from 'sonner';
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { MetaPixel } from "@/components/analytics/MetaPixel";

// Mobile viewport meta tag
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://transitionmarketingai.com"),
  title: {
    default: "Transition Marketing AI — AI-Powered Lead Generation & Marketing Automation",
    template: "%s | Transition Marketing AI"
  },
  description: "AI-powered lead generation & marketing automation platform. Find qualified prospects, create personalized campaigns, automate outreach, and convert leads into customers. Built for Indian businesses. 14-day free trial.",
  keywords: [
    "AI lead generation",
    "marketing automation",
    "AI marketing platform",
    "lead generation software",
    "marketing automation software",
    "AI-powered marketing",
    "lead generation AI",
    "marketing AI tools",
    "automated lead generation",
    "AI marketing campaigns",
    "Indian businesses",
    "B2B marketing automation",
    "AI marketing assistant",
    "lead scoring AI",
    "marketing automation platform",
    "AI content generation",
    "automated outreach",
    "AI email marketing",
    "marketing ROI analytics",
    "lead generation automation",
    "AI prospect research"
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
    title: "Transition Marketing AI — AI-Powered Lead Generation & Marketing Automation",
    description: "Generate qualified leads with AI, create personalized campaigns, automate outreach, and convert prospects into customers. Built for Indian businesses. 14-day free trial.",
    url: "https://transitionmarketingai.ai",
    siteName: "Transition Marketing AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Transition Marketing AI - AI-Powered Lead Generation & Marketing Automation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transition Marketing AI — AI-Powered Lead Generation & Marketing Automation",
    description: "Generate qualified leads with AI, create personalized campaigns, automate outreach, and convert prospects into customers. Built for Indian businesses.",
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
    google: process.env.GOOGLE_VERIFICATION_CODE || "your-google-verification-code",
  },
  alternates: {
    canonical: "https://transitionmarketingai.ai",
  },
  category: "technology",
  classification: "Business Software",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  other: {
    "application-name": "Transition Marketing AI",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Transition Marketing AI",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#0A3A8C",
    "msapplication-TileImage": "/mstile-144x144.png",
    "theme-color": "#0A3A8C",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G8K39NN5QJ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G8K39NN5QJ');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-primary min-h-screen relative`}
      >
        {/* Analytics */}
        <GoogleTagManager />
        <MetaPixel />
        
        {/* Subtle radial gradient glow behind content */}
        <div className="relative z-10">
          <StructuredData type="organization" />
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="top-right" richColors />
        </div>
      </body>
    </html>
  );
}
