'use client';

import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { FAIR, NEVER, youtubeId } from '@/lib/data';
import { Logo, Mark, PlayTri, Slashes } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";
type Lang = 'bn' | 'en';

/** Bilingual copy for this page only — no site-wide provider, no extra JS. */
const C = {
  eyebrow: { en: FAIR.eyebrow, bn: 'ইনোভেশন ফেয়ার ২০২৬ · স্টল ১৬' },
  title: { en: 'You found the thread.', bn: 'সুতোটা পেয়ে গেছেন।' },
  sub: { en: 'One order, from buyer email to bank realisation, on one system — with MARBIM reading the paperwork on the way.', bn: 'এক অর্ডার, বায়ারের ইমেইল থেকে ব্যাংক রিয়ালাইজেশন, এক সিস্টেমে — পথের কাগজ পড়ছে মারবিম।' },
  talk: { en: 'Talk to us on WhatsApp', bn: 'হোয়াটসঅ্যাপে কথা বলুন' },
  book: { en: 'Book a demo at the fair', bn: 'মেলায় ডেমো বুক করুন' },
  film: { en: 'Watch the 58-second film', bn: '৫৮ সেকেন্ডের ফিল্ম দেখুন' },
  never: { en: 'What MARBIM never does', bn: 'মারবিম যা কখনো করে না' },
  save: { en: 'Save our contact', bn: 'কন্টাক্ট সেভ করুন' },
  name: { en: 'Your name', bn: 'আপনার নাম' },
  phone: { en: 'WhatsApp number', bn: 'হোয়াটসঅ্যাপ নম্বর' },
  factory: { en: 'Factory (optional)', bn: 'কারখানা (ঐচ্ছিক)' },
  send: { en: 'Book', bn: 'বুক করুন' },
  note: { en: 'The number is used for this conversation and nothing else.', bn: 'নম্বরটি শুধু এই কথোপকথনের জন্যই ব্যবহার হয়।' },
  booked: { en: 'Thank you — we will confirm a time on WhatsApp. See you at stall 16.', bn: 'ধন্যবাদ — হোয়াটসঅ্যাপে সময় নিশ্চিত করে জানাচ্ছি। স্টল ১৬-এ দেখা হবে।' },
  mailNote: { en: 'Your email app opened with the details — just press send.', bn: 'আপনার ইমেইল অ্যাপে বিস্তারিত খুলেছে — শুধু সেন্ড চাপুন।' },
  proof: { en: 'MARBIM proposes. Your people approve.', bn: 'মারবিম প্রস্তাব করে। অনুমোদন দেয় আপনার লোক।' },
  visit: { en: 'Visit fabricxai.com', bn: 'fabricxai.com দেখুন' },
  product: { en: 'A product of', bn: 'একটি পণ্য —' },
  descriptor: { en: 'Garments Intelligent System', bn: 'গার্মেন্টস ইন্টেলিজেন্ট সিস্টেম' },
};

const inputStyle: CSSProperties = { background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 6, padding: '13px 13px', font: "400 16px/1.2 'Inter',sans-serif", width: '100%' };

function vcard() {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', 'FN:FabricXai', `ORG:${FAIR.company}`, `EMAIL;TYPE=WORK:${FAIR.email}`, `URL:${FAIR.site}`];
  if (FAIR.whatsapp) lines.push(`TEL;TYPE=CELL:+${FAIR.whatsapp}`);
  lines.push('NOTE:Innovation Fair 2026 · Stall ' + FAIR.stall, 'END:VCARD');
  return 'data:text/vcard;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
}

