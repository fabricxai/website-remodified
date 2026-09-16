import { headers } from 'next/headers';
import { content } from '@/lib/pilot';

export default async function PilotLogin({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const [{ error, next }, h] = await Promise.all([searchParams, headers()]);
  const base = h.get('x-pilot-base') ?? '/pilot';
  return (
    <main className="login">
      <form className="card" method="post" action={`${base}/api/login`}>
        <div className="brand">
          <div className="mark" aria-hidden="true" />
          <div><strong>{content.portalName}</strong><span>{content.portalTagline}</span></div>
        </div>
        <h1 style={{ fontSize: 20 }}>Enter the passcode</h1>
        <p className="who">This page is private to {content.factory} and FabricXai. The passcode was shared with management by FabricXai.</p>
        <label>
          Passcode
          <input type="password" name="passcode" autoComplete="current-password" required autoFocus aria-describedby={error ? 'login-err' : undefined} aria-invalid={error ? true : undefined} />
        </label>
        {next ? <input type="hidden" name="next" value={next} /> : null}
        {error ? <p id="login-err" className="err" role="alert">That passcode is not right. Try again, or ask Arifur or Kamrul.</p> : null}
        <button className="btn primary" type="submit">Open the portal</button>
      </form>
    </main>
  );
}
