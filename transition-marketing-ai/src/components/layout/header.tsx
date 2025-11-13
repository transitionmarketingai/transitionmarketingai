"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const CTA_LINKS = [
  {
    id: "header_start",
    href: "/consultation",
    label: "Start Campaign",
    variant: "default" as const,
  },
  {
    id: "header_book",
    href: "/consultation#calendar",
    label: "Book a Call",
    variant: "outline" as const,
  },
];

export function Header() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm font-semibold sm:text-base">
          Transition Marketing AI
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {CTA_LINKS.map(({ id, href, label, variant }) => (
            <Button key={id} asChild variant={variant} data-analytics-id={id}>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
          <Button
            data-analytics-id="header_whatsapp"
            variant="ghost"
            asChild
            className="text-primary hover:text-primary"
          >
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <SheetHeader className="text-left">
              <SheetTitle className="text-lg font-semibold">Transition Marketing AI</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-3">
              {CTA_LINKS.map(({ id, href, label, variant }) => (
                <Button key={id} asChild variant={variant} data-analytics-id={id}>
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
              <Button data-analytics-id="header_whatsapp" variant="ghost" asChild>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
