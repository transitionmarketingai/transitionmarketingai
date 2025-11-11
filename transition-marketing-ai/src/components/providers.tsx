"use client";

import { type ReactNode } from "react";
import { DefaultSeo } from "next-seo";

import { Toaster } from "@/components/ui/toaster";
import { defaultSEO } from "@/lib/seo.config";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      {children}
      <Toaster />
    </>
  );
}
