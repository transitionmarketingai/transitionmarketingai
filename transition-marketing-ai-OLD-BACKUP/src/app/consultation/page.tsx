import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const CAL = process.env.NEXT_PUBLIC_CALENDLY_URL;
const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hi, I want to book a quick consultation and start the 14-day Ads Sprint."
)}`;

export const metadata = {
  title: "Consultation — Transition Marketing AI",
  description: "Book a 15-min call to launch your 14-day Ads Sprint. WhatsApp fallback available.",
};

export default function ConsultationPage() {
  return (
    <main>
      <Section className="text-center">
        <h1 className="text-2xl font-semibold md:text-4xl">Book your 15-min consultation</h1>
        <p className="mt-2 text-neutral-600">
          We’ll align ICP, geo, and budget — then launch your 14-day Ads Sprint.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button data-analytics-id="consult_start" asChild>
            <a href="/consultation">Start Campaign</a>
          </Button>
          <Button data-analytics-id="consult_whatsapp" variant="ghost" asChild>
            <a href={WA} aria-label="WhatsApp Us">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
            </a>
          </Button>
        </div>
      </Section>

      <Section className="pt-4">
        {CAL ? (
          <div
            id="calendar"
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-neutral-200 bg-white"
          >
            <iframe
              title="Calendly"
              src={CAL}
              className="h-[70vh] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="mx-auto w-full max-w-xl rounded-xl border border-neutral-200 bg-white p-6 text-center">
            <p className="text-neutral-700">
              Calendly isn’t configured yet. Set
              <code className="mx-1 rounded bg-neutral-100 px-1 py-0.5">NEXT_PUBLIC_CALENDLY_URL</code>
              and reload.
            </p>
            <div className="mt-4">
              <Button data-analytics-id="consult_whatsapp_alt" variant="outline" asChild>
                <a href={WA}>
                  <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp instead
                </a>
              </Button>
            </div>
          </div>
        )}

        <p className="mt-4 text-center text-sm text-neutral-600">
          Prefer WhatsApp? <a className="underline underline-offset-4" href={WA}>Chat now</a>.
        </p>
      </Section>
    </main>
  );
}
