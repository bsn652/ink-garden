import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InkBackground from '@/components/InkBackground';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="alternate" type="application/rss+xml" title={siteConfig.name} href="/rss.xml" />
      </head>
      <body className="min-h-screen bg-paper text-ink-black">
        <InkBackground />
        <Header />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
