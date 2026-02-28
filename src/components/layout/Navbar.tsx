"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { Logo } from "./Logo";
import { useInterestList } from "@/context/InterestListContext";
import { cn } from "@/lib/utils";

const navLinks: { href: string; label: string; icon?: typeof Home }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Catalog" },
  { href: "/categories", label: "Categories" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/how-it-works", label: "How It Works" },
];

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { items } = useInterestList();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-black/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white placeholder:text-brand-silver-dark focus:outline-none focus:border-brand-grey-300"
            />
          </form>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm font-display tracking-wider uppercase text-brand-silver hover:text-brand-white transition-colors flex items-center gap-1.5"
                  aria-label={link.label === "Home" ? "Go to home page" : undefined}
                >
                  {Icon && <Icon className="w-4 h-4" aria-hidden />}
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/interest-list"
              className="relative text-body-sm font-display tracking-wider uppercase text-brand-silver hover:text-brand-white transition-colors"
            >
              My List
              {items.length > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-brand-black text-caption">
                  {items.length}
                </span>
              )}
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative min-h-[44px] min-w-[44px] flex items-center justify-center text-brand-white touch-manipulation"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 flex flex-col justify-center gap-1">
              <span className={cn("block w-full h-0.5 bg-current transition-transform", mobileOpen && "rotate-45 translate-y-1.5")} />
              <span className={cn("block w-full h-0.5 bg-current transition-transform", mobileOpen && "opacity-0")} />
              <span className={cn("block w-full h-0.5 bg-current transition-transform", mobileOpen && "-rotate-45 -translate-y-1.5")} />
            </div>
            {items.length > 0 && !mobileOpen && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-brand-black text-caption font-display">
                {items.length}
              </span>
            )}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-brand-border">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent border border-brand-border px-4 py-2 text-body-sm text-brand-white placeholder:text-brand-silver-dark focus:outline-none"
              />
            </form>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-body-sm font-display tracking-wider uppercase text-brand-silver hover:text-brand-white flex items-center gap-2"
                  >
                    {Icon && <Icon className="w-4 h-4" aria-hidden />}
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/interest-list"
                onClick={() => setMobileOpen(false)}
                className="relative text-body-sm font-display tracking-wider uppercase text-brand-silver hover:text-brand-white inline-flex items-center"
              >
                My List
                {items.length > 0 && (
                  <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-brand-black text-caption font-display shrink-0">
                    {items.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
