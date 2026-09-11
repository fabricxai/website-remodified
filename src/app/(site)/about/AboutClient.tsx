'use client';

import Link from 'next/link';
import { ABOUT_ARGUMENT, SITE, T, TEAM_ROLES } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Lockup, Mark, SectionHead, Wrap, btnPrimary, btnSecondary } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";

export default function AboutClient() {
  const { bn, t } = useLang();
  const { h1Style, h2Style, leadStyle, bodyStyle } = useTypo();

  return (
    <div>
      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
          <div data-r="two" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0 }}>
              <Eyebrow>{bn ? 'আমাদের কথা' : 'About'}</Eyebrow>
              <h1 style={h1Style}>{bn ? 'সুতো থেকে কাপড়।' : 'Threads into fabric.'}</h1>
              <p style={leadStyle}>{bn ? 'এগারোটি বিভাগ এগারো দিকে টানলে সেটা সুতো। এক সিস্টেমে চালালে সেটা কাপড় — এটাই পুরো থিসিস, আর আমাদের আগে মার্কটাই বলে দেয়।' : 'Eleven departments pulling in eleven directions is thread. Run them on one system and it becomes fabric — that is the whole thesis, and the mark says it before we do.'}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 6 }}>
                <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)' }}>The company</div>
                <div style={{ font: "400 15px/1.6 'Inter',sans-serif", color: 'var(--t2)', maxWidth: '46ch', textWrap: 'pretty' }}><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{SITE.company}</strong> is the company. <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{SITE.name}</strong> is the product: {SITE.category.toLowerCase()}, and MARBIM, the garment intelligence model inside it. Dhaka, Bangladesh.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'clamp(240px,28vw,360px)', borderRadius: 14, backgroundColor: 'var(--sunken)', backgroundImage: 'repeating-linear-gradient(146deg, transparent 0 8px, var(--line) 8px 10px, transparent 10px 19px)', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <Mark style={{ width: 'clamp(110px,12vw,160px)' }} />
                <Lockup height={22} descriptor={t(T.descriptor)} align="center" />
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)' }}>
          <div data-r="side">
            <SectionHead eyebrow="The founding argument" title="Why now, why here." titleStyle={{ ...h2Style, font: "700 clamp(22px,2.4vw,30px)/1.1 'Archivo',sans-serif" }} max="22ch" />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              {ABOUT_ARGUMENT.map(([t1, b], i) => (
                <div key={t1} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18, padding: '22px 0', borderTop: '1px solid var(--line2)', alignItems: 'start' }}>
                  <div style={{ font: `500 12px/1.5 ${MONO}`, color: 'var(--t3)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ font: "600 19px/1.3 'Archivo',sans-serif", letterSpacing: '-.014em' }}>{t1}</div>
                    <p style={{ ...bodyStyle, maxWidth: '62ch' }}>{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
        <Wrap style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 'clamp(56px,7vw,96px)', display: 'flex', flexDirection: 'column', gap: 'clamp(26px,3.4vw,40px)' }}>
          <SectionHead eyebrow="The team" title="The people on the floor for your first order." titleStyle={h2Style} leadStyle={bodyStyle}
            lead="Garments people who have retyped the order, engineers who built the system so nobody has to again, and an implementation team that stays in Bangla until the line runs without them." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18 }}>
            {TEAM_ROLES.map(([role, body]) => (
              <div key={role} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '22px 22px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ font: `600 11px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--amber-p)' }}>{role}</div>
                <div style={{ font: "400 13.5px/1.6 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{body}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18, paddingTop: 8 }}>
            {[['Dhaka', 'Where we are. Gazipur, Narayanganj and Chattogram are where the pilots run.'], ['hello@fabricxai.com', 'Email if you must. WhatsApp is faster, and we say so on the demo page.'], ['Build in public', 'What shipped this month, honestly — on the MARBIM roadmap, labelled SHIPPED, IN TRAINING and AHEAD.']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 0', borderTop: '1px solid var(--line2)' }}>
                <div style={{ font: `500 12.5px/1.4 ${MONO}` }}>{k}</div>
                <div style={{ font: "400 13px/1.55 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ font: "500 15px/1.5 'Inter',sans-serif", color: 'var(--amber-p)' }}>{t(T.proof)}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginLeft: 'auto' }}>
              <Link href="/demo" className="hov-amber" style={btnPrimary}>{t(T.ctaFloor)}</Link>
              <Link href="/marbim" className="hov-sec" style={btnSecondary}>MARBIM →</Link>
            </div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}
