import Link from "next/link";
import {
  ArrowUpRight,
  BarChart2,
  BrainCircuit,
  Rocket,
  Workflow,
} from "lucide-react";

import { HeroSection } from "@/components/home/hero";
import { Section } from "@/components/layout/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TRANSITIONS = [
  {
    title: "AI Transition Blueprint",
    description:
      "Audit people, process, and platforms to model your entire customer journey into an intelligent playbook.",
    icon: BrainCircuit,
  },
  {
    title: "Orchestrated Campaign Pods",
    description:
      "Pair strategy leads with automation engineers to ship channel-ready experiments every sprint.",
    icon: Workflow,
  },
  {
    title: "Revenue Impact Lab",
    description:
      "Test value props, creative, and offers with full-funnel attribution, surfaced in weekly decision rituals.",
    icon: BarChart2,
  },
];

const LAUNCH_PLAYBOOK = [
  {
    title: "Day 0-7",
    summary: "Transition sprint planning",
    detail:
      "Stakeholder interviews, data ingestion, and success metric alignment. We visualise your growth stack and identify quick wins.",
  },
  {
    title: "Day 8-14",
    summary: "AI activation",
    detail:
      "Deploy automations, creative copilots, and scoring models. Build standard operating procedures for the team.",
  },
  {
    title: "Day 15-21",
    summary: "Launch + optimize",
    detail:
      "Ship campaigns, enable experiments, and set up intelligence dashboards with alerts and weekly reviews.",
  },
];

const METRICS = [
  { value: "70%", label: "Faster go-to-market" },
  { value: "4x", label: "Creative variants launched" },
  { value: "<30 days", label: "To measurable ROI" },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <Section aria-labelledby="transitions">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <Badge className="mx-auto bg-accent/20 text-accent-foreground">
              How we transition
            </Badge>
            <h2
              id="transitions"
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Operators, automations, and intelligence in one pod.
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Structured collaboration across strategy, creative, ops, and data.
              The result? Campaigns that scale while your team sleeps.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TRANSITIONS.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full">
                <CardHeader className="items-start gap-4">
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section
        aria-labelledby="playbook"
        className="bg-muted/30"
        containerClassName="gap-8"
      >
        <div className="space-y-2 text-center">
          <Badge className="mx-auto bg-primary/15 text-primary">
            Launch playbook
          </Badge>
          <h2
            id="playbook"
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Speed-to-impact with a 21-day transition sprint.
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We orchestrate high-signal launches that prove value quickly—then
            scale what works with ruthless focus on outcomes.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {LAUNCH_PLAYBOOK.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="metrics" containerClassName="gap-12">
        <div className="grid gap-10 lg:grid-cols-[1fr,0.8fr] lg:items-center">
          <div className="space-y-6">
            <Badge className="bg-secondary text-secondary-foreground">
              Proof in performance
            </Badge>
            <h2
              id="metrics"
              className="text-3xl font-semibold text-foreground sm:text-4xl"
            >
              Real operators. Real velocity.
            </h2>
            <p className="text-muted-foreground">
              Our pod plugs into your GTM engine to unlock compounding
              experiments, faster decision loops, and clean data.
            </p>
            <div className="flex flex-wrap gap-6">
              {METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <p className="text-3xl font-bold text-primary">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="h-full">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold">
                Launch-ready starter pack
              </CardTitle>
              <CardDescription>
                Everything needed for a successful transition sprint.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="list-disc space-y-2 pl-5">
                <li>ICP, offer, and funnel diagnostics</li>
                <li>AI-agent workflows for creative &amp; operations</li>
                <li>Lead scoring + routing automation</li>
                <li>Revenue dashboards with intelligent alerts</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/pricing">
                  View pricing <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground" containerClassName="items-center gap-6 text-center">
        <Rocket className="size-10" />
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Sprint into AI-powered performance.
        </h2>
        <p className="max-w-2xl text-base opacity-95">
          Book a zero-friction consultation. We will map your goals, co-build a
          transition blueprint, and ship a high-impact campaign within three
          weeks.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/consultation">
              Book Consultation <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
