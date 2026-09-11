import type { CSSProperties } from 'react';
import type { ChipKind } from '@/lib/data';
import { Mark } from './ui';
import { MonoNumber } from './motion/MonoNumber';

const MONO = "'JetBrains Mono',monospace";
const CHIP_COLOR: Record<ChipKind, string> = { ok: 'var(--ok)', warn: 'var(--warn)', dang: 'var(--dang)', n: 'var(--t2)' };
export const chip = (kind: string): CSSProperties => ({ font: `500 12px/1 ${MONO}`, color: CHIP_COLOR[kind as ChipKind] || 'var(--t2)', display: 'inline-block' });

export interface ScreenData {
  crumb: string; title: string;
  status?: string; dot?: string; meta?: string;
  c1: string; c2: string; c3: string;
  rows: [string, string, string][];
  foot?: string; action?: string;
}

/** A product screen, drawn in the design system: ink chrome, sunken header row, status chips, one amber action. */
export function ScreenCard({ s, style }: { s: ScreenData; style?: CSSProperties }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, boxShadow: 'var(--sh3)', overflow: 'hidden', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--chrome)', color: 'var(--on-chrome)' }}>
        <Mark ink="#FFFFFF" style={{ width: 13, height: 14, flexShrink: 0 }} />
        <div style={{ font: `500 12px/1 ${MONO}`, letterSpacing: '.04em' }}>{s.crumb}</div>
        {s.status && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: 999, background: s.dot }} />
            <div style={{ font: `400 11px/1 ${MONO}`, color: '#AEB5C4' }}>{s.status}</div>
          </div>
        )}
      </div>
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ font: "600 17px/1.2 'Archivo',sans-serif", letterSpacing: '-.01em' }}>{s.title}</div>
          {s.meta && <div style={{ font: `400 11px/1 ${MONO}`, color: 'var(--t3)' }}>{s.meta}</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr .9fr', gap: 12, padding: '9px 14px', background: 'var(--sunken)', font: `500 10px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--t3)' }}>
            <div>{s.c1}</div><div>{s.c2}</div><div style={{ textAlign: 'right' }}>{s.c3}</div>
          </div>
          {s.rows.map((r) => {
            const [c, kindKey] = r[2].split('|');
            return (
              <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr .9fr', gap: 12, padding: '11px 14px', borderTop: '1px solid var(--line)', alignItems: 'center' }}>
                <div style={{ font: "400 13px/1.35 'Inter',sans-serif", color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r[0]}</div>
                <div style={{ font: `400 12px/1.35 ${MONO}`, color: 'var(--t2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><MonoNumber value={r[1]} /></div>
                <div style={{ textAlign: 'right' }}><MonoNumber value={c} style={chip(kindKey)} /></div>
              </div>
            );
          })}
        </div>
        {(s.foot || s.action) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ font: "400 12px/1.4 'Inter',sans-serif", color: 'var(--t3)', flex: 1, textWrap: 'pretty' }}>{s.foot}</div>
            {s.action && <div style={{ background: 'var(--amber)', color: 'var(--on-amber)', borderRadius: 8, padding: '9px 15px', font: "600 13px/1 'Inter',sans-serif", whiteSpace: 'nowrap' }}>{s.action}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
