import type { Pair } from './data';

export interface Capability { title: string; body: string }
export interface Module {
  slug: string;
  name: Pair;
  people: string;
  station: number | null;          // index into STATIONS, or null
  claim: string;                   // hero H1
  lead: string;
  capabilities: [Capability, Capability, Capability];
  marbim: { drafts: string; from: string; approver: string };
  safeguard: { code: string; name: string; body: string; blocks: string };
  screen: { crumb: string; title: string; c: [string, string, string]; rows: [string, string, string][] };
}

export const MODULES: Module[] = [
  {
    slug: 'merchandising', name: ['Merchandising', 'মার্চেন্ডাইজিং'], people: 'Merchandisers · buyer follow-up', station: 0,
    claim: 'The buyer email stops being retyping.',
    lead: 'A tech pack and a price request land in the shared inbox. MARBIM reads both and drafts a structured inquiry with every field linked back to the line it came from. The merchandiser confirms in seconds and moves on to the buyer.',
    capabilities: [
      { title: 'Inquiry to structured RFQ', body: 'Style, fabric, quantity, size ratio, ship window and destination extracted from the email and the attachments, with a confidence on each.' },
      { title: 'Buyer follow-up in one thread', body: 'Every comment, sample revision and approval on an order sits on the order — not in six people’s inboxes.' },
      { title: 'Style master that stays current', body: 'A confirmed inquiry becomes the style master the sample room, costing and store all read from.' },
    ],
    marbim: { drafts: 'the structured RFQ from the buyer email, the tech pack PDF and the size sheet', from: 'email body · techpack_ss26.pdf p.1–4 · sizes.xlsx', approver: 'the merchandiser on the order' },
    safeguard: { code: 'CHECK-01', name: 'No field without a source', body: 'A value MARBIM cannot trace to a line in a document stays empty and is flagged. It is never filled with a plausible guess.', blocks: 'saving an unsourced value' },
    screen: { crumb: 'MERCHANDISING / INQUIRIES', title: 'INQ-8841 · piqué polo', c: ['Field', 'Value', 'Conf.'], rows: [['Style / fabric', '220gsm piqué', '0.96|ok'], ['Quantity', '36,000 pcs', '0.99|ok'], ['Ship window', '12 Nov 2026', '0.88|ok'], ['Wash care', 'not found', '—|warn']] },
  },
  {
    slug: 'sampling', name: ['Sampling', 'স্যাম্পলিং'], people: 'Sample room · pattern master', station: null,
    claim: 'Every sample knows which comment it answers.',
    lead: 'Proto, fit, size-set and PP samples are tracked against the buyer’s comment sheet, revision by revision. The sample room sees what changed; the merchandiser sees what is late.',
    capabilities: [
      { title: 'Revision history per sample', body: 'Each sample carries the comment it answers, the date it left, and the buyer’s reply — so the fourth fit sample is not a mystery.' },
      { title: 'Pattern and consumption hand-off', body: 'The pattern master’s consumption goes straight to costing through the calculators, not through a phone call.' },
      { title: 'PP sample as a gate input', body: 'A signed-off PP sample is what opens the PP meeting. Without it, bulk cannot start.' },
    ],
    marbim: { drafts: 'the revision log from the buyer’s comment sheet', from: 'comments_r3.pdf · email thread', approver: 'the sample room in-charge' },
    safeguard: { code: 'CHECK-03', name: 'PP gate', body: 'No bulk output is recorded against a style whose pre-production meeting has not been signed off by QA.', blocks: 'bulk sewing' },
    screen: { crumb: 'SAMPLING / PP', title: 'STY-2044 · PP sample', c: ['Sample', 'Sent', 'Status'], rows: [['Proto', '02 Aug', 'Approved|ok'], ['Fit r2', '19 Aug', 'Approved|ok'], ['Size set', '04 Sep', 'Comments|warn'], ['PP', '—', 'Pending|n']] },
  },
  {
    slug: 'planning', name: ['Planning', 'প্ল্যানিং'], people: 'PPC · line chiefs', station: 2,
    claim: 'The PO lands and the calendar writes itself.',
    lead: 'Confirmation turns into a time-and-action plan back-planned from the ship date: 47 milestones, each with an owner and a supplier dependency. Slip one and everything downstream re-dates in front of you.',
    capabilities: [
      { title: 'TNA from the ship date backwards', body: 'Milestones are dated from ex-factory back to fabric booking, with lead times from your own last three orders for this buyer.' },
      { title: 'Line loading that sees the whole floor', body: 'Capacity by line, by week, against every open order — the overload shows before the overtime is booked.' },
      { title: 'Re-dating that ripples', body: 'Move the PP meeting and the cut, sew and ship dates move with it. The people who own them are told.' },
    ],
    marbim: { drafts: 'the TNA proposal from this buyer’s order history', from: 'PO-2044.pdf · last 3 TNAs for this buyer', approver: 'the planning manager' },
    safeguard: { code: 'CHECK-03', name: 'PP gate', body: 'Bulk cutting and sewing milestones cannot be marked started until QA has signed the PP meeting.', blocks: 'bulk start' },
    screen: { crumb: 'PLANNING / TNA', title: 'PO-2044 · 47 milestones', c: ['Milestone', 'Owner', 'Date'], rows: [['Fabric in-house', 'Store', '18 Sep|ok'], ['PP meeting', 'QA', '24 Sep|ok'], ['Bulk cut start', 'Cutting', '01 Oct|ok'], ['Ex-factory', 'Commercial', '05 Nov|n']] },
  },
  {
    slug: 'store', name: ['Store & Inventory', 'স্টোর'], people: 'Store keepers · fabric in-charge', station: 3,
    claim: 'Nothing gets booked without the money behind it.',
    lead: 'The BOM explodes into yarn, trims and accessories, matched to UD and bonded-warehouse quantities. Booking a supplier needs an open back-to-back LC — the system checks before the store does.',
    capabilities: [
      { title: 'BOM to purchase orders', body: 'Consumption through the calculators, wastage by material, and a purchase order per supplier — issued only against an open BTB.' },
      { title: 'UD and bonded balances that reconcile', body: 'Utilisation declaration and bond register quantities that match the customs file, not a parallel sheet.' },
      { title: 'GRN from the challan', body: 'MARBIM reads the supplier’s challan; the store confirms the count and the shortage is on the order before the truck leaves.' },
    ],
    marbim: { drafts: 'the goods receipt from the supplier’s challan', from: 'challan_0917.jpg · PO-4471', approver: 'the store manager' },
    safeguard: { code: 'CHECK-02', name: 'BTB gate', body: 'No purchase order is issued against a letter of credit that has not been opened and margin-checked.', blocks: 'issuing a PO' },
    screen: { crumb: 'STORE / BOM', title: 'BOM-2044 · 31 lines', c: ['Material', 'Required', 'Status'], rows: [['Yarn 30s combed', '10,062 kg', 'Booked|ok'], ['Interlining', '3,600 m', 'Booked|ok'], ['Buttons 18L', '144,000', 'BTB open|dang'], ['Poly bags', '36,000', 'Local|n']] },
  },
  {
    slug: 'cutting', name: ['Cutting', 'কাটিং'], people: 'Cutting master · bundle section', station: 4,
    claim: 'Cut quantity locks against the order, not the marker.',
    lead: 'Marker efficiency, lay plan and ratio come off the approved size breakdown. Every bundle carries a card, so a shortage at sewing traces back to the lay it came from in seconds.',
    capabilities: [
      { title: 'Lay plan from the size ratio', body: 'Plies, markers and ratio computed from the confirmed order, with over-cut allowance the owner set — not the one the cutting master remembers.' },
      { title: 'Bundle cards that travel', body: 'Each bundle carries lay, size and count. Scan it at sewing input and the WIP moves with it.' },
      { title: 'Fabric reconciliation per lay', body: 'Issued against consumed against returned, per lay, so end bits and shortages are numbers rather than arguments.' },
    ],
    marbim: { drafts: 'nothing here — cutting is arithmetic, and the calculators own it', from: 'approved size breakdown · marker report', approver: 'the cutting master (lay close)' },
    safeguard: { code: 'CHECK-05', name: 'Cut lock', body: 'Cut quantity cannot exceed order quantity plus the approved over-cut allowance without a named release.', blocks: 'over-cutting' },
    screen: { crumb: 'CUTTING / LAY PLAN', title: 'Lay 14 · 62 plies', c: ['Size', 'Ratio', 'Cut'], rows: [['S', '1', '5,562|n'], ['M', '3', '16,578|n'], ['L', '3', '11,016|n'], ['XL', '1', '2,844|ok']] },
  },
  {
    slug: 'sewing', name: ['Sewing', 'সেলাই'], people: 'Line chiefs · supervisors · operators', station: 5,
    claim: 'Bulk cannot start before the PP meeting passes.',
    lead: 'Line loading, hourly output and WIP by operator — visible on the floor in Bangla. The PP gate is hard: no bulk sewing is recorded against a style whose pre-production meeting has not been signed off.',
    capabilities: [
      { title: 'Hourly output on the line’s own screen', body: 'Target against actual every hour, in Bangla, sized for the board on the wall — and on the owner’s phone at the same moment.' },
      { title: 'WIP per operator', body: 'Bundles scanned in and out per operation, so the bottleneck is a name and a machine, not a feeling.' },
      { title: 'Downtime with a reason', body: 'Machine down, no input, needle change — logged against the line that lost the hour and the mechanic who fixed it.' },
    ],
    marbim: { drafts: 'the shift summary in plain Bangla for the line chief', from: 'hourly output · downtime log', approver: 'the line supervisor' },
    safeguard: { code: 'CHECK-03', name: 'PP gate', body: 'Bulk output is refused until QA signs the pre-production meeting for this style.', blocks: 'bulk sewing' },
    screen: { crumb: 'SEWING / LINE 4', title: 'Hourly output · 36,000 pcs', c: ['Hour', 'Target', 'Actual'], rows: [['09:00', '210', '198|warn'], ['10:00', '210', '214|ok'], ['11:00', '210', '221|ok'], ['12:00', '210', '186|dang']] },
  },
  {
    slug: 'finishing', name: ['Finishing & Packing', 'ফিনিশিং'], people: 'Finishing in-charge · packers', station: null,
    claim: 'The carton list becomes the invoice without retyping.',
    lead: 'Pressing, tagging and packing recorded per carton against the buyer’s packing instruction. The carton pack list is the packing list, the invoice and the B/L draft — one record, three documents.',
    capabilities: [
      { title: 'Packing by the buyer’s instruction', body: 'Ratio packs, solid packs and carton marks come from the PO, so the packer is never guessing what the buyer wanted.' },
      { title: 'Carton list to shipping documents', body: 'Cartons scanned closed become the packing list and the invoice quantities. Nothing is typed twice.' },
      { title: 'Finishing WIP and rejects', body: 'What is pressed, what is packed, what is held for rework — by style, by day, on the same screen as sewing output.' },
    ],
    marbim: { drafts: 'the packing list and invoice draft from the closed carton list', from: 'carton scans · PO-2044 packing instruction', approver: 'the commercial manager' },
    safeguard: { code: 'CHECK-06', name: 'Carton lock', body: 'Packed quantity cannot exceed passed-QC quantity for the same size and colour.', blocks: 'packing unpassed goods' },
    screen: { crumb: 'FINISHING / PACKING', title: 'PO-2044 · 1,800 ctn', c: ['Size', 'Packed', 'Ctn'], rows: [['S', '4,500', '225|ok'], ['M', '13,500', '675|ok'], ['L', '13,500', '675|ok'], ['XL', '4,500', '225|ok']] },
  },
  {
    slug: 'quality', name: ['Quality', 'কোয়ালিটি'], people: 'QA manager · inline QCs', station: 6,
    claim: 'Every defect has a reason code and an owner.',
    lead: 'Inline AQL, 4-point fabric inspection and endline defect capture in one place. The pareto is live, so the top defect of the shift is on the supervisor’s screen before the shift ends.',
    capabilities: [
      { title: 'Fabric inspection on receipt', body: '4-point inspection per roll, with the roll’s fate — accept, downgrade, return — written back to the store and the supplier.' },
      { title: 'Inline and endline capture', body: 'Defects by reason code per operator per hour, on a phone or a tablet, in Bangla.' },
      { title: 'AQL that closes the lot', body: 'Sampling plan from the buyer’s AQL, the result on the lot, and the lot released — or held — with a name on it.' },
    ],
    marbim: { drafts: 'the buyer’s test report into pass/fail against the buyer’s standard', from: 'testreport_lab.pdf · buyer manual', approver: 'the QA manager' },
    safeguard: { code: 'CHECK-03', name: 'PP gate', body: 'QA’s signature on the PP meeting is the only thing that opens bulk. It cannot be delegated to the line.', blocks: 'bulk without PP' },
    screen: { crumb: 'QUALITY / ENDLINE', title: 'AQL 2.5 · lot 8,400', c: ['Defect', 'Code', 'Count'], rows: [['Broken stitch', 'SEW-04', '31|warn'], ['Uneven hem', 'SEW-11', '18|n'], ['Fabric hole', 'FAB-02', '6|n'], ['Oil stain', 'FIN-07', '4|n']] },
  },
  {
    slug: 'commercial', name: ['Commercial', 'কমার্শিয়াল'], people: 'Commercial manager · bank liaison', station: 7,
    claim: 'The document error is caught before the bank finds it.',
    lead: 'LC, BTB and B/L read against their terms before any document leaves the building. The system reads the draft B/L back against the LC — port, quantity, description, latest shipment date — and stops the mismatch.',
    capabilities: [
      { title: 'LC terms as rules', body: 'Latest shipment date, quantity tolerance, port and documents required become checks that run on every draft, not a memory.' },
      { title: 'Back-to-back tracked to maturity', body: 'Margin, maturity and the master LC it hangs from — followed through to realisation so nothing settles late by surprise.' },
      { title: 'Realisation with a real landed cost', body: 'Proceeds, BTB settlement, air freight and discount close the order against what it actually cost.' },
    ],
    marbim: { drafts: 'the LC terms into gate rules, and the discrepancy list from the draft B/L', from: 'LC-021-26.pdf · bl_draft.pdf', approver: 'the commercial manager' },
    safeguard: { code: 'CHECK-04', name: 'B/L gate', body: 'Documents do not leave while the draft B/L conflicts with the letter of credit on any checked term.', blocks: 'document release' },
    screen: { crumb: 'COMMERCIAL / DOCUMENTS', title: 'B/L draft vs LC 021/26', c: ['LC term', 'Draft', 'Check'], rows: [['Port of loading', 'Chattogram', 'Match|ok'], ['Quantity', '36,000 pcs', 'Match|ok'], ['Latest shipment', '10 Nov', 'Late 2d|dang'], ['Description', 'Knitted polo', 'Match|ok']] },
  },
  {
    slug: 'hr-payroll', name: ['HR & Payroll', 'এইচআর ও পে-রোল'], people: 'HR · compliance officer', station: null,
    claim: 'Gazette-grade payroll, audit-ready every month.',
    lead: 'Minimum wage grades, attendance, overtime and festival bonus computed the way the gazette says and the way the buyer’s auditor checks. The pay slip is in Bangla; the audit file is in English.',
    capabilities: [
      { title: 'Attendance to payroll without a sheet', body: 'Device attendance, leave and overtime flow into the month’s payroll through fixed formulas — grades, rates and caps from the gazette.' },
      { title: 'Compliance file always current', body: 'Working hours, OT limits and wage records in the shape a BSCI or buyer audit asks for, generated from the same data, not assembled the week before.' },
      { title: 'Workers see their own slip', body: 'A Bangla pay slip on the floor screen or a phone, with every line explained.' },
    ],
    marbim: { drafts: 'audit findings from the auditor’s report into corrective actions with due dates', from: 'audit_report.pdf', approver: 'the compliance officer' },
    safeguard: { code: 'CHECK-07', name: 'Wage floor', body: 'No pay run can be committed with any grade below the gazette minimum or any worker over the legal overtime cap without a named exception.', blocks: 'committing payroll' },
    screen: { crumb: 'HR / PAYROLL', title: 'September · 1,240 workers', c: ['Line', 'Workers', 'Status'], rows: [['Grade 3', '412', 'OK|ok'], ['Grade 4', '598', 'OK|ok'], ['OT > cap', '3', 'Exception|dang'], ['Festival bonus', '1,240', 'Draft|n']] },
  },
  {
    slug: 'maintenance', name: ['Maintenance', 'মেইনটেন্যান্স'], people: 'Mechanics · maintenance in-charge', station: null,
    claim: 'Downtime is logged against the line that lost the hour.',
    lead: 'Every machine has a card, every stop has a reason and a mechanic. Preventive maintenance is scheduled off running hours, not off the calendar, and the hour lost on Line 4 shows on the owner’s phone with the machine number.',
    capabilities: [
      { title: 'Machine register with history', body: 'Every machine, its line, its last three faults and its next service — on the mechanic’s phone.' },
      { title: 'Downtime tied to output', body: 'A stop logged on the line is the same record the sewing screen shows as lost target, so nobody argues about the 41 minutes.' },
      { title: 'Preventive by running hours', body: 'Service due is computed from hours actually run, and the line chief is told before the machine is pulled.' },
    ],
    marbim: { drafts: 'the fault summary from the mechanic’s Bangla voice note', from: 'voice note · machine card M-12', approver: 'the maintenance in-charge' },
    safeguard: { code: 'CHECK-08', name: 'No silent stop', body: 'A line stop over five minutes without a reason code is raised as an exception; it cannot be closed without one.', blocks: 'closing an unexplained stop' },
    screen: { crumb: 'MAINTENANCE / LINE 4', title: 'Machine 12 · needle bar', c: ['Stop', 'Reason', 'Minutes'], rows: [['09:12', 'Needle bar', '11|warn'], ['11:40', 'Thread break', '4|n'], ['14:05', 'No input', '26|dang'], ['Total', '3 stops', '41|warn']] },
  },
];

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug);
