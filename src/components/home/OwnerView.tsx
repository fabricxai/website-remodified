'use client';

import { useEffect, useRef } from 'react';
import { OWNER_STATS, PHONE_FEED, PHONE_TILES, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Wrap } from '@/components/ui';
import { MonoNumber } from '@/components/motion/MonoNumber';

const MONO = "'JetBrains Mono',monospace";

/** Dark "owner's view" band with count-up stats and the night-view phone. */
export default function OwnerView() {
  const { t, reduced } = useLang();
  const { h2DarkStyle } = useTypo();
  const counters = useRef<(HTMLDivElement | null)[]>([]);
  const ran = useRef<boolean[]>([]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      counters.current.forEach((c, i) => {
        if (!c || ran.current[i]) return;
        const r = c.getBoundingClientRect();
        if (r.top > window.innerHeight - 30 || r.bottom < 0) return;
        ran.current[i] = true;
        const [, target, fmt] = OWNER_STATS[i];
        if (reduced) { c.textContent = fmt(target); return; }
        const t0 = performance.now();
        const step = () => {
          const p = Math.min(1, (performance.now() - t0) / 1000);
          c.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const t0 = setTimeout(tick, 60);
    return () => { clearTimeout(t0); cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [reduced]);

  return (
    <section style={{ background: 'var(--dark-bg)', color: '#F4F3F0', borderTop: '1px solid var(--line)' }}>
      <Wrap style={{ paddingTop: 'clamp(72px,9vw,124px)', paddingBottom: 'clamp(72px,9vw,124px)' }}>
        <div data-r="two">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0 }}>
            <Eyebrow h={13} color="#7C8497">{t(T.ownerEyebrow)}</Eyebrow>
            <h2 style={h2DarkStyle}>{t(T.ownerTitle)}</h2>
            <p style={{ font: "400 clamp(15px,1.3vw,18px)/1.6 'Inter',sans-serif", color: '#AEB5C4', margin: 0, maxWidth: '44ch', textWrap: 'pretty' }}>{t(T.ownerSub)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1, background: '#252B3A', border: '1px solid #252B3A', borderRadius: 10, overflow: 'hidden', marginTop: 6 }}>
              {OWNER_STATS.map(([k, , fmt, color], i) => (
                <div key={k} style={{ background: '#181D29', padding: '18px 22px', flex: 1, minWidth: 132, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ font: `400 10px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7C8497' }}>{k}</div>
                  <div ref={(el) => { counters.current[i] = el; }} style={{ font: "600 clamp(22px,2.4vw,30px)/1 'Archivo',sans-serif", fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em', color }}>{fmt(0)}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', minWidth: 0, perspective: 1500 }}>
            <div className="hov-flat" style={{ transform: 'rotateY(8deg) rotateX(3deg)', transition: 'transform 420ms cubic-bezier(.2,.8,.2,1)' }}>
              <div style={{ animation: 'fx-bob 8s ease-in-out infinite', width: 300, background: '#000', border: '1px solid #252B3A', borderRadius: 36, padding: 11 }}>
                <div style={{ background: '#0B0E15', borderRadius: 27, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 560 }}>
                  <div style={{ padding: '16px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: `500 11px/1 ${MONO}`, color: '#565E71' }}><MonoNumber value="21:44" /><span>4G</span></div>
                  <div style={{ padding: '6px 20px 16px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ font: `400 12px/1.4 ${MONO}`, color: '#7C8497' }}>Friday · night view</div>
                    <div style={{ font: "600 21px/1.2 'Archivo',sans-serif", color: '#F4F3F0' }}>Unit 2 · 8 lines</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#181D29', borderTop: '1px solid #181D29', borderBottom: '1px solid #181D29' }}>
                    {PHONE_TILES.map(([k, v, color]) => (
                      <div key={k} style={{ background: '#0B0E15', padding: '15px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ font: `400 9.5px/1 ${MONO}`, letterSpacing: '.07em', textTransform: 'uppercase', color: '#565E71' }}>{k}</div>
                        <div style={{ font: "600 19px/1 'Archivo',sans-serif", fontVariantNumeric: 'tabular-nums', color }}><MonoNumber value={v} /></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '16px 20px 8px', font: `500 10px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: '#565E71' }}>Needs you</div>
                  {PHONE_FEED.map(([dot, title, meta]) => (
                    <div key={title} style={{ padding: '12px 20px', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                      <div style={{ width: 6, height: 6, borderRadius: 999, background: dot, marginTop: 6, flexShrink: 0 }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                        <div style={{ font: "500 13.5px/1.35 'Inter',sans-serif", color: '#F4F3F0', textWrap: 'pretty' }}>{title}</div>
                        <div style={{ font: `400 11.5px/1.4 ${MONO}`, color: '#7C8497' }}>{meta}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 'auto', padding: '16px 20px 20px' }}>
                    <div style={{ background: '#181D29', border: '1px solid #252B3A', borderRadius: 10, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 999, background: '#4FA97D' }} />
                      <div style={{ font: "400 12px/1.4 'Inter',sans-serif", color: '#AEB5C4' }}>Everything else is on plan.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
