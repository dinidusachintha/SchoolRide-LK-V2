'use client';

import * as React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#071426] text-white flex items-center justify-center p-6 font-sans antialiased">
        <div className="max-w-md w-full rounded-3xl bg-[#0B1D35] border border-white/15 p-8 text-center space-y-5 shadow-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FACC15]/15 text-[#FACC15] text-xs font-extrabold uppercase tracking-wider">
            System Recovery
          </span>
          <h1 className="text-2xl font-black text-white">Application Recovery Required</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {error?.message || 'A critical client error interrupted rendering.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-2.5 rounded-full bg-[#FACC15] text-[#071426] font-black text-xs sm:text-sm cursor-pointer"
            >
              Reload App
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full border border-white/25 text-white font-bold text-xs sm:text-sm hover:bg-white/10"
            >
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
