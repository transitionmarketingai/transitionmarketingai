import { Lightbulb, PlugZap, Radar, Sparkles } from "lucide-react";

import { Section } from "@/components/ui/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PHASES = [
  {
    title: "Discovery & Alignment",
    description:
      "Understand your growth thesis, tech stack, and success metrics. We convert goals into measurable experiments.",
    icon: Lightbulb,
  },
  {
    title: "Systems & Automation",
    description:
      "Implement AI co-pilots, data pipelines, and workflows that remove manual friction from execution.",
    icon: PlugZap,
  },
  {
    title: "Activation Pods",
    description:
      "Dedicated marketers, creatives, and analysts ship launch-ready campaigns with sprint rituals and dashboards.",
    icon: Sparkles,
  },
  {
    title: "Continuous Intelligence",
    description:
      "Ongoing experimentation, attribution, and insights with dashboards, alerts, and operator support.",
    icon: Radar,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="bg-muted/30" containerClassName="gap-6">
        <Badge className="w-fit bg-primary/15 text-primary">Process</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          How Transition Marketing AI plugs into your GTM engine.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          We combine seasoned operators with AI automation to remove bottlenecks and
          accelerate experimentation. Our pods work alongside your internal teams
          so you learn faster and execute smarter.
        </p>
      </Section>

      <Section aria-labelledby="phases" containerClassName="gap-10">
        <div className="space-y-3">
          <h2 id="phases" className="text-3xl font-semibold text-foreground">
            Four phases to rewire growth execution
          </h2>
          <p className="max-w-3xl text-muted-foreground">
            Each phase builds momentum, reduces risk, and creates compounding
            intelligence across your marketing motion.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {PHASES.map(({ title, description, icon: Icon }, index) => (
            <Card key={title} className="relative overflow-hidden border-border/70">
              <span className="absolute right-5 top-5 text-5xl font-semibold text-primary/20">
                {(index + 1).toString().padStart(2, "0")}
              </span>
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
      </Section>

      <Section className="bg-primary text-primary-foreground" containerClassName="gap-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Align your next transition sprint.
        </h2>
        <p className="max-w-2xl text-base opacity-95">
          We embed with your team in less than a week. Expect clear roadmaps,
          automated workflows, and measurable growth experiments.
        </p>
      </Section>
    </>
  );
}
