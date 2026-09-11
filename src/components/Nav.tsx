'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AMBER, NAV, T } from '@/lib/data';
import { useLang } from '@/lib/lang';
import { ThemeIcon, useTheme } from '@/lib/theme';
import { Logo, Wrap } from './ui';

export default function Nav() {
  const { bn, lang, setLang, t, bodyFam } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => { setMenu(false); }, [pathname]);

  const langBtn = (on: boolean): CSSProperties => ({
    background: on ? 'var(--ink)' : 'transparent', color: on ? 'var(--canvas)' : 'var(--t2)', border: 'none',
    padding: '0 12px', height: '100%', cursor: 'pointer', font: "600 12px/1 'Inter',sans-serif",
  });

  const go = (href: string) => { setMenu(false); router.push(href); window.scrollTo(0, 0); };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
      <Wrap style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <Link href="/" aria-label="FabricXai home" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Logo height={26} />
        </Link>
        <div data-r="navlinks">
          {NAV.map(([route, en, bnLabel]) => {
            const active = pathname === '/' + route || pathname.startsWith('/' + route + '/');
            return (
              <button key={route} onClick={() => go('/' + route)} style={{
                background: 'transparent', border: 'none', padding: '6px 0', cursor: 'pointer',
                font: '500 14px/1 ' + bodyFam,
                color: active ? 'var(--ink)' : 'var(--t2)',
                borderBottom: '2px solid ' + (active ? AMBER : 'transparent'),
              }}>{bn ? bnLabel : en}</button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line2)', borderRadius: 8, overflow: 'hidden', height: 34 }}>
            <button onClick={() => setLang('en')} style={langBtn(lang !== 'bn')}>EN</button>
            <button onClick={() => setLang('bn')} style={langBtn(bn)}>বাংলা</button>
          </div>
          <button className="theme-btn" onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title={dark ? 'Light theme' : 'Dark theme'} style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--line2)', borderRadius: 8, cursor: 'pointer', color: 'var(--ink)', transition: 'background 160ms ease' }}>
            <ThemeIcon dark={dark} />
          </button>
          <button data-r="navcta" className="hov-amber" onClick={() => go('/demo')} style={{ background: 'var(--amber)', color: 'var(--on-amber)', border: 'none', borderRadius: 8, padding: '0 18px', height: 38, font: '600 14px/1 ' + bodyFam, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {t(T.ctaFloor)}
          </button>
          <button data-r="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)} style={{ alignItems: 'center', justifyContent: 'center', width: 38, height: 38, background: 'transparent', border: '1px solid var(--line2)', borderRadius: 8, cursor: 'pointer', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: 16, height: 2, background: 'var(--ink)' }} />
            <div style={{ width: 16, height: 2, background: 'var(--ink)' }} />
            <div style={{ width: 16, height: 2, background: 'var(--ink)' }} />
          </button>
        </div>
      </Wrap>
      {menu && (
        <div style={{ borderTop: '1px solid var(--line)', background: 'var(--canvas)', padding: '10px 0 18px' }}>
          <Wrap style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV.map(([route, en, bnLabel]) => (
              <button key={route} onClick={() => go('/' + route)} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--line)', padding: '15px 0', textAlign: 'left', font: '500 16px/1 ' + bodyFam, color: 'var(--ink)', cursor: 'pointer' }}>
                {bn ? bnLabel : en}
              </button>
            ))}
            <button onClick={() => go('/walkthrough')} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--line)', padding: '15px 0', textAlign: 'left', font: '500 16px/1 ' + bodyFam, color: 'var(--t2)', cursor: 'pointer' }}>
              {bn ? 'ওয়াকথ্রু' : 'Walkthrough'}
            </button>
            <button onClick={() => go('/demo')} style={{ marginTop: 14, background: 'var(--amber)', color: 'var(--on-amber)', border: 'none', borderRadius: 8, height: 46, font: '600 15px/1 ' + bodyFam, cursor: 'pointer' }}>
              {t(T.ctaFloor)}
            </button>
          </Wrap>
        </div>
      )}
    </nav>
  );
}
