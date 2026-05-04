import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
