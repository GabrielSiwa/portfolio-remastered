import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import { ScrollProgress } from "./components/ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Site configuration
const siteConfig = {
  name: "Gabriel Siwa",
  title: "Gabriel Siwa | Software Engineer",
  description:
    "Software Engineer specializing in React, Next.js, TypeScript, and cloud solutions. Explore my portfolio of web applications, mobile apps, and AI-powered tools.",
  url: "https://gabrielsiwa.dev", // Update with your actual domain
  ogImage: "/og-image.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Web Development",
    "Mobile Development",
    "React Native",
    "Portfolio",
    "Software Engineer",
    "Cloud Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Full-Stack Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@GabrielSiwa", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.url,
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Full-Stack Developer",
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  description: siteConfig.description,
  sameAs: [
    "https://github.com/GabrielSiwa",
    "https://linkedin.com/in/gabrielsiwa", // Update with your LinkedIn
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "React Native",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Azure",
    "Cloud Development",
  ],
};

import VisitCounter from "./components/VisitCounter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Main site wrapper: Navbar + page content use the animated Background */}
        <div className="relative min-h-screen">
          <Background />
          <Navbar />
          {children}
        </div>
        <Footer />
        <footer className="fixed bottom-4 right-4 z-50">
          <VisitCounter />
        </footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
