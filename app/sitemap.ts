import type { MetadataRoute } from 'next';
import { cars } from '@/data/cars';
import { posts } from '@/data/blog';

const BASE = 'https://motara-auto.om';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/cars', '/compare', '/about', '/services', '/blog', '/contact', '/favorites'];

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: r === '' ? 1 : 0.7
  }));

  const carEntries: MetadataRoute.Sitemap = cars.map((c) => ({
    url: `${BASE}/cars/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticEntries, ...carEntries, ...postEntries];
}
