import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MODULES, moduleBySlug } from '@/lib/modules';
import ModuleClient from './ModuleClient';

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<Metadata> {
  const { module } = await params;
  const m = moduleBySlug(module);
  if (!m) return {};
  return { title: `${m.name[0]} — ${m.claim}`, description: m.lead };
}

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const m = moduleBySlug(module);
  if (!m) notFound();
  return <ModuleClient slug={m.slug} />;
}
