'use client';

import Link from 'next/link';
import { PRICING_FAQ, PRICING_TIERS, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, SectionHead, Wrap, btnPrimary, btnSecondary } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";

export default function PricingClient() {
  const { bn, t } = useLang();
  const { h1Style, h2Style, leadStyle, bodyStyle } = useTypo();

  return (
    <div>
      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(56px,7vw,96px)', display: 'flex', flexDirection: 'column', gap: 'clamp(36px,5vw,56px)' }}>
          <div style={{ maxWidth: '58ch', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Eyebrow>{bn ? 'মূল্য' : 'Pricing'}</Eyebrow>
            <h1 style={h1Style}>{bn ? 'একটি পাইলট প্রোগ্রাম। বানানো কোনো টিয়ার নয়।' : 'One pilot programme. No invented tiers.'}</h1>
            <p style={leadStyle}>{bn ? 'তিনটি নকল প্ল্যান ছাপাব না। একটি পাইলট আছে, আর একটি কথোপকথন। নিচে কাঠামোটা — সংখ্যা আপনার কারখানার লাইন আর মডিউল দেখে।' : 'We are not going to publish three fake plans. There is a pilot, and there is a conversation. The structure is below; the numbers depend on your lines and the modules you run.'}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
            {PRICING_TIERS.map(([k, title, kind, items], i) => {
              const marbim = i === 2;
              return (
                <div key={k} style={{ background: marbim ? 'var(--amber-s)' : 'var(--surface)', border: '1px solid ' + (marbim ? 'var(--amber-line)' : 'var(--line)'), borderRadius: 12, padding: '26px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: marbim ? 'none' : 'var(--sh2)', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ font: `600 11px/1 ${MONO}`, letterSpacing: '.12em', textTransform: 'uppercase', color: marbim ? 'var(--amber-p)' : 'var(--ink)' }}>{k}</div>
                    <div style={{ font: `400 10.5px/1 ${MONO}`, color: 'var(--t3)' }}>{kind}</div>
                  </div>
                  <div style={{ font: "600 19px/1.25 'Archivo',sans-serif", letterSpacing: '-.014em' }}>{title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {items.map((s) => (
                      <div key={s} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid ' + (marbim ? 'var(--amber-line)' : 'var(--line)'), alignItems: 'flex-start' }}>
                        <div style={{ width: 10, height: 2, background: marbim ? 'var(--amber-p)' : 'var(--amber)', marginTop: 9, flexShrink: 0 }} />
                        <div style={{ font: "400 13.5px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{s}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ font: `400 12.5px/1.6 ${MONO}`, color: 'var(--t3)', maxWidth: '52ch', textWrap: 'pretty' }}>Anything beyond one factory — a group, a buying house, a shared service centre — is a conversation, not a plan.</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginLeft: 'auto' }}>
              <Link href="/demo" className="hov-amber" style={btnPrimary}>{bn ? 'কথা বলুন' : 'Talk to us'}</Link>
              <Link href="/walkthrough" className="hov-sec" style={btnSecondary}>{t(T.ctaWatch)}</Link>
            </div>
          </div>
        </Wrap>
      </section>

      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
          <div data-r="side">
            <SectionHead eyebrow="FAQ" title="The five questions every owner asks." titleStyle={{ ...h2Style, font: "700 clamp(22px,2.4vw,30px)/1.1 'Archivo',sans-serif" }} max="24ch" />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              {PRICING_FAQ.map(([q, a]) => (
                <div key={q} data-r="faq" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.9fr) minmax(0,1.4fr)', gap: 20, padding: '18px 0', borderTop: '1px solid var(--line2)' }}>
                  <div style={{ font: "600 15px/1.4 'Inter',sans-serif" }}>{q}</div>
                  <p style={{ ...bodyStyle, maxWidth: '56ch' }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
