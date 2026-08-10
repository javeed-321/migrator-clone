import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidebar Discovery",
  description: "ReadMe docs page discovery, ported from @mintlify/scraping",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
