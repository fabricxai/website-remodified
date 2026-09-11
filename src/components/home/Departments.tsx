'use client';

import Link from 'next/link';
import { MODULES } from '@/lib/modules';
import { BD, DEPTS, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Wrap } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";

export function Departments() {
  const { t, bn } = useLang();
  const { h2Style, bodySmWide } = useTypo();

  return (
    <section style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
      <Wrap style={{ paddingTop: 'clamp(72px,9vw,124px)', paddingBottom: 'clamp(72px,9vw,124px)', display: 'flex', flexDirection: 'column', gap: 'clamp(34px,4vw,52px)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '46ch' }}>
            <Eyebrow h={13}>{t(T.deptEyebrow)}</Eyebrow>
            <h2 style={h2Style}>{t(T.deptTitle)}</h2>
          </div>
          <p style={bodySmWide}>Every department has its own screens, its own people and one thing it stops doing by hand. They share one database, so the number on the owner&apos;s phone is the number on the cutting floor.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(268px,1fr))', gap: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          {DEPTS.map(([en, bnName, people, feature], i) => (
            <Link key={en} href={`/product/${MODULES[i].slug}`} className="hov-sunken" style={{ color: 'inherit', background: 'var(--surface)', boxShadow: '0 0 0 1px var(--line)', padding: '24px 22px 22px', display: 'flex', flexDirection: 'column', gap: 11, cursor: 'pointer', minHeight: 186, transition: 'background 180ms ease' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <div style={{ font: `500 11px/1 ${MONO}`, color: 'var(--line3)' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ font: "600 17px/1.2 'Archivo',sans-serif", letterSpacing: '-.012em' }}>{bn ? bnName : en}</div>
              </div>
              <div style={{ font: `400 12px/1.4 ${MONO}`, color: 'var(--t3)' }}>{people}</div>
              <div style={{ font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{feature}</div>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, font: "500 12px/1 'Inter',sans-serif", color: 'var(--amber-p)', paddingTop: 10 }}>{bn ? 'বিস্তারিত' : 'See the screens'} →</div>
            </Link>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function BuiltInBD() {
  const { t, bn } = useLang();
  const { h2Style } = useTypo();
  const badges = bn ? ['ওভেন', 'নিট', 'কম্পোজিট'] : ['Woven', 'Knit', 'Composite'];

  return (
    <section style={{ borderTop: '1px solid var(--line)', background: 'var(--canvas)' }}>
      <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,4vw,48px)' }}>
        <div data-r="two" style={{ alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Eyebrow h={13}>{t(T.bdEyebrow)}</Eyebrow>
            <h2 style={h2Style}>{t(T.bdTitle)}</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'flex-start' }}>
            {badges.map((b) => (
              <div key={b} style={{ border: '1px solid var(--line2)', borderRadius: 999, padding: '8px 15px', font: "500 12.5px/1 'Inter',sans-serif", color: 'var(--t2)' }}>{b}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(212px,1fr))', gap: 18 }}>
          {BD.map(([code, title, body]) => (
            <div key={code} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--amber-p)' }}>{code}</div>
              <div style={{ font: "600 15px/1.3 'Inter',sans-serif" }}>{title}</div>
              <div style={{ font: "400 13px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{body}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
