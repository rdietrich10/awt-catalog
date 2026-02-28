import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from "@/data/company";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <div className="mt-8 max-w-2xl">
        <h1 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">
          Contact Us
        </h1>
        <p className="text-body-sm text-brand-silver mb-8">
          Have questions about our products or need assistance? Reach out—we&apos;re here to help.
        </p>
        <div className="space-y-6">
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="flex items-start gap-4 text-brand-silver hover:text-brand-white transition-colors group"
          >
            <Mail className="w-5 h-5 shrink-0 mt-0.5 text-brand-grey-500 group-hover:text-brand-silver" />
            <div>
              <p className="text-label font-display tracking-wider uppercase text-brand-silver-dark">
                Email
              </p>
              <p className="text-body-sm mt-1">{COMPANY_EMAIL}</p>
            </div>
          </a>
          <a
            href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`}
            className="flex items-start gap-4 text-brand-silver hover:text-brand-white transition-colors group"
          >
            <Phone className="w-5 h-5 shrink-0 mt-0.5 text-brand-grey-500 group-hover:text-brand-silver" />
            <div>
              <p className="text-label font-display tracking-wider uppercase text-brand-silver-dark">
                Phone
              </p>
              <p className="text-body-sm mt-1">{COMPANY_PHONE}</p>
            </div>
          </a>
          <div className="flex items-start gap-4 text-brand-silver">
            <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-brand-grey-500" />
            <div>
              <p className="text-label font-display tracking-wider uppercase text-brand-silver-dark">
                Address
              </p>
              <p className="text-body-sm mt-1">{COMPANY_ADDRESS}</p>
            </div>
          </div>
        </div>
        <Link
          href="/products"
          className="mt-10 inline-block text-body-sm text-brand-silver hover:text-brand-white transition-colors underline"
        >
          Browse our catalog
        </Link>
      </div>
    </div>
  );
}
