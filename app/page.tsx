'use client';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import SectionHeading from '@/components/SectionHeading';
import CarCard from '@/components/CarCard';
import Process from '@/components/Process';
import USP from '@/components/USP';
import Testimonials from '@/components/Testimonials';
import CTABand from '@/components/CTABand';
import { posts } from '@/data/blog';
import { useI18n } from '@/lib/i18n';
import { useAdminStore } from '@/lib/admin-store';

export default function HomePage() {
  const { t, locale } = useI18n();
  const { cars } = useAdminStore();
  const featured = cars.filter((c) => c.status !== 'Sold').slice(0, 6);
  const teasers = posts.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="container-app -mt-10 sm:-mt-14 relative z-10">
        <SearchBar />
      </section>

      <section className="container-app py-20">
        <SectionHeading
          title={t('featured.title')}
          subtitle={t('featured.subtitle')}
          cta={{ href: '/cars', label: t('common.viewAll') }}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
        </div>
      </section>

      <Process />
      <USP />
      <Testimonials />

      <section className="container-app py-20">
        <SectionHeading
          title={t('blogTeaser.title')}
          subtitle={t('blogTeaser.subtitle')}
          cta={{ href: '/blog', label: t('common.viewAll') }}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {teasers.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card overflow-hidden group hover:-translate-y-1 transition-all">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.cover} alt={p.title[locale]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <h3 className="font-semibold leading-snug">{p.title[locale]}</h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))] line-clamp-2">{p.excerpt[locale]}</p>
                <div className="mt-3 text-xs text-[rgb(var(--muted))]">{t('blog.readMin', { n: p.readMin })}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
