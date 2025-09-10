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
  title: "Chain Seek - Discover Amazing Web Resources",
  description: "A curated collection of the best tools, frameworks, and resources for modern web development.",
  keywords: ["web development", "resources", "tools", "frameworks", "curated"],
  authors: [{ name: "Chain Seek" }],
  openGraph: {
    title: "Chain Seek - Discover Amazing Web Resources",
    description: "A curated collection of the best tools, frameworks, and resources for modern web development.",
    type: "website",
  },
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
