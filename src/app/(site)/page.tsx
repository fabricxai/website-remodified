'use client';

import { T } from '@/lib/data';
import { useLang } from '@/lib/lang';
import { Wrap } from '@/components/ui';
import Hero from '@/components/home/Hero';
import Journey from '@/components/home/Journey';
import Problems from '@/components/home/Problems';
import TrustLoop from '@/components/home/TrustLoop';
import { BuiltInBD, Departments } from '@/components/home/Departments';
import OwnerView from '@/components/home/OwnerView';
import FinalCta from '@/components/home/FinalCta';

function TrustBar() {
  const { t } = useLang();
  return (
    <section style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
      <Wrap style={{ paddingTop: 26, paddingBottom: 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(20px,4vw,56px)', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, font: "500 13px/1.55 'JetBrains Mono',monospace", letterSpacing: '.04em', color: 'var(--t2)', textWrap: 'pretty', maxWidth: '72ch' }}>{t(T.trustClaim)}</p>
        <p style={{ margin: 0, font: "500 13px/1.55 'JetBrains Mono',monospace", letterSpacing: '.04em', color: 'var(--amber-p)', whiteSpace: 'nowrap' }}>{t(T.proof)}</p>
      </Wrap>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TrustBar />
      <Journey />
      <Problems />
      <TrustLoop />
      <Departments />
      <BuiltInBD />
      <OwnerView />
      <FinalCta />
    </div>
  );
}
