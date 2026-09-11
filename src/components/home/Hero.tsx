'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FACTS, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { useTheme } from '@/lib/theme';
import { Eyebrow, Logo, Mark, PlayTri, Wrap } from '@/components/ui';
import { MonoNumber } from '@/components/motion/MonoNumber';

const HeroWeave = dynamic(() => import('./HeroWeave'), { ssr: false });

const MONO = "'JetBrains Mono',monospace";

export default function Hero() {
  const { t, bn, reduced } = useLang();
  const { dark } = useTheme();
  const { h1Style, leadStyle } = useTypo();
  const router = useRouter();
  const [staticHero, setStaticHero] = useState(false);
  const [lockup, setLockup] = useState(false);

  const onRevealed = useCallback(() => setLockup(true), []);
  const onFallback = useCallback(() => { setStaticHero(true); setLockup(true); }, []);

  return (
    <section style={{ position: 'relative', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
      <Wrap style={{ paddingTop: 'clamp(56px,8vw,104px)', paddingBottom: 'clamp(56px,8vw,104px)' }}>
        <div data-r="two">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, minWidth: 0 }}>
            <Eyebrow>{t(T.heroEyebrow)}</Eyebrow>
            <h1 style={h1Style}>{t(T.heroTitle)}</h1>
            <p style={leadStyle}>{t(T.heroSub)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <button className="hov-amber" onClick={() => { router.push('/walkthrough'); window.scrollTo(0, 0); }} style={{ background: 'var(--amber)', color: 'var(--on-amber)', border: 'none', borderRadius: 8, padding: '0 22px', height: 50, font: "600 15px/1 'Inter',sans-serif", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--sh1)' }}>
                <PlayTri size={9} />{t(T.ctaWatch)}
              </button>
              <button className="hov-sec" onClick={() => { router.push('/demo'); window.scrollTo(0, 0); }} style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line2)', borderRadius: 8, padding: '0 22px', height: 50, font: "600 15px/1 'Inter',sans-serif", cursor: 'pointer' }}>
                {t(T.ctaFloor)}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px', paddingTop: 6 }}>
              {FACTS.map(([v, k]) => (
                <div key={v} style={{ display: 'flex', alignItems: 'baseline', gap: 8, font: `400 13px/1.5 ${MONO}`, color: 'var(--t2)' }}>
                  <MonoNumber value={v} style={{ color: 'var(--amber-p)', fontWeight: 500 }} />{bn ? k[1] : k[0]}
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', minHeight: 'clamp(320px,42vw,520px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
            {!staticHero && <HeroWeave reduced={reduced} ink={dark ? '#F4F3F0' : '#181D29'} onRevealed={onRevealed} onFallback={onFallback} />}
            {staticHero && (
              <Mark label="FabricX mark" style={{ width: 'clamp(150px,20vw,232px)', height: 'auto', position: 'relative' }} />
            )}
            <div style={{ position: 'relative', opacity: lockup ? 1 : 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 'clamp(180px,24vw,300px)', transition: 'opacity 600ms ease' }}>
              <Logo height="clamp(20px,2.4vw,28px)" />
              <div style={{ font: `400 11px/1 ${MONO}`, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--t3)' }}>{t(T.heroMarkCaption)}</div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
