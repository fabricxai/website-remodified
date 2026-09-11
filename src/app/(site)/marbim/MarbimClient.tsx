'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { AMBER, LAYERS, LOOP_FIELDS, MARK_LOOP, MARK_PATHS, NEVER, ROADMAP, ROSTER, SRC_FIELDS, SRC_LINES, T, WHY_SMALL } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { DarkCut, Eyebrow, MonoLabel, SectionHead, Wrap, btnPrimary, btnSecondary } from '@/components/ui';
import { MonoNumber } from '@/components/motion/MonoNumber';

const MONO = "'JetBrains Mono',monospace";

/** Five-layer architecture, hairlines + mono labels, animated build-in on first view. */
function Layers({ dark = false, full = false }: { dark?: boolean; full?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const { reduced } = useLang();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduced) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.02, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    const fallback = setTimeout(() => setOn(true), 2500); // never leave the diagram invisible
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [reduced]);
  const line = dark ? '#252B3A' : 'var(--line2)';
  const fg = dark ? '#F4F3F0' : 'var(--ink)';
  const sub = dark ? '#AEB5C4' : 'var(--t2)';
  const mute = dark ? '#7C8497' : 'var(--t3)';
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
      {LAYERS.map(([n, label, s, body], i) => {
        const isCalc = i === 3;
        return (
          <div key={n} style={{
            display: 'grid', gridTemplateColumns: full ? '64px 1.1fr 1.6fr' : '64px 1fr', gap: 18, alignItems: 'start', padding: '18px 0',
            borderTop: `1px solid ${line}`, borderBottom: i === LAYERS.length - 1 ? `1px solid ${line}` : 'none',
            opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(14px)', transition: `opacity 420ms ease ${i * 110}ms, transform 420ms cubic-bezier(.2,.8,.2,1) ${i * 110}ms`,
          }}>
            <div style={{ font: `500 12px/1 ${MONO}`, color: mute, paddingTop: 3, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{n}</span>
              <span style={{ width: 1, height: 12, background: line }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ font: `600 12px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: isCalc ? 'var(--amber-p)' : fg }}>{label}</div>
                {isCalc && <div style={{ font: `500 9px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--amber-p)', border: '1px solid var(--amber-p)', borderRadius: 3, padding: '3px 5px' }}>the difference</div>}
              </div>
              <div style={{ font: "500 15px/1.35 'Inter',sans-serif", color: fg }}>{s}</div>
              {!full && <div style={{ font: "400 13px/1.55 'Inter',sans-serif", color: sub, textWrap: 'pretty', maxWidth: '52ch' }}>{body}</div>}
            </div>
            {full && <div style={{ font: "400 13.5px/1.6 'Inter',sans-serif", color: sub, textWrap: 'pretty' }}>{body}</div>}
            {i < LAYERS.length - 1 && (
              <div aria-hidden style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-start', paddingLeft: 26, marginBottom: -18, marginTop: -4 }}>
                <div style={{ width: 1, height: 10, background: on ? 'var(--amber)' : line, transition: 'background 300ms ease' }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export { Layers };

export default function MarbimClient() {
  const { bn, reduced, t } = useLang();
  const { h1Style, h2Style, h2DarkStyle, leadStyle, bodyStyle } = useTypo();
  const [mstep, setMstep] = useState(0);
  const [src, setSrc] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setMark = useCallback((i: number) => {
    if (timer.current) clearTimeout(timer.current);
    setMstep(i);
    if (reduced) return;
    timer.current = setTimeout(() => setMark((i + 1) % MARK_LOOP.length), MARK_LOOP[i][1]);
  }, [reduced]);

  useEffect(() => { setMark(0); return () => { if (timer.current) clearTimeout(timer.current); }; }, [setMark]);

  const srcLine = SRC_FIELDS[src][5];
  const flyDocStyle: CSSProperties = { position: 'absolute', left: '4%', top: '26%', zIndex: 2, opacity: 0, animation: mstep === 1 ? 'fx-flyin 1.5s cubic-bezier(.2,.8,.2,1) forwards' : 'none' };
  const draftCardStyle: CSSProperties = { position: 'absolute', right: '2%', top: '22%', zIndex: 3, opacity: mstep >= 3 ? 1 : 0, animation: mstep === 3 ? 'fx-popout 520ms cubic-bezier(.2,.8,.2,1) forwards' : 'none', transition: mstep >= 3 ? 'none' : 'opacity 200ms ease' };
  const approveBtnStyle: CSSProperties = { background: mstep === 4 ? 'var(--amber-p)' : AMBER, color: 'var(--on-amber)', borderRadius: 7, padding: '9px 0', textAlign: 'center', font: "600 11.5px/1 'Inter',sans-serif", transform: mstep === 4 ? 'scale(.95)' : 'scale(1)', transition: 'all 160ms ease', marginTop: 2 };

  return (
    <div>
      {/* 1 · Hero — garment intelligence */}
      <section style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
          <div data-r="two">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26, minWidth: 0 }}>
              <Eyebrow>{bn ? 'গার্মেন্ট ইন্টেলিজেন্স' : 'Garment intelligence'}</Eyebrow>
              <h1 style={h1Style}>{bn ? 'মারবিম পড়ে ইন্ডাস্ট্রির কাগজপত্র।' : 'MARBIM reads the industry’s paperwork.'}</h1>
              <p style={leadStyle}>{bn ? 'শুধু গার্মেন্টসের জন্য তৈরি একটি ছোট ল্যাঙ্গুয়েজ মডেল — আসল কারখানার কাগজ, একক, আর বাংলা-ইংরেজি মিশ্রণে প্রশিক্ষিত।' : 'A small language model built only for garments — trained on the documents, the units, and the Bangla-English mix of a real factory floor.'}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                {MARK_LOOP.map(([label], i) => (
                  <div key={label} onClick={() => setMark(i)} style={{ border: '1px solid ' + (i === mstep ? AMBER : 'var(--line2)'), background: i === mstep ? 'var(--amber-s)' : 'transparent', color: i === mstep ? 'var(--amber-p)' : 'var(--t2)', borderRadius: 999, padding: '8px 15px', cursor: 'pointer', font: `500 12.5px/1 ${MONO}`, transition: 'all 180ms ease' }}>{label}</div>
                ))}
              </div>
              <div style={{ font: `400 13px/1.6 ${MONO}`, color: 'var(--t3)', maxWidth: '42ch' }}>{MARK_LOOP[mstep][3]}</div>
            </div>

            <div style={{ position: 'relative', minHeight: 'clamp(300px,34vw,420px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 14, backgroundColor: 'var(--sunken)', backgroundImage: 'repeating-linear-gradient(146deg, transparent 0 8px, var(--line) 8px 10px, transparent 10px 19px)' }} />
              <div style={flyDocStyle}>
                <div style={{ width: 96, background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 6, boxShadow: 'var(--sh2)', padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ height: 5, width: '70%', background: 'var(--line2)', borderRadius: 2 }} />
                  <div style={{ height: 4, width: '100%', background: 'var(--line)', borderRadius: 2 }} />
                  <div style={{ height: 4, width: '88%', background: 'var(--line)', borderRadius: 2 }} />
                  <div style={{ height: 4, width: '94%', background: 'var(--line)', borderRadius: 2 }} />
                  <div style={{ font: `400 7px/1 ${MONO}`, color: 'var(--t3)', paddingTop: 3 }}>techpack.pdf</div>
                </div>
              </div>
              <svg viewBox="0 0 99 105" style={{ width: 'clamp(140px,15vw,190px)', height: 'auto', display: 'block', position: 'relative', overflow: 'visible' }}>
                {MARK_PATHS.map(([d, amber, dx, dy], i) => (
                  <path key={i} d={d} fill={amber ? AMBER : 'var(--ink)'} style={{ transformBox: 'view-box', transformOrigin: '49.5px 52.5px', willChange: 'transform, opacity', ['--dx' as string]: dx, ['--dy' as string]: dy, animation: MARK_LOOP[mstep][2](i) } as CSSProperties} />
                ))}
              </svg>
              <div style={draftCardStyle}>
                <div style={{ width: 196, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, boxShadow: 'var(--sh3)', overflow: 'hidden' }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--line)', font: `500 10px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--t3)' }}>Draft · PO-4471</div>
                  <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {LOOP_FIELDS.map(([k, v, bar]) => (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, font: `400 9.5px/1 ${MONO}`, color: 'var(--t3)' }}><span>{k}</span><span>{bar}</span></div>
                        <div style={{ font: "500 11px/1.2 'Inter',sans-serif" }}>{v}</div>
                        <div style={{ height: 2, background: 'var(--sunken)', borderRadius: 2, overflow: 'hidden' }}><div style={{ height: '100%', background: 'var(--ok)', width: bar }} /></div>
                      </div>
                    ))}
                    <div style={approveBtnStyle}>Approve</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 2 · What it reads today — roster + provenance interactive */}
      <section style={{ borderBottom: '1px solid var(--line)', background: 'var(--canvas)' }}>
        <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)', display: 'flex', flexDirection: 'column', gap: 'clamp(28px,3.6vw,44px)' }}>
          <SectionHead eyebrow="What it reads today" title={bn ? 'মারবিম খসড়া করে। সিদ্ধান্ত আপনার।' : 'MARBIM drafts. Your people decide.'} titleStyle={h2Style} leadStyle={bodyStyle}
            lead="Ten documents it reads without being asked twice. Each one is read into named fields with a confidence and a source link. Nothing is written to the database until a person with the right to that record confirms it." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(248px,1fr))', gap: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
            {ROSTER.map(([doc, reads, fills]) => (
              <div key={doc} style={{ background: 'var(--surface)', boxShadow: '0 0 0 1px var(--line)', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 154 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 15, height: 18, border: '1px solid var(--line2)', borderRadius: 2, background: 'var(--sunken)', flexShrink: 0 }} />
                  <div style={{ font: "600 15px/1.2 'Inter',sans-serif" }}>{doc}</div>
                </div>
                <div style={{ font: "400 13px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{reads}</div>
                <div style={{ marginTop: 'auto', font: `400 11px/1.4 ${MONO}`, color: 'var(--t3)', paddingTop: 8, borderTop: '1px solid var(--line)' }}>→ {fills}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20, alignItems: 'stretch', paddingTop: 12 }}>
            <div style={{ background: 'var(--sunken)', border: '1px solid var(--line)', borderRadius: 12, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <MonoLabel tracking=".06em">techpack_ss26.pdf · p.2</MonoLabel>
                <div style={{ font: `400 11px/1 ${MONO}`, color: 'var(--t3)' }}>source</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {SRC_LINES.map((l, i) => (
                  <div key={l} style={{ font: `400 12.5px/1.9 ${MONO}`, whiteSpace: 'pre', overflow: 'hidden', textOverflow: 'ellipsis', color: i === srcLine ? 'var(--ink)' : 'var(--t3)', background: i === srcLine ? 'var(--amber-s)' : 'transparent', borderLeft: '2px solid ' + (i === srcLine ? AMBER : 'transparent'), padding: '2px 8px', borderRadius: 3, transition: 'all 200ms ease' }}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: 'var(--sh2)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <MonoLabel tracking=".06em">Extracted record · INQ-8841</MonoLabel>
                <div style={{ font: `400 10.5px/1 ${MONO}`, color: 'var(--amber-p)' }}>every value points back at the line it came from</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SRC_FIELDS.map(([k, v, conf, bar, color], i) => (
                  <div key={k} onMouseEnter={() => setSrc(i)} onClick={() => setSrc(i)} style={{ display: 'flex', flexDirection: 'column', gap: 6, cursor: 'pointer', padding: '11px 13px', borderRadius: 8, transition: 'all 180ms ease', border: '1px solid ' + (src === i ? 'var(--line2)' : 'transparent'), background: src === i ? 'var(--sunken)' : 'transparent' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ font: `400 11.5px/1 ${MONO}`, color: 'var(--t3)' }}>{k}</div>
                      <div style={{ font: `500 11.5px/1 ${MONO}`, color }}><MonoNumber value={conf} /></div>
                    </div>
                    <div style={{ font: "500 15px/1.3 'Inter',sans-serif" }}>{v}</div>
                    <div style={{ height: 3, background: 'var(--sunken)', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', background: color, width: bar }} /></div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingTop: 14, borderTop: '1px solid var(--line)', font: `400 11px/1.5 ${MONO}`, color: 'var(--t3)', textWrap: 'pretty' }}>
                <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--amber)', flexShrink: 0 }} />
                MARBIM v2 · 3 sources · awaiting confirmation by A. Rahman
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 3 · Inside MARBIM — the dark cut */}
      <DarkCut style={{ borderTop: 'none' }}>
        <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)' }}>
          <div data-r="side">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Eyebrow h={13} color="#7C8497">Inside MARBIM</Eyebrow>
              <div style={{ font: "400 13.5px/1.6 'Inter',sans-serif", color: '#AEB5C4', textWrap: 'pretty', maxWidth: '26ch' }}>Five layers. The model is one of them, and the arithmetic is deliberately not.</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,3.6vw,44px)', minWidth: 0 }}>
              <h2 style={h2DarkStyle}>A model that does not do the math.</h2>
              <Layers dark />
              <div style={{ font: `400 12px/1.6 ${MONO}`, color: '#7C8497', maxWidth: '64ch', textWrap: 'pretty' }}>Consumption, costing and CM are computed, never generated. MARBIM fills the inputs from the documents; the formulas are fixed and auditable line by line. That is the honest claim, and the safer one.</div>
            </div>
          </div>
        </Wrap>
      </DarkCut>

      {/* 4 · Why small, why ours */}
      <section style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
        <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)', display: 'flex', flexDirection: 'column', gap: 'clamp(28px,3.6vw,44px)' }}>
          <SectionHead eyebrow="Why small, why ours" title="Built only for garments." titleStyle={h2Style} leadStyle={bodyStyle}
            lead="A general model knows a little about everything. MARBIM knows a great deal about one thing, and it runs where the factory is." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18 }}>
            {WHY_SMALL.map(([k, title, body]) => (
              <div key={k} style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: 12, padding: '24px 24px 22px', display: 'flex', flexDirection: 'column', gap: 12, clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                <div style={{ font: `600 11px/1 ${MONO}`, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--amber-p)' }}>{k}</div>
                <div style={{ font: "600 17px/1.3 'Archivo',sans-serif", letterSpacing: '-.012em' }}>{title}</div>
                <div style={{ font: "400 13.5px/1.6 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{body}</div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* 5 · Roadmap, honestly labeled */}
      <section style={{ borderBottom: '1px solid var(--line)', background: 'var(--canvas)' }}>
        <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)' }}>
          <div data-r="side">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Eyebrow h={13}>Roadmap</Eyebrow>
              <div style={{ font: "400 13.5px/1.6 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty', maxWidth: '26ch' }}>What reads today, what is in training, what is ahead. No benchmarks, no parameter counts.</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,3vw,38px)', minWidth: 0 }}>
              <h2 style={h2Style}>Honestly labeled.</h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {ROADMAP.map(([state, body], i) => {
                  const cls = state === 'SHIPPED' ? 'roadmap-shipped' : state === 'IN TRAINING' ? 'roadmap-training' : 'roadmap-ahead';
                  return (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '132px 1fr', gap: 18, alignItems: 'start', padding: '16px 0', borderTop: '1px solid var(--line2)' }}>
                      <div className={cls} style={{ font: `600 10px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', border: '1px solid', borderRadius: 3, padding: '6px 8px', justifySelf: 'start', background: state === 'SHIPPED' ? 'rgba(47,125,91,.08)' : state === 'IN TRAINING' ? 'var(--amber-s)' : 'transparent' }}>{state}</div>
                      <div style={{ font: "400 14.5px/1.55 'Inter',sans-serif", color: state === 'AHEAD' ? 'var(--t3)' : 'var(--t2)', textWrap: 'pretty' }}>{body}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 6 · What MARBIM never does */}
      <section id="never" style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)', scrollMarginTop: 70 }}>
        <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)' }}>
          <div data-r="side">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <Eyebrow h={13}>Honest limits</Eyebrow>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,3vw,38px)', minWidth: 0 }}>
              <h2 style={h2Style}>What MARBIM never does.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 2 }}>
                {NEVER.map(([t1, b]) => (
                  <div key={t1} style={{ display: 'flex', gap: 14, padding: '18px 0', borderTop: '1px solid var(--line2)', alignItems: 'flex-start' }}>
                    <div style={{ width: 12, height: 2, background: 'var(--dang)', marginTop: 11, flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <div style={{ font: "600 15.5px/1.35 'Inter',sans-serif" }}>{t1}</div>
                      <div style={{ font: "400 13.5px/1.55 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{b}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: 12, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 10, clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
                <MonoLabel tracking=".08em">The trust footer</MonoLabel>
                <div style={{ font: "400 14.5px/1.6 'Inter',sans-serif", color: 'var(--t2)', maxWidth: '60ch', textWrap: 'pretty' }}>Every record MARBIM touched carries the same line at the bottom of its screen. It is not a badge — it is the audit entry, readable by the owner and by a buyer&apos;s auditor.</div>
                <div style={{ background: 'var(--sunken)', borderRadius: 8, padding: '13px 15px', font: `400 12px/1.6 ${MONO}`, color: 'var(--t2)', textWrap: 'pretty' }}>drafted by MARBIM v2 · sources: techpack_ss26.pdf p2, LC-021/26 · confirmed by Rafiq Hasan, store manager · 12 Sep 2026 21:44 · audit 8f21c4</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingTop: 8 }}>
                <div style={{ font: "500 clamp(15px,1.3vw,17px)/1.5 'Inter',sans-serif", color: 'var(--amber-p)' }}>{t(T.proof)}</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginLeft: 'auto' }}>
                  <Link href="/demo" className="hov-amber" style={btnPrimary}>{t(T.ctaFloor)}</Link>
                  <Link href="/technology" className="hov-sec" style={btnSecondary}>How it is built →</Link>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
