import Link from "next/link";
import { Check } from "lucide-react";

import { Section } from "@/components/ui/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Launch",
    price: "3,500",
    cadence: "per month",
    description: "For teams validating AI-driven campaigns in one region.",
    highlights: [
      "Strategist + automation engineer",
      "Up to 2 channel playbooks",
      "Weekly reporting rituals",
      "Slack + email support",
    ],
  },
  {
    name: "Scale",
    price: "6,500",
    cadence: "per month",
    description: "Cross-functional pods for multi-channel growth programs.",
    highlights: [
      "Dedicated growth pod (4 operators)",
      "Up to 5 channel playbooks",
      "AI experimentation lab",
      "RevOps + attribution dashboards",
    ],
    badge: "Most popular",
    accent: true,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    cadence: "custom",
    description: "Complex transitions with compliance, multi-region, and data teams.",
    highlights: [
      "Custom transition office",
      "Advanced data governance",
      "Onsite workshops + enablement",
      "24/7 operator coverage",
    ],
  },
];

const GUARANTEES = [
  "DPDP-ready data handling",
  "Shared KPIs and sprint boards",
  "Cancel anytime with 30 days notice",
];

export default function PricingPage() {
  return (
    <>
      <Section className="bg-muted/30" containerClassName="gap-6 text-center">
        <Badge className="mx-auto bg-primary/15 text-primary">Pricing</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Choose the pod that matches your transition velocity.
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          All plans include access to our AI playbooks, operator expertise, and
          growth operations frameworks.
        </p>
      </Section>

      <Section containerClassName="gap-8">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={plan.accent ? "border-primary/80 shadow-xl" : ""}
            >
              <CardHeader className="items-start gap-3">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl font-semibold">
                    {plan.name}
                  </CardTitle>
                  {plan.badge ? (
                    <Badge className="bg-accent text-accent-foreground">
                      {plan.badge}
                    </Badge>
                  ) : null}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price === "Talk to us" ? plan.price : `₹${plan.price}`}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {plan.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check className="mt-1 size-4 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant={plan.accent ? "default" : "outline"} className="w-full">
                  <Link href="/consultation">Start transition</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="rounded-xl border border-border/70 bg-muted/20 p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Every partnership includes</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {GUARANTEES.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
