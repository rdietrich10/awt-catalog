"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { ANNOUNCEMENT_TEXT, ANNOUNCEMENT_HREF } from "@/data/copy";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-gold text-brand-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center">
        <Link
          href={ANNOUNCEMENT_HREF}
          className="text-caption sm:text-body-sm font-display tracking-wider uppercase hover:underline underline-offset-2"
        >
          {ANNOUNCEMENT_TEXT}
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-2 sm:right-4 p-1 hover:opacity-70 transition-opacity min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
