"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps {
  children: React.ReactNode[];
  /** Auto-scroll speed — higher is faster. 0 disables auto-scroll. */
  speed?: number;
  className?: string;
  /** Accessible label for the carousel region */
  ariaLabel?: string;
}

export function InfiniteCarousel({
  children,
  speed = 0.8,
  className,
  ariaLabel = "Carousel",
}: InfiniteCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, dragFree: true },
    speed > 0
      ? [AutoScroll({ speed, stopOnInteraction: false, stopOnMouseEnter: true })]
      : []
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (children.length === 0) return null;

  return (
    <div
      className={cn("relative group/carousel", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div ref={emblaRef} className="overflow-hidden" aria-live="polite">
        <div className="flex gap-4">
          {children.map((child, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${children.length}`}
              className="flex-[0_0_72%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_23%]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center border border-brand-border bg-brand-black/80 backdrop-blur text-brand-silver hover:text-brand-white hover:border-brand-silver-dark transition-colors opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center border border-brand-border bg-brand-black/80 backdrop-blur text-brand-silver hover:text-brand-white hover:border-brand-silver-dark transition-colors opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
