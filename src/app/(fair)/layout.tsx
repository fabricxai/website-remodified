import type { ReactNode } from 'react';

/**
 * Standalone shell for the QR landing: no nav, no footer, no thread, no theme
 * (always light, to match the printed pieces). Preloads only the two faces
 * the page paints with.
 */
export default function FairLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preload" href="/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <div className="site fair">{children}</div>
    </>
  );
}
