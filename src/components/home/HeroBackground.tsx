"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getBlurDataURL } from "@/lib/blurData";
import { cn } from "@/lib/utils";

const SLIDES = [
  "/images/lifestyle/hero-reel-1.png",
  "/images/lifestyle/hero-reel-2.png",
  "/images/lifestyle/hero-reel-3.png",
  "/images/lifestyle/hero-reel-4.png",
  "/images/lifestyle/hero-reel-5.png",
  "/images/lifestyle/hero-reel-6.png",
] as const;

const DURATION = 8000;
const FADE_MS = 1200;

type Origin = "center" | "top left" | "top right" | "bottom left" | "bottom right" | "center left" | "center right";

const ZOOM_ORIGINS: Origin[] = [
  "center",
  "center left",
  "top right",
  "center",
  "bottom left",
  "center right",
];

function Slide({ src, active, origin }: { src: string; active: boolean; origin: Origin }) {
  const blur = getBlurDataURL(src);

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity",
        active ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDuration: `${FADE_MS}ms`, transitionTimingFunction: "ease-in" }}
      aria-hidden={!active}
    >
      <div
        className={cn("absolute inset-0", active && "animate-hero-kb")}
        style={{ transformOrigin: origin }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={src === SLIDES[0]}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
        />
      </div>
    </div>
  );
}

export function HeroBackground() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, DURATION);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((src, i) => (
        <Slide key={src} src={src} active={current === i} origin={ZOOM_ORIGINS[i]} />
      ))}
    </div>
  );
}
