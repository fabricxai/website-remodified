export const AMBER = '#E1B334';
export const INK = '#181D29';

export type Lang = 'en' | 'bn';
export type Pair = [string, string];

// Eight stroke spines of the X mark, in the asset's 99x105 space. [x1,y1,x2,y2,isAmber]
export const SPINES: [number, number, number, number, number][] = [
  [21.8, 102.6, 59.8, 61.2, 1], [96.9, 21.4, 70.3, 49.8, 1],
  [77.1, 102.6, 54.8, 78.3, 0], [2.0, 21.4, 44.1, 66.7, 0],
  [91.9, 85.2, 53.1, 42.8, 0], [16.9, 3.9, 43.1, 32.0, 0],
  [5.5, 83.5, 26.8, 60.3, 1], [80.6, 2.2, 37.3, 48.8, 1],
];

export type Route = 'product' | 'marbim' | 'technology' | 'pricing' | 'about';
export const NAV: [Route, string, string][] = [
  ['product', 'Product', 'প্রোডাক্ট'], ['marbim', 'MARBIM', 'মারবিম'],
  ['technology', 'Technology', 'প্রযুক্তি'], ['pricing', 'Pricing', 'মূল্য'], ['about', 'About', 'আমাদের কথা'],
];

export const T: Record<string, Pair> = {
  ctaDemo: ['Request a demo', 'ডেমোর অনুরোধ করুন'],
  ctaFloor: ['See it run your floor', 'আপনার ফ্লোরে চলতে দেখুন'],
  proof: ['MARBIM proposes. Your people approve.', 'মারবিম প্রস্তাব করে। অনুমোদন দেয় আপনার লোক।'],
  descriptor: ['Garments Intelligent System', 'গার্মেন্টস ইন্টেলিজেন্ট সিস্টেম'],
  ctaWatch: ['Watch the 3-minute walkthrough', '৩ মিনিটের ওয়াকথ্রু দেখুন'],
  heroEyebrow: ['Garments Intelligent System · Built in Dhaka', 'গার্মেন্টস ইন্টেলিজেন্ট সিস্টেম · ঢাকায় তৈরি'],
  heroTitle: ['The operating system for garments.', 'গার্মেন্টসের অপারেটিং সিস্টেম।'],
  heroSub: ['From buyer email to bank realisation — one thread, with MARBIM, the garment intelligence model, reading every document on the way.', 'বায়ারের ইমেইল থেকে ব্যাংক রিয়ালাইজেশন — এক সুতো, আর পথের প্রতিটি কাগজ পড়ছে মারবিম, গার্মেন্টস ইন্টেলিজেন্স মডেল।'],
  heroMarkCaption: ['One order. One thread.', 'এক অর্ডার। এক সুতো।'],
  trustClaim: ['In implementation at a woven factory in Dhaka · merchandising data live since Aug 2026.', 'ঢাকার একটি ওভেন কারখানায় বাস্তবায়নাধীন · মার্চেন্ডাইজিং ডেটা চলছে আগস্ট ২০২৬ থেকে।'],
  journeyEyebrow: ['The order journey', 'অর্ডারের যাত্রা'],
  journeyTitle: ['One order, nine stations, one thread.', 'এক অর্ডার, নয়টি স্টেশন, এক সুতো।'],
  scrollHint: ['Scroll to move the order', 'স্ক্রল করুন — অর্ডার এগোবে'],
  problemsEyebrow: ['Three problems, three answers', 'তিন সমস্যা, তিন সমাধান'],
  problemsTitle: ['What actually costs you money.', 'আসলে টাকা যায় কোথায়।'],
  trustLoopEyebrow: ['The trust loop', 'বিশ্বাসের চক্র'],
  trustLoopTitle: ['Propose. Approve. Commit.', 'প্রস্তাব। অনুমোদন। কমিট।'],
  trustLoopLine: ['Nothing MARBIM writes enters your factory without a named person’s approval. Every step audited.', 'AI যা লেখে, মানুষের অনুমোদন ছাড়া তার কিছুই আপনার কারখানায় ঢোকে না। প্রতিটি ধাপ নিরীক্ষিত।'],
  deptEyebrow: ['Departments', 'বিভাগসমূহ'],
  deptTitle: ['Eleven departments, one database.', 'এগারো বিভাগ, একটাই ডেটাবেস।'],
  bdEyebrow: ['Built in Bangladesh', 'বাংলাদেশে তৈরি'],
  bdTitle: ['The parts no imported ERP gets right.', 'যেসব জায়গায় বিদেশি ইআরপি মেলে না।'],
  ownerEyebrow: ['The owner’s view', 'মালিকের দৃষ্টি'],
  ownerTitle: ['The system that runs the floor.', 'যে সিস্টেম ফ্লোর চালায়।'],
  ownerSub: ['The floor, at 9:44 on a Friday night. The night view is the same data as the floor screens, dimmed for the hour you actually look at it. Four numbers, then only what broke.', 'শুক্রবার রাত ৯:৪৪ — পুরো ফ্লোর হাতের মুঠোয়। রাতের ভিউ ফ্লোরের স্ক্রিনের একই ডেটা, যে সময়ে আপনি সত্যিই দেখেন সেই সময়ের জন্য ম্লান করা। চারটি সংখ্যা, তারপর শুধু যা ভেঙেছে।'],
  finalTitle: ['See it run your floor.', 'আপনার ফ্লোরে চলতে দেখুন।'],
  finalSub: ['Twenty minutes, your own order numbers, no slide deck. We reply on WhatsApp within one working day.', 'বিশ মিনিট, আপনার নিজের অর্ডারের হিসাব, কোনো স্লাইড নয়। এক কর্মদিবসের মধ্যে হোয়াটসঅ্যাপে উত্তর দিই।'],
  finalNote: ['Pilot programme · Dhaka · Gazipur · Narayanganj · Chattogram', 'পাইলট প্রোগ্রাম · ঢাকা · গাজীপুর · নারায়ণগঞ্জ · চট্টগ্রাম'],
};

export const FACTS: [string, Pair][] = [
  ['[42s]', ['buyer email → structured RFQ', 'বায়ার ইমেইল → স্ট্রাকচার্ড RFQ']],
  ['11', ['departments, one database', 'বিভাগ, একটাই ডেটাবেস']],
  ['4', ['gates the AI cannot open alone', 'গেট — AI একা খুলতে পারে না']],
];

export type ChipKind = 'ok' | 'warn' | 'dang' | 'n';
export interface Screen {
  crumb: string; status: string; dot: string; title: string; meta: string;
  c1: string; c2: string; c3: string;
  rows: [string, string, string][];
  foot: string; action: string;
}
export type BadgeKind = 'ai' | 'gate' | '';
export interface Station {
  short: string; dept: string; title: string; caption: string;
  badgeKind: BadgeKind; badgeLabel: string; badgeBody: string; screen: Screen;
}

const st = (
  short: string, dept: string, title: string, caption: string,
  badgeKind: BadgeKind, badgeLabel: string, badgeBody: string, screen: Screen,
): Station => ({ short, dept, title, caption, badgeKind, badgeLabel, badgeBody, screen });

