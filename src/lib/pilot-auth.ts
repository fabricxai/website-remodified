/**
 * Passcode gate for the Baraka pilot portal. No user database: PILOT_PORTAL_PASSCODE
 * holds one or more passcodes, comma-separated (one for Baraka management, one for us).
 * The session cookie stores a SHA-256 of the passcode, never the passcode itself, so a
 * passcode can be rotated by editing the env var and every cookie made with it stops working.
 */

export const COOKIE = 'pilot_session';
export const COOKIE_DAYS = 30;

/** The host that serves the portal at "/" — must match the host in src/proxy.ts's matcher. */
export const PILOT_HOST = 'pilot.fabricxai.com';

export function isPilotHost(host: string): boolean {
  return host === PILOT_HOST || host === 'pilot.localhost';
}

export function passcodes(): string[] {
  return (process.env.PILOT_PORTAL_PASSCODE || '').split(',').map((s) => s.trim()).filter(Boolean);
}

export async function tokenFor(passcode: string): Promise<string> {
  const bytes = new TextEncoder().encode('fabricxai-pilot:' + passcode);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function validTokens(): Promise<string[]> {
  return Promise.all(passcodes().map(tokenFor));
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  return (await validTokens()).includes(token);
}
