import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { RouteIntro } from "@/components/layout/route-intro";
import { SiteFooter } from "@/components/layout/site-footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Gaia Capital",
  description: "Private strategic advisory and long-term capital perspective.",
  icons: {
    icon: "/brand/gaia-capital-mark-dark.png",
    shortcut: "/brand/gaia-capital-mark-dark.png",
    apple: "/brand/gaia-capital-mark-dark.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-night text-ink antialiased">
        <RouteIntro />
        <Navbar />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
