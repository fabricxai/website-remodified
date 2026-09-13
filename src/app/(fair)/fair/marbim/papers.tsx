import type { ReactNode, JSX } from 'react';
import type { Pair } from '@/lib/data';

export type DocKey = 'po' | 'lc' | 'tp' | 'challan';

/** `warn` rows carry the value Marbim is unsure of plus a note; the visitor confirms or edits them before approving. */
export interface Row { k: Pair; v: string; vbn?: string; warn?: boolean; note?: Pair; hint?: Pair }

export interface Doc {
  key: DocKey;
  tag: string;
  name: Pair;
  /** Marbim's line after reading it. */
  found: Pair;
  rows: Row[];
  /** Title of the draft entry and the rows it carries (indexes into rows). */
  draftTitle: Pair;
  draftRows: number[];
  /** The handwritten challan is shown blurred first, to make the reading obvious. */
  messy?: boolean;
}

/** All demo data is scripted — nothing here calls a model or a server. Numbers match the order used across the site (PO-2044). */
export const DOCS: Doc[] = [
  {
    key: 'po', tag: 'PO', name: ['Purchase order', 'পারচেজ অর্ডার'],
    found: ['Read. One order, four sizes, one ship date — here is what I found.', 'পড়ে ফেলেছি। এক অর্ডার, চার সাইজ, এক শিপ ডেট — যা পেলাম:'],
    rows: [
      { k: ['Buyer', 'বায়ার'], v: 'Nordic Apparel AB · Sweden' },
      { k: ['Style no', 'স্টাইল নং'], v: 'NA-2044 · men’s piqué polo' },
      { k: ['Order qty', 'অর্ডারের পরিমাণ'], v: '36,000 pcs' },
      { k: ['Size breakdown', 'সাইজ ব্রেকডাউন'], v: 'S 5,562 · M 16,578 · L 11,016 · XL 2,844' },
      { k: ['Unit price', 'ইউনিট প্রাইস'], v: '$4.78 FOB' },
      { k: ['Ship date', 'শিপ ডেট'], v: '12 Nov 2026 · Chattogram' },
    ],
    draftTitle: ['New order · PO-2044', 'নতুন অর্ডার · PO-2044'], draftRows: [0, 2, 5],
  },
  {
    key: 'lc', tag: 'LC', name: ['Letter of credit', 'এলসি (LC)'],
    found: ['Read. The bank’s conditions, in plain rows — and one date worth a second look.', 'পড়ে ফেলেছি। ব্যাংকের শর্তগুলো সহজ সারিতে — আর একটা তারিখ একটু দেখে নেওয়া দরকার।'],
    rows: [
      { k: ['LC no', 'এলসি নং'], v: '021/26 · irrevocable, at sight' },
      { k: ['Issuing bank', 'ইস্যুকারী ব্যাংক'], v: 'Skandia Trade Bank · Stockholm' },
      { k: ['Amount', 'পরিমাণ'], v: 'USD 172,080 · ±5%' },
      { k: ['Port', 'বন্দর'], v: 'Chattogram → Gothenburg' },
      { k: ['Expiry', 'মেয়াদ'], v: '25 Nov 2026 · Dhaka' },
      { k: ['Latest shipment', 'সর্বশেষ শিপমেন্ট'], v: '10 Nov 2026', warn: true, note: ['but your PO says 12 Nov', 'কিন্তু আপনার PO-তে ১২ নভেম্বর'], hint: ['Date after amendment', 'সংশোধনের পরের তারিখ'] },
    ],
    draftTitle: ['LC on file · 021/26', 'এলসি নথিভুক্ত · 021/26'], draftRows: [0, 2, 5],
  },
  {
    key: 'tp', tag: 'Tech pack', name: ['Tech pack', 'টেক প্যাক'],
    found: ['Read. One field is not on the paper — I left it empty rather than guess.', 'পড়ে ফেলেছি। একটা ঘর কাগজে নেই — আন্দাজ না করে খালি রেখেছি।'],
    rows: [
      { k: ['Style', 'স্টাইল'], v: 'Men’s piqué polo · SS27' },
      { k: ['Fabric', 'কাপড়'], v: '100% cotton piqué · 220 GSM' },
      { k: ['Colour', 'রং'], v: 'Navy · 19-3933 TCX' },
      { k: ['Sizes', 'সাইজ'], v: 'S · M · L · XL' },
      { k: ['Chest ½ (M)', 'বুক ½ (M)'], v: '52 cm · tolerance ±1 cm' },
      { k: ['Wash care', 'ওয়াশ কেয়ার'], v: '', warn: true, note: ['not on the paper — left empty', 'কাগজে নেই — খালি রাখলাম'], hint: ['e.g. Machine wash cold', 'যেমন: ঠান্ডা পানিতে মেশিন ওয়াশ'] },
    ],
    draftTitle: ['Style sheet · piqué polo', 'স্টাইল শিট · পিকে পোলো'], draftRows: [0, 1, 5],
  },
  {
    key: 'challan', tag: 'Challan', name: ['Handwritten challan', 'হাতে লেখা চালান'], messy: true,
    found: ['Read — even the handwriting. One number I am not sure of, so I flagged it for you.', 'পড়ে ফেলেছি — হাতের লেখাসহ। একটা সংখ্যায় নিশ্চিত নই, তাই আপনার জন্য দাগ দিয়ে রেখেছি।'],
    rows: [
      { k: ['Challan no', 'চালান নং'], v: '1187' },
      { k: ['From', 'প্রেরক'], v: 'Meghna Dyeing · Narayanganj' },
      { k: ['Date', 'তারিখ'], v: '03 Sep 2026' },
      { k: ['Item', 'মাল'], v: 'Navy piqué · 220 GSM' },
      { k: ['Weight', 'ওজন'], v: '1,038 kg' },
      { k: ['Rolls', 'রোল'], v: '42', vbn: '৪২', warn: true, note: ['handwriting unclear — 41 or 42?', 'হাতের লেখা অস্পষ্ট — ৪১ না ৪২?'], hint: ['Count the rolls', 'রোল গুনে লিখুন'] },
    ],
    draftTitle: ['Fabric received · challan 1187', 'কাপড় গ্রহণ · চালান ১১৮৭'], draftRows: [1, 5, 4],
  },
];

