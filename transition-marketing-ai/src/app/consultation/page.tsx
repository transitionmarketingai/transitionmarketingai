import Link from "next/link";
import { ShieldCheck, Timer, Workflow } from "lucide-react";

import { CalendlyEmbed } from "@/components/consultation/calendly-embed";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PROMISES = [
  {
    icon: Timer,
    title: "Rapid activation",
    description: "We align on goals and assemble your transition pod in under 72 hours.",
  },
  {
    icon: Workflow,
    title: "Operator-led roadmap",
    description: "Leave with a step-by-step action plan and AI workflow map tailored to your growth stack.",
  },
  {
    icon: ShieldCheck,
    title: "Data & compliance ready",
    description: "DPDP-first data handling, security best practices, and transparent governance.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      <Section className="bg-muted/30" containerClassName="gap-6">
        <Badge className="w-fit bg-primary/15 text-primary">
          Book a consultation
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Map your transition sprint with our operators.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Share your current funnel, blockers, and north-star metrics. We&apos;ll
          co-build a transition plan and outline the pod to execute it.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="#calendar">Jump to calendar</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View pricing options</Link>
          </Button>
        </div>
      </Section>

      <Section containerClassName="gap-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-border/70 bg-muted/10 p-5">
              <div className="mb-4 inline-flex rounded-md bg-primary/10 p-2 text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-lg">
          <CalendlyEmbed className="min-h-[720px] w-full" />
        </div>
      </Section>
    </>
  );
}
