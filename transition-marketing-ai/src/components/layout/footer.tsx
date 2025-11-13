import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-3">
            <p className="text-lg font-semibold text-foreground">Transition Marketing AI</p>
            <p className="text-sm text-muted-foreground">
              Run a WhatsApp-first ads funnel that verifies every lead in minutes.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-muted-foreground">
          Made with <span aria-hidden>❤️</span> in India • DPDP Compliant • 99.9% Uptime
        </p>
      </div>
    </footer>
  );
}
