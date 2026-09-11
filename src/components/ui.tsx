import type { CSSProperties, ReactNode } from 'react';
import { MARK_STATIC } from '@/lib/data';

const MONO = "'JetBrains Mono',monospace";

/** Three amber slashes + mono uppercase label. Every eyebrow is a thread knot (`data-knot`). */
export function Eyebrow({ children, h = 14, color = 'var(--t3)', knot = true }: { children: ReactNode; h?: number; color?: string; knot?: boolean }) {
  return (
    <div data-knot={knot ? '' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Slashes h={h} />
      <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.11em', textTransform: 'uppercase', color }}>{children}</div>
    </div>
  );
}

export function Slashes({ h = 14, style }: { h?: number; style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', gap: 4, transform: 'skewX(-34deg)', ...style }}>
      <div style={{ width: 2, height: h, background: 'var(--amber)' }} />
      <div style={{ width: 2, height: h, background: 'var(--amber)' }} />
      <div style={{ width: 2, height: h, background: 'var(--amber)' }} />
    </div>
  );
}

/** Plain mono eyebrow without slashes. */
export function MonoLabel({ children, color = 'var(--t3)', tracking = '.11em', size = 11, knot = false }: { children: ReactNode; color?: string; tracking?: string; size?: number; knot?: boolean }) {
  return <div data-knot={knot ? '' : undefined} style={{ font: `500 ${size}px/1 ${MONO}`, letterSpacing: tracking, textTransform: 'uppercase', color }}>{children}</div>;
}

/** Section head: eyebrow / H2 / optional lead, in one column. */
export function SectionHead({ eyebrow, title, lead, titleStyle, leadStyle, max = '52ch', color, dark = false }: {
  eyebrow: ReactNode; title: ReactNode; lead?: ReactNode; titleStyle: CSSProperties; leadStyle?: CSSProperties; max?: string; color?: string; dark?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: max }}>
      <Eyebrow h={13} color={color ?? (dark ? '#7C8497' : 'var(--t3)')}>{eyebrow}</Eyebrow>
      <h2 style={titleStyle}>{title}</h2>
      {lead && <p style={leadStyle}>{lead}</p>}
    </div>
  );
}

/** The composed FabricXai "X" mark (4 paths). `ink` colour can be overridden for dark chrome. */
export function Mark({ style, ink = 'var(--ink)', amber = '#E1B334', label }: { style?: CSSProperties; ink?: string; amber?: string; label?: string }) {
  return (
    <svg viewBox="0 0 99 105" style={{ display: 'block', ...style }} aria-label={label} aria-hidden={label ? undefined : true}>
      {MARK_STATIC.map(([d, fill], i) => (
        <path key={i} d={d} fill={fill === 'amber' ? amber : ink} />
      ))}
    </svg>
  );
}

/** Wordmark; the light-on-dark variant is swapped in by CSS when the dark theme is active. */
export function Logo({ height, style }: { height: number | string; style?: CSSProperties }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-light" src="/fabricxai-logo.png" alt="FabricXai" style={{ height, width: 'auto', display: 'block', ...style }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-dark" src="/fabricxai-logo-dark.png" alt="FabricXai" style={{ height, width: 'auto', ...style }} />
    </>
  );
}

/** Wordmark + the descriptor line under it (the sub-brand level of the ladder). */
export function Lockup({ height = 22, descriptor, color = 'var(--t3)', align = 'flex-start' }: { height?: number; descriptor: string; color?: string; align?: 'flex-start' | 'center' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align, gap: 8 }}>
      <Logo height={height} />
      <div style={{ font: `400 9.5px/1 ${MONO}`, letterSpacing: '.18em', textTransform: 'uppercase', color }}>{descriptor}</div>
    </div>
  );
}

/** Page container: max-width 1320, side padding via data-r="wrap". */
export function Wrap({ children, style, dataR = 'wrap' }: { children: ReactNode; style?: CSSProperties; dataR?: string }) {
  return <div data-r={dataR} style={{ maxWidth: 1320, margin: '0 auto', ...style }}>{children}</div>;
}

/** Exactly one section per page may go full-ink dark. */
export function DarkCut({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <section data-dark style={{ background: 'var(--dark-bg)', color: '#F4F3F0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', ...style }}>{children}</section>;
}

/** Small play triangle used inside buttons. */
export function PlayTri({ size = 9, color = 'var(--on-amber)', ml = 0 }: { size?: number; color?: string; ml?: number }) {
  return <span style={{ width: 0, height: 0, borderLeft: `${size}px solid ${color}`, borderTop: `${size * 0.667}px solid transparent`, borderBottom: `${size * 0.667}px solid transparent`, display: 'block', marginLeft: ml }} />;
}

/** Primary / secondary buttons in the design system. */
export const btnPrimary: CSSProperties = { background: 'var(--amber)', color: 'var(--on-amber)', border: 'none', borderRadius: 8, padding: '0 22px', height: 50, font: "600 15px/1 'Inter',sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: 'var(--sh1)', textDecoration: 'none' };
export const btnSecondary: CSSProperties = { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line2)', borderRadius: 8, padding: '0 22px', height: 50, font: "600 15px/1 'Inter',sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' };
