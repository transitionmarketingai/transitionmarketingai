"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, PhoneCall, MessageCircleMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const CTA_LINKS = [
  {
    href: "/consultation",
    label: "Start Campaign",
    icon: Sparkles,
    variant: "default" as const,
  },
  {
    href: "/consultation#calendar",
    label: "Book a Call",
    icon: PhoneCall,
    variant: "outline" as const,
  },
];

export function Header() {
  const pathname = usePathname();
  const whatsappUrl = getWhatsAppUrl();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            Transition
          </span>
          <span className="text-base sm:text-lg">Transition Marketing AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {CTA_LINKS.map(({ href, label, icon: Icon, variant }) => (
            <Button key={href} asChild variant={variant} size="lg">
              <Link href={href} className="flex items-center gap-2">
                <Icon className="size-4" />
                {label}
              </Link>
            </Button>
          ))}
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircleMore className="size-4" />
              WhatsApp Us
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <SheetHeader className="gap-3 text-left">
              <SheetTitle className="text-lg font-semibold text-foreground">
                Transition Marketing AI
              </SheetTitle>
              <p className="text-sm text-muted-foreground">
                Launch AI-powered campaigns with a human-first partner.
              </p>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-6 px-4 py-6">
              <nav className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-base font-medium transition-colors",
                        isActive ? "text-primary" : "text-foreground",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex flex-col gap-3">
                {CTA_LINKS.map(({ href, label, icon: Icon, variant }) => (
                  <Button key={href} asChild variant={variant} size="lg">
                    <Link href={href} className="flex items-center gap-2">
                      <Icon className="size-4" />
                      {label}
                    </Link>
                  </Button>
                ))}
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircleMore className="size-4" />
                    WhatsApp Us
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
