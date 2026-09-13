'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Pair } from '@/lib/data';
import { Mark } from '@/components/ui';
import { useMarbimLang } from './MarbimLang';
import { DOCS, PAPER, type Doc, type Row } from './papers';
import { RAW } from './rawpapers';

type Phase = 'pick' | 'scan' | 'found' | 'approve' | 'saved';
/** What the visitor did with a flagged row. */
type Fix = { kind: 'ok' } | { kind: 'edited'; value: string };

const SCAN_MS = 1500;
const ROW_MS = 170;

const S = {
  pick: ['Pick any one. I will read it in front of you.', 'যেকোনো একটা বেছে নিন। আপনার সামনেই পড়ে দেখাই।'] as Pair,
  tap: ['Tap to hand over', 'দিতে চাপুন'] as Pair,
  reading: ['Reading…', 'পড়ছি…'] as Pair,
  step1: ['Paper', 'কাগজ'] as Pair, step2: ['Marbim reads', 'মারবিম পড়ে'] as Pair, step3: ['You approve', 'আপনি অনুমোদন করেন'] as Pair,
  field: ['Field', 'ঘর'] as Pair, found: ['What I found', 'যা পেলাম'] as Pair,
  readIn: ['read in 1.5 s', '১.৫ সেকেন্ডে পড়া'] as Pair,
  paper: ['The paper I read', 'যে কাগজটা পড়লাম'] as Pair,
  hide: ['Hide', 'লুকান'] as Pair, show: ['Show', 'দেখুন'] as Pair,
  srcNote: ['Highlighted = where each value came from', 'হলুদ দাগ = কোন জায়গা থেকে কোন মান নিয়েছি'] as Pair,
  check: ['Please check this one', 'এটা একটু দেখুন'] as Pair,
  confirm: ['Correct as read', 'ঠিক আছে'] as Pair,
  edit: ['Edit', 'ঠিক করুন'] as Pair,
  save: ['Save', 'সেভ'] as Pair, cancel: ['Cancel', 'বাতিল'] as Pair,
  checked: ['Checked by you', 'আপনি দেখেছেন'] as Pair,
  corrected: ['Corrected by you', 'আপনি ঠিক করেছেন'] as Pair,
  empty: ['(empty)', '(খালি)'] as Pair,
  amber: ['I prepared this draft. But I never touch your books on my own. I prepare, you check, you approve. Always.', 'খসড়াটা আমি তৈরি করলাম। কিন্তু আপনার খাতায় আমি নিজে কিছুই লিখি না। আমি গুছিয়ে দিই, আপনি দেখেন, আপনি অনুমোদন করেন। সবসময়।'] as Pair,
  draft: ['Draft · not saved', 'খসড়া · সেভ হয়নি'] as Pair,
  savedHead: ['Saved · approved by a human', 'সেভ হয়েছে · একজন মানুষের অনুমোদনে'] as Pair,
  approve: ['You Approve', 'আপনি অনুমোদন করুন'] as Pair,
  firstCheck: ['Check the flagged row first ↑', 'আগে দাগ দেওয়া ঘরটা দেখুন ↑'] as Pair,
  nothing: ['Nothing is saved until you tap.', 'আপনি না চাপলে কিছুই সেভ হয় না।'] as Pair,
  saved: ['Entry saved — approved by a human.', 'এন্ট্রি সেভ হলো — অনুমোদন দিলেন একজন মানুষ।'] as Pair,
  audit: ['drafted by MARBIM · approved by you', 'খসড়া: মারবিম · অনুমোদন: আপনি'] as Pair,
  again: ['Try another paper', 'আরেকটা কাগজ দিন'] as Pair,
  scripted: ['This is a scripted demo on your phone. The real Marbim reads your own papers — bring one to stall 16.', 'এটা আপনার ফোনে একটা সাজানো ডেমো। আসল মারবিম আপনার নিজের কাগজ পড়ে — একটা নিয়ে স্টল ১৬-এ আসুন।'] as Pair,
};

function Bubble({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <div className="mb-bubble">
      <div className="mb-avatar"><Mark style={{ width: 16 }} /></div>
      <div className="mb-bubble-body">
        <div className="mb-bubble-name">Marbim</div>
        <div className="mb-bubble-card"><p className={'mb-bubble-text' + (small ? ' small' : '')}>{text}</p></div>
      </div>
    </div>
  );
}

function Steps({ phase }: { phase: Phase }) {
  const { t } = useMarbimLang();
  const i = phase === 'pick' ? 0 : phase === 'scan' || phase === 'found' ? 1 : 2;
  const done = phase === 'saved';
  const cls = (k: number) => 'mb-step' + (done || k < i ? ' done' : k === i ? ' on' : '');
  return (
    <div className="mb-steps" aria-hidden>
      <div className={cls(0)}><div className="bar" /><div className="lbl">1 · {t(S.step1)}</div></div>
      <div className={cls(1)}><div className="bar" /><div className="lbl">2 · {t(S.step2)}</div></div>
      <div className={cls(2)}><div className="bar" /><div className="lbl">3 · {t(S.step3)}</div></div>
    </div>
  );
}

