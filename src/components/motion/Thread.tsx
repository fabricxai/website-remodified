'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/lang';

const X0 = 26;      // gutter x
const AMP = 9;      // weave amplitude
const KNOT = 13;    // knot loop size

/**
 * The thread: one amber SVG path running the full page height, weaving down the
 * left gutter and knotting at every `[data-knot]` element (section eyebrows).
 * Drawn with stroke-dashoffset from scroll progress — rAF, transform-free, no
 * React re-render per frame. Fully drawn under prefers-reduced-motion. Hidden ≤1000px.
 */
export default function Thread() {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const pathname = usePathname();
  const { reduced } = useLang();

  useEffect(() => {
    const s = svg.current, p = path.current;
    if (!s || !p) return;
    let len = 0, raf = 0, measureT: ReturnType<typeof setTimeout> | null = null;

    const measure = () => {
      const host = s.parentElement as HTMLElement;
      // Layout height only — scrollHeight would include this SVG's own box and feed back on itself.
      const H = host.offsetHeight;
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const knots = Array.from(document.querySelectorAll<HTMLElement>('[data-knot]'))
        .map((el) => el.getBoundingClientRect().top + window.scrollY - hostTop + el.offsetHeight / 2)
        .filter((y) => y > 0 && y < H)
        .sort((a, b) => a - b);
      let d = `M ${X0} 0`;
      let prev = 0;
      const seg = (y: number) => {
        const h = y - prev;
        d += ` C ${X0 + AMP} ${prev + h * 0.33}, ${X0 - AMP} ${prev + h * 0.66}, ${X0} ${y}`;
        prev = y;
      };
      knots.forEach((y) => {
        seg(y);
        d += ` c ${KNOT} ${-KNOT * 0.9}, ${KNOT} ${KNOT * 0.9}, 0 0`; // the knot
      });
      seg(H);
      s.setAttribute('height', String(H));
      s.setAttribute('viewBox', `0 0 60 ${H}`);
      p.setAttribute('d', d);
      len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      tick();
    };

    const tick = () => {
      raf = 0;
      if (!len) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const prog = reduced ? 1 : Math.min(1, (window.scrollY / max) * 1.12 + 0.06);
      p.style.strokeDashoffset = `${len * (1 - prog)}`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onResize = () => { if (measureT) clearTimeout(measureT); measureT = setTimeout(measure, 120); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(s.parentElement as HTMLElement);
    measure();
    const t1 = setTimeout(measure, 400);     // after fonts / canvas settle
    const t2 = setTimeout(measure, 1600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1); clearTimeout(t2);
      if (measureT) clearTimeout(measureT);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname, reduced]);

  return (
    <svg ref={svg} className="thread" width="60" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.7, overflow: 'hidden', maxHeight: '100%' }}>
      <path ref={path} fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