export const STATIONS: Station[] = [
  st('Inquiry', 'Merchandising', 'The buyer email stops being retyping.',
    'A tech pack and a price request land in the shared inbox. MARBIM reads both and drafts a structured RFQ — style, quantity, fabric, delivery — with every field linked back to the line it came from.',
    'ai', 'MARBIM drafts', 'Extraction from PDF, XLSX and email body. A merchandiser confirms before anything is saved.',
    { crumb: 'MERCHANDISING / INQUIRIES', status: 'Draft', dot: '#E1B334', title: 'INQ-8841 · H&M piqué polo', meta: 'read 42s ago',
      c1: 'Extracted field', c2: 'Value', c3: 'Confidence',
      rows: [['Style / fabric', '220gsm piqué', '0.96|ok'], ['Quantity', '36,000 pcs', '0.99|ok'], ['Ship window', '12 Nov 2026', '0.88|ok'], ['Wash care', 'not found', '—|warn']],
      foot: 'Four fields extracted, one flagged for a human.', action: 'Review draft' }),
  st('Quote', 'Costing', 'Costing off your real rates, not a guess.',
    'The quote is built from the factory’s own CM minutes, yarn contracts and current overhead — so the margin on screen is the margin you actually earn. Below the floor rate, the costing gate holds it.',
    'gate', 'Costing gate', 'A quote under the approved floor margin cannot be sent until the owner releases it.',
    { crumb: 'COMMERCIAL / COSTING', status: 'Held', dot: '#B4741C', title: 'QT-3190 · FOB per piece', meta: 'rev 3',
      c1: 'Cost line', c2: 'Per pc', c3: 'Share',
      rows: [['Fabric · 1.42 kg', '$2.61', '54%|n'], ['CM · 18.4 min', '$0.94', '20%|n'], ['Trims & packing', '$0.51', '11%|n'], ['Margin', '$0.71', '14.6%|warn']],
      foot: 'Floor margin is 16%. Held for owner release.', action: 'Release quote' }),
  st('Order', 'Planning', 'The PO lands and the calendar writes itself.',
    'Confirmation turns into a time-and-action plan back-planned from the ship date: 47 milestones, each with an owner and a supplier dependency. Slip one and everything downstream re-dates in front of you.',
    'ai', 'MARBIM drafts', 'The TNA is proposed from this buyer’s history. Planning edits the dates, then commits.',
    { crumb: 'PLANNING / TNA', status: 'On plan', dot: '#2F7D5B', title: 'PO-2044 · 47 milestones', meta: 'ship 12 Nov',
      c1: 'Milestone', c2: 'Owner', c3: 'Date',
      rows: [['Fabric in-house', 'Store', '18 Sep|ok'], ['PP meeting', 'QA', '24 Sep|ok'], ['Bulk cut start', 'Cutting', '01 Oct|ok'], ['Ex-factory', 'Commercial', '05 Nov|n']],
      foot: 'Two suppliers are on the critical path.', action: 'Commit TNA' }),
  st('Materials', 'Store', 'Nothing gets booked without the money behind it.',
    'The BOM explodes into yarn, trims and accessories, matched to UD and bonded-warehouse quantities. Booking a supplier needs an open back-to-back LC — the system checks before the store does.',
    'gate', 'BTB block', 'No purchase order is issued against an LC that has not been opened and margin-checked.',
    { crumb: 'STORE / BOM', status: 'Blocked', dot: '#B23A32', title: 'BOM-2044 · 31 lines', meta: 'UD 10,084 kg',
      c1: 'Material', c2: 'Required', c3: 'Status',
      rows: [['Yarn 30s combed', '10,062 kg', 'Booked|ok'], ['Interlining', '3,600 m', 'Booked|ok'], ['Buttons 18L', '144,000', 'BTB open|dang'], ['Poly bags', '36,000', 'Local|n']],
      foot: 'BTB 004/26 not yet issued by the bank.', action: 'Open BTB' }),
  st('Cut', 'Cutting', 'Cut quantity locks against the order, not the marker.',
    'Marker efficiency, lay plan and ratio come off the approved size breakdown. Every bundle carries a card, so a shortage at sewing traces back to the lay it came from in seconds.',
    '', '', '',
    { crumb: 'CUTTING / LAY PLAN', status: 'Running', dot: '#2F7D5B', title: 'Lay 14 · 62 plies', meta: 'eff 87.4%',
      c1: 'Size', c2: 'Ratio', c3: 'Cut',
      rows: [['S', '1', '5,562|n'], ['M', '3', '16,578|n'], ['L', '3', '11,016|n'], ['XL', '1', '2,844|ok']],
      foot: 'Cut 36,000 of 36,000 · 0 over-cut.', action: 'Close lay' }),
  st('Sew', 'Sewing', 'Bulk cannot start before the PP meeting passes.',
    'Line loading, hourly output and WIP by operator — visible on the floor in Bangla. The PP gate is hard: no bulk sewing is recorded against a style whose pre-production meeting has not been signed off.',
    'gate', 'PP gate', 'Bulk output is refused until QA signs the pre-production meeting for this style.',
    { crumb: 'SEWING / LINE 4', status: 'Live', dot: '#2F7D5B', title: 'Hourly output · 36,000 pcs', meta: 'eff 71%',
      c1: 'Hour', c2: 'Target', c3: 'Actual',
      rows: [['09:00', '210', '198|warn'], ['10:00', '210', '214|ok'], ['11:00', '210', '221|ok'], ['12:00', '210', '186|dang']],
      foot: 'Hour 4 dropped — machine down 11 minutes.', action: 'Log downtime' }),
  st('QC', 'Quality', 'Every defect has a reason code and an owner.',
    'Inline AQL, 4-point fabric inspection and endline defect capture in one place. The pareto is live, so the top defect of the shift is on the supervisor’s screen before the shift ends.',
    '', '', '',
    { crumb: 'QUALITY / ENDLINE', status: 'Pass', dot: '#2F7D5B', title: 'AQL 2.5 · lot 8,400', meta: 'DHU 3.1',
      c1: 'Defect', c2: 'Reason code', c3: 'Count',
      rows: [['Broken stitch', 'SEW-04', '31|warn'], ['Uneven hem', 'SEW-11', '18|n'], ['Fabric hole', 'FAB-02', '6|n'], ['Oil stain', 'FIN-07', '4|n']],
      foot: 'Lot accepted. Top defect routed to Line 4.', action: 'Accept lot' }),
  st('Ship', 'Commercial', 'The document error is caught before the bank finds it.',
    'Carton pack list becomes the invoice, packing list and B/L draft. The system reads the draft B/L back against the LC terms — port, quantity, description, latest shipment date — and stops the mismatch.',
    'gate', 'B/L catch', 'A discrepancy between the draft B/L and the LC terms blocks document release.',
    { crumb: 'COMMERCIAL / DOCUMENTS', status: 'Discrepant', dot: '#B23A32', title: 'B/L draft vs LC 021/26', meta: '3 checks',
      c1: 'LC term', c2: 'Draft B/L', c3: 'Check',
      rows: [['Port of loading', 'Chattogram', 'Match|ok'], ['Quantity', '36,000 pcs', 'Match|ok'], ['Latest shipment', '10 Nov', 'Late 2d|dang'], ['Description', 'Knitted polo', 'Match|ok']],
      foot: 'Amendment drafted for the buyer’s bank.', action: 'Send amendment' }),
  st('Paid', 'Commercial', 'The order closes with a real landed cost.',
    'Documents negotiated, proceeds realised, BTB settled. The order closes against what it actually cost — CM, wastage, air freight, discount — so the next quote for this buyer starts from the truth.',
    '', '', '',
    { crumb: 'COMMERCIAL / REALISATION', status: 'Closed', dot: '#2F7D5B', title: 'PO-2044 · settlement', meta: 'closed 28 Nov',
      c1: 'Line', c2: 'Planned', c3: 'Actual',
      rows: [['FOB value', '$172,080', '$172,080|ok'], ['BTB settled', '$113,760', '$115,119|warn'], ['Air freight', '$0', '$2,140|dang'], ['Realised margin', '14.6%', '12.8%|warn']],
      foot: 'Variance written back to the costing model.', action: 'Close order' }),
];

