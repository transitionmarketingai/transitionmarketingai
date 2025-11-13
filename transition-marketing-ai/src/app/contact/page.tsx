import { Mail, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

const CONTACT_OPTIONS = [
  {
    icon: Phone,
    label: "Request a strategy call",
    description: "+91 99887 77665",
  },
  {
    icon: Mail,
    label: "Partner with our operators",
    description: "hello@transitionmarketing.ai",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp sprint updates",
    description: "Instant updates & async standups",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="bg-muted/30" containerClassName="gap-6">
        <Badge className="w-fit bg-accent/20 text-accent-foreground">
          Contact
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Talk to the transition pod.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Share your marketing transition goals and our operators will reply with
          a personalised blueprint and call schedule within one business day.
        </p>
      </Section>

      <Section containerClassName="gap-10">
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:items-start">
          <ContactForm />
          <div className="space-y-6 rounded-xl border border-border/70 bg-muted/20 p-6">
            <h2 className="text-xl font-semibold text-foreground">
              How we show up
            </h2>
            <p className="text-sm text-muted-foreground">
              Every engagement begins with a deep-dive workshop. Then we co-build
              a transition roadmap and assign your dedicated pod.
            </p>
            <ul className="space-y-4">
              {CONTACT_OPTIONS.map(({ icon: Icon, label, description }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="rounded-md bg-primary/10 p-2 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {label}
                    </p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              DPDP compliant • NDA ready • Customer-first ethics
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
