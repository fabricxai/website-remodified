import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/** Internal build handoff — kept reachable by URL, hidden from search. */
export const metadata: Metadata = { title: 'Build handoff (internal)', robots: { index: false, follow: false } };

export default function HandoffLayout({ children }: { children: ReactNode }) {
  return children;
}
