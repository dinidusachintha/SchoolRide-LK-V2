'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Application route error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] w-full dashboard-navy-yellow-bg flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-lg w-full glass-card-white rounded-[32px] p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="h-14 w-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#CA8A04]">
            Unexpected Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1528] tracking-tight">
            Something went wrong loading this view
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {error?.message || 'An unexpected interruption occurred. You can retry safely or return to the home page.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-glass-yellow-3d px-6 py-3 text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1528] hover:bg-[#071426] text-white font-bold text-xs sm:text-sm transition-colors"
          >
            <Home className="h-4 w-4 text-[#FACC15]" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