export const ST_BN = ['অনুসন্ধান', 'কোটেশন', 'অর্ডার', 'কাঁচামাল', 'কাটিং', 'সেলাই', 'কিউসি', 'শিপমেন্ট', 'পেমেন্ট'];

export const EXTRACT: [string, string, string, string, string][] = [
  ['Style', 'Men’s piqué polo · 220gsm', '0.96', '96%', 'var(--ok)'],
  ['Quantity', '36,000 pcs', '0.99', '99%', 'var(--ok)'],
  ['Ship window', '12 Nov 2026 · Chattogram', '0.94', '94%', 'var(--ok)'],
  ['Wash care', 'not found in source', '—', '18%', 'var(--warn)'],
];

export const GATES: [string, string, string, string][] = [
  ['GATE-01', 'Costing gate', 'A quote below the approved floor margin cannot be sent.', 'Blocks: send quote'],
  ['GATE-02', 'BTB gate', 'No purchase order is issued against an LC that has not been opened.', 'Blocks: issue PO'],
  ['GATE-03', 'PP gate', 'No bulk output is recorded before QA signs the PP meeting.', 'Blocks: bulk sewing'],
  ['GATE-04', 'B/L gate', 'Documents do not leave while the draft B/L conflicts with the LC.', 'Blocks: document release'],
];

export const EXC: [string, string, string, string, string, string][] = [
  ['MATERIALS', 'var(--dang)', '18:20', 'Buttons 18L short by 12,400 pcs', 'PO-2044 · supplier confirmed a 3-day delay', 'Approve local buy'],
  ['SEWING', 'var(--warn)', '17:05', 'Line 4 lost 41 minutes today', 'Machine 12 · needle bar · mechanic assigned', ''],
  ['COMMERCIAL', 'var(--dang)', '16:40', 'B/L draft is 2 days past LC 021/26', 'Amendment drafted — needs your release', 'Release amendment'],
  ['QUALITY', 'var(--ok)', '15:10', 'Lot 8,400 accepted at AQL 2.5', 'DHU 3.1 · top defect SEW-04', ''],
];

export const LOOP: [string, string, string][] = [
  ['01', 'Propose', 'MARBIM drafts the document with every field traced back to the line it was read from. Nothing is saved.'],
  ['02', 'Approve', 'A named person with the right to that decision reads the draft and presses approve — or edits it first.'],
  ['03', 'Commit', 'Only then does it enter the factory, stamped with who approved it, when, and exactly what they saw.'],
];

export const LOOP_FIELDS: [string, string, string][] = [['Supplier', 'Nahar Spinning Ltd', '96%'], ['Rate', '$4.12 / kg', '92%'], ['In-house by', '18 Sep 2026', '88%']];

export const DEPTS: [string, string, string, string][] = [
  ['Merchandising', 'মার্চেন্ডাইজিং', 'Merchandisers · buyer follow-up', 'Buyer email to structured RFQ in [42s], every field linked to its source.'],
  ['Sampling', 'স্যাম্পলিং', 'Sample room · pattern master', 'Proto, fit and PP samples tracked against the buyer’s comment sheet.'],
  ['Planning', 'প্ল্যানিং', 'PPC · line chiefs', 'A TNA back-planned from the ship date that re-dates everything when one milestone slips.'],
  ['Store & Inventory', 'স্টোর', 'Store keepers · fabric in-charge', 'UD and bonded balances that reconcile with the bond register, not a parallel sheet.'],
  ['Cutting', 'কাটিং', 'Cutting master · bundle section', 'Lay plans with bundle cards, so a sewing shortage traces back to its lay in seconds.'],
  ['Sewing', 'সেলাই', 'Line chiefs · supervisors · operators', 'Hourly output and WIP per operator, on the line’s own screen, in Bangla.'],
  ['Finishing & Packing', 'ফিনিশিং', 'Finishing in-charge · packers', 'A carton pack list that becomes the invoice and the packing list without retyping.'],
  ['Quality', 'কোয়ালিটি', 'QA manager · inline QCs', 'Live defect pareto by reason code, on the supervisor’s screen before the shift ends.'],
  ['Commercial', 'কমার্শিয়াল', 'Commercial manager · bank liaison', 'LC, BTB and B/L read against their terms before any document leaves the building.'],
  ['HR & Payroll', 'এইচআর ও পে-রোল', 'HR · compliance officer', 'Gazette-grade payroll with attendance, OT and festival bonus, audit-ready.'],
  ['Maintenance', 'মেইনটেন্যান্স', 'Mechanics · maintenance in-charge', 'Downtime logged against the line that lost the hour, not a generic machine list.'],
];

export const BD: [string, string, string][] = [
  ['LC / BTB', 'Back-to-back, tracked', 'Master LC, back-to-back margin and maturity dates followed through to realisation.'],
  ['UD / Bonded', 'Balances that reconcile', 'Utilisation declaration and bond register quantities that match the customs file.'],
  ['Payroll', 'Gazette grades', 'Minimum wage grades, attendance, overtime and festival bonus — audit-ready.'],
  ['Bangla floor', 'Screens for the line', 'Every operator-facing screen in Bangla, sized for the boards actually on the floor.'],
  ['Offline', 'The line keeps running', 'The floor records through a dropout and syncs when the connection comes back.'],
];

export const OWNER_STATS: [string, number, (v: number) => string, string][] = [
  ['Lines running', 8, (v) => String(Math.round(v)), '#F4F3F0'],
  ['Efficiency', 71, (v) => Math.round(v) + '%', '#F4F3F0'],
  ['Orders at risk', 2, (v) => String(Math.round(v)), '#E0665C'],
  ['Shipped this week', 118400, (v) => Math.round(v / 1000) + 'k', '#F4F3F0'],
];

