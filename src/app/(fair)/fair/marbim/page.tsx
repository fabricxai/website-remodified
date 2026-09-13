import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { FAIR } from '@/lib/data';
import { Logo, Mark, Slashes } from '@/components/ui';
import { LangToggle, MarbimShell } from './MarbimLang';
import Typewriter from './Typewriter';
import PaperDemo from './PaperDemo';
import './marbim.css';

export const metadata: Metadata = {
  title: { absolute: 'Meet Marbim — FabricXai' },
  description: 'Marbim, the garment language model, introduces itself. Hand it a PO, an LC, a tech pack or a handwritten challan and watch it read — then you approve. Innovation Fair 2026, stall 16.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/fair/marbim' },
  openGraph: { title: 'Meet Marbim — FabricXai', description: 'A new officer in your factory who reads every paper, in Bangla and English, and never gets tired. You approve.' },
};

/** Both languages are in the HTML; the shell's data-lang shows one (CSS only, no re-render). */
function Bi({ en, bn }: { en: ReactNode; bn: ReactNode }) {
  return <><span className="l-en">{en}</span><span className="l-bn" lang="bn">{bn}</span></>;
}

const INTRO_EN = 'Hello, I’m Marbim.\nThink of me as a new officer in your factory — one who has studied garments deeply, reads Bangla and English, and never gets tired.';
const INTRO_BN = 'আমি মারবিম।\nধরুন, আপনার ফ্যাক্টরিতে নতুন একজন অফিসার এসেছে — যে গার্মেন্টসের সবকিছু জানে, বাংলা-ইংরেজি দুটোই পড়ে, আর কখনো ক্লান্ত হয় না। আমি সে-ই।';

const CAPS: { icon: ReactNode; en: string; bn: string }[] = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 12c1-1.5 2 1.5 3 0s2 1.5 3 0" stroke="var(--amber)" /><path d="M9 16h6" /></svg>,
    en: 'Reads PO, LC, tech packs, challans, costing sheets — even handwriting', bn: 'PO, LC, টেক প্যাক, চালান, কস্টিং শিট পড়ি — হাতের লেখাও' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 9h18v6H3z" /><path d="M7 9v3M11 9v2M15 9v3M19 9v2" stroke="var(--amber)" /></svg>,
    en: 'Understands garments language: GSM, CM, lay plan, TNA', bn: 'গার্মেন্টসের ভাষা বুঝি: GSM, CM, লে প্ল্যান, TNA' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 18l4-11 4 11M5.5 14h5" /><path d="M14 6h6M17 6c-.5 4-2 7-4 9M15 9c1 2.5 3 4.5 5 6" stroke="var(--amber)" /></svg>,
    en: 'Works in Bangla, English, and the mix in between', bn: 'বাংলা, ইংরেজি আর দুটোর মিশেলেও কাজ করি' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2" stroke="var(--amber)" /><path d="M9 3h6" /></svg>,
    en: 'Prepares drafts in seconds, not hours', bn: 'ঘণ্টার কাজ সেকেন্ডে খসড়া করি' },
];

const NEVER_BI: [ReactNode, ReactNode][] = [
  [<><b>I never approve anything.</b> A named person in your factory does.</>, <><b>আমি কিছুই অনুমোদন করি না।</b> করেন আপনার ফ্যাক্টরির নামওয়ালা একজন মানুষ।</>],
  [<><b>I never invent a number.</b> If it is not on the paper, the box stays empty and I flag it.</>, <><b>আমি কোনো সংখ্যা বানাই না।</b> কাগজে না থাকলে ঘরটা খালি থাকে, আর আমি দাগ দিয়ে রাখি।</>],
  [<><b>I never message your buyer.</b> My drafts are for your people only.</>, <><b>আমি আপনার বায়ারকে মেসেজ করি না।</b> আমার খসড়া শুধু আপনার লোকের জন্য।</>],
  [<><b>I never carry what I learn in your factory to anyone else.</b></>, <><b>আপনার ফ্যাক্টরিতে যা শিখি, তা অন্য কারও কাছে নিয়ে যাই না।</b></>],
];

function Eyebrow({ en, bn }: { en: string; bn: string }) {
  return <div className="mb-eyebrow"><Slashes h={12} /><div className="mb-mono mb-mono-bi"><Bi en={en} bn={bn} /></div></div>;
}

