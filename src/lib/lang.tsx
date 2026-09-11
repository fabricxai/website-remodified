'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import type { Lang, Pair } from './data';

interface LangCtx {
  lang: Lang;
  bn: boolean;
  setLang: (l: Lang) => void;
  t: (pair: Pair) => string;
  fam: string;      // display family (Archivo / Anek Bangla)
  bodyFam: string;  // body family (Inter / Anek Bangla)
  reduced: boolean; // prefers-reduced-motion
}

const Ctx = createContext<LangCtx | null>(null);

const COOKIE = 'fx_lang';
const STORAGE_KEY = 'fabricxai.lang';

function readCookie(): Lang | null {
  const m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=(bn|en)'));
  return m ? (m[1] as Lang) : null;
}

/** Language + motion preferences. Language persists via cookie (and localStorage as a fallback); route paths never change. */
export function LangProvider({ children, initial = 'en' }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    try {
      const saved = readCookie() || window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'bn' || saved === 'en') setLangState(saved);
    } catch { /* ignore */ }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      document.cookie = `${COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch { /* ignore */ }
  }, []);

  const value = useMemo<LangCtx>(() => {
    const bn = lang === 'bn';
    return {
      lang, bn, setLang, reduced,
      t: (pair) => pair[bn ? 1 : 0],
      fam: bn ? "'Anek Bangla','Archivo',sans-serif" : "'Archivo',sans-serif",
      bodyFam: bn ? "'Anek Bangla','Inter',sans-serif" : "'Inter',sans-serif",
    };
  }, [lang, setLang, reduced]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang must be used inside LangProvider');
  return v;
}

/** Typography styles that depend on the active language (ported from renderVals). */
export function useTypo() {
  const { fam, bodyFam } = useLang();
  return useMemo(() => ({
    h1Style: { font: '700 clamp(40px,5.4vw,74px)/1.02 ' + fam, letterSpacing: '-.032em', margin: 0, textWrap: 'balance' } as CSSProperties,
    h2Style: { font: '700 clamp(28px,3.4vw,46px)/1.06 ' + fam, letterSpacing: '-.026em', margin: 0 } as CSSProperties,
    leadStyle: { font: '400 clamp(17px,1.45vw,21px)/1.55 ' + bodyFam, color: 'var(--t2)', margin: 0, maxWidth: '46ch', textWrap: 'pretty' } as CSSProperties,
    h3Style: { font: '600 clamp(24px,2.6vw,34px)/1.12 ' + fam, letterSpacing: '-.022em', margin: 0, maxWidth: '20ch', textWrap: 'balance' } as CSSProperties,
    h2DarkStyle: { font: '700 clamp(28px,3.4vw,46px)/1.06 ' + fam, letterSpacing: '-.026em', margin: 0, color: '#F4F3F0', maxWidth: '18ch' } as CSSProperties,
    h2Center: { font: '700 clamp(28px,3.4vw,46px)/1.06 ' + fam, letterSpacing: '-.026em', margin: 0, textAlign: 'center', maxWidth: '20ch' } as CSSProperties,
    leadCenter: { font: '400 clamp(16px,1.4vw,20px)/1.55 ' + bodyFam, color: 'var(--t2)', margin: 0, textAlign: 'center', maxWidth: '54ch', textWrap: 'pretty' } as CSSProperties,
    bodyStyle: { font: '400 clamp(15px,1.3vw,17px)/1.65 ' + bodyFam, color: 'var(--t2)', margin: 0, maxWidth: '44ch', textWrap: 'pretty' } as CSSProperties,
    bodySmStyle: { font: '400 14px/1.6 ' + bodyFam, color: 'var(--t2)', margin: 0, maxWidth: '44ch', textWrap: 'pretty' } as CSSProperties,
    bodySmWide: { font: '400 14px/1.6 ' + bodyFam, color: 'var(--t2)', margin: 0, maxWidth: '40ch', textWrap: 'pretty' } as CSSProperties,
  }), [fam, bodyFam]);
}
