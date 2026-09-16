import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE, isPilotHost, isValidToken } from '@/lib/pilot-auth';

/**
 * Baraka pilot portal:
 *  - pilot.fabricxai.com serves src/app/(pilot)/pilot at "/" (host → /pilot rewrite);
 *  - /pilot/* and the roadmap PDF need the passcode cookie, otherwise → the login page;
 *  - every portal response carries X-Robots-Tag: noindex.
 * The marketing site is untouched: the matcher only runs this for the pilot host,
 * /pilot/* and the PDF.
 */

const PDF = '/FabricXai_Baraka_Implementation_Roadmap.pdf';
const OPEN = new Set(['/pilot/login', '/pilot/api/login', '/pilot/robots.txt']);
const FILE = /\.[a-z0-9]+$/i;

export async function proxy(req: NextRequest) {
  const host = (req.headers.get('host') || '').split(':')[0].toLowerCase();
  const onPilotHost = isPilotHost(host);
  const url = req.nextUrl;
  let path = url.pathname;

  if (onPilotHost) {
    if (path === '/robots.txt') path = '/pilot/robots.txt';
    else if (!path.startsWith('/pilot')) {
      if (path !== PDF && FILE.test(path)) return NextResponse.next(); // favicon, fonts, og image
      path = path === '/' ? '/pilot' : '/pilot' + path;
    }
  }

  const gated = path === '/pilot' || path.startsWith('/pilot/') || path === PDF;
  if (!gated) return NextResponse.next();

  const base = onPilotHost ? '' : '/pilot';

  if (!OPEN.has(path)) {
    const ok = await isValidToken(req.cookies.get(COOKIE)?.value);
    if (!ok) {
      const login = new URL(base + '/login', req.url);
      const wanted = onPilotHost ? url.pathname : path;
      if (wanted !== '/pilot' && wanted !== '/' && wanted !== PDF) login.searchParams.set('next', wanted);
      const res = NextResponse.redirect(login);
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return res;
    }
  }

  const headers = new Headers(req.headers);
  headers.set('x-pilot-base', base);
  const res = path === url.pathname
    ? NextResponse.next({ request: { headers } })
    : NextResponse.rewrite(new URL(path + url.search, req.url), { request: { headers } });
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: [
    { source: '/((?!_next/|fonts/|media/).*)', has: [{ type: 'host', value: 'pilot.fabricxai.com' }] },
    { source: '/((?!_next/|fonts/|media/).*)', has: [{ type: 'host', value: 'pilot.localhost' }] },
    '/pilot',
    '/pilot/:path*',
    '/FabricXai_Baraka_Implementation_Roadmap.pdf',
  ],
};
