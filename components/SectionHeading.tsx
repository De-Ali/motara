'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { href: string; label: string };
  align?: 'start' | 'center';
};

export default function SectionHeading({ eyebrow, title, subtitle, cta, align = 'start' }: Props) {
  return (
    <div className={`mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${align === 'center' ? 'items-center text-center sm:flex-col' : ''}`}>
      <div>
        {eyebrow && <span className="chip mb-3">{eyebrow}</span>}
        <h2 className="heading-2 text-balance">{title}</h2>
        {subtitle && <p className="lead mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {cta && (
        <Link href={cta.href} className="btn-ghost gap-1 self-start sm:self-end">
          {cta.label} <ArrowRight className="h-4 w-4 rtl-flip" />
        </Link>
      )}
    </div>
  );
}
