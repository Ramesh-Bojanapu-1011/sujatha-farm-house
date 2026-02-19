import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import React from "react";

export const metadata: Metadata = {
  title: "Fresh Farm - Farm Fresh Products & Natural Produce",
  description:
    "Premium farm-fresh eggs, milk, meat, and poultry from our sustainable farm. Naturally raised with organic feed. Serving families since 1970.",
  icons: {
    icon: "logo.svg",
    apple: "logo.svg",
    shortcut: "logo.svg",
  },
  verification: {
    google: "U7qumKl--6Kgc-HmhotoDNClhsm-ALBznzF_DcRbZug",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
