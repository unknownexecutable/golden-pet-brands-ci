"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PRIMARY = [
  { href: "/", label: "Today" },
  { href: "/brands", label: "Brands" },
  { href: "/competitors", label: "Competitors" },
  { href: "/observations", label: "Observations" },
  { href: "/strategies", label: "Strategies" },
  { href: "/products", label: "Products" },
  { href: "/territories", label: "Narrative Map" },
  { href: "/moves", label: "Strategic Moves" },
  { href: "/ask", label: "Ask AI" }
];

const SECONDARY = [
  { href: "/watchlist", label: "Watchlist" },
  { href: "/sources", label: "Sources" }
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink-900 text-brass-200 font-display text-sm">G</span>
            <div className="leading-tight">
              <div className="font-display text-[15px] text-ink-900">Golden Pet Brands</div>
              <div className="text-[11px] text-ink-400 -mt-0.5">Competitive Intelligence</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-thin">
            {PRIMARY.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors ${
                    active ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {SECONDARY.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-[13px] font-medium whitespace-nowrap ${
                    active ? "text-brass-700 bg-brass-50" : "text-ink-500 hover:text-ink-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <nav className="flex lg:hidden gap-1 overflow-x-auto pb-2 scrollbar-thin">
          {[...PRIMARY, ...SECONDARY].map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                  active ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
