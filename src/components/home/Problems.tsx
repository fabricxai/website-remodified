'use client';

import { EXC, GATES, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Wrap } from '@/components/ui';
import DocumentsAssemble from '@/components/motion/DocumentsAssemble';
import { MonoNumber } from '@/components/motion/MonoNumber';

const MONO = "'JetBrains Mono',monospace";

function Problem({ n, title, body, answer, answerBody }: { n: string; title: string; body: string; answer: string; answerBody: string }) {
  const { h3Style, bodyStyle, bodySmStyle } = useTypo();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
      <div style={{ font: `500 12px/1 ${MONO}`, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--dang)' }}>Problem {n}</div>
      <h3 style={h3Style}>{title}</h3>
      <p style={bodyStyle}>{body}</p>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingTop: 6 }}>
        <div style={{ width: 2, alignSelf: 'stretch', background: 'var(--amber)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ font: "600 16px/1.4 'Inter',sans-serif" }}>{answer}</div>
          <p style={bodySmStyle}>{answerBody}</p>
        </div>
      </div>
    </div>
  );
}

export default function Problems() {
  const { t } = useLang();
  const { h2Style } = useTypo();

  return (
    <section style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
      <Wrap style={{ paddingTop: 'clamp(72px,9vw,132px)', paddingBottom: 'clamp(72px,9vw,132px)', display: 'flex', flexDirection: 'column', gap: 'clamp(56px,7vw,104px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '44ch' }}>
          <Eyebrow h={13}>{t(T.problemsEyebrow)}</Eyebrow>
          <h2 style={h2Style}>{t(T.problemsTitle)}</h2>
        </div>

        {/* Problem 01 — the six artefacts, as a scroll sequence (the film's Scene 2 → 4b arc) */}
        <DocumentsAssemble>
          <Problem n="01" title="Your merchandiser types the same order six times."
            body="Buyer email, Excel costing, WhatsApp to the sample room, PI, store requisition, packing list. Six versions of one order, five chances to lose a digit — and no one number anyone trusts."
            answer="The answer: extraction, then confirmation."
            answerBody="MARBIM reads the tech pack, the PO and the challan and fills the fields once. Every value keeps a link to the line it came from, so a merchandiser confirms in seconds instead of retyping for an hour." />
        </DocumentsAssemble>

        {/* Problem 02 — gates */}
        <div data-r="two">
          <div style={{ perspective: 1500, minWidth: 0, order: 2 }}>
            <div className="hov-flat" style={{ transform: 'rotateY(9deg) rotateX(4deg)', transition: 'transform 420ms cubic-bezier(.2,.8,.2,1)' }}>
              <div style={{ animation: 'fx-bob 8.5s ease-in-out infinite', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {GATES.map(([code, name, body, stop]) => (
                  <div key={code} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, boxShadow: 'var(--sh2)', padding: 18, display: 'flex', flexDirection: 'column', gap: 12, clipPath: 'polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 0 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 22, height: 22, border: '1.5px solid var(--ink)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <div style={{ width: 12, height: 2, background: 'var(--amber)' }} />
                      </div>
                      <div style={{ font: `600 13px/1 ${MONO}`, letterSpacing: '.03em' }}>{code}</div>
                    </div>
                    <div style={{ font: "600 15px/1.25 'Inter',sans-serif" }}>{name}</div>
                    <div style={{ font: "400 12.5px/1.5 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{body}</div>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 7, paddingTop: 8, borderTop: '1px solid var(--line)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--dang)' }} />
                      <div style={{ font: `400 11px/1 ${MONO}`, color: 'var(--t3)' }}>{stop}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ order: 1, minWidth: 0 }}>
            <Problem n="02" title="The expensive mistakes all look small on the day."
              body="A quote sent under the floor margin. Fabric booked before the BTB opened. Bulk cut before the PP meeting. A B/L dated two days past the LC. None of them look like a crisis until the claim arrives."
              answer="The answer: four gates that do not open on their own."
              answerBody="Each gate is a hard stop tied to a named approver. MARBIM can prepare everything up to the gate — it can never pass one. Every release is stamped with who, when and on what evidence." />
          </div>
        </div>

        {/* Problem 03 — exceptions phone */}
        <div data-r="two">
          <Problem n="03" title="You hear about Monday's problem on Thursday."
            body="By the time the shortage, the machine breakdown and the slipped shipment reach the owner, the overtime is already booked and the air freight is already quoted."
            answer="The answer: an exceptions feed, not a dashboard."
            answerBody="One screen on your phone that only shows what broke its own rule — with the order, the amount and the person who can fix it. Nothing that is going fine ever appears on it." />
          <div style={{ display: 'flex', justifyContent: 'center', minWidth: 0, perspective: 1500 }}>
            <div className="hov-flat" style={{ transform: 'rotateY(-10deg) rotateX(3deg)', transition: 'transform 420ms cubic-bezier(.2,.8,.2,1)' }}>
              <div style={{ animation: 'fx-bob 9s ease-in-out infinite', width: 290, background: 'var(--ink)', borderRadius: 34, padding: 11, boxShadow: 'var(--sh3)' }}>
                <div style={{ background: '#0F131B', borderRadius: 25, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 520 }}>
                  <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: `500 11px/1 ${MONO}`, color: '#7C8497' }}>
                    <MonoNumber value="21:40" /><span>Fri</span>
                  </div>
                  <div style={{ padding: '8px 18px 14px', display: 'flex', flexDirection: 'column', gap: 4, borderBottom: '1px solid #252B3A' }}>
                    <div style={{ font: "600 19px/1.2 'Archivo',sans-serif", color: '#F4F3F0' }}>Exceptions</div>
                    <div style={{ font: `400 12px/1.4 ${MONO}`, color: '#7C8497' }}>4 open · 2 need you</div>
                  </div>
                  {EXC.map(([tag, dot, time, title, body, act]) => (
                    <div key={tag} style={{ padding: '14px 18px', borderBottom: '1px solid #252B3A', display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 999, background: dot, flexShrink: 0 }} />
                        <div style={{ font: `500 10px/1 ${MONO}`, letterSpacing: '.06em', textTransform: 'uppercase', color: '#7C8497' }}>{tag}</div>
                        <div style={{ marginLeft: 'auto', font: `400 10px/1 ${MONO}`, color: '#565E71' }}><MonoNumber value={time} /></div>
                      </div>
                      <div style={{ font: "500 14px/1.35 'Inter',sans-serif", color: '#F4F3F0', textWrap: 'pretty' }}>{title}</div>
                      <div style={{ font: "400 12px/1.45 'Inter',sans-serif", color: '#AEB5C4' }}>{body}</div>
                      {act && (
                        <div style={{ alignSelf: 'flex-start', marginTop: 2, background: 'var(--amber)', color: 'var(--on-amber)', borderRadius: 7, padding: '7px 12px', font: "600 12px/1 'Inter',sans-serif" }}>{act}</div>
                      )}
                    </div>
                  ))}
                  <div style={{ marginTop: 'auto', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 8, font: "400 11px/1.4 'Inter',sans-serif", color: '#565E71' }}>Nothing else needs you tonight.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
