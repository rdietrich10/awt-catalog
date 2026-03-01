"use client";

import { useEffect, useState } from "react";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";
import {
  getCookiePreferences,
  setCookiePreferences,
  hasConsentBeenGiven,
  type CookiePreferences,
} from "@/lib/cookies";

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (val: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${checked ? "bg-brand-gold" : "bg-brand-grey-500"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full bg-brand-white shadow-sm transition-transform
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
  });

  useEffect(() => {
    if (!hasConsentBeenGiven()) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      const existing = getCookiePreferences();
      if (existing) setPrefs(existing);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const save = (overridePrefs?: CookiePreferences) => {
    const final = overridePrefs ?? prefs;
    setCookiePreferences(final);
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-update"));
  };

  const acceptAll = () => save({ essential: true, analytics: true });
  const rejectNonEssential = () => save({ essential: true, analytics: false });

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-2xl border border-brand-border bg-brand-black/95 backdrop-blur-sm p-6 shadow-lg">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-sm uppercase tracking-wider text-brand-white">
              Cookie Preferences
            </h2>
            <p className="mt-1 text-body-sm text-brand-silver leading-relaxed">
              We use essential cookies to keep things running and optional analytics cookies to understand
              how you use our site. Your data is never sold.{" "}
              <a
                href="/privacy#cookies"
                className="text-brand-gold hover:text-brand-gold-light underline underline-offset-2"
              >
                Learn more
              </a>
            </p>

            {expanded && (
              <div className="mt-4 space-y-3 border-t border-brand-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm text-brand-white font-medium">Essential</p>
                    <p className="text-caption text-brand-silver-dark">
                      Required for core functionality
                    </p>
                  </div>
                  <Toggle checked disabled label="Essential cookies — always on" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm text-brand-white font-medium">Analytics</p>
                    <p className="text-caption text-brand-silver-dark">
                      Google Analytics — anonymous usage data
                    </p>
                  </div>
                  <Toggle
                    checked={prefs.analytics}
                    onChange={(val) => setPrefs((p) => ({ ...p, analytics: val }))}
                    label="Analytics cookies"
                  />
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="btn-gold-full px-5 py-2 text-caption font-display uppercase tracking-wider"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="btn-border-silver px-5 py-2 text-caption font-display uppercase tracking-wider"
              >
                Reject Non-Essential
              </button>
              {expanded ? (
                <button
                  type="button"
                  onClick={() => save()}
                  className="btn-border-silver px-5 py-2 text-caption font-display uppercase tracking-wider"
                >
                  Save Preferences
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="flex items-center gap-1 text-caption text-brand-silver-dark hover:text-brand-white transition-colors"
                >
                  Manage
                  <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={rejectNonEssential}
            aria-label="Dismiss cookie banner"
            className="text-brand-silver-dark hover:text-brand-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const openBanner = () => {
    window.dispatchEvent(new Event("open-cookie-settings"));
  };

  return (
    <button
      type="button"
      onClick={openBanner}
      className="text-body-sm text-brand-silver-dark hover:text-brand-white transition-colors"
    >
      Cookie Settings
    </button>
  );
}
