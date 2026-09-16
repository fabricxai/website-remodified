import { NextResponse, type NextRequest } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { departmentTiles, isoDate, todayInDhaka, type Issue } from '@/lib/pilot';

/**
 * "Report a problem" → appends an issue to content/pilot/issues.json.
 *
 * Vercel's filesystem is read-only, so in production the append is a commit to the
 * repo through the GitHub Contents API (set PILOT_ISSUES_GITHUB_TOKEN and
 * PILOT_ISSUES_GITHUB_REPO=owner/repo; the commit redeploys the portal). Locally,
 * without those, it writes the file directly. If neither is possible it answers
 * 503 and the form falls back to a prefilled email.
 */

const FILE = 'content/pilot/issues.json';
const MAX = { name: 80, what: 2000 };

function nextId(list: Issue[]): string {
  const n = list.reduce((m, i) => Math.max(m, Number((i.id.match(/(\d+)$/) || [])[1] || 0)), 0) + 1;
  return 'BK-' + String(n).padStart(3, '0');
}

async function viaGitHub(build: (list: Issue[]) => Issue): Promise<Issue | null> {
  const token = process.env.PILOT_ISSUES_GITHUB_TOKEN;
  const repo = process.env.PILOT_ISSUES_GITHUB_REPO;
  if (!token || !repo) return null;
  const branch = process.env.PILOT_ISSUES_GITHUB_BRANCH || 'main';
  const api = `https://api.github.com/repos/${repo}/contents/${FILE}`;
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };

  const cur = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers, cache: 'no-store' });
  if (!cur.ok) throw new Error(`GitHub read failed: ${cur.status}`);
  const file = (await cur.json()) as { sha: string; content: string };
  const list = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')) as Issue[];
  const issue = build(list);
  list.push(issue);

  const put = await fetch(api, {
    method: 'PUT', headers,
    body: JSON.stringify({
      message: `issues: ${issue.id} raised by ${issue.raisedBy} (${issue.department})`,
      content: Buffer.from(JSON.stringify(list, null, 2) + '\n').toString('base64'),
      sha: file.sha, branch,
    }),
  });
  if (!put.ok) throw new Error(`GitHub write failed: ${put.status}`);
  return issue;
}

async function viaFile(build: (list: Issue[]) => Issue): Promise<Issue> {
  const p = path.join(process.cwd(), FILE);
  const list = JSON.parse(await fs.readFile(p, 'utf8')) as Issue[];
  const issue = build(list);
  list.push(issue);
  await fs.writeFile(p, JSON.stringify(list, null, 2) + '\n');
  return issue;
}

export async function POST(req: NextRequest) {
  let body: { department?: unknown; name?: unknown; what?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }

  const department = String(body.department ?? '').trim();
  const name = String(body.name ?? '').trim().slice(0, MAX.name);
  const what = String(body.what ?? '').trim().slice(0, MAX.what);
  if (!departmentTiles().some((t) => t.name === department)) return NextResponse.json({ error: 'Pick a department' }, { status: 400 });
  if (!name || !what) return NextResponse.json({ error: 'Name and what happened are required' }, { status: 400 });

  const build = (list: Issue[]): Issue => ({
    id: nextId(list), department, raisedBy: name, date: isoDate(todayInDhaka()), what, status: 'open', acknowledged: null, fixed: null,
  });

  try {
    const issue = (await viaGitHub(build)) ?? (await viaFile(build));
    return NextResponse.json({ ok: true, id: issue.id });
  } catch (e) {
    console.error('[pilot] could not store issue:', e);
    return NextResponse.json({ error: 'Could not save the report here' }, { status: 503 });
  }
}
