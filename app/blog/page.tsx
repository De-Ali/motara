'use client';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/data/blog';
import { useI18n } from '@/lib/i18n';
import SectionHeading from '@/components/SectionHeading';

export default function BlogPage() {
  const { t, locale } = useI18n();
  return (
    <div className="container-app py-12">
      <SectionHeading title={t('blog.title')} subtitle={t('blog.subtitle')} align="center" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card overflow-hidden group hover:-translate-y-1 transition-all">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={p.cover} alt={p.title[locale]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {p.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
              </div>
              <h3 className="font-semibold leading-snug">{p.title[locale]}</h3>
              <p className="mt-2 text-sm text-[rgb(var(--muted))] line-clamp-2">{p.excerpt[locale]}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
                <span>{p.author}</span>
                <span>{t('blog.readMin', { n: p.readMin })}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
