'use client';

import { useRef, useState } from 'react';
import { CHAPTERS, CHAPTER_CLIPS, WALK_PLAYLIST, YOUTUBE_ID, stampToSeconds, youtubeId } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Wrap } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";

export default function WalkthroughPage() {
  const { bn } = useLang();
  const { h1Style, h3Style, leadStyle } = useTypo();
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [openClip, setOpenClip] = useState<number | null>(null);
  const player = useRef<HTMLDivElement>(null);

  const watchUrl = `https://www.youtube.com/watch?v=${YOUTUBE_ID}&t=${start}s`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&start=${start}&rel=0&playsinline=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=en`;

  /** Play from the top, or seek to a chapter — always inside the page. */
  const play = (stamp = '0:00') => {
    setStart(stampToSeconds(stamp));
    setPlaying(true);
    setNonce((n) => n + 1);
    player.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
      <Wrap style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(64px,8vw,110px)', display: 'flex', flexDirection: 'column', gap: 'clamp(32px,4vw,52px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: '56ch' }}>
          <Eyebrow>{bn ? 'ওয়াকথ্রু · ২:৫৬' : 'Walkthrough · 2:56'}</Eyebrow>
          <h1 style={h1Style}>{bn ? 'পুরো সিস্টেম, তিন মিনিটে।' : 'The whole system, in three minutes.'}</h1>
          <p style={leadStyle}>{bn ? 'একটি অর্ডার — অনুসন্ধান থেকে পেমেন্ট পর্যন্ত, আসল স্ক্রিনে। চ্যাপ্টারগুলো আলাদা ক্লিপ হিসেবেও আছে, তাই এটাই আমাদের পাবলিক ম্যানুয়াল।' : 'One order from inquiry to payment, on the real screens. Every chapter is also cut as its own clip, which makes this the public manual as well as the pitch.'}</p>
        </div>
        <div data-r="two" style={{ alignItems: 'flex-start' }}>
          <div ref={player} style={{ minWidth: 0, gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: 10, scrollMarginTop: 90 }}>
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line2)', background: 'var(--sunken)' }}>
              {playing ? (
                <iframe
                  key={nonce}
                  src={embedUrl}
                  title="FabricXai — the 3-minute walkthrough"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: '#0F131B' }}
                />
              ) : (
                <button onClick={() => play()} aria-label="Play the walkthrough" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, padding: 0, background: 'transparent', cursor: 'pointer', display: 'block' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(24,29,41,.55) 0%, rgba(24,29,41,.12) 45%, transparent 70%)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh2)' }}>
                      <div style={{ width: 0, height: 0, borderLeft: '19px solid var(--on-amber)', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', marginLeft: 5 }} />
                    </div>
                    <div style={{ font: `500 12px/1.4 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: '#F4F3F0', textAlign: 'center' }}>{bn ? 'ওয়াকথ্রু চালান · ২:৫৬' : 'Play the walkthrough · 2:56'}</div>
                  </div>
                </button>
              )}
            </div>
            <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="hov-amberp" style={{ alignSelf: 'flex-end', font: `400 11px/1 ${MONO}`, color: 'var(--t3)' }}>Open on YouTube ↗</a>
          </div>
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--t3)', paddingBottom: 12 }}>Chapters</div>
            {CHAPTERS.map(([stamp, title, body]) => {
              const active = playing && stampToSeconds(stamp) === start;
              return (
                <div key={stamp} className="hov-row" onClick={() => play(stamp)} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '13px 8px 13px 0', borderBottom: '1px solid var(--line)', cursor: 'pointer', background: active ? 'var(--amber-s)' : undefined, borderLeft: '2px solid ' + (active ? 'var(--amber)' : 'transparent'), paddingLeft: 8, transition: 'all 180ms ease' }}>
                  <div style={{ font: `500 12.5px/1 ${MONO}`, color: 'var(--amber-p)', flexShrink: 0, width: 38 }}>{stamp}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ font: "500 14.5px/1.35 'Inter',sans-serif" }}>{title}</div>
                    <div style={{ font: "400 12.5px/1.45 'Inter',sans-serif", color: 'var(--t3)' }}>{body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <h2 style={h3Style}>Per-chapter clips — the public manual.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
              <div style={{ font: "400 13px/1.5 'Inter',sans-serif", color: 'var(--t3)', maxWidth: '40ch', textWrap: 'pretty', textAlign: 'right' }}>Each chapter is also cut as a standalone clip, so a new merchandiser can be sent one link instead of a training day.</div>
              <a href={WALK_PLAYLIST} target="_blank" rel="noopener noreferrer" className="hov-amberp" style={{ font: `400 11px/1 ${MONO}`, color: 'var(--t3)' }}>All clips on YouTube ↗</a>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(232px,1fr))', gap: 18 }}>
            {CHAPTERS.map(([stamp, title], i) => {
              const [link, clipTitle, clipLen] = CHAPTER_CLIPS[i] || ['', '', ''];
              const clipId = youtubeId(link);
              const open = openClip === i;
              return (
                <div key={stamp} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div
                    onClick={() => (clipId ? setOpenClip(open ? null : i) : play(stamp))}
                    style={{ aspectRatio: '16/9', borderRadius: 8, border: '1px solid ' + (open ? 'var(--amber)' : 'var(--line)'), backgroundColor: 'var(--sunken)', backgroundImage: open ? 'none' : 'repeating-linear-gradient(146deg, transparent 0 7px, var(--line) 7px 9px, transparent 9px 17px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 200ms ease' }}
                  >
                    {open ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${clipId}?autoplay=1&rel=0&playsinline=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=en`}
                        title={clipTitle}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: '#0F131B' }}
                      />
                    ) : (
                      <>
                        {clipId && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={`https://i.ytimg.com/vi/${clipId}/mqdefault.jpg`} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }} />
                        )}
                        <div style={{ width: 34, height: 34, borderRadius: 999, background: clipId ? 'var(--amber)' : 'var(--surface)', border: '1px solid ' + (clipId ? 'var(--amber-p)' : 'var(--line2)'), display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: clipId ? 'var(--sh2)' : 'none' }}>
                          <div style={{ width: 0, height: 0, borderLeft: '10px solid ' + (clipId ? 'var(--on-amber)' : 'var(--ink)'), borderTop: '6px solid transparent', borderBottom: '6px solid transparent', marginLeft: 3 }} />
                        </div>
                        <div style={{ position: 'absolute', right: 8, bottom: 8, background: 'rgba(24,29,41,.86)', color: '#F4F3F0', borderRadius: 4, padding: '4px 6px', font: `400 10px/1 ${MONO}` }}>{clipId ? clipLen : CHAPTERS[i][3]}</div>
                        {!clipId && (
                          <div style={{ position: 'absolute', left: 8, top: 8, border: '1px solid var(--amber-p)', color: 'var(--amber-p)', background: 'var(--amber-s)', borderRadius: 3, padding: '4px 6px', font: `600 9px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase' }}>Video coming</div>
                        )}
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ font: "500 14px/1.35 'Inter',sans-serif" }}>{title}</div>
                    <div style={{ font: `400 11px/1.4 ${MONO}`, color: 'var(--t3)' }}>{clipId ? clipTitle : `Plays ${stamp} of the walkthrough until the clip lands`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
