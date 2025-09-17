import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-4044602309325996";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chainseek.top"),
  title: "Chain Seek - 区块链工具导航 | 专业的Web3工具集合",
  description: "Chain Seek是专业的区块链工具导航网站，提供DeFi、NFT、交易、钱包、安全等Web3工具集合。发现最优质的区块链开发工具、数据分析平台和投资工具。",
  keywords: [
    "区块链工具",
    "Web3工具",
    "DeFi工具",
    "NFT工具", 
    "加密货币工具",
    "区块链导航",
    "数字货币工具",
    "智能合约工具",
    "区块链开发工具",
    "加密货币分析工具",
    "数字钱包工具",
    "区块链浏览器",
    "跨链工具",
    "区块链安全工具",
    "链上数据分析"
  ],
  authors: [{ name: "Chain Seek Team" }],
  creator: "Chain Seek",
  publisher: "Chain Seek",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Chain Seek - 区块链工具导航 | 专业的Web3工具集合",
    description: "Chain Seek是专业的区块链工具导航网站，提供DeFi、NFT、交易、钱包、安全等Web3工具集合。发现最优质的区块链开发工具、数据分析平台和投资工具。",
    type: "website",
    locale: "zh_CN",
    siteName: "Chain Seek",
    url: "https://chainseek.top",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chain Seek - 区块链工具导航",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chain Seek - 区块链工具导航",
    description: "专业的Web3工具集合，发现最优质的区块链开发工具、数据分析平台和投资工具。",
    images: ["/og-image.png"],
    creator: "@chainseek",
  },
  alternates: {
    canonical: "https://chainseek.top",
    languages: {
      'zh-CN': 'https://chainseek.top',
      'en': 'https://en.chainseek.top'
    }
  },
  category: "technology",
  classification: "区块链工具导航",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Chain Seek",
    "application-name": "Chain Seek",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "format-detection": "telephone=no,address=no,email=no"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {ADS_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        <meta name="google-adsense-account" content={ADS_CLIENT} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Chain Seek",
              "description": "专业的区块链工具导航网站，提供Web3工具集合",
              "url": "https://chainseek.top",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://chainseek.top?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Chain Seek",
                "url": "https://chainseek.top"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Chain Seek",
              "url": "https://chainseek.top",
              "logo": "https://chainseek.top/favicon-32x32.png",
              "sameAs": [
                "https://x.com/chainseek"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