/* ---------- paper illustrations (inline SVG, no images) ---------- */

const INK = 'var(--ink)';
const LINE = 'var(--line2)';
const T3 = 'var(--line3)';
const AMB = 'var(--amber)';

/** A sheet with a folded corner and a selvage of amber ticks down the left edge (the weave motif). */
function Sheet({ children, torn = false }: { children: ReactNode; torn?: boolean }) {
  const outline = torn
    ? 'M10 4 H72 L84 16 V90 l-4 3 -5 -3 -5 3 -5 -3 -5 3 -5 -3 -5 3 -5 -3 -5 3 -5 -3 -5 3 -5 -3 -5 3 -5 -3 -4 3 Z'
    : 'M10 4 H72 L84 16 V96 H10 Z';
  return (
    <svg viewBox="0 0 92 100" aria-hidden>
      <path d={outline} fill="var(--surface)" stroke={LINE} strokeWidth="1.2" strokeLinejoin="round" />
      {!torn && <path d="M72 4 V16 H84" fill="var(--sunken)" stroke={LINE} strokeWidth="1.2" strokeLinejoin="round" />}
      <path d="M13 10 V92" stroke={AMB} strokeWidth="1.6" strokeDasharray="2.5 3" strokeLinecap="round" />
      {children}
    </svg>
  );
}

const Rule = ({ y, x1 = 22, x2 = 76, w = 1.4, c = T3 }: { y: number; x1?: number; x2?: number; w?: number; c?: string }) => <line x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth={w} strokeLinecap="round" />;

