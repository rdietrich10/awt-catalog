import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how our advanced therapeutics ordering process works — from product selection and medical screening to provider review, invoicing, and fulfillment.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    number: 1,
    title: "Product Selection",
    description:
      "Consumers may browse available advanced therapeutic options and select the products they are interested in requesting.",
  },
  {
    number: 2,
    title: "Contact Information",
    description:
      "The consumer provides basic contact details to establish a secure profile and enable communication regarding their request.",
  },
  {
    number: 3,
    title: "Medical Screening Questions",
    description:
      "The consumer completes a brief health questionnaire that includes relevant medical history, current conditions, medications, and safety considerations. This information helps determine whether the requested therapy may be appropriate.",
  },
  {
    number: 4,
    title: "Provider Review & Approval",
    description:
      "The request is forwarded to a licensed physician or qualified healthcare provider for clinical evaluation. The provider may:",
    subItems: [
      "Approve the request as submitted",
      "Request additional information",
      "Recommend modifications or alternatives",
      "Decline the request if medically inappropriate",
    ],
    footnote: "No products are dispensed without provider authorization.",
  },
  {
    number: 5,
    title: "Invoice & Authorization to Proceed",
    description:
      "If approved, the consumer receives an invoice via email and/or secure text message with instructions to complete payment.",
  },
  {
    number: 6,
    title: "Fulfillment & Shipping",
    description:
      "Once payment is confirmed, the order is processed and shipped directly to the consumer using appropriate handling and packaging protocols.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "How It Works" },
        ]}
      />
      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          How Our Program Works
        </h1>
        <p className="text-body-sm text-brand-silver mb-10">
          Our advanced therapeutics ordering process is designed to be simple,
          secure, and medically supervised at every step.
        </p>

        <ol className="space-y-8">
          {steps.map((step) => (
            <li
              key={step.number}
              className="border border-brand-border p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 flex h-10 w-10 items-center justify-center border border-brand-border font-display text-body-sm text-brand-gold">
                  {step.number}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-lg uppercase tracking-wider text-brand-white">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-body-sm text-brand-silver">
                    {step.description}
                  </p>
                  {step.subItems && (
                    <ul className="mt-3 space-y-1 pl-4">
                      {step.subItems.map((item) => (
                        <li
                          key={item}
                          className="text-body-sm text-brand-silver before:content-['–'] before:mr-2 before:text-brand-silver-dark"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.footnote && (
                    <p className="mt-3 text-body-sm text-brand-silver-dark italic">
                      {step.footnote}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 border border-brand-border bg-brand-black p-6 sm:p-8">
          <h2 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-3">
            Important Medical Notice
          </h2>
          <p className="text-body-sm text-brand-silver">
            All therapies are subject to provider approval based on individual
            medical assessment. Submission of a request does not guarantee
            approval or fulfillment. Patients should always follow the guidance
            of their healthcare provider.
          </p>
        </div>

        <div className="mt-4 border border-brand-border bg-brand-black p-6 sm:p-8">
          <h2 className="font-display text-sm uppercase tracking-wider text-brand-gold mb-3">
            Telehealth Disclosure
          </h2>
          <p className="text-body-sm text-brand-silver">
            This process constitutes a telehealth-enabled medical service. A
            provider-patient relationship may be established where required by
            applicable state and federal regulations. All clinical decisions are
            made independently by the reviewing provider in accordance with
            accepted standards of care.
          </p>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
