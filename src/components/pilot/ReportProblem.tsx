'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Props { departments: string[]; apiUrl: string; email: string; primary?: boolean }

/**
 * "Report a problem": a native <dialog> (focus trap and Esc for free) that posts to the
 * issues API. If the API cannot store it, the browser's mail app opens with the
 * same fields prefilled (the same webhook-or-mailto pattern as /fair).
 */
export default function ReportProblem({ departments, apiUrl, email, primary }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const id = useId();
  const [state, setState] = useState<{ kind: 'idle' | 'sending' | 'ok' | 'mail' | 'err'; msg?: string }>({ kind: 'idle' });

  const open = () => { setState({ kind: 'idle' }); ref.current?.showModal(); };
  const close = () => ref.current?.close();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as { department: string; name: string; what: string };
    setState({ kind: 'sending' });
    try {
      const res = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (res.ok && json.id) {
        setState({ kind: 'ok', msg: `Logged as ${json.id}. FabricXai will acknowledge it the same working day.` });
        form.reset();
        router.refresh();
        return;
      }
      if (res.status === 400) { setState({ kind: 'err', msg: json.error || 'Please check the fields.' }); return; }
    } catch { /* network */ }
    const subject = encodeURIComponent(`Baraka pilot: problem in ${data.department}`);
    const body = encodeURIComponent(`Department: ${data.department}\nName: ${data.name}\n\nWhat happened:\n${data.what}\n`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setState({ kind: 'mail', msg: 'The portal could not save this, so your email app has opened with the report filled in. Send it and FabricXai will log it.' });
  }

  return (
    <>
      <button className={primary ? 'btn primary' : 'btn'} type="button" onClick={open}>Report a problem</button>
      <dialog ref={ref} className="report" aria-labelledby={id + '-t'}>
        <form onSubmit={submit} method="dialog">
          <h2 id={id + '-t'}>Report a problem</h2>
          <p className="hint">Acknowledged the same working day. It appears in the Issues list with your name and department.</p>
          <label>
            Department
            <select name="department" required defaultValue="">
              <option value="" disabled>Choose a department</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
          <label>
            Your name
            <input name="name" type="text" required maxLength={80} autoComplete="name" />
          </label>
          <label>
            What happened
            <textarea name="what" required maxLength={2000} placeholder="Which screen, what you expected, what you saw" />
          </label>
          {state.msg ? <p className={'status ' + (state.kind === 'ok' ? 'ok' : state.kind === 'err' ? 'err' : '')} role="status">{state.msg}</p> : null}
          <div className="row">
            <button className="btn" type="button" onClick={close}>{state.kind === 'ok' || state.kind === 'mail' ? 'Close' : 'Cancel'}</button>
            {state.kind === 'ok' || state.kind === 'mail' ? null : <button className="btn primary" type="submit" disabled={state.kind === 'sending'}>{state.kind === 'sending' ? 'Sending…' : 'Send to FabricXai'}</button>}
          </div>
        </form>
      </dialog>
    </>
  );
}
