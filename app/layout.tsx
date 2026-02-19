import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import VoiceflowChat from '@/components/VoiceflowChat';

export const metadata: Metadata = {
  metadataBase: new URL('https://frosts-fertility.com'), // Replace with actual domain when live
  title: 'Frosts Fertility Clinic | Compassionate Family Building in Austin, TX',
  description:
    'Experience compassionate care and advanced fertility solutions. Start your journey to parenthood in our South Congress studio. IVF, Egg Freezing & Consultations.',
  keywords: [
    'Austin Fertility Clinic',
    'Fertility Specialist Austin',
    'IVF Austin',
    'Egg Freezing Austin',
    'Parenthood Journey',
    'Fertility Treatments',
    'Compassionate Fertility Care',
    'Family Building Austin',
  ],
  openGraph: {
    title: 'Frosts Fertility Clinic | Compassionate Family Building',
    description:
      'Experience fertility care redefined. Advanced solutions meeting compassionate care in Austin, TX.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Frosts Fertility Clinic',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Frosts Fertility Clinic - Compassionate Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frosts Fertility Clinic | Boutique Austin Fertility',
    description: 'Start your journey to parenthood with advanced care in South Congress. Compassionate support available.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
