"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="relative block group">
      {/* Default white logo */}
      <img
        src="/images/brand/logo-primary.svg"
        alt="AW Therapeutics"
        className="h-5 md:h-6 w-auto transition-opacity duration-300 group-hover:opacity-0"
      />
      {/* Gold shimmer overlay — masked through the logo shape */}
      <div
        className="absolute inset-0 h-5 md:h-6 w-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-gold-shimmer group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
        style={{
          maskImage: "url(/images/brand/logo-inverse.svg)",
          WebkitMaskImage: "url(/images/brand/logo-inverse.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
          backgroundImage:
            "linear-gradient(90deg, #B8860B 0%, #D4AF37 20%, #F4D03F 40%, #D4AF37 50%, #B8860B 60%, #D4AF37 80%, #F4D03F 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    </Link>
  );
}
