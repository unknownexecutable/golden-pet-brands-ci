"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/intro") return null;
  return (
    <footer className="mx-auto max-w-[1400px] px-6 py-10 text-xs text-ink-300 border-t border-ink-100 mt-16">
      Golden Pet Brands internal tool. All facts are captured live from public sources with citations — see each item&apos;s evidence link.
    </footer>
  );
}
