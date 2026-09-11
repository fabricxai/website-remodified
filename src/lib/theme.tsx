'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fabricxai.theme';
const COOKIE = 'fx_theme';

/**
 * Runs before first paint (inline in <head>) so a saved dark preference never
 * flashes light. Light is the default; the site is light-first by design.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}')||(document.cookie.match(/(?:^|; )${COOKIE}=(dark|light)/)||[])[1];if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

interface ThemeCtx { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void; dark: boolean }
const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  // Adopt whatever the init script already applied to <html>.
  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') setThemeState('dark');
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    const root = document.documentElement;
    if (t === 'dark') root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    try {
      localStorage.setItem(STORAGE_KEY, t);
      document.cookie = `${COOKIE}=${t}; path=/; max-age=31536000; samesite=lax`;
    } catch { /* ignore */ }
  }, []);

  const value = useMemo<ThemeCtx>(() => ({
    theme, dark: theme === 'dark', setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }), [theme, setTheme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTheme must be used inside ThemeProvider');
  return v;
}

/** Sun / moon glyphs — drawn here, no icon library. */
export function ThemeIcon({ dark, size = 15 }: { dark: boolean; size?: number }) {
  return dark ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
    </svg>
  );
}
