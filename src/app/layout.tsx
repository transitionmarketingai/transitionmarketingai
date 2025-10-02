import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import StructuredData from "@/components/StructuredData";

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
    default: "Transition CRM — Easy and Effective CRM for Closing Deals",
    template: "%s | Transition CRM"
  },
  description: "The easy and effective CRM for closing deals. Track sales pipeline, manage leads, automate sales processes with AI. Built for Indian businesses. 14-day free trial.",
  keywords: [
    "CRM software",
    "sales pipeline management",
    "lead management",
    "customer relationship management",
    "sales automation",
    "Indian businesses",
    "SaaS CRM",
    "B2B sales tools",
    "sales analytics",
    "deal tracking",
    "sales process automation",
    "business CRM",
    "startup CRM",
    "sales team management",
    "customer data management",
    "sales reporting",
    "deal forecasting",
    "sales productivity",
    "customer acquisition",
    "revenue optimization"
  ],
  authors: [{ name: "Transition CRM" }],
  creator: "Transition CRM",
  publisher: "Transition CRM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Transition CRM — Easy and Effective CRM for Closing Deals",
    description: "Track sales pipeline, manage leads, automate sales processes with AI. Built for Indian businesses. 14-day free trial.",
    url: "https://transitionmarketingai.com",
    siteName: "Transition CRM",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Transition CRM - Easy and Effective CRM for Closing Deals",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transition CRM — Easy and Effective CRM for Closing Deals",
    description: "Track sales pipeline, manage leads, automate sales processes with AI. Built for Indian businesses.",
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
    canonical: "https://transitionmarketingai.com",
  },
  category: "technology",
  classification: "Business Software",
  manifest: "/manifest.json",
  other: {
    "application-name": "Transition CRM",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Transition CRM",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2563eb",
    "theme-color": "#2563eb",
    "apple-touch-icon": "/favicon.png",
    "apple-touch-icon-sizes": "180x180",
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
