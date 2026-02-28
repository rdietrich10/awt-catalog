import { Search, UserCheck, PackageCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HOW_IT_WORKS_STEPS } from "@/data/copy";

const icons = [Search, UserCheck, PackageCheck] as const;

export function HowItWorksPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
          How It Works
        </h2>
        <p className="mt-3 text-body-sm text-brand-silver text-center max-w-xl mx-auto">
          From browsing to delivery in three simple steps—physician oversight at every stage.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brand-border bg-brand-grey-900/60">
                  <Icon className="w-6 h-6 text-brand-gold" aria-hidden />
                </div>
                <span className="mt-4 block font-display text-caption tracking-widest uppercase text-brand-gold">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 font-display text-body-sm uppercase tracking-wider text-brand-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-body-sm text-brand-silver max-w-xs mx-auto">
                  {step.description}
                </p>
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-brand-border" aria-hidden />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/how-it-works" variant="secondary" size="md">
            Learn More
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
