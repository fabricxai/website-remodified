'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang, Pair } from '@/lib/data';

/** Shares the saved choice with /fair so a visitor who picked a language there keeps it here. */
const KEY = 'fx_fair_lang';

interface Ctx { lang: Lang; bn: boolean; setLang: (l: Lang) => void; t: (p: Pair) => string; reduced: boolean }
const C = createContext<Ctx>({ lang: 'bn', bn: true, setLang: () => {}, t: (p) => p[1], reduced: false });

/**
 * The page shell: holds the language (default বাংলা — fair visitors are local) and
 * stamps it as `data-lang` so the server-rendered copy toggles with CSS alone.
 * Only the typewriter and the demo read the context.
 */
export function MarbimShell({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s === 'en' || s === 'bn') setLangState(s); } catch { /* ignore */ }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  }, []);

  const value = useMemo<Ctx>(() => ({ lang, bn: lang === 'bn', setLang, reduced, t: (p) => p[lang === 'bn' ? 1 : 0] }), [lang, setLang, reduced]);

  return (
    <C.Provider value={value}>
      <div className="mb" data-lang={lang} lang={lang}>{children}</div>
    </C.Provider>
  );
}

export const useMarbimLang = () => useContext(C);

/** EN / বাংলা switch in the sticky top strip. */
export function LangToggle() {
  const { lang, setLang } = useMarbimLang();
  return (
    <div className="mb-toggle" role="group" aria-label="Language">
      <button type="button" onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
      <button type="button" onClick={() => setLang('bn')} aria-pressed={lang === 'bn'} className="bn" lang="bn">বাংলা</button>
    </div>
  );
}
