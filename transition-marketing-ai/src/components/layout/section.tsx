import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("w-full py-16 sm:py-24", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-8 lg:px-10",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
