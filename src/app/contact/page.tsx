import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from "@/data/company";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AW Therapeutics. Reach us by email, phone, or mail for questions about products, orders, and support.",
  alternates: { canonical: "/contact" },
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: COMPANY_EMAIL,
    href: `mailto:${COMPANY_EMAIL}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: COMPANY_PHONE,
    href: `tel:${COMPANY_PHONE.replace(/\D/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: COMPANY_ADDRESS,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <div className="mt-8">
        <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-brand-white mb-4">
          Get in Touch
        </h1>
        <p className="text-body-sm text-brand-silver mb-12 max-w-xl">
          Have questions about our products, need help with an order, or want to
          learn more? Send us a message and our team will respond within 24 hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <div className="border border-brand-border p-6 space-y-6">
              <h2 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
                Contact Information
              </h2>
              {contactMethods.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-start gap-4">
                    <Icon className="w-5 h-5 shrink-0 mt-0.5 text-brand-gold" aria-hidden />
                    <div>
                      <p className="text-caption font-display tracking-wider uppercase text-brand-silver-dark">
                        {label}
                      </p>
                      <p className="text-body-sm mt-0.5 text-brand-silver">{value}</p>
                    </div>
                  </div>
                );

                if (href) {
                  return (
                    <a
                      key={label}
                      href={href}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={label}>{content}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