export function PaperPO() {
  return (
    <Sheet>
      <rect x="22" y="12" width="30" height="5" rx="1" fill={INK} />
      <rect x="60" y="12" width="16" height="5" rx="1" fill={AMB} />
      <Rule y={26} x2={60} /><Rule y={32} x2={50} />
      <g stroke={LINE} strokeWidth="1">
        <rect x="22" y="42" width="54" height="30" fill="none" />
        <line x1="22" y1="50" x2="76" y2="50" /><line x1="22" y1="58" x2="76" y2="58" /><line x1="22" y1="66" x2="76" y2="66" />
        <line x1="40" y1="42" x2="40" y2="72" /><line x1="60" y1="42" x2="60" y2="72" />
      </g>
      <g fill={T3}><rect x="25" y="52" width="10" height="2.4" rx="1" /><rect x="44" y="52" width="10" height="2.4" rx="1" /><rect x="64" y="52" width="8" height="2.4" rx="1" /><rect x="25" y="60" width="10" height="2.4" rx="1" /><rect x="44" y="60" width="8" height="2.4" rx="1" /><rect x="64" y="60" width="8" height="2.4" rx="1" /></g>
      <Rule y={82} x1={56} x2={76} c={INK} w={1.8} />
      <rect x="22" y="78" width="20" height="7" rx="1.5" fill="none" stroke={AMB} strokeWidth="1.4" />
    </Sheet>
  );
}

export function PaperLC() {
  return (
    <Sheet>
      <path d="M49 10 l8 3 v6 c0 5 -4 8 -8 10 c-4 -2 -8 -5 -8 -10 v-6 z" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <Rule y={36} x1={30} x2={68} c={INK} w={1.8} />
      <Rule y={44} /><Rule y={50} x2={70} /><Rule y={56} x2={74} /><Rule y={62} x2={62} /><Rule y={68} x2={72} />
      <circle cx="66" cy="84" r="8" fill="none" stroke={AMB} strokeWidth="1.6" strokeDasharray="2 2" />
      <circle cx="66" cy="84" r="3" fill={AMB} />
      <Rule y={86} x1={22} x2={48} c={INK} w={1.6} />
    </Sheet>
  );
}

export function PaperTP() {
  return (
    <Sheet>
      <rect x="22" y="11" width="26" height="5" rx="1" fill={INK} />
      <path d="M36 30 l8 -5 h4 c0 3 5 3 5 0 h4 l8 5 -3 7 -4 -2 v22 h-22 v-22 l-4 2 z" fill="none" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="38" y1="66" x2="60" y2="66" stroke={AMB} strokeWidth="1.4" />
      <path d="M38 63 v6 M60 63 v6" stroke={AMB} strokeWidth="1.4" />
      <line x1="70" y1="34" x2="70" y2="57" stroke={AMB} strokeWidth="1.4" />
      <path d="M67 34 h6 M67 57 h6" stroke={AMB} strokeWidth="1.4" />
      <Rule y={76} x2={66} /><Rule y={82} x2={56} /><Rule y={88} x2={70} />
    </Sheet>
  );
}

/** Scribbled lines, a slanted number, a tea-stain — the paper that comes in from the dyeing house. */
export function PaperChallan() {
  return (
    <Sheet torn>
      <circle cx="64" cy="70" r="11" fill={AMB} opacity=".16" />
      <path d="M22 16 c4 -4 8 2 12 -1 s7 -4 11 0 s8 3 13 -1 s5 2 9 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 30 c3 -3 6 2 9 0 s5 -4 8 -1 s6 3 10 -1" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M56 26 c2 -2 4 3 6 1 s4 -3 7 0 s5 4 7 1" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M23 42 c4 -2 7 3 11 1 s6 -3 10 0 s6 2 9 -1 s6 2 10 0 s6 -2 9 0" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23 52 c3 -3 6 1 9 0 s6 -3 9 0 s5 2 9 -1" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 50 c2 -3 4 1 6 -1 s4 -2 6 0 s4 3 6 0" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 62 c5 -3 9 3 14 0 s8 -3 12 0 s7 3 11 -1" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 76 c3 -4 6 2 9 0 s5 -4 8 0 s6 3 8 -1 s3 3 6 1" fill="none" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M50 74 l3 -3 l1 9 M58 71 c3 -1 4 3 1 5 c3 0 4 4 0 5 M64 71 c3 -1 4 3 1 5 c3 0 4 4 0 5 M72 72 l-2 8 M70 72 h5" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54 86 c6 -6 10 4 18 -2" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
    </Sheet>
  );
}

export const PAPER: Record<DocKey, () => JSX.Element> = { po: PaperPO, lc: PaperLC, tp: PaperTP, challan: PaperChallan };
