import type { Metadata } from 'next';
import TechnologyClient from './TechnologyClient';

export const metadata: Metadata = {
  title: 'Technology — how it is built',
  description: 'Data engine, MARBIM core, knowledge graph, deterministic calculators and the propose → approve loop. Tenant isolation, on-premise deployment, Bangla and English.',
};

export default function TechnologyPage() {
  return <TechnologyClient />;
}