// [d, isAmber, dx, dy]
export const MARK_PATHS: [string, number, number, number][] = [
  ['M23.7952 104.845L53.6103 76.79L64.1638 65.36L55.3477 57.0128L45.3501 67.8417L19.7375 100.451L23.7952 104.845Z', 1, -0.284, 0.959],
  ['M74.1043 53.9829L98.8518 23.5537L94.7948 19.1599L66.4675 45.6778C68.8799 48.2906 72.3295 52.0355 74.1069 53.9786L74.1043 53.9829Z', 1, 0.896, -0.444],
  ['M75.0584 104.845L79.1148 100.45L58.4484 74.5517L51.115 82.0006L75.0584 104.845Z', 0, 0.398, 0.918],
  ['M40.0171 71.1306L48.278 62.1833L34.1637 46.8979L4.05681 19.1599L-6.10352e-05 23.5537L25.9036 55.845L40.0162 71.1294L40.0171 71.1306Z', 0, -0.952, -0.304],
  ['M89.8828 87.4272L93.9397 83.0328L65.2913 47.1366L57.1656 38.3351L48.9481 47.33L57.0297 56.0839L89.8828 87.4272Z', 0, 0.895, 0.447],
  ['M38.6342 35.8164L47.5312 28.1366L18.883 1.7415L14.8261 6.13528L38.6334 35.8155L38.6342 35.8164Z', 0, -0.492, -0.871],
  ['M7.56648 85.6844L30.2327 64.3556L23.3139 56.0733L3.50879 81.2911L7.56648 85.6844Z', 1, -0.864, 0.503],
  ['M41.1666 53.5302L53.6837 39.9734L82.6229 4.39357L78.566 -0.000253677L45.4228 31.0264L33.3608 44.0902L41.1657 53.5293L41.1666 53.5302Z', 1, 0.330, -0.944],
];

// The composed 4-path mark used everywhere the logo glyph is static. [d, fill]
export const MARK_STATIC: [string, 'amber' | 'ink'][] = [
  ['M23.7952 104.845L53.6103 76.79L64.1638 65.36L55.3477 57.0128L45.3501 67.8417L19.7375 100.451L23.7952 104.845ZM74.1043 53.9829L98.8518 23.5537L94.7948 19.1599L66.4675 45.6778C68.8799 48.2906 72.3295 52.0355 74.1069 53.9786L74.1043 53.9829Z', 'amber'],
  ['M75.0584 104.845L79.1148 100.45L58.4484 74.5517L51.115 82.0006L75.0584 104.845ZM40.0171 71.1306L48.278 62.1833L34.1637 46.8979L4.05681 19.1599L-6.10352e-05 23.5537L25.9036 55.845L40.0162 71.1294L40.0171 71.1306Z', 'ink'],
  ['M89.8828 87.4272L93.9397 83.0328L65.2913 47.1366L57.1656 38.3351L48.9481 47.33L57.0297 56.0839L89.8828 87.4272ZM38.6342 35.8164L47.5312 28.1366L18.883 1.7415L14.8261 6.13528L38.6334 35.8155L38.6342 35.8164Z', 'ink'],
  ['M7.56648 85.6844L30.2327 64.3556L23.3139 56.0733L3.50879 81.2911L7.56648 85.6844ZM41.1666 53.5302L53.6837 39.9734L82.6229 4.39357L78.566 -0.000253677L45.4228 31.0264L33.3608 44.0902L41.1657 53.5293L41.1666 53.5302Z', 'amber'],
];

// [label, ms, per-stroke animation, caption]
export const MARK_LOOP: [string, number, (i: number) => string, string][] = [
  ['Idle', 1800, (i) => 'fx-mbreathe 2.8s ease-in-out ' + (-i * 170) + 'ms infinite', 'The mark breathes. Nothing is running, and it does not pretend to be.'],
  ['Reading', 1500, (i) => 'fx-mspread 320ms cubic-bezier(.2,.8,.2,1) ' + (i * 26) + 'ms 1 forwards', 'A document arrives — tech pack, PO, challan, LC. The strokes open to take it in.'],
  ['Thinking', 1800, (i) => 'fx-morbit 1.4s ease-in-out ' + (-i * 95) + 'ms infinite', 'Reading and retrieval. The eight strokes orbit the centre while it works.'],
  ['Drafting', 1600, (i) => 'fx-mconverge 480ms cubic-bezier(.2,.8,.2,1) ' + (i * 34) + 'ms 1 forwards', 'A draft leaves the mark, with a confidence on every field it filled.'],
  ['Approved', 1400, () => 'none', 'A person presses approve. Only then does anything commit — and the press is amber.'],
];

export const ROSTER: [string, string, string][] = [
  ['Tech pack', 'Style, fabric, gsm, measurement chart, trims and the buyer’s construction notes.', 'style master + BOM skeleton'],
  ['Purchase order', 'Quantity, size ratio, price, ship window, incoterm and destination port.', 'order + TNA seed'],
  ['Proforma invoice', 'Values, payment terms and bank details exactly as sent to the buyer.', 'commercial record'],
  ['Challan / GRN', 'Supplier, lot, quantity received and the shortage against what was booked.', 'store receipt'],
  ['Letter of credit', 'Terms, latest shipment date, quantity tolerance, documents required.', 'LC terms + gate rules'],
  ['Back-to-back LC', 'Margin, maturity date and the master LC it hangs from.', 'BTB register'],
  ['Draft B/L', 'Port of loading, goods description, quantity and on-board date.', 'document check'],
  ['Fabric test report', 'Shrinkage, GSM, colour fastness measured against the buyer’s standard.', 'QC evidence'],
  ['Audit report', 'BSCI, Sedex or buyer findings with corrective actions and their due dates.', 'compliance actions'],
  ['Buyer comment sheet', 'Sample comments, revision number and the date they were sent back.', 'sampling revision'],
];

export const SRC_LINES = [
  'STYLE      Men’s piqué polo, short sleeve',
  'FABRIC     220 gsm piqué, 100% combed cotton',
  'ORDER QTY  36,000 pcs  (S1 : M3 : L3 : XL1)',
  'DELIVERY   ex-factory 05 Nov 2026',
  'SHIPMENT   12 Nov 2026, FOB Chattogram',
  'PACKING    1 pc poly bag, 20 pcs per carton',
  'WASH CARE  —',
];

export const SRC_FIELDS: [string, string, string, string, string, number][] = [
  ['Style', 'Men’s piqué polo · 220gsm', '0.96', '96%', 'var(--ok)', 0],
  ['Quantity', '36,000 pcs', '0.99', '99%', 'var(--ok)', 2],
  ['Ship window', '12 Nov 2026 · Chattogram', '0.94', '94%', 'var(--ok)', 4],
  ['Wash care', 'not found in source', '0.18', '18%', 'var(--warn)', 6],
];

