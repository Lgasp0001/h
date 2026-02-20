import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import VoiceflowChat from '@/components/VoiceflowChat';

export const metadata: Metadata = {
  metadataBase: new URL('https://frosts-fertility.com'),
  title: {
    default: 'Frosts Fertility Clinic | Compassionate Family Building in Austin, TX',
    template: '%s | Frosts Fertility Clinic'
  },
  description: 'Experience compassionate care and advanced fertility solutions. Start your journey to parenthood in our South Congress studio. IVF, Egg Freezing & Consultations.',
  keywords: [
    'Austin Fertility Clinic',
    'Fertility Specialist Austin',
    'IVF Austin',
    'Egg Freezing Austin',
    'Parenthood Journey',
    'Fertility Treatments',
    'Compassionate Fertility Care',
    'Family Building Austin',
    'South Congress Austin',
    'Boutique Fertility Clinic'
  ],
  authors: [{ name: 'Frosts Fertility' }],
  creator: 'Frosts Fertility',
  publisher: 'Frosts Fertility',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Frosts Fertility Clinic | Compassionate Family Building',
    description: 'Experience fertility care redefined. Advanced solutions meeting compassionate care in Austin, TX. Start your journey to parenthood today.',
    url: 'https://frosts-fertility.com',
    siteName: 'Frosts Fertility Clinic',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Frosts Fertility Clinic - Premium Boutique Care in Austin',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frosts Fertility Clinic | Boutique Austin Fertility',
    description: 'Start your journey to parenthood with advanced care in South Congress. Compassionate support available.',
    images: ['/twitter-image.png'],
    creator: '@frostsfertility',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={GeistSans.className}>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <VoiceflowChat />
      </body>
    </html>
  );
}
