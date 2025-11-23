/**
 * sitemap.xml - Dynamic sitemap generator
 */

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arenaboxing.com.au';
  const currentDate = new Date().toISOString();

  // Define all routes with their priorities and change frequencies
  const routes = [
    { path: '', priority: 1.0, changefreq: 'daily' }, // Landing page
    { path: '/home', priority: 0.9, changefreq: 'daily' }, // Home page
    { path: '/booking', priority: 0.9, changefreq: 'daily' }, // Booking - high priority
    { path: '/timetable', priority: 0.8, changefreq: 'daily' }, // Timetable
    { path: '/membership', priority: 0.8, changefreq: 'weekly' }, // Membership
    { path: '/about', priority: 0.7, changefreq: 'monthly' }, // About
    { path: '/location', priority: 0.6, changefreq: 'monthly' }, // Location
    { path: '/faq', priority: 0.6, changefreq: 'monthly' }, // FAQ
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