export const NEVER: [string, string][] = [
  ['It never approves anything.', 'Not a quote, not a purchase order, not a document release. Approval is a named person with the right to that record.'],
  ['It never messages your buyer.', 'Drafts are for your merchandiser. What leaves the building is written and sent by a human.'],
  ['It never invents a number.', 'If a value is not in a document you gave it, the field stays empty and is flagged — it does not guess a plausible one.'],
  ['It never learns from your factory for someone else.', 'Your orders, rates and buyers stay in your instance. Nothing crosses to another factory.'],
  ['It never moves money.', 'No payment, no bank instruction, no LC amendment leaves without a human signature on the release.'],
  ['It never hides a source.', 'Every extracted value keeps a link to the document and line it came from, for as long as the record exists.'],
];

export function stampToSeconds(stamp: string): number {
  const p = String(stamp).split(':').map(Number);
  if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
  if (p.length === 2) return p[0] * 60 + p[1];
  return p[0] || 0;
}

/** The 3-minute walkthrough — paste any YouTube link form here; it plays inline on /walkthrough. */
export const WALK_YOUTUBE = 'https://youtu.be/hyEKs6Ws2Vw';
export const YOUTUBE_ID = youtubeId(WALK_YOUTUBE);

/** The per-chapter clips playlist on YouTube. */
export const WALK_PLAYLIST = 'https://www.youtube.com/playlist?list=PLdS7DSBbeTjA';

/**
 * One standalone clip per chapter, aligned by index with CHAPTERS: [youtube link, clip title, clip length].
 * An empty link means the clip is not shot yet — the tile keeps its VIDEO COMING badge and seeks the full walkthrough instead.
 */
export const CHAPTER_CLIPS: [string, string, string][] = [
  ['https://youtu.be/1CH52isBjXA', 'From Buyer Email to RFQ in 42 Seconds', '0:22'],
  ['https://youtu.be/yV1TOOrgzSE', 'Costing a Garment Order on Your Own Rates', '0:16'],
  ['https://youtu.be/Vr3NZWHBRio', 'TNA and the LC — Every Date Watched', '0:17'],
  ['https://youtu.be/kSOO_d0Va70', 'BTB Headroom and Bonded Stock — Checked Before the Click', '0:34'],
  ['https://youtu.be/Lr7EwbHPWi0', 'No Cutting Before PP Approval', '0:15'],
  ['https://youtu.be/dX3T56NWb0s', 'Cutting and Sewing — 60 Seconds a Line, in Bengali', '0:38'],
  ['https://youtu.be/kbgL62GoFZ4', 'AQL Computed, Not Argued', '0:32'],
  ['https://youtu.be/Wx7IbXacROM', 'Export Documents, Bank-Clean Before They Leave', '0:20'],
  ['https://youtu.be/qwUYgzityic', 'Realization, Margin, and the Owner’s Pocket', '0:34'],
];

export const CHAPTERS: [string, string, string, string][] = [
  ['0:00', 'A buyer email arrives', 'The inbox becomes a structured RFQ.', '0:18'],
  ['0:18', 'Costing and quotation', 'Rates, margin, and the quote that leaves.', '0:24'],
  ['0:42', 'TNA and the LC', 'The plan and the letter of credit.', '0:23'],
  ['1:05', 'Materials, BTB and bonded', 'BOM, back-to-back, and the bonded store.', '0:23'],
  ['1:28', 'The PP sample runs late', 'A late sample and the dates that move.', '0:19'],
  ['1:47', 'Cutting and sewing', 'The lay, the line, the hour.', '0:27'],
  ['2:14', 'Quality', 'Inline, AQL, and the sign-off.', '0:17'],
  ['2:31', 'Shipment and documents', 'Cartons, the B/L, and the file.', '0:17'],
  ['2:48', 'Paid', 'Realization lands.', '0:08'],
];

export const DEMO_POINTS: Pair[] = [
  ['Twenty minutes on a call, screen shared, on one of your own live orders.', 'বিশ মিনিটের কল — স্ক্রিন শেয়ার করে, আপনার চলমান একটি অর্ডার নিয়ে।'],
  ['No slide deck. We open the system and run your numbers through it.', 'কোনো স্লাইড নয়। সিস্টেম খুলে আপনার হিসাবই চালিয়ে দেখাই।'],
  ['If it fits, a pilot on one line before anything is signed.', 'মিলে গেলে, চুক্তির আগে একটি লাইনে পাইলট।'],
  ['Bengali or English — whichever your team runs on.', 'বাংলা বা ইংরেজি — আপনার টিম যেটায় স্বচ্ছন্দ।'],
];

export type SoonKey = 'product' | 'pricing' | 'about';
export const SOON: Record<SoonKey, [string, string, string, string[]]> = {
  product: ['Product', 'The departments, in depth.', 'Next in the build: every department with its own screens, its three capabilities, the gates it respects and the moments MARBIM steps in — on a sticky side-nav.',
    ['A floating screen card per department, taken from the live product', 'Three capabilities each, and the gate each one respects', 'The MARBIM moments: what it drafts, and who approves it', 'Sticky side-nav, linked from the departments grid on the landing page']],
  pricing: ['Pricing', 'One pilot programme. No invented tiers.', 'We are not going to publish three fake plans. There is a pilot, and there is a conversation.',
    ['A single pilot card: scope, what it costs, what is included', '“Talk to us” for anything beyond one factory', 'FAQ: data ownership, offline behaviour, existing ERP, languages, implementation time']],
  about: ['About', 'Threads into fabric.', 'Eleven departments pulling in eleven directions is thread. Run them on one system and it becomes fabric — that is the whole thesis, and the mark says it before we do.',
    ['The thesis, told the way the hero tells it', 'Build-in-public: what shipped this month, honestly', 'Founder block, and how to reach us without a form']],
};

// storyboards: [n, title, spec, bg, staticState, frames]
// frame: [t, title, body, kind, arg]  kind: 'mark' (arg = [spread px, rotation deg, opacity]) | 'rail' (arg = [fill%, tilt, opacity])
export type MarkFrame = [string, string, string, 'mark', [number, number, number]];
export type RailFrame = [string, string, string, 'rail', [string, string, string]];
export type Frame = MarkFrame | RailFrame;
export type Board = [string, string, string, string, string, Frame[]];

