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
  metadataBase: new URL("https://annu.live"),
  openGraph: {
    title: "Annulive - Branch out your skills, layer by layer",
    description:
      "Create, share, and explore AI-powered personalized roadmaps in our thriving community of learners.",
    url: "https://annu.live",
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

  twitter: {
    card: "summary",
    title: "Annulive - Branch out your skills, layer by layer",
    description:
      "Create, share, and explore AI-powered personalized roadmaps in our thriving community of learners.",
    images: ["/annulive-logo.svg"],
    creator: "@annulive",
  },

  icons: {
    icon: "/annulive-logo.svg",
    shortcut: "/annulive-logo.svg",
    apple: "/annulive-logo.svg",
  },

  manifest: "/manifest.json",
};
export default async function RootLayout({
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
