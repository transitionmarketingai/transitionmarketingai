import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Terms of Service — Transition Marketing AI",
  description: "Simple terms for our performance-first services.",
};

export default function TermsPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold md:text-3xl">Terms of Service</h1>
        <p className="mt-3 text-neutral-700">
          These terms govern your use of Transition Marketing AI’s services. By engaging us, you agree to the terms below.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Services</h2>
        <p className="mt-2 text-neutral-700">
          We run performance marketing campaigns (Meta/Google) to generate hot, in-market enquiries. We verify enquiries via WhatsApp/phone and deliver reports. Exact scope is defined in each proposal/SOW.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Minimum Qualified Enquiry (MQE)</h2>
        <ul className="mt-2 space-y-1 list-disc pl-5 text-neutral-700">
          <li>Ad/source trail + timestamp.</li>
          <li>Reachable phone/WhatsApp verified.</li>
          <li>Basic intent captured (need/budget/locality or equivalent).</li>
        </ul>
        <p className="mt-2 text-neutral-700">
          Invalid/spam contacts are replaced 1:1 within 48 hours as per SLA.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Fees & billing</h2>
        <ul className="mt-2 space-y-1 list-disc pl-5 text-neutral-700">
          <li>Management fee is billed monthly; media budget is billed to client platforms directly.</li>
          <li>Any per-MQE pricing or success kicker will be defined in the SOW.</li>
          <li>All fees are exclusive of applicable taxes.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Client responsibilities</h2>
        <ul className="mt-2 space-y-1 list-disc pl-5 text-neutral-700">
          <li>Provide timely approvals (creatives, landing copy, compliance).</li>
          <li>Answer leads quickly (target: &lt;5 minutes for best outcomes).</li>
          <li>Comply with sector regulations (e.g., healthcare, RERA for real estate).</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Acceptable use</h2>
        <p className="mt-2 text-neutral-700">
          No illegal, misleading, or harmful campaigns. We may decline or suspend campaigns that violate ad platform policies or laws.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Limitation of liability</h2>
        <p className="mt-2 text-neutral-700">
          We provide services on a best-effort basis. We are not liable for indirect or consequential losses. Liability is capped to the fees paid in the last 3 months.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Termination</h2>
        <p className="mt-2 text-neutral-700">
          Either party may terminate with written notice per SOW. Outstanding fees remain payable.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-neutral-700">
          Email: support@transitionmarketingai.com • WhatsApp: +91-XXXXXXXXXX
        </p>
      </Section>
    </main>
  );
}
