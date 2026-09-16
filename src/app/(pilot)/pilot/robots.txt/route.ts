/** robots.txt for the pilot host (src/proxy.ts rewrites pilot.fabricxai.com/robots.txt here). */
export function GET() {
  return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain', 'X-Robots-Tag': 'noindex, nofollow' } });
}
