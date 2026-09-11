'use client';

import { useRouter } from 'next/navigation';
import { T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Wrap } from '@/components/ui';

export default function FinalCta() {
  const { t } = useLang();
  const { h2Center, leadCenter } = useTypo();
  const router = useRouter();
  const go = (href: string) => { router.push(href); window.scrollTo(0, 0); };

  return (
    <section style={{ background: 'var(--amber-s)', borderTop: '1px solid var(--amber-line)' }}>
      <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, textAlign: 'center' }}>
        <h2 style={h2Center}>{t(T.finalTitle)}</h2>
        <p style={leadCenter}>{t(T.finalSub)}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 6 }}>
          <button className="hov-black" onClick={() => go('/demo')} style={{ background: 'var(--ink)', color: 'var(--canvas)', border: 'none', borderRadius: 8, padding: '0 24px', height: 52, font: "600 15px/1 'Inter',sans-serif", cursor: 'pointer' }}>{t(T.ctaDemo)}</button>
          <button className="hov-amber09" onClick={() => go('/walkthrough')} style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--amber-p)', borderRadius: 8, padding: '0 24px', height: 52, font: "600 15px/1 'Inter',sans-serif", cursor: 'pointer' }}>{t(T.ctaWatch)}</button>
        </div>
        <div style={{ font: "400 12px/1.5 'JetBrains Mono',monospace", color: 'var(--amber-p)' }}>{t(T.finalNote)}</div>
      </Wrap>
    </section>
  );
}