export default function FairClient() {
  const [lang, setLang] = useState<Lang>('en');
  const [film, setFilm] = useState(false);
  const [filmMissing, setFilmMissing] = useState(false);
  const [book, setBook] = useState(false);
  const [sent, setSent] = useState<'no' | 'webhook' | 'mail'>('no');
  const [source, setSource] = useState('');
  const t = (k: keyof typeof C) => C[k][lang];
  const bodyFam = lang === 'bn' ? "'Anek Bangla','Inter',sans-serif" : "'Inter',sans-serif";
  const fam = lang === 'bn' ? "'Anek Bangla','Archivo',sans-serif" : "'Archivo',sans-serif";

  // ?s=16 on the printed QR tells us which piece was scanned; it travels with the lead.
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('s') || '';
    setSource(s);
    try { const saved = localStorage.getItem('fx_fair_lang'); if (saved === 'en' || saved === 'bn') setLang(saved); } catch { /* ignore */ }
  }, []);
  const pick = (l: Lang) => { setLang(l); try { localStorage.setItem('fx_fair_lang', l); } catch { /* ignore */ } };

  const ytId = youtubeId(FAIR.filmYoutube);
  const waMsg = useMemo(() => encodeURIComponent(lang === 'bn'
    ? `হ্যালো FabricXai — ইনোভেশন ফেয়ারের স্টল ${FAIR.stall}${source ? ' (' + source + ')' : ''} থেকে লিখছি। আমার কারখানা: `
    : `Hi FabricXai — I met you at Innovation Fair stall ${FAIR.stall}${source ? ' (' + source + ')' : ''}. My factory: `), [lang, source]);
  const waHref = FAIR.whatsapp ? `https://wa.me/${FAIR.whatsapp}?text=${waMsg}` : '';

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lead = { name: String(fd.get('name') || ''), phone: String(fd.get('phone') || ''), factory: String(fd.get('factory') || ''), source, lang, at: new Date().toISOString(), page: 'fair' };
    if (FAIR.leadWebhook) {
      try {
        await fetch(FAIR.leadWebhook, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(lead) });
        setSent('webhook'); return;
      } catch { /* fall through to mail */ }
    }
    const subject = encodeURIComponent(`Fair demo request · ${lead.name}`);
    const body = encodeURIComponent(`Name: ${lead.name}\nWhatsApp: ${lead.phone}\nFactory: ${lead.factory}\nStall: ${FAIR.stall}${source ? ' · ' + source : ''}\nLanguage: ${lang}`);
    window.location.href = `mailto:${FAIR.email}?subject=${subject}&body=${body}`;
    setSent('mail');
  };

  const btn = (kind: 'primary' | 'secondary'): CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', height: 56, borderRadius: 8, cursor: 'pointer',
    font: '600 15.5px/1 ' + bodyFam, textDecoration: 'none', color: kind === 'primary' ? 'var(--on-amber)' : 'var(--ink)',
    background: kind === 'primary' ? 'var(--amber)' : 'transparent', border: kind === 'primary' ? 'none' : '1px solid var(--line2)', boxShadow: kind === 'primary' ? 'var(--sh1)' : 'none',
  });
  const langBtn = (on: boolean): CSSProperties => ({ background: on ? 'var(--ink)' : 'transparent', color: on ? 'var(--canvas)' : 'var(--t2)', border: 'none', padding: '0 12px', height: '100%', cursor: 'pointer', font: "600 12px/1 'Inter',sans-serif" });

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--canvas)', color: 'var(--ink)', fontFamily: bodyFam }}>
      {/* top strip: wordmark + language */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
        <a href={FAIR.site} style={{ display: 'flex', alignItems: 'center' }} aria-label="FabricXai"><Logo height={22} /></a>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line2)', borderRadius: 8, overflow: 'hidden', height: 34 }}>
          <button onClick={() => pick('en')} style={langBtn(lang === 'en')}>EN</button>
          <button onClick={() => pick('bn')} style={langBtn(lang === 'bn')}>বাংলা</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: 'clamp(28px,6vw,64px) 20px' }}>
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Slashes />
              <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: lang === 'bn' ? 0 : '.11em', textTransform: 'uppercase', color: 'var(--t3)', fontFamily: lang === 'bn' ? bodyFam : undefined }}>{t('eyebrow')}</div>
            </div>
            {(FAIR.hall || FAIR.dates) && (
              <div style={{ font: `400 11.5px/1.5 ${MONO}`, color: 'var(--t3)', paddingLeft: 32 }}>{[FAIR.hall, FAIR.dates].filter(Boolean).join(' · ')}</div>
            )}
          </div>
          <h1 style={{ font: '700 clamp(38px,11vw,60px)/1.02 ' + fam, letterSpacing: lang === 'bn' ? 0 : '-.032em', margin: 0, textWrap: 'balance' }}>{t('title')}</h1>
          <p style={{ font: '400 clamp(16px,4.4vw,19px)/1.55 ' + bodyFam, color: 'var(--t2)', margin: 0, textWrap: 'pretty' }}>{t('sub')}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 6 }}>
            {/* 1 · talk / book */}
            {waHref ? (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="hov-amber" style={btn('primary')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 20l1.3-3.9A8 8 0 1 1 8.2 19L4 20z" /><path d="M9.5 9.5c.3 1.6 1.7 3 3.3 3.3l1.2-1.2 2 .8-.3 1.6c-3 .4-6.8-3.2-6.4-6.4l1.6-.3.8 2-1.2 1.2z" /></svg>
                {t('talk')}
              </a>
            ) : null}
            <button onClick={() => { setBook((b) => !b); setFilm(false); }} className={waHref ? 'hov-sec' : 'hov-amber'} style={btn(waHref ? 'secondary' : 'primary')}>{t('book')}</button>
            {book && (sent !== 'no' ? (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--ok)', borderRadius: 10, padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ font: `500 10px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ok)' }}>Booked · stall {FAIR.stall}</div>
                <div style={{ font: '400 14px/1.55 ' + bodyFam, color: 'var(--t2)', textWrap: 'pretty' }}>{sent === 'mail' ? t('mailNote') : t('booked')}</div>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, boxShadow: 'var(--sh2)', padding: 18, display: 'flex', flexDirection: 'column', gap: 10, clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                <label htmlFor="fair-name" style={{ font: '500 12.5px/1 ' + bodyFam }}>{t('name')}</label>
                <input id="fair-name" name="name" required autoComplete="name" placeholder="Rafiq Hasan" style={inputStyle} />
                <label htmlFor="fair-phone" style={{ font: '500 12.5px/1 ' + bodyFam }}>{t('phone')}</label>
                <input id="fair-phone" name="phone" required inputMode="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" style={{ ...inputStyle, font: `400 16px/1.2 ${MONO}` }} />
                <label htmlFor="fair-factory" style={{ font: '500 12.5px/1 ' + bodyFam }}>{t('factory')}</label>
                <input id="fair-factory" name="factory" autoComplete="organization" placeholder="Meghna Knitwear Ltd" style={inputStyle} />
                <button type="submit" className="hov-amber" style={{ ...btn('primary'), height: 50, marginTop: 4 }}>{t('send')}</button>
                <div style={{ font: '400 11.5px/1.5 ' + bodyFam, color: 'var(--t3)' }}>{t('note')}</div>
              </form>
            ))}

            {/* 2 · film */}
            <button onClick={() => { setFilm((f) => !f); setBook(false); }} className="hov-sec" style={btn('secondary')}><PlayTri size={9} color="var(--ink)" />{t('film')}</button>
            {film && (
              <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line2)', background: 'var(--sunken)' }}>
                {ytId ? (
                  <iframe src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=${lang}`} title="FabricXai — the 58-second film" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: '#0F131B' }} />
                ) : !filmMissing ? (
                  <video src={FAIR.filmSrc} controls muted playsInline preload="metadata" onError={() => setFilmMissing(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', background: '#0F131B' }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    <Mark style={{ width: 44 }} />
                    <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--t3)' }}>Film coming · 0:58</div>
                  </div>
                )}
              </div>
            )}

            {/* 3 · never — inline, stays on this screen */}
            <details className="fair-details" style={{ border: '1px solid var(--line2)', borderRadius: 8, background: 'transparent' }}>
              <summary style={{ ...btn('secondary'), border: 'none', height: 54 }}>{t('never')}</summary>
              <div style={{ padding: '4px 16px 16px', display: 'flex', flexDirection: 'column' }}>
                {NEVER.map(([h, b]) => (
                  <div key={h} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: '1px solid var(--line)', alignItems: 'flex-start' }}>
                    <div style={{ width: 10, height: 2, background: 'var(--dang)', marginTop: 10, flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ font: "600 14px/1.35 'Inter',sans-serif" }}>{h}</div>
                      <div style={{ font: "400 12.5px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{b}</div>
                    </div>
                  </div>
                ))}
                <a href={`${FAIR.site}/marbim#never`} className="hov-amberp" style={{ font: "500 13px/1 'Inter',sans-serif", color: 'var(--amber-p)', paddingTop: 12 }}>MARBIM in full →</a>
              </div>
            </details>

            {/* 4 · save contact */}
            <a href={vcard()} download="FabricXai.vcf" className="hov-amberp" style={{ alignSelf: 'center', font: `500 12px/1 ${MONO}`, color: 'var(--t3)', paddingTop: 8 }}>{t('save')} ↓</a>
          </div>
        </div>
      </div>

      {/* bottom strip: the two sites */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '34px 20px 38px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Logo height={24} />
              <div style={{ font: `400 9.5px/1 ${MONO}`, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--t3)' }}>{C.descriptor.en}</div>
            </div>
            <div style={{ font: `400 11px/1.5 ${MONO}`, color: 'var(--amber-p)', textAlign: 'right', maxWidth: '20ch' }}>{t('proof')}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', font: '400 12.5px/1.5 ' + bodyFam, color: 'var(--t2)' }}>
            <a href={FAIR.site} className="hov-amberp" style={{ color: 'var(--ink)', fontWeight: 600 }}>{t('visit')} →</a>
            <span>{t('product')} <a href={FAIR.companySite} target="_blank" rel="noopener noreferrer" className="hov-amberp" style={{ color: 'var(--ink)', fontWeight: 600 }}>{FAIR.company} ↗</a></span>
          </div>
        </div>
      </div>
    </main>
  );
}
