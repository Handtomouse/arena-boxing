/**
 * robots.txt - Search engine crawling instructions
 */

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = siteUrl || 'https://arenaboxing.com.au';
  let allowCrawlers = false;

  if (siteUrl) {
    try {
      // The production domain canonicalises apex -> www (verified 20 Aug 2026:
      // https://arenaboxing.com.au 301s to https://www.arenaboxing.com.au/), so the
      // www. form MUST be accepted. Rejecting it would emit Disallow: / on the live
      // site and silently deindex it.
      const host = new URL(siteUrl).hostname.replace(/^www\./, '');
      allowCrawlers = host === 'arenaboxing.com.au';
    } catch {
      allowCrawlers = false;
    }
  }

  const robotsTxt = `# Arena Boxing - Robots.txt
User-agent: *
${allowCrawlers ? 'Allow: /' : 'Disallow: /'}

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin/private paths (add as needed)
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 1 day
    },
  });
}
