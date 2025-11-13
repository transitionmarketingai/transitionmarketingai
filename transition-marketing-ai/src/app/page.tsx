"use client";

import { useState, FormEvent } from "react";
import { MessageCircle, Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const INDUSTRIES = [
  { name: "Professional Services", example: "Lawyers, consultants, accountants" },
  { name: "Healthcare & Wellness", example: "Clinics, hospitals, wellness centers" },
  { name: "Real Estate & Builders", example: "Brokers, channel partners, builders" },
  { name: "Dealerships & Service Centers", example: "Car dealers, service centers" },
  { name: "Retail & Local Businesses", example: "Shops, local stores, franchises" },
  { name: "Startups & SaaS", example: "Tech startups, SaaS companies" },
  { name: "Education & Training Providers", example: "Schools, coaching centers, trainers" },
  { name: "Home & Renovation Services", example: "Interior designers, contractors" },
  { name: "Event, Media & Hospitality", example: "Event planners, hotels, restaurants" },
  { name: "Travel & Tour Services", example: "Travel agents, tour operators" },
  { name: "Finance & Insurance Services", example: "Financial advisors, insurance agents" },
  { name: "Freelancers & Creators", example: "Independent professionals, content creators" },
  { name: "Logistics & B2B Service Providers", example: "Logistics companies, B2B services" },
];

const LEAD_REQUIREMENTS = [
  "20–40 leads / month",
  "50–100 leads / month",
  "150–300+ leads / month",
];

const FAQ_ITEMS = [
  {
    q: "How are the leads generated?",
    a: "We use AI + human researchers to scrape, clean, and verify data from multiple channels like Google Maps, LinkedIn, Facebook, Google Ads, and industry directories.",
  },
  {
    q: "Are the leads exclusive to me?",
    a: "Yes. Leads generated for you are not resold to other clients.",
  },
  {
    q: "What does 'verified' mean?",
    a: "We validate email format and deliverability, test phone numbers, and confirm business details before we add them to your list.",
  },
  {
    q: "How long before I see my first leads?",
    a: "Within 7 days of onboarding. If we can&apos;t deliver, you don&apos;t pay.",
  },
  {
    q: "Do you run ads for us?",
    a: "We primarily focus on lead scraping and verification. We can discuss ad support separately if needed.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There's no lock-in. You can cancel before your next billing cycle.",
  },
];

function Navbar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight text-slate-50">
            Transition Marketing AI
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("how-it-works")}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo("industries")}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Industries
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo("get-started")}
              className="bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors"
            >
              Get 5 Free Leads
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-slate-950 text-slate-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 leading-tight">
              We Get You 5–20 Qualified Leads Every Week. First 5 Free. No Commitments.
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-300">
              No ads. No guessing. No BS. We scrape, verify, and deliver real people ready to talk business – every week.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("get-started")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Get My 5 Free Leads
              </button>
              <button
                onClick={() => scrollTo("get-started")}
                className="border border-slate-600 text-slate-100 hover:bg-slate-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Talk to a Specialist
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Made in India • SSL Secured • No long-term contracts
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-200">Lead Dashboard</h3>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  Live
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Rajesh Kumar", industry: "Real Estate", score: "92" },
                  { name: "Priya Sharma", industry: "Healthcare", score: "88" },
                  { name: "Amit Patel", industry: "Education", score: "95" },
                ].map((lead, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-200">{lead.name}</p>
                      <p className="text-xs text-slate-400">{lead.industry}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Quality</p>
                      <p className="text-sm font-semibold text-emerald-400">{lead.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="bg-slate-50 border-y border-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-slate-600 mb-4">
          Trusted by businesses across India
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Real Estate", "Healthcare", "Education", "Agencies", "Local Services"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "You tell us who you want",
      description: "Your ideal customer, industries, locations, budgets.",
    },
    {
      title: "We find them",
      description: "Across Google Maps, LinkedIn, Facebook, Ads, and top directories.",
    },
    {
      title: "We verify everything",
      description: "We validate phone, email, and business details. No fake data.",
    },
    {
      title: "You get leads every week",
      description: "Delivered to your dashboard and WhatsApp every 7 days.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-slate-900">
          How It Works
        </h2>
        <p className="mt-4 text-base md:text-lg text-slate-500 text-center">
          Simple 4-step system to get you sales-ready leads every week.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mx-auto mb-4">
                {idx + 1}
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="bg-slate-900 text-slate-50 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Our 7-Day, 5-Lead Guarantee
        </h2>
        <div className="rounded-2xl border border-emerald-400 bg-slate-900/60 px-6 py-6 mt-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            Guaranteed
          </div>
          <p className="text-2xl sm:text-3xl font-semibold mb-8">
            If we don&apos;t deliver your first 5 verified leads in 7 days, you don&apos;t pay. Period.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>No setup fee.</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>No long-term lock-in.</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>Cancel anytime if we don&apos;t perform.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesGrid() {
  return (
    <section id="industries" className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-slate-900">
          Who We Get Leads For
        </h2>
        <p className="mt-4 text-base md:text-lg text-slate-500 text-center">
          We specialize in appointment and enquiry-driven businesses.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-semibold text-slate-900 mb-2">{industry.name}</h3>
              <p className="text-sm text-slate-600">Example: {industry.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueStack() {
  const benefits = [
    "20–300 qualified leads per month (depending on plan)",
    "AI + human-verified phone numbers and emails",
    "Lead quality scores (0–100)",
    "Weekly delivery schedule",
    "Industry-specific targeting",
    "Multi-channel scraping system",
    "WhatsApp + dashboard access",
    "First 5 leads free",
    "7-day performance guarantee",
    "Cancel-anytime policy",
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              What You Get With Transition Marketing AI
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600">
              Not just data. A full lead-generation system.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-sm md:text-base text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const plans = [
    {
      name: "Starter",
      subtitle: "For New & Local Businesses",
      price: "₹15,000",
      period: "/ month",
      leads: "20–40 qualified leads / month",
      bullets: [
        "Ideal for local services, solo professionals, clinics, consultants.",
        "AI + human-verified contacts.",
        "Weekly delivery.",
        "WhatsApp + dashboard access.",
      ],
      popular: false,
    },
    {
      name: "Growth",
      subtitle: "Most Popular",
      price: "₹25,000",
      period: "/ month",
      leads: "50–100 qualified leads / month",
      bullets: [
        "For growing teams & agencies.",
        "Multi-channel lead generation.",
        "Priority lead verification.",
        "Weekly reporting & support.",
      ],
      popular: true,
    },
    {
      name: "Scale",
      subtitle: "For Serious Growth",
      price: "₹50,000+",
      period: "/ month",
      leads: "150–300+ qualified leads / month",
      bullets: [
        "For enterprises & high-volume industries.",
        "Dedicated lead researcher.",
        "Custom industries and geographies.",
        "Advanced reporting and integrations.",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-slate-900">
          Simple Monthly Plans
        </h2>
        <p className="mt-4 text-base md:text-lg text-slate-500 text-center">
          Start with 5 free leads before you commit.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-white p-8 shadow-sm relative ${
                plan.popular
                  ? "border-indigo-500 md:-mt-2 md:scale-[1.02]"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{plan.subtitle}</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-600">{plan.period}</span>
              </div>
              <p className="text-slate-700 font-medium mb-6">{plan.leads}</p>
              <div className="h-px bg-slate-200 mb-6"></div>
              <ul className="space-y-3 mb-8">
                {plan.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{bullet}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo("get-started")}
                className="w-full py-3 rounded-lg font-semibold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
              >
                Get 5 Free Leads
              </button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-600">
          Need a custom volume? Talk to us.
        </p>
      </div>
    </section>
  );
}

function LeadFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    industry: "",
    leadRequirement: "",
    nextStep: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.businessName.trim()) newErrors.businessName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.industry) newErrors.industry = "Required";
    if (!formData.leadRequirement) newErrors.leadRequirement = "Required";
    if (!formData.nextStep) newErrors.nextStep = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setErrors({});
  };

  if (submitted) {
    return (
      <section id="get-started" className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white shadow-lg border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Thanks!</h2>
            <p className="text-slate-700">
              We&apos;ve received your details. We&apos;ll review your business and follow up within a few hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="get-started" className="bg-slate-50 py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-slate-900">
          Get Your First 5 Leads Free
        </h2>
        <p className="mt-4 text-base md:text-lg text-slate-500 text-center">
          Tell us a bit about your business so we can see if we&apos;re a fit.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white shadow-lg border border-slate-200 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.fullName ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Business name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.businessName ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.businessName && (
                <p className="mt-1 text-xs text-red-500">{errors.businessName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Work email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.email ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.phone ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.industry ? "border-red-500" : "border-slate-300"
                }`}
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind.name} value={ind.name}>
                    {ind.name}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="mt-1 text-xs text-red-500">{errors.industry}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Monthly lead requirement <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.leadRequirement}
                onChange={(e) => setFormData({ ...formData, leadRequirement: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.leadRequirement ? "border-red-500" : "border-slate-300"
                }`}
              >
                <option value="">Select requirement</option>
                {LEAD_REQUIREMENTS.map((req) => (
                  <option key={req} value={req}>
                    {req}
                  </option>
                ))}
              </select>
              {errors.leadRequirement && (
                <p className="mt-1 text-xs text-red-500">{errors.leadRequirement}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Preferred next step <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="nextStep"
                    value="call-now"
                    checked={formData.nextStep === "call-now"}
                    onChange={(e) => setFormData({ ...formData, nextStep: e.target.value })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">Book a 15-min call now</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="nextStep"
                    value="call-back"
                    checked={formData.nextStep === "call-back"}
                    onChange={(e) => setFormData({ ...formData, nextStep: e.target.value })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">Have someone call me back</span>
                </label>
              </div>
              {errors.nextStep && <p className="mt-1 text-xs text-red-500">{errors.nextStep}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-indigo-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-600 transition-colors"
          >
            Submit & Get My 5 Free Leads
          </button>
          <p className="mt-4 text-center text-xs text-slate-600">
            We only onboard businesses we&apos;re confident we can generate leads for.
          </p>
        </form>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 space-y-0">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="border-b border-slate-200 py-4">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center cursor-pointer text-sm md:text-base font-medium text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <span>{item.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === idx && (
                <div className="mt-2 text-sm text-slate-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-2">Transition Marketing AI</h3>
            <p className="text-xs text-slate-400">
              India&apos;s AI-powered lead generation system. Made in India.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo("how-it-works")} className="hover:text-slate-200">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("pricing")} className="hover:text-slate-200">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("how-it-works")} className="hover:text-slate-200">
                  How It Works
                </button>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Contact</h4>
            <p className="text-xs text-slate-400 mb-2">support@transitionmarketingai.com</p>
            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Transition Marketing AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <GuaranteeSection />
        <IndustriesGrid />
        <ValueStack />
        <PricingSection />
        <LeadFormSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
