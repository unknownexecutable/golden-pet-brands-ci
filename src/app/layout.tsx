import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
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
        <Footer />
      </body>
    </html>
  );
}
