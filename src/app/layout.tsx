import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/providers/language-provider";
import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  BASE_URL,
} from "@/lib/seo-utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Al-Nada Scientific Office",
    default: "Al-Nada Scientific Office | Environmental & Scientific Solutions",
  },
  description:
    "Exclusive agent for world-leading manufacturers of environmental, scientific, and industrial instruments in Egypt and the Middle East. Supply, calibration, maintenance & training.",
  keywords: [
    // English core terms
    "Al-Nada Scientific Office",
    "environmental instruments Egypt",
    "scientific equipment Egypt",
    "laboratory equipment Egypt",
    "measuring instruments Egypt",
    "air quality monitoring Egypt",
    "gas detectors Egypt",
    "water quality analyzers",
    "flue gas analyzers",
    "sound level meters",
    "noise measurement",
    "calibration services Egypt",
    "environmental measurements",
    "weather stations Egypt",
    "industrial instruments",
    "PPE Egypt",
    "laboratory glassware chemicals",
    // Partner brand terms
    "Ecom", "Casella", "Aeroqual", "Tenmars", "Senko", "Lovibond",
    "Geotech", "Kitagawa", "Davis", "Kestrel", "Tisch", "CHEMetrics",
    // Arabic core terms
    "مكتب الندى العلمي",
    "أجهزة قياس بيئية",
    "أجهزة علمية مصر",
    "معدات مختبرات",
    "أجهزة قياس الهواء",
    "كاشفات الغاز",
    "أجهزة قياس جودة المياه",
    "أجهزة قياس الصوت",
    "قياس الضوضاء",
    "خدمات المعايرة",
    "القياسات البيئية",
    "محطات الطقس",
    "توريد أجهزة القياس",
  ],
  icons: {
    icon: "/img/favicon/favicon.ico",
    shortcut: "/img/favicon/favicon-16x16.png",
    apple: "/img/favicon/apple-touch-icon.png",
  },
  manifest: "/img/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Al-Nada Scientific Office",
    title: "Al-Nada Scientific Office | Environmental & Scientific Solutions",
    description:
      "Exclusive agent for world-leading manufacturers of environmental, scientific, and industrial instruments in Egypt and the Middle East.",
    images: [
      {
        url: "/img/alnada.webp",
        width: 512,
        height: 512,
        alt: "Al-Nada Scientific Office Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Nada Scientific Office | Environmental & Scientific Solutions",
    description:
      "Exclusive agent for world-leading manufacturers of environmental, scientific, and industrial instruments in Egypt and the Middle East.",
    images: ["/img/alnada.webp"],
  },
  verification: {
    google: "google9c231aa06fa83c03",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();
  const webSiteJsonLd = generateWebSiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, webSiteJsonLd]),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
