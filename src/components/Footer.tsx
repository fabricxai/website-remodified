'use client';

import Link from 'next/link';
import { SITE, T } from '@/lib/data';
import { useLang } from '@/lib/lang';
import { useTheme } from '@/lib/theme';
import { Lockup, Wrap } from './ui';

const MONO = "'JetBrains Mono',monospace";

export default function Footer() {
  const { bn, setLang, t } = useLang();
  const { dark, setTheme } = useTheme();

  const cols: { title: string; items: [string, string][] }[] = [
    { title: bn ? 'প্রোডাক্ট' : 'Product', items: [['Product', '/product'], ['MARBIM', '/marbim'], ['Technology', '/technology'], ['Walkthrough', '/walkthrough'], ['Pricing', '/pricing']] },
    { title: bn ? 'কোম্পানি' : 'Company', items: [['About', '/about'], [t(T.ctaFloor), '/demo'], ['Innovation Fair 2026', '/fair'], ['LinkedIn', ''], ['YouTube', '']] },
    { title: bn ? 'যোগাযোগ' : 'Contact', items: [[`WhatsApp ${SITE.whatsappDisplay}`, `https://wa.me/${SITE.whatsapp}`], ['hello@fabricxai.com', 'mailto:hello@fabricxai.com'], ['Dhaka, Bangladesh', '']] },
  ];

  const itemStyle = { font: "400 14px/1.5 'Inter',sans-serif", color: 'var(--t2)', cursor: 'pointer' } as const;

  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--canvas)' }}>
      <Wrap style={{ paddingTop: 56, paddingBottom: 44, display: 'flex', flexDirection: 'column', gap: 38 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Lockup height={22} descriptor={t(T.descriptor)} />
            <div style={{ font: "400 13px/1.6 'Inter',sans-serif", color: 'var(--t2)', maxWidth: '30ch', textWrap: 'pretty' }}>{SITE.category}. Built in Dhaka, for the floors it runs on.</div>
            <div style={{ font: `400 11.5px/1.5 ${MONO}`, color: 'var(--amber-p)' }}>{t(T.proof)}</div>
          </div>
          {cols.map((c) => (
            <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--t3)' }}>{c.title}</div>
              {c.items.map(([label, href]) => !href
                ? <div key={label} className="hov-amberp" style={itemStyle}>{label}</div>
                : href.startsWith('/')
                  ? <Link key={label} href={href} className="hov-amberp" style={itemStyle}>{label}</Link>
                  : <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hov-amberp" style={itemStyle}>{label}</a>)}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid var(--line)' }}>
          <div style={{ font: `400 12px/1.5 ${MONO}`, color: 'var(--t3)' }}>© 2026 {SITE.legal} · Dhaka, Bangladesh</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div onClick={() => setLang('en')} style={{ font: "400 12.5px/1 'Inter',sans-serif", color: bn ? 'var(--t3)' : 'var(--ink)', fontWeight: bn ? 400 : 600, cursor: 'pointer' }}>English</div>
            <div onClick={() => setLang('bn')} style={{ font: "400 12.5px/1 'Anek Bangla',sans-serif", color: bn ? 'var(--ink)' : 'var(--t3)', fontWeight: bn ? 600 : 400, cursor: 'pointer' }}>বাংলা</div>
            <div style={{ width: 1, height: 13, background: 'var(--line2)' }} />
            <div onClick={() => setTheme('light')} style={{ font: "400 12.5px/1 'Inter',sans-serif", color: dark ? 'var(--t3)' : 'var(--ink)', fontWeight: dark ? 400 : 600, cursor: 'pointer' }}>Light</div>
            <div onClick={() => setTheme('dark')} style={{ font: "400 12.5px/1 'Inter',sans-serif", color: dark ? 'var(--ink)' : 'var(--t3)', fontWeight: dark ? 600 : 400, cursor: 'pointer' }}>Dark</div>
            <div style={{ width: 1, height: 13, background: 'var(--line2)' }} />
            <div className="hov-amberp" style={{ font: "400 12.5px/1 'Inter',sans-serif", color: 'var(--t3)', cursor: 'pointer' }}>Privacy</div>
          </div>
        </div>
      </Wrap>
    </footer>
  );
}
