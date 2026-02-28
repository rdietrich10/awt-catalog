import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-display text-xl md:text-2xl font-medium tracking-tight text-brand-white hover:opacity-80 transition-opacity"
    >
      AW Therapeutics
    </Link>
  );
}
