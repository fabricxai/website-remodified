'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { CASCADE, SIX_ARTEFACTS } from '@/lib/data';
import { useLang } from '@/lib/lang';
import { MonoNumber } from './MonoNumber';

const MONO = "'JetBrains Mono',monospace";

/** Fan (typed six times) vs grid (regenerated) positions, in % of the stage. */
const FAN = [[4, 6, -7], [20, 2, -3], [36, 10, 2], [52, 4, -2], [68, 12, 4], [80, 3, 7]];
const GRID = [[2, 30, 0], [35, 30, 0], [68, 30, 0], [2, 66, 0], [35, 66, 0], [68, 66, 0]];

function Card({ i, p, mobile }: { i: number; p: number; mobile: boolean }) {
  const [name, wrong] = SIX_ARTEFACTS[i];
  const shown = mobile || p > 0.06 + i * 0.07;
  const errorPhase = p > 0.5 && p < 0.68;
  const regen = p >= 0.68;
  const isErr = i >= 2;
  const pos = regen ? GRID[i] : FAN[i];
  const value = regen ? '36,000 pcs' : wrong;
  const base: CSSProperties = mobile
    ? { position: 'relative' }
    : { position: 'absolute', left: pos[0] + '%', top: pos[1] + '%', width: '30%', transform: `rotate(${pos[2]}deg) translateY(${shown ? 0 : 24}px)`, opacity: shown ? 1 : 0, transition: 'left 520ms cubic-bezier(.2,.8,.2,1), top 520ms cubic-bezier(.2,.8,.2,1), transform 520ms cubic-bezier(.2,.8,.2,1), opacity 300ms ease, border-color 300ms ease' };
  const red = !regen && isErr && (errorPhase || (mobile && !regen));
  return (
    <div style={{
      ...base, background: 'var(--surface)', borderRadius: 8, padding: '10px 12px', boxShadow: 'var(--sh2)',
      border: '1px solid ' + (regen ? 'var(--amber)' : red ? 'var(--dang)' : 'var(--line2)'),
      display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0,
    }}>
      <div style={{ font: `500 9.5px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--t3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ height: 3, width: '72%', background: 'var(--line)', borderRadius: 2 }} />
      <div style={{ height: 3, width: '54%', background: 'var(--line)', borderRadius: 2 }} />
      <div style={{ font: `500 12px/1.2 ${MONO}`, color: regen ? 'var(--amber-p)' : red ? 'var(--dang)' : 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 300ms ease' }}>{value}</div>
      {i === 2 && red && !regen && <div style={{ font: `500 9px/1 ${MONO}`, color: 'var(--dang)', letterSpacing: '.05em' }}>↑ one digit lost</div>}
      {regen && <div style={{ font: `400 9px/1 ${MONO}`, color: 'var(--t3)' }}>from PO-2044 · audit 8f21c4</div>}
    </div>
  );
}

/**
 * The site's centrepiece: six artefacts stack up typed by hand, one digit is
 * lost at step three and the red error cascades, then all six regenerate in
 * amber from one committed record. Scroll-driven (sticky stage) on desktop,
 * static before/after on phones.
 */
export default function DocumentsAssemble({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [mobile, setMobile] = useState(false);
  const { reduced } = useLang();

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = wrap.current; if (!el) return;
      const m = window.innerWidth <= 1000;
      setMobile(m);
      if (m || reduced) { setP(1); return; }
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      setP(Math.round(Math.min(1, Math.max(0, -r.top / span)) * 200) / 200);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on, { passive: true });
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [reduced]);

  const regen = p >= 0.68, err = p > 0.5 && !regen;
  const caption = regen ? 'Regenerated from one committed record. Nothing typed twice.' : err ? 'One digit lost at step three. Short shipped 36,000.' : 'Six versions of one order, typed six times.';

  const stage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ font: `500 10px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: regen ? 'var(--amber-p)' : err ? 'var(--dang)' : 'var(--t3)', transition: 'color 300ms ease' }}>{caption}</div>
        <div style={{ font: `500 10px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ok)', background: 'rgba(47,125,91,.1)', borderRadius: 4, padding: '6px 8px', opacity: regen ? 1 : 0, transform: regen ? 'none' : 'translateY(6px)', transition: 'all 300ms ease' }}>PO-2044 · 36,000 pcs · committed</div>
      </div>
      {mobile ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10 }}>
          {SIX_ARTEFACTS.map((_, i) => <Card key={i} i={i} p={1} mobile />)}
        </div>
      ) : (
        <div style={{ position: 'relative', height: 'clamp(300px,36vw,420px)', borderRadius: 14, backgroundColor: 'var(--sunken)', backgroundImage: 'repeating-linear-gradient(146deg, transparent 0 8px, var(--line) 8px 10px, transparent 10px 19px)', overflow: 'hidden' }}>
          {SIX_ARTEFACTS.map((_, i) => <Card key={i} i={i} p={p} mobile={false} />)}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', paddingTop: 2 }}>
        {CASCADE.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 8, font: `400 12.5px/1.5 ${MONO}`, color: 'var(--t3)' }}>
            {k}<MonoNumber value={v} style={{ color: err || regen ? 'var(--dang)' : 'var(--t2)', fontWeight: 500, transition: 'color 300ms ease' }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (mobile) {
    return <div ref={wrap} data-r="two">{children}{stage}</div>;
  }
  return (
    <div ref={wrap} style={{ height: '240vh' }}>
      <div style={{ position: 'sticky', top: 70, height: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center' }}>
        <div data-r="two" style={{ width: '100%' }}>{children}{stage}</div>
      </div>
    </div>
  );
}
