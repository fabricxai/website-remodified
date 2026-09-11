'use client';

import Link from 'next/link';
import { DEPLOY, ISOLATION, LANGUAGE_NOTES, SEQUENCE, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { DarkCut, Eyebrow, SectionHead, Wrap, btnPrimary, btnSecondary } from '@/components/ui';
import { Layers } from '@/app/(site)/marbim/MarbimClient';

const MONO = "'JetBrains Mono',monospace";

/** The trust loop as a sequence diagram: actors across the top, one message per row. */
function Sequence() {
  const actors = ['Document', 'MARBIM', 'Calculators', 'Named person', 'System', 'Audit'];
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 720, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${actors.length}, 1fr)`, gap: 8 }}>
          {actors.map((a) => (
            <div key={a} style={{ font: `500 10px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: a === 'Named person' ? 'var(--amber-p)' : '#AEB5C4', textAlign: 'center', padding: '8px 6px', border: '1px solid ' + (a === 'Named person' ? 'var(--amber-p)' : '#252B3A'), borderRadius: 4 }}>{a}</div>
          ))}
        </div>
        <div style={{ position: 'relative', padding: '16px 0 4px' }}>
          <div aria-hidden style={{ position: 'absolute', inset: '0 0 0 0', display: 'grid', gridTemplateColumns: `repeat(${actors.length}, 1fr)`, gap: 8, pointerEvents: 'none' }}>
            {actors.map((a) => <div key={a} style={{ justifySelf: 'center', width: 1, background: '#252B3A' }} />)}
          </div>
          {SEQUENCE.map(([actor, action, note], i) => {
            const col = actors.indexOf(actor === 'Named person' ? 'Named person' : actor);
            const amber = actor === 'Named person';
            return (
              <div key={i} style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${actors.length}, 1fr)`, gap: 8, padding: '10px 0' }}>
                <div style={{ gridColumn: `${col + 1} / span ${Math.min(2, actors.length - col)}`, background: '#181D29', border: '1px solid ' + (amber ? 'var(--amber-p)' : '#252B3A'), borderRadius: 6, padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ font: `600 11px/1 ${MONO}`, color: amber ? 'var(--amber)' : '#F4F3F0', letterSpacing: '.04em' }}>{actor} → {action}</div>
                  <div style={{ font: "400 12px/1.45 'Inter',sans-serif", color: '#AEB5C4' }}>{note}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Triplet({ items }: { items: [string, string][] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 2 }}>
      {items.map(([t1, b]) => (
        <div key={t1} style={{ display: 'flex', gap: 14, padding: '18px 18px 18px 0', borderTop: '1px solid var(--line2)', alignItems: 'flex-start' }}>
          <div style={{ width: 10, height: 2, background: 'var(--amber)', marginTop: 10, flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ font: "600 15.5px/1.35 'Inter',sans-serif" }}>{t1}</div>
            <div style={{ font: "400 13.5px/1.55 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{b}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TechnologyClient() {
  const { t } = useLang();
  const { h1Style, h2Style, h2DarkStyle, leadStyle, bodyStyle } = useTypo();

  return (
    <div>
      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1320 }}>
          <div style={{ maxWidth: '60ch', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Eyebrow>Technology · how it is built</Eyebrow>
            <h1 style={h1Style}>Five layers, one loop, no generated math.</h1>
            <p style={leadStyle}>For the technical evaluator and the press: what MARBIM is, where the arithmetic lives, how a factory’s data is kept to itself, and where the system runs.</p>
          </div>
        </Wrap>
      </section>

      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,3.4vw,40px)' }}>
          <SectionHead eyebrow="Architecture" title="Inside MARBIM, at full depth." titleStyle={h2Style} leadStyle={bodyStyle}
            lead="The model is one layer of five. Everything numeric runs through fixed formulas the factory can audit; everything written is a draft until a named person approves it." />
          <Layers full />
        </Wrap>
      </section>

      <DarkCut style={{ borderTop: 'none' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,3.4vw,40px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '52ch' }}>
            <Eyebrow h={13} color="#7C8497">The trust loop</Eyebrow>
            <h2 style={h2DarkStyle}>Propose → approve → commit, as a sequence.</h2>
            <p style={{ font: "400 clamp(15px,1.3vw,17px)/1.65 'Inter',sans-serif", color: '#AEB5C4', margin: 0, textWrap: 'pretty' }}>The only actor that can move a record into the factory is a named person. MARBIM and the calculators prepare; the system commits only after the approval; the audit stamp is permanent.</p>
          </div>
          <Sequence />
        </Wrap>
      </DarkCut>

      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)', display: 'flex', flexDirection: 'column', gap: 'clamp(40px,5vw,64px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,34px)' }}>
            <SectionHead eyebrow="Data isolation" title="Your factory’s data trains no one else’s model." titleStyle={h2Style} />
            <Triplet items={ISOLATION} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,34px)' }}>
            <SectionHead eyebrow="Deployment" title="Works on the factory’s own infrastructure." titleStyle={h2Style} />
            <Triplet items={DEPLOY} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,34px)' }}>
            <SectionHead eyebrow="Bangla + English" title="Two languages, one record." titleStyle={h2Style} />
            <Triplet items={LANGUAGE_NOTES} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingTop: 8, borderTop: '1px solid var(--line)' }}>
            <div style={{ font: "500 15px/1.5 'Inter',sans-serif", color: 'var(--amber-p)', paddingTop: 18 }}>{t(T.proof)}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginLeft: 'auto', paddingTop: 18 }}>
              <Link href="/demo" className="hov-amber" style={btnPrimary}>{t(T.ctaFloor)}</Link>
              <Link href="/marbim" className="hov-sec" style={btnSecondary}>MARBIM →</Link>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
