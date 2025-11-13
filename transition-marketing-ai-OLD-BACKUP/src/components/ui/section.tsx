"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: React.PropsWithChildren<{ className?: string; containerClassName?: string } & React.HTMLAttributes<HTMLElement>>) {
  return (
    <section className={cn("max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16", className)} {...props}>
      <div className={cn(containerClassName)}>
        {children}
      </div>
    </section>
  );
}
