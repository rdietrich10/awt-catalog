import {
  FlaskConical,
  Stethoscope,
  ShieldCheck,
  CalendarOff,
  Clock,
  Truck,
} from "lucide-react";
import { WHY_AW_PROPS } from "@/data/copy";

const icons = [FlaskConical, Stethoscope, ShieldCheck, CalendarOff, Clock, Truck] as const;

export function ValueProps() {
  return (
    <section className="py-16 md:py-24 bg-brand-grey-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
          Why AW Therapeutics
        </h2>
        <p className="mt-3 text-body-sm text-brand-silver text-center max-w-xl mx-auto">
          Quality, transparency, and physician oversight in every order.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {WHY_AW_PROPS.map((prop, i) => {
            const Icon = icons[i];
            return (
              <div
                key={prop.title}
                className="flex gap-4 p-6 border border-brand-border rounded-sm hover:border-brand-grey-500 transition-colors"
              >
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border">
                  <Icon className="w-5 h-5 text-brand-gold" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-body-sm uppercase tracking-wider text-brand-white">
                    {prop.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-brand-silver leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
