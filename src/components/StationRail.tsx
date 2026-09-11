'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AMBER, ARTIFACTS, STATIONS, ST_BN } from '@/lib/data';
import { useLang } from '@/lib/lang';
import { ScreenCard } from './ScreenCard';
import { MonoNumber } from './motion/MonoNumber';

const MONO = "'JetBrains Mono',monospace";
/** Station index → module slug. */
export const STATION_MODULE = ['merchandising', 'commercial', 'planning', 'store', 'cutting', 'sewing', 'quality', 'commercial', 'commercial'];

/** The order journey as an explorable rail: click a station, see its screen, open its module. */
export default function StationRail() {
  const { bn } = useLang();
  const [i, setI] = useState(0);
  const s = STATIONS[i];
  const kind = s.badgeKind;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vw,48px)' }}>
      <div style={{ position: 'relative', height: 52 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 15, height: 2, background: 'var(--line2)' }} />
        <div style={{ position: 'absolute', left: 0, top: 15, height: 2, background: 'var(--ink)', width: (i / (STATIONS.length - 1)) * 100 + '%', transition: 'width 320ms cubic-bezier(.2,.8,.2,1)' }} />
        <div style={{ position: 'absolute', top: 8, width: 16, height: 16, marginLeft: -8, borderRadius: 999, background: 'var(--amber)', border: '3px solid var(--canvas)', boxShadow: '0 0 0 1px var(--amber-p)', left: (i / (STATIONS.length - 1)) * 100 + '%', transition: 'left 320ms cubic-bezier(.2,.8,.2,1)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'space-between' }}>
          {STATIONS.map((st, k) => {
            const on = k <= i, cur = k === i;
            return (
              <button key={st.short} onClick={() => setI(k)} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, flex: 1, minWidth: 0 }}>
                <div style={{ width: 9, height: 9, marginTop: 11, borderRadius: 999, background: on ? (cur ? AMBER : 'var(--ink)') : 'var(--canvas)', border: '2px solid ' + (on ? (cur ? '#B88C21' : 'var(--ink)') : 'var(--line3)'), transform: cur ? 'scale(1.5)' : 'scale(1)', transition: 'all 200ms ease' }} />
                <div style={{ font: `${cur ? 600 : 500} 10px/1.2 ${MONO}`, letterSpacing: '.05em', textTransform: 'uppercase', color: cur ? 'var(--ink)' : (on ? 'var(--t2)' : 'var(--t3)'), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{bn ? ST_BN[k] : st.short}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div data-r="two" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ font: `500 32px/1 ${MONO}`, color: 'var(--line3)' }}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{ width: 26, height: 1, background: 'var(--line2)' }} />
            <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)' }}>{s.dept}</div>
          </div>
          <h3 style={{ font: "600 clamp(24px,2.6vw,36px)/1.08 'Archivo',sans-serif", letterSpacing: '-.02em', margin: 0 }}>{s.title}</h3>
          <p style={{ font: "400 clamp(15px,1.2vw,17px)/1.6 'Inter',sans-serif", color: 'var(--t2)', margin: 0, maxWidth: '42ch', textWrap: 'pretty' }}>{s.caption}</p>
          <div style={{ font: `400 11.5px/1.6 ${MONO}`, color: 'var(--t3)', background: 'var(--sunken)', borderRadius: 6, padding: '8px 11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}><MonoNumber value={ARTIFACTS[i]} /></div>
          {kind && (
            <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 10, background: kind === 'ai' ? 'var(--amber-s)' : 'var(--sunken)', border: '1px solid ' + (kind === 'ai' ? 'var(--amber-line)' : 'var(--line)'), color: kind === 'ai' ? 'var(--amber-p)' : 'var(--ink)', maxWidth: '46ch' }}>
              <div style={{ width: 9, height: 9, borderRadius: kind === 'ai' ? 999 : 2, marginTop: 4, flexShrink: 0, background: kind === 'ai' ? AMBER : 'var(--ink)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ font: `600 12px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.badgeLabel}</div>
                <div style={{ font: "400 13px/1.45 'Inter',sans-serif", color: 'var(--t2)' }}>{s.badgeBody}</div>
              </div>
            </div>
          )}
          <Link href={`/product/${STATION_MODULE[i]}`} className="hov-amberp" style={{ alignSelf: 'flex-start', font: "500 13px/1 'Inter',sans-serif", color: 'var(--amber-p)', paddingTop: 4 }}>Open the module →</Link>
        </div>
        <ScreenCard s={s.screen} />
      </div>
    </div>
  );
}
