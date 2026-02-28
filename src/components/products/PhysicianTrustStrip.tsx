import { Stethoscope, FileText, Monitor } from "lucide-react";
import Link from "next/link";

const trustPoints = [
  { icon: Stethoscope, text: "Physician-reviewed before dispensing" },
  { icon: FileText, text: "Medical records maintained" },
  { icon: Monitor, text: "Telehealth consultation available" },
] as const;

export function PhysicianTrustStrip() {
  return (
    <div className="border border-brand-border bg-brand-grey-900/30 p-4">
      <div className="space-y-2">
        {trustPoints.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-brand-gold shrink-0" aria-hidden />
            <span className="text-caption text-brand-silver">{text}</span>
          </div>
        ))}
      </div>
      <Link
        href="/about"
        className="mt-3 inline-block text-caption text-brand-silver-dark hover:text-brand-gold transition-colors underline"
      >
        Learn about our medical model
      </Link>
    </div>
  );
}