export const BOARDS: Board[] = [
  ['01', 'Hero — the weave', 'r3f · 8 tube meshes (CatmullRom, 26 pts, 40 seg, r 0.008→0.028) + 14 static ambient tubes · camera fov 38 z 6.4 · dpr ≤2', 'var(--surface)',
    'No WebGL, low device memory or prefers-reduced-motion: the canvas is never mounted. The composed X renders as the inline SVG mark at rest, the lockup is visible immediately, and the section keeps its full height so nothing below shifts.',
    [
      ['0.00s', 'Loose field', 'Eight strands scattered through ±2.6u of depth. Radius 0.008, opacity .28. Ambient threads at .16.', 'mark', [26, 0, 0.3]],
      ['0.60s', 'Drift', 'Each strand lerps toward its stroke spine. Transverse sine bow at 0.26u, phase-offset per strand.', 'mark', [16, -6, 0.55]],
      ['1.20s', 'Cross-over', 'Spread factor 1.6 — strands overlap through the centre. This frame is the weave read; hold it.', 'mark', [10, 5, 0.8]],
      ['1.90s', 'Registration', 'Spread 1.15, bow decayed to 0.08. Strands find the 34° axes of the mark.', 'mark', [4, 0, 0.95]],
      ['2.65s', 'Settle', 'Spread 1.0, radius 0.028, opacity 1. Lockup fades in 200ms later, 600ms ease.', 'mark', [0, 0, 1]],
      ['scroll', 'Unravel', 'weave = eased − scroll×1.35. Group translates −0.9u on Y and the strands loosen back toward the field.', 'mark', [14, 8, 0.5]],
    ]],
  ['02', 'Order journey — scrollytelling', '900vh section · sticky stage at top 70px · scroll → rAF → direct style writes (no React re-render) · transform + opacity only', 'var(--canvas)',
    'Motion off: the stage un-pins and the nine stations stack as a normal vertical list — caption, then screen card, no tilt, no fade. The thread rule renders fully drawn. Every station is reachable by keyboard and by anchor link.',
    [
      ['p = 0', 'Pin', 'Section pins under the nav. Thread rule at 0%, nodes hairline border-strong, labels text-tertiary.', 'rail', ['0%', 'perspective(900px) rotateY(-12deg) rotateX(5deg)', '0.25']],
      ['p → n', 'Travel', 'Fill width and the amber order dot both track p exactly. Active node scales 1.5, label goes ink 600.', 'rail', ['34%', 'perspective(900px) rotateY(-12deg) rotateX(5deg)', '1']],
      ['d = 0', 'Card in', 'opacity 1, translateY 0. Screen rotateY −12° rotateX 5° translateZ 0, scale 1.0.', 'rail', ['48%', 'perspective(900px) rotateY(-12deg) rotateX(5deg)', '1']],
      ['|d| → 1', 'Card out', 'opacity = 1 − |d|×1.9, translateY d×46px, rotateY −12 + 9d, translateZ −34px, scale .94.', 'rail', ['62%', 'perspective(900px) rotateY(-3deg) rotateX(2deg) scale(.94)', '0.35']],
      ['per station', 'Gate / AI badge', 'AI badges use accent-subtle on #EBD9A6; gate badges use sunken on border-subtle. Hidden ≤720px.', 'rail', ['76%', 'perspective(900px) rotateY(-12deg) rotateX(5deg)', '1']],
      ['p = 1', 'Release', 'All nodes ink, thread full, dot parks at station 9. Section un-pins into the next band.', 'rail', ['100%', 'perspective(900px) rotateY(-12deg) rotateX(5deg)', '1']],
    ]],
  ['03', 'MARBIM — the 8-second loop', 'The inline mark, 8 paths, transform-box view-box, transform-origin 49.5 52.5 · CSS keyframes only, no JS per frame', 'var(--surface)',
    'Motion off: the mark holds at rest, the draft card and its confidence bars are already present, and the approve press is shown as a static pressed state. The loop is also step-addressable — the five chips under the headline drive it manually.',
    [
      ['0.0–1.8s', 'Idle breathe', 'fx-mbreathe 2.8s, each stroke offset −170ms along its own outward vector, ±3px.', 'mark', [3, 0, 1]],
      ['1.8–3.3s', 'Reading', 'A document flies in from the left over 1.5s. Strokes open 4px outward, 26ms apart, and hold.', 'mark', [4, 0, 1]],
      ['3.3–5.1s', 'Thinking', 'fx-morbit ±13° around the mark centre, 95ms stagger, opacity dipping to .5 per stroke.', 'mark', [0, 12, 0.75]],
      ['5.1–6.7s', 'Drafting', 'Strokes converge from 22px out with a 10% overshoot; the draft card pops out with its confidence bars.', 'mark', [0, -4, 1]],
      ['6.7–8.0s', 'Approved', 'Mark holds still. The amber button presses to accent-pressed at scale .95 — the only amber motion.', 'mark', [0, 0, 1]],
    ]],
];

export const INVENTORY: [string, string, string][] = [
  ['Nav bar', 'SiteHeader', 'bg-canvas @86% + blur(14px) · border-subtle · h 70 · sticky top 0 z 50'],
  ['Primary action', 'Button/primary', 'accent bg · accent-on text · radius md 8 · sh1 · hover accent-hover · never white on amber'],
  ['Secondary action', 'Button/secondary', 'transparent · border-default · text-primary · hover bg-hover + border-strong'],
  ['Eyebrow', 'Eyebrow', 'mono 11 / .11em / uppercase · text-tertiary · three 2px accent slashes at skewX(−34°)'],
  ['Section heading', 'SectionTitle', 'Archivo 700 · clamp(28,3.4vw,46) / 1.06 · −.026em · text-primary'],
  ['Lead paragraph', 'Lead', 'Inter 400 · clamp(17,1.45vw,21) / 1.55 · text-secondary · max 46ch · text-wrap pretty'],
  ['Floating screen card', 'FloatCard', 'bg-surface · border-subtle · radius 12 · sh3 · cut corner 16 · idle rotateY 9–11°, bob 7–9s, flatten + 1.03 on hover'],
  ['Station rail', 'ThreadRail', 'track border-default 2px · fill text-primary · order dot accent + 3px canvas ring'],
  ['Gate badge', 'GateBadge', 'bg-sunken · border-subtle · 22px ink square with a 12px accent bar · never amber fill'],
  ['AI badge', 'AiBadge', 'accent-subtle bg · #EBD9A6 border · accent-pressed text · 9px accent dot'],
  ['Screen table', 'ScreenTable', 'header bg-sunken mono 10 uppercase · rows border-subtle · values mono 12/13 · status via semantic tokens'],
  ['Status chip', 'StatusChip', 'success / warning / danger / text-secondary · mono 12 · no fill'],
  ['Owner phone', 'NightPhone', 'dark set: canvas #0F131B · surface #181D29 · hairline #252B3A · no shadows · amber only on the one action'],
  ['Counters', 'StatCounter', 'Archivo 600 · font-variant-numeric tabular-nums · 1000ms cubic ease-out on first intersection'],
  ['Weave field', 'WeaveField', 'repeating-linear-gradient(146°) · border-subtle at 3–5% · empty states, posters and scrims only'],
  ['Cut corner', '—', 'clip-path polygon, 12–18px · top-right on containers, bottom-left on chips · one per group, never on inputs'],
  ['Language switch', 'LangSwitch', 'ink pill on active · EN / বাংলা · Anek Bangla 400–700 for bn, Inter for en'],
  ['Trust footer', 'AuditLine', 'bg-sunken · mono 12 / 1.6 · text-secondary · model, sources, approver, timestamp, audit id'],
];

