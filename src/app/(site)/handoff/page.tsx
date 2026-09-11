'use client';

import type { CSSProperties } from 'react';
import { AMBER, BOARDS, BUILD_NOTES, INVENTORY, MARK_PATHS } from '@/lib/data';
import { useTypo } from '@/lib/lang';
import { Eyebrow, MonoLabel, Wrap } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";

export default function HandoffPage() {
  // internal — excluded from nav, sitemap.xml and robots; see layout for robots meta
  const { h1Style, h3Style, leadStyle, h2DarkStyle } = useTypo();

  return (
    <div>
      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(40px,5vw,64px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Eyebrow>Internal · build handoff</Eyebrow>
          <h1 style={h1Style}>Motion storyboards &amp; component inventory.</h1>
          <p style={leadStyle}>Every 3D scene frame by frame, its reduced-motion static state, and each element mapped to its design-system token — the page to hand to Claude Code alongside the design.</p>
        </Wrap>
      </section>

      {BOARDS.map(([n, title, spec, bg, stat, frames]) => (
        <section key={n} style={{ background: bg, borderBottom: '1px solid var(--line)' }}>
          <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <MonoLabel tracking=".1em">Scene {n}</MonoLabel>
                <h2 style={h3Style}>{title}</h2>
              </div>
              <div style={{ font: `400 12.5px/1.6 ${MONO}`, color: 'var(--t2)', maxWidth: '44ch', textWrap: 'pretty' }}>{spec}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(232px,1fr))', gap: 16 }}>
              {frames.map((f) => (
                <div key={f[0] + f[1]} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 132, background: 'var(--sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    {f[3] === 'mark' ? (
                      <svg viewBox="0 0 99 105" style={{ width: 64, height: 'auto', display: 'block', overflow: 'visible' }}>
                        {MARK_PATHS.map(([d, amber, dx, dy], i) => (
                          <path key={i} d={d} fill={amber ? AMBER : 'var(--ink)'} style={{
                            transformBox: 'view-box', transformOrigin: '49.5px 52.5px', opacity: f[4][2],
                            transform: 'translate(' + (dx * f[4][0]).toFixed(2) + 'px,' + (dy * f[4][0]).toFixed(2) + 'px) rotate(' + f[4][1] + 'deg)',
                          } as CSSProperties} />
                        ))}
                      </svg>
                    ) : (
                      <div style={{ width: '78%', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ position: 'relative', height: 9 }}>
                          <div style={{ position: 'absolute', left: 0, right: 0, top: 4, height: 1.5, background: 'var(--line2)' }} />
                          <div style={{ position: 'absolute', left: 0, top: 4, height: 1.5, background: 'var(--ink)', width: f[4][0] }} />
                          <div style={{ position: 'absolute', top: 0, width: 9, height: 9, marginLeft: -4, borderRadius: 999, background: 'var(--amber)', left: f[4][0] }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <div style={{ width: 96, height: 56, background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 5, boxShadow: 'var(--sh2)', transform: f[4][1], opacity: Number(f[4][2]) }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                      <div style={{ font: "600 13.5px/1.2 'Inter',sans-serif" }}>{f[1]}</div>
                      <div style={{ font: `500 11px/1 ${MONO}`, color: 'var(--amber-p)' }}>{f[0]}</div>
                    </div>
                    <div style={{ font: "400 12.5px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{f[2]}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: '20px 22px', clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
              <div style={{ font: `500 10px/1 ${MONO}`, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--t3)', paddingTop: 3, whiteSpace: 'nowrap' }}>Reduced motion</div>
              <div style={{ font: "400 14px/1.6 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{stat}</div>
            </div>
          </Wrap>
        </section>
      ))}

      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)', display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <MonoLabel tracking=".1em">Component inventory</MonoLabel>
            <h2 style={h3Style}>Element → component → token.</h2>
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden', background: 'var(--surface)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.5fr', gap: 14, padding: '12px 20px', background: 'var(--sunken)', font: `500 10px/1 ${MONO}`, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--t3)' }}>
              <div>Element</div><div>Component</div><div>Tokens &amp; rules</div>
            </div>
            {INVENTORY.map(([el, comp, tok]) => (
              <div key={el} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.5fr', gap: 14, padding: '14px 20px', borderTop: '1px solid var(--line)', alignItems: 'baseline' }}>
                <div style={{ font: "500 13.5px/1.4 'Inter',sans-serif" }}>{el}</div>
                <div style={{ font: `400 12.5px/1.4 ${MONO}`, color: 'var(--amber-p)' }}>{comp}</div>
                <div style={{ font: `400 12.5px/1.55 ${MONO}`, color: 'var(--t2)', textWrap: 'pretty' }}>{tok}</div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section style={{ background: 'var(--dark-bg)', color: '#F4F3F0', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
          <div data-r="side">
            <MonoLabel tracking=".1em" color="#7C8497">Build note</MonoLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
              <h2 style={h2DarkStyle}>For Claude Code.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 2 }}>
                {BUILD_NOTES.map(([t1, b]) => (
                  <div key={t1} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid #252B3A', alignItems: 'flex-start' }}>
                    <div style={{ width: 10, height: 2, background: 'var(--amber)', marginTop: 10, flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <div style={{ font: "600 14px/1.35 'Inter',sans-serif", color: '#F4F3F0' }}>{t1}</div>
                      <div style={{ font: `400 12.5px/1.6 ${MONO}`, color: '#AEB5C4', textWrap: 'pretty' }}>{b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
