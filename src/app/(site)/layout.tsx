import type { ReactNode } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Thread from '@/components/motion/Thread';

/** The site shell: thread, nav and footer. The /fair QR landing deliberately lives outside it. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site" style={{ position: 'relative' }}>
      <Thread />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