export const BUILD_NOTES: [string, string][] = [
  ['Route group', 'app/(marketing)/{page,product,marbim,walkthrough,pricing,demo,about}/page.tsx — same repo as the app, separate layout, no app shell.'],
  ['3D', 'react-three-fiber. One <Canvas> in the hero, dynamic()-imported with ssr:false and a poster PNG as the loading state. Eight tube meshes rebuilt per frame; the 14 ambient tubes are built once.'],
  ['Scroll motion', 'Framer Motion useScroll + useTransform on the pinned section. Drive transform and opacity only — never width/top/left. The journey writes styles imperatively; do not re-render 9 cards per frame.'],
  ['i18n', 'next-intl, locales en + bn. Anek Bangla subset to Bengali + Latin, next/font, display swap. Numbers stay Western digits — the floor reads both, invoices do not.'],
  ['JS budget', 'three ≈145KB gz is the whole risk. Landing route stays ≤450KB gz by keeping the canvas out of the initial chunk and the other six routes 3D-free.'],
  ['Reduced motion & fallback', 'prefers-reduced-motion, WebGL absent, or navigator.deviceMemory < 2 → composed static state for every scene. The site is fully navigable with all motion off.'],
  ['LCP', 'The hero headline is server-rendered HTML text, not canvas. Canvas mounts after first paint. Target LCP < 2.5s on mid-range Android over 4G.'],
  ['Bengali + mono', 'JetBrains Mono carries no Bengali glyphs, so bn eyebrows and mono labels fall back. For the bn locale, stack Anek Bangla ahead of the mono family and drop the .11em tracking — Bengali does not letterspace.'],
  ['Assets', 'fabricxai-logo-light/dark.png for the lockup; the X mark is inline SVG (8 paths) so it can be animated and recoloured — never a PNG in motion.'],
];

export const PHONE_TILES: [string, string, string][] = [['Efficiency', '71%', '#F4F3F0'], ['WIP', '96,400', '#F4F3F0'], ['On plan', '6 / 8', '#D99A3F'], ['Exceptions', '4', '#E0665C']];
export const PHONE_FEED: [string, string, string][] = [
  ['#E0665C', 'Buttons short — PO-2044', 'Store · 12,400 pcs · needs your call'],
  ['#E0665C', 'B/L past LC date', 'Commercial · amendment ready'],
  ['#D99A3F', 'Line 4 below target', 'Sewing · 41 min downtime'],
];

// ============================================================================
// v2 content — positioning ladder, MARBIM elevation, new routes
// ============================================================================

export const SITE = {
  whatsapp: '8801743036425',
  whatsappDisplay: '+880 1743-036425',
  name: 'FabricXai',
  category: 'The Garments Operating System',
  descriptor: 'Garments Intelligent System',
  company: 'SocioFi Technology',
  legal: 'FabricXai — a product of SocioFi Technology',
  titleHome: 'FabricXai — The Garments Operating System',
};

/** One mono "artifact" per journey station — the journey is documents, not icons. */
export const ARTIFACTS: string[] = [
  'From: sourcing@buyer.com · Subject: SS26 piqué polo — price request · 2 attachments',
  'QT-3190 · rev 3 · FOB US$ 4.77 / pc · margin 14.6% · held',
  'PO-2044 · 36,000 pcs · S1 M3 L3 XL1 · ship 12 Nov 2026',
  'BTB 004/26 · US$ 113,760 · 90 days · master LC 021/26',
  'Lay 14 · 62 plies · marker eff 87.4% · bundle cards 1–318',
  'Line 4 · 09:00–12:00 · 819 / 840 pcs · downtime 11 min',
  'AQL 2.5 · lot 8,400 · DHU 3.1 · top defect SEW-04',
  'B/L draft · Chattogram → Hamburg · on-board 12 Nov · 3 checks',
  'Realised US$ 172,080 · 28 Nov 2026 · margin 12.8% · closed',
];

/** Cost cascade from one lost digit — specific numbers, never round. */
export const CASCADE: [string, string][] = [
  ['short shipped', '36,000 pcs'],
  ['air freight', 'US$ 48,600'],
  ['profit at 3%', 'US$ 2,964'],
];

/** The six versions of one order, in the order they are retyped. */
export const SIX_ARTEFACTS: [string, string][] = [
  ['Buyer email', 'quote for 36,000 pcs'],
  ['Excel costing', 'qty 36,000'],
  ['WhatsApp · sample room', '3,600 pcs bulk?'],
  ['Proforma invoice', '3,600 pcs · US$ 17,208'],
  ['Store requisition', 'yarn for 3,600'],
  ['Packing list', '3,600 pcs · 180 ctn'],
];

/** MARBIM — five layers, top to bottom. [n, label, sub, body] */
export const LAYERS: [string, string, string, string][] = [
  ['01', 'DATA ENGINE', 'Verified garment corpus', 'Tech packs, POs, LCs, challans and test reports, cleaned and labelled by people who have read thousands of them. Units are normalised on the way in: gsm, kg, dozens, pcs, cartons.'],
  ['02', 'MARBIM CORE', 'Small language model', 'Built only for garments. It reads the Bangla-English mix of a real factory floor and turns paperwork into named fields, each with a confidence and a link to the line it came from.'],
  ['03', 'KNOWLEDGE GRAPH', 'Styles, buyers, materials', 'Every style, buyer, supplier and material is a node. A new tech pack lands next to the last three from the same buyer, so the draft starts from history, not from a blank form.'],
  ['04', 'DETERMINISTIC CALCULATORS', 'Consumption, costing, CM — math is never generated', 'Fabric consumption, costing and CM minutes run through fixed formulas the factory can audit line by line. MARBIM fills the inputs; it never invents the arithmetic.'],
  ['05', 'PROPOSE → APPROVE', 'Nothing saves without a person', 'Every output is a draft until a named person with the right to that record presses approve. The stamp — who, when, and exactly what they saw — is permanent.'],
];

export const WHY_SMALL: [string, string, string][] = [
  ['SMALL', 'Runs affordably, answers fast', 'A model sized for the job answers in seconds, runs on the factory’s own hardware if it must, and costs a fraction of a general model per document read.'],
  ['SPECIFIC', 'Knows gsm from GSM, knows a UD from an LC', 'It has read enough garment paperwork to know that 220 is a fabric weight, that a UD is a customs document, and that “ex-fty” is a date, not a place.'],
  ['YOURS', 'Your factory’s data trains no one else’s model', 'Each factory runs in its own isolated tenant. Orders, rates and buyers are FACTORY_PRIVATE — they never leave to improve another factory’s MARBIM.'],
];

export type RoadmapState = 'SHIPPED' | 'IN TRAINING' | 'AHEAD';
export const ROADMAP: [RoadmapState, string][] = [
  ['SHIPPED', 'Tech pack, purchase order, proforma invoice, challan / GRN and letter of credit read into named fields'],
  ['SHIPPED', 'Provenance on every field · confidence scoring · Bangla-English extraction'],
  ['IN TRAINING', 'Back-to-back LC, draft B/L checked against LC terms, fabric test reports'],
  ['IN TRAINING', 'Consumption and costing drafts through the deterministic calculators'],
  ['AHEAD', 'Audit reports and buyer comment sheets · TNA proposals from buyer history'],
  ['AHEAD', 'Exceptions in plain Bangla on the owner’s phone · voice notes from the floor'],
];

