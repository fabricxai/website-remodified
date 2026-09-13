'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMarbimLang } from './MarbimLang';

/** Split into grapheme clusters so Bangla conjuncts and vowel signs never paint half-formed. */
function graphemes(text: string, locale: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: new (l: string, o: { granularity: 'grapheme' }) => { segment: (s: string) => Iterable<{ segment: string }> } }).Segmenter;
  if (Seg) return Array.from(new Seg(locale, { granularity: 'grapheme' }).segment(text), (s) => s.segment);
  return Array.from(text);
}

/**
 * Marbim's intro, typed at ~30 ms per character with an amber cursor.
 * The full text sits underneath (invisible) so the bubble never changes height;
 * under prefers-reduced-motion the text appears at once.
 */
export default function Typewriter({ en, bn, speed = 30 }: { en: string; bn: string; speed?: number }) {
  const { lang, reduced } = useMarbimLang();
  const text = lang === 'bn' ? bn : en;
  const chars = useMemo(() => graphemes(text, lang), [text, lang]);
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setN(0); setDone(false);
    if (reduced) { setN(chars.length); setDone(true); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= chars.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [chars, reduced, speed]);

  return (
    <p className="mb-bubble-text" aria-label={text}>
      <span className="mb-type" aria-hidden>
        <span className="ghost">{text}</span>
        <span className="typed">
          {chars.slice(0, n).join('')}
          <span className="mb-cursor" style={done ? { animationDuration: '1.4s' } : { animation: 'none' }} />
        </span>
      </span>
    </p>
  );
}
