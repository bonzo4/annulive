import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Annulive",
  description: "Branch out your skills, layer by layer",
  keywords: [
    "learning",
    "skills",
    "AI",
    "roadmaps",
    "education",
    "social learning",
  ],
  authors: [{ name: "Annulive Team" }],
  creator: "Annulive",
  publisher: "Annulive",
  metadataBase: new URL("https://annulive.com"), // Replace with your actual domain

  // Open Graph metadata for social media sharing
  openGraph: {
    title: "Annulive - Branch out your skills, layer by layer",
    description:
      "AI-powered learning roadmaps that grow with you. Create, share, and explore personalized skill trees in our thriving community of learners.",
    url: "https://annulive.com", // Replace with your actual domain
    siteName: "Annulive",
    images: [
      {
        url: "/annulive-logo.svg",
        width: 120,
        height: 120,
        alt: "Annulive Logo - Tree rings representing layered skill building",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary",
    title: "Annulive - Branch out your skills, layer by layer",
    description:
      "AI-powered learning roadmaps that grow with you. Create, share, and explore personalized skill trees.",
    images: ["/annulive-logo.svg"],
    creator: "@annulive", // Replace with your actual Twitter handle
  },

  // Favicon and app icons
  icons: {
    icon: "/annulive-logo.svg",
    shortcut: "/annulive-logo.svg",
    apple: "/annulive-logo.svg",
  },

  // App manifest for PWA
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
