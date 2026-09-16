import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './pilot.css';
import { content } from '@/lib/pilot';

/**
 * Standalone shell for the Baraka pilot portal: no marketing nav, footer or thread.
 * Private — hidden from search here and by the X-Robots-Tag header in src/proxy.ts.
 * Fonts are the site's self-hosted Archivo and Inter (the faces the design asks for).
 */
export const metadata: Metadata = {
  title: { absolute: `${content.portalName} — ${content.portalTagline}` },
  description: `Private project portal for the ${content.factory} pilot.`,
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function PilotLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preload" href="/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <div className="pilot">{children}</div>
    </>
  );
}