export default function MeetMarbimPage() {
  return (
    <MarbimShell>
      <link rel="preload" href="/fonts/anek-bangla-bengali.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      {/* top strip: wordmark + persistent language switch (matches /fair) */}
      <div className="mb-top">
        <a href={FAIR.site} style={{ display: 'flex', alignItems: 'center' }} aria-label="FabricXai"><Logo height={22} /></a>
        <LangToggle />
      </div>

      <main>
        {/* 1 · Marbim introduces itself */}
        <section className="mb-hero">
          <div className="mb-col" style={{ paddingBlock: 'clamp(32px,7vw,56px)', display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Eyebrow en="Innovation Fair 2026 · Stall 16" bn="ইনোভেশন ফেয়ার ২০২৬ · স্টল ১৬" />
            <div className="mb-bubble">
              <div className="mb-avatar"><Mark style={{ width: 18 }} /></div>
              <div className="mb-bubble-body">
                <div className="mb-bubble-name"><Bi en="Marbim · garment language model" bn="মারবিম · গার্মেন্টস ল্যাঙ্গুয়েজ মডেল" /></div>
                <div className="mb-bubble-card big"><Typewriter en={INTRO_EN} bn={INTRO_BN} /></div>
              </div>
            </div>
            <div className="mb-hint"><span className="mb-hint-dash" /><Bi en="Scroll down and hand me a paper ↓" bn="নিচে নামুন, আমাকে একটা কাগজ দিন ↓" /></div>
          </div>
        </section>

        {/* 2 · Hand me a paper */}
        <section className="mb-sec" id="paper" style={{ scrollMarginTop: 60 }}>
          <div className="mb-col mb-stack">
            <Eyebrow en="Try it · 30 seconds" bn="চেষ্টা করুন · ৩০ সেকেন্ড" />
            <h1 className="mb-h1"><Bi en="Hand me a paper." bn="আমাকে একটা কাগজ দিন।" /></h1>
            <p className="mb-lead"><Bi en="Any of these four. I read it, you check it, you approve it — the same way it works on your floor." bn="এই চারটার যেকোনো একটা। আমি পড়ি, আপনি দেখেন, আপনি অনুমোদন করেন — আপনার ফ্লোরে ঠিক এভাবেই কাজ হয়।" /></p>
            <PaperDemo />
          </div>
        </section>

        {/* 3 · What I can do */}
        <section className="mb-sec mb-lazy">
          <div className="mb-col mb-stack">
            <Eyebrow en="What I can do" bn="আমি যা পারি" />
            <h2 className="mb-h2"><Bi en="Four things, plainly." bn="সোজা কথায়, চারটা কাজ।" /></h2>
            <div className="mb-caps">
              {CAPS.map((c) => (
                <div key={c.en} className="mb-cap">
                  <div className="ico">{c.icon}</div>
                  <div className="mb-strong"><Bi en={c.en} bn={c.bn} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · The promise */}
        <section className="mb-sec mb-lazy" style={{ background: 'var(--surface)' }}>
          <div className="mb-col mb-stack">
            <Eyebrow en="Honest limits" bn="সৎ সীমানা" />
            <h2 className="mb-h2"><Bi en="What I never do." bn="যা আমি কখনো করি না।" /></h2>
            <div className="mb-never">
              {NEVER_BI.map(([en, bn], i) => (
                <div key={i}><div className="dash" /><p className="mb-body"><Bi en={en} bn={bn} /></p></div>
              ))}
            </div>
            <div className="mb-bubble" style={{ paddingTop: 6 }}>
              <div className="mb-avatar"><Mark style={{ width: 16 }} /></div>
              <div className="mb-bubble-body">
                <div className="mb-bubble-name">Marbim</div>
                <div className="mb-bubble-card"><p className="mb-bubble-text"><Bi en="I am not a robot replacing your people. I’m the assistant who does the boring reading, so your people can do the thinking." bn="আমি আপনার মানুষের জায়গা নিতে আসিনি। একঘেয়ে কাগজ পড়ার কাজটা আমি করি — যাতে আপনার মানুষ ভাবার কাজটা করতে পারে।" /></p></div>
              </div>
            </div>
            <div className="mb-proofline"><Bi en="MARBIM proposes. Your people approve." bn="মারবিম প্রস্তাব করে। অনুমোদন দেয় আপনার লোক।" /></div>
          </div>
        </section>

        {/* 5 · Come and see */}
        <section className="mb-sec mb-lazy" style={{ borderBottom: 'none' }}>
          <div className="mb-col mb-stack">
            <Eyebrow en="Come and see the real thing" bn="আসল জিনিসটা দেখে যান" />
            <div className="mb-stall" role="note">
              <div className="num"><span className="s">Stall</span><span className="n">{FAIR.stall}</span></div>
              <div className="t">
                <div className="h"><Bi en="Visit stall 16" bn="স্টল ১৬-এ আসুন" /></div>
                <div className="b"><Bi en="Bring a paper from your own factory. I will read it live." bn="আপনার নিজের ফ্যাক্টরির একটা কাগজ নিয়ে আসুন। সামনেই পড়ে দেখাব।" /></div>
              </div>
            </div>
            <Link href="/demo" className="mb-btn"><Bi en="Book a demo" bn="ডেমো বুক করুন" /><span aria-hidden>→</span></Link>
            <Link href="/fair" className="mb-small" style={{ alignSelf: 'center', color: 'var(--t3)' }}><Bi en="← Back to the fair page" bn="← মেলার পাতায় ফিরুন" /></Link>
          </div>
        </section>
      </main>

      {/* bottom strip: the two sites (matches /fair) */}
      <div className="mb-foot">
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div className="row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Logo height={24} />
              <div className="mb-mono" style={{ font: "400 9.5px/1 'JetBrains Mono',monospace", letterSpacing: '.18em' }}>Garments Intelligent System</div>
            </div>
            <div style={{ font: "400 11px/1.5 'JetBrains Mono',monospace", color: 'var(--amber-p)', textAlign: 'right', maxWidth: '20ch' }}><Bi en="MARBIM proposes. Your people approve." bn="মারবিম প্রস্তাব করে। অনুমোদন দেয় আপনার লোক।" /></div>
          </div>
          <div className="links">
            <a href={FAIR.site} className="strong"><Bi en="Visit fabricxai.com" bn="fabricxai.com দেখুন" /> →</a>
            <span><Bi en="A product of" bn="একটি পণ্য —" /> <a href={FAIR.companySite} target="_blank" rel="noopener noreferrer" className="strong">{FAIR.company} ↗</a></span>
          </div>
        </div>
      </div>
    </MarbimShell>
  );
}
