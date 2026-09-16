import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE, COOKIE_DAYS, passcodes, tokenFor } from '@/lib/pilot-auth';

/** Checks the passcode from the login form and sets the session cookie. */
export async function POST(req: NextRequest) {
  const base = req.headers.get('x-pilot-base') ?? '/pilot';
  const form = await req.formData();
  const passcode = String(form.get('passcode') ?? '').trim();
  const next = String(form.get('next') ?? '');
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : base || '/';

  if (!passcode || !passcodes().includes(passcode)) {
    const back = new URL(base + '/login', req.url);
    back.searchParams.set('error', '1');
    if (next) back.searchParams.set('next', next);
    return NextResponse.redirect(back, 303);
  }

  const res = NextResponse.redirect(new URL(safeNext, req.url), 303);
  res.cookies.set(COOKIE, await tokenFor(passcode), {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: COOKIE_DAYS * 86_400,
  });
  return res;
}
