"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Search, UserCheck, PackageCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HOW_IT_WORKS_STEPS } from "@/data/copy";
import { getBlurDataURL } from "@/lib/blurData";
import { cn } from "@/lib/utils";

const icons = [Search, UserCheck, PackageCheck] as const;

const STEP_IMAGES = [
  "/images/lifestyle/how-step-1-browse.png",
  "/images/lifestyle/how-step-2-review.png",
  "/images/lifestyle/how-step-3-ship.png",
] as const;

const VIGNETTE_X = ["25%", "50%", "75%"] as const;
const IMAGE_SHIFT = ["-25%", "0%", "25%"] as const;

function StepBackdrop({ index, active }: { index: number; active: boolean }) {
  const src = STEP_IMAGES[index];
  const blur = getBlurDataURL(src);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-700 ease-out pointer-events-none",
        active ? "opacity-100" : "opacity-0"
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${IMAGE_SHIFT[index]}) scale(1.8)` }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover object-center"
          sizes="180vw"
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 40% 70% at ${VIGNETTE_X[index]} 50%,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.55) 30%,
            rgba(0,0,0,0.82) 55%,
            rgba(0,0,0,0.95) 75%,
            rgba(0,0,0,0.99) 100%
          )`,
        }}
      />
    </div>
  );
}

function StepCard({
  index,
  active,
  onEnter,
  onLeave,
}: {
  index: number;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const step = HOW_IT_WORKS_STEPS[index];
  const Icon = icons[index];
  const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

  return (
    <div
      className="relative text-center"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={cn(
          "mx-auto flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500",
          active
            ? "border-brand-gold/40 bg-brand-gold/10 shadow-gold-glow"
            : "border-brand-border bg-brand-grey-900/60"
        )}
      >
        <Icon
          className={cn(
            "w-6 h-6 transition-colors duration-500",
            active ? "text-brand-gold-light" : "text-brand-gold"
          )}
          aria-hidden
        />
      </div>
      <span className="mt-4 block font-display text-caption tracking-widest uppercase text-brand-gold">
        Step {index + 1}
      </span>
      <h3
        className={cn(
          "mt-2 font-display text-body-sm uppercase tracking-wider transition-colors duration-500",
          active ? "text-brand-white" : "text-brand-white"
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          "mt-2 text-body-sm max-w-xs mx-auto transition-colors duration-500",
          active ? "text-brand-silver-light" : "text-brand-silver"
        )}
      >
        {step.description}
      </p>
      {!isLast && (
        <div
          className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-brand-border"
          aria-hidden
        />
      )}
    </div>
  );
}

export function HowItWorksPreview() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handleEnter = useCallback((i: number) => () => setHoveredStep(i), []);
  const handleLeave = useCallback(() => setHoveredStep(null), []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {STEP_IMAGES.map((_, i) => (
        <StepBackdrop key={i} index={i} active={hoveredStep === i} />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-white uppercase text-center">
          How It Works
        </h2>
        <p className="mt-3 text-body-sm text-brand-silver text-center max-w-xl mx-auto">
          From browsing to delivery in three simple steps—physician oversight at every stage.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {HOW_IT_WORKS_STEPS.map((_, i) => (
            <StepCard
              key={i}
              index={i}
              active={hoveredStep === i}
              onEnter={handleEnter(i)}
              onLeave={handleLeave}
            />
          ))}
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