/** Trust loop as a sequence: [actor, action, note] */
export const SEQUENCE: [string, string, string][] = [
  ['Document', 'arrives', 'PDF, XLSX, photo or email body — Bangla, English, or both'],
  ['MARBIM', 'reads → drafts', 'named fields · confidence per field · source line per value'],
  ['Calculators', 'compute', 'consumption, costing, CM through fixed, auditable formulas'],
  ['Named person', 'reviews → approves or edits', 'only someone with the right to that record can press approve'],
  ['System', 'commits', 'the record enters the factory database — not before'],
  ['Audit', 'stamps', 'who · when · what they saw · audit id, permanent'],
];

export const ISOLATION: [string, string][] = [
  ['One tenant per factory', 'Your data lives in its own schema with row-level security. No query from another tenant can reach it, by construction rather than by policy.'],
  ['FACTORY_PRIVATE by default', 'Nothing you upload is used to train a model for anyone else. The verified corpus that trains MARBIM is separate from your live records.'],
  ['Your keys, your exit', 'Every record is exportable in open formats at any time. Leaving is a download, not a negotiation.'],
];

export const DEPLOY: [string, string][] = [
  ['Cloud or on-premise', 'Runs hosted, or on the factory’s own servers inside the compound when the buyer’s audit or the owner’s preference demands it.'],
  ['The line keeps running', 'Floor screens record through a dropout and sync when the connection comes back. Bundle cards and hourly output never wait for the internet.'],
  ['Phones first', 'The owner’s view and the exceptions feed are built for a mid-range Android on 4G, because that is what is in the pocket at 21:44.'],
];

export const LANGUAGE_NOTES: [string, string][] = [
  ['Bangla and English, mixed', 'A challan written half in Bangla, a WhatsApp note with English numbers — MARBIM reads both in one pass. Operator screens are in Bangla; commercial documents stay in English.'],
  ['Numbers stay Western', 'Invoices, LCs and bank documents use Western digits, so the system does too. Bangla labels sit beside them; the digits never change shape.'],
  ['Units are first-class', 'gsm, kg, dozens, pcs, cartons and minutes are typed, not strings. A quantity without a unit is flagged, never assumed.'],
];

export const PRICING_TIERS: [string, string, string, string[]][] = [
  ['IMPLEMENTATION', 'We run your first order through the system with you', 'One-time', ['Data migration from your existing sheets and ERP', 'Your first live order, inquiry to payment, run side by side', 'Bangla training on the floor, English training in the office', 'Gates configured to your approvers']],
  ['PLATFORM', 'Per module, per month', 'Recurring', ['Start with the modules you run today, add the rest as you go', 'Unlimited users on the floor — pricing is per module, not per seat', 'Hosted, or on your own servers', 'Support on WhatsApp, Sunday to Thursday']],
  ['MARBIM', 'Included, not an add-on', 'Included', ['Every document read is included in the platform', 'No per-page or per-token fees', 'Your data trains no one else’s model', 'Improvements ship to every factory at once']],
];

export const PRICING_FAQ: [string, string][] = [
  ['Who owns the data?', 'You do. Every record is yours, exportable in open formats at any time. We never train a model for another factory on it.'],
  ['What happens when the internet drops?', 'The floor keeps recording. Bundle cards, hourly output and QC capture work offline and sync when the connection returns.'],
  ['We already have an ERP.', 'Most factories do. We run alongside it for the first order, import what is worth keeping, and switch modules over one at a time.'],
  ['Which languages?', 'Bangla on every operator-facing screen, English in the office. The language switch is per user, not per factory.'],
  ['How long does implementation take?', 'One live order, end to end. For a woven factory of 20–30 lines that has been six to ten weeks, most of it waiting on the order itself.'],
];

export const ABOUT_ARGUMENT: [string, string][] = [
  ['The duty cushion ends', 'Bangladesh graduates from LDC status in November 2026. The preferential duty access that carried the industry for two decades starts to close, and the margin it protected has to be found somewhere else.'],
  ['It has to come from inside the factory', 'The buyer will not pay more, and the worker should not be paid less. What is left is the waste between departments: the retyped order, the fabric booked before the money, the shipment that missed the LC date by two days.'],
  ['So we built the operating system', 'One database for eleven departments, four gates that do not open on their own, and a model that reads the paperwork so people can stop retyping it. Built in Dhaka, for the floors it runs on.'],
];

export const TEAM_ROLES: [string, string][] = [
  ['Product & garments', 'Merchandising and production people who have run orders through factories in Gazipur and Narayanganj, and know which sheet gets retyped where.'],
  ['Engineering', 'The team that builds the platform and trains MARBIM — data engine, model, calculators and the trust loop around them.'],
  ['Implementation', 'The people on the floor for your first order, in Bangla, until the line runs without them.'],
];

export const FAIR = {
  eyebrow: 'Innovation Fair 2026 · Stall 16',
  stall: '16',
  /** Hall and dates, shown under the eyebrow when set — e.g. 'Hall 3' and '14–16 Oct 2026'. */
  hall: '',
  dates: '',
  /** WhatsApp business number in international digits only, e.g. '8801700000000'. Empty = booking falls back to the form. */
  whatsapp: '8801743036425',
  /** Optional lead webhook (e.g. a Google Apps Script web app URL). Read from NEXT_PUBLIC_FAIR_LEAD_WEBHOOK at build time. */
  leadWebhook: process.env.NEXT_PUBLIC_FAIR_LEAD_WEBHOOK || '',
  email: 'hello@fabricxai.com',
  site: 'https://fabricxai.com',
  /** The two live experiences on the platform (see docs/PLATFORM_FAIR_BRIEF.md). Set platformLive=false to hide the buttons. */
  platformLive: true,
  platformMarbim: 'https://platform.fabricxai.com/try/marbim',
  platformDemo: 'https://platform.fabricxai.com/try/demo',
  company: 'SocioFi Technology',
  companySite: 'https://sociofitechnology.com',
  title: ['You found the thread.', 'সুতোটা পেয়ে গেছেন।'] as Pair,
  sub: ['One order, from buyer email to bank realisation, on one system — with MARBIM reading the paperwork on the way.', 'এক অর্ডার, বায়ারের ইমেইল থেকে ব্যাংক রিয়ালাইজেশন, এক সিস্টেমে — পথের কাগজ পড়ছে মারবিম।'] as Pair,
  film: ['Watch the 58-second film', '৫৮ সেকেন্ডের ফিল্ম দেখুন'] as Pair,
  book: ['Book a demo at the fair', 'মেলায় ডেমো বুক করুন'] as Pair,
  never: ['Read what MARBIM never does', 'মারবিম যা কখনো করে না'] as Pair,
  /** Paste any YouTube link here (watch, share, or embed form) — the film then plays inline on the page. */
  filmYoutube: 'https://youtu.be/Cy_MfEB3aTU',
  /** Self-hosted fallback, used when filmYoutube is empty. */
  filmSrc: '/media/fair-loop.mp4',
  filmPoster: '/media/fair-loop-poster.svg',
};

/** Extract a YouTube video id from a watch / youtu.be / embed / shorts URL, or return the id as-is. */
export function youtubeId(input: string): string {
  const s = input.trim();
  if (!s) return '';
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(s) ? s : '');
}
