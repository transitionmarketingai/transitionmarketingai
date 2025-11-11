"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <Section className="pb-10 pt-12">
      <motion.div
        className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-6">
          <Badge className="w-fit bg-primary/10 text-primary">
            AI Campaign Orchestrator
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Transition every marketing moment with AI that thinks like your team.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Transition Marketing AI blends strategic operators, automation, and
            experimentation to relaunch your funnels in weeks—not quarters.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/consultation">
                Start Campaign <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>
        <motion.div
          className="grid gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="space-y-4 p-6">
              <div className="inline-flex items-center gap-2 text-sm font-medium">
                <Sparkles className="size-4" />
                Campaign Transition Blueprint
              </div>
              <p className="text-base leading-relaxed">
                Map your acquisition, nurture, and retention plays into an
                adaptive AI system tailored to your ICP and goals.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Launch-ready in 21 days
              </h3>
              <p className="text-sm text-muted-foreground">
                Onboard, audit, and deploy AI-backed experiments with clear
                owners, metrics, and automations.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}
