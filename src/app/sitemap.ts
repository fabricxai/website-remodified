import type { MetadataRoute } from 'next';
import { MODULES } from '@/lib/modules';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabricxai.com';

/** /handoff is internal and deliberately excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const top = ['', '/marbim', '/product', '/technology', '/pricing', '/about', '/demo', '/walkthrough', '/fair'];
  return [
    ...top.map((p) => ({ url: BASE + p, lastModified: now, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8, alternates: { languages: { en: BASE + p, bn: BASE + p + '?lang=bn' } } })),
    ...MODULES.map((m) => ({ url: `${BASE}/product/${m.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
