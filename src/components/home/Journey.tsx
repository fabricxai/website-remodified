'use client';

import { useEffect, useRef } from 'react';
import { AMBER, ARTIFACTS, STATIONS, ST_BN, T } from '@/lib/data';
import { ScreenCard } from '@/components/ScreenCard';
import { MonoNumber } from '@/components/motion/MonoNumber';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Wrap } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";


/**
 * The scroll-driven order journey. A 900vh section pins its stage under the
 * nav; scroll progress drives the thread rail and the nine station cards via
 * direct style writes (no React re-render per frame) — same as the original.
 */
export default function Journey() {
  const { t, bn } = useLang();
  const { h2Style } = useTypo();

  const section = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const screens = useRef<(HTMLDivElement | null)[]>([]);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const sec = section.current;
      if (!sec || window.innerWidth <= 1000) return;
      const r = sec.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      const n = STATIONS.length;
      const f = p * (n - 0.001);
      const idx = Math.floor(f);
      const local = f - idx;
      if (fill.current) fill.current.style.width = (p * 100) + '%';
      if (dot.current) dot.current.style.left = (p * 100) + '%';
      const stack = cards.current[0] && cards.current[0].parentElement;
      const availH = stack ? stack.clientHeight : 0;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const d = i - idx - local;
        const vis = Math.min(1, Math.max(0, (0.62 - Math.abs(d)) / 0.26));
        const innerH = c.firstElementChild ? (c.firstElementChild as HTMLElement).scrollHeight : 0;
        const k = (innerH && availH) ? Math.min(1, Math.max(0.68, (availH - 12) / innerH)) : 1;
        c.style.opacity = String(vis);
        c.style.transform = 'translate3d(0,' + (d * 46 * k) + 'px,0) scale(' + k.toFixed(3) + ')';
        c.style.pointerEvents = vis > 0.6 ? 'auto' : 'none';
        const sc = screens.current[i];
        if (sc) sc.style.transform = 'perspective(1600px) rotateY(' + (-12 + d * 9) + 'deg) rotateX(' + (5 - d * 3) + 'deg) translateZ(' + (vis * 34 - 34) + 'px) scale(' + (0.94 + vis * 0.06) + ')';
      });
      nodes.current.forEach((node, i) => {
        if (!node) return;
        const on = i <= idx;
        node.style.background = on ? (i === idx ? AMBER : 'var(--ink)') : 'var(--canvas)';
        node.style.borderColor = on ? (i === idx ? '#B88C21' : 'var(--ink)') : 'var(--line3)';
        node.style.transform = i === idx ? 'scale(1.5)' : 'scale(1)';
        node.style.boxShadow = i === idx ? '0 0 0 3px var(--canvas), 0 0 0 4.5px ' + AMBER : 'none';
        const lab = labels.current[i];
        if (lab) { lab.style.color = i === idx ? 'var(--ink)' : (on ? 'var(--t2)' : 'var(--t3)'); lab.style.fontWeight = i === idx ? '600' : '500'; }
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const t0 = setTimeout(tick, 60);
    return () => {
      clearTimeout(t0);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section data-r="jsec" ref={section} style={{ position: 'relative', height: '900vh', background: 'var(--canvas)' }}>
      <div data-r="jstage" style={{ position: 'sticky', top: 70, height: 'calc(100vh - 70px)', minHeight: 520, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Wrap style={{ width: '100%', paddingTop: 'clamp(24px,3.4vh,44px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Eyebrow h={13}>{t(T.journeyEyebrow)}</Eyebrow>
            <h2 style={h2Style}>{t(T.journeyTitle)}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 6 }}>
            <div style={{ font: `500 12px/1 ${MONO}`, color: 'var(--t3)' }}>PO-2044</div>
            <div style={{ width: 1, height: 14, background: 'var(--line2)' }} />
            <div style={{ font: `400 12px/1 ${MONO}`, color: 'var(--t2)' }}>36,000 pcs · piqué polo</div>
          </div>
        </Wrap>

        <Wrap dataR="wrap jrail" style={{ width: '100%', paddingTop: 'clamp(18px,2.6vh,32px)' }}>
          <div style={{ position: 'relative', height: 46 }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 15, height: 2, background: 'var(--line2)' }} />
            <div ref={fill} style={{ position: 'absolute', left: 0, top: 15, height: 2, width: '0%', background: 'var(--ink)', transition: 'width 90ms linear' }} />
            <div ref={dot} style={{ position: 'absolute', left: 0, top: 8, width: 16, height: 16, marginLeft: -8, borderRadius: 999, background: 'var(--amber)', border: '3px solid var(--canvas)', boxShadow: '0 0 0 1px var(--amber-p)', transition: 'left 90ms linear' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'space-between' }}>
              {STATIONS.map((s, i) => (
                <div key={s.short} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, flex: 1, minWidth: 0 }}>
                  <div ref={(el) => { nodes.current[i] = el; }} style={{ width: 9, height: 9, marginTop: 11, borderRadius: 999, background: 'var(--canvas)', border: '2px solid var(--line3)', flexShrink: 0, transition: 'all 200ms ease' }} />
                  <div ref={(el) => { labels.current[i] = el; }} style={{ font: `500 10px/1.2 ${MONO}`, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--t3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', transition: 'color 200ms ease' }}>
                    {bn ? ST_BN[i] : s.short}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>

        <div data-r="jstack" style={{ position: 'relative', flex: 1, minHeight: 0, perspective: 1600, overflow: 'hidden' }}>
          {STATIONS.map((s, i) => {
            const kind = s.badgeKind;
            return (
              <div key={s.short} data-r="jcard" ref={(el) => { cards.current[i] = el; }} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, pointerEvents: 'none' }}>
                <div data-r="wrap jrow" style={{ maxWidth: 1320, width: '100%', margin: '0 auto' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ font: `500 32px/1 ${MONO}`, color: 'var(--line3)' }}>{String(i + 1).padStart(2, '0')}</div>
                      <div style={{ width: 26, height: 1, background: 'var(--line2)' }} />
                      <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)' }}>{s.dept}</div>
                    </div>
                    <h3 style={{ font: "600 clamp(26px,3vw,40px)/1.08 'Archivo',sans-serif", letterSpacing: '-.02em', margin: 0 }}>{s.title}</h3>
                    <p style={{ font: "400 clamp(15px,1.25vw,18px)/1.6 'Inter',sans-serif", color: 'var(--t2)', margin: 0, maxWidth: '42ch', textWrap: 'pretty' }}>{s.caption}</p>
                    <div style={{ font: `400 11.5px/1.6 ${MONO}`, color: 'var(--t3)', background: 'var(--sunken)', borderRadius: 6, padding: '8px 11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}><MonoNumber value={ARTIFACTS[i]} /></div>
                    {kind && (
                      <div data-r="jbadge" style={{
                        display: 'flex', gap: 13, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 10,
                        background: kind === 'ai' ? 'var(--amber-s)' : 'var(--sunken)',
                        border: '1px solid ' + (kind === 'ai' ? 'var(--amber-line)' : 'var(--line)'),
                        color: kind === 'ai' ? 'var(--amber-p)' : 'var(--ink)', maxWidth: '46ch',
                      }}>
                        <div style={{ width: 9, height: 9, borderRadius: kind === 'ai' ? 999 : 2, marginTop: 4, flexShrink: 0, background: kind === 'ai' ? AMBER : 'var(--ink)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <div style={{ font: `600 12px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.badgeLabel}</div>
                          <div style={{ font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--t2)' }}>{s.badgeBody}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div data-r="jscreen" ref={(el) => { screens.current[i] = el; }} style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
                    <ScreenCard s={s.screen} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Wrap dataR="wrap jhint" style={{ width: '100%', paddingBottom: 'clamp(16px,2.4vh,30px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ font: `400 11px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', color: '#B4AEA3' }}>{t(T.scrollHint)}</div>
        </Wrap>
      </div>
    </section>
  );
}
