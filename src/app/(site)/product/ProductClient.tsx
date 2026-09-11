'use client';

import Link from 'next/link';
import { T } from '@/lib/data';
import { MODULES } from '@/lib/modules';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, SectionHead, Wrap, btnPrimary } from '@/components/ui';
import StationRail from '@/components/StationRail';
import { MonoNumber } from '@/components/motion/MonoNumber';
import { chip } from '@/components/ScreenCard';

const MONO = "'JetBrains Mono',monospace";

/** A screen-shaped SVG/CSS composition per module — the design system, not a screenshot. */
function MiniScreen({ m }: { m: (typeof MODULES)[number] }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', boxShadow: 'var(--sh1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: 'var(--chrome)', color: 'var(--on-chrome)', font: `500 9px/1 ${MONO}`, letterSpacing: '.05em' }}>
        <div style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--amber)' }} />{m.screen.crumb}
      </div>
      <div style={{ padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ font: "600 11.5px/1.2 'Archivo',sans-serif" }}>{m.screen.title}</div>
        {m.screen.rows.slice(0, 3).map((r) => {
          const [c, k] = r[2].split('|');
          return (
            <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr .8fr', gap: 8, borderTop: '1px solid var(--line)', paddingTop: 5, font: `400 9.5px/1.3 ${MONO}`, color: 'var(--t2)' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: "'Inter',sans-serif" }}>{r[0]}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r[1]}</span>
              <MonoNumber value={c} style={{ ...chip(k), font: `500 9.5px/1.3 ${MONO}`, textAlign: 'right' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductClient() {
  const { bn, t } = useLang();
  const { h1Style, h2Style, leadStyle, bodySmWide } = useTypo();

  return (
    <div>
      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(56px,7vw,96px)', display: 'flex', flexDirection: 'column', gap: 'clamp(36px,5vw,64px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '58ch' }}>
            <Eyebrow>{bn ? 'প্রোডাক্ট · অর্ডারের যাত্রা' : 'Product · the order journey'}</Eyebrow>
            <h1 style={h1Style}>{bn ? 'এক অর্ডার, নয়টি স্টেশন, এগারোটি মডিউল।' : 'One order, nine stations, eleven modules.'}</h1>
            <p style={leadStyle}>{bn ? 'যেকোনো স্টেশনে ক্লিক করুন — স্ক্রিনটি দেখুন, তারপর যে মডিউল এটি চালায় সেটি খুলুন। সব মডিউল একটাই ডেটাবেসে।' : 'Click any station to see its screen, then open the module it runs on. Every module shares one database, so the number on the owner’s phone is the number on the cutting floor.'}</p>
          </div>
          <StationRail />
        </Wrap>
      </section>

      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,110px)', display: 'flex', flexDirection: 'column', gap: 'clamp(30px,4vw,48px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <SectionHead eyebrow={t(T.deptEyebrow)} title={t(T.deptTitle)} titleStyle={h2Style} max="46ch" />
            <p style={bodySmWide}>Every department has its own screens, its own people, three capabilities, one MARBIM moment and one safeguard. Open any of them.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 18 }}>
            {MODULES.map((m, i) => (
              <Link key={m.slug} href={`/product/${m.slug}`} className="hov-sunken" style={{ color: 'inherit', background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, transition: 'background 180ms ease' }}>
                <MiniScreen m={m} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <div style={{ font: `500 11px/1 ${MONO}`, color: 'var(--line3)' }}>{String(i + 1).padStart(2, '0')}</div>
                    <div style={{ font: "600 16px/1.2 'Archivo',sans-serif", letterSpacing: '-.012em' }}>{bn ? m.name[1] : m.name[0]}</div>
                  </div>
                  <div style={{ font: "400 13px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{m.claim}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: "500 12px/1 'Inter',sans-serif", color: 'var(--amber-p)', paddingTop: 6 }}>{bn ? 'বিস্তারিত' : 'Open the module'} →</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingTop: 8 }}>
            <div style={{ font: "500 15px/1.5 'Inter',sans-serif", color: 'var(--amber-p)' }}>{t(T.proof)}</div>
            <Link href="/demo" className="hov-amber" style={{ ...btnPrimary, marginLeft: 'auto' }}>{t(T.ctaFloor)}</Link>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
