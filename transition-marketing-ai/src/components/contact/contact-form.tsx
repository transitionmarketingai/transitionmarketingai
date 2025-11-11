"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export function ContactForm() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    goal: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
    toast({
      title: "Request received",
      description: "Our operators will reach out within one business day.",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-xl border border-border/70 bg-background p-6 shadow-sm"
      >
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            value={formValues.name}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, name: event.target.value }))
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
            placeholder="Arjun Patel"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formValues.email}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, email: event.target.value }))
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
            placeholder="you@company.com"
          />
        </div>
        <div className="grid gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="company"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            value={formValues.company}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, company: event.target.value }))
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
            placeholder="Transition Ventures"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground" htmlFor="goal">
            What are you transitioning?
          </label>
          <textarea
            id="goal"
            name="goal"
            rows={4}
            value={formValues.goal}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, goal: event.target.value }))
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
            placeholder="E.g. migrating paid campaigns to an AI optimization loop."
          />
        </div>
        <Button type="submit" size="lg" className="justify-center">
          Submit request
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>We&apos;re on it</DialogTitle>
            <DialogDescription>
              Thanks for sharing your goals. Expect outreach from our transition
              strategists shortly.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-1 rounded-md bg-muted/40 p-4 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Name:</span> {" "}
              {formValues.name || "—"}
            </li>
            <li>
              <span className="font-medium text-foreground">Email:</span> {" "}
              {formValues.email || "—"}
            </li>
            <li>
              <span className="font-medium text-foreground">Company:</span> {" "}
              {formValues.company || "—"}
            </li>
          </ul>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className="w-full sm:w-auto">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
