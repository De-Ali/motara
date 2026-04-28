'use client';
import { Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/lib/toast';
import { cn } from '@/lib/utils';

export default function ShareButton({ title, text, url, className }: { title: string; text?: string; url?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const onClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
    try {
      if (typeof navigator !== 'undefined' && (navigator as any).share) {
        await (navigator as any).share({ title, text, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.show('Link copied');
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button type="button" onClick={onClick} className={cn('btn-outline gap-2', className)} aria-label="Share">
      {copied ? <Check className="h-4 w-4 text-success" /> : <Share2 className="h-4 w-4" />}
      <span>{copied ? 'Copied' : 'Share'}</span>
    </button>
  );
}
