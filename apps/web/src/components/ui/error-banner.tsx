'use client';

import * as React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorBanner({
  title = 'Unable to load data',
  message,
  onRetry,
  className = '',
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className={`rounded-2xl border border-rose-300/80 bg-rose-50/95 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-extrabold text-rose-950">{title}</p>
          <p className="text-xs text-rose-800">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shrink-0 cursor-pointer self-start sm:self-center"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}

