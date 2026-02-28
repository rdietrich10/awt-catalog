import { Stethoscope, FlaskConical, ShieldCheck, Truck } from "lucide-react";

const badges = [
  { icon: Stethoscope, label: "Physician-Backed" },
  { icon: FlaskConical, label: "503A/503B Compounded" },
  { icon: ShieldCheck, label: "COA-Verified Quality" },
  { icon: Truck, label: "Ships Nationwide" },
] as const;

export function TrustBar() {
  return (
    <section className="border-y border-brand-border bg-brand-grey-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-3">
              <Icon className="w-5 h-5 text-brand-gold shrink-0" aria-hidden />
              <span className="font-display text-caption sm:text-body-sm tracking-wider uppercase text-brand-silver">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