/**
 * "Hand me a paper" — fully scripted, no network. pick → scan (1.5 s amber line
 * over the raw paper) → found (rows appear one by one; a flagged row must be
 * confirmed or edited) → approve (the amber button) → saved.
 */
export default function PaperDemo() {
  const { t, bn, reduced } = useMarbimLang();
  const [phase, setPhase] = useState<Phase>('pick');
  const [doc, setDoc] = useState<Doc | null>(null);
  const [showPaper, setShowPaper] = useState(true);
  const [fixes, setFixes] = useState<Record<number, Fix>>({});
  const [editing, setEditing] = useState<number | null>(null);
  const [draftText, setDraftText] = useState('');
  const [when, setWhen] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const flaggedRow = useRef<HTMLDivElement>(null);

  const later = useCallback((fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); }, []);
  const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  useEffect(() => clear, [clear]);
  const scrollTo = (el: HTMLElement | null, block: ScrollLogicalPosition = 'start') => el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block });

  const pick = (d: Doc) => {
    clear();
    setDoc(d); setFixes({}); setEditing(null); setShowPaper(true);
    setPhase('scan');
    later(() => scrollTo(stage.current), 30);
    const scan = reduced ? 0 : SCAN_MS;
    later(() => setPhase('found'), scan);
    later(() => setPhase('approve'), scan + (reduced ? 0 : d.rows.length * ROW_MS + 700));
  };
  const approve = () => {
    const d = new Date();
    setWhen(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    setPhase('saved');
  };
  const reset = () => { clear(); setPhase('pick'); setDoc(null); later(() => scrollTo(stage.current), 30); };

  const value = (r: Row, i: number) => {
    const f = fixes[i];
    if (f?.kind === 'edited') return f.value;
    return bn && r.vbn ? r.vbn : r.v;
  };
  const startEdit = (r: Row, i: number) => { setEditing(i); setDraftText(bn && r.vbn ? r.vbn : r.v); };
  const saveEdit = (r: Row, i: number) => {
    const v = draftText.trim();
    const original = bn && r.vbn ? r.vbn : r.v;
    setFixes((f) => ({ ...f, [i]: v && v !== original ? { kind: 'edited', value: v } : { kind: 'ok' } }));
    setEditing(null);
  };

  const Paper = doc ? PAPER[doc.key] : null;
  const Raw = doc ? RAW[doc.key] : null;
  const showRows = phase === 'found' || phase === 'approve' || phase === 'saved';
  const unresolved = doc ? doc.rows.some((r, i) => r.warn && !fixes[i]) : false;

  return (
    <div ref={stage} className="mb-stage">
      <Steps phase={phase} />

      {phase === 'pick' && (
        <>
          <Bubble text={t(S.pick)} />
          <div className="mb-docs">
            {DOCS.map((d) => {
              const P = PAPER[d.key];
              return (
                <button key={d.key} type="button" className="mb-doc" onClick={() => pick(d)} aria-label={t(d.name)}>
                  <div className="tag">{d.tag}</div>
                  <P />
                  <div className="name" lang={bn ? 'bn' : undefined}>{t(d.name)}</div>
                  <div className="tap">{t(S.tap)} →</div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {phase === 'scan' && doc && Raw && (
        <>
          <div className="mb-reading" role="status"><span className="dot" />{t(S.reading)}</div>
          <div className={'mb-scan' + (doc.messy ? ' messy' : '')}>
            <Raw />
            <div className="mb-scan-veil" />
            <div className="mb-scanline" />
          </div>
        </>
      )}

      {showRows && doc && Paper && Raw && (
        <>
          <div className={'mb-found' + (doc.messy ? ' messy' : '')}>
            <div className="thumb"><Paper /></div>
            <div className="meta">
              <div className="n">{t(doc.name)}</div>
              <div className="m">{doc.tag} · {t(S.readIn)}</div>
            </div>
          </div>

          {/* the raw paper, kept in view with every extracted value lit up */}
          <div className="mb-source">
            <button type="button" className="sh" onClick={() => setShowPaper((s) => !s)} aria-expanded={showPaper}>
              <span>{t(S.paper)}</span><span className="tg">{showPaper ? t(S.hide) : t(S.show)} {showPaper ? '▴' : '▾'}</span>
            </button>
            {showPaper && (
              <div className="sb">
                <div className={'mb-scan read' + (doc.messy ? ' messy' : '')}><Raw /></div>
                <div className="mb-small"><span className="swatch" /> {t(S.srcNote)}</div>
              </div>
            )}
          </div>

          <Bubble text={t(doc.found)} small />
          <div className="mb-table" role="table" aria-label={t(doc.name)}>
            <div className="head" role="row"><span>{t(S.field)}</span><span>{t(S.found)}</span></div>
            {doc.rows.map((r, i) => {
              const f = fixes[i];
              const open = r.warn && !f;
              return (
                <div key={r.k[0]} ref={r.warn ? flaggedRow : undefined} role="row" className={'mb-row' + (open ? ' warn' : '') + (f ? ' fixed' : '')} style={{ animationDelay: `${i * ROW_MS}ms` }}>
                  <div className="k" role="cell">{t(r.k)}</div>
                  <div className="v" role="cell">
                    {editing === i ? (
                      <div className="mb-edit">
                        <input value={draftText} onChange={(e) => setDraftText(e.target.value)} placeholder={r.hint ? t(r.hint) : ''} autoFocus aria-label={t(r.k)}
                          onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(r, i); if (e.key === 'Escape') setEditing(null); }} />
                        <div className="acts">
                          <button type="button" className="mb-mini primary" onClick={() => saveEdit(r, i)}>{t(S.save)}</button>
                          <button type="button" className="mb-mini" onClick={() => setEditing(null)}>{t(S.cancel)}</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {value(r, i) || <span className="dim">{t(S.empty)}</span>}
                        {!r.warn && <span className="ok" aria-hidden>✓</span>}
                        {open && (
                          <>
                            <span className="flag">△ {r.note ? t(r.note) : t(S.check)}</span>
                            <div className="acts">
                              <button type="button" className="mb-mini primary" onClick={() => setFixes((x) => ({ ...x, [i]: { kind: 'ok' } }))}>✓ {t(S.confirm)}</button>
                              <button type="button" className="mb-mini" onClick={() => startEdit(r, i)}>✎ {t(S.edit)}</button>
                            </div>
                          </>
                        )}
                        {f && (
                          <span className="done">{f.kind === 'edited' ? '✎ ' + t(S.corrected) : '✓ ' + t(S.checked)}
                            {phase !== 'saved' && <button type="button" className="lnk" onClick={() => startEdit(r, i)}>{t(S.edit)}</button>}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {(phase === 'approve' || phase === 'saved') && doc && (
        <>
          {phase === 'approve' && <Bubble text={t(S.amber)} small />}
          <div className={'mb-draft' + (phase === 'saved' ? ' saved' : '')}>
            <div className="dh"><span>{phase === 'saved' ? t(S.savedHead) : t(S.draft)}</span><span style={{ color: 'var(--t3)' }}>{doc.tag}</span></div>
            {phase === 'approve' ? (
              <>
                <div className="dt">{t(doc.draftTitle)}</div>
                {doc.draftRows.map((i) => {
                  const r = doc.rows[i]; const f = fixes[i];
                  return (
                    <div key={r.k[0]} className={'dr' + (r.warn && !f ? ' warn' : '')}>
                      <div className="k">{t(r.k)}</div>
                      <div className="v">{value(r, i) || <span className="dim">{t(S.empty)}</span>}{f?.kind === 'edited' && <span className="tagc">✎</span>}{r.warn && !f && <span className="tagw">△</span>}</div>
                    </div>
                  );
                })}
                <div className="df">
                  {unresolved ? (
                    <button type="button" className="mb-approve wait" onClick={() => scrollTo(flaggedRow.current, 'center')}>{t(S.firstCheck)}</button>
                  ) : (
                    <button type="button" className="mb-approve" onClick={approve}>
                      <svg className="hand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                      {t(S.approve)}
                    </button>
                  )}
                  <div className="mb-small" style={{ textAlign: 'center' }}>{t(S.nothing)}</div>
                </div>
              </>
            ) : (
              <div className="mb-savedbox" role="status">
                <svg className="mb-check" viewBox="0 0 72 72" aria-hidden>
                  <circle className="ring" cx="36" cy="36" r="33" />
                  <path className="tick" d="M22 37l9 9 19-20" />
                </svg>
                <div className="mb-stitch"><div /></div>
                <div className="mb-saved-text">{t(S.saved)}</div>
                <div className="mb-audit">{t(doc.draftTitle)} · {t(S.audit)} · {when} · audit 8f21c4</div>
              </div>
            )}
          </div>
          {phase === 'saved' && (
            <>
              <button type="button" className="mb-btn" onClick={reset}>{t(S.again)} ↺</button>
              <div className="mb-note">
                <div style={{ width: 10, height: 2, background: 'var(--amber)', marginTop: 10, flexShrink: 0 }} />
                <div className="mb-small">{t(S.scripted)}</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
