import type { Metadata } from "next";

import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/site-footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Gaia Capital",
  description: "Private strategic advisory and long-term capital perspective."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-night text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
