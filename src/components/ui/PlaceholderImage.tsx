"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getBlurDataURL } from "@/lib/blurData";

interface PlaceholderImageProps {
  /** Optional image URL. When provided, renders real image; falls back to placeholder on error. */
  src?: string;
  /** Aspect ratio: "16/9" | "4/3" | "1/1" | "3/4" | "1/2" */
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/4" | "1/2" | "full";
  /** Optional label shown in the center (placeholder only) */
  label?: string;
  /** Optional context (e.g. "Hero", "Product", "Category") */
  context?: string;
  /** Image sizes for responsive loading (e.g. "(max-width: 768px) 100vw, 33vw" for grid) */
  sizes?: string;
  /** Preload above-the-fold images for faster LCP */
  priority?: boolean;
  className?: string;
}

/** Minimal vial silhouette SVG - Porsche Design aesthetic, grey on black */
const VialSvg = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-1/3 h-1/3", className)}
    aria-hidden
  >
    <path
      d="M 60 20 L 60 20 L 95 20 L 95 140 Q 95 170 60 180 Q 25 170 25 140 L 25 20 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.25"
      fill="none"
    />
    <path
      d="M 60 140 L 60 180"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.15"
    />
    <ellipse
      cx="60"
      cy="20"
      rx="35"
      ry="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.2"
      fill="none"
    />
  </svg>
);

export function PlaceholderImage({
  src,
  aspectRatio = "1/1",
  label,
  context,
  sizes,
  priority = false,
  className,
}: PlaceholderImageProps) {
  const [imageError, setImageError] = useState(false);
  const showRealImage = src && !imageError;

  const blurDataURL = src ? getBlurDataURL(src) : undefined;

  const aspectClassMap = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
    "1/2": "aspect-[1/2]",
    full: "aspect-[21/9] min-h-[280px]",
  };
  const aspectClass =
    aspectRatio === "full" ? "aspect-[21/9] min-h-[280px]" : aspectClassMap[aspectRatio] ?? "aspect-square";

  const containerClass = cn(
    "relative flex items-center justify-center w-full overflow-hidden rounded-sm border border-brand-border bg-brand-black",
    aspectClass,
    className
  );

  if (showRealImage) {
    return (
      <div className={cn(containerClass, "relative")} role="img" aria-label={label || "Product image"}>
        <Image
          src={src}
          alt={label || ""}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={containerClass} role="img" aria-label={label || "Placeholder image"}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-silver">
        <VialSvg />
        {label && (
          <span className="mt-2 text-caption font-display tracking-widest uppercase opacity-70">
            {label}
          </span>
        )}
        {context && !label && (
          <span className="mt-2 text-caption font-display tracking-widest uppercase opacity-60">
            {context}
          </span>
        )}
      </div>
    </div>
  );
}
