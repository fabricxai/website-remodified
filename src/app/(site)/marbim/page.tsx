import type { Metadata } from 'next';
import MarbimClient from './MarbimClient';

export const metadata: Metadata = {
  title: 'MARBIM — Garment Intelligence',
  description: 'MARBIM reads the industry’s paperwork. A small language model built only for garments — trained on the documents, the units, and the Bangla-English mix of a real factory floor. MARBIM proposes. Your people approve.',
};

export default function MarbimPage() {
  return <MarbimClient />;
}
