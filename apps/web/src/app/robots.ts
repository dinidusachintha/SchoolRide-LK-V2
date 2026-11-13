import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://schoolride.lk';
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/drivers', '/safety'],
        disallow: ['/admin', '/driver', '/parent', '/login', '/register', '/forgot-password', '/reset-password'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
