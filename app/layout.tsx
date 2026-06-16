import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://bmcapital.fund'),
  title: 'BM Capital Fund — Долгосрочный рост капитала',
  description: 'Частный инвестиционный фонд с фокусом на стратегический рост капитала через принципы этичности и профессионализма',
  openGraph: {
    title: 'BM Capital Fund — Долгосрочный рост капитала',
    description: 'Частный инвестиционный фонд с фокусом на стратегический рост капитала через принципы этичности и профессионализма',
    url: 'https://bmcapital.fund',
    siteName: 'BM Capital Fund',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/opengraph-image.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BM Capital Fund — Долгосрочный рост капитала',
    description: 'Частный инвестиционный фонд с фокусом на стратегический рост капитала через принципы этичности и профессионализма',
    images: [
      {
        url: '/opengraph-image.jpg',
      },
    ],
  },
  icons: {
    icon: '/opengraph-image.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/assets/hero-v3.webp" fetchPriority="high" />
      </head>

      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
