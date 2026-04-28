'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { postBySlug, posts } from '@/data/blog';
import { useI18n } from '@/lib/i18n';

export default function PostClient() {
  const { slug } = useParams<{ slug: string }>();
  const post = postBySlug(slug);
  const { t, locale } = useI18n();
  if (!post) return notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="container-app py-12 max-w-3xl">
      <Link href="/blog" className="text-sm text-[rgb(var(--muted))] hover:text-accent-500 inline-flex items-center gap-1.5 mb-6">
        <ArrowLeft className="h-4 w-4 rtl-flip" /> {t('nav.blog')}
      </Link>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
      </div>
      <h1 className="heading-1 text-balance">{post.title[locale]}</h1>
      <div className="mt-3 text-xs text-[rgb(var(--muted))] flex gap-3">
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.publishedAt}</span>
        <span>·</span>
        <span>{t('blog.readMin', { n: post.readMin })}</span>
      </div>

      <div className="relative aspect-[16/9] mt-8 overflow-hidden rounded-2xl">
        <Image src={post.cover} alt="" fill priority sizes="(max-width: 1024px) 100vw, 768px" className="object-cover" />
      </div>

      <div className="prose-custom mt-8">
        {post.body[locale].split('\n\n').map((para, i) => (
          <p key={i} className="text-base leading-relaxed mb-5 text-[rgb(var(--fg))]">{para}</p>
        ))}
      </div>

      <section className="mt-16 pt-10 border-t border-[rgb(var(--border))]">
        <h2 className="heading-3 mb-5">More from the blog</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card overflow-hidden group">
              <div className="relative aspect-[16/9]">
                <Image src={p.cover} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.title[locale]}</h3>
                <p className="text-xs text-[rgb(var(--muted))] mt-1">{t('blog.readMin', { n: p.readMin })}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
