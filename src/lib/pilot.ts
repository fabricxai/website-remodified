import baraka from '../../content/pilot/baraka.json';
import issuesFile from '../../content/pilot/issues.json';

/* ---------- types (mirror content/pilot/README.md) ---------- */

export type MilestoneStatus = 'done' | 'next' | 'planned';
export type TileStatus = 'not_started' | 'training_scheduled' | 'trained' | 'live';
export type IssueStatus = 'open' | 'fixed' | 'wont_fix';

export interface Stat { label: string; value: number | 'auto'; auto?: 'departmentsLive' | 'openIssues' | 'neededFromBaraka'; suffix?: string; action?: boolean }
export interface Phase { name: string; start: string; end: string; dates: string; summary: string }
export interface Milestone { when: string; title: string; what: string; status: MilestoneStatus; statusLabel?: string; movedFrom?: { when: string; reason: string } }
export interface Tile { name: string; status: TileStatus; info: string; department?: boolean }
export interface Week { label: string; title: string; tiles: Tile[] }
export interface LogEntry { date: string; title: string; body: string; tags: string[] }
export interface Issue { id: string; department: string; raisedBy: string; date: string; what: string; status: IssueStatus; acknowledged: string | null; fixed: string | null; note?: string }
export interface DataRow { item: string; from: string; received: string; usedFor: string; visibleTo: string }
export interface Meeting { title: string; sub: string; columns: { heading: string; items: string[] }[]; acknowledged?: boolean; upcoming?: boolean }
export interface CheckItem { item: string; done: boolean; date: string }
export interface Contact { name: string; how: string; phone: string; email?: string }

export interface PilotContent {
  factory: string; portalName: string; portalTagline: string;
  updated: string; updatedBy: string; appUrl: string; roadmapPdf: string; reportEmail: string;
  rail: { who: string[] };
  today: { title: string; sub: string; stats: Stat[]; needed: { title: string; items: string[] }; doing: { title: string; items: string[] }; nextReview: string };
  roadmap: { title: string; lede: string; downloadLabel: string; timelineStart?: string; phases: Phase[]; milestones: Milestone[] };
  departments: { title: string; lede: string; weeks: Week[] };
  log: { title: string; lede: string; entries: LogEntry[] };
  issues: { title: string; lede: string; empty: string };
  data: { title: string; lede: string; rows: DataRow[]; assurances: { title: string; body: string }[] };
  meetings: { title: string; lede: string; items: Meeting[] };
  handover: { title: string; lede: string; checklistTitle: string; checklist: CheckItem[]; maintenance: { title: string; included: string[]; notIncluded: string[]; until: string; supportEnds: string; untilAfter: string }; contacts: Contact[] };
  agreement: { title: string; lede: string; sides: { title: string; items: string[] }[]; escalation: { label: string; path: string[]; rule: string } };
}

export const content = baraka as PilotContent;
export const issues = issuesFile as Issue[];

/* ---------- dates ---------- */

const TZ = 'Asia/Dhaka';
const DAY = 86_400_000;

/** Today's calendar date in Dhaka as a UTC-midnight Date, so day arithmetic is exact. */
export function todayInDhaka(now = new Date()): Date {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  return new Date(parts + 'T00:00:00Z');
}
export function isoDate(d: Date): string { return d.toISOString().slice(0, 10); }
const parseIso = (s: string) => new Date(s + 'T00:00:00Z');
const daysBetween = (a: string, b: string) => Math.round((parseIso(b).getTime() - parseIso(a).getTime()) / DAY);

/* ---------- computed figures ---------- */

export interface IssueFigures { open: number; fixedThisWeek: number; avgDaysToFix: string }

export function issueFigures(list: Issue[], today: Date): IssueFigures {
  const t = isoDate(today);
  const open = list.filter((i) => i.status === 'open').length;
  const fixed = list.filter((i) => i.status === 'fixed' && i.fixed);
  const fixedThisWeek = fixed.filter((i) => daysBetween(i.fixed as string, t) < 7 && daysBetween(i.fixed as string, t) >= 0).length;
  const spans = fixed.map((i) => daysBetween(i.date, i.fixed as string)).filter((n) => n >= 0);
  const avg = spans.length ? spans.reduce((a, b) => a + b, 0) / spans.length : null;
  const avgDaysToFix = avg === null ? '\u2014' : Number.isInteger(avg) ? String(avg) : avg.toFixed(1);
  return { open, fixedThisWeek, avgDaysToFix };
}

export function departmentTiles(c: PilotContent = content): Tile[] {
  return c.departments.weeks.flatMap((w) => w.tiles).filter((t) => t.department !== false);
}

export function departmentFigures(c: PilotContent = content): { live: number; total: number } {
  const tiles = departmentTiles(c);
  return { live: tiles.filter((t) => t.status === 'live').length, total: tiles.length };
}

/** 0..1 position of today along the roadmap, from timelineStart (or the first phase) to the last phase end. */
export function roadmapProgress(c: PilotContent, today: Date): number {
  const phases = c.roadmap.phases;
  if (!phases.length) return 0;
  const start = parseIso(c.roadmap.timelineStart || phases[0].start).getTime();
  const end = Math.max(...phases.map((p) => parseIso(p.end).getTime()));
  if (end <= start) return 0;
  return Math.min(1, Math.max(0, (today.getTime() - start) / (end - start)));
}

export interface StatView { label: string; n: string; suffix?: string; action?: boolean }

export function statViews(c: PilotContent, list: Issue[], today: Date): StatView[] {
  const dep = departmentFigures(c);
  const iss = issueFigures(list, today);
  return c.today.stats.map((s) => {
    let n: string; let suffix = s.suffix;
    if (s.value === 'auto') {
      if (s.auto === 'departmentsLive') { n = String(dep.live); suffix = suffix ?? `of ${dep.total}`; }
      else if (s.auto === 'openIssues') n = String(iss.open);
      else if (s.auto === 'neededFromBaraka') n = String(c.today.needed.items.length);
      else n = '0';
    } else n = String(s.value);
    return { label: s.label, n, suffix, action: s.action };
  });
}

/* ---------- labels ---------- */

export const TILE_CHIP: Record<TileStatus, { label: string; chip: string; tile: string }> = {
  not_started: { label: 'Not started', chip: 'grey', tile: '' },
  training_scheduled: { label: 'Training scheduled', chip: 'amber', tile: 'action' },
  trained: { label: 'Trained', chip: 'blue', tile: 'trained' },
  live: { label: 'Live', chip: 'green', tile: 'live' },
};

export const MILESTONE_CHIP: Record<MilestoneStatus, { label: string; chip: string }> = {
  done: { label: 'Done', chip: 'green' },
  next: { label: 'Next', chip: 'amber' },
  planned: { label: 'Planned', chip: 'grey' },
};

export const ISSUE_CHIP: Record<IssueStatus, { label: string; chip: string }> = {
  open: { label: 'Open', chip: 'amber' },
  fixed: { label: 'Fixed', chip: 'green' },
  wont_fix: { label: 'Explained', chip: 'grey' },
};

export const SECTIONS: { id: string; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'departments', label: 'Departments' },
  { id: 'log', label: 'Progress log' },
  { id: 'issues', label: 'Issues' },
  { id: 'data', label: 'Data we hold' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'handover', label: 'Handover & support' },
  { id: 'agreement', label: 'Working agreement' },
];
