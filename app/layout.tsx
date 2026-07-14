import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin-ext"],
  variable: "--font-host-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.turanarican.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Turan Arıcan Matematik",
    template: "%s | Turan Arıcan Matematik",
  },
  description:
    "Türkçe, düzenli ve etkileşimli matematik dersleri: cebir, ön cebir ve açık eğitim kaynaklarından uyarlanmış çalışma sayfaları.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Turan Arıcan Matematik",
    title: "Turan Arıcan Matematik",
    description:
      "Türkçe, düzenli ve etkileşimli matematik dersleri için yeni nesil çalışma platformu.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Turan Arıcan Matematik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turan Arıcan Matematik",
    description:
      "Türkçe, düzenli ve etkileşimli matematik dersleri için yeni nesil çalışma platformu.",
    images: ["/og"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={hostGrotesk.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
