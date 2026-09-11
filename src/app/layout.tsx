import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { LangProvider } from '@/lib/lang';
import { ThemeProvider, THEME_INIT_SCRIPT } from '@/lib/theme';
import { SITE } from '@/lib/data';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabricxai.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: SITE.titleHome, template: '%s · FabricXai' },
  description: 'The operating system for garments. From buyer email to bank realisation — one thread, with MARBIM, the garment intelligence model, reading every document on the way. Built in Dhaka.',
  applicationName: SITE.name,
  icons: { icon: '/favicon.svg' },
  referrer: 'strict-origin-when-cross-origin',
  openGraph: { type: 'website', siteName: SITE.name, title: SITE.titleHome, description: SITE.descriptor, images: ['/og.png'], locale: 'en_US', alternateLocale: ['bn_BD'] },
  twitter: { card: 'summary_large_image', title: SITE.titleHome, images: ['/og.png'] },
  alternates: { canonical: '/', languages: { en: '/', bn: '/?lang=bn' } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#0F131B' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies a saved dark preference before first paint — no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
