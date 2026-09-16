import { headers } from 'next/headers';
import RailNav from '@/components/pilot/RailNav';
import ReportProblem from '@/components/pilot/ReportProblem';
import {
  content as c, issues, departmentTiles, issueFigures, roadmapProgress, statViews, todayInDhaka,
  ISSUE_CHIP, MILESTONE_CHIP, SECTIONS, TILE_CHIP,
} from '@/lib/pilot';

/** Rendered on every request so the roadmap "today" marker and the issue figures are current. */
export const dynamic = 'force-dynamic';

export default async function PilotPage() {
  const base = (await headers()).get('x-pilot-base') ?? '/pilot';
  const today = todayInDhaka();
  const stats = statViews(c, issues, today);
  const fig = issueFigures(issues, today);
  const progress = Math.round(roadmapProgress(c, today) * 1000) / 10;
  const deptNames = departmentTiles(c).map((t) => t.name);
  const report = (primary?: boolean) => <ReportProblem departments={deptNames} apiUrl={`${base}/api/issues`} email={c.reportEmail} primary={primary} />;

  return (
    <div className="shell">
      <aside className="rail">
        <div className="brand">
          <div className="mark" aria-hidden="true" />
          <div><strong>{c.portalName}</strong><span>{c.portalTagline}</span></div>
        </div>
        <RailNav sections={SECTIONS} issueCount={fig.open} />
        <div className="who">{c.rail.who.map((line, i) => <span key={i}>{i ? <br /> : null}{line}</span>)}</div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="asof">Updated <b>{c.updated}</b> by {c.updatedBy}</div>
          <div className="actions">
            <a className="btn" href={c.appUrl}>Open the app</a>
            <a className="btn" href={c.roadmapPdf} download>{c.roadmap.downloadLabel}</a>
            {report(true)}
          </div>
        </div>

        {/* TODAY */}
        <section id="today" className="hero" aria-labelledby="today-h">
          <div className="wrap">
            <h1 id="today-h">{c.today.title}</h1>
            <p className="sub">{c.today.sub}</p>

            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className={s.action ? 'stat act' : 'stat'}>
                  <div className="n">{s.n}{s.suffix ? <> <span className="of">{s.suffix}</span></> : null}</div>
                  <div className="l">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="next">
              <div className="note action">
                <h2>{c.today.needed.title}</h2>
                <ul>{c.today.needed.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
              <div className="note">
                <h2>{c.today.doing.title}</h2>
                <ul>{c.today.doing.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <p className="meta">Next weekly review: {c.today.nextReview}.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap">
          <div className="wrap">
            <div className="sechead">
              <div>
                <h2>{c.roadmap.title}</h2>
                <p className="lede">{c.roadmap.lede}</p>
              </div>
              <a className="btn" href={c.roadmapPdf} download>{c.roadmap.downloadLabel}</a>
            </div>

            <div className="selvage" aria-hidden="true">
              <div className="pthread"><div className="done" style={{ width: `${progress}%` }} /><div className="today" style={{ left: `${progress}%` }} /></div>
              <div className="phases">
                {c.roadmap.phases.map((p) => (
                  <div key={p.name} className="phase"><h3>{p.name}</h3><div className="dates">{p.dates}</div><p>{p.summary}</p></div>
                ))}
              </div>
            </div>

            <div className="tablewrap">
              <table className="mtable">
                <thead><tr><th>When</th><th>Milestone</th><th>What happens</th><th>Status</th></tr></thead>
                <tbody>
                  {c.roadmap.milestones.map((m) => {
                    const chip = MILESTONE_CHIP[m.status];
                    return (
                      <tr key={m.title} className={m.status === 'next' ? 'now' : undefined}>
                        <td className="when">{m.movedFrom ? <span className="moved">{m.movedFrom.when}</span> : null}{m.when}</td>
                        <td>{m.title}</td>
                        <td>{m.what}{m.movedFrom ? <span className="reason">Moved from {m.movedFrom.when}: {m.movedFrom.reason}</span> : null}</td>
                        <td className="status"><span className={'chip ' + chip.chip}>{m.statusLabel || chip.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DEPARTMENTS */}
        <section id="departments">
          <div className="wrap">
            <h2>{c.departments.title}</h2>
            <p className="lede">{c.departments.lede}</p>
            <div className="legend">
              {(Object.keys(TILE_CHIP) as (keyof typeof TILE_CHIP)[]).map((k) => <span key={k}><span className={'chip ' + TILE_CHIP[k].chip}>{TILE_CHIP[k].label}</span></span>)}
            </div>
            <div className="groups">
              {c.departments.weeks.map((w) => (
                <div key={w.label} className="group">
                  <h3><b>{w.label}</b> — {w.title}</h3>
                  <div className="tiles">
                    {w.tiles.map((t) => {
                      const s = TILE_CHIP[t.status];
                      return (
                        <div key={t.name} className={('tile ' + s.tile).trim()}>
                          <div className="name">{t.name}</div>
                          <span className={'chip ' + s.chip}>{s.label}</span>
                          <div className="info">{t.info}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRESS LOG */}
        <section id="log">
          <div className="wrap">
            <h2>{c.log.title}</h2>
            <p className="lede">{c.log.lede}</p>
            <ul className="log">
              {c.log.entries.map((e, i) => (
                <li key={e.title} className={i === 0 ? 'latest' : undefined}>
                  <div className="d">{e.date}</div>
                  <div className="t">{e.title}</div>
                  <p>{e.body}</p>
                  <div className="tags">{e.tags.map((t) => <span key={t} className="chip grey">{t}</span>)}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ISSUES */}
        <section id="issues">
          <div className="wrap">
            <h2>{c.issues.title}</h2>
            <p className="lede">{c.issues.lede}</p>
            <div className="issuehead">
              <div><b>{fig.open}</b>open</div>
              <div><b>{fig.fixedThisWeek}</b>fixed this week</div>
              <div><b>{fig.avgDaysToFix}</b>average days to fix</div>
            </div>
            {issues.length === 0 ? (
              <div className="empty">
                {c.issues.empty}
                <br />{report()}
              </div>
            ) : (
              <div className="tablewrap">
                <table className="itable">
                  <thead><tr><th>#</th><th>Department</th><th>What happened</th><th>Raised by</th><th>Raised</th><th>Acknowledged</th><th>Status</th></tr></thead>
                  <tbody>
                    {[...issues].reverse().map((i) => {
                      const s = ISSUE_CHIP[i.status];
                      return (
                        <tr key={i.id}>
                          <td className="n">{i.id}</td>
                          <td>{i.department}</td>
                          <td className="what">{i.what}{i.note ? <span className="note">{i.note}</span> : null}</td>
                          <td>{i.raisedBy}</td>
                          <td className="n">{i.date}</td>
                          <td className="n">{i.acknowledged || '—'}</td>
                          <td className="n"><span className={'chip ' + s.chip}>{s.label}</span>{i.fixed ? <span className="note">{i.fixed}</span> : null}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* DATA */}
        <section id="data">
          <div className="wrap">
            <h2>{c.data.title}</h2>
            <p className="lede">{c.data.lede}</p>
            <div className="tablewrap">
              <table className="dtable">
                <thead><tr><th>Document or dataset</th><th>From</th><th>Received</th><th>Used for</th><th>Who at FabricXai can see it</th></tr></thead>
                <tbody>
                  {c.data.rows.map((r) => <tr key={r.item}><td>{r.item}</td><td>{r.from}</td><td>{r.received}</td><td>{r.usedFor}</td><td>{r.visibleTo}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="assure">
              {c.data.assurances.map((a) => <div key={a.title}><b>{a.title}</b>{a.body}</div>)}
            </div>
          </div>
        </section>

        {/* MEETINGS */}
        <section id="meetings">
          <div className="wrap">
            <h2>{c.meetings.title}</h2>
            <p className="lede">{c.meetings.lede}</p>
            {c.meetings.items.map((m) => (
              <div key={m.title} className={m.upcoming ? 'meet upcoming' : 'meet'}>
                <h3 className="h">{m.title}<span>{m.sub}</span>{m.acknowledged ? <span className="ack">Acknowledged by the system champion</span> : null}</h3>
                {m.columns.map((col) => (
                  <div key={col.heading}><h4>{col.heading}</h4><ul>{col.items.map((it, i) => <li key={i}>{it}</li>)}</ul></div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* HANDOVER */}
        <section id="handover">
          <div className="wrap">
            <h2>{c.handover.title}</h2>
            <p className="lede">{c.handover.lede}</p>
            <div className="hand">
              <div>
                <h3 className="ct">{c.handover.checklistTitle}</h3>
                <ul className="check">
                  {c.handover.checklist.map((it) => (
                    <li key={it.item} className={it.done ? 'done' : undefined}>
                      <span className="box" role="img" aria-label={it.done ? 'Done' : 'Not yet'} />{it.item}<span className="d">{it.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="scope">
                  <h3>{c.handover.maintenance.title}</h3>
                  <div className="two">
                    <div><h4>Included</h4><ul>{c.handover.maintenance.included.map((it) => <li key={it}>{it}</li>)}</ul></div>
                    <div><h4>Not included</h4><ul>{c.handover.maintenance.notIncluded.map((it) => <li key={it}>{it}</li>)}</ul></div>
                  </div>
                  <div className="until">{c.handover.maintenance.until} <b>{c.handover.maintenance.supportEnds}</b>{c.handover.maintenance.untilAfter}</div>
                </div>
                <div className="contacts">
                  {c.handover.contacts.map((p) => (
                    <div key={p.name} className="contact"><b>{p.name}</b><span>{p.how}</span><br />{p.phone}{p.email ? <><br /><span>{p.email}</span></> : null}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AGREEMENT */}
        <section id="agreement">
          <div className="wrap">
            <h2>{c.agreement.title}</h2>
            <p className="lede">{c.agreement.lede}</p>
            <div className="agree">
              {c.agreement.sides.map((s) => (
                <div key={s.title}><h3>{s.title}</h3><ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul></div>
              ))}
            </div>
            <div className="esc"><b>{c.agreement.escalation.label}</b> {c.agreement.escalation.path.join(', then ')}. {c.agreement.escalation.rule}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
