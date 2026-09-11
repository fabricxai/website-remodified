'use client';

import Link from 'next/link';
import { STATIONS, T } from '@/lib/data';
import { MODULES, moduleBySlug } from '@/lib/modules';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, MonoLabel, Wrap, btnPrimary, btnSecondary } from '@/components/ui';
import { ScreenCard } from '@/components/ScreenCard';
import { DraftCard } from '@/components/motion/AuditStamp';
import { MonoNumber } from '@/components/motion/MonoNumber';

const MONO = "'JetBrains Mono',monospace";

/** One template, one data file — eleven pages for the cost of one. */
export default function ModuleClient({ slug }: { slug: string }) {
  const { bn, t } = useLang();
  const { h1Style, h2Style, h3Style, leadStyle, bodyStyle } = useTypo();
  const m = moduleBySlug(slug)!;
  const idx = MODULES.findIndex((x) => x.slug === slug);
  const prev = MODULES[(idx + MODULES.length - 1) % MODULES.length];
  const next = MODULES[(idx + 1) % MODULES.length];
  const station = m.station !== null ? STATIONS[m.station] : null;
  const screen = station ? station.screen : { crumb: m.screen.crumb, title: m.screen.title, c1: m.screen.c[0], c2: m.screen.c[1], c3: m.screen.c[2], rows: m.screen.rows };

  return (
    <div>
      {/* Hero claim + screen */}
      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
          <div data-r="two" style={{ alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/product" className="hov-amberp" style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--t3)' }}>← Product</Link>
                <div style={{ width: 1, height: 12, background: 'var(--line2)' }} />
                <Eyebrow>{`Module ${String(idx + 1).padStart(2, '0')} · ${bn ? m.name[1] : m.name[0]}`}</Eyebrow>
              </div>
              <h1 style={h1Style}>{m.claim}</h1>
              <p style={leadStyle}>{m.lead}</p>
              <div style={{ font: `400 12.5px/1.6 ${MONO}`, color: 'var(--t3)' }}>{m.people}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 6 }}>
                <Link href="/demo" className="hov-amber" style={btnPrimary}>{t(T.ctaFloor)}</Link>
                <Link href="/walkthrough" className="hov-sec" style={btnSecondary}>{t(T.ctaWatch)}</Link>
              </div>
            </div>
            <div style={{ perspective: 1500, minWidth: 0 }}>
              <div className="hov-flat" style={{ transform: 'rotateY(-9deg) rotateX(3deg)', transition: 'transform 420ms cubic-bezier(.2,.8,.2,1)' }}>
                <div style={{ animation: 'fx-bob 8s ease-in-out infinite' }}>
                  <ScreenCard s={screen} />
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Three capabilities */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,3.4vw,40px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '46ch' }}>
            <Eyebrow h={13}>Three capabilities</Eyebrow>
            <h2 style={h2Style}>What it stops doing by hand.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 2 }}>
            {m.capabilities.map((c, i) => (
              <div key={c.title} style={{ display: 'flex', gap: 16, padding: '20px 20px 20px 0', borderTop: '1px solid var(--line2)', alignItems: 'flex-start' }}>
                <div style={{ font: `500 12px/1.5 ${MONO}`, color: 'var(--t3)', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ font: "600 16px/1.3 'Archivo',sans-serif", letterSpacing: '-.01em' }}>{c.title}</div>
                  <div style={{ font: "400 13.5px/1.6 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* One MARBIM moment + one safeguard */}
      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
          <div data-r="two" style={{ alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
              <Eyebrow h={13}>The MARBIM moment</Eyebrow>
              <h3 style={h3Style}>MARBIM drafts {m.marbim.drafts}.</h3>
              <p style={bodyStyle}>Read from <span style={{ font: `400 13px/1.5 ${MONO}`, color: 'var(--ink)' }}>{m.marbim.from}</span>. Nothing is saved until {m.marbim.approver} presses approve — and the stamp says who, when, and what they saw.</p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingTop: 6 }}>
                <div style={{ width: 2, alignSelf: 'stretch', background: 'var(--amber)' }} />
                <div style={{ font: "500 15px/1.5 'Inter',sans-serif", maxWidth: '38ch', textWrap: 'pretty' }}>{t(T.proof)}</div>
              </div>
              <div style={{ font: `400 11px/1.5 ${MONO}`, color: 'var(--t3)' }}>Hover or tap the card to approve it.</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
              <DraftCard title={screen.crumb.split(' / ')[0]} width="min(100%, 380px)" who={m.marbim.approver} time="21:44">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ font: "600 13.5px/1.3 'Inter',sans-serif" }}>{screen.title}</div>
                  {screen.rows.slice(0, 3).map((r) => (
                    <div key={r[0]} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ font: `400 10.5px/1 ${MONO}`, color: 'var(--t3)' }}>{r[0]}</div>
                        <div style={{ font: `500 11.5px/1 ${MONO}` }}><MonoNumber value={r[1]} /></div>
                      </div>
                      <div style={{ height: 2, background: 'var(--sunken)', borderRadius: 2, overflow: 'hidden' }}><div style={{ height: '100%', background: 'var(--ok)', width: '92%' }} /></div>
                    </div>
                  ))}
                  <div style={{ font: `400 10px/1.4 ${MONO}`, color: 'var(--t3)' }}>sources: {m.marbim.from}</div>
                </div>
              </DraftCard>
            </div>
          </div>

          <div data-r="safeguard" style={{ marginTop: 'clamp(40px,5vw,64px)', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '22px 24px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 20, alignItems: 'center', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 22, height: 22, border: '1.5px solid var(--ink)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 12, height: 2, background: 'var(--amber)' }} />
              </div>
              <div style={{ font: `600 13px/1 ${MONO}`, letterSpacing: '.03em' }}>{m.safeguard.code}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
              <div style={{ font: "600 15px/1.25 'Inter',sans-serif" }}>{m.safeguard.name}</div>
              <div style={{ font: "400 13px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{m.safeguard.body}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--dang)' }} />
              <div style={{ font: `400 11px/1 ${MONO}`, color: 'var(--t3)' }}>Blocks: {m.safeguard.blocks}</div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Prev / next */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 28, paddingBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <Link href={`/product/${prev.slug}`} className="hov-amberp" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <MonoLabel tracking=".08em" size={10}>← Previous</MonoLabel>
            <div style={{ font: "500 14px/1.3 'Inter',sans-serif" }}>{bn ? prev.name[1] : prev.name[0]}</div>
          </Link>
          <Link href={`/product/${next.slug}`} className="hov-amberp" style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', textAlign: 'right' }}>
            <MonoLabel tracking=".08em" size={10}>Next →</MonoLabel>
            <div style={{ font: "500 14px/1.3 'Inter',sans-serif" }}>{bn ? next.name[1] : next.name[0]}</div>
          </Link>
        </Wrap>
      </section>
    </div>
  );
}
