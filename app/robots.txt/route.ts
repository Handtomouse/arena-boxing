/**
 * robots.txt - Search engine crawling instructions
 */

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = siteUrl || 'https://arenaboxing.com.au';
  let allowCrawlers = false;

  if (siteUrl) {
    try {
      allowCrawlers = new URL(siteUrl).hostname === 'arenaboxing.com.au';
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
