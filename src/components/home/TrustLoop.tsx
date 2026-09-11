'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AMBER, LOOP, LOOP_FIELDS, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Mark, Slashes, Wrap } from '@/components/ui';
import { Stamp } from '@/components/motion/AuditStamp';

const MONO = "'JetBrains Mono',monospace";

const STATUS: [string, string, string][] = [
  ['Draft', 'var(--amber-p)', 'var(--amber-s)'],
  ['Awaiting approval', 'var(--warn)', 'var(--sunken)'],
  ['Committed', 'var(--ok)', 'rgba(47,125,91,.1)'],
];
const SUB = ['draft · not saved', 'Rafiq Hasan · store manager', 'PO-4471 issued · 21:44'];
const BTN = ['Approve', 'Approve', 'Approved'];

/** Propose → Approve → Commit. Auto-advances every 2.9s; clicking a step restarts the timer there. */
export default function TrustLoop() {
  const { t } = useLang();
  const { h2Style } = useTypo();
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback((from: number) => {
    setI(from);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setI((k) => (k + 1) % 3), 2900);
  }, []);

  useEffect(() => {
    const t0 = setTimeout(() => start(0), 400);
    return () => { clearTimeout(t0); if (timer.current) clearInterval(timer.current); };
  }, [start]);

  const s = STATUS[i];

  return (
    <section style={{ borderTop: '1px solid var(--line)', background: 'var(--canvas)' }}>
      <Wrap style={{ paddingTop: 'clamp(72px,9vw,124px)', paddingBottom: 'clamp(72px,9vw,124px)' }}>
        <div data-r="side">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Eyebrow h={13}>{t(T.trustLoopEyebrow)}</Eyebrow>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(34px,4vw,54px)', minWidth: 0 }}>
            <h2 style={h2Style}>{t(T.trustLoopTitle)}</h2>
            <div data-r="two">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                {LOOP.map(([n, title, body], k) => {
                  const on = k === i;
                  return (
                    <div key={n} onClick={() => start(k)} style={{
                      display: 'flex', gap: 18, padding: '20px 20px 20px 18px', cursor: 'pointer',
                      transition: 'all 250ms cubic-bezier(.2,.8,.2,1)',
                      borderLeft: '2px solid ' + (on ? AMBER : 'var(--line2)'),
                      background: on ? 'var(--surface)' : 'transparent',
                      opacity: on ? 1 : 0.5,
                      transform: on ? 'translateX(4px)' : 'none',
                    }}>
                      <div style={{ font: `500 12px/1.5 ${MONO}`, color: 'var(--t3)', flexShrink: 0 }}>{n}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ font: "600 18px/1.25 'Archivo',sans-serif", letterSpacing: '-.01em' }}>{title}</div>
                        <div style={{ font: "400 14px/1.55 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{body}</div>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '24px 0 0' }}>
                  <Slashes h={13} style={{ marginTop: 6 }} />
                  <div style={{ font: "500 clamp(15px,1.3vw,17px)/1.5 'Inter',sans-serif", maxWidth: '40ch', textWrap: 'pretty' }}>{t(T.trustLoopLine)}</div>
                </div>
              </div>

              <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: 'var(--surface)', border: '1px solid ' + (i === 2 ? 'var(--ok)' : 'var(--line)'), borderRadius: 12, boxShadow: 'var(--sh3)', overflow: 'hidden', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)', transition: 'border-color 250ms ease' }}>
                  <Stamp on={i === 2} style={{ bottom: 62, right: 18 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--chrome)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mark ink="#FFFFFF" style={{ width: 12, height: 13 }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ font: "600 13px/1 'Inter',sans-serif" }}>MARBIM proposes</div>
                      <div style={{ font: `400 11px/1 ${MONO}`, color: 'var(--t3)' }}>{SUB[i]}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', font: `500 10px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: s[1], background: s[2], borderRadius: 4, padding: '6px 8px' }}>{s[0]}</div>
                  </div>
                  <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ font: "600 15px/1.3 'Inter',sans-serif" }}>Purchase order · 10,062 kg yarn 30s combed</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {LOOP_FIELDS.map(([k, v, bar]) => (
                        <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                            <div style={{ font: "400 12.5px/1.3 'Inter',sans-serif", color: 'var(--t2)' }}>{k}</div>
                            <div style={{ font: `500 12.5px/1.3 ${MONO}` }}>{v}</div>
                          </div>
                          <div style={{ height: 3, background: 'var(--sunken)', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', background: 'var(--ok)', width: bar }} /></div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
                      <div style={{
                        borderRadius: 8, padding: '11px 18px', font: "600 13.5px/1 'Inter',sans-serif", transition: 'all 180ms ease',
                        background: i === 1 ? 'var(--amber-p)' : (i === 2 ? 'var(--sunken)' : AMBER),
                        color: i === 2 ? 'var(--t3)' : 'var(--on-amber)',
                        transform: i === 1 ? 'scale(.96)' : 'scale(1)',
                      }}>{BTN[i]}</div>
                      <div style={{ border: '1px solid var(--line2)', color: 'var(--t2)', borderRadius: 8, padding: '11px 16px', font: "600 13.5px/1 'Inter',sans-serif" }}>Edit first</div>
                      <div style={{ marginLeft: 'auto', font: `400 10.5px/1.4 ${MONO}`, color: 'var(--t3)', textAlign: 'right', opacity: i === 2 ? 1 : 0, transition: 'opacity 250ms ease' }}>audit 8f21<br />Rafiq · 21:44</div>
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
