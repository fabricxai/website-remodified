import type { Metadata } from 'next';
import FairClient from './FairClient';

export const metadata: Metadata = {
  title: 'Innovation Fair 2026 · Stall 16',
  description: 'You found the thread. FabricXai — the Garments Operating System — at Innovation Fair 2026, stall 16.',
  robots: { index: true, follow: true },
};

export default function FairPage() {
  return <FairClient />;
}
