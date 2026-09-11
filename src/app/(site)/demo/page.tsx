'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { DEMO_POINTS, T } from '@/lib/data';
import { useLang, useTypo } from '@/lib/lang';
import { Eyebrow, Mark, Wrap } from '@/components/ui';

const MONO = "'JetBrains Mono',monospace";
const inputStyle: CSSProperties = { background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 6, padding: '12px 13px', font: "400 14px/1.2 'Inter',sans-serif", width: '100%' };
const monoInput: CSSProperties = { ...inputStyle, font: `400 14px/1.2 ${MONO}` };
const labelStyle: CSSProperties = { font: "500 12.5px/1 'Inter',sans-serif" };

export default function DemoPage() {
  const { bn, t, bodyFam } = useLang();
  const { h1Style, h3Style, leadStyle, bodyStyle } = useTypo();
  const [sent, setSent] = useState(false);
  const [ftype, setFtype] = useState<number | null>(null);

  const factoryTypes = bn ? ['ওভেন', 'নিট', 'কম্পোজিট'] : ['Woven', 'Knit', 'Composite'];

  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); window.scrollTo(0, 0); };

  return (
    <section style={{ background: 'var(--canvas)', borderBottom: '1px solid var(--line)' }}>
      <Wrap style={{ paddingTop: 'clamp(48px,6vw,84px)', paddingBottom: 'clamp(64px,8vw,110px)' }}>
        <div data-r="two" style={{ alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0, paddingTop: 'clamp(0px,2vw,26px)' }}>
            <Eyebrow>{bn ? 'ডেমো' : 'Request a demo'}</Eyebrow>
            <h1 style={h1Style}>{bn ? 'আপনার ফ্লোরে চলতে দেখুন।' : 'See it run your floor.'}</h1>
            <p style={leadStyle}>{bn ? 'ছয়টি ঘর পূরণ করুন। এক কর্মদিবসের মধ্যে হোয়াটসঅ্যাপে উত্তর দিই — ইমেইলের চেয়ে ওটাই দ্রুত।' : 'Six fields. We reply on WhatsApp within one working day — it beats email, and you know it.'}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 8 }}>
              {DEMO_POINTS.map((p) => (
                <div key={p[0]} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', padding: '13px 0', borderTop: '1px solid var(--line)' }}>
                  <div style={{ width: 10, height: 2, background: 'var(--amber)', marginTop: 10, flexShrink: 0 }} />
                  <div style={{ font: "400 14.5px/1.55 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>{bn ? p[1] : p[0]}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            {sent ? (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, boxShadow: 'var(--sh3)', padding: 'clamp(28px,3.4vw,44px)', display: 'flex', flexDirection: 'column', gap: 20, clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)' }}>
                <Mark style={{ width: 44, height: 'auto' }} />
                <h2 style={h3Style}>{bn ? 'পেয়েছি — হোয়াটসঅ্যাপে বার্তা পাঠাচ্ছি।' : 'Got it — we’ll message you on WhatsApp.'}</h2>
                <p style={bodyStyle}>{bn ? 'রবি থেকে বৃহস্পতি, এক কর্মদিবসের মধ্যে উত্তর দিই। কল চাইলে বার্তায় লিখে দিন, আমরা ফোন করব।' : 'We reply within one working day, Sunday to Thursday. If you would rather we call, say so in the message and we will ring instead.'}</p>
                <div style={{ background: 'var(--sunken)', borderRadius: 8, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ font: `500 11px/1 ${MONO}`, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--t3)' }}>What happens next</div>
                  <div style={{ font: "400 13.5px/1.6 'Inter',sans-serif", color: 'var(--t2)', textWrap: 'pretty' }}>A short WhatsApp message to confirm a time · a 20-minute call on your own order numbers · if it fits, a pilot on one line.</div>
                </div>
                <button onClick={() => setSent(false)} style={{ alignSelf: 'flex-start', background: 'transparent', border: '1px solid var(--line2)', borderRadius: 8, padding: '11px 18px', font: "600 13.5px/1 'Inter',sans-serif", cursor: 'pointer', color: 'var(--t2)' }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, boxShadow: 'var(--sh3)', padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 18, clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <label htmlFor="demo-name" style={labelStyle}>{bn ? 'আপনার নাম' : 'Your name'}</label>
                    <input id="demo-name" name="name" placeholder="Rafiq Hasan" style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <label htmlFor="demo-factory" style={labelStyle}>{bn ? 'কারখানার নাম' : 'Factory'}</label>
                    <input id="demo-factory" name="factory" placeholder="Meghna Knitwear Ltd" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <label htmlFor="demo-role" style={labelStyle}>{bn ? 'পদ' : 'Role'}</label>
                  <select id="demo-role" name="role" style={inputStyle}>
                    <option>Owner / Director</option>
                    <option>General Manager</option>
                    <option>Merchandising</option>
                    <option>Planning / PPC</option>
                    <option>Commercial</option>
                    <option>IT</option>
                    <option>Buying house</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={labelStyle}>{bn ? 'কারখানার ধরন' : 'Factory type'}</div>
                  <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                    {factoryTypes.map((l, i) => (
                      <div key={l} role="radio" aria-checked={ftype === i} onClick={() => setFtype(i)} style={{
                        border: '1px solid ' + (ftype === i ? 'var(--ink)' : 'var(--line2)'),
                        background: ftype === i ? 'var(--sunken)' : 'transparent',
                        borderRadius: 999, padding: '10px 18px', cursor: 'pointer',
                        font: '500 13.5px/1 ' + bodyFam, transition: 'all 160ms ease',
                      }}>{l}</div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <label htmlFor="demo-lines" style={labelStyle}>{bn ? 'লাইন সংখ্যা' : 'Sewing lines'}</label>
                    <input id="demo-lines" name="lines" placeholder="24" style={monoInput} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <label htmlFor="demo-whatsapp" style={labelStyle}>{bn ? 'হোয়াটসঅ্যাপ নম্বর' : 'WhatsApp number'}</label>
                    <input id="demo-whatsapp" name="whatsapp" placeholder="+880 1XXX-XXXXXX" style={monoInput} />
                  </div>
                </div>
                <div style={{ font: "400 12px/1.5 'Inter',sans-serif", color: 'var(--t3)', textWrap: 'pretty' }}>{bn ? 'আমরা প্রথমে হোয়াটসঅ্যাপে লিখি। নম্বরটি শুধু এই কথোপকথনের জন্যই ব্যবহার হয়।' : 'We message first on WhatsApp. The number is used for this conversation and nothing else.'}</div>
                <button type="submit" className="hov-amber" style={{ background: 'var(--amber)', color: 'var(--on-amber)', border: 'none', borderRadius: 8, height: 50, font: "600 15px/1 'Inter',sans-serif", cursor: 'pointer', marginTop: 4 }}>{t(T.ctaFloor)}</button>
              </form>
            )}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
