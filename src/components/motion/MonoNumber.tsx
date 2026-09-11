'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLang } from '@/lib/lang';

const DUR = 400;

function fmt(n: number, digits: number, comma: boolean) {
  let s = String(Math.round(n)).padStart(digits, '0');
  if (comma) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return s;
}

/**
 * A mono-face number that counts up / decodes on first viewport entry — once,
 * 400ms, never loops. Non-digit characters (units, separators, times) are kept
 * in place; every digit run animates independently so "21:44", "0.96" and
 * "US$ 48,600" all work. Renders the final value on the server.
 */
export function MonoNumber({ value, style, className }: { value: string; style?: CSSProperties; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [txt, setTxt] = useState(value);
  const { reduced } = useLang();

  useEffect(() => {
    setTxt(value);
    const el = ref.current;
    if (!el || reduced || !/\d/.test(value)) return;
    let raf = 0, done = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done) return;
      done = true; io.disconnect();
      const parts = value.split(/(\d[\d,]*)/);
      const t0 = performance.now();
      const step = () => {
        const p = Math.min(1, (performance.now() - t0) / DUR);
        const k = 1 - Math.pow(1 - p, 3);
        setTxt(parts.map((s) => {
          if (!/^\d/.test(s)) return s;
          const comma = s.includes(',');
          const digits = s.replace(/,/g, '');
          return fmt(Number(digits) * k, digits.length, comma);
        }).join(''));
        if (p < 1) raf = requestAnimationFrame(step); else setTxt(value);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, reduced]);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>{txt}</span>;
}
