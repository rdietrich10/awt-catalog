"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getBlurDataURL } from "@/lib/blurData";
import { cn } from "@/lib/utils";

const SLIDES = [
  "/images/lifestyle/showcase-transformation.png",
  "/images/lifestyle/showcase-strength.png",
  "/images/lifestyle/showcase-restoration.png",
  "/images/lifestyle/showcase-balance.png",
  "/images/lifestyle/showcase-timelessness.png",
  "/images/lifestyle/showcase-stillness.png",
] as const;

const DURATION = 8000;
const FADE = 1200;

type ZoomOrigin = "center" | "top left" | "top right" | "bottom left" | "bottom right" | "center left" | "center right";

const ZOOM_ORIGINS: ZoomOrigin[] = [
  "center right",
  "center left",
  "top right",
  "bottom left",
  "center",
  "top left",
];

function Slide({
  src,
  active,
  zoomOrigin,
}: {
  src: string;
  active: boolean;
  zoomOrigin: ZoomOrigin;
}) {
  const blur = getBlurDataURL(src);

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity ease-in-out",
        active ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDuration: `${FADE}ms` }}
      aria-hidden={!active}
    >
      <div
        className={cn(
          "absolute inset-0",
          active && "animate-ken-burns"
        )}
        style={{ transformOrigin: zoomOrigin }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
        />
      </div>
    </div>
  );
}

export function ShowcaseReel() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, DURATION);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <section className="relative w-full overflow-hidden border-t border-b border-brand-border">
      <div className="relative aspect-[21/9] md:aspect-[3/1]">
        {SLIDES.map((src, i) => (
          <Slide
            key={src}
            src={src}
            active={current === i}
            zoomOrigin={ZOOM_ORIGINS[i]}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 via-transparent to-brand-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-brand-black/50 pointer-events-none" />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={cn(
                "h-0.5 rounded-full transition-all duration-500",
                current === i
                  ? "w-8 bg-brand-gold"
                  : "w-4 bg-brand-silver/30 hover:bg-brand-silver/50"
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
