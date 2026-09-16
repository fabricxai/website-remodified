'use client';

import { useEffect, useState } from 'react';

/** Left-rail section nav: marks the section in view and remembers the last one clicked (as the HTML does). */
export default function RailNav({ sections, issueCount }: { sections: { id: string; label: string }[]; issueCount: number }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      }, { rootMargin: '-40% 0px -55% 0px' });
      document.querySelectorAll('main section').forEach((s) => io?.observe(s));
    }
    try {
      const last = localStorage.getItem('baraka-portal-last');
      if (last && document.getElementById(last) && !location.hash) document.getElementById(last)?.scrollIntoView();
    } catch { /* private mode */ }
    return () => io?.disconnect();
  }, []);

  const remember = (id: string) => { try { localStorage.setItem('baraka-portal-last', id); } catch { /* ignore */ } };

  return (
    <nav aria-label="Sections">
      {sections.map((s) => (
        <a key={s.id} href={'#' + s.id} className={active === s.id ? 'active' : undefined} aria-current={active === s.id ? 'true' : undefined} onClick={() => remember(s.id)}>
          {s.label}
          {s.id === 'issues' ? <span className="badge" aria-label={`${issueCount} open`}>{issueCount}</span> : null}
        </a>
      ))}
    </nav>
  );
}
