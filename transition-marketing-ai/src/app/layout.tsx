import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://transitionmarketing.ai"),
  title: {
    default: "Transition Marketing AI",
    template: "%s | Transition Marketing AI",
  },
  description:
    "Transition Marketing AI helps growth teams design, launch, and optimize AI-powered marketing campaigns with human-first performance.",
  keywords: [
    "AI marketing",
    "transition marketing",
    "growth marketing",
    "automation",
    "campaign orchestration",
  ],
  openGraph: {
    title: "Transition Marketing AI",
    description:
      "Accelerate customer acquisition with AI-assisted strategy, experimentation, and analytics.",
    url: "https://transitionmarketing.ai",
    siteName: "Transition Marketing AI",
    images: [
      {
        url: "https://transitionmarketing.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Transition Marketing AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transition Marketing AI",
    description:
      "Launch AI-led marketing transitions with a partner that blends automation and human insight.",
    images: ["https://transitionmarketing.ai/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
        className={`${inter.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-16">{children}</main>
            <Footer />
          </div>
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
