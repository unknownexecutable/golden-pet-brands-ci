import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Golden Pet Brands — Competitive Intelligence",
  description: "Competitive intelligence command center for Dr. Marty Pets, Badlands Ranch, and Ultimate Pet Nutrition."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="mx-auto max-w-[1400px] px-6 py-8">{children}</main>
        <footer className="mx-auto max-w-[1400px] px-6 py-10 text-xs text-ink-300 border-t border-ink-100 mt-16">
          Golden Pet Brands internal tool. All facts are captured live from public sources with citations — see each item's evidence link.
        </footer>
      </body>
    </html>
  );
}
