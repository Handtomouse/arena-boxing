/**
 * robots.txt - Search engine crawling instructions
 */

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arenaboxing.com.au';

  const robotsTxt = `# Arena Boxing - Robots.txt
User-agent: *
Allow: /

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
