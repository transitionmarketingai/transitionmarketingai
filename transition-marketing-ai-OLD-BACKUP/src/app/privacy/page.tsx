import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Privacy Policy — Transition Marketing AI",
  description: "DPDP & GDPR-aware privacy practices for Indian businesses.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold md:text-3xl">Privacy Policy</h1>
        <p className="mt-3 text-neutral-700">
          We respect your privacy. This policy explains what we collect, why we collect it, and how you can control it.
        </p>

        <h2 className="mt-8 text-xl font-semibold">What we collect</h2>
        <ul className="mt-2 space-y-1 list-disc pl-5 text-neutral-700">
          <li>Contact details you submit (name, email, phone/WhatsApp, company).</li>
          <li>Campaign data for enquiries we generate (ad/source, timestamp, city/locality).</li>
          <li>Technical data for analytics (cookies, device/browser, pages viewed).</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">How we use your data</h2>
        <ul className="mt-2 space-y-1 list-disc pl-5 text-neutral-700">
          <li>To run ads and deliver hot, in-market enquiries to you.</li>
          <li>To verify enquiries (WhatsApp/phone checks) and improve quality.</li>
          <li>To provide reporting and improve performance.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Legal basis & consent</h2>
        <p className="mt-2 text-neutral-700">
          We operate in line with India’s DPDP Act and are GDPR aware. By submitting forms or using WhatsApp with us, you consent to processing for lead generation, qualification, and communication.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Sharing</h2>
        <p className="mt-2 text-neutral-700">
          We do not sell personal data. We share limited data with processors (analytics, WhatsApp providers, ad platforms) strictly to deliver services.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Retention</h2>
        <p className="mt-2 text-neutral-700">
          We keep data only as long as necessary for campaigns, reporting, legal or tax compliance.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Your choices</h2>
        <ul className="mt-2 space-y-1 list-disc pl-5 text-neutral-700">
          <li>Access, update, or delete your data by contacting us.</li>
          <li>Opt-out of marketing at any time.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-neutral-700">
          Email: support@transitionmarketingai.com • WhatsApp: +91-XXXXXXXXXX
        </p>
      </Section>
    </main>
  );
}
