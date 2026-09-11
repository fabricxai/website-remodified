'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { AMBER } from '@/lib/data';

const MONO = "'JetBrains Mono',monospace";

/** The COMMITTED stamp — rotated, hairline, ok-green. */
export function Stamp({ on, id = '8f21c4', style }: { on: boolean; id?: string; style?: CSSProperties }) {
  return (
    <div aria-hidden style={{
      position: 'absolute', right: 14, bottom: 14, pointerEvents: 'none',
      border: '1.5px solid var(--ok)', color: 'var(--ok)', borderRadius: 4, padding: '6px 9px',
      font: `600 10px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', background: 'var(--stamp-bg)',
      transform: on ? 'rotate(-8deg) scale(1)' : 'rotate(-8deg) scale(1.35)', opacity: on ? 1 : 0,
      transition: 'transform 260ms cubic-bezier(.2,.8,.2,1), opacity 200ms ease', ...style,
    }}>
      Committed · audit {id}
    </div>
  );
}

type Phase = 'draft' | 'pressing' | 'committed';

/**
 * Any card that demonstrates MARBIM output: `DRAFT · NOT SAVED` header, amber
 * APPROVE bar, then the stamp to `COMMITTED · audit 8f21c4`. Plays on hover
 * (pointer) or tap (touch); resets when the pointer leaves.
 */
export function DraftCard({ title, children, id = '8f21c4', who = 'Rafiq Hasan', time = '21:44', style, width }: {
  title: string; children: ReactNode; id?: string; who?: string; time?: string; style?: CSSProperties; width?: number | string;
}) {
  const [phase, setPhase] = useState<Phase>('draft');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setPhase('pressing');
    timer.current = setTimeout(() => setPhase('committed'), 320);
  }, []);
  const reset = useCallback(() => { if (timer.current) clearTimeout(timer.current); setPhase('draft'); }, []);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const committed = phase === 'committed';
  return (
    <div
      onMouseEnter={play} onMouseLeave={reset}
      onClick={() => (committed ? reset() : play())}
      style={{ position: 'relative', width, background: 'var(--surface)', border: '1px solid ' + (committed ? 'var(--ok)' : 'var(--line)'), borderRadius: 10, boxShadow: 'var(--sh3)', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 200ms ease', ...style }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', borderBottom: '1px solid var(--line)', font: `500 10px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: committed ? 'var(--ok)' : 'var(--amber-p)', background: committed ? 'rgba(47,125,91,.08)' : 'var(--amber-s)', transition: 'all 200ms ease' }}>
        <span>{committed ? `Committed · audit ${id}` : 'Draft · not saved'}</span>
        <span style={{ color: 'var(--t3)' }}>{title}</span>
      </div>
      <div style={{ padding: 12 }}>{children}</div>
      <div style={{ padding: '0 12px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          flex: 1, borderRadius: 7, padding: '9px 0', textAlign: 'center', font: "600 11.5px/1 'Inter',sans-serif",
          background: committed ? 'var(--sunken)' : (phase === 'pressing' ? 'var(--amber-p)' : AMBER),
          color: committed ? 'var(--t3)' : 'var(--on-amber)',
          transform: phase === 'pressing' ? 'scale(.95)' : 'scale(1)', transition: 'all 160ms ease',
        }}>{committed ? 'Approved' : 'Approve'}</div>
        <div style={{ font: `400 9.5px/1.3 ${MONO}`, color: 'var(--t3)', textAlign: 'right', opacity: committed ? 1 : 0, transition: 'opacity 250ms ease', whiteSpace: 'nowrap' }}>{who}<br />{time}</div>
      </div>
      <Stamp on={committed} id={id} />
    </div>
  );
}
