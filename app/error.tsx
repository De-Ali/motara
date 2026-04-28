'use client';
import { useEffect } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="container-app py-20 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-danger/15 text-danger">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <h1 className="heading-2 mt-6">Something went wrong</h1>
      <p className="lead mt-3 max-w-md mx-auto">{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} className="btn-accent mt-6 gap-2"><RotateCcw className="h-4 w-4" /> Try again</button>
    </div>
  );
}
