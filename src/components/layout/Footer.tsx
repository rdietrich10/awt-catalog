import Link from "next/link";
import { PROTOCOL_STATEMENT } from "@/data/copy";
import { COMPANY_ADDRESS, COMPANY_PHONE } from "@/data/company";

export function Footer() {
  return (
    <footer className="border-t border-brand-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-[calc(3rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-display text-body-sm tracking-wider uppercase text-brand-silver">
                Americare Wellness
              </p>
              <p className="mt-1 text-body-sm text-brand-silver-dark">
                {COMPANY_ADDRESS}
              </p>
              <a
                href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`}
                className="mt-1 block text-body-sm text-brand-silver-dark hover:text-brand-silver transition-colors"
              >
                {COMPANY_PHONE}
              </a>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link href="/products" className="text-body-sm py-2 min-h-[44px] flex items-center text-brand-silver hover:text-brand-white transition-colors">
                Catalog
              </Link>
              <Link href="/categories" className="text-body-sm py-2 min-h-[44px] flex items-center text-brand-silver hover:text-brand-white transition-colors">
                Categories
              </Link>
              <Link href="/knowledge" className="text-body-sm py-2 min-h-[44px] flex items-center text-brand-silver hover:text-brand-white transition-colors">
                Knowledge
              </Link>
              <Link href="/interest-list" className="text-body-sm py-2 min-h-[44px] flex items-center text-brand-silver hover:text-brand-white transition-colors">
                My List
              </Link>
              <Link href="/contact" className="text-body-sm py-2 min-h-[44px] flex items-center text-brand-silver hover:text-brand-white transition-colors">
                Contact Us
              </Link>
              <Link href="/policies" className="text-body-sm py-2 min-h-[44px] flex items-center text-brand-silver hover:text-brand-white transition-colors">
                Policies
              </Link>
              <Link href="/quality-control" className="text-body-sm py-2 min-h-[44px] flex items-center text-brand-silver hover:text-brand-white transition-colors">
                Quality Control
              </Link>
            </nav>
          </div>
          <p className="text-body-sm text-brand-silver-dark text-center max-w-2xl mx-auto">
            {PROTOCOL_STATEMENT}
          </p>
        </div>
      </div>
    </footer>
  );
}
